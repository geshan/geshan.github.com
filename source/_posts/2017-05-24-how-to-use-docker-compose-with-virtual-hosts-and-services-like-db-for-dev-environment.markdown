---
layout: post
title: "How to use docker compose with virtual hosts and shared services (like db) for dev environment"
date: 2017-05-24 18:53:04 +0400
comments: true
categories:
- Docker
- Technology
- misc
---

Docker as been immensely popular in the past years. If you are not using docker at least in your dev environment in 2017. 
You are surely missing out on some great advantages. Your new software engineer should start writing production-ready code 
in a matter of hours not days. All thanks to docker.  Along the same lines, this post will cover how you can set up 
docker for your dev environment with least friction and maximum productivity. It is opinionated and we migrated to this `external_links`
approach so that we could run multiple projects/microservices that use the same db/services shared among them.

{% img center /images/docker-compose-vhost/docker-compose-vhost.jpg 'Docker compose with vhost and shared services' 'Docker compose with vhost and shared services' %}

<!-- more -->

##  Context

* This tutorial is generally agnostic of docker and docker-compose versions (I am using docker compose 1 syntax). I assume you have docker and docker-compose installed and know about them.
* It uses external images like Nginx proxy for virtual host per project. Mysql db as shared external service. It could also have been mongo or redis or even rabbit mq. Main point is to use it as `external_link` in the docker compose file, so that it can be shared among projects.
* It uses a demo app which emulates the page visit/hit counter popular decades back with [~30 liner Nodejs app](https://github.com/geshan/counter/blob/master/index.js) and Mysql db.
* I would like to keep the description as concise as possible and in steps to make it simple and clear.
* The goal is to grasp the concepts well and apply it to your current project. For example, you could start with replacing your local mysql install with a docker container.

## Steps
 
1. Run the Nginx proxy to enable virtual hosts with `$ docker run -d -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro jwilder/nginx-proxy`
1. Add `127.0.0.1 counter.local.dev` to your hosts file (on unix based system it is `/etc/hosts` file)
1. Create an empty folder db in your home (`~/db`), to save your mysql data
1. Clone mysql repo from [here](https://github.com/geshan/sample-mysql) may be at `~/projects/mysql`
1. In `~/projects/mysql` run docker-compose up to run mysql, it will create [counter db, counts table with one row](https://github.com/geshan/sample-mysql/blob/master/init-dump/counter.sql).
1. Clone the sample counter app from [here](https://github.com/geshan/counter) to may be `~/projects/counter`.
1. In `~/projects/counter` run `docker-compose up`
1. Then go to `http://counter.local.dev` on your browser you should see `Page visited 1 times`, refresh it, it should say `Page visited 2 times`

{% img center /images/docker-compose-vhost/page-visited.png 'All working you should see this' 'All working you should see this' %}

## Takeaways

1. You can plan a step by step migration like first get your db/queue migrated from local install to docker then the app.
1. Use `external_links` for all the services like db/queue/redis/solr anything that needs to be shared among projects.
1. Use [nginx proxy](https://github.com/jwilder/nginx-proxy) to enable virtual host per project with two simple env variables `VIRTUAL_HOST` and `VIRTUAL_PORT` in the project's [docker-compose](https://github.com/geshan/counter/blob/master/docker-compose.yml#L8-L9) file  
1. Run all your dependencies before hand and then run `docker-compose up` on your project(s). Dependencies can be run with `docker-compose up -d` to put it in the background.
1. In this way you can run multiple projects sharing the same db instance and each project can have it's own virtual host.
 
> Hope you found this helpful.
