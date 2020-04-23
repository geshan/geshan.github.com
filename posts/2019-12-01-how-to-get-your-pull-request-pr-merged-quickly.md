---
layout: post
title: "How to get your pull request (PR) approved and merged quickly"
date: 2019-12-02 14:03:37 +00:00
comments: true
tags: 
- Software Engineering
cover: /images/pull-request-merge/pull-request-merge-fast.jpg
pagetitle: How to get your Pull Request (PR) merged after quick approval
description: Follow these tips to get your PR approved then merged faster than usual
keywords: Git, pull reqeuest, pr approval
---
Have you ever faced a call to completely redesign your code in one of your pull requests? I have and then thought what are the ways to avoid this. Call it a pull request or merge request, basically, it is a set of changes you want to go ahead and merge to the main branch to deploy to production and complete your task. This post is going to highlight a semi silver bullet to get your pull requests merged faster :), carry on reading.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/pull-request-merge/pull-request-merge-fast.jpg" title="How to get your pull request (PR) approved and merged quickly" alt="How to get your pull request (PR) approved and merged quickly">

<!-- more -->

## Introduction

Sometimes getting your pull request reviewed, agreed upon and approved feels like playing a game of tug of war with the reviewers. You end up discussing, changing parts of the code and at times having some healthy arguments too. So how can you avoid draining energy on pull requests?

## Disclaimer

This post is not discussing pull requests for open source projects. It is only focused on pull requests done inside a project group or your company products. This post is dealing with pull requests for closed source internal projects where usually the team member meet each other on a daily basis.

## Keep changes small

Do not open a pull request with 50 files changed and 2000 lines added, no one can or will review such a long set of changes in one go. This means it will take multiple sittings and a lot of discussions. A long length will also guarantee that the PR will not be short-lived. Basically, a big changeset violates all the qualities of a [great](https://medium.com/@hugooodias/the-anatomy-of-a-perfect-pull-request-567382bb6067) pull request like easy to comprehend,  having a low discussion and short-lived.

There are [numerous benefits](https://smallbusinessprogramming.com/optimal-pull-request-size/) of a smaller pull request. One of the technical one is surely having [fewer git conflicts](https://geshan.com.np/blog/2016/04/3-simple-rules-for-less-or-no-git-conflicts/). Other benefits include shorter cycle time and less risk.

> A [study](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/) has revealed that a review of 200-400 LOC over 60 to 90 minutes should yield 70-90% defect discovery.

So it is very clear that keeping the changes <400 lines is great for everyone. For another reference have a look at no. of lines changed and time it takes to review in minutes below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/pull-request-merge/pull-request-review-time.png" title="Smaller pull request take less time to review" alt="Smaller pull request take less time to review">

## But how to keep changes small?

That is the million-dollar question. It is easy to say keep your changes small, but how can we do it in practice. Once in 2016, I had a big rewrite and it has 50 files changed and ~1500 or more lines of code. Now as I think of it how could have I done it in like 10 smaller pull requests, here are the strategies:

### Discuss first, code second

This is the main reason for rewrites. We usually tend to write the code, sometimes even fully done and then open the pull request but the reviewer has a different solution. That different solution can be better too. So you end up accepting the change request and the new “better” solution = a partial rewrite of the solution for the task.

It would have been a lot better to spend like 15 mins before writing a single line of code saying I want to use this library, I want to use X pattern and do it this way with the probable reviewer of your code you code review would be exponentially easier and faster. This would also give the reviewer a proper sense o how many PRs are coming and what to expect next.

### Enabler code last

What do I mean by `enabler code`? Basically, if you are writing a new POST API endpoint and you have tests. The first one can be to create the new table/fields on the database. Given you have written the part that talks to the database and adds the new resource. That can be a separate pull request.

Another pull request can be adding the validation logic for that new resource. Finally, you can have the `enabler` glue controller code which opens up the API endpoint giving it access to any consumers. Breaking this single task into 4 pull requests gives you a lot smaller PRs to discuss and change if any change request is done. A friend mine does it and I understand the value now, at first it felt like he is opening too many pull requests.

### Feature flags

This is one of the underutilized things I see in software engineering. The first time I did it and saw this in production it blew my mind. I was amazed not because of the 3 extra lines of code in the if I wrote but by the immense flexibility, it gave us (the tech team) and the business. We deployed PayPal but it was accessible only to `myname@mycompany.com` for 2 days before being opened up to `*@mycompany.com` later to be opened up to all customers.

With feature flags you can ship the files you need step by step but the only user for a given amount of time can be `you@yourcompany.com`. In this way, you can have smaller pull requests even for critical features and get your code tested on production gradually. Even in the above example of POST API, the last enable code could be shipped behind a feature flag and only when you have tested it well on production you can open it up to more people step by step.

## Conclusion

Creating smaller pull requests helps the code author, the reviewer, the team and with better productivity the whole company. Use the tools on disposal well, still, never underestimate the human factor and the power of clear communication. For a better git skill set do read these [git tips](https://geshan.com.np/blog/2014/07/4-git-tips-beyond-basics/).

> Hopefully the above strategies give you a better idea of how you keep your pull requests smaller leading to a more productive team.
