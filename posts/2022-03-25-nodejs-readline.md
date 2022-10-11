---
layout: post
title: Using Node.js readline to create a basic CLI app with Async await example
date: 2022-03-25T22:47:55.000+11:00
comments: true
tags:
- Software Engineering
- Node.js
- Javascript
cover: "/images/nodejs-readline/01nodejs-readline.jpg"
pagetitle: Using Node.js readline to create a basic CLI app with Async await example
description: Learn how to create a basic CLI app with Node.js readline module using async await in this step-by-step easy to understand tutorial.
keywords: nodejs readline, readline nodejs, node.js readline, readline node.js

---
Node.js can be used for multiple purposes, creating a Command Line Interface (CLI) app is one of them. With the Node.js Readline native module, we can create CLI apps. In this post, we will learn how to create a basic Node.js CLI app using the latest Readline on Node 17 with promises and async/await. Let’s get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/nodejs-readline/01nodejs-readline.jpg" title="Using Node.js readline to create simple CLI app" alt="Using Node.js readline to create simple CLI app">

## Table of contents

* [Prerequisites](#prerequisites)
* [Basic example of Node.js readline](#basic-example-of-node.js-readline)
* [Readline example with timeout](#readline-example-with-timeout)
* [Conclusion](#conclusion)

## Prerequisites

If you want to build on a full-on CLI application it might be better to use something like [Oclif](https://oclif.io/) or [commander.js](https://github.com/tj/commander.js). For smaller CLI apps that don’t need external NPM dependencies Node.js Readline module would suffice. Below are the prerequisites for this tutorial on how to create a simple Node.js CLI app using readline native module:

1. You will need Node.js v17+ working on your machine and basic knowledge of Node.js would be helpful. This tutorial will only use a native module with Common JS (CJS) so NPM knowledge is optional.
1. A general understanding of promises and async-await in JavaScript/Node.js would come in handy.
1. Any prior knowledge of building even a basic CLI app would be beneficial but not essential.

Given that we have mentioned the required things, in the next section we will start diving into the code.

## Basic example of Node.js readline

Before we go into an example of Node.js readline with more things, we will first look into a basic example. This simple example will use the latest `readline/promises` native package only available from [Node 17](https://nodejs.org/docs/latest-v17.x/api/readline.html) and above. Given Node 17 is the currently active version and Node 18 will be the latest LTS from mid-Apr 2022, this should be a relevant example apt with the present time and very useful in the future too.

The example is very simple it asks the user the value of `4x4` if the user enters `16` it says it is `correct` else it says it is `incorrect and try again`. Below is the code basic example of Node.js readline native module with promises, async-await, and process module. 

```js
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

(async () => {
  const rl = readline.createInterface({ input, output });
  try {
    const answer = await rl.question('What is 4x4 equals? ');

    const correctOrNot = answer.trim() === '16' ? 'correct!' : 'incorrect. Try again.';
    console.log(`${answer.trim()} is ${correctOrNot}`);
  } catch(err) {    
    console.log(`Error: `, err);
  } finally {
    rl.close();
  }
  process.exit(1);
})();
```

Let’s go through the above code in a bit more detail now. First, we require the `readline/promises` package which is part of the native Node.js readline module. Subsequently, we require stdin and stdout as `input` and `output` respectively.

After that, as there is no top level async await in `.js` file we use an async Immediately Invoked Function Expression ([IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)) to be able to call await easily. Inside the IIFE we declare a readline interface to take input from stdin and show output on stdout. 
Then, inside the try we declare a new constant called `answer` that waits for the answer to the question `What is 4x4 equal?` until it gets an answer. As soon as the user types in an answer it is set to the cont `answer`. After that it compares if the answer is `16`, if it is 16 it sets `correctOrNot` to `correct!` else `incorrect, Try again.`. Then it logs the answer as correct or not. 

Towards the end, if there is an error it is caught in the `catch` section and logged. Similarly, the readline interface is closed in the `finally` section. Last we exit out of the process with the `process.exit(1)`.

The code can be seen in the [pull reques](https://github.com/geshan/nodejs-readline/pull/4/files)t too. If you are looking for an ESM style import syntax version of the above example, please have a look at this [file](https://github.com/geshan/nodejs-readline/blob/master/readline-basic.mjs) with top-level async-await.

In the next section, we will look at a similar example with timeout added to it where the answer is expected within X seconds from the user. Let’s see how that is done.

## Readline example with timeout

The above basic example is good for simple tasks. Let’s say if we need to give the user a specific time for instance 5 seconds before the user can answer `4x4`, we can do it easily using `AbortController`. Below is an example of the same single question waiting for an answer but it will stop if the answer is not provided in 5 seconds:

```js
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');
const ac = new AbortController();
const signal = ac.signal;

(async () => {
  const rl = readline.createInterface({ input, output });
  const timeoutInSeconds = 5;
  setTimeout(() => ac.abort(), timeoutInSeconds * 1000);
  try {
    const answer = await rl.question('What is 4x4 equals? ', { signal });

    const correctOrNot = answer.trim() === '16' ? 'correct!' : 'incorrect. Try again.';
    console.log(`${answer.trim()} is ${correctOrNot}`);
  } catch(err) {
    let message = 'Error: ';
    if(err.code === 'ABORT_ERR') {
      message = `You took too long. Try again within ${timeoutInSeconds} seconds.`;
    }

    console.log(message, err.code !== 'ABORT_ERR' ? err : '');
  } finally {
    rl.close();
  }
  process.exit(1);
})();
```

The main changes in this example which adds another layer of timeout feature on the above basic example of Node.js readline are as follows.

On line 3 we instantiate the Abort Controller. The [Abort Controller](https://nodejs.org/docs/latest-v17.x/api/globals.html#class-abortcontroller) as per the official documentation is “A utility class used to signal cancelation in selected promise-based APIs”. This fits our use-case well, as we are trying to stop the script if the user is not able to answer within 5 seconds. Next up, in line 4 we use the `signal` variable which is [part](https://nodejs.org/docs/latest-v17.x/api/globals.html#abortcontrollersignal) of the native Abort controller.

On line 8 we define a timeout of 5 seconds and attached it to `ac.abort()` call with a setTimeout. This will call abort after 5 seconds of inactivity, given signal is used on line 19 in the `rl.question`.

Most things remain the same as the above example, the change is in the catch part. Here we check if the code of the error thrown is `ABORT_ERR`, in that case, we change the message to show using console the log to be the timeout message. While logging the error object if the code is not `ABORT_ERR` we log the whole error object else we log nothing. Other parts of the code stay the same as the above simple example. The above example with timeout can be referenced as a GitHub [file](https://github.com/geshan/nodejs-readline/blob/master/readline.js) too.

Node.js readline can also be used to [read file line by line with Node.js](/blog/2021/10/nodejs-read-file-line-by-line/) but the above usage seems better suited. You can colorize and format your CLI output with [NPM chalk](/blog/2022/10/npm-chalk/) module.

## Conclusion

We saw a basic usage of the Node.js readline module with the new and easy-to-use Promise interface. As mentioned above for smaller Node.js CLI apps the readline native module might be enough but if you are thinking of bigger CLI apps it would be better to use Commander.js or Oclif.

> I hope you have learned the basics of using Node.js readline in this step-by-step tutorial. Keep coding!
