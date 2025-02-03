---
layout: post
title: "What is Ollama and how to use it: a quick guide [part 1]"
date: 2025-02-02T22:47:52.000+11:00
comments: true
tags:
- AI
- Gen AI
- Ollama
cover: "/images/what-is-ollama/01what-is-ollama.jpg"
pagetitle: "What is Ollama and how to use it: a quick guide [part 1]"
description: "Learn what Ollama is, its features and how to run it on your local machine with DeepSeek R1 and Smollm2 models"
keywords: what is ollama, ollama, ollama deepseek, ollama smollm2, ollama features, ollama models, ollama local machine, ollama quick guide
---
The world of AI has been hyped for more than two years now since the release of ChatGPT in November 2022. New tools and technologies emerge daily, promising to revolutionize our work and lives. If you're looking to harness the power of large language models (LLMs) for personal projects or even professional applications, Ollama might be the key. In this post, you will learn what Ollama is, how to download, install, and use Ollama to run a small model, and then run DeepSeek R1 (the other super popular LLM); let’s get started.

<!-- more -->

<img class="center" src="/images/what-is-ollama/01what-is-ollama.jpg" title="What is Ollama and how to use it: a quick guide [part 1]" alt="What is Ollama and how to use it: a quick guide [part 1]">

## Table of contents

