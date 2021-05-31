---
layout: post
title: How to use Node.js and Redis cache to speed up HTTP responses
date: 2021-05-31T23:42:35.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
- NodeJs
cover: "/images/nodejs-redis/01nodejs-redis.jpg"
pagetitle: How to use Node.js with Redis caching to speed up HTTP responses
description: Follow this step-by-step tutorial to add cache to an existing Node.js
  API for consistent and faster response times.
keywords: node.js redis, nodejs redis, node js redis, nodejs redis tutorial, redis
  node.js, redis node js

---
HTTP responses can be sped up with Node.js and Redis caching. In this post, we will see how we can do this by adding a Redis cache to an existing Node.js API that uses the Postgres database. Lets get cracking!

<img class="center" loading="lazy" src="/images/nodejs-redis/01nodejs-redis.jpg" title="Redis settings on redis labs" alt="Redis settings on redis labs">

<!-- more -->

## Table of contents

* [Prerequisites](#prerequisites)
* [Introduction](#introduction)
* [Add Redis to the Node.js Express Quotes API](#add-redis-to-the-node.js-express-quotes-api)
  * [Adding the Redis wrapper](#adding-the-redis-wrapper)
* [Add get quotes by author route](#add-get-quotes-by-author-route)
* [Add cache to get quotes by author](#add-cache-to-get-quotes-by-author)
* [How fast is the Node.js Redis cache?](#how-fast-is-the-node.js-redis-cache)
* [Some other things to consider](#some-other-things-to-consider)
* [Conclusion](#conclusion)

## Prerequisites

Before we dive into the demo application and its code, below are some of the things better to know:

1. You are aware of how Node.js and Express js works
1. You have an understanding of how HTTP generally functions
1. A basic understanding of how Redis works and its general commands are expected.
1. Having an understanding of Javascript callback, promise and Async await will be really helpful.
1. An account on Redis Lab will be required, you can get your [free account](https://redislabs.com/try-free/) with a 30 MB Redis.
1. You should read the [Node.js Postgres](/blog/2021/01/nodejs-postgresql-tutorial/) tutorial that explains how the quotes API is built

Given the prerequisites are done, let’s go to what we will be building.

## Introduction

We will use an existing quotes API application built with [Node.js and Postgres](/blog/2021/01/nodejs-postgresql-tutorial/) database. It has a simple endpoint `/quotes` that gets a list of quotes from the database and renders it as JSON. We will add a new endpoing and caching layer where we will cache the JSON on Redis hosted on Redis Labs. It is highly recommended you clone the [Quotes API](https://github.com/geshan/nodejs-posgresql) Github repository and start from the master branch to follow along.

We will be using a free Redis database on [RedisLabs](https://redislabs.com/), please get your $0 Redis up and running following this [guide](https://docs.redislabs.com/latest/rc/rc-quickstart/). From there get the Redis host, port, and password you can use later in this tutorial. For reference, I created a database with the following configuration.

<img class="center" loading="lazy" src="/images/nodejs-redis/02redis-lab-settings.jpg" title="Redis settings on redis labs" alt="Redis settings on redis labs">

## Add Redis to the Node.js Express Quotes API

To add Redis to the Node.js Express Quotes API, we will first add the `redis` npm library with:

```bash
npm install --save redis
```

In my case it installed the redis npm package version 3.1.2. Next up we will add a very slim Redis wrapper to talk to redis where the credentials will be placed in the `config.js` file under the `redis` attribute as follows:

```js
 redis: {
    host: env.REDIS_HOST || 'redis-12753.c253.us-central1-1.gce.cloud.redislabs.com',
    port: env.REDIS_PORT || 12753,
    password: env.REDIS_PASSWORD || 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
  },
```

I have put my credentials as an example, please replace it with your credentials you have got from the Redis Labs free account and database you set up in the previous step.

### Adding the Redis wrapper

We will add a new file called `cache.js` in `/services` folder that will fetch the saved data and save the JSON on redis with a Time To Live (TTL) of 60 seconds by default. It will have the following contents:

```js
const redis = require('redis');
const config = require('../config');
const client = redis.createClient({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password 
});

const { promisify } = require('util');
const setAsyncEx = promisify(client.setex).bind(client);
const getAsync = promisify(client.get).bind(client);

client.on('error', err => {
    console.log('Error ' + err);
});

async function saveWithTtl(key, value, ttlSeconds = 60) {
  return await setAsyncEx(key, ttlSeconds, JSON.stringify(value)); 
}

async function get(key) {
  const jsonString = await getAsync(key);

  if (jsonString) {
    return JSON.parse(jsonString);
  }
}

module.exports = {
  saveWithTtl,
  get
}
````

A quick rundown of what the above Redis wrapper is doing:

1. We import the Redis NPM package and the configs
1. Then we create a Redis client with the credentials of Redis on Redis Labs.
1. As the Redis NPM package does not support promises out of the box we use Promisfy to wrap the promise layer on top of the callbacks.
1. We have a saveWithTtl function that saves given data as JSON string to redis using the `setex` Redis [command](https://redis.io/commands/setex) to save it for the given seconds.
1. Similarly we define a get method that gets the value from Redis using the Get command and parses the string as JSON to be ready for the HTTP response.

Next up, we will add the Get quotes by the author at  `/quotes/author` route.

## Add get quotes by author route

We will add the `getByAuthor` method in the `/services/quotes.js` file for the search quote by author feature to come to life like below:

```js
async function getByAuthor(page = 1, author) {
  const offset = helper.getOffset(page, config.listPerPage);
  const query = {
    name: 'search-quotes',
    text: `SELECT id, quote, author FROM quote WHERE author ILIKE $1 OFFSET $2 LIMIT $3`,
    values: [`%${author}%`, offset, config.listPerPage],
  }

  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}
```

A couple of things we should take note of here are:

1. We are using a parameterized query with ILIKE for a case insensitive like which means searching for `Chris` or `chris` or `chRIS` would get us the same result.
1. We have kept the pagination intact if there are more than 10 quotes for the same author.

This data will be sent to the browser by the `/quotes/author/:author` route that we will create next.

To add the search quotes by author route to the Router we will change the `/routes/quotes.js` file to look like below:

```js
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

/* GET quotes listing search by author. */
router.get('/author/:author', async function(req, res, next) {
  try {
    const page = req.query.page || 1;
    const author = req.params.author;
    if (!author) {
      return res.status(400).json({message: 'please provide author'});
    }
    
    res.json(await quotes.getByAuthor(page, author));
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

/* POST quotes */
router.post('/', async function(req, res, next) {
  try {
    res.json(await quotes.create(req.body));
  } catch (err) {
    console.error(`Error while posting quotes `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = router;
```

The main change we made here is, we added the search quotes by author functionality. Let’s run a quick test with [vegeta load testing](/blog/2020/09/vegeta-load-testing-primer-with-examples/) on the response times with the Postgres database and no-cache from our local environment:

<img class="center" loading="lazy" src="/images/nodejs-redis/03nodejs-redis-before-cache.jpg" title="Node.js API response times before Redis cache" alt="Node.js API response times before Redis cache">

As we can see, for a total of 450 requests at 15 requests per second for 30 seconds, 445 came back with 200 response code and 5 had a 500 error. The error could have been caused by a connection limit exceeded for the database. The minimum response time was 192.96 ms and the maximum was 798.452 ms. Next up we will add the Redis cache to this newly created search by author endpoint.

The changes done till this point are visible in this [pull request](https://github.com/geshan/nodejs-posgresql/pull/19/files).

## Add cache to get quotes by author

To add a Redis cache for the response JSON, we will change the get `/quotes/author/:author` in `src/routes/quotes.js` to look like below after requiring the cache service we created in one of the previous steps:

```js
#on line 4
const cache = require('../services/cache');


/* GET quotes listing search. */
router.get('/author/:author', async function(req, res, next) {
  try {
    const page = req.query.page || 1;
    const author = req.params.author;
    if (!author) {
      return res.status(400).json({message: 'please provide author'});
    }
    
    const cacheKey = `quotes_author_${author}_${page}`;
    const cachedData = await cache.get(cacheKey);

    if (cachedData) {
      console.log('got cached data');
      return res.json(cachedData);
    }

    response = await quotes.getByAuthor(req.query.page, author);
    await cache.saveWithTtl(cacheKey, response, 300)

    res.json(response);
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});
```

1. We import the cache service we created in the previous step that communicates with the Redis database we have.
1. In the get quotes by author method, we first check if the quotes with its author and page number key like `quotes_chris_1` is in the cache, if it finds it in the cache it will respond with the cached response.
1. If the key’s data is not in the cache it will get the quotes by an author from the quotes service which queries the database and then it will respond back after saving the response to the cache.
1. On the consequent call it will find that data in the cache as the cache will be warm.

The first request will be a bit slow as it will have to fetch the quotes from the Postgres database. The second and subsequent requests will be faster as they will be served from the cache for the next 300 seconds. After the cache expires the first request to fill the cache will be slow but then it will be fast for the next 5 minutes. This cycle will continue.

The changes for adding cache to the get quotes by author route is accessible in this [diff](https://github.com/geshan/nodejs-posgresql/compare/search-with-cache?expand=1#diff-7f566e4529db12c9dd599189e409b786f5f5a356aaa73c5c8ade9071d7f9b601R30).

## How fast is the Node.js Redis cache?

After we add the cache if we hit the service locally again with 15 requests per second for 30 seconds it gave me the following result:

<img class="center" loading="lazy" src="/images/nodejs-redis/04nodejs-redis-after-cache.jpg" title="Node.js API response times consistent and faster Redis cache" alt="Node.js API response times consistent and faster after Redis cache">

This time the minimum time to respond was 192.445 ms and the maximum response time is 212.652 ms. There were no errors and all the requests came back with a 200. 

> The maximum response time for the API was almost 4 times faster with Reds cache at 212.652 ms compared to 798.452 ms using the Postgres database.

## Some other things to consider

Even though the cached version doesn’t look super fast there are some things we should take into account, those are:

1. This is a very simple example with just one table, real-life search and get resources of a REST API are much more complex involving more than one table, joins, and complicated SQL queries. In this case, the cache will be significantly faster.
1. Both Postgres and Redis are hosted remotely, not on the same machine as where the tests were run. Postgres is on ElephantSQL and Redis is on RedisLabs. This will add up the network latency to fetch data from both.
1. Postgres and Redis both are on the free plan. The resources are limited and shared so this gives us a basic idea of how the cache will help in performance.

As mentioned previously in the [Javascript memoization](/blog/2021/02/javascript-memoization/) post, the `Cache-Control` HTTP [header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) would be one of the easiest and language/framework agnostic way to cache the response at the HTTP level. This example is used to show a practical way to use Redis with Node.js.

## Conclusion

We have seen that a Redis cache used on a Node.js application can make the HTTP responses much more consistent in terms of speed. Not only does it make the responses faster, but it also decreases the error rates. Similarly, it will also use lesser resources as the processing is done once, then the processed output is stored on Redis.

I hope this acts as a good beginning resource for using Redis with Nodejs.