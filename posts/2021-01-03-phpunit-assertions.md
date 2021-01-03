---
layout: post
title: '5 useful PHPUnit Assertions you should start using today'
date: 2021-01-03T21:32:45.000+11:00
comments: true
tags:
- Web Development
- PHP
cover: "/images/phpunit-assertions/01phpunit-assertions.jpg"
pagetitle: '5 useful PHPUnit Assertions you should start using now'
description: In addition to assertEquals, you can use these ultra-handy PHPUnit assertions to make your life easier. Find out how.
keywords: phpunit assertions, phpunit assertion, phpunit testing, php testing
---
PHPUnit has been blowing away its competition for more than [5 years](https://trends.google.com/trends/explore?date=2016-01-01%202020-12-31&q=phpunit,phpspec,codeception,behat,atoum) now. With the use of the right PHPUnit assertions, you can get the most benefit out of PHPUnit. In this post, we will look into some popular and very useful PHPUnit assertions you should be using day to day in your PHPUnit tests. Let’s get cracking!

<img class="center" src="/images/generic/loading.gif" data-echo="/images/phpunit-assertions/01phpunit-assertions.jpg" title="PHPUnit assertions you should start using now" alt="PHPUnit assertions you should start using now">

<!-- more -->

## PHPUnit Assertions to know about

Currently, PHPUnit is at version [9.5](https://github.com/sebastianbergmann/phpunit/releases/tag/9.5.0). As per the latest [docs](https://phpunit.readthedocs.io/en/9.5/assertions.html) there are 60 assert methods you can use in your PHPUnit tests.

> These PHPUnit assertions range from checking if [array has a key](https://phpunit.readthedocs.io/en/9.5/assertions.html#assertarrayhaskey) to the ever-popular [assert equals](https://phpunit.readthedocs.io/en/9.5/assertions.html#assertequals) to the not so widely used [XML string comparing](https://phpunit.readthedocs.io/en/9.5/assertions.html#assertxmlstringequalsxmlstring) PHPUnit assertion.

## Analyzing  PHPUnit Assertions usage in a small, medium, and large project

To know which PHPUnit assertions are used most in the projects I have worked with in the past years I ran the following command:

``` bash
grep -rin ">assert" . | awk '{print $2}' | awk -F"[>(]" '{print $2}' \ 
| sort | uniq -c | sort -nr
```

> The above command should be run in your `tests` folder. It basically looks for `>assert*` in the code and sorts them, then counts the unique occurrences and again sorts at the end with most occurrences first.

I will be taking three projects, one small, the second one medium, and the third one is a large one. The size is not only the code but also the number of tests and assertions in the projects. 

> These projects are built with Symfony and another framework. Two of them are REST APIs and one of them which is the big one has a user interface too.

### Small Project with PHPUnit Assertions

The small project built with Symfony as a REST API has only 104 tests and 306 PHPUnit assertions. The above command when executed on this project’s tests folder gave the following output:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/phpunit-assertions/02phpunit-assertions-count-small.jpg" title="PHPUnit assertions count on a small project" alt="PHPUnit assertions count on a small project">

> As we can see, the most popular PHPUnit assertion used in this project is `assertEquals` which is used 73 times.

After that, `assertSame` is used 51 times in this relatively small project. This means almost 1 out of 4 PHPUnit assertions for this project is `assertEquals`.

### Medium project for PHPUnit Assertions count

The medium project built with Symfony which is a REST API has 221 tests and 472 PHPUnit assertions. The above command when run on its tests directory looks like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/phpunit-assertions/03phpunit-assertions-count-medium.jpg" title="PHPUnit assertions count on a small project" alt="PHPUnit assertions count on a medium project">

> We can clearly see that `assertSame` and `assertEquals` is used the most in this small project with 37 times each.

The numbers of asserts don’t add up to 221 because there are a lot of [PHPunit data providers](/blog/2014/02/using-phpunit-data-provider-for-less/) used in these tests.

Still, `assertSame` and `assertEquals` make up almost 16% of the assertions used in this project. Recently we switched the code coverage driver to be [PCov](/blog/2020/11/phpunit-code-coverage-pcov/) instead of Xdebug. It made the test coverage much faster. If you are interested, I had also blogged about [unit testing in Laravel](/blog/2015/07/getting-started-with-unit-testing-in-laravel/) in the past.

### Big project for counting PHPUnit Assertions

Next up is the big-sized project, it has both APIs and user interface. It has unit tests as well as some integration tests. This project has a whopping 5824 tests and 13975 PHPUnit assertions. When we run the above PHPUnit assertions counter command on this project’s tests folder it yields:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/phpunit-assertions/04phpunit-assertions-count-large.jpg" title="PHPUnit assertions count on a large project" alt="PHPUnit assertions count on a large project">

> Even here, `assertEquals` is still the most used PHPUnit assertion with 3145 occurrences.

That accounts for  22.5% of all asserts in the test suite. Next in line is `assertTrue` which is used 942 times, making it get 6.74% of the pie. Let’s have a look at some more PHPUnit assertions that are very helpful but not that obvious.

## Anatomy of PHPUnit assertions

Assertions in PHPUnit follow a pattern, for instance, `assertEquals` takes 3 arguments. The first one is `expected`, the second one is `actual`, and the third one which is optional but important is `message`. 

> The message is printed when the test fails.

For instance the following test:

``` php
$this->assertEquals('1', '0', 'check if 1 is 1');
```

Will result in:

``` bash/3
There was 1 failure:

1)FCQN::testAssertEqualsFail
check if 1 is 1
Failed asserting that two strings are equal.
--- Expected
+++ Actual
@@ @@
-'1'
+'0'
```

Notice the `check if 1 is 1`, these types of messages will be helpful when you debug which tests did not pass and how to fix them.

## Some PHPUnit assertions you must start using today

In the past, I have used many PHPUnit assertions among the 60 odd available ones. Below are some of them which have been particularly useful:

### assertJsonStringEqualsJsonString

This PHPUnit assertion is very handy when testing APIs’ responses. You can use this `assertJsonStringEqualsJsonString` assertion to check if the received JSON response matches what you were expecting it to be. To match the JSON string, you could do something like:

``` php
$this->assertJsonStringEqualsJsonString(
    '{"message": "ok"}', 
    json_encode(["message" => "ok"]), 
    'Check message ok json'
);
```

The next one is about Regex matching.

### assertMatchesRegularExpression or assertRegExp

As the name sounds the assert will match for the regular expression. I have found it helpful to test error messages that begin with something or have a defined pattern. It was called `assertRegExp` in PHPUnit [8.5](https://phpunit.readthedocs.io/en/8.5/assertions.html#assertregexp). Below is an example which checks for string `Exception 40\d` so 40 and any digit, the test below will as the test string is `Exception 501`:

``` php
$this->assertRegExp(
    '/Exception 40\d/', 
    'Exception 501', 
    'Check if it is exception 40x'
);
```

The next one is about strings.

### assertStringContainsString

This is also a very handy assertion to check if a given string has another string. If you want to ignore the letter case you can use `assertStringContainsStringIgnoringCase`. The `assertStringStartsWith` and `assertStringEndsWith` PHPUnit assertions are also very useful. Below is a quick example of the string contains the string:

``` php
$this->assertStringContainsString(
    'Error', 
    'Error id is required, the quote is required', 
    'Check if word Error is present'
);
```

Consequently, we have the ever-popular assert Equals PHPUnit assertion with a twist.

### assetEqualsWithDelta

Another useful PHPUnit assertion is `assertEqualsWithDelta`. When you have a test where some variance is expected this assertion is super useful. Below is an example:

``` php
$this->assertEqualsWithDelta(34.3, 34.1, 0.5, '0.5 degree variance in temperature is allowed');
```

Subsequently, we have a PHPUnit assertion that is related to PHP arrays.

### assertArrayHasKey

The `assertArrayHasKey` assertion in PHPUnit is also very helpful. If you are using arrays are return types then you can use this assertion to check if the returned array has a certain key before checking the value. Below is an example of this practical PHPUnit assertion:

``` php
public function testAssertArrayHasKey()
{
    $exchangeRates = ['usd' => 0.77, 'euro' => 0.63];

    $this->assertArrayHasKey('usd', $exchangeRates, 'Check if USD is available');
    $this->assertEquals(0.77, $exchangeRates['usd'], 'Test if USD rate is 0.77');
}
```

You can view all the 5 PHPUnit assertions’ examples in this [gist](https://gist.github.com/geshan/75153b39e6277dd8ece4048cf1d44ae5).

## Conclusion

You can find a list of PHPUnit assertions in this [list](https://gist.github.com/briankip/35e3506be8b1ecbcf3bb) too.

> Before wiring up 2 or 3 PHPUnit assertions please do check on the [docs](https://phpunit.readthedocs.io/en/9.5/assertions.html) if there is any existing assertion that suits your use case.

As per need, you can also write your [custom assertion](https://matthiasnoback.nl/2012/02/phpunit-writing-a-custom-assertion/). Happy PHPUnit testing!
