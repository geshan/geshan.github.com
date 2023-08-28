---
layout: post
title: Postgres with Docker and Docker compose a step-by-step guide for beginners
date: 2021-12-25T22:37:55.000+11:00
comments: true
tags:
- Software Engineering
- Docker
- Postgres
cover: "/images/docker-postgres/01docker-postgres.jpg"
pagetitle: Postgres with Docker and Docker compose a step-by-step guide for beginners
description: Learn how to set up and run PostgreSQL with docker and docker-compose
  in this step-by-step tutorial. It also shows how to add Postgres to an existing
  project.
keywords: docker postgres, postgres docker, docker postgresql, postgresql docker

---
Docker has shot up in [popularity over the years](https://trends.google.com/trends/explore?date=2015-01-01%202021-12-25&q=%2Fm%2F0wkcjgj). Postgres (a.k.a PostgreSQL) is an open-source, standards-compliant, and object-relational database been developed for more than 30 years now. This official [feature matrix](https://www.postgresql.org/about/featurematrix/) shows the wealth of features Postgres has.

Running Postgres with Docker and docker-compose makes it very easy to run and maintain especially in a development environment. In this post, we will look into how to run and use Postgres with Docker and Docker compose step-by-step keeping things simple and easy. Let’s get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/docker-postgres/01docker-postgres.jpg" title="Use Postgres with Docker and docker-compose easily" alt="Use Postgres with Docker and docker-compose easily">


## Table of contents

* [Why use Postgres with docker for local development](#why-use-postgres-with-docker-for-local-development)
* [Prerequisites](#prerequisites)
* [Postgres with Docker](#postgres-with-docker)
* [PostgreSQL with docker-compose](#postgresql-with-docker-compose)
* [Adding Postgres with Docker to an existing Node.js project](#adding-postgres-with-docker-to-an-existing-nodejs-project)
* [Conclusion](#conclusion)

## Why use Postgres with docker for local development

There are many good reasons to use any database like Postgres with Docker for local development, below are some good reasons:

1. Using multiple versions of PostgreSQL as per project or any other need is very easy.
2. Generally with docker if it runs on your machine it will run for your friend, on a staging environment and production environment given the version compatibility is maintained.
3. When a new team member joins, the new member can get started in hours, it does not take days to be productive.

You can read more about this on [why to use docker](/blog/2018/10/why-use-docker-3-reasons-from-a-development-perspective/). In the following section, we will look into some good to have things before diving into the commands to run Postgres with Docker.

## Prerequisites

Before we dive into some CLI commands and a bit of code below are some prerequisites best to have:

1. Basic knowledge of Docker will be helpful like executing commands like docker run, execute, etc. For this tutorial, docker version 20.10.10 will be used in a Mac.
2. Any prior grasp on Docker compose would be useful but not necessary. For this guide, we will use the docker-compose version 1.29.1 on a Mac.
3. An intermediate understanding of how relational databases work, especially PostgreSQL would be highly beneficial.
4. We will use an existing application/API with [Node.js and Postgres](/blog/2021/01/nodejs-postgresql-tutorial/) replacing a remote Postgres with a local one running with Docker and Docker compose, so it would be advisable to read the previous post about it.

Given the prerequisites have been mentioned we can move forward to the next section where we will run some [docker commands](/blog/2022/05/docker-commands/). Get those itchy fingers ready now.

## Postgres with Docker

For this post, we will use the official Postgres docker alpine image from [DockerHub](https://hub.docker.com/_/postgres). We will be using the latest version 14.1 of PostgreSQL.

The default bullseye version of Postgres docker image is 130 MB whereas the alpine one for the same version is 78 MB which is a lot smaller.

To simply run the container using the Postgres 14.1 alpine image we can execute the following command:

```bash
docker run --name basic-postgres --rm -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=4y7sV96vA9wv46VR -e PGDATA=/var/lib/postgresql/data/pgdata -v /tmp:/var/lib/postgresql/data -p 5432:5432 -it postgres:14.1-alpine
```

Let’s evaluate what the above command does. It tries to run a container from the posgres:14.1-alpine image which will be pulled in from Dockerhub by default if it does not exist.

First, the name `basic-posgres` is given to the running container, and `--rm` will clean up the container and remove the file system when the container exits. Some environment variables have been added to make things easier.

The last 3 parameters are interesting, `-v` adds a volume to store data, for this example, it has been mapped to `/tmp` so all data will be lost when the machine restarts. Next, we use the `-p` parameter to map the host port 5432 to the container port 5432.

The last parameter to the command is `-it` to have the tty available. When we run the command we will see an output like the below:

<img class="center" loading="lazy" src="/images/docker-postgres/02docker-run-postgres.jpg" title="Run PostgreSQL with just docker run" alt="Run PostgreSQL with just docker run">

The container is running and ready to accept connections, if we run the following command we can go inside the container and run the `psql` command to see the `postgres` database which is the same as the username supplied in the event variable.

```bash
docker exec -it basic-postgres /bin/sh
```

After we are inside the container we can run `psql --username postgres` to access the Postgres CLI. To list the databases we can run `\l` inside the psql CLI to list the databases and see the Postgres database as seen below:

<img class="center" loading="lazy" src="/images/docker-postgres/03docker-exec-postgres.jpg" title="Docker exec in Postgres and list the databases" alt="Docker exec in Postgres and list the databases">

As seen in the above picture `\q` will quit the psql CLI and exit the container’s shell we have ran `exit`.

If we go back to the running container and hit `Ctrl+C` it will stop the container as well as clean it up as we have used the `--rm` parameter when we ran it.

This is a way to run Postgres with docker but as we have seen it is not easy to remember the 10 liner command and all the needed parameters.

Also, we have not specified any link between the database and our application. This is where the docker-compose file and [docker-compose](https://docs.docker.com/compose/) command comes in very handy as seen in the next section.

## PostgreSQL with docker-compose

To run the same Postgres 14.1-alpine with docker-compose we will create a `docker-compose-pg-only.yml` file with the following contents:

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
volumes:
  db:
    driver: local
```

The docker-compose file has the following things to consider:

1. It uses the docker-compose file [version 3.8](https://docs.docker.com/compose/compose-file/compose-file-v3/)
2. Next up, we define `db` as a [service](https://docs.docker.com/compose/compose-file/compose-file-v3/#service-configuration-reference), each service will equate to a new `docker run` command
3. We are asking docker-compose for the service to be an image of Postgres version 14.1 alpine which will always restart if the container stops automatically.
4. Consequently we define two environment variables to send in the Postgres user and password. Keep in mind, as the database is not sent by default for the official image it will use the username as the database name.
5. Subsequently we map the host/machine port `5432` with the container port `5432` as Postgres runs in that port in the container.
6. After that we ask docker-compose to manage the [volume](https://docs.docker.com/compose/compose-file/compose-file-v3/#volumes) in a name called `db` which is further added to be a local driver. So when the container is restarted the data will be available from docker managed volume. To see the contents of the volume we can run `docker volume ls` and inspect the volume attached to our Postgres container.

After that explanation, to start the containers we will run `docker-compose -f docker-compose-pg-only.yml up` which will show an output like below:

<img class="center" loading="lazy" src="/images/docker-postgres/04docker-compose-up-postgres-only.jpg" title="Output of docker-compose up for Postgres container" alt="Output of docker-compose up for Postgres container">

So the Postgres database is running and this time it was a one-line command, not a long command to get it running as all the needed parameters were in the docker-compose file.

At this point, the Postgres in the container will behave similarly to a local Postgres instance as we have mapped the port `5432` to the local port `5432`.

Next up, we will see how we modify the docker-compose file to fit in an existing project.

## Adding Postgres with Docker to an existing Node.js project

Given we have seen PostgreSQL run with docker-compose, now we will integrate it with a running Node.js API project. A full step-by-step tutorial of how this Quotes API project is built with [Node.js and Postgres](/blog/2021/01/nodejs-postgresql-tutorial/) is available for your reference. For this guide we will add a `docker-compose.yml` file with the following contents:

```bash/12
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
    container_name: quotes-api
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
    links:
      - db
    volumes:
      - './:/src'
volumes:
  db:
    driver: local
```

This file looks somewhat similar to the above docker-compose file but below are the main differences.

The first one is, here we use `- ./db/init.sql:/docker-entrypoint-initdb.d/create_tables.sql` on line number 13. We are doing this to create the `quotes` table and fill up the data as seen in this [SQL file](https://github.com/geshan/nodejs-posgresql/blob/master/db/init.sql). This is the way to run [initialization scripts](https://github.com/docker-library/docs/tree/master/postgres#initialization-scripts) for Postgres with docker. This is an idempotent operation, if the data directory is filled up the `init.sql` file won't be executed again to prevent data overriding. If we want to force override the data we will need to delete the docker volume after a `docker volume inspect`.

Next, we define a new service called `api` which builds the local `Dockerfile` with target `production` and names it `quotes-api`. After that, it has a `depends_on` definition on the `db` container which is our Postgres container.

Subsequently, it maps the host port 3000 to the exposed container port 3000 where the Node.js Express API server is running. In the environment variables, it defines `db` as the host which maps to the above Postgres container and uses the same credentials as provided in the above definition. It [links](https://docs.docker.com/compose/compose-file/compose-file-v3/#links) to the Postgres container defined before the API service. You should learn more about [docker compose environment variables](/blog/2023/08/docker-compose-environment-variables/).

Finally, it maps all the local files to the `/src` of the container to make things run with Node.js.

This file is available on [GitHub](https://github.com/geshan/nodejs-posgresql/pull/25/files#diff-e45e45baeda1c1e73482975a664062aa56f20c03dd9d64a827aba57775bed0d3R1) too for your reference.

When we run docker-compose up on the root of this project we can see the following output:

<img class="center" loading="lazy" src="/images/docker-postgres/05docker-compose-up-postgres-and-nodejs.jpg" title="Output of docker-compose up for Postgres and Node.js Express containers" alt="Output of docker-compose up for Postgres and Node.js Express containers">

As the webserver is mapped to the local port 3000, we can see the output as below when hitting `http://locahost:3000/quotes` on any browser:

<img class="center" loading="lazy" src="/images/docker-postgres/06quotes-api-working-with-dockerized-postgres.jpg" title="Quotes API working with Dockerized Node.js and PostgreSQL using docker-compose" alt="Quotes API working with Dockerized Node.js and PostgreSQL using docker-compose">

Hurray! Our Node.js Express API for Quotes is communicating correctly with the local Postgresql database as expected. If you want to quickly try the `docker-compose up` experience clone this [Github repository](https://github.com/geshan/nodejs-posgresql) and try it.

If [Node.js with MySQL](/blog/2020/11/nodejs-mysql-tutorial/) is your flavor of choice do read this guide too. You can also try [Node.js with SQLite](/blog/2021/10/nodejs-sqlite/) if that works better for you.

## Conclusion

In this post, we witnessed how to run Postgres with just docker then added the docker-compose goodness to make things easier. After that, we added Postgres to an existing Node.js API to make the local development a lot easier.

> I hope it makes it easier to understand how to run Postgres with Docker quickly and easily.