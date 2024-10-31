---
layout: post
title: "How to Read a JSON File Using Node.js"
date: 2024-10-30T19:32:47.000+11:00
comments: true
tags:
- Node.js
- Javascript
- Web Development
cover: "/images/nodejs-read-json-file/01nodejs-read-json-file.jpg"
pagetitle: "How to Read a JSON File Using Node.js"
description: "Learn how to read a JSON file using Node.js. This post covers reading a JSON file synchronously and asynchronously using the fs module and fs-extra NPM package."
keywords: nodejs read json file, node read json file, read json file node, read json file nodejs
---
Reading a JSON (JavaScript Object Notation) file in Node.js is a common task for web developers, especially those working with backend and server-side applications. This tutorial will guide you through the process, breaking down the steps to efficiently read JSON files using both the native Node.js `fs` module and the `fs-extra` npm package.  Let's dive into the world of JSON file handling and equip you with the knowledge to tackle this task seamlessly!

<!-- more -->

<img class="center" src="/images/nodejs-read-json-file/01nodejs-read-json-file.jpg" title="How to Read a JSON File Using Node.js" alt="How to Read a JSON File Using Node.js">

## Table of contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Example: Billionaires Data From 2023](#example-billionaires-data-from-2023)
- [Read JSON File Using Native fs](#read-json-file-using-native-fs)
  - [Read JSON File Asynchronously Using fs](#read-json-file-asynchronously-using-fs)
  - [Read JSON File Synchronously Using fs](#read-json-file-synchronously-using-fs)
- [Read JSON File with fs-extra NPM Module](#read-json-file-with-fs-extra-npm-module)
  - [Read JSON File async with fs-extra](#read-json-file-async-with-fs-extra)
  - [Read JSON File sync with fs-extra](#read-json-file-sync-with-fs-extra)
- [Conclusion](#conclusion)

## Introduction

JSON (JavaScript Object Notation) has become a cornerstone of data exchange on the web.  It's a human-readable format that's also easily parsed by machines, making it ideal for APIs, configuration files, and more.  If you're working with Node.js, chances are you'll encounter JSON files quite frequently.

This blog post provides a clear, concise, and hands-on guide to reading JSON files in Node.js. Whether you're a seasoned developer or just starting out, this tutorial will equip you with the knowledge and techniques to handle JSON data confidently in your Node.js projects.

You will cover two approaches:

1. **Using the native `fs` module:** This is the built-in Node.js module for interacting with the file on the file system. It provides both synchronous and asynchronous methods for reading files.
2. **Using the `fs-extra` npm package:**  This package extends the functionality of the `fs` module, offering more user-friendly methods and simplifying common file operations.

By the end of this tutorial, you'll have a solid understanding of both methods and be able to choose the approach that best suits your needs.

## Prerequisites

Before you dive into the code, let's make sure you have the following prerequisites:

1. **Node.js Installed:** Ensure that you have Node.js installed on your system. You can download the latest LTS version from the official Node.js website. You will use **Node.js 22** for this tutorial. You can check your Node.js version with:

   ```bash
   node --version
   ```

2. **Basic JavaScript Knowledge:** A fundamental understanding of JavaScript syntax and concepts will help you follow along with the code examples.

3. **Code Editor:** You'll need a code editor to write and edit your JavaScript code. Some popular choices include VS Code, Atom, Sublime Text, and WebStorm.

For this tutorial, you will use ESM imports and not `require` as it is 2024. In the next section, you will learn about the data set of billionaires from 2023, which will be used as an example for this guide.

## Example: Billionaires Data From 2023

To illustrate how to read a JSON file using Node.js, you will use a real-world example of data about the top 100 billionaires from 2023. The data is sourced from [Kaggle](https://www.kaggle.com/datasets/nelgiriyewithana/billionaires-statistics-dataset?resource=download) and provides various details about these individuals. We have curated the data to focus on a few key attributes, making it easier to manage for this tutorial. The data is originally in CSV format, and it has been converted to JSON for this tutorial.

Here's a snippet of the JSON data you will use. It is stored in a file named `billionaires-2023.json`. The full data file can be found in this [GitHub repository](https://github.com/geshan/nodejs-json) , a snippet of the data is shown below for your reference:

```json
[
  {
    "rank": 1,
    "worth": 211000,
    "name": "Bernard Arnault & family",
    "gender": "M",
    "category": "Fashion & Retail",
    "country": "France",
    "city": "Paris",
    "source": "LVMH",
    "industries": "Fashion & Retail",
    "citizenship_country": "France",
    "organization": "LVMH Moët Hennessy Louis Vuitton",
    "title": "Chairman and CEO",
    "birth_year": 1949
  },
  {
    "rank": 2,
    "worth": 180000,
    "name": "Elon Musk",
    "gender": "M",
    "category": "Automotive",
    "country": "United States",
    "city": "Austin",
    "source": "Tesla, SpaceX",
    "industries": "Automotive",
    "citizenship_country": "United States",
    "organization": "Tesla",
    "title": "CEO",
    "birth_year": 1971
  },
  // ... rest of the billionaires data
]
```

This JSON data represents an array of objects, each of which corresponds to a billionaire and contains attributes like rank, net worth, name, gender, category, country of origin, and more.

## Read JSON File Using Native fs

The native [fs](https://nodejs.org/api/fs.html) module in Node.js provides a straightforward way to interact with the file system. You’ll explore two methods for reading JSON files using `fs`:

1. `fs.readFile`: This method reads the entire file asynchronously.
2. `fs.readFileSync`:  This method reads the entire file synchronously. 

Using asynchronous methods like `fs.readFile` for non-blocking operations is generally advisable, especially when dealing with larger files. This ensures that your application remains responsive while the file is being read.

### Read JSON File Asynchronously Using fs

Below is an example code for reading the data of 2,240 Billionaires in 2023 in an async way using promises.

```js
import { readFile } from 'node:fs/promises';

try {
  const data = JSON.parse(await readFile('billionaires-2023.json', 'utf8'));
  console.log(data[1]); //Elon Musk's data
} catch (err) {
  console.error(`Error reading JSON file: ${err}`);
}
```

In this example:

1. You import the necessary readFile function from the `node:fs/promises` module to work with promises, providing a more modern asynchronous approach.
2. Inside the `try` block:
   - You read the file asynchronously using `await fs.readFile(filePath, 'utf8')`, specifying the encoding as `utf8`.
   - The read file's content is parsed into a JavaScript object using `JSON.parse(data)`.
   Then, from the parsed data, the data of the second-rank Billionaire, Elon Musk, is logged on the console.
3. If an error occurs during the process in the `catch` block, it is logged with `console.error`.

As you are using Node version 22, top-level await is available. You can run the example with `node index.js`, it will show the following output:

<img class="center" src="/images/nodejs-read-json-file/02nodejs-read-json-file-run.jpg" loading="lazy" title="Run read node.js file with native fs module in async way" alt="Run read node.js file with native fs module in async way">

In the next part, you will read the same file with `fs` but in a sync way.

### Read JSON File Synchronously Using fs

While it's recommended to use the asynchronous method, for completeness, let's
also, see how to read a JSON file synchronously. 

```js
import { readFileSync } from 'node:fs';

try {
  const data = JSON.parse(readFileSync('billionaires-2023.json', 'utf8'));
  console.log(data[1]); // Elon Musk's data
}
catch (err) {
  console.error(`Error reading JSON file: ${err}`);
}
```

This example is similar to the async version, but you use the synchronous `readFileSync` method. You should be aware that this method blocks the event loop until the file is read completely. The example file is 2.66 MB, which is not that big, but for a large file, this can be a time-consuming and CPU-hogging operation.

## Read JSON File with fs-extra NPM Module

`fs-extra` is a popular NPM package that extends the functionality of the native `fs` module. According to [NPM Trends](https://npmtrends.com/fs-extra-vs-fs-extra-promise-vs-fs-extra-tf), it has more than 105 million downloads each week. It provides more user-friendly methods for working with the file system, including a convenient method for file system operations, such as reading JSON files.

To install fs-extra, run the following command:

```bash
npm install fs-extra
```

Next, you will look at an example of reading JSON async using the `fs-extra` NPM package.

### Read JSON File async with fs-extra

Here's an example of reading the JSON file using fs-extra:

```js
import { readJson } from 'fs-extra/esm';

try {
  const data = await readJson('billionaires-2023.json');
  console.log(data[1]); // Elon Musk's data
}
catch (err) {
  console.error(`Error reading JSON file: ${err}`);
}
```

In this example:

1. You import the `readJson` function directly from the 'fs-extra' package.
2. The `readJson` function handles both reading the file and parsing it into a JavaScript object, simplifying the code.

Next is the example of reading JSON files with Node.js in a sync way using the `fs-extra` NPM package.

### Read JSON File sync with fs-extra

You can also use `readJsonSync` to read the JSON file in a sync manner. Below is an example of using the `readJsonSync` function in the `fs-extra` NPM package:

```js
import { readJsonSync } from 'fs-extra/esm';

try {
  const data = readJsonSync('billionaires-2023.json');
  console.log(data[1]); // Elon Musk's data
}
catch (err) {
  console.error(`Error reading JSON file: ${err}`);
}
```

It is the same example as the above async one; the main difference here is that it reads the file in a sync way.

Using `fs-extra` can significantly reduce code complexity and improve readability, especially when performing common file operations.

All the code is available in this [GitHub repository](https://github.com/geshan/nodejs-json) for your reference.

## Conclusion

In this comprehensive guide, you learned how to read JSON files in Node.js using both the native `fs` module and the `fs-extra` npm package. You explored both asynchronous and synchronous approaches, highlighting their advantages and considerations.

You also explored a real-world example using billionaires' data to illustrate how to effectively parse and work with JSON data in your Node.js applications. By understanding the concepts and techniques presented in this tutorial, you're well-equipped to tackle any task that involves reading and manipulating JSON data in your Node.js projects. 

Remember to choose the best method for your needs, considering factors like file size, performance requirements, and your coding style. Keep learning and exploring the power of Node.js to build robust and scalable web applications.

If you need to process the JSON data you read efficiently, you can read about [JavaScript array functions](/blog/2021/03/javascript-array-functions/). Using [nodemon](/blog/2021/02/nodemon/) to automatically restart the Node.js server when you make a code change will also help you become more productive. Happy coding!
