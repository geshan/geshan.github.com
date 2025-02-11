---
layout: post
title: "Using Ollama APIs to generate responses and much more [Part 3]"
date: 2025-02-09T22:47:32.000+11:00
comments: true
tags:
- AI
- Gen AI
- Ollama
cover: "/images/ollama-api/01ollama-api.jpg"
pagetitle: "Learn how to use Ollama APIs like generate, chat and more with cURL and Jq with useful examples"
keywords: ollama api, ollama apis, ollama api endpoints, ollama generate, ollama chat, ollama pull
---
Ollama is open-source software that makes running most open LLMs seamlessly on your own machine (or even on the cloud). Written in Go lang, Ollama is user-friendly and easy to start. In this post, part 3 of the Ollama blog posts series, you will learn about using Ollama’s APIs for generating responses (LLM inference) and much more; let’s get going!

<!-- more -->

<img class="center" src="/images/ollama-api/01ollama-api.jpg" title="Using Ollama APIs to generate responses and much more [Part 3]" alt="Using Ollama APIs to generate responses and much more [Part 3]">

## Table of contents

- [Quick review of the Ollama series](#quick-review-of-the-ollama-series)
- [Curl and Jq](#curl-and-jq)
- [Ollama API Endpoints](#ollama-api-endpoints)
  - [Generate endpoint](#generate-endpoint)
  - [Chat endpoint](#chat-endpoint)
  - [List models](#list-models)
  - [Pull a model](#pull-a-model)
  - [Show model information](#show-model-information)
  - [Other Ollama APIs](#other-ollama-apis)
- [Important caveat](#important-caveat)
- [Conclusion](#conclusion)

## Quick review of the Ollama series

This blog post is part 3 of the Ollama series. In the first part, you learned about [what Ollama is](/blog/2025/02/what-is-ollama/#what-is-ollama), including its [features](/blog/2025/02/what-is-ollama/#ollama-features) and also [how to run Ollama](/blog/2025/02/what-is-ollama/#how-to-run-ollama-locally) on your local machine with a couple of models.

In part two, you explored some useful [Ollama commands](/blog/2025/02/ollama-commands/), like [ollama serve](/blog/2025/02/ollama-commands/#ollama-serve) to start Ollama and serve available models, [ollama run](/blog/2025/02/ollama-commands/#ollama-run) to pull (download) and run a model.

In this part, you will learn about the Ollama APIs. In addition to the inference API endpoints `/api/generate` and `/api/chat`, you will also learn about other useful API endpoints. The Ollama commands call these APIs behind the scenes to provide the outputs.

In the next part, part 4, you will learn how to run [Ollama in Docker](/blog/2025/02/ollama-docker-compose/) with Docker Compose. You will also add Open WebUI with Docker Compose to have a WebUI to interact with LLMs running on Ollama.

## Curl and Jq

For this guide, you will use cURL to call the APIs with [Jq](https://jqlang.org/). To install JQ, follow their official [download](https://jqlang.org/download/) guides for instance, on a Mac, you can run `brew install jq`, similarly on an Ubuntu machine, you can execute `sudo apt-get install jq` on a Windows machine, you can use chocolatey. Or you can get the binary and make it executable, too.

You can use other programming languages, such as Python and JavaScript, with the official libraries for [Python](https://github.com/ollama/ollama-python) and [JavaScript](https://github.com/ollama/ollama-js), and frameworks like [LiteLLM](https://docs.litellm.ai/docs/providers/ollama) or [LangChain](https://python.langchain.com/docs/integrations/llms/ollama/) to call the Ollama APIs.

## Ollama API Endpoints

There are more than 10 Ollama API endpoints. This tutorial will focus on some of the most important ones. To use the APIs, you will need Ollama to run either with `ollama serve` or as a service. You will also need at least one model pulled for the API calls.

For this guide, you will use [smollm2](https://github.com/huggingface/smollm):135m, one of the smaller LLMs at 221 MB. You can use any bigger model if it runs on the available resources. The reason to choose `smollm2:135m` is because most machines, even with 512 MB or memory, can run it.

To start, run `ollama serve,` in another CLI tab, and run `ollama pull smollm2:135m`. If you have pulled `smollm2:135m` from the previous parts of this tutorial series, the download will be very fast as the files already exist.

### Generate endpoint

As the name points out, this API endpoint is available at `/api/generate` you can POST data to generate a response from the selected model for the provided prompt. It responds as a stream by default; you can configure it to return all the responses in one go and not as a stream. It has four parameters:

* model: the model's name, for example, `smollm2:135m`, is a required parameter.
* prompt: is the prompt you want to send to the selected model like `Why is the sky blue?`
* suffix: can be used if you want to append some text after the response
* images: a list of base64-encoded images if you want to use it with multimodal models like Llava or SmolVLM.

There are other advanced parameters, too, like `stream,` which you can read about in the official [docs](https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-completion). For now, you can run the following curl command to get a response from `smollm2:!35m` model:

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "smollm2:135m",
  "prompt": "Why is the sky blue? Give the shortest answer possible in under 20 words",
  "stream": false
}' | jq .
```

In the above `curl` command, you are using the `/api/generate` API endpoint and asking about the `smollm2:135m` model. `Why is the sky blue? Give the shortest answer possible in under 20 words`, and ask Ollama not to stream the output, so give the full answer in one go. Then, the output is piped to `jq`. This gives the following output:

```json
{
  "model": "smollm2:135m",
  "created_at": "2025-02-08T11:02:55.115275Z",
  "response": "The sky's clear and deep color due to tiny oxygen molecules (O2) scattering the sun's light allowing us to perceive it as blue.",
  "done": true,
  "done_reason": "stop",
  "context": [
    //a long array of numbers here
  ],
  "total_duration": 302810709,
  "load_duration": 13315375,
  "prompt_eval_count": 47,
  "prompt_eval_duration": 132000000,
  "eval_count": 30,
  "eval_duration": 156000000
}
```

If you were calling this API from another script or software system, you would be more concerned about the `response` column. If you just want to see the response from the model, you can use `jq` for that in the following way:

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "smollm2:135m",
  "prompt": "Why is the sky blue? Give the shortest answer possible in under 20 words",
  "stream": false
}' | jq '.["response"]'
```

You are asking `jq` to show only the `response` attribute from the JSON response rather than the whole response. It will look as follows:

<img class="center" src="/images/ollama-api/02ollama-generate-api.jpg" loading="lazy" title="Output of calling the ollama generate API endpoint with cURL and jq" alt="Output of calling the ollama generate API endpoint with cURL and jq">

You can make many types of requests on the generated API endpoint. One useful one is [structured output](https://github.com/ollama/ollama/blob/main/docs/api.md#request-structured-outputs), where you can specify the output structure as a JSON object. Using the seed option, you can have [reproducible outputs](https://github.com/ollama/ollama/blob/main/docs/api.md#request-reproducible-outputs). If you provide an empty prompt, the model is loaded into memory. It would be advisable that you read the official [docs](https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-completion) about the `generate` endpoint.

### Chat endpoint

The chat endpoint available at `/api/chat`, which also works with POST, is similar to the `generate` API. It generates the next message in a chat with a selected model. It is a streaming endpoint that will have a series of responses. You can turn off the streaming with the `”stream::false` parameter as seen below: 

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "smollm2:135m",
  "stream":false,
  "messages": [
    {
      "role": "user",
      "content": "Why is the sky blue? Give the shortest answer possible in under 20 words"
    }
  ]
}' | jq .
```

The output of the above cURL will be similar to the following:

```json
{
  "model": "smollm2:135m",
  "created_at": "2025-02-08T11:22:15.229839Z",
  "message": {
    "role": "assistant",
    "content": "The sky appears blue because when sunlight passes through Earth's atmosphere, it contains tiny molecules like water vapor and oxygen. These molecules scatter shorter wavelengths of light (such as blue and violet) more than the longer wavelengths (like red and orange), making the sky appear blue to our eyes. Thank you for pointing this out!"
  },
  "done_reason": "stop",
  "done": true,
  "total_duration": 407998750,
  "load_duration": 6202542,
  "prompt_eval_count": 47,
  "prompt_eval_duration": 36000000,
  "eval_count": 65,
  "eval_duration": 363000000
}
```

As seen in the above response, the structure of the response is a bit different than the `generate` API endpoint. This one has a `message` attribute, which is an object, and a `content` attribute inside it. If you want to extract the content from the response using Jq, you can run the following command:

```bash
curl http://localhost:11434/api/chat -d '{
  "model": "smollm2:135m",
  "stream":false,
  "messages": [
    {
      "role": "user",
      "content": "Why is the sky blue? Give the shortest answer possible in under 20 words"
    }
  ]
}' | jq '.["message"]["content"]'
```

The extracted content from the response of the `/api/chat` will look as follows:

<img class="center" src="/images/ollama-api/03ollama-chat-api.jpg" loading="lazy" title="Output of calling the ollama chat API endpoint with cURL and jq" alt="Output of calling the ollama chat API endpoint with cURL and jq">

You can do [structured outputs](https://github.com/ollama/ollama/blob/main/docs/api.md#chat-request-structured-outputs) with the chat endpoint. Being a chat endpoint, you can send in the [history](https://github.com/ollama/ollama/blob/main/docs/api.md#chat-request-with-history) of the conversation to the the endpoint. For all the other types of reqeust, you can send to this `/api/chat` endpoint, it would be best to go through the [official Ollama docs](https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-chat-completion) about it.

### List models

To list the local models available, you can call the `/api/tags` endpoint, which works with a GET request. This endpoint lists models available locally that you can send as the model name parameter in the generate and chat endpoints. Below is an example call of this API:

```bash
curl http://localhost:11434/api/tags | jq .
```

It will output a JSON similar to the one seen below:

```json
{
  "models": [
    {
      "name": "smollm2:135m",
      "model": "smollm2:135m",
      "modified_at": "2025-02-08T15:33:44.760304367+11:00",
      "size": 270898672,
      "digest": "9077fe9d2ae1a4a41a868836b56b8163731a8fe16621397028c2c76f838c6907",
      "details": {
        "parent_model": "",
        "format": "gguf",
        "family": "llama",
        "families": [
          "llama"
        ],
        "parameter_size": "134.52M",
        "quantization_level": "F16"
      }
    },    
    {
      "name": "qwen2.5:0.5b",
      "model": "qwen2.5:0.5b",
      "modified_at": "2025-02-06T15:59:09.320362549+11:00",
      "size": 397821319,
      "digest": "a8b0c51577010a279d933d14c2a8ab4b268079d44c5c8830c0a93900f1827c67",
      "details": {
        "parent_model": "",
        "format": "gguf",
        "family": "qwen2",
        "families": [
          "qwen2"
        ],
        "parameter_size": "494.03M",
        "quantization_level": "Q4_K_M"
      }
    },
    {
      "name": "deepseek-r1:8b",
      "model": "deepseek-r1:8b",
      "modified_at": "2025-02-02T13:33:29.069046707+11:00",
      "size": 4920738407,
      "digest": "28f8fd6cdc677661426adab9338ce3c013d7e69a5bea9e704b364171a5d61a10",
      "details": {
        "parent_model": "",
        "format": "gguf",
        "family": "llama",
        "families": [
          "llama"
        ],
        "parameter_size": "8.0B",
        "quantization_level": "Q4_K_M"
      }
    }
  ]
}
```

I have these three models available on my machine. Your response might be slightly different, but the output structure will remain the same.

### Pull a model

To download a new model from Ollama [model registry](https://ollama.com/search) you can use the `/api/pull` API endpoint that works with a POST call. As the official doc states, canceled pulls are resumed, and in case of multiple pull calls they will share the same download progress.

A model name is required to pull a model, and you can choose to stream or not stream the response. Below is an example of calling the `/api/pull` endpoint without streaming to pull/download the `snowflake-arctic-embed:22m`, which is an embedding model at 46 MB:

```bash
curl http://localhost:11434/api/pull -d '{
  "model": "snowflake-arctic-embed:22m"
}' | jq .
```

It gives out a very long output with all the information about the pull (download) and ends with:

```json
{
  "status": "pulling 2977e9705f4b",
  "digest": "sha256:2977e9705f4b122813b1aeb50fc0c6563113da0b626f540c3daa8149827e30d3",
  "total": 333,
  "completed": 333
}
{
  "status": "verifying sha256 digest"
}
{
  "status": "writing manifest"
}
{
  "status": "success"
}
```

Given that the model is downloaded, the easiest way to verify this is by running the `ollama list` command, and you will see the `snowflake-arctic-embed:22m` on the list, a 45 MB model. Using this model, you can use the `/api/embed` endpoint to generate the embeddings.

### Show model information

By calling the '/api/show ' endpoint with a POST call, you can view the model information, including details, model file, template, parameters, license, and system prompt. The model name is a required parameter. Passing the `verbose` optional parameter will return the full data with verbose fields in the response. 

Below is an example call to the show model information endpoint without the verbose flag for the `smollm2:135m` model, some fields have been truncated for brevity:

```json
{
  "license": "\nApache License\n Version 2.0, January 2004...the full apache license here",
  "modelfile": "# Modelfile generated by \"ollama show\"\n# To build a new Modelfile based on this, replace FROM with:\n# FROM smollm2:135m\n\nFROM /path/to/.ollama/models/blobs/sha256-f535f83ec568d040f88ddc04a199fa6da90923bbb41d4dcaed02caa924d6ef57\nTEMPLATE \"\"\"template and parameter info here\nLICENSE \"\"\"\nApache License\n    Version 2.0, January 2004...the full apache license here",
  "parameters": "stop\"<|im_start|>\"\nstop\"<|im_end|>\"",
  "template": "template info here",
  "system": "You are a helpful AI assistant named SmolLM, trained by Hugging Face",
  "details": {
    "parent_model": "/path/to/.ollama/models/blobs/sha256-f535f83ec568d040f88ddc04a199fa6da90923bbb41d4dcaed02caa924d6ef57",
    "format": "gguf",
    "family": "llama",
    "families": [
      "llama"
    ],
    "parameter_size": "134.52M",
    "quantization_level": "F16"
  },
  "model_info": {
    "general.architecture": "llama",
    "general.basename": "smollm2",
    "general.file_type": 1,
    "general.finetune": "8k-lc100k-mix1-ep2",
    "general.languages": [
      "en"
    ],
    "general.license": "apache-2.0",
    "general.organization": "HuggingFaceTB",
    "general.parameter_count": 134515008,
    "general.quantization_version": 2,
    "general.size_label": "135M",
    "general.type": "model",
    "llama.attention.head_count": 9,
    "llama.attention.head_count_kv": 3,
    "llama.attention.layer_norm_rms_epsilon": 0.00001,
    "llama.block_count": 30,
    "llama.context_length": 8192,
    "llama.embedding_length": 576,
    "llama.feed_forward_length": 1536,
    "llama.rope.dimension_count": 64,
    "llama.rope.freq_base": 100000,
    "llama.vocab_size": 49152,
    "tokenizer.ggml.add_bos_token": false,
    "tokenizer.ggml.add_space_prefix": false,
    "tokenizer.ggml.bos_token_id": 1,
    "tokenizer.ggml.eos_token_id": 2,
    "tokenizer.ggml.merges": null,
    "tokenizer.ggml.model": "gpt2",
    "tokenizer.ggml.padding_token_id": 2,
    "tokenizer.ggml.pre": "smollm",
    "tokenizer.ggml.token_type": null,
    "tokenizer.ggml.tokens": null,
    "tokenizer.ggml.unknown_token_id": 0
  },
  "modified_at": "2025-02-08T15:33:44.760304367+11:00"
}
```

Depending on the level of security needed for your Ollama instance, the show model API should not be accessible outside of the app.

### Other Ollama APIs

Other Ollama APIs can [list running models](https://github.com/ollama/ollama/blob/main/docs/api.md#list-running-models), [delete a model](https://github.com/ollama/ollama/blob/main/docs/api.md#delete-a-model) (you would not want someone to delete a pulled model), [create a model](https://github.com/ollama/ollama/blob/main/docs/api.md#create-a-model) from another model, [copy a model](https://github.com/ollama/ollama/blob/main/docs/api.md#copy-a-model), and even [generate embeddings](https://github.com/ollama/ollama/blob/main/docs/api.md#generate-embeddings). You can explore them all in the official [documents](https://github.com/ollama/ollama/blob/main/docs/api.md). 

Suppose you have used Postman and its collections. You can also use this [Postman collection](https://www.postman.com/postman-student-programs/ollama-api/documentation/suc47x8/ollama-rest-api) that lists most of the Ollama API calls in a neat, easy to test collection. In the next part (part 4) of the Ollama blog series, you will learn how to run Ollama in Docker with Docker Compose.

## Important caveat

If you plan to host Ollma on a publicly accessible URL or with some form of authentication and authorization, please remember to expose only the generate (`/api/generate`) and the chat  (`/api/chat`) endpoints. You will not want users to call the pull or even delete model API endpoints. 

You can do it by putting a reverse proxy in front of Ollama’s Gin server (running at port 11434, by default). You can choose between [Nginx reverse proxy](https://github.com/kesor/ollama-proxy) or [Caddy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy). With a reverse proxy, you can pass through only the traffic that comes to `/api/generate` and `/api/chat` forward to Ollama. As Ollama’s server is written in Go/Gin, you may even try that path to secure your APIs if you know how to write Go and Gin. There is an [issue](https://github.com/ollama/ollama/issues/1053) on the official Ollama GitHub repository about something similar if you want to follow that.

## Conclusion

In this post, you learned about some of the Ollama API endpoints, focusing on the ones that help you get a response from an open model. You learned about the Ollama API endpoints for pulling a model, listing models, and showing model information.

More importantly, you are aware of a crucial caveat: you should not expose all the available Ollama APIs to the outside world. If someone calls the delete model API endpoint, your Ollama API will stop functioning, so be careful. Keep learning!
