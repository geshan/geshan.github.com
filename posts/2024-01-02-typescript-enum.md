---
layout: post
title: "How to Use Enums in TypeScript for Cleaner Code"
date: 2024-01-02T23:35:42.000+11:00
comments: true
tags:
- Typescript
- Javascript
- Web Development
cover: "/images/typescript-enum/01typescript-enum.jpg"
pagetitle: "How to Use Enums in TypeScript for Cleaner Code"
description: "Discover how to use enums in TypeScript to create cleaner code and improve your programming skills! Learn how to define, assign, and use enums for more readable and organized code."
keywords: typescript enum, enum typescript, typescript enums, enums typescript
---
TypeScript has emerged as a powerful tool that brings static typing to JavaScript, enhancing code maintainability and reducing bugs. One of TypeScript's features that significantly contributes to code clarity and organization is Enum, short for enumeration. In this blog post, you will learn more about Enums in TypeScript, why and how to use them, let’s get going!

<!-- more -->

<img class="center" src="/images/typescript-enum/01typescript-enum.jpg" title="How to Use Enums in TypeScript for Cleaner Code" alt="How to Use Enums in TypeScript for Cleaner Code">

## Table of contents

* [What are Enums](#what-are-enums)
* [Why Use TypeScript Enums](#why-use-typescript-enums)
    * [Readability and Intention](#readability-and-intention)
    * [Code Maintainability](#code-maintainability)
    * [Autocompletion Support](#autocompletion-support)
    * [Avoiding Magic Values](#avoiding-magic-values)
* [How to Use Enums in TypeScript](#how-to-use-enums-in-typescript)
    * [Example - Order Status](#example---order-status)
    * [Order Status with Numeric Enums](#order-status-with-numeric-enums)
    * [Order Status with String Enums](#order-status-with-string-enums)
    * [Heterogeneous Enums](#heterogeneous-enums)
* [More about Enums](#more-about-enums)
* [Conclusion](#conclusion)

## What are Enums

Enums, short for enumerations, are a feature of languages that allows developers to define a set of named constants, allowing developers to represent a group of related values in a more meaningful and readable way. These named constants represent a distinct set of values that are related in some way. 

Enums are available in other languages like [Java and C#](https://weyprecht.de/2019/10/16/enums-in-csharp-and-java/), even databases like [MySQL](https://dev.mysql.com/doc/refman/8.0/en/enum.html) and [Postgres](https://dev.mysql.com/doc/refman/8.0/en/enum.html) have Enum type.  Unfortunately, JavaScript does not support Enums natively, even though a workaround can be to use a regular JavaScript object as a proxy Enum. TypeScript, on the other hand, has support for Enums. In TypeScript, Enum makes it possible to create a symbolic name for a set of values, providing more meaningful names to improve code readability.

Let's dive deeper into the structure of Enums in TypeScript. Enum declarations begin with the `enum` keyword, followed by the name of the enumeration. Inside the braces, you list the possible values of the enum, each separated by a comma. Below is a simple Enum for traffic lights:

```typescript
enum TrafficLights {
  Red,
  Yello,
  Green,
}
```

In this example, you have created an enum named `TrafficLights` with three possible values: `Red`, `Yello`, and `Green`. By default, TypeScript assigns numeric values starting from 0 to each enum member. In this case, `Red` will have the value 0, `Yellow` will have 1, and so on.

In the next section, you will learn why to use Enums in Typescript.

## Why Use TypeScript Enums

Now that you understand what Enums are in general and have seen a simple TypeScript example, let's explore why you might want to use them in your TypeScript projects.

### Readability and Intention

Enums improve the readability of your code by replacing magic numbers or strings with meaningful names. Instead of using `if (status === 1)`, you can write `if (status === OrderStatus.Processing)`, making your code self-explanatory and reducing the likelihood of errors.

### Code Maintainability

Enums make your code more maintainable by centralizing the definition of related constants. If you ever need to add, remove, or modify a value, you can do so in one place – the enum declaration; rather than hunting through your codebase for every occurrence of a particular constant. It is also helpful to replace existing values by searching for the enum.

### Autocompletion Support

Integrated development environments (IDEs) that support TypeScript, such as [Visual Studio Code](https://code.visualstudio.com/), provide autocompletion for enum members. This accelerates the coding process, minimizes the risk of typos, and decreases the possibility of introducing a bug.

### Avoiding Magic Values

You can avoid magic values with Enums. Using Enums properly "magic values" scattered throughout your code can be centralized in a single location. Magic values are hard-coded constants that lack clear context. Enums provide a named representation, adding clarity to your codebase. For example `if (platform === 0)` is much harder to read vs `if (platform === platforms.mobile)`, here the 0 is the magic value.

In the next part, you will learn how to use Typescript Enums with an example of order statuses.

## How to Use Enums in TypeScript

Now that you have established the benefits of using Enums, let's walk through practical examples of how to implement them in TypeScript. For this, you will use order statuses as an example. If you have placed an order on any e-commerce website it will have some status like placed, processing (packed), shipped, and delivered for the happy path. It can also have other statuses like canceled, returned, etc but we will not include them.

### Example - Order Status

Consider a scenario where you're working on an e-commerce platform, and you need to represent different order statuses. Instead of using numeric or string literals, Enums provide a cleaner solution.

```typescript
enum OrderStatus {
  Placed,
  Packed,
  Shipped,
  Delivered,
}
```

In this example, we've defined an enum named `OrderStatus` with four possible values: `Placed`, `Packed`, `Shipped`, and `Delivered`.  More on what the values will be for the above Emum in the next segment.


### Order Status with Numeric Enums

By default, TypeScript assigns numeric values starting from 0 to each enum member. So, for the above example, `Placed` will have a value of 0 and `Delivered` will have value of 3. However, you can customize these values if needed, as seen below.

```typescript
enum OrderStatus {
  Placed = 1,
  Packed = 2,
  Shipped = 3,
  Delivered = 4,
}
```

Now, `OrderStatus.Placed` will have the value 1, `OrderStatus.Packed` will have 2, and so on. The following code will also behave the same as the above example:
```typescript
enum OrderStatus {
  Placed = 1,
  Packed,
  Shipped,
  Delivered,
}
```

You can try out all the examples locally with TypeScript or on the [TypeScript Playground](https://www.typescriptlang.org/play) without installing anything on your local machine. Below is an example of the auto-incremental values running on the [TypeScript Playground](https://www.typescriptlang.org/play?#code/KYOwrgtgBA8gTgE2HAygFwIZrAZygbwCgooAFAGwwGNgEoBeKARgBpizqBrWtklACwCWAB2E92AEWDlBAN2TiAvoUJUA9iBxrywAHTk1AcwAU8JKkzYcu0l1oBKIA):

<img class="center" loading="lazy" src="/images/typescript-enum/02typescript-enum-playground.jpg" title="Order Status TypeScript enum example running on TypeScript playground" alt="Order Status TypeScript enum example running on TypeScript playground">

You can run all the code examples in this blog post on TypeScript playgroud to see how it run and what it compiles to in the form of JavaScript. Next, you will look into Order Status enum with strings.

### Order Status with String Enums

In addition to numeric enums, TypeScript supports string enums, where each enum member is initialized with a string value.

```typescript
enum OrderStatus {
  Pending = "Pending",
  Processing = "Processing",
  Shipped = "Shipped",
  Delivered = "Delivered",
  Canceled = "Canceled",
}
```

This approach can be beneficial when you want more descriptive values or use the enum values as keys in an object.

Next, you will learn about more concepts related to TypeScript emums like Heteregenous enums and extracting object types of Enums.

### Heterogeneous Enums

Unlike other languages, TypeScript allows for heterogeneous enums, where some members have numeric values, and others have string values. You can also mix up numbers and strings as the values for Enums which is called Heterogenous Enums, as seen below:

```typescript
enum Status {
  Success = 200,
  NotFound = "Not Found",
  Error = "Internal Server Error",
}
```

This flexibility can be useful in scenarios where a mix of data types is required, but that is not recommended in the official [TypeScript docs](https://www.typescriptlang.org/docs/handbook/enums.html#heterogeneous-enums). Subsequently, there are some useful concepts about TypeScript Enums that would be great for you to know about.

## More about Enums

There are more things to Enums than the ones already mentioned in this post. It would be useful for you to know about [Ambient Enums](https://levelup.gitconnected.com/introduction-to-typescript-enums-const-and-ambient-enums-1fe686b67495), which are basically like a redefinition of existing enums. Similarly it would be helpful to know about [exrtracting object type of Enums](https://www.digitalocean.com/community/tutorials/how-to-use-enums-in-typescript#extracting-the-object-type-of-enums), that can make it easier to use Enum as a Type in TypeScript. Other couple of interesting things about Enums that would be handy for you to know are, how enums are represented on [runtime](https://www.typescriptlang.org/docs/handbook/enums.html#enums-at-runtime) and [compile time](https://www.typescriptlang.org/docs/handbook/enums.html#enums-at-compile-time).

## Conclusion

In conclusion, Enums in TypeScript are a powerful tool for improving code readability, maintainability, and intention. By providing named constants, Enums make your code more self-explanatory and less error-prone. Whether you're representing order statuses, HTTP status codes, or any other set of related values, Enums offer a cleaner and more organized solution.

As a software engineer, leveraging Enums in TypeScript is not just a best practice; it's a step towards writing more robust and maintainable code. Embrace Enums, and witness the transformation of your code into a clearer and more expressive form.
