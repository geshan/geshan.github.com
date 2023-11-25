---
layout: post
title: "Jest mock implementation: A beginner’s guide to replacing function implementation for tests"
date: 2023-11-25T22:43:54.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
cover: "/images/jest-mockimplementation/01jest-mockimplementation.jpg"
pagetitle: "Jest mock implementation: A beginner’s guide to replacing function implementation for tests"
description: "Learn how to use jest mock implementation with a practical example to guess nationalities by name, in this tutorial!"
keywords: jest mockimplementation, jest mock implementation, jest mockimplementationonce
---
Jest Mock Implementation is a technique that lets you replace the internal logic of a function with a custom implementation during test execution. This can be immensely helpful in scenarios where you want to isolate a specific piece of code for testing without affecting the behavior of other components. In this blog post, you will learn how to use Jest Mock Implementation and how to leverage it effectively. Let’s get started!

<!-- more -->

<img class="center" src="/images/jest-mockimplementation/01jest-mockimplementation.jpg" title="Jest mock implementation: A beginner’s guide to replacing function implementation for tests" alt="Jest mock implementation: A beginner’s guide to replacing function implementation for tests">

## Table of contents

* [Jest Mock implementation an intro](#jest-mock-implementation-an-intro)
* [When to use Jest mockImlementation](#when-to-use-jest-mockimlementation)
* [How to use mockImplementation with Jest](#how-to-use-mockimplementation-with-jest)
    * [Example with Process exit and console](#example-with-process-exit-and-console)
    * [Tests using Jest mockImplenentation.](#tests-using-jest-mockimplenentation)
* [Conclusion](#conclusion)

## Jest Mock implementation an intro

[Jest mockImplementation](https://jestjs.io/docs/mock-function-api#mockfnmockimplementationfn) enables developers to replace the original implementation of a function with a mock function, allowing them to control the function's behavior and verify specific interactions. This technique proves particularly beneficial when testing code that interacts with external dependencies, such as APIs, databases, or filesystem operations.

Jest mockIementaiton accepts a function that will replace the real implementation. You can also use [Jest mockimplemantationOnce](https://jestjs.io/docs/mock-function-api#mockfnmockimplementationoncefn) to only mock the implementation once. For example,  if the same function is called three times you can call `mockFn.mockImplemenationOnce` two times to get the mock result and the last call and execute the real function. You will see this in the example in the later section. In the next part, you will learn when to use Jest mockImplementaiton.

## When to use Jest mockImlementation

Jest mockImplementation can be used in multiple scenarios, it is especially useful when used with [Jest spyOn](https://www.meticulous.ai/blog/how-to-use-jest-spyon). Still, there are other useful scenarios when mockImplementation can be used.

Without going into much detail, Jest mockImplentation is practical when you want to mock and test internal or external dependencies (like Axios), simulate error conditions, and test for the specific error case (like an API returning a 404 for instance). It is also handy to control the function output as needed and also isolate the system under test. In the next section, you will learn about how to use Jest mockImplenentation and Jest mockImplementationOnce with an example script that guesses Nationality from a given name.

## How to use mockImplementation with Jest

As mentioned there are multiple use cases of Jest mockImplemenation. It can be used to do basic mocking, mocking modules, mocking promises, etc. For this tutorial, you will see a simple yet useful example where given a name the script will guess the nationalities of the name with a probability percentage.

To achieve this, you will use the [Nationalize.io API](https://nationalize.io/#overview) to send in the name and get back the percent probability of the nationalities. Technically you will use Node.js 20.x (to use top level await) and utilize the [Axios](https://axios-http.com/) library to make the HTTP calls and of course, [Jest](https://jestjs.io/) for unit testing. Let’s go ahead!

### Example with Process exit and console

Below is the example script ([src/nationalityGuesser.js](https://github.com/geshan/jest-mockImplementation/blob/master/src/nationalityGuesser.js)) that does the main work, you can see the full code in this open-source [GitHub repository](https://github.com/geshan/jest-mockImplementation): 

```js
import axios from 'axios';

export async function guessNationalities(name) {
  try {
    const response = await axios.get(`https://api.nationalize.io/?name=${name}`);
    const hasCountryData = response?.data?.country && response.data.country.length;

    console.log(`Nationalities for the name ${name} are: ${hasCountryData ? response.data.country.map(c => `${c.country_id} - ${c.probability * 100}%`).join(', ') : 'none'}`);
    console.log('Done!');
  } catch (err) {
    console.error(`Error occurred: ${err.message}`, err.stack);
    process.exit(1);
  }
}
```

It is a simple script that imports Axios, then in the async function called `guessNationalites` takes in the name to guess the nationalities for. After that in the try block it sends a request to the Nationalize API with the name and if the country data is received loops through it and shows the output in the console. Then it also console logs `Done!`.

In case of any error, it will jump to the catch section and log the error then exit the process with an exit code of 1. By default for successful execution, the [exit code](https://www.cyberciti.biz/faq/linux-bash-exit-status-set-exit-statusin-bash/) is 0. This is how it looks like when executed with the name `john`.

<img class="center" src="/images/jest-mockimplementation/02jest-mockimplementation-run.jpg" title="Jest mock implementation example run for name and nationalities guesser script" alt="Jest mock implementation example run for name and nationalities guesser script">

So the API responds with `john` is 7.5% Irish, 5.5% Kenyan, 4.9% British and other nationalities. Next you will learn about the test for the above script.

### Tests using Jest mockImplenentation.

You can write test ([tests/nationalityGuesser.spec.js](https://github.com/geshan/jest-mockImplementation/blob/master/test/nationalityGuesser.spec.js)) for the above file which will look like the below:

```js
import { guessNationalities } from '../src/nationalityGuesser.js';
import axios from 'axios';
jest.mock('axios');

describe('guessNationalities', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    //without the above reset, in the second test it will take axios.get as the second call
  });
  it('should return the nationality based on the name', async () => {
    const name = 'john';
    const consoleLog = jest.spyOn(console, "log").mockImplementationOnce(() => { });

    axios.get.mockResolvedValue({
      data: {
        count: 2346926,
        name: 'john',
        country: [
          { country_id: 'IE', probability: 0.075 },
          { country_id: 'KE', probability: 0.055 },
          { country_id: 'GB', probability: 0.049 },
          { country_id: 'PH', probability: 0.045 },
          { country_id: 'AU', probability: 0.045 }
        ]
      }
    });

    await guessNationalities(name);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://api.nationalize.io/?name=john');

    expect(consoleLog).toHaveBeenCalledTimes(2);
    expect(consoleLog).toHaveBeenNthCalledWith(1, 'Nationalities for the name john are: IE - 7.5%, KE - 5.5%, GB - 4.9%, PH - 4.5%, AU - 4.5%');
    expect(consoleLog).toHaveBeenNthCalledWith(2, 'Done!');
  });

  it('should handle errors and exit gracefully', async () => {
    const name = 'error';

    const processExit = jest.spyOn(process, 'exit').mockImplementation(() => { });
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => { });
    axios.get.mockRejectedValue(new Error('API error'));

    await guessNationalities(name);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://api.nationalize.io/?name=error');
    expect(consoleError).toHaveBeenCalledTimes(1);
    expect(consoleError).toHaveBeenCalledWith('Error occurred: API error', expect.any(String));
    expect(processExit).toHaveBeenCalledTimes(1);
    expect(processExit).toHaveBeenCalledWith(1);
  });
});
```

Let's understand what the test is doing and how Jest mockImlementation is crucial to it. First, you import the module to test that is `nationalityGuesser`. Then you import axios and in the next line mock the whole [module](https://jestjs.io/docs/mock-functions#mocking-modules).

Consequently, you start the `describe` part of the test with the name of the module under test. After that, you add the [Jest beforeEach](/blog/2022/06/jest-beforeeach/) which as the name suggests runs before each test. Here, you call the `jest.ResetAllMocks()` to reset the mocks for each test so that older calls made for previous tests do not affect the current test.

Next, you write the first test that checks `should return the nationality based on the name` which is an async function as await will be used in that test. You set the name to test to be `john`, then spy on the `console.log` method, you add the `mockImplentationOnce` which only mocks the first call to `console.log` the subsequent calls will work as usual and print the message on the real console. This is seen later when you run the test.

After that, you add a mock response from nationalize API for the name `john` in the `mockResolvedValue` of `axios.get` call. Till this point it is the Arrange part of the [Arrange Act Assert](https://automationpanda.com/2020/07/07/arrange-act-assert-a-pattern-for-writing-good-tests/) pattern followed for good unit tests.

Then, you call the `guessNationalities` function passing `john` with an await. After the act, the asserts start next. First, you assert that `axios.get` is called once and is called with the right string. For this you use [Jest toHaveBeenCalledWith](/blog/2022/07/jest-tohavebeencalledwith/) and make sure the right URL of  `https://api.nationalize.io/?name=john` is sent to `axios.get`. Subsequently, you make sure that the `console.log` is called twice and also check that the parameters passed to it on both occasions are as expected.

You can also run a [single test with jest](https://geshan.com.np/blog/2022/07/jest-run-single-test/) using the `-t` flag like:

```bash
npm t -- -t 'should return the nationality based on the name'
```

It will run only the first test and skip the second one as seen below:

<img class="center" src="/images/jest-mockimplementation/03jest-mockimplementation-single-test-run.jpg" title="Jest mock implementation run single jest test" alt="Jest mock implementation run single jest test">

There is one more thing to put careful consideration here, the console shows `Done!` but it does not show the `Nationalities for the name john…` line. It is because of the line:

```js
const consoleLog = jest.spyOn(console, "log").mockImplementationOnce(() => { });
``` 
Due to this the first call to `console.log` was mocked but the second call was not mocked resulting in printing the `Done!` on the screen.

Next, you have added a test titled `should handle errors and exit gracefully`. In this test the most interesting part is mocking the `process.exit`:

```js
const processExit = jest.spyOn(process, 'exit').mockImplementation(() => { });
```

If you do not do this, it will exit the `jest` process and not run the test fully. With this important mock implementation the `process.exit` does nothing, which means the `jest` process completes the test. You can run your test with `npm test` or `npm t` on the root of the project. Which looks like the below:

<img class="center" src="/images/jest-mockimplementation/04jest-mockimplementation-test-run.jpg" title="Jest mock implementation run all jest test" alt="Jest mock implementation run all jest tests">

The other mocks and assertions in this second test are the same as the above one. In place of the `console.log` it mocks the `console.error` as this test case only has an error call and no log calls. If you want to get the code coverage you can run `npm run test:cov`. There you have it, now you know how to use both `mockImplementation` and `mockImplementationOnce` with Jest tests.

## Conclusion

Jest Mock Implementation is a powerful tool that enhances the effectiveness of your tests by allowing you to control and isolate specific parts of your code. Knowing when and how to use Jest Mock Implementation is crucial for writing repeatable and reliable tests. By replacing original function implementations with mock functions, developers can verify specific interactions, simulate error conditions, and effectively test code that interacts with external dependencies. 

In this tutorial, you learned what Jest mock implementation is and when to use it. Then you witnessed a full example of how to use it with a script that guesses Nationalities for a given name.  Whether you're a seasoned developer or a beginner, mastering Jest mockImplementation will significantly enhance your testing capabilities and contribute to the creation of high-quality software. Keep testing! 🚀
