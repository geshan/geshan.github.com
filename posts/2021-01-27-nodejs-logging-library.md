---
layout: post
title: 5 Node.js Logging libraries compared for you to make the optimal choice
date: 2021-01-27T22:30:22.000+11:00
comments: true
tags:
- Web Development
- Node.js
cover: "/images/nodejs-logging-libraries/01nodejs-logging-library.jpg"
pagetitle: 5 Node.js Logging libraries compared for you to make the optimal choice
description: 5 Node.js logging libraries Wiston, bunyan, pino, loglevel, and npmlog
  contrasted in this post to help you make the right decision for the optimal node.js
  logging library.
keywords: nodejs logging library, node.js logging library, node js logging library,
  node.js logging, nodejs logging, node js logging, winston nodejs, bunyan nodejs

---
The optimally correct logging Node.js logging library can give you unprecedented insights into how your application is working. Having proper logging is equivalent to having a powerful telescope in a space with all your applications. Do you want to be able to see how your application behaves under load in production? In this post, we are going to analyze 5 popular Node.js logging libraries that can easily do the job for you.

<!-- more -->

<img class="center" loading="lazy" src="/images/nodejs-logging-libraries/01nodejs-logging-library.jpg" title="5 node.js logging libraries compared" alt="5 node.js logging libraries compared">

## Table of contents

