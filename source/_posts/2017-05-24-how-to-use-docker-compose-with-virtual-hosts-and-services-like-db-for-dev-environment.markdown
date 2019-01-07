---
layout: post
title: "How to use docker compose with virtual hosts and shared services (like db) for dev environment"
date: 2017-05-24 18:53:04 +0400
comments: true
categories:
- Docker
- Technology
- misc
- DevOps
cover: /images/docker-compose-vhost/docker-compose-vhost.jpg
---

Docker as been immensely popular in the past years. If you are not using docker at least in your dev environment in 2017. 
You are surely missing out on some great advantages. Your new software engineer should start writing production-ready code 
in a matter of hours not days. All thanks to docker.  Along the same lines, this post will cover how you can set up 
docker for your dev environment with least friction and maximum productivity. It is an opinionated post. We migrated to this `external_links`
[approach](https://docs.docker.com/compose/compose-file/#externallinks) so that we could run multiple projects/microservices that use the same db/services shared among them.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/docker-compose-vhost/docker-compose-vhost.jpg" title="Docker compose with vhost and shared services" alt="Docker compose with vhost and shared services">

<!-- more -->

##  Context

* This tutorial is generally agnostic of docker and docker-compose versions (I am using docker compose 1 syntax). I assume you have docker and docker-compose installed and know about them.
* It uses external images like Nginx proxy for virtual host per project. Mysql db as shared external service. It could also have been mongo or redis or even rabbit mq. The main point is to use it as `external_link` in the docker compose file, so that it can be shared among projects.
* It uses a demo app which emulates the page visit/hit counter popular decades back with a [~30 liner Nodejs app](https://github.com/geshan/counter/blob/master/index.js) and Mysql db.
* I would like to keep the description as concise as possible and in points to make it simple and clear. You should read the code of [sample counter project](https://github.com/geshan/counter) and sample mysql container's [docker-compose.yml](https://github.com/geshan/sample-mysql/blob/master/docker-compose.yml) well.
* The goal is to grasp the concepts well and apply it to your current project. For example, you could start with replacing your local mysql install with a docker container.

## Problems to solve

1. After I use docker and docker compose, the web server (nginx/apache etc) of project A takes up port 80 and I can't run project B on port 80 or have a virtual host for both projects.
1. When I use my db (mysql/postgres) as a service in my docker compose for project A, It is cumbersome to use the same db for another project as its coupled with project A.
1. I just want to run my mysql database, import some data and run some queries. I don't want to run my app for now.

## Solution goals

1. To make services like db etc independent of projects and shared among projects similar to having a local install of mysql with multiple databases.
1. Multiple projects should be able to run in parallel and each of them will have their own virtual host for easy accessibility.

## Steps
 
1. Run the Nginx proxy to enable virtual hosts with `$ docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy`
1. Add `127.0.0.1 counter.local.dev` to your hosts file (on unix based system it is `/etc/hosts` file)
1. Create an empty folder db in your home (`~/db`), to save your mysql data
1. Clone mysql repo from [here](https://github.com/geshan/sample-mysql) maybe at `~/projects/mysql`
1. In `~/projects/mysql` run docker-compose up to run mysql, it will create [counter db, counts table with one row](https://github.com/geshan/sample-mysql/blob/master/init-dump/counter.sql).
1. Clone the sample counter app from [here](https://github.com/geshan/counter) to maybe `~/projects/counter`.
1. In `~/projects/counter` run `docker-compose up`
1. Then go to `http://counter.local.dev` on your browser you should see `Page visited 1 times`, refresh it, it should say `Page visited 2 times`

<img class="center" src="/images/generic/loading.gif" data-echo="/images/docker-compose-vhost/page-visited.png" title="All working you should see this" alt="All working you should see this">

Virtual host has been possible in above setup as we ran the nginx proxy and configured `VIRTUAL_HOST` and `VIRTUAL_PORT` parameters correctly
in the docker-compose.yml of the sample counter project. Mysql was already running before the project even started to run and it was `external_links`,
the IP of the mysql container was automatically added to the `/etc/hosts` of the counter project container which enabled us to use the host for mysql db
as [mysql](https://github.com/geshan/counter/blob/master/index.js#L4) in the connection config we passed to the mysql library.

Steps for running dependent services like nginx proxy, mysql can surely be automated for speed and efficiency.

## Takeaways

1. You can plan a step by step migration like first get your db/queue migrated from local install to docker then the app.
1. Use `external_links` for all the services like db/queue/redis/solr anything that needs to be shared among projects.
1. Use [nginx proxy](https://github.com/jwilder/nginx-proxy) to enable virtual host per project with two simple env variables `VIRTUAL_HOST` and `VIRTUAL_PORT` in the project's [docker-compose](https://github.com/geshan/counter/blob/master/docker-compose.yml#L8-L9) file. `VIRTUAL_PORT` is 8080 because application is [running](https://github.com/geshan/counter/blob/master/index.js#L27) on port 8080 and same port is exposed from the [dockerfile](https://github.com/geshan/counter/blob/master/Dockerfile#L10).
1. Run all your dependencies before hand and then run `docker-compose up` on your project(s). Dependencies can be run with `docker-compose up -d` to put it in the background. You can use `docker-compose -f logs` to follow logs and check if the service is running fine.
1. In this way, you can run multiple projects sharing the same db instance and each project can have its own virtual host.
 
> Hope you found this helpful. For more clarity, please read the [Dockerfile](https://github.com/geshan/counter/blob/master/Dockerfile), [docker-compose.yml](https://github.com/geshan/counter/blob/master/docker-compose.yml) and [index.js](https://github.com/geshan/counter/blob/master/index.js) of the sample counter project thoroughly.
