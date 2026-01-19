---
layout: post
title: "How to mock Date in Jest: the easiest way without installing any extra NPM package"
date: 2024-09-26T19:48:37.000+11:00
comments: true
tags:
- Javascript
- Jest
- Software Engineering
cover: "/images/jest-mock-date/01jest-mock-date.jpg"
pagetitle: "How to mock Date in Jest: the easiest way without installing any extra NPM package"
description: "Learn to mock Date in Jest unit test in this simple to follow guide"
keywords: jest mock date, jest mock date now, jest mock date toISOString
---
When writing unit tests for your JavaScript code, especially when dealing with time-dependent functionalities, it's crucial to control and mock the behavior of the native `Date` object. This ensures that your tests are deterministic and produce consistent results regardless of the current date and time. In this guide, you'll learn the easiest way to mock `Date` in Jest without installing any extra NPM packages. This approach leverages Jest's built-in mocking capabilities with Fake timers and setting the system date, making it simple and efficient to control the time within your tests. Let’s get started!

<!-- more -->

<img class="center" src="/images/jest-mock-date/01jest-mock-date.jpg" title="How to mock Date in Jest: the easiest way without installing any extra NPM package" alt="How to mock Date in Jest: the easiest way without installing any extra NPM package">

## Table of contents

- [Introduction](#introduction)
- [Testing native Date functions is not easy](#testing-native-date-functions-is-not-easy)
- [Mock Date with Jest 26](#mock-date-with-jest-26)
- [Day of the year example](#day-of-the-year-example)
- [Test for the day of the year example](#test-for-the-day-of-the-year-example)
- [Other options to mock date in Jest](#other-options-to-mock-date-in-jest)
- [Conclusion](#conclusion)

## Testing native Date functions is not easy

Testing code that interacts with the native `Date` object can be challenging because the `Date` object is inherently dynamic. Its value changes with every passing millisecond, making it difficult to write deterministic tests. Imagine you have a function that shows the day of the year, if you run this function today (on 26-Sep) it will show 270 (out of 365) but if you run it tomorrow it will show 271 (out of 365). This means the test cannot be repeatable unless the system date is mocked and set to a defined date.

Furthermore, the native `Date` object is a global object in JavaScript, meaning that any changes made to it within one test can potentially affect other tests, leading to unexpected and inconsistent results. This can make debugging and troubleshooting your tests very hard. So how can we solve this issue, enter Fake timers, and set system date in Jest 26+, which is discussed next.

## Mock Date with Jest 26

[Jest](https://jestjs.io/) is the [most popular](https://2023.stateofjs.com/en-US/libraries/testing/) JavaScript testing framework. It provides powerful mocking capabilities that make it easy to control and manipulate the behavior of the native `Date` object within your tests. With [Jest 26](https://github.com/jestjs/jest/releases/tag/v26.0) (released in May-2020) and later versions, you can directly mock the `Date` object without relying on any external libraries or complex workarounds. This approach is simple, efficient, and ensures that your tests are deterministic and produce consistent results.

## Day of the year example

To illustrate how you can mock the Date object with Jest, let's use an example. You will create a simple yet useful function that will return the day of the year, so if you run it on 1-Jan it will return 1 and if you run it on 20-Dec it will return 354 (not taking into account Leap year for now). Simple enough right? You might think what the use case for this Year to Date - Day is, it can be used in various ways like the price chart below I got by searching “nvidia stock price” :

<img class="center" src="/images/jest-mock-date/02jest-mock-date-ytd.jpg" loading="lazy" title="Year to Date (YTD) used in stock price chart for Nvidia" alt="Year to Date (YTD) used in stock price chart for Nvidia">

It has a YTD option that shows the price from 2-Jan to today. It will be updated every day. So your task is to get the number of the day in the year.

To get this task done you will use JavaScript (Node.js) and the code can look like the below in a file named `dateHelper.js`:

```js
export function getDayOfYear() {
  const today = new Date(); //logic taken from https://stackoverflow.com/a/40975730 then modified
  const todayInMs = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()); //today in milliseconds
  const startOfYearInMs = Date.UTC(today.getFullYear(), 0, 0);
  const diffInMs = todayInMs - startOfYearInMs;
  
  const msInOneMinute = 1000 * 60;
  const msInOneHour = msInOneMinute * 60; 
  const msInOneDay = msInOneHour * 24;

  return  diffInMs  / msInOneDay;
}
```

It looks long but nothing complicated is happening in the above code, it was originally a one liner on a [Stack Overflow answer](https://stackoverflow.com/a/40975730), It has been modified to look like the above. 

First, you get today’s system date with `new Date()`, then you convert today’s date in milliseconds. Similarly, you convert the start of the year’s date to milliseconds. Then subtract those two by doing today’s date in milliseconds - start of the year in milliseconds. After that, you convert the difference which is in milliseconds to days, dividing it by `1000 * 60 * 60 * 24`, which has been illustrated in 3 lines to make it clearer. With this you get a number, for example, `270` if you run the above code on 26-Sep.

If you run this code with:

```js
import { getDayOfYear } from './src/dateHelper.js';

console.log(`Today is day ${getDayOfYear()} / 365 days of this year ${new Date().getFullYear()}.`);
```

It will give out:

```bash
Today is day 270 / 365 days of this year 2024.
```

The above code was run on 26-Sep. Next, you will write repeatable tests for the above `getDayOfYear` function that will pass not only today but on any day of the year.

## Test for the day of the year example

Now, to write a unit test for the above code with Jest it is straightforward. The issue is if you run the test tomorrow (27-Sep) your assertion of 270th day of the year fails. The date changes every day, so you can write a test like the day of the year is greater than 0 and less than 365 but that test is quite useless.

This is where the power of mocking the date, or say stubbing it to be one particular date comes very handy. To do this you can use the following unit test code:

```js
import { getDayOfYear } from '../src/dateHelper.js';

describe('dateHelper - Jest 26+', () => {
  //Jest 26 was released in May 2020, ref: https://github.com/jestjs/jest/releases/tag/v26.0.0
  describe('getDayOfYear', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-07'));
    });
    afterEach(() => {
      jest.setSystemTime(jest.getRealSystemTime());
      jest.useRealTimers();
    });

    it('should return 7 for 7-Jan as set with fake timers and system date', () => {      
      const result = getDayOfYear();
      expect(result).toBe(7);
    });    
  });
});
```

Keep this test file in the `test` folder named as `dateHelper.test.js`, the `dateHelper.js` file is in the `src` folder.

First, you import the `getDayOfYear` function from the module, yes this is ES6 import (not the common js require). Then you write the test code, the main point to consider here is in the [Jest beforeEach](/blog/2022/06/jest-beforeeach/) you stub/mock the date to `7-Jan-2024`. To do this you use, [Jest FakeTimers](https://jestjs.io/docs/timer-mocks#enable-fake-timers). With these timer mocks Jest can swap out timers with functions that allow you to control the passage of time. Then you set the system time to be `7-Jan-2024`. That is exactly what you need for your tests to be repeatable and reliable.

In the after each section for these tests, you reset the system time to be the actual time and also use real timers for the other tests outside that describe block. You certainly don’t want to mess up other tests outside that describe block and even that test file. 

When you run the above test it will show the following output:

<img class="center" src="/images/jest-mock-date/03jest-mock-date-test-run.jpg" loading="lazy" title="Results of the test run for Jest mock date" alt="Results of the test run for Jest mock date">

Now you run it today, tomorrow, or any day of the year it will still pass. Why? Because for that test the system date is always fixed to `7-Jan-2024` as the date has been mocked with fake timers and set system date in Jest to mock the real date.

You can find the full code in this [GitHub repository](https://github.com/geshan/jest-mock-date-example) for your reference.

## Other options to mock date in Jest

There are other options to mock the date in Jest. If you are using a Jest version of less than 26 you can use [Jest SpyOn](https://www.meticulous.ai/blog/how-to-use-jest-spyon#what-is-jest-spyon) to mock the global Date object. It is neither easy nor the code is clean but that is a way of doing it. Frankly, you should be using Jest 26+ as version 26 was released more than 4 years ago in May 2020

You can also use [jest-mock-date](https://www.npmjs.com/package/jest-date-mock) NPM package. Which has 270K+ downloads each week at the time of writing this. But if you can do it with Jest and fake timers/set system date, I think that opton is far better.

## Conclusion

In this guide, you've learned the easiest and most efficient way to mock the `Date` object in Jest without installing any extra NPM packages. This approach leverages Jest's built-in mocking capabilities, making it simple to control date/time within your tests with fake timers and set system date. You've also seen a practical example of how to use `Date` mocking to write deterministic tests for date-dependent code.

Go ahead, embrace Jest's `Date` mocking, and elevate your testing game to the next level!
