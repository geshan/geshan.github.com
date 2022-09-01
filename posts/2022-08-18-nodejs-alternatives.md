---
layout: post
title: 'Node.js alternatives: Exploring Deno and Bun (with code examples)'
date: 2022-08-18T23:25:32.000+11:00
comments: true
tags:
- Node.js
- Javascript
- Software Engineering
cover: "/images/nodejs-alternatives/01nodejs-alternatives.jpg"
pagetitle: 'Node.js alternatives: Exploring Deno and Bun (with code examples)'
description: Learn about 2 Node.js alternatives in JavaScript sphere, Deno and Bun
  with a simple code example.
keywords: node.js alternative, node.js alternatives, nodejs alternative, nodejs alternatives

---
Node.js is the defacto JavaScript runtime for the backend. In this post, you will learn about newer Node.js alternatives Deno and Bun with a simple Joke API code example and how to host it. Let's get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/nodejs-alternatives/01nodejs-alternatives.jpg" title="Node.js alternatives - Deno and Bun with simple code example" alt="Node.js alternatives - Deno and Bun with simple code example">

## Table of contents

* [Not comparing with other languages](#not-comparing-with-other-languages)
* [Node.js and its popularity](#node.js-and-its-popularity)
* [Deno - flips No-De on its head](#deno---flips-no-de-on-its-head)
* [Bun the Node.js alternative from the future](#bun-the-node.js-alternative-from-the-future)
* [Conclusion](#conclusion)


## Not comparing with other languages 

JavaScript is a peculiar language, it has its own share of quirks and issues. It is the only language that can be natively used for both backend and frontend software development. Desktop applications can be written in JavaScript with Electron. JavaScript is the language of the web that the browsers speak and Node.js was released in mid-2009, it has been exploited very well on the server side too in the past 13 years.

So, this post is not comparing Node.js with other languages like PHP, Python, Ruby, or dot net as Node.js alternatives as they are in a different league. For this piece, you will learn about other Node.js like JavaScript runtimes that are supposed to give Node.js a run for its money. 

As Bjarne Stroustrup, the creator of C++ said:

> There are only two kinds of languages, the ones people complain about and the ones nobody uses.

JavaScript surely falls in the first category and it is one of the [top programming languages](https://octoverse.github.com/#top-languages-over-the-years) on Github for 8 years now. Node.js when released was the only way to write JavaScript on the server but more than a decade later there are newer ways to do so. In the next part, you will learn about the popularity of Node.js and possible Node.js alternatives in the JavaScript sphere.


##  Node.js and its popularity

Node.js was released in mid-2009. It is an open-source and cross-platform JavaScript runtime environment that runs the V8 JavaScript engine (the core of Google Chrome) outside of the browser. This sauce makes Node.js very performant.

The magic of Node.js is in the event loop, the simplest definition of the event loop is it can push tasks in the background queue to be picked up later. A better way of explaining it is in this [video](https://youtube.com/watch?v=6MXRNXXgP_0).

Node.js has become very popular in the [past 10 years](https://trends.google.com/trends/explore?date=2012-01-05%202022-08-16&q=%2Fm%2F0bbxf89). It has become an in-demand technology for any kind of project, for instance you can create a Desktop app with [Electron](https://www.electronjs.org/). The slack app you might be familiar with is also an Electron app.

With its features like speed, performance, and scalability, creating [Node.js microservices](/blog/2020/11/nodejs-microservices/) is also a popular use case.

Let’s look at a simple Joke API built with Express (the most popular Node.js framework) to get a taste of what Node.js code looks like:

```js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({message: 'ok'});
});

app.get('/api/joke', (req, res) => {
  const JOKES = [
    "Why do Java developers often wear glasses? They can't C#.",
    "A SQL query walks into a bar, goes up to two tables and says “can I join you?”",
    "Wasn't hard to crack Forrest Gump's password. 1forrest1.",
    "I love pressing the F5 key. It's refreshing.",
    "Called IT support and a chap from Australia came to fix my network connection.  I asked “Do you come from a LAN down under?”",
    "There are 10 types of people in the world. Those who understand binary and those who don't.",
    "Why are assembly programmers often wet? They work below C level.",
    "My favourite computer based band is the Black IPs.",
    "What programme do you use to predict the music tastes of former US presidential candidates? An Al Gore Rhythm.",
    "An SEO expert walks into a bar, pub, inn, tavern, hostelry, public house.",
  ];
  const randomIndex = Math.floor(Math.random() * JOKES.length);
  const joke = JOKES[randomIndex];
  res.json({joke});
});

app.listen(port, () => {
  console.log(`Jokes API app listening on port ${port}`);
});
```

As seen above, creating a basic web server is very easy with Node.js. The above code sends a random joke among the 10 in the array for each new request. You can easily deploy the above app in one of the 3 [free Node.js hosting](/blog/2021/01/free-nodejs-hosting/) services.

The above code is in this [GitHub](https://github.com/geshan/nodejs-express-jokes-api) repository for your reference and you can view the running app on [Cyclic](https://nodejs-jokes-api.cyclic.app/api/joke). The code example is taken from Fresh framework's boilerplate.

With that code in mind, in the consequent section, you will learn about Deno as the first Node.js alternative in the JavaScript space.

## Deno - flips No-De on its head

Deno flips the word No-De. It is created by the same person who created Node.js - Ryan Dahl. As per [him](​​https://www.youtube.com/watch?v=HjdJzNoT_qg), it is the next generation of Node.js with a focus on security, speed, and other features in a single executable. 

As per the official [Deno](https://deno.land/) website:

> Deno is a simple, modern and secure runtime for JavaScript, TypeScript, and WebAssembly that uses V8 and is built in Rust.

It adopts the web platform's standards and is secure by default meaning no file, network, or environment access unless given explicitly. It also supports TypeScript out of the box without the need to use ts-node or other tools.

There are many companies “[interested](https://github.com/denoland/deno/wiki#companies-interested-in-deno)” in Deno and a few have put it in production like [Netlify Edge Functions](https://www.netlify.com/blog/announcing-serverless-compute-with-edge-functions/) are powered by Deno.

Not sure if it is the Bun js effect, Deno announced some [big changes](https://deno.com/blog/changes) ahead. The changes include the goal to become the fastest JavaScript runtime, allow to easily import NPM packages.

If you are interested in Deno and the Fresh framework, please do listen to this amazing [podcast](https://podrocket.logrocket.com/deno-and-fresh) where Luca Casonato talks about all things Deno and Fresh.

For a quick code example, you can look at the simple Joke API as part of the [Fresh](https://fresh.deno.dev/) framework built with Deno below:

```js
import { HandlerContext } from "$fresh/server.ts";

// Jokes courtesy of https://punsandoneliners.com/randomness/programmer-jokes/
const JOKES = [
  "Why do Java developers often wear glasses? They can't C#.",
  "A SQL query walks into a bar, goes up to two tables and says “can I join you?”",
  "Wasn't hard to crack Forrest Gump's password. 1forrest1.",
  "I love pressing the F5 key. It's refreshing.",
  "Called IT support and a chap from Australia came to fix my network connection.  I asked “Do you come from a LAN down under?”",
  "There are 10 types of people in the world. Those who understand binary and those who don't.",
  "Why are assembly programmers often wet? They work below C level.",
  "My favourite computer based band is the Black IPs.",
  "What programme do you use to predict the music tastes of former US presidential candidates? An Al Gore Rhythm.",
  "An SEO expert walks into a bar, pub, inn, tavern, hostelry, public house.",
];

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const randomIndex = Math.floor(Math.random() * JOKES.length);
  const body = JOKES[randomIndex];
  return new Response(body);
};
```

The code looks pretty easy to understand. It follows the web platform standards like Request and Response objects which makes it well suited for deploying on the edge. Speaking of which, deploying Deno Fresh with [Deno Deploy](https://deno.com/deploy) was a breeze. With 34 regions, zero maintenance, and support for Typescript, Wasm, and ES modules Deno Deploy is a great service. On top of that, you get 100K requests per day free with 100 GiB data transfer per month.

The [above file](https://github.com/geshan/deno-fresh/blob/master/routes/api/joke.ts) and the Fresh framework boilerplate are available in this [Github](https://github.com/geshan/deno-fresh) repository for your reference. You can view the running application on [Deno Deploy](https://geshan-deno-fresh.deno.dev/api/joke).

Having said that, as a Node.js alternative, Deno is not ready for primetime. It has been used in production by some. Still, all NPM modules don’t work with Deno. There is a list of [5k+ third-party modules](https://deno.land/x) but that is nothing compared to what Node.js has in NPM.

If you want to give Deno a try as a Node.js alternative please do so but with a general degree of caution. In the next section, you will learn about the newest all-in-one Javascript runtime `Bun`. 

## Bun the Node.js alternative from the future

[Bun](https://bun.sh) is the new kid on the block that is causing waves in JavaScript land. Created by Jarred Sumner, it was announced on [HackerNews](https://news.ycombinator.com/item?id=29179848) some 9 months back. Bun got much more attention like a month or so back and was dubbed the [Node.js killer](https://levelup.gitconnected.com/is-bun-js-the-node-js-killer-ffeb0f89196a) so an obvious Node.js alternative.

The official Bun website says:

> Bun is a fast all-in-one JavaScript runtime

Which is not very descriptive, so it also adds:

> Bundle, transpile, install and run JavaScript & TypeScript projects — all in Bun. Bun is a new JavaScript runtime with a native bundler, transpiler, task runner, and npm client built-in.

So it would be fair to say Bun is the real full stack JavaScript toolchain that has a bundler, transpiler, package manager (npm client), task runner, and everything in between. It is said to focus on 3 things, speed, new levels of performance, and being a great and complete tool.

It is written in [Zig](https://ziglang.org/) programming language and claims to run 60.24 queries per second for an SQLite app compared to 23.28 QPS for a Node 18 app with better-sqlite3. You can listen to Jarred about Zig, performance focus, and other things on this [podcast](https://podrocket.logrocket.com/bun) about Bun.

Let’s have a look at some Bun code for the above Joke API:

```js
export default {
  port: 8080,
  fetch(request) {
    console.log(`Requesting ${request.url}`);

    const JOKES = [
      "Why do Java developers often wear glasses? They can't C#.",
      "A SQL query walks into a bar, goes up to two tables and says “can I join you?”",
      "Wasn't hard to crack Forrest Gump's password. 1forrest1.",
      "I love pressing the F5 key. It's refreshing.",
      "Called IT support and a chap from Australia came to fix my network connection.  I asked “Do you come from a LAN down under?”",
      "There are 10 types of people in the world. Those who understand binary and those who don't.",
      "Why are assembly programmers often wet? They work below C level.",
      "My favourite computer based band is the Black IPs.",
      "What programme do you use to predict the music tastes of former US presidential candidates? An Al Gore Rhythm.",
      "An SEO expert walks into a bar, pub, inn, tavern, hostelry, public house.",
    ];
    const randomIndex = Math.floor(Math.random() * JOKES.length);
    const joke = JOKES[randomIndex];

    return new Response(joke);
  },
};
```

The code doesn’t look much different from Node.js or Deno and it also uses the Response object from the Web platforms standard. The code was not easy to get deployed, as there is no service that officially supports bun as of now. 
Thereby, it was wrapped into a container using the following `Dockerfile`:

```bash
FROM jarredsumner/bun:0.1.10

COPY http.js /app/http.js

EXPOSE 8080

CMD ["bun", "run", "/app/http.js"]
```

And then deployed to Google Cloud Run as a [serverless container](/blog/2019/11/why-use-google-cloud-run-5-compelling-reasons/). It was also difficult to build the Dockerfile when a `bun install` was run. It would hit the `qemu: uncaught target signal 4 (Illegal instruction) - core dumped` which I did not dig much to solve. You can view the code in this [GitHub](https://github.com/geshan/bun-try) repository. Bun has a new version on [Dockerhub](https://hub.docker.com/layers/bun/jarredsumner/bun/0.1.10/images/sha256-6086d9abf20da82398f7e20a2f7948e5f5c42096658314612f2afe47a72be74d?context=explore). Here is the Bun Jokes API running on Render with the above Dockerfile, you can [try it out](https://bun-http.onrender.com/joke).

Now as a Node.js alternative, Bun is also not ready to be used in production. It is great that bun has all the batteries included like a transpiler, package manager, bundler, and task runner but it is too early to bet.

Bun does make bold claims like `bun install` is 20x faster than `yarn` and `bun run` saves 160 ms on every run compared to `npm run`. There are lots of [not implemented](https://github.com/oven-sh/bun#not-implemented-yet) APIs Bun has to implement like WebSocket, Dates and timestamps, etc. You can play around with bun, for instance, compare `bun install` vs `npm install` or `yarn`, but as a Node.js alternative Bun still has lots of ground to cover to become a dominant force.

## Conclusion

You have learned about two new Node.js alternatives Deno and Bun. For the time being, both of them have a lot of ground to cover to really be as dominant as Node.js. 

> Deno looks very promising as a Node.js alternative but Bun though claiming to be super fast needs to work on more compatibility and also docker build issues. 

Happy Coding!
