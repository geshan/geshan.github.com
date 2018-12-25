---
layout: post
title: "Getting started with Laravel, MariaDB (MySQL) and docker, docker compose"
date: 2015-10-24 11:49:48 +0400
comments: true
categories:
- Docker
- php
- Laravel
- Technology
- Misc
- DevOps
cover: /images/laravel-mysql-docker/laravel-mysql-docker.png
---

"How do I get new team members contributing code to the project in a matter of minutes/hours not days?" is a common question heard in development teams. There are some ways to do, in my opinion [docker](http://docker.com) is one of the best.

Docker enables using same software stack in development, staging and production. You don't need to worry about the version of PHP, MYSQL or any other dependency with Docker. This post will be about Laravel and MariaDB (MySQL) with Docker for local development. It will also feature use of docker-compose. We will use PHP 5.6 and MariaDB 10.1 with Laravel 5.1.

{% img center /images/laravel-mysql-docker/laravel-mysql-docker.png 'Getting started with Laravel, MariaDB (MySQL) and docker, docker compose' 'Getting started with Laravel, MariaDB (MySQL) and docker, docker compose' %}

<!-- more -->

## Prerequisites

* You are aware about docker and is basic usage. If you are new to docker check an [introduction screen-cast](http://bit.ly/1LsQ4X6)) or read this [Docker for PHP Developers](http://bit.ly/1FVjL0k) post
* You know about docker volumes and linking containers with docker-compose.
* You are running Laravel 5.x on your local machine with some PHP and MySQL setup. The setup can be local LEMP stack or XAMPP or something similar.
* You have docker and [docker compose](https://docs.docker.com/compose/install/) installed on your machine  
* You have stopped your Apache/Nginx service and MYSQL service. It will free port 80 and 3306. If
you are using vagrant and homestead then you can run Laravel without starting it.

## Software Versions used

I am running this example on Ubuntu 14.04.2 LTS.

* Docker : 1.7.1 ([Installation Instructions](https://docs.docker.com/installation/))
* Docker compose : 1.3.1 ([Installation Instructions](https://docs.docker.com/compose/install/))

## Why use docker?

The reasons to use docker are simiar to [vagrant](http://geshan.com.np/blog/2014/07/getting-started-with-php-lemp-on-vagrant/). There are some more compelling reasons to use docker and docker compose, some of them are:

### Quick setup of development environment

The developer/software engineer does not need to know which version of PHP or MySQL is in use. All s/he needs to do is `docker-compose up` and wait for the images to download (around 230 MB). After that add a entry to the /etc/hostsfile like `echo 127.0.0.1 project-name.dev >> /etc/hosts`. Then the project runs at `http://project-name.dev` on the browser.  

### No need to install software on local machine

With docker containers applications are self sufficient. There is no need to upgrade to the latest version of PHP or MySQL. The right version is already packaged inside the dockerfile and also in the container. There is no problem of one developer running PHP 5.5 and another one running PHP 5.6. All developers run the same container. You can install PHP to run composer and other scripts.

### Same software stack in all environments

Same docker container can be deployed to staging or production environments. The same software stack with correct software versions is used across environments. For example the problem of one developer using MySQL 5.6 and staging running MySQL 5.5 ends.

A [NGINX proxy](https://github.com/jwilder/nginx-proxy) can be used to make the virtual hosts dynamic. This post is about keeping things simple.

## Steps to running Laravel 5.x with MariaDB (MySQL) with docker

For this example I will use docker images with [Alpine Linux](https://hub.docker.com/_/alpine/) base images. Alpine image is just 5 MB which makes it the best candidate for docker base images. We will use PHP version 5.6 and MariaDB version 10.1. MariaDB is a drop in replacement of MySQL and for Alpine only MariaDb is available. The example git repo for this blog post is available on [github](https://github.com/geshan/laravel-mysql-docker).

### Install Laravel 5.1 on local machine

Run the following command:

```
composer create-project laravel/laravel --prefer-dist laravel-mysql-docker
```

I installed it on `~/Projects/misc/laravel-mysql-docker`

### Add larael-docker.dev to /etc/hosts

While it is downloading Laravel add `127.0.0.1 larave-docker.dev` to your `/etc/hosts` file. It can be
done quickly with the command below:

```
sudo echo '120.0.0.1 laravel-docker.dev' >> /etc/hosts
```

### Setup docker images with docker-compose

We will use [dydx/alpine-nginx-php-mariadb](https://github.com/dydx/alpine-nginx-php-mariadb) and modify it to suit our needs. It is a docker replacement for homestead. Both docker images are based on Alpine Linux which makes it small. Create the following `docker-compose.yml` file on root of the project:

```
front:
  image: dydx/alpine-nginx-phpfpm
  ports:
    - "80:80"
  volumes:
    - .:/var/www
    - docker/nginx/sites-enabled:/etc/nginx/sites-enabled
  links:
    - mysql:mysql

mysql:
  image: dydx/alpine-mariadb
  ports:
    - "3306:3306"
  volumes:
    - docker/db/data:/var/lib/mysql
```

* We are using dydx/alpine-nginx-phpfpm image named as front, it has PHP Nginx 1.8 and PHP-FPM.
* It uses supervisor to keep nginx and PHP-FPM running.
* We copy the all the files in current folder inside docker at `/var/www` to execute it.
* Other volumes are there to override the sites-enabled with virtual host and supervisor config to fix an error.
* The second definition is MySQL for which the data is saved in ./docker/db/data folder.
* The front container links the MySQL (MariaDB) container with the name `mysql`

### Create needed folders

In project root create the following folders:

```
./docker
./docker/db
./docker/nginx
./docker/nginx/sites-enabled
```

All MYSQL/MariaDB data that would generally be stored in `/var/lib/mysql` will be linked as volume from `./docker/db`.
This is done as docker containers don't have data persistence. This will keep the MySQL data persisted on the host machine which will be reused when the MySQL/MariaDB container is restarted. The folder structure should
be like below:

{% img center /images/laravel-mysql-docker/folder-structure.png 'Laravel, MariaDB (MySQL) and docker, docker compose folder structure' 'Laravel, MariaDB (MySQL) and docker, docker compose folder structure' %}

### Create default sites-enabled

Create a file named `default` on `./docker/nginx/sites-enabled` like below:

```
server {
  server_name laravel-docker.dev;
  root        /var/www/public;
  index       index.php;

  client_max_body_size 100M;
  fastcgi_read_timeout 1800;

  location / {
    try_files $uri $uri/ /index.php$query_string;
  }

  location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
    expires       max;
    log_not_found off;
    access_log    off;
  }

  location ~ \.php$ {
    try_files     $uri =404;
    include       fastcgi_params;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_pass  127.0.0.1:9000;
  }
}
```

### Run Docker compose up

Now give you are in the project root, you can run `docker-compose up` to build and run the containers.
Wait for the containers to download. You can do more customization if you create your own image and do a
docker-compose build to build the images.

After you run docker-compose up you will see output like below:

{% img center /images/laravel-mysql-docker/docker-compose-up.png 'Laravel, MariaDB (MySQL) and docker, docker compose up output' 'Laravel, MariaDB (MySQL) and docker, docker compose up output' %}

### Fix permissions

The containers are up still as the cache and logs are not writable it will hit a 500 Internal server
error. To fix this use the following command to relax the file permissions inside the container in a
new console tab.

```
docker exec -it laravelmysqldocker_front_1 chmod 0777 /var/www/storage -R
```
or it can be done locally too with the following command:

```
chmod 0777 /var/www/storage -R
```

If you want to run your artisan commands you can run them inside the front container. Hit the command below:

```
docker exec -it laravelmysqldocker_front_1 /bin/sh
```

You will get the shell of the front container then do `cd /var/www` and `php artisan` all your artisan commands are there.

### Access http://http://laravel-docker.dev

You should be able to load Laravel in the browser now navigating to `http://laravel-docker.dev`. Here you can see the Laravel 5 default page loading.

## MySQL Settings

You can check if MySQL/MariaDB is running by logging into MySQL locally with:

```
mysql -uhomestead -psecret homestead
```
This will connect to you local port 3306 and you can see that mysql is working. You can even use tools like
MySQL workbench to verify that MySQL is working fine.

From the container when you connect to MySQL the `DB_HOST` is not localhost anymore it should be `mysql` (as set in docker-compose.yml file) and you are all set to use MySQL. As an example have a look at the db part of .env file I used:

```
DB_HOST=mysql
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```
The easiest way to verify if Laravel is talking to MySQL/MariaDb correctly is just run the following command:

```
docker exec -it laravelmysqldocker_front_1 /bin/sh

## you will be inside the front container now

cd /var/www/

php artisan migrate
```

Then you will see some messages like below:

```
Migration table created successfully.
Migrated: 2014_10_12_000000_create_users_table
Migrated: 2014_10_12_100000_create_password_resets_table
```

Now run the following queries on MySQL/MariaDb via the cli client or some other client like MySQL Workbench.

```
use homestead;
describe users;
```

You will get an output like below:

{% img center /images/laravel-mysql-docker/users-table.png 'Laravel, MariaDB (MySQL) and docker, docker compose users table' 'Laravel, MariaDB (MySQL) and docker, docker compose users table' %}


### Stop docker containers

You have seen that docker is running from the containers. To stop your containers you should run:

```
docker-compose stop
```
on the project root and it will stop the containers like below:

{% img center /images/laravel-mysql-docker/docker-compose-stop.png 'Laravel, MariaDB (MySQL) and docker, docker compose stop output' 'Laravel, MariaDB (MySQL) and docker, docker compose stop output' %}

## Next Steps

You can carry on using the docker containers to replace your local Apache/Ngnix and MySQL. You can develop your Laravel applicaiton with ease using docker and docker compose.

## Conclusion

> You can use this analogy that containers are cattle and virtual machines (VMs) are pets.

Creating, deleting and reconstructing the containers should be easy, fast and seamless than VMs.
If you want to speed up your development flow and help other team members contribute faster to the project
opt for docker and docker-comopse. Happy Dockerizing and coding Laravel + PHP!
