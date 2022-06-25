---
layout: post
title: 3 efficient ways to generate UUID in Node.js
date: 2022-01-09T22:57:55.000+11:00
comments: true
tags:
- Software Engineering
- Node.js
- Javascript
cover: "/images/nodejs-uuid/01nodejs-uuid.jpg"
pagetitle: 3 efficient ways to generate UUID in Node.js
description: Learn how to generate UIUD in Node.js with one Native module and two
  NPM packages in this useful tutorial.
keywords: nodejs uuid, uuid nodejs, node.js uuid, uuid node.js

---
Universally Unique Identifier (UUID) is very useful. In Node.js there are many ways to generate a UUID. One of them is with a native module and others are using NPM packages. UUID can be very useful as reliable unique identifiers. In this post, you will learn how to generate a UUID using Node.js and briefly understand when and why to use them. Let’s get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/nodejs-uuid/01nodejs-uuid.jpg" title="How to generate UUID with Node.js" alt="How to generate UUID with Node.js">

## Table of contents

* [Prerequisites](#prerequisites)
* [When to use Node.js UUID](#when-to-use-nodejs-uuid)
    * [Get your competitor’s order volume example](#get-your-competitor’s-order-volume-example)
    * [Hide your autoincrement ID](#hide-your-autoincrement-id)
* [Methods to generate UUID in Node.js](#methods-to-generate-uuid-in-node.js)
    * [Node.js UUID with Crypto module](#nodejs-uuid-with-crypto-module)
    * [UUID NPM Package](#uuid-npm-package)
* [Nano ID to generate UUID using Node.js](#nano-id-to-generate-uuid-using-node.js)
* [Quick comparison](#quick-comparison)
* [Conclusion](#conclusion)


## Prerequisites

Prior to jumping into the code, below are some of the things best to have in order to run the code examples in the later sections.

1. You will need Node.js working on your machine and some knowledge of how to work with Node.js is essential. The latest LTS version of Node.js is expected which is 16 at the time of writing this.
1. Able to use NPM to install some NPM modules would be very helpful
1. Any prior knowledge of unique IDs and their usage will be beneficial but not essential.

Given we have that mentioned, in the next section we will look into why and when to use a UUID.

## When to use Node.js UUID

UUID is a great way to hide sequential database IDs. They can also be used to act as a hash which can be decoded back to an integer or other identifier. A sequential auto-increment ID can reveal much more than you intended. There are other great usages of UUID but hiding the autoincrement ID stands out in my opinion.

### Get your competitor’s order volume example

For example, you have an e-commerce website and you have a fierce competitor. You have found out that the order ID used by your competitor is an autoincrement integer primary key. Now to know the order volume of your competitor all you need to do is order on the first day of the month and the last day of the month.

If the order ID on the first day of the month is 100020 and the order ID on the last day of the month is 111050. You can quickly do the math that your competitor has (111050-100020) 11030 orders in 30 days. Averaging at 367.66 orders per day, you can easily do the math for each week. 

Just with the order id which is an autoincrement integer your competitor, possibly unknowingly is giving out a vital business metric to anyone who can do some due diligence. That is why exposing auto-increment IDs is bad. The same example can be applied for customer ID or shipment ID or any other integer identifier that increments by 1.

### Hide your autoincrement ID

Baseline, whenever you need to hide your autoincerment ID it is best to use a random number or pattern that is hard if not impossible to guess. Or you can opt to use an UUID. If you want to read more about UUID feel free to read the wiki page which explains [UUID4](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)) too.

If you are interested in doing other things with Node.js, please do browse [reading file line by line with Node.js](/blog/2021/10/nodejs-read-file-line-by-line/). Using [nodemon](/blog/2021/02/nodemon/) with these code examples will help too.

In the consequent part, you will learn 3 methods to generate a UUD in Node.js regardless of any framework you use.

## Methods to generate UUID in Node.js

There are multiple ways to generate at UUID in Node.js. We will discuss one native way to do it and two NPM packages that can do it. There are of course a [lot of](https://www.npmjs.com/search?q=uuid) other NPM packages that can perform that task but we will see code examples of the 2 most popular options.


### Node.js UUID with Crypto module

The `crypto` module was added from Node.js 14.17.0. It provides cryptographic functionally for multiple methods and algorithms like OpenSSL’s hash, HMAC, cipher. It also provides a method called [randomUUID](https://nodejs.org/docs/latest-v14.x/api/crypto.html#crypto_crypto_randomuuid_options) to generate UUID in Node.js without instaling any new NPM module.

The method takes an options object that can have a `disableEntropyCache` boolean value that defaults to values. When it is set to `true` it doesn’t use the cache on the UUID generation. Below is a code example of Cryto module’s randomUUID function:

```js
const crypto = require('crypto');
console.log(crypto.randomUUID());
```

You can run the above command in a file named `uuid-crypto.js` with `node uuid-crypto.js` which will give an output like below:

```bash
node uuid-crypto.js 
00a6fa25-df29-4701-9077-557932591766
```

As this is a native module, we did not need any package.json file or npm commands. This can also be easily run on the CLI with `node -i` like the following:

<img class="center" loading="lazy" src="/images/nodejs-uuid/02nodejs-uuid-crypto.jpg" title="Generate UUID with Node.js native crypto module" alt="Generate UUID with Node.js native crypto module">

In the consequent part, you will learn how to use the UUID npm package to generate a UUID in Node.js.

### UUID NPM Package

In addition to the native crypto module, you can surely use other NPM packages. The most popular NPM package to generate UUID is [uuid](https://github.com/uuidjs/uuid). Of course, an NPM package will be needed if your application is in Node version 14.16 or below. UUID can be used in Node.js 10 and 12 too. It also supports UUID versions 1,3,4 and 5.

To install the UUID npm package, you can run `npm install —save uuid` given your project is set up with NPM and has the package.json and relevant lock file. You can quickly try out the UUIDs generated by this package with the code below named in a file `uuid-uuid.js`:

```js
const uuid = require('uuid');
console.log(`Here is a test v1 uuid: ${uuid.v1()}`);
console.log(`Here is a test v4 uuid: ${uuid.v4()}`);
```

When you run the file on the CLI with `node uuid-uuid.js` you will get an output similar to the below:

```bash
node uuid-uuid.js
Here is a test v1 uuid: 60b40630-713c-11ec-8cff-7f82f42f57ce
Here is a test v4 uuid: aceaa425-7769-4ad7-af6b-422d25f23be9
```

That we pretty easy right? And you can choose which version of UUID you want to use. Version 1 is timestamp-based and version 4 is random.

Consequently, we will use the Nono ID NPM package to generate UUID with Node.js.

## Nano ID to generate UUID using Node.js

[Nono ID](https://github.com/ai/nanoid) is another popular NPM package used to generate UUID in Node.js. It brands itself as “A tiny, secure, URL-friendly, unique string ID generator for JavaScript.”. It is supposedly 2 times faster than UUID and smaller. It is also ported to 20 programming languages.

Similar to installing any other NPM package you can install Nano ID by executing `npm install --save nanoid`. Below is the code example of generating a couple of UUIDs with Node.js using the Nano ID package:

```js
const Nanoid = require('nanoid');
const NanoidAsync = require('nanoid/async');

console.log(`UUID with Nano ID sync: ${Nanoid.nanoid()}`);

(async function() {
  const nanoId = await NanoidAsync.nanoid();
  console.log(`UUID with Nano ID async: ${nanoId}`);
})();
```

The first example is using the Nano ID packing in a sync way and the second one uses it in an Async way. Using ES6 import might have made it a bit easier to read, you can check out the ES6 import based examples on the Nano ID Github [readme](https://github.com/ai/nanoid#api).

Given the file is saved as `uuid-nanoid.js`, you can run the above example with `node uuid-nanoid.js` which will yield an output similar to the following:

```bash
node uuid-nanoid.js
UUID with Nano ID sync: yWuImr95L9rj0y74itnSC
UUID with Nano ID async: UyK6T7_ENrr7JKrwz3s37
```

As known, the random UUIDs will surely be different for you than the example I have posted above. Both the above NPM modules can be used in the browser too. 

All the above code examples can be found in this [GiHhub repository](https://github.com/geshan/nodejs-uuid) for your reference.

In the subsequent sections, we will look at a fast popularity comparison between the above two and other NPM modules that can generate UUID in Node.js.

## Quick comparison

There are surely other NPM packages to generate UUID. Below is a quick comparison from [NPMTrends](https://www.npmtrends.com/cuid-vs-nanoid-vs-uuid-vs-uuid-js-vs-uuid4-vs-shortid) for [UUID](https://npmjs.com/package/uuid), [Nano ID](https://npmjs.com/package/nanoid), [cuid](https://npmjs.com/package/cuid), [shortid](https://npmjs.com/package/shortid), [uuid-js](https://npmjs.com/package/uuid-js) and [uuid4](https://npmjs.com/package/uuid4):

<img class="center" loading="lazy" src="/images/nodejs-uuid/03nodejs-uuid-npmtrends.jpg" title="Comparision of Node.js UUID related NPM modules on NPM Trends" alt="Comparision of Node.js UUID related NPM modules on NPM Trends">

As seen above, UUID is by far the most popular one with over 50 million weekly downloads. The second most downloaded NPM package is Nano ID with 15 million weekly downloads. Time to wrap up!

## Conclusion

With this post, you have learned how to generate a UUID in Node.js using either the native crypto module or a couple of popular NPM packages. Other NPM package options were also briefly listed and compared to choose one that fits your needs.

The main question here is not which package or library to use.

> The vital question to answer here is when and why to use UUIDs in your applications built with Node.js which the prior [section](#get-your-competitor’s-order-volume-example) answers properly with an apt example.

I hope you have learned a useful way to obscure important information that needs to be exposed and identified uniquely.