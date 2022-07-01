---
layout: post
title: How to use JavaScript Promise.all with real-life code example
date: 2022-07-01T22:39:45.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
- Node.js
cover: "/images/javascript-promise-all/01javascript-promise-all.jpg"
pagetitle: How to use JavaScript Promise.all with real-life code example
description: Learn how to use JavaScript Promise.all with a real-life Axios API get call code example compared to a sequential call.
keywords: javascript promise all, promise all
---
Async execution and promises are not easy to understand in any language and JavaScript is no exception. In this post, we will dissect how JavaScript Promise.all function works visually and with a real-life code example, let’s get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/javascript-promise-all/01javascript-promise-all.jpg" title="Javascript Promise.all an illustration" alt="Javascript Promise.all an illustration">

## Table of contents

* [What is a JavaScript Promise](#what-is-a-javascript-promise)
* [Why use Javascript Promise.all](#why-use-javascript-promise.all)
* [How to use JavaScript Promise.all](#how-to-use-javascript-promise.all)
    * [Stack overflow practical search example with Axios](#stack-overflow-practical-search-example-with-axios)
    * [Prerequisites](#prerequisites)
    * [Call Stackoverflow sequentially with loop](#call-stackoverflow-sequentially-with-loop)
    * [Call StackOverflow API concurrently with Promise.all](#call-stackoverflow-api-concurrently-with-promise.all)
* [Conclusion](#conclusion)


## What is a JavaScript Promise

[Promise or Future](https://en.wikipedia.org/wiki/Futures_and_promises) (also called Delay and deferred) are not exclusive to JavaScript, other programming languages that support async processing or threads also have it. If you want to know [how async JavaScript works](https://youtube.com/watch?v=6MXRNXXgP_0) this talk about the event loop is a gem.

> As the name points out, a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is an object that will eventually have a value on the completion or failure of the asynchronous process.

In JavaScript, it is an object whose value is not known now when created, but it will be known when the async action comes back with a value possibly a successful one. A promise can be in one of these three states:

* pending: which is the initial state when the promise is created
* fulfilled: this state means that the operation has been completed with success.
* rejected: means the operation failed.

There are ways to run promises concurrently like Promise.race, Promise.any and Promise.all. In the next section, we will look into why use the JavaScript Promise all method.

## Why use Javascript Promise.all

JavaScript’s `Promise.all()` method takes in a parameter of iterable promises runs them concurrently then returns a single Promise that resolves to an array of results of the input promises. This returned Promise will only resolve if all the input promises have been resolved. If any one of the input promises gets rejected, the returned promise rejects immediately.

Let’s look at the case when all the input promises of a Promise.all pass, how would it look visually:

<img class="center" loading="lazy" src="/images/javascript-promise-all/02javascript-promise-all-visualized.gif" title="Javascript Promise.all visualized" alt="Javascript Promise.all visualized">

This is taken from the [Promise.all visualized](https://dangen-effy.github.io/Promise-all-visualized/index.html) page. As seen above, only when the last promise in the iterable promises is fulfilled does the aggregate result of Promise.all get resolved. In contrast, `Promise.race` would have been resolved as soon as the first promise was resolved. 

> So, it would be safe to say that `Promise.all` will take as long a the slowest promise to resolve and fail fast as soon as the first promise in the array fails.

It can be used to speed up your process. For example, if you have to get user profiles for 3 users, that is an independent task. So you can put the fetching 3 user profiles promises in an array and pass it to the `Promise.all` and await on it. Rather than doing it one by one, `Promise.all` will fetch it concurrently, it may speed up the task by 3 times. The caveat here is to be careful using it, especially with external resources like API or database calls.

> As the promises sent in as an iterable to the Promise.all are run concurrently, be very careful when using it for external resources like an API. The API might rate limit the calls and throttle the requests resulting in 403s.

Now you have been advised to use the powers of JavaScript Promise.all responsibly. Subsequently, we will see how to use Promise.all in action.

## How to use JavaScript Promise.all

We will use JavaScript Promise.all with a code example. We will search Stackoverflow questions with the language name in the title of the question. For this, we will use the [StackExchange Search API](https://api.stackexchange.com/docs/search). 

### Stack overflow practical search example with Axios

For this practical example, we will use the Axios npm library to make the calls to the Stack Exchange Search API. We will find the 5 latest questions for each programming language. The programming languages are javascript, typescript, php, python, java, ruby, go, rust, sql, and shell. Below is the outline of what we are going to do next:

1. Sequential calls: We will first call the API one programming language at a time with a loop.
1. Concurrent calls: then we will use Promise.all to execute all 10 calls concurrently which should speed up the fetching part.

As we know our goals now, let's get familiar with the prerequisites in the next section.

### Prerequisites

Below are a couple of prerequisites needed to understand the example better:
1. Working knowledge of JavaScript in the browser or node is required. The example will be executed with Node.js
1. Having used npm to install npm modules is helpful as we use Axios to make the requests 


In the subsequent section, we will get our hands dirty with some code. Show me the code :).

### Call Stackoverflow sequentially with loop

In the first variation of the example, we will loop through the programming language names and request the API endpoint one after the other consecutively. Below is the code to call the StackExchange Search API sequentially:

```javascript
const axios = require('axios');

(async () => {
  const stackExchangeApi = 'https://api.stackexchange.com/2.3/search?pagesize=5&order=desc&sort=activity&site=stackoverflow&intitle=';
  const terms = [
    'javascript', 'typescript', 'php', 
    'python', 'java', 'ruby', 
    'go', 'rust', 'sql', 'shell'
  ];
  const axiosWithLogs = getAxiosWithLogs();

  for(const term of terms) {
    try {
      const response = await axiosWithLogs.get(`${stackExchangeApi}${term}`);
      const date = new Date();
      console.log(`${date.toISOString()} - title sequential: `, response.data.items[0].title);
      console.log('---');
    } catch(err) {
      console.log(`error: `, err);
    }    
  }
})();

function getAxiosWithLogs() {
  axios.interceptors.request.use(request => {
    const date = new Date();
    console.log(`${date.toISOString()} - Calling URL: `, request.url);
    request.headers['request-startTime'] = date.getTime();

    return request;
  });

  axios.interceptors.response.use(response => {
    const startTime = response.config.headers['request-startTime'];
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - startTime;
    console.log(`Calling URL: ${response.config.url} took ${timeElapsed} ms`);
    return response;
  });

  return axios;
}
```

Let’s analyze what the above code is doing. First, we require the Axios npm package which can be installed by executing `npm i –save axios`. It is one of the most popular packages to do API calls with Javascript that works on both the browser and node.js.

After that, in a self-calling async function (IIFE) we initialize the URL of the stack exchange API to search for the latest 5 questions with a given keyword in the title on StackOverflow website. Next up, we define round 10 programming languages from `javascript` to `shell`. Then, we call the `getAxiosWithLogs` function that I am going to explain in a bit.

Now comes the interesting part, we loop through the array of terms/programming languages one by one and start making a `GET` call to the above API endpoint with the name of the programming language in the array. This is a sequential call as we await each call before logging the title of the first question.

This call is in a try-catch block so if any call fails, it will log the error. Now let’s understand the useful layers of interceptors we added to our Axios. [Interceptors](https://axios-http.com/docs/interceptors) in Axios are used to intercept the request or response before they are handled. 

In the `getAxiosWithLogs` function, first, we add a `request-startTime` header with the time of the request in milliseconds as well as log the request start. Then we return the request object. Similarly, we add another interceptor to the response, where we calculate the time taken for that request and log it. This will all make sense when we see the output later.

We will save the file as `sequential-requests.js` and run it with `time node sequential-requests.js` which will give us the following output:


<img class="center" loading="lazy" src="/images/javascript-promise-all/03sequential-calls.jpg" title="Javascript sequentially calling API endpoints" alt="Javascript sequentially calling API endpoints">
<center>

[view larger image](/images/javascript-promise-all/03sequential-calls.jpg-full.jpg)

</center>

The command `time` is prefixed on the script that actually runs `node` to know the time it takes for the script to finish. 

As we have seen the above code takes up to 8 seconds to execute. As each of the 10 requests, one for each language name is made consecutively and each request takes 715 ms to 1134 ms, it all adds up. This makes the script run in 8.076 seconds in total.

In the following section, we will get the same output by running the requests concurrently with `Promise.all` which will significantly speed up the data fetching process.

### Call StackOverflow API concurrently with Promise.all

As we saw, the sequential execution was not fast as such taking 8 seconds to call 10 APIs, now we will call all the 10 APIs concurrently with Promise.all. This is a good practical use case for JavaScipt Promise.all function. The code which will do the same thing but with Promise.all is as follows:

```javascript
const axios = require('axios');

(async () => {  
  const stackExchangeApi = 'https://api.stackexchange.com/2.3/search?pagesize=5&order=desc&sort=activity&site=stackoverflow&intitle=';
  const terms = [
    'javascript', 'typescript', 'php', 
    'python', 'java', 'ruby', 
    'go', 'rust', 'sql', 'shell'
  ];
  const axiosWithLogs = getAxiosWithLogs();

  const requests = terms.map(term => {
    return axiosWithLogs.get(`${stackExchangeApi}${term}`);
  });

  try {
    const responses = await Promise.all(requests);
    for(const response of responses) {
      const date = new Date();
      console.log(`${date.toISOString()} - title concurrent:`, response.data.items[0].title);
      console.log('---');
    }
  } catch(err) {
    console.log(`error: `, err);
  }
})();

function getAxiosWithLogs() {
  axios.interceptors.request.use(request => {
    const date = new Date();
    console.log(`${date.toISOString()} - Calling URL: `, request.url);
    request.headers['request-startTime'] = date.getTime();

    return request;
  });

  axios.interceptors.response.use(response => {
    const startTime = response.config.headers['request-startTime'];
    const currentTime = new Date().getTime();
    const timeElapsed = currentTime - startTime;
    console.log(`Calling URL: ${response.config.url} took ${timeElapsed} ms`);
    return response;
  });

  return axios;
}
```

We will name this file `concurrent-requests.js` and the code does the following things:

* Similar to the above sequential call, we first define the StackExchnage API endpoint without the keyword as a const.
* Then, we declare the terms which is an array of 10 programming languages’ names.
* After that we use the same Axios with logs that will log the request start time as well as the time taken for each API call
* At line 10-13 where we do `terms.map` is where the main difference starts, here we are looping through the terms array with a `map` but we are returning a promise with axiosWithLogs.get as there is no await before the call it just has a Promise object in a pending state.
* In the try-catch block, we use JavaScript Promise.all with the array of promises and await on it as it returns a Promise. This will fire up all the 10 API calls concurrently possibly within 5 milliseconds and will take as long as the slowest promise to be resolved.
* Once the responses are there which might be a maximum of 1.2 seconds (from our previous experience) it will loop through the response and similar to the above example log the first question’s title.
* Same as above if there is an error it will log the error and the `getAxiosWithLogs` function is exactly the same as above.

Now when we run this example with `time node concurrent-request.js`, it shows the below output:

<img class="center" loading="lazy" src="/images/javascript-promise-all/04javascript-promise-all-concurrent.jpg" title="Javascript promise.all concurrent calls to the endpoints" alt="Javascript promise.all concurrent calls to the endpoints">
<center>

[view larger image](/images/javascript-promise-all/04javascript-promise-all-concurrent-full.jpg)

</center>

As we can see, the same output now is achieved in 1.03 seconds. All the 10 requests were started within 2 milliseconds and the aggregated promise would have been resolved in 986 ms the call for `python` took the longest. After that date was fetched in 986 ms printing it took basically no time and the whole script was done in just 1.039 seconds.

> It is like 8 times faster now with the concurrent requests possible with Promise.all. The concurrent requests took 1.039 seconds in total compared to  8.067 seconds with the sequential requests.

The main caveat here is when working with external resources they will have a rate limit and if our app sends too many requests in a very short amount of time (say 10 milliseconds or even 1 second) the request will come back with HTTP 429 - Too many requests. Depending on the API they might even block your App’s IP address.

> Even if it is an internal resource like a database, it might run out of connection because one app is almost trying to DDOS the database with too many requests in a short amount of time.

 As a software engineer, you should be aware of what you are doing and what repercussions it can bring. Use Promise.all or Promise.allSettled wisely and in the right situation than abusing it which will also cause more issues than a solution.

All of the above code is available as [pull request](https://github.com/geshan/javascript-promise-all/pull/2) and an [open-source repository](https://github.com/geshan/javascript-promise-all/) on GitHub for your reference.

## Conclusion

We saw how to use `JavaScript Promise.all` to speed up the fetching time for data from external  API. It can also be used with internal resources or function in other files but be careful that running multiple things concurrently can be an issue for external as well as internal resources.
