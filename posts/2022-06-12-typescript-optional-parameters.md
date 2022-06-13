---
layout: post
title: How to use TypeScript optional parameters with example code
date: 2022-06-12T17:37:45.000+11:00
comments: true
tags:
- Software Engineering
- Typescript
- Node.js
- Javascript
cover: "/images/typescript-optional-parameters/01typescript-optional-parameters.jpg"
pagetitle: How to use TypeScript optional parameters with example code
description: Learn how to use optional paramters in typescript function with a simple yet useful example in this post.
keywords: typescript optional paramaters, optional parameters typescript, typescirpt function optional parameters, optional paramters in typescript
---

TypeScript is a superset of JavaScript that has climbed up in [popularity](https://trends.google.com/trends/explore?date=today%205-y&q=%2Fm%2F0n50hxv) in the past few years. In this post, we will learn how to use optional parameters in Typescirpt functions, let’s get started!

<img class="center" loading="lazy" src="/images/typescript-optional-parameters/01typescript-optional-parameters.jpg" title="TypeScript optional parameters with example code" alt="TypeScript optional parameters with example code">

<!-- more -->

## Table of contents

* [Example of printing full name](#example-of-printing-full-name)
* [Optional parameters in JavaScirpt](#optional-parameters-in-javascirpt)
* [Optional parameters with TypeScript](#optional-parameters-with-typescript)
* [Default params in Typescript](#default-params-in-typescript)
* [Conclusion](#conclusion)

## Example of printing full name

For this tutorial we will use a simple yet useful example of getting the full name, the rules are:

* If the middle name is provided full name has middle name included
* In case the name has only first and last name the full name will not have middle name included.

It can be coded as below in both JavaScript and TypeScirpt as we will see in the next section as well as how optional parameters make it easy to get the desired output minimzing errors in TypeScript.

## Optional parameters in JavaScirpt

By default, all the parameters in JavaScript are optional. Let’s look at this with above mentioned example of getting the fullname with first name, middle name and last name below:

```js
function getFullName(firstName, lastName, middleName) {
  const fullName = middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
  
  return fullName;
}

console.log(getFullName());
console.log(getFullName('John'));
console.log(getFullName('John', 'Doe'));
console.log(getFullName('John', 'Doe', 'MiddleName'));
```

The above code will give the output as follows:

```bash
undefined undefined
John undefined
John Doe
John MiddleName Doe
```

So in ES6 Javascript there isn’t a way to make a function parameter required, this is how JavaScript works as it is a bit too flexible. That is a reason why we can use TypeScript to add types as well as make the function parameters required, let’s look at the same example with TypeScript. We can use [nodemon](/blog/2021/02/nodemon/) to compile and execute the script on save. We can also use [docker with Node.js](​​/blog/2020/11/nodejs-with-docker/) to deploy the compiled code easily.

## Optional parameters with TypeScript

For the same example we wil now use TypeScript and write the `getFullName` function as below in the `optional-params.ts` file, notice the file is `.ts` for typescript:

```ts
function getFullName(firstName: string, lastName: string, middleName?: string) {
  const fullName = middleName ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`; 
  return fullName;
}

//console.log(getFullName('John')); // compile error - An argument for 'lastName' was not provided.
console.log(getFullName('John', 'Doe'));
console.log(getFullName('John', 'Doe', 'MiddleName'));
```

We will also need to create a `tsconfig.json` file with the following contents:

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "sourceMap": true
  }
}
```

We will use `tsc` and `node` to run the above TypeScript file after compiling it to JavaScript with the following command:

```bash
tsc optional-params.ts && node optional-params.js
```

Given we have Node installed, we can get the TypeScript compiler with `npm install -g typescript`. The above command will first compile the TypeScript file called `optional-params.ts` to Javascript and the second command will execute the Javascript as a Node.js script. It will give us the following output:

```bash
John Doe
John MiddleName Doe
```
Let us quickly go through what the above script does:

1. The `getFullName` function takes 3 parameters, `firstName`, `lastName` and `middleName` where only `middleName` is optional.
1. If there is `middleName` is passed the function will print the full name with middle name else it will only be first name and last name.
1. Line 6 if uncommented will stop the compilation process with the error `An argument for 'lastName' was not provided.` as the last name is a required parameter by default.
1. Line 7 and 8 will work where the first valid call will log `John Doe` without middle name and the second call will log `John MiddleName Doe` with the optional parameter of middle name passed.

You can try the above code in the [TypeScript playground](https://www.typescriptlang.org/play) and fiddle around with it or use [this](https://www.typescriptlang.org/play?#code/GYVwdgxgLglg9mABAcwKZQGIgDbYHICGAtqgBTAwBOAzlISQFyK2UxjIA0i2Bt9qTFm06IiMACbjsqfgH5BUVuwCUiAN4AoRIggJaiULn6IAvKIlSZxVIlmIABgBI1FGnWsBfRM7GTp-L2cePk97RCYnFyoQkkC1YPdY+wBuRC1ESnQQSiRDfGtkjQ8NDQB6Ut0wajhpADpsOGRSNEwcfJJSAHIAKTgACzBO5WVU8p04IgAHGGlEVEpKOEpEAFpEAEEkAkpkEBIwKAMlxE6E-k7EAHdeRDA4Q8nFgDcJVHFajUrquoamlqwjNYur0Bp0uJ0ACJwVBDEafPQ1VD1RrNdAA9pkHr9QbgqEw8EAWQs-mssMKQA) one.

## Default params in Typescript

The above typescript code can be simplified with use of default params, for instance if the `middleName` can be set to  ''- empty string  if not provided the above code can be written as:

```ts
function getFullName(firstName: string, lastName: string, middleName: string = '') {
  const fullName = `${firstName} ${middleName} ${lastName}`; 
  return fullName;
}

//console.log(getFullName('John')); // compile error - An argument for 'lastName' was not provided.
console.log(getFullName('John', 'Doe'));
console.log(getFullName('John', 'Doe', 'MiddleName'));
```

The above function looks pretty similar the main different is, the `middleName` is set as a default value of empty stirng if not provided. This has a similar output as seen below:


```bash
John  Doe
John MiddleName Doe
```

There is a couple of extra spaces when only the first name and last name are printed but that is a tradeoff we can take for the simplified code. All the code is available as part of this [pull request](https://github.com/geshan/ts-optional-params/pull/1) for your reference.


## Conclusion

In this useful guide, we saw how to use optional parameters in Typescript function with a simple yet practical example. I hope it has helped you unravel how optional and default parameters work in TypeScript, keep learning!
