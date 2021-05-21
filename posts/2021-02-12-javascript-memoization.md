---
layout: post
title: 'Javascript memoization: a practical example for better HTTP performance'
date: 2021-02-12T22:30:22.000+11:00
comments: true
tags:
- Web Development
- NodeJs
- Javascript
cover: "/images/javascript-memoization/01javascript-memoization.jpg"
pagetitle: 'Javascript memoization: a practical example for better HTTP performance'
description: In this 1400+ words post you will learn a practical example of Javascript
  memoization to cache response of a function for better response times. Not a simple
  factorial or Fibonacci example.
keywords: javascript memoization, javascript memoize, javascript memoize library

---
Memoization is simply caching the output of a function so that the consequent calls just use the cached result eliminating any heavy computation. Memoization in Javascript can also yield amazing performance benefits, given it is implemented properly. Do you want to make your javascript code run much faster? In this post, we will have a look at a practical example of javascript memoization. Spoiler alert: you will not see a Fibonacci or factorial mentioned below.

<img class="center" loading="lazy" src="/images/javascript-memoization/01javascript-memoization.jpg" title="Javascript memoization for speed, performance and profit" alt="Javascript memoization for speed, performance and profit">

<!-- more -->

## Table of contents

* [What is memoization](#what-is-memoization)
* [Not another factorial or Fibonacci example](#not-another-factorial-or-fibonacci-example)
* [Assumptions](#assumptions)
* [Practical example: Javascript memoization for a web response](#practical-example%3A-javascript-memoization-for-a-web-response)
  * [Response times before javascript memoization](#response-times-before-javascript-memoization)
  * [Response times after javascript memoization](#response-times-after-javascript-memoization)
* [Other considerations](#other-considerations)
* [Conclusion](#conclusion)

## What is memoization

An oversimplified definition of memoization is when you run an expensive function with parameters a and b, you will cache the result of that function. When the same expensive function is called with the same parameters a and b as the output is known and in the cache, the cached result is sent back.

[Wikipedia](https://en.wikipedia.org/wiki/Memoization) defines memoization as:

> In computing, memoization or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

It further adds: A memoized function "remembers" the results corresponding to some set of specific inputs. Subsequent calls with remembered inputs return the remembered result rather than recalculating it, thus eliminating the primary cost of a call with given parameters from all but the first call made to the function with those parameters.

Memoization is also useful for [software scalability](/blog/2020/12/software-scalability/).

## Not another factorial or Fibonacci example

To be honest, I am bored with the same Fibonacci and factorial examples to explain memoization. From Wikipedia to 8 out of the 10 results for a google search for “javascript memoization” will use either factorial or Fibonacci as the example. Yes, we used to do it in university to understand recursion may be. But day-to-day real-life coding I have not used something like a factorial or Fibonacci in the past 14 years.

If you still want to read some of those examples please read [these](https://flaviocopes.com/javascript-memoization/) posts. One on [FreeCodeCamp](https://www.freecodecamp.org/news/understanding-memoize-in-javascript-51d07d19430e/) even shows how to build your own memoize function. But we are not here to build one, we are here to use one in a more practical sense. We will see how in the next part.

## Assumptions

Before we jump into the code, below are some assumption we are making:

1. You are generally aware of how promises and async code work in Javascript
1. You have an understanding of how REST APIs work
1. You know who to write up a basic API with a programming language and a Relational DBMS  as a data store.

Let’s get cracking!

## Practical example: Javascript memoization for a web response

We will take an example Quotes API and memoize the response which is a promise using the [p-memoize](https://github.com/sindresorhus/p-memoize) library. Of course, there are other options, for instance, lodash.memoize, mem, and fast-memoize are some ultra [popular](https://www.npmtrends.com/p-memoize-vs-memoizee-vs-memoizejs-vs-fast-memoize-vs-memoize-one-vs-mem-vs-lodash.memoize) ones.

On a similar note, the most popular one is mem (at least in my comparison), and P-memoize is the promise/asysc version of `mem`. Both mem and p-memoize are developed by the same developer. 

As I have used p-memoize in the past I will stick with that one for this example. Our example currency converter API is [open source](https://github.com/geshan/nodejs-posgresql) and deployed on Heroku. Please read more on [free Node.js hosting](/blog/2021/01/free-nodejs-hosting/) if you are interested to host your Node.js app for $0 a month.

I have chosen Heroku because it is free and not serverless, so we will see a clear decrease in the response times after implementing memoization. Next, we will see how javascript memoization speeds up the response times.

### Response times before javascript memoization

Before we memorize the function let’s have a look at the code in `/routes/quotes.js` [file](https://github.com/geshan/nodejs-posgresql/blob/master/routes/quotes.js):

``` js
const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await quotes.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});
```

This is a simple Express.js route where we get the rows from `quotes.getMultiple`. In this case, it will run a [database query](https://github.com/geshan/nodejs-posgresql/blob/d51ef7298cba039130fe8bf98486ba32bf19ad7d/services/quotes.js#L7) on each call. Let’s have a quick look at the response times with this approach. We will run a simple load test with 2 requests per second for 30 seconds using [Vegeta load testing](/blog/2020/09/vegeta-load-testing-primer-with-examples/) tool. We can run a command as follow:

``` bash
echo "GET https://nodejs-postgresql-try.herokuapp.com/quotes" | vegeta attack -duration=30s -rate=50 -output=results-veg-no-mem.bin && cat results-veg-no-mem.bin | vegeta plot --title="Quotes API before memozie" > quotes-api-before-memoize.html
``` 

When the above Vegeta load test runs for 30 seconds, it will show us an output like below:

<img class="center" loading="lazy" src="/images/javascript-memoization/02before-javascript-memoization.jpg" title="50 RPS for 30 seconds before javascript memoization" alt="50 RPS for 30 seconds before javascript memoization">

As we can see, the fastest response we got was ~205 ms and the slowest one was 1.5 s. I deliberately did 50 requests per second. Those red dots are the 500 errors caused by the database connection issue.

The response times are pretty good after the first few requests as we use a [pool](https://github.com/geshan/nodejs-posgresql/blob/master/services/db.js#L13) of database connections.

### Response times after javascript memoization

Next we will use javascript memoization with p-memozie library to memorize the `getMultiple` function on the quotes service. The changes in the `routes/quotes.js` file after doing `npm i p-memoize` are as follows:

``` js
const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');
const pMemoize = require('p-memoize');
const ONE_MINUTE_IN_MS = 60000;
const memGetMultiple = pMemoize(quotes.getMultiple, {maxAge: ONE_MINUTE_IN_MS});

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await memGetMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});
```

Let’s analyze the things we changed here:

1. We have added the p-memoize library in line 4.
1. Next, we set a constant to be 60000 milliseconds equivalent to 1 minute, the cache lifetime of our javascript memoization cache done on the memory.
1. Consequently, we are memorizing the `quotes.getMultiple` function on line 6 using p-memoize
1. Later inside the get route we are using the memoized function not the original one.

We can refer to the change in this [pull request](https://github.com/geshan/nodejs-posgresql/pull/17) too.
When we run the same load test with 50 requests per second for 30 seconds with this change, it yields the following results:

``` bash
echo "GET https://nodejs-postgresql-try.herokuapp.com/quotes" | vegeta attack -duration=30s -rate=50 -output=results-veg-mem.bin && cat results-veg-mem.bin | vegeta plot --title="Quotes API after memozie" > quotes-api-after-memoize.html
```

It results in:

<img class="center" loading="lazy" src="/images/javascript-memoization/03after-javascript-memoization.jpg" title="50 RPS for 30 seconds after javascript memoization" alt="50 RPS for 30 seconds after javascript memoization">


Here compared to the above load test, the fastest response time we got was ~157ms and the slowest one (probably the first one) was 1.05 s. Overall we clearly see a cut of 50-75 milliseconds for each request from the previous test. Another advantage we have is that the database is getting hit just once for 1500 (30*50) requests in the span of just 30 seconds.

Similarly, the logs for this branch deployment is as follows:

<img class="center" loading="lazy" src="/images/javascript-memoization/04logs-after-javascript-memoization.jpg" title="Server logs after Javascipt Memoization - DB hit only once" alt="Server logs after Javascipt Memoization - DB hit only once">

As seen here, the first request hit the database rendering the log saying `Getting quotes from the db` then for the next one minute it would not hit the database. So all remaining 1499 requests in our load test got the memoized (cached) result for getting multiple quotes. The first two requests took ~320 ms and then after it took 0.5 ms to 2.4 ms, all thanks to memoization.

If we had run the tests locally the results would have been much faster after memoization as it will not need to use the internet. Local tests would also avoid any complexities like the [SSL handshake](https://www.cloudflare.com/en-gb/learning/ssl/what-happens-in-a-tls-handshake/). Anyway, I wanted to show a more practical and real-life example for javascript memoization as I was super bored with the factorial and Fibonacci examples. 

I used p-memoize but you can use any library I would suggest looking at fast-memoize or Memoizee. Fast-memoize also aims to be the “fastest possible memoization library in JavaScript that supports N arguments.”. Give that a spin.

## Other considerations

Depending on the library you are using, please be mindful of the following things:

1. When memoizing might just cache the first parameter giving unexpected results. For example, in P-memoize we need to [join](https://github.com/sindresorhus/mem#caching-strategy) the arguments if there are more than 1 arguments.
1. Not all languages support it, for instance, there would be no straightforward native way to memoize the return value of a function as all [PHP processes spin up and die](/blog/2020/11/nodejs-for-php-developers/#node.js-process-is-long-running%2C-unlike-php) per request. The same logic will apply for serverless functions.
1. It is pretty clear that only functions that return something can be memoized.[Void functions](https://www.cs.fsu.edu/~cop3014p/lectures/ch7/index.html) cannot be memoized.

In this example, we could also utilize the `Cache-Control` response [header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)  to cache the response on the browser. That would be the HTTP level caching option if you want to explore.

## Conclusion

Understand memoization a bit differently and use it more for practical purposes.

> Break the notion that you can use javascript memoization for just things like Factorial and Fibonacci and use it for any resource-heavy thing that can be cached like a GET request.

I hope you learned a bit more things about memoization and specifically memoization in javascript, keep learning!
