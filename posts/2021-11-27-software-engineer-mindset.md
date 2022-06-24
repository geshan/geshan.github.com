---
layout: post
title: "The difference in mindset needed for a stable software product vs a new feature/project"
date: 2021-11-27T22:37:45.000+11:00
comments: true
tags:
- Software Engineering
cover: "/images/software-engineer-mindset/01software-engineer-mindset.jpg"
pagetitle: "Software engineer mindset differences needed for working on a stable software product vs a new feature/project"
description: "Learn about the two different mindsets nedeed by software engineers to work on a stable software product vs a 
new greenfield feature or proejct in this post."
keywords: "software engineer mindset"

---
If you have worked in building software for some years, possibly more than once the work has been either "some changes" on an existing project or a completely new greenfield project. Already working a.k.a brownfield products have users using it whereas new projects don't have the volume of users till it goes fully on production in some way. In this post, we will evaluate the differences in the mindset software engineers need to have for a stable software product vs a new greenfield project. Let's get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/software-engineer-mindset/01software-engineer-mindset.jpg" title="Software engineer mindset differences needed for working on a stable software product vs a new feature/project" alt="Software engineer mindset differences needed for working on a stable software product vs a new feature/project">


## Table of contents

* [What is a stable software product?](#what-is-a-stable-software-product)
    * [Example stable product](#example-stable-product)
    * [Feature completeness is a must for a stable product](#feature-completeness-is-a-must-for-a-stable-product)
* [Qualities of a new software project](#qualities-of-a-new-software-project)
    * [Example new feature](#example-new-feature)
    * [Fail fast and iterate is the key to success in a new project](#fail-fast-and-iterate-is-the-key-to-success-in-a-new-project)
* [Conclusion](#conclusion)

## What is a stable software product?

Before we go deeper into the mental makeup for a stable software product let's define what we mean by that. A stable software product is a form of software that has multiple concurrent users and could be made up of numerous subsystems working together. Some of these subsystems can be old but they serve the purpose and make the business money. For example, the public-facing website of an established e-commerce retailer is surely a stable software product. The customers interact with it each day and some customers buy things using it daily. If there is any bug on the critical path of buying a product it would generally be solved within hours if not days. 

Depending on the technical decisions and architecture there will be an API used by the mobile applications for our popular e-commerce retailer. We can also assume that at any given time even in the wee hours around a hundred people are using the website and mobile apps. The business receives thousands of orders a day. 

> To get a thousand orders per day with a modest [conversion rate](https://www.invespcro.com/blog/the-average-website-conversion-rate-by-industry/) of 2.5% the retailer would need at least 40000 visitors. That is 27.77 (40000/1440) visitors each minute.

### Example stable product

As an example let's pick pricing on a size level for products. Let's assume our amazing e-tailer sold all the sizes of the same product for the same price. Now they want to add Beauty products to the catalog assortment. With beauty products like fragrance, a 30 ml bottle can sell for $75 and a 50 ml bottle can sell at $95, as seen below:

<img class="center" loading="lazy" src="/images/software-engineer-mindset/02size-level-pricing.jpg" title="Example of pricing for a product dependent on the sizes" alt="Example of pricing for a product dependent on the sizes">

Any change on such a high-stakes system will need a different software engineer mindset than a new greenfield project that has not proven the product-market fit yet. Next, we will discuss the mental process needed while working for a stable money-earning product.

### Feature completeness is a must for a stable product

For an existing product, the main expectation will be feature completeness. As the change will be surely used by 1000s of customers when completed it has to be feature complete. What to do surely rests on the product owner's shoulders, still with proper iteration planning it can be done well.

> In the above price range on size example, it is directly related to the critical path. Any change released to customers not only has to be feature complete it has to be very well tested too. 

It needs to be built in a way where the feature can handle the current load of 1000s of orders per day equating to 100K requests per day.

Of course, such changes can also be released gradually and incrementally with the use of feature flags. The main ethos here is to avoid risk when needed and test the software very well before it goes out to customers.

## Qualities of a new software project

Let's define what a new greenfield software project is. A new software project would not have been released to customers yet and the new feature is under active development. The business has some assumptions on how the customers will react and receive this new feature but there isn’t any actual customer usage data to verify the assumption. 


### Example new feature

In the same e-commerce retailer, a decision has been made to introduce a shipping fee subscription option for customers. With this subscription say for $120 a year the customer never needs to pay the shipping fee for any orders placed in that period. 

> Even though it is a customer-facing feature the error budget is higher than checkout and a certain amount of tech debt is expected. 

The tech debt is a result of trying to release the subscription feature faster but with plans to do it in a better way after the idea has been tested and validated.

This project can be done in multiple ways. One of them can be to build a new [microservice](/blog/2018/10/dont-code-your-microservice-like-a-monolith/) to handle the subscription for the shipping fee. Let's suppose it was built as a new [subscription microservice](/blog/2018/10/moving-from-a-and-b-to-~150-microservices/). So it has a completely new codebase and it is more like a customer experiment to see if the business can get 100 paying customers within a given timeframe. An example screenshot is below:

<img class="center" loading="lazy" src="/images/software-engineer-mindset/03shipping-fee-subscription.jpg" title="Example of shipping fee subscription for an e-commerce retailer" alt="Example of shipping fee subscription for an e-commerce retailer">

As this is a new feature, it doesn't have any customers and the team has decided to use feature flags. Any change will first be released to the team, then to the company's staff and the to 2% of customers. Only after the bugs have been smoothed out, the release would gradually climb up to 100% of customers in up to 2 weeks after the first customer release which stands on the [deployment is not a release](/blog/2018/10/deployment-is-not-release/) philosophy. This type of greenfield project that validates the idea fast requires a different software engineer mindset than making the project feature complete. We discuss the mental processes in the following section.


### Fail fast and iterate is the key to success in a new project

On the contrary to a stable project, for a new feature, fast iteration to get feedback is more important. The mindset should be more like let's get this to our customers, which could be the company's staff to start with them to get the first 100 subscribing customers to the service. Fail fast is accepted and feature completeness and rigorous testing are not expected in such projects. It is like Agile 101. 

> Given the error budget and release to x% of customers, the new feature can be slightly less tested than the above price range example that is on the critical path.

As the subscription idea has not been verified some technical shortcuts can and will be taken. For example, the internal tool to view the subscriptions may not even have pagination in the first iteration and of course, it will be just usable being an internal tool. You can read more about the difference between [working on an internal product vs a customer-facing one](/blog/2020/09/software-engineer-on-internal-product-vs-customer-facing-applications-/).

The main goal here is to get the working software possibly a bit buggy out the customers to get to the target of getting those first 100 customers which is the fail fast and iterate faster mindset. Taking some shortcuts is allowed and expected. The software does not need to be built in a way to handle 1000s of concurrent users at first, it can be made robust and [scalable software](/blog/2020/12/software-scalability/) after the idea has been validated. 

## Conclusion

As discussed above, we saw that for the same e-tailer a change in the critical path requires rigorous testing and a feature completeness mindset from the software engineer. Whereas in a new feature not validated by the customers the focus is on iteration and getting working software out quickly. 
> As a software engineer being able to switch quickly between these two mindsets and using tools and techniques at disposal like feature flags help us shine at our work.

Software engineering is a team sport, so work cohesively with your team and communicate such factors upfront and in an easy-to-understand way to get the most out of the project with the appropriate and relevant mindset.
