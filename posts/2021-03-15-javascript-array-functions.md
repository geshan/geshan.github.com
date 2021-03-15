---
layout: post
title: 10 JavaScript array functions you should start using today
date: 2021-03-15T21:48:22.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
- NodeJs
cover: "/images/javascript-array-functions/01javascript-array-functions.jpg"
pagetitle: 10 JavaScript array functions you should start using today
description: Use these 10 nifty JavaScript array functions to get your job done easily
  and efficiently. Some of them include map, filter, some, find, and sort. Read more
  about these handy methods.
keywords: javascript array functions, javascript array methods, javascript map, javascript
  filter, javascript some, javascript find, javascript sort, javascript array, javascript
  includes, javascript contains, javascript fill, javascript join

---
In JavaScript, we generally use arrays to represent data or manipulate data, so using JavaScript array functions is very helpful. For instance, if we query a database we will most likely get the rows as an array of objects. Where each object represents a row in the database.

In this post, we will learn about 10 JavaScript array functions that are going to help you easily work with data in the JavaScript arrays. Let’s get started!

<img class="center" src="/images/generic/loading.gif" data-echo="/images/javascript-array-functions/01javascript-array-functions.jpg" title="10 JavaScript array functions you should know about" alt="10 JavaScript array functions you should start using today">

<!-- more -->

## Table of contents

