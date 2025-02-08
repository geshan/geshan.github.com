---
layout: post
title: "Ollama commands: How to use Ollama in the command line [Part 2]"
date: 2025-02-06T22:45:37.000+11:00
comments: true
tags:
- AI
- Gen AI
- Ollama
cover: "/images/ollama-commands/01ollama-commands.jpg"
pagetitle: "Ollama commands: How to use Ollama in the command line [Part 2]"
description: "Learn about the important Ollama commands to run Ollama on your local machine with Smollm2 and Qwen 2.5 models"
keywords: ollama commands, ollama serve, ollama run, ollama list, ollama ps
---
Ollama is an open-source tool that helps you run open LLMs on your machine or a server. It is the glue layer between your machine (or hardware) and the open LLM of your choice. In this post, you will learn about the Ollama command you can use to get the most out of it; let’s get going!

<!-- more -->

<img class="center" src="/images/ollama-commands/01ollama-commands.jpg" title="Ollama commands: How to use Ollama in the command line [Part 2]" alt="Ollama commands: How to use Ollama in the command line [Part 2]">

## Table of contents

- [Quick recap](#quick-recap)
- [Ollama commands](#ollama-commands)
  - [Ollama serve](#ollama-serve)
  - [Ollama run](#ollama-run)
  - [Ollama list](#ollama-list)
  - [Ollama pull](#ollama-pull)
  - [Ollama ps](#ollama-ps)
  - [Ollama create](#ollama-create)
  - [Other Ollama commands](#other-ollama-commands)
- [Conclusion](#conclusion)

## Quick recap

This blog post is part 2 of the Ollama series. In the [first part](/blog/2025/02/what-is-ollama/), you covered topics like [what is Ollama](/blog/2025/02/what-is-ollama/#what-is-ollama), it’s [features](/blog/2025/02/what-is-ollama/#ollama-features) and [how to run Ollama](/blog/2025/02/what-is-ollama/#how-to-run-ollama-locally) with examples of Smollm2 and DeepSeek R1 models.

In this part, you will learn about some useful Ollama commands like serve, run, and ps. Before diving deeper into code mode, please ensure you have Ollama installed and working in your system by reading part 1.

## Ollama commands

Ollama has multiple commands to achieve relative goals. To know the sub-commands you can run with Ollama, you can execute the following: 

```bash
 ollama --help
```

It will give you the following output:

<img class="center" src="/images/ollama-commands/02ollama-help.jpg" loading="lazy" title="Output of ollama --help showing all available Ollama commands" alt="Output of ollama --help showing all available Ollama commands">

You can also run `ollama --version` to check the version of Ollama when writing the version of Ollama is  `0.5.7`. If you want help with a specific sub-command, you can add `--help` after the sub-command; for example: `ollama run --help` will give you the following output:

<img class="center" src="/images/ollama-commands/03ollama-run-help.jpg" loading="lazy" title="Output of ollama run --help showing available flag and environment variables" alt="Output of ollama run --help showing available flag and environment variables">

Now that you know the basics, let’s look at some useful Ollama commands.

### Ollama serve

Ollama `serve` is the main command that starts the Ollama server. It can be configured with many environment variables, such as `OLLAMA_DEBUG` to enable or disable debugging, `OLLAMA_HOST` to specify the server's host, and `OLLAMA_MAX_QUEUE` to configure the maximum number of queued requests. To learn more about these environment variables, run `ollama serve --help`.

Ollama runs [Gin](https://github.com/ollama/blob/main/server/routes.go#L27)  (written in Go) as the underlying server to add an API layer to the downloaded (pulled) models. Both the CLI and any other services that need to use LLM inference will use the server started with `ollama serve`, which will give an output similar to the below: 

<img class="center" src="/images/ollama-commands/04ollama-serve.jpg" loading="lazy" title="Output of ollama serve showing applied environment variables" alt="Output of ollama serve showing applied environment variables">

The Gin server runs on port `11434` by default, so if you hit `http://localhost:11434/` on the browser of your choice (probably Chrome), you will see the text `Ollama is running`. The next part of this Ollama series will discuss the API in detail.

Given that the server is running, you will run a model next with `ollama run`.

### Ollama run

The Ollama `run` command runs an open model available in the Ollama models [page](https://ollama.com/search). It will pull (download) the model to your machine and then run it, exposing it via the API started with `ollama serve`. Like the previous part, you will run the Smollm2 135 million parameter because it will run on most machines with even less memory (like 512 MB), as the model is 271 MB.

To run Smollm2 135M parameters model, you can execute: 

```bash
ollama run smollm2:135m
```

It will result in something like the following:

<img class="center" src="/images/ollama-commands/05ollama-run-smollm2.jpg" loading="lazy" title="Output of ollama run smollm2:145m on the CLI when the model is already downloaded" alt="Output of ollama run smollm2:145m on the CLI when the model is already downloaded">

If you ran the model for the first time, it would have downloaded and run, as seen in the last [part](/blog/2025/02/what-is-ollama/) of this Ollama series. However, running an already pulled (downloaded) model runs quickly the second time.

If you type `/?` within the run command, you will see the help. You can set variables for the model like `num_ctx`, which can be used to configure the [context window](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-can-i-specify-the-context-window-size) of the model. For instance, you can type in `/set parameter num_ctx 8129` to set the context window to 8129 tokens.

You can also try `/show info`, and it will show you the model’s information like:

```bash
>>> /show info
  Model
    architecture        llama      
    parameters          134.52M    
    context length      8192       
    embedding length    576        
    quantization        F16        

  Parameters
    stop    "<|im_start|>"    
    stop    "<|im_end|>"      

  System
    You are a helpful AI assistant named SmolLM, trained by Hugging Face    

  License
    Apache License               
    Version 2.0, January 2004    
```

You can play with the other commands you run in the running model context. You can also chat with the model, asking it questions like `what is the speed of light?` gave me the following output with the smollm2 135M parameter model:

```bash
>>> what is the speed of light?
The speed of light in space is approximately 299,792,458 meters per second. This value is an approximation based on observations and calculations made using special relativity theory. While it's difficult to measure precisely with our current technology, scientists have used the latest methods to estimate this value for both magnitude (1) as well as relative motion (the speed of light squared). 

It's worth noting that even if we can't directly calculate the exact speed of light in a vacuum using modern instruments and techniques, scientists often rely on estimates like those mentioned above.
```

To exit the running model context, type `/bye` and return to the command line. Ollama run is a versatile command that executes prompts directly within the terminal, facilitating quick and efficient interactions with your models.

### Ollama list

The Ollma list command lists all the open models pulled (downloaded) from Ollama’s registry and saved to your machine. When I ran `ollama list` on my machine, I got the following output:

```bash/0
ollama list    
NAME                           ID                 SIZE      MODIFIED   
deepseek-r1:8b    28f8fd6cdc67      4.9 GB     4 days ago    
smollm2:135m      9077fe9d2ae1    270 MB    4 days ago    
```

So, I have two models, `smollm2:135m` and `deepseek-r1:8b`, which are 270MB and 4.9 GB, respectively.

### Ollama pull

You can download other models from the Ollama registry on your machine using the `ollama pull` command. For instance, if you want to pull in Qwen 2.5 half a billion parameter model (398 MB), you can execute:

```bash
ollama pull qwen2.5:0.5b
```

That will result in something like:

```bash/0
ollama pull qwen2.5:0.5b

pulling manifest
pulling c5396e06af29... 100% ▕██████████████████████████▏ 397 MB
pulling 66b9ea09bd5b... 100% ▕██████████████████████████▏   68 B
pulling eb4402837c78... 100% ▕██████████████████████████▏ 1.5 KB
pulling 832dd9e00a68... 100% ▕██████████████████████████▏  11 KB
pulling 005f95c74751... 100% ▕██████████████████████████▏  490 B
verifying sha256 digest
writing manifest
success
```

It will take some minutes, depending on your internet speed. If you run `ollama list` after pulling the Qwen model, it will be listed too like below:

```bash/0
ollama list
NAME                   ID            SIZE      MODIFIED       
qwen2.5:0.5b      a8b0c5157701       397 MB    50 seconds ago    
deepseek-r1:8b    28f8fd6cdc67       4.9 GB    4 days ago        
smollm2:135m      9077fe9d2ae1       270 MB    4 days ago    
```

Similarly, running the Qwen model now will run directly rather than downloading and running it after downloading. You can also look at the CLI tab running `ollama serve` to see all the API calls these commands make in the background. Ollama pull seamlessly downloads and integrates pre-trained models from the vast Ollama model library to be used on your machine.

### Ollama ps

Like other `ps` commands that list processes, the `ollama ps` command will list running models. For this, you will first need to run a model; you can run the Qwen2 0.5 B parameters model with `ollama run qwen2.5:0.5b`. Then, in a new CLI tab, you can run `ollama ps`, which will give an output similar to the following:

```bash/0
ollama ps
NAME            ID              SIZE      PROCESSOR    UNTIL              
qwen2.5:0.5b    a8b0c5157701    1.4 GB    100% GPU     4 minutes from now  
```

To exit the run context, type `/bye` to return to the command line.

### Ollama create

With the `ollama create` command, you can create a new variant of an existing open model. For example, you will create a new variant of the `smollm2:135m` parameter model with a context window of 16K, and the temperature (creativeness) is set to 0.1, which is significantly less creative. To do this, first, you will create a Model file named `Modelfile-smollm2-16k` in your current folder with the following content:

```bash
FROM smollm2:135m

PARAMETER temperature 0.2
PARAMETER num_ctx 16384
```

Like Docker, you are saying to start from the `smollm2:135m`, set the `temperature` parameter to `0.2`, and set the context with the `num_ctx` parameter to `16384`. 

Now, to create a new model named `smollm2:135m-16k-ctx` you will run the following command:

```bash
ollama create smollm2:135m-16k-ctx -f Modelfile-smollm2-16k
```

It will create a new variant of the Smollm2 135 million parameter model following the instructions in the model file. If you run `ollama list`, you will see the new model on the list. Then, to run the new model, you can execute `ollama run smollm2:135m-16k-ctx` as seen below:

<img class="center" src="/images/ollama-commands/06ollama-create.jpg" loading="lazy" title="Output of ollama create a new model with 0.2 temperature and context window of 16K tokens" alt="Output of ollama create a new model with 0.2 temperature and context window of 16K tokens">

In the running model context, where you can type `/?` for help, if you type in `/show info` you will see the following output:

```bash/0
/show info
  Model
    architecture        llama      
    parameters          134.52M    
    context length      8192       
    embedding length    576        
    quantization        F16        

  Parameters
    temperature    0.2               
    num_ctx        16384             
    stop           "<|im_start|>"    
    stop           "<|im_end|>"      

  System
    You are a helpful AI assistant named SmolLM, trained by Hugging Face    

  License
    Apache License               
    Version 2.0, January 2004
```

This means the two parameters specified in the Model file,  `temperature` and context window with `num_ctx`, are applied to the model. Because the temperature is set to a low value `0.2`, if you ask this model variant, `why is the sky blue? give me 1 sentence answer.` even 3 times consecutively; it will give you almost the same answer as seen below:

<img class="center" src="/images/ollama-commands/07ollama-sky-blue.jpg" loading="lazy" title="Output of ollama why is the sky blue, same answer as the temperature is only 0.2" alt="Output of ollama why is the sky blue, same answer as the temperature is only 0.2">

Next, you will learn about some other Ollama commands.

### Other Ollama commands

If you can pull a model, you can `push` a model to the Ollama registry. For this, you will need an Ollama account and API keys to [share your model](https://github.com/ollama/ollama/blob/main/docs/import.md#sharing-your-model-on-ollamacom) on Ollama.

Similarly, you can copy a model with `ollama cp` and remove a model with `ollama rm` followed by the model's name. You can also run `ollama show <model-name>` to see the configuration of the model; for example, `ollama show smollm2:135m` will show the following:

```bash/0
ollama show smollm2:135m 
  Model
    architecture        llama      
    parameters          134.52M    
    context length      8192       
    embedding length    576        
    quantization        F16        

  Parameters
    stop    "<|im_start|>"    
    stop    "<|im_end|>"      

  System
    You are a helpful AI assistant named SmolLM, trained by Hugging Face    

  License
    Apache License               
    Version 2.0, January 2004    
```

The above output is the same as running `/show info` when the model runs within the CLI. As the new versions of Ollama are released, it may have new commands. To learn the list of Ollama commands, run `ollama --help` and find the available commands.

Ollama commands are similar to [Docker commands](/blog/2022/05/docker-commands/), like pull, push, ps, rm. In the case of Docker, it works with Docker images or containers, and for Ollama, it works with open LLM models.

In the next part of this Ollama series, you will learn about the Ollama APIs. The CLI also uses these APIs; you will learn more about them so that another system can use them for LLM inference.

## Conclusion

In this comprehensive guide, you explored a wide range of essential Ollama commands, From `ollama serve` to `ollama run`, and from `ollama pull` to `ollam create`. By mastering these Ollama commands, you'll be well-equipped to harness the full potential of this powerful and easy-to-use framework, opening up a world of possibilities for your projects and applications. Whether you're a seasoned developer or just starting your journey into AI, Ollama and its commands will undoubtedly be invaluable assets in your toolkit. Keep learning!
