---
layout: post
title: JavaScript: Return multiple values from a function call with code examples
date: 2022-07-23T22:52:35.000+11:00
comments: true
tags:
- Javascript
- Software Engineering
cover: "/images/javascript-return-multiple-values/01javascript-return-multiple-values.jpg"
pagetitle: JavaScript: Return multiple values from a function call with code examples
description: Find out how I run one of the world's top 370K website for free. Quick answer Cloudflare free plan, full details in the post.
keywords: run world's top website for free, top website free

---
Learn how to return multiple values from a function call in Javascript. Unlike [go lang](https://gobyexample.com/multiple-return-values), JavaScript does not have a native way to return multiple values from a single function. In this post, you will learn how to improvise on this and get around the issue if you have to get back multiple values from a JavaScript function call. Time to get going.

<!-- more -->

<img class="center" loading="lazy" src="/images/javascript-return-multiple-values/01javascript-return-multiple-values.jpg" title="Run one of the world's top 370K websites for free" alt="Run one of the world's top 370K websites for free">

## Table of contents

* [JavaScript function returning a single value](#javascript-function-returning-a-single-value)
* [Returning multiple values in Go lang](#returning-multiple-values-in-go-lang)
* [Return multiple values in JavaScript function using an array](#return-multiple-values-in-javascript-function-using-an-array)
* [Return multiple values using an object](#return-multiple-values-using-an-object)
* [Code on JsFiddle](#code-on-jsfiddle)
* [Conclusion](#conclusion)

## JavaScript function returning a single value

When the `getPersonalData` function below runs, it returns a single string value for the `full name` of a person.

```js
function getPersonalData() {
  const fullName = ‘John Doe'
}
```
Let’s say if you have the need to return multiple values from the `getPersonalData` function like both the full name and age of the person how will you get it done?


## Returning multiple values in Go lang

In languages like Go lang, there is a possibility to return multiple values from a function, below is a code example with Go: 

```go
package main

import "fmt"

func getPersonalData() (string, int) {
    return "John Doe", 24
}

func main() {	
    fullName, age := getPersonalData()
    fmt.Println(fullName)
    fmt.Println(age)
}
```

As you can see above, the function `getPersonalData` returns two values. The first one is the string for full name and the second one is an integer for age. It is available on [Go Playground](https://go.dev/play/p/SJpjKFWrrHC) if you want to fiddle around.

Unfortunately, JavaScript does not have a native way like in Go lang to return multiple values from a function. But there are two built-in and easy ways to return multiple values from a function in JavaScript with Array and Object. In the next section, there is an example of returning multiple values with an array.

## Return multiple values in JavaScript function using an array

A JavaScript array can be used to get around the problem of returning multiple values from the same function. Below are two examples of using a JavaScript array to return multiple values. It will return both the full name and age of the person from the `getPersonalData` function:

```js
function getPersonalData() {
  const fullName = 'John Doe';
  const age = 24;

  return [fullName, age];
}

const person = getPersonalData();
console.log(`${person[0]} is ${person[1]} years old.`);
```

As seen above, multiple (two) values have been returned from the `getPersonalData` function wrapped in an array. A better and more expressive way of doing this with [desctrcturing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) in JavaScirpt which will look like:


```js
function getPersonalData() {
  const fullName = 'John Doe';
  const age = 24;

  return [fullName, age];
}

const [fullName, age] = getPersonalData();
console.log(`${fullName} is ${age} years old.`);
```
If you notice the square brackets `[fullName, age]`, that is the destructuring part which makes naming the values on the first and second index of the array possible. So in the above code, the value on the first index is named `fullName` and the value in the second one is named `age`. These two well-defined variables make it very easy to understand the multiple values returned by the `getPersonalData` function.

 If you want to get unique values from an array you can try [JavaScript set](/blog/2021/12/javascript-set/). In the process, you can also learn about other [javascript array functions](/blog/2021/03/javascript-array-functions/) like map, filter, and find. The next section will include the same result with an object to return multiple values from a function.

## Return multiple values using an object

Another easy and native way in JavaScript to return multiple values from a function is using an Object. You can return the full name and age of a person from the function by packaging the values as properties of an object. Below are two code examples with and without destructuring:

```js
function getPersonalData() {
  const fullName = 'John Doe';
  const age = 24;

  return {fullName, age};
}

const person = getPersonalData();
console.log(`${person.fullName} is ${person.age} years old.`);
```

You can see above the full name and age of `John Doe` has been packaged as properties of an object. This enabled the code to return two values from the function. Following this approach, even returning more than two values from a function in JavaScript will be easy to attain.

The same code using the power of destructuring to make it more eloquent and easier to understand is as follows:

```js
function getPersonalData() {
  const fullName = 'John Doe';
  const age = 24;

  return {fullName, age};
}

const {fullName, age } = getPersonalDataObj();
console.log(`${fullName} is ${age} years old.`);
```

Same as above the `{fullName, age}` is used to destructure the object in this example. Here, the variable names match the property of the object which makes it easier to comprehend.

You can view all the code examples in this [GitHub repository]. For your convenience, you can quickly fiddle around with the code examples on [JsFiddle](https://jsfiddle.net/geshan/3nojub9q/10/) too.

## Code on JsFiddle

Below is the running code example of Js fiddle, be sure to view the console to see the output of the code examples:

<script async src="//jsfiddle.net/geshan/3nojub9q/10/embed/js,result/"></script>

## Conclusion

Following this quick tutorial you have learned two different ways to return multiple values from a function in JavaScript. The first one was with an array and the other one was using an object. I hope it has solved an issue for you, keep learning JavaScript!
