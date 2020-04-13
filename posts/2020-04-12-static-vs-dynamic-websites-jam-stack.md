---
layout: post
title: Static vs dynamic website with JAM stack website in between
date: 2020-04-12T21:35:47.000+00:00
comments: true
tags:
- Web Development
cover: "/images/static-vs-dynamic-website/01static-vs-dynamic-vs-jam-stack.jpg"
pagetitle: Static vs dynamic website, JAM stack in between [has tech and cost considerations]
description: This post explains the main differences between Static, dynamic and JAM
  stack websites. It also covers the technical and cost aspects of all 3 options.
keywords: static vs dynamic website, difference between static and dynamic web page,
  jamstack, jam stack,dynamic vs static website, static site generators

---
The web has been around for a while now. I have been building websites for 20 years now and I started by building static websites. Later I worked on many dynamic websites and web applications. This post is a quick rundown on the major difference between dynamic and static websites. There are some details about the JAM (Javascript API and Markup) stack. It also has some explanation of the technologies and costs associated with each of the 3 options.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/static-vs-dynamic-website/01static-vs-dynamic-vs-jam-stack.jpg" title="Static vs dynamic website, JAM stack in between with tech and cost considerations" alt="Static vs dynamic website, JAM stack in between with tech and cost considerations">

## Prerequisites

This blog post is written for a reader who knows the following:

* Basic knowledge of HTML and CSS is expected
* Knowledge of any backend language would be great.
* General know-how of how a website and DNS works would be beneficial.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/static-vs-dynamic-website/02static-vs-dynamic-vs-jam-stack.jpg" title="HTML Code" alt="HTML Code - at the end all website are HTML, CSS and JS :)">

## Dynamic Website

On a dynamic website, the webserver responds with a web page content generated dynamically on each request tailored for the user. From a content editor's point of view, adding and editing content is easy and does not require more technical knowledge like knowing HTML for instance.

> Website content can be added or changed in a matter of seconds without a need of another additional process.

This is possible as the data is usually pulled in from a datastore like a relational database. Facebook is a typical example of a dynamic website where content displayed depends on who is logged in and the content shared by the logged-in user's friends.

### Technical aspects of dynamic website

