---
layout: post
title: 5 important reasons to choose Node.js for your microservices
date: 2020-11-11T21:15:25.000+11:00
comments: true
tags:
- Software Engineering
- Node.js
cover: "/images/nodejs-microservices/01nodejs-microservices.jpg"
pagetitle: 5 potent reasons to choose Node.js for your microservices
description: There are multiple good reasons to build nodejs microservices, this 1800+
  words post discusses 5 of the important ones. Let's get started.
keywords: nodejs microservices, microservices in node js, microservices node js, node.js
  microservice, microservices with node js, microservices with node.js, microservices,
  nodejs, node.js, node.js microservices

---
There are multiple good reasons to build Node.js microservices, this post discusses 5 of the potent ones. Node.js and microservices are a match made in modern software engineering heaven. Let’s analyze further why Node.js microservices makes more sense.

<!-- more -->

<img class="center" loading="lazy" src="/images/nodejs-microservices/01nodejs-microservices.jpg" title="Microservices in Node.js" alt="Create noejs microservices">

## Table of contents

1.  [What is microservices architecture](#what-is-microservices-architecture)
2.  [What is Node.js](#what-is-node.js)
3.  [Node.js pros and cons](#node.js-pros-and-cons)
4.  [Why Node.js microservices?](#why-node.js-microservices%3F)
    1.  [Enables full-stack web development](#enables-full-stack-web-development)
    2.  [Built-in web server for Node.js Microservices](#built-in-web-server-for-node.js-microservices)
    3.  [Node.js Microservices elevate developer happiness](#node.js-microservices-elevate-developer-happiness)
    4.  [Node Js is fast and scalable](#node-js-is-fast-and-scalable)
    5.  [Battle-tested and used at the enterprise scale](#battle-tested-and-used-at-the-enterprise-scale)
5.  [Conclusion](#conclusion)

## What is microservices architecture

Martin fowler a visionary in this domain describes [microservices](https://martinfowler.com/articles/microservices.html) as:

> The microservice architectural style is an approach to developing a single application as a suite of small services, each running in its own process and communicating with lightweight mechanisms, often an HTTP resource API.

He further adds these services are built around business capabilities and independently deployable by fully automated deployment machinery. There is a bare minimum of centralized management of these services, which may be written in different programming languages and use different data storage technologies.

> From his definition, it is crystal clear that microservices need to be small and cater to only one slice of the business.

Technically, it should be independent to deploy in an automated way. Node.js fits very well with the requirements for the application to be small and performant. Time to examine what node is and what it can do for creating better microservices.

## What is Node.js

Mozilla developer portal describes [Node.js](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_nodejs/Introduction) as:

> Node (or more formally Node.js) is an open-source, cross-platform runtime environment that allows developers to create all kinds of server-side tools and applications in JavaScript. The runtime is intended for use outside of a browser context (i.e. running directly on a computer or server OS). As such, the environment omits browser-specific JavaScript APIs and adds support for more traditional OS APIs including HTTP and file system libraries.

From the above description, it is evident that Node.js is javascript but running in a different runtime than the browser. This runtime is the [V8 engine](https://v8.dev/). It is written in C++ and is used in Chrome too.
This is a solid sign of [Atwood’s law](https://en.wikipedia.org/wiki/Jeff_Atwood) that states:

> Any application that can be written in JavaScript, will eventually be written in JavaScript.

So Node.js enables us to write server-side applications in a [non-blocking](https://nodejs.org/en/docs/guides/blocking-vs-non-blocking/) way and in a single thread. You can read more about Node.js being single-threaded or not in this [piece](https://medium.com/better-programming/is-node-js-really-single-threaded-7ea59bcc8d64). Next, examine the pros and cons of Node.js and how it helps for Node.js microservices.

## Node.js pros and cons

As Bjarne Stroustrup (known for inventing C++) very well [said](https://www.goodreads.com/quotes/226225-there-are-only-two-kinds-of-languages-the-ones-people):

> There are only two kinds of languages: the ones people complain about and the ones nobody uses.

Without doubts, Node.js is also a language runtime that a lot of people use and complain about. Funny enough you can use C++ addons in [Node.js](https://nodejs.org/api/addons.html). The video below summarizes the history as well as pros and cons of Node.js in an unambiguous way:

<style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed/2gQG4cFjahw' frameborder='0' allowfullscreen></iframe></div>

It boils down to Node.js is fast, lightweight, performant, and scaleable. It also has lots of packages on npm. On the flip side, it is not great for CPU intensive programs due to blocking the event loop. Well, the video suggests “immature tools” but that can be said for most languages.

## Why Node.js microservices?

Node.js is very well suited for microservices.

From Node.js about [page](https://nodejs.org/en/about/):

> HTTP is a first-class citizen in Node.js, designed with streaming and low latency in mind. This makes Node.js well suited for the foundation of a web library or framework.
> It is great for decoupled applications as you can use lots of npm modules to sew up a great microservice. Node.js is fast and its event-based nature makes it a great choice even for real-time applications.

From a practical experience, we once re-wrote a service from PHP to Node.js and it was [70% faster](https://tech.namshi.io/blog/2017/05/28/rewriting-the-catalog-api/). It also used up fewer resources. Another example is [GoDaddy](https://blog.risingstack.com/node-js-examples-how-enterprises-use-node-in-2016/#godaddyditchednettoworkwithNode.js) moved from .net to Node.js and they loved it. Netflix improved its application [load time by 70%](https://thinkmobiles.com/blog/node-js-app-examples/). Let’s analyze more reasons to opt for Node.js for your next microservice:

### Enables full-stack web development

Node.js enables actual full-stack web development. The frontend without doubts needs to be in javascript. Of course, the choice of framework or library for the frontend can be a good discussion. With Node.js, the same javascript runs on the server too. If there are 5 developers in a team and all of them code javascript. It helps a lot for them to be full-stack.

> Yes, the developers should learn the [backend vs frontend](/blog/2020/02/difference-between-backend-frontend/) concepts but they don’t need to learn a completely new programming language.

Node.js has many other features and benefits. Unlike the frontend, the software engineer doesn't need to worry about cross-browser compatibility and browser versions while writing Node.js code for a [REST API](/blog/2020/11/nodejs-mysql-tutorial/). Node.js also doesn’t need the weight of transpilers like [Babel](https://babeljs.io/).

As [reported](http://highscalability.com/blog/2013/12/11/using-nodejs-paypal-doubles-rps-lowers-latency-with-fewer-de.html) at Paypal - `“Using JavaScript on both the front-end and the back-end removed an artificial boundary between the browser and server, allowing engineers to code both.”` So Node.js adoption does open new doors of full-stack web development.

### Built-in web server for Node.js Microservices

Node.js has a built-in [web server](https://nodejs.org/api/http.html#http_http_createserver_options_requestlistener). You don't have to wrangle with another Nginx or Apache. You can also happily say goodbye to things like [FPM](https://www.php.net/manual/en/install.fpm.php) as Node.js is essentially single-threaded. You might want to use [PM2](https://pm2.keymetrics.io/) to manage the process.

> Most likely you will not even need to deal with the HTTP library of Node.js. As it will be abstracted by the framework you use.

If you use [express js](https://expressjs.com/), it is super easy to have the webserver [up and running](https://expressjs.com/en/starter/hello-world.html).

Node.js also handles multiple requests and responses very easily. This also makes dockerizing a Node.js application a breeze. You just have one container that has the code and the webserver. You can have a look at this [Dockerfile](https://github.com/geshan/currency-api/blob/master/Dockerfile) as an example, it also utilized [Docker multi-stage builds](/blog/2019/11/how-to-use-docker-multi-stage-build/). Still, depending on the case you might want to put Nginx in front of Node.js.

### Node.js Microservices elevate developer happiness

Developer happiness is a subjective matter affected by [multiple factors](https://stackoverflow.blog/2020/02/27/the-eight-factors-of-happiness-for-developers/). The Node.js [user survey report of 2018](https://nodejs.org/en/user-survey-report/) states:

> Node.js is continuing to have a positive impact on users particularly around developer productivity and satisfaction; when asked to describe Node.js, respondents use mostly positive terms like – “fast”, “easy”, “awesome”, “powerful”, “flexible” and even “fun”.

In addition, a [report](https://jaxenter.com/dev-report-javascript-164201.html) from 2019 stated that there are 11.4 million javascript developers globally. It made javascript the language with the most developers in the world.

The Stackoverflow developer survey [points out](https://insights.stackoverflow.com/survey/2020#technology-programming-scripting-and-markup-languages):

> Unsurprisingly, for the eighth year in a row, JavaScript has maintained it's stronghold as the most commonly used programming language.

In the same survey, it puts Typescript (a superset of Javascript) as the second [most loved language](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages). Javascript is at no. 10 of the most loved language list. Javascript is good to work with. Like any other language, it has its own quirks, and getting used to it. Once you are comfortable with javascript and Node.js it is a pretty good language to work with. Which is a good thing for developer happiness.

> With the massive list of libraries at your disposal at [NPM](http://npmjs.com/) (the package manager for javascript), you can find many things you need already built and readily available.

On top of this developer’s happiness aspect, it will not be difficult to find a javascript or Node.js software engineer.

This speaks volumes about developer happiness in the Node.js ecosystem. It is also a key aspect for you to try Node.js for microservices.

> One personal experience I want to share is, how easy it is to upgrade even major version of Node.js.

Recently I upgraded a microservice from Node.js 8 to Node.js version 14. The upgrade was as smooth as butter with a reduction in response time bonus. I wished I could say that for PHP.  Deploying Node.js is also easy, if your application is dockerized it becomes even easier. You can learn about dockerizing your Node.js application in this step-by-step [tutorial](/blog/2020/11/nodejs-with-docker/). This surely elevates developer happiness while working in Node.js to new levels.

### Node Js is fast and scalable

Node.js is fast because of the non-blocking IO and [event loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/). With Node.js you can easily put things in the background which doesn’t come out of the box in languages like PHP. PHP for instance executes code sequentially.

> Where as in Noddejs you could get a request, respond that the task is scheduled and put the task in the background to be executed.

Node.js being event-based is a very good fit for microservices. With things like streams and real-time capabilities, choosing Node.js for your next microservice should be a no brainer.

Fast is another subjective term. Node.js is fast but compared against what. On the other hand, [software scalability](/blog/2020/12/software-scalability/) is a bit more objective. It can be measured in terms of response times and requests per second. Wallmart the world’s [125th website](https://www.alexa.com/siteinfo/walmart.com) in terms of traffic surely knows about high volumes and scalability. After a move to Node.js they [reportedly](https://blog.risingstack.com/how-enterprises-benefit-from-microservices-architectures/#walmartsuccessfullyrevitalizeditsfailingarchitecturewithmicroservices) survived 6 million page views per minute on a black Friday without downtime. That brings us to the next point, enterprise-ready.

### Battle-tested and used at the enterprise scale

There are many examples where Node.js has shined. Possibly many of them included Node.js microservices too. Having a quick look at [companies using Express](https://expressjs.com/en/resources/companies-using-express.html) you find big names like IBM and Accenture. Myntra is also on that list, which is currently the world’s top 659th website taking the traffic into account.

> LinkedIn tried Node.js in 2012, [reporting](http://highscalability.com/blog/2012/10/4/linkedin-moved-from-rails-to-node-27-servers-cut-and-up-to-2.html) 27 servers cut and responses 20x faster in some scenarios.

Similarly in [Paypal](http://highscalability.com/blog/2013/12/11/using-nodejs-paypal-doubles-rps-lowers-latency-with-fewer-de.html), there was a 35% decrease in the average response time for the same page with the use of Node.js. Netflix measured a [70% reduction](https://netflixtechblog.com/making-netflix-com-faster-f95d15f2e972) in startup time with the use of Node.js. Likewise, [Ebay](https://tech.ebayinc.com/engineering/how-we-built-ebays-first-node-js-application/) converted a Node.js Hackathon project into a production application due to scalability and resource usage.

The list goes on and on, [Spotify](https://blog.risingstack.com/how-enterprises-benefit-from-microservices-architectures/#spotifybuildsflawlessuserexperiencewithmicroservices) using Node.js microservices definitely proves the scale with 75 million active users.

> In addition, it also proves it can work in a large scale organization with 90 teams, 600 developers, and 5 development offices on 2 continents building the same product.

You can read more success stories in this [post](https://trio.dev/blog/companies-use-node-js). Node.js microservices are here to stay and they have been proven both battle-tested and working amazingly at enterprise scale.

## Conclusion

> Javascript might be [the most misunderstood language in the world](http://www.crockford.com/javascript/javascript.html) but with [best practices](https://github.com/goldbergyoni/nodebestpractices) in place Node.js is here for the long-term. It is ruling the enterprises as well as making the [startup](https://medium.com/@dreamtoipo/why-modern-day-startup-heroes-are-choosing-node-js-to-develop-their-application-34e5fcbefd10) developers happy.

Don’t hesitate to pick up Node.js for your next microservice, you might be in for a sweet surprise.