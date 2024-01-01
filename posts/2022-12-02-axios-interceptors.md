---
layout: post
title: How to use Axios interceptors, a step-by-step guide with example
date: 2022-12-02T22:44:52.000+11:00
comments: true
tags:
- Node.js
- Javascript
- Web Development
cover: "/images/axios-interceptors/01axios-interceptors.jpg"
pagetitle: How to use Axios interceptors, a step-by-step guide with example
description: In this tutorial, learn how to use Axios interceptors step by step with an example to track response duration for each Axios request.
keywords: axios interceptors, axios interceptor, interceptors axios

---
Axios is one of the most popular JavaScript libraries to perform HTTP requests. Axios interceptors are powerful mechanisms built into Axios for making changes to requests and responses in a non-intrusive way. In this guide, you will walk through the basics of Axios interceptors and step through a useful example of how they can be used. By the end, you should have a good understanding of how to use Axios interceptors in your own applications. Let’s get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/axios-interceptors/01axios-interceptors.jpg" title="Axios interceptors illustrated with a Syringe to denote injection" alt="Axios interceptors illustrated with a Syringe to denote injection">

## Table of contents

* [Axios introduction](#axios-introduction)
* [What are Axios interceptors?](#what-are-axios-interceptors)
   * [Intercepting Requests](#intercepting-requests)
   * [Response Interceptors](#response-interceptors)
* [Using Axios Interceptors to know request duration](#using-axios-interceptors-to-know-request-duration)
* [Other usages of Axois interceptors](#other-usages-of-axois-interceptors)
* [Conclusion](#conclusion)

## Axios introduction

[Axios](https://axios-http.com/) is a popular promise-based JavaScript library for making HTTP requests. It is often used in client-side applications to make API requests but it works on the server side with Node.js too. Axios provides an easy-to-use API for making different types of requests such as GET, POST, PUT and DELETE. It also supports advanced features such as the cancellation of requests, interceptors, and automatic transformation of request and response data to JSON.

Axios is a HTTP client library that is designed to make the developer efficient. It is also highly configurable, allowing developers to customize the library to their specific needs. Additionally, Axios is compatible with most modern browsers, making it a great choice for web development. 
To install and use Axios in your project you can run the following command:

```bash
npm install --save axios
```

Axios is one of the most popular request libraries in the JavaScript ecosystem. It has close to [35 million downloads](https://npmtrends.com/axios) per week at the time of writing. Compared to Axios, [Got](https://www.npmjs.com/package/got) has almost 19 million downloads per week. There are other native libraries and NPM packages that can be a good alternative to Axios, you can read more about some [Node.js HTTP request libraries](/blog/2021/03/nodejs-http-request/). In the next section, you will learn about Axios interceptors and their usage for both requests and responses.

## What are Axios interceptors?

Axios interceptors are functions that are called before a request is sent and after a response is received. The official [doc](https://axios-http.com/docs/interceptors) mentions that you can “intercept” requests and responses before they are handled. They provide a way to modify and control the requests and responses that are sent and received by the application. Interceptors can be used to add headers, modify requests, handle errors, and much more.

Axios interceptors are a powerful tool for customizing the behavior of a HTTP call when making the call or just after receiving the response back. They can be used to add extra headers, transform the response, etc. You can also use [Axios.create](https://blog.logrocket.com/understanding-axios-create/) to create multiple instances of Axios and have specific interceptors on a single instance of Axios. 

They can also be used to add custom logic to the application, such as logging or analytics. For example, you could log each URL requested by Axios without the need to do it on each call. 

> Thereby, Axios interceptors are like pre-request and post-response received hooks you can inject into your requests and responses. 

These hook code can modify the request to be sent or the response just received. Speaking of which, in the subsequent section you will learn about intercepting requests than responses.

### Intercepting Requests

Interceptors can be used to modify requests before they are sent. This can be useful for adding authentication headers, setting timeouts, or adding query parameters. For example, you will add extra metadata on the request to attach a `request stated at` time and then later use it to calculate how long it took to get the response. The interceptor on the request will look like the following:


```js
axios.interceptors.request.use( req => {
  req.meta = req.meta || {}
  req.meta.requestStartedAt = new Date().getTime();
  return req;
});
```

In this example, you added a meta key on the request object which has a `reqeustStartedAt` property. It is set to the current time, it will be used later in the response interceptor which will calculate how long the request took from the client's (Axios) point of view. Therefore, in the next section, you will learn about intercepting the response.


### Response Interceptors

Interceptors can also be used to handle responses just after they are received. This can be useful for logging errors, parsing data, or retrying failed requests. In the above example, you wanted to know how long each request took. The first part of setting the time when the request started was injected on the request object. So the next part to do the math on the number of milliseconds it took for the request will be on the response object as seen below:

```js
axios.interceptors.response.use(res => {
  res.durationInMs = new Date().getTime() - res.config.meta.requestStartedAt
  return res;
},
res => {
  res.durationInMs = new Date().getTime() - res.config.meta.requestStartedAt
  throw res;
});
```

In the above code, the first function in the Response interceptor is for the happy path responses meaning the 2XX response codes. The second function is for the error path, the non 2XX response codes like 400 or 501. In both cases and new `durationInMs` property is added to the response object that stores the number of milliseconds it took for the response to come back. It uses the `requestStartedAt` property set in the request interceptor.

In addition to logging errors, interceptors can also be used to modify the response data before it is returned to the calling code. This can be useful for transforming the data into a more usable format, or for adding additional data to the response. In the next section, you will see the above request and response interceptors in action

## Using Axios Interceptors to know request duration

Now that you have seen how interceptors are created, let's look at a more complete example of how they can be used. These interceptors used to measure and log response times for requests can be useful for monitoring performance issues or for generating statistics for the requests’ response times. Those response times can also be used to set reasonable [Axios timeout](/blog/2022/11/axios-timeout/).

In this example, you will run a couple of GET requests on the GitHub API and fetch user details. You will use the above combination of request and response interceptor to log the time it took for each request, let’s get going:

```js
import axios from 'axios';

axios.interceptors.request.use( req => {
  req.meta = req.meta || {}
  req.meta.requestStartedAt = new Date().getTime();
  return req;
});

axios.interceptors.response.use(res => {
  res.durationInMs = new Date().getTime() - res.config.meta.requestStartedAt
  return res;
},
res => {
  res.durationInMs = new Date().getTime() - res.config.meta.requestStartedAt
  throw res;
});

(async () => {
  try {
    const headers = { Accept: 'application/json', 'Accept-Encoding': 'identity' };
    const githubUserName = 'abraham';

    const url = `https://api.github.com/users/${githubUserName}`;
    console.log(`Sending a GET reqeust to: ${url}`);
    const { data, durationInMs } = await axios.get(url, { headers });    
    console.log(`Github username ${githubUserName} has real name: ${data?.name} and works at ${data?.company}`,);
    console.log(`Successful response took ${durationInMs} milliseconds`);

    //the below request will fail
    const nonExistinggithubUserName = 'thisUserShouldNotBeOnGithub';
    const failingUrl = `https://api.github.com/users/${nonExistinggithubUserName}`;
    console.log(`Sending a GET reqeust to: ${failingUrl}`);
    const response = await axios.get(failingUrl, headers);
    console.log(response.data); //it will never reach here as get will hit a 404, it will go to the catch part
  } catch(err) {
    console.log(`Error message : ${err.message} - `, err.code);
    console.log(`Error response took ${err.durationInMs} milliseconds`);
  }
})();
```

This example demonstrates how interceptors can be used to add additional functionality to our requests and responses. By adding the duration it took for the request it can be logged to see how long each request has taken.

In the above code, first, you import the Axios instance. To use `import` in place of `require` you will need to add `"type": "module"` in your package.json file. Then you add the request interceptor and after that the response interceptor as explained in the previous section. Next, you define an [Immediately Invoked Function Expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) a.k.a IIFE to be able to use async/await. 

The async IIFE starts with a try, where you define a URL with a GitHub username `abraham` to call the GitHub API [User endpoint](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user). As the user `abraham` exists you will get a valid 200 response back and then you log the name and the company. After that, you also log the duration in milliseconds (ms) as it is calculated by the combination of the request and response interceptors.

Then you do a similar request but this time with a nonexistent username. This results in the code execution landing in the catch section as the request hits a 404 response which is evaluated as an error. There it logs the error message code and again the duration of the request as computed by the above-defined interceptors. The following code when executed with `node axios-interceptors` looks as follows:

<img class="center" loading="lazy" src="/images/axios-interceptors/02axios-interceptors-example.jpg" title="Output of Axios interceptors code example for logging request duration" alt="Output of Axios interceptors code example for logging request duration">

The response times will be dependent on multiple factors like your internet speed, the load Github API is getting at the moment, etc. The main thing to understand here is you have Axios interceptors that calculate the duration of the request.

The full working Node.js code is available as a [GitHub repository](https://github.com/geshan/axios-interceptors) or [JsFiddle](https://jsfiddle.net/geshan/0esr5uj1/2/) frontend code for your reference. You can view the console on JSFiddle too. In the next section, you will learn about other helpful usages of Axios interceptors, keep on reading.


## Other usages of Axois interceptors

Axios interceptors can also be used for other cases too. For instance, it can be utilized to refresh a JWT token when it expires. This can be useful for applications that require authentication for each request and need the token to be refreshed periodically without the user having to re-authenticate every time it expires. [Axios JWT](https://www.npmjs.com/package/axios-jwt) does this, it also stores, clears, transmits, and automatically refreshes JWT authentication tokens.

Another handy usage is to retry the request a certain number of times if it fails. There are a couple of NPM packages that do it already like [Axios Retry](/blog/2023/09/axios-retry/) and [Retry Axios](https://www.npmjs.com/package/retry-axios). Both of them have config objects with relevant options like the number of retries and back-off strategy.

There is even a library to log any Axios request as a curl command called [Axios curlize](https://www.npmjs.com/package/axios-curlirize). It also uses [request interceptors](https://github.com/anthonygauthier/axios-curlirize/blob/master/src/main.js#L13) to do the job. The possibilities are endless, you could write your own custom response interceptor to convert snake case to camel case when the response is received. I will leave where you want to exploit Axios interceptors to you.


## Conclusion

Axios interceptors are a powerful tool for making changes to requests and responses in a non-intrusive way where the code stays in a single place. They provide a way to modify and control the requests and responses that are sent and received by the application. In this guide, you have seen how interceptors can be used to add headers, modify requests, intercept responses, and log response times. 

You also learned about other helpful use cases where interceptors make your life easy like request retry and Auth token refresh. I hope you have learned about the use cases of Axios interceptors and can utilize this knowledge in relevant use cases in your application.
