---
layout: post
title: Create small pull requests by using enabler code last
date: 2020-10-02T22:10:25.000+11:00
comments: true
tags:
- Software Engineering
cover: "/images/small-pull-requests/01small-pull-requests.jpg"
pagetitle: How to create small pull requests with enabler code last
description: Learn how to create small pull requests that get reviewed and approved
  faster. With the enabler code last approach there is no effect to produciton too.
keywords: small pull requests, small pull requests, smaller pull requests, pull request
  best practices

---
There are multiple ways to create small pull requests for a single task. This post discusses an easy way to do it which has no impact on production code. The steps are laid out in a way that small pull requests will be reviewed faster with no effect on production too. Let’s see how that happens with enable code last:

<img class="center" loading="lazy" src="/images/small-pull-requests/01small-pull-requests.jpg" title="Create small pull requests by using enabler code last" alt="Create small pull requests by using enabler code last">

<!-- more -->

## Importance of small pull requests

Without doubts, small pull requests are efficient and effective. Big pull requests with >200 lines of code have multiple disadvantages. As per a [study](https://smallbusinessprogramming.com/optimal-pull-request-size/), longer it takes for the reviewer to find a big enough slot of time to address it.

Similarly, larger pull requests have less chance it will pass code review on the first attempt and therefore require multiple reviews.

On the other hand, as Donald G. Reinertsen mentions in his book The [principles of product development flow](https://www.ontheagilepath.net/2017/02/key-take-aways-from-the-principles-of-product-development-flow.html) smaller batch size reduces cycle time and accelerates feedback.

> Smaller batch sizes also reduce risk and overhead. Thereby, small pull requests also have the same effect.

As per [Github's Octoverse 2020 Productivity report](https://octoverse.github.com/static/github-octoverse-2020-productivity-report.pdf) on page 5, the first `key finding` is:

> Small pull requests drive innovation and productivity

It further adds, "Teams that focus on small pull requests and closer collaboration have better reviews and faster feedback. Throughout the year, developers stepped up their work by keeping pull requests at the same size or smaller and merged pull requests up to seven and a half hours faster. This gives developers more time to do the things they love". Yet another data backed reason to have smaller pull requests.

In my personal experience, I have opened pull requests with 50 files changed and 2 files changed. Of course, the one with only 2 files changed and \~100 lines changed got merged a lot faster.

## Role of enabler code in small pull requests

So, great to know smaller pull requests get merged faster but the most important question is how to make the batch smaller. Making a pull request smaller makes it a lot easier to review. This results in getting approval faster, which means the cycle time is reduced.

> Without doubt, large batch sizes reduce efficiency and the same definitely applies for large pull requests.

I have mentioned this in my previous post about [how to get your pull request reviewed faster](/blog/2019/12/how-to-get-your-pull-request-pr-merged-quickly/) too, this time below is a practical example.

### Some considerations

1. The example below applies only to web applications (probably most of the software the readers of this blog write is web development in some way or form)
2. As soon as we talk about a website or web application, the cement that glues together the path/URI with code (generally a controller) becomes a pivotal part of this approach
3. For this solution to be really useful, utilizing a form of automated testing will be necessary. Unit tests would be an optimal choice in this case.
4. Given example is of a backend API. Still, the same concepts can be easily used for a frontend application or any other web application.

## Example of small pull requests

We will be using an example application that gives out currency conversion rates. The application is [open source](https://github.com/geshan/currency-api) and already running. For this example, we are adding a new feature to list all the rates for a given currency with pagination.

As we want to have small pull requests we will divide the task into two pull requests.

> If you have a big system with code spread across over multiple files it can be broken down into more than two smaller pull requests.

It will also be advisable to have new files/classes into different small pull requests. As these files will have their own tests it will be a lot easier to review and get merged.

> The main trick here is in the last pull request with enabler/glue code. Until the last pull request with the enabler code that stitches all the code added prior to it with a route is not deployed there is no effect.

Let’s see how to do this.

### First small pull request

The first small pull requests will have the functionality to list all the rates for a given currency. It will also have pagination implemented. We will verify that it works with unit tests.

A better way to do this first part would be to write the functionality without pagination. It will have tests for this feature without pagination. The next step could have been to add the pagination part and the related tests or modify existing tests to accommodate the pagination changes in another small pull request.

This is a very small application and it is not written in a SOLID way. So, our change to show all exchange rates for a given currency is incorporated in [this](https://github.com/geshan/currency-api/pull/96/files) small pull request. The main change is give below:

``` js
async function getByToCurrency(currentPage, currency) {
  const offset = (currentPage - 1) * config.itemsPerPage;

  let currencyExchangeRates = await db.query(
    `SELECT from_currency, to_currency, rate, on_date FROM exchange_rates where to_currency = ? LIMIT ?,?`,
    [currency, offset, config.itemsPerPage]
  );

  if (currencyExchangeRates.length) {
    return currencyExchangeRates;
  }

  return [];
}
```

As you can see, the change is merely 14 lines of code which is very straightforward. Then, there are 80 lines of unit test code to verify that it works correctly.

> Notice here that this code can be reviewed and merged but it will not affect anything in production.

It is possible because the code is not reachable as of now. There is no route or controller action to reach this new piece of code.

### Small pull request with enabler code

Once the above small pull request is merged and deployed you can start work on the enabler cement code. This cement code wires up the above code to a user action like viewing the rates. It will be possible with a route that will invoke the above `getByToCurrency` method. You can see how we exposed the code as a new route in this [small pull request](https://github.com/geshan/currency-api/pull/97/files#diff-168726dbe96b3ce427e7fedce31bb0bcR26-R28). You can see the main code below:

``` js
app.get('/api/rates/:currency', async (req, res) => {
  res.json(await exchangeRates.getByToCurrency(req.query.page || 1, req.params.currency));
});
```

These 3 lines of enabler code act as the cement between the user hitting the URL and linking the new route to our existing code from the previous small pull request.

> Following these simple steps, you can also learn the art of small pull requests.

Not only will small pull requests be efficient and improve your team’s cycle time. It will also have no impact on production unless the final piece of code is deployed and released.

To lessen the impact of the code and control the blast radius you can surely use [feature flags](/blog/2018/10/deployment-is-not-release/). You can have a look at an ultra-simple [example](/blog/2016/09/how-to-do-a-minimum-viable-feature-switch/) too.

## Conclusion

Software development does not need to be difficult. If you break down the tasks into bite-size pieces, manage expectations well, and plan your tasks accordingly it will be much easier.

> Don’t underestimate the power of a smooth flow enabled by amazing cycle time. Desirable cycle time can be achieved by using small batch sizes. Small pull requests will definitely make your batch size small.

The next time you open a pull request ask yourself if it is a small pull request or can it be made logically smaller.