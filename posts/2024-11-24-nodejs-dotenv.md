---
layout: post
title: "How to use environment variables from a .env file in Node.js"
date: 2024-11-24T23:27:45.000+11:00
comments: true
tags:
- Node.js
- Javascript
- Web Development
cover: "/images/nodejs-dotenv/01nodejs-dotenv.jpg"
pagetitle: "How to use environment variables from a .env file in Node.js"
description: "Learn how to use environment variables with the dotenv NPM package and natively with Node 20+."
keywords: nodejs dotenv, node js dotenv, node.js dotenv, nodejs environment variables, node.js environment variables, node.js env variables, node.js env, node.js process.env
---
Environment variables are essential for configuring your Node.js applications, allowing you to tailor settings for different environments like development, testing, and production. While you can set environment variables directly in your system or terminal, a more elegant and organized approach is to use a **.env file**. This file allows you to store all your environment variables in one central location, keeping them separate from your code and making it easy to manage different configurations.

In this comprehensive guide, we'll delve into the world of environment variables in Node.js, explore the role of the popular `dotenv` package, and uncover how to use it effectively. We'll also explore the native way of accessing environment variables in Node.js 20+ using ESM (EcmaScript Modules). Let's get started!

<!-- more -->

<img class="center" src="/images/nodejs-dotenv/01nodejs-dotenv.jpg" title="How to use environment variables from a .env file in Node.js" alt="How to use environment variables from a .env file in Node.js">

