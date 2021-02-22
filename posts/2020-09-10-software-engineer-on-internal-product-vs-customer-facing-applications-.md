---
layout: post
title: Working as a software engineer on internal product Vs a customer-facing one
  in E-commerce companies
date: 2020-09-08T15:25:29.000+11:00
comments: true
tags:
- Software Engineering
cover: "/images/internal-vs-customer-facing-apps/02ecommerce.jpg"
pagetitle: Difference between working as a software engineer on an internal product
  and customer-facing application in E-commerce companies
description: Get the inside outs of working as a software engineer on internal products
  vs customer-facing application for e-commerce compaines in this 1950+ word post.
keywords: working as software engineer

---
Working on software systems is usually a complex process if not a complicated one. In this post, I am going to highlight the key differences between working for internal software and customer-facing applications with examples related to E-commerce. I have worked with both internal products and customer-facing applications in the past 8 and a half years. Without further ado, let’s get started.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/internal-vs-customer-facing-apps/02ecommerce.jpg" title="Ecommerce summarized" alt="Difference between working as a software engineer on an internal product and customer-facing application in E-commerce companies">

<!-- more -->

## Why e-commerce examples?

E-commerce has been around for decades now. I have worked for fashion e-commerce companies for the past 8 years now on 2 continents. Unsurprisingly, due to COVID-19, many brick and mortar businesses have been forced to jump on the e-commerce bandwagon. This has created many new opportunities. Smaller companies could live with services like [Shopify](https://www.shopify.com.au/) or one of its competitors like [Wix](https://www.wix.com/ecommerce/website). This would result in no or minimal software development.

> Businesses with an appetite for in-house software development can even start with something like woo-commerce, Magento, Odoo, or similar. But, at a scale of millions of customers, cookie-cutter generic solutions might not be the best fit.

Either it is too much work to get things customized well or hammering the screw is not a path you want to choose for your business. Therefore, having custom-built solutions that can scale well with business demands is crucial for commercial success.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/internal-vs-customer-facing-apps/01ecommerce.jpg" title="Ecommerce someone buying online" alt="Working as a software engineer on internal product Vs a customer-facing one in E-commerce companies">

## Assumptions

* Having worked for fashion e-commerce companies with lots of internal systems, I assume that many e-commerce companies work the same way.
* Examples and experience will be based on physical products especially related to fashion.

I had written about [working as a software engineer for a dev shop/agency vs a product company](/blog/2013/06/working-for-dev-shop-with-projects-vs/) in the past, it should be a good read too. Let’s look at what are internal products and customer-facing applications.

## What is an internal product?

Simply put, an internal product is a product used only by the employees of a company. In the case of e-commerce, any software system that is used to do back-office operations will qualify as an internal product.

Some of the examples of internal products include order management system, picking and/or packing applications. software systems to book parcels with couriers, software to manage returns, etc are also internal applications.

> What you see from the outside world as a customer is just the tip of the iceberg. There will be many software systems used internally by e-commerce companies to make your purchase experience better.

Even before a product (SKU) is visible on the catalog pages, it would have passed through multiple internal systems. For instance, it would be uniquely identifiable on the Enterprise Resource Planning (ERP) software. If there is a buying software in place, that SKU would be visible and accessible there too.

In case there is a production and/or studio management system, that same SKU will exist there as well for the imagery and text contents of the product.

After the purchase, there will be a suite of internal applications to make sure the product reaches the customer easily. From systems that send the order to the EPR, software that talks with couriers to even systems that track customer’s returns.

There will be a web of internal products not directly visible to the end customer. On the other hand, there will be some software systems that are available for use to end customers, let's learn what they are.

## What is a customer-facing application?

Any application used by the end customer can be referred to as a customer-facing application. First and foremost, the website customers use to browse through the catalog and buy is an important customer-facing application.

Another must-have customer-facing application these days are native mobile apps that serve a similar purpose as the website. By now, it is clear anyone browsing or buying from the e-commerce website is a customer or lead for the website.

Depending on how the e-commerce company breaks down its software services there can be many customer-facing applications.

> For instance, the wishlist can be a standalone application on its own. The cart can be another application that works in tandem with the other related customer-facing parts. The catalog can be a big independent application on its own with the search capabilities inside it. Checkout, the money earner can also be another software application.

Any application the end customer has direct access to qualifies as a customer-facing application. Ranging from the catalog page to the return page used by the customer to request a return.

Customer-facing applications will work closely with internal applications to provide superior service to the end customer.

Time to be informed of the difference between working as a software engineer on these two sides of the spectrum.

## The differences in working on internal applications vs customer-facing ones

Now let’s dig more into the differences working as a software engineer on internal applications and customer-facing ones.

### Fewer performance and scalability considerations for internal applications

As software engineers, we always have to be conscious of the performance impact of our architecture and code decisions. These performance impacts have a higher value for customer-facing applications compared to internal ones. An internal application being 100 milliseconds slower won't have a big impact. On the other hand, if say the checkout is 100 milliseconds slower, that would be a big concern.

> Of course, this in no way promotes writing poor performing code for internal applications. Still, even if you would want to do the refactoring of code, performance upgrades in 1-2 weeks from now it will not hurt the business much.

Another aspect is the load the application will receive. For internal products, it will be predictable as the number of users or usage patterns will be clear. For an open to the whole world customer-facing application, you could potentially get millions of users in a day. This means those millisecond/microsecond optimizations will need some careful consideration for customer-facing applications compared to internal products.

Similarly, the [software scalability](/blog/2020/12/software-scalability/) of the application also comes into play at this point. Customer-facing applications will be provisioned more resources to make it more scalable as the load is difficult to predict. Usually, internal applications run on much fewer resources as they don’t get hit millions of times a day.

### Customer-facing applications are more security sensitive

Depending on your customer base, a customer-facing application can be accessed by anyone in the world. Conversely, an internal product's users are limited. Because of this, access to the application can be behind a VPN/firewall or even allowed a group of IPs. With all of this network-level filtering in place, the application-level security can be a bit relaxed for internal products.

> On the other hand, as a software engineer, you will have to be on your toes for customer-facing applications. Even though the attack vector may be similar but the people who could try to attack is a lot more.

This is where knowledge of [OWASP top 10](https://owasp.org/www-project-top-ten/) vulnerabilities will come in very handy for you.

Security is everyone’s responsibility. In no means or form, I am suggesting to write less secure code for internal applications. The only thing is the cost and blast radius of a security breach of an internal product will be lesser than a customer-facing one. This is surely subject to people’s intentions if an employee does a security breach on a customer database from an internal product that is a completely different scenario to process.

### Minimal use of feature flags, A/B testing, and gradual rollouts on internal applications

As per my experience, I have never seen an internal application being A/B tested. The reason is simple: you can just go to the user and have a chat to come to a better decision. As the users are limited and within the same organization you can even ask the user to use a certain browser or software. Once, we deployed a go executable on like 10 photographers’ Mac to be able to upload images to S3 much faster. There was no need for an A/B test there. Another reason not to do A/B testing for internal products is the limited scale which will result in skewed results due to low volumes.

There is a similar situation for using [feature flags](/blog/2018/10/deployment-is-not-release/). It will be needed now and then but not all the time. I have also rarely witnessed gradual rollout like 1%  of the users for the first week, then 5% next week and slowly going to 100% on internal products.

> On the contrary, for customer-facing applications especially for e-commerce A/B testing is like an agreed norm. Many times one user will see the checkout button “green” but another sure will see it “blue”.

Similarly, feature flags are used a lot more for customer-facing applications. In my own experience, when I first added PayPal to our website back in 2012 it was only available for 2 emails initially, then it went live for all company emails. Only after a couple of days of testing, we released it to everyone.

I share a similar experience with gradual rollouts on customer-facing applications. One instance I remember is we changed our payment gateway. After a lot of rigorous testing on staging, the first time it was released to production was for just 1% of the customers. Gradually next week it came to 5%. After some fixes, it went to 10, and to reach 100% it took like a month or so.

In terms of measuring impact, internal products are easier. Internal products work on one of these two objectives. Either enable to do a thing or optimize (like speed) of something by X%. On the other hand, customer products have multiple complex metrics. The metrics can range from NPS, conversion rate to return rate, etc. While one metric is improved another metric might be hampered along the way.

### Customer-facing applications get more UX love

Customers are the money payers and they should “enjoy” using our websites and mobile apps. Contrastingly, employees who use the internal product, it is part of their jobs. Internal products are built to make their lives easier so the UX love is somewhat missing on them.

This certainly does not equate to that all internal products must lack the UX factor. I am just sharing my personal experience from the past 8-9 years of working in e-commerce. Once we built an internal application that was built on bootstrap. I am not saying bootstrap CSS is bad in any way.

> My point here is that in that project we didn’t even have a dedicated UX person for designs. The frontend engineers pieced together the app and it was ready to go. Of course, it made the user’s life much easier and their work much faster. Still, some UX love would have been the cherry on the cake.

On the flip side, customer products usually have a dedicated UX person. This person does research, thinks through how the customer will use this new feature. S/he probably even interviews some customers to get the feedback and make that app/feature a UX gem. Making that button round or square is a decision. Showing the message on top or beside the product is another factor. I won’t be wrong if I say customer-facing applications get much more UX attention and work than internal products and honestly it is deserved too.

Another reason internal products don't get much of the UX love is "personas". While customer-facing apps cater to different personas with varied needs, internal products have usually one persona trying to get their job done.

## Summary

Here is the summary of the above differences as a simple table:

| Criteria                                            |                           Internal Products                           | Customer-facing applications                                                                        |
|-----------------------------------------------------|:---------------------------------------------------------------------:|-----------------------------------------------------------------------------------------------------|
| **Performance and scalability**                     |                    A bit of slow performance is Ok.                   | Application needs to be performant and scaleable under high loads.                                   |
| **Security sensitivity**                            | Not very sensitive as internal applications are being a VPN/firewall. | Highly sensitive to security issues as anyone in the world can access a customer-facing application. |
| **A/B Testing, feature flags, and gradual rollout** | These are not used much for internal products.                        | These are used heavily on customer-facing applications with segmenting too.                         |
| **UX Love**                                         | Internal products don't get much of the UX love.                      | Customer-facing applications get a lot of UX love :).                                               |

## Conclusion

> The main thing to comprehend is both internal products and customer-facing applications make the overall customer experience better. Don’t focus on only one part, having one of the best checkout experiences but delivering the item after 30 days does not make sense.

Strengthen both sides of the coin. Internal products and customer-facing applications are like two wheels of a chariot. If one fails the chariot can only go in circles leading to nowhere. I hope as a software engineer, you get to work on amazing products on both sides with world-class software engineering practices in place.