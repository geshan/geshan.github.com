---
layout: post
title: "How to do a minimum viable feature switch, includes a simple code example"
date: 2016-09-26 09:55:05 +0400
comments: true
categories:
- Technology
- misc
---

Feature switch is a way to switch off or on a feature on a working software during runtime. We can use configuration or condition to achieve this. Feature switch is also known as feature flag, feature toggle and conditional feature. In this post I will reveal why to do [feature switch](https://en.wikipedia.org/wiki/Feature_toggle) and how to do it with a simple if condition.

{% img center /images/feature-switch/feature-switch.jpg 'Minimum viable feature switch, with code example' 'Minimum viable feature switch, with code example' %}

<!-- more -->

## Why do a feature switch/flag?

My first experience with feature flag was when we had to deploy `PayPal` as a payment method. We wanted to be sure that it works without issues on production. How we did it then was to have a [feature flag](https://launchdarkly.com/featureflags.html) with a condition that the user email ends in `@namshi.com`.

You can do feature switch for various reasons, some of them are:

1. A very important feature needs to go into production and you need to test it in production. It can't be released to everyone unless everything is fine like a new payment method.
1. You want to deploy a big feature in steps and until the last step is done the feature is not complete.
1. You want your changes pushed to production and merged with the main branch. But the new changes are not public yet.
1. You don't want to spend hours fighting merge conflicts. You are working on it for days and your code has not been merged to the main branch.
1. You want to schedule a feature in future, you could have a feature switch based on date or time.

## How to do feature switch?

There are many ways to do a feature switch for this post as an example I will add a new payment method to a checkout. For this task, I will use a simple `if` condition. Other ways of doing feature switch can be with a `cookie` or even some `settings in the database`.

### Checkout Scenario

The simple checkout already has 2 payment methods `Cash` and `CreditCard`. We will add `PayPal` to it. The current proof of concept implementation only shows the order total. For, Cash it shows 5 more than credit card as it adds `Cash On Delivery (COD)` fees.

The code is an addition to my previous post on [unit testing with Laravel](http://geshan.com.np/blog/2015/07/getting-started-with-unit-testing-in-laravel/). If you have not read it, I highly recommend you to do it. This example has [tests](https://github.com/geshan/laravel-unit-test-example/pull/4/files#diff-b3678da71dcc0bd1aa883f9f930c1ca5R34) too.

### Checkout Example with PayPal

Let us take the example of a simple feature switch with adding a new payment method Paypal. It should be accessible only if your email ends in `@gmail.com`. You should use `yourcompany.com` email but for an example, I will use `gmail.com`.

### Example Code

There is a simple `Checkout` service that has a `calculateTotal` method. It calculates the total depending on the payment method and now email.

<script src="https://gist.github.com/geshan/3da1d181ae26f18a0ec365a063aa5d99.js"></script>

The feature flag/switch code is in line 21-23. It checks if the payment method is `PayPal` and email does not end with `@gmail.com`. The
`endsWith` method in Laravel [helpers](https://laravel.com/docs/5.3/helpers#method-ends-with) came handy to do it. So `PayPal` is only available if your email ends in `@gmail.com`. You can check this [pull request](https://github.com/geshan/laravel-unit-test-example/pull/4/files) for full changes and related tests.

### Turn it off

So let's assume, that you tested `PayPal` intensively on your production environment. When you are satisfied you just remove the condition and fix the related tests and you are done. Deploy again do a final round of testing and you have `PayPal` on production, all your customers can use it after that.

## Conclusion

Stop making big tasks/tickets that take weeks to complete. Apply feature switch and deploy small things. Test them on production without anyone noticing.

Always test critical things on production in a hidden way like a new payment method. Practice feature switch and get your code passed through your work flow to production.

> Hope you will benefit from feature switch and suggest it to solve complex problems.