Dynamic websites from a technical standpoint require more than just HTML and CSS. There would be some backend language needed to fetch the content on the fly from a datastore. Some popular backend languages are PHP, Python, Ruby. Dynamic websites are generally powered by a Content Management System (CMS). Some [popular](https://trends.builtwith.com/cms) open-source CMSes include [Drupal](https://www.drupal.org/), [WordPress](https://wordpress.org/) (Claims to power [36%](https://wordpress.com/) of the web) and [Joomla](https://www.joomla.org/) if you want to get started with one.

### Cost for running a dynamic website

A dynamic website will cost more money upfront to be built. It will also entail a larger recurring running cost for the database, web space, web server and other things you choose to include for your dynamic website. Recurring costs for running a dynamic website can range from 5 to thousands of dollars a month depending on the traffic and resources used to run the website. For example, a small Dynamic website can be hosted on a digital ocean droplet for $5 a month.

## Static website

For a static website, the webserver responds with the same fixed content for every request regardless of the user. From a content editor's point of view, adding and editing content is not easy and requires more technical knowledge like knowing HTML and CSS. Data is pulled in only from static flat HTML  files.

> Adding or editing website content will take longer than Dynamic websites. It will involve a "deployment" process for each change for a pure static website.

The first [CERN](http://info.cern.ch/hypertext/WWW/TheProject.html) website is static.

### Technical aspects of a static website

Static websites from a technical point of view are just a collection of HTML and CSS files. It may have some client-side JavaScript. There would be no backend language or an external data store. For a purely static website a full-blown database dependent, CMS is also not in the scope. There are [Static Site Generators](https://www.staticgen.com/) that can help manage the content still deployment and Git is something technical to learn. The main advantages of a static website would be speed, security, and scalability.

### Cost for running a static website

A static website would cost less to build than a dynamic website. Updating content on a purely static website would be a difficult task. As a static website would only require webspace, the monthly running cost would be low and potentially free depending on where it is hosted. For example, a small static website can be hosted on [Reclaim hosting](https://reclaimhosting.com/shared-hosting/) for \~$2.5 a month.

## JAM stack with a CMS

On one hand, the static website seems to be simple but they are restrictive and require technical knowledge. On the other, a dynamic website needs more effort and resources upfront, it also has a higher technical complexity and running cost. So where is the balance? Enter JAM stack and Static Site Generators (SSG) with a Content Management System (CMS). Static site generators have been there for a while. Jekyll one of the popular static site generators was released in [2008](https://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html). A static site [generator](https://www.staticgen.com/) would use templates to sew up the static web pages with a build process.

> With a JAM stack website proprely configured with a [headless CMS](https://www.sanity.io/blog/headless-cms-explained), adding or editing content would be easy and relatively fast.

[Take shape](https://www.takeshape.io/) (taken from JAMStack.org [examples](https://jamstack.org/examples/)) is a JAM Stack website example, hosted on Amazon S3.

### JAM stack ingredients

JAM stack term was coined by Mathias Biilman, the co-founder and CEO of Netlify, the official [JAMstack](https://jamstack.org/) website defines the term as “a modern web development architecture based on client-side JavaScript (J), reusable APIs (A) and prebuilt Markup (M).” The idea is to have static HTML with Javascript that talks to APIs where the markup is prebuilt. The main focus is not to provision any server and host the website on a CDN or similar providers like Netlify, GitHub pages and so on. This [timeline](https://jamstack.wtf/#timeline) shows a brief history of JAM stack's growth and popularity.

> JAM stack with a static site generator, a headless CMS, custom functions and forms can help create a dynamically static website.

### Technical aspects of a JAM stack website

JAM stack websites from a technical side are still a collection of HTML and CSS files. It will have some client-side JavaScript to talk with external APIs. There would be no backend language or external database for the website but it will communicate with other API to get and store data.

> The main advantages of a JAM stack website would be ease of editing, speed, security, scalability and better developer experience.

### Cost for running a JAM stack website

A JAM stack website could cost less to build than a dynamic website. Updating content on a JAM configured properly with a headless CMS would be a simple task. As a static website would not generally require a dedicated database, the monthly running cost would be higher than a static website but lower than a dynamic one.

With an array of new offerings and SAAS, a JAM stack website can be running potentially free too. For example, a JAM website can be hosted on [Netlify](https://www.netlify.com/) with [Forestry](https://forestry.io/) as a CMS for no monthly cost but with limits. You can also explore [Stackbit](https://www.stackbit.com/) to put it all together and get a website working with just clicks.

## Summary

Let's summarize the key difference of Dynamic, Static and JAM Stack website below:

| Criteria                                                          | Dynamic Website | Static Website                                                                 | JAM Stack website                           |
|-------------------------------------------------------------------|:---------------:|--------------------------------------------------------------------------------|---------------------------------------------|
| *Needs a web server?*                                             |  Definitely Yes | Generally Yes                                                                  | No (it is outsourced)                       |
| *Uses a backend language?*                                        | Definitely Yes  | No                                                                             | No                                          |
| *Needs a database server?*                                        | Definitely Yes  | No                                                                             | No                                          |
| *Is served with Static Flat files/ Uses a static site generator?* | No              | Yes                                                                            | Yes                                         |
| *Easy and fast to add or edit content?*                           | Yes             | No                                                                             | Yes (if configured with a CMS)              |
| *Talks to other APIs?*                                            | May do it       | Generally No                                                                   | Generally Yes                               |
| *General monthly Running Cost*                                    | $5 - More       | $[2.5](https://reclaimhosting.com/shared-hosting/) - More (depending on usage) | $0 - More (depending on SAAS subscriptions) |

## Conclusion

Selecting between a dynamic, pure static or a Static Site Generator (SSG) compiled JAM stack will depend on what you want to build, knowing their differences will certainly help.

> If you are building a small personal blog go with a JAM stack website, if you want to build a full on e-commerce website probably a dynamic website is your best bet. A pure Static web would be advisable for something that is “build and forget”, or needs changes like once a quarter.