- [What is Ollama](#what-is-ollama)
- [Ollama features](#ollama-features)
  - [Privacy and offline access](#privacy-and-offline-access)
  - [Model management](#model-management)
  - [Seamless installation](#seamless-installation)
  - [Local API](#local-api)
  - [Customization](#customization)
  - [Hardware acceleration](#hardware-acceleration)
  - [Adding a user interface](#adding-a-user-interface)
- [How to run Ollama locally](#how-to-run-ollama-locally)
  - [Run DeepSeek R1 with Ollama](#run-deepseek-r1-with-ollama)
  - [Where does Ollama store the models](#where-does-ollama-store-the-models)
- [Conclusion](#conclusion)

## What is Ollama

Ollama is an [open-source](https://github.com/ollama/ollama) tool mainly written in Go lang (89%) that runs open LLMs on your local machine (or a server). It acts like a bridge between any open LLM and your machine, not only running them but also providing an API layer on top of them so that another application or service can use them.

[Ollama](https://ollama.com/) is a user-friendly and powerful software for running LLMs locally. It hides the complexities of LLMs, packaging them to be accessible and easily customizable with a [model file](https://github.com/ollama/ollama/blob/main/docs/modelfile.md). There are alternatives to Ollama, like [vllm](https://github.com/vllm-project/vllm) and [aphrodite](https://github.com/aphrodite-engine/aphrodite-engine), but Ollama is surely the most popular one. Ollama provides a clean, user-friendly interface that allows you to interact directly with LLMs, tailoring the experience to your needs.

## Ollama features

Below are some important features of Ollama:

### Privacy and offline access

One of the most important features of Ollama is privacy and offline access. You can run open models privately on your machine, even without internet access. This not only enables you to use an LLM (say, for code suggestions) on a plane but also keeps your data on your local machine. Your data and files can stay safe in your local machine, and other big tech companies do not see it or get to use it for other purposes like training an LLM. This is a big advantage of Ollama over other cloud-based LLM services which send your data to the cloud for processing and may use it for other purposes.

### Model management

Adding a new model to the library of local models is easy. You can pull a model with `ollama pull` command and run it. At the time of writing, there are 150+ models you can pull and run locally, from DeepSeek R1 to Smollm, you can run popular models like Llama 3, Phi 4, Gemma 2, Mistral to code-specific models like Codeqwen, and Codestral. There is no need to navigate any complex format or dependencies or install any other software on your machine. You can pull a model and run it; if your system's resources support it, it will run easily.

### Seamless installation

As you will learn in the next section, Ollama's installation process is very user-friendly. Regardless of your Windows, Linux, or Mac operating system, you essentially run a command, and the Ollama CLI is available on your local machine. Thus, Ollama surely boasts a smooth and hassle-free installation and setup experience. With one command you can istall ollma CLI on a Linux or Mac operating system.

### Local API

Ollama has various commands, including the `ollama serve` command. This command starts a [Gin server](https://github.com/gin-gonic/gin) expoing an [API](https://github.com/ollama/ollama/blob/main/docs/api.md) over all the LLM models available on your local system. This allows you to integrate LLMs into other applications and workflows. An API enables efficient communication between your application and LLMs. You can send prompts, get responses back, and exploit the full potential of LLMs. Using [structured outputs](https://ollama.com/blog/structured-outputs), you can even get the response from the LLMs in a predefined schema.

### Customization

With Ollama you can tweak parameters and extract the most value out of LLMs on your local machine. For instance you can change the `num_ctx` parameter and change the [context window size](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-can-i-specify-the-context-window-size) for a model with Ollama. You can also change the configs to fine-tune LLM parameters, adjust settings and change the model behaviour to better suits your needs. You can also use a [modelfile](https://github.com/ollama/ollama/blob/main/docs/modelfile.md#parameter) to set multiple parameters like temperature, seed, top K, top P and others.

### Hardware acceleration

 Figuring out the resource and computational needs of the LLMs, Ollama can leverage the available hardware resources on your system including GPUs and CPUs. To check this you can run a `ollma ps` command and see the [resource](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-can-i-tell-if-my-model-was-loaded-onto-the-gpu) usages. Ollama makes sure the resources in your machine are utilized efficiently which enables you to run even large LLMs easily.

### Adding a user interface

Ollama is a command-line interface (CLI) aimed at advanced users. To use a graphical user interface with a chat, you can download and use [open web ui](https://openwebui.com/) (previously known as Ollama Web UI). Open web UI is also [open-source](https://github.com/open-webui/open-webui). It claims to be an extensible, feature-rich, and user-friendly self-hosted AI platform designed to operate entirely offline. You can read the official [docs](https://docs.openwebui.com/getting-started/quick-start/starting-with-ollama) to get started with open web UI which plays along well with Ollama.

In the next seciton, you will learn how to install and use Ollama.

## How to run Ollama locally

Ollama is easy to install and use on any operating system, be it Windows, Linux or Mac. For this guide, you will install it on a Mac and run the `smollom2` model with 135 million parameters which is 271 MB.  The [smollom](https://ollama.com/library/smollm) 135 M parameters is 92 MB which is one of the smallest but still useful model.

To install Ollama on the operating system of your choice, you can navigate to the official Ollama [download](https://ollama.com/download) page. It looks as follow:

<img class="center" src="/images/what-is-ollama/02download-ollama.jpg" loading="lazy" title="Official page to downlaod Ollama for Windows, Mac or Linux" alt="Official page to downlaod Ollama for Windows, Mac or Linux">

As I am using a Mac I can download the installer from that page or run the following command to get Ollama CLI installed on a Mac:

```bash
brew install ollama
```

It will install Ollama and all its related dependences and end like the below if all goes well:

<img class="center" src="/images/what-is-ollama/03brew-install-ollama-output.jpg" loading="lazy" title="Final successful output of brew install ollama on a Mac" alt="Final successful output of brew install ollama on a Mac">

If you installed it with brew you will need to run `ollama serve`. You will see the ollama variables and resources.
Then you can run `ollama –version` in a different CLI tab. You will see something like the bleow:

```bash
 ➜  ollama --version
ollama version is 0.5.7
```

At the time of writing the latest version of Ollama is `0.5.7`. As this point, because ollama is just installed you will not have any models. To check that you can run `ollama list` which will show an empty list.

Now, to install and run the [smollom2](https://ollama.com/library/smollm2:135m) 135 million parameter model you will execute the following on your command line:

```bash
ollama run smollm2:135m
```

Depending on your internet speed to download the 271MB model, it will take some time and show your the following output, where you can type your first question/promot to the model like
`why is the sky blue? give the shortest possible answer`:

<img class="center" src="/images/what-is-ollama/04ollama-run-smollm2.jpg" loading="lazy" title="Running Smollm2 135 million parameters model (271 MB) with Ollama" alt="Running Smollm2 135 million parameters model (271 MB) with Ollama">

You can play around and send it prompts or questions like `who are you?`. It will give the answers. If you write `/?` you will see the help menu as follows:

<img class="center" src="/images/what-is-ollama/05ollama-bye.jpg" loading="lazy" title="Exit the Ollama prompt of running model with /bye" alt="Exit the Ollama prompt of running model with /bye">

You can type in `/bye` to stop the running model and get out of its prompt. Congrats! You have successfully run a relatively smaller LLM (pun intended) on your machine. As it is a smaller model with only 135 million parameters (271 MB) it might not perform many tasks well. So in the next section you will run the popular DeepSeek R1 8 billion parameter model.

### Run DeepSeek R1 with Ollama

To run DeepSeek R1 8 billion parameter model you can run the following command:

```bash
ollama run deepseek-r1:8b
```

Keep in mind, you are downloading almost 4.9 GB of data, so depending on your internet speed it might take minutes (or hours, I can’t say). With Ollama you can try many open models, have a look at their [models](https://ollama.com/search) page and you can choose which model you would like to run on your local machine. Make sure that you have enough resources, memory, CPU and disk space to run a really large model. For iinstance the DeepSeek R1 671B parameters model is 404 GB which will surely not run a consumer grade laptop.

In my case, after a few minutes of watiing the `deepseek-r1:8b` model was downloaded and it ran. You can run the same question/prompt of `why is the sky blue? give the shortest possible answer` and see the response from the model as seen below:

<img class="center" src="/images/what-is-ollama/06ollama-deepseek-r1.jpg" loading="lazy" title="Running Deepseek R1 8 billion parameters model (4.9 GB) with Ollama" alt="Running Deepseek R1 8 billion parameters model (4.9 GB) with Ollama">

As you can see above, DeepSeek R1 (R for reasoning) apparently “thinks” and then gives back a response. Thats is something new. To stop the model and exit the chat you can type `/bye` and then get back to the bash.

### Where does Ollama store the models

Depending on your operationg system and how you installed Ollama it may vary. In my case, on a Mac it was stored in the user directory at `~/.ollama/models` as you can see below with the command `ls -al ~/.ollama/models`:

<img class="center" src="/images/what-is-ollama/07ollama-model-storage.jpg" loading="lazy" title="Ollama stores models at ~/.ollama/models" alt="Ollama stores models at ~/.ollama/models">

Ollama store the models at `~/.ollama/models` on Linux machines as well. It can be changed by setting an [environment variable](https://github.com/ollama/ollama/blob/main/docs/faq.md#setting-environment-variables-on-linux) called `OLLAMA_MODELS`.  In the next part of this series, you will learn about Ollama commands.

## Conclusion

Ollama is a game-changer for anyone working with LLMs. It simplifies the often daunting complexities of LLM interactions, making this powerful technology accessible to a much broader audience. Ollama's intuitive interface and user-friendly design make it the perfect tool for maximizing the power of LLMs and effortlessly incorporating them into your workflow.

In this post you learned how to install Ollama and run Smollom2 and DeepSeek R1 models on it using the command line. You also found out where Ollama stores the downloaded models. Happy AI exploration!
