---
layout: post
title: "How to create a YouTube video chapters' timings generator using Gemini over Vertex AI"
date: 2024-09-06T19:45:37.000+11:00
comments: true
tags:
- AI
- Gen AI
- GCP
- Gemini
cover: "/images/youtube-chapters-timings-generator/01youtube-chapters-timings-generator.jpg"
pagetitle: "How to create a YouTube video chapters' timings generator using Gemini over Vertex AI"
description: "Learn to use Gemini Flash LLM over Vertex AI to generate YouTube video chapters timings automatically."
keywords: youtube video chapters timings generator, gemini, vertex ai, youtube video chapters, youtube video timings, youtube video chapters timings, youtube video chapters timings generator, youtube video chapters timings generator gemini, youtube video chapters timings generator vertex ai
---
While watching a long YouTube video have you felt like it would have been great to have relevant chapters? Especially for long podcasts or talks, you want to jump to the part that is most important and relevant to you but you need to pull the progress bar here and there to get to the crucial part. In this blog post, you will create a YouTube video chapters timing generator using Google’s Gemini LLM over Vertex AI, let’s get going!

<!-- more -->

<img class="center" src="/images/youtube-chapters-timings-generator/01youtube-chapters-timings-generator.jpg" title="How to create a YouTube video chapters' timings generator using Gemini over Vertex AI" alt="How to create a YouTube video chapters' timings generator using Gemini over Vertex AI">

## YouTube video chapters a huge time-saver

