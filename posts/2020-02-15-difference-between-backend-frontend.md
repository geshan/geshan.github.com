---
layout: post
title: Difference between backend, frontend, full-stack and super stack development
date: 2020-02-15T16:37:59.000+00:00
comments: true
tags:
- Software Engineering
cover: "/images/backend-vs-frontend/01person-screens.jpg"
pagetitle: Backend vs Frontend vs Full-stack vs Super Stack development
description: Frontend is HTML+CSS and Javascript, backend has one backend language
  and database. Full stack is both, then what is Super stack development? Read more
  here.
keywords: backend, frontend, backend vs frontend, frontend vs backend, full stack,
  full stack development, super stack, super stack development

---
I looked at archive.org and found a website I put live in 2001, which means I have been writing some code for 20 years. Of course, I am not going to give a link to that website still it will be safe to mention 20 years back in Kathmandu when people didn’t have an email I had built websites. I uploaded it over a 33.8k modem with a dial-up connection. Kids these days will not even know the sound of that modem (yes I am old).

Coming back to the topic, this is an “oversimplified” guide to showing the difference between backend, frontend, full-stack, and (in my own terms) super stack development of course, with a web development focus. Let’s get started.

<!-- more -->

<img class="center" loading="lazy" src="/images/backend-vs-frontend/01person-screens.jpg" title="Backend vs Frontend vs Full-stack vs Super Stack development" alt="Difference between backend, frontend, full-stack and super stack development">

## Introduction

