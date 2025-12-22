---
layout: post
title: "How to build your own resume reviewer with Google AI Studio in minutes"
date: 2025-11-14T21:48:25.000+11:00
comments: true
tags:
- Google AI Studio
- Google Cloud Run
- AI
- Gen AI
- GCP
- Gemini
cover: "/images/google-ai-studio-build/01google-ai-studio-build.jpg"
pagetitle: "How to build your own resume reviewer with Google AI Studio in minutes and deploy it on Google Cloud Run"
description: "Learn how to build your own resume reviewer with Google AI Studio in minutes and deploy it on Google Cloud Run."
keywords: google ai studio, resume reviewer, google cloud run, ai applications, large language models, llm, generative ai, ai tools, google cloud ai, google ai studio tutorial, google ai studio build guide
---
Using Google AI Studio’s build feature, you can build any frontend application by giving a prompt. The Build feature in AI Studio generates applications that use the Gemini SDK without any server-side components. The apps run in a sandboxed frame. For this post, you will create a tech resume reviewer that will score your resume out of 100 against a given job description. Let’s get started!

<!-- more -->

<img class="center" src="/images/google-ai-studio-build/01google-ai-studio-build.jpg" title="How to build your own resume reviewer with Google AI Studio in minutes and deploy it on Google Cloud Run" alt="How to build your own resume reviewer with Google AI Studio in minutes and deploy it on Google Cloud Run">

## Table of Contents

