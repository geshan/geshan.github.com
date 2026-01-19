---
layout: post
title: "How to use docker compose depends_on a beginner's guide"
date: 2024-02-27T22:58:47.000+11:00
comments: true
tags:
- Software Engineering
- Docker
cover: "/images/docker-compose-depends-on/01docker-compose-depends-on.jpg"
pagetitle: "How to use docker compose depends_on a beginner's guide"
description: "Learn how to use docker compose depend_on proprely to start the dependent service first, make it healthy then only start the main container"
keywords: docker compose depends on, docker compose depends_on, docker-compose depends on, docker-compoes depends_on
---
Docker Compose is a powerful tool that allows you to define and run multi-container Docker applications. It simplifies the process of managing and orchestrating multiple containers, making it a popular choice for development and testing environments. One of the key features of Docker Compose is the `depends_on` option, which allows you to specify dependencies between services. In this beginner's guide, you will explore how to use `depends_on` effectively, ensuring your services start up in the correct order and function seamlessly. Let’s get started!

<!-- more -->

<img class="center" src="/images/docker-compose-depends-on/01docker-compose-depends-on.jpg" title="How to use docker compose depends_on a beginner's guide" alt="How to use docker compose depends_on a beginner's guide">

## Table of contents

* [Docker compose depends on](#docker-compose-depends-on)
* [Difference between depends_on and links](#difference-between-depends_on-and-links)
* [Docker compose depends on under the covers](#docker-compose-depends-on-under-the-covers)
    * [Services startup condition with service_healthy](#services-startup-condition-with-service_healthy)
* [Example with depends_on and service_healthy condition](#example-with-depends_on-and-service_healthy-condition)
* [Conclusion](#conclusion)

## Docker compose depends on

Before we dive into `depends_on`, let's briefly recap Docker and Docker Compose. [Docker](https://docs.docker.com/get-started/overview/) is a containerization technology that packages and runs applications in isolated environments called containers. [Docker Compose](https://docs.docker.com/compose/) builds upon Docker, enabling you to define and manage multiple containers and their configurations in a single YAML file called `docker-compose.yml`. This declarative approach streamlines the process of running and orchestrating complex applications. You get free from long `docker run` commands using this declarative and easy-to-understand syntax that can be comprehended in a single glance.

Now, where does `depends_on` fit into this picture? When working with multi-container applications, it's often crucial to ensure that services start up in a specific order or that the dependent service starts and is ready before the main service.

For example, if your application depends on a database, the database service needs to be running before your application service starts. This is where `depends_on` comes in. It allows you to specify which services a particular service depends on, ensuring that the dependent services are started before the service that relies on them.

## Difference between depends_on and links

It's important to distinguish `depends_on` from `links`. While `links` create network aliases and allow containers to communicate with each other by their service names, `depends_on` solely focuses on startup order. It does not automatically guarantee that the dependent service is ready to accept connections or requests. You will explore how to handle readiness checks later in this guide.

Let’s look at an example for an application that is a Node.js API (for Quotes) that uses Docker and has a Postgres database to store the data. The full [Node.js Postgres](/blog/2021/01/nodejs-postgresql-tutorial/) tutorial is available if you want to learn and understand how it is built. A working docker compose file with both the Node.js API and Postgres database services using `links` to make it possible for the Node.js container to talk to the db can look like the below:

```yaml/20-21
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
    restart: always
    links:
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

You can understand more about a similar docker compose file for [Docker and Postgres](https://geshan.com.np/blog/2021/12/docker-postgres/#postgresql-with-docker-compose). The above example defines is using docker compose file version `3.8`. You have defined two services in this `docker-compose.yml` file. The first is the `db` and the second one is the `api`.  You can find see the [Dockerfile](https://github.com/geshan/nodejs-posgresql/blob/master/Dockerfile) used for the `api` too. The `db` service uses the official Postgres version `14.1` with the `alpine` flavor as it is a small image and ultimately a smaller container. It uses some environment variables and volumes, you can read about it more on [Postgres with docker compose](https://github.com/geshan/nodejs-posgresql/blob/master/Dockerfile).

Next, the API container is defined that uses a local Dockerfile built with the `production` context. It also has some needed environment variables defined and runs on port `3000`. It also has volumes so that the data is persisted across container restarts. The main part here is `links` (highlighted in yellow in the above code snippte) says that the API links to the `db` and can communicate with it.

If you start both services with `docker compose up` it will give a log like the one below:

<img class="center" loading="lazy" src="/images/docker-compose-depends-on/02docker-compose-depends-on-links.jpg" title="With Docker compose links you cannot specify the startup sequence of the services/containers" alt="With Docker compose links you cannot specify the startup sequence of the services/containers">

Notice that before the DB has fully started the API has started, this will be similar even if `depends_on` is used without a condition.

In the next section, you will learn about the depends on and service_healthy condition.

## Docker compose depends on under the covers

Docker compose `depends_on` only [specifies the order](​​https://docs.docker.com/compose/startup-order/) in which the services should start when no conditions are used. While `depends_on` ensures that services start in the correct order, it's important to understand that it does not guarantee that the dependent service is ready to accept connections or requests.

To address this, you can use additional tools or techniques to check the readiness of the dependent service. One common approach is to use a health check script or tool that verifies the service's availability before proceeding. For example, you could use a script that checks if the PostgreSQL database is listening on port 5432 before starting your Node.js application. [Wait for it](https://github.com/vishnubob/wait-for-it) is a  tool you can reach but it is not the docker compose native way of waiting for the dependent service to be ready.

So what is the native docker compose `depends_on` way to do it, you will know about it next.

### Services startup condition with service_healthy

Docker Compose added a new [condition](https://docs.docker.com/compose/startup-order/#control-startup) called `service_started` and `service_healthy` conditions. The `service_healthy` condition allows you to specify that a service should only start after another service has successfully started with a health check. This provides a more fine-grained level of control in conjunction with `depends_on`.

With `service_healthy`, you can specify a condition that checks the health of the dependent service. For example, you can specify that a service should only start after the dependent service has started and is listening on a specific port. This ensures that the dependent service is ready to accept connections before the service that depends on it starts.

You can use just depends_on with docker compose but it will only make sure that the dependent services start before the one that depends on it. To make sure that the dependent service has started and is ready/healthy to start accepting requests/connections use `depends_on` with a health check on the dependent service. You can have a look at an example in the next section.

## Example with depends_on and service_healthy condition

Let's consider a practical example to illustrate how to use `depends_on` with the `service_healthy` condition. You will use the same Node.js API that connects to a PostgreSQL database to fetch quotes. You want to ensure that the PostgreSQL database starts and can accept connections before your Node.js application starts.

Here's how you can achieve this with a docker-compose.yml file:

```yaml/6-9,26-27
version: '3.8'
services:
  db:
    image: postgres:14.1-alpine
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
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
    restart: always
    depends_on:
      db:
        condition: service_healthy
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

In this example as the above one, you have two services: `db` and `api`. The `db` service uses the official PostgreSQL 14.1 Alpine image and exposes port 5432. It also defines environment variables for the database user, password, and database name. The `api` service represents your Node.js application, which depends on the `db` service. This dependency is specified using the `depends_on` option. 

The Node.js app specifies that it `depends on` the db service. The additional condition on the depends on you have specified is the dependent service has to be healthy with `service_healthy`. It has been highlighted in yellow in the above code. This makes sure that the `api` services starts only after the `db` service is healthy (able to receive connections).

On the `db` service a [healthcheck](https://docs.docker.com/compose/compose-file/05-services/#healthcheck) is defined that uses the [pg_isready](https://www.postgresql.org/docs/current/app-pg-isready.html) tool. There are some options for the health check, first one is the test for the health check. To check if the DB is healthy you are using the `pg_isready` tool that checks the connection status of a PostgreSQL server, the exit status for this command determines the status.

There are other options for `health check` like interval, timeout, and retires. For this example, you are specifying a retry of a maximum of 5 times every 5-second interval with a timeout of 5 seconds. All this has been highlighted in yellow in the above code snippet.

There is also the `service_completed_successfully` option. This option specifies that a dependency is expected to run to successful completion before starting a dependent service. It is another option you can use if you deem it is the right one. For this example, you will use the `serivice_healthy` option as specified in the above docker-compose file.

When you run `docker compose up`, Docker Compose will start the `db` service first, followed by the `api` service. This ensures that the PostgreSQL database runs before your Node.js application attempts to connect to it.

<img class="center" loading="lazy" src="/images/docker-compose-depends-on/03docker-compose-depends-on-healthy.jpg" title="With Docker compose depends_on and condition service_healthy you cannot specify the startup order of the services and the dependency" alt="With Docker compose depends_on and condition service_healthy you cannot specify the startup order of the services and the dependency">

As seen above, the Node.js API this time only started after the Postgres database had started and was deemed healthy by the `pg_isready` tool that tried to connect using the `postgres` user. So once you see this log, you can go to `http://localhost/quotes` and you are sure to see the output on the database. Which takes us to the end of this beginner's guide.

## Conclusion

The `depends_on` option in Docker Compose is a valuable tool for ensuring that services start-up in the correct order with dependiences in a healthy state. By specifying dependencies between services, you can avoid errors and ensure your application functions seamlessly.

> However, it's important to remember that `depends_on` only controls the startup order and does not guarantee service readiness by default. Use additional tools or techniques, such as health checks, to verify the availability of dependent services before starting services that rely on them.

By understanding and effectively using `depends_on`, you can streamline the development and deployment of your multi-container applications, ensuring they run smoothly and reliably. I hope you learned the proper way to use docker compose depends on, keep containerizing and using docker compose more effectively!
