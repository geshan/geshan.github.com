---
layout: post
title: "Getting Started with Google Agent Development Kit (ADK): Build and Run Your Simple Fact-Checker AI Agent"
date: 2026-05-30T21:20:47.000+10:00
comments: true
tags:
- AI
- Gen AI
- AI Agent
- Google ADK
- Gemini
cover: "/images/google-adk-tutorial/01google-adk-tutorial.jpg"
pagetitle: "Getting Started with Google Agent Development Kit (ADK): Build and Run Your Simple Fact-Checker AI Agent"
description: "A step by step guide to get started with Google ADK to build your first AI agent which does fact checking"
keywords: google adk, google adk tutorial, adk tutorial, ai agents
---
Have you ever tried building an AI agent, only to get bogged down in massive, complex frameworks just to get a basic output? If you want a clean, code-first way to build and debug agents without the boilerplate, Google’s open-source Agent Development Kit (ADK) is what you need. In this post, you will learn how to set up the Python SDK, code your first Gemini-powered agent that checks facts, and test it locally using ADK’s built-in web playground. Let's get started!

<!-- more -->

<img class="center" src="/images/google-adk-tutorial/01google-adk-tutorial.jpg" title="Getting started with Google Agent Development Kit (ADK)" alt="Getting started with Google Agent Development Kit (ADK)" fetchpriority="high">

## Table of contents