* [Prerequisites](#prerequisites)
* [Javascript array functions](#javascript-array-functions)
  * [Map](#map)
  * [Filter](#filter)
  * [Some](#some)
  * [Every](#every)
  * [Find](#find)
  * [Includes](#includes)
  * [Slice](#slice)
  * [Join](#join)
  * [FIll](#fill)
  * [Sort](#sort)
* [JavaScript array functions examples](#javascript-array-functions-examples)
* [Conclusion](#conclusion)

## Prerequisites

Before we jump into the code, below are some prerequisites to be mindful of:

* You are familiar with the ES6 way of writing JavaScript with the shorthand [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) syntax and one-liners.
*  You are generally familiar with how JavaScript [arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) work and how [callbacks](https://www.freecodecamp.org/news/javascript-callback-functions-what-are-callbacks-in-js-and-how-to-use-them/) work.

Time to get our hands dirty with some example code, scroll a bit more to begin.

## Javascript array functions

An array is a high-level, list-like object in JavaScript that can have a sequence of primitive data types like string, int, or even objects. The array functions that we are going to elaborate on later in this post are built-in functions.

We will use a simple array of objects from the programming-languages API as below:

``` js
const programmingLanguages = [
  {"id": 1,"name": "JavaScript","released_year": 1995,"githut_rank": 1,"pypl_rank": 3},
  {"id": 2,"name": "Python","released_year": 1991,"githut_rank": 2,"pypl_rank": 1},
  {"id": 3,"name": "Java","released_year": 1995,"githut_rank": 3,"pypl_rank": 2},
  {"id": 4,"name": "TypeScript","released_year": 2012,"githut_rank": 7,"pypl_rank": 10},
  {"id": 5,"name": "C#","released_year": 2000,"githut_rank": 9,"pypl_rank": 4}
];
```

Time to learn about our first JavaScript array function, find out what Map does.

### Map

In JavaScript, the array map function creates a new array with the results of calling a given function for each element in the source array. Let’s have a look at a simple array with 5 integers, we will use Map to square each number, meaning multiply the number by itself.

``` js
const programmingLanguageNames = programmingLanguages.map(
  programmingLanguage => programmingLanguage.name
);
console.log(`All programming language names pulled in with map function: ${programmingLanguageNames.join()}`)
```

The above code will fill up the `programmingLanguageNames` const array with 5 elements having values `["JavaScript", "Python", "Java", "TypeScript", "C#"]`. The JavaScript Map method can also be used to loop through each element of the array in a more functional way than using something like a `for` construct.

Reduce function is generally talked about with Map, I would curb the complexity of the [reduce function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) and let you explore it on your own. Step forward to sharpen your functional programming skills.

### Filter

The javascript filter function on arrays creates a new array filled up with the elements that pass the test in the provided function. From our example array, we will filter programming languages that release after 1999, we can do it in the following way:

``` js
const zenZProgrammingLanguages = programmingLanguages.filter(
  programmingLanguage => programmingLanguage.released_year >= 2000
);
console.log('Filter out the programming languages release on or after 2000: ', zenZProgrammingLanguages);
```

The filter function in this case will filter out all programming languages released before 2000. This will result in an array that has 2 objects in the array for Typescript and C#. As the name suggests, the filter JavaScript array function can be used to filter any given array based on a condition.

### Some

The Some JavaScript function executes the callback function once for each array element until it finds one element where the callback returns true. In our example of programming languages, let's try to find if there is any programming language that was released in the year 1995. To do this we will use the `some` function as follows:

``` js
const hasLanguageReleasedin1991 = programmingLanguages.some(
  programmingLanguage => programmingLanguage.released_year === 1991
);
console.log(`Do we have any programming language in our list that was released in 1991? The answer is: ${hasLanguageReleasedin1991} using "some'' function`);
```

When we execute the above code, the const `hasLanguageReleasedin1995` will have a value of true. It will be true because in our list `Python` was released in 1991 which will pass the released_year of 1995 test and set the variable to true. If we try the test with say release_year is 1997 the variable will be set to false as no programming language in our array of 5 was released in 1997.

### Every

JavaScript Every function checks if all the elements of the given array pass a test provided in the callback function. We will check if all the programming languages in our array are among the top 10 programming languages in [GitHut](https://githut.info/). Let’s see how the code unfolds to test that:

``` js
const allAmongTop10InGitHut = programmingLanguages.every(
  programmingLanguage => programmingLanguage.githut_rank <= 10
);
console.log(`Are all programming languages in our list among top 10 on GitHut? The answer is: ${allAmongTop10InGitHut} using "every" function`);
```

The const `allAmongTop10InGitHut` will be true as all the programming languages are below rank 10 on Githut in our list of 5 programming languages.

### Find

The JavaScript array `find` function returns the value of the first element in the given array which passes a given test in the provided callback function. To use this function, let's try to find the No.1 popular language in the [PYPL](https://pypl.github.io/PYPL.html) popularity of Programming languages index and print its name. I have a feeling it is Python, let's put that theory to test.

``` js
const mostPopularLangaugeOnPypl = programmingLanguages.find(
  programmingLanguage => programmingLanguage.pypl_rank === 1
);
console.log(`The most popular programming language as per PYPL index is: ${mostPopularLangaugeOnPypl.name}`);
```

---

For the next set of 5 Javascript array functions, we will use a simple array that has the names of the days in a week.

``` js
const days = [
  "Monday" , "Tuesday", "Wednesday", "Thursday" , 
  "Friday",  "Saturday",  "Sunday"
];
```

### Includes

Javascript array includes function is a search to find if an array contains a given value among its entries. It returns true if the array includes the given value else it returns false. Let’s see if we have “Sunday” in the days of the weeks, expected answer is true:

``` js
const isSundayADay = days.includes("Sunday");
const isFundayADay = days.includes("Funday");
console.log(`Is Sunday a day? Answer: ${isSundayADay} -- Is Funday a day? Answer: ${isFundayADay}`);
```

Looks like Sunday is a day but unfortunately `Funday` is not a day :). On a different note, there can be an alias for `includes` called `contains` that does the same thing.

### Slice

As the name says, the slice JavaScript function will cut the JavaScript array and give the slices. It returns a shallow copy of a portion of the array into a new array object selected from the given start to end. Let’s try to get only weekend days as an example below:

``` js
const weekendDays = days.slice(5,7);
console.log(`Generally most countries in the world get a weekend on: ${weekendDays.join()}`);
```
As seen in the above example, the end is not taken in the slice and the original array (days in this case) is not modified. 

### Join

The join function is a very useful array function in JavaScript. It concatenates all the elements in the array as a string separated by commas by default. We can specify a separator string too. In case the array has only one item, it will be returned without the separator. Time to look at how our `days` array looks like as a string with a `~` separator:

``` js
const funkyDays = days.join('~');
console.log(`Days are flowing in: ${funkyDays}`);
```

If you have noticed we have used the `join` function in the above examples as well. It is pretty similar to the [implode](https://www.php.net/manual/en/function.implode.php) function in PHP. Similar to join there is a [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) function that converts a string into an array.

### FIll

The fill function available on JavaScript arrays changes all the elements in an array to a static value in the given range. If no range is provided it fills up the whole array with the given value. Let's have a look at how it works:

``` js
const allSaturdays = days.fill(“Saturday”);
```

It changes the main array as well, so after this operation, the `days` array will have 7 elements and all of them will be “Saturday:”. A practical use-case of fill I have seen is in the [node-mysql wrapper](https://github.com/namshi/node-mysql/), where it is used to [fill up](https://github.com/namshi/node-mysql/blob/master/index.js#L76
) an array with `?` for [parameterized SQL query](https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html). Another example can be if you need the same data to test performance with a big-sized array.


### Sort

The sort array function in JavaScript sorts the elements of an array in place and returns a sorted array. It converts the array elements into strings and sorts them in ascending order. Let’s see how the days will be sorted by sort in an ascending fashion:

``` js
const sortedDays = ["Monday" , "Tuesday", "Wednesday", "Thursday" , "Friday",  "Saturday",  "Sunday"];
sortedDays.sort();
console.log(`Days cannot be sorted but JavaScript sorts them as: ${sortedDays.join()}`);
```

I hope my days were so easily sorted, but they are not. Sort can also take a function to do the sorting. Here is a good [example](https://javascript.info/array-methods#sort-fn). The sort function can be nifty for quickly sorting elements in an array using the default function or by providing your own function to do the sorting logic.

## JavaScript array functions examples

All the above code examples can be found in this neat [gist](https://gist.github.com/geshan/ecac791ab5ee78e7e680613dd915e520#file-10-js-array-methods-js) for your reference. If you have node installed locally you can quickly run the code without downloading the file in your machine with the command below:

``` bash
curl https://gist.githubusercontent.com/geshan/ecac791ab5ee78e7e680613dd915e520/raw/9f5628539d6e41c6adb225478fc81e4e49dc7026/10-js-array-methods.js | node
```

There are other very useful JavaScript array functions like splice, shift, concat, values, etc. I would really recommend checking [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#browser_compatibility) before using these functions on the browser. In the case of Node.js, you can check the compatibility on [Node.green](https://node.green/#ES2015-built-ins-typed-arrays).

You can try the above examples on [JsFiddle](https://jsfiddle.net/geshan/6cx8em0a/), or do a quick check below (their console is in beta right now):

<script async src="//jsfiddle.net/geshan/6cx8em0a/1/embed/js,result/dark/"></script>

In addition to making your JavaScript code efficient, if you want to make it fast try [JavaScript Memoization](/blog/2021/02/javascript-memoization/). Using [Nodemon](/blog/2021/02/nodemon/) for local Node.js development is also highly advisable.

## Conclusion

We have seen 10 very useful JavaScript array functions that you can use to filter, check if an array contains an element, sort, and do other handy stuff.

> Don’t underestimate the power of arrays, exploit it to make your code simpler to read and maintain with these nifty functions.

Happy coding!