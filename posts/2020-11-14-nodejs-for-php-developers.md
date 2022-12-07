---
layout: post
title: 'Node.js for PHP developers: 5 must-know pragmatic aspects with code examples'
date: 2020-11-14T23:15:25.000+11:00
comments: true
tags:
- Web Development
- Node.js
- PHP
cover: "/images/nodejs-for-php-developers/01nodejs-for-php-developers.jpg"
pagetitle: 'Node.js for PHP developers: 5 must-know practical aspects with code examples'
description: There are some important pragmatic aspects about Node.js which are ultra
  helpful for PHP developers. This 3000+ words guide lists 5 dominant ones with code
  examples.
keywords: node js for php, node js for php developers, nodejs for php, node.js for
  php, node js vs php, nodejs php, node.js vs php, php vs node js

---
While the popularity of Node.js is [increasing](https://trends.google.com/trends/explore?date=2019-11-12%202020-11-12&q=%2Fm%2F060kv,%2Fm%2F0bbxf89), PHP’s traction is going [down](https://i.ibb.co/0XjJCRC/W3Tech.png). With that context, this post is going to elaborate on 5 must-know practical aspects of using Node.js for PHP developers. These will be things no-one talks or writes about, time to get going.

<!-- more -->

<img class="center" loading="lazy" src="/images/nodejs-for-php-developers/01nodejs-for-php-developers.jpg" title="Node.js for PHP developers practical aspects" alt="Node.js for PHP developers practical aspects with code examples">

## Table of contents

1.  [Node.js for PHP developers (not Node.js vs PHP)](#node.js-for-php-developers-(not-node.js-vs-php))
2.  [Node.js for PHP developers the practical side](#node.js-for-php-developers-the-practical-side)
    1.  [Node.js code execution is async and non-sequential](#node.js-code-execution-is-async-and-non-sequential)
        1.  [Node.js promises possibilities](#node.js-promises-possibilities)
    2.  [Node.js process is long-running, unlike PHP](#node.js-process-is-long-running%2C-unlike-php)
        1.  [Memoization example](#memoization-example)
        2.  [Connection Pool example with MySQL](#connection-pool-example-with-mysql)
    3.  [Debugging is easier in Node.js than in PHP](#debugging-is-easier-in-node.js-than-in-php)
    4.  [Major version upgrades in Node.js is seamless over PHP](#major-version-upgrades-in-node.js-is-seamless-over-php)
    5.  [Dockerizing a Node.js application is a breeze compared to PHP](#dockerizing-a-node.js-application-is-a-breeze-compared-to-php)
3.  [Conclusion](#conclusion)

## Node.js for PHP developers (not Node.js vs PHP)

This piece is a list of things you as a PHP developer must know and learn to use Node.js effectively. On the contrary, this post is not a Node.js vs PHP write up where PHP is bashed. I have used both languages. I started to write more Node.js in 2016. When I started I faced some difficulties as I was used to PHP at work for more than 7 years prior to that. There was a book released towards 2012 end covering [Node.js for PHP developers](https://www.oreilly.com/library/view/nodejs-for-php/9781449333775/).

This blog post is not going to talk about what PHP or Node.js is, you can read about it in other [posts](https://www.freecodecamp.org/news/what-exactly-is-node-js-ae36e97449f5/). I will also not talk much about the [Non-Blocking I/O](https://blog.cloudboost.io/why-is-node-called-a-non-blocking-i-o-model-eb639063bc14) or the [event loop](https://blog.logrocket.com/a-complete-guide-to-the-node-js-event-loop/). Still, some of it will be brushed through when discussing the practical aspects of writing good Node.js code.

## Node.js for PHP developers the practical side

PHP has been alive since 1995 and reportedly is still used by [79.%](https://w3techs.com/technologies/history_overview/programming_language/ms/q) of the websites monitored by W3tech (I can’t really say if it the whole internet). So chances are very high that you have used PHP or deployed something written in PHP. For instance with a growing [trend](https://w3techs.com/technologies/details/cm-wordpress):

> WordPress is used by 63.7% of all the websites whose content management system we know. This is 39.0% of all websites monitored by W3Tech.

On the other hand, Node.js was released in 2009. Major tech companies like Linked In and Paypal started adopting it by [2011](https://engineering.linkedin.com/42/and-running-nodejs-tech-talk-tom-hughes-croucher) to [2013](https://medium.com/paypal-engineering/node-js-at-paypal-4e2d1d08ce4f) for various reasons like [microservices](/blog/2020/11/nodejs-microservices/). As per Stack Overflow developer survey of [2020](https://insights.stackoverflow.com/survey/2020#technology-other-frameworks-libraries-and-tools):


> For the second year in a row, Node.js takes the top spot, as it is used by half of the respondents.

It is not a secret that Node.js is getting very popular in the past [5 years](https://trends.google.com/trends/explore?date=2015-11-12%202020-11-13&q=%2Fm%2F0bbxf89).

So as a PHP developer, these are 5 must-know practical things to be a great Node.js software engineer. Node.js for PHP developers is similar in some sense but also different in some other aspects some are described below:

### Node.js code execution is async and non-sequential

This is a behavior that tricks lots of PHP developers. In PHP the code runs in sequence, at first line 1 then 2, and so forth. In Javascript and particularly in Node.js that may not be the case. You can potentially put things in the background with good use of promises and callbacks.

Below is a modified code example with an explanation taken from my open source [currency-api](https://github.com/geshan/currency-api/blob/master/src/exchangeRates.js#L7-L43) repo: 

``` js/2
async function getExternal(fromCurrency, toCurrency, onDate) {
  const rate = await getRate(fromCurrency, toCurrency, onDate);
  db.query(
    `INSERT INTO exchange_rates (from_currency, to_currency, rate, on_date) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE rate = ?`,
    [fromCurrency, toCurrency, rate, onDate, rate]
  ).then(result => {
      if (result.affectedRows === 0) {
        console.error(`Exchange rate of ${rate} for ${fromCurrency} to ${toCurrency} on ${onDate} could not be saved`);
      }
  }).catch(err => {
      console.log(`Error while writing to db: `, err);
  }); //this is done async for the API to respond faster

  console.log(`Fetched exchange rate of ${rate} for ${fromCurrency} to ${toCurrency} of ${onDate} from the API`);
  return { fromCurrency, toCurrency, onDate, rate };
}

```

If you look closer, that innocent looking `db.query` at line 3, has been pushed in the background. So it will execute like below:

1. Get rate
1. Run insert query in the background
1. While the insert is running the function are already returned the rate
1. If there is an issue in the insert query it is logged in the catch

There is no out of the box way to do something like this in PHP. This is the first thing that stumps PHP developers. It makes it harder to understand Node.js for PHP developers. This asynchronous code execution behavior also makes finding the right stack trace harder in case of errors in Node.js.

To be honest, in 2020 you can easily use [async await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await).  Even though it is syntactic sugar on Promises, it does make asynchronous programming a hell lot easier. When I started in the Node 4/6 era around 2016 with callbacks and [Promises](https://blog.greenroots.info/javascript-promises-explain-like-i-am-five) it was a different ball game altogether. Still, beware when to not use async-await (like above) and just go with promises, then and catch. Don’t get tangled in [promise hell](https://medium.com/@pyrolistical/how-to-get-out-of-promise-hell-8c20e0ab0513) in the process though. Promise hell is like the next iteration of the [callback hell](http://callbackhell.com/).

> Pro tip: To know which ES6 features you can use with what version of Node.js, check it out at [node.green](https://node.green/).

Another Pro Tip:

> Even Node.js versions are [LTS](https://nodejs.org/en/about/releases/), odd ones are not. So use Node 16 or 18 not 15 or 17 in production.

Going a bit deeper into non-sequential execution, promises and the power it has plays an important role here. The ability to do concurrent things is great in Node.js and javascript in general.

#### Node.js promises possibilities

Promises being [asynchronous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises), you can run them concurrently. There are ways to do it. You could race 3 promises and get the results from the fastest one. You can even do [promise.all](/blog/2022/07/javascript-promise-all/) where if one promise is rejected, it stops the whole operation. Please read more about `Promise.race`, `promise.all` and `promise.any` in this [great comparison](https://sung.codes/blog/2019/05/18/promise-race-vs-promise-any-and-promise-all-vs-promise-allsettled/).

With that in mind, you can try other NPM libraries to [limit](https://github.com/sindresorhus/p-limit) promise concurrency or even [filter](https://github.com/sindresorhus/p-filter) through promises concurrently. You can do some of it with [ReactPHP](https://reactphp.org/). But it is not included in the native PHP, not even in [PHP 8](https://stitcher.io/blog/new-in-php-8). This is something new to wrap your head around in Node.js for PHP developers.

Let’s proceed to the next point, the process does not need to die in Node.js like in PHP.

### Node.js process is long-running, unlike PHP

[PHP is meant to die](https://software-gunslinger.tumblr.com/post/47131406821/php-is-meant-to-die) not in the sense that it will not be used. In the sense that all PHP processes must die. PHP is not really designed for long-running tasks/processes. In PHP when a new HTTP request comes in the processing start, after sending the response back the process is killed. That’s how PHP works. That creates the need for [FPM](https://www.php.net/manual/en/install.fpm.php) and other servers. You can argue PHP was [serverless](https://medium.com/@keithwhor/rise-of-functions-as-a-service-how-php-set-the-serverless-stage-20-years-ago-ccb560c5f422) by design 20+ years ago. I leave that up to you.

On the other side, Node.js is a long-running process. This enables you to share information between requests as the same server/process is handling multiple requests. With a long-running process, you can easily exploit things like [memoization on memory](https://codeburst.io/understanding-memoization-in-3-minutes-2e58daf33a19) and [connection pooling](https://riptutorial.com/node-js/example/4587/using-a-connection-pool) for a database. It opens up other possibilities like counting the no. of concurrent requests on that process for instance.

#### Memoization example

If you don’t know [Memoization](https://lispcast.com/what-is-memoization/).

> Memoization is a higher-order function that caches another function. It can turn some slow functions into fast ones. It saves the result of a function call after the first time to the cache, so if you call the function again with the same arguments, it will find it in the cache.

It can be used in Node.js but not in PHP natively. Some workaround is possible in PHP like saving the function return value in Redis. 

Below is a code sample of memoization on a express route with [p-memoize](https://github.com/sindresorhus/p-memoize):

``` js
const ONE_MINUTE_IN_MS = 60000;
const options = {
  maxAge: ONE_MINUTE_IN_MS,
  cacheKey: (arguments_) => arguments_.join(','),
};

app.get('/api/products', async (req, res, next) => {
  try {
    const memGetProducts = pMemoize(products.getMultiple, options);
    res.json(await memGetProducts(req.query.page || 1, req.query.search));
  } catch (err) {
    next(err);
  }
});

```
The clear advantage of this is less load on the datastore. For 1 minute, it will respond back with the same response for the same parameters. The output of the function `products.getMultiple` is cached in memory for a minute. This makes the responses very fast. It is advisable to read more on [javascript memoization](/blog/2021/02/javascript-memoization/).

#### Connection Pool example with MySQL

Another thing that is not possible because of a dying process in PHP is connection pooling. As per [Wikipedia](https://en.wikipedia.org/wiki/Connection_pool): 

> In software engineering, a connection pool is a cache of database connections maintained so that the connections can be reused when future requests to the database are required. Connection pools are used to enhance the performance of executing commands on a database.

So, you will have 5 connections in a pool and if you want to run 5 queries to the database it can be done concurrently. This saves time for both connecting to the database as well as running the query. This is easy to do in Node.js but not easily possible in PHP.

> Be mindful of the number of available connections and to keep your connection pool size optimal. 

For instance, if you are using Kubernetes and your application has 5 pods with a connection pool size of 2. That means your database will always have 10 open connections even though there are no queries being executed.

Time for a connection pool example with MySQL database with [MySQL](https://github.com/mysqljs/mysql#pooling-connections) npm module:

``` js
var pool  = mysql.createPool({
  connectionLimit : 5,
  host            : 'example.org',
  user            : 'app',
  password        : 'pass',
  database        : 'schema'
});

for(var i=0;i<5;i++){
  pool.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) { 
      throw err;
    }
    console.log(rows[0].solution); //Shows 2
  });
}
```

The above code will run the same query 5 times in parallel with 5 MySQL connections taken from the connection pool. I wished I could do this in PHP out of the box.

In my experience, Node.js works very well with Mysql. If you want to try connection pooling with Mongo DB, here is a [Mongo](https://www.compose.com/articles/connection-pooling-with-mongodb/) example.

> With a long-running process as a developer you need to be more careful about memory leaks and doing the housekeeping stuff well.

This is where Node.js for PHP developers need a fair bit of shift in thinking about how the code is executed. On the other hand, this is a great advantage in Node.js for PHP developers.

### Debugging is easier in Node.js than in PHP

Line by line code debugging is an important part of developer experience for any programming language. To debug PHP code, you can use add ons like [X-Debug](https://xdebug.org/) with some IDE settings. X-Debug is challenging to set up, to say the least. You have to [install](https://xdebug.org/docs/install) it, enable the extension. After that configure it properly with an IDE like [PHPStorm](https://www.jetbrains.com/help/phpstorm/configuring-xdebug.html).

> Basically, easy is the last thing you will say about making X-debug run. Unless it is all configured well with a docker container and IDE settings are also easy to load.

On the other hand, running node [native debugger](https://nodejs.org/api/debugger.html) or even [ndb](/blog/2019/01/getting-started-with-debugging-nodejs-applications-with-ndb/) is a lot easier compared to PHP and X-debug. With the use of  VS Code, [debugging Node.js application](https://itnext.io/the-absolute-easiest-way-to-debug-node-js-with-vscode-2e02ef5b1bad) is so easy that even a caveman can do it.

> Open up Preferences > Settings and in the search box type in “node debug”. Under the Extensions tab, there should be one extension titled “Node debug”. From here, click the first box: Debug > Node: Auto Attach and set the drop-down to “on”. You’re almost ready to go now. Yes, it really is that easy.

Then set some breakpoints on VS code with say `index.js` and in the terminal type `node --inspect index.js`.

BOOM! Your step by step Node.js debugger is running well on the VS Code editor without much effort. A good difference from PHP, there is no need to install a different extension, enable it, and configure it to be able to debug a program. No need to install an extra extension is a benefit found in Node.js for PHP developers.

The next point is also about better developer experience while upgrading even multiple major versions of the language.

### Major version upgrades in Node.js is seamless over PHP

Jumping even multiple major versions in Node.js is a seamless experience. Upgrading from PHP 5.x to PHP 7.x is a week to month-long process depending on the size and complexity of the project.

In my personal experience, I have upgraded Node.js microservices from versions 0.12 to 4 in the past. Recently I upgraded an application from Node.js 10 to 14. All of my Node.js major version upgrades have been easy. 

<img class="center" loading="lazy" src="/images/nodejs-for-php-developers/02node-10-to-14.jpg" title="Upgrading node 10 to 14 is easy" alt="Node.js for PHP developers, upgrading Node.js from version 10 to 14 is seamless" style="min-height: 100px;">

Some minor package.json changes were the only small issues I encountered. After deployment, there were rarely any issues related to code compatibility. As an added bonus, the performance was usually better upgrading the major versions.

On the other hand, upgrading PHP has not been easy. Minor version upgrade for an application from PHP 5.4 to 5.6 was not much cumbersome. But, going from PHP 5.6 to 7.2 for a relatively big application was a pain. It took a long time, and needed multiple composer.json changes. It was also a difficult task to test it. The good side of a major version upgrade in PHP was surely the performance boost.

> Just a note here, the PHP applications I worked with were older than the Node.js applications. Your experience can surely be different than mine.

### Dockerizing a Node.js application is a breeze compared to PHP

Docker’s popularity has been steadily rising in the past [5 years](https://trends.google.com/trends/explore?date=2015-02-11%202020-11-14&q=%2Fm%2F0wkcjgj). It has changed [how we software engineers work](/blog/2018/11/4-ways-docker-changed-the-way-software-engineers-work-in-past-half-decade/) since its release. You should use [Docker for local development](/blog/2018/10/why-use-docker-3-reasons-from-a-development-perspective/) too. With that in mind, Dockerizing a PHP application can be a difficult task depending on how components are laid out and the complexity of the application. Conversely, for dockerizing a Node.js application the effort is less and the process is a breeze.

Below is an example of a [dockerfile](https://github.com/geshan/laravel6-on-google-cloud-run/blob/master/Dockerfile) for a PHP Laravel app with Apache.

``` bash
FROM composer:1.9.0 as build
WORKDIR /app
COPY . /app
RUN composer global require hirak/prestissimo && composer install

FROM php:7.3-apache-stretch
RUN docker-php-ext-install pdo pdo_mysql

EXPOSE 8080
COPY --from=build /app /var/www/
COPY docker/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY .env.example /var/www/.env
RUN chmod 777 -R /var/www/storage/ && \
    echo "Listen 8080" >> /etc/apache2/ports.conf && \
    chown -R www-data:www-data /var/www/ && \
    a2enmod rewrite
```

The good thing with this Docker image for Laravel is PHP is bundled with apache in the same image. It can be argued if this is a better way to do it than splitting PHP and Apache into two docker images.

Also notice the [multi-stage docker build](/blog/2019/11/how-to-use-docker-multi-stage-build/) in the above docker image. Composer install is done in a different image and output is copied to the main one. If we had used PHP-FPM and Nginx in different docker images, it would have been more complex. There would be a need to manage two distinct docker images.

Now it's time to have a look at a Node.js [Dockerfile](https://github.com/geshan/currency-api/blob/master/Dockerfile).

``` bash
FROM node:18-alpine as base

WORKDIR /src
COPY package.json package-lock.json /src/
COPY . /src
EXPOSE 8080

FROM base as production

ENV NODE_ENV=production
RUN npm install

CMD ["node", "index.js"]

FROM base as dev

ENV NODE_ENV=development
RUN npm config set unsafe-perm true && npm install -g nodemon
RUN npm install
CMD ["npm", "start"]
```

As Node.js has a built-in web server, the Dockerfile is much cleaner. 

> When you install node, npm is bundled with it. This eliminates the need to install packages at a different stage in the docker build.

In the above Dockerfile multi-stage docker build is used to separate production and development docker images. Having the package manager (npm) bundled and having the web-server as part of the language/runtime is something different in Node.js for PHP developers. If you are interested more in Dockering a Node.js applicaiton step-by-step follow this [tutorial](/blog/2020/11/nodejs-with-docker/). Also, [nodemon](/blog/2021/02/nodemon/) is only installed in the dev stage as it will be used only for development.

## Conclusion

When using Node.js for PHP developers it does need a mild shift in thinking to exploit the powers of Node.js well. Node.js is not a silver bullet. There are drawbacks and it needs adapting to different ways of code execution.

> Certainly, there are some benefits of using Node.js for PHP developers like async programming and concurrency. Other advantages stem out from the Node.js process being long-running.

I hope this post helps you get more out of Node.js as an experienced PHP developer.