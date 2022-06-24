---
layout: post
title: "Don't code your microservice like a monolith, keep it maintainable not over-engineered"
date: 2018-10-12 15:54:07 +11:00
comments: true
tags: 
- microservice
- devops
cover: /images/microservice-code/lego.jpg
description: Will you use a gun to kill a fly? The answer is NO. The same thing goes when you want to write a microservice application that is going to be maximum of 10K lines of code.
keywords: Microservices, Programming, Software Architecture, Software Engineering
---

Will you use a gun to kill a fly? The answer is NO. The same thing goes when you want to write a microservice application that is going to be maximum of 10K lines of code. Don't over-engineer it. Ok, you have been writing and maintaining large code bases. Some might be 100K+ lines of code but you need to get over your habits and think differently. This post helps you unravel the mysteries of writing small and maintainable microservices. The suggestions are opinionated but it is in practice in a million dollar business. 

<!-- more -->

<img class="center" loading="lazy" src="/images/microservice-code/lego.jpg" title="Do not code your microservice like a monolith, keep it maintainable not over-engineered" alt="Do not code your microservice like a monolith, keep it maintainable not over-engineered">

## TLDR;
> Microservices are small software systems. You can safely ditch MVC. Say no to ORM and also not take the design pattern baggage for microservices. Focus on code performance, readability, and maintainability not some old rules and patterns. Those patterns were made when people were not doing microservices.


## Why write microservices in the first place?

Microservices architecture, in my opinion, is breaking one or more monoliths into multiple smaller systems. These are more maintainable, independently developed and deployed pieces of software based on business functions. These smaller (presumably “micro”) systems should focus on only one business function and do it well. The catch here is "micro", these pieces should ideally be under 10K lines of code. 

As they are independent it helps the business release features faster. The shipments team is not dependent on the checkout team. Something deployed on the shipments app is never going to break checkout. It becomes very decoupled. The blast radius of each change is controlled. That is the reason for rapid microservice adoption.

Now let's look at the ways you were used to doing things and why it makes less sense in this microservices era.

## Do you need MVC?

Model-View-Controller, I got introduced to it in 2007 or maybe a bit earlier. Then I used to think it was the silver bullet to all software architecture issues. I don't hold that opinion anymore. Yes, you used to work with Java or PHP and every other framework was MVC based. Now, you don't need to be strict about MVC anymore. Focus on clarity and getting things done.  

Use controllers if you want and if it still makes sense. Think like my app gets HTTP request and it has to give back HTTP response. Do think of having a backend API and frontend(s) consuming it. Check the code below, it is surely not MVC:

<script src="https://gist.github.com/geshan/1f76e5ebb3c15fd3c147c6c97420f923.js"></script>
You can see the full app on this [repo](https://github.com/geshan/currency-api). Veify the structure it is not MVC :)

So rather than doing an effort to get precise lines of M-V-C, write tests, implement continuous integration. Add some logs and monitoring to the app. Make the code maintainable, keep it as lean and simple as possible.

## Don't take on the ORM overhead

Object Relation Mapping (ORM) when I first saw an ORM in action, I said to myself this is one of the best things ever known to programmers. 10+ years later I would be cautious to suggest an ORM to any software engineer. Last year I refactored a full ORM implementation to a raw SQL query way and it made that part of the application perform 20% faster. On top of it, the database transactions were evident and the code was far more readable hence maintainable.

Data mapper or Active record both bring their own opinions, ways of doing things and extra weight. This not only causes performance issues but also code readability suffers. Think of the pre and post hooks/event listener Doctrine has, they work like magic and it is always tricky to understand magic. 

<img class="center" loading="lazy" src="/images/microservice-code/pot-on-head.jpg" title="Do not code your microservice like a monolith, keep it maintainable not over-engineered" alt="Do not code your microservice like a monolith, keep it maintainable not over-engineered">

Just try this, explain how an ORM related insert code works VS how a simple and straightforward INSERT SQL query works to a beginner/junior software engineer. You will already regret using that ORM. Especially in the context of microservices ORM is a clear overhead. The microservice is anticipated to be maximum of 10K lines of code and affect hardly 10 tables so just don't use an ORM, period.

## Design patterns might be a baggage

I am not saying that you don't need to learn about [software design patterns](https://en.wikipedia.org/wiki/Software_design_pattern). You should know about SOLID, law of Demeter, factory pattern, strategy pattern, singleton, adapter pattern etc. Well, most of these make sense if you do object-oriented programming right? What if you write a microservice in Node JS that is 1k lines of code spread across ~7 files. It does one small slice of the business function. All these patterns become nice to know stuff at that point.

Design Patterns are relevant for a code base that is already big and in the next 6-12 months is going to be bigger, your usual monolith. They can turn out to be "extra baggage" for a service that is 100s of lines of code now and will become 1000s of lines of code in the next 6-12 months. We never foresee it to be bigger than that because to do that other part we will have another microservice. So keep your microservice code fat free and well tested.

<img class="center" loading="lazy" src="/images/microservice-code/baggage.jpg" title="Do not code your microservice like a monolith, keep it maintainable not over-engineered" alt="Do not code your microservice like a monolith, keep it maintainable not over-engineered">

## Conclusion

If you still want to code your microservice like the last monolith you worked on maybe you are doing something wrong. Think of it again, if you go for a day trip you don't pack and carry things like you are going for a 2 weeks vacation. Think of code performance and maintainability, let the data speak for you and break the rules. Happy software engineering! 
