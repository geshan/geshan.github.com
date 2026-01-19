---
layout: post
title: "Using Jest toHaveBeenCalledWith for testing primitive data types and partial objects"
date: 2022-07-29T23:15:42.000+11:00
comments: true
tags:
- Javascript
- Jest
- Software Engineering
cover: "/images/jest-tohavebeencalledwith/01jest-tohavebeencalledwith.jpg"
pagetitle: "Using Jest toHaveBeenCalledWith for testing primitive data types and partial objects"
description: You will learn how to use Jest toHaveBeenCalledWith to test both primitive types and partial objects.
keywords: jest tohavebeencalledwith, jest to have been called with

---
Jest is the [most used](https://2021.stateofjs.com/en-US/libraries/testing/) JavaScript testing framework. In this post, you will learn how to use Jest toHaveBeenCalledWith for testing various scenarios like a partial array, partial object, multiple calls, etc. Let’s get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/jest-tohavebeencalledwith/01jest-tohavebeencalledwith.jpg" title="How to add days to date in JavaScript" alt="How to add days to date in JavaScript">

## Table of contents

* [Prerequisites](#prerequisites)
* [Get books by subject example](#get-books-by-subject-example)
* [Jest tests for the script](#jest-tests-for-the-script)
    * [Jest toHaveBeenCalledWith primitive types](#jest-tohavebeencalledwith-primitive-types)
    * [Jest toHaveBeenCalledWith partial array and object](#jest-tohavebeencalledwith-partial-array-and-object)
    * [Jest toHaveBeenCalledWith multiple parameters](#jest-tohavebeencalledwith-multiple-parameters)
* [Conclusion](#conclusion)

## Prerequisites

Before going into the code, below are some great to-have essentials:

1. You should have prior experience with unit testing in JavaScript (on the browser or server with Node.js), the example will be in Node.js.
1. Any prior experience with Jest will be helpful.
1. Knowledge of [CommonJS modules](https://nodejs.org/api/modules.html#modules-commonjs-modules) will be beneficial. It is a bit different than the [ES modules](https://blog.logrocket.com/commonjs-vs-es-modules-node-js/) standard.
1. A general understanding of HTTP and response codes like 200, 500, etc is expected.
1. Knowing how async and promises work in JavaScirpt will be helpful.

As the requisites are stated, in the next section the example of pulling in book tiles by the subject to use Jest toHaveBeenCalledWith is introduced.

## Get books by subject example

To learn how to utilize Jest toHaveBeenCalledWith effectively, the example to get titles of books for a given subject will be used. You will witness a simple script that will call the `openlibrary.org` API with [Axios](https://github.com/axios/axios). It will use CommonJS modules to keep things simple and focus on the testing part. The whole code is available as a [GitHub repository](https://github.com/geshan/jest-tohavebeencalledwith) for your reference.

The main file is at `src/books.js` with the following contents:

```js
const axios = require('axios');
const helper = require('./helper');

async function getBooksBySubject (subject) {
  let data = [];
  try {
    const response = await axios.get(`https://openlibrary.org/subjects/${subject}.json`);
    data = response.data;

  } catch(err) {
    console.log(`Error getting books: ${err.message}`, err.stack);
  }
  
  return data;
}

async function getTitlesBySubject (subject) {
  const data = await getBooksBySubject(subject);
  
  return helper.pluckTitles(data);
}

module.exports = {
  getTitlesBySubject,
};
```

First, Axios and a local helper file are imported. Axios is used to make calls to the `openlibrary.org` API. Next, you define the `getBooksBySubject` function which takes `subject` as the parameter. In that function, the Open library API’s [Subjects endpoint](https://openlibrary.org/dev/docs/api/subjects) is called with the passed in the subject. For simplicity, no validations are done on the subject parameter coming in. If there is any error it is logged and empty data is returned, else the data from the API call is sent back to the caller.

The caller, in this case, is the `getTitlesBySubject` function which also takes in the `subject` parameter. It calls the `getBooksBySubject` method and passed the result into the `pluckTitles` method on the helper that was required at the top of the file.

Only the `getTitlesBySubject` function is exposed out from this module with `module.exports`. This is similar to making the `getTitlesBySubject` function public whereas the `getBooksBySubject` method can be regarded as a private method.

The content of the `src/helper.js` file is as follows:

```js
function pluckTitles (data) {
  if (!data.works || !data.works.length) {
    return [];
  }

  return data.works.map(book => book.title);
}

module.exports = {
  pluckTitles
}
```

The helper is simple, it has only one function `pluckTitles`. It could have been put in the `books.js` module but it has been moved to a helper file to make it easy to use Jest hasBeenCalledWith. The `pluckTitles` function checks if the data is available, if the data is not available it returns an empty array. In case the data is available, it loops through each “work” which is a representation of a book, and returns all the titles as an array with an [array map](/blog/2021/03/javascript-array-functions/#map).

The entry point to this script is at the root in a file named `index.js`, which looks like the below:

```js
const books = require('./src/books');

(async () => {
  const titles = await books.getTitlesBySubject('javascript');
  console.log(titles);
})();
```

The entry point `index.js` uses an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (Immediately Invoked Function Expression) with async await to call the `getTitlesBySubject` function on the books module. The IIFE had to be used as Node.js doesn’t have top-level async await yet. When the above `index.js` is run with `node index.js` it gives the following output:

<img class="center" loading="lazy" src="/images/jest-tohavebeencalledwith/02book-titles.jpg" title="Script to fetch book titles from open library API" alt="Script to fetch book titles from open library API">

As seen above, the script ran and it pulled the book's titles from the open library API for JavaScript. In the next section, you will learn how to write tests for the above script using Jest with a focus on toHaveBeenCalledWith.

## Jest tests for the script

Now, you will unit write tests to verify that the app works as expected. In the tests, the HTTP calls to the open library API will be intercepted and a canned response will be used with Jest SpyOn.

You will learn to add two tests, the first one for the happy path where the API responds without any error. The response can be empty too, for instance, if you search for a subject like `nonexistent` the API will respond correctly but the date (works array) will be empty as there will be no books for that subject.

The second test will be for the case where the API responds with an error.  For instance, their Cover API doc mentions “only 100 requests/IP are allowed for every 5 minutes.”, if the caller exceeds the limits API will respond with a `403 forbidden` status. So there will be a test to handle those kinds of scenarios.

The first test for the happy path is below:

```js
const books = require('../src/books');
const axios = require('axios');
const helper = require('../src/helper');

describe('Books', () => {
  describe('getTitlesBySubject', () => {
    it('should return book titles for given subject', async () => {
      const javascriptBooksData = {
        data: {
          ebook_count: 109,
          key: '/subjects/javascript',
          name: 'javascript',
          subject_type: 'subject',
          work_count: 109,
          works: [{
            key: '/works/OL15180797W',
            title: 'JavaScript: The Good Parts',
          }, {
            key: '/works/OL15180798W',
            title: 'JavaScript: The Definitive Guide',
          }]
        }
      };
      
      const asdfjBooksData = {
        key: "/subjects/asdfj",
        name: "asdfj",
        subject_type: "subject",
        work_count: 0,
        works: [],
        ebook_count: 0
      };
      const getSpy = jest.spyOn(axios, 'get')
        .mockResolvedValueOnce(javascriptBooksData)
        .mockResolvedValueOnce(asdfjBooksData);

      const pluckTitlesSpy = jest.spyOn(helper, 'pluckTitles')
        .mockReturnValueOnce(['JavaScript: The Good Parts', 'JavaScript: The Definitive Guide'])
        .mockReturnValueOnce([]);

      const titles = await books.getTitlesBySubject('javascript');
      expect(titles.length).toBe(2);
      expect(titles).toEqual(['JavaScript: The Good Parts', 'JavaScript: The Definitive Guide']);
      expect(titles).toEqual(expect.arrayContaining(['JavaScript: The Good Parts']));

      expect(getSpy).toHaveBeenCalled();
      expect(getSpy).toHaveBeenCalledWith('https://openlibrary.org/subjects/javascript.json');
      expect(getSpy).toHaveBeenCalledWith(expect.stringContaining('openlibrary.org'));

      expect(pluckTitlesSpy).toHaveBeenCalledTimes(1);
      expect(pluckTitlesSpy).toHaveBeenCalledWith(expect.objectContaining({
        name: 'javascript',
        works: expect.arrayContaining([
          expect.objectContaining({title: 'JavaScript: The Good Parts'}),
        ])
      }));

      const noTitles = await books.getTitlesBySubject('asdfj');
      expect(getSpy).toHaveBeenCalledTimes(2);
      expect(getSpy).toHaveBeenNthCalledWith(2, 'https://openlibrary.org/subjects/asdfj.json');
      expect(getSpy).toHaveBeenLastCalledWith(expect.stringContaining('asdfj'));
      expect(noTitles.length).toBe(0);
    });
  });  
});
```
It is a relatively big test, still, some extra `expects` have been added to show the elaborate usage of Jest toHaveBeenCalledWith. First, all three modules are pulled in with require. The system under test is `books` so the other two modules will be mocked for the unit tests.

Next, two `describes` list the module name and the function. Then the test starts with the `it` function that states `should return book titles for the given subject` which is our happy path. Notice that in the callback there is an async function as await will be used to call the `getTitlesBySubject` function.

After that, the `javascriptBooksData` const has a mock response for the get books by subjects API for the subject `javascript`. Similarly, the empty works array is used for the `asdfj` subject call. The `jest.SpyOn` with `mockResolvedValueOnce` will make sure that for the tests the API calls are interjected and a mock response is sent. These calls will never reach the real Open Library API. The `mockResolvedValueOnce` is used twice as there are two tests in this test, it will be regarded as a bad practice but for the sake of this guide, it will be used.

Similarly, the `pluckTitles` function is also spied on to respond with canned values. Consequently the `titles` constant is set by calling the unit under test `books.getTitlesBySubject` with `javascript`. After that, the `expects` are added to see if the responses are as expected. If the `class` keyword was used to write the script, [Jest beforeEach](/blog/2022/06/jest-beforeeach/) would be useful to test it.

The focus of this tutorial is on `toHaveBeenCalledWith`. Next, the usage of toHaveBeenCalledWith for primary data types is covered.


### Jest toHaveBeenCalledWith primitive types

To have been called within Jest checks that the function/mock has been called with some defined parameters. It can be used with [primitive data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#javascript_types) like string, integer, etc. For instance:

```js
expect(getSpy).toHaveBeenCalledWith('https://openlibrary.org/subjects/javascript.json');
expect(getSpy).toHaveBeenCalledWith(expect.stringContaining('openlibrary.org'));
```
Here the get method on Axios is expected to have been called with a string of `https://openlibrary.org/subjects/javascript.json`. Another way to do it can be to only check part of the string like `expect.stringContaining('openlibrary.org');`  expects the parameter to contain `openlibrary.org`. It would have also passed if `ht/openlibrary.org?a=b` was used. You can make the [stringContainig](https://jestjs.io/docs/expect#expectstringcontainingstring) checks as strict or lenient as you want.

If the function has been called more than once then the `toHaveBeenNthCalledWith` and `toHaveBeenLastCalledWith` can be used. If the function has been called 3 times and you want to validate the parameters for the second call it will be `toHaveBeenNthCalledWith(2, '<your-param-here>')` as seen above in the test with the nonexisting subject `'asdfj'`. Next, you will learn how to test a partial array and object using Jest toHaveBeenCalledWith.

### Jest toHaveBeenCalledWith partial array and object

When writing a unit test, you will not just test basic types like string, integer, or boolean. There will be cases where you have to validate arrays and objects (or even custom types/objects). If there is a large object with 20 attributes and for the context of the test only 2 have to be examined then  [expect.objectContaining](https://jestjs.io/docs/expect#expectobjectcontainingobject) is the right tool for the partial matching task. Similarly, if an array has 10 items and the test checks only one of them, it can be achieved by [expect.arrayContaining](https://jestjs.io/docs/expect#expectarraycontainingarray). 

You can see a relatively complex use of both of them in the above test, as:

```js
expect(pluckTitlesSpy).toHaveBeenCalledWith(expect.objectContaining({
  name: 'javascript',
  works: expect.arrayContaining([
      expect.objectContaining({title: 'JavaScript: The Good Parts'}),
    ])
  })
);
```

So here, the parameter is expected to be an object that has at least a `name` and `works` attribute. In the mock it has other properties as well like `key`, `work_count` etc, these properties are conveniently ignored as they are not needed for the unit test of the system/unit under test.

In terms of `expect.arrayContaining`, for the `works` property of the parameter, it is expected to be an array. An array that can have many elements but one of them will be an object that has a title of `JavaScript: The Good Parts`. Even here the other item in the array with the title `JavaScript: The Definitive Guide` has been deliberately ignored. Also, the `key` element in the book is also ignored with a partial match as it is not used in the code being tested with `objectContaining`. Another way to do it is by using [toMatchObject](https://jestjs.io/docs/expect#tomatchobjectobject) expect call.

### Jest toHaveBeenCalledWith multiple parameters

By now you have understood how the happy path is tested. Still, there is no test for the edge case error path when the API responds with a response that is not the HTTP 200 response code. Below is the test if the API responds with an error:

```js
it('should log error if any error occurs while getting books for the given subject', async () => {
  const getSpy = jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('too many requests'));
  const logSpy = jest.spyOn(console, 'log').mockImplementationOnce(() => {});
  const pluckTitlesSpy= jest.spyOn(helper, 'pluckTitles').mockReturnValueOnce([]);
  
  const titles = await books.getTitlesBySubject('javascript');
  expect(pluckTitlesSpy).toHaveBeenCalled();
  expect(titles.length).toBe(0);
  expect(getSpy).toHaveBeenCalled();
  expect(getSpy).toHaveBeenCalledWith('https://openlibrary.org/subjects/javascript.json');

  expect(logSpy).toHaveBeenCalledTimes(1);
  expect(logSpy).toHaveBeenCalledWith('Error getting books: too many requests',       expect.any(String));      
});

```
The test is titled `should log error if any error occurs while getting books for the given subject` which is self-explanatory. It is an async function similar to the previous test as `books.getTitlesBySubject` is called with an await to unwrap the promise.

The other `expect` calls are pretty similar to the above happy path test case except:

```js
expect(logSpy).toHaveBeenCalledWith('Error getting books: too many requests',       expect.any(String));
```

This is an example of Jest toHaveBeenCalledWith having more than 1 parameter. For this `expect` which will cover the `console.log` writing the error it has 2 parameters. The first one is a string with the exact value `Error getting books: too many requests`. The second parameter to `console.log` is expected to be any `String`. 

Console.log might not be the best option to log messages from your application. You can read the [Node.js logging libraries](/blog/2021/01/nodejs-logging-library/) post to have a streamlined logging solution.

If you run the test with `npm test` after cloning the [repository](https://github.com/geshan/jest-tohavebeencalledwith/) and doing `npm install` it will render the following output:

<img class="center" loading="lazy" src="/images/jest-tohavebeencalledwith/03jest-tohavebeencalledwith-run.jpg" title="Jest test run including to have been called with expects" alt="Jest test run including to have been called with expects">

You can see that both the tests have run and passed successfully. The tests can be seen as [Github Actions](https://github.com/geshan/jest-tohavebeencalledwith/actions) too.

Great! You have learned how to use Jest toHaveBeenCalledWith covering multiple use cases.

## Conclusion

In this tutorial about Jest toHaveBeenCalledWith you learned how to do the partial matching for object properties and array elements. You can also learn about [running a single jest test](/blog/2022/07/jest-run-single-test/) easily to target your specific test. 

First, a happy path was covered with tests. Then you wrote a test to verify how the code behaves in an edge case situation. Carry on testing!
