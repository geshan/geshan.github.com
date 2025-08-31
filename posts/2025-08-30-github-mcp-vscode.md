---
layout: post
title: "How to use the remote GitHub MCP server with Copilot on VS Code: a step-by-step guide"
date: 2025-08-30T21:59:24.000+11:00
comments: true
tags:
- MCP
- AI
- Gen AI
cover: "/images/github-mcp-vscode/01github-mcp-vscode.jpg"
pagetitle: "How to use the remote GitHub MCP server with Copilot on VS Code: a step-by-step guide"
description: "Learn how to use the remote GitHub MCP server with GitHub Copilot on VS Code editor in this step-by-step tutorial"
keywords: github mcp server, github mcp, remote github mcp server
---
Imagine being able to open a pull request or close an issue without leaving your IDE/Editor. This is made possible by the GitHub Model Context Protocol (MCP) server. In this post, you will learn how to use the remote GitHub MCP server with GitHub Copilot on VS Code. Let's get started!

<!-- more -->

<img class="center" src="/images/github-mcp-vscode/01github-mcp-vscode.jpg" title="How to use the remote GitHub MCP server with Copilot on VS Code: a step-by-step guide" alt="How to use the remote GitHub MCP server with Copilot on VS Code: a step-by-step guide">

## Table of contents

