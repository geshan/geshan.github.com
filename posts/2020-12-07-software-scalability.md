---
layout: post
title: 6 dev and operations factors to consider for software scalability to meet high
  demands
date: 2020-12-07T20:15:25.000+11:00
comments: true
tags:
- Software Engineering
cover: "/images/software-scalability/01software-scalability.jpg"
pagetitle: 'Software scalability: 6 dev and operations factors to consider for meeting
  high demands'
description: Software scalability is an interesting issue to have. Read this 2500+
  words post to know dev and ops aspects to focus on for achieving scalable software.
keywords: sofware scalability, scalable software, high scalability, scaling system,
  scalable software architecture, highly scalable

---
Software scalability is an interesting issue to have. Making software scalable consists of multiple factors, we discuss some dev (code) related and a few operations (platforms) associated aspects in this blog post.

We will discuss more on how to write software (software development) and how you run the software (operations) to make the software scalable. For beginners, [cost and scalability](https://medium.com/@i.gorton/six-rules-of-thumb-for-scaling-software-architectures-a831960414f9) are generally proportional, let’s get cracking.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/software-scalability/01software-scalability.jpg" title="Software scalability factors to consider" alt="Software scalability dev and ops factors to consider to meet high demands">

<!-- more -->
## Table of contents

1.  [What is software scalability](#what-is-software-scalability)
2.  [Software Scalability dev point of view](#software-scalability-dev-point-of-view)
    1.  [Scalable software with efficient code](#scalable-software-with-efficient-code)
        1.  [Choosing the apt algorithm](#choosing-the-apt-algorithm)
        2.  [Better memory management](#better-memory-management)
        3.  [Choosing performant libraries](#choosing-performant-libraries)
    2.  [Asynchronous processing](#asynchronous-processing)
        1.  [Use queues and consumer for software scalability](#use-queues-and-consumer-for-software-scalability)
        2.  [Use async code where applicable](#use-async-code-where-applicable)
    3.  [Write stateless applications for scalable software](#write-stateless-applications-for-scalable-software)
        1.  [Don’t use the local file system](#don%E2%80%99t-use-the-local-file-system)
        2.  [Replace server-side sessions with something client side](#replace-server-side-sessions-with-something-client-side)
3.  [Software Scalability from an operations standpoint](#software-scalability-from-an-operations-standpoint)
    1.  [Vertical scaling vs Horizontal scaling](#vertical-scaling-vs-horizontal-scaling)
        1.  [Vertical Scaling (Scale Up)](#vertical-scaling-(scale-up))
        2.  [Horizontal scaling (Scale out)](#horizontal-scaling-(scale-out))
    2.  [Using NoSQL for high software scalability](#using-nosql-for-high-software-scalability)
        1.  [NoSQL database for scalable software](#nosql-database-for-scalable-software)
        2.  [Eventual consistency and CAP Theorem](#eventual-consistency-and-cap-theorem)
    3.  [Caching to enable software scalability](#caching-to-enable-software-scalability)
        1.  [Memoization](#memoization)
        2.  [HTTP Caching for scalable software](#http-caching-for-scalable-software)
4.  [Conclusion](#conclusion)

## What is software scalability

[Full-scale blog](https://fullscale.io/blog/what-is-software-scalability) defines software scalability as:

> Software scalability is an attribute of a tool or a system to increase its capacity and functionalities based on its users’ demand. Scalable software can remain stable while adapting to changes, upgrades, overhauls, and resource reduction.

So if the software can be elastic on handling load given more resources are allocated (mostly dynamically) when the volume of requests increases we can say that the software is scalable. Even to achieve this we need to focus on the code part too.

## Software Scalability dev point of view

Software engineers should know how to write scalable software. You should focus on writing code that makes software scalability easy and put it as a priority. It is easy to write software that barely works but it is difficult to write tested, maintainable code that also scales very well. Below are a few things that can help you to write more scalable software.

### Scalable software with efficient code

Software applications can be written in a way where it just works. On the other hand, it can be written in a way with software scalability, maintenance, and resilience in mind.

#### Choosing the apt algorithm

Choosing the right algorithm apt for the use case based on time and space complexity can yield great results. 

> Knowing about the [Big O notation](https://github.com/pavankat/big-o-in-plain-english#what-is-big-o) and things like streams to tackle space complexity would be immensely helpful for writing scalable software. 

For instance, you can opt to use [Binary search than a linear search](https://www.baeldung.com/cs/linear-search-vs-binary-search) algorithm so that it performs faster. In case of space complexity, you can opt for a low memory consuming stream to [copy a big file with less memory](https://medium.com/dev-bits/writing-memory-efficient-software-applications-in-node-js-5575f646b67f). Do have a look at this [video](https://www.youtube.com/watch?v=kPRA0W1kECg) that visually shows the sorting algorithms in 6 minutes.

#### Better memory management

As a software engineer, you should be careful about things like [memory management](https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/), garbage collection so that they don't become an issue at scale. For scalable software anticipating and writing code for the [race conditions](https://www.baeldung.com/cs/race-conditions) are also vital.

#### Choosing performant libraries 

Other things that can help software scalability include comparing and using more performance solutions. 
For example, you can use just javascript in place of [lodash](https://lodash.com/) and it will be [faster](https://codeburst.io/why-you-shouldnt-use-lodash-anymore-and-use-pure-javascript-instead-c397df51a66) and more performant.

> Also, don’t just use a library or package because it’s popular, check the performance and software scalability implications.

For instance, you could use [Day.js](https://github.com/iamkun/dayjs) in place of [Moment.js](https://momentjs.com/) to do simple date manipulation. If need be use the native methods to make the software more scalable.

### Asynchronous processing

Imagine this, a customer has successfully placed an order and you need to send an order confirmation email. How would you want to do it? As it is a non-critical part of the process I would always vote to do it asynchronously.

#### Use queues and consumer for software scalability

> You can easily set up queues and consumers to get the email sending task done well after the order is placed. If the email is sent 1 minute late it does not cause a problem.

If you want to reduce the latency when there are many orders you can always scale up the number of consumers. Any non-critical or non-blocking task can be pushed to the background to be done asynchronously. It helps use the available resources at an optimum level without any problems.

#### Use async code where applicable

Another example of asynchronous processing is using async code. Depending on the language, you should be able to push some tasks to the background. While the task is being executed, a response can be sent that it is scheduled. You can look at a Node.js [example](/blog/2020/11/nodejs-for-php-developers/#node.js-code-execution-is-async-and-non-sequential) of an async response. Of course, this depends on your language of choice, some languages like PHP might not support async code out of the box.

### Write stateless applications for scalable software

Statelessness is a prerequisite for high scalability software. The [Stateless vs Stateful](https://www.redhat.com/en/topics/cloud-native-apps/stateful-vs-stateless) comparison from Redhat mentions “Think of stateless transactions as a vending machine: a single request and a response.” It depicts a stateful application as “You can think of stateful transactions as an ongoing periodic conversation with the same person.”

Stateless software does not share anything between requests. It also doesn't depend on things like the local filesystem.

#### Don’t use the local file system

> If there is a need to save a file it should be done somewhere remote and reliable like access-controlled storage for instance an Amazon S3 bucket. 

This makes it easy to save the file and serving it can be scaled too with the use of Content Delivery Network (CDN). It also helps in software scalability by separating static and dynamic content. Static content like images and other files like PDF can be served much more efficiently with a CDN than your web server. Utilize your webserver to serve up the dynamic content as web servers like Apache or Nginx are built to do that better than just serving up static files.

#### Replace server-side sessions with something client-side

Another classic example is to not use [server-side sessions](https://www.tutorialspoint.com/What-is-the-difference-between-session-and-cookies) for web applications but use client-side cookies. 

> You can easily replace server-side sessions with something like a [JSON Web Token (JWT)](https://jwt.io/) for authentication and authorization.

JWTs can be easily passed to the server on each request from the client as part of the header or as a cookie. It makes scaling software a lot easier as servers can act as [cattle than a pet](http://cloudscaling.com/blog/cloud-computing/the-history-of-pets-vs-cattle/). If you absolutely need sessions don’t save it on the server file system move it to a datastore like Redis which will make the server replaceable easily.
The main point here is you should not love your server, they should be disposable and elastic as per the load. This is made possible by writing stateless software which is easily scalable and also highly available.

## Software Scalability from an operations standpoint

By operation/platforms, I am referring to where and how the software is deployed and run. I am also covering the architecture of the systems and how they talk to each other.

The location where the software is deployed is crucial. 

> If your users are in Sydney and the software is deployed in Europe, it will have network latency. 

Similarly, if the components are not laid out well or chosen properly it will have negative implications. Let’s look at some operations level factors that are crucial for software scalability.

### Vertical scaling vs Horizontal scaling

This is a continuation of the [cattle vs pet](https://www.hava.io/blog/cattle-vs-pets-devops-explained) analogy of servers. Time to analyze it a bit further. Imagine this, you are technically managing a fairly popular e-commerce website that has around 500 orders a day and ~50k users coming to the website. You have a big web server that is close to an [Amazon EC2 m5.4xlarge](https://aws.amazon.com/ec2/instance-types/) spec. It has 16 vCPUs and has a massive 64GB of RAM. Let’s assume your [WooCommerce](https://woocommerce.com/) store is running on it where the webserver and MySQL database are also in that same machine.

Now, just 3 months before Black Friday the company wants to push for a massive TV campaign and expects 5-7 times more traffic on Black Friday. The management is investing a lot in advertising and the website can’t go down for those 4-5 days.

> It is also expected that there will be 300k+ users on the website and 3k+ orders placed for those 3-4 days.

You have 2 options to scale the application now either scale up (vertical scaling) or scale-out (horizontal scaling).

#### Vertical Scaling (Scale-Up)

If you choose the scale-up path also called vertical scaling. With vertical scaling, you add more hardware to solve the scaling issue.  

> You can get an EC2 m5.24xlarge machine. It has 96 vCPUS and 384 MB of RAM. 

The CPU and RAM are 6 times compared to the old machine so theoretically, it should hold up. 

But there are 3 main issues, you will need a bit of downtime to upgrade the hardware. The second and main one is that the machine is the single point of failure. If there is an issue in the DB due to load the website can still come crashing down. You will need to scale down later and if the traffic is not as much as expected, there are resources wasted due to over-provisioning.

#### Horizontal scaling (Scale-out)

Another option is to scale-out also known as horizontal scaling. With this path, you will try to get many smaller EC2 instances like 8-50 of t3.mediums.

> Each of them will have 2 vCPUs and 4 GB of RAM. So a fleet of 50 t3.mediums can give you 100 vCPUs and 200 GBs of RAM in total. To distribute the load correctly among the fleets of these new EC2 instances you can use [Amazon Application load balancer](https://aws.amazon.com/elasticloadbalancing/application-load-balancer/).

To make the application more scalable you can use Amazon RDS db.m5.8xlarge instance with 32 vCPUs and 128 GB RAM. As per need, you can also configure the backup. At this point, your 50 servers are your cattle if 3 dies, you spin up 3 more.

> If there is much less load then only 3 instances are running and when traffic spikes up 20 more come up in minutes.

After the sale period ends you scale down the DB to a db.m5.large and things are working fine for 500 orders a day.

As this is important let’s explain it visually below:  PS: pardon my bad designing skills :)

<img class="center" src="/images/generic/loading.gif" data-echo="/images/software-scalability/02vertical-scaling-software-scalability.jpg" title="Vertical scalability with beefing up resource on the same machine for software scalability" alt="Vertical scalability with beefing up resource on the same machine for software scalability">

---

<img class="center" src="/images/generic/loading.gif" data-echo="/images/software-scalability/03horizontal-scaling-software-scalability.jpg" title="Horizontal scalability with load balancer for software scalability" alt="Horizontal scalability with load balancer for software scalability">

This is the part where [Docker](https://www.docker.com/) and [Kubernetes](https://kubernetes.io/) shine. You can package your workload into lightweight containers and Kubernetes can manage horizontal scaling, rolling deployment, etc for those containers. Docker has [changed the way we software engineers’ work](/blog/2018/11/4-ways-docker-changed-the-way-software-engineers-work-in-past-half-decade/) in the past years.

One takeaway here is Scaling RDBMS is hard. With things like sharding, it might be easier to Scale-up a relational database than try scaling out if you don’t know what you are doing. Amazon is an example here the same concepts can be applied to any major cloud vendor like Google Cloud or Azure. That leads me to my next point, the usage of NoSQL databases.

### Using NoSQL for high software scalability

In the above example, if your web store had 20 people on the website they can be served from a Relational database. For each request from every user, the application is hitting a relational database at this point which is slow but not crippling. Now imagine 120 users are on the website at the same time. It is very likely that the performance has degraded significantly and we can see some [connection to database](https://sysadminxpert.com/aws-rds-max-connections-limit/) issues popping up depending on the database provisioned.

#### NoSQL database for scalable software

This is where a NoSQL datastore is very handy. We can use a NoSQL memory key-value store like [Redis](https://redis.io/).

> Using an in-memory datastore like Redis to serve all the product details will drastically reduce the response times.

Another use can be for searching rather than running complex SQL query to find red t-shirt from Adidas of medium size we can use [Solr](https://lucene.apache.org/solr/) or [Elastic Search](https://www.elastic.co/) for blazing-fast faceted search. Solr is a NoSQL database with transaction support. This can help with software scalability and resilience.

Both Redis and Solr/Elastic search will need some data to be filled up in advance to function but they surely outweigh the benefits of not hitting a relational database on each client request.

> For each write request, it will need to reach the relational database.

For instance, every purchase by the customer must be stored in the relational database. In case of all the browsing, which should be 80-90% or more of the traffic we can use NoSQL databases for more software scalability.

#### Eventual consistency and CAP Theorem

NoSQL databases are fast because they take the tradeoff of [eventual consistency](https://twitter.com/mykola/status/1101337299525267457). I would really recommend you to refresh your knowledge about [CAP theorem](https://www.ibm.com/cloud/learn/cap-theorem#toc-what-is-th-DXABpEgu) -- Consistency, Availability and Partition tolerance to understand data storages better.

You can read more on how to scale from [1 to 11 million users](http://highscalability.com/blog/2016/1/11/a-beginners-guide-to-scaling-to-11-million-users-on-amazons.html) in this post on HighScalability. So a NoSQL database can work as an effective cache, which takes us to the next point of effective caching for software scalability.

### Caching to enable software scalability

As [Phil Carlton](https://martinfowler.com/bliki/TwoHardThings.html) has said

> There are only two hard things in Computer Science: cache invalidation and naming things.

Cache invalidation is also an interesting problem to encounter. You will need a cache at scale because the normal way without cache is not scalable anymore. For great software scalability caching on different levels plays a vital role. Below are some of the ways/levels you can exploit cache to achieve more scalable software.

#### Memoization

The first level of caching can be done on the code level. One of the basic ways of caching is [Memoization](https://lispcast.com/what-is-memoization/).

> Memoization is a higher-order function that caches another function. It can turn some slow functions into fast ones. It saves the result of a function call after the first time to the cache, so if you call the function again with the same arguments, it will find it in the cache.

You can have a look at a [Node.js Memoization](/blog/2020/11/nodejs-for-php-developers/#memoization-example) example where the server caches the response for 1 minute. Therefore, for 1 minute even if the data changes the client gets the same old data. You should read more about [javascript memoization](/blog/2021/02/javascript-memoization/).

#### HTTP Caching for scalable software

Another level of caching can be done on the HTTP layer. With good use of [HTTP headers](https://web.dev/http-cache/) responses can be cached for a desired amount of time. HTTP Caching can also be implemented with an application like [Cloudflare](https://support.cloudflare.com/hc/en-us/articles/202775670-Customizing-Cloudflare-s-cache) to set up rules to cache responses for minutes or hours to reduce the load on the servers. This type of caching mechanism helps us achieve a high level of software scalability.

If you have the capacity to manage a full-on HTTP cache and HTTP accelerator, [Varnish](https://varnish-cache.org/index.html) is a great option. Varnish claims:

> It typically speeds up delivery with a factor of 300 - 1000x, depending on your architecture.

With a 1 million + download of the [Varnish Docker image](https://hub.docker.com/_/varnish), I think people might have configured it well on [Kubernetes](https://dealancer.medium.com/creating-a-scalable-and-resilient-varnish-cluster-using-kubernetes-853f03ec9731) too for unmatched software scalability with great HTTP caching.

I am not sure if a [read replica](https://cloud.google.com/sql/docs/mysql/replication/create-replica#:~:text=A%20read%20replica%20is%20a,analytics%20traffic%20from%20the%20primary) is a pure [database caching](https://aws.amazon.com/caching/database-caching/) mechanism. But I am very sure that it helps in software scalability putting less pressure on the main database by running the read queries on the read replica. There are other ways to implement cache on an N-tier application. Depending on your architecture you might want to add a cache to speed up things as well as give a boost to software scalability.

## Conclusion

Software scalability is a difficult problem, what makes it even more complex is the context.

> What is a very high scale for a medium-size company may be of no concern to one of the [FAANG](https://en.wikipedia.org/wiki/Big_Tech) companies. It is about RPM/RPS your software systems handle every day.

I have not worked with systems that have 100K or millions of requests per second, I have only read about that scale. I have seen and worked with systems with 100s to sometimes 1000s of requests per second. Even at this volume software scalability is an interesting and challenging problem to meet high demands.