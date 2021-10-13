---
layout: post
title: How to use RabbitMQ and Node.js with Docker and Docker-compose
date: 2021-07-29T22:42:35.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
- NodeJs
- RabbitMQ
cover: "/images/rabbitmq-docker-nodejs/01rabbitmq-docker-nodejs.jpg"
pagetitle: How to use RabbitMQ and Node.js with Docker and Docker-compose
description: Learn how to use RabbitMQ with Node.js publisher and consumer, set up
  easily with Docker and Docker-compose step-by-step for better productivity.
keywords: rabbitmq docker, rabbitmq node.js, rabbitmq node, rabbitmq nodejs

---
Using RabbitMQ with Node.js to offload the things to process in the background is very useful. Adding Docker and docker-compose in that mix for local development makes setting up RabbitMQ and node.js a breeze. In this post, we will explore how to set up RabbitMQ and Node.js with docker and docker-compose using a dummy send email example, let's get rolling!

<img class="center" loading="lazy" src="/images/rabbitmq-docker-nodejs/01rabbitmq-docker-nodejs.jpg" title="Step by step tutorial on RabbitMQ with Node.js using Docker and Docker compose" alt="Step by step tutorial on RabbitMQ with Node.js using Docker and Docker compose">

<!-- more -->

## Table of contents

