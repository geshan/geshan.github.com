---
layout: post
title: "How to run Gemma 3 on Google Cloud Run, the easiest way with AI Studio"
date: 2025-06-08T21:59:24.000+11:00
comments: true
tags:
- GCP
- AI
- Gen AI
- Google Cloud Run
cover: "/images/gemma3-on-cloud-run/01gemma3-on-cloud-run.jpg"
pagetitle: "How to run Gemma 3 on Google Cloud Run, the easiest way with AI Studio"
description: "Learn how to deploy Gemma 3 on Google Cloud Run using Google AI Studio, also understand the magic behind the process."
keywords: gemma3 on google cloud run, gemma3 on gcp
---
Gemma is a collection of lightweight, modern open models built by Google. They are designed to run fast on devices like phones, on machines in the cloud, to help developers create AI applications. In this post, you will learn the easiest and fastest way to run the latest version of [Gemma, 3](https://blog.google/technology/developers/gemma-3/) (4 B), on Google Cloud Run deployed from Google AI Studio. Let’s get started!

<!-- more -->

<img class="center" src="/images/gemma3-on-cloud-run/01gemma3-on-cloud-run.jpg" title="How to run Gemma 3 on Google Cloud Run with AI Studio and the magic behind it" alt="How to run Gemma 3 on Google Cloud Run with AI Studio and the magic behind it">

## Table of Contents

- [Gemma 3 on Cloud Run](#gemma-3-on-cloud-run)
  - [Create Google Cloud Project](#create-google-cloud-project)
  - [Deploy Gemma 3 from AI Studio](#deploy-gemma-3-from-ai-studio)
- [The Docker image](#the-docker-image)
  - [How to run it with one command](#how-to-run-it-with-one-command)
- [Conclusion](#conclusion)

## Gemma 3 on Cloud Run

To deploy Gemma 3 (4 billion parameters model) on Google Cloud Run from Google AI Studio. Gemma 3 models’ size [ranges](https://ollama.com/library/gemma3) from 815 MB for 1B parameters to 17 GB for the 27B parameters. The model you will deploy is the 4B parameters, which is 3.3 GB.

You will first create a new Google Cloud Project. You can deploy Gemma 3 from AI Studio with just a few clicks. When deployed from AI Studio, it uses Ollama under the hood to run Gemma 3 inside a container. In that container, there is a slim Go server/proxy to [verify](https://github.com/google-gemini/gemma-cookbook/blob/main/Demos/Gemma-on-Cloudrun/proxy.go#L86) the API key.

You will also learn about a command you can run on Google Cloud Shell that will have a similar effect later in this tutorial. You will create a new Google Cloud Project in the next section to get going.

### Create Google Cloud Project

To create a new Google Cloud Project, make sure you are logged into your Google Account. Then you can go to the [Create new project](https://console.cloud.google.com/projectcreate) page on GCP and fill in the following details:

<img class="center" src="/images/gemma3-on-cloud-run/02new-gcp-project.jpg" loading="lazy" title="Create a new GCP project to run Gemma 3 on Cloud Run" alt="Create a new GCP project to run Gemma 3 on Cloud Run">

After that, click the `Create` blue button to create the project. It may take some time, and your project will be created, and you will be notified about that:

<img class="center" src="/images/gemma3-on-cloud-run/03gcp-project-created.jpg" loading="lazy" title="Created a new GCP project to run Gemma 3 on Cloud Run" alt="Created a new GCP project to run Gemma 3 on Cloud Run">

Note the project name you just created. Then, go to Google AI Studio and follow the steps shown in the next section.

### Deploy Gemma 3 from AI Studio

On [Google AI Studio](https://aistudio.google.com/), go to the `Chat` section, which should open by default:

<img class="center" src="/images/gemma3-on-cloud-run/04google-ai-studio-chat.jpg" loading="lazy" title="Google AI Studio with the default chat screen" alt="Google AI Studio with the default chat screen">

Under the `Run setting` on the right side bar, click on the dropdown that has the model name selected, like `Gemini 2.5 Flash…`, then select `Gemma`, and after that click `Gemma 3 4B`, as seen below:

<img class="center" src="/images/gemma3-on-cloud-run/05gemma3-4b-on-ai-studio.jpg" loading="lazy" title="Select Gemma 3 with 4 billion parameters on Google AI Studio" alt="Select Gemma 3 with 4 billion parameters on Google AI Studio">

On the selected `Gemma 3 4B` model, bring the temperature down to `0.3` and the Top P setting to `0.4` , as follows:

<img class="center" src="/images/gemma3-on-cloud-run/06gemma3-settings.jpg" loading="lazy" title="Setting the temparature (creativity) and top p settings for Gemma 3:4B on AI Studio" alt="Setting the temparature (creativity) and top p settings for Gemma 3:4B on AI Studio">

The above setting doesn't matter when you deploy. If you want, you can chat with Gemma 3 like ask it `why is the sky blue?, give the shortest possible answer`. It should give back a one sentence answer. 

After that, click on the black and white Rocket icon (🚀) besides the `Run settings` and click `Deploy to Cloud Run` as seen below:

<img class="center" src="/images/gemma3-on-cloud-run/07ai-studio-gemma3-to-cloud-run.jpg" loading="lazy" title="Deploy Gemma 3 to Google Cloud Run from AI Studio" alt="Deploy Gemma 3 to Google Cloud Run from AI Studio">

Then, you can select the project created in the previous step, which was `gemma3-on-cr` in my case:

<img class="center" src="/images/gemma3-on-cloud-run/08ai-studio-select-project.jpg" loading="lazy" title="Select GCP Project on Google AI Studio" alt="Select GCP Project on Google AI Studio">

After that, click the `Deploy to Google Cloud` blue button. It will take some time to say `Deploying to Cloud Run`. If all goes well after a couple of minutes, you will get a URL where Gemma 3 (4B) is running on Google Cloud Run with an API key as follows:

<img class="center" src="/images/gemma3-on-cloud-run/09gemma3-deployed.jpg" loading="lazy" title="Gemma3 deployed on Cloud Run from Google AI Studio" alt="Gemma3 deployed on Cloud Run from Google AI Studio">

You can click the `Get code` blue button to try a curl command to verify that Gemma 3 on Cloud Run works as expected, select `REST` on the left select box, and copy the code:

<img class="center" src="/images/gemma3-on-cloud-run/10curl-to-test-gemma3-on-cloud-run.jpg" loading="lazy" title="Curl code to test Gemma3 deployed on Cloud Run from Google AI Studio" alt="Curl code to test Gemma3 deployed on Cloud Run from Google AI Studio">

When you run the copied code in the command line, add `give your answer in 1 sentence`, then only run the code. The final code I ran was:

```bash
curl "https://gemma-3-4b-it-some-long-number-region.run.app/v1beta/models/gemma-3-4b-it:streamGenerateContent?key=the-api-key" \
   -H 'Content-Type: application/json' \
   -X POST \
   -d '{
     "contents": [{
       "parts":[{"text": "How does AI work? give your answer in 1 sentence"}]
       }]
      }'
```

Which resulted in:

<img class="center" src="/images/gemma3-on-cloud-run/11gemma3-working.jpg" loading="lazy" title="Gemma 3 working on Cloud Run" alt="Gemma 3 working on Cloud Run">

Hurray! You have Gemma 3 running on Google Cloud Run. Now you can use it in your applications. You can add [Open WebUI](https://geshan.com.np/blog/2025/02/ollama-docker-compose/) if you like.

## The Docker image

From the surface, it looks partially like magic, but most of the heavy lifting is being done by a prebuilt Docker image available on the Google Cloud Artifact registry (pkg.dev) built with Google Cloud Biuld. 

When you read the official docs about [Gemma on Cloud Run](https://github.com/google-gemini/gemma-cookbook/tree/main/Demos/Gemma-on-Cloudrun), you can find out that there are pre-built Docker images like [Gemma 3:4B](http://us-docker.pkg.dev/cloudrun/container/gemma/gemma3-4b) on the package registry. As [GPUs on Cloud Run](https://cloud.google.com/run/docs/configuring/services/gpu) have become available on demand with no reservations needed, deploying any model with Ollama on Cloud Run has become much easier. 

The Dockerfile also has a [proxy server](https://github.com/google-gemini/gemma-cookbook/blob/main/Demos/Gemma-on-Cloudrun/proxy.go) to add the API key validation on top of a regular Ollama instance. It would be good to go through the [readme](https://github.com/google-gemini/gemma-cookbook/tree/main/Demos/Gemma-on-Cloudrun) to know more about this and other features.

In the next section, you will learn about the single command for deploying Gemma 3 on Cloud Run.

### How to run it with one command

To run Gemma 3:4B on Cloud Run, you can run the following command on [Google Cloud Shell](/blog/2024/01/cloud-shell-editor/#google-cloud-shell-terminal) of your respective Google Cloud Project:

```bash
gcloud run deploy gemma3-4b-dwc \
 --image us-docker.pkg.dev/cloudrun/container/gemma/gemma3-4b \
 --concurrency 4 \
 --cpu 8 \
 --set-env-vars OLLAMA_NUM_PARALLEL=4 \
 --set-env-vars=API_KEY=gf2lv74w79ubm5lr \
 --gpu 1 \
 --gpu-type nvidia-l4 \
 --max-instances 1 \
 --memory 32Gi \
 --allow-unauthenticated \
 --no-cpu-throttling \
 --timeout=600 \
 --region us-central1
```

You can run it on Google Cloud Shell as:

<img class="center" src="/images/gemma3-on-cloud-run/12cloud-run-deploy-gemma3-4b.jpg" loading="lazy" title="Gcloud run deploy command to deploy Gemma 3 4B on Cloud Run" alt="Gcloud run deploy command to deploy Gemma 3 4B on Cloud Run">

It might ask you do deploy with `no zonal redundancy`, write `y` for yes, and it should deploy the service and give you back a URL as follows:

<img class="center" src="/images/gemma3-on-cloud-run/13gemma3-deploy-with-cli.jpg" loading="lazy" title="Gemma 3 deploy with Gcloud run command" alt="Gemma 3 deploy with Gcloud run command">

If you hit the URL key with the API key, you can see the `Ollama is running` message as seen below:

<img class="center" src="/images/gemma3-on-cloud-run/14gemma3-running.jpg" loading="lazy" title="Gemma 3 running deployed with Gcloud run command" alt="Gemma 3 running deployed with Gcloud run command">

There you have it. Now you know you have decoded the secret of the magic AI studio doing in the background to enable the API key. Gemma 3 is running on Google Cloud Run with Ollama and a proxy server written in Go.

## Conclusion

In this post, you learned about deploying Gemma 3 on Google Cloud Run through Google AI Studio's intuitive interface, which simplifies a complex process into a few clicks. You also learned that this deployment leverages Ollama and pre-built Docker images from the Google Cloud Artifact Registry, enhanced with a Go-based proxy server for API key validation. 

Additionally, you could decode the magic using a single gcloud command within the Google Cloud Shell, offering flexibility and control over deployment parameters like concurrency, CPU, GPU, and memory. Both methods result in a functional Gemma 3 instance on Cloud Run, ready to be integrated into applications, providing developers like you with powerful AI model capabilities with minimal effort. Keep experimenting!