- [Prerequisites](#prerequisites)
- [Google Agent Development Kit (ADK)](#google-agent-development-kit-adk)
- [Fact checker agent](#fact-checker-agent)
  - [Build the agent](#build-the-agent)
  - [Run the agent in the CLI](#run-the-agent-in-the-cli)
  - [Run the agent with web UI](#run-the-agent-with-web-ui)
- [Conclusion](#conclusion)

## Prerequisites

Before you get your hands dirty with the code, let’s get the following prerequisites mentioned:

1. As you will be using Python with Google ADK, you must have Python and [uv](https://docs.astral.sh/uv/) installed and working. For the demo, we will use uv version 0.11.7 and Python version 3.12
1. You will need basic knowledge of how Python, pip, and [virtualenv](https://docs.python.org/3/library/venv.html) work.
1. Knowledge of [Google ADK](https://adk.dev/) will be beneficial
1. You will need a working API key on Google AI Studio, for which you might need a working Google Cloud Platform (GCP) project and a valid GCP account with payment enabled or GCP credit.

In the next section, you will learn about the Google Agent Development Kit (ADK).

## Google Agent Development Kit (ADK)

Google ADK is an open-source agent development framework that enables you to build, debug, and deploy AI Agents at enterprise scale. It is available in multiple languages, including Python, TypeScript, Go, Java, and Kotlin. Based on the [ADK samples](https://github.com/google/adk-samples/tree/main/python/agents) and examples, Python is the most popular language for building an AI agent with ADK at this point. [ADK version 2.0](https://adk.dev/2.0/) has been recently released.

In my experience, it is a good framework to build AI Agents. With less than 100 lines of code, you can build something useful and meaningful. For the example used in the tutorial, you will build a simple conversational single-agent tool that can verify facts.

## Fact checker agent

As a demo for this blog post (a tutorial), you will build a fact-checker agent using the Google Agent Development Kit (ADK). The aim is simple: you see a news post, or someone makes a statement, but you are not sure whether it is a fact or a false opinion (even worse, fake news). You can pass that statement to this AI agent, and it will tell you whether it is a fact.

In the next section, get ready to roll up your sleeves and code a simple fact-checker AI agent, then run it locally on your machine. 


### Build the agent

To build the fact-checker agent, you can start by running the following commands:

```bash
mkdir fact-checker-agent-adk
cd fact-checker-agent-adk
```

Then you can run,

```bash
uv init
# it used Python 3.12 for my example
uv add google-adk
```

It will initialize the project with uv, and add the Google ADK package to the project with its CLI.

<img class="center" src="/images/google-adk-tutorial/02google-adk-added-by-uv.jpg" loading="lazy" title="Adding google adk package using uv" alt="Adding google adk package using uv">

Now you have `google adk` installed. At the time of writing, the version is 2.1. You can check it by running `uv run adk –version`.

To create the fact checker agent with the `adk` CLI, run the command below and answer the questions about the model, whether to use Vertex AI or an API key from Google AI Studio. You will need to execute the following command:

```bash
uv run adk create fact_checker
```

Then answer the questions, which will look like:

<img class="center" src="/images/google-adk-tutorial/03google-adk-create-agent.jpg" loading="lazy" title="Creating a new fact checker agent with Google ADK CLI" alt="Creating a new fact checker agent with Google ADK CLI">

For this tutorial, you will use Google AI Studio, and you will need to create an API key on Google AI Studio to continue building the AI Agent.

It will create a `./fact_checker/agent.py` file with the following contents:

```py
from google.adk.agents.llm_agent import Agent

root_agent = Agent(
    model='gemini-2.5-flash',
    name='root_agent',
    description='A helpful assistant for user questions.',
    instruction='Answer user questions to the best of your knowledge',
)
```

Replace it with the following contents to create your `fact checker` agent:

```py
from dotenv import load_dotenv
from google.adk.agents import Agent
from google.adk.apps.app import App
from google.adk.tools import google_search
from google.genai import types

# Load environment variables from .env file
load_dotenv(override=True)

root_agent = Agent(
    name="Facts",
    model="gemini-flash-latest", #gemini 3.5 at the time of writing
    instruction="""You are a fact checker. 
    You will be skeptical about anything that is said to you. 
    You will search the web and verify the given information 
    if it does not match you will respond with the latest 
    and factual information.""",
    description="An Agent to provide only facts about a given topic using Google Search.",
    generate_content_config=types.GenerateContentConfig(
        temperature=0.1 
    ),
    tools=[google_search],
)

app = App(name="fact_checker", root_agent=root_agent)
```

The code above is doing:

* First, it imports necessary modules like `load_dotenv` to load secrets, Agent, and app, which are the core building blocks of Google ADK
* It also imports the `Google Search` built-in tool that allows the AI agent to browse the internet for live data and `types` for advanced configuration settings for the AI model
* After that, it loads the environment variable that uses the Google AI Studio API key you put in the last step. If you had used Vertex AI ([Google Enterprise Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/vertex-ai-name-changes) now), it would load the GCP project details too.
* Then, it defines the AI Agent as `root_agent` which:
	* has a name of `Facts`
	* uses the `gemini-flash-latest` model, which is Gemini 3.5 at the time of writing this blog post
* The instructions give the AI a strict persona. It tells the agent to be inherently skeptical of user input and mandates that it must verify claims using the internet. 
* Add a relevant description
* add a `temperature` of only 0.1, as for the fact checker agent, it is good to be not very creative with answers and reply back to the point as LLM temperature [controls randomness](https://www.ibm.com/think/topics/llm-temperature)
* Then gives it a Google search as a tool to do the fact-checking
* Finally, the app is initialized with the name `fact_checker`, and the root agent is assigned

In the next section, you will run the agent in the CLI and the web, then verify if it is fact-checking the statements correctly. 

### Run the agent in the CLI

To run the agent in the CLI, execute the following command:

```bash
uv run adk run fact_checker
``` 

Then you can verify if a given statement is a fact, like:

```
Scott Morrison is the prime minister of Australia.
```

And it would fact-check the given statement like:

<img class="center" src="/images/google-adk-tutorial/04google-adk-run-with-cli.jpg" loading="lazy" title="Running the Fact checker AI agent locally using Google ADK CLI run" alt="Running the Fact checker AI agent locally using Google ADK CLI run">

### Run the agent with web UI

To run the ADK agent with the web UI, you can run the following command:

```bash
uv run adk web fact_checker
```
Which will result in:

<img class="center" src="/images/google-adk-tutorial/05google-adk-run-web.jpg" loading="lazy" title="Running the Fact checker AI agent locally using Google ADK web UI" alt="Running the Fact checker AI agent locally using Google ADK web UI">

After that, you can open the browser of your choice (like Google Chrome) and go to `http://localhost:8000` as the ADK web will by default run on port 8000. You will see something like the below, and you can ask anything to fact-check it, like below:

<img class="center" src="/images/google-adk-tutorial/06google-adk-web-ui-browser.jpg" loading="lazy" title="Fact checker AI agent running locally using Google ADK web UI on Chrome" alt="Fact checker AI agent running locally using Google ADK web UI on Chrome">

I asked it about the Capital Gains Tax discussion after the Australian Budget, and it said that it is `proposed` and has not been converted into law, after doing a couple of Google Searches. 

You can see the request and response, and check the metadata of the tokens used, from the icons on the left sidebar of the ADK web UI. You can also run the AI Agent as an [API server](https://adk.dev/runtime/api-server/) or [Ambient Agent](https://adk.dev/runtime/ambient-agents/) that can respond to asynchronous events without human intervention, such as reacting to cloud events when a file is uploaded to Google Cloud Storage, or running on a schedule.

You can also deploy the agent to a service such as Google Cloud Run and make it available with appropriate access controls.

There you have it, a small but useful AI agent that uses Google Search and verifies if a statement is fact or not. The full app is available for your reference in this open-source [GitHub repository](https://github.com/geshan/fact-checker-agent-adk).

## Conclusion

The Google Agent Development Kit (ADK) provides a remarkably clean and efficient way to build powerful AI agents without excessive boilerplate. By leveraging the Gemini model alongside the integrated Google Search tool, you successfully created a functional fact-checker agent in just a few lines of code. 

Whether you prefer using the straightforward CLI for quick tests or the built-in web UI for a more visual debugging experience, ADK offers a flexible environment for local development and enterprise-scale deployment alike. Keep building!
