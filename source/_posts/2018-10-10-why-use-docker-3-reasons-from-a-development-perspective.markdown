---
layout: post
title: "Why use docker? 3 reasons from a development perspective"
date: 2018-10-10 15:29:22 +1100
comments: true
categories:
- Technology
- misc
- Docker
- DevOps
cover: /images/why-docker/whale.jpg
description: Docker is super useful for development environment because if it runs on your machine, it runs anywhere. It makes on-boarding new team members a lot easier.
keywords: Docker, Devops, Why use docker, Software Engineering
---

Docker has been popular in the technology space in the past 5 years is an understatement. It has [exploded](https://trends.google.com/trends/explore?date=2013-09-08%202018-10-08&q=%2Fm%2F0wkcjgj) in usage and popularity in half a decade. Containers have taken us by storm. Newer applications without containerization feel like it is missing something. Docker has stood out to be the king in the container arena. This post details the reasons to use Docker for your development environment.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/why-docker/whale.jpg" title="Why use docker? 3 reasons from a development perspective" alt="Why use docker? 3 reasons from a development perspective">

<!-- more -->

## TLDR;

> Docker is super useful for development environment because if it runs on your machine, it runs anywhere. It runs on your friend's machine, on staging and also on production. When a new team member starts, s/he runs 3 commands and the app(s) are running. The new team member can be productive from day 1. Finally, a new version of PHP or MYSQL is coming. You can test your app easily with Docker and make it run in the old version with no issues.

## Docker Docker Docker

You can [read](https://runnable.com/docker/why-use-docker) all you want about Virtual Machines (VMs) vs Containers. And there is a list of reasons to use Docker in the [real-world](https://www.airpair.com/docker/posts/8-proven-real-world-ways-to-use-docker). This piece discusses why to use Docker for development. If you want to go hands read about using [docker and docker compose](https://geshan.com.np/blog/2017/05/how-to-use-docker-compose-with-virtual-hosts-and-services-like-db-for-dev-environment/) for your development environment.

Docker has many advantages but the most important one is the container analogy. That you don't only ship your code but ship the whole OS and all related layers with each deployment in a standard way. It is a complete package containing the right version of OS, the desired version of the language, any external dependencies of your application and your application code. That too in a lightweight, isolated and resource controllable way. This is where docker blows away the VMs.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/why-docker/ship.jpg" title="Why use docker? 3 reasons from a development perspective" alt="Why use docker? 3 reasons from a development perspective">

## Reasons to use Docker for the development environment

If you have read this far, now let's dive into the reasons you would want to use Docker for your development environment:

### 1. Runs on my machine = runs anywhere

If you have correctly dockerized your app and it runs without problems on your machine, 99% of the times it will run smoothly anywhere. By anywhere it means on your friend's machine, on the staging environment and production too. Given all of them have docker installed and configured correctly your app will run. Using docker also makes the application code cloud provider agnostic. Your application can potentially run on AWS or GCP or Azure without issues.

### 2. New team member can be productive from day 1

Think of this, a new team member joins then s/he spends more than a day to set up the machine with the right OS. Setup the language(s) used in the company add database(s) on top of it. 2-3 days is wasted on just getting the environment setup correctly. Enter docker + docker-compose, the new joiner sets up the OS. Installs docker then runs 3-5 commands, grabs some coffee and magic: your apps(s) are running. The new joiner can contribute with the working code on day 1. Think of all the cost a company can save with this approach. A streamlined docker implementation makes it a reality.

### 3. Test app's compatibility with the newer version of language/database

Picture this, a new version of the language you use just released. Like you were using PHP 5.6 and 7.0 has come out. You don't know how much work will be needed to make your application compatible with the new version of the language. Use docker here, you just need to run two different docker containers one running the current version and another running the newer version. You can even test the app side by side to measure performance. This can apply for any programming language.

The same technique can be used to say test MYSQL version 5.7 and 8.0. You might think there are tools like NVM (Node version manager) or RVM (Ruby version manager) but things like that don't exist for each language. Also, you can just use docker than overloading your local machine.

## Conclusion

Docker is a boon to both software engineers and DevOps engineers. It makes releasing software much easier as the whole stack is shipped not only the code. Still, to move your production to Docker many things need to be considered. Things like container builder (for instance [Google cloud build](https://cloud.google.com/cloud-build/docs/)), container orchestration (like [Kubernetes](https://kubernetes.io/)). So before jumping to the container on staging/production be convinced of its benefits on the local development environment. I hope you exploit Docker to extract the most benefit out of it.