---
layout: post
title: "There are only two types of automated software tests, fast ones and not fast ones"
date: 2016-03-17 09:38:18 +04:00
comments: true
tags: 
- Programming
- testing
- Software Engineering
cover: /images/testing-types/software-testing.jpg
---

Tests check that the code does what it is expected to do. It also gives confidence to the software engineer that the code 
works as intended. This equates to less or no bugs in the software. You must have heard about lots of types of automated software tests. 
There is unit testing, integration testing, functional testing, acceptance testing, smoke testing etc. 
As per Guru99's [post](http://www.guru99.com/types-of-software-testing.html) there are more than 100 types of 
software testing. In this post I am going to categorize automated software tests into two, the fast ones and not fast ones.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/testing-types/software-testing.jpg" title="There are only two types of automated software tests, fast ones and not fast ones" alt="There are only two types of automated software tests, fast ones and not fast ones">

<!-- more -->

### How do you distinguish between slow and fast tests? 

Generally, if your whole tests suite runs in seconds it is fast. 
If your whole test suite runs in minutes/hour it is slow. To make your tests small you need to make your application small.
As faster tests running on your Continuous Integration (CI) service will give you faster feedback. 
May be it is time to go micro-services? 

Lets discuss the more about fast and not fast (slow) automated software tests.

### The fast tests

Fast tests are code that test one unit of code generally a method. Unit test is a type of fast test. 
They don't depend on any external dependencies. External dependencies include file system, database, web server, network 
or any third party API or service. Unit tests even mock the other code elements they need like other classes and its methods. 
This makes the test focused on one unit and they run in milliseconds/seconds not minutes. A simple example is below:

<script src="https://gist-it.appspot.com/http://github.com/geshan/dataprovider-example/blob/master/tests/DataProvider/Example/Test/CheckoutTest.php"></script>

You can view the full code [here](http://github.com/geshan/dataprovider-example), yes it is a simple class with no code or external dependency.

Some integration tests can also be fast tests. These integration tests can test many classes. They should not 
dependent on any external dependencies mentioned above to obtain speed. So these tests will still run in seconds and 
not take minutes to finish.

### The not fast tests (slow ones)

Any test that takes long to run are not fast tests (slow tests). Generally, these type of tests need to load 
the whole application to test it. These types of tests depend on external dependencies. External dependencies include file 
system, database, web server, network, third party API or service. 

Acceptance tests that need to load a full web application on a browser is a type of slow tests. Even smoke tests if it needs 
to load the whole application and takes long time to execute fall in this category.

<script src="https://gist.github.com/geshan/4512326704954f6b8388.js"></script>

The above example is taken from [Sylius](https://github.com/Sylius/Sylius/blob/master/features/checkout/paying_for_order/paying_with_paypal_during_checkout.feature) project, to test pay with paypal.

### Conclusion

Testing is super important for a robust software application. Automated testing + CI is one of the [four pillars](https://geshan.com.np/blog/2015/10/4-pillars-of-a-solid-software-application-and-tools-to-support-it/) 
of any solid software application. Happy testing hope your tests run in seconds not minutes.
