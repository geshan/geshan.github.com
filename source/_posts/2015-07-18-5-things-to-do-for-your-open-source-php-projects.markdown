---
layout: post
title: "5 Things to do for your open source PHP projects, a checklist"
date: 2015-07-18 07:01:00 +0400
comments: true
categories: 
 - Programming
 - Technology
 - foss
 - php
facebook:
   image: http://geshan.com.np/images/php-oss-checklist/example-foss.png
---

Open source software (oss) are very popular in the software world, be it the server serving your web pages or the 
language/framework your website/webapp or even mobile app is written on, it is highly likely that its based on an
open source software. As programmers this sprint of giving back to the community and helping others in form of 
Free and open source software is amazing. There are many open source PHP projects as well from frameworks to small
libraries. It is a difficult yet rewarding experience to lead/support an open source project. If you are thinking
of starting an open source project or open sourcing some part(s) of your existing system, this post has a checklist 
to assist you with it.

{% img center /images/php-oss-checklist/example-foss.png 'An example open source php project' 'Example open source project' %}
<!-- more -->

## Intro

It is taken for granted that you do the basics correctly like having a optimally descriptive readme, a license and 
probably a contribution guide on your project's Github repo. It is also assumed that as its PHP you are doing the 
basis right following [FIG](http://www.php-fig.org/)'s PSR standards like 
[PSR-2](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md) coding style guide 
and [PSR-4](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-4-autoloader.md) auto-loader standard. 
For this post I will use a template/boilerplate [dataprovider-example](https://github.com/geshan/dataprovider-example) 
as and example, the links will open for this project for services mentioned below. So after getting the basics 
right what more do you need to consider, lets have a look at the checklist:

## 1. Check and maintain Code Quality

Just writing code that works might not be ideal for an open source project, also because the code you write can be read by
anyone and used by anyone checking coding standard and code quality become a must. If you want to check your
coding standard you can do it locally with [PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer), 
fix coding standard issues with [PHP CS Fixer](http://cs.sensiolabs.org/). For other local tools you can check [PHP QA tools](http://phpqatools.org/).
In case you want a continuous integration service you can use [Style CI](https://styleci.io/) which will check your coding 
standard matches PSR-2 or not on each push. It is free for open source projects.

In case of the code quality, there are many providers to choose from and again all of them are free to use for open 
source projects. They love open source software as we do too. Below is the list of some providers I have used/tried out:

* [CodeClimate](https://codeclimate.com/github/geshan/pdepend-analyzer) - Very good service, ranks your code in a GPA of 4. Has good code analysis and reports.
* [Scrutinizer CI](https://scrutinizer-ci.com/g/geshan/dataprovider-example/) - Great code analysis, ranks your code in a scale of 10. Extensive settings and code reports.
* [Sensiolabs Insight](https://insight.sensiolabs.com/projects/56ff09b2-7954-4cb2-a6da-6af863775107) - Great code analysis, ranks your code with medals. Quite extensive code reports.
* [Codacy](https://www.codacy.com/app/geshan/dataprovider-example/dashboard) - Good code analysis, ranks your code with A, B, C, D scale. Good settings and code reports.

As an example I am using a project with just 2 PHP files so you can see how powerful and deep the analysis for the code is
for each of the above services. Which one to choose from the above, the choice is yours :)

## 2. Write Tests

Writing tests for code is also important to verify that the code does what you expect and intend it to do. As generally
open source projects are libraries Unit tests is recommended more than functional/integration tests. You can
see an example test [here](https://github.com/geshan/dataprovider-example/blob/master/tests/DataProvider/Example/Test/CheckoutTest.php). 
Below are the two main choices of framework you have for writing tests depending on the style of testing:

* [PHPUnit](https://phpunit.de/) - The most popular PHP test framework, you can use it for a Test Driven Development approach.
* [PHPSpec](http://www.phpspec.net/) - The new emerging concept which some say are better than PHPunit, follows Behavior Driven Development approach.

Well the question is always there do you write test first or code first, IMHO whatever you do have tests that cover your
code for the cases you know and you think are important.

## 3. Enable Continuous Integration

Just writing tests will not be enough if it does not run on each push to the version control system (VCS) like git. So
if you get fast feedback on what your new code did to the existing or new tests that would be very helpful to decide if
your code in form of a Pull Request (PR) can be merged to the main branch (generally master). It is very important for 
open source so as to maintain stability and not break the application of anyone using your open source code. Bonus
points if you submit the code coverage report to above mentioned code analysis services. Here too
you have mainly 2 choices both of them are free for open source projects:

* [Travis CI](https://travis-ci.org/geshan/dataprovider-example) - The most popular continuous integration, fast and easy to integrate with any project.
* [Shippable CI](https://shippable.com) - A new player based on docker. Good and easy to integrate but can't show test runs even for open source projects.

There are lots of other CI services these days and most of them are free for open source projects, still I think Travis
makes a good choice for open source projects. The decision is yours again.

## 4. Publish to Packagist with sermver

OK so you have setup a git repo and done all the above mentioned things. Next logical step will be to submit your open
source PHP project to [Packagist](https://packagist.org/packages/data-provider/example). It is supported by [Composer](https://getcomposer.org/) 
php package manager and has as of writing has more than [64650](https://packagist.org/statistics) open source projects.
You will need to [register](https://packagist.org/packages/submit) and have a well 
formatted [composer.json](https://github.com/geshan/dataprovider-example/blob/master/composer.json) in your git 
repository to submit your package to Packagist. After you submit your project, any one looking for something similar like
your project and search for your package and download it using composer. For clarity in version do use Semantic
Versioning a.k.a [SemVer](http://semver.org/).

## 5. Issue board with HuBoard

Finally your project is being downloaded and used by other people and you are getting requests in form of issues to 
make changes or add features. Other generous and talented programmers are sending PRs to your project but how do you
show what is being done and reflect on status of the project issues visually. Here is where 
[HuBorad](https://huboard.com/geshan/dataprovider-example/) comes to
your rescue. You can show the status of the issues as below to make all the interested people clear of what is happening 
in the form of a Agileish Kanban board:

{% img center /images/php-oss-checklist/huBoard.png 'An example of issues on HuBoard' 'Example of issues on HuBoard' %}

## Conclusion

After checking all the items in the above checklist, be sure to be alert about issues and pull requests for the open source
project. Successful open source project lead/members are quite alert and responsive to both issues created and pull requests
sent to the project. You can use the data-provider example as a base template for writing your next open source project. Happy Coding.
