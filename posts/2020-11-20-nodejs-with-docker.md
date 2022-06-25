---
layout: post
title: How to use Docker with Node.js a step-by-step tutorial
date: 2020-11-20T20:15:25.000+11:00
comments: true
tags:
- Web Development
- Node.js
cover: "/images/nodejs-docker-docker-compose/00nodejs-docker-docker-compose.jpg"
pagetitle: How to use Docker with Node.js a step-by-step tutorial
description: Follow this 2000+ word step-by-step tutorial to use Docker with Node.js
  using best practices like BUILDKIT and caching with docker compose.
keywords: docker with nodejs, nodejs on docker, docker nodejs, node dockerfile, node.js
  docker, nodejs dockerfile, docker node js development, docker compose, nodejs docker
  compose

---
Both Docker and Node.js have risen in popularity in the past 5 years. Running Node.js on docker containers with docker-compose for local development is a great experience. In this step-by-step tutorial, we will look at how Node.js docker and docker-compose with multi-stage docker build work in sync. Time to get cracking!

<!-- more -->

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/00nodejs-docker-docker-compose.jpg" title="Docker with Node.js and docker compose a step-by-step tutorial" alt="Docker with Node.js and docker compose">

## Table of contents

1.  [Docker the new norm](#docker-the-new-norm)
2.  [Node.js on Docker with high scalability](#node.js-on-docker-with-high-scalability)
3.  [Assumptions for Docker with Node.js](#assumptions-for-docker-with-node.js)
4.  [Steps](#steps)
    1.  [Setup express with express-generator](#1.-setup-express-with-express-generator)
        1.  [1.1 Use express-generator to scaffold the app](#1.1-use-express-generator-to-scaffold-the-app)
        2.  [1.2 Edit the index to see the changes](#1.2-edit-the-index-to-see-the-changes)
        3.  [1.3 Add nodemon to monitor changes and reload](#1.3-add-nodemon-to-monitor-changes-and-reload)
    2.  [Use Node.js on Docker](#2.-use-node.js-on-docker)
        1.  [2.1 Simple docker file for local Node.js docker development](#2.1-simple-docker-file-for-local-node.js-docker-development)
        2.  [2.2 Multi-stage docker file to support Nodejs docker in production](#2.2-multi-stage-docker-file-to-support-nodejs-docker-in-production)
    3.  [Node.js Docker made better with docker-compose](#3.-node.js-docker-made-better-with-docker-compose)
        1.  [3.1 Build the Node.js docker-compose with dev target](#3.1-build-the-node.js-docker-compose-with-dev-target)
        2.  [3.2 Run the Docker with Node.js using docker compose up](#3.2-run-the-docker-with-node.js-using-docker-compose-up)
5.  [TLDR; Give me a quick run down](#tldr%3B-give-me-a-quick-run-down)
6.  [Considerations](#considerations)
7.  [Conclusion](#conclusion)

## Docker the new norm

Docker has [changed the way](/blog/2018/11/4-ways-docker-changed-the-way-software-engineers-work-in-past-half-decade/) we software engineers work in the past 5-7 years.

> Containers have made it easier to ship the whole stack including the OS, not just the code.

There is more than one reason to use docker everywhere, especially in the [development environment](/blog/2018/10/why-use-docker-3-reasons-from-a-development-perspective/). Docker was the second most loved platform in the [Stack Overflow Survey 2020](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-platforms) same as [2019](https://insights.stackoverflow.com/survey/2019#technology-_-most-loved-dreaded-and-wanted-platforms). The same survey 2020 edition also quotes

> “We also see some year over year growth in the popularity of container technologies such as Docker and Kubernetes.”

Docker is used by 35% of all respondents and 39.2% of professional developers. It is safe to say 1/3rd or more software engineers are using docker. In 2020 and beyond, if you are not using docker as a developer you are missing out for sure.

## Node.js on Docker with high scalability

Node.js was initially released in 2009. It has been used for high traffic web applications by big companies like [Paypal](http://highscalability.com/blog/2013/12/11/using-nodejs-paypal-doubles-rps-lowers-latency-with-fewer-de.html), [Netflix](https://netflixtechblog.com/making-netflix-com-faster-f95d15f2e972), [Ebay](https://tech.ebayinc.com/engineering/how-we-built-ebays-first-node-js-application/), and [LinkedIn](http://highscalability.com/blog/2012/10/4/linkedin-moved-from-rails-to-node-27-servers-cut-and-up-to-2.html) to name a few. It has surely been battle-tested in the past 10 years and has proven its mettle. 
It also works well with a big team where [Spotify](https://blog.risingstack.com/how-enterprises-benefit-from-microservices-architectures/#spotifybuildsflawlessuserexperiencewithmicroservices) is an example. It was used by 90 teams and 600 developers at Spotify. As per [W3tech](https://w3techs.com/technologies/details/ws-nodejs), 1% of websites use Node.js.

> 1% of the websites tracked by W3tech might seem a small number, but Node.js is popular in websites with high traffic as mentioned above.

With high [software scalability](/blog/2020/12/software-scalability/) in the picture, it becomes a lot easier to scale the application horizontally with Docker and Kubernetes. We can say thet, using Docker with Node.js enables high scalability.

## Assumptions for Docker with Node.js

1. You have some familiarity with using Node.js (express js or any other framework)
1. You have some experience using Docker (local development, production environments preferred)
1. I am using Docker version 19.03.13 and docker-compose version 1.27.4, I hope you have similar versions.
1. For the first part of this tutorial, we will use Node.js 8 + with npm and [npx](https://www.freecodecamp.org/news/npm-vs-npx-whats-the-difference/) installed.

## Steps

Let’s dive deeper into step-by-step details of this tutorial on how to run a Node.js express demo application on docker with docker-compose.

### 1. Setup express with express-generator

As the first step, it is time to set up a bare-bones Node.js express application. To generate the express js application we will use the [express application generator](https://expressjs.com/en/starter/generator.html).

#### 1.1 Use express-generator to scaffold the app

To generate your demo Node.js express application for docker with Node.js, execute the following commands:

``` bash
npx express-generator --view=pug express-app
```
Notice that we are generating a web app not an API and using [pug](https://pugjs.org/api/getting-started.html) as the templating engine for the views. It should give you an output like below:

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/01setup-nodejs-express-with-generator.jpg" title="Generate Express.js with generator" alt="Output of Node.js Express generator">

Now, let’s run the app to see how it looks on the browser, no Node.js on docker yet. To start the Node.js express application, please run the following commands:

``` bash
cd express-app
npm install
DEBUG=express-app:* npm start
```
After that, you should see something like below:

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/02run-express.jpg" title="Run express with debug enabled" alt="Output of Express run with Debug">

Hit `http://localhost:3000` on a browser like Chrome to check if the app is running correctly. You should see something similar to this:

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/03express-output.jpg" title="Express output on browser" alt="Express output on the browser">

When you hit the homepage on the browser, you will also see some logs on how long the request took to respond on the command line.

At this point, I have added it to git, if you want to view the code it is in this [pull request](https://github.com/geshan/express-app/pull/1/files).

#### 1.2 Edit the index to see the changes

You can edit the page to say something different like `Express on Docker` and `Let’s get started` or something of that sort. To do this we will need to edit 2 files, `/routes/index.js` and `views/index.pug`, like below. You can get the file changes in this [pull request](https://github.com/geshan/express-app/pull/2/files):

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/04nodejs-code-changes.jpg" title="Change some express code" alt="Change on some express node.js code">

It shows up on the browser like below:

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/05express-output-changes.jpg" title="Express code changes on the browser" alt="Code changes of Node.js express refected onn the browser">

#### 1.3 Add nodemon to monitor changes and reload

For a better developer experience, it is best to reload the server when a file changes. To achieve this we use [nodemon](https://nodemon.io/). There are 2 ways to use Nodemon. The first way is to install it as a global node module resulting in a global `nodemon` command. The second one is to have it as a dev dependency local to the project. We will be using the first way with the following command:

``` bash
npm install -g nodemon; #if you don’t have nodemon installed
nodemon bin/www
```

After you run your application index (`bin/www` in this case) with [nodemon](/blog/2021/02/nodemon/) it will restart the server on each file save. Below is an example of how it looks on server restarts on code change:

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/06run-express-with-nodemon.jpg" title="Run Express with nodemon" alt="Running Node.js express with nodemon">

At this stage, you have the generated Node.js express app running. It can also be run with nodemon to restart the Node.js server on every file save. Next stage is to use Node.js on docker. 

### 2. Use Node.js on Docker

To use Node.js on Docker, we will start with a `Dockerfile`. As per the [Docker’s](https://docs.docker.com/engine/reference/builder/) official website:

> A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. Using docker build users can create an automated build that executes several command-line instructions in succession.

We will start with a simple dockerfile and move on to a multi-stage one. We will use a multi-stage build dockerfile so that we have one stage for development and another one for production. In the development stage we will have Nodemon. There will be some optimization for the production docker container, one of them being the absence of not needed Nodemon.

#### 2.1 Simple docker file for local Node.js docker development

Below is the simple Node Dockerfile for the express application:

``` bash
FROM node:14-alpine

WORKDIR /src
COPY package.json package-lock.json /src/
RUN npm install --production

COPY . /src

EXPOSE 3000

CMD ["node", "bin/www"]
```

The dockerfile is simple. It is:

* using `node:14-alpine` as the starting point. We are using alpine because it is a small and secure base image for docker containers.
* We first copy package.json and lock file to the WORKDIR `/src` to exploit docker’s build caching
* Then we run `npm install --production` to get only the needed application dependencies from npm
* After that our application code is copied to `/src`
* Consequently the port is exposed and command to star the server is executed

With good use of Docker caching and BUILDKIT you can get [faster docker builds](/blog/2020/10/docker-build-example-faster-docker-build/). To build the above dockerfile to a Node.js docker image execute the following:

``` bash
DOCKER_BUILDKIT=1 docker build -t nodejs-express-docker .
```

It will take some time. After it is done you should see an output like below:

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/07docker-build-with-biuildkit.jpg" title="Docker build with Buildkit" alt="Docker build output with buildkit use">

Time to run the docker image and see the output for Node.js with Docker on the browser. To do this run the following command:

``` bash
docker run --rm --name nodejs_express -d -p 3000:3000 nodejs-express-docker
```

In the above command:

* `--rm` is used to remove the container when it is stopped
* `--name` is used to name the container running Node.js on docker, it will be used later to see logs and stop the container 
* `-d` is used to detach the container process sending it in the background
* `-p 3000:3000` means the local post 3000 is mapped to container port 3000

Now to know the container is running, run the following command:

``` bash
docker ps
```
 
You should see something like below:

``` bash
CONTAINER ID        IMAGE                   COMMAND                  CREATED             STATUS              PORTS                    NAMES
930b3227688b        nodejs-express-docker   "docker-entrypoint.s…"   4 seconds ago       Up 4 seconds        0.0.0.0:3000->3000/tcp   nodejs_express
```

You can view the logs from the container with the following command:

``` bash
docker logs -f nodejs_express
```
This will attach the command line (bash) to the container logs. Then hit the url `http://localhost:3000` on a browser. You will see some logs. Hit `Ctrl+C` to stop viewing logs. Now you can stop the container with the following command:

``` bash
docker stop nodejs_express
```

Below is a recap of running the docker container, viewing logs and stopping it:

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/08docker-run-simple.jpg" title="Docker run logs and stop" alt="Ouptut of docker run with logs and later stopping it">

This above simple dockerfile is also available as a [pull request](https://github.com/geshan/express-app/pull/3/files) for your convenience. At this juncture, we can proceed to make the Node.js dockerfile even better with [multi-stage docker build](/blog/2019/11/how-to-use-docker-multi-stage-build/).

#### 2.2 Multi-stage docker file to support Nodejs docker in production

We will create 3 stages from the above simple dockerfile. The stages will be as follows:

1. Base: This stage will have things common for docker with Node.js
1. Production: This stage will have components useful for production environment for Node.js on docker. It also uses `npm ci` in place of npm install.
1. Dev: This stage will have nodemon which is only useful for developing Node.js on docker

Below is the modified dockerfile:

``` bash
FROM node:14-alpine as base

WORKDIR /src
COPY package.json package-lock.json /src/
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /src
CMD ["node", "bin/www"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /src
CMD ["nodemon", "bin/www"]
```

You can build the above Node.js dockerfile to run Node.js on docker with the following command:

``` bash
DOCKER_BUILDKIT=1 docker build --target=dev -t nodejs-express-docker-multi-stage .
```

The addition here in this `docker build` command compared to the above one is the inclusion of `--target=dev`. It tells docker to build the `dev` stage not `production`. If you want to build this multi-stage docker file for Node.js on docker use `--target=production` and it will create a docker image optimized for production.

To run the Node.js docker image and attach to its logs, you can run the following comamnd:

``` bash
docker run --rm --name nodejs_express_ms -d -p 3000:3000 -v "$(pwd)":/src nodejs-express-docker-multi-stage && docker logs -f nodejs_express_ms
```

The main difference here from the above docker run command for Node.js with Docker is `-v "$(pwd)":/src`. As we want the server to restart on every file change the current directory is mounted on the docker container’s work dir. With this on each change the sever will restart for Node.js on docker. 

The mulit-stage dockerfile for docker with Node.js can be found in this [pull request](https://github.com/geshan/express-app/pull/4/files). Below is a quick recap of the commands for Node.js docker multi-stage build:

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/09docker-run-multi-stage.jpg" title="Docker run logs and stop with multi-stage" alt="Ouptut of docker run with logs and later stopping it for multi-stage Docker with Node.js">

### 3. Node.js Docker made better with docker-compose

As seen, we had to run long commands like below:

``` bash
docker run --rm --name nodejs_express_ms -d -p 3000:3000 -v "$(pwd)":/src nodejs-express-docker-multi-stage 
```

It was not easy, to say the least. Stopping the running contianer also needed another `docker stop` command. The solution to these issue is using docker-compose with Node.js on docker. Docker compose can be used effectively to sew up multiple services like a database with the applicaiton Node.js docker container.

With docker-compose you can get the application running with just as single commands, `docker compose up`. It will build the containers if they are not built and run them for you. Next, we will see how to do it.

#### 3.1 Build the Node.js docker-compose with dev target

To being with, below is the docker-compose.yml file that can run the applicaiton on docker with Node.js using docker-compose:

``` bash
version: '3.8'
services:
  web:
    build:
      context: ./
      target: dev
    volumes:
      - .:/src
    command: npm start
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: dev
```

The docker compose file has some parts to understand:

* The version is latest at `3.8`
* In services, the web service has `target:dev` being sent so that we build only for the dev stage not production
* The current directory `.` is mounted to the docker container at `/src` so the changes will be reflected in the container too.
* We changed the `npm start` command in the Docker with Node.js to use `nodemon` as we wil use docker compose only for development.
* We pass in only one environment variable `NODE_ENV` as `dev` other environment variables for instance database credentials can also be passed in as environment variables.

We will be using `BUILDKIT` to build docker containers with docker-compose too. To use BUILKIT with docker-compose while building the docker container we can execute the command below:

``` bash
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build
```

Here you see the output of the docker-compose build for docker with Node.js with BUILKIT in action:

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/10nodejs-docker-compose-build.jpg" title="Node.js Docker compose build with build kit" alt="Ouptut of docker bulid with multi-stage docker file using buildkit">

#### 3.2 Run the Docker with Node.js using docker compose up

After the containers are built it can be easily run with `docker-compose up`.
After the Node.js docker containers are built, it can be run with `docker-compose up` like below:

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/11nodejs-docker-compose-up.jpg" title="Node.js Docker compose up" alt="Ouptut of Node.js docker compoase up and logs">

The changes for docker-compose addition is in this [pull request](https://github.com/geshan/express-app/pull/5/files). This is how you can run Node.js on Docker which works very well for Developing as well as putting the containers in production environment.

## TLDR; Give me a quick run down

All the code is in a public [github repository](https://github.com/geshan/express-app). You can run the following commands to get started quickly:

1. Given you have git setup correctly, clone the repo with: `git clone git@github.com:geshan/express-app.git`
1. Then execute `cd express-app`
1. After that run `COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build`, wait for build to finish.
1. Consequently execute: `docker-compose up`, wait for some time to see `nodemon starting...` on your console.
1. Following that, hit `http://localhost:3000` on a browser
1. You should see the following output on your browser:

<img class="center" loading="lazy" src="/images/nodejs-docker-docker-compose/05express-output-changes.jpg" title="Node.js Express code on the browser with docker and docker compose" alt="Node.js Express code on the browser with docker and docker compose">

Enjoy! Now you can reverse engineer the `Dockerfile` and `docker-compose.yml` file. If you have any questions, search for specific thing like say `target` in this post.

## Considerations

There are some considerations you should be aware of:

1. In my expreience, containers on production is run with an orcherstrator like Kubernetes. I believe Docker Swarm (and docker compose) in produciton have lost the race by now.
1. It is best to use Docker build caching and BUILDKIT for faster builds.
1. Docker compose makes it easier to use multiple dependency on development environment. For exmaple if you application depends on MySQL and Redis it can be easily put together in the `docker-compose,yml` file.

## Conclusion

Using Node.js on Docker is a rewarding experience. If you want to upgrade Node.js, it is as simple as changing the version on the Docker file, rebuilding it and using it. Node.js is also great for [microservices](/blog/2020/11/nodejs-microservices/).

> If you want better developer experience and amazing scalability on production with ease, start using Node.js on docker today.