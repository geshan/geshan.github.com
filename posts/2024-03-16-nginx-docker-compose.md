---
layout: post
title: "How to use Nginx with Docker Compose effectively with examples"
date: 2024-03-16T22:58:47.000+11:00
comments: true
tags:
- Software Engineering
- Docker
cover: "/images/nginx-docker-compose/01nginx-docker-compose.jpg"
pagetitle: "How to use Nginx with Docker Compose effectively with examples"
description: "Learn how to use nginx and docker compose proprely with a simple and multi-container example with reverse proxy setting"
keywords: nginx docker compose, docker compose ngins
---
Nginx, a free, open-source, high-performance web server and reverse proxy, has become a cornerstone of modern web applications. Its versatility, efficiency, and ability to handle high-traffic loads make it a popular choice among developers and organizations alike. In this post, you are going to learn how to use Niginx with Docker and Docker Compose with a simple example and another example that is closer to a real-life scenario, let’s get started!

<!-- more -->

<img class="center" src="/images/nginx-docker-compose/01nginx-docker-compose.jpg" title="How to use Nginx with Docker Compose effectively with examples" alt="How to use Nginx with Docker Compose effectively with examples">

## Table of contents

* [Nginx and Docker compose](#nginx-and-docker-compose)
* [Prerequisites](#prerequisites)
* [Nginx Docker Compose a simple example](#nginx-docker-compose-a-simple-example)
* [Multi-container example with Nginx and Docker compose](#multi-container-example-with-nginx-and-docker-compose)
    * [The components of Nginx Docker compose a multi-container setup](#the-components-of-nginx-docker-compose-a-multi-container-setup)
* [Conclusion](#conclusion)

## Nginx and Docker compose

On top of being a great web server, Nginx has other useful features too like [load balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/),  [content caching](​​https://docs.nginx.com/nginx/admin-guide/content-cache/content-caching/), and [mail proxy](https://docs.nginx.com/nginx/admin-guide/mail-proxy/mail-proxy/). You can even set up [JWT authentication](https://github.com/kjdev/nginx-auth-jwt) with Nginx. That speaks volumes about how versatile Nginx is.

In the realm of containerization, Docker has become the de facto standard for packaging and deploying applications. Docker Compose, a companion tool, simplifies the management of multi-container applications by allowing you to define and run them using a single YAML file.

When you combine Nginx with Docker Compose, you unlock a powerful and efficient way to deploy and manage web applications. Docker Compose streamlines the process of running multiple containers, including your Nginx web server and any backend services your application might rely on. You could potentially run multiple backend servers and route the traffic to them using Nginx in front of them as a [reverse proxy](https://www.cloudflare.com/en-gb/learning/cdn/glossary/reverse-proxy/).

In the next section, you will look at a simple example with Nginx and Docker compose to host a small brochure website with static files.

### Prerequisites

Before you embark on this journey, let's ensure you have the following prerequisites:

1. A basic understanding of Docker and Docker Compose: Familiarity with Docker commands like `docker build`, `docker run`, and `docker-compose up` is essential. If you're new to Docker, I recommend checking out the official Docker documentation or online tutorials to get up to speed. Also, you will need Docker running on your machine, the examples are based on Docker version 24.0.2 and Docker compose version 2.18.1.

2. General understanding of Nginx: Knowing how Nginx works and how it is configured will be greatly helpful.

3. Node.js and NPM installed: We'll be using a simple Node.js application as an example, so having Node.js and NPM (Node Package Manager) installed on your system is useful. 

4. Text editor or IDE: You'll need a text editor or IDE to create and edit the Dockerfile and docker-compose.yml files. I will be using VSCode.

In the next, section you will run a simple example to serve static files with Nginx and Docker Compose.

## Nginx Docker Compose a simple example

Let's begin with a straightforward example that illustrates how to use Nginx with Docker Compose to host static files. For this example, you want to create a brochure website for your imaginary Gen AI startup named Summrzer (a different variation for Summarizer). Your design skills could be better, so you get a responsive theme from HTML5up.net called [Steller](https://html5up.net/stellar). 

To get started you will first clone the ready-made repository where the files have been edited to look like a landing page of our imaginary start-up `Summrzer`. You can clone the repository with the following command:

```bash
git clone git@github.com:geshan/nginx-docker-compose.git
```

After that, you have to run the docker compose command pointing it to the `basic.yaml` file with the `up` parameter. Let’s look at that file first:

```bash
version: '3.8'
services:
  nginx:
    image: nginx:1-alpine
    ports:
      - 8089:80
    volumes:
      - ./html5up-stellar/:/usr/share/nginx/html
```

Let's break down this Docker compose file:

* **version:** Specifies the Docker Compose file format version, in this case, 3.8. 
* *services:** Defines the services that make up our application. In this case, it is only Nginx.
* *image:** Uses the `nginx:1-alpoine` image from Docker Hub. Which is the smaller Alpine version, not the default Debian one.
* **ports:** Maps the host's port 8089 to the container's port 80, allowing access to the web server running in the container from the host machine with `http://localhost:8089`
* **volumes:** You have mounted the local `./html5up-stellar` to `/usr/share/nginx/html` default document root fo Nignx.

This could have also been done with a Dockerfile but it is easier with this configuration and much easier to build as well as change any configuration.

Now, to run the simple version of the Nginx with the above Docker Compose config, you can execute the following command:

```bash
docker compose -f basic.yaml up
```

It will show the following output on the command line:

<img class="center" loading="lazy" src="/images/nginx-docker-compose/02nginx-docker-compose-simple.jpg" title="Running a simple Nginx Docker compose example with single container" alt="Running a simple Nginx Docker compose example with single container">

To check the running app, open your favorite browser and point the tab to `http://localhost:8089`, you will see something like the below:

<img class="center" loading="lazy" src="/images/nginx-docker-compose/03summrzer.jpg" title="Summarizer static site running a simple Nginx Docker compose example with single container" alt="Summarizer static site running a simple Nginx Docker compose example with single container">

Hurray! You have run a simple version of Nginx that can serve static files like HTML, JavaScirpt, CSS, and images. You can add more things to the configuration like [Cache-Control headers with Nginx](https://webdock.io/en/docs/webdock-control-panel/optimizing-performance/setting-cache-control-headers-common-content-types-nginx-and-apache), that can be a topic for another blog post.

You can stop the command by pressing `Ctrl+C`.  In the next part, you will learn how to run multiple containers with Nginx using a Docker compose configuration file.

## Multi-container example with Nginx and Docker compose

Now that you've seen a basic example, let's move on to a multi-container scenario. You will create a setup where Nginx serves static files for the root path `/` and acts as a reverse proxy for a Node.js API running on a different container for the `/api` path. To do this, the Docker compose file is already in the cloned repository at `./compose.yaml`, which looks like the below:

```bash
version: "3.8"
services:
  node:
    build:
      context: ./api
      target: dev
    volumes:
      - ./api/index.js:/src/index.js
  nginx:
    restart: always
    image: nginx:1-alpine
    ports:
      - 8089:80
    volumes:
      - ./html5up-stellar/:/var/www/html
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - node
```

The file looks similar to the above one, still, let’s discuss the newly added things:

* **Services**: In this configuration, there are two services `node` which runs a simple Node.js app, and Nginx which sits in front of the Node.js app as a reverse proxy. Nginx will forward all requests to the `/api` path to the Node.js app. The Node.js app is in the `../api` folder and has its own [Dockerfile](https://github.com/geshan/nginx-docker-compose/blob/master/api/Dockerfile). You can learn more about [Node.js with Docker](/blog/2020/11/nodejs-with-docker/) too.
* **Nginx Volumes:** There are two volumes this time, first one is similar to the above. The second one the key to this configuration which holds the definition of what the `/` and `/api` paths should do. You will know about this later.
* **Depends on**: Here it says that the Nginx service will be started after the Node.js service with depends on. You can read more about [Docker compose depends on](/blog/2024/02/docker-compose-depends-on/) and learn about it.

Next, you will learn about the components of this two-container setup.
 
### The components of Nginx Docker compose a multi-container setup

As discussed, there is a Node.js app that is a simple API with a single file that looks like the below:

```js
const express = require('express');
const app = express();
const port = 8181;

app.get('/', (req, res) => {
  res.send({message: 'alive'})
});

app.get('/summary', (req, res) => {
  res.send({
    source: 'https://en.wikipedia.org/wiki/HTTP',
    summary: `HTTP, or Hypertext Transfer Protocol, is an application layer protocol used in the World Wide Web to facilitate data communication. It's the foundation for exchanging information between web browsers and servers. The protocol's functions include requests, responses, methods, and headers. HTTP has evolved over time, with versions 1.0, 1.1, 2, and 3 currently in use. HTTPS, a secure version of HTTP, is widely used for increased security. HTTP is a fundamental protocol in web communication, providing a structured method for data transfer and enabling the functionality of the internet.`
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
```

It is a basic Express.js app that sends back a stock response which adds like a demo to the `Summrzer` start-up story.

A docker file has been added to serve this Node.js app that looks like the below:

```bash
FROM node:20-alpine as base

WORKDIR /src
COPY package.json package-lock.json /src/
EXPOSE 8181

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /src
CMD ["node", "index.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /src
CMD ["nodemon", "index.js"]
```

The other component is the Nginx container, which has a configuration loaded to it in addition to the static files. The Nginx configuration placed in `./nginx/default.conf` looks as follows:

```bash
server {
    location / {
        root /var/www/html;
    }

    location /api/ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_pass http://node:8181/;
    }
}
```

It is a simple configuration that says, if the user hits the `/` path serve the static files from `/var/www/html` this is where the `hmll5up-stellar` files are mounted in the Docker compose file. It can be made better with extra configs like cache headers which is out of the scope of this tutorial.

The second block is the interesting one, where requests to `/api/` will be routed to `localhost:8181` this is where the Node.js express app is running. This app is not accessible from the host machine as no ports are exposed for the `node` service in the above Docker compose file. It also sets additional proxy headers to ensure proper communication between Nginx and the Node.js application. It sends the Real IP to the node service, and the [X-Forwarded-For](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/) header is used to standardize sending the original IP. The `X-Forwarded-Proto` [header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto) essentially identifies HTTP/HTTPS traffic.

Proxy pass is saying to forward all requests to `/api` to the Node.js service running on port 8181.
To run this two container setup, you can execute the following command:

```bash
docker compose up
```

You will see an output like the below:

<img class="center" loading="lazy" src="/images/nginx-docker-compose/04nginx-docker-compose-multi.jpg" title="Running a complex Nginx Docker compose example with two containers" alt="Running a complex Nginx Docker compose example with two containers">

If you go to `http://localhost:8089` you will see a similar output of the modified stellar template as you did in the previous section. To check that the Node.js API is running properly you can go to `http://localhost:8089/ap/summaryi` on your favorite browser, it will yield something like:

<img class="center" loading="lazy" src="/images/nginx-docker-compose/05summrzer-api.jpg" title="Summarzer API running with Nginx and Docker compose with reverse proxy to a Node.js app" alt="Summarzer API running with Nginx and Docker compose with reverse proxy to a Node.js app">

There you have it, you have successfully run two examples with Nginx and Docker compose. The first one with Nginx only serves static files and the second one with Nginx serves both static files and acts as a reverse proxy for a simple Node.js app.

### Conclusion

Using Nginx with Docker Compose provides a powerful and efficient way to deploy and manage web applications. Docker Compose simplifies the process of running multiple containers, including your Nginx web server and any backend services your application might rely on. This combination offers advantages such as simplified configuration portability, scalability, and isolation.

Through the two examples presented in this post, you've learned how to use Nginx with Docker Compose to host static files and act as a reverse proxy for a Node.js API. These examples demonstrate the basic principles of using Nginx with Docker Compose, and you can build upon them to create more complex and sophisticated deployments with extra features like Caching and Load balancing.

By leveraging the power of Nginx and Docker Compose, you can streamline your web development workflow and deploy and manage your applications with ease and efficiency.