* [Why use async processing](#why-use-async-processing)
* [RabbitMQ quick introduction](#rabbitmq-quick-introduction)
* [Prerequisites](#prerequisites)
* [Run RabbitMQ with docker and docker-compose](#run-rabbitmq-with-docker-and-docker-compose)
* [Send Email example](#send-email-example)
* [Publish a message to RabbitMQ using Node.js](#publish-a-message-to-rabbitmq-using-node.js)
* [Consume messages with Node.js](#consume-messages-with-node.js)
* [Set up Docker and Docker compose for Node.js](#set-up-docker-and-docker-compose-for-node.js)
* [Test RabbitMQ with Node.js on Docker and docker-compose](#test-rabbitmq-with-nodejs-on-docker-and-docker-compose)
* [Conclusion](#conclusion)

## Why use async processing

Before going deeper into using RabbitQM with Node.js using Docker and Docker compose, let’s discuss why we need async processing first. Imagine this, you run an e-commerce store. As the customer has placed an order, there is a need to send an order confirmation email or SMS.

> Let’s say if the email service provider has a downtime of 2 minutes should the checkout process be blocked? The answer is no.

Similarly, if there are 10 orders in the same second, should the customer wait longer to see the order confirmation screen because the email service provider’s APIs are responding slow? Again a No.

These are typical examples where async processing or processing things in the background that don’t slow down and/or block the main operation is very useful. In the above example, the critical path is to be able to checkout, the e-commerce website can function without the email being sent but can’t earn if the order is not taken. All of these kinds of operations like sending an email, resizing a picture (which is resource-heavy too) can be set up as async tasks.

Pushing secondary tasks in the background also provides us with better [software scalability](/blog/2020/12/software-scalability/) and [software resilience](/blog/2020/12/software-resilience/).

> For async and/or later processing if tasks are pushed into a queue multiple workers can perform the task making it easy to scale horizontally. Along the same lines, if the task depends on a third party and if that service is down or slow it does not block the primary and critical operation. Which leads to more resilient software.

You can also listen to a [talk](/blog/2014/08/basic-overview-of-message-queues-rabbit/) I did in 2014 about RabbitMQ for more explanation on this topic. This takes us to use queues with message brokers for such tasks that can be done in the background.

## RabbitMQ quick introduction

[RabbitMQ](https://www.rabbitmq.com/) brands itself as the “most widely deployed and most popular open-source message broker”. It has other open-source and SAAS competitors like Amazon SQS and Google PubSub to name a couple.

> In plain English, RabbitMQ is a software written in Erlang based on Advanced Message Queuing Protocol (AMQP), that provides a way to manage messages using exchanges and routing keys to put them in the right queues to be consumed by consumers.

Currently, it is under [VMWare](https://www.vmware.com/au/company/acquisitions/rabbitmq.html). To further understand how exchanges, routing keys, and queues work in RabbitMQ please watch the video below:

{% youtube "deG25y_r6OY" %}

Next up, we will run RabbitMQ with Docker and docker-compose with its management console. It is good to know that on a production class system, it would be better to use a managed RabbitMQ like [CloudAMQP](https://www.cloudamqp.com/) or [Amazon MQ](https://aws.amazon.com/amazon-mq/). For the purpose of this tutorial, we will set up RabbitMQ with docker and docker-compose.

## Prerequisites

Below are some prerequisites before we delve deeper into commands and code:

1. Docker and docker-compose should be installed and running on your machine. I am using Docker version 20.10.2 and Docker-compose version 1.27.4 on a Mac.
2. Node.js should be installed and running locally or on a docker container. The latest LTS like Node.js 16 is preferred.
3. A general understanding of how Node.js and Docker work is expected.
4. Knowledge using npm commands is very helpful to follow this tutorial better.
5. Some basic knowledge of how message queues work will be helpful but not required.

Time to jump into the commands and some Node.js code now.

## Run RabbitMQ with docker and docker-compose

To run RabbitMQ with docker and docker-compose we will first start by creating a folder with:

```bash
mkdir nodejs-rabbitmq-docker
```

Then we will create a `docker-compose.yml` file with the following content:

```bash
version: "3.2"
services:
  rabbitmq:
    image: rabbitmq:3.8-management-alpine
    container_name: 'rabbitmq'
    ports:
        - 5673:5672
        - 15673:15672
    volumes:
        - ~/.docker-conf/rabbitmq/data/:/var/lib/rabbitmq/
        - ~/.docker-conf/rabbitmq/log/:/var/log/rabbitmq
    networks:
        - rabbitmq_nodejs
networks:
  rabbitmq_nodejs:
    driver: bridge
```

Let’s quickly see what the docker-compose file is doing. First, we specify a service called `rabbitmq` that uses an image from Dockerhub. The image is RabbitMQ 3.8 with management plugin alpine edition. Next, we name the container `rabbitmq`.

After that, we expose local port 5673 to container port 5672 and local port 15673 to container port 15672 respectively. RabbitMQ runs on port 5672 and the management console web UI runs on port number 15672 of the container, we are mapping it to different local ports just to keep it different.

Consequently, we map volumes so that our [durable queues](https://www.rabbitmq.com/queues.html#durability) and logs are not lost on container restart. Subsequently, we created a bridge network called `rabbitmq_nodejs` that we are going to use later when we publish and consume the message with some Node.js code.

To run the RabbitMQ instance locally with management console enabled, we will run:

```bash
docker-compose up
```

It will give us output similar to the below:

<img class="center" loading="lazy" src="/images/rabbitmq-docker-nodejs/02rabbitmq-docker.jpg" title="Run RabbitMQ with Docker and Docker compose" alt="Run RabbitMQ with Docker and Docker compose">

Please be aware that we are using the default configuration used by the official [RabbitMQ docker image](https://hub.docker.com/_/rabbitmq). This means it will use `guest`:`guest` for username and password including other default settings. To check if our RabbitMQ is running fine, it is best to hit `http://localhost:156763` on the browser of our choice. We should see a long screen like below:

<img class="center" loading="lazy" src="/images/rabbitmq-docker-nodejs/03rabbitmq-mgmt-login.jpg" title="RabbitMQ managemment running locally - login with guest:guest" alt="RabbitMQ managemment running locally - login with guest:guest">

If we provide the username `guest` with password `guest` and hit login, we will get into a screen like below which is the RabbitMQ management interface.

<img class="center" loading="lazy" src="/images/rabbitmq-docker-nodejs/04rabbitmq-mgmt-overview.jpg" title="RabbitMQ managemment overview running locally with docker and docker compose" alt="RabbitMQ managemment overview running locally with docker and docker compose">

As seen in the above video, this is the dashboard that gives us a way to configure RabbitMQ as well as see what's happening in the queues and the exchanges. We can click around and see there are some exchanges already set up out of the box but there are no queues.

For your reference, the above docker-compose file can be viewed in this [pull request](https://github.com/geshan/nodejs-rabbitmq-docker/pull/1) too. Next up, we will write a simple publisher that publishes a message to a queue with a [direct exchange](https://www.rabbitmq.com/tutorials/amqp-concepts.html#exchange-direct).

## Send Email example

We will be using a hypothetical example of sending emails and create a dummy [Work queue](https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html) scenario. A work queue is a simple queue where messages can be processed by multiple consumers and the consumers can be scaled up and down depending on the length of the queue.

> For instance, if the e-commerce website gets many orders between 7 PM and 9 PM then there may be 10 consumers to process the task to send emails. At wee hours of like 2 AM and 4 AM there might be just 1 consumer because the number of orders is very low at that time.

Next up, we will look at the Node.js code to publish the message to the RabbitMQ exchange with a routing key. Keep in mind, in a real-life scenario the publishing could be done by an application written in a different language.

## Publish a message to RabbitMQ using Node.js

To publish a message we will use the AMQP library from NPM. To set up a Node.js project and install the AMQP library we will run the following commands on the root of our folder which has the docker-compose file:

```bash
npm init -y
npm i --save amqplib
```

At this point, there should be After that we will create a file called `publisher.js` with the following contents:

```js
const amqplib = require('amqplib');
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';

(async () => {
  const connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
  const channel = await connection.createChannel();
  try {
    console.log('Publishing');
    const exchange = 'user.signed_up';
    const queue = 'user.sign_up_email';
    const routingKey = 'sign_up_email';
    
    await channel.assertExchange(exchange, 'direct', {durable: true});
    await channel.assertQueue(queue, {durable: true});
    await channel.bindQueue(queue, exchange, routingKey);
    
    const msg = {'id': Math.floor(Math.random() * 1000), 'email': 'user@domail.com', name: 'firstname lastname'};
    await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
    console.log('Message published');
  } catch(e) {
    console.error('Error in publishing message', e);
  } finally {
    console.info('Closing channel and connection if available');
    await channel.close();
    await connection.close();
    console.info('Channel and connection closed');
  }
  process.exit(0);
})();
```

Time to recap what the above code is doing. First, we get the `amqplib` library and define the `amqpUrl` which first tries to get it from the environment variable `AMQP_URL` if not found, it defaults to localhost port 5763. Next, we have an Immediately Invoked Function Expression (IIFE) which is async to support [await calls](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await). In this function, we get a connection to the RabbitMQ server and then create a channel for our communication.

After that, we make sure that the exchange exists and the queue exists too. We also specify that the queue is durable, which means the queue will remain intact if the RabbitMQ server restarts. If they don’t exist they will be created. Subsequently, we bind the exchange and the queue with the routing key. As our example is about emails, we are creating an exchange for user sign-up and a queue for user sign-up emails.

Consequently, we construct a simple JSON message with id, email, and name and then publish it to the exchange with the routing key. The exchange as seen in the above video takes care of putting the message in the right queue. In case of an error, we print it on the console and we have the “finally” part that executes all the time. It will close the channel and connection and at the end we have the process exit call to kill the publisher process.

The code for the publisher and related NPM files are available in this [pull request](https://github.com/geshan/nodejs-rabbitmq-docker/pull/2/files). Next up, we will add the code for the consumer which will process the message.

## Consume messages with Node.js

To consume the published message there can be multiple consumers. If there are multiple consumers, messages will be distributed with a round-robin algorithm. Below is the Node.js code for consuming RabbitMQ messages as consumer.js file:

```js
const amqplib = require('amqplib');
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5673';

async function processMessage(msg) {
  console.log(msg.content.toString(), 'Call email API here');
  //call your email service here to send the email
}

(async () => {
    const connection = await amqplib.connect(amqpUrl, "heartbeat=60");
    const channel = await connection.createChannel();
    channel.prefetch(10);
    const queue = 'user.sign_up_email';
    process.once('SIGINT', async () => { 
      console.log('got sigint, closing connection');
      await channel.close();
      await connection.close(); 
      process.exit(0);
    });

    await channel.assertQueue(queue, {durable: true});
    await channel.consume(queue, async (msg) => {
      console.log('processing messages');      
      await processMessage(msg);
      await channel.ack(msg);
    }, 
    {
      noAck: false,
      consumerTag: 'email_consumer'
    });
    console.log(" [*] Waiting for messages. To exit press CTRL+C");
})();
```

Let’s look at the code for this `consumer.js` file is doing. First, we are requiring the `amqplib` and defining the amqpUrl to connect to the RabbitMQ server. Then we have another IIFE that is async as well. Consequently, we set up a connection and a channel. This time we specify a [prefetch](https://www.cloudamqp.com/blog/how-to-optimize-the-rabbitmq-prefetch-count.html) count of 10, which tells how many messages are being pulled in by the consumer at the same time. Subsequently, we specify the queue to which the consumer will listen to which is `user.sign_up_email` in this example.

Next up, we have a listener that listens for any `SIGINT`. It is usually the `CTRL+C` behing hit on the keyboard or any other way the process is about to be killed. On `SIGINT` we do the housekeeping of closing the channel and connection before exiting the process.

After that, we make sure the queue exists and then start consuming the message when it arrives on the queue. Message processing is just a console.log for now. Reading the tutorial I wrote about [sending emails with Node.js and Sendgrid](https://blog.logrocket.com/how-to-send-emails-with-node-js-using-sendgrid/) would be helpful at this point. The other part we do is we `ack` the message which tells RabbitMQ that the message was successfully processed.

Another option is to [nack](https://www.rabbitmq.com/nack.html) the message which informs RabbitMQ that the message was not processed successfully and depending on the configuration it can be re-queued or sent to a [dead letter queue](https://www.rabbitmq.com/dlx.html).

The other code is self-explanatory. You can even try our [Node.js with docker](/blog/2020/11/nodejs-with-docker/) for an Express JS app. The consumer code is available in this [pull request](https://github.com/geshan/nodejs-rabbitmq-docker/pull/3/files). Consequently, we will run the Node.js code in a docker container.

## Set up Docker and Docker compose for Node.js

To set up a well-formed docker file that uses [multistage docker build](/blog/2019/11/how-to-use-docker-multi-stage-build/) utilizing the docker cache to make the [docker build fast](/blog/2020/10/docker-build-example-faster-docker-build/), we will use the following docker file:

```bash
FROM node:16-alpine as base
WORKDIR /src
COPY package*.json ./

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY ./*.js ./
CMD ["node", "consumer.js"]

FROM base as dev
RUN apk add --no-cache bash
RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

ENV NODE_ENV=development
RUN npm install
COPY ./*.js ./
CMD ["node", "consumer.js"]
```

We are using the latest Node.js LTS 16 with the alpine version as it is smaller than the options at around [38 MB](https://hub.docker.com/layers/node/library/node/16-alpine/images/sha256-7f50c56fc6adbc28be74bc416dae55fdf0f835bba87fb7b1ad08c7db807f0cb7?context=explore). Next, we set the `WORKDIR` to `/src` and then copy the package.json and package-lock.json file to the “workdir” `/src`.

Consequently, we start defining the “production” stage where we set `NODE_ENV` to production and run `npm ci` to get all the npm dependencies as defined in the lock file. To make better use of the docker build-cache, only after running the npm ci we copy all the `.js` files to the work dir. Then we put the `CMD` as “node consumer.js” to run the consumer in production.

After the production stage, we define the dev stage in the Dockerfile. Here it is different from the production one, we first install bash. After that, we pull in [wait-for-it](https://github.com/vishnubob/wait-for-it) bash script because we want to wait for the RabbitMQ server to be running before the consumer tries to connect to it. Subsequently, we make it executable with `chmod +x wait-for-it.sh`.

Next, we set the `NODE_ENV` to be “development” for this stage. Then we run `npm install` to get all the npm dependencies, if there were any dev dependencies like jest for testing it would have been pulled in too. Towards the end, we copy all the `js` files to `/src` and run the consumer.

After the docker file is put in place, we will make some changes to the docker-compose file to include this docker file. The new docker-compose.yml file should look like the below to incorporate the docker file that runs the consumer:

```bash
version: "3.2"
services:
  rabbitmq:
    image: rabbitmq:3.8-management-alpine
    container_name: 'rabbitmq'
    ports:
        - 5673:5672
        - 15673:15672
    volumes:
        - ~/.docker-conf/rabbitmq/data/:/var/lib/rabbitmq/
        - ~/.docker-conf/rabbitmq/log/:/var/log/rabbitmq
    networks:
        - rabbitmq_nodejs
  consumer:
    build:
      context: ./
      target: dev
    volumes:
      - .:/src
    depends_on:
      - "rabbitmq"
    command: sh -c '/bin/wait-for-it.sh rabbitmq:5672 --timeout=30 -- node consumer.js'
    environment:
      NODE_ENV: production
      AMQP_URL: amqp://guest:guest@rabbitmq:5672
    networks:
      - rabbitmq_nodejs
networks:
  rabbitmq_nodejs:
    driver: bridge
```

The main change here is, we define a new service called `consumer` which builds the Dockerfile we defined above with target `dev`. To keep things simple, we copy all the files from the current folder to `/src` which is the work dir on the container with volumes. Next, we define this node.js container `depends_on` the `rabbitmq` container. This will only define the [sequence of start up](https://docs.docker.com/compose/startup-order/) of the container but not wait for the dependent container to be running; that is where wait-for-it comes into play. We wait for a maximum of 30 seconds for the RabbitMQ server to be up before the consumer starts.

Subsequently, we sent some environment variables. The most important being `AMQP_URL` which tells the consumer which RabbitMQ server to connect to using the AMQP protocol. It maps to the right host and port as part of the [docker compose network](https://docs.docker.com/compose/networking/) with the correct credentials.

The changes for the docker-compose file and Dockerfile are available in this [pull request](https://github.com/geshan/nodejs-rabbitmq-docker/pull/4/files). In the following section, we will test that all this setup and code works as intended.

## Test RabbitMQ with Node.js on Docker and docker-compose

Now it is time to test that all the moving parts work as expected. To do this, we will first run:

```bash
docker-compose up
```

It will build the container for Node.js if it is not there and pull the RabbitMQ container too. It will start both the RabbitMQ docker container with the management plugin and the Node.js container that will run the consumer giving an output that looks like below:

<img class="center" loading="lazy" src="/images/rabbitmq-docker-nodejs/05rabbitmq-nodejs-consumer-running.jpg" title="Node.js consumer running with docker compose" alt="Node.js consumer running with docker compose">

A thing to notice here towards the end is that the consumer started after 23 seconds when the RabbitMQ server was ready:

<img class="center" loading="lazy" src="/images/rabbitmq-docker-nodejs/06rabbitmq-nodejs-consumer-waiting.jpg" title="Node.js consumer waiting for RabbitMQ to start with Docker compose" alt="Node.js consumer waiting for RabbitMQ to start with Docker compose">

If we login on to the RabbitMQ management console and see the Queues, we will see the `user.sign_up_email` queue and there will be a consumer waiting for messages as below:

<img class="center" loading="lazy" src="/images/rabbitmq-docker-nodejs/07nodejs-consumer-on-rabbitmq-mgmt.jpg" title="Node.js consumer visible on RabbitMQ mangaement UI" alt="Node.js consumer visible on RabbitMQ mangaement UI">

To test publishing some messages we will run the following command:

```bash
docker-compose exec consumer /bin/bash -c 'for ((i=1;i<=15;i++)); do node publisher.js; done'
```

The above command will publish 15 messages to the queue with a bash loop. These messages will be processed by the consumer running in the same container. The consumer logs you can follow by running `docker-compose logs -f consumer` will look something like below when the messages are publishing:

<img class="center" loading="lazy" src="/images/rabbitmq-docker-nodejs/08nodejs-consumer-processing-messages.jpg" title="Node.js consumer processing messages published by the publisher" alt="Node.js consumer processing messages published by the publisher">

While the messages are procssed by the consumers, the RabbitMQ management console screen for that queue will look like the below:

<img class="center" loading="lazy" src="/images/rabbitmq-docker-nodejs/09rabbitmq-messages-consumed.gif" title="Node.js consumer processing messages visible in RabbitMQ management console" alt="Node.js consumer processing messages visible in RabbitMQ management console">

There was a spike of 15 incoming messages and the green line in the graph shows that all of them were processed and sucessfully acked. Another thing visible on that screen is, there is only 1 consumer on the queue with a prefetch count of 10 as we set in the config.

We have successfully tested publishing and consuming messages on RabbitMQ with Node.js running on Docker and Docker Compose.

## Conclusion

In this step-by-step tutorial, we saw how to set up RabbitMQ with Docker and Docker Compose first. Then we added a publisher and consumer code with Node.js. After that, we put the Node.js code in a Docker container and plugged it into the existing docker-compose that already had the RabbitMQ container defined.

> In a more real-life application, the messages may be produced by a different service potentially written in a different language like PHP or Python. The message can be consumed by another service written in Node.js or GoLang.

As long as the messages are passed on using a standard notation like JSON, they should be easily produced and processed by the respective consumer. I hope this guide was useful to scratch the surface of RabbitMQ with Docker and publishing and consuming RabbitMQ messages with Node.js. Happy async processing!