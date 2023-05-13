---
layout: post
title: How I run one of the world’s top 320K websites for free
date: 2022-07-22T22:39:45.000+11:00
comments: true
tags:
- Software Engineering
- Misc
cover: "/images/worlds-top-370k-website/01run-top-website-free-320.jpg"
pagetitle: How I run one of the world’s top 320K websites for free
description: Find out how I run one of the world's top 320K website for $0. Quick
  answer Cloudflare free plan, full details in the post.
keywords: run world's top website for free, top website free

---
Years back, being in the top 1 million websites worldwide was one of the goals for this blog when I saw that on Alexa.com. I am not sure when that milestone was hit, it looks like it was before [2019](https://web.archive.org/web/20190731210538/https://www.alexa.com/siteinfo/geshan.com.np) as per Web archive.

Ok, I have said it, this blog you are reading is one of the top 320K websites in the world as per [Similarweb](https://i.ibb.co/cFjBYXN/geshan-com-np-rank-jul-22.jpg). In this post, I will peel the layers on how I run this blog absolutely free. Yes, you heard it right, this “popular” blog 😊 runs for exactly $0 a month and has no recurring operating cost whatsoever. Let's get into the details!

<!-- more -->

<img class="center" loading="lazy" src="/images/worlds-top-370k-website/01run-top-website-free-320.jpg" title="Run one of the world's top 320K websites for free" alt="Run one of the world's top 320K websites for free">

## Table of contents

* [The main points](#the-main-points)
* [Cost for the domain name - free](#cost-for-the-domain-name---free)
* [Fees paid to host code - $0](#fees-paid-to-host-code---0)
* [JAM stack website - no servers no database](#jam-stack-website---no-servers-no-database)
  * [Browse offline with PWA](#browse-offline-with-pwa)
  * [Content editing](#content-editing)
* [All in on the Cloudflare free plan](#all-in-on-the-cloudflare-free-plan)
  * [Other Cloudflare services](#other-cloudflare-services)
* [Traffic increase turning point - SEO](#traffic-increase-turning-point---seo)
* [Top million site lists](#top-million-site-lists)
* [Conclusion](#conclusion)

## The main points

Below are the main points if you don’t want to read the long explanation in this blog post:

1. The domain for this blog `Geshan.com.np` was registered in Jan-2008 and has no recurring cost as all `*.*.np` domains are [free](https://register.com.np/terms-and-conditions) of cost.
2. This blog is a [JAM stack](/blog/2020/04/static-vs-dynamic-websites-jam-stack/#jam-stack-with-a-cms) -- essentially [static website](/blog/2020/04/static-vs-dynamic-websites-jam-stack/#static-website) generated with Eleventy and hosted on Cloudflare pages for exactly $0 a month. It used to be on GitHub pages for free and would cost nothing if hosted on Netlify too.
3. As this is primarily a static website (HTML, CSS, and some JavaScript - mostly vanilla), there is no database, no server, no image hosting, or S3 bucket equating to 0 recurring operational costs. On the flip side, this blog is a PWA where you can browse all/most of the content offline.
4. I am a Cloudflare fan (a bigger fan of their free plan) and exploit all the FREE services they provide like DNS, email mapping (which is in beta), SSL, caching, etc. Yes, you can email me at me@geshan.com.np :). As soon as they have a new setting or feature I go and turn it on for example [early hints](https://blog.cloudflare.com/early-hints/).
5. The code for my blog is fully open source and available on [GitHub](https://github.com/geshan/geshan.github.com) for which I pay $ 0 every year.
6. In terms of popularity, [Similarweb](https://www.similarweb.com/website/geshan.com.np) says my blog is in the world’s most popular 320K websites - in Mar-2023 at the time of writing this.
7. The main turning point for traffic was in Q4-2020 when I changed from writing about things I liked to topics people search for on Google. SEO and pull marketing work much better.

The primary takeaway here is:

> Don’t spend money on your side projects and be consistent in your writing frequency.

Another thing to consider while starting to blog is getting your own domain name, be it paid like a `.com` for $7 a year or a free one do it. I have seen bloggers claiming “millions” of page views on Medium, which is good but you don’t know when Medium makes changes in its policy or starts losing traffic.

Build your own corner on the internet, maybe get started with something like Hashnode.dev for free but always do it on your own domain name piecing together free services like Cloudflare and Hash node. Of course, you can keep posting to places like Medium, Hackernoon, and others by [cross posting](/blog/2019/12/repost-your-tech-blog/).

Let’s figure out what components are used to run this blog for $0 a month, nothing more and nothing less.

## Cost for the domain name - free

Let’s begin with the domain name. A domain name is one of the first things you will need to get your blog up and running. To the surprise of many people (me included), Nepal was way ahead of the curve and used to give `*.np` domains for free and Mercantile (the first ISP of Nepal) makes it free up till now. The best part is there is no renewal involved as long as you get it by providing them with your passport or citizenship as an individual.

> The main point here is, that my blog’s domain `Geshan.com.np` was registered in Jan-2008. I did not have to pay a rupee to get it registered and don’t pay anything now as well.

That's exactly 0 recurring costs for the domain. If you want to get a free domain you can try Freenom.com, you won’t get a `.com` or `net` but can utilize a `.ml` or `.gq`. Next up we will discuss code hosting.

## Fees paid to host code - $0

My blog is fully open source and currently generated with [Eleventy](https://www.11ty.dev/). You can see the source code on [Github](https://github.com/geshan/geshan.github.com). I moved my blog to Eleventy from Octorpress in [Apr-2020](https://github.com/geshan/geshan.github.com/pull/146) and it has been great to work with. The blog used to be on Blogspot from 2007-2014 and then on Octopress from 2014-2020.

> From the cost viewpoint, this blog’s code is open and hosted on GitHub for which I pay $0/month.

Making it open source is my choice, I can make it closed source and still get the job done. But I want to contribute back to the community by making it open source. People new to Eleventy can see the changes and features on my blog and use it if they want. If you want to host your Node.js application, you can do it for for not cost with [free Node.js hosting](/blog/2021/01/free-nodejs-hosting/) services. Consequently, I will unravel if the blog uses and server or database.

## JAM stack website - no servers no database

This blog is essentially a collection of HTML, CSS and some vanilla JavaScript with a dash of [JAM stack](/blog/2020/04/static-vs-dynamic-websites-jam-stack/#jam-stack-with-a-cms) magic. I used to get the popular posts from my Google Analytics on build time which is updated every day. I have to place that back again. The comments are outsourced to Disqus free plan.

> Given this blog is primarily a [static website](/blog/2020/04/static-vs-dynamic-websites-jam-stack/#static-website) there are no servers or databases to manage or host, meaning it is all free for me.

This has many advantages like the website can be hosted on CDN which makes it super fast. It is virtually unhackable, by that I mean the code is open and there is no database so no SQL injection or any other vulnerability. Another great advantage is the ability to read this blog offline with Progressive Web Application (PWA).

### Browse offline with PWA

This blog is a [Progressive Web App](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) (PWA). I don’t make much noise about it or push it to the users but you can install this blog as an app with Chrome and view the whole website (almost all) fully offline. On any Chrome (desktop or mobile) click options (those three dots) and click “Install app”. Then enjoy this blog fully offline even when there is no internet.

Another way to do it will be to browse the blog for some time like a couple of minutes, turn off the wi-fi/mobile data and continue browsing. Most of the pages and blogs will work as normal with images. That is the power of PWA, I can work on making it a full-on mobile app and submit it to app stores but I have not felt the need to do it till now.

### Content editing

Even though the website is static changing it is pretty easy. In case I need to fix a typo or make a small change, I use [Forestry’s](https://forestry.io/) free plan to do it from the browser. It can also be done with [Netlify CMS](https://www.netlifycms.org/).

In the next section, we will understand how I host this JAM stack website.

## All in on the Cloudflare free plan

This blog leverages most of the Cloudflare “free” plan services to give you the reader a fast and performant experience. I moved the blog’s hosting from GitHub pages to [Cloudflare pages](https://pages.cloudflare.com/) in [Nov-2021](https://github.com/geshan/geshan.github.com/pull/303). The reason was simple Cloudflare pages has great performance on its [vast global network](https://www.cloudflare.com/en-gb/network/), the bandwidth is unlimited and the build times are also generous. With the [wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) things are very easy if I need to manage anything. My blog gets readers from almost every country in the world so using Cloudflare helps to get them the content faster from the Edge.

### Other Cloudflare services

I use other Cloudflare services too like the DNS for this website is managed with it. I even use the custom email addresses, HTTP2, free SSL, firewall and security, and amazing caching provided by Cloudflare to name some.

<img class="center" loading="lazy" src="/images/worlds-top-370k-website/02cloudflare.jpg" title="Running Geshan.com.np with and on Cloudflare pages" alt="Running Geshan.com.np with and on Cloudflare pages">

I also check some of the analytics provided by Cloudflare but my main source of stats is Google Analytics. I have not felt the need to use Cloudflare workers but I have dabbled a bit with the Pages functions, especially the [geolocation](https://developers.cloudflare.com/workers/examples/geolocation-hello-world/) part.

> To sum up, this blog is hosted on Cloudflare pages with unlimited bandwidth. It uses Cloudflare to manage DNS, caching, SSL and security. All that for exactly $0 a month.

I would really like to thank Cloudflare for providing such world-class services absolutely free of cost. I even dabble around with the beta things they release like [early hints](https://blog.cloudflare.com/early-hints/), I saw the button and clicked it :).
In the subsequent section, you will learn how I increase the traffic 4x between 2019 and 2021 and even more in 2022.

## Traffic increase turning point - SEO

I wrote 1 blog post a month in 2019, totaling 14 blog posts. Let’s say the page views were 100 for 2019, with 25 blog posts the page views were 400 in 2021. What changed?

> I used to write for what I wanted earlier, then I started to write for what people searched for and what I wanted.

This doesn't mean I only write SEO-focused posts. But now I do like a rough 80:20 rule, with 20% of what I want to write without SEO focus stuff. Visually it would look like the below:

<img class="center" loading="lazy" src="/images/worlds-top-370k-website/05seo.jpg" title="What people search for and what I want to write about" alt="What people search for and what I want to write about">

That was the difference between [push and pull marketing](https://blog.hubspot.com/marketing/push-vs-pull-marketing) where now my blog posts appear more when people were searching for a certain topic. As you may know:

> The best place to hide a dead body is page 2 of Google search results. - [source](https://www.insivia.com/quoter/the-best-place-to-hidea-dead-body-is-page-2-of-google-search-results/)

So, learning and doing Search Engine Optimization (SEO) to target keywords that will actually land on the first page of Google or even the top 3 results is a lot of analysis and hit and trial. For this, I used Ahrefs mainly and their free course by Sam Oh on [SEO for beginners](https://ahrefs.com/academy/seo-training-course) is a gem. Let’s compare an SEO-focused blog post vs “what I want to write for” type blog post’s lifetime page views.

Both of them have almost similar total pageviews for their lifetime, first one is a “what I want to write for” type blog post that actually hit the first page on HackerNews in 2017 - [Software Companies Tech Competency Matrix](/blog/2017/06/software-companies-tech-competency-matrix/). Below is the page views from the time of writing to now.

<img class="center" loading="lazy" src="/images/worlds-top-370k-website/03tech-matrix-post.jpg" title="Page views for Tech company matrix post" alt="Page views for Tech company matrix post">

As you can see there was a massive spike when the post reached the first page of hacker news. Then the big drop and it never got any more traction. Most of my blog posts before Q4 of 2020 had a similar fate.

There was an initial bump in views due to social media shares and some push marketing and on 2-3 days the page views fall flat. Now, let's look at a page with a lot of SEO focus and research that actually landed on the first page of Google search results for some keywords:

<img class="center" loading="lazy" src="/images/worlds-top-370k-website/04nodejs-postgres-post.jpg" title="Page views for Nodejs postgresql blog post" alt="Page views for Nodejs postgresql blog post">

Even here there is the initial high of page views and then it falls off. The good part here is for more than one year now this post gets consistent views each day. Why? Because it ranks on the first page of Google search results for some keywords.

> This is the switch that made my blog's traffic increase 5x in 3 years where now \~85% of the traffic comes from Search engines, mainly Google.

Let's look at how being on the top million website lists helps in the next section.

## Top million site lists

There are multiple sources that list the top 1 million websites in the world. There is the [majestic million](https://majestic.com/reports/majestic-million) list, [Tranco](https://tranco-list.eu/) list, and [Cisco Umbrella top 1 million](http://s3-us-west-1.amazonaws.com/umbrella-static/index.html) list to name some. This blog ranks on almost all of these and at multiple places. Among the lists which one is the most reliable is a [debatable](https://www.domaintools.com/resources/blog/mirror-mirror-on-the-wall-whos-the-fairest-website-of-them-all) discussion.

At the time of writing, on the Majestic million, this blog ranks at 892K. On the [Tranco list](https://tranco-list.eu/api/ranks/domain/geshan.com.np), it ranks at 485K[,](https://tranco-list.eu/api/ranks/domain/geshan.com.np) and Similar web ranks this blog as one of the world’s top 320K websites. There used to be a [top million](https://web.archive.org/web/20220501054146/https://www.alexa.com/topsites) list from Alexa but Alexa is closing down now. This domain also ranks at 122k on Domcop’s top [10 million websites](https://www.domcop.com/top-10-million-websites).

> The average of the above 4 numbers will be 457.25K, so if the title is a bit misleading be it :).

As per Siteefy, there are [200 million active websites](https://siteefy.com/how-many-websites-are-there/) in the world out of the 1.17 billion domains registered.

> Therefore being anywhere in the top 1 million websites, takes the website in the elite 0.5% of the world’s active websites.

It is surely not a small feat, especially for a one-person blog. I will not be giving out exact numbers, if you want you can check [SimilarWeb’s free analysis](https://www.similarweb.com/website/geshan.com.np/) for this website or do a bit more research on the SEO tool of your choice which will guess the numbers for you.

## Conclusion

You have found out how this blog runs for $0 a month with primarily a static website hosted on Cloudflare pages. The code is open source on GitHub and there are no servers or databases to power this website it is sent to your browser from the Edge with Cloudflare's massive global network.

You also learned that SEO and pull marketing works much better to get sustainable traffic to the website or single post. There are multiple top million website lists available and all of them differ in how they measure traffic and popularity. If you want to get good traffic to your blog or website first write great posts and then do the marketing then the other way round. Best of luck!