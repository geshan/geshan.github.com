---
layout: post
title: "Getting started with Docker-compose, a quick tutorial"
date: 2024-04-27T22:51:47.000+11:00
comments: true
tags:
- Software Engineering
- Docker
cover: "/images/docker-compose-tutorial/01docker-compose-tutorial.jpg"
pagetitle: "Getting started with Docker-compose, a quick tutorial"
description: "Learn the main concepts docker compose, in this handy tutorial. You can get staretd quickly with docker compose reading this."
keywords: docker compose tutorial, docker-compose tutorial, tutorial docker compose
---
Docker Compose is a powerful tool that simplifies the management and possible deployment of multi-container applications. Whether you're a seasoned developer or just starting your containerization journey, Docker Compose can streamline your workflow and boost your productivity. Let’s get going!

<!-- more -->

<img class="center" src="/images/docker-compose-tutorial/01docker-compose-tutorial.jpg" title="Docker for beginners: a guide to understanding the concepts" alt="Docker for beginners: a guide to understanding the concepts">

## Table of contents

* [What is Docker Compose?](#what-is-docker-compose)
* [Why use Docker Compose?](#why-use-docker-compose)
* [How to use Docker Compose](#how-to-use-docker-compose)
    * [Install Docker Compose](#install-docker-compose)
    * [Define your Application in docker-compose.yml](#define-your-application-in-docker-composeyml)
    * [Build and Run your Application](#build-and-run-your-application)
    * [Additional Commands](#additional-commands)
* [Code for Docker Compose Usage](#code-for-docker-compose-usage)
* [Slides](#slides)
* [Conclusion](#conclusion)

## What is Docker Compose?

Imagine you're building an application that requires multiple services, like a web server, a database, and a cache. Traditionally, setting up and managing these services individually would be cumbersome and error-prone. Docker Compose comes to the rescue by providing a declarative approach to define and run multi-container Docker applications. If you want to learn more about Docker, you can read [docker for beginners](/blog/2024/04/docker-for-beginners/).

At its core, Docker Compose uses a YAML file (docker-compose.yml) to describe your application's services, networks, and volumes. This single file acts as a blueprint, specifying how each container should be built, configured, and interconnected. With a single command, you can then bring your entire application stack up or down, making it incredibly convenient for development, testing, and deployment.

Docker defines [docker-compose](https://docs.docker.com/compose/) as:

> Docker Compose is a tool for defining and running multi-container applications. It is the key to unlocking a streamlined and efficient development and deployment experience.

In essence, docker-compose lets you run multiple related containers to formulate an application with all its dependent components. In the next section, you will learn about why to use docker-compose.

## Why use Docker Compose?

Docker Compose offers a multitude of benefits that simplify the development and deployment process for multi-container applications:

* **Declarative Configuration:** The YAML file provides a clear and concise way to define your application's infrastructure, eliminating the need for complex scripts or manual configuration.

* **Simplified Management:** With Docker Compose, you can manage the entire lifecycle of your application with a few simple commands. Start, stop, and rebuild services effortlessly.
* **Isolation and Reproducibility:** Each service runs in its own container, ensuring isolation and preventing conflicts between dependencies. This also guarantees reproducibility across different environments.

* **Efficient Development Workflow:** Docker Compose speeds up the development process by allowing you to quickly spin up and tear down your application stack, making it ideal for iterative development and testing.

* **Portability:** The docker-compose.yml file is portable, allowing you to easily share your application configuration with other developers or deploy it to different environments.

On top of all that, for the developer it is much easier to get the whole app running with docker compose, you just hit `docker compose up`  and get a coffee, possibly your app is already up and running.

## How to use Docker Compose

Getting started with Docker Compose is straightforward:

### Install Docker Compose

Ensure you have Docker installed on your system, and then download and install Docker Compose. Depending on your operating system, you can follow the [steps](https://docs.docker.com/compose/install/) to get docker compose as part of docker or even as a standalone application.

### Define your Application in docker-compose.yml

Create a docker-compose.yml file in your project's root directory. This file will define your services, networks, and volumes.

### Build and Run your Application

Use the `docker-compose up` command to build the images (if necessary) and start your application. Docker Compose will handle the orchestration and networking of your services.

### Additional Commands

* `docker-compose build`: Builds or rebuilds your services.
* `docker-compose down`: Stops and removes containers, networks, and volumes.
* `docker-compose ps`: Lists the status of your services.
* `docker-compose logs`: View logs from your services.
* `docker-compose exec`: Execute a command in a running container.

Let’s have a look at the above in action, in the next section of this docker compose tutorial blog post.

## Code for Docker Compose Usage

Here's a basic example of a docker-compose.yml file for an application with a web server and a database:

<img class="center" loading="lazy" src="/images/docker-compose-tutorial/02docker-compose-tutorial-example.jpg" title="Example docker comopose file showing the dependency of the api container to the db container" alt="Example docker comopose file showing the dependency of the api container to the db container">

This example defines two services: `api` and `db`. The `api` service builds an image from the Dockerfile in the current directory and maps port 3000 of the container to port 3000 of the host machine. It also specifies that it depends on the `db` service, ensuring that the database is initiated to start before the web server.

The `db` service uses the official PostgreSQL image Alpine Linux flavor and sets an environment variable for the user and password. You can find the docker-compose file and all the other code of this Node.js application as a [GitHub repository](https://github.com/geshan/nodejs-postgres-docker-compose/tree/master). You can learn more about the docker-compose [file](https://github.com/geshan/nodejs-postgres-docker-compose/blob/master/docker-compose.yml) as seen below:

```bash
version: '3.8'
services:
  db:
    image: postgres:14.1-alpine
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    ports:
      - '5432:5432'
    volumes: 
      - db:/var/lib/postgresql/data
      - ./db/init.sql:/docker-entrypoint-initdb.d/create_tables.sql
  api:
    build:
      context: ./
      target: production
    image: quotes-api
    depends_on:
      - db
    ports:
      - 3000:3000
    environment:
      NODE_ENV: production
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: postgres
      DB_NAME: postgres
    volumes:
      - ./:/src
      - /src/node_modules
volumes:
  db:
    driver: local
```

Let’s look at how the docker compose file is structured.

First, `version: '3.8'` - This line specifies the Docker Compose file format version. Then the services needed for the [Node.js Postgres](/blog/2021/01/nodejs-postgresql-tutorial/) docker application with [Postgres and Docker compose](https://geshan.com.np/blog/2021/12/docker-postgres/) are defined.

Among them `db` is the first service, this service defines a Postgres database container with:

*` image`: postgres:14.1-alpine - This specifies the Docker image to use, which is the official Postgres image with version 14.1 and the Alpine Linux base.
* `restart`: always - Ensures the database container restarts automatically if it crashes or the system reboots.
* `environment` - Sets environment variables for the container:
    * `POSTGRES_USER=postgres` & `POSTGRES_PASSWORD=postgres` - Credentials for accessing the database. (Note: Consider using environment secrets management in production for better security).
* `ports` - Maps the container's port 5432 (default Postgres port) to the host machine's port 5432. This allows you to connect to the database from the host using localhost:5432.
* `volumes` - Defines persistent storage for the database:
    * `db:/var/lib/postgresql/data` - This volume named db is mounted to the container's * /var/lib/postgresql/data directory, which stores the database files. This ensures data persistence even if the container restarts.
    * `./db/init.sql:/docker-entrypoint-initdb.d/create_tables.sql` - Mounts a local SQL script (`./db/init.sql`) from the project directory to the` /docker-entrypoint-initdb.d/create_tables.sql` path inside the container. This script creates tables in the database upon container startup.

The next service is `web`, this service defines a Node.js API container. It has the following parts:

* `build` - Instructs Docker Compose to build the image for this service from a Dockerfile located in the current directory (./).
* `context`: ./ - Specifies the context directory for the build process (the project root in this case).
    * `target`: production - If your Dockerfile has multiple build stages, this defines the target stage to use for building the image (likely containing production dependencies).
* `image`: quotes-api - Sets the name for the built image.
* `depends_on` - Declares that the api service depends on the db service. This ensures the database container is up and running before starting the API container. You can read more about [docker compose depends on](/blog/2024/02/docker-compose-depends-on/) in this guide.
* `ports` - Maps the container's port 3000 (where the API runs) to the host machine's port 3000.
* `environment` - Sets environment variables for the API container:
    * `NODE_ENV`: production - Sets the Node environment to production mode, it influences how your API behaves with thing like caching
    * Variables like `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` provide connection details for the database container (accessible using the service name db).
* volumes - Mounts directories for the API container:
    * `./:/src` - Mounts the entire project directory (./) into the container's /src directory, making your code accessible within the container.
    * `/src/node_modules` - This is an interesting volume. It mounts the /src/node_modules directory of the container back to the host machine at the same location. This can be useful to avoid rebuilding dependencies every time the container restarts, but be aware of potential caching issues.

All you need to do is clone the [repository](https://github.com/geshan/nodejs-postgres-docker-compose) and run `docker-compose up` which will give the following output (it may take some time to download the base images if you are running it for the first time):

<img class="center" loading="lazy" src="/images/docker-compose-tutorial/03docker-compose-working.jpg" title="Node.js app with Postgres DB running with docker compose locally" alt="Node.js app with Postgres DB running with docker compose locally">

You see the running app at `http://localhost:3000/quotes` that will look something like the below:

<img class="center" loading="lazy" src="/images/docker-compose-tutorial/04nodejs-app-running.jpg" title="Node.js app with Postgres DB running on the browser" alt="Node.js app with Postgres DB running on the browser">

There you have it a quick and useful tutorial to using docker-compose. In the next section you will find the same content in the form of slides.

## Slides

<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRU3dgiMffLJ42tsl7Ow-slZYQbqOjmHtTvd55QmT7-3MGwirQyNM8352tWNx-uXEWaEOQjyJBhKoaj/embed?start=false&loop=false&delayms=3000" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Conclusion

Docker Compose is a valuable tool for any developer working with multi-container applications. It simplifies the development and deployment process, promotes reproducibility, and allows you to focus on building great applications rather than managing infrastructure. 

> By leveraging the power of Docker Compose, you can streamline your workflow and bring efficiency to your containerized applications. 

So, dive in, experiment, and experience the benefits of Docker Compose for yourself!
