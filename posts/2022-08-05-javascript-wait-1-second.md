---
layout: post
title: How to wait 1 second in JavaScript (using setTimeout, Promise, and Delay)
date: 2022-08-05T23:30:32.000+11:00
comments: true
tags:
- Javascript
- Software Engineering
cover: "/images/javascript-wait-1-second/01javascript-wait-1-second.jpg"
pagetitle: How to wait 1 second in JavaScript (using setTimeout, Promise, and Delay)
description: Learn how to wait 1 second in Javascript with setTimeout, promise (async/await)
  and the Delay NPM package in this easy to follow guide with code examples.
keywords: javascript wait 1 second, javascript wait 5 seconds, javascirpt wait

---
Call it a wait, sleep, or delay in executing code in JavaScript. It can be done in multiple ways in JavaScript on the browser and Node.js. In this post, you will learn how to wait for 1 (or x) second in Javascript using setTimeout, promise, and Delay NPM package with a working code example. Let’s get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/javascript-wait-1-second/01javascript-wait-1-second.jpg" title="Wait for 1 second in JavaScript using setTimeout, Promise and Delay NPM package" alt="Wait for 1 second in JavaScript using setTimeout, Promise and Delay NPM package">

## Table of contents

* [Wait with setTimeout](#wait-with-settimeout)
* [Sleep with Promise](#sleep-with-promise)
* [Sleep with timers in Node 15+](#sleep-with-timers-in-node-15)
* [Using Delay NPM package to wait](#using-delay-npm-package-to-wait)
    * [Other NPM packages to wait](#other-npm-packages-to-wait)
* [Conclusion](#conclusion)

## Wait with setTimeout

In JavaScript one of the easiest wait to block the main thread is with [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout). It is used to execute a function or a piece of code after the timer expires. JavasScript can run code [asynchronously](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing). In the most basic terms, it means the code you see may not be executed line by line in sequence. Some code might be pushed in the background and the next line of code is executed. The code pushed in the background can later come back with a result. Below is an example of using setTimeout to wait for 1 second in JavaScript:

```js
console.log('First log message');

// 1 second wait
setTimeout(function(){
  console.log('Third log message - after 1 second');
}, 1000);

console.log('Second log message');
```

When you run the above code on the browser or with Node.js with `node set-timeout.js`, it will give the following output:

```bash
First log message
Second log message
Third log message - after 1 second
```

Therefore, setTimeout makes the console.log only fire after 1000 milliseconds (1 second) of the second console.log call.

There you go, one of the ways to delay the code execution is by using setTimeout. In the next section, another way to do the same thing will be elaborated on with a Promise.

## Sleep with Promise

Depending on the work you are doing, you might be using JavaScript [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). Waiting while using Promises can be helpful in multiple scenarios. One of them is when calling an API and you don’t want to be rate limited for making too many calls too fast. For instance, GitHub limits unauthenticated calls to just [60 requests per hour](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#requests-from-personal-accounts). In these cases adding a wait is helpful, below is an example with async await:

```js
function wait(milliseconds){
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}

(async function(){
  const users = ['brianchandotcom', 'abraham', 'frsyuki', 'bdougie', 'RamiKrispin']; //source https://commits.top/united_states.html

  for(const [position, user] of users.entries()){
    const userDetails = await (await fetch(`https://api.github.com/users/${user}`)).json();
    console.log(`User at position ${position + 1}: ${userDetails.name} - ${userDetails.login}`);
    await wait(1000);
  }
})();
``` 

The above code prints the Name and username of the 5 most active GitHub users in the US as per commits top. In the code, a `wait` function is added which returns a promise that is resolved after given milliseconds which enables the waiting. An async IIFE function is used to use await even though top-level await is available in node with some flags and `.mjs` file. You can also use [Javascript promise all](/blog/2022/07/javascript-promise-all/) to send the requests concurrently but it will make the rate limit problem worse.

In the loop after calling the API with `fetch` for each user, it will wait for 1 second before the next iteration. This is another way to delay the execution of JavsScript code using promise with async/await. When you run the code on a browser you will see something like the below:

<img class="center" loading="lazy" src="/images/javascript-wait-1-second/02javascript-wait-1-second-browser.jpg" title="Wait for 1 second with Async/await code ran in Chrome browser" alt="Wait for 1 second with Async/await code ran in Chrome browser">
 
As there is a wait after each iteration, the next name and GitHub login will only appear after 1 second.

The above code can also be run with Node.js, but fetch is still experimental even in Node 18 so it will give an output as follows when running `node async-await.js`:

```bash
(node:86319) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
User at position 1: Brian Chan - brianchandotcom
User at position 2: Abraham Williams - abraham
User at position 3: Sadayuki Furuhashi - frsyuki
User at position 4: Brian Douglas - bdougie
User at position 5: Rami Krispin - RamiKrispin
```

In case you are using Node 15+, the above behavior can be achieved using timers promises discussed in the consequent section.

## Sleep with timers in Node 15+

If you are using Node.js 15+, [timers/promises](https://nodejs.org/api/timers.html#timers-promises-api) can be utilized to put in setTimeout as a promise to delay the execution. The same result can be achieved using `setTimeout` from timers/promises as:

```js
const {setTimeout} = require('timers/promises');

(async function(){
  const users = ['brianchandotcom', 'abraham', 'frsyuki', 'bdougie', 'RamiKrispin']; //source https://commits.top/united_states.html

  for(const [position, user] of users.entries()){
    const userDetails = await (await fetch(`https://api.github.com/users/${user}`)).json();
    console.log(`User at position ${position + 1}: ${userDetails.name} - ${userDetails.login}`);
    await setTimeout(1000);
  }
})();
```

The code is the same as the previous example, the main difference here is you are using a native setTimeout function as a promise in place of defining your one promise to block the code. This is a better way to wait for 1 second in JavaScript, specifically Node.js, as it uses native code.

In addition to using setTimeout and Promises with setTimeout, you can also use an NPM package to wait for X seconds using JavaScript. In the section below, you will use the Delay NPM package to do the same.

## Using Delay NPM package to wait

In most cases, not using an extra package to do something will be a better idea. For the sake of coverage, you can try out the [Delay](https://github.com/sindresorhus/delay) NPM package to block the code and wait in JavaScript. The delay package defines its use as `Delay a promise a specified amount of time`. 

You can see the same example of delaying calls to Github API using dealy as:

```js
const delay = require('delay');

(async function(){
  const users = ['brianchandotcom', 'abraham', 'frsyuki', 'bdougie', 'RamiKrispin']; //source https://commits.top/united_states.html

  for(const [position, user] of users.entries()){
    const userDetails = await (await fetch(`https://api.github.com/users/${user}`)).json();
    console.log(`User at position ${position + 1}: ${userDetails.name} - ${userDetails.login}`);
    await delay(1000);
  }
})();
```

To use delay you will need to install it by running `npm install –save delay`, then it can be imported and used. The above code is the same as the previous example, in place of `setTimeout` from `timers/promises` you are using the `delay` package downloaded from NPM.

Better reasons to use delay can be, it also provides [Rejct](https://github.com/sindresorhus/delay#delayrejectmilliseconds-options) and [Range](https://github.com/sindresorhus/delay#delayrangeminimum-maximum-options) options. The range is interesting as it provides a range between min and max milliseconds for the promise to be resolved. This can be very useful in testing. You can also have a look at some [advanced usage](https://github.com/sindresorhus/delay#advanced-usage) of Delay if that interests you.

There are other NPM packages that can be used to wait sometime in JavaScript, some of them are discussed in the subsequent section.
 
### Other NPM packages to wait

There are other NPM packages as well which can be used to wait for X seconds in JavaScript. Some of them are [delayed](https://npmjs.com/package/delayed), [sleep](https://npmjs.com/package/sleep), [sleep-async](https://npmjs.com/package/sleep-async) and [sleep-promise](https://npmjs.com/package/sleep-promise). All of them similar to Delay, do the task of sleeping or delaying the code execution in JavaScript with their own twist. 

Still, Delay is the most popular among them with more than 2 million downloads in the week ending 24-Jul-2022 as seen below on [NPM trends](https://npmtrends.com/delay-vs-delayed-vs-sleep-vs-sleep-async-vs-sleep-promise):

<img class="center" loading="lazy" src="/images/javascript-wait-1-second/03javascript-wait-npm-packages.jpg" title="Comparing 5 NPM packages to wait 1 second in JavaScript" alt="Comparing 5 NPM packages to wait 1 second in JavaScript">

The first piece of advice would be to not use an NPM package to wait in JavaScript if you opt to use one, go for Delay as it has exponentially more downloads than all the other 4 competitors combined.

All the code examples are available in this [GitHub repository](https://github.com/geshan/javascript-wait) for your reference.

## Conclusion

In this guide, you learned how to wait for 1 second in JavaScript in 3 different ways. The first one was by using the standard `setTimeout`, then you dabbled into using Promise with setTimeout. After that, you used a Node.js specific `setTimeout` from the `timers/promises` package. Then the delay NPM package was used to delay the execution of JavaScript by 1 second. I hope that has helped you understand how to wait for 1 second in JavaScript in multiple ways, keep coding!