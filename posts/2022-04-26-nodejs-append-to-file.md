---
layout: post
title: How to append contents to a file using Node.js
date: 2022-04-26T22:57:55.000+11:00
comments: true
tags:
- Software Engineering
- Node.js
- Javascript
cover: "/images/nodejs-append-to-file/01nodejs-append-to-file.jpg"
pagetitle: How to append contents to a file using Node.js
description: Learn how to append text to a file using Node.js with callback, promise
  (async-await) and sync way in this easy to follow tutorial with code examples.
keywords: nodejs append to file, node.js append to file, nodejs append file, nodejs
  file append

---
Node.js can be used for a multitude of things, file handling is one of them. In this post, we will learn how to append to a file using Node.js. It can be done with callback, promise (async/await) as well as in a sync way, let’s get going!

<!-- more -->

<img class="center" loading="lazy" src="/images/nodejs-append-to-file/01nodejs-append-to-file.jpg" title="Append contents to a file using Node.js" alt="Append contents to a file using Node.js">

## Table of contents

* [Prerequisites](#prerequisites)
* [Ways to append to a file in Node.js](#ways-to-append-to-a-file-in-node.js)
    * [Append to a file with a callback](#append-to-a-file-with-a-callback)
    * [File append using Promise](#file-append-using-promise)
    * [Sync file append using Node.js](#sync-file-append-using-node.js)
* [Conclusion](#conclusion)

## Prerequisites

Before diving deeper into the code, below are some requirements and/or nice to have:

1. Having Node.js 10+ running on your machine/testing environment is required. I will be using Node 18 for the example below. You can use [Node.js withDocker](/blog/2020/11/nodejs-with-docker/) for this.
1. Any knowledge of using Node.js and its native file system (fs) module will be helpful but not required.
1. Prior understanding of Node.js and how its event loop works would be advantageous.
1. Knowledge of callback, promise (async-await), and sync calls in Node.js will be useful to follow along with the code examples.

The code examples are available on a public [GitHub repository](https://github.com/geshan/nodejs-append-to-file) for your reference. You can also check out [Node.js read file line by line](/blog/2021/10/nodejs-read-file-line-by-line/) if that helps to read the file used in this tutorial. In the subsequent section, we will start getting our hands dirty with the code.

## Ways to append to a file in Node.js

There are multiple ways and use-cases to append a line or some data to a file using Node.js. To append to an existing or a new file with Node.js we can use the native `fs` module, there is no need to install any NPM package. The file system module (fs for short) is used to interact with the file system modeled as per standard POSIX functions. 

The `fs` module provides callback, promise based as well as some sync functions to do common and useful file operations, appending to a file is definitely one of those.

We will see code examples with 3 ways to append a line to a text file in Node.js. The first one will be with a callback, then a promise-based example with async-await. Finally, we will witness a sync example, as known it is best not to use the sync example as it block the Node.js event loop until the append operation is completed. 

In the next section, we will look into how to append a line to an existing/newly created text file.

### Append to a file with a callback

The first more Node.js normal way to append to a file is using a callback. It appends to a file asynchronously. If the file does not exist it will create the file and then append the string to it, a [Buffer](https://nodejs.org/api/buffer.html) can also be used in place of a string as data.

The first parameter is the path, the second one is the data which can be a string or buffer. The default encoding is `utf8`, if you are working with a file that uses a different encoding it can be passed in as the third parameter to the `fs.appendFile` method. The fourth parameter is the callback function which takes in an error as the argument. You can read more about it in the official [documentation](https://nodejs.org/api/fs.html#fsappendfilepath-data-options-callback). Below is an example of appending two lines where the file is also created.

```javascript
const fs = require('fs');

fs.appendFile('file.txt', 'First line added!', 'utf-8', err => {
  if (err) {
    throw err;
  }
  console.log('First line written.');
  fs.appendFile('file.txt', '\nSecond line appended.', err => {
    if (err) {
      throw err;
    }

    console.log('Second line appended.');
  });
});
```

The code is pretty self-explanatory, first, we require the file system - `fs` module. Then we use the `fs.appendFile` method with a callback passing the file path, the test to be added, the encoding as `utf8` and finally the callback function.

If there is an error we throw the error up, else we log that the first line has been written. Inside the callback, we call the `fs.appendFile` again to add a second line and essentialy repeat the process. This is a small example of the [callback hell](http://callbackhell.com/) scenario, in the consequent section we will use promises and async-await to come out the callback hell.

To run the above file saved as `callback.js` we can run the following command:

```bash
rm -f file.txt && node callback.js
```

When we execute the above command and see the contents of the file we will see something like the below:

<img class="center" loading="lazy" src="/images/nodejs-append-to-file/02nodejs-append-to-file-callback.jpg" title="Append contents to a file using Node.js with callbacks fs.apppendFile" alt="Append contents to a file using Node.js with callbacks fs.apppendFile">

As seen above, the file has two lines and they are appended with Node.js correctly. In the proceeding section, we will see the same task being done with Promises and async-await.

### File append using Promise

The above task of appending 2 lines to an existing/new text file with Node.js can be done much easier and in a pseudo-synchronous way using promises. Luckily, the native `fs` module comes with a promise interface too. If the promise interface was not available we could have used [util.promisify](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original) as well but that won’t be needed.

Below is the code for appending to a file with Node.js using promises:

```javascript
const fsPromises = require('fs/promises');

(async () => {
  try {
    const fileName = 'file-promise.txt'
    await fsPromises.appendFile(fileName, 'First line added!', 'utf-8');
    await fsPromises.appendFile(fileName, '\nSecond line appended.', 'utf-8');
    console.log('Added 2 lines to file.');
  } catch(err) {
    console.log('Error appending data to file', err);
  }
})();
```
In this snippet, we first require the `fs/promises` native module. Then we use an async Immediately Invoked Function Expression (IIFE) to use the async-await syntax for the promisified appendFile. Then in the try block, we append the first and the second line similar to the previous example by calling `await fsPromises.appendFile` which takes 3 parameters.

The first one is the path, the second one is the string or a buffer to append to the file and the third one can be an options object or a string to specify the encoding. We are using `utf-8` as the encoding. As this is a promise, the callback function is not required which simplifies the code as seen above.

We can run the above file saved as `promise.js` with the following command:

```bash
rm -f file-promise.txt && node promise.js
```

That will yield output like the below when we check the contents of the file:

<img class="center" loading="lazy" src="/images/nodejs-append-to-file/03nodejs-append-to-file-promise.jpg" title="Append contents to a file using Node.js with Promise and async-await" alt="Append contents to a file using Node.js with Promise and async-await">

The promise-based API is possibly the efficient and easy-to-write way to append contents to a file using Node.js. Next up, we will see a sync append to file example.

### Sync file append using Node.js

The last example to append to a file with Node.js is with the `appendFileSync` method available in the native file system (fs) module. As the name suggests, this is a `sync` operation that blocks the [event loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop) until the operation is completed.

Even though the code looks simpler, the sync way of appending to a file with Node.js is not the best solution. It will be inefficient especially with larger files and larger content to be appended. Anyhow, below is a code example to append to a file with Node.js in a sync way:

```javascript
const fs = require('fs');

try {
  const fileName = 'file-sync.txt'
  fs.appendFileSync(fileName, 'First line added!', 'utf-8');
  fs.appendFileSync(fileName, '\nSecond line appended.', 'utf-8');
  console.log('Added 2 lines to file in sync mode.');
} catch(err) {
  console.log('Error appending data to file in sync mode', err);
}
```

Similar to the promises and async-await example, we require the `fs` native module first. Then we use a try-catch block without any async function. After that, we call the `appendFileSync` method on the fs module and add the two lines similar to the above two examples.

The parameters remain the same, file path, then the content that can be a string or buffer and the options obejct/encoding as a string. Even in this example, we use the string `utf-8` for encoding. Then we have a `catch` part that logs if there is any error. 

If we execute the above file saved as `sync.js`:

```bash
rm -f file-sync.txt && node sync.js
```

Then it will show the following output:

<img class="center" loading="lazy" src="/images/nodejs-append-to-file/04nodejs-append-to-file-sync.jpg" title="Append contents to a file using Node.js in a sync way" alt="Append contents to a file using Node.js in a sync way">

If you want to write or append multiple times better use a stream. An example of using stream can be seen in the [Node.js CSV](https://geshan.com.np/blog/2021/11/nodejs-read-write-csv/#write-csv-in-node.js-with-fast-csv) post.

## Conclusion

We have seen how to append to a file with Node.js in 3 different ways, a callback, a promise with async-await syntax, and a sync way. As mentioned above all code examples are available as a [GitHub](https://github.com/geshan/nodejs-append-to-file) repo. I hope it has helped you learn something new about Node.js and file handling.