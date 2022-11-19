---
layout: post
title: Using Axios timeout to make your application more efficient
date: 2022-11-19T22:46:55.000+11:00
comments: true
tags:
- Node.js
- Javascript
- Web Development
cover: "/images/axios-timeout/01axios-timeout.jpg"
pagetitle: Using Axios timeout to make your application more efficient
description: In this tutorial, learn how use Axios timeout to make your app efficient, performant and resilient to external API failures.
keywords: axios timeout, timeout axios, axios timeouts
---
Axios is one of the most popular JavaScript libraries to do HTTP requests. It is an HTTP client available for both the browser and Node.js. Setting Axios timeout properly makes your application perform efficiently even when the called API/URL is not responding in a timely manner. In this post, you will learn about Axios, its configs, and how to set Axios timeout properly to not hamper your application’s performance. Let’s get going.

<!-- more -->

<img class="center" loading="lazy" src="/images/axios-timeout/01axios-timeout.jpg" title="Axios timeout illustration with a clock" alt="Axios timeout illustration with a clock">


## Table of contents

* [Calling other services/APIs](#calling-other-servicesapis)
* [Why use a timeout in requests](#why-use-a-timeout-in-requests)
* [Axios](#axios)
   * [Installing Axios](#installing-axios)
   * [Axios request configs](#axios-request-configs)
   * [Set Axios timeout example](#set-axios-timeout-example)
   * [Axios timeout in action](#axios-timeout-in-action)
   * [Example with Axios timeout added](#example-with-axios-timeout-added)
* [Conclusion](#conclusion)


## Calling other services/APIs

In today’s world of highly interconnected services and API economy, more often than not your application will call either external HTTP APIs or internal ones. Depending on how your company’s applications and the communication between them is architected, you are most likely calling some internal HTTP APIs. In addition to that, your applications might also be calling external APIs to accomplish all sorts of tasks from some AI-related calculation to creating shipments for a customer order.

Imagine this, your shipment application is calling the Auspost/DHL API to create a shipment and get an Airway Bill (AWB) number to send to the customer. Due to the last quarter of the year, the high traffic season of Black Friday and Christmas sales their API is responding extremely slowly. Usually, the create AWB HTTP API would respond in under 200 milliseconds (ms) but due to the load and ongoing issue at the time of calling it was responding in around 3 seconds. 

This means that your warehouse (fulfillment center) staff are waiting for no direct benefit. In addition, as the API responses are flaky it is causing other issues too. This is where timeout on HTTP requests comes in handy, which is what is going to be discussed next.

### Why use a timeout in requests

If the requests made to the API endpoint to create and get the AWB does not have a timeout set. It would result in every request taking 3 seconds and that request may or may not pass. Without any reliable retry mechanism, the person trying to create the AWB/shipment would waste a lot of time and might even make other human errors.

In case a reasonable timeout was set for creating shipments (getting the AWB) on the courier’s HTTP API, this would have been less of an issue. Let’s say a 500-millisecond timeout was set, then the user would know that if they see a timeout error they can proceed with the next shipment. 

Coupling that with a reliable retry mechanism that can notify the user when the AWB is created when the task is completed in the background would help reduce the impact of this problem to a certain degree. Like many other things, this is how HTTP APIs are called to create a shipment for your e-commerce order.  In the next section, you will learn about Axios and how it can send HTTP requests to both the client and the server.


## Axios

[Axois](https://axios-http.com/) is a promise-based HTTP client that works for both Node.js and the browser. On the client (browser) side it uses [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) and on the server side, it utilizes the native Node.js [http module](https://nodejs.org/api/http.html). It also has very useful features like intercepting request and response data, and the ability to automatically transform request and response data to JSON.

### Installing Axios

Axios can be installed on any Node.js application that uses NPM with the following command:

```bash
npm i –save axios
```

The yarn equivalent of the above command is:

```bash
yarn add axios
```

### Axios request configs

There are various [request config options](https://axios-http.com/docs/req_config) for Axios like auth for basic auth, response type, max redirects, and timeout to name some. Among them, timeout is an important one. The timeout config is also vital because the default value is 0. 

> This means unless you set the timeout value explicitly, any request made using Axios is going to wait forever for a response. 

This is dangerous as it can quickly spiral up to be a big performance issue regardless your app is calling an internal or 3rd party HTTP API. In the next section, you will learn how to set a timeout in an Axios request and why is it important.


### Set Axios timeout example

For this example, you will call an API that will respond after a certain number of milliseconds have passed. As the HTTP call goes through the network the usual latency of DNS, the server’s computation time, etc will also be added to the wait time sent as the data has to pass through the wires and the network. The code for the slow API you are going to call looks like the below:

```js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const {setTimeout} = require('timers/promises');

app.get('/', (req, res) => {
  res.json({
    message: `alive`,
  });
});

app.get('/api/mock-response-time/:milliseconds', async (req, res) => {
  console.log(`Api hit`, req.params);
  const waitMs = req.params.milliseconds || 100;
  await setTimeout(waitMs);
  res.json({
    message: `responded after waiting for ${req.params.milliseconds} milliseconds (ms)`
  });
});

app.listen(port, () => {
  console.log(`Slow API app listening on port ${port}`);
});
```

It is a very simple Express API. You start by requiring express and instantiating it. Then you set the port to be taken from the environment variable `PORT` or if it is not set fallback to 3000. After that, you require the `setTimeout` from the `timers/promises` package which is available from Node.js version 15+. It will be used to wait for X milliseconds, you can read more about [wait in JavaScript](/blog/2022/08/javascript-wait-1-second/) if that is interesting to you.

Next, you add the home route `/` that responds with a stock JSON of `{“message”: “alive”}`. After that, another route is added `/api/mock-response-time/:milliseconds` where the caller will pass the number of milliseconds it wants the server to wait before sending a response back. As mentioned, the server will take some more time than the wait because of DNS, network, and other factors.

Finally your start the server with `app.listen` on the port and log that the server has started. The above code is available for your reference as a [GitHub repository](​​https://github.com/geshan/slow-api). It has also been deployed on Render (one of the [free Node.js hosting](/blog/2021/01/free-nodejs-hosting/) services) at https://slow-api.onrender.com . You will call this a simple but useful endpoint to test out Axios timeout next. 

### Axios timeout in action

Now, you will write some code using Axios to call the GET API that acts like a slow API depending on the values passed to the endpoint. First, you will call the API without setting any timeout with the code below:

```js
const axios = require('axios');

console.log = (() => {
  var console_log = console.log;
  var timeStart = new Date().getTime();
  
  return function() {
    var delta = new Date().getTime() - timeStart;
    var args = [];
    args.push((delta / 1000).toFixed(2) + ':');
    for(var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    console_log.apply(console, args);
  };
})();

axios.interceptors.request.use( req => {
  req.meta = req.meta || {}
  req.meta.requestStartedAt = new Date().getTime();
  return req;
});

axios.interceptors.response.use(res => {
  console.log(`Execution time for: ${res.config.url} - ${ new Date().getTime() - res.config.meta.requestStartedAt} ms`)
  return res;
},
res => {
  console.error(`Execution time for: ${res.config.url} - ${new Date().getTime() - res.config.meta.requestStartedAt} ms`)
  throw res;
});

(async () => {

  try {
    const eightSecondsinMs = 8000;
    const url = `https://slow-api.onrender.com/api/mock-response-time/${eightSecondsinMs}`;
    console.log(`Sending a GET reqeust to: ${url}`);
    const response = await axios.get(url);
    console.log(`Response: `, response?.data?.message );
    console.log('do this after you have data');
  } catch(err) {
    console.log(`Error message : ${err.message} - `, err.code);
  }
  
  console.log('do the next task');
})();
```

You first started by requiring Axios. In lines 3-15 you have overloaded the `console.log` function to include the time elapsed between calls. For instance, if the first `console.log` is called and the next `console.log` is called after one second it will append the first one with `0.00` and the second one with `1.00`. It has been taken from this old [gist](https://gist.github.com/mikelehen/5398652).

Next, you add two Axios Interceptors. Interceptors help you intercept the request and response objects and manipulate them before they are handled. The first will intercept the request and add the `requestStartedAt` value as the current time. It will add a log on the request with the time it was initiated. This will be used later to calculate the time it took to get the response back. 

Then you add another interceptor to the response. This interceptor gets the current time and subtracts it from the requested stated time which results in the duration of time it took for the response to be received. It logs the time for the response to be fetched in milliseconds. The second interceptor on the response handles the case for both valid/successful status response of 200-299 or invalid status codes like 4XX and 5XX. For the error case, it logs with `console.error` and throws back the response.

Then there is an Immediately Invoked Function Expression (IIFE) to use async-await. As async await is not available at the top level yet. This is where the main thing happens. You set a URL to be called on the above slow API server with a delay of 8 seconds (8000 milliseconds). Then you call the URL with `axios.get`, notice here no timeout is set so you are instructing Axios to wait for as long as it takes to fetch the response. This wait forever (timeout: 0) is the default behavior for Axios.

After that, you log the message from the response data. As the whole call is in try catch in case of any error or a nonsuccessful response (for instance a 501), it will be logged in the catch section. After the try-catch, you do another log to denote that there is another task to be done after calling the slow API. When you run it you can see an output like the one below:

<img class="center" loading="lazy" src="/images/axios-timeout/02before-axios-timeout.jpg" title="Output before Axios timeout - takes 8.76 seconds" alt="Output before Axios timeout - takes 8.76 seconds">

In this case, 8.76 seconds feels like a long time to wait but finally, you get the output. As the timeout is not set Axios waited for as long as it took to get the response. This would have been detrimental if this task was part of another API call that was getting a significant amount of traffic as all the requests would be clogged up because some 3rd party service is responding really slowly. Next, you will see an example with Axios timeout implemented.


### Example with Axios timeout added

A snippet of the same example with timeout added looks like the following:

```js/6
(async () => {

  try {
    const eightSecondsinMs = 8000;
    const url = `https://slow-api.onrender.com/api/mock-response-time/${eightSecondsinMs}`;
    console.log(`Sending a GET reqeust to: ${url}`);
    const response = await axios.get(url, {timeout: 900});
    console.log(`Response: `, response?.data?.message );
    console.log('do this after you have data');
  } catch(err) {
    console.log(`Error message : ${err.message} - `, err.code);
  }
  
  console.log('do the next task');
})();
```

The code is exactly the same as the above, except now there is a timeout of 900 milliseconds added as highlighted. 900 ms is still high in normal scenarios but in this case, you know the API is going to respond in at least 8000 milliseconds. When you run the above code you will see the following:

<img class="center" loading="lazy" src="/images/axios-timeout/03after-axios-timeout.jpg" title="Output after Axios timeout - takes 0.96 seconds" alt="Output after Axios timeout - takes 0.96 seconds">

Here, the situation is much better because as the timeout was hit in 900 milliseconds the execution moved on. And the log for `do the next task` was visible before 1 second. In a real-life scenario, it would make the API fail fast in case the 3rd party API was slow. Depending on how you want to weave [software resilience](/blog/2020/12/software-resilience/) into your apps you can explore the retry mechanism or even try out the circuit breaker pattern. The code with and without a timeout to call the slow API endpoint is accessible to you as a [Github repository](https://github.com/geshan/axios-timeout).

## Conclusion

In this tutorial, you learned about Axios and how adding one simple config of Axios timeout can save you from an untoward situation. The moral of the story is:

> Always add timeout when you call either internal or external APIs. You cannot control how long it takes for an external API to respond.

If the external API is down your service should respond and fail gracefully. It should not fail because some third-party API is not responding properly. A simple config like timeout will save you from unnecessary headaches. Don’t forget to add a timeout to every API call you make!
