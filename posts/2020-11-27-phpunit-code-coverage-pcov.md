---
layout: post
title: 'Get PHPUnit Code Coverage 2+ times faster with pcov compared to X-debug'
date: 2020-11-27T22:15:25.000+11:00
comments: true
tags:
- Web Development
- PHP
cover: "/images/phpunit-code-coverage-pcov/01faster-phpunit-code-coverage.jpg"
pagetitle: 'Get PHPUnit Code Coverage 2+ times faster with pcov compared to X-debug'
description: Speed up your PHPUnit code coverage using Pcov in place of X-debug. Make it at least twice as fast.
keywords: phpunit code coverage, phpunit coverage, phpunit test coverage, pcov, speed up phpunit coverage
---
PHPUnit is the de-facto testing library for PHP. With the use of pcov you can speed up PHPUnit code coverage by 2-5 times for PHP 7.0+ application. In this post, we will compare the results of an experiment I did on Laravel framework tests. The tests were run without coverage, then with X-Debug coverage, and finally with pcov all on Github actions. Pcov took half the time to run the PHPUnit tests with code coverage compared to X-debug, let’s go to the numbers.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/phpunit-code-coverage-pcov/01faster-phpunit-code-coverage.jpg" title="Faster PHPUnit code coverage with pcov" alt="Faster PHPUnit code coverage with pcov">

<!-- more -->

## Save time on CI builds

What does saving say 12 seconds on each build mean on the long run? If you can save just 12 seconds on each build, it equates to 1 minute in just 5 builds.

> In just 100 builds you save 20 minutes and in 1000 builds that number becomes 3 hours and 20 mins.

Think of it as how much it will save in terms of waiting time for your colleagues too.

## PHP code coverage with Pcov not X-debug

