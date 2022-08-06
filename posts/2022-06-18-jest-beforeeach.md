---
layout: post
title: Using Jest beforeEach to write better unit tests in JavaScript, with code example
date: 2022-06-18T19:47:45.000+11:00
comments: true
tags:
- Javascript
- Jest
- testing
- Software Engineering
cover: "/images/jest-beforeeach/01jest-beforeeach.jpg"
pagetitle: How to use Jest beforeEach to write better unit tests with example code
description: Learn how to use Jest beforeEach to write better unit tests looking at
  given practial code example
keywords: jest beforeeach, beforeeach jest

---
Jest is one of the most popular testing frameworks in JavaScript. In this post, we will delve into using Jest beforeEach properly to make unit testing better with JavaScript, let’s get going!

<!-- more -->

<img class="center" loading="lazy" src="/images/jest-beforeeach/01jest-beforeeach.jpg" title="Jest before each with code example" alt="Jest before each with code example">

## Table of contents

* [More about Jest](#more-about-jest)
* [Jest beforeEach](#jest-beforeeach)
* [Prerequisites](#prerequisites)
* [Example of jest beforeEach](#example-of-jest-beforeeach)
    * [Simple Hacker News API client](#simple-hacker-news-api-client)
    * [Run the Hacker News API Client example](#run-the-hacker-news-api-client-example)
    * [Tests with jest beforeEach for the HN client](#tests-with-jest-beforeeach-for-the-hn-client)
* [Conclusion](#conclusion)

## More about Jest

Jest brands itself as a delightful JavaScript Testing Framework with a focus on simplicity. It works both on the backend (Node.js) and frontend libraries like React, Angular, Vue, and more. It also has mocking and code coverage out of the box. Started and maintained by Facebook, Jest is very useful for UI-based tests with [Snapshot testing](https://jestjs.io/docs/snapshot-testing).

## Jest beforeEach

BeforeEach in Jest is part of the [setup and teardown](https://jestjs.io/docs/setup-teardown) process. As the name suggests, if we want to run a function or some other code repeatedly “before each” test that code can be put in the beforeEach function.

Similarly, jest also has `afterEach` function that will run a piece of code every time a test has completed running a.k.a tear down. If we want to run some code only once before all the tests run, Jest has `beforeAll` function for that purpose.

If you are wondering about how to scope multiple levels of beforeEach and the sequence of execution, the official [docs](https://jestjs.io/docs/setup-teardown#scoping) do a great job of explaining it. The example of `beforeEach` on the official docs with loading the database doesn’t seem the cut the chase for explaining its usage well.

Next up, we will look at a practical example of getting the latest stories from HackerNews and writing tests for it using jest beforeEach after getting through the prerequisites.

## Prerequisites

To understand the example given below better for this tutorial, it would be best to know the following things:

1. Having general knowledge how of Node.js and NPM work will be helpful
1. Have basic knowledge of how Jest works in general and write simple tests with Jest
1. Knowing how Github works will be useful to navigate through the code example on Github
1. A general understanding of promises and async-await will be beneficial but not required

It's time to dabble with some code now :).

## Example of jest beforeEach

For this guide, we will use an example of getting the latest stories from the unofficial HackerNews API provided by Algolia. Below is our Hacker news client that uses [Axios](https://github.com/axios/axios) to get the latest story on Hackernews for any given keyword, if no keyword is provided it will fetch all the latest stories:


### Simple Hacker News API client 

```js
module.exports = class HnClient {
  constructor(axios) {
    axios.defaults.baseURL = 'https://hn.algolia.com/api/v1';
    this.axios = axios;
  }

  async getLatestStories(keyword = '') {
    try {
      const response = await this.axios.get(`/search_by_date?query=${keyword}&tags=story`);
      return response.data?.hits || [];
    } catch(e) {
      console.log(`Error while getting stories ${e.message}`, e);
      return [];
    }    
  }
}
```

The above client is written as a Class and exported to be used by any other file that requires it. It has a constructor that expects an Axios instance to be passed in. This helps with testing as the dependency can be easily mocked. In the constructor, it sets the `baseURL` of the Axios instance and sets it in the class scope.

Next up, there is a `getLatestStories` method which is async and takes in a parameter called `keyword`. This method makes a `get` call to the `search_by_date` endpoint on the unofficial hacker news API set as the base URL in the constructor. It also passes the query and tags parameters for the API endpoint as stated in their [docs](https://hn.algolia.com/api).

If the `response.data` is received and it has the `hits` property that will be returned which is an array of stores else and empty array `[]` is returned to the caller.

Furthermore, to make the method resilient to any failure calling the Algolia HackerNews (HN) API if any error occurs, it will land in the catch block and log the error then return an empty array. In the next section, we will see how to execute the above class to see sample output.

### Run the Hacker News API Client example 

The above code an be quickly seen in action by executing the following:

```js
const HnClient = require('./src/hnClient');
const axios = require('axios');

const keyword = process.argv[2];
(async () => {
  const hnClient = new HnClient(axios);
  console.log(`keyword: `, keyword);

  const stories = await hnClient.getLatestStories(keyword);
  console.table(stories.map(story => {
    const { title, author } = story;
    return {title, author};
  }));  
})();
```

It can be run with `node index.js javascript` given the file is named as such and the `HnClient` class is saved in the `src` folder. The index.js uses an IIFE to call instantiate the `HnClient` class with an Axios instance and logs the title and author of the story as a table in the console which looks like the below:

<img class="center" loading="lazy" src="/images/jest-beforeeach/02jest-beforeeach-run.jpg" title="Example output for Jest BeforeEach test run" alt="Jest before each with code example">

As seen the `javascript` parameter passed in the command line is passed till the API call and the latest 20 stories are pulled in from the API and logged on the console as a table with the story title and author.

### Tests with jest beforeEach for the HN client

Let’s write some tests for the `HnClient` class we have written with the use of jest beforeEach which will make testing the class easier. There are [two types of tests](/blog/2016/03/there-are-only-two-types-of-automated-software-tests/) fast ones (unit) and not fast ones (integration), we will write unit tests for this guide.

Below is the bare-bones unit test case for the happy path where we expect to get the latest stories for a given keyword:

```js
const HnClient = require('../src/hnClient');
const log = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('HnClient', () => {
  let axiosMock = {
    defaults: {},
    get: jest.fn(),
  };
  let hnClient;

  beforeEach(() => {
    hnClient = new HnClient(axiosMock);
  });

  describe('getLatestStories', () => {
    it('should return an array of stories for given keyword', async () => {
      const returnedStories = [
        {
          created_at: '2022-06-17T13:47:57.000Z',
          title: 'Qwik and Partytown: How to remove 99% of JavaScript from main thread',
          url: 'https://www.youtube.com/watch?v=0dC11DMR3fU',
          author: 'barisx',         
        },
        {
          created_at: '2022-06-17T09:59:00.000Z',
          title: 'Prepack – A tool for making JavaScript code run faster',
          url: 'https://prepack.io/',
          author: 'longrod',         
        },      
      ];
      axiosMock.get = jest.fn().mockResolvedValueOnce({ data: { hits: returnedStories } });

      const stories = await hnClient.getLatestStories('javascript');

      expect(axiosMock.defaults.baseURL).toBe('https://hn.algolia.com/api/v1');
      expect(axiosMock.get).toHaveBeenCalledWith('/search_by_date?query=javascript&tags=story');
      expect(stories).toBeInstanceOf(Array);
      expect(stories.length).toBe(2);
      expect(stories[0]).toHaveProperty('title');
      expect(stories[0].title).toBe('Qwik and Partytown: How to remove 99% of JavaScript from main thread');
      expect(stories[1]).toHaveProperty('url');
      expect(stories[1].url).toBe('https://prepack.io/');
    });
  });
});
```
We have written only one test for the `getLatestStories` method the happy path of getting data back from the HN Algolia API. [Jest spyOn](https://meticulous.ai/blog/how-to-use-jest-spyon/) has been used to spy on the log so that logs will be supressed and not visible on the console. You can also learn about [Jest toHaveBeenCalledWith](/blog/2022/07/jest-tohavebeencalledwith/) to understand it better.

We have instantiated the system under test (SUT) here as `hnClient` and used it later in the test. Doing it in the before each doesn’t really help us till now.

Some assertions like `toBe` are pretty similar to [PHPUnit assertions](/blog/2021/01/phpunit-assertions/#some-phpunit-assertions-you-must-start-using-today) if you are familiar with them.

Lets add another test to see the milage we get from jest beforeEach:

```js
it('should return an empty array if no stories are found', async () => {
  axiosMock.get = jest.fn().mockResolvedValueOnce({});

  const stories = await hnClient.getLatestStories();

  expect(stories).toBeInstanceOf(Array);
  expect(stories.length).toBe(0);
 });
```

In this test, we are testing the case of, if no data is returned from the API it should still return an empty array. Now as we can see, we are reusing the `hnClient` defined in the `beforeEach` if it was not instantiated in the before each then we would need to do it here for this test case again. 

> Image if `hnClient` has 5 dependencies instead of 1, that would be a fair amount of setup and no. of lines to code to repeat in each test. 

This is where `beforeEach` shines if there is a need to execute some set lines of code before each test execution it can be put in the beforeEach section and done.

We can add another test case to test the scenario when the API throws and error and the execution lands in the catch part of the code as follows:

```js
it('should handle any error and return empty stories array', async () => {
  axiosMock.get = jest.fn().mockRejectedValueOnce(new Error('server down'));

  const stories = await hnClient.getLatestStories('python');
  expect(log).toHaveBeenCalledWith(expect.stringContaining('server down'), expect.anything());
  expect(stories).toBeInstanceOf(Array);
  expect(stories.length).toBe(0);
});
```

Even here we are conveniently using the `hnClient` instantiated properly in the beforeEach which has the needed dependency of the Axios instance. We are adjusting the axiosMock’s `get` method to throw an error as a promise rejection and that does the job. This is the power and ease of using beforeEach properly that makes writing tests much better and easier.

With the above 3 tests, we will have 100% code coverage that can be seen by running:

```
npm run test:cov
```

The above common is mapped to `jest –coverage` and as jest has a built-in code coverage it gives the following output:

<img class="center" loading="lazy" src="/images/jest-beforeeach/03jest-beforeeach-code-cov.jpg" title="Example output for Jest BeforeEach test code coverage" alt="Jest before each code coverage">

You can find the full code of this project in this [GitHub repository](​​https://github.com/geshan/simple-hn-client) and the most important parts of the example in this [pull request](​​https://github.com/geshan/simple-hn-client/pull/2/files).


## Conclusion

We have learned how to use jest BeforeEach in this tutorial to make the JavaScipt tests better and easier to write with optimal code reuses in tests.

> I hope this helps you write even better tests with JavaSciprt be it for Node.js (Backend) or other frontend frameworks/libraries like React, Vue, or any other.

Keep writing headache-saving tests :).
