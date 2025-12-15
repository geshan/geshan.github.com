---
layout: post
title: "How to use Gemini Live audio as an interviewer for a software engineer’s job (with video)"
date: 2025-12-16T21:48:25.000+11:00
comments: true
tags:
- AI
- Gen AI
- Google AI Studio
- Gemini
- Job Search
cover: "/images/gemini-live-audio/01gemini-live-audio.jpg"
pagetitle: "How to use Gemini Live audio as an interviewer for a software engineer’s job (with video)"
description: "Learn how to use Gemini Live audio as an interviewer for a software engineer’s job with this practical guide. Use Gemini as a interviwer for a backend engineer role and talk with it"
keywords: gemini live audio, gemini live interviewer, AI interview practice, software engineer interview practice, backend engineer interview, AI-powered interview simulator
---
Wouldn’t it be great if you had an on-demand experienced software engineer interviewer who could take a technical interview whenever and wherever you wanted? Yes, it is possible with [Gemini Live](https://gemini.google/overview/gemini-live/) and the [native audio](https://blog.google/products/gemini/gemini-audio-model-updates/) feature on Google AI Studio, along with a well-crafted prompt. The best part is that it's free. Let’s get started!

<!-- more -->

<img class="center" src="/images/gemini-live-audio/01gemini-live-audio.jpg" title="Use Gemini Live Audio feature to do mock software enginer interview" alt="Use Gemini Live Audio feature to do mock software enginer interview">

## Table of contents

- [Gemini Multimodal capabilities](#gemini-multimodal-capabilities)
- [Gemini Live Native Audio on Google AI Studio](#gemini-live-native-audio-on-google-ai-studio)
  - [Steps to use Gemini Live audio as an interviewer](#steps-to-use-gemini-live-audio-as-an-interviewer)
  - [Switching modes](#switching-modes)
  - [Demo video](#demo-video)
- [Other interview ideas](#other-inteview-ideas)
- [Conclusion](#conclusion)

## Gemini Multimodal capabilities

The Google Gemini LLM has multimodal capabilities. It can take text, images, audio (including speech and music), video, and large codebases (with a 1-million-token context window) as input. With that input, it can output text, image, audio, and code. For this tutorial, you will input audio/speech, and the output will also be mainly speech (audio), even though it will send the output in text as well for your ease.

To use Gemini with the live native audio feature as an interviewer for a software engineering job (backend engineer), you will use the Google AI Studio [live feature](https://aistudio.google.com/live) as discussed next.

## Gemini Live Native Audio on Google AI Studio

To use the Gemini Live Native Audio feature to behave like an experienced software engineer who will take an interview for a backend engineer role, you will need to go to the [live feature](https://aistudio.google.com/live) in Google AI Studio. It is one of the easiest and most accessible ways to use this feature. At the time of writing, the model available for the Live feature is `Gemini 2.5 Flash Native Audio Preview 12-2025`.

### Steps to use Gemini Live audio as an interviewer

First, go to [Google AI Studio](https://aistudio.google.com) and click the `Playground` link available in the left sidebar as seen below:

<img class="center" src="/images/gemini-live-audio/02gias-playground.jpg" title="Google AI Studio Playground link" alt="Google AI Studio Playground link">

 After that, click the `Live` button available under the `Google AI Studio` logo then click the `Gemini 2.5 Flash Native Audio Preview 12-2025` option available:

<img class="center" src="/images/gemini-live-audio/03gias-live.jpg" title="Google AI Studio Live Audio feature selection" alt="Google AI Studio Live Audio feature selection">

Then, on the right sidebar, change the voice from `Zephyr` to `Puck`, it is a better voice (in my opinion) as you will chat with that voice for minutes:

<img class="center" src="/images/gemini-live-audio/04gias-live-voice.jpg" title="Google AI Studio change voice to Puck" alt="Google AI Studio change voice to Puck">

Subsequently, scroll down to turn on `Thinking mode`, then `Affective dialog`, and lastly `Grounding with Google Search` as follows:

<img class="center" src="/images/gemini-live-audio/05gias-live-settings.jpg" title="Google AI Studio Live feature settings panel" alt="Google AI Studio Live feature settings panel">

When you hover over each, it will tell you what the setting does, for instance, `Affective dialog` on will: `Let Gemini adapt its response style to the input expression and tone`. 

After that, copy the prompt below and paste it into the `Start typing a prompt` text box:

```
You are a seasoned backend software engineer with over 20 years of experience and 
you have taken more than 100 backend-focused technical interviews.
For this task, you will act as an experienced interviewer, too.

You operate in two modes, the interviewer mode and the reviewer mode.
When the interviewee asks you to "switch to reviewer mode", you will change to a 
softer voice tone and provide feedback on the last answered question. 
When the interviewee asks you to "switch to interviewer mode",  you go back 
to the interviewer mode with a stronger voice tone, continue asking questions, 
and record the answers for later analysis.

Before the interview starts, you will ask for a job posting. You will ask 
general questions and other specific questions based on the job description. 

You can start with the question "Introduce yourself," then move to the 
technical section.

You will ask relevant backend-related questions covering, but not confined to:

* REST endpoints: how REST works, things like the difference between 
PUT and PATCH, HTTP Response codes, idempotency, Rate Limits, authentication, 
and authorization
* Databases: like relational database vs non-relational ones, you have a long 
SQL select query that takes 1-2 minutes to run, how can you optimize it, 
ACID, eventually consistent, DB normalization
* Code: like testing, SOLID principles, TDD, Design patterns, Security OWASP
* System architecture: microservices, caching, message queues, 
horizontal scaling, software resilience
* Operations: Application performance monitoring (APM), logs, 
observability, SLA/SLO, infrastructure as code (IAC) - Terraform

You will wait and record all the interviewee's answers, then provide 
feedback when asked to do so.

At the end, you will let the interviewee ask you some questions about 
the company and the role, then answer them. You will let the interviewee 
know when the interview is complete and ask whether they would like feedback.

Your role is to provide actionable, easy-to-follow, and high-quality 
advice to improve the answers from a technical point of view, as well as
how the interviewee delivered the answers in relation to 
confidence and clarity. 

Adhere to the following principles and structure when providing feedback 
and advice:

General Instructions:
User Context Sensitivity: Tailor recommendations to the person's 
specific needs, considering the target audience, mainly software 
engineering managers and senior or lead engineers, goals, and finding 
a good balance of technical correctness, clarity, and 
confidence in answer delivery.

Clarity: Ensure all advice is straightforward, free of unnecessary 
jargon, and includes step-by-step guidance where relevant.

Actionability: Provide actionable advice with a clear path to 
implementation, including prioritization and how to maximize 
outcomes to ace the interview.
```

The prompt is self-explanatory, and when pasted on the text area, it will look as follows:

<img class="center" src="/images/gemini-live-audio/06gias-prompt.jpg" loading="lazy" title="Adding the prompt to make Gemini live act as an experience software interviewer who has done more than 100 technical interviews" alt="Adding the prompt to make Gemini live act as an experience software interviewer who has done more than 100 technical interviews">

After that, click `Run`.

Then it will ask for a job description. It is best to give a backend engineer role you can try with this opening at Atlassian: `https://www.atlassian.com/company/careers/details/23645` – here is an internet web archive [link](https://web.archive.org/web/20251215100104/https://www.atlassian.com/company/careers/details/23645) for future reference, and again click `Run`:

<img class="center" src="/images/gemini-live-audio/07gias-jd.jpg" loading="lazy" title="Gemini Live prompt for software interview mode, providing the link to the job description" alt="Gemini Live prompt for software interview mode, providing the link to the job description">


After that, it will ask for your introduction. You can give your “backend engineer” introduction by  clicking the `Record` mic button and speaking:

<img class="center" src="/images/gemini-live-audio/08gias-answer.jpg" loading="lazy" title="Giving your backend engineer introduction using the Gemini Live interviewer prompt" alt="Giving your backend engineer introduction using the Gemini Live interviewer prompt">

Then it will move on to other technical questions, and you can follow along and provide the answers.

### Switching modes

At any point in the interview, you can say `switch to reviewer mode` then ask for feedback about your answers.

Then again, tell it to `switch to interviewer mode`,  and it will continue the questions. You can also ask for feedback at the end, but for that, you will need to increase the `session context size` setting in the right sidebar. You can see this in action in the video below.

### Demo video

Below is a 7 minute demo video of the whole process for your reference:

{% youtube "valxA5kk0oM" %}

## Other inteview ideas

You can also use Gemini Live with the screen share feature to do a system design interview. You will need to tweak the prompt to be a system design interviewer and do a system design interview
for a URL shortner. Be ready to draw some boxes and arrows :).

## Conclusion

In this post you saw the powerful combination of Gemini Live, native audio, and a detailed prompt offers a groundbreaking way to practice technical interviews. By simulating a real-world interview environment with an AI that provides immediate, actionable feedback, you can significantly enhance your preparation. 

This approach not only sharpens your technical knowledge but also builds confidence and clarity in your delivery and the real interview scenario. Give this free tool a try and take your software engineering interview skills to the next level. Keep learning and experimenting!

