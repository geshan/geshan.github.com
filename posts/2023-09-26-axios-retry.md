---
layout: post
title: A beginner's guide to retrying failed requests with Axios Retry
date: 2023-09-26T22:41:57.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
- Web Development
cover: "/images/axios-retry/01axios-retry.jpg"
pagetitle: A beginner's guide to retrying failed requests with Axios Retry
description: "In this guide, you will learn how to use Axios Retry plugin to retry failed request with Axios applying certain rules. Get going now!"
keywords: axios retry, retry axios, retry failed request axios
---
In the ever-evolving world of web development, handling HTTP requests is a fundamental task. Whether you're building a frontend application or a backend service, you'll likely find yourself dealing with APIs and remote servers. [Axios](https://axios-http.com/docs/intro), a popular JavaScript library, simplifies the process of making HTTP requests. However, what happens when those requests fail? In this beginner’s guide, you will explore how to tackle this issue by using [Axios Retry](https://www.npmjs.com/package/axios-retry), an essential plugin that can save you time and frustration. Let's get started!

<!-- more -->

<img class="center" src="/images/axios-retry/01axios-retry.jpg" title="A beginner's guide to retrying failed requests with Axios Retry" alt="A beginner's guide to retrying failed requests with Axios Retry">

## Table of contents

* [Benefits of Retrying a Failed Request](#benefits-of-retrying-a-failed-request)
* [What is Axios?](#what-is-axios)
* [Why Use Axios Retry](#why-use-axios-retry)
    * [Axios retry config](#axios-retry-config)
* [Axios retry example](#axios-retry-example)
    * [Install Axios retry](#install-axios-retry)
    * [Use axios retry to retry failed requests](#use-axios-retry-to-retry-failed-requests)
* [NpmTrends comparison](#npmtrends-comparison)
* [Conclusion](#conclusion)

## Benefits of Retrying a Failed Request

Before delving into Axios and Axios Retry, let's understand the importance of retrying failed requests. In a real-world web application, network issues, server errors, or temporary glitches can cause HTTP requests to fail. Retrying failed requests can provide several benefits as listed below:

* Improved Reliability: By automatically retrying failed requests, you increase the likelihood of successful data retrieval, improving the overall reliability of your application.

* Enhanced User Experience: Retrying requests silently in the background can ensure a seamless user experience without error messages or interruptions.

* Reduced Manual Intervention: Without automated retry mechanisms, developers may need to intervene and manually retry requests, which is neither efficient nor scalable.

With the above in mind, in the next part,  you will learn about Axios.

## What is Axios?

[Axios](https://axios-http.com/docs/intro) is a promise-based HTTP client for JavaScript, which means it allows you to send asynchronous HTTP requests to REST endpoints or other services. It is widely used in both frontend and backend development due to its simplicity and versatility. With Axios, you can perform various HTTP operations such as GET, POST, PUT, DELETE, and more with ease. Even though there are other alternatives to Axios, it is one of the [most popular](https://npmtrends.com/axios-vs-got-vs-node-fetch-vs-request-vs-superagent) HTTP client libraries for both the backend (Node.js) and the front end. 

In the next section, you will learn how to retry failed idempotent requests in Axios using the Axios retry plugin and the why behind it.

## Why Use Axios Retry

Axios Retry is an Axios plugin that simplifies the process of retrying failed requests. It offers a straightforward way to add resilience to your HTTP requests by allowing you to specify the number of retry attempts and a custom retry delay between each attempt. Here are some compelling reasons to use Axios Retry:

* Saves Development Time: Writing custom retry logic for every request can be time-consuming. Axios Retry streamlines this process, saving you development time.

* Customizable Retry Strategies: You can define custom retry strategies based on the specific needs of your application, such as increasing the delay between retries or limiting the number of attempts.

* Enhances Code Readability: By encapsulating retry logic within Axios interceptors, your code remains clean and maintainable, improving readability.

Axios retry plugin has a flexible config you can use, which is described in the next section.

### Axios retry config

You can find some code examples in the Axios retry [GitHub](https://github.com/softonic/axios-retry) repository. It also lists down the configuration options with their type, default values, and description of what it does in a neatly organized [table](https://github.com/softonic/axios-retry#options).

The main configs from that table are:

* Retries - number of retries to do when the request fails.
* Retry condition - the condition should pass for the next retry to take place. By default, it retries on 5xx errors on idempotent requests.
* Retry delay - the delay in milliseconds between retrieved requests. [Exponential backoff](https://developers.google.com/analytics/devguides/reporting/core/v3/errors#backoff) is one of the best strategies for it.

Below is an example that uses all the above configs.

## Axios retry example

Let's dive into a practical example to demonstrate how Axios Retry works. Consider a scenario where you're making an API request, and the server returns a 500 Internal Server Error. Without Axios Retry or any other retry mechanism, the request will fail and stop on the first failure like a 500 response from the server.

Now, let's see how to achieve retrying with some rules using Axios Retry, next.

### Install Axios retry

For the scope of this example, you will use Axios and Axios retry. To install both of them with NPM you can run:

```bash
npm install axios axios-retry
```

At the time of writing, the latest version of Axios was 1.5.0, and Axios retry was 3.8.0. If you want to only install Axios retry you can run `npm install axios-retry`.

For this example, you will send an HTTP GET request to a dummy server by Postman called Postman Echo and retry on the failure. The code for retrying the failed example can be found in the following section.

### Use axios retry to retry failed requests

For the request retry example, while calling the Postman Echo test server, you will follow some rules. The rules are, that you will retry 3 times and there will be a delay of more than 1 * no. of retries second + random number of milliseconds between each retry – this is the [exponential backoff](https://cloud.google.com/iot/docs/how-tos/exponential-backoff#example_algorithm) algorithm. The retry will be done only in the case of `500` and `501` response codes.

Just to complete the circuit, you will change the request URL after 2 retries to a URL that sends back a 200 response so that the third retry is not required. You will also log the number of retries and response status if the request is successful. Below is the code that follows all these rules in a file named `index.js`:

```js
import axios from 'axios';
import axiosRetry from 'axios-retry';
 
axiosRetry(axios, { 
   retries: 3,
   retryDelay: (...arg) => axiosRetry.exponentialDelay(...arg, 1000),
   retryCondition(error) {
    switch (error.response.status) {
      //retry only if status is 500 or 501
      case 500:
      case 501:
        return true;
      default:
        return false;
      }
    },
    onRetry: (retryCount, error, requestConfig) => {
      console.log(`retry count: `, retryCount);
      if(retryCount == 2) {
        requestConfig.url = 'https://postman-echo.com/status/200';
      }
    },
});
 
(async () => {
  try {
    const res = await axios.get('https://postman-echo.com/status/500');
    console.log(`inside async:`, res.status);
  } catch(err) {
    console.error(`Error occurred: `, err.message);
  }  
})();
```

You first import `axios` and `axois retry` in the above script. Then set the config for Axios retry to follow all the above defined rules of 3 retries and exponential backoff.

Then in the async function, you call the Postman Echo endpoint that always sends back a 500. If you are using Node 18+ and `module` in package.json you can try [top-level await](https://github.com/geshan/axios-retry/blob/master/index.js#L34-L36) too.  In case of an error, it is logged. If the response comes back successfully the status code is logged.

Another interesting aspect to note here is, that each retry attempt number is logged in the `onRetry` function. After retry no. 2, you change the request URL to become successful. To make the requests more resilient you can also add a [timeout to Axios](/blog/2022/11/axios-timeout/) request. The script runs like below when you run it with `time node index.js` (you can also use `node index.js`, time is used here to see how long the whole script takes:

<img class="center" loading="lazy" src="/images/axios-retry/02axios-retry-script-run.jpg" title="Axios retry script with 3 retries and exponetial backoff output" alt="Axios retry script with 3 retries and exponetial backoff output">

Because of the exponential backoff, the script takes 11.5 seconds to run after 2 retires. You can find this code in an open source [GitHub repository](https://github.com/geshan/axios-retry) for your reference. In the next section, you will learn about how do other alternatives to Axios retry compare to it.

## NpmTrends comparison

There are not many alternatives to Axois Retry. One of them is Retry Axois but it is not as popular as the Axios Retry. Of course, you can whip up your own solution using [Axois interceptors](/blog/2022/12/axios-interceptors/) but that won’t be an optimal solution. Below is a quick comparison of the alternatives retry Axios and Axios retry interceptor from [NPM Trends](https://npmtrends.com/axios-retry-vs-axios-retry-interceptor-vs-retry-axios) :

<img class="center" loading="lazy" src="/images/axios-retry/03axios-retry-alt-comparision.jpg" title="Axios retry popularity comparision to its alternatives" alt="Axios retry popularity comparision to its alternatives">

As you can see, Axios Retry currently has more than 2.5 million downloads per week whereas Retry Axios has around 600K downloads per week. Similarly, `axios-retry-interceptor` has only around 50 downloads per week. So, it is safe to say that Axios Retry is the most popular retry plugin/library for retrying requests in Axios.

## Conclusion

In this beginner's guide, you have explored the world of Axios Retry and its significance in handling failed HTTP requests. You have seen how Axios Retry simplifies the process of adding retry mechanisms to your Axios requests, saving you time and improving your application's reliability. By applying this knowledge, you can enhance the resilience of your web applications and provide a more seamless experience to your users.

You also witnessed an example of Axios retry with exponential backoff with 3 retries. The reference code is on [GitHub](https://github.com/geshan/axios-retry). Then you knew about alternatives to Axios Retry and they are not as popular as Axios Retry.

So, the next time you find yourself wrestling with failed requests, remember to use Axios Retry and let it work its magic to bring reliability and resilience to your web development projects. Happy coding!
