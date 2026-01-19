---
layout: post
title: 'Software Resilience: 7 must-have factors for healing from the unexpected'
date: 2020-12-17T22:45:35.000+11:00
comments: true
tags:
- Software Engineering
cover: "/images/software-resilience/01software-resilience.jpg"
pagetitle: 'Software Resilience: 7 must-have factors for healing from the unexpected'
description: Software resilience is a must-have quality for fault-tolerant software.
  Read this 2000+ word post to know more about the major factors to build resilient
  software systems.
keywords: sofware resilience, resilient software, sofware resilience, highly resilient
  software

---
Software resilience is a must-have quality for any software that is scalable, performant, and fault-tolerant.

The ability of software to heal from unexpected events is software resilience. This means a software engineer has to anticipate unexpected events and account for them. The solution for creating this fault tolerance can be in code or on the infrastructure layer.

> Distributed systems will fail, a resilient software system will not try to avoid failure but expect it and respond gracefully. 

In this post, we will look into some aspects that you need to be careful to have software resilience.

<!-- more -->

<img class="center" loading="lazy" src="/images/software-resilience/01software-resilience.jpg" title="Software resilience factors to consider" alt="Software resilience  factors to consider to heal from the unexpected">

## Table of Contents

1.  [What is software resilience](#what-is-software-resilience)
2.  [Resilient software factors](#resilient-software-factors)
    1.  [Gradual rollout/deploy](#gradual-rollout%2Fdeploy)
    2.  [Retry for software resilience](#retry-for-software-resilience)
    3.  [Timeouts for resilient software](#timeouts-for-resilient-software)
    4.  [Fallback](#fallback)
    5.  [Idempotent operations enable software resilience](#idempotent-operations-enable-software-resilience)
    6.  [Database transaction](#database-transaction)
    7.  [Rate limiting](#rate-limiting)
3.  [Other things to consider](#other-things-to-consider)
4.  [Conclusion](#conclusion)

## What is software resilience

Software Engineering Institute [blog](https://insights.sei.cmu.edu/sei_blog/2019/11/system-resilience-what-exactly-is-it.html) of Carnegie Mellon University indicates:

> Basically, a system is resilient if it continues to carry out its mission in the face of adversity (i.e., if it provides required capabilities despite excessive stresses that can cause disruptions). Being resilient is important because no matter how well a system is engineered, reality will sooner or later conspire to disrupt the system.

If a software system is able to function even partially well when unexpected events occur that is software resilience. On an infrastructure level, there is the infamous [Chaos Monkey](https://netflix.github.io/chaosmonkey/) by NetFlix. Chaos Monkey goes into your production environment and randomly starts killing instances. This acts as a stress test for your software resilience. 

Software resilience is also affected by the blast radius. If the change is low risk in terms of the radius it can cover it is easier to go on with the change. If the blast radius is very big you might need to think of other things too.

## Resilient software factors

There are multiple factors that are part of the software resilience equation. Below are some that I have had experience within my more than a decade long software engineering career. 

> The examples mentioned below will be related to E-commerce as I have worked in fashion E-commerce for almost 9 years now.

Let's get started.

### Gradual rollout/deploy

A gradual rollout or deployment is the ability to give access to a release in parts. It may be canary deployment or blue green deployment or just a feature flag or even a rolling deployment. You can read more about these [deployment techniques](https://opensource.com/article/17/5/colorful-deployments) in a colorful way.

The point here is, even if this is a manual task it is very important for resilient software. Imagine this, you are changing the Payment gateway for an e-commerce website. If you do a big bang 100% of the transactions go from the former Payment gateway A to the New payment gateway B you will land in deep trouble.

> But, if you can try out like 1% of the customers for 1 week, smoothen out any bugs with the new gateway integration it helps a lot and the blast radius is just 1% of the transactions.

Slowly week by week you can go from 1 to 5 then to 10 and finally to 100 with full confidence. The same logic goes on having a [health check](https://microservices.io/patterns/observability/health-check-api.html) when deploying. If the health check fails the deployment is automatically rolled back. Depending on the services, you can even do a gradual rollout meaning this particular version only get 2% of the traffic. [Gradual rollout](https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration) is supported by services like [Google Cloud run](/blog/2019/11/why-use-google-cloud-run-5-compelling-reasons/) on the infrastructure layer not the code layer.

Another important consideration for resilient software is a [deployment is not a release](/blog/2018/10/deployment-is-not-release/).

### Retry for software resilience

If you call another system you always need to expect they might fail. So a retry mechanism helps in this case. For instance, you are calling a product review service to create a new product review. 

> If it fails to create the review you could easily retry 1 or 2 times more to get a successful response. 

A very simple curl example is below:

``` bash
curl -i --retry 3 http://httpbin.org/status/500
```

The curl here is always going to retry 3 times as it will get a 500 error back. The curl below will only run once as it will get at 200 back on the first try:

``` bash
curl -i --retry 3 http://httpbin.org/status/200
```

A retry is a simple but effective way to make the software more resilient.

### Timeouts for resilient software

External systems can be slow and you don't have control over their response times. This can in turn makes the systems you develop slow. Once we were integrating with a "popular" courier service. Unfortunately, their response time to create a shipment was in seconds not milliseconds.

> We tackled this with an optimum timeout and pushing the task async where possible. This really helps keep software resilience intact.

This unblocked the person doing quality checks and putting the items in a box to be shipped to the customer. While the box was traveling from the QC station to the packing station the shipment would be created and the shipping label could be printed. Even though it took some seconds for the box to go from QC to the packing station it was enough for us to create the shipment. If some shipments failed there was an easy option to retry that would call the courier on demand.

The moral of the story, always add relevant timeouts and fail fast. As per need give a way for the user to retry manually when needed. Timeouts are very [important](https://itnext.io/why-i-like-go-http-client-as-a-java-developer-676ea1e698b4).

### Fallback

Fallback is a very simple concept. If the main thing does not work use the backup. The main thing in the case of a web system can be a response from an API. So if your API call fails even after some retries you can fall back to a local copy of the response.

Another example in terms of pure code can be as simple as:

``` js
const shippingFee = fees.shipping ? fees.shipping: 10.00;
```

In the above code snippet, it looks for `fees.shipping` if that is not available it falls back to the value of 10.00. We could implement the same thing to an API call, if we don’t get the desired result from the API call it will gracefully degrade to using the default value.

> Fallbacks seem very obvious but at times I have seen them being forgotten or omitted. 

This can cause problems for high traffic systems.

### Idempotent operations enable software resilience

One [stack overflow](https://stackoverflow.com/a/1077421/112849) answer sums it up well:

> In computing, an idempotent operation is one that has no additional effect if it is called more than once with the same input parameters.

In real life, it is like that stop button on the bus. You press it once or 100 times after the stop sign is lit, it has the same result to indicate the bus driver to stop at the next bus stop. For instance, a GET operation in an API is Idempotent. This is important in designing resilient systems, let me explain with an example.

You are designing an API to mark a message as read.

> Regardless of how many times the API is called to mark that single message as read, the first one will set it from unread to read and all the others won’t change the state.

This is an easy to understand example of idempotency. When making your systems resilient you can safely ignore the second and later requests preserving your resources.

### Database transaction

The simplest way to understand [database transactions](https://www.tutorialspoint.com/dbms/dbms_transaction.htm) is `all or nothing`. If you have 3 steps to complete a task and there is an issue in step 2 it will rollback the whole operation. 

> A classic example is a money transfer between 2 bank accounts, either it goes through in full or nothing happens.

There should not be a case where the money is deducted from account A but not added to account B. Database transactions are very important for consistent data.

With good use of [isolation levels](https://www.geeksforgeeks.org/transaction-isolation-levels-dbms/), we can use database transactions to counter race conditions. For instance, 20 records are to be updated by a cron and a flag called `synced` will be set to true if the rows are successfully synced with another system like an ERP. It can be done in the following steps to avoid another cron doing the same task at the same time:

1. Prepare for the underlying task like sync those rows with an Enterprise Resource Planning (ERP) software
1. Start a database transaction
1. `SELECT  … FOR UPDATE` with isolation level read committed and longer timeout than usual for the session
1. Sync the rows with the ERP
1. Set the synced flag to 1 for selected rows  with an update query
1. Commit the transaction
1. If there is any problem, roll back the whole transaction

So, in the above case if step 4 fails the transaction will be rolled back. While the rows are locked with a select for update another cron will not be able to read it as it is locked for UPDATE and is done with isolation level read committed.

This helps in creating fault-tolerant and resilient software by stopping the same rows to be synced twice. If another cron even by mistake runs while the first one is running it will wait for those rows to be free to be read by the new SELECT … FOR UPDATE query.

### Rate limiting

By now you have surely found out that for software to be more resilient it needs to use the resources optimally. This rate-limiting factor is saving our resources from misuse. For instance, [Twitter API](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/) rate limits call. Let's take an example of `/statuses/user_timeline` on the Twitter API, it says “900 requests/15-min window (user-auth)” and “100,000 requests/24-hour window (application level)”. So if as a consumer you do more than 900 calls to get statues by a user there will be a response with status code 429.

The same principles must be practiced when you develop APIs even if they are consumed by other internal services. Let’s assume if one of the other internal services has a misconfigured infinite loop your service will come down when it starts hitting your service frantically. 

> If you have a good rate-limiting in place the other service will start seeing errors early and they can fix the problem quicker.

On your end, your service doesn’t gobble up resources as well as keeps things sane by failing faster.

## Other things to consider

For better software resilience there are many other things to consider. A database read-write segregation is a good practice. Where there is one master database for mainly writing and multiple read replicas. 

> In this case, the bulk of the operation which is read is load-balanced between the read replicas and the master node gets the write.

There can be “seconds” of lag for the master to sync with the read replicas but that is a cost you should be willing to pay for the resiliency it provides.

Another important software resilience [pattern](https://docs.microsoft.com/en-us/azure/architecture/patterns/category/resiliency) is the Circuit breaker pattern. 

> Similar to your house’s electric circuit breaker if your software system cannot reach another software system multiple times it breaks the circuit marking it open. It periodically checks if the other system is back.

When the other system comes back the circuit is closed again. Microsoft blog has a great explanation of the [circuit breaker](https://docs.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker) pattern.

Resilient software systems scale automatically. They add up resources depending on the load. This point is also related to [software scalability](/blog/2020/12/software-scalability/), generally software scalability and resilience go hand in hand. Autoscaling systems depend on [health checks](https://docs.microsoft.com/en-us/azure/architecture/patterns/health-endpoint-monitoring). 

> For systems to be resilient to load they should be able to add resources when the load is high and lower down the resources as the traffic subsides. 

This keeps the software resilient and the costs optimal too.

## Conclusion

Resilience and self-healing software is very important for high uptime. 

> Even in case of adversity the software that can have a degraded but functional performance is a mark of resilient software.

Software resilience is achieved by always questioning what happens if this fails especially when communicating with external services like a database or an external API. I hope this helps you architect more resilient software. If you have any more aspects to share, please don’t forget to comment.
