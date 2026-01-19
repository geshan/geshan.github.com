---
layout: post
title: "A Beginner's Guide to Using Deno with Docker and Docker Compose"
date: 2024-07-04T20:56:37.000+11:00
comments: true
tags:
- Docker
- Javascript
cover: "/images/deno-docker/01deno-docker.jpg"
pagetitle: "A Beginner's Guide to Using Deno with Docker and Docker Compose"
description: "Learn how to use Deno with Docker and Docker compose in this quick and useful guide"
keywords: deno docker, deno docker compose, docker deno, docker compose deno, fresh docker, deno fresh docker
---
Deno is a relatively new runtime environment for JavaScript and TypeScript that has gained some attention in recent years. Docker is the leader in the container world and is the defacto tool for building, shipping, and running applications in containers. In this post, you will learn how to run a basic Deno application with Docker and Docker Compose. Let’s dive in!


<!-- more -->

<img class="center" src="/images/deno-docker/01deno-docker.jpg" title="A Beginner's Guide to Using Deno with Docker and Docker Compose" alt="A Beginner's Guide to Using Deno with Docker and Docker Compose">


## Deno and Why Use It

Deno is a modern JavaScript and TypeScript runtime created by Ryan Dahl, the original creator of Node.js. It's designed to address some of the issues and limitations found in Node.js. In his own words:

> Deno is JavaScript for professional software engineers. Simple, secure, optimal.

You can watch the full talk below:

{% youtube "VDKJ1rSj-NI" %}