[XDebug](https://xdebug.org/) is a debugger that can do coverage too. [PHPdbg](https://www.php.net/manual/en/intro.phpdbg.php) is another alternative to X-debug. [Pcov](https://github.com/krakjoe/pcov) is built for PHPUnit code coverage not something else.

[Michael Dyrynda](https://dyrynda.com.au/blog/using-pcov-instead-of-xdebug-for-coverage) has also talked about this issue, where he mentions:

> You have access to the same output formats that are available to PHPUnit (formatted output, clover, JSON, HTML, etc.) with none of the overhead.

He has also points out other issues with X-debug like hitting the `max_nesting_limit` too, you should read his blog post too.

## Considerations for code coverage with pcov

* [Pcov](https://github.com/krakjoe/pcov) is a self-contained PHP code coverage driver for PHP 7 and above
* PHPUnit 8 and above supports PCOV out of the box, for PHPUnit 7 and lower you will need [pcov-clobber](https://github.com/krakjoe/pcov-clobber)
* Pcov makes prefect sense in a Continuous Integration (CI) environment as you don't debug code on a CI :)

> To show a real-life scenario we are going to see how long Laravel Framework’s 5700+ tests with 15500+ assertions are going to take in our quick experiment.

Let’s get cracking!

## Procedure for faster PHPUnit code coverage

I picked up the Laravel framework not only because it is very popular but also because there were a lot of tests, more than 5700 of them. On top of it, for the Laravel 8.x branch the tests are running on [Github Actions](https://github.com/laravel/framework/actions).

Tests for Laravel 8.x run on multiple versions of PHP like 7.3, 7.4,8 on lowest to stable variants. The same tests also run on windows.

> Another reason to choose Laravel 8.x was it is using [PHPUnit  9.3](https://github.com/laravel/framework/blob/8.x/composer.json#L89) which does not need pcov-clobber to get the PHPUnit coverage.

I had blogged about getting started with [Unit testing in Laravel](/blog/2015/07/getting-started-with-unit-testing-in-laravel/) in the past which should be a good unit testing refresher. [Data provider for PHPunit](blog/2014/02/using-phpunit-data-provider-for-less/) is also a great way to write less test code but achieve more code coverage.

Below are the steps I took to find out how fast Pcov was against Xdebug for PHPUnit code coverage.

### Fork Laravel/framework repo and run tests only for PHP 7.4

To keep things simple, I forked the Laravel/framework Github [repo](https://github.com/geshan/framework). After that, I change the Github Actions tests workflow to run tests only on PHP 7.4 which the current stable version. You can see the changes I made in this [pull request](https://github.com/geshan/framework/pull/1/files).  

> Opening the pull requests ran the tests without PHPUnit code coverage and it took `33 seconds` to run the tests consuming `257MB` of memory.

You can view the details of that test run in this [Gitub Actions page](https://github.com/geshan/framework/runs/1458355879?check_suite_focus=true), below is a quick screenshot.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/phpunit-code-coverage-pcov/02phpunit-tests-without-coverage.jpg" title="Laravel Framwork PHPUnit tests without code coverage" alt="Laravel Framwork PHPUnit tests without code coverage took 33 seconds">

### Run PHPUnit code coverage with X-Debug

I merged the above pull request to run tests only for PHP 7.4. Then I made changes to run the PHPUnit tests with code coverage using X-debug as the driver. The change is very easy as Gitub action was using `shivammathur/setup-php@v2` action. After a bit of Googling, I found that that action had [Code Coverage support](https://github.com/marketplace/actions/setup-php-action#signal_strength-coverage-support) and it was very easy to enable.

I had to change the coverage from `none` to `xdebug` and add `--coverage-text` to the PHPUnit command making it:

``` bash
vendor/bin/phpunit --verbose --coverage-text
```

I made those changes in 2 places in the `tests.yml` file and that resulted in this [pull request](https://github.com/geshan/framework/pull/2/files). A new pull request = the tests running again in Github Actions CI.

With X-debug code coverage I did a couple more runs to see if the time taken to run the test vary by much. It was generally the same.

> In one of the runs of [code coverage with X-debug](https://github.com/geshan/framework/runs/1458520731?check_suite_focus=true) took `2 mins 34 seconds` and consumed `395 MB` of memory. 

I am only checking the time for the `Execute tests` task. You can view the screeshot below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/phpunit-code-coverage-pcov/03phpunit-tests-with-xdebug.jpg" title="Laravel Framwork PHPUnit tests with X-debug code coverage" alt="Laravel Framwork PHPUnit tests with X-debug code coverage took 2 mins 34 seconds">

The code coverage was reported as below, with 75.65% of the lines covered and 68.90% of the methods covered by PHPUnit Code coverage using Xdebug.

### PHPUnit Code Coverage with Pcov is 2x faster

Now with the time of `154 seconds` for X-debug, I wanted to see how long it would take the new coverage driver `Pcov`. To find this out, I again followed a similar approach, went to the Laravel 8.x branch, and started editing the `.github/workflows/tests.yml` file. I change the coverage from `none` to `pcov` thankfully the PHP action supports [pcov](https://github.com/marketplace/actions/setup-php-action#pcov). 

The changes I made are in this [pull request](https://github.com/geshan/framework/pull/3/files). This triggered another build on Github Actions.

> This time surprisingly it took just `1 minute 17 seconds` and consumed `393 MB` of memory.

Again this is for the `Execute tests` task as seen below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/phpunit-code-coverage-pcov/04phpunit-tests-with-pcov.jpg" title="Laravel Framwork PHPUnit tests with Pcov code coverage" alt="Laravel Framwork PHPUnit tests with Pcov code coverage took only 1 min 17 seconds">

Same as X-debug the PHPUnit Code Coverage was reported as 75.65% of the lines and 68.90% of the methods covered by Pcov. You can see other test runs in the [Actions tab](https://github.com/geshan/framework/actions) of my Laravel Framework fork.

## Quick comparison of Code coverage

Let’s take a quick look at how long the PHPUnit test took with and without code coverage:

| PHPUnit Test Run (PHP 7.4 Linux) |             Time Taken             | Memory Consumed |
|:--------------------------------:|:----------------------------------:|:---------------:|
|            No Coverage           |             33 seconds             |      257 MB     |
|       Coverage with X-Debug      | 2 minutes 34 seconds (154 seconds) |      395 MB     |
|        Coverage with Pcov        |  1 minute 17 seconds (77 seconds)  |      393 MB     |

> It is very clear that Pcov took half the time as X-debug and even consumed lesser memory. PHPUnit code coverage with Pcov took 77 seconds and with X-debug took double of that at 154 seconds.

In my local run in a docker container, the results were pretty different.  For X-debug these Laravel framework tests took 15 minutes 15 seconds (403 MB memory) and the with Pcov driver the same tests took 3 minutes 25 seconds (399 MB memory).

> Pcov was 4.43 times faster on my local machine inside a [docker container](https://github.com/lorisleiva/laravel-docker/blob/master/7.4/Dockerfile).

Not only me, [Swashata Ghosh](https://dev.to/swashata/setup-php-pcov-for-5-times-faster-phpunit-code-coverage-3d9c) has also reported a 5 times faster code coverage with Pcov in place of X-debug. Speaking of pure numbers, I ran a check on a test where it took `17 seconds` with X-debug and it took just `1 second` with pcov. It was 17 fold faster but that should not be a yard stick to compare X-dbeug and Pcov for code coverage.

I didnot try PHPDbg as an option because it was not available in the `PHP Github action`. If you want to quickly switch between X-debug and Pcov please read this [guide](https://localheinz.com/blog/2020/05/16/quickly-switching-between-pcov-and-xdebug/).

## Conclusion

PHPUnit code coverage is usually coupled with X-debug. It has a problem the code converge reports are slow with X-Debug. Pcov is purpose built for PHPunit code coverage not debugging and it makes gathering code coverage a lot faster.

> If you want to speed up your code coverage and save time on your CI builds use Pcov in place of X-debug. You will surely like the time saved after the process is done. Happy faster testing and coverage reports!
