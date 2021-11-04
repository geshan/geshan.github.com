---
layout: post
title: 4 ways to read file line by line in Node.js
date: 2021-10-08T21:30:35.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
- NodeJs
cover: "/images/nodejs-read-file-line-by-line/01nodejs-read-file-line-by-line.jpg"
pagetitle: 4 ways to read file line by line in Node.js
description: Learn how to read file line by line in Node.js with sync and async methods using native and NPM modules.
keywords: nodejs read file line by line, read file line by line nodejs, node.js read file line by line, read file line by line node.js

---
There are multiple ways to read a file line by line with Node.js. In Node.js files can be read in sync way or in an async way. With the async path, it is possible to read large files without loading all the content of the file into memory. 

<!-- more -->

Reading the whole file at once will make the process memory intensive. With the ability to load and read a file line by line it enables us to stop the process at any step as per need. In this post, we will look into 3 ways to read a file line by line using Node.js with memory usage comparison.

<img class="center" loading="lazy" src="/images/nodejs-read-file-line-by-line/01nodejs-read-file-line-by-line.jpg" title="4 ways to read file line by line with Node.js" alt="4 ways to read file line by line with Node.js">
## Table of contents

* [Prerequisites](#prerequisites)
* [The test file](#the-test-file)
* [Read file sync](#read-file-sync)
* [Readline](#readline)
* [N-readlines](#n-readlines)
* [Line reader](#line-reader)
* [Other options](#other-options)
* [Quick comparison](#quick-comparison)
* [Conclusion](#conclusion)

## Prerequisites

Before jumping to the code, below are some of the prerequisites to follow along with the provided code examples:

1. Having Node.js 10+ (preferably the latest LTS Node 16) running on your machine/test environment is required. You can even use [Node.js on docker](/blog/2020/11/nodejs-with-docker/) for it.
1. Knowledge of how to install NPM modules would be necessary.
1. Any prior understanding of streams and how they work would be helpful.
1. Any knowledge of [Node’s event-based architecture](https://www.freecodecamp.org/news/understanding-node-js-event-driven-architecture-223292fcbc2d/) will be good to have.

I am running the code on a Mac with Node.js 14. In the following section we will look into the file we are going to use to read line by line with Node.js. The code examples are available in a public [GitHub repository](https://github.com/geshan/nodejs-readfile-line-by-line) for your convenience.

## The test file

For all of the trail runs below we will use a 90 MB [SQL dump file](https://github.com/geshan/nodejs-readfile-line-by-line/blob/master/broadband.sql) which I have taken from this [BroadBandNow clone](https://github.com/mazzyy/BroadbandNow) repository. The same file is used for each method of reading file line by line in Node.js to keep the test consistent across methods. We will also look at the memory consumption and the time it took to read the 90 MB file that has 798148 lines of text. This should be a good test to look at how these ways perform for a relatively large file.

## Read file sync

We can possibly read the file in a synchronous way, meaning loading the whole 90 MB file in memory and loop through it. But, as we will load the whole file first before reading any lines from it the memory consumption will surely be more than 90 MB. Here is a quick example for reading the file line by line but in a not very performant sync way:

```js
const fs = require('fs');

const allFileContents = fs.readFileSync('broadband.sql', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {
  console.log(`Line from file: ${line}`);
});
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
``` 

As we are using the `fs` module which is a native one, there is no need to install any new NPM module. In the above code, we are reading the while file synchronously then looping through each line one by one and printing it to the console with a `console.log`. 

After the looping is done we print out the approximate memory usage. This code can be found in this [pull request](https://github.com/geshan/nodejs-readfile-line-by-line/pull/2) for your reference. If we run this script with a time prefix as below:

```bash
node readfilesync.js
```

It will run and end with output as follows:

<img class="center" loading="lazy" src="/images/nodejs-read-file-line-by-line/02readfilesync.jpg" title="Read file line by line with Node.js using fs.readfilesync" alt="Read file line by line with Node.js using fs.readfilesync">

As expected for a 90 MB file it took ~225 MB of memory and took 7.85 seconds for it to loop through the 798K lines of text.

> If there is a 1 GB file it is not recommended to use this method as it will go out of memory trying to load the whole file into the memory.

Next, we will look at a more performant async way of reading a file line by line with `readline` and a stream which is another native Node.js module.

## Readline

[Readline](https://nodejs.org/api/readline.html) is a native Node.js module so there is no need to install a new NPM module to use it. It can be used to read files line by line by reading one line at a time from any readable stream. We will be using the on method with the `line` [event](https://nodejs.org/api/readline.html#readline_event_line) which is emitted when the input stream receives an end-of-line input `\n, \r,` or `\r\n`. 

Below is the code example of readline with a readable stream:

```js
const events = require('events');
const fs = require('fs');
const readline = require('readline');

(async function processLineByLine() {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream('broadband.sql'),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      console.log(`Line from file: ${line}`);
    });

    await events.once(rl, 'close');

    console.log('Reading file line by line with readline done.');
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  } catch (err) {
    console.error(err);
  }
})();
```

Let’s understand what is going on in the above script. First we require 3 native node.js modules events, fs, and readline. After that, we define async function called `processLineByLine` which creates an interface for readline where the input is a readstram where we pass our 90 MB test file. As per the [create Interface options](https://nodejs.org/api/readline.html#readline_readline_createinterface_options) the crlfDelay set to infinity will consider `\r` followed by `\n` as a single newline.

As we are interacting with a readable stream, on each line read event it will call the `ri.on` function with the `line` event. At that point, we log the contents of the line read from the stream. Then we listen to the readline close event with `events.once` that [creates a promise](https://nodejs.org/api/events.html#events_events_once_emitter_name_options) that will resolve with an array of all the arguments emitted to the given event. It will be an empty array in this case.

Finally, we read the memory usage and log it. You can reference the above code in this [pull request](https://github.com/geshan/nodejs-readfile-line-by-line/pull/3). When we run this script with:

```bash
node readline.js
```

It yields the following output:

<img class="center" loading="lazy" src="/images/nodejs-read-file-line-by-line/03readline.jpg" title="Read file line by line with Node.js using readline native module" alt="Read file line by line with Node.js using readline native module">

As seen above, the readline module with a readable stream took only 6.33 MB of memory to read a 90 MB file.

> As it was streamed which is a lot lesser than 225 MB in the previous sync example.

It completed the process in 7.365 seconds. Next up we will look at the N-readlines NPM module to read a file line by line.

## N-readlines

N-readline is a [NPM module](https://www.npmjs.com/package/n-readlines) that will read file line by line without buffering the whole file in memory. It does this without using streams by reading the file’s content in [chunks](https://github.com/nacholibre/node-readlines/blob/master/readlines.js#L84) using [Buffer](https://nodejs.org/api/buffer.html#buffer_new_buffer_array) and the native file system module. Even though it works in a synchronous way it does not load the whole file in memory.

Below is an example of how to use N-readline to read a file line by line after installing it with `npm i --save n-readlines`:

```js
const nReadlines = require('n-readlines');
const broadbandLines = new nReadlines('broadband.sql');

let line;
let lineNumber = 1;

while (line = broadbandLines.next()) {
    console.log(`Line ${lineNumber} has: ${line.toString('ascii')}`);
    lineNumber++;
}

console.log('end of file.');
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
```

In the above code, first, we require the `n-readlines` module and we instantiate it with our `broadband.sql` file which is 90 MBs. Other [options](https://github.com/nacholibre/node-readlines#new-readlinesfd-options) like `readChunk`  and `newLineCharacter` can be passed in as the second parameter in `new nReadlines` but we go with the default.

Consequently, we define two variables `line` and `lineNumber`. Line variable will hold the string for each line of the file and the `lineNumber` will hold the line number from 1 to the number of lines the file has.

Subsequently, we loop through the lines while there are lines in the file with `broadbankLines.next()` call. As it returns a buffer if a line exists we console log it on the CLI after converting it to an ASCII string. Next, we increment the Line number inside the loop.

Finally, we print `end of file` and like the above examples also print out the approximate memory usage. This code is also available as a [pull request](https://github.com/geshan/nodejs-readfile-line-by-line/pull/5/files) for your reference. We can execute the above script with:

```bash
node n-readlines.js
```

It will render the following output towards the end of the script execution:

<img class="center" loading="lazy" src="/images/nodejs-read-file-line-by-line/04n-readlines.jpg" title="Read file line by line with Node.js using n-readlines npm module" alt="Read file line by line with Node.js using n-readlines npm module">

As seen above it got the task done in 8.9 seconds.

> To print all the 798K lines of the 90 MB SQL file, n-readlines consumed only 4.11 MB memory which is amazing.

In the following section, we will see how the line reader NPM module can be used to read files line by line with Node.js.

## Line reader

Line reader [NPM module](https://www.npmjs.com/package/line-reader) defines itself as “Asynchronous, buffered, line-by-line file/stream reader with support for user-defined line separators.” on its [GitHub](https://github.com/nickewing/line-reader) page. In the [usage](https://github.com/nickewing/line-reader#usage) section of the page, it also mentions that `eachLine` function reads each line of the given file. The `last` variable in the callback can be used to determine if the last line of the file has been reached.

Below is the working example of reading our relatively big 90 MB SQL file with line reader, we installed it with `npm i --save line-reader` and then created the following file:

```js
const lineReader = require('line-reader');

lineReader.eachLine('broadband.sql', function(line, last) {
  console.log(`Line from file: ${line}`);
  if(last) {
    console.log('Last line printed.');
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
  }
});
```

First, we require the line reader module then call the `eachLine` function passing the filename (or file path) as the first parameter. The second parameter is a callback function that has the line and the last variables. Subsequently, we log the line from the file available in the line variable.

Next up, if we find the last variable to be true which indicates we have reached the end of the file we log the `Last line printed` message and also print out the approximate memory used to read the file line by line. This code is also available as a [pull request](https://github.com/geshan/nodejs-readfile-line-by-line/pull/6/files) for your reference.

We can run this code by executing:

```bash
node line-reader.js
```

It will end with an output that looks like the following:

<img class="center" loading="lazy" src="/images/nodejs-read-file-line-by-line/05line-reader.jpg" title="Read file line by line with Node.js using line-reader npm module" alt="Read file line by line with Node.js using line-reader npm module">

As seen above the script finished in 10.66 seconds.

> Compared to 225 MB memory used in `fs.readFileSync`, reading a 90 MB file with line reader took only 5.18 MB of memory which is 45 times lesser.

If you want to restart your Node.js script on each change try out [Nodemon](/blog/2021/02/nodemon/). Next up, we will see if there are other options but we surely have covered the top 3 most popular ones.

## Other options

There are other options to read file line by line with Node.js. There is a very popular NPM module called [readline](https://www.npmjs.com/package/readline) but due to the name collision with the native Node.js module, it has been renamed to [Line By LIne](https://www.npmjs.com/package/linebyline) now. It works very similarly to the native readline module.

Other less popular but available options are, [file readline](https://www.npmjs.com/package/file-readline) and [readlines-ng](https://npmjs.com/package/readlines-ng). Both of them are NPM modules but they were downloaded around 3 times each last week.

For further processing of file contents, using these [JavaScript array functions](/blog/2021/03/javascript-array-functions/) would be very helpful. This takes us to a quick comparison of these available options.

## Quick comparison

A quick comparison of these four NPM modules on [NPM Trends](https://www.npmtrends.com/file-readline-vs-line-reader-vs-n-readlines-vs-readlines-ng) revealed that N-readlines is the most download one with 56K downloads in the last week. The second one is line-reader with 46K downloads last week but keep in mind that line-reader was last updated 6 years ago. Below is a snapshot of downloads for the past 1 year:

<img class="center" loading="lazy" src="/images/nodejs-read-file-line-by-line/06npm-trends-compare.jpg" title="Comparing downloads and other aspects of 4 read file line by line NPM modules on NPM Trends" alt="Comparing downloads and other aspects of 4 read file line by line NPM modules on NPM Trends">

It will be better to choose the popular ones and the one most recently updated is n-readlines which was a year ago.

> The downloads for both file readline and readlines ng are around 3 per week compared to 46K and 56K for line reader and n-readlines respectively.

Make an informed choice for better support if you need it.

In terms of memory and CPU usage all methods except of the first `fs.readfilesync`, all other stream or callback based options consumed under 10 MB or memoery and finished before 10 seconds with 70-94% CPU usage. Read file sync consumed 225 MB of memory for a 90 MB file.

## Conclusion

We looked at how to read a file line by line in Node.js. Even though it seems like a trivial problem there are multiple ways to do it in Node.js like most things in JavaScript.

> We also analyzed the memory usage and time it took for each of the 3 methods.

Finally, we looked at a quick comparison of these and other options available in terms of popularity. I hope it helps you make an informed decision to read a file line by line with Node.js.
