---
layout: post
title: "How to create a text summarizer using Gemini over Vertex AI with Node.js a step-by-step guide [Part 1]"
date: 2024-02-21T23:45:42.000+11:00
comments: true
tags:
- AI
- Gen AI
- Node.js
- GCP
cover: "/images/gemini-vertex-ai-nodejs/01gemini-vertex-ai-nodejs.jpg"
pagetitle: "How to create a text summarizer using Gemini over Vertex AI with Node.js a step-by-step guide [Part 1]"
description: "Learn how to create a simple summarizer with Gemini API on Vertex AI with Node.js that runs on the CLI."
keywords: Gemini, Gemini api, vertex ai, gemini node.js, vertex ai nodejs, vertex ai node.js, google gemini, gemini pro nodejs
---
Gemini by Google is a powerful multimodal Large Language Model (LLM) capable of taking images, videos, and text as input and generating text and images. [Gemini](https://gemini.google.com/) has 3 versions Nano, Pro, and Ultra. For this post, you will use Gemini Pro 1.0 via [Vertex AI](https://cloud.google.com/vertex-ai) to create an API that takes a URL as an input and gives out a summary of the page’s content using Node.js, let’s get started!

<!-- more -->

<img class="center" src="/images/gemini-vertex-ai-nodejs/01gemini-vertex-ai-nodejs.jpg" title="How to create a text summarizer using Gemini over Vertex AI with Node.js a step-by-step guide [Part 1]" alt="How to create a text summarizer using Gemini over Vertex AI with Node.js a step-by-step guide [Part 1]">

## Table of contents

* [Prerequisites](#prerequisites)
* [Summarizer with Gemini API on Vertex AI](#summarizer-with-gemini-api-on-vertex-ai)
* [Run the summarizer in the CLI with Node.js](#run-the-summarizer-in-the-cli-with-nodejs)
* [Next steps](#next-steps)
* [Conclusion](#conclusion)

## Prerequisites

Before getting your hands dirty with the code, below are some prerequisites you should have:

* You should have a running Google Cloud Account, GCP gives $300 [free](https://cloud.google.com/free) for 90 days for new accounts. Be aware of the [Vertex AI pricing](https://cloud.google.com/vertex-ai/pricing) for Gemini APIs.
* A basic understanding of Node.js and the NPM package manager is expected. You should have Node and NPM CLIs running on your local. The code has been tested with Node 20.x.
* You have the `gcloud` [cli](https://cloud.google.com/sdk/gcloud) working on your machine.
* Some git knowledge will be good to have but not required

Next, you will start using the Gemini Pro API over Vertex AI.

## Summarizer with Gemini API on Vertex AI

Given the prerequisites are mentioned, the first task for you is to test out the summarizer app on Vertex AI. To do ths, you will first login to your Google Cloud Platform [console](https://console.cloud.google.com/) and create a new project as follows on the [Project Create](https://console.cloud.google.com/projectcreate) page:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/02gcp-create-project.jpg" title="Create a new GCP project" alt="Create a new GCP project">

You can name the project `gemini-api` as seen above and click the “Create” button selecting the right billing account (and organization if you have any relevant one).

It will take some time and the project will be created with a notification about it, you can select the project from the notification (under the bell icon) as seen below:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/03gcp-select-project.jpg" title="Select your newly created GCP projct to use it for building the summarizer" alt="Select your newly created GCP projct to use it for building the summarizer">

After that, search for `vertex ai` on the search bar and click the `Vertex AI` option from the inline search results as follows:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/04vertex-ai-search.jpg" title="Search for vertex ai on the GCP console search bar" alt="Search for vertex ai on the GCP console search bar">

On the Vertex AI page, at the left sidebar scroll a bit down and click the `Language` option `Vertex AI Studio`, you will be given the option to enable the Vertex AI APIs for the project as seen below:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/05enable-apis.jpg" title="Enable the Vertex AI APIs to use Gemini 1.0 Pro LLM" alt="Enable the Vertex AI APIs to use Gemini 1.0 Pro LLM">

Click `Enable` on the above screen, it will show `Enabled` with a green tick then close it, and then in the second overlay click “Agree and Continue” as follows

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/06vertex-ai-studio-agree.jpg" title="Agree the Vertex AI terms and conditions to move head" alt="Agree the Vertex AI terms and conditions to move head">

After that, click `Text Prompt` in the Generate text card found below “Create New Prompt” as seen below:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/07text-prompt.jpg" title="Select text prompt to create a summarizer" alt="Select text prompt to create a summarizer">

In the screen that has the `Prompt` text box paste the following:

```js
As an expert writer with more than a decade of experience please summarize the following in under 125 words words. You are allowed to rephrase given the summary means the same as the original text:

The TerraCycle Global Foundation reached an impressive milestone last month, announcing that they’ve removed over 2 million pounds of waste from rivers, canals, and waterways.

Since its founding, the nonprofit organization has targeted ocean pollution right at its source—waterways. When polluted, they send waste directly to oceans, harming sea life and the environment. Over 1000 tons have been diverted and recycled.

And, because the Foundation is founded by New Jersey-based TerraCycle—a two decades-old company known for turning plastic waste into useful items for sale—none of the litter collected ever goes to waste. (See a link to their cool bracelets below.)

Operating in canals throughout Bangkok, Thailand, TerraCycle’s “world-class river waste prevention systems” are implemented with the local community and governments to address the complex challenge of collecting waste before it enters and pollutes global aquatic systems.

The Foundation is currently operating wildlife-safe river traps in Thai canals to recover waste directly from the water. The waste is then sorted, and plastics are separated and recycled.

“We take a holistic approach to reducing plastic waste in waterways,” said James Scott, Executive Director of the TerraCycle Global Foundation. “Our operations provide safe, stable employment for members of the local Lat Phrao community in Bangkok while creating cleaner and healthier environments for communities along the canal.”

TerraCycle Global Foundation’s River Trap
“Reaching this waste removal milestone is only the beginning of the Foundation’s work to clean our oceans and preserve the planet.”

CHECK OUT: Ocean CleanUp Launches Huge System in Pacific Garbage Patch to Clean a Football Field Every 5 Seconds

Indeed, last year the Foundation made a Clinton Global Initiative ‘Commitment to Action’, with a project that prevents ocean waste. They pledged to replicate and scale its successful canal cleanup model in a new region in Southeast Asia, and establish a material recovery center as a central hub for waste management and educational programs.

Check out all the recycling going on at TerraCycle, especially their cool beaded bracelets that help collect 20-lbs of plastic waste with proceeds from every purchase—and 100% of it is made from diverted litter.
```

The above text is from a news story on [Good News Network](https://www.goodnewsnetwork.org/nonprofit-diverts-an-ocean-plastic-tide-removing-2-million-pounds-of-trash-from-waterways/) and the magic sauce, the prompt is:

```js
As an expert writer with more than a decade of experience please summarize the following in under 125 words words. You are allowed to rephrase given the summary means the same as the original text:
```

After you paste it, click the `Submit` button toward the end of the page and it will look as follows after the summarization is done:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/08vertex-ai-gemini-pro-summary.jpg" title="Text summary generated on Vertex AI with Gemni 1.0 Pro model" alt="Text summary generated on Vertex AI with Gemni 1.0 Pro model">

Hurray! You have created a useful summarizer with very little effort in almost no time. You can click the `pencil` icon and save it if you like.

Make sure that the model is `Gemini 1.0 Pro` and you can change the region as per your choice. If you like you can play around with the other parameters like temperature to fine-tune your output. You are also welcome to peep into the `Advance settings` like Top-K and Top-P to get a better result. You can learn more about them in this blog post about these [LLM parameters](https://ivibudh.medium.com/a-guide-to-controlling-llm-model-output-exploring-top-k-top-p-and-temperature-parameters-ed6a31313910). You can also update the `Safety Settings` if you would like to block things like hate speech, dangerous content, etc.

In the next section, you will pull in the code provided to make the summarizer work in the CLI.

## Run the summarizer in the CLI with Node.js

It is good that your proof concept is running on Vertex AI but your users cannot use it just like that. For that, you will need some code to eventually expose your summarizer as an API to your ultimate users. Vertex AI has some generated code available to make your POC into a working app. To get the code, click the `Get Code` link toward the top right of the vertex AI studio page:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/09vertex-ai-get-code.jpg" title="Vertex AI get code button" alt="Vertex AI get code button">

Then click `Node.js` as this is a Node.js example on the slider that comes on the right side of your screen:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/10vertex-ai-nodejs-code.jpg" title="Vertex AI Node.js code sample for your simple text summarizer" alt="Vertex AI Node.js code sample for your simple text summarizer">

After that, go to a directory and create a new directory named `summarizer-gemini`, which on a Nix-based system will be `mkdir summarizer-gemini` the to go to the directory `cd summarizer-gemini`.

In that folder, run `npm init -y` and you will see something like the below:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/11npm-init.jpg" title="Result of npm init to initiate a Node.js project" alt="Result of npm init to initiate a Node.js project">

After that, you can run the following commands as seen on the Vertex AI’s get code slider:

```bash
npm install @google-cloud/vertexai
```

This command will install the Google Cloud’s Vertex AI NPM package on your local machine. That will look like the following when completed:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/12npm-install-gcp-vertex-ai.jpg" title="Installing the GCP Vertex AI npm package" alt="Installing the GCP Vertex AI npm package">

Subsequently, run the following to log in to your Gcloud account from your CLI:

```bash
gcloud auth application-default login
```

This will open a browser to allow the Google Auth library to access your GCP account from your CLI.

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/13gcp-sign-in.jpg" title="Sign into GCP after running gcloud auth" alt="Sign into GCP after running gcloud auth">

Then you will need to allow the Google Auth Library

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/14gcp-allow.jpg" title="Allow GCP gcloud auth to access your Google account details" alt="Allow GCP gcloud auth to access your Google account details">

Once that is done you can copy page the whole code that begins with:

```js
const {VertexAI} = require('@google-cloud/vertexai');
```

To a file named `cli.js` in the folder you are in, it will look something like the below when done correctly:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/15vscode-cli-js.jpg" title="File structure for cli.js in VS Code" alt="File structure for cli.js in VS Code">

Now in your CLI, you can run `node –no-warnings  cli.js`, it will show you an output similar to the following:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/16cli-output-stream.jpg" title="Streamed output of the sample code copied from the Vertex AI Studio interface" alt="Streamed output of the sample code copied from the Vertex AI Studio interface">

As the output is streamed, it is not very useful to be used in the CLI. Now, you can change the `generateContent` function to look like the below to make it a sync call rather than a streaming one:

```js
async function generateContent() {
  const prompt = 'As an expert writer with more than a decade of experience please summarize the following in under 125 words words. You are allowed to rephrase given the summary means the same as the original text:\n\n';
  const req = {
    contents: [{ role: 'user', parts: [{ text: `${prompt}The TerraCycle Global Foundation reached an impressive milestone last month, announcing that they’ve removed over 2 million pounds of waste from rivers, canals, and waterways.\n\nSince its founding, the nonprofit organization has targeted ocean pollution right at its source—waterways. When polluted, they send waste directly to oceans, harming sea life and the environment. Over 1000 tons have been diverted and recycled.\n\nAnd, because the Foundation is founded by New Jersey-based TerraCycle—a two decades-old company known for turning plastic waste into useful items for sale—none of the litter collected ever goes to waste. (See a link to their cool bracelets below.)\n\n\nOperating in canals throughout Bangkok, Thailand, TerraCycle’s “world-class river waste prevention systems” are implemented with the local community and governments to address the complex challenge of collecting waste before it enters and pollutes global aquatic systems.\n\nThe Foundation is currently operating wildlife-safe river traps in Thai canals to recover waste directly from the water. The waste is then sorted, and plastics are separated and recycled.\n\n“We take a holistic approach to reducing plastic waste in waterways,” said James Scott, Executive Director of the TerraCycle Global Foundation. “Our operations provide safe, stable employment for members of the local Lat Phrao community in Bangkok while creating cleaner and healthier environments for communities along the canal.”\n\n\nTerraCycle Global Foundation’s River Trap\n“Reaching this waste removal milestone is only the beginning of the Foundation’s work to clean our oceans and preserve the planet.”\n\nCHECK OUT: Ocean CleanUp Launches Huge System in Pacific Garbage Patch to Clean a Football Field Every 5 Seconds\n\nIndeed, last year the Foundation made a Clinton Global Initiative ‘Commitment to Action’, with a project that prevents ocean waste. They pledged to replicate and scale its successful canal cleanup model in a new region in Southeast Asia, and establish a material recovery center as a central hub for waste management and educational programs.\n\nCheck out all the recycling going on at TerraCycle, especially their cool beaded bracelets that help collect 20-lbs of plastic waste with proceeds from every purchase—and 100% of it is made from diverted litter.` }] }],
  };

  const resp = await generativeModel.generateContent(req);
  const summary = resp.response?.candidates[0]?.content?.parts[0]?.text;

  console.log(summary);
};
```

Let’s analyze the things that changed. First, you introduced a const called `prompt` that has the prompt to summarize the text. This makes separating the prompt from the text to work on. Then you used it as part of the request.

In place of the `generateContentStream` you have replaced it with the `generateContent` to get the final result compared to following a stream approach. You can configure the request params as per the official [docs](​​https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini#gemini-pro). After the response is received, you pull out the text and print it on the screen with a `console.log`. It looks like the following when you again run `node –no-warnings cli.js`:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/17cli-output-sync.jpg" title="Better one shot non-streamed output after changing the code to work in a sync manner" alt="Better one shot non-streamed output after changing the code to work in a sync manner">

You need the `--no warnings` to not print any warnings about the fetch object. There you have a basic example of creating a summarizer in your CLI.

## Next steps

For this post, it will feel a bit static and restricted. To change the input text to get a summary you will need to change the file and run the command again. Thereby, in the next part of this series, you will be able to input a URL to an API. Then the system will scrape the text from that URL and then summarize it.

It will involve some code refactoring and restructuring to make the code reusable, stay tuned for part 2 where you will convert this code to a more flexible solution with an Express JS API. If you are eager to look at the API code, it is available as an open-source [GitHub repository](https://github.com/geshan/summarizer-gemini).

## Conclusion

In this post, you learned how to play around with the Vertex AI interface to create a Gemini Pro 1.0 powered summarizer. Then, you pulled in the code to your local on a `cli.js` file and changed the code to give a synchronous output compared to a streaming one. I hope it was a good start, more goodness to follow in the next part. Keep exploring Gen AI and Gemini!
