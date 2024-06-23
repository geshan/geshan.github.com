---
layout: post
title: "JavaScript Try Catch: A beginner-friendly introduction with useful examples"
date: 2024-06-23T22:56:37.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
cover: "/images/javascript-try-catch/01javascript-try-catch.jpg"
pagetitle: "JavaScript Try Catch: A beginner-friendly introduction with useful examples"
description: "Learn how to use try catch and finally in JavaScript in this helpful beginner friendly guide."
keywords: javascript try catch, javascript try catch example, javascript try catch finally, javascript try catch error handling
---
JavaScript `try catch` is an essential tool for handling errors and exceptions in your code. It provides a mechanism to gracefully handle unexpected situations and prevent your program from crashing. In this comprehensive beginner-friendly guide, you will delve into the intricacies of JavaScript's `try...catch` mechanism, giving you a clear understanding of how to handle errors gracefully with useful examples. Let’s get started!

<!-- more -->

<img class="center" src="/images/javascript-try-catch/01javascript-try-catch.jpg" title="JavaScript Try Catch: A beginner-friendly introduction with useful examples" alt="JavaScript Try Catch: A beginner-friendly introduction with useful examples">

## Table of contents

* [The need for try catch](#the-need-for-try-catch)
* [How it works](#how-it-works)
* [Using try catch with sync JS code](#using-try-catch-with-sync-js-code)
* [Utilize try catch with async code](#utilize-try-catch-with-async-code)
* [Try catch and finally](#try-catch-and-finally)
* [Conclusion](#conclusion)

## The need for try catch

Bugs and errors are an inevitable part of programming, and JavaScript is no exception. Imagine you're building a web application, and suddenly it crashes because of unexpected input or a network issue. Frustrating, right? That's where the mighty `try...catch` statement comes to your rescue!

The `try...catch` statement is a fundamental error-handling mechanism in JavaScript. It allows you to gracefully handle runtime errors, preventing your application from crashing and providing a smoother user experience.

When I started programming, I was under the false assumption that a try catch could be replaced by an if-else, how wrong I was back then. In the next section, you will learn about how try catch and finally works for a visual point fo view.

## How it works

The `try catch` statement in JavaScript works by dividing your code into two main blocks:

1. **try block**: This block contains the code that you want to execute. It's the section where you anticipate potential errors might occur. Some of the code in this section may throw an Error or an Exception. Things don’t always go as expected especially if you have user input or you are calling an external resource like a file or an external API. The API might be down, or the file’s name might be wrong. In these cases, Node.js/JavaScript will throw errors, which will be caught in the next part, the catch block.

2. **catch block**: This block is executed only if an error occurs within the `try` block. It's where you handle the error and prevent your program from crashing. For instance, if you made a typo in the domain name of the API being called, it will result `TypeError` if you are using fetch. In case, the catch block is not present it can potentially kill the node.js process or show an error on the browser console.

Optionally, you can include a third block, **`finally`**:

3. **`finally` block**: This block is executed regardless of whether an error occurred or not. It is used for cleaning up resources or performing actions that must happen after the `try` and `catch` blocks. For instance, this block is useful when you have a database connection taken from a pool of connections. You put your code to execute a database transaction, if all goes well the execution will never reach the catch part but if things hit the fan, the execution will land in the catch part. The code in the `finally` block will always execute so it can be used to release the database connection back to the pool regardless of whether an error occurs or not. 

Here's a simple flow chart that visually explains the workflow of the `try catch finally` statement (made with Mermaid.js - [svg](https://www.mermaidchart.com/raw/c7432fc6-4f7f-4043-b049-b6ef8692bab1?theme=light&version=v0.1&format=svg) version):

<img class="center" loading="lazy" src="/images/javascript-try-catch/02try-catch-finally.jpg" title="Try catch and finally shown visually in a flow chart" alt="Try catch and finally shown visually in a flow chart">

Try catch can be used with both sync and async code in JavaScript. If you want to learn about Sync, async JavaScript code with callbacks, promises and async await please read this [blog post](https://blog.appsignal.com/2022/11/09/how-to-handle-async-code-in-javascript.html). In the next section, you will learn about a sync code example with try and catch using JavaScript.

## Using try catch with sync JS code

Let's start with a basic example of using `try catch` with synchronous code. One common use case is parsing JSON data, which can throw an error if the JSON string is invalid, for the example below the JSON is deliberately made invalid:

```js
const jsonString = '{"key: "value"}';

try {
  const json = JSON.parse(jsonString);
  console.info(json.key);
} catch (err) {
  console.error('Error parsing JSON string: ', err.message);
  console.error('Error stack: ', err.stack);
  console.error('Error name: ', err.name);
  console.info(err instanceof SyntaxError); // true
}
```

The error in the `JSON string` is that the key named `key` does not have a closing `”` so this will always result in a `SyntaxError` when a `JSON.parse` is tried on the malformed JSON string. If you save the above code snipped at `sync.js` and run it with Node.js (or run it on the browser console) it will result in:

<img class="center" loading="lazy" src="/images/javascript-try-catch/03javascript-try-catch-sync.jpg" title="Try catch sync execution in JavaScript - output" alt="Try catch sync execution in JavaScript - output">

Let’s analyze what happened here, first, you have set an invalid JSON string in the `const` called `jsonString`. Next, you start a try block and try to parse the invalid JSON string as a JSON object with `JSON.parse`. Then you try to log the `key` of that object, this line will not be reached as the `JSON.parse` will throw an error.

In the catch block, you catch the error with the name `err`, after that you log the error’s message as a console error. Then you log the stack and name of the error as console error too. At the end, you check if the error is an instance of the type `SyntaxError` which will result in true.

If you want the code to never reach the catch block you can use `const jsonString = '{"key”: "value"}';` as the first line. In the next segment, you will see an example of asynchronous Javascript using async and await.

## Utilize try catch with async code

Asynchronous code in JavaScript involves operations that don't execute immediately,
like fetching data from an API. Using `try catch` with asynchronous code
requires understanding how [promises](/blog/2022/08/javascript-wait-1-second/#sleep-with-promise) work. You can also read about [.catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) and `.finaly` that can be added to the promise object. But these days, using async await is much more popular than `promise().catch().finally()` syntax. So the code below is with the native `fetch` API to get some users from `https://jsonplaceholder.typicode.com/` but with a twist (read error):

```js
async function getUser() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com1/users/1');
    console.log('User data:', await response.json());
  } catch (err) {
    console.error('Error fetching user:', err.message);
    console.error('Error stack: ', err.stack);
    console.error('Error name: ', err.name);
    console.info(err instanceof TypeError); // true
  }
}

getUser();
```

To make it clear upfront, you could have used [IIFE]((https://geshan.com.np/blog/2022/08/javascript-wait-1-second/#sleep-with-timers-in-node-15%2B) with async await but to keep things simple above example uses a named function called `getUser`.

The `getUser` async function starts with a get fetch call, the issue there is that the domain name is wrong. It has an extra `1` appended after the `.com` which will always result in the domain name not being resolved. So this means, the execution will never reach the line where the user data is being logged.

It will always land in the `catch` segment, and log the message of the error then the stack and name. After that, it will check if the instance of the error is `TypeError` which will result in true. You can save the above code as `async.js` and run with Node `18.+` as native fetch was added to Node.js without the experimental flag in `18.0.0`. It will result in:

<img class="center" loading="lazy" src="/images/javascript-try-catch/04javascript-try-catch-async.jpg" title="Try catch async execution in JavaScript - output" alt="Try catch async execution in JavaScript - output">

You can also run it on the console of your browser, which will give the same result as above. In the next section, you will learn about the handy finally block that always executes regardless of the error case occurring.

## Try catch and finally

JavaScript `try...catch` also supports an optional `finally` block. The `finally` block always executes, regardless of whether an error occurred or not. This is useful for cleanup tasks or closing resources. Below is the same example of the above `JSON.parse` with the error adding a `finally` block at the end:

```js
const jsonString = '{"key: "value"}';

try {
  const json = JSON.parse(jsonString);
  console.info(json.key);
} catch (err) {
  console.error('Error parsing JSON string: ', err.message);
  console.error('Error stack: ', err.stack);
  console.error('Error name: ', err.name);
  console.info(err instanceof SyntaxError); // true
} finally {
  console.info('This will always execute');
}

```

If you save this file as `sync-finally.js` and run it with Node.js it will result in the following:

<img class="center" loading="lazy" src="/images/javascript-try-catch/05javascript-try-catch-finally-sync.jpg" title="Try catch finally sync execution in JavaScript - output" alt="Try catch finally sync execution in JavaScript - output">

The main difference here is the `finally` part executed with the error case. Even if there was no error the `finally` block would always execute. The `finally` block can also be used in the `async` code example with `async-await`. You can find all the code examples in this [GitHub repository](https://github.com/geshan/js-try-catch-finally). If you like using Axios in place of fetch, you can find a similar example with [Axios timeout](https://geshan.com.np/blog/2022/11/axios-timeout/#example-with-axios-timeout-added).

You can also wrap the error or exception into your custom exception. For instance, if an API returns a specific error code for a wrong password like code `5522` then you can check if the error has that code and wrap it into a custom `WrongPasswordError` and rethrow it. You can use the `throw` keyword to throw your Error or Exception. That could be a topic for a different blog post.

## Conclusion

JavaScript's `try catch` statement is an invaluable tool for handling errors gracefully. It provides a structured way to anticipate and manage exceptions, preventing your code from crashing and ensuring a better user experience.

By understanding the principles of `try catch` and applying them judiciously, you can create robust and reliable JavaScript applications. Remember to leverage the `finally` block for essential cleanup tasks, and don't shy away from utilizing `try catch` in both synchronous and asynchronous code. In this guide, you learned how to use try…catch and finally in both sync and async JavaScript code with useful examples.

Keep practicing and exploring different error-handling scenarios to become a master of error management in JavaScript. Embrace the power of `try catch` and finally, let your code handle errors with elegance and resilience. Happy coding!
