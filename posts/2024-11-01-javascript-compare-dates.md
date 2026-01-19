---
layout: post
title: "A Beginner's Guide to Comparing Dates in JavaScript"
date: 2024-11-01T23:32:47.000+11:00
comments: true
tags:
- Javascript
- Web Development
cover: "/images/javascript-compare-dates/01javascript-compare-dates.jpg"
pagetitle: "A Beginner's Guide to Comparing Dates in JavaScript"
description: "Learn how to compare dates in JavaScript natively and with the date-fns NPM package in this useful guide."
keywords: javascript compare dates, compare dates in javascript, javascript date comparison, date comparison in javascript, javascript date comparison library, date-fns, date-fns npm package, date-fns library, date-fns javascript, date-fns compare dates
---
Working with dates and times is a common task in software development.  In JavaScript, you have the built-in `Date` object, but it can be a bit cumbersome and has its quirks. There are third-party libraries like `date-fns` to help manipulate and format dates in JavaScript. However, the fundamental task of comparing two dates can be quickly done using the built-in methods, as you will learn in this post. You will start from the basics and move to use a third-party library, `date-fns`, for date comparison in JavaScript. Buckle up!

<!-- more -->

<img class="center" src="/images/javascript-compare-dates/01javascript-compare-dates.jpg" title="A Beginner's Guide to Comparing Dates in JavaScript" alt="A Beginner's Guide to Comparing Dates in JavaScript">

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Directly Compare JavaScript Date objects](#directly-compare-javascript-date-objects)
- [Compare Dates using the getTime method](#compare-dates-using-the-gettime-method)
- [Dates comparison with date-fns](#dates-comparison-with-date-fns)
  - [Compare Dates with compareAsc](#compare-dates-with-compareasc)
  - [Other useful date-fns functions](#other-useful-date-fns-functions)
- [Conclusion](#conclusion)

## Introduction

JavaScript has a `Date` object representing a single moment in time in a platform-independent format. This is achieved by representing the date object with a number with milliseconds since 1 January 1970 UTC. 

JavaScript provides multiple ways to compare dates:

* **Direct Comparison:**  You can directly compare `Date` objects using comparison operators like `>`, `<`, `>=`, `<=`, but this method can be unreliable in some instances.

* **getTime() Method:** The `getTime()` method returns the number of milliseconds since the Unix epoch (seconds that have elapsed since 00:00:00 UTC on 1 January 1970), making it reliable for comparing dates.

* **Using Libraries:** Third-party libraries like `date-fns` provide convenient functions for comparing dates, including `isBefore`, `isAfter`, `isEqual`, `compareAsc`, etc. Other popular date-related JavaScript libraries include Moment.js and Luxon. As per [NPM trends](https://npmtrends.com/date-fns-vs-luxon-vs-moment) `date-fns` is the most popular one, with more than 23 million downloads per week at the time of writing this blog post.

In this guide, you will explore examples of all of the above methods. You will also learn about the best practices for comparing dates in JavaScript. 

## Prerequisites

To follow along with the provided code examples in this post, you will need the following:

* **Node.js 22:** The code in this tutorial uses the latest features of Javascript/Node.js, hence it is advisable to have the newest version installed on your machine.
* **A code editor:** Any code editor that you are comfortable with will do. I have used VS Code for this tutorial, you can use any editor you choose. 
* **General knowledge of JavaScript:** This tutorial requires a basic understanding of how JavaScript works.

It is also helpful to have the following:

* **NPM or Yarn:** Node Package Manager will be needed if you want to install `date-fns`.
* **Git and Github:** You should know how to clone, commit, and push your changes to a Git repository on GitHub or similar service.

Let's get started!

## Directly Compare JavaScript Date objects

You can directly compare JavaScript Date objects using comparison operators like `<`, `>`, `>=`, `<=`, and `===`. This is the easiest and most straightforward method to compare dates.

However, using these operators can lead to unpredictable results in certain scenarios due to how `Date` objects work internally, such as when considering time zones. You will see that in the example below:

```js
const date1 = new Date('2024-11-01');
const date2 = new Date('2024-10-01');
const date3 = new Date('2024-11-02');

console.log(`date1: ${date1}`);
console.log(`date2: ${date2}`);
console.log(`date3: ${date3}`);

const date1Iso = date1.toISOString();
const date2Iso = date2.toISOString();
const date3Iso = date3.toISOString();

// Comparison results
console.log(`================== Comparison results ==================`);
const comparisonTable = [
  ['date1 < date2', `${date1Iso} < ${date2Iso}`, date1 < date2],
  ['date1 > date2', `${date1Iso} > ${date2Iso}`, date1 > date2],
  ['date1 <= date2', `${date1Iso} <= ${date2Iso}`, date1 <= date2],
  ['date1 >= date2', `${date1Iso} >= ${date2Iso}`, date1 >= date2],
  ['date1 === date2', `${date1Iso} === ${date2Iso}`, date1 === date2],
  ['date1 < date3', `${date1Iso} < ${date3Iso}`, date1 < date3],
  ['date1 > date3', `${date1Iso} > ${date3Iso}`, date1 > date3],
  ['date2 === date2', `${date2Iso} > ${date2Iso}`, date2 === date2],
]
console.table(comparisonTable);
```

When you run the above script with `node index.js` it will show the following output:

<img class="center" src="/images/javascript-compare-dates/02javascript-compare-date-objects.jpg" loading="lazy" title="Directly compare JavaScript Date objects" alt="Directly compare JavaScript Date objects">

One issue that can happen here is, if the date is created with `new Date()` and another date is created with `new Date()` after 2 seconds those two dates will not match. Also time zones will be another consideration to make for comparing date objects.

For reliable comparison, always use the getTime() method discussed in the
next section.

## Compare Dates using the getTime method

For a reliable date comparison in JavaScript, it is recommended to use the `getTime()`
method available on the `Date` object. This is because when you compare `Date` objects directly, they are compared based on references, not their actual value. Even with the `getTime()` method you will need to consider time zones, the easiest way to do it will be to convert all the dates to UTC timezone and then only do the date/time comparison. 

**The `getTime()` method:**

- Returns the number of milliseconds that have elapsed since the Unix epoch (January 1, 1970, at 00:00:00 UTC).
- Provides a consistent numerical representation of a date that's suitable for direct comparison.
- Even with `getTime` do keep the time zone issue in mind, [5 AM in London is 4 PM in Sydney](https://www.worldtimebuddy.com/?qm=1&lid=2147714,2643743&h=2147714&date=2024-11-1&sln=16-16.5&hf=1), also think about the date changes and day light savings.

The example below shows how to compare dates using the `getTime()` method to make it
more reliable:

```js
const date1 = new Date('2024-11-01');
const date2 = new Date('2024-10-01');
const date3 = new Date('2024-11-02');

console.log(`date1: ${date1}`);
console.log(`date2: ${date2}`);
console.log(`date3: ${date3}`);

const date1Epoch = date1.getTime();
const date2Epoch = date2.getTime();
const date3Epoch = date3.getTime();

// Comparison results
console.log(`================== Comparison results ==================`);
const comparisonTable = [
  ['date1 < date2', `${date1Epoch} < ${date2Epoch}`, date1Epoch < date2Epoch],
  ['date1 > date2', `${date1Epoch} > ${date2Epoch}`, date1Epoch > date2Epoch],
  ['date1 >= date2', `${date1Epoch} >= ${date2Epoch}`, date1Epoch >= date2Epoch],
  ['date1 === date2', `${date1Epoch} === ${date2Epoch}`, date1Epoch === date2Epoch],
  ['date1 < date3', `${date1Epoch} < ${date3Epoch}`, date1Epoch < date3Epoch],
  ['date1 > date3', `${date1Epoch} > ${date3Epoch}`, date1Epoch > date3Epoch],
  ['date2 === date2', `${date2Epoch} > ${date2Epoch}`, date2Epoch === date2Epoch],
]
console.table(comparisonTable);
```

The example is similar to the above one, but this time, instead of directly comparing the dates, you first convert each date to a number using the getTime() method. Now, as the comparison is done between numbers, it will always be accurate and reliable. This should be the preferred way to compare dates in JavaScript in all of your applications. The above code is available as part of a [pull request](https://github.com/geshan/javascript-compare-dates/pull/1/files#diff-6c0aed25b8e43470d16988ec6f0594277bc2c97d7a9fd44abc766d775e27a262) for your reference.

Here is the output of the script written to the file results-getTime.txt:

<img class="center" src="/images/javascript-compare-dates/03javascript-compare-get-time.jpg" loading="lazy" title="Compare dates in JavaScript using getTime method" alt="Compare dates in JavaScript using getTime method">

Even here you are comparing “dates” not Date time, meaning `2024-11-01 3:00:00` is after `2024-11-01 2:58:58`, consider this fact. Also keep in mind the time zone differences.

In the next section, you will learn about a very popular JavaScript library called
`date-fns` and how to use it to compare dates with ease.

## Dates comparison with date-fns

There are many external npm libraries available to work with dates in JavaScript like date-fns, Moment.js and Luxon to name some. One of the most popular libraries for date and time manipulation is date-fns, which is downloaded more than [23 million](https://npmtrends.com/date-fns) times each week on npm. 

In this section, you will learn how to easily use `date-fns` to compare dates in JavaScript. Before going to the examples, make sure to install it in your project. If your project is an npm project and you have a package.json file, run the following command to install it:

```bash
npm install date-fns 
```

At the time of writing this blog post, `date-fns` is at version `4.1.0`. In the next section, you will learn how to use `compareAsc` from `date-fns` to compare dates.

### Compare Dates with compareAsc

The `compareAsc` function in `date-fns` compares two dates and returns a number that indicates their relative order. It will return:

* -1 if the first date is before the second date.
* 0 if the two dates are the same.
* 1 if the first date is after the second date.

The example below demonstrates how to use `compareAsc` to compare dates in JavaScript:

```js
import { compareAsc } from 'date-fns';

const date1 = new Date('2024-11-01T00:00:00');
const date2 = new Date('2024-11-01T00:00:02');
const date3 = new Date(2024, 14, 2);

console.log(`date1: ${date1}`);
console.log(`date2: ${date2}`);
console.log(`date3: ${date3}`);

const date1Iso = date1.toISOString();
const date2Iso = date2.toISOString();
const date3Iso = date3.toISOString();

// Comparison results
console.log(`================== Comparison results ==================`);
const comparisonTable = [
  ['compareAsc date1 and date2', `${date1Iso} and ${date2Iso}`, compareAsc(date1, date2)],
  ['compareAsc date2 and date1', `${date2Iso} and ${date1Iso}`, compareAsc(date2, date1)],
  ['compareAsc date2 and date2', `${date2Iso} and ${date1Iso}`, compareAsc(date2, date2)],
  ['compareAsc date1 and date3', `${date1Iso} and ${date3Iso}`, compareAsc(date1, date3)],
  ['compareAsc date3 and date1', `${date3Iso} and ${date1Iso}`, compareAsc(date3, date1)],
  ['compareAsc date2 and date3', `${date2Iso} and ${date3Iso}`, compareAsc(date2, date3)],
];
console.table(comparisonTable);

console.log(`================== Sorting dates ASC ==================`);
console.log([date1, date2, date3].sort(compareAsc));
```

Let's analyze the above code. First, you import the compareAsc function from date-fns using ESM imports. Then, you initialize three date objects date1, date2, and date3. Then you run different comparison between the three dates, you also do a sorting of the 3 dates in ascending order. When you run the above script the output looks like the following:

<img class="center" src="/images/javascript-compare-dates/04javascript-compare-date-fns.jpg" loading="lazy" title="Date comparison in JavaScirpt using compareAsc from date-fns NPM package" alt="Date comparison in JavaScirpt using compareAsc from date-fns NPM package">

There are other useful functions like `isBefore`, `isAfter` and `isEqual` that you can check out in the date-fns docs. In the next part, you will learn about more functions like these.

### Other useful date-fns functions

`date-fns` is a powerful and versatile JavaScript library for manipulating and formatting dates and times. You have just seen a couple of functions from `date-fns` in the above example, some more useful `date-fns` functions are as follows:

* `format`: for formating the date as per the needed locale.
* `addDays`, `addMonths`, `addYears`: to add days, months, and years to a date.
* `subDays`, `subMonths`, `subYears`: to subtract days, months, and years from a date.
* `isToday`, `isYesterday`, `isTomorrow`: to check if the date is today, yesterday, or tomorrow.
* [differenceInMilliseconds](https://date-fns.org/v4.1.0/docs/differenceInMilliseconds) : is another useful function that can be used to compare dates in JavaScript.

These are some of the many other useful functions `date-fns` has, you can find a
complete list in the [date-fns’s documentation](https://date-fns.org/docs/Getting-Started). Use the search funcion to make the most of it.

All the code examples are available in this [GitHub repository](https://github.com/geshan/javascript-compare-dates). If you want to write effective unit tests for dates, you will need to [mock dates in jest](/blog/2024/09/jest-mock-date/) to get the repeatable and predictabel results.

## Conclusion

In this tutorial, you learned about three different methods to compare dates in JavaScript. First, you used direct comparison, then you learned how to reliably compare dates using the JavaScript Date object's `getTime()` method. Finally, you learned how to use the `date-fns` library to compare dates with more ease. I hope this helped you understand more about `javascript compare dates` and that you learned something useful from it.

Happy coding and comparing Dates in JS!
