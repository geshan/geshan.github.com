---
layout: post
title: 5 similarities between software systems and being married (read with a pinch of salt)
date: 2023-02-22T22:47:55.000+11:00
comments: true
tags:
- Software Engineering
cover: "/images/software-systems-marriages/01software-systems-marriages.jpg"
pagetitle: 5 similarities between software systems and being married (read with a pinch of salt)
description: In this fun light hearted read, you will learn about 5 common things between software systems and marital relationship.
keywords: software systems
---
Software systems and marriages have many things in common and there are differences too. In this post, you will learn about 5 things that are similar in both software systems and marriages, let’s get going!

<!-- more -->

<img class="center" loading="lazy" src="/images/software-systems-marriages/01software-systems-marriages.jpg" title="Similarities between software systems and being married" alt="Similarities between software systems and being married">

## Table of contents

* [So you said software systems and married life, hmm...](#so-you-said-software-systems-and-married-life%2C-hmm...)
    * [The first 2 years seem to be good, but then the real fun starts](#the-first-2-years-seem-to-be-good%2C-but-then-the-real-fun-starts)
    * [Housekeeping is essential](#housekeeping-is-essential)
    * [CAP theorem - marriage version](#cap-theorem---marriage-version)
    * [Try new things but never forget the basics](#try-new-things-but-never-forget-the-basics)
    * [Union of 2 families not 2 just individuals](#union-of-2-families-not-just-2-individuals)
* [Other common things](#other-common-things)
* [Conclusion](#conclusion)

## So you said software systems and married life, hmm...

Yes, you will learn about the similarities between a marital relationship and a software system. It will go deeper than the usual stuff of both needing careful planning, effective communication, continuous maintenance, flexibility, and trust. Even ChatGPT will give you those points and elaborate on them. To be clear, by software systems I mean web applications that talk to a datastore (read relational database) and have [software scalability](/blog/2020/12/software-scalability/). These systems are expected to demonstrate [software resilience](/blog/2020/12/software-resilience/) too.

I have been writing software professionally for more than 15 years now and have been happily married for more than a decade. I guess by now I know a thing or two about both software systems and marital relationships. Of course, the part about marriage will have some (dark) humor with it. You must read it with a grain/pinch of salt. Below are the factors that are common between software systems and marriages.

### The first 2 years seem to be good, but then the real fun starts

Both new software systems and new marriages seem to work well for the first 2 years or a bit less. You are permitted to call it the [honeymoon phase](https://www.brides.com/honeymoon-phase-5097161) at your own risk. Then the friction and rust start to appear. 

Every software ever written has a life. The average software engineer like us writes software that works well for around 5 years then it has its own share of problems. The first 1-2 years it will have fewer issues. Issues are less  also because the data the software has to deal with is less for the first couple of years. 

The problems usually start with being tagged as “legacy” software after a couple of years. After 5+ years, some software systems are barely breathing but more oxygen (resources) are pumped to them to keep them functioning. 

> The point here is to make time for refactoring and rewriting parts or whole systems if needed. 

Given that is done the software systems will serve you well else they might become the problem child that triggers calls at 3 AM in the morning.

You might be asking how it is common with marriages, look at a couple who married a couple of months back and a couple who has been married for 12 years with 2 kids. You will find your answers. I digress and will let you do your own mental analysis :D. Where do you see the spark in the first couple or the second with 2 kids? 

### Housekeeping is essential

Housekeeping is essential in both marriages and software systems. For example, in software systems, you should periodically upgrade dependencies.
if you do not periodically upgrade your dependencies managed by a package manager like NPM, Composer, PIP, etc then when the time comes to upgrade,
many of these packages at once it becomes a big headache. 

The same thing happens with other things in software systems like the version of your language/runtime or framework not being updated for long. Some code refactoring or rewriting (read tech debt) left as is for a long time. All these are bad housekeeping practices that will bite you soon. The issue is exacerbated when you have an issue and these kinds of issues become a blocker to solving the issue.

> The easy solution here is to keep the changes small and keep doing them consistently.

Not doing the housekeeping chores in the house will breed the same problems. Yes, you need to clean on top of the fridge and mop the floor too. These things are required for a long successful marriage. Try this experiment, don’t vacuum your home for 3 weeks. It will cause more issues in your marital relationship than the layers of dust on the showpiece.

### CAP theorem - marriage version

In software systems, for data stores, there is a popular theorem abbreviated as [CAP Theorem](https://www.educative.io/blog/what-is-cap-theorem) by Eric Brewer.  The CAP here stands for Consistency, Availability, and Partition tolerance and the theorem states you can have 2 of these three. So either CA, CP, or AP. 

> For instance relational databases like MySQL, PostgreSQL are CA (Consistent and Available) but not partition tolerant meaning if there is an issue with the connection it will fail. 

On the other hand MongoDB has Consistency and Partition tolerance (CP) but lacks availability due to its primary node election process. Similarly, AWS DynamoDB has Availability and Partition tolerance (AP) and lacks consistency due to its design, it goes with eventual consistency.

There is a 3 factor reality in Project management, it is [fast, good, cheap](https://support.microsoft.com/en-us/office/the-project-triangle-8c892e06-d761-4d40-8e1f-17b33fdcf810) and you have to choose any 2. 

Coming back to the point, a similar CAP theorem applies to marital relationships too, where C and A are Consistency, Availability but P is Patience and you have to choose 2. If your wife is Consistent and available she will not be Patient. If your husband is Consistent and Patient, he will not be available. If your wife is available and patient she will not be consistent. Humans are complex so you may get all 3 of CAP but only in the first 2 years of your relationship :D haha. What does all this mean? Draw your own meanings out of this, I give you full liberty ;).

### Try new things but never forget the basics

In both a software system and marital relationship you have to be strong in your basics as pointed out in one of my [talks](/blog/2017/02/things-i-wished-i-knew-as-a-junior-developer-slides/). Being strong in the basics for software systems include knowing your datastore well, understanding the fundamentals of networking/HTTP, having knowledge about how the browser works etc. These things are indispensable for a software engineer that works with web applications.

Once the basics are covered well you can wander off bravely to try out the new language and framework. 

> If you don’t understand why you need a framework just changing the framework or language is not going to help you. 

You can experiment with new tools (read toys) for side projects but for production grade systems always [choose boring technology](https://boringtechnology.club/). Decide to use things your team has already worked with and has good experience with. Do it because when things hit the fan, you can work as a team and fix the bug much faster compared to having Rust or that new framework on production. 

The same formula applies for marriage. Keep it simple, be there with your partner in need. Behave in a culturally apt way and stick to the basics. Once the basics are in place then do experiments or new things. Even with that don’t rock the boat too much. You are very smart as you are reading this, a happy wife = a happy life, period.

### Union of 2 families not just 2 individuals

Marriage might look like an association of two human beings from the outside. Alas! It is much more than that behind the curtains. It is a union of 2 families, the bride and groom’s family. This phenomenon is accentuated in South Asia where it is common to have 500+ people attending (read many overeating and some getting drunk) wedding parties.

In the software systems land, these two families are the customers and the builders. Customers/users of the system are self explanatory. They can be divided into internal (employees) or external (customers/users).

The builder's family has a wide range of skills in it. There are software engineers (backend and frontend), designers, platform (read cloud or devops) engineers, product managers, probably mobile engineers and QA engineers. These days there are other data roles as well like data analyst, data engineer and data scientist. These folks help extract insights from data. Let's not even venture to the Machine Learning/AI part.

The PM and UX researchers are the interface through which customers talk to the company. Still, this long running association doesn’t have the star bride and groom as such but needs to keep the family of the bride (or groom, depending on the culture), which is the customer is always a priority.

> The main point here is to take care of the other family’s members. In a marital relationship lookout and help your partner’s family members as you would do for your own.

Similarly in software systems, the customer’s valid needs should always get the priority it deserves.

## Other common things

There are other common things between software systems and being married. For instance the only thing constant in both systems is change. Technology is not permanent and getting married also demands an array of changes in your life. In both software systems and marriage learn to celebrate small wins. This helps boost self confidence and build more trust. Being clear in communication helps a lot in both systems. Always practice clear and concise communication tailored to the audience and delivered via the right channel.


# Conclusion

There you have it, a fun read about the similarities between software systems and marital relationships. So to sum up, marital relationships are similar to software systems. Both run well for the first 2 years then start showing their true colors. Both of them need continuous housekeeping or you will get a burnt smell. 

Both software systems and marriages have a CAP theorem with a different P :). You have to be strong in the basics for both to try our new things. Finally both marriages and software systems are a union of 2 families and there is always a delicate balance to maintain.

> Knowing about these similarities you should be able to predict and debug issues in software systems (and complex marital relationships) much better now. 

You have to be on your toes for both the systems most of the time. The good thing is for software systems you can measure, monitor and send alerts if things are not right. For the being married part you wished those things were possible :D. 

Again, take this with a pinch of salt and I hope you enjoyed this lighthearted read.
