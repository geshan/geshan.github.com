---
layout: post
title: Setting up environment variables in Docker Compose an almost complete guide
date: 2023-08-28T22:07:57.000+11:00
comments: true
tags:
- Software Engineering
- Docker
cover: "/images/docker-compose-environment-variables/01docker-compose-environment-variables.jpg"
pagetitle: Setting up environment variables in Docker Compose an almost complete guide
description: "In this tutorial, you will learn how to set up environment variable sin docker compose in the docker-compose.yml file and an external .env file with substitution and precedence."
keywords: docker compose environment variables, docker compose env vars, docker compose env_file, docker compose env_file .env, docker compose env_file .env substitution, docker compose env_file .env precedence
---
Docker Compose is a powerful tool for orchestrating multi-container applications. It allows software engineers to define and manage environment variables seamlessly. In the realm of modern software development and containerization, environment variables play a pivotal role in configuring applications and services. They offer a flexible way to manage settings, credentials, and other secret and dynamic values without hardcoding them into code. In this comprehensive guide, you will delve into the intricacies of setting up environment variables in Docker Compose, covering everything from the basics to best practices. Let's get going!

<!-- more -->

<img class="center" src="/images/docker-compose-environment-variables/01docker-compose-environment-variables.jpg" title="Setting up environment variables in Docker Compose an almost complete guide" alt="Setting up environment variables in Docker Compose an almost complete guide">

## Table of contents

