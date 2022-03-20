---
layout: post
title: How to use MySQL with Docker and Docker compose a beginners guide
date: 2022-02-19T22:27:55.000+11:00
comments: true
tags:
- Software Engineering
- Docker
cover: "/images/mysql-docker-compose/01mysql-docker-compose.jpg"
pagetitle: How to use MySQL with Docker and Docker compose a beginners guide
description: Learn how to set up and run MySQL with docker and docker-compose in this
  step-by-step tutorial. It also shows how to add MySQL to an existing project.
keywords: docker mysql, mysql docker, docker compose mysql, mysql docker compose

---
MySQL is one of the [most popular](https://db-engines.com/en/system/MySQL) relational databases of all time. Using MySQL with Docker and docker-compose makes it very easy and fast to test out any changes in any application using MySQL as the database. In this tutorial, we will detail how to use MySQL with Docker and docker-compose step-by-step keeping things easy to comprehend. Let’s get rolling!

<img class="center" loading="lazy" src="/images/mysql-docker-compose/01mysql-docker-compose.jpg" title="Use MySQL with Docker and docker-compose easily" alt="Use MySQL with Docker and docker-compose easily">

<!-- more -->

## Table of contents

  * [Why use MySQL with Docker for local development](#why-use-mysql-with-docker-for-local-development)
  * [Prerequisites](#prerequisites)
  * [Run MySQL with Docker](#run-mysql-with-docker)
  * [Running MySQL with docker-compose](#running-mysql-with-docker-compose)
  * [Adding MySQL to and existing Node.js app using docker-compose](#adding-mysql-to-and-existing-node.js-app-using-docker-compose)
  * [Conclusion](#conclusion)

## Why use MySQL with Docker for local development

There are multiple great reasons to use any database including MySQL with Docker for local development, some of them are as follows:

1. Using any version of MySQL like 5.6, 5.7, or 8 as per project or any other reason is very easy.
1. Usually with docker, if it runs on your machine it will run on another software engineer’s machine, on a staging environment, and on production too, given some compatibility is maintained.
1. A new team member can be productive in hours, not days given docker and other tools are set up in an efficient way.

To know the above reasons in a bit more detail please do read the [why use docker](/blog/2018/10/why-use-docker-3-reasons-from-a-development-perspective/) post.
In the next section, we will list out some good to have things prior to jumping into the code to run MySQL with Docker.

## Prerequisites

Before we get our hands dirty with some code and CLI commands, below are some good to have prerequisites:

1. Basic knowledge of Docker and related commands like docker build, run, execute, etc will be useful for this guide. In the examples, we will use Docker version 20.10.10, build b485636 on a Mac.
1. Any prior information about Docker-compose will be very useful, we will use docker-compose version 1.29.2, build 5becea4c in the examples.
1. A general understanding of how relational databases work, specifically MySQL will be advantageous.
1. For this tutorial, we will use an existing API with [Node.js and MySQL](/blog/2020/11/nodejs-mysql-tutorial/) which will replace the remote MySQL with a local MySQL running with Docker and Docker Compose. 

Now as you are aware of the prerequisites, we can dive deeper into the CLI commands and any related code.

## Run MySQL with Docker

For this beginners’ guide, we will use the official MySQL Docker image from [DockerHub](https://hub.docker.com/_/mysql). The official MySQL Docker image does not have an Alpine Linux version, still, the Debian version is also 147 MB which is not too big for a docker image.

To run the MySQL 8.0 container using the official image, simply run the following command:

```bash
mkdir /tmp/mysql-data
docker run --name basic-mysql --rm -v /tmp/mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=ANSKk08aPEDbFjDO -e MYSQL_DATABASE=testing -p 3306:3306 -it mysql:8.0
```

Let’s analyze the command we just ran to run MySQL with docker. First, we created a directory called `mysql-data` in `/tmp` to store the data of MySQL. Then we ran a `docker run` command with:

* `--name` to name the container `basic-mysql`
* `--rn` to remove the container when it is stopped
* `-v /tmp/mysql-data:/var/lib/mysql` is added to retain the data when the container restarts, it will vanish when the host [machine restarts](https://www.fosslinux.com/41739/linux-tmp-directory-everything-you-need-to-know.htm) as it is in `/tmp`
* `-e MYSQL_ROOT_PASSWORD=ANSKk08aPEDbFjDO -e MYSQL_DATABASE=testing` for setting the root user’s password and initializing a database named `testing`
* `-p 3306:3306` maps host port 3306 to container port 3306, the port 3306 is MySQL’s default port.
* ` -it mysql:8.0` - -it will show all logs and we are using the official MySQL image version 8.0 which will run the Debian flavor.
 
It will show and output simialr to below:

```bash
2022-02-19 10:31:54+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.27-1debian10 started.
2022-02-19 10:31:54+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
2022-02-19 10:31:54+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.27-1debian10 started.
2022-02-19 10:31:54+00:00 [Note] [Entrypoint]: Initializing database files
2022-02-19T10:31:54.932929Z 0 [System] [MY-013169] [Server] /usr/sbin/mysqld (mysqld 8.0.27) initializing of server in progress as process 44
2022-02-19T10:31:54.942400Z 0 [Warning] [MY-010159] [Server] Setting lower_case_table_names=2 because file system for /var/lib/mysql/ is case insensitive
2022-02-19T10:31:54.952407Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2022-02-19T10:31:57.114688Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2022-02-19T10:31:58.994205Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
2022-02-19T10:31:58.994241Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
2022-02-19T10:31:59.204723Z 6 [Warning] [MY-010453] [Server] root@localhost is created with an empty password ! Please consider switching off the --initialize-insecure option.
2022-02-19 10:32:03+00:00 [Note] [Entrypoint]: Database files initialized
2022-02-19 10:32:03+00:00 [Note] [Entrypoint]: Starting temporary server
mysqld will log errors to /var/lib/mysql/568272f57c6b.err
mysqld is running as pid 95
2022-02-19 10:32:04+00:00 [Note] [Entrypoint]: Temporary server started.
Warning: Unable to load '/usr/share/zoneinfo/iso3166.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/leap-seconds.list' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone1970.tab' as time zone. Skipping it.
2022-02-19 10:32:08+00:00 [Note] [Entrypoint]: Creating database testing

2022-02-19 10:32:08+00:00 [Note] [Entrypoint]: Stopping temporary server
2022-02-19 10:32:10+00:00 [Note] [Entrypoint]: Temporary server stopped

2022-02-19 10:32:10+00:00 [Note] [Entrypoint]: MySQL init process done. Ready for start up.

2022-02-19T10:32:10.353185Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.0.27) starting as process 1
2022-02-19T10:32:10.361054Z 0 [Warning] [MY-010159] [Server] Setting lower_case_table_names=2 because file system for /var/lib/mysql/ is case insensitive
2022-02-19T10:32:10.379917Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2022-02-19T10:32:11.007492Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2022-02-19T10:32:11.362057Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
2022-02-19T10:32:11.362123Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
2022-02-19T10:32:11.366535Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
2022-02-19T10:32:11.366644Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
2022-02-19T10:32:11.372769Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
2022-02-19T10:32:11.435797Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
2022-02-19T10:32:11.435995Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.27'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
```

As the MySQL server is running we can execute the MySQL command inside the container with:

```bash
docker exec -it basic-mysql /bin/bash
#once inside the container 
mysql -uroot -p
#put/paste the password, and once inside MySQL CLI run
show databases;
```

It will look like the below:

<img class="center" loading="lazy" src="/images/mysql-docker-compose/02mysql-docker.jpg" title="Use MySQL with Docker going inside the container" alt="Use MySQL with Docker going inside the container">

We can stop the container with `docker stop basic-mysql`. 

Even though that wasn’t too hard I would not consider it easy as well as the command’s parameters were not simple to remember. Another aspect is we ran MySQL in isolation, there is no link between the Quotes API Node.js application and the MySQL container.  This is where the declarative nature of docker-compose comes in very handy as we will see in the next section.

## Running MySQL with docker-compose

To run the same MySQL 8.0 with docker-compose we will create a new docker-compose-mysql-only.yml file, with the following contents:

```bash
version: '3.8'
services:
  db:
    image: mysql:8.0
    cap_add:
      - SYS_NICE
    restart: always
    environment:
      - MYSQL_DATABASE=quotes
      - MYSQL_ROOT_PASSWORD=mauFJcuf5dhRMQrjj
    ports:
      - '3306:3306'
    volumes:
      - db:/var/lib/mysql
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
volumes:
  db:
    driver: local
```

The above docker-compose file has the following things to comprehend:

1. It uses the docker-compose file [version 3.8](https://docs.docker.com/compose/compose-file/compose-file-v3/), one of the latest ones.
1. Consequently, we define` db` as a service, each [service](https://docs.docker.com/compose/compose-file/compose-file-v3/#service-configuration-reference) will be equivalent to a new docker run command
1. Subsequently, we point docker-compose to use the official MySQL 8.0 image for this DB service.
1. The `cap_add` set to `SYS_NICE` [suppresses](https://stackoverflow.com/a/55706057) some not useful error messages.
1. Next up we ask docker-compose to always restart this container if it fails.
1. After that we add 2 environment variables for the MySQL database and the root user’s password. As per need, we can add another user to give it less privilege with other env vars.
1. Then, we map the host port `3306` to the container port `3306` as the MySQL server is running on container port `3306`. Depending on the preference the host port may be changed.
1. Then we add 2 volumes, first one is the DB volume mapped to the below volumes `db`. Which basically tells docker and docker-compose to manage the volume for us. Next, we add an `init.sql` script which will [initialize](https://github.com/docker-library/docs/tree/master/mysql#initializing-a-fresh-instance) our `quotes` database with the given SQL file.


We can start the MySQL container this time with docker-compose using:

```bash
docker-compose -f docker-compose-mysql-only.yml up
```

It will show an output like below:

```bash
Starting nodejs-mysql_db_1 ... done
Attaching to nodejs-mysql_db_1
db_1  | 2022-02-19 10:55:55+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.27-1debian10 started.
db_1  | 2022-02-19 10:55:56+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
db_1  | 2022-02-19 10:55:56+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.27-1debian10 started.
db_1  | 2022-02-19T10:55:56.381394Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.0.27) starting as process 1
db_1  | 2022-02-19T10:55:56.392419Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
db_1  | 2022-02-19T10:55:56.878693Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
db_1  | 2022-02-19T10:55:57.258522Z 0 [System] [MY-010229] [Server] Starting XA crash recovery...
db_1  | 2022-02-19T10:55:57.268530Z 0 [System] [MY-010232] [Server] XA crash recovery finished.
db_1  | 2022-02-19T10:55:57.305749Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
db_1  | 2022-02-19T10:55:57.305945Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
db_1  | 2022-02-19T10:55:57.309232Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
db_1  | 2022-02-19T10:55:57.309330Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
db_1  | 2022-02-19T10:55:57.313177Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
db_1  | 2022-02-19T10:55:57.374334Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
db_1  | 2022-02-19T10:55:57.374405Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.27'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
```

The output is similar but this time being declarative with docker-compose, running MySQL inside a docker container was a much easier command.
For your reference, the [PR](https://github.com/geshan/nodejs-mysql/pull/10/files) to add this file is also available. Next up we will link up the MySQL container with our existing Node.js app.


## Adding MySQL to and existing Node.js app using docker-compose

At this point, we have run MySQL with just docker and then with docker-compose which was much easier than the previous long command. Still, one piece of the puzzle is missing, the piece to link the MySQL container with an application. In our case, it will be the Node.js MySQL API for Quotes.

For this beginner’s tutorial we will add a new `docker-compose file` with the following contents:

```bash
version: '3.8'
services:
  db:
    image: mysql:8.0
    cap_add:
      - SYS_NICE
    restart: always
    environment:
      - MYSQL_DATABASE=quotes
      - MYSQL_ROOT_PASSWORD=mauFJcuf5dhRMQrjj
    ports:
      - '3306:3306'
    volumes:
      - db:/var/lib/mysql
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
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
      DB_PORT: 3306
      DB_USER: root
      DB_PASSWORD: mauFJcuf5dhRMQrjj
      DB_NAME: quotes
    links:
      - db
    volumes:
      - ./:/src
volumes:
  db:
    driver: local
```
This docker-compose.yml file looks like a longer version of the above file. The main differences include:

Adding the API service which uses the `Dockerfile` included in the project. We will build the `API` service with the target production. As per your interest, you can read more about [docker multi-stage builds](/blog/2019/11/how-to-use-docker-multi-stage-build/) which explains the use of build target.

Next up, we indicate to docker-compose that the API depends on the DB container. After that, we map the host port `3000` to the container port `3000` as the Express.js app with Node.js runs on port `3000`.

Subsequently, we set all the needed environment variables to that the Node.js app connects to to the MySQL database running inside the container without problems. After that, we map the local file in `./` to `./src` in the container so that all the file changes are reflected inside the container. Next, we link both containers so that the API container can communicate with the DB container.

This `docker-compose.yml` file is available as a [pull request](https://github.com/geshan/nodejs-mysql/pull/12/files#diff-e45e45baeda1c1e73482975a664062aa56f20c03dd9d64a827aba57775bed0d3) for your reference.

When we run the application with `docker-compose up` we will see output like the below:

```bash
Starting nodejs-mysql_db_1 ... done
Starting quotes-api        ... done
Attaching to nodejs-mysql_db_1, quotes-api
db_1   | 2022-02-19 11:08:36+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.27-1debian10 started.
db_1   | 2022-02-19 11:08:36+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
db_1   | 2022-02-19 11:08:36+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.27-1debian10 started.
db_1   | 2022-02-19T11:08:36.469670Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.0.27) starting as process 1
db_1   | 2022-02-19T11:08:36.478201Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
db_1   | 2022-02-19T11:08:36.830802Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
db_1   | 2022-02-19T11:08:37.004513Z 0 [System] [MY-010229] [Server] Starting XA crash recovery...
db_1   | 2022-02-19T11:08:37.015831Z 0 [System] [MY-010232] [Server] XA crash recovery finished.
db_1   | 2022-02-19T11:08:37.063455Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
db_1   | 2022-02-19T11:08:37.063521Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
db_1   | 2022-02-19T11:08:37.064770Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
db_1   | 2022-02-19T11:08:37.064845Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
db_1   | 2022-02-19T11:08:37.068935Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
db_1   | 2022-02-19T11:08:37.109788Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
db_1   | 2022-02-19T11:08:37.109836Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.27'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
quotes-api | 
quotes-api | > nodejs-mysql@0.0.0 start /src
quotes-api | > node ./bin/www
quotes-api | 
```

If we hit the browser with `http://localhost:3000/quotes` we can see something like the following:

<img class="center" loading="lazy" src="/images/mysql-docker-compose/03mysql-docker-nodejs.jpg" title="Use MySQL with Docker with an existing Node.js application" alt="Use MySQL with Docker with an existing Node.js application">

Great! Our Node.js Express Quotes API is communicating properly with the local MySQL running inside the docker container and connected with docker-compose. As the data was put from the `init.sql` script the quotes are available in the API response. 

Check out this step-by-step tutorial if you want to run [Postgres with Docker](/blog/2021/12/docker-postgres/).

## Conclusion

In this guide, we saw how to run MySQL with docker run, then docker-compose, and finally linked up with a Node.js application step-by-step. 

> I hope this tutorial has helped you understand how to run MySQL with Docker and docker-compose.