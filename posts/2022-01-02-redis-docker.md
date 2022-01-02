---
layout: post
title: Using Redis with docker and docker-compose for local development a step-by-step tutorial
date: 2022-01-02T22:47:55.000+11:00
comments: true
tags:
- Software Engineering
- Docker
cover: "/images/redis-docker/01redis-docker.jpg"
pagetitle: Using Redis with docker and docker-compose for local development a step-by-step tutorial
description: Learn how to set up and run Redis with docker and docker-compose in this step-by-step tutorial. It also shows how to add Redis to an existing Node.js project.
keywords: docker redis, redis docker, docker-compose redis, redis docker-compose

---
Redis is an open-source in-memory datastore used as a database, cache, and even a message broker. Redis can be used easily with docker and docker-compose for local development as a cache to a web application. In this post, we will set up Redis with docker and docker-compose, where Redis will be used as a cache for a Node.js/Express.js REST API with PostgreSQL as the main database, let’s get started!

<img class="center" loading="lazy" src="/images/redis-docker/01redis-docker.jpg" title="Use Redis with Docker and docker-compose easily" alt="Use Redis with Docker and docker-compose easily">

<!-- more -->

## Table of contents

* [Prerequisites](#prerequisites)
* [Redis and Docker](#redis-and-docker)
* [Redis with Docker-compose](#redis-with-docker-compose)
* [Add Redis to an existing Node.js application](#add-redis-to-an-existing-nodejs-application)
* [Conclusion](#conclusion)

## Prerequisites

Before we start looking at the code, below are some good to have preconditions:

1. A general knowledge of how Docker works would be advantageous.
1. It is expected to have followed the [Node.js Postgres tutorial](/blog/2021/01/nodejs-postgresql-tutorial/) with quotes APIs.
1. Going through the [Node.js Redis](/blog/2021/05/nodejs-redis/) post would be very beneficial.
1. Any working knowledge of Redis, its command line, and some basic commands like KEYS, MGET would be helpful.

Given that is mentioned, now we can proceed to run Redis with just Docker first.

## Redis and Docker

Redis, as mentioned, can be used as a cache too. For this post, we will use Redis as an in-memory cache in place of getting the data from a Postgres database. To do this, we will use the [official Redis docker image](https://hub.docker.com/_/redis) from Dockerhub. To run the Redis 6.2 version on an Alpine container we will run the following command:

```bash
docker run --rm --name test-redis redis:6.2-alpine redis-server --loglevel warning
```

The above command will start a container named `test-redis` for the given image version of 6.2-alpine` with the loglevel of warning. It will give the following output:

<img class="center" loading="lazy" src="/images/redis-docker/02redis-docker.jpg" title="Run Redis with just Docker" alt="Run Redis with just Docker">

To run some Redis commands inside the container, we can run `docker exec -it test-redis redis-cli` which will run the redis-cli in the running container. We can try out some redis commands like below to see things are working:

<img class="center" loading="lazy" src="/images/redis-docker/03redis-cli.jpg" title="Execute Redis CLI inside Redis Docker container" alt="Execute Redis CLI inside Redis Docker container">

As seen above we could set some value with the key `test` and get it back. As there are no volumes set or any commands given to persist the keys and values will be lost when the container stops. Next up we will look into running the same version of Redis with docker-compose.

## Redis with Docker-compose

To run Redis with Docker-compose including persistence and authentication we will use the docker-compose file named  `docker-compose-redis-only.yml` as seen below:

```bash
version: '3.8'
services:
  cache:
    image: redis:6.2-alpine
    restart: always
    ports:
      - '6379:6379'
    command: redis-server --save 20 1 --loglevel warning --requirepass eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81
    volumes: 
      - cache:/data
volumes:
  cache:
    driver: local
```

Here in the above docker-compose file, we have defined a service called cache. The cache service will pull the `redis:6.2.alpine` image from Dockerhub. It is set to restart always, if the docker container fails for some reason it will restart. Then, we map the container port `6379` to the local port `6379`. If we aim to run multiple verisons of Redis, we can choose a random port.

Consequently, we use a custom `redis-server` command with `--save 20 1` which instructs the server to save 1 or more writes every 20 seconds to disk in case the server restarts. We are using the `--requirepass` parameter to add authentication with the password to read/write data on the Redis server. As we know if this was a production-grade application the password won’t be exposed out. This is being done here because it is only intended for development purposes.

Subsequently, we use a volume for the `/data` where any writes will be persisted. It is mapped to a volume called `cache`. This volume is managed as a local driver, you can read more about [Docker volume driver](https://docs.docker.com/storage/volumes/#use-a-volume-driver) if you want.

If we run a docker-compose up with the above file using `​​docker-compose -f docker-compose-redis-only.yml up` it will give an output like below:

<img class="center" loading="lazy" src="/images/redis-docker/04redis-docker-compose.jpg" title="Run only Redis with docker-compose - output" alt="Run only Redis with docker-compose - output">

This container is running similarly to the above one. The two main differences here are the volume is being mounted to persist the saved data over restarts of the container and the password is supplied for authentication. In the following section, we will add Redis to an existing application that has a PostgreSQL database and a Node.js API using that database.

## Add Redis to an existing Node.js application

As an example for this guide we are using the [Quotes API](https://github.com/geshan/nodejs-posgresql) application built with [Node.js and Postgres](/blog/2021/01/nodejs-postgresql-tutorial/). We will introduce the Redis service in the existing docker-compose file as follows: 

```bash/13-20,29,39-41
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
  cache:
    image: redis:6.2-alpine
    restart: always
    ports:
      - '6379:6379'
    command: redis-server --save 20 1 --loglevel warning --requirepass eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81
    volumes: 
      - cache:/data
  api:
    container_name: quotes-api
    build:
      context: ./
      target: production
    image: quotes-api
    depends_on:
      - db
      - cache
    ports:
      - 3000:3000
    environment:
      NODE_ENV: production
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: postgres
      DB_PASSWORD: postgres
      DB_NAME: postgres
      REDIS_HOST: cache
      REDIS_PORT: 6379
      REDIS_PASSWORD: eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81
    links:
      - db
      - cache
    volumes:
      - ./:/src
volumes:
  db:
    driver: local
  cache:
    driver: local
```

This file is similar to the above docker-compose file. The main changes here are the `api` service now also depends on the `cache` service which is our Redis server. In addition to that, in the API service, we are passing the Redis related credentials as extra environment variables like `REDIS_HOST`, `REDIS_PORT`, and `REDIS_PASSWORD`. These parts have been highlighted in the above file. 

When we do a regular `docker-compose up` with this docker-compose.yml file it will yield the output similar to the below:

<img class="center" loading="lazy" src="/images/redis-docker/05redis-docker-compose-up.jpg" title="Run Redis with docker-compose including Node.js and Postgres - output" alt="Run Redis with docker-compose including Node.js and Postgres - output">

Depending on if the Postgres container has data it will behave a bit differently. Now if we hit `http://localhost:3000/quotes/author/chris` it will show the following output:

<img class="center" loading="lazy" src="/images/redis-docker/06app-output.jpg" title="Node.js and Postgres API output with docker Redis" alt="Node.js and Postgres API output with docker Redis">

Refresh this page 2-3 times and go back to the docker-compose console tab, we should see something similar to the below:

<img class="center" loading="lazy" src="/images/redis-docker/07redis-docker-fast-response.jpg" title="Much faster response times with Redis Docker" alt="Much faster response times with Redis Docker">

As we can see above the first hit went to the database and it took 328.118 ms to get the quotes for the author `Chris`. All subsequent requests got the request from the Redis cache and it was super fast, responding between 5.7 to 3.48 ms. As the cached content is there for 10 minutes, if we run the `redis-cli` inside the container with the following command:

```bash
docker exec -it nodejs-posgresql_cache_1 redis-cli -a eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81
```

Then we can see the content of the cached key and its value with: `KEYS *` to list all keys. To list the value of the found key we can use `MGET quotes_author_chris_1` it will show us the contents of that particular key as seen below:

<img class="center" loading="lazy" src="/images/redis-docker/08redis-docker-contents.jpg" title="Contents of the Redis Docker caching API response" alt="Contents of the Redis Docker caching API response">

The PostgreSQL query cache will make things faster for consequent calls but if there are lots (thousands or millions) of rows on the database then the query cache won’t work that great. That is where a key-value cache stored on memory like Redis would be a great performance boost as you can see above. The change done for this tutorial is available as a [pull request](https://github.com/geshan/nodejs-posgresql/pull/27) for your reference. 

## Conclusion

We saw how to use Redis with docker and the with docker-compose. We also added Redis as a cache to an existing Node.js API and witnessed the performance benefits. 

> I hope this helps you understand how to use Redis in any application with docker and docker-compose without any hassle. 

Keep caching!