* [What is MCP](#what-is-mcp)
* [Official GitHub MCP server](#official-github-mcp-server)
    * [Using GitHub MCP server locally](#using-github-mcp-server-locally)
    * [Remote GitHub MCP server](#remote-github-mcp-server)
* [Remote GitHub MCP server on VS Code with Copilot](#remote-github-mcp-server-on-vs-code-with-copilot)
    * [Step-by-step guide to connect VS Code to the remote GitHub MCP server](#step-by-step-guide-to-connect-vs-code-to-the-remote-github-mcp-server)
        * [Install the remote MCP Server](#install-the-remote-mcp-server)
        * [List the pull requests for a repo](#list-the-pull-requests-for-a-repo)
        * [Other things to do with remote GitHub MCP Server](#other-things-to-do-with-remote-github-mcp-server)
        * [MCP server settings](#mcp-server-settings)
* [Conclusion](#conclusion)


## What is MCP

It is hard to believe that the Model Context Protocol (MCP) was announced less than a year ago in [November 2024](https://www.anthropic.com/news/model-context-protocol), and it has achieved so much [popularity](https://trends.google.com/trends/explore?date=2024-11-01%202025-08-30&q=%2Fg%2F11x5hnm0vb,mcp,mcp%20server&hl=en). But then what is MCP? MCP stands for Model Context Protocol. Think of it as a universal translator or a "[USB-C port for AI applications](https://modelcontextprotocol.io/docs/getting-started/intro)”. Just as a USB-C cable allows you to connect various devices to your computer seamlessly, MCP provides a standardized way for Large Language Models (LLMs), such as GitHub Copilot, to communicate with external data sources and tools.

In essence, as per the [specification](https://modelcontextprotocol.io/specification/2025-06-18), MCP standardizes how applications share contextual information with LLMs and how AI systems can expose and utilize external tools and capabilities. This means that instead of an AI model operating in a vacuum, it can tap into the rich, real-world context of your development environment. This protocol is open, meaning anyone can implement and use it, fostering a vibrant ecosystem of integrations.

The goal of MCP is to make AI assistants more informed and capable, turning them into true teammates that can handle complex, multi-step projects with real-time access to external resources using an [MCP server](https://modelcontextprotocol.io/docs/tutorials/use-remote-mcp-server), which can be local or remote. It's about making your AI tools understand your world better.

## Official GitHub MCP server

Now that you understand the power of MCP, let's talk about the official [GitHub MCP server](https://github.com/github/github-mcp-server). This server is a specific implementation of the Model Context Protocol, provided and maintained by GitHub [itself](https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/about-mcp). Its primary purpose is to connect your AI tools directly to GitHub's platform, enabling them to interact with your repositories, issues, pull requests, and more through a structured and secure interface.

The GitHub MCP server acts as a bridge, enabling AI assistants to manage repositories, automate issues and pull requests, gain CI/CD insights with GitHub Actions, and perform other tasks. It is [open source](https://github.com/github/github-mcp-server) and also used for the remote GitHub MCP server.

There are two main ways you can utilize the GitHub MCP server: running it locally or connecting to a remote, hosted version. Let's explore both.

### Using GitHub MCP server locally

For those who prefer a hands-on approach or need a highly controlled environment, you can run the GitHub MCP server directly on your local machine. This typically involves using Docker, which encapsulates the server and its dependencies, ensuring a consistent environment.

You will need Docker and a personal access token from GitHub to run the image of the open-source, official GitHub MCP server. Although this is not difficult to do, some effort and maintenance are surely involved. You can follow the official [docs](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/provide-context/use-mcp/use-the-github-mcp-server?tool=vscode#local-mcp-server-setup) on how to run it locally. You can see one way of running the GitHub MCP server below:

```bash
docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN=<your-token> -e GITHUB_TOOLSETS="repos,issues,pull_requests,actions,code_security,experiments" ghcr.io/github/github-mcp-server
```

While running the GitHub MCP server locally gives you control, it often comes with the overhead of infrastructure management. This is where the remote GitHub MCP server shines.

### Remote GitHub MCP server

For most teams and individual developers, the remote GitHub MCP server offers a significantly more streamlined and hassle-free experience. This version is hosted and managed directly by GitHub, eliminating the need for you to worry about Docker containers, manual updates, or [infrastructure maintenance](https://github.blog/ai-and-ml/generative-ai/a-practical-guide-on-how-to-use-the-github-mcp-server/). On top of that, as you are using the Oauth authentication and not a personal access token, it s a better alternative from a security point of view as well.

There are multiple advantages to using the remote GitHub MCP server, which GitHub manages. There is no infrastructure overhead for you; getting started is much easier (just add a URL, authenticate, and you are good to go). As you are using a remote server, it will work on any device, including a remote machine/Cloud Shell running on a VM on a remote server. 

 The remote GitHub MCP server is currently in [Public Preview](https://github.com/github/github-mcp-server?tab=readme-ov-file#install-in-other-mcp-hosts). While access may be gated depending on the authentication type, it's the recommended path for most users due to its ease of use and reduced management burden. It allows you to focus on what you do best: writing code and building amazing things, not running an extra Docker container on your machine. 

## Remote GitHub MCP server on VS Code with Copilot

This is where the magic truly happens. Integrating the remote GitHub MCP server with VS Code and GitHub Copilot elevates your AI-assisted development to a whole new level. Copilot, already a powerful coding assistant, becomes an even more intelligent and context-aware partner when it can access your GitHub data through MCP.

When you use Copilot in VS Code with the GitHub MCP server configured, Copilot Chat's "Agent Mode" can perform complex tasks by invoking specialized tools exposed by the MCP server. This means you can interact with your GitHub repositories using natural language prompts, and Copilot will translate those into actions via the MCP server.

For example, instead of manually navigating GitHub to create an issue, you could simply prompt Copilot: "Create a new issue on this repository for fixing a bug with the submit button style.". The agent would then use the MCP server to interact with GitHub's APIs, creating the issue on your behalf. Similarly, you can ask it to create a pull request, list the last run GitHub action, and do many other things. 

### Step-by-step guide to connect VS Code to the remote GitHub MCP server

To connect the remote GitHub MCP server with your VS Code and Copilot, you will surely need VS Code (V1.92 or later) with the [GitHub Copilot extension](https://code.visualstudio.com/docs/copilot/overview) installed and a valid GitHub account. Also the current project should have a connected GitHub repository. With that in mind, let’s start:

#### Install the remote MCP Server

To install a new MCP server on VS Code:

1. Open the command palette (Cmd+Shift+p on a Mac) and run `> MCP: Add Server…` 
2. In the next step, select `HTTP (HTTP or Server Sent Events) Connect to a remote…`
3. For the Server UR,L put `https://api.githubcopilot.com/mcp/` and hit Enter to confirm
4. Then, name the server `github-remote-mcp-server` or something you feel is appropriate and hit Enter
5. After that, select `Global` or `Workspace`. In my case, I selected `Global` so that it runs on all projects
6. Then it will ask you to allow the extension, click on “Allow”
7. After that, it will ask for authentication. For that, select your GitHub account, which was `geshan` in my case
8. This will take you to the GitHub auth page to give the correct permissions.
9. To test if it is connected, run this curl `curl -I https://api.githubcopilot.com/mcp/_ping`. You will see an output like below (and your VS Code will look similar):


<img class="center" src="/images/github-mcp-vscode/02github-remote-mcp-running.jpg" loading="lazy" title="Remote GitHub MCP server connected, authenticated and running on VS Code" alt="Remote GitHub MCP server connected, authenticated and running on VS Code">

Great! You have successfully connected the remote GitHub MCP server with our VS Code. If you want to give only read-only access, add the following, below the URL in the `mcp.json` file:

```json
"headers": {
        "X-MCP-Readonly": "true"
      }
```

Next, you will list pull requests for a repo.

#### List the pull requests for a repo

To list pull requests, you can type `#list_pull_requests` in your GitHub Copilot `Agent` mode, it will figure out the GitHub repo and try to list the open pull requests if any. If there are none, type in `list last three merged pull requests` in a new GitHub Copilot chat, it should list them as below:

<img class="center" src="/images/github-mcp-vscode/03github-mcp-list-pull-requests.jpg" loading="lazy" title="Listing pull requests on VS Code with GitHub Copilot Agent Mode on the current project" alt="Listing pull requests on VS Code with GitHub Copilot Agent Mode on the current project">

#### Other things to do with remote GitHub MCP Server

You can ask Copilot `What operations can you do on GitHub with the mpc server?` It will list down the things it can do, as follows:

<img class="center" src="/images/github-mcp-vscode/04github-copilot-mcp-operations.jpg" loading="lazy" title="Asking GitHub Copilot what operation can the GitHub MCP server do" alt="Asking GitHub Copilot what operation can the GitHub MCP server do">

From here, you can chat and know or do things you want with GitHub, like listing gists, creating gists, interacting with issues, or even opening a pull request directly from VS Code.

#### MCP server settings

You can also go to the settings and turn on or off any of the remote GitHub MCP server tools as per your need, as seen below:

<img class="center" src="/images/github-mcp-vscode/05github-mcp-tools.jpg" loading="lazy" title="Listing all the tools in the remote GitHub MCP server in the GitHub Copilot settings" alt="Listing all the tools in the remote GitHub MCP server in the GitHub Copilot settings">

There you have it, a way to interact and do things with GitHub without leaving your VS Code editor.

## Conclusion

In this post, you learned about what MCP is and how to use the GitHub MCP Server. You can use the GitHub MCP server locally with Docker or without installing anything with the remote option.  After that, you learned how to use the remote GitHub MCP server on VS Code with GitHub Copilot. First, connect to the MCP server and authenticate, then perform a couple of tasks, such as listing the pull requests for the current repository. You also took a quick look at the tools of the GitHub MCP server and learned how to turn these tools on or off as needed.

I hope you have gained some new knowledge about MCP in general and the official GitHub remote MCP server. Carry on learning!
