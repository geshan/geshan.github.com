---
layout: post
title: 101 software engineering realities you must be aware of (especially as a junior engineer)
date: 2022-09-09T23:27:32.000+11:00
comments: true
tags:
- Software Engineering
cover: "/images/software-engineering-realities/01software-engineering-realities.jpg"
pagetitle: 101 software engineering realities you must be aware of (especially as a junior engineer)
description: 101 things I have learned since 2007 about software engineering and web development from languges to testing and DevOps.
keywords: software engineering realities

---
I have been writing code in some form for more than 20 years now. I have been a software engineer by trade since 2007. Repeatedly, I find myself discussing the same points with multiple people interested in software engineering and web development, mostly junior engineers. So, in this post, I am going to list 101 software engineering realities (experiences moreover) that you can read and possibly learn from, here it goes.

<!-- more -->

<img class="center" loading="lazy" src="/images/software-engineering-realities/01software-engineering-realities.jpg" title="101 software engineering realities" alt="101 software engineering realities">

## Table of contents

* [Before the important points](#before-the-important-points)
* [Solution and value](#solution-and-value)
* [General things](#general-things)
* [Languages and frameworks](#languages-and-frameworks)
* [Navigating new codebases](#navigating-new-codebases)
* [Databases](#databases)
* [Testing](#testing)
* [Software Deployment/Release](#software-deploymentrelease)
* [DevOps/SRE](#devopssre)
* [Side projects](#side-projects)
* [Misc](#misc)

## Before the important points

I wanted to share this for a while now and it is also inspired by this [Reddit post](https://www.reddit.com/r/ExperiencedDevs/comments/nmodyl/drunk_post_things_ive_learned_as_a_sr_engineer/) written by a Sr. Engineer at a Drunk state. Below are my experiences and point of view in no particular order and categorized as best I could. These are realities for me and you are surely allowed to differ. We can agree to disagree :)

## Solution and value

1. A software engineer is a solution provider not only someone who writes code or helps to get code written.
1. Code is one of the ways to reach a solution, not the only way.
1. Solutions have value, mainly in terms of money earned or money saved. So the software you write is a path to saving money or earning more money for the business.
1. The end users don’t care if you are using Ruby/Node.js/Python/PHP in the backend and React/Vue/Angular/Svelte in the frontend — as long as they can do their job without waiting long it is all good and the company you work for/own makes money.

## General things

1. It is much easier to explain difficult software and engineering concepts using analogies. For example, Multiple inheritance/Polymorphism: Horse + Bird = pegasus, Docker: physical shipping containers analogy, etc.
1. The best answer to most of the tech questions is “it depends”, it depends on context, budget, resources, load, etc.
1. Writing readable and simple code is most of the time harder than writing that one-line clever magic code, it is the great gift of easy maintenance you give another engineer who reads that code or your future self.
1. Deleted code is debugged code. – The best code is the code never written. Less is more.
1. Write code that is easy to delete, [not easy to extend](https://programmingisterrible.com/post/139222674273/how-to-write-disposable-code-in-large-systems).
1. Premature optimization is the [root of all evil](https://effectiviology.com/premature-optimization/).
1. In most cases, software development and delivery will always take longer than estimated.
1. Don’t follow buzz (twitter) driven development, keep it boring and certain. For a 1000s or millions dollar business, [choose boring technology](https://boringtechnology.club/) a.k.a [boring stack](https://flaviocopes.com/boring-stack/) – keep the shiny new things for your side projects.
1. When coding something in addition to the patterns and concepts you know (like SOLID, Law of Demeter, and others) also think of the request per minute/second the code and data store is expected to handle.
1. [First, solve the problem. Then, write the code.](/blog/2018/12/the-most-important-tip-for-beginner-software-engineers-is/) - John Johnson
1. Do some [pair programming](https://geshan.com.np/blog/2020/06/pair-programming-benefits-for-your-team/) even with someone junior to you, one thing is guaranteed both of you will learn something new.
1. Get the code working first, then think about optimization, [software resilience](/blog/2020/12/software-resilience/), and [scalability](/blog/2020/12/software-scalability/). – a.k.a - Make it work, make it right, make it fast. On that order. - Kent Beck
1. One of the most important things as a software engineer is to do the smallest possible increment. Even the biggest projects were set up initially, line by line, file by file those became huge with time.
1. Making sure the code you wrote as a software engineer works in Production is your responsibility, don't throw it over the wall.
1. Knowing where to stop a task (not let the task become a scope creep) and [divide it into smaller parts](/blog/2015/07/how-to-split-a-new-feature-into-independent-parts-before-coding-it/) is important. Basically don’t do [yak shaving](https://seths.blog/2005/03/dont_shave_that/).
1. Think about most Edge cases, document them but implement optimally only after consulting the product owner/product manager. Solving a bug that might happen for 0.01% of the users might not be a priority.
1. Always be data-driven and not follow Highest Paid Person’s Opinion ([HiPPO](https://www.techtarget.com/whatis/definition/HiPPOs-highest-paid-persons-opinions)) method because "data has a better idea".
1. Focus a bit on personal branding, it is much easier to stand out as a techie as most tech people don’t blog and/or are hyperactive on social media.
1. Coding is read-heavy, probably there is an 80-20 [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle) with 80% reading code and 20% writing code. You read other engineers’ code and your code too before you even add or change a single line of code.
1. Code reviews will help you grow a lot, even though initially you might think it is a bit painful. It will clearly show you the mirror.
1. Layering your task into multiple [smaller Pull Reqeusts](https://geshan.com.np/blog/2020/10/small-pull-requests/) (merge requests) is an art you should learn sooner than later. It helps with better code reviews for the reviewer and your [PRs getting merged faster](/blog/2019/12/how-to-get-your-pull-request-pr-merged-quickly/).
1. Social media is a huge and toxic time suck, try a [social media break](/blog/2020/11/how-to-take-social-media-break/). Coming from someone who has been on a social media break for 2 years (LinkedIn excluded).
1. Track your time [automatically](https://www.rescuetime.com/ref/631000) -- If you can’t measure it you can’t improve it.- Peter Ducker. You can get back lost money but you cannot get back lost time.
1. Do not have negative feelings about any legacy (X+ years old) code bases, they were right for their time when it was created. Maybe the teams/company did not invest in upgrading them due to valid reasons you don’t know about.
1. Don’t trust the user - always validate the input.
1. “Be conservative in what you do, be liberal in what you accept from others.” - [Robustness principle](https://en.wikipedia.org/wiki/Robustness_principle) – Postel's Law. Think of how it would apply to the APIs you design and implement for instance.
1. Security is everyone’s job and a difficult one. As software engineers, it is best to learn about [OWASP top 10](https://owasp.org/www-project-top-ten/) at least and write code to minimize or mitigate them.
1. [WebAssembly](https://webassembly.org/) seems to be the next important thing in web development. It would be good to fiddle around with it – me included.
1. Working in [a product company is different than working in a web agency](blog/2013/06/working-for-dev-shop-with-projects-vs/). 
1. Even in a product company, [working on internal products is not like working on a customer-facing product](/blog/2020/09/software-engineer-on-internal-product-vs-customer-facing-applications-/).
1. Similarly, you will need a [different mindset](/blog/2021/11/software-engineer-mindset/) when working on a stable product on the critical path used by most of the customers vs a completely new feature not used by customers till now.
1. A [static website (not even JAMstack)](blog/2020/04/static-vs-dynamic-websites-jam-stack/) will beat the best web server-powered dynamic website in performance every single day. Go Web 1.0 where you should – for example, a brochure website, it surely does not need WordPress for that 1 “contact us” form.
1. [Full-stack software engineer is a myth](/blog/2020/02/difference-between-backend-frontend/), yes I said it. In the past 15 years possibly I have found a couple of engineers who are truly (almost) full stack. It is basically a backend engineer who can do some frontend or a frontend engineer who can do some backend work.
1. Generally, there are two types of software engineers, the creators: who will create the “next” web framework (which might be used by 100s of people). The users: who will never make the “next” web framework but will use one of the “popular” ones and add business value. Which one are you and which one you want to be is fully your call.
1. Build the right thing and build the thing right [go hand in hand](https://www.stevesmith.tech/blog/build-the-right-thing-and-build-the-thing-right/), but build the right thing first :D.
1. A successful organization aiming to run for a long time should not rely on one person. Do the hypothetical “what if the person is hit by a bus?” test, and find other people who can do it. At least this “important” person can go on a proper vacation.
1. Learn to take a break if you are stuck in a programming problem for more than 15 mins. Take a walk come back and most of the time you will see the solution, it is magic.
1. Debugging is at times the art of eliminating possibilities. Something it has nothing to do with code and one of the load balancers is not behaving correctly or one node is down. Think outside of the code and try to understand the system as a whole.
1. Most software has a defined life, things you and I write would need to be rewritten in 5-10 years. Still, I have seen software forced to run on life support systems :). It is more like they will not die than they will run very well. This happens much more often than you think and wish.
1. As a junior or even a mid-level software engineer with 2-3 years of experience, it is perfectly fine to not know things, for instance, Docker. Don’t stress about it, good companies hire language and tech agnostic people for their potential not what they already know.
1. You can be a software engineer with 5 years of work experience but the things you did in the first year carried on of the next four. Or you can be a software engineer with just 3 years of experinece going from a company doing 100s of requests per day to 1000s of requests per hour in 3 years. Choose your own destiny.


## Languages and frameworks

1. Languages and frameworks have a popularity cycle like the Bayesian curve. What is super popular now may not be popular 5 or 10 years down the line. Look at PHP, Jquery, and Angular for instance. No one can guarantee React will be as popular as now in 5 years.
1. Never be religious about a particular language or framework. Don’t be an X language or Y framework engineer, be a software engineer focused on providing a solution that generates value (money).
1. Be strong in the basics, they will weather any language or framework popularly contest.
1. Learn some fundamental things that will be useful as soon as you need to write any code like Git, how to use the command line (bash), SSH, some SQL, Docker (these days), and these kinds of things that span across the stacks and paradigms.
1. Learn about the newer standard like [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) etc. These things are the common factors in this super diverged web tooling landscape.
1. Within boundaries, do not hammer a screw. If a language is more suited for a solution use that instead of the language you know best or the main language of the company.
1. Learn at least 2 programming languages, even better if one is strict, and compiled (like Go lang or Rust – even Java/C) and another one that is very dynamic and lenient (like PHP or JavaScript). This will give you the spectrum of programming languages.
1. Also, learn 2 different programming languages one that runs sync (sequentially) by default like PHP, and another one which can run async (non sequentially) like JavaScript and adjust your mind to sequentially executing code vs [promise.all](/blog/2022/07/javascript-promise-all/) :). To take it one level higher mix threads or something like [Go Routines](https://go.dev/tour/concurrency) – enjoy the concurrency. 


## Navigating new codebases

1. It is normal to get lost for hours if not days in new codebases when you join a new workplace.
1. Your best navigator to a completely new codebase is someone who has worked a lot on it or someone who has worked recently on it. Schedule like 1-2 hour pair programming session and get all the secrets of that codebase.


## Databases

1. Relational databases have been used since the 1970s and will be used for the next X decades (fill X on your own). [Mongo DB is web scale](https://www.youtube.com/watch?v=b2F-DItXtZs) video from 2010 -- Mongo DB vs MySQL, hilarious but true.
1. For your start-up and the next great project, your company/team is doing 95+% of the time relational database is able and useful as the main data storage layer.
1. Relational databases are not designed to be a cache or faceted search, use something like Redis for cache and ElasticSearch for faceted search.
1. NoSQL databases have their place too, maybe it is not to be the main data store.
1. SQL is the only language I have used in each job since 2007 and even before that when I wrote my first web app of any sort circa 2000. There are [things you can do in SQL](/blog/2018/12/you-can-do-it-in-sql/) without needing to write extra code in another layer.

## Testing

1. Testing is easier than debugging.
1. Some form of testing is better than none be it even smoke testing.
1. Unit testing takes time, it has a steep learning curve. Still, the benefits you get over time outweigh the time and effort it takes to write automated tests.
1. If you have never written a unit test, please try it. Also, give Test Driven Development a shot, it is a [mindset shift](https://www.youtube.com/watch?v=u_g8MF_h2Qs).
1. While writing unit tests, aim for a high code coverage but don’t run after having 100% code coverage, evaluate the cost and benefit of the highest possible code coverage.
1. Integration or End to End (E2E) might be a good idea but look at the feedback time it takes. There are only two types of automated tests the [fast ones and not-so-fast ones](/blog/2016/03/there-are-only-two-types-of-automated-software-tests/).


## Software Deployment/Release

1. Software deployment is not a release. Use feature flags to control web traffic flow like a tap controls water flow.
1. Speaking of feature flags, you might not need a fancy feature flag management SAAS. It can be good to have it but executing the feature flag concept with a simple `if else` is also possible.
1. Deployment tools will come and go, making the deployment atomic, and easy to rollback is the main catch here.
1. Your work is not done after releasing it on production and testing a couple of times. If you can set up a dashboard or other way to track the progress for a big feature, that helps the stakeholder greatly. Tweak the definition of done for some tasks, that's fine.
1. [Release early, release often](https://en.wikipedia.org/wiki/Release_early,_release_often). Also follow that in code, when code works make a commit so that you can go back to that state if needed.
1. Move fast break (few) things (behind feature flags) – :) -- Origially attributed to [Mark Zukerberg](https://hbr.org/2019/01/the-era-of-move-fast-and-break-things-is-over).

## DevOps/SRE

1. DevOps is not a role, [it's a philosophy](https://www.zentao.pm/blog/thinking-of-devops-as-a-philosophy-a-great-way-to-implement-devops-1025.html). Everyone should follow the mindset.
1. Distributed systems will fail, think about making your software resilient than avoiding failure.
1. To make a software system easily scaleable, the first prerequisite is to make it stateless.
1. Incidents and downtimes will happen, it is difficult but respond calmly but practically to downtimes or incidents. The main priority is to get the services back and later postmortem.
1. Yes Kubernetes is very popular but you might not need it, still, you can use containers even serverless with services like [Google Cloud Run](/blog/2019/11/why-use-google-cloud-run-5-compelling-reasons/).
1. A great Continuous Integartion (CI) and [Continous delivery (CD) culture definitely adds value to the business](/blog/2017/08/adopt-a-painless-continuous-delivery-culture/). 
1. Always be mindful of Personally Identifiable Information (PII) - never log them, mask them and be careful as the laws around them are getting stricter and fines higher.
1. You might not have access to a production database which is a good thing.
1. You see another array of problems at scale. The code and infrastructure that works for 1000 requests per day start breaking at 1000 requests per minute. And yes, scale is very relative to your business.
1. Infrastructure cost is high for companies, always think about saving cost and being efficient. For example, turn off staging environments from 8 PM to 8 AM, use a serverless database like AWS Aurora for staging, etc.
1. If a dog is a man’s best friend, [logs](/blog/2019/03/follow-these-logging-best-practices-to-get-the-most-out-of-application-level-logging-slides/) are software engineer's best friend. Start logging today. The next step for it can be full-on observability.
1. Leverage the edge when you can. Think of edge computing as the CDN for dynamic code, not static files.
1. A new start-up does not need to start with a [microservices architecture](/blog/2018/10/moving-from-a-and-b-to-~150-microservices/), divide your monolith when the time comes.
1. If you do use microservices, [don’t code your microservice like a monolith](/blog/2018/10/dont-code-your-microservice-like-a-monolith/).

## Side projects

1. Don’t buy domains you will never use :) for side projects. Use freenom.com if you want free domains.
1. Have at least one side project with a working URL not just in your head.
1. Do a side project that can be done by a single person - you. The more people you rope in it becomes more complex and harder to get things done.

## Misc

1. Software engineering is a team sport and the team is as good as the least skilled member.
1. Learn something new when you need it for your job, not because a new JavaScript framework has been released.
1. In an interview, the acid test question to go forward or not can be to ask the difference between a queue and stack. If the candidate cannot answer that, maybe it is time to stop the interview to save everyone’s time.
1. Agile is [not scrum](/blog/2020/09/agile-software-development/), using [Jira is not agile](/blog/2018/11/5-signs-that-reveal-your-software-development-process-is-agile-only-on-paper-and-solutions-for-them/). Work on your organization's agile maturity. The best measure of working software is end users using it even behind a feature flag.
1. A profitable million-dollar business does not need to use Scrum. Even the FAANGs and MAANGs of the world don’t [strictly follow Scrum and Agile](https://blog.pragmaticengineer.com/project-management-at-big-tech/).
1. Software engineering is about iterative development. If you want a car make a skateboard first and get feedback on that [Minimum viable product](https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp) (MVP).
1. Fast feedback is one of the most important things in software engineering. Be it faster feedback with unit tests, live reload, or even feedback from users about the new feature.
1. Product managers are either swimming, floating, or drowning. It is a hard job. The same can be said for software engineers.
1. In software engineering most decisions are always a tradeoff, you have to pick the best tradeoff for the given context and time.
1. Clear and crisp writing skill is very underrated for software engineers.
1. Documenting the things you have worked on is one of the best gifts you can give to the next engineer or yourself 6 months down the line. Think of the organization, if you leave tomorrow don’t carry all the valuable knowledge with you put it in as documentation.
1. Communicating how long it takes to deliver software and updating the stakeholders on why things are taking longer and keeping them satisfied are one of the most difficult things in software engineering.

Those are 101 points (4+41+8+8+5+6+6+14+3+12).
There are more things I can write about, but still, this should already be a lot of information to process.

## Conclusion

It was a potpourri of various things related to software engineering and web development. I hope you liked it, of course, I did not want to make it a long Twitter thread. Each point can be a blog post on its own, some of them are already blog posts linked to the idea.

> Again, you are free to read it and forget it as well as we can agree to disagree.

These are not rules or laws, these are things I have learned and experienced in the past 15 years.
