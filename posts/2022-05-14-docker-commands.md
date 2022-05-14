---
layout: post
title: 10 useful Docker commands to get things done with a real-life example
date: 2022-05-14T22:37:45.000+11:00
comments: true
tags:
- Software Engineering
- Docker
cover: "/images/docker-commands/01docker-commands.jpg"
pagetitle: 10 useful Docker commands to get things done with a real-life example
description: Learn how to use 10 useful docker commands in this intro guide like run, exec, logs and cp to get more done with Docker.
keywords: docker command, docker commands, docker run, docker exec, docker logs, docker images, docker ps

---
Docker packages software applications into containers making them easy to build, test, and ship (deploy). In this post we will look into some useful docker commands you should know about with real-life examples. Let’s get rolling!

<img class="center" loading="lazy" src="/images/docker-commands/01docker-commands.jpg" title="Append contents to a file using Node.js" alt="Append contents to a file using Node.js">

<!-- more -->

## Table of contents

* [Prerequisites](#prerequisites)
* [Example](#example)
* [Docker Commands](#docker-commands)
    * [Docker search](#docker-search)
    * [Docker pull](#docker-pull)
    * [Docker images](#docker-images)
    * [Docker run](#docker-run)
    * [Docker ps](#docker-ps)
    * [Docker exec](#docker-exec)
    * [Docker logs](#docker-logs)
    * [Docker stop](#docker-stop)
    * [Docker kill](#docker-kill)
        * [Difference between docker stop and kill](#difference-between-docker-stop-and-kill)
    * [Docker cp](#docker-cp)
        * [Copy file from host to the container](#copy-file-from-host-to-the-container)
        * [Copy file from container to host](#copy-file-from-container-to-host)
* [Other useful docker commands](#other-useful-docker-commands)
* [Conclusion](#conclusion)

<!-- tocstop -->

## Prerequisites

Some prerequisites to following this tutorial are listed below:

1. Have docker installed on your machine
1. Generally aware of [what is docker and why to use it](https://www.ibm.com/au-en/cloud/learn/docker)
1. Know about [DockerHub](https://hub.docker.com/search?q=), think of it as GitHub for container images


In the consequent section, we will brief about the example we are going to use to know the handy docker commands.

## Example

Before diving deeper into the examples, it would be best to know that Docker is beneficial when used in the [local development environment](blog/2018/10/why-use-docker-3-reasons-from-a-development-perspective/). It would be safe to say that docker has changed how software engineers work in the [past decade years](/blog/2018/11/4-ways-docker-changed-the-way-software-engineers-work-in-past-half-decade/) after releasing in 2013.

All the commands run for the example used have been run on a Mac (M1 pro chip) with Docker version 20.10.13, build a224086. We will run the MySQL server locally as an example to know and understand the useful docker commands. In the next section, we will start with the commands and get our hands dirty.

## Docker Commands

For this exercise, we will look into 12+ docker commands that you should be aware of. The goal is to run the MySQL server locally using docker. That leads us to the first docker command, docker search.

### Docker search

As its help with `docker search –help` says, it helps search Docker hub for images. As our aim is to run MySQL locally let’s run the following command to see what MySQL related images are available on DockerHub:

```bash
docker search mysql
```
This gives an output similar to the below:


```bash
NAME                           DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql                          MySQL is a widely used, open-source relation…   12559     [OK]       
mariadb                        MariaDB Server is a high performing open sou…   4829      [OK]       
percona                        Percona Server is a fork of the MySQL relati…   576       [OK]       
phpmyadmin                     phpMyAdmin - A web interface for MySQL and M…   535       [OK]       
bitnami/mysql                  Bitnami MySQL Docker Image                      71                   [OK]
linuxserver/mysql-workbench                                                    36                   
linuxserver/mysql              A Mysql container, brought to you by LinuxSe…   35                   
ubuntu/mysql                   MySQL open source fast, stable, multi-thread…   33                   
circleci/mysql                 MySQL is a widely used, open-source relation…   25                   
google/mysql                   MySQL server for Google Compute Engine          21                   [OK]
vmware/harbor-db               Mysql container for Harbor                      10                   
bitnami/mysqld-exporter                                                        3                    
ibmcom/mysql-s390x             Docker image for mysql-s390x                    2                    
newrelic/mysql-plugin          New Relic Plugin for monitoring MySQL databa…   1                    [OK]
nasqueron/mysql                                                                1                    [OK]
vitess/mysqlctld               vitess/mysqlctld                                1                    [OK]
mirantis/mysql                                                                 0
…                    
```

It is not super useful as it is listing all the MySQL images, to make our search more useful and target we will use the filter and limit parameters as follows:

```bash
docker search --filter=is-official=true --limit=5 mysql
```
 Here, we are asking docker to give us only the [official images](https://docs.docker.com/docker-hub/official_images/) and limit it to 5 for mysql. It will yield something like:

```bash
NAME         DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql        MySQL is a widely used, open-source relation…   12559     [OK]       
mariadb      MariaDB Server is a high performing open sou…   4829      [OK]       
percona      Percona Server is a fork of the MySQL relati…   576       [OK]       
phpmyadmin   phpMyAdmin - A web interface for MySQL and M…   535       [OK]       
```

Looks like the official MySQL image with 12.5K stars should suffice our need. What we did is more like googling for “docker mysql” in some sense. Anyways as for the next task, let’s pull it and go toward running run it.


### Docker pull

We could directly run the image with the `docker run` command but in this tutorial, we are learning the docker commands so let’s understand what `docker pull` can do for us. Docker pull command will pull an image or a repository from a registry. 

A registry is a place that stores built docker images, DockerHub being the main one but as per the need you/your company can set up a private docker image registry too. AWS also has a [public container registry](https://gallery.ecr.aws/) we can use.

To pull a docker image it would be best to know the specific version to pull, in our case we can visit the MySQL’s DockerHub [tags](https://hub.docker.com/_/mysql?tab=tags) page. For this example, I will pull MySQL 8.0-oracle:

```bash
docker pull mysql:8.0-oracle
```
It will show an output like the below:

```
8.0-oracle: Pulling from library/mysql
2d35f3f87cf6: Pull complete 
e08c104e7e4b: Pull complete 
9a34eb48fc75: Pull complete 
5bb6dedbc752: Pull complete 
19a4f2fda7b8: Pull complete 
dff080c7a5fa: Pull complete 
5c984e7fd2f6: Pull complete 
57b567fb3d57: Pull complete 
bbbd9d96c94e: Pull complete 
71907ccd70c5: Pull complete 
Digest: sha256:fc7cc18cbd47405471f57a6cf3ae44883fc3aecff8248c5318f18e1bbbf4c7d3
Status: Downloaded newer image for mysql:8.0-oracle
docker.io/library/mysql:8.0-oracle
```

If there is a push there is a [docker push](https://docs.docker.com/engine/reference/commandline/push/) command too but we will not learn about that in this post. Let’s see if it is pulled correctly with `docker images` next.

### Docker images
The docker command `docker images` lists images on the local system. It will list the images pulled in from repositories or built locally. As we have pulled in the `mysql8.0-oracle` image we can see it listed with:

```bash
docker images
```
It will give us the following output:

```bash
REPOSITORY     TAG            IMAGE ID       CREATED         SIZE
mysql          8.0-oracle     a1eb4ca73814   10 days ago     505MB
```

Depending on other images pulled or built locally you may see more images on your system.
One useful command to remove intermediate images or images that were not successfully built or pulled is below:

```bash
docker rmi -f $(docker images -f "dangling=true" -q)
```
This uses the `docker rmi` command used to remove images with docker images that are dangling, meaning they were not pulled or built successfully.

Now, as we know the image is pulled and available locally we can run the MySQL image in the subsequent section.

### Docker run

The `docker run` command is used to run an image as a new container. To say that it has some parameters will be an understatement as we can see lots of parameters with `docker run –help`. 

> Docker run is one of the most important docker commands to learn. It has multiple arguments to do many things. It would be wise to understand the difference of image and container first.

If you are confused about Image and container, please read this post about [Image vs container](https://dockerlabs.collabnix.com/beginners/components/container-vs-image.html). In summary, an image is a snapshot of a container and when an image runs (becomes a running instance) it is a container. Containers can be directly run with just a `docker run` command without a docker pull. With the run command, Docker will pull the image and run it.

For this guide, we will use some of the main ones that are useful to run MySQL in our case, before running the command below please execute `mkdir /tmp/mysql-data`, then run:

```bash
docker run --name mysql8 --rm -v /tmp/mysql-data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=KTQJbtWYtM1u1UUj -e MYSQL_DATABASE=testing -p 3306:3306 -it mysql:8.0-oracle
```

So, what are the parameters we used for the `docker run` command, let’s elaborate on the parameters:

* `--name` is passed to name the container as `mysql8`, if not passed docker will use a random name
* `--rm` is used to remove the container when it is stopped
* `-v /tmp/mysql-data:/var/lib/mysql` is added as volume to retain the data when the container restarts, it will vanish when the host [machine restarts](https://www.fosslinux.com/41739/linux-tmp-directory-everything-you-need-to-know.htm) as it is in `/tmp`. Volumes can be [managed](https://docs.docker.com/engine/reference/commandline/volume_create/) implicitly by Docker too.
* `-e MYSQL_ROOT_PASSWORD=KTQJbtWYtM1u1UUj -e MYSQL_DATABASE=testing` as utilized to set the root user’s password and initializing a database named `testing`
* `-p 3306:3306` maps host port 3306 to container port 3306, the port 3306 is MySQL’s default port. You can map to a different host port too like `3307:3306` will map local post 3307 to container port 3306
* ` -it mysql:8.0-oracle` - -it will show all logs as the tty is allocated and we are using the official MySQL image version 8.0 which will run the Oracle flavor.

If we wanted to push the output to the background we can use the `-d` flag to keep the output detached and not show in the foreground. For more options please skim through the official [docker run docs](https://docs.docker.com/engine/reference/run/#docker-run-reference).



Let’s understand what the above command does then we will also see what it outputs.

```bash
2022-05-14 06:13:34+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.29-1.el8 started.
2022-05-14 06:13:34+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
2022-05-14 06:13:34+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.29-1.el8 started.
2022-05-14 06:13:34+00:00 [Note] [Entrypoint]: Initializing database files
2022-05-14T06:13:34.963954Z 0 [System] [MY-013169] [Server] /usr/sbin/mysqld (mysqld 8.0.29) initializing of server in progress as process 44
2022-05-14T06:13:34.974569Z 0 [Warning] [MY-010159] [Server] Setting lower_case_table_names=2 because file system for /var/lib/mysql/ is case insensitive
2022-05-14T06:13:34.991554Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2022-05-14T06:13:39.989090Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2022-05-14T06:13:42.519457Z 6 [Warning] [MY-010453] [Server] root@localhost is created with an empty password ! Please consider switching off the --initialize-insecure option.
2022-05-14 06:13:48+00:00 [Note] [Entrypoint]: Database files initialized
2022-05-14 06:13:48+00:00 [Note] [Entrypoint]: Starting temporary server
mysqld will log errors to /var/lib/mysql/46a76c820507.err
mysqld is running as pid 95
2022-05-14 06:13:50+00:00 [Note] [Entrypoint]: Temporary server started.
'/var/lib/mysql/mysql.sock' -> '/var/run/mysqld/mysqld.sock'
Warning: Unable to load '/usr/share/zoneinfo/iso3166.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/leapseconds' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/tzdata.zi' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone1970.tab' as time zone. Skipping it.
2022-05-14 06:13:53+00:00 [Note] [Entrypoint]: Creating database testing

2022-05-14 06:13:53+00:00 [Note] [Entrypoint]: Stopping temporary server
2022-05-14 06:13:55+00:00 [Note] [Entrypoint]: Temporary server stopped

2022-05-14 06:13:55+00:00 [Note] [Entrypoint]: MySQL init process done. Ready for start up.

2022-05-14T06:13:56.134193Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.0.29) starting as process 1
2022-05-14T06:13:56.142565Z 0 [Warning] [MY-010159] [Server] Setting lower_case_table_names=2 because file system for /var/lib/mysql/ is case insensitive
2022-05-14T06:13:56.154825Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2022-05-14T06:13:57.163042Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2022-05-14T06:13:57.725555Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
2022-05-14T06:13:57.725586Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
2022-05-14T06:13:57.814829Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
2022-05-14T06:13:57.814890Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.29'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
```

Basically, our MySQL server is running right now and able to accept any connections.


I have written another post for running [MySQL with docker-compose](/blog/2022/02/mysql-docker-compose/#running-mysql-with-docker-compose), you can read it as well. There are other posts related to Docker as well like running [Postgres with Docker](/blog/2021/12/docker-postgres/), [Node.js and Docker](/blog/2020/11/nodejs-with-docker/), [Redis on Docker](/blog/2022/01/redis-docker/) and [RabbitMQ with Docker](/blog/2021/07/rabbitmq-docker-nodejs/).

Now to check if the container is running or not we can use the `docker ps` command which we will discuss next.

### Docker ps

The docker ps command is used to list containers. It will list all running containers and with a `-a` flag it will list all containers,s not just the running one. If you try `docker ps` you should be able to see something like the below:

```bash
CONTAINER ID   IMAGE              COMMAND                  CREATED         STATUS         PORTS                               NAMES
46a76c820507   mysql:8.0-oracle   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:3306->3306/tcp, 33060/tcp   mysql8
```

At this point, we have listed our running container and can verify that it is mapping to local post 3306 and has the name we gave it of `mysql8`. In the consequent section, we will go into the running container and execute some commands.

### Docker exec

The `docker exec` command is useful to run a command in a running container. Depending on what is available in the container we can go into the container with sh/bash and run other commands inside the running container.

For our example, as we have a running MySQL container let’s make sure that our `testing` database exists with the following series of commands:

```bash
docker exec -it mysql8 /bin/bash
#once we are inside the container, we can run
mysql -uroot -p
#type/paste the password, and once we gave the MySQL CLI running, we can execute
show databases;
```
This will look similar to the following:

<img class="center" loading="lazy" src="/images/docker-commands/02docker-commands-exec.jpg" title="Docker command - docker exec example" alt="Docker command - docker exec example">

As seen, `docker exec` is another very useful command to go inside a docker container or just run one-off commands on a running container. It is very helpful to debug any issues in a running container by executing extra commands or checking logs inside the container. In the subsequent sections, we will explore `docker logs` to see the logs of the running container.


### Docker logs

The `docker logs` command is used to fetch the logs of a container. It also has multiple parameters of which the `-f` to follow the logs is one of the most useful ones. It can be used as follows:

```bash
docker logs -f mysql8
```

Which will render an output like the below:

```bash
2022-05-14 11:37:39+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.29-1.el8 started.
2022-05-14 11:37:39+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
2022-05-14 11:37:39+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.29-1.el8 started.
2022-05-14 11:37:39+00:00 [Note] [Entrypoint]: Initializing database files
2022-05-14T11:37:39.274964Z 0 [System] [MY-013169] [Server] /usr/sbin/mysqld (mysqld 8.0.29) initializing of server in progress as process 44
2022-05-14T11:37:39.281699Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2022-05-14T11:37:39.382089Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2022-05-14T11:37:39.772787Z 6 [Warning] [MY-010453] [Server] root@localhost is created with an empty password ! Please consider switching off the --initialize-insecure option.
2022-05-14 11:37:41+00:00 [Note] [Entrypoint]: Database files initialized
2022-05-14 11:37:41+00:00 [Note] [Entrypoint]: Starting temporary server
mysqld will log errors to /var/lib/mysql/1e296cc4efac.err
mysqld is running as pid 95
2022-05-14 11:37:41+00:00 [Note] [Entrypoint]: Temporary server started.
'/var/lib/mysql/mysql.sock' -> '/var/run/mysqld/mysqld.sock'
Warning: Unable to load '/usr/share/zoneinfo/iso3166.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/leapseconds' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/tzdata.zi' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone.tab' as time zone. Skipping it.
Warning: Unable to load '/usr/share/zoneinfo/zone1970.tab' as time zone. Skipping it.
2022-05-14 11:37:43+00:00 [Note] [Entrypoint]: Creating database testing

2022-05-14 11:37:43+00:00 [Note] [Entrypoint]: Stopping temporary server
2022-05-14 11:37:44+00:00 [Note] [Entrypoint]: Temporary server stopped

2022-05-14 11:37:44+00:00 [Note] [Entrypoint]: MySQL init process done. Ready for start up.

2022-05-14T11:37:44.586231Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.0.29) starting as process 1
2022-05-14T11:37:44.589830Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2022-05-14T11:37:44.631698Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2022-05-14T11:37:44.709052Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
2022-05-14T11:37:44.709084Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
2022-05-14T11:37:44.718522Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.29'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
2022-05-14T11:37:44.718526Z 0 [System] [MY-011323] [Server] X Plugin ready for connections. Bind-address: '::' port: 33060, socket: /var/run/mysqld/mysqlx.sock
```

This command is very useful when our container is running in detached mode to view its logs. The `docker logs` command comes in very handy for webservers or application servers where logs are piped to the stdout and gives us valuable insight into the running application. Next up we will stop and kill our running container.

### Docker stop

The `docker stop` command is used to stop one or more running containers. We will use this command to stop our `mysql8` container. We can pass the `-t` flag to wait for the container to stop for given number of seconds like:

```bash
docker stop -t 5 mysql8
```
If the `-t 5` parameter is not passed, the docker stop command will wait for 10 seconds by default. It will output the name of the container. A container can also be stopped by passing the container id not only the name. After the container is stopped if we do a `docker ps` we will not see our `mysql8` container running anymore.

So you have docker kill too?

### Docker kill

Similar to docker stop, there is the `docker kill` command that is used to `kill` one or more running containers. We can kill the running container named `mysql8` with:

```bash
docker kill mysql8
```

This command will kill the container. You might be wondering what is the difference between stop and kill then right? That will be answered next:

#### Difference between docker stop and kill

The difference between docker stop and docker kill is that docker stop issues a SIGTERM so [waits](https://www.ibm.com/docs/en/aix/7.2?topic=management-process-termination) for the container to clean up before killing it. Whereas `docker kill` will issue a SIGKILL which will not be as polite and directly kill the container. To know other minute differences between the two, follow this [post](https://www.designcise.com/web/tutorial/whats-the-difference-between-docker-stop-and-docker-kill-commands).


### Docker cp

The `docker cp` is a handy command but a lesser-known one. It is used to copy files/folders between a container and the host’s local file system. One use-case I have used recently is to copy the `node_modules` from the container in the build phase in the CI pipeline and reuse it in the test phase on the host. It easily saved 30+ seconds of `npm install` time. Below are a couple of examples to copy a file from host to container and vice versa.

#### Copy file from host to the container

Let’s say we want to copy a SQL file called test.sql into the running MySQL container named `mysql8`, we can do it with:

```bash
docker cp ./test.sql mysql8:/tmp
```
To verify the file is there we can execute:

```bash
docker exec -it mysql8 ls -al /tmp
```
It will show something like the below:

```bash
total 12
drwxrwxrwt 1 root root  4096 May 14 12:14 .
drwxr-xr-x 1 root root  4096 May 14 12:14 ..
-rw-r--r-- 1  501 games   19 May 14 12:13 test.sql
```

#### Copy file from container to host

Now we will try to copy the same file from the container to the host with a different filename by executing:

```bash
docker cp mysql8:/tmp/test.sql ./test2.sql
```

If we do a `ls -al | grep test2` on that folder in the host we will see the file has been copied from the container to the host folder. The `docker cp` command can be useful to copy a file from or to the container on the fly without the need to rebuild the image again.

In addition to the above 10+ command, there are many other useful docker commands. Some of these are listed in the next part.

## Other useful docker commands

Surely, there are many handy docker commands that can help you get things done. Some of them are [info](https://docs.docker.com/engine/reference/commandline/info/), [inspect](https://docs.docker.com/engine/reference/commandline/inspect/), [history](https://docs.docker.com/engine/reference/commandline/history/), [network](https://docs.docker.com/engine/reference/commandline/network/), [restart](https://docs.docker.com/engine/reference/commandline/restart/), [top](https://docs.docker.com/engine/reference/commandline/top/), and [build](https://docs.docker.com/engine/reference/commandline/build/).

You can learn about how to [build docker images faster](/blog/2020/10/docker-build-example-faster-docker-build/) to save time on building Docker images with BUILDKIT and better docker layer caching. Similarly, [Docker multi-stage build](https://geshan.com.np/blog/2019/11/how-to-use-docker-multi-stage-build/) is also a super useful feature to get your docker image sizes down. And then docker-compose is another sea to swim in :).

## Conclusion

We have seen the usage of 10 useful docker command that is needed to get an image, run it, go inside it, print some logs, and then stop/kill it. That is basically the main lifecycle of running Docker containers from images.

> I hope it has helped you learn more things about Docker!