* [Google AI Studio](#google-ai-studio)
* [Steps to build a resume reviewer with Google AI Studio](#steps-to-build-a-resume-reviewer-with-google-ai-studio)
  * [Go to Google AI Studio](#go-to-google-ai-studio)
  * [Navigate to Build](#navigate-to-build)
  * [Input the intelligent resume reviewer prompt](#input-the-intelligent-resume-reviewer-prompt)
  * [Use the built app in preview mode](#use-the-built-app-in-preview-mode)
  * [Deploy the app on Google Cloud Run](#deploy-the-app-on-google-cloud-run)
* [Video](#video)
* [Resume reviewer Gemini Gem](#resume-reviewer-gemini-gem)
* [Conclusion](#conclusion)

## Google AI Studio

As Google defines it:

> Google AI Studio is the fastest way to start building with Gemini, our next generation family of multimodal generative AI models.

In short, it is an application that turns a prompt into an application prototype in minutes. It is a playground where you can test out your ideas, build apps, and even use the latest Gemini feature, like the live feature to share your screen or camera video, and ask questions about it. You can also build multimodal apps that can take an image or a video as input and generate images as output. There are lots of possibilities.

For the scope of this blog post, you will focus on the “Build” feature of Google AI Studio and generate a text input to text output application that takes in your tech resume and a job description, analyzes both, and gives your resume a score out of 100 against the job description. It also provides specific guidance on writing your position description using the [XYZ formula](https://www.tealhq.com/post/xyz-resume) to achieve the best results. You will build your own tech resume reviewer next.

## Steps to build a resume reviewer with Google AI Studio

To build a tech resume reviewer using the Google AI Studio’s Build feature. You will first need to go to the Google AI Studio app:

### Go to Google AI Studio

You can go to the Google AI Studio app by visiting [https://aistudio.google.com/](https://aistudio.google.com/) on your favourite browser. For this blog post, I am using Chrome with my Google account signed in. It will look like the following when you open Google AI Studio on your browser:

<img class="center" src="/images/google-ai-studio-build/02google-ai-studio-home.jpg" loading="lazy" title="Google AI Studio home page" alt="Google AI Studio home page">

Next, you will navigate to the build section of Google AI Studio.

### Navigate to Build

To go to the Build feature of Google AI Studio, you can click the `Build` menu item on the left navigation, as seen below:

<img class="center" src="/images/google-ai-studio-build/03google-ai-studio-build-link.jpg" loading="lazy" title="Google AI Studio build link" alt="Google AI Studio build link">

From there, you can give a prompt for the type of app you want Gemini to build, which is in the next section.

### Input the intelligent resume reviewer prompt

As you want to build an intelligent tech resume reviewer, you will use the prompt given below:

```
Build me an intelligent resume reviewer that analyses a resume against a job
description, providing actionable feedback and suggestions based on the 
proven XYZ formula to help you stand out. Both the resume and the job 
description are also uploaded as text.

Please take note of the following things when reviewing the resume:
1. The primary purpose of the resume is to get the initial call or 
email from the tech recruiter, who is a non-technical person 
2. Please make the resume appeal equally to the engineering manager 
and other technical leaders who will take the interviews in later rounds. 
3. Keep yourself in the position of the resume receiver and frame the 
bullet points in a way to accentuate how the candidate can add value 
to the organisation


Technically, please do the following: 
1. While uploading, show messages like "Parsing objective", 
"Analysing job descriptions", "Creating a personalised review", 
and similar messages. Please show the same message exactly once
2. Show a percentage score of what the resume currently scores 
against 100, and things that can be improved in categories 
like objective, job description, side projects, formatting, and 
use of language, etc
3. Show all the suggestions for each category nicely presented 
in a foldable bullet point list per category, highlighting the 
things to change per sentence.

As a baseline, always use Australian English spellings for 
all the suggestions.
```

Let’s quickly analyze the prompt:

* The prompt is divided into three parts. The first part tells the model what kind of app it needs to build
* The second part adds some more information about how to review the resume from both a technical and a non-technical point of view
* The third part provides some technical guidelines, like scoring, providing suggestions, and using Australian English

You can edit the prompt if you like, or just paste the prompt on Google AI Studio Build feature as seen below:

<img class="center" src="/images/google-ai-studio-build/04prompt.jpg" loading="lazy" title="Prompt to generate the intelligent tech resume reviewer app on Google AI Studio build" alt="Prompt to generate the intelligent tech resume reviewer app on Google AI Studio build">

After that, click the `Build` button on the form. Then you will need to wait for the app to be built. It will take 1-2 minutes it will show something as follows when it is creating the app:

<img class="center" src="/images/google-ai-studio-build/05google-ai-studio-building.jpg" loading="lazy" title="Google AI Studio building the resume reviewer app" alt="Google AI Studio building the resume reviewer app">

You can follow the progress on the left-hand side, the `Code assistant` panel or even click the “Code” button on the right side to see the generated code as follows:

<img class="center" src="/images/google-ai-studio-build/06google-ai-studio-generating-code.jpg" loading="lazy" title="Google AI Studio generating code for the resume reviewer app" alt="Google AI Studio generating code for the resume reviewer app">

Once it is done, it will load the `Preview` tab and may look something like the below:

<img class="center" src="/images/google-ai-studio-build/07google-ai-studio-preview.jpg" loading="lazy" title="Google AI Studio preview of the resume reviewer app" alt="Google AI Studio preview of the resume reviewer app">

Next, let's test the app in preview mode.

### Use the built app in preview mode

To test the generated app, you will need a resume. For that, we will use a sample frontend engineer resume in [text format](https://gist.githubusercontent.com/geshan/6218fdaac542c3314535dbe253c13341/raw/c1dff1ae304ef9433a1369406ce3659854fb1c10/test-fe-resume.txt). As the sample Frontend engineer role, we will use this mid-level [Frontend Engineer Role](https://gist.githubusercontent.com/geshan/6218fdaac542c3314535dbe253c13341/raw/b3622236cb069753e4befc4093c21129baf62204/z-fe-vacancy-text.txt) at Lorikeet AI in text format.

When you paste both the resume and the job vacancy text in the app, it looks like the following:

<img class="center" src="/images/google-ai-studio-build/08google-ai-studio-preview-testing.jpg" loading="lazy" title="Google AI Studio preview testing of the resume reviewer app" alt="Google AI Studio preview testing of the resume reviewer app">

After that, you can click the `Review My Resume` button, which will take some time to review the resume against the job description:

<img class="center" src="/images/google-ai-studio-build/09google-ai-studio-analysing.jpg" loading="lazy" title="Google AI Studio reviewing the resume" alt="Google AI Studio reviewing the resume">

After a few seconds, it will give its analysis, something like the following:

<img class="center" src="/images/google-ai-studio-build/10resume-reviewer-result.jpg" loading="lazy" title="Google AI Studio resume review result" alt="Google AI Studio resume review result">

Hurray! Your AI-powered tech resume reviewer is working. Now, if you want to share it with your friends, you can deploy it on Google Cloud Run. How to do it is discussed next.

### Deploy the app on Google Cloud Run

To deploy your app, you will need a functioning Google Cloud Platform account. You can create a [new project](https://console.cloud.google.com/projectcreate) on a Google Cloud Platform account:

<img class="center" src="/images/google-ai-studio-build/11gcp-new-project.jpg" loading="lazy" title="Google Cloud create project called resume-reviewer" alt="Google Cloud create project called resume-reviewer">

Put in the name as `resume-reviewer` and then click the `Create` button. It will take a few seconds, and the project will be created associated with your selected billing account:

<img class="center" src="/images/google-ai-studio-build/12gcp-project-created.jpg" loading="lazy" title="Google Cloud project resume-reviewer created" alt="Google Cloud project resume-reviewer created">

Then head back to Google AI Studio, you can click the `Deploy App` button on the top right, which looks like a rocket 🚀:

<img class="center" src="/images/google-ai-studio-build/14gias-deploy.jpg" loading="lazy" title="Google AI Studio deploy app button" alt="Google AI Studio deploy app button">

In the drop-down, select `Import Project`:

<img class="center" src="/images/google-ai-studio-build/13google-ai-studio-import-project.jpg" loading="lazy" title="Google AI Studio Import GCP project" alt="Google AI Studio Import GCP project">

In the right sidebar, search for `resume reviewer` and choose the project you have just created, and click `Import`:

<img class="center" src="/images/google-ai-studio-build/16import-project-button.jpg" loading="lazy" title="Google AI Studio Import GCP project to deploy" alt="Google AI Studio Import GCP project to deploy">

After that, select the `resume-reviwer` project in the drop-down of the overlay to deploy your app to Google Cloud Run in that `resume-reviewer` project:

<img class="center" src="/images/google-ai-studio-build/17select-project.jpg" loading="lazy" title="Google AI Studio select GCP project to deploy" alt="Google AI Studio select GCP project to deploy">

After the project (and billing) is verified, you can click the `Deploy app` button to deploy your intelligent tech resume reviewer app to Cloud Run:

<img class="center" src="/images/google-ai-studio-build/18deploy-app.jpg" loading="lazy" title="Google AI Studio deploy app button" alt="Google AI Studio deploy app button">

It will take some time (up to a couple of minutes) for Google AI Studio to deploy the app, and then it will give you a URL to view your app running on Google Cloud Run:

<img class="center" src="/images/google-ai-studio-build/19app-deploying.jpg" loading="lazy" title="Google AI Studio deploying resume reviewer app" alt="Google AI Studio deploying resume reviewer app">

Then you can click `View app` to see the app running on Google Cloud Run. You can share the URL with anyone, and they will be able to view and test the tech resume reviewer you generated:

<img class="center" src="/images/google-ai-studio-build/20app-deployed.jpg" loading="lazy" title="Google AI Studio deployed resume reviewer app" alt="Google AI Studio deployed resume reviewer app">

You have successfully built and deployed your own intelligent tech resume reviewer using Google AI Studio in minutes without writing any server code! You can test it out on your favourite browser:

<img class="center" src="/images/google-ai-studio-build/21app-on-cloud-run.jpg" loading="lazy" title="Google AI Studio deployed resume reviewer app running on Google Cloud Run" alt="Google AI Studio deployed resume reviewer app running on Google Cloud Run">

You can close the overlay and edit the app with another prompt if you like. If you want to use the app as a chat, you can use the Resume reviewer Gemini Gem as discussed next.

## Video

I have recorded a video of generating the whole app and testing it in preview (not the deployment part). You can watch the 6-minute video below:

{% youtube "2-mOMPic_bI" %}

## Resume reviewer Gemini Gem

If you don’t want to build an app and still use the resume reviewer, I have created a Gemini Gem for [Resume reviewer](https://gemini.google.com/gem/1z6S8yx2kkFPUTBHzmkPnxqDky9ssXA6y?usp=sharing), just click the link and use it:

<img class="center" src="/images/google-ai-studio-build/22resume-reviewer-gemini-gem.jpg" loading="lazy" title="Resume reviewer app running as a Gemini Gem" alt="Resume reviewer app running as a Gemini Gem">

That is another way to use the prompt without creating a custom application.

## Conclusion

This post demonstrated using Google AI Studio's Build feature to quickly prototype and deploy an intelligent tech resume reviewer without complex server code. You covered exploring AI Studio and its Build feature, crafting a detailed prompt for functionality (job description analysis, 100-point scoring, XYZ feedback), generating and testing the application, and finally deploying it to Google Cloud Run for a shareable URL.

> You also noted the pre-built Gemini Gem as an alternative. This process showcases the rapid, custom tool development possible with Google AI Studio and the Gemini SDK.

Keep learning and keep exploring!
