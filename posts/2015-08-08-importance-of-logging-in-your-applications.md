---
layout: post
title: "Importance of logging in your applications, start logging today"
date: 2015-08-08 08:04:02 +04:00
comments: true
tags:
- logging
- devops
cover: /images/logging-importance/logging-code.png
---

"This feature we deployed last week was working fine till yesterday now I have no idea why is it not working!" This is like a typical sentence you hear from developers when there is no logging in place. It can be to a great extent solved by having automated tests, still having logging and monitoring gives you a different viewpoint. In this post I am going to reveal the importance of having logs for your code and monitoring your code to cut down the firefighting time for bugs and errors by huge margins.

<!-- more -->

<img class="center" loading="lazy" src="/images/logging-importance/logging-code.png" title="Code for logging success or failure" alt="Code for logging success or failure">

## The Problem

Generally developers don't write any code that logs meaningful and relevant messages for the feature they are writing. Writing code to log things may even be considered not important and waste of time by developers who work in small projects. Which might be true to some point but the benefits surely outweigh the cost.

Not writing logs anywhere is just one part of the issue, generally [almost half](http://bit.ly/sw-eng-np-pt3) of the developers in Nepal still ssh into the server and view server level logs not application logs. Even more, the situation is bad as more than 31% developers say they don't care about any logs at all.

## The Solution

The solution is simple, make logs and writing code to do logging first class citizen in your code base. Logs are the medium through which your app speaks to you. Logging is foundation to solving your operational problems so not having them is being in a communication void with your application.

As an example, if you create a user, just log that the user has been created successfully and if the user could not be created because of let's say a database exception it is even more important to log the reason behind the unsuccessful operation.

## Standard and tools of the trade

Logging is very important, there is a standard [RFC 5424](https://tools.ietf.org/html/rfc5424) on how to log from applications. The main part here is the severity of logs as listed below:

* **0 Emergency**: system is unusable
* **1 Alert**: action must be taken immediately
* **2 Critical**: critical conditions
* **3 Error**: error
* **4 Warning**: warning
* **5 Notice**: normal but significant
* **6 Informational**: informational
* **7 Debug**: debug-level messages

In the above example, if the user is created successfully, it can be a `info/informational` log in case the user could not be created it should be reported as an `error`. While logging, if the context can be provided it adds the right amount of detail so solve problems faster.

As it is a standard there are will be libraries for generally any language/framework, logging is a language/framework agnostic practice that all developers can benefit from using it an any type and size of applications.

Some logging libraries for some languages are listed as follow:

* [Monolog](https://github.com/Seldaek/monolog) - PHP (based on PSR-3 logging standard)
* [Winston](https://github.com/winstonjs/winston) - Javascript
* [Python logger](https://docs.python.org/3/howto/logging.html) - for python 3 it also follows the RFC 5424 standard

The idea is that you will generally find a logger library to log messages from your application. The logging library/packages for your language/framework is just a Google search away.

## Free SAAS to the rescue

Now you have already realized how important is it to log from your system, still if you just log to some text files you again run into the `tail -f` after ssh into the server issue. If you have multiple servers that run your application behind a load balancer for example if your application is served by 5 servers the `tail -f` approach is already impractical and gives 0 insight on historical log data.

### Own Logging infrastructure for big companies

If you are a big company which can invest in your own resource for logging infrastructure, installing [Graylog2](https://www.graylog.org/) or going for the [ELK (Elasticsearch Logstash Kibana)](https://www.elastic.co/products) stack might be good options. Generally logging applications are resource heavy depending on the logs your write to and not very easy to setup.

Both graylog and Kibana have a great web interface where you can search your log data and make more sense out of it than just the usual `tail -f` approach. Even big companies can use the SAAS mentioned below, it will depend on company policy and resources.

### Smaller ones can SAAS free plan

You can use SAAS applications with free plan to rescue yourself from this situation. I would recommend the following two as they have good free tier:

#### [Logentries.com](http://logentries.com)

Logentries gives you a central cloud logging and with it's free plan you can send up to 5 GB of data each month and the data is retained for 7 days. It allows multiple user access even for free plan. So even if your application is relatively big you can still send around 166 MB of log data data each day to them and view it in almost real-time with a web interface. You can also search logs, only **feature that I feel is lacking is sorting of logs** in the interface. It has advanced search features as well which can be useful if you have lots of logs.

<img class="center" loading="lazy" src="/images/logging-importance/logentries.png" title="Logging to logentries.com" alt="Logging to logentries.com">

#### [Loggly.com](http://loggly.com)

Loggly also has similar features as logentries, with it's free plan you can send 200 MB per day and data is retained for 7 days. It allows only one user access for the free plan. The interface looks better better than logentries and the logs are rendered in almost real-time.

Which one to choose it surely up to you, you can do a quick search and find other players in the cloud logging market and pick the one that fits your need.

## Conclusion

Logging in any application is really very important, you can log a lot of critical things and gain unprecedented insight about how your application is working and performing. It is a language/framework agnostic practice which I recommend you to start from today if you are not already doing it.

>If Dog is a man's best friend, Log is a developer's best friend.

Happy Logging.