* [Prerequisites](#prerequisites)
* [Using MySQL container as an example](#using-mysql-container-as-an-example)
* [How to define environment variables in Docker run](#how-to-define-environment-variables-in-docker-run)
* [Adding environment variables in the Docker compose file](#adding-environment-variables-in-the-docker-compose-file)
    * [Substitute from shell or .env file](#substitute-from-shell-or-env-file)
    * [Pass the env file with --env-file argument](#pass-the-env-file-with---env-file-argument)
* [Putting environment variable in an external file](#putting-environment-variable-in-an-external-file)
    * [Use the env_file attribute](#use-the-env_file-attribute)
* [Docker compose environment variables precedence](#docker-compose-environment-variables-precedence)
* [Best practices for Docker compose environment variables](#best-practices-for-docker-compose-environment-variables)
* [Conclusion](#conclusion)

## Prerequisites

Before you go to the code section, the following are some prerequisites:

1. You have docker and docker-compose installed on your local machine. This post will make use of Docker 24.0.2 and docker-compose v 2.18.1 on a Mac. Docker compose can be run with `docker-compose` or `docker compose` command in this version of docker and docker-compose.
1. Prior experience with docker and docker-compose will be helpful.
1. Knowledge of MySQL and injecting environment variables will be useful but not necessary.

For the context of this guide, you will use docker-compose in a development setting only. You are not expected to use docker-compose to orchestrate or scale containers. Scaling and orchestrating containers is done in a better way by Kubernetes. Given the requisites are mentioned, in the next section you will learn about MySQL container as an example for the whole post. 

## Using MySQL container as an example

For this post, you will use a MySQL 8.1 container as an example. You will first run the container without docker-compose and inject some environment variables. Then you will learn how to run the same MySQL container with docker compose and two main ways to inject those same environment variables. 

## How to define environment variables in Docker run

You can easily run a MySQL 8.1 container pulling the Docker image from DockerHub with the [Docker run](/blog/2022/05/docker-commands/#docker-run) command. First run `mkdir /tmp/mysql-data` to create a folder to hold the MySQL data then run the `docker run` command as follows:

```bash
docker run --name mysql81 --rm -v /tmp/mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=mauFJcuf5dhRMQrjj -e MYSQL_DATABASE=testing -p 3306:3306 -it mysql:8.1
```

The parameters in the above docker run command are doing the following things:

* the option `--name` is used to assign the container the name "mysql8". If this option is not provided, Docker will assign a random name to the container
* To ensure the container is removed when it stops, the --rm flag is utilized
* A volume -v is attached to /tmp/mysql-data and /var/lib/mysql, ensuring that the data is retained between container restarts. However, this data will be removed when the host machine restarts, given its location in /tmp.
* Environment variables -e are set to configure the MySQL instance. For instance, `MYSQL_ROOT_PASSWORD` is set to "mauFJcuf5dhRMQrjj" for the root user's password, and `MYSQL_DATABASE` is set to "testing" to initialize a database named "testing". This is the main focus here.
* The option `-p 3306:3306` maps the host port 3306 to the container's port 3306. Port 3306 is MySQL's default port, and you can choose to map to a different host port, such as 3307:3306, which would link the local port 3307 to the container's port 3306.
* The combination of -it ensures that the container runs interactively, allowing the display of all logs as a terminal is allocated. We're using the official MySQL image version 8.1.

When it runs successfully it will show an output like the below:

<img class="center" loading="lazy" src="/images/docker-compose-environment-variables/02docker-run.jpg" title="Docker run with environment variables" alt="Docker run with environment variables">

If you want you can go into the container using the [docker exec](/blog/2022/05/docker-commands/#docker-exec) command. 

## Adding environment variables in the Docker compose file

You can run the same MySQL container much more easily, without the need to remember all the parameters more declaratively with a `docker-compose.yml` file which looks like the below:

```bash
version: '3.8'
services:
  db:
    image: mysql:8.1
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

Here the environment variables are passed using the `environment` attribute. An init file is used to load the database with a sample quotes schema and some data, you can see the [file](https://github.com/geshan/docker-compose-env-vars/blob/master/db/init.sql) and its content in this [GitHub repository](https://github.com/geshan/docker-compose-env-vars). You can learn more about [Docker-compose and MySQL](/blog/2022/02/mysql-docker-compose/#running-mysql-with-docker-compose) by reading this tutorial. For now, let's focus on the environment variable part.

As you can see above, the environment variables are part of the docker-compose file, and the sensitive variables are not replaced by another file or OS/shell variables. You will learn substitution in the next section.

### Substitute from shell or .env file

To make the environment variables more obscure and not easily visible in the docker-compose.yml file you can substitute them. It can be substituted either from a `.env` file or from a shell variable. You can add a file named `.env` on the same level as your `docker-compose.yml` file with the following contents:

```bash
MYSQL_DATABASE=quotes
MYSQL_ROOT_PASSWORD=mauFJcuf5dhRMQrjj
```

Then you can change your docker-compose file to look like the below:

```bash
version: '3.8'
services:
  db:
    image: mysql:8.1
    cap_add:
      - SYS_NICE
    restart: always
    environment:
      - MYSQL_DATABASE=${MYSQL_DATABASE}
      - MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD}
    ports:
      - '3306:3306'
    volumes:
      - db:/var/lib/mysql
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
volumes:
  db:
    driver: local
```

Now the variables `${MYSQL_DATABASE}` and `${MYSQL_ROOT_PASSWORD}` will be replaced by the values store in the `.env` file. You can check the final `docker-compose.yml` file that will be used for docker-compose commands by running `docker compose -f docker-compose-02-env-file.yml config` it will show you the compiled file as below:

<img class="center" loading="lazy" src="/images/docker-compose-environment-variables/03environment-attr.jpg" title="Docker compose environment variable substituted from file" alt="Docker compose environment variable substituted from file">

You can also set the variable as Shell variables and it will also be used. For example you can set the `MYSQL_DATABASE` variable to `test` by executing `export MYSQL_DATABASE=test`. After that if you run `docker compose -f docker-compose-02-env-file.yml config` you will see:

<img class="center" loading="lazy" src="/images/docker-compose-environment-variables/04env-from-shell.jpg" title="Docker compose environment variable substituted from shell" alt="Docker compose environment variable substituted from shell">

In addition to the environment variables, you can also replace other things in the `docker-compose.yml` file with this pattern. For instance, if you want to put `image: mysql:{MYSQL_VERSION}` and get it replaced with a value from `.env` or shell variable it can be done too.


### Pass the env file with --env-file argument

If you need to use a different set of environment variables for different environments on the fly then you can do it using `--env-file` argument with docker-compose commands. This will substitute the variable on the `docker-compose.yml` file for each command. Below is a `.env.test` file with the following variables:

```bash
MYSQL_DATABASE=quotes_test
MYSQL_ROOT_PASSWORD=test
```

To use this file while testing, you can use the command shown next:

```bash
docker compose --env-file .env.test -f docker-compose-02-env-file.yml config 
```

It will use the `.env.test` file for the environment variables and the used `docker-compose.yml` file will look like the below:

<img class="center" loading="lazy" src="/images/docker-compose-environment-variables/05env-test-file.jpg" title="Docker compose environment variable substituted from test env file" alt="Docker compose environment variable substituted from test env file">

If you don’t want to list your environment variables in the `docker-compose.yml` file with the `environment1 attribute, that is possible. For that, you will need to use an external file, which will be elaborated in the next section.

## Putting environment variable in an external file

You can put all your environment variables in an external file like a `.env` file. You can use the same `.env` file from the above example that has the `MYSQL_DATABASE` and `MYSQL_ROOT_PASSWORD` variables. To use this file to feed in the environment variable for the running docker container you will use the `env_file` [attribute](https://docs.docker.com/compose/compose-file/05-services/#env_file). It is discussed in the next section.

### Use the env_file attribute

If you want you can also pass multiple files using the `env_file` attribute in docker-compose. To run the MySQL container with the `env_file` attribute, it will be changed to look as follows:

```bash/8-9
version: '3.8'
services:
  db:
    image: mysql:8.1
    cap_add:
      - SYS_NICE
    restart: always
    env_file:
      - .env
    ports:
      - '3306:3306'
    volumes:
      - db:/var/lib/mysql
      - ./db/init.sql:/docker-entrypoint-initdb.d/init.sql
volumes:
  db:
    driver: local
``` 

The file has been saved as `docker-compose-03-env-file-attr.yml` and you can check the final docker compose file with `docker compose -f docker-compose-03-env-file-attr.yml config`. It will look similar to the above file with the `environment` variable. But this one is taking the environment variables from an external file with the `env_file` attribute.

## Docker compose environment variables precedence

There are multiple ways to pass the environment variables in docker compose. So an order is needed to decide what method takes precedence over the other.  The priority is as follows:

1. Configured via docker compose run -e in the [command-line interface](https://docs.docker.com/compose/environment-variables/set-environment-variables/#set-environment-variables-with-docker-compose-run---env) (CLI).
1. Substituted from your [shell](https://docs.docker.com/compose/environment-variables/set-environment-variables/#substitute-from-the-shell) environment variables.
1. Defined through the [environment attribute](https://docs.docker.com/compose/environment-variables/set-environment-variables/#use-the-environment-attribute) in the Compose file.
1. Utilization of the --env-file [argument](https://docs.docker.com/compose/environment-variables/set-environment-variables/#substitute-with---env-file) in the CLI.
1. Leverage of the env_file [attribute](https://docs.docker.com/compose/environment-variables/set-environment-variables/#use-the-env_file-attribute) in the Compose file.
1. Establishment within an [.env](https://docs.docker.com/compose/environment-variables/set-environment-variables/#substitute-with-an-env-file) file positioned at the root of your project directory.
1. Set within a container image utilizing the [ENV](https://docs.docker.com/engine/reference/builder/#env) directive. Worth noting is that any ARG or ENV settings within a Dockerfile come into play only if no Docker Compose entries for environment, env_file, or run --env are present.

So now you know that if you set a bash variable it will override setting the same environment variable on a file passed with `--env-file`. So be careful about the precedence of the variables to get your desired output.

All the examples of this post are in this [GitHub repository](https://github.com/geshan/docker-compose-env-vars) for your reference. Some best practices regarding docker-compose environment variables are discussed next.

## Best practices for Docker compose environment variables

Below are some best practices for using environment variables in a docker-compose file:

* Use environment variables to store sensitive data, such as passwords and API keys. This will help to keep your data secure and prevent it from being exposed. * Substitute them from the shell/OS environment variable on a docker-compose file.
* Use a consistent naming convention for environment variables. This will make it easier to track and manage your environment variables.
* Use a version control system to track changes to environment variables. This will help you to keep track of changes to your environment variables and identify any potential security vulnerabilities.
* Use a secrets management tool to store sensitive data. This will help to keep your data secure and prevent it from being exposed.

Those are some practices you should remember for docker-compose environment variables and environment variables in general.

## Conclusion

In this guide, you learned how to put environment variables with a regular docker run command. Then you were guided to use environment variables with the `environment` attribute in a docker-compose file for a MySQL container. After that, you used some environment variable substitution from shell and `.env` files. 

You also learned to use the `env_file` attribute of the docker-compose file to put the environment variables in an external file. Toward the end, you found out about the precedence of environment variables in docker-compose and finally learned some best practices for them. 

I hope now you are more confident about using environment variables properly in the docker-compose context. Happy dockerizing your apps!
