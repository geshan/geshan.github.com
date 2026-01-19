---
layout: post
title: A beginner’s guide to using TypeScript Record Type with examples
date: 2022-12-20T22:47:55.000+11:00
comments: true
tags:
- Typescript
- Node.js
- Javascript
- Web Development
cover: "/images/typescript-record/01typescript-record.jpg"
pagetitle: A beginner’s guide to using TypeScript Record Type with examples
description: In this tutorial, learn how to use TypeScript Record Utitly Type with a couple of examples and how it converts to JavaScript.
keywords: typescript record, record typescript, typescript record type

---
The TypeScript Record type is a utility type that can be used as a structured dictionary. You can construct a new Type with the allowed Keys and values types In this post, you will learn how to use the TypeScript record type to represent some data and how it translates to compiled JavaScript. Let’s get going!

<!-- more -->

<img class="center" loading="lazy" src="/images/typescript-record/01typescript-record.jpg" title="TypeScript Record Type illustrated with a music Record player" alt="TypeScript Record Type illustrated with a music Record player">

## Table of contents

* [What is the Record type in Typescript](#what-is-the-record-type-in-typescript)
* [Example of Quotes](#example-of-quotes)
    * [TypeScript Record in JavaScript](#typescript-record-in-javascript)
* [Conclusion](#conclusion)

## What is the Record type in Typescript

TypeScript has some handy [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html) to facilitate common type transformations that are available globally. Among them, Record Type is also a utility type which is officially defined as:

>  Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type.

It is not easy to understand and the cat example used in the official docs is also not very useful. In simple words, the Record type is a type available in TypeScript that can ensure consistency in implementing a dictionary (key-value pairs) with fixed values/type for Keys and a defined type for the values. Another feature the Record types provides is keys have to be unique. 

Before you proceed with the example code, you should have Node.js running and some prior knowledge of Node.js, NPM, and TypeScript. Below is a quick example of the TypeScript Record Utility type:

```js
const record:Record<number, string> = {
  1: 'first',
  2: 'second',
  //1: 'another a as key is not allowed'
  //a: 'not allowed type'
};

console.log(`first in the record : ${record[1]}`);
```

The file can be named `simple-record.ts` in your `src` folder. I am using Node.js 18 with a quick TypeScript set up as detailed in this post about [Node.js and TypeScript](https://blog.appsignal.com/2022/01/19/how-to-set-up-a-nodejs-project-with-typescript.html). The code is simple, you define a constant called `record` of type `Record`. This type can have any number as the key and the value must be a string. It is represented below with the data pairs of `1: ‘first’` and so on. Where a key is a number and the value is a string. As `record` is an object the value for the index `1` is printed with console.log.

A couple of important properties of a Record type is, it will not allow the same key more than once. So if you define the key `1` again the TypeScirpt compiler will throw a relevant error. Similarly, if you define a string for the key where the key is expected to be a number it will also show an error. 

You can run the above file with the command `npx ts-node src/simple-record.ts` given TypeScript is set up properly and it will show:

```bash
first in the record : first
```

In the next section, you will see another example that is closer to a real-life data structure. 

## Example of Quotes

Let’s analyze the TypeScript record type more with an example closer to a real-life data structure. In this example imagine you have queried some Quotes from a database table that has id, quote, and author as seen in the [Node.js PostgreSQL](/blog/2021/01/nodejs-postgresql-tutorial/) post. The Ids are unique and you want to represent the quotes in a structure to easily find by a given Id. The Quotes data can be easily illustrated as:

```js
type Quote = {
  quote: string,
  author: string
}

type id = 1 | 2 | 3 | 4 | 5;

type QuotesList = Record<id, Quote>;
```

Here you have defined a new type `Quote` that has the `quote` and `author` attributes, both are of type string. Next, you define a type id which can be a number between 1 to 5 using [Union Type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types). After that, you define a type called `QuotesList` that is a Record type that can have the Keys as the id type so between numbers 1 to 5. The Quotes list can have values associated with easy Key as the `Quote` type which forms a structured dictionary with set types and where the Key cannot be repeated.

Below is some data represented in the above types:

```js
const quotes:QuotesList = {
  1: {
    quote: 'There are only two kinds of languages: the ones people complain about and the ones nobody uses.',
    author: 'Bjarne Stroustrup'
  },
  2: {
    quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    author: 'Martin Fowler'
  },
  3: {
    quote: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson'
    },
  4: {
    quote: 'Java is to JavaScript what car is to Carpet.',
    author: 'Chris Heilmann'
    },
  5: {
    quote: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.',
    author: 'John Woods'
    },  
  // 5: { //will show a syntax error - An object literal cannot have multiple properties with the same name.ts(1117)
  //   quote: 'Truth can only be found in one place: the code.',
  //   author: 'Robert C. Martin'
  // }
  
  // 6: { // error - Object literal may only specify known properties, and '6' does not exist in type 'QuotesList'.ts(2322)
  //   quote: 'SQL, Lisp, and Haskell are the only programming languages that I’ve seen where one spends more time thinking than typing.',
  //   author: 'Philip Greenspun'
  // }
}

if (3 in quotes) {
  console.log(`quotes: `, quotes[3]);
}
```

The data is put in a constant called `quotes` of the above-defined type `QuotesList`. This data can be transformed from a query that pulls in the quotes from one or more database tables. Something to take note of here is, as the `quotes` constant is still an object the `in` operator can be used easily for the console log part. Given the TypeScript Record type works a bit like a hash table the [time complexity](https://www.freecodecamp.org/news/big-o-cheat-sheet-time-complexity-chart/) is O(1) which is always constant even if the object size grows.

Another important thing is the commented parts that remind you that the same key `5` cannot be reused and a key `6` outside of the allowed Keys will also throw an error. You can run this full example as seen in this [file](https://github.com/geshan/typescript-record/blob/master/src/typescript-record.ts) named `typescript-record.ts` with:

```bash
npx ts-node src/typescript-record.ts
```

It will give the following output with the console.log included at the end of the file:

```bash
quotes:  {
  quote: 'First, solve the problem. Then, write the code.',
  author: 'John Johnson'
}
```

You can view both code examples with TypeScript set up and running in this [GitHub repository](https://github.com/geshan/typescript-record). You can fork/clone the repository and explore the code examples on your own. If you use a method, you can try out the [TypeScript optional parameters](/blog/2022/06/typescript-optional-parameters/) to pass in parameters that are not compulsory.

TypeScript always needs to be compiled to JavaScript to execute, in the next section you will find out what TypeScript Record gets complied to when converted to JavaScript/ES6. 

### TypeScript Record in JavaScript

If you look at the compiled JavaScript (which can be done by running `npx tsc`), you will see that the code looks like the below:

```js
"use strict";
const quotes = {
    1: {
        quote: 'There are only two kinds of languages: the ones people complain about and the ones nobody uses.',
        author: 'Bjarne Stroustrup'
    },
    2: {
        quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        author: 'Martin Fowler'
    },
    3: {
        quote: 'First, solve the problem. Then, write the code.',
        author: 'John Johnson'
    },
    4: {
        quote: 'Java is to JavaScript what car is to Carpet.',
        author: 'Chris Heilmann'
    },
    5: {
        quote: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.',
        author: 'John Woods'
    },
    // 5: { //will show a syntax error - An object literal cannot have multiple properties with the same name.ts(1117)
    //   quote: 'Truth can only be found in one place: the code.',
    //   author: 'Robert C. Martin'
    // }
    // 6: { // error - Object literal may only specify known properties, and '6' does not exist in type 'QuotesList'.ts(2322)
    //   quote: 'SQL, Lisp, and Haskell are the only programming languages that I’ve seen where one spends more time thinking than typing.',
    //   author: 'Philip Greenspun'
    // }
};
if (3 in quotes) {
    console.log(`quotes: `, quotes[3]);
}
```

In JavaScript, unlike TypeScript, there are no custom types except Object. So the Record Type is converted to a regular JavaScript object as seen above. Thereby, the custom type is available while writing TypeScript it is not used when executing the code as JavaScript similar to many other TypeScript features.

## Conclusion

In this post, you learned about what the TypeScript Record utility type is. Then you saw a small and simple example of using TypeScript Record. After that, you wrote a longer complex example using TypeScript Record utility types to represent some Quotes. 

Finally, you looked at how the TypeScript Record type is compiled into a regular JavaScirpt object by the TypeScript compiler to produce executable JavaScript. I hope you learned more about TypeScirpt Record type and will use it when needed in your projects.
