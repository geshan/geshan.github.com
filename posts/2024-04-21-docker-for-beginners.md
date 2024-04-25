---
layout: post
title: "Docker for beginners: a guide to understanding the core concepts"
date: 2024-04-21T22:58:47.000+11:00
comments: true
tags:
- Software Engineering
- Docker
cover: "/images/docker-for-beginners/01docker-for-beginners.jpg"
pagetitle: "Docker for beginners: a guide to understanding the core concepts"
description: "Learn the main concepts of containerization and Docker, from image, Docker file to running containers in this blog post."
keywords: docker for beginners, docker beginners
---
Docker has revolutionized the way we build, ship, and run applications. By packaging software into standardized units called containers, Docker offers numerous benefits, including portability, efficiency, and scalability. In this tutorial, you will delve into the fundamentals of Docker, guiding you from the basic concepts of Docker for beginners, and empowering you to utilize this powerful technology in your projects. Let’s get started!

<!-- more -->

<img class="center" src="/images/docker-for-beginners/01docker-for-beginners.jpg" title="Docker for beginners: a guide to understanding the concepts" alt="Docker for beginners: a guide to understanding the concepts">

## Table of contents

* [What are Containers?](#what-are-containers)
* [What is Docker?](#what-is-docker)
* [Why Use Containers and Docker?](#why-use-containers-and-docker)
* [Containers vs. Virtual Machines](#containers-vs.-virtual-machines)
* [Docker Concepts](#docker-concepts)
    * [Dockerfile](#dockerfile)
    * [Docker Image](#docker-image)
    * [Docker Container](#docker-container)
* [Essential Docker Commands](#essential-docker-commands)
* [The slides](#the-slides)
* [Conclusion](#conclusion)

## What are Containers?

Imagine a container as a self-contained unit, a microcosm encapsulating everything an application requires to run smoothly. It holds the code, runtime, system tools, libraries, and crucial settings, creating a consistent and reliable environment. This approach eliminates the infamous "it works on my machine" problem, where an application behaves differently in distinct environments.

Containers offer a standardized and portable way to package and distribute applications, ensuring consistent performance across various platforms and infrastructures. Developers can create and test their applications in a controlled containerized environment, replicating production conditions. This streamlined approach minimizes discrepancies and surprises when deploying the application to different environments, such as testing, staging, and production.

By leveraging containers, organizations can streamline their application development and deployment processes. Teams can work collaboratively, knowing that their applications will behave (mostly) consistently, regardless of their development environments. This promotes efficiency, reduces troubleshooting time, and facilitates seamless transitions between different stages of the software development lifecycle.

Docker is the defacto container technology (another one is [rkt](https://www.redhat.com/en/topics/containers/what-is-rkt) but it is almost dead in 2024. Docker is a container engine, platform, and company, in the next section you will learn about Docker the container engine.

## What is Docker?

Docker is a platform that revolutionizes the way applications are developed, deployed, and executed. It leverages the concept of containers, which are lightweight, isolated environments that encapsulate an application and its dependencies.

Amazon defines Docker as:

> Docker is a software platform that allows you to build, test, and deploy applications quickly. Docker packages software into standardized units called containers that have everything the software needs to run including libraries, system tools, code, and runtime.

At the heart of Docker lies a runtime environment that orchestrates the creation and management of containers. Just like a ship's engine propels it forward, Docker's runtime environment provides the infrastructure and tools needed to build, manage, and distribute containerized applications.

Docker's command-line interface (CLI) offers a wide range of commands that give you granular control over the entire container lifecycle. These commands let you create, run, stop, inspect, and manage containers with ease. Docker has a big community and ecosystem behind it that enables it to be an important player in the Devops and SRE scene.

Next, you will learn about why to use Containers and Docker, carry on reading.

## Why Use Containers and Docker?

The simple reason to use Docker is you can ship your machine, how?

<img class="center" loading="lazy" src="/images/docker-for-beginners/02docker-works.jpg" title="Works on your machine, ship your machine" alt="Works on your machine, ship your machine">

Apart from the above [meme](https://www.reddit.com/r/ProgrammerHumor/comments/cw58z7/it_works_on_my_machine/​​). On a serious note, several compelling reasons drive developers and businesses toward Docker, some of them are:

1. **Reproducibility**: Docker packages the entire application stack, including all of its dependencies, into a single container. This ensures that the application will behave consistently across different environments, eliminating dependency issues and making it easier to reproduce results.
1. **Efficiency**: Docker containers share the host operating system's kernel, which makes them lightweight and efficient compared to virtual machines. This translates to faster startup times, lower resource utilization, and improved performance.
1. **Scalability**: Docker containers can be easily scaled horizontally by adding more containers. This makes it easy to adapt to changing demands, such as spikes in traffic or seasonal fluctuations.
1. **Portability**: Docker containers run seamlessly across different platforms and cloud providers. This promotes flexibility and vendor independence, making it easier to deploy applications anywhere.
1. **Developer Productivity**: Docker simplifies the development process by providing a consistent environment and reducing setup time. This allows developers to focus on writing code, rather than spending time on infrastructure.

As you are aware of the reasons to use containers and docker before containers Virtual machines were used as the unit of shipping software. Let’s understand the difference between containers and VMs in the next section. 

## Containers vs. Virtual Machines

While containers and virtual machines (VMs) both offer isolated environments, their approach differs significantly:

* **VMs:** Include a full operating system, making them resource-intensive and slower to start.
* **Containers:** Share the host OS kernel, resulting in lighter weight and faster startup times.

Think of VMs as houses and containers as apartments within a larger building. Both provide isolation, but apartments share resources like electricity and plumbing, making them more efficient. A better analogy to follow is that VMs are pets whereas containers are cattle as depicted below and mentioned by [Engine Yard](https://www.engineyard.com/blog/pets-vs-cattle/):

<img class="center" loading="lazy" src="/images/docker-for-beginners/03pets-vs-cattle.jpg" title="Pets vs cattle analogy for VMs vs containers" alt="Pets vs cattle analogy for VMs vs containers">

Consequently, you will learn about the concepts of Docker from a development perspective.

## Docker Concepts

Below are the three main concepts to better understand Docker and how it works:

### Dockerfile

It is a text file containing instructions that guide the automated process of building a Docker image.

> Dockefile serves as a blueprint or recipe for creating a custom Docker image based on a specific base image.

The Dockerfile specifies the operating system, software dependencies, application code, and other configurations necessary to set up a container's environment. It enables developers to define the exact steps required to build and configure an application within a container.

### Docker Image

A docker image is a read-only template that encapsulates all the necessary components to run an application. It's created by building a Dockerfile, using Docker's command-line interface or API.

> A Docker image consists of multiple layers, each representing a specific step or instruction defined in the Dockerfile.

Docker images are portable and can be shared across different platforms, facilitating the deployment and distribution of applications.

### Docker Container

A running instance of a Docker image is a container. It's an isolated and encapsulated environment that contains the application, its dependencies, and the necessary runtime components. Docker containers are created from Docker images using the `run` command. They provide a consistent and reproducible runtime environment for applications, allowing them to run reliably across different hosts and cloud platforms.

> Docker containers can be scaled horizontally to handle increased load or perform distributed processing.

This can be better understood visually:

<img class="center" loading="lazy" src="/images/serverless-container/03docker-build-run.jpg" title="Visual representation of Docker build to image and run as container" alt="Visual representation of Docker build to image and run as container"> 

For a more production-like Docker pipeline you will also need a container registry and a different software or service that runs and orchestrates running containers, below is a visual representation of that kind of pipeline:

<img class="center" loading="lazy" src="/images/serverless-container/05docker-run.jpg" title="Visual representation of Docker build to image push to registry, pull and run on a platform" alt="Visual representation of Docker build to image push to registry, pull and run on a platform">

Next, you will know about the Docker commands that will help you work with Docker.

## Essential Docker Commands

At this point, you will need docker installed on your machine (or wherever you want to try the following commands). Depending on your operating system you can find the instructions to install the [Docker engine](https://docs.docker.com/engine/install/) on its website. You can also install the Docker desktop. After you have Docker running locally, you can try executing `docker --version` when that works you can try the following [docker commands](https://geshan.com.np/blog/2022/05/docker-commands/) :

* **docker search:** Finds Docker images on Docker Hub.
* **docker pull:** Downloads an image from a registry to your local machine.
* **docker images:** Lists Docker images on your machine.
* **docker build:** Builds a Docker image from a Dockerfile.
* **docker run:** Creates and starts a new container from a Docker image.
* **docker ps:** Shows running containers; use the `-a` flag to see all containers.
* **docker exec:** Executes a command inside a running container.
* **docker logs:** Displays the logs of a container.
* **docker stop:** Stops a running container.
* **docker rm:** Removes the container
* **docker rmi:** Remove the docker image

You can experiment with [Node.js docker](/blog/2020/11/nodejs-with-docker/) in the step-by-step tutorial.

Subsequently, all the above content has been packaged as a slide too for your convenience.

## The slides

All of the above content is available as slides too:

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTIz0YiwQP5bV90mFNT5RpJOwKYzYeY2LPw26hlulQvhw1dqzQBVUVhbFHKR5PCNb_aO_VquVRS-96d/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

In the next part of this series, you will learn about docker networking and docker-compose.

Next, you will find out the need to learn Docker in today’s world.

## Conclusion

By mastering Docker basics, you unlock the potential to build and deploy applications with greater efficiency and agility, preparing yourself for the modern world of software development. In today’s world, if your job role has the word `engineer` there are a few things you must know like git, working in the command line, and Docker. Hopefully, the main and important concepts of Docker and containerization are much clearer to you now after reading this post, cheers!