* [Assumptions](#assumptions)
* [Node.js logging libraries to evaluate](#nodejs-logging-libraries-to-evaluate)
  * [Winston](#winston)
  * [Bunyan for Node.js logging](#bunyan-for-node.js-logging)
  * [Pino](#pino)
  * [Loglevel](#loglevel)
  * [Npmlog](#npmlog)
* [Quick comparison of Node.js logging libraries](#quick-comparison-of-node.js-logging-libraries)
* [Conclusion](#conclusion)

## Assumptions

1. You are familiar with how Node.js works and can run node locally
1. You can install npm libraries and have basic knowledge of package.json and npm CLI

We will use Express.js as an example app to see code examples writing log to the console for all of the Node.js logging libraries in this post.

## Node.js logging libraries to evaluate

For this post, we will evaluate 5 of the popular Node.js logging libraries available on NPM. All of them are downloaded more than a million times each week, so they are pretty darn popular. Let’s get started!

### Winston

[Winston](https://www.npmjs.com/package/winston) is a popular logging library. It is designed to be simple and enables universal logging with support for multiple `transports`. Winston defines itself as “A logger for just about everything”.

With Winston, we can route your logs to other services like [AWS cloud watch](https://www.npmjs.com/package/winston-cloudwatch), [graylog2](https://www.npmjs.com/package/@eximius/winston-graylog2), [logz.io](https://www.npmjs.com/package/winston-logzio), or even [Sematext Logsene](https://www.npmjs.com/package/winston-logsene). We can even add the express middleware to make [logging with Express](https://www.npmjs.com/package/express-winston) better with Winston.

Below is a code example of Winston with Express using [express-winston middleware](https://github.com/bithavoc/express-winston):

``` js
const winston = require('winston');
const expressWinston = require('express-winston');
const express = require('express');
const app = express();
const port = 3001;

//more options here - https://github.com/bithavoc/express-winston#request-logging
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  meta: false,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) { return false; }
}));

app.get('/', (req, res) => {
  res.send('Hello World! - Winston logged');
});


app.get('/api/test', (req, res) => {
  res.json({'message': 'Hello winston!'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

It will give an output as follows when we run the server with `node winston.js` and hit `http://localhost:3001/test/api` on the browser:

``` bash
Example app listening at http://localhost:3001
{"meta":{},"level":"\u001b[32minfo\u001b[39m","message":"GET /api/test 304 2ms"}
{"meta":{},"level":"\u001b[32minfo\u001b[39m","message":"GET /favicon.ico 404 2ms"}
{"meta":{},"level":"\u001b[32minfo\u001b[39m","message":"GET /favicon.ico 404 1ms"}
```

The above code is also available as a [pull request](https://github.com/geshan/nodejs-logging/pull/2/files).

### Bunyan for Node.js logging

[Bunyan](https://www.npmjs.com/package/bunyan) is another famous Node.js logging library. Bunyan is used by [Joyent](https://www.joyent.com/node-js/production/modules) in production. It defines itself as a simple and fast JSON logging library for Node.js services.

Bunyan advocates that logs should be in JSON format. Its features include a CLI for pretty-printing, serializers, and support for [multiple runtimes](https://github.com/trentm/node-bunyan#runtime-environments) in addition to Node.js like Webpack and Browserify.

Below is a code example of Bunyan with Express using [Express Bunyan logger](https://github.com/villadora/express-bunyan-logger):

``` js
const express = require('express');
const app = express();
const port = 3002;

//more options here - https://github.com/villadora/express-bunyan-logger#usage
app.use(require('express-bunyan-logger')({
  name: 'logger',
  format: ":remote-address - :user-agent[major] custom logger",
  streams: [{
      level: 'info',
      stream: process.stdout
  }]
}));

app.get('/', (req, res) => {
  res.send('Hello World! - Bunyan logged');
});


app.get('/api/test', (req, res) => {
  res.json({'message': 'Hello bunyan!'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

It will show an output similar as follows when we execute the code with `node bunyan.js` and hit `http://localhost:3002/test/api` on the browser:

``` bash
Example app listening at http://localhost:3002
{"name":"logger","hostname":"abcd","pid":32691,"req_id":"0b2d2977-376e-4742-86b0-57feec630188","level":30,"remote-address":"::1","ip":"::1","method":"GET","url":"/api/test","referer":"-","user-agent":{"family":"Chrome","major":"87","minor":"0","patch":"4280","device":{"family":"Other","major":"0","minor":"0","patch":"0"},"os":{"family":"Mac OS X","major":"10","minor":"14","patch":"6"}},"http-version":"1.1","response-time":14.628108,"response-hrtime":[0,14628108],"status-code":304,"req-headers":{"host":"localhost:3002","connection":"keep-alive","sec-ch-ua":"\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"","sec-ch-ua-mobile":"?0","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","sec-fetch-site":"none","sec-fetch-mode":"navigate","sec-fetch-user":"?1","sec-fetch-dest":"document","accept-encoding":"gzip, deflate, br","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","cookie":"a=b","if-none-match":"W/\"1b-1NBfctHuicMF7VuqeDKGexvbveA\""},"res-headers":{"x-powered-by":"Express","etag":"W/\"1b-1NBfctHuicMF7VuqeDKGexvbveA\""},"req":{"method":"GET","url":"/api/test","headers":{"host":"localhost:3002","connection":"keep-alive","sec-ch-ua":"\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"","sec-ch-ua-mobile":"?0","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","sec-fetch-site":"none","sec-fetch-mode":"navigate","sec-fetch-user":"?1","sec-fetch-dest":"document","accept-encoding":"gzip, deflate, br","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","cookie":"a=b","if-none-match":"W/\"1b-1NBfctHuicMF7VuqeDKGexvbveA\""},"remoteAddress":"::1","remotePort":63793},"res":{"statusCode":304,"header":"HTTP/1.1 304 Not Modified\r\nX-Powered-By: Express\r\nETag: W/\"1b-1NBfctHuicMF7VuqeDKGexvbveA\"\r\nDate: Tue, 26 Jan 2021 21:11:12 GMT\r\nConnection: keep-alive\r\n\r\n"},"incoming":"<--","msg":"::1 - 87 custom logger","time":"2021-01-26T21:11:12.817Z","v":0}
```

Bunyan's logs are very verbose by default.

The above code is also available as a [pull request](https://github.com/geshan/nodejs-logging/pull/3/files).

### Pino

[Pino](https://www.npmjs.com/package/pino) is a relatively popular Node.js logging library that marks itself as a “very low overhead Node.js logger”. It attributes [asynchronous logging](https://github.com/pinojs/pino/blob/HEAD/docs/asynchronous.md) to its fast performance. Pino claims to be over 5x faster than alternatives in many cases in its [benchmarks](https://github.com/pinojs/pino/blob/master/docs/benchmarks.md).

Other features include [child loggers](https://github.com/pinojs/pino/blob/master/docs/child-loggers.md) and [support for multiple web frameworks](https://github.com/pinojs/pino/blob/master/docs/web.md). It has multiple core and community modules which helps to form a thriving [ecosystem](https://github.com/pinojs/pino/blob/master/docs/ecosystem.md). With Pino, you can send the logs to many services by using proper transports like [MySQL](https://github.com/pinojs/pino/blob/master/docs/transports.md#pino-mysql), [Datadog](https://github.com/pinojs/pino/blob/master/docs/transports.md#pino-datadog), [AWS cloud watch](https://github.com/pinojs/pino/blob/master/docs/transports.md#pino-cloudwatch), or [log flare](https://github.com/pinojs/pino/blob/master/docs/transports.md#pino-logflare).

Below is an example of Pino with Express using [Express Pino logger](https://github.com/pinojs/express-pino-logger):

``` js
const express = require('express');
const app = express();
const pino = require('express-pino-logger')();
const port = 3003;

//more options here - https://github.com/pinojs/express-pino-logger#example
app.use(pino)

app.get('/', (req, res) => {
  res.send('Hello World! - Pino logged');
});

app.get('/api/test', (req, res) => {
  req.log.info('Yo from pino');
  res.json({'message': 'Hello Pino!'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

It will send out output as follows when we run the server with `node pino.js` and hit `http://localhost:3003/test/api` on the browser:

``` bash
Example app listening at http://localhost:3003
{"level":30,"time":1611695678813,"pid":32768,"hostname":"abcd","req":{"id":1,"method":"GET","url":"/api/test","headers":{"host":"localhost:3003","connection":"keep-alive","sec-ch-ua":"\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"","sec-ch-ua-mobile":"?0","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","sec-fetch-site":"none","sec-fetch-mode":"navigate","sec-fetch-user":"?1","sec-fetch-dest":"document","accept-encoding":"gzip, deflate, br","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","cookie":"_ga=GA1.1.1863215728.1591927460; PPA_ID=gkq1qhp7htr141pkojpmqcqt95; webfx-tree-cookie-persistence=wfxt-4; io=TxK-RQvnHb14VONKAAAC","if-none-match":"W/\"19-JzA5ewGlTSyvFTwS4fIYMkAu78Q\""},"remoteAddress":"::1","remotePort":63824},"msg":"Yo from pino"}
{"level":30,"time":1611695678817,"pid":32768,"hostname":"abcd","req":{"id":1,"method":"GET","url":"/api/test","headers":{"host":"localhost:3003","connection":"keep-alive","sec-ch-ua":"\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"","sec-ch-ua-mobile":"?0","upgrade-insecure-requests":"1","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9","sec-fetch-site":"none","sec-fetch-mode":"navigate","sec-fetch-user":"?1","sec-fetch-dest":"document","accept-encoding":"gzip, deflate, br","accept-language":"en-GB,en-US;q=0.9,en;q=0.8","cookie":"a=b","if-none-match":"W/\"19-JzA5ewGlTSyvFTwS4fIYMkAu78Q\""},"remoteAddress":"::1","remotePort":63824},"res":{"statusCode":304,"headers":{"x-powered-by":"Express","etag":"W/\"19-JzA5ewGlTSyvFTwS4fIYMkAu78Q\""}},"responseTime":4,"msg":"request completed"}
```

Similar to Bunyan, Pino's default logs are also verbose. We can use [pino-pretty](https://github.com/pinojs/pino-pretty) CLI to make the logs prettier.

The code example can be accessed as a [pull request](https://github.com/geshan/nodejs-logging/pull/4/files).

### Loglevel

[Loglevel](https://www.npmjs.com/package/loglevel) is a very popular logging library that can be used in both Node.js and the browser. LogLevel defines itself as “Minimal lightweight simple logging for JavaScript.” It also claims to replace console.log eliminating console.log’s downsides.

Loglevel seems to be easy to use and very convenient too. Its readme adds “This is a barebones reliable everyday logging library.” which does not do fancy things but does have core functionality you will actually use.

Below is a very simple example of Loglevel with Express server and no middleware:

``` js
const express = require('express');
const app = express();
const logger = require('loglevel');
const port = 3004;

//more docs here - https://github.com/pimterry/loglevel#documentation

app.get('/', (req, res) => {
  res.send('Hello World! - loglevel logged');
});

app.get('/api/test', (req, res) => {
  logger.warn('Loglevel is simple');
  res.json({'message': 'Hello loglevel!'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

It will show output as follows when we run the execute the above code with `node loglevel.js` and hit `http://localhost:3004/test/api` on the browser:

``` bash
Example app listening at http://localhost:3004
Loglevel is simple
```

Loglevel output is very simple compared to the other libraries. Also, we did not use any express specific middleware to log using Loglevel.

We can access the above example as a [pull request](https://github.com/geshan/nodejs-logging/pull/5/files) too.

### Npmlog

[Npmlog](https://www.npmjs.com/package/npmlog) is yet another very popular logging library that NPM uses. As per NpmLog’s readme “This logger is very basic. It does the logging for npm. It supports custom levels and colored output.”

There is nothing fancy about this Node.js logging library and the last version was published 4 years ago. Yet, it is the most popular logging library listed in this post. The only library with over 10 million downloads per week as of Jan-2021.

Below is a quick example of npmlog in action with Express js and no middleware:

``` js
const express = require('express');
const app = express();
const logger = require('npmlog');
const port = 3005;

//more docs here - https://github.com/npm/npmlog#basic-usage

app.get('/', (req, res) => {
  res.send('Hello World! - npmlog logged');
});

app.get('/api/test', (req, res) => {
  logger.warn('From Npmlog', 'Npmlog is simple too %j', {'message': 'test'});
  res.json({'message': 'Hello npmlog!'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

It will show an output like below when we start the Express js server with `node npmlog.js` and hit `http://localhost:3005/test/api` on the browser:

``` bash
Example app listening at http://localhost:3005
WARN From Npmlog Npmlog is simple too {"message":"test"}
```

Similar to Loglevel, for npmlog the output was simple and we did not use any Express js middleware too.

The above code is available as a [pull request](https://github.com/geshan/nodejs-logging/pull/6/files) too.

## Quick comparison of Node.js logging libraries

Below is a quick comparison of the Node.js logging libraries we have discussed till now, all data is collected on the last week of Jan-2021:

|                   Feature/Service                  | Downloads/week |                  Github Stars                 | Github Forks | First Release                                                                 |
|:--------------------------------------------------:|:--------------:|:---------------------------------------------:|--------------|-------------------------------------------------------------------------------|
|  [Winston](https://www.npmjs.com/package/winston)  |  5.05 million  | [16.7K](https://github.com/winstonjs/winston) | 1.5K         | [0.1.0](https://github.com/winstonjs/winston/tags?after=0.1.3) on 19-Jan-2011 |
|   [Bunyan](https://www.npmjs.com/package/bunyan)   |  1.23 million  | [6.5K](https://github.com/trentm/node-bunyan) | 513          | [0.1.0](https://github.com/trentm/node-bunyan/tags?after=0.5.0) on 3-Feb-2012 |
|     [Pino](https://www.npmjs.com/package/pino)     |   1.28 millon  |     [6.6K](https://github.com/pinojs/pino)    | 439          | [0.2.0](https://github.com/pinojs/pino/tags?after=v0.4.2) on 6-Mar-2016       |
| [LogLevel](https://www.npmjs.com/package/loglevel) | 9.12 million   | [1.9K](https://github.com/pimterry/loglevel)  | 154          | [0.1.0](https://github.com/pimterry/loglevel/tags?after=1.0.0) on 2-Apr-2013  |
| [npmlog](https://www.npmjs.com/package/npmlog)     | 10.71 million  | [346](https://github.com/npm/npmlog)          | 53           | [0.1.0](https://github.com/npm/npmlog/tags?after=v1.0.0) on 6-Jun-2012        |

If we look at the download trends, [NPM trends](https://www.npmtrends.com/winston-vs-bunyan-vs-pino-vs-loglevel-vs-npmlog) paints a picture like below:

<img class="center" loading="lazy" src="/images/nodejs-logging-libraries/02nodejs-logging-libraries-downloads.jpg" title="5 node.js logging libraries downloads trend in past 1 year" alt="5 node.js logging libraries downloads trend in past 1 year">

Even though npmlog has only 346 stars and 53 forks, it is reportedly downloaded more than 10 million times each week. In terms of GitHub stars, Winston has 3 times as many stars compared to the second one Bunyan with 513 stars. Winston is also the oldest library created on 30-Dec-2010 with the first release on 19-Jan-2011.

As per [npmcompare](https://npmcompare.com/compare/bunyan,loglevel,npmlog,pino,winston), Npmlog has the most points with 25.5 million points and Buyan has the least points with 2.9 million points.

## Conclusion

For an optimal logging and monitoring experience in Node.js, rather than going after the numbers, it might be best to choose the library that suits your needs.

> Use the library that fits your purpose the best and utilize its addons or features that make the most sense to your use case.

It would also be great if you follow some [logging best practices](/blog/2019/03/follow-these-logging-best-practices-to-get-the-most-out-of-application-level-logging-slides/) to reap the most benefits as they are [software engineers’ best friend](/blog/2019/11/laracon-au-2019-overall-a-good-experience/#slides). I have been preaching about the [importance of logging](/blog/2015/08/importance-of-logging-in-your-applications/) for a long time now. Happy logging!