---
layout: post
title: "Unblocking Software Engineers: Overcoming Non-technical and Technical Roadblocks"
date: 2024-10-12T20:35:37.000+11:00
comments: true
tags:
- Software Engineering
cover: "/images/unblock-software-engineers/01unblock-software-engineers.jpg"
pagetitle: "Unblocking Software Engineers: Overcoming Non-technical and Technical Roadblocks"
description: "Learn how to unlblock software engineers by overcoming non-technical and technical roadblocks. This guide will help you understand the common blockers and how to overcome them."
keywords: unblock software engineers, unblock software developers, unblock software engineers guide, unblock software developers guide, unblock software engineers tips, unblock software developers tips, unblock software engineers non-technical blockers, unblock software developers non-technical blockers, unblock software engineers technical blockers, unblock software developers technical blockers
---
Writing code is a small part of your job as a software engineer. You will also be communicating and managing expectations. In this post, you will learn about where software engineers get blocked while executing a task and how you (as a product person) can unblock them. You will also figure out ways to unblock yourself as a software engineer. Let’s get started!

<!-- more -->

<img class="center" src="/images/unblock-software-engineers/01unblock-software-engineers.jpg" title="Where do software engineers get blocked, and how to unblock them (yourself)" alt="Where do software engineers get blocked, and how to unblock them (yourself)">

## Table of contents

- [What to do vs how to do it](#what-to-do-vs-how-to-do-it)
- [Software engineers blocked on what to do](#software-engineers-blocked-on-what-to-do)
  - [Unblocking from non-technical blockers](#unblocking-from-non-technical-blockers)
- [Technical blockers](#technical-blockers)
  - [Getting unblocked from technical blockers](#getting-unblocked-from-technical-blockers)
    - [Orders over 1000 issue](#orders-over-1000-issue)
    - [The Zendesk library case with an SSL issue](#the-zendesk-library-case-with-an-ssl-issue)
    - [For things that can wait, StackOverflow is your friend](#for-things-that-can-wait%2C-stackoverflow-is-your-friend)
- [Conclusion](#conclusion)

## What to do vs how to do it

For any given feature, what to do and how the feature should work for the customer is always the responsibility of a [product manager](https://www.atlassian.com/agile/product-management/product-manager) (or another product person) in the team. Also, prioritization and what to do now (next sprint) falls under the PM’s duty. Regardless of whether the team is following Agile or not, Scrum or Kanban, how a new feature will behave, and the formula to calculate profit in this scenario are questions a product person in the team is liable to answer.

> As a software engineer, maintain balance in the “what to do” part. You can provide your input here but don’t step on the PM’s foot and start dictating what the software should do.

On the other hand, the engineering team's prerogative is how to do a particular feature from a technical point of view. As a software engineer, you have to decide whether to write a single type of test or three types of tests, whether to refactor that 500-line fine and that 100-liner function. All the technical hows of the feature rests on your shoulders. Be careful here; the feature should be functional, and you should also address the performance and security aspects of that particular feature.

## Software engineers blocked on what to do

It is common for software engineers to pick up a task (usually a ticket on a task management software like Jira) and realize that the task does not have enough context to get started or make any progress. Tasks without enough description are commonplace, and bugs without steps to reproduce are also typical.

As a product manager (or product owner), having a clear [definition of ready](blog/2018/11/5-signs-that-reveal-your-software-development-process-is-agile-only-on-paper-and-solutions-for-them/#unclear-definition-of-ready-for-development-and-done) to be worked on is required. Another important aspect is that the definition of ready is followed strictly on almost all tasks. For instance, if the definition of ready means a task will have a user story and technical requirements defined, it is the task of the product team to have it filled in on all the tickets.

### Unblocking from non-technical blockers

So, how can you, as a product person, unblock the software engineer from taking on a new task or part of a more significant feature? The main thing here is to provide optimal context and examples so that the software engineer has fewer questions and decisions to make. It is better to overcommunicate and provide examples of what to do and how the user will achieve their goals.

A recent example I remember is when we had to calculate the average cost price of shares. The easiest way for me to understand the logic and formula and then convert the formula into code was to ask for a Google sheet where I could see an example. If the PM can add such artifacts beforehand to the task, it would be much easier for the software engineer to get started.

From the engineer’s point of view, it is a balancing act, too. You should be able to ask questions to related people for clarity to be a product-minded engineer. On the other hand, the ticket should also have enough context and examples to make your job easier.

> Think of it this way: following the Pareto principle, 80% of your what to do questions should already be answered by the description, context, and examples of the task, and for the remaining 20%, you should go in and ask people over Slack or even do a small meeting for that extra clarity. 

On the contrary, the product and design team must level up their game if you, as a software engineer, need to communicate with three people to get 80% of what to do for a task.

Sharpening up your people (soft) skills comes into play here. You should know who to talk to, how to get the correct information from that person, and how to unblock yourself aptly. In the next section, you will learn about technical blockers and how to unblock yourself from this category of blockers.

## Technical blockers

Depending on the software engineer's level and experience, technical blockers might exist when writing a new feature. Admit it: Even if you have 20 years of experience writing software, you will indeed Google 5+ times a day (or put your query on some LLM like ChatGPT). We all do that.

The difference is experienced engineers with more than a decade of experience in the language or framework used to build that software will do it under ten times a day. In contrast, less experienced (or junior) engineers will Google/ask an LLM more than ten times a day. In both cases, as long as you find your answer, you are unblocked and can make progress on your task. Sometimes technical blockers are solved faster and more efficiently by stepping away from the screen:

> I have seen many programming problems remain unsolved while on a screen; on the contrary, when the engineer moves the problem to a physical board or paper, it gets solved much more quickly.

More senior engineers have called me on a board, and the solution comes faster on a board than being tied to a screen. That's where, especially for junior and mid-level engineers, the time you spend on a whiteboard teaches you many things. Architecture-level things, like drawing boxes and arrows between them, are best done collaboratively on a physical whiteboard. 

You will also get stuck with technical things in multiple ways; it can be as small as a syntax issue. For instance, you might forget how to use JavaScript's spread syntax `...`. An issue in the library or the framework you use for that project can also block you.  For example, you might need to learn how to do [database transaction](https://typeorm.io/transactions) in TypeORM. You can solve many of these blockages with a quick Google search or by asking an LLM. The more difficult technical blockers are the ones that could be more obvious, as discussed next.

### Getting unblocked from technical blockers

Some technical blockers are complex, like reading the language, framework, or library documentation. These are more difficult to unblock your work from. One strategy that works for these blockers is to make the smallest possible change and see if you can move a bit forward. This strategy often works, but sometimes, you must do more than make a small change. Using a debugger property is also a critical skill; if you know the blockage and see all the variables and values while the issue happens, you can block yourself faster.

#### Orders over 1000 issue

Once, while I was working for Namshi, around 2015, we faced a bizarre issue. We sometimes got this bug with order total, but it was causing problems. The problem became bigger in busy periods. I don’t remember the specifics, but I was assigned this bug, and it took me days to figure out the issue. I was trying to replicate it again and again. Finally, I cracked the nut; it was a weird formatting issue with one of the PHP functions at that time, which would format numbers wrong only when the order was more than 1000 AED. Using a debugger and finding a way to replicate the issue in my local environment helped me figure out the solution.

#### The Zendesk library case with an SSL issue

Sometimes, you find yourself in a situation where no one deployed any new code. It was working yesterday, and today, it is not working. Most likely, in such cases, a third-party library has stopped working. One example from mid-2018 is when a system communicated with Zendesk using its APIs. 

One fine morning, it started throwing unusual errors, and we had not deployed any change to the system for over a week. So, it was clear that the issue was not in the code we had written but something with a third-party library or a thing out of our control. On investigating deeper, it turned out to be an SSL [issue](https://github.com/blakmatrix/node-zendesk/issues/221).

The quickest thing I did to unblock was to fork the [Node.js Zendesk library](https://github.com/blakmatrix/node-zendesk) we were using and [patch](https://github.com/blakmatrix/node-zendesk/pull/222) the issue. After that, use the patched fork in our code base. The app was down for a couple of hours. Due to the time zone, the main library accepted the patch later that day. The next day, we moved back to the patched version of the library.

#### For things that can wait, StackOverflow is your friend

I am not very active on StackOverflow (anymore), but I used to read things there. As a software engineer, you Google things, and most of the time, you find a solution on StackOverflow.

> Our CTO used to say, "This is surely not a unique issue. Someone would have surely faced this, and most likely, you will find a similar question and a useful answer on StackOverflow." He was correct.

I have asked some questions on StackOverflow and got answers in days. One of them is about the [FOS Rest bundle](https://stackoverflow.com/questions/16784996/how-to-show-null-value-in-json-in-fos-rest-bundle-with-jms-serializer) and its serializer 11 years back (viewed more than 15K times now). The main thing to extract from here is don’t stop searching and asking things on StackOverflow, even in this age of LLMs. You don’t know a human might provide a different perspective and a handy solution to your problem.

---

On a different note, I would not consider open pull requests (or waiting for code review) a blockage. It is part of a good software engineering process that teaches you a lot about code, engineering, and writing software that will work well in production.

## Conclusion

Software engineers at any level and in any company will get blocked from doing their work in non-technical or technical ways. 

> The focus should be on reducing the blocked time to increase the productivity of the software engineers and, eventually, the company’s productivity.

This blog post discusses how to unblock software engineers from roadblocks while working on new features. It stresses providing context and examples, addressing technical and non-technical blockers, using debuggers, and making small changes. The goal is to help product people and engineers work together effectively, leading to smoother development processes and successful products.

When you are blocked, think outside the box and make the smallest possible change to make a tiny but valuable progress. Also, don’t hesitate to use the power of the community on platforms like StackOverflow. Keep writing fantastic software while minimizing both non-technical and technical blockers.