The official Deno website also talk about [Node.js’ complexity](https://deno.com/learn/nodes-complexity-problem). In the next section you wil learn about why use Deno.

### Why use Deno

There are many reasons to use Deno. It is faster and more secure, uses TypeScript
by default and is built to be more modular.

#### Faster and More Secure

Deno is faster and more secure than Node.js because it uses a secure-by-default model.
In Node.js, scripts can access the file system, network, and environment variables by
default. This can lead to security vulnerabilities if a script is malicious. In Deno,
scripts must explicitly be granted permission to access these resources. This makes
Deno more secure by default. A blog post comparing [Deno and Node’s performance](https://medium.com/deno-the-complete-reference/deno-vs-node-js-performance-comparison-for-file-server-9af26133c800) concludes `Node.js’s file serving seems slower compared to Deno. Also, Node.js uses more CPU and memory.`

#### Uses TypeScript by Default

Deno has built-in support for TypeScript, a typed superset of Javascript. This means you can write type-safe code in Deno without needing to install any additional tools.
[TypeScript](https://www.typescriptlang.org/) can help you catch errors early in the development process and make your code more maintainable. Deno still converts TypeSciprt to JavaScript for [executing](https://docs.deno.com/runtime/manual/advanced/typescript/overview/#how-does-it-work%3F) it.

#### Built to be More Modular

Deno is designed to be more modular than Node.js, with a focus on using ES modules. ES modules are a modern JavaScript module system that is more standardized and easier to use than the CommonJS module system used by Node.js. Apparently, you can create a [blog with 2 lines](https://deno.land/x/blog@0.7.0) of code.

There are other reasons to use Deno too like it has a dependency inspector with `deno info` and built-in code formatter with `deno fmt`. In the next section, you will dive into using Deno with Docker.

## Deno Docker Example

Let’s jump to the practical part now, we will use a simple Deno Fresh application to see how we can dockerize it. I have already created a basic Deno fresh app and open-sourced it on [GitHub](https://github.com/geshan/deno-fresh-docker). 

Before getting into the technical details, let’s talk about what Deno fresh is. The [official website](https://fresh.deno.dev/) of Deno Fresh has a tagline saying  “The simple, approachable, productive web framework. The framework so simple, you already know it”. 

The official [docs](https://fresh.deno.dev/docs/introduction) further state:

> Fresh is a full stack modern web framework for JavaScript and TypeScript developers, designed to make it trivial to create high-quality, performant, and personalized web applications.

For this Deno and Docker example, I wanted to give an example that can be built into an app rather than just a simple web server on Deno. Fresh is the Express equivalent of Deno with batteries included. Now let’s get your hands dirty with some code.

### Step 1: Install Deno

To install Deno follow the official [installation guide](https://docs.deno.com/runtime/manual/getting_started/installation/). For my machine I ran:

```bash
curl -fsSL https://deno.land/install.sh | sh
```

Then to test it out, I executed `deno –version` which resulted in (at the time of writing this blog post):

```bash
deno 1.44.4 (release, aarch64-apple-darwin)
v8 12.6.228.9
typescript 5.4.5
```

### Step 2: Set up Fresh

Now to install a new copy for fresh, you can run:

```bash
deno run -A -r https://fresh.deno.dev
```
It will download somethings and then ask you give a name for the project, you can go with `fresh-project` as the default name. Then you can select, `tailwind` option 1 as your styling library. After that you can select to use or not use VS Code. I selected `y` as seen below:

<img class="center" loading="lazy" src="/images/deno-docker/02install-deno-fresh.jpg" title="Installing Deno fresh with local deno command" alt="Installing Deno fresh with local deno command">

To run a fresh Demo Fresh project you can then execute:

```bash
cd fresh-project
deno task start
```

This will start your app at `http://localhost:8000`, if you go to that URL on your browser you will see:

<img class="center" loading="lazy" src="/images/deno-docker/03deno-fresh-running.jpg" title="Deno fresh running with local deno command" alt="Deno fresh running with local deno command">

Stop the server and you can make a small change on the default Fresh install. On the editor/IDE of your choice open the `fresh-project` folder and edit the `/routes/index.tsx` file as follows:

<img class="center" loading="lazy" src="/images/deno-docker/04edit-fresh-template.jpg" title="Add 'on Docker' to the Deno Fresh template" alt="Add 'on Docker' to the Deno Fresh template">

Add `on Docker` at line 16 of the `/routes/index.tsx` file and save it. Then run the server again with `deno task start` and it will show up on your browser at `http://localhost:8000`. It will look like the below:

<img class="center" loading="lazy" src="/images/deno-docker/05deno-on-docker.jpg" title="Result of Deno Fresh template change" alt="Result of Deno Fresh template change">

In the next step, you will Dockerize the Deno Fresh app.

### Step 3: Dockerize Deno Fresh

To Dockerize your Deno Fresh you will add a file called `Dockerfle` at the root of the project with the following contents:

```bash
FROM denoland/deno:alpine-1.44.4

WORKDIR /app

COPY . .
RUN deno cache main.ts
RUN deno task build

USER deno
EXPOSE 8000

CMD ["run", "-A", "main.ts"]
```

This Dockerfile is used to create a Docker container for a Deno application. Here's a breakdown of its contents:

1. `FROM denoland/deno:alpine-1.44.4`: This line specifies the base image for the container. It uses the Deno image based on Alpine Linux, version 1.44.4. Alpine Linux is chosen for its small size and security.

2. `WORKDIR /app`: Sets the working directory inside the container to `/app`. All subsequent commands will be run from this directory.

3. `COPY . .`: Copies all files from the current directory on the host machine to the current working directory (`/app`) inside the container.

4. `RUN deno cache main.ts`: Caches the dependencies of the [`main.ts`](https://github.com/geshan/deno-fresh-docker/blob/master/main.ts) file. Deno downloads and compiles dependencies ahead of time, and this command ensures that all dependencies are cached in the image, reducing the startup time of the container.

5. `RUN deno task build`:  Runs the `build` task for Fresh that will create a _fresh folder which holds all the generated [assets](https://deno.com/blog/fresh-1.4).

6. `USER deno`: Switches the user context to `deno`. This is for security reasons, to not run the application as the root user.

7. `EXPOSE 8000`: Informs Docker that the container listens on port 8000 at runtime. This does not actually publish the port; it functions as a form of documentation between the person who builds the image and the person who runs the container.

8. `CMD ["run", "-A", "main.ts"]`: Specifies the default command to run when the container starts. In this case, it runs the Deno application with the command `deno run -A main.ts`. The `-A` flag gives the script all permissions, which include network access, file system access, etc.

This Dockerfile is a straightforward way to containerize a Deno application, ensuring it runs in a lightweight, secure environment with all its dependencies properly cached. You can also use [multi-stage docker build](/blog/2019/11/how-to-use-docker-multi-stage-build/) to reduce the size of the final image, but for this example, a single-stage build is sufficient. If you want a refersher on Docker, please do read this [docker for beginners](/blog/2024/04/docker-for-beginners/) guide.

Given you have creaded the `Dockerfile` you can build it into a Docker image with:

```bash
docker build -t my-fresh-app .
```

It will result in something as follows (I am using Docker version 24.0.2, build cb74dfc on a Mac):

<img class="center" loading="lazy" src="/images/deno-docker/06deno-docker-build.jpg" title="Docker build result for Deno app (Fresh)" alt="Docker build result for Deno app (Fresh)">


To run Deno Fresh on a Docker container you can execute:

```bash
docker run -p 8000:8000 my-fresh-app
```

It will result in:

<img class="center" loading="lazy" src="/images/deno-docker/07deno-docker-run.jpg" title="Docker run result for Deno app (Fresh)" alt="Docker run result for Deno app (Fresh)">


If you hit `http://localhost:8000` you will see the Fresh page with `Welcome to Fresh on Docker`.

### Step 3: Docker compose with Deno

In this part, you will add a new `docker-compose.yaml` file in the root of the folder with the following contents:

```bash
version: '3.8'
services:
  app:
    container_name: deno_fresh_app
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    command: deno run -A main.ts
```

To run your Fresh app with Docker Compose you can run `docker compose build` which will build the image.

<img class="center" loading="lazy" src="/images/deno-docker/08deno-docker-compose-build.jpg" title="Docker build result for Deno app (Fresh)" alt="Docker compose build result for Deno app (Fresh)">

Then run `docker compose up` to run the app container. It will give an output like the following one:

<img class="center" loading="lazy" src="/images/deno-docker/09deno-docker-compose-up.jpg" title="Docker compose up result for Deno app (Fresh)" alt="Docker compose up result for Deno app (Fresh)">

Due to how things are cached, you might need to run `deno task build` locally to get the `_fresh` folder to be mapped with volumes for Docker compose. If you want a [nodemon](/blog/2021/02/nodemon/) like experience you can use [denon](https://deno.land/x/denon@2.5.0). If you want to learn more about Docker comoose you can check this [docker compose tutorial](/blog/2024/04/docker-compose-tutorial/).

All of the code is in this open-source [GitHub](https://github.com/geshan/deno-fresh-docker) repository. You can clone it and try it out yourself. If you have any questions or suggestions, feel free to open an issue or a pull request.

## Conclusion

Congratulations! You've successfully created a Deno Fresh application, containerized it with Docker, and managed it with Docker Compose. This guide has provided you with the foundational skills to work with Deno and Docker, and you're now equipped to build and deploy scalable applications. Keep Docerkizing!