## Table of contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Get environment variables using dotenv](#get-environment-variables-using-dotenv)
  - [Installing dotenv](#installing-dotenv)
  - [Creating a .env file](#creating-a-.env-file)
  - [Loading environment variables](#loading-environment-variables)
- [Get environment variables natively Node 20+](#get-environment-variables-natively-node-20%2B)
  - [Using –-env file in node cli](#using-–env-file-in-node-cli)
- [Dotenv is still popular](#dotenv-is-still-popular)
- [Conclusion](#conclusion)

## Introduction

Imagine you're building a Node.js application that needs to connect to a database. You'll need to store the database credentials, such as the host, username, password, and database name, somewhere. Hardcoding these credentials directly into your code is a security risk and makes managing different configurations for different environments difficult.

That's where environment variables come to the rescue. You can store sensitive information like API keys, database credentials, and other configuration settings as environment variables, keeping them separate from your codebase. This enhances security and makes it easier to deploy your application to different environments with different configurations.

A .env file is a simple text file that stores your environment variables in a key-value format. It's a widely adopted convention in the Node.js ecosystem for managing environment variables, and there's a popular NPM package called `dotenv` that makes it easy to load these variables into your application. It also helps you achieve the [config](https://12factor.net/config) part of the 12-factor app. The 12-factor app’s config factor states, “requires strict separation of config from code. Config varies substantially across deploys, code does not.”

## Prerequisites

Before we dive into the code and explore how to use environment variables from a .env file, ensure you have the following prerequisites:

* **Node.js 20 or later installed:**  We'll be using the latest features of Node.js, so having a recent version installed is essential. You can check your Node.js version by running `node --version` in your terminal.
* **A basic understanding of Node.js and NPM:** You should be familiar with running Node.js scripts and installing NPM packages using the `npm install` command.
* **Basic knowledge of JavaScript Modules:** This guide will use ESM imports. This is the new standard for JavaScript modules, and it's supported in Node.js 14 and above.

In the subsequent section, you will learn how to get environment variables using the `dotenv` package.

## Get environment variables using dotenv

[dotenv](https://www.npmjs.com/package/dotenv) is a zero-dependency module that loads environment variables from a `.env` file into `process.env`. It's a simple and convenient way to manage your environment variables, keeping them separate from your code and making deploying your application to different environments easier.

### Installing dotenv

To get started with `dotenv`, you need to install it first. You can install it using the following command in your terminal:

```bash
npm install dotenv
```

This command will install the `dotenv` package from the NPM registry and add it to your project's `package.json` file as a dependency.  At the time of writing `dotenv` is at version [16.4.5](https://www.npmjs.com/package/dotenv/v/16.4.5). 

### Creating a .env file

After you have installed the `dotenv` package, you can create a `.env` file in the root directory of your project. This file will contain all your environment variables. The format of the `.env` file is simple. Each line represents an environment variable, with the key and value separated by an equal sign (`=`). For example:

```bash
DATABASE_NAME=quotes
DATABASE_USER=quotes_user
```

### Loading environment variables

To load the environment variables from your `.env` file into `process.env`, you need to call the `config` method from the `dotenv` module. This should be done at the very start of your application before any other code is executed. A common place to call the config method is in your application's entry point, which is usually `index.js` or `app.js`. For instance:

```javascript
import 'dotenv/config';

const dbName = process.env.DATABASE_NAME;
const dbUser = process.env.DATABASE_USER;
console.log(`Database name is ${dbName} and database username is ${dbUser}`);
```

In the above code example, the `dotenv/config` import call loads the environment variables from the `.env` file into `process.env`. Then, you add two constants, `dbName` and `dbUser`, to get the relevant environment variables and show them on the console with `console.log`. If it was a real application, like an Express.js app, you would have used these variables to instantiate the connection to a database. 

When you run the above `index.js` file with `node index.js` and the relevant `.env` file it will show the following output:

<img class="center" src="/images/nodejs-dotenv/02nodejs-dotenv-use.jpg" loading="lazy" title="Output of using the NPM dotenv package with Node.js version less than 20" alt="Output of using the NPM dotenv package with Node.js version less than 20">

If you want to use a different filename than `.env`. You can import only the `dotenv `module with `import dotenv from 'dotenv';`, you can use a custom `.env` file (not `.env`), you can pass in the path to the file as an argument to the `config` method like the below:

```javascript
dotenv.config({ path: './.env.example' });
```

Another useful way of using `dotenv` without any import or require is to pass it in the node command. For instance for a file named `index-no-imports.js` which as the below contents with the same `.env` file:

```js
const dbName = process.env.DATABASE_NAME;
const dbUser = process.env.DATABASE_USER;
console.log(`Database name is ${dbName} and database user is ${dbUser}`);
```

You can acces the environment variable by executing:

```bash
node --require dotenv/config index-no-imports.js
```

Dotenv has a small ecosystem around it, you can learn more by reading it’s [Readme](https://github.com/motdotla/dotenv) file. There is dotenvx, you can encrypt and decrypt your environment variables, and `dotenv-valut` too. It is supported by companies like Warp, WorkOs and Alloy Automation. It also has a YouTube channel and a [video](https://www.youtube.com/watch?v=YtkZR0NFd1g) explaining how to use it. There are lots of official examples using it from projects like [Next.js](https://github.com/dotenv-org/examples/tree/master/nextjs) to express.

In the next section, you will learn about the native way of accessing environment variables in Node.js 20+.

## Get environment variables natively Node 20+

From Node.js 20+, there is a native way to access environment variables without the
need to install a NPM package like `dotenv.`  From Node 20.6.0, one of the most notable changes is the built-in support for .env files

### Using –env file in node cli

With the same `.env` file and the `index-no-imports.js` file from the above example. You can use the environment variales from the `.env` file in any `js` file with the following command:

```bash
node --env-file .env index-no-imports.js
```

It will result in:

<img class="center" src="/images/nodejs-dotenv/03nodejs-env-file.jpg" loading="lazy" title="Output of using the Node.js --env-file to load env file in Node.js version 20+" alt="Output of using the Node.js --env-file to load env file in Node.js version 20+">

Which is exactly the same as the above output without the need to import `dotenv` in the file or in the command line. This is possible from Node 20.6.0 as it [added built-in support for .env files](https://nodejs.org/en/blog/release/v20.6.0#built-in-env-file-support).

You can update your `.env` file and run the code again and it will pick up the updated
environment variable. This is how you can access environment variables with
`import.meta.env` in Node.js 20+. You can use [nodemon](/blog/2021/02/nodemon/) to restart your applications when a `.js` file changes or even when a `.env` file changes with the correct watches.

For your reference, you can find the code examples in this [GitHub repository](https://github.com/geshan/nodejs-dotenv).

## Dotenv is still popular

Given that Node.js 20+ has provided a native way to access environment variables since Sep 2023 (more than a year from when this blog post was written), you might be wondering why to bother with dotenv? It's a valid question with a valid answer:
`dotenv` is still the most popular package for getting environment variables from a .env file.

> With over 45 million downloads per week as of Nov 2023, `dotenv` is a battle-tested and widely used package in the Node.js ecosystem. 

You can see a comparison of dotenv, node-env-file, and dot-env as per [npm trends](https://npmtrends.com/dot-env-vs-dotenv-vs-node-env-file) below:

<img class="center" src="/images/nodejs-dotenv/04npm-dotenv-popular.jpg" loading="lazy" title="NPM dotevn package is still very popular with more than 45 million downloads each week" alt="NPM dotevn package is still very popular with more than 45 million downloads each week">

As you can see, dotenv is the clear winner, with exponentially more weekly downloads than its competitor, node-env-file. Even though dot-env is a similar library, the downloads are minimal. `dot-env` has not been updated in the past 11 years, though, whereas `dotenv` is a very active project on [GitHub](https://github.com/motdotla/dotenv/commits/master/).

## Conclusion

In this comprehensive guide, you have learned how to access environment variables from
a .env file in Node.js. You explored two methods, the first one using the popular dotenv package and the second one using the native `--env-file` available in Node.js 20+. With the knowledge of both methods, you can now make an informed choice depending on your project's needs.

> If you are working on a new project, I recommend opting for the native `--env-file` method, as it's part of Node.js and doesn't need an external dependency. But if you are working on an existing project that already uses `dotenv`, there's no need to change.

In the end, both achieve the same goal of accessing environment variables from a .env file. Eventually you can move to the native way of accessing environment variables in Node.js 20+ as it's part of the Node.js core and doesn't need an external dependency. This will make your application more lightweight and reduce the number of dependencies.
