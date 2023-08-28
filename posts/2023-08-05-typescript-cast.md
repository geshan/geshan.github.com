---
layout: post
title: A beginner's guide to type casting in TypeScript with examples
date: 2023-08-05T22:05:57.000+11:00
comments: true
tags:
- Software Engineering
- Typescript
cover: "/images/typescript-cast/01typescript-cast.jpg"
pagetitle: A beginner's guide to type casting in TypeScript with examples
description: "In this tutorial, you will learn how to type cast in TypeScript for both
primitive types like string, int and custom Types."
keywords: typescript cast, typescript type casting, typescript type assertion

---
TypeScript, known as a superset of JavaScript, is a powerful programming language that adds static typing to JavaScript. One essential aspect of TypeScript is type casting, also known as type assertions or type conversion, which allows developers to explicitly change the type of a value when needed. In this blog post, we will explore the concept of type casting in TypeScript, its usage, and best practices, supported by illustrative examples. Let's get started!

<!-- more -->

<img class="center" src="/images/typescript-cast/01typescript-cast.jpg" title="A beginner's guide to type casting in TypeScript with examples" alt="A beginner's guide to type casting in TypeScript with examples">

## Table of contents

* [TypeScript Intro](#typescript-intro)
* [Popularity of Typescript](#popularity-of-typescript)
* [Type Casting in TypeScript](#type-casting-in-typescript)
* [TypeScript Implicit Types](#typescript-implicit-types)
* [Implicit Type in Function Return Types](#implicit-type-in-function-return-types)
* [When to Use TypeScript Cast](#when-to-use-typescript-cast)
* [How to Use TypeScript Cast](#how-to-use-typescript-cast)
  * [Example with as](#example-with-as)
  * [Example using Angle Brackets](#example-using-angle-brackets)
  * [When to Choose as vs. Angle Brackets](#when-to-choose-as-vs.-angle-brackets)
* [Caution about Type Casting in TypeScript](#caution-about-type-casting-in-typescript)
* [Conclusion](#conclusion)

## TypeScript Intro

TypeScript is an open-source programming language developed by Microsoft that extends JavaScript by adding optional static typing. It is transpiled into plain JavaScript code and allows developers to catch type-related errors early during development. 

By providing a way to specify types for variables, functions, and objects, TypeScript enhances code predictability and enables better tooling support. The TypeScript compiler checks the code for type correctness and offers better tooling support, making it easier to maintain and scale projects. In the next section, you will learn about the popularity of TypeScript over the years.

## Popularity of Typescript

TypeScript has gained a lot of popularity in the past 10 years due to its many benefits over JavaScript. TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. This means that you can use all of the features of JavaScript in TypeScript, but with the added benefits of type safety.

Compared to one of the few competitors of TypeScript like [CoffeeScript](https://coffeescript.org/), TypeScript has gained a lot of popularity. The below graph shows the popularity of TypeScript over the years.

<img class="center" loading="lazy" src="/images/typescript-cast/02typescript-popularity.jpg" title="Popularity of TypeScript has soared significantly in the past 10 years" alt="Popularity of TypeScript has soared significantly in the past 10 years">

Next, you will learn about type casting in TypeScript.

## Type Casting in TypeScript

Type casting, also known as type assertions or type conversion, is the process of explicitly informing the TypeScript compiler about the specific type of a value when it cannot be inferred automatically. In TypeScript, type casting is useful when working with variables whose type may change during runtime, or when we know more about a value's type than the compiler does.

## TypeScript Implicit Types

Before diving into type casting, it's essential to understand TypeScript's implicit type inference. TypeScript automatically infers the type of variables based on their assigned values. For example:

```js
let age = 30; // TypeScript infers age as type number
let name = "John"; // TypeScript infers name as type string
```

In the above example, TypeScript implicitly determines the types of age and name based on the values they are assigned.

## Implicit Type in Function Return Types

TypeScript's implicit type inference is not limited to variables. It extends to function return types as well. When a function returns a value, TypeScript automatically infers the return type based on the function's implementation.

```js
function add(a: number, b: number) {
  return a + b; // TypeScript infers the return type as number
}
```

In this example, TypeScript infers that the return type of the add function is a number because the function returns the sum of two numbers.

## When to Use TypeScript Cast

Type casting is used in various situations where the TypeScript compiler requires additional information about the type of a value. Some common scenarios include:

String Type to Return Type Conversion: When a function returns a value as a string, but you need to use it as a specific type, type casting can be utilized to convert the string to the desired type.

Type Safety and Type Guards: In cases where you want to narrow down a union type to a specific type (type guard), type casting assists in confirming the actual type of the value.

Working with Specific Types: When dealing with third-party libraries or external APIs, the returned values may not be typed correctly. Type casting enables developers to assert the correct types for these values.

In the following section, you will learn about how to use type casitng in TypeScript.

## How to Use TypeScript Cast

TypeScript provides two primary methods for type casting: using the `as` keyword and using angle brackets (<>). Let's explore examples of both methods:

### Example with as

Consider a scenario where a function returns a value as a string, but you need to treat it as a number for further calculations. The example might seem a bit force so you can focus on the syntax rather than the semantics. Here's how you can use as for type casting:

```ts
function multiply(num1: number, num2: number): string {
  return (num1 * num2).toString();
}

const result = multiply(5, 10);
const convertedResult = result as number;
console.log(convertedResult); // Output: 50
```

In this example, the multiply function returns the result as a string, but we explicitly use the `as` keyword to cast it to the number type in the convertedResult variable.

Below is another example with a custom-defined type:

```ts
type Person = {
  name: string;
  age: number;
}

function getPerson(name:string, age: Number) : Person {
  return {
    name,
    age
  } as Person;
}

function getPartialPerson(name:string) : Partial<Person> {
  return {
    name
  } as Partial<Person>;
}

function getCastedPerson(age: number): Person {
  return {
    age
  } as Person;
}

const person = getPerson('John', 30);
console.log(person); // { name: 'John', age: 30 }

const partialPerson = getPartialPerson('Jack');
console.log(partialPerson); // { name: 'Jack' }

const castedPerson = getCastedPerson(32);
console.log(castedPerson); // { age: 32 }
```

In the above example, you can see a custom type called `Person` being defined with `name` as a string and `age` as a number. The first function `getPerson` sends back a full person type. You could have also made the age parameter a [TypeScript optional parameter](/blog/2022/06/typescript-optional-parameters/) with a default value of like 30.

The second example `getPartialPerson` sends only a partial type removing the name attribute from the `Person` type. The TypeScript [Partial](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) utility type is also very useful in uniti testing scenario when you use a fixture which as a type. You can also utilize the `as unknown as Person` or your own type in the testing scenario to refrain from defining all the attributes for a type with a lot of attributes. Similar example can also be seen for [partial array and object types with Jest](/blog/2022/07/jest-tohavebeencalledwith/#jest-tohavebeencalledwith-partial-array-and-object).

The last example named `getCastedPerson` supposedly sends back a Person type but as it is force cast the name is omitted and sends back an object with just the age. This is a forced type cast that does not comply with the defined type.

### Example using Angle Brackets

Using angle brackets (<>) for type casting is an alternative method, although it is less commonly used due to possible conflicts with [JSX syntax](https://react.dev/learn/writing-markup-with-jsx) if you are using TypeScript with a library like React. Here's the equivalent example using angle brackets:

```ts
function multiply(num1: number, num2: number): string {
  return (num1 * num2).toString();
}

const result:string = multiply(5, 10);
const convertedResult = <number>result;
console.log(convertedResult); // Output: 50 not ‘50’
```

Both methods achieve the same result, but using as is recommended for better compatibility and consistency in TypeScript code. Next, you wll know when to choose the `as` keyword vs. the angle brackets syntax.

### When to Choose as vs. Angle Brackets

The as keyword and the angle brackets (<>) operator are both valid ways to perform type casting in TypeScript. However, there are some cases where one is preferable to the other.

The as keyword is generally preferred when you are sure of the type of the value you are casting. For example, if you know that the value of str is a string, you can safely use the as keyword to cast it to a number.

The angle brackets (<>) operator is generally preferred when you are not sure of the type of the value you are casting. For example, if you are receiving a value from an API, you might not know what type the value is. In this case, you can use the angle brackets (<>) operator to cast the value to a specific type.

## Caution about Type Casting in TypeScript

While type casting is a powerful tool, it should be used with caution to avoid potential pitfalls. Some important considerations include:

* Compatibility: Ensure that the target type aligns with the actual value's type. Incorrect type casting may lead to runtime errors and unexpected behavior.
* Type Guarding: Whenever possible, use type guards to narrow down the type of a value before resorting to type casting. Type guards enhance code safety and reduce the risk of errors.
* Compiler Warnings: Be mindful of the TypeScript compiler warnings related to type casting. These warnings can help catch potential issues early on and improve code quality.

Every tool comes with its one pros and cons and it applies to Type casting as well. Know the tradeoffs and don’t overuse type casting to the point that the whole Type system of TypeScript can feel dysfunctional. Use it optiamally and in the right ways.

## Conclusion

Type casting, or type assertions, in TypeScript allows developers to explicitly specify the type of a value when needed. By understanding how to use as and angle brackets for type casting, developers can enhance type safety and flexibility in their code. Remember to use type casting judiciously, and always consider other options such as type guards before resorting to explicit type conversions.

TypeScript's static typing and type casting capabilities offer significant advantages, making it a popular choice for building robust and scalable applications. As you continue to explore TypeScript, mastering type casting will undoubtedly strengthen your skills as a proficient TypeScript engineer, leading to more reliable and maintainable codebases.
