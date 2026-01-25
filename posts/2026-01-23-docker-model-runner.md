---
layout: post
title: "Docker Model Runner: A beginner’s guide to running open models on your own machine [Part 1]"
date: 2026-01-23T22:47:32.000+11:00
comments: true
tags:
- AI
- Gen AI
- Docker
cover: "/images/docker-model-runner/01docker-model-runner.jpg"
pagetitle: "Docker Model Runner: A beginner’s guide to running open models on your own machine [Part 1]"
description: "A tutorial showing how to run Smollm2 with Docker Model Runner mainly with the Docker Model CLI"
keywords: docker model runner, docker model runner smollm2, docker model runner cli
---
Docker has been the de facto containerization ecosystem for more than a decade now. It recently added a model runner that runs many open models locally via a `docker model` command. In this post, you will learn how to use the Docker model runner to run smoll2 locally and interact with it. Let’s get started!

<!-- more -->

<img class="center" src="/images/docker-model-runner/01docker-model-runner.jpg" title="Docker Model Runner: A beginner’s guide to running open models on your own machine" alt="Docker Model Runner: A beginner’s guide to running open models on your own machine" fetchpriority="high">

## Table of contents

* [Prerequisites](#prerequisites)
* [Running Smollm2 with Docker Model Runner](#running-smollm2-with-docker-model-runner)
   * [Pull a model with Docker model runner](#pull-a-model-with-docker-model-runner)
   * [Run a model](#run-a-model)
   * [Remove a model](#remove-a-model)
* [Conclusion](#conclusion)

## Prerequisites

Below are some prerequisites you will need installed on the machine you want to run Docker Model Runner (DMR)

* Docker Model Runner (DMR) is available from Docker Desktop version 4.40 or later, so you will need Docker Desktop version 4.40 or later installed
* Your hardware will also need to support the functionality, which has GPU backends. I am running the commands shown in this tutorial on a Mac with an Apple Silicon chip
* If you are running Docker Engine on a Linux distro without Docker Desktop, you will need to install the `docker-model-plugin` separately with a command like `sudo apt-get install docker-model-plugin`

The easiest way to check if Docker Model Runner (DMR) is available on your machine with Docker Desktop or Docker engine installed is by running:

```bash
docker model version
```

If you see a version for your Docker Model Runner with the Docker Engine Kind, DMR is available on your machine. In my case, I am running Docker Model Runner version 1.0.6 on Docker Desktop 4.57.0.

Given the prerequisites have been mentioned, in the next section, you will run Smollm2 with Docker Model Runner(DMR).

## Running Smollm2 with Docker Moder Runner

Given that you have tested that you have Docker and Docker Model Runner installed on your system of choice. You will be running the [Smollm2](https://huggingface.co/collections/HuggingFaceTB/smollm2) model’s default/latest variant, which is the 360 million parameter one. It is 256.38 MB in size. You might ask why Smollm2. In my opinion, it is small enough to download quickly and does a good job of answering basic questions.

If you are not very confident with Docker commands, you can read the [Docker for beginners](/blog/2024/04/docker-for-beginners/) tutorial for a refresher on Docker. You can also read the post on [Docker commands](/blog/2022/05/docker-commands/) like docker pull, docker images, docker run, and others.

### Pull a model with Docker model runner

You can run the following command to pull [Smoll2](https://hub.docker.com/r/ai/smollm2) from DockerHub:

```bash
docker model pull ai/smollm2:latest
```

The output will look as follows after Smollm2 open model (by Huggingface) is downloaded to your machine:

<img class="center" src="/images/docker-model-runner/02docker-model-runner-pull.jpg" loading="lazy" title="Docker Model Runner pulling Smollm2 from DockerHub" alt="Docker Model Runner pulling Smollm2 from DockerHub">

You can also pull the model from Hugging Face. 

You can use the Docker Desktop interface to pull the same model after searching in the DockerHub tab, as seen below:

<img class="center" src="/images/docker-model-runner/03docker-desktop-search-model.jpg" loading="lazy" title="Search for Smollm2 on DockerHub from Docker Desktop Models section" alt="Search for Smollm2 on DockerHub from Docker Desktop Models section">

But a single command is much easier than following 4 steps on the GUI. Next, to see if the model is pulled (downloaded) correctly, you can run the following command to list all models:

```bash
docker model list
```

It will show the following output.

<img class="center" src="/images/docker-model-runner/04docker-model-runner-list-models.jpg" loading="lazy" title="Docker model runner CLI listing pulled models" alt="Docker model runner CLI listing pulled models">

After that, you can run the Smollm2 35-million-parameter model as discussed next.

### Run a model

To run the pulled Smollm2 model, you will need to run the following command:

```bash
docker model run ai/smollm2 "Why is the sky blue? Answer in a single sentence."
```

It will result in something like:

```
The sky is blue because it scatters sunlight in all directions and our eyes are more sensitive to shorter wavelengths of light, like blue and violet.
```

To run the model in an interactive question-answer mode, you can execute the following command:

```bash
docker model run ai/smollm2
```

After that, you can chat with the model as follows:

<img class="center" src="/images/docker-model-runner/05dmr-chat-with-smollm.jpg" loading="lazy" title="Docker model runner running Smollm2 and user having a with with it" alt="Docker model runner running Smollm2 and user having a with with it">


To exit the chat, you can type `/bye` on the command prompt, and it will take you back to your shell/CLI. If you type `/?`, it will give you more help options as seen below:

<img class="center" src="/images/docker-model-runner/06dmr-smollm2-exit.jpg" loading="lazy" title="Exit the chat and other help options for a model running with Docker Model Runner" alt="Exit the chat and other help options for a model running with Docker Model Runner">


You can look at all the prompts given to the model on Docker Desktop by clicking the model in the `Models` screen, which is `Smoll2` in this case:


<img class="center" src="/images/docker-model-runner/07docker-desktop-models-list.jpg" loading="lazy" title="Listing pulled models in Docker Desktop Models section" alt="Listing pulled models in Docker Desktop Models section">

Then click the `Requests` tab:

<img class="center" src="/images/docker-model-runner/08docker-desktop-listing-prompts.jpg" loading="lazy" title="Listing ran prompts on Desktop Models section Requests tab" alt="Listing ran prompts on Desktop Models section Requests tab">

The logs don’t stay for long, though. You can see that the model is responding very fast -- under 6 ms.

You can also chat with the model from the `Chat` tab, as seen below:

<img class="center" src="/images/docker-model-runner/09docker-desktop-chat-with-model.jpg" loading="lazy" title="Chatting with Smollm2 open model on Docker Desktop" alt="Chatting with Smollm2 open model on Docker Desktop">

You can also inspect the mode’s architecture, parameters, and other information in the `Inspect` tab:

<img class="center" src="/images/docker-model-runner/10docker-desktop-model-inspect.jpg" loading="lazy" title="Looking at the model information in Docker Desktop" alt="Looking at the model information in Docker Desktop">

The above information is similar to running the `docker model inspect smollm2` command. You can find the list of commands supported by `docker model` in the official Docker [documentation](https://docs.docker.com/reference/cli/docker/model/). For instance, you can see the running models with `docker model ps` and try out other commands similar to the main Docker CLI.

Smollm2 is an example; at the time of writing, there are [57 models](https://hub.docker.com/u/ai) available on Docker Hub. You can pull in Llama, Gemma, Qwen, Kimi, or any other open model of your choice and run it on your machine. 

The best part is that it is local, fast, and you don’t even need internet to run a model once it is downloaded and running on your local machine.

### Remove a model

If you want to remove the Smollm2 model, you can run `docker model rm smollm2`, which will delete the model given an output like:

```
Untagged: index.docker.io/ai/smollm2:latest 
Deleted: sha256:354bf30d0aa3af413d2aa5ae4f23c66d78980072d1e07a5b0d776e9606a2f0b9
```

There you go, you pulled a model with Docker Model runner and were able to run it. You had a quick chat with Smollm2. In the next part, you will learn how to connect a model with your own app using [Docker Model Runner and Docker Compose](/blog/2026/01/docker-model-runner-docker-compose/).


## Conclusion

In this quick and useful tutorial, you learned how to pull an open model like Smollm2 from DockerHub and run it on your local machine. This is just scratching the surface, with Docker Model runner you can run many open models on your machine from Gemma to Llama, and from Qwen to Deepseek deepening on your hardware. Keep learning!
