---
layout: post
title: "How to use Gemini over Vertex AI to summarize and categorize job listings with controlled generation"
date: 2025-01-26T22:34:52.000+11:00
comments: true
tags:
- AI
- Gen AI
- GCP
cover: "/images/controlled-generation-gemini/01controlled-generation-gemini.jpg"
pagetitle: "How to use Gemini over Vertex AI to summarize and categorize job listings with controlled generation"
description: "Learn how to use controlled generation in Gemini over Vertex AI for the output to adhere to a given schema with a real life job listings example."
keywords: controlled generation, controlled generation gemini, controlled generation gemini vertex ai
---
LLMs generally reply in a nondeterministic format; it does not always comply with the formatting instructions given. This is where controlled generation (structured output) comes into play, where you ask an LLM to reply to comply with a given schema. In this post, you will learn how to use Gemini over Vertex AI and controlled generation to get structured output that follows a schema on job listings to summarize and categorize them. Let's get going!

<!-- more -->

<img class="center" src="/images/controlled-generation-gemini/01controlled-generation-gemini.jpg" title="How to use Gemini over Vertex AI to summarize and categorize job listings with controlled generation" alt="How to use Gemini over Vertex AI to summarize and categorize job listings with controlled generation">

## Table of contents

* [The solution to enhance](#the-solution-to-enhance)
* [Summairze and classify using Gemini over Vertex AI](#summairze-and-classify-using-gemini-over-vertex-ai)
  * [Vertex AI Freeform](#vertex-ai-freeform)
  * [The prompt](#the-prompt)
  * [Using better settings](#using-better-settings)
  * [Schema for controlled generation](#schema-for-controlled-generation)
  * [Test it](#test-it)
  * [Generate code](#generate-code)
* [Controlled generation is useful](#controlled-generation-is-useful)
* [Conclusion](#conclusion)

## The solution to enhance

This is a real-life scenario where one of our side projects - [AU Tech Jobs](https://app.autechjobs.com) which aggregates jobs from multiple (like 60+) company job listing pages. If interested, you can read the [story of ATJ](/blog/2021/06/life-changing-side-project/). Currently, the job details page has two useful features on the job detail page, built by calling two different APIs.

The first one is if the “computer percent” for a particular job is less than a given threshold, it shows a message `Our machine learning algorithm suggests this might not be a pure tech job` to let the user know it might not be a tech job, for example, an “Account Executive” role is not a tech or software engineering/tech job. Currently, this classification is done using the [uclassify API](https://uclassify.com/browse/uclassify/topics?input=Text). It does an “ok” jo,b but sometimes does not give back a good `computer_percent` classification. 

The second feature is a summary of the job description. Currently, this feature is done using [Bert Executive summarizer](https://github.com/geshan/bert-extractive-summarizer) – you can [try it](https://smrzr.io/) out. [BERT](https://www.nvidia.com/en-au/glossary/bert/) by Google is like the previous version before the transformer models. It does the summarization task but is not as versatile as a Large Language Model (LLM). We call another API to get the summary of the job description.

Both the features look as follows in action:

<img class="center" src="/images/controlled-generation-gemini/02au-tech-jobs-features.jpg" loading="lazy" title="AU Tech Jobs job detail page features of summary and tech job categorization and percent" alt="AU Tech Jobs job detail page features of summary and tech job categorization and percent">

The enhancement we want to make is to get both the summary and the categorization (tech percentage, in this case) using an LLM and a prompt in a single call. If it is an LLM call, other features could be easily added. The next section will see how this can be done with a working proof of concept.

## Summairze and classify using Gemini over Vertex AI

Now, if we were to modernize the summary generation and `computer` of `software engineering` percent of the given job description with the current powerful LLMs, it can be done with a single call (or prompt). Let’s look at how you can do a proof of concept on Vertext AI using Gemini 2.0 Flash.

To do this, you will need a Google Cloud Account (with some credits on it), then you can follow along next:

### Vertex AI Freeform

You can start by creating a [new GCP project](https://console.cloud.google.com/projectcreate) or using an existing one. On your selected project, search for `vertex` and click on `Vertex AI` as seen below:

<img class="center" src="/images/controlled-generation-gemini/03search-vertex.jpg" loading="lazy" title="Search for vertex on the GCP UI search bar" alt="Search for vertex on the GCP UI search bar">

On the Vertex AI page, click on `Freeform` below `Vertex AI Studio` on the left menu as follows:

<img class="center" src="/images/controlled-generation-gemini/04vertex-ai-freeform-link.jpg" loading="lazy" title="Click on Freeform under Vertex AI Studio on the Vertex AI page on GCP" alt="Click on Freeform under Vertex AI Studio on the Vertex AI page on GCP">

If it is a new project or you are using Vertext AI for the first time, you will need to enable the Vertex AI API by clicking `Agree & Continue` as shown below:

<img class="center" src="/images/controlled-generation-gemini/05vertex-ai-api.jpg" loading="lazy" title="Agree and continue to use the Vertex AI API" alt="Agree and continue to use the Vertex AI API">

At this point, you should have landed on the `Vertex AI` Freeform page as seen here:

<img class="center" src="/images/controlled-generation-gemini/06vertex-ai-freeform-page.jpg" loading="lazy" title="You will land on the Vertex AI Freeform page" alt="You will land on the Vertex AI Freeform page">

Next, you will write the prompt summarizing and categorizing a job description.

### The prompt

The next task is putting in the prompt and a job description to reach our goal. For this, I selected a random software engineer job from Atlassian and used the following prompt:

```
From the job description, first summarize it to less than 125 words,
then determine whether you think it is a software engineering job and
your confidence percentage.
```

The prompt and the job description combined are below:

```
From the job description, first summarize it to less than 125 words,
then determine whether you think it is a software engineering job and 
your confidence percentage.

Backend Software Engineer

Working at Atlassian
Atlassians can choose where they work – whether in an office, from home, 
or a combination of the two. That way, Atlassians have more control over 
supporting their family, personal goals, and other priorities. We can hire 
people in any country where we have a legal entity. Interviews and 
onboarding are conducted virtually, a part of being a distributed-first 
company.

With a sufficient timezone overlap with the team, we're able to hire eligible 
candidates for this role from any location in Australia and New Zealand. 
If this sparks your interest, apply today and chat with our friendly
Recruitment team further.

Atlassian is looking for talented Developers to join one of our 
Sydney engineering teams (i.e. Jira Server, Jira Cloud, Growth, etc.) 
Atlassian's engineering team is responsible for shaping the future by helping 
thousands of teams all around the world get work done. 

As a Developer well into your career, we know you're exceptional 
at what you do, but you're still eager to learn and hone in on skills 
as a developer... That's why we're placing a heavy emphasis on leaning 
on your expertise in one or more tech stacks but still learning and 
growing. We don't expect you to be an expert, but we'll sure make 
sure you get on the right path towards becoming one...

Wait, I don't have Java experience and you still want to interview me? 
That's right! At Atlassian, we hire engineers that can demonstrate 
their ability to learn and keep up with new and emerging technologies. 
It's true that Atlassian's stack is primarily written in Java and in 
the role you'll be coding primarily in Java, but we do believe in using 
the right tools for the job rather than being tied to the tool (e.g. Java).
We happen to have a variety of languages within our stack including 
Kotlin, Python, and Ruby.For the interview process, we want to 
see you at your best. This means that during the interview, we want 
you to code in whatever language you feel you're best at. This will 
give us a sense of your skills as a developer, which is all we need to make 
a proper assessment for this role.

In this role, you'll get the chance to:
Drive projects independently, from technical design to launch
Apply architectural standards and start using them on new projects
Contribute to code reviews & documentation as well as take on complex bug fixes
Begin writing useful technical documentation - Learn and code in Java
Mentor more junior members
Sound like an exciting opportunity? We think so too... In order to 
set you up for impact on day one, we'll expect you to have 
this on your first day:

You will not be required to know a specific programming language, 
however experience with a prominent language such as Java, 
Python, C#, C/C++, or Ruby is crucial.

Deep understanding of data structures, in particular, how they 
are implemented and how to apply them to solve problems

Passion for collaborating, tackling hard problems and not being 
afraid to ask questions
A real appetite for learning and growing, both as a developer 
and teammate.

Our perks & benefits
Atlassian offers a variety of perks and benefits to support you, 
your family and to help you engage with your local community. 
Our offerings include health coverage, paid volunteer days, 
wellness resources, and so much more. 

Visit go.atlassian.com/perksandbenefits to learn more.

About Atlassian

At Atlassian, we're motivated by a common goal: to unleash 
the potential of every team. Our software products help teams 
all over the planet and our solutions are designed for 
all types of work. Team collaboration through our tools 
makes what may be impossible alone, possible together.

We believe that the unique contributions of all Atlassians 
create our success. To ensure that our products and culture 
continue to incorporate everyone's perspectives and 
experience, we never discriminate based on race, 
religion, national origin, gender identity or expression, 
sexual orientation, age, or marital, veteran, or 
disability status. All your information will be kept 
confidential according to EEO guidelines.

To provide you the best experience, we can support with 
accommodations or adjustments at any stage of the 
recruitment process. Simply inform our Recruitment team 
during your conversation with them.
```

When pasted on the `Prompt` box of Vertex AI freeform, it looks like the below:

<img class="center" src="/images/controlled-generation-gemini/07prompt-and-jd.jpg" loading="lazy" title="Vertex AI prompt form with the prompt and a software engineer job description" alt="Vertex AI prompt form with the prompt and a software engineer job description">

You can generate a response now, but it will be a bit random. That is where setting the configs better and using the controlled generation with a schema will improve the output. Next, you will tweak the settings to make the output more predictable.

### Using better settings

You will change the settings for a more optimized output for the summarization and categorization task. You can set the `Temperature` at `0.2` and the  `Output token limit` at 4096. The `Temperature` is the creativity or randomness you want the LLM to have in the output, and the `Output token limit` is the output length where roughly one token is one word.

As you want the LLM to be more predictable, the `Temperature` is set to a low `0.2`. You can even set the `Output token limit` to 512, and it would work, but you are setting it higher just in case the LLM sends out long output. Your setting will look like the following:

<img class="center" src="/images/controlled-generation-gemini/08temp-output-limit.jpg" loading="lazy" title="Set the temparature to 0.2 and the output limit to 4096" alt="Set the temparature to 0.2 and the output limit to 4096">

You can leave the model as `gemini-2.0-flash-exp,` as seen in the above image. Next, you will set the schema for the [controlled generation](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output,t), enabling structured and more predictable output.

### Schema for controlled generation

To set the schema for [controlled generation](https://developers.googleblog.com/en/mastering-controlled-generation-with-gemini-15-schema-adherence/) with Gemini, you will need to change the `Output format` to `JSON` on the right panel below `Grouding` settings as you can see below:

<img class="center" src="/images/controlled-generation-gemini/09change-output-format.jpg" loading="lazy" title="Change the output format from Plain Text to JSON" alt="Change the output format from Plain Text to JSON">

After that, you will click `Edit` beside the select box where `JSON` is already selected for the `Output format`. It will slide in a new overlay from the right side, and there you will paste in the schema below:

```json
{
  "type": "object",
  "properties": {
    "summary": {
      "type": "string"
    },
    "tech_percent": {
      "type": "number"
    }
  },
  "required": [
    "summary",
    "tech_percent"
  ]
}
```

After that, you can click apply as shown below:

<img class="center" src="/images/controlled-generation-gemini/10set-structured-schema-controlled-generation.jpg" loading="lazy" title="Add the given schema to customize structure output with the controlled generation types" alt="Add the given schema to customize structure output with the controlled generation types">

Before proceeding further, let’s analyze what the schema means:

First, you have put a schema of a JSON object (not an array of objects or anything else), the object has two properties, which are:

* summary: it is of type string
* tech_percent: having the type number

Then, you specify that both properties are required in the output by adding both the field to the `required` array. There are other types [supported fields](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output#fields) or types from the [Vertex AI schema](https://cloud.google.com/vertex-ai/docs/reference/rest/v1/Schema) you can use. For example, you can use an `Enum` with only two values, `positive` or `negative` if you analyze sentiment. 

Similarly, you can send in an array of items and expect back an array of items in a given schema like this [weather forecast example](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output#forecast). The possibilities are endless, if you use Gemini’s multi-modal capabilities you can even use a schema to list out the identified [objects](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output#identify) in an image. It would be advisable to read that [official document](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/control-generated-output) thoroughly. You can also use Google AI Studio for a visual editor for the structured output schema.

Next we will test out the output on the Vertex AI interface.

### Test it

To test the output and if it adheres to the defined schema, you can hit the `play` or `generate` button and check the output as follows:

<img class="center" src="/images/controlled-generation-gemini/11test-output-sw-eng.jpg" loading="lazy" title="Test the summary and categorization for the software engineer job" alt="Test the summary and categorization for the software engineer job">

As you can see, it works well, and the output adheres to the given schema. The output I got was the following:

```json
{
  "summary": "Atlassian is hiring a Backend Software Engineer to join their Sydney team. The role involves driving projects, applying architectural standards, contributing to code reviews, and mentoring junior members. While Java is the primary language, experience with other languages is valued. They emphasize learning and growth, and want to see candidates code in their preferred language during interviews. The company offers flexible work arrangements and various benefits. They value diversity and inclusion.",
  "tech_percent": 95.0
}
```

To ensure it works fine with non-tech jobs, I tested it with a `Sales` jobs description and ran the generation. It rightly guessed that with was only 10% of technical/software engineering related:

<img class="center" src="/images/controlled-generation-gemini/12test-output-sales.jpg" loading="lazy" title="Test the summary and categorization for a sales executive job description" alt="Test the summary and categorization for a sales executive job description">

You can switch back to the previous job description of a `Backend Software Engineer` and proceed. If you try it multiple times you might the quota error:

```js
Error message: 'Online prediction request quota exceeded for gemini-experimental. Please try again later with backoff.'

Status: 429 Error code: 8
```

To get over this error you can use a differnt model like the `gemini-1.5-pro-002`.

### Generate code

To generate a code for what you have done, click the `Get Code` link on the right sidebar beside the `Save` button:

<img class="center" src="/images/controlled-generation-gemini/13get-code-link.jpg" loading="lazy" title="The link to get code beside the Save button" alt="The link to get code beside the Save button">

It will show a working Python code as follows:

<img class="center" src="/images/controlled-generation-gemini/14generated-python-code.jpg" loading="lazy" title="You can get generated python code that you can try out with Google Cloud Shell and Cloud Shell editor or on your local machine" alt="You can get generated python code that you can try out with Google Cloud Shell and Cloud Shell editor or on your local machine">

To close the overlay, you can click `Close`. You can analyze that the code has `response_schema` parameter when the call is done which will have the schema you defined in the pervious step.

You can copy and run the generated Python code on Google Cloud Shell, editing the file [Cloud Shell editor](/blog/2024/01/cloud-shell-editor/), there is an example of that in this [tutorial](https://geshan.com.np/blog/2024/04/gemini-ecommerce-product-description-generator/#run-generated-python-code). You can also run it as a [Google Collab Notebook](https://colab.google/notebooks/) by clicking the `Open Notebook` button.

As this tutorial is focused on `controlled generation,` we will not dive deeper into running the code. However, you can add other layers to the generated code as needed. For example, you can create an API with [FastAPI](https://fastapi.tiangolo.com/) or have a running app with a helpful UI using [Streamlit](https://streamlit.io/) or Google’s [Mesop](https://google.github.io/mesop/).

Coming back to the use case, I would have directly called the Gemini API for each or multiple job posts in the single call as Gemini 2.0 flash exp has a 1 million tokens context window and got the summary in batches of 100 or 200 jobs. In the above example, each job took 900-1000 tokens, which would work well. I would also consider the cost associated with it.

Nothing will change visually for the user; however, this enhancement will greatly improve the output quality.

This blog post has been written as part of #VertexAISprint and Google Cloud credits are provided for this project.

## Controlled generation is useful

Controlled generation is helpful as the LLM will reply in `JSON,` which is much better for machines interacting with LLMs. Given the LLM will adhere to the schema, it makes it much easier as the output is structured, and with the required fields, you can expect the fields to to be there in the JSON output.

Also, the output does not sway in other directions; as you saw in the above example, the `tech_precent` value was rightly guessed at 95% for the backend software engineer, and it came down to 10% for a sales role’s job description.

It will not reduce the hallucination or the non-deterministic nature of LLM’s output, but it can add the needed structure to the output, making it much easier for machines or API clients to read it.

## Conclusion

You saw a real-life example of how Gemini can replace older methods of summarizing and categorizing. Staring with a use case, you built a compelling and working proof of concept using Gemini over Vertex AI. You wrote a good prompt, tweaked the optimal output configs, and used a schema object with two required fields for controlled generation and structured output. You also learned why and how controlled generation is helpful. I hope you learned something new from this guide and continue learning more about LLMs and Gen AI. Keep learning!
