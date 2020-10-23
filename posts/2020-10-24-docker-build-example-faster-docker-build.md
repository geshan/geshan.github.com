---
layout: post
title: 'Docker build example: how to go from slow to fast docker builds'
date: 2020-10-24T22:15:25.000+11:00
comments: true
tags:
- devops
cover: "/images/docker-build-example/01faster-docker-build.jpg"
pagetitle: How to go from slow to fast docker build with example
description: In this post, we will see a docker build example of a node js API application
  starting from slow and ending up in a ~10x faster build (60 secs to 6 secs).
keywords: docker build example, faster docker build, slow docker build, fast docker
  build, docker build

---
In this post, we will see a docker build example of a node js API application starting from slow and ending up in a \~10x faster build. I have already talked about the [reasons to use docker for development environment](/blog/2018/10/why-use-docker-3-reasons-from-a-development-perspective/). I have also mentioned [how docker changed the way we software engineers work](https://geshan.com.np/blog/2018/11/4-ways-docker-changed-the-way-software-engineers-work-in-past-half-decade/) and [multi-stage docker build](/blog/2019/11/how-to-use-docker-multi-stage-build/) in past posts. For this one let’s focus on the docker build example with faster build in mind.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/docker-build-example/01faster-docker-build.jpg" title="Go from slow to fast docker build with example" alt="Whale as docker mascot">

<!-- more -->

## Information before jumping in

1. Familiarity with Docker and the docker build process is required
2. All examples are based on `Docker version 19.03.13, build 4484c46d9d` on a Mac
3. The [Currency API](https://github.com/geshan/currency-api) app is used for this docker build example

## Why faster docker build

There are many reasons you would want your Docker containers to build faster, here are some pressing ones:

1. It will save the software engineer’s time while waiting for container images to build in the CI/CD pipeline. Imagine this if all your docker build took half the time it would result in a lot less waiting.
2. It will also save engineers time to build and run the software locally. In this era of [microservices](/blog/2018/10/moving-from-a-and-b-to-\~150-microservices/) if those images would build faster it would help a lot.
3. The faster build also enables faster deployment and releases. If you wanted to rollback a buggy deployment if the build took 10 minutes that buggy code stays in prod for at least those 10 minutes while the reverted change is building.

## Docker Build example: slow build

Let’s look at the docker below, this innocent-looking docker file is taken from a [Node Js API](https://github.com/geshan/currency-api/commit/1bfa57939bb7647d9350a7445d223e4c0789f112). It has one major issue we will uncover as we proceed:

    FROM node:14-alpine
    
    WORKDIR /src
    COPY . /src
    ENV NODE_ENV=production
    RUN npm install --production
    
    EXPOSE 8080
    CMD ["node", "index.js"]

### Let's use the regular docker build

When we try to build the above docker file with docker build using the following command

    time docker build -t node-14-first-bad-cache-no-buildkit .

The `time` [command](https://www.computerhope.com/unix/utime.htm) is prefixed to the `docker build` command so that we know the time it takes for the docker build command to finish. Below is how long it took:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/docker-build-example/02docker-build-bad-cache-no-buildkit.jpg" title="First docker build without buildkit and no thoughts on caching" alt="Docker build example output without buildkit and has bad caching">

> As seen above it took 57.17 seconds.

### Easy speed up, use BUILDKIT

Docker build has recently added [BUILDKIT](https://docs.docker.com/develop/develop-images/build_enhancements/) from version 18.09. Docker basically says it is an overhaul of the build process. As mentioned in this [post](https://brianchristner.io/what-is-docker-buildkit/) it is faster, efficient, and concurrent. You can read more about its goodness in this [article](https://www.docker.com/blog/advanced-dockerfiles-faster-builds-and-smaller-images-using-buildkit-and-multistage-builds/) on docker.com. For now, let’s see it in action:

    time DOCKER_BUILDKIT=1 docker build -t node-14-second-bad-cache-with-buildkit .

<img class="center" src="/images/generic/loading.gif" data-echo="/images/docker-build-example/03docker-build-bad-cache-with-buildkit.jpg" title="Second docker build with buildkit but no thoughts on caching" alt="Docker build example output with buildkit but has bad caching">

As you can see the build time is less than half of the previous build without buildkit.

> This build only took 27.32 seconds compared to the above build which took 57.14 seconds.

## Docker Build example: fast build

Ok, there is a major issue in our previous docker file. The docker cache is busted on each change be it our custom code or any other npm modules being added.

### Faster docker build with proper caching

Our code changes almost every time but the npm modules we pull in change infrequently. So we can safely cache the npm modules as below:

    FROM node:14-alpine
    WORKDIR /src
    COPY package.json package-lock.json /src/
    
    ENV NODE_ENV=production
    RUN npm install --production
    
    COPY . /src
    EXPOSE 8080
    
    CMD ["node", "index.js"]
    

You can have a look at the diff between these two docker files [here](https://github.com/geshan/currency-api/compare/docker-build...docker-build-better-cache?expand=1#diff-dd2c0eb6ea5cfc6c4bd4eac30934e2d5746747af48fef6da689e85b752f39557R1).

> It took 34 seconds to build for the first time as below with the following command:

    time DOCKER_BUILDKIT=1 docker build -t node-14-third-good-cache-with-buildkit .

<img class="center" src="/images/generic/loading.gif" data-echo="/images/docker-build-example/04docker-build-good-cache-with-buildkit.jpg" title="Third docker build with buildkit and good caching" alt="Docker build example output with buildkit and has good caching">

### Is docker build fast after code change?

For this docker build example, I added a line of [comment](https://github.com/geshan/currency-api/compare/docker-build...docker-build-better-cache?expand=1#diff-e727e4bdf3657fd1d798edcd6b099d6e092f8573cba266154583a746bba0f346R30) in the index.js file of the Node JS API application. Now let’s see how long it takes and if it caches the node_modules used in the `npm install` command.

    time DOCKER_BUILDKIT=1 docker build -t node-14-fourth-good-cache-file-change-with-buildkit .

> The build took only 6.01 seconds, thanks to great cache usage by docker and use of buildkit.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/docker-build-example/05docker-build-good-cache-with-bk-code-change.jpg" title="Fourth docker build with buildkit and good caching after code change" alt="Docker build example output with buildkit and has good caching after code change">

Even though the code changed but the NPM modules were cached making the build complete in mere 6 seconds. The same principles apply for exploiting docker build cache. It can be applied to PHP with composer.json and composer.lock file or any other language. Always think of the previous command run and how can it be cached better.

All four images were around 233 MB, one took \~60 seconds and the last one took 6 seconds. That is like 10x faster.

## Conclusion

> If you are building docker images don’t forget to use BUILDKIT, it is super efficient. On top of BUILDKIT always analyze how to exploit [docker build cache](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#leverage-build-cache) to your advantage of faster docker builds.

I hope this small docker build example has helped you. Things like having smaller docker images like using alpine base Image can also help a bit in speeding up your docker build.