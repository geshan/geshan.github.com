---
layout: post
title: "Good software engineering is about finding a solution at the correct layer with boring technology"
date: 2023-12-21T23:21:53.000+11:00
comments: true
tags:
- Software Engineering
- Misc
cover: "/images/good-software-engineering/01good-software-engineering.jpg"
pagetitle: "Good software engineering is about finding a solution at the correct layer with boring technology"
description: "Learn how to find a solution at the right layer of your stack and with boring techology."
keywords: good software engineering, boring technology
---
In the ever-evolving landscape of technology, the importance of good software engineering cannot be overstated. It's the core of efficient, scalable, and maintainable software solutions. While there are various methodologies and practices, a key aspect often overlooked is the art of finding the right solution at the correct layer and level of abstraction. On top of that, reliable software systems are best built with boring technology. You will learn more about these topics in this post, let’s get started!


<!-- more -->

<img class="center" src="/images/good-software-engineering/01good-software-engineering.jpg" title="Good software engineering is about finding a solution at the correct layer with boring technology" alt="Good software engineering is about finding a solution at the correct layer with boring technology">

## Table of contents

* [Select the Right Layer for Your Solution](#select-the-right-layer-for-your-solution)
  * [Database vs. Code](#database-vs.-code)
  * [Code Layers: Controller, Service, and Repository](#code-layers%3A-controller%2C-service%2C-and-repository)
  * [Code or not code](#code-or-not-code)
* [Choose Boring Technology](#choose-boring-technology)
* [Measure, Learn, and Adapt](#measure-learn-and-adapt)
* [Conclusion](#conclusion)


Good software engineering is not just about writing code that works; it's about writing code that stands the test of time, is easily maintainable, and can adapt to the changing needs of the business. This involves making crucial decisions about where and how different components of your system should interact while it is stable, scaleable, and resilient.

In addition to that, your choice of technology for each layer also plays a vital role in how reliable, easily recoverable, and [resilient software](/blog/2020/12/software-resilience/) you can deliver. Another important aspect of this discussion is [software scalability](/blog/2020/12/software-scalability/). In the next section, you will learn about selecting the right layer for your solution.

## Select the Right Layer for Your Solution

Depending on the context, you will need to find the right layer of the technology for your feature/solution or the fix for a bug. As with most things in software engineering, the best answer is “It depends”. Still, many a time you might want to engineer your solution at the right layer of a [3 tier or an N-tier](https://www.ibm.com/topics/three-tier-architecture) application. Let’s explore some of the facets of this realm:

### Database vs. Code

One of the first decisions a software engineer faces is determining where to handle certain aspects of their application logic—whether in the database or the code. While databases are excellent for managing and querying data, they are not the place for complex business logic. Striking the right balance between keeping your database simple and handling logic in your codebase is essential.

Recently I discussed with the team whether a piece of logic can go in as an SQL query or should be in the code. After a quick cost-benefit analysis, putting in the solution as a SQL select query might be a cleaner way to do it but as we know scaling a relational database is a lot more harder than scaling a dockerized application. Thereby, the Slack thread ended in agreeing to place the logic in the application code rather than running it on the database server. Still, you should know that [you can do it in SQL](/blog/2018/12/you-can-do-it-in-sql/), whether to run the logic on the DB server is a choice based on trade-offs as it depends.

### Code Layers: Controller, Service, and Repository

Within the codebase, it's crucial to identify the appropriate layer for specific functionalities. The controller layer handles user input, the service layer encapsulates business logic, and the repository layer manages data storage and retrieval. Deciding which layer should house certain functionalities is akin to placing puzzle pieces together, ensuring a cohesive and understandable structure.

Choosing the right layer means understanding the responsibilities of each and keeping them focused on their core tasks. For instance, business logic should reside in the service layer, leaving the controller layer to manage input and output, and the repository layer to handle data operations.

This also points a bit towards the [single responsibility principle](https://levelup.gitconnected.com/single-responsibility-principle-a-beginners-note-cb1eaba1fecd). Anyhow, even if you don’t write strictly object-oriented programming, in any web related work there will always be a route -> linked to a controller of some sort. Some business logic will need to be written somewhere, which is generally a service, and depending on your layers and levels some code will interact with the data layer. The data layer in most cases will be a relational database or a non-relational database. When you write your solution think precisely where how the parts will be spread and how it will affect a later change to the feature. 

### Code or not code

Sometimes the solution or bug fix is not in the code it might be in a configuration or a setting. I remember a bug we had many years back with persisting a session. We looked very hard into the code but it turned out to be a configuration on the Memcached server we were using to store the session data for sticky sessions.

Similarly, let's say there is a slow-performing application. You can run 100s of tests and a lot of performance testing to squeeze out the last drop of juice on your application-level code. But that difficult-to-make performant (read faster) issue could be easily solved by adding a couple of database indexes on the right columns or a group of columns which is also called a [composite index](https://planetscale.com/learn/courses/mysql-for-developers/indexes/composite-indexes). The moral of the story is to think a bit outside of the box and try to find a solution outside of the code too.

In the next section, you will learn about [choosing boring technology](https://mcfunley.com/choose-boring-technology) where the interesting part is, it helps you sleep much better.

## Choose Boring Technology

In the fast-paced world of technology, the allure of using the latest and most cutting-edge tools can be tempting. However, good software engineering often means [choosing boring technology](https://boringtechnology.club/). Boring technology is reliable, well-established, and has a proven track record. If not anything, it gives a much higher chance of you having a good night’s sleep and when you are on-call the phone will not ring much.

While it might not be as exciting as the latest framework, boring technology is more likely to be well-documented, have a large community of users, and provide long-term support. This stability is crucial for the longevity of your software, as it reduces the risk of unexpected issues and makes it easier to find talent familiar with the tools you're using.

Boring technology has very little unknown unknowns, which means if there is an issue it is usually not a completely new issue and can be solved relatively quickly. Again boring technology might mean different things to different teams.

> If a team has been doing Rust for the last 6 years (released in 2015, so possible) then Rust might be a boring technology for them versus a team that has been doing only Javascript (Node.js/Typescript) in the backend for the past 5 years.

The same can be said for a team using MySQL for 10 years vs a team using MongoDb for 10 years (Mongo released in 2009, so it is possible too).

Still, relying on battle-tested technologies that have been proven to work at a much higher scale and workload than what your company generally has is a much safer bet compared to the new language, framework, or database in the market. 

> This does not mean to never try a new technology (language/framework or database), but you should experiment with a new thing in an experiment (that will be used by 100s of people) not the main money earner service of the company. If that service goes down the company loses 1000s of dollars each minute. 

You can also use new things in your side project for learning, so why not? Well, all this depends on the simple principle of measuring, learning, and adapting which is discussed next.

## Measure, Learn, and Adapt

Good software engineering involves an iterative process of measurement, learning, and adaptation. Monitoring the performance of your system, gathering user feedback, and learning from both successes and failures are integral parts of the software development lifecycle. 

> For instance, even after doing all the tricks in the book if your MySQL or Postgres does not deliver fast enough performance then it is surely time to introduce a layer of caching with an in-memory database like Redis.

In this case, redis will have a key-value pair or the data you need for that page in a denormalized form.

By measuring the performance of your application, you can identify bottlenecks, optimize code, and improve user experience. User feedback provides valuable insights into how your software is being used and what improvements can be made. Being open to learning from experiences, both positive and negative, allows you to adapt your approach, refine your processes, and continuously enhance your software.

In today’s age application performance monitoring (APM) software also helps you a lot to view logs and see the response times of your software system.

> You can also know the resource consumption of the software you developed and delivered in almost real-time. This helps you roll back a wrong release or course-correct a change you made weeks or even months back in a more empirical way with real data on hand.

Bottom line, invest in an APM software to know what happening in your software. If dog is a man's best friend, logs are a software engineer's best friend. Embrace [application level logging](/blog/2019/03/follow-these-logging-best-practices-to-get-the-most-out-of-application-level-logging-slides/) from today.

## Conclusion

In conclusion, good software engineering is a multifaceted discipline that goes beyond just writing functional code. It involves making informed decisions about where to place different elements of your system, choosing reliable and proven technologies, following established best practices, and embracing a culture of continuous improvement. 

> You cannot improve what you cannot measure - Peter Drucker; applies equally to software systems too.

By selecting the right layer for your solution, choosing boring but reliable technology, and adopting a mindset of measurement and adaptation, you pave the way for software that not only meets current requirements but also evolves with the dynamic nature of technology and business needs.

In essence, good software engineering is about finding the solution at the correct layers and levels, creating a foundation for robust, scalable, and future-proof software systems. Always keep learning!
