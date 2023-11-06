---
layout: post
title: How to use Axios with Typescript a beginner’s guide
date: 2023-11-07T22:43:57.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
- Web Development
cover: "/images/axios-typescript/01axios-typescript.jpg"
pagetitle: How to use Axios with Typescript a beginner’s guide
description: "Learn how to use Axios with Typescript and get the most followed user on GitHub, following this tutorial!"
keywords: axios typescript, typescript axios
---
Axios is one of the most popular HTTP client libraries for making requests to REST APIs in JavaScript and TypeScript applications. In this beginner's guide, you will learn at how to set up and use Axios with any TypeScript project to make API requests and get response data. Let’s get started!

<!-- more -->

<img class="center" src="/images/axios-typescript/01axios-typescript.jpg" title="How to use Axios with Typescript a beginner’s guide" alt="How to use Axios with Typescript a beginner’s guide">

## Table of contents

* [Axios introduction](#axios-introduction)
* [How to set up Axios with TypeScript](#how-to-set-up-axios-with-typescript)
* [Axios TypeScript example - most followed user on GitHub](#axios-typescript-example---most-followed-user-on-github)
* [Axios POST example with TypeScirpt](#axios-post-example-with-typescirpt)
* [Conclusion](#conclusion)


## Axios introduction

[Axios](https://axios-http.com/docs/intro) is a promise-based HTTP client for JavaScript that allows us to make requests to REST endpoints. It is isomorphic, meaning it can run in the browser and Node.js too. On the server-side it uses the native node.js HTTP module, while on the client (browser) it uses XMLHttpRequest.

Some key features of Axios include:

* Make XMLHttpRequests from the browser and Node.js
* Intercept requests and responses with [Axios interceptors](/blog/2022/12/axios-interceptors/)
* Transform request and response data
* Automatically convert JSON data
* Client side support for protecting against XSRF

Compared to the native [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) in JavaScript, Axios provides a simpler API and has built-in support for some commonly needed functionality like transforming JSON data. You can use [Axios retry](/blog/2023/09/axios-retry/) to retry failed requests with custom configuration. If you utilize [timeouts with Axios](/blog/2022/11/axios-timeout/) it will make your application more efficient.

Overall, Axios takes a lot of the complexity out of making HTTP requests and handling responses. It simplifies app code and reduces the need for boilerplate request/response handling logic. As per NPM trends (excluding Node fetch as fetch is part of Node core now), Axios is the [most popular](https://npmtrends.com/axios-vs-got-vs-request-vs-superagent) HTTP library with over 35 million weekly downloads which is greater than all 3 competitors (Got, Request, Superagent) combined. In the next, section you will get your hands dirty with code.

## How to set up Axios with TypeScript

Before you begin to install Axios in a Typescript project, you will need Node.js installed locally. For this tutorial, Node 20.x is used with Typescript 5.1. If you want a starting point with a bare-minimum TypeScript set up clone the example code repository in the `nvm-20` branch with the following command:

```bash
git clone -b nvm-20 git@github.com:geshan/axios-typescript.git
````

Now if you go into the directory with `cd axios-typescript` you can run the command below to install Axios (it is v 1.6 at the time of writing):

```bash
npm install axios
```

Now you can use Axios in your TypeScript project. In the next section, you will use Axios to find out who is the most followed user on GitHub using Axios.

## Axios TypeScript example - most followed user on GitHub

For this example, you will try to find out who is the most followed user on GitHub. For this you will need to call two GitHub APIs, the first one search for users with more than 60K followers and sort by followers. Then with the result pick the first user (as it is sorted by followers) and get the user from the get user API of GitHub.

You will do all the above using Axios in a TypeScript project and the code can be saved in `src/index.ts` file. The contents of the [file](https://github.com/geshan/axios-typescript/blob/master/src/index.ts) will look like the below:

```ts
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

const client = axios.create({
  baseURL: 'https://api.github.com',
});

type githubFoundUser = {
 login: string;
 id: number;
}

type githubUser = {
  login: string;
  id: number;
  followers: number;
}

(async () => {
  const config: AxiosRequestConfig = {
    headers: {
      'Accept': 'application/vnd.github+json',
    } as RawAxiosRequestHeaders,
  };
  const queryString: string = `q=${encodeURIComponent('followers:>=60000')}&sort=followers&order=desc`;
  try {
    const searchResponse: AxiosResponse = await client.get(`/search/users?${queryString}`, config);
    const foundUsers: githubFoundUser[] = searchResponse.data.items;

    const username: string = foundUsers[0].login;
    const userResponse: AxiosResponse = await client.get(`/users/${username}`, config);
    const user: githubUser = userResponse.data;
    const followersCount = user.followers;

    console.log(`The most followed user on GitHub is "${username}" with ${followersCount} followers.`)
  } catch(err) {
    console.log(err);
  }  
})();
```

Let’s go through the main points to note in this Axios TypeScirpt example with GitHub API calls:

* You create a client with `axios.create` giving it the base URL of the GitHub API
* Then you define two types, as it is TypeScirpt one for found GitHub users and the next one for a GitHub user.
* After that, you define an async Immediately Invoked Function Expression a.k.a [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) so that the code executes when the file runs and await can be used. Another way to do it can be with [top-level await](https://www.stefanjudis.com/today-i-learned/top-level-await-is-available-in-node-js-modules/).
* In this IIFE, you define an Axios config with a header of  `'Accept': 'application/vnd.github+json'` which is [recommended](https://docs.github.com/en/rest/overview/media-types?apiVersion=2022-11-28) in the GitHub API docs.
* Following that you construct a query string to search users that have more than 60K followers sorted by most followers first and in the try the GET request to find those users. ([9 users](https://github.com/search?q=followers%3A%3E%3D60000&type=Users) are found at the time of writing)
* Next you assign the returned `items` in `foundUsers` as an array of `githubFoundUsers` type
* Then you get the username of the first user (which should be `travolds` at the time of writing)
* The second get request is fired with the first user’s username (to get the followers count) and the response’s data is assigned to the user const of type `githubUser`.
* After that user’s number of followers is assigned to `followersCount` const.
* The message of the most followed user on GitHub is logged after that.
* In case of any error that is logged too as the whole code is in a try-catch block.

The output of the above code looks like the below when run with `npx ts-node src/index.ts`

```
The most followed user on GitHub is "torvalds" with 193729 followers.
```
So the most followed user on Github is Linus Travolds the creator of Linux with 193.7K followers. With this simple but useful example, you have the core knowledge of how to use Axios with TypeScript. In the next section, you will learn how to do a POST with Axios and TypeScirpt.

### Axios POST example with TypeScirpt

You can make other calls with Axios and Typescript in addition to a GET call. Below is an example of a POST call on HTTPbin where it will send back the same data sent in the POST body. You can save the file in `src/post.ts` file with the following contents:

```ts
import axios, { AxiosResponse, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

const client = axios.create({
  baseURL: 'https://httpbin.org',
});

(async () => {
  const config: AxiosRequestConfig = {
    headers: {
      'Accept': 'application/json',
    } as RawAxiosRequestHeaders,
  };

  try {
    const data = {'message': 'Hello World!'};
    const response: AxiosResponse = await client.post(`/post`, data , config);
    console.log(response.status);
    console.log(response.data.json);    
  } catch(err) {
    console.log(err);
  }  
})();
```

Let’s go through the main points to note in the above code.

Most things are similar to the above example. The main difference is in the lines:

```ts
    const data = {'message': 'Hello World!'};
    const response: AxiosResponse = await client.post(`/post`, data , config);
```

An HTTP POST call is made here and the data with a message of `Hello World!` is passed to the HTTP Bin API. The third parameter is the config which is adding a header with accept JSON. The output of the above code when run with `npx ts-node src/post.ts` look like the below:

```bash
200 
{ message: 'Hello World!' }
```

If you want to compile TypeScript to JavaScript you can add the following to the `scripts` sections of your `package.json` file:

```js
    "build": "tsc -p tsconfig.json",
    "start": "node dist/index.js",
```

Then you can run `npm run build && npm start` to see the output of the first example. You can find all the code for your reference in this [GitHub repository](https://github.com/geshan/axios-typescript/).

## Conclusion

That covers the basics of using Axios with TypeScript to make API calls and handle the response data. You have learned the basics of Axios and its types for making a GET and a POST call in a TypeScript environment. The example is executed on a Node.js environment but it should work the same on a browser too as Axios runs on both the server and the client. I hope you have learned the core and important knowledge of using Axios and TypeScript together, keep coding! 🚀
