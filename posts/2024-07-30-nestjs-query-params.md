---
layout: post
title: "How to use query params in Nest.js a practical step-by-step guide"
date: 2024-07-30T22:40:37.000+11:00
comments: true
tags:
- Javascript
- Typescript
- Nest.js
- Software Engineering
cover: "/images/nestjs-query-params/01nestjs-query-params.jpg"
pagetitle: "How to use query params in Nest.js a practical step-by-step guide"
description: "Learn how to use query params in Nest.js in this easy to understand and follow practical tutorial"
keywords: nestjs query params, nestjs query, nestjs query parameters
---
Query parameters are essential for building dynamic and flexible APIs. They allow clients to filter, sort, and paginate data, making your API more versatile and user-friendly. If you're working with Nest.js, a popular Node.js framework, harnessing the power of Nest.js query parameters is straightforward and intuitive. This guide will walk you through the process, providing clear example and explanations to help you master this crucial aspect of API development step-by-step. Let’s get started!

<!-- more -->

<img class="center" src="/images/nestjs-query-params/01nestjs-query-params.jpg" title="How to use query params in Nest.js a practical step-by-step guide" alt="How to use query params in Nest.js a practical step-by-step guide">

## Table of Contents

* [Nest.js](#nest.js)
* [Nest.js Controller](#nest.js-controller)
* [Nest.js Query Params Code Example](#nest.js-query-params-code-example)
    * [Project Setup](#project-setup)
    * [Add a simple route with quotes](#add-a-simple-route-with-quotes)
    * [Add Nest.js query params to filter quotes by author](#add-nest.js-query-params-to-filter-quotes-by-author)
* [Conclusion](#conclusion)


## Nest.js

[Nest.js](https://nestjs.com/) is a progressive Node.js framework, that provides elegant and efficient ways to handle query parameters. It has first class support for TypeScript and can be termed the backend version of Angular.  It has many opinions and decisions made for you so that you can follow the set standards and focus on your features rather than technical decisions. It comes with features like modularity, dependency injection, type safety, and a rich ecosystem of tools.

As per the [Stackoverflow survey 2024](https://survey.stackoverflow.co/2024/technology#most-popular-technologies-webframe) results, Nest.js is used by 5.8% of all respondents. Similarly, according to the [State of JS 2023](https://2023.stateofjs.com/en-US/other-tools/#backend_frameworks) survey results, Nest.js is used by 29% of the respondents which is less than Express but more than Fastify (17%). This shows that Nest.js is a very popular backend framework for JavaScript(Node.js)/TypeScript.

In this comprehensive guide, we'll delve into the details of working with query parameters in Nest.js, exploring different methods and best practices. By the end, you'll have a solid understanding of how to leverage query parameters to build robust and dynamic APIs.

## Nest.js Controller

Controllers in Nest.js are responsible for handling incoming HTTP requests and returning appropriate responses. They act as the intermediaries between the client and the application logic. When it comes to query parameters, Nest.js offers several decorators to access and utilize them within your controllers. You will learn about them in the next section.

## Nest.js Query Params Code Example

To solidify our understanding, let's work through a concrete code example. We'll create a simple API for managing quotes, allowing clients to fetch quotes, and filter quotes by author.

### Project Setup

Start by creating a new Nest.js project using the [Nest CLI](https://docs.nestjs.com/cli/overview), you can install nest cli with `npm install -g @nestjs/cli` and then run:

```bash
nest new quotes-nest
```

Then you can select `npm` as the package manager. This will generate a new Nest.js project scaffold for you.

<img class="center" loading="lazy" src="/images/nestjs-query-params/02nestjs-select-pm.jpg" title="Select npm as the package manager for Nest.js project scaffolding" alt="Select npm as the package manager for Nest.js project scaffolding">

It will take some time to generate a basic Nest.js app and present you with something like the below:

<img class="center" loading="lazy" src="/images/nestjs-query-params/03nestjs-scaffolded.jpg" title="Nest.js scaffolding done" alt="Nest.js scaffolding done">

Now to test the basic hello world you can run `cd quotes-nest` and then `npm run start:dev` you will see as follows on the CLI

<img class="center" loading="lazy" src="/images/nestjs-query-params/04nestjs-start-dev.jpg" title="Nest.js npm run start:dev output" alt="Nest.js npm run start:dev output">

Then once it runs, open a new browser tab and type `http://localhost:3000` you should see:

<img class="center" loading="lazy" src="/images/nestjs-query-params/05nestjs-hello-world.jpg" title="Nest.js hello world on the browser" alt="Nest.js hello world on the browser">

Hurray! You have successfully set up and run the basic Nest.js scaffold.

### Add a simple route with quotes

As the next step, you will add a simple GET route `/quotes` on the generated `AppContoller` that will serve 5 quotes, to do this you will add the following code to `/src/app.controller.ts` after line 11:

```typescript
@Get('/quotes')
  getQuotes(): Object {
    const quotes = [
      {
        quote: 'There are only two kinds of languages: the ones people complain about and the ones nobody uses.',
        author: 'Bjarne Stroustrup'
      },
      {
        quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        author: 'Martin Fowler'
      },
      {
        quote: 'First, solve the problem. Then, write the code.',
        author: 'John Johnson'
      },
      {
        quote: 'Java is to JavaScript what car is to Carpet.',
        author: 'Chris Heilmann'
      },
      {
        quote: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.',
        author: 'John Woods'
      },
    ];
    
    return { "data": quotes };
  }
```

After that, you will have to save the file which will also restart the server as it is running in dev mode. One important thing to consider here is you are using `Object` as the return type not a defined custom type, in a real-life scenario it would be better to define proper types. 

Now, you can go to `http://localhost:3000/quotes` and you will see the following on your browser tab (if you are on Chrome enable the `Pretty print` check box as seen below):

<img class="center" loading="lazy" src="/images/nestjs-query-params/06nestjs-quotes.jpg" title="Nest.js get all quotes without filtering" alt="Nest.js get all quotes without filtering">

In the next section, you will add a query param to filter quotes by author.

### Add Nest.js query params to filter quotes by author

As the next feature, you will filter the quotes by the author’s name or even part of the author’s name. To do this, you will need to pass the author’s name from the browser. There are multiple ways to get this data on the server, one of the simplest way is using query parameters. These query params can be appended to the query like `http://locahost/quote?author=john`. To parse out the author from the URL you will use the `Query` directive provided in Nest.js core as follows:

```typescript
@Get('/quotes')
  getQuotes(
    @Query('author') author: string,
  ): Object {
    const quotes = [
      {
        quote: 'There are only two kinds of languages: the ones people complain about and the ones nobody uses.',
        author: 'Bjarne Stroustrup'
      },
      {
        quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        author: 'Martin Fowler'
      },
      {
        quote: 'First, solve the problem. Then, write the code.',
        author: 'John Johnson'
      },
      {
        quote: 'Java is to JavaScript what car is to Carpet.',
        author: 'Chris Heilmann'
      },
      {
        quote: 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.',
        author: 'John Woods'
      },
    ];

    const filteredQuotes = author ?
      quotes.filter(quote => quote.author.toLocaleLowerCase().includes(author.toLocaleLowerCase())) :
      quotes;
    
    if (filteredQuotes.length === 0) {
      throw new NotFoundException('No quotes found for the given author');
    }
    return { "data": filteredQuotes };
  }
```

The code is similar to the above, still, there is a big difference that you can now filter the quotes by the author’s name or a part of it. You will also need to import `Query` and `NotFoundException` from `@nestjs/common` for it to work. The full working [controller](https://github.com/geshan/quotes-nestjs/blob/master/src/app.controller.ts) with its test is available in this [GitHub repository](https://github.com/geshan/quotes-nestjs/). 

Once you save the file after importing the needed dependencies and the server restarts. You can point your browser to: `http://localhost:3000/quotes?author=john` you will see there are only 2 quotes returned now as the filtering is working:

<img class="center" loading="lazy" src="/images/nestjs-query-params/07nestjs-quotes-filtered.jpg" title="Nest.js get filtered quotes by author name using query params" alt="Nest.js get filtered quotes by author name using query params">

With the current filtering with `includes` it will give the same output for `http://localhost:3000/quotes?author=joh` which is only part of the author’s name.

Congrats! You have implemented a basic but useful Nest.js query params example that works.

## Conclusion

Query parameters are indispensable for building flexible and dynamic APIs. Nest.js provides an elegant and efficient way to handle query parameters, allowing you to access and utilize them seamlessly within your controllers.

By leveraging the `@Query()` decorator, you can easily retrieve individual query parameters. Further, you can utilize these values to filter, sort, paginate data, and perform other operations to tailor the API response to the client's needs. By implementing best practices like data validation and error handling, you can ensure that your API is robust and resilient.

As you venture further into the world of API development with Nest.js, master the art of query parameters and leverage their power to build truly remarkable APIs that delight your users and drive your applications forward. Keep Coding!
