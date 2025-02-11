---
layout: post
title: "How to use Ollama and Open WebUI with Docker Compose [Part 4]"
date: 2025-02-11T22:43:57.000+11:00
comments: true
tags:
- AI
- Gen AI
- Ollama
cover: "/images/ollama-docker-compose/01ollama-docker-compose.jpg"
pagetitle: "Learn how to use Ollama with Open WebUI seamlessly with Docker and Docker Compose"
keywords: ollama docker, ollama docker compose, ollama open webui, ollama docker webui, ollama docker compose webui
---
Ollama gives you one of the easiest ways to run most open LLMs on your machine. It is open-source and easy to use. In addition to using it with a command line or its APIs, you can use it with a web user interface using [Open WebUI](https://openwebui.com/). This post will teach you how to run Ollama and Open WebUI to run any open LLM with a web-based chat interface like ChatGPT. Let’s get started!

<!-- more -->

<img class="center" src="/images/ollama-docker-compose/01ollama-docker-compose.jpg" title="How to use Ollama and Open WebUI with Docker Compose [Part 4]" alt="How to use Ollama and Open WebUI with Docker Compose [Part 4]">

## Table of contents

* [Recap of the Ollama series](#recap-of-the-ollama-series)
* [Prerequisites](#prerequisites)
* [Open WebUI](#open-webui)
* [Ollama Docker Compose](#ollama-docker-compose)
  * [Ollama Open WebUI Docker Services](#ollama-open-webui-docker-services)
* [Running Ollama and Open WebUI with Docker compose](#running-ollama-and-open-webui-with-docker-compose)
* [The docker images are huge](#the-docker-images-are-huge)
* [Hosting Ollama on the cloud](#hosting-ollama-on-the-cloud)
* [Conclusion](#conclusion)

## Recap of the Ollama series

This is part 4 of the Ollama blog series. In the [first part](/blog/2025/02/what-is-ollama/), you learned [what an Ollama is](/blog/2025/02/what-is-ollama/#what-is-ollama), its features, and how to run it on your local machine.

The second part delved into the [Ollama commands](/blog/2025/02/ollama-commands/) you can execute on the CLI. Part 3 of the series shed light on some of the important [Ollama APIs](/blog/2025/02/ollama-api/) focusing on the `generate` and `chat` endpoints.

This part involves running [Ollama’s Docker image](https://hub.docker.com/r/ollama/ollama) and adding a web UI, the [Open WebUI](https://github.com/open-webui/open-webui), to provide a chat interface for any model Ollama can run. Like Ollama, Open WebUI is also open-source, with the code primarily in JavaScript, Python, and TypeScript. It also has a docker image pushed on the Google Container Registry, created from its [Dockerfile](https://github.com/open-webui/open-webui/blob/main/Dockerfile). You will use Docker Compose to run these two images together for a working application.

## Prerequisites

Before you start running some Docker Compose commands, be informed of some of the software that needs to be running on your machine:

1. You will need Docker running on your machine, for this example, I am using Docker 27.4.0 on Mac
1. Make sure you have Docker Compose available as well (it used to be a different install when it was `docker-compose` when it was in v1, from [v2](https://stackoverflow.com/a/66516826) it is coupled with the Docker Desktop installation). I am using Docker Compose version v2.31.0-desktop.2 on a Mac)
1. It would be good to know about Docker volumes, docker ports, and basic [docker commands](/blog/2022/05/docker-commands/)

You can read the [Docker for beginners](/blog/2024/04/docker-for-beginners/) tutorial for a refresher on Docker. Please read this [docker compose tutorial](/blog/2024/04/docker-compose-tutorial/) to learn more about Docker Compose. 

## Open WebUI

Open Web UI is a user interface for interacting with large language models. It offers a streamlined and intuitive way to communicate with and manage these models, making them more accessible and user-friendly.

Open Web UI aims to simplify working with large language models. It allows users to harness their power for various applications, including content creation, research, and software development.

## Ollama Docker Compose

The Docker images for both Ollama and Open WebUI are not small. Ollama’s latest (version 0.5.7 at the time of writing) is 4.76 GB uncompressed, and Open WebUI’s main tag is 3.77 GB uncompressed. Below is the `docker-compose.yaml` file that has both Ollama and Open Web UI:

```bash
services:
  ollama:
    image: ollama/ollama:latest
    ports:
      - 11434:11434
    volumes:
      - ollama:/root/.ollama
    container_name: ollama
    tty: true
    restart: unless-stopped

  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    volumes:
      - open-webui:/app/backend/data
    depends_on:
      - ollama
    ports:
      - 3000:8080
    environment:
      - 'OLLAMA_BASE_URL=http://ollama:11434'
      - 'WEBUI_SECRET_KEY='
    extra_hosts:
      - host.docker.internal:host-gateway
    restart: unless-stopped

volumes:
  ollama: {}
  open-webui: {}
```

This file sets up your local environment to run any AI model (such as a large language model or LLM) and interact with it through a user-friendly web interface. It's like setting up a mini-cloud service on your machine.

This docker-compose.yml file sets up a two-part application:

* Ollama runs large language models (LLMs) locally on your computer. Think of it like the "engine" that powers the AI. It's like having your mini-ChatGPT running.

* Open WebUI is a user-friendly web interface that allows you to interact with Ollama. It's like a dashboard that allows you to talk to the AI engine. It provides a nice visual way to send prompts and see responses.

### Ollama Open WebUI Docker Services

Let’s look at the `services` section of the above `docker-compose.yaml` file:

Services is the main section where you define your application's different parts (containers). Each "service" is a separate program running in its isolated environment.

* `ollama`: This defines the first service, named "ollama".
* `image: ollama/ollama:latest`: This tells Docker which pre-built "image" to use. An image is like a template for a container. `ollama/ollama:lates`t means you using the official Ollama image, and `latest` means we want the most recent version.
* `ports: - 11434:11434`: This maps port 11434 on your host machine (your computer) to port 11434 inside the Ollama container. Ollama listens for requests on port 11434. This allows other applications (like Open WebUI) to talk to Ollama.
* `volumes`: - `ollama:/root/.ollama` creates a persistent storage area. `/root/.ollama` is where Ollama stores its data (like downloaded models). ollama: (defined at the bottom of the file) is a named volume. This means the data will persist even if you stop and restart the container. Without this, you'd lose all your downloaded models every time you stopped Ollama. It's like giving Ollama a dedicated hard drive that doesn't get erased.
* `container_name`: `ollama`: This gives the container a specific name, "ollama," making it easier to refer to.

* `tty: true` allocates a pseudo-TTY, which can be useful for interactive sessions. In simple terms, it helps the container handle input and output, making it behave more like a regular terminal. Programs that expect to interact with a user often need this.
* `restart: unless-stopped`: This tells Docker to automatically restart the Ollama container if it crashes or stops for any reason unless you explicitly stop it yourself (e.g., using docker compose down). It's like setting an auto-restart feature.

* open-webui: This defines the second service, named "open-webui".

* `image: ghcr.io/open-webui/open-webui:main`: This uses the Open WebUI image from the GitHub Container Registry (ghcr.io). `main` specifies a particular version (the main branch).
* `container_name: open-webui`: Gives the container a specific name.
* `volumes`: - `open-webui:/app/backend/data`: Similar to Ollama, this creates persistent storage for Open WebUI's data. /app/backend/data is where Open WebUI stores its data. open-webui: is another named volume. This keeps your Open WebUI settings and data safe.
* `depends_on`: - ollama: This is crucial. It tells Docker Compose that the Open WebUI service depends on the Ollama service. Docker Compose will start Ollama before starting Open WebUI. This is essential because Open WebUI needs Ollama to be running to function. It's like saying, "Don't start the dashboard until the engine is running”. Read more about [Docker compose depends on](/blog/2024/02/docker-compose-depends-on/).
* `ports`: `- 3000:8080` This maps port 3000 on your host machine to port 8080 inside the Open WebUI container. Open WebUI runs on port 8080. This means you'll access the Open WebUI interface by going to http://localhost:3000 in your web browser.
* `environment`: This sets environment variables inside the Open WebUI container. These are configuration settings.

* `OLLAMA_BASE_URL=http://ollama:11434`: This tells Open WebUI where to find Ollama. Notice it's using the service name ollama (not localhost). Docker Compose sets up internal networking so services can communicate using their service names. This is how Open WebUI knows how to connect to the Ollama "engine."
* `WEBUI_SECRET_KEY=`: This is a security setting for Open WebUI. You should set it to a strong, random value for production use. It's like a password for the web interface. Leaving it blank is fine for local testing but not for a public-facing server.

* `extra_hosts`: as `- host.docker.internal:host-gateway:` This is a bit more advanced. It allows the container to access services running on your host machine. `host.docker.internal` is a special hostname that resolves to your host's internal IP address. This is useful if, for example, you have another service running directly on your computer (not inside a container) that Open WebUI needs to access.

* `restart: unless-stopped`: As with Ollama, this ensures that Open WebUI restarts automatically unless you manually stop it.

* `volumes`: This section defines the named volumes used above. Volumes persist data even if the containers are restarted.

* `ollama: {}` defines the ollama volume. The empty {} means we're using the default Docker volume driver.
* `open-webui: {}` defines the open-webui volume using the default driver where Docker manages where and how to save it.

This docker-compose file sets up a system with Ollama (likely a large language model server) and Open-WebUI (a web interface to interact with Ollama).  It ensures that Ollama starts first, that both services have persistent storage, and that Open-WebUI knows how to connect to Ollama.  You'll be able to access Open-WebUI on your computer at port 3000.  Remember to set a `WEBUI_SECRET_KEY`!

## Running Ollama and Open WebUI with Docker compose

To run the above Docker Compose file, please execute:

```bash
docker compose up
```

Or you could run `docker-compose up` depending on the version of Docker Compose installed on your machine. Running this command for the first time will take some time, depending on your internet speed, because it will download around 4 GB of data in total (2.5 GB for Ollama and 1.5 GB or a bit more for Open WebUI). So you can make your coffee now and come back with it when the download finishes:

<img class="center" src="/images/ollama-docker-compose/02ollama-open-webui-pull-docker-images.jpg" loading="lazy" title="Pulling GBs or data for Ollama and Open WebUI Docker Images" alt="Pulling GBs or data for Ollama and Open WebUI Docker Images">

After it downloads both the docker images and runs them, you will see something like the below on the CLI:

<img class="center" src="/images/ollama-docker-compose/03ollama-open-webui-running-with-docker-compose.jpg" loading="lazy" title="Ollama and Open WebUI running inside Docker with Docker Compose up" alt="Ollama and Open WebUI running inside Docker with Docker Compose up">

Now you can go to `http://localhost:3000` on the browser of your choice (probably Google Chrome), and you will see the following welcome screen of Open WebUI:

<img class="center" src="/images/ollama-docker-compose/04open-webui-welcome.jpg" loading="lazy" title="First welcome screen of Open WebUI running inside Docker with Docker Compose" alt="First welcome screen of Open WebUI running inside Docker with Docker Compose">

Click the `Get Started` link, and then you will need to fill out the form as shown below:

<img class="center" src="/images/ollama-docker-compose/05open-webui-admin-registration-form.jpg" loading="lazy" title="Open WebUI Registration form to register the admin user" alt="Open WebUI Registration form to register the admin user">

After you fill out the form, you will reach the Open WebUI Dashboard with an announcement:

<img class="center" src="/images/ollama-docker-compose/06open-webui-registered.jpg" loading="lazy" title="Admin registered on Open WebUI and landing on the logged in page for the first time" alt="Admin registered on Open WebUI and landing on the logged in page for the first time">

Click on `Ok let’s go` to see the Open WebUI main screen. As no models are downloaded, you will download the `smollm2:135m` model using the UI. This can also be done from the CLI with `docker compose exec ollama ollama pull smollm2:135m`, but you will use the UI for now.

To pull/download the model onto your local Ollama instance, click the `Select a model` drop down and type in `smollm2:135m` then click on `Pull smollm2:135m from Ollama.com` to download the model as shown below:

<img class="center" src="/images/ollama-docker-compose/07open-webui-download-smollm2.jpg" loading="lazy" title="Download the Smollm2:135m model from the Open WebUI interface" alt="Download the Smollm2:135m model from the Open WebUI interface">

It is a relatively small model at 271 MB, so depending on your internet speed, it will finish in seconds or a couple of minutes as follows:

<img class="center" src="/images/ollama-docker-compose/08open-webui-downloading-smollm2.jpg" loading="lazy" title="Downloading the Smollm2:135m model from the Open WebUI interface" alt="Downloading the Smollm2:135m model from the Open WebUI interface">

After the model is downloaded locally on your machine and in the Ollama instance, you can start chatting or prompting the model. You can ask questions like `who are you?` or `why is the sky blue? give the shortest possible answer in under 20 words` as seen below:

<img class="center" src="/images/ollama-docker-compose/09open-webui-smollm2-chat.jpg" loading="lazy" title="Chatting with Smollm2 135 million params on Open WebUI" alt="Chatting with Smollm2 135 million params on Open WebUI">

The model will reply. You can also configure the models by clicking the `settings` icon at the top right of the screen. Parameters like temperature, top K, Top P, and others can be changed on the Open WebUI configs as follows:

<img class="center" src="/images/ollama-docker-compose/10open-webui-ollama-configs.jpg" loading="lazy" title="You can change Ollama configs on Open WebUI interface" alt="You can change Ollama configs on Open WebUI interface">

You now have your mini chatGPT running locally. Since it is Ollama and the model has been downloaded, it can run even without the internet on a plane. Depending on the resources available, such as disk space, CPU/GPU, and memory, you can download other models, such as Llama, Microsoft Phi, Gemma 2, or DeepSeek, from Ollama’s [model registry](https://ollama.com/search). 

## The docker images are huge

The uncompressed Docker image for Ollama is 4.5 GB, which will grow bigger when you download a model. Similarly, the uncompressed image for Open WebUI is 3.77 GB. Both of them are huge, as you can see below:

<img class="center" src="/images/ollama-docker-compose/11ollama-open-webui-docker-images-size.jpg" loading="lazy" title="Ollama and Open Web UI have big Docker images" alt="Ollama and Open Web UI have big Docker images">

Make sure to have at least 9-10 GB of free space on your hard disk before downloading these large Docker images.

## Hosting Ollama on the cloud

You can follow this step-by-step tutorial to run [Ollama on Google Cloud Run](/blog/2025/01/ollama-google-cloud-run/). If you are looking for a more production-ready Ollama docker image with a model (Gemma 2:9b) already pulled, have a look at this [Dockerfile](https://github.com/geshan/ollama-cloud-run/blob/master/Dockerfile). You can easily change the version of Ollama and also download another model of your choice to host it on Google Cloud Run in [serverless containers](/blog/2023/04/serverless-containers/). You can follow this [codelab](https://codelabs.developers.google.com/codelabs/how-to-use-ollama-sidecar-open-webui-frontend-cloud-run-gpu#0) to create a multi-container Cloud Run service with Ollama and Open WebUI together on Google Cloud Run where Open WebUI is the main pod (ingress frontend) and Ollama is a sidecar.

As it is a Docker container, you can also run it on your Kubernetes cluster on GKE.

## Conclusion

This blog post explains how to run Ollama and Open WebUI with Docker Compose. Ollama is an open-source tool for running large language models (LLMs) on your machine, and Open WebUI provides a web-based chat interface for interacting with the models.

The blog post first recaps the Ollama blog series and lists the prerequisites for running Ollama and Open WebUI with Docker Compose. It then explains Open WebUI and provides the Ollama Docker Compose file. Next, it explains the Ollama Open WebUI Docker services and how to run them with Docker Compose. It also notes that the Docker images are large, and the post provides guidance for hosting Ollama on the cloud. Keep exploring!