Software engineering is a hot topic these days and hearing random people like a [minister](https://thehill.com/changing-america/enrichment/education/476391-biden-tells-coal-miners-to-learn-to-code) urging people to learn to code is amusing at times. They make it look as if learning to code is easy and getting a high paid job after you know how to code is a piece of cake. Simple common sense, it is not. 

Anyways, the most common things software engineers build are websites and web applications. This post highlight the paths you can take in the web development aspect of software engineering.

## Oversimplification

Yes, there is going to be a lot of oversimplification for this blog post. If I go into a lot of detail it will confuse many people and I want this piece to be beginner-friendly. So to start with below is my understanding of backend, frontend, full-stack, and super stack development:

<img class="center" loading="lazy" src="/images/backend-vs-frontend/02backend-frontend.jpg" title="Backend, Frontend, Full-stack, and Super Stack oversimplified" alt="Backend, Frontend, Full-stack, and Super Stack oversimplified">

From the above image, it is pretty clear, blue thing (light and dark both) are frontend, green (+ some yellow the DB) is backend stuff. Orange is representing full stack and the bottom yellow line indicates super stack development. Let’s go into more details for each of them below:

## All ends and non-ends

It is clear that this is a comparison between ends and non-ends, backEND, frontEnd, full-stack, and super stack. A quick distinction is what you see rendered on the web browser is usually frontend, the languages that talks to the datastore are mostly backend. If the software work consists of both backend and frontend it can be termed full-stack. So what is the super stack work, read on...

Rather than segmenting yourself as a backend or frontend developer, let’s look at it from the work point of view. Generally, as software engineers, we are solution providers so sometimes doing some work that is not your specialty would be good. It is in our best interest to develop [T-shaped skills](https://en.wikipedia.org/wiki/T-shaped_skills). Let’s jump to an overview of the types of development work.

I would recommend having a look at this popular [roadmap](https://github.com/kamranahmedse/developer-roadmap) for technologies you might want to be aware of to become a proficient frontend, backend, or DevOps engineer.

> I will write only points for each of the web development work categories and keep it high level. Let’s zoom in.

### Backend development

Some of my observations about backend development:

* Backend development work will involve working with at least one backend language like [PHP](https://www.php.net/), [NodeJs](https://nodejs.org/en/), [Ruby](https://www.ruby-lang.org/en/), [Python](https://www.python.org/), [Java](https://www.java.com/en/), etc which can communicate with a database/datastore.
* Backend software development work will encompass designing Relational databases which is generally represented as [Entity-Relationship (ER) diagrams](https://www.lucidchart.com/pages/er-diagrams).
* Backend work will require the software engineer/developer to understand more complex concepts of the database like concurrency, [locking](https://www.methodsandtools.com/archive/archive.php?id=83), and [transactions](https://vladmihalcea.com/a-beginners-guide-to-acid-and-database-transactions/).
* Of course, to do backend development knowledge of [SQL](https://www.khanacademy.org/computing/computer-programming/sql) will be indispensable.
  * Similarly, the work will involve setting up and/or configuring a Relational DBMS like [Mysql](https://www.mysql.com/), [Postgres](https://www.postgresql.org/), [SQL Server](https://www.microsoft.com/en-in/sql-server/), [Oracle](https://www.oracle.com/database/), etc.
* To do backend development work well knowledge of network, DNS, etc will also be very helpful. So, if you're looking to [hire backend developers](https://flexiple.com/backend/#hiring-guide), make sure they have good knowledge of this.
* Depending on the work, it will involve creating APIs for other consumers like a mobile application or a frontend application. Work might include building [RESTful](https://www.mulesoft.com/resources/api/what-is-rest-api-design) API or [GraphQL](https://graphql.org/). Peeking into [gRPC](https://grpc.io/) will be beneficial too.

There are many things I am skipping here like knowledge of data structure and algorithms, HTTP, operating system knowledge, NoSQL database, Message Brokers, etc but that is intentional as this is an oversimplified high-level summary.

### Frontend development

The following are my views on Frontend development:

* Frontend development work encompasses the ability to change how things look (maybe not designing it as it will fall under [UI/UX](https://careerfoundry.com/en/blog/ux-design/the-difference-between-ux-and-ui-design-a-laymans-guide/) work), thereby includes colors, buttons, margins, etc. This will be mostly [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) work.
* Frontend work with fewer doubts includes wrangling [HTML](https://www.w3schools.com/html/). HTML might look simple, still knowledge of the latest version and [HTML 5 tags](https://www.htmlgoodies.com/tutorials/html5/new-tags-in-html5.html) like the header, the footer will help. Knowing [meta tags](https://www.w3schools.com/tags/tag_meta.asp) like [viewport](https://www.w3schools.com/css/css_rwd_viewport.asp) will also be great.
* Frontend task these days will surely involve some form of [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and include working with frameworks/libraries like [Angular](https://angularjs.org/), [React](https://reactjs.org/), or [Vue](https://vuejs.org/).
  * To do some meaningful frontend work you will need to understand [js package management](https://www.freecodecamp.org/news/javascript-package-managers-101-9afd926add0a/), module bundlers like [webpack](https://webpack.js.org/), and go through some [Javascript fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4) too, best of [luck](https://lucasfcosta.com/2017/07/17/The-Ultimate-Guide-to-JavaScript-Fatigue.html) :).
* After you survive the fatigue, Frontend work will entail consuming APIs (mainly REST APIs).
* Frontend work in current times might involve learning some [Typescript](https://www.typescriptlang.org/), mash up some [Progressive Web Apps (PWA)](https://web.dev/progressive-web-apps/), and things along these lines.

I have skipped [static site generators](https://www.staticgen.com/), [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), [JAM stack](https://jamstack.org/), and many other things.

> Generally, I have witnessed cross-functional teams have more backend work than frontend work. It also translates to having more backend engineers than frontend ones in a team.

I would consider Mobile App development as a special category of Frontend development, that might be a discussion for another blog post.

### Full-stack development

Following is my understanding of [full-stack development](https://skillcrush.com/blog/front-end-back-end-full-stack/) work:

* Full-stack development is a mix of both backend and frontend development work. That mix is not all things in the backend + all things in frontend. It's a selective mix depending on the task.
* A task will qualify as a full-stack work when it involves things like adding a field to a database table, writing backend code, and changing frontend form and logic to deliver this new feature.
* Being able to execute a full-stack task means knowing both sides of the stack to the point that it can be carried out. It will be great to consult more experienced team members to see if anything can be improved.

The term "full-stack developer" seems over demanding to me, I have met a couple of people who are real [full-stack developers](https://youteam.io/blog/full-stack-software-developer-hiring/), they are [mythical](https://stackoverflow.blog/2019/10/17/imho-the-mythical-fullstack-engineer/). Still, most of the software engineers I know "can" do full-stack tasks but identify themselves more as a backend or frontend engineer.

> Learning Javascript very well can give you an edge when doing full-stack work. Javascript is the only language that can be used both on the backend (NodeJs) and frontend (with segmentation on the framework side).

Typescript is [exploding in popularity](https://redmonk.com/jgovernor/2019/05/07/typescriptexploding/) which can be used in both backend and frontend. If you are looking to hire full-stack developers follow this [full-stack hiring guide](https://www.toptal.com/full-stack#hiring-guide) by Toptal. You can also try [Full-stack development bootcamp](https://www.odinschool.com/full-stack-software-development-bootcamp) too.

### Super stack development

Let's unfold my views about the "super stack" development work:

* Super stack development work involves not only developing the feature/app (which is full-stack ish) on your (the developers') machine but deploying it and making it accessible and [scalable](/blog/2020/12/software-scalability/).
* This type of work encompasses knowing about the servers, cloud these days, and venturing into the [DevOps](https://www.atlassian.com/devops)/[SRE](https://landing.google.com/sre/) land.
* Super stack work also includes thinking about security, employing your knowledge of things like the [OWASP top 10](https://owasp.org/www-project-top-ten/), and writing secure code.

Super stack development work focuses on real end to end delivery of the task or project. It might encompass creating and updating a CI/CD pipeline to help everyone in the team. It can also include setting up servers or [Kubernetes](https://kubernetes.io/) pods dependent on where and how the company you work for deploys its web applications.

## Conclusion

Some skills will be needed to do all kinds of the above-mentioned work like using [Git](/blog/2014/07/4-git-tips-beyond-basics/), automated testing with the [unit](/blog/2016/03/there-are-only-two-types-of-automated-software-tests/) and other tests, doing meaningful [code reviews](/blog/2019/12/how-to-get-your-pull-request-pr-merged-quickly/), using [Docker in past 5 years](/blog/2018/11/4-ways-docker-changed-the-way-software-engineers-work-in-past-half-decade/).

This post is not about backend, frontend, full-stack, and super stack "developer", it's about the development work and skills a software engineer would need to carry out that task.

> Rather than saying I am x-end or y-stack, as software engineers if we strive to add more value to the business without overstepping responsibilities, everyone wins including our customers.
