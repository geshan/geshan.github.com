---
layout: post
title: "How to use docker multi-stage build to create optimal images for dev and production"
date: 2019-11-25 15:33:44 +0000
comments: true
categories: 
- Docker
- Devops
- Software Engineering
cover: /images/docker-multi-stage-builds/docker-msb-optimal-images.jpg
---

Docker has sharply [risen in popularity](https://trends.google.com/trends/explore?date=2015-11-23%202019-11-23&q=%2Fm%2F0wkcjgj,%2Fg%2F11gds4ys6t) in the past years. It has been one of the tools that have [changed the way we work](https://geshan.com.np/blog/2018/11/4-ways-docker-changed-the-way-software-engineers-work-in-past-half-decade/) as software engineers and DevOps Engineers. From Docker v 17.05 [multi-stage build](https://docs.docker.com/develop/develop-images/multistage-build/) was introduced which helped abandon the older [builder pattern](https://blog.alexellis.io/mutli-stage-docker-builds/) with use of stages and [target](https://docs.docker.com/engine/reference/commandline/build/#specifying-target-build-stage---target). This post discussed how you can exploit `docker multi-stage build` to build optimal images suited for dev/test and production with a NodeJs example application.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/docker-multi-stage-builds/docker-msb-optimal-images.jpg" title="Use docker multi-stage build to create optimal images" alt="Streamline your docker image building with multi-stage builds for dev and production">

<!-- more -->

## Prerequisites

* You are aware of docker and know the basic docker commands like build, exec
* You know about docker-compose (not a necessity)


## Docker multi-stage builds intro

Docker multi-stage build lets us build docker images in stages with multiple `FROM` statements. Files can be copied from one stage to another. A very good example would be how a [294 MB](https://microbadger.com/images/golang) Golang 1.13 official image (123 MB even with Alpine) can be just as big as the go executable of your application. As Golang is compiled and gives out an executable binary, the first stage can be compiling it and the second stage can be an alpine image (5 MB) just to run that executable. So, if your go app binary is 10 MB your image can be 15 MB (10 MB binary + 5 MB alpine) rather than the heavy 294 MB official go image or 123 MB alpine go image. You can have a look at an [example](https://medium.com/travis-on-docker/multi-stage-docker-builds-for-creating-tiny-go-images-e0e1867efe5a) too.

Another great example can be a frontend javascript application, you could use an app with node, webpack and all needed npm dev dependencies to build the application. In the next stage, it can be served with a minimal nginx apline image which will be of much less size.

Below is the official information about docker multi-stage builds:


> With multi-stage builds, you use multiple FROM statements in your Dockerfile. Each FROM instruction can use a different base, and each of them begins a new stage of the build. You can selectively copy artifacts from one stage to another, leaving behind everything you don’t want in the final image.

Unfortunately, all the language don’t compile to an executable binary as golang does, still, you can leverage multi-stage builds to craft docker images that serve the purpose better. We look into how to do this below with an open-source node js application example.

## Issues before multi-stage build

We are going to see an example Node Js app which is a currency converter API built with Express. Currently, the problems with the Dockerfile and build are as follows:

1. Nodemon is installed on production
1. Current docker image does not have dev dependencies (runs `npm install --production`)
1. The image size can be made smaller (even though its using alpine)

Following are the current `Dockerfile` and `docker-compose.yml` for local development:

### Dockerfile

```
FROM node:12-alpine

WORKDIR /src
COPY package.json package-lock.json /src/
RUN npm install --production

COPY . /src

EXPOSE 8080

RUN npm config set unsafe-perm true
RUN npm install -g nodemon

CMD ["node", "index.js"]
```

As we can see `nodemon` is installed even on production which is unnecessary on production. Another issue is there are no dev dependencies so tests can’t be run inside docker.

### Docker Compose file

```
web:
  build: .
  volumes:
   - .:/src
  command: npm start
  ports:
    - "8080:8080"
  environment:
    NODE_ENV: dev
    VIRTUAL_HOST: 'currency.test'
    VIRTUAL_PORT: 8080
```

Don’t be concerned about the `VIRTUAL_HOST` and `VIRTUAL_PORT` that is for [nginx proxy](https://github.com/jwilder/nginx-proxy).

### Current image size

Let’s look at how big is this image we got from running `docker build . -t currency-api-original`.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/docker-multi-stage-builds/01original-docker-image.jpg" title="Original docker image before multi-stage build" alt="Original docker image before multi-stage build">

So currently it is 165 MB, hopefully, we can decrease its size too in this process.

## Solution with multi-stage build

Now as we want to have dev dependencies and `nodemon` on dev builds and only production npm dependencies on production build, the docker related files have been modified as follows:

### Dockerfile with multi-stage build

```
FROM node:12-alpine as base

WORKDIR /src
COPY package.json package-lock.json /src/
COPY . /src
EXPOSE 8080

FROM base as production

ENV NODE_ENV=production
RUN npm install --production

CMD ["node", "index.js"]

FROM base as dev

ENV NODE_ENV=development
RUN npm config set unsafe-perm true && npm install -g nodemon
RUN npm install
CMD ["npm", "start"]
```

Let’s analyze what changed here and why? Following are the highlights:

* We start with a base image that has node, then copy needed files to the image like 1-5
* For production we set the `NODE_ENV` to production and install non-dev dependencies, also notice that we run node (not nodemon)
* Later the last 6 lines of the Dockefile, we create the image from the base and set `NODE_ENV` to development, then we install nodemon as we want to watch the files on dev
* On dev image build we install all npm dependencies including dev ones so that we can run tests

The builds are more streamlined and we have optimized our docker images to be more environment-specific. We solved the above-mentioned issues and don’t have `nodemon` and dev dependencies on production and we can run our tests on dev/test. That’s a win!

### Docker-compose file after multi-stage build

```
version: '3.5'
services:
  web:
    build:
      context: ./
      target: dev
    volumes:
    - .:/src
    command: npm start
    ports:
      - "8080:8080"
    environment:
      NODE_ENV: dev
      VIRTUAL_HOST: 'currency.test'
      VIRTUAL_PORT: 8080
```
The main change for the docker-compose file is the `target:dev` in the build parameters.

All the changes made can be viewed in this [pull request](https://github.com/geshan/currency-api/pull/49) too. Let’s look at how big is the image now:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/docker-multi-stage-builds/02optimized-docker-image.jpg" title="Smaller and environment optimized images after multi-stage build" alt="Smaller and environment optimized images after multi-stage build">

We ran the following commands to build the dev and the production images:

* docker build . -t currency-api-dev --target=dev
* docker build . -t currency-api-prod --target=production

> We have shaved off ~25 MB from the older image for a production build. It happened because we removed nodemon and some dev dependencies for production. Even for the dev build it is ~21 MB smaller.

## Conclusion / tl;dr

The main point here is to build docker images apt for the environment and multi-stage builds are an answer to this problem. You can use the same concept to build images for PHP with composer. For example, the dev build can have xdebug for debugging and production build can have opcache enabled by default. 

> Anytime you need different things for different environments, opt for docker multi-stage builds and avoid having 3 different dockerfiles.
