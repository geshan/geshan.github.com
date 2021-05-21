---
layout: post
title: "Getting started with unit testing in Laravel"
date: 2015-07-25 08:57:42 +04:00
comments: true
tags: 
 - Programming
 - testing
 - PHP
 - Laravel
 - Software Engineering
cover: /images/laravel-unit-tests/laravel-popularity.png
---

Automated Testing an application is kind of a puzzle given the choice of methodologies (TDD, BDD...), frameworks etc there is no clear direction on how to test an application. Same applies for any PHP application, where you have many frameworks, methods and styles to choose from. In this blog post I will shed some light on how to get started with "Unit" testing in a Laravel application. Laravel has gained lots of popularity in the past years may be due to its simplicity, ease of use, clear documentation and availability of packages/libraries. 

<img class="center" loading="lazy" src="/images/laravel-unit-tests/laravel-popularity.png" title="Laravel is very popular" alt="Laravel is very popular">
<!-- more -->

## Introduction 

A general issue with PHP Frameworks is that for framework code they always use unit testing and in the documentation for applications using the framework they document and support using functional testing. It makes sense in a way that the framework code is general and the application code is specific but it should also be clearly mentioned that the code can be tested in a unit test fashion and not only on how it is rendered in a browser. Same goes for laravel the framework tests are [Unit](https://github.com/laravel/framework/blob/5.1/tests/View/ViewBladeCompilerTest.php) test and the documentation for application tests are for [functional](http://laravel.com/docs/5.1/testing) test.

<img class="center" loading="lazy" src="/images/laravel-unit-tests/laravel-testing-doc.png" title="Laravel application testing doc" alt="Laravel application testing doc">

## Qualities of Unit tests

Unit tests should test only one method or be focus on one class and not take into account the dependencies. All the dependencies should be mocked and only the class/method under test should be tested if it works as expected. Some qualities of unit tests are:

1. It should test only one specific part of the application generally a method/class.
1. It should be simple and verify only the specific part under test (single unit of work)
1. It should not depend on external data
1. It should not dependent on external resources like file system, database etc
1. It should not depend on particular order and be isolated, so you could even run it in parallel

The above 5 characteristics make it easy to setup and super fast when you run as there are no external dependencies like a database or file system.

<img class="center" loading="lazy" src="/images/laravel-unit-tests/laravel-unit-tests.png" title="Laravel unit tests" alt="Laravel unit tests">

## More on Unit testing

Unit tests is about writing testable code, if your functions are 50 odd lines and your classes are 1000+ lines writing unit tests for them will be a pain. If the code is well structured and broken down into logical classes and method writing unit tests will be a breeze. 

## Unit testing in Laravel
 
In case of Laravel, you can follow your own structure and make the controllers very slim and use services where the domain/business logic can reside. For this example I will use a checkout example with following conditions:

1. If the payment method is Cash, it will add 5.0 as Cash on Delivery Fee
2. For all other payment methods the Cash on Delivery Fee will be 0.0

## New Laravel Structure and steps

We will structure the Laravel application as:

<img class="center" loading="lazy" src="/images/laravel-unit-tests/laravel-unit-test-structure.png" title="Laravel unit test application structure" alt="Laravel unit test application structure">

For the above case we will do the following to achieve unit testing with a structure having Service as below:
 
* Get a basic laravel set up with `composer create-project laravel/laravel --prefer-dist`
* Add a [Checkout service](https://github.com/geshan/laravel-unit-test-example/blob/master/app/Services/Checkout.php) at `App\Services\Checkout`, write relevant code to fulfill above requirements.
* Add the checkout service as a container service in [App\Providers\AppServiceProvider](https://github.com/geshan/laravel-unit-test-example/blob/master/app/Providers/AppServiceProvider.php#L27) with
```php
 public function register()
{
    $this->app->instance('Checkout', new Checkout());
}
```
* Add a [Checkout controller](https://github.com/geshan/laravel-unit-test-example/blob/master/app/Http/Controllers/CheckoutController.php) at `App\Http\Controllers` 
* Add a route `/place` in [app/Http/routes.php](https://github.com/geshan/laravel-unit-test-example/blob/master/app/Http/routes.php#L19) as
```php
Route::get('/place/{paymentMethod}', [
    'as' => 'order-place', 'uses' => 'CheckoutController@placeOrder'
]);
```
* Change the [composer.json](https://github.com/geshan/laravel-unit-test-example/blob/master/composer.json#L26) to have namespace in tests.
* Add [test class](https://github.com/geshan/laravel-unit-test-example/blob/master/tests/Services/CheckoutTest.php) for the newly added Checkout service at `Test\Services\CheckoutTest`, write relevant test.
* Run the unit tests `./vendor/bin/phpunit` they are green in a matter of seconds, smile :)

This is a very simple example without mocking and using methods like `$this->mockedObj->shouldReceive('mockedMethod')->once()`, it
is a getting started post not a deep dive :).


You can have a look on how I did it with the [github commits](https://github.com/geshan/laravel-unit-test-example/commits/master). You might be thinking we could do it tests first full TDD style, in my opinion having tests count how you add them is up to you. It's great to write tests first but it takes time to come to that level so rather then not having tests at all I would opt for having tests after code. Below is example of the test code with use of [data providers](http://bit.ly/1Fe0cwx):

```php

/**
     * Data provider for testCalculateTotal
     * variables are in the order of
     * $paymentMethod, $expectedTotal
     *
     * @return type
     */
    public function paymentMethodProvider()
    {
        return [
            ['Cash', 100.00],
            ['Credit Card', 95.00]
        ];
    }

    /**
     * Test to check if the order total is calculated correctly
     * for given payment method.
     *
     * @param string $paymentMethod
     * @param float $expectedTotal
     *
     * @dataProvider paymentMethodProvider
     */
    public function testCalculateTotal($paymentMethod, $expectedTotal)
    {
        $this->assertEquals(
            $this->checkout->calculateTotal($paymentMethod),
            $expectedTotal,
            sprintf('Testing total calculation for %s.', $paymentMethod)
        );
    }
```

**The full running app with tests is available as an open source repository on [github](https://github.com/geshan/laravel-unit-test-example/).**

<img class="center" loading="lazy" src="/images/laravel-unit-tests/running-laravel-app.png" title="Running Laravel app with PHP server" alt="Running Laravel app with PHP server">

### Tip

<blockquote>
I found using `gulp tdd` quite interesting, specially as the tests were super fast. 

All I needed to do was change the provided gulp file with `mix.phpUnit();` and run `gulp tdd` then on each change my tests would automatically run and I would see the green or red desktop notification too. Quite handy.
</blockquote>

<img class="center" loading="lazy" src="/images/laravel-unit-tests/tests-green-gulp.png" title="Handy gulp tdd for Laravel" alt="Handy gulp tdd for Laravel">

## Choice of Tools and services

For testing with Laravel I would recommend the following tools:

1. [PHPUnit](https://phpunit.de/) Framework, even though BDD with [PHPSpec](http://www.phpspec.net) is getting some traction but only a handful of frameworks or systems are using PHPSpec. PHPUnit is still very popular.
1. For mocking use [Mockery](https://github.com/padraic/mockery), here as well [Prophecy](https://github.com/phpspec/prophecy) looks like a better option but then you will have issues with mocking static methods of eloquent models in case of Laravel.
1. Unit testing with PHP is a puzzle and Continuous Integration (CI) is the missing piece, there by if you are doing an open source project I would suggest [Travis CI](https://travis-ci.org/) which costs nothing and for a private project [Shippable](http://shippable.com) is a good CI service for free.

## Conclusion

As Martin Fowler emphasizes in his [test pyramid](http://martinfowler.com/bliki/TestPyramid.html) we should always give priority to more unit tests which will eventually strengthen the integration/functional tests we write for our project. I don't believe that only having unit tests will remove the need of having functional tests still good unit test which covers not only the code also its use cases will surely be a boon. Happy Unit testing!
