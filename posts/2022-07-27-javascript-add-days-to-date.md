---
layout: post
title: "How to add days to a date in JavaScript (with code examples)"
date: 2022-07-27T06:52:35.000+11:00
comments: true
tags:
- Javascript
- Software Engineering
cover: "/images/javascript-add-days-to-date/01javascript-add-days-to-date.jpg"
pagetitle: "How to add days to a date in JavaScript (with code examples)"
description: Learn how to add days to date in JavaScript with native date object and date-fns NPM package in this tutorial.
keywords: javascript add days to date, add days to date, javascript add days, javascript date

---
There are several use cases to add days to a date in JavaScript. For instance to get the date 5 days after today. In this post, you will learn how to add days to a date in JavaScript with and without external NPM packages. Let’s get rolling!

<!-- more -->

<img class="center" loading="lazy" src="/images/javascript-add-days-to-date/01javascript-add-days-to-date.jpg" title="How to add days to date in JavaScript" alt="How to add days to date in JavaScript">

## Table of contents

* [JavaScript date object](#javascript-date-object)
* [Add date with setDate](#add-date-with-setdate)
* [Add days in JavaScript date with date-fns](#add-days-in-javascript-date-with-date-fns)
* [Popular Javascript date-related packages](#popular-javascript-date-related-packages)
* [Conclusion](#conclusion)

## JavaScript date object

JavaScript has a [Date object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). It represents a single moment in time in a platform-independent format. This is achieved by representing the date in the object containing a number that has the milliseconds since 1-Jan-1970 UTC.

JavaScript date object has many functions to get a lot of things done. Still, like other parts of the language the date-related functions also have their own quirks like [getDay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay) returns 0-6 for Sunday - Saturday. 

In the next section, you will learn how to add days to a date in JavaScript using the `setDate` method.

## Add date with setDate

To add days to date with JavaScript you can use the [setDate](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate) method adding the number of days to the date (or current date). Below are two examples of adding 7 days to today and a date in the past:

```js
const aWeekLater = new Date();
aWeekLater.setDate(aWeekLater.getDate() + 7);

console.log(`Date after a week is ${aWeekLater.toDateString()}`);

const aWeekAfter1Jan2022 = new Date('2022-01-01');
aWeekAfter1Jan2022.setDate(aWeekAfter1Jan2022.getDate() + 7);

console.log(`Date after a week of 2022-01-01 is ${aWeekAfter1Jan2022.toDateString()}`);
```

When the above script is run with Node.js or on the browser it will give an output that looks as follows depending on the current date and time:

```bash
Date after a week is Tue Aug 02 2022
Date after a week of 2022-01-01 is Sat Jan 08 2022
```

Below is how it looks in the browser’s console, it has been run on Chrome:

<img class="center" loading="lazy" src="/images/javascript-add-days-to-date/02add-days-to-date-chrome-console.jpg" title="Running code to add days to date with JavaScript in Chrome console" alt="Running code to add days to date with JavaScript in Chrome console">

The above script is also available on [JS Fiddle](https://jsfiddle.net/geshan/1apbhygn/1/) for your reference. Make sure you have the console turned on on JS fiddle.

You can do the same thing with an NPM package, there are multiple packages to manipulate date in JavaScript. In the next section, the `date-fns` package will be used to add days to a date.

## Add days in JavaScript date with date-fns

Date-fns is a popular JavaScript date manipulation NPM package that works on the browser and server (Node.js). You can install [date-fns](https://date-fns.org/) on any project with `npm install date-fns`. Then it can be used to do a lot of date-related things, one of them is to add days to a JavaScript date. 

Below is the example of adding 7 days to the current date as well as a past date similar to what we saw in the last example, this time using date-fns in Node.js:

```js
const dateFns = require('date-fns');

let aWeekLater = dateFns.addDays(new Date(), 7);
console.log(`Date after a week is ${aWeekLater.toDateString()}`);

const aWeekAfter1Jan2022 = dateFns.addDays(new Date('2022-01-01'),  7);
console.log(`Date after a week of 2022-01-01 is ${aWeekAfter1Jan2022.toDateString()}`);
```

When the above script is run with `node date-fns.js` it will give the exact same output as the above example which looks like this:

```bash
Date after a week is Tue Aug 02 2022
Date after a week of 2022-01-01 is Sat Jan 08 2022
```

You can play around with the above script on [JS Fiddle](https://jsfiddle.net/geshan/ofbyg83z/10) if you want and check the output on the console there.

Both the above examples are also available in this open-source [GitHub repository](https://github.com/geshan/javascript-add-days-to-date) for your reference.

Please check this post if you are interested in learning some [Javascript array functions](/blog/2021/03/javascript-array-functions/). Also, read about [JavaScirpt promise all](/blog/2022/07/javascript-promise-all/), in case you want to learn more about concurrent promises which can be handy to use with multiple date scenarios. In the next section, you will learn about popular date-related NPM packages.

## Popular Javascript date-related packages

There are other popular NPM packages to manipulate and format date in JavaScript. In addition to adding days to a date, you can do many other things like subtract days, format dates as needed, deal with timezones, etc. Below is a quick list and comparison of some popular date-related NPM packages:

1. [Moment.js](https://momentjs.com/) - the most popular date-related library. Probably one of the most feature-rich too. It was created 11 years ago and had more than 19.5 million downloads in the week ending 10-Jul-2022.
1. [Date-fns](https://date-fns.org/) - The package you used in the above example. It was created 8 years ago and had 13.6 million downloads for the week ending 10-Jul-2022.
1. [Day.js](https://day.js.org/) - Dubbed the 2Kb fast alternative to Moment.js with the same API. It came into existence 4 years ago and was downloaded 10.2 million times in week 27 of 2022.
1. [Luxon](https://moment.github.io/luxon/) - brands itself as a powerful, modern, and friendly wrapper for JavaScript dates and times. It is under the moment.js namespace. It was created 5 years ago and had 3.8 million downloads for the week ending 10-Jul-2022.

All the above data is taken from [NPM Trends](https://npmtrends.com/@date-io/core-vs-date-fns-vs-dayjs-vs-luxon-vs-moment) and below is a quick snapshot of the popularity of these libraries:

<img class="center" loading="lazy" src="/images/javascript-add-days-to-date/03compare-npm-date-libs.jpg" title="Comparision of date related NPM packages 2022 H1" alt="Comparision of date related NPM packages 2022 H1">


Generally, the native JavaScript Date object and its method would suffice your need for date formatting and manipulation. If you have a complex use case then it would be better to pick one of the above libraries to make the more compldex parts easier. 

Which one to choose is up to you, here is a comparison between the two most popular ones [Moment.js and Date-fns](https://blog.bitsrc.io/date-fns-vs-momentjs-9833f7463751).

## Conclusion

This quick guide taught you how to add days to a date in JavaScript. First, you added the days with `setDate` native function and then used `date-fns` to do the same things. There was a quick popularity contest of some well-liked date-related NPM packages to give you a better idea of what's available. I hope you have learned something useful from this.