It is no secret that YouTube [video chapters](https://support.google.com/youtube/answer/9884579?hl=en) is a huge time saver for your audience. Be it a long 2-hour podcast or a 40-minute talk video if the video has relevant chapters your audience can jump to the parts that are most meaningful for them.

Creating chapter data manually is a tedious and time-consuming task. You will need to sit down with something to take notes be it pen and paper or your mobile phone’s notes app. Then play the video and move the progress bar here and there to note down the timings from the video to list them down as chapters. What if there was an automated and easier way to do this, why can’t an LLM like Gemini which now has a 2 million context window?

In February, the 1M context window for Gemini 1.5 pro could process 1 hour of video so with a 2M context window it should be able to process 2 hours of content. Even Gemini 1.5 flash has a 1M context window. So, technically your YouTube video could be 2 hours long and Gemini 1.5 Pro with the 2M context window should be able to generate chapter timings for it.

## Prerequisites

To begin, you will need to have the following pre-requisites sorted:

* Have a working Google Cloud Account (with some credit, processing long videos requires some GCP credit)
* Have at least one video on your YouTube account that you want to generate chapter data for

It will be wise to be aware of [Vertex AI Pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing) with the models on offer.

Next, you will create a GCP project to build your YouTube video chapter timings generator. You need 10-20 minutes to create the basic version and have a proof of concept code for it as shown below.

## Vertex AI on your GCP Project

Below are the steps to create a new GCP project (if you have an existing one you can use that too).

1. Go to your Google Cloud Console and [Create a new project](https://console.cloud.google.com/projectcreate) called `yt-chapters` or anything relevant as seen below:

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/02new-gcp-project.jpg" title="Create a new GCP project for YouTube video chapters' timings generator using Gemini over Vertex AI" alt="How to create a YouTube video chapters' timings generator using Gemini over Vertex AI">

2. Make sure you have selected the project created in Step 1 if you have multiple projects. You can do this by clicking on the project name on the top left corner of your Google Cloud Console.

3. Go to Vertex AI from your Google Cloud Console, the easiest way to do it would be to search for `vertex` on the search bar as seen below:

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/03search-vertex.jpg" title="Search for vertex and click Vertex AI" alt="Search for vertex and click Vertex AI">

4. Click on `Vertex AI` 5. On the Vertex AI page, then click "Agree & Continue" as seen below :

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/04vertex-agree.jpg" title="Click on agree and continue on Vertex AI page" alt="Click on agree and continue on Vertex AI page">

5. After that on the Vertext AI page click on “Enable All Recommended APIS” as follows (it will take some time):

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/05vertex-enable-apis.jpg" title="Enable recommened APIs on Vertex AI page" alt="Enable recommened APIs on Vertex AI page">

6. After the APIs are enabled, click on `Freeform` found on the left menu

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/06vertex-freeform.jpg" title="Go to Freeform on Vertex AI page" alt="Go to Freeform on Vertex AI page">

## Crafting the prompt

7. Now you can add a prompt in the `Prompt` text box that will generate the YouTube video chapter timings as follows:

```
Please provide relevant chapter information to put on YouTube 
description for this video with timings for the start of the chapter
and do not add any formatting. If you are not sure about any info,
please do not make it up. Give the output with the timings first and
the chapter name after that.
```

You can edit the prompt to suit your needs.

8. Then turn off the `Markdown` slider and keep your mouse cursor at the start of the prompt. You can only use your own YouTube videos (or you get the following error “Must enter a YouTube video that you own”), to link the YouTube Video click on `Insert Media` and select the `YouTube video URL` option as follows:

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/07vertex-link-youtube-video.jpg" title="Link YouTube video with Vertex AI to use with Gemini" alt="Link YouTube video with Vertex AI to use with Gemini">

9. After that, paste the URL of a video that you is on your channel and then click the `Validate` button, once the ownership is verified you can `Insert` the video as follows:

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/08vertex-insert-youtube-video.jpg" title="Insert YouTube video with Vertex AI to use with Gemini" alt="Insert YouTube video with Vertex AI to use with Gemini">

10. Given your YouTube video is included in the prompt it will look like the below:

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/09video-added-to-prompt.jpg" title="YouTube video added to Vertex AI prompt to use with Gemini Flash" alt="YouTube video added to Vertex AI prompt to use with Gemini Flash">

## Saving the prompt

11. At this point you can save your prompt for further use, to save it click on `Save` on the top right corner and give it a name like `yt-timings`:

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/10vertex-save-prompt.jpg" title="Save prompt on Vertex AI to reuse later" alt="Save prompt on Vertex AI to reuse later">

You can use the saved prompt from the `Saved Prompts` tab on the left menu later.

## Configuring the model and parameters

12. Let’s look into the configuration a bit, First select `gemini-1.5-flash-001` as the model. if you want the chapter timings to be less random you can set the temperature to be `0.1`

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/11vertex-model-temp.jpg" title="Select Gemini Flash and set temprature to 0.1" alt="Select Gemini Flash and set temprature to 0.1">

13. It will be good to play around with the `Advanced` config of `Top-p` to fine-tune your result. I used `0.5` and it worked well for me:

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/12gemini-flash-top-p.jpg" title="Set Gemini Flash top p to 0.5" alt="Set Gemini Flash top p to 0.5">

You can learn more about the configuration like temperature, top-K, etc in this blog post about [Product description generator](/blog/2024/04/gemini-ecommerce-product-description-generator/#gemini-configurations).

## Generating and saving chapter information

14. I am not covering safety settings for this tutorial. Now you can click on the `>` button to see what chapter timings Gemini Flash generates for your video, keep in mind depending on the length of the video it will take time and also use up your Google Cloud Credit:

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/13chapters-timings-generated.jpg" title="Prompt on Vertex AI with Gemini Flash worked to generate YouTube Video chatpers' timings" alt="Prompt on Vertex AI with Gemini Flash worked to generate YouTube Video chatpers' timings">

It took a minute or more for me to get the response.

15. Now you can copy the response and paste it on your YouTube video description in YouTube Studio, save it and your viewers can benefit from the “generated” chapter information

<img class="center" loading="lazy" src="/images/youtube-chapters-timings-generator/14update-video-desc.jpg" title="Update video description on YouTube Studio with chapters' timings information" alt="Update video description on YouTube Studio with chapters' timings information">

This is the [video](https://www.youtube.com/watch?v=L5DN8ztZ3Ko) I used for this tutorial and I did edit the chapter’s information a bit to make it better. You can delete the video from the prompt and link another YouTube video then generate the chapter information for that one too.

Amazing! There you have a fully reusable YouTube video chapter timings generator using your own YouTube video. For all the experiments I did to generate video chapter timings using Gemini Flash over Vertext AI it cost me 35 cents. Google Cloud credits are provided for this project and blog post, thanks to Google for that, it is part of the #AISprint .

As LLMs give out probabilistic output than deterministic, the output is a good starting point. As a human, you will need to crosscheck and edit the output to fit your needs. The same thing applies to the chapter information generated by Gemini.

I used it for a podcast video and interestingly enough it can generate chapter information even when there are no visual queues in the video. So it can use the transcribed captions too for generating the chapter information. This was the [podcast video](https://www.youtube.com/watch?v=hU3rjY0MRVc) I used to generate chapters.

You can also click the `Get Code` and play around with it, you can look at an example of generating and running the code in this [example](/blog/2024/04/gemini-ecommerce-product-description-generator/#run-generated-python-code) with Gemini and Vertex AI.

## Conclusion

In this blog post, you created a YouTube video chapter timings generator using Gemini Flash over Vertext AI. If your videos are longer you can use Gemini Pro which has a 2 million context window and it is more expensive than the Flash version.

You started by creating a prompt useful to generate video chapter timings and used it to generate chapters for one video.

> Take this as scratching the surface, as the LLM has the context of the video’s content you can also craft a prompt to generate a compelling and SEO-optimized video description.

Use AI as a tool to simplify your day-to-day tasks. Keep exploring and learning!
