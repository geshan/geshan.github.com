---
layout: post
title: "5 Things to consider when deploying a new major feature to production"
date: 2015-08-01 14:29:19 +04:00
comments: true
tags: 
  - deployment
  - devops
cover: /images/5-deployment-considerations/capistrano-deployment.png
lastModified: 2020-05-01 11:03:22 +11:00
---

Getting code done for a feature from developer's machine to production in less time is a quality of efficient 
tech/engineering teams. Automated deployment with tools like [capistrano](http://capistranorb.com/) or [fabric](http://www.fabfile.org/) makes deployment an easy task than a dreaded operation where you miss one step and then screw up on production. This post will highlight things to consider when you deploy a new major feature that involves some big code and database changes. 

<img class="center" src="/images/generic/loading.gif" data-echo="/images/5-deployment-considerations/capistrano-deployment.png" title="Deployment success with Capistrano" alt="Deployment success with Capistrano">
<!-- more -->

## What is a Major Feature 

How to differentiate between a regular and major feature deployment? For example if you deploy a customer wallet subsystem in an e-commerce website or you deploy a multi-tenancy feature to a single-tenant application it should be  considered a major feature being rolled out. Regular features don't need a roll-out plan or lots of thinking before hand, They can be deployed with running your regular deployment routine and its fine. Major feature stand to be a type of a sub-project amid the regular features and bugs. Deploying a major feature is a shared responsibility of the development, sys admin/devops and the product team. 


## Things to consider

So, what are the things you need to consider when you want to deploy the new major feature that the team has completed development with and wants to go on production with it. Below are the things that you should make a checklist of before doing a major deployment that involves big code changes and some database schema changes with migrations:

### 1. Rigorous testing on staging 

This is a no-brainer, you must test the new feature rigorously on the staging environment and be sure that you have covered the different use-cases. I would even suggest having a google sheet which lists the possible cases and test it. If you have a Quality Assurance (QA) department you could surely take their help on the matter. Anyhow, developer-level testing is also very vital and it costs a lot lesser to find a bug on staging and fix it than go live and have a rollback because of the major bug being discovered on production. The question would be if it is release ready or if the testing takes too long it can delay the release.

### 2. Always take a database backup

This is the most basic things you will need to do before making any changes to the production database, it is one of the small things that if you forget you could invite a disaster. Problems snowball into bigger ones when you don't get the basics right, so beware and always take a database backup before running those migration queries. Also be alert about that the deployment script does not running the migration automatically. This can make the major feature deployment process painful, there by always be prepared for the difficult situation.
 
### 3. Small multiple deployments, preserve backwards compatibility

When you have to deploy a major feature to production, it will be a good idea to have the needed database changes on production which is fully backwards compatible. If you can get the alter tables and new columns running the migration on the production database you can then split the major feature in smaller parts and deploy then step by step. This gives the flexibility and confidence to the team to go on to production with the new feature. This can be an enabler of zero downtime deployment if you can play your cards right.

### 4. Don't forget the rollback plan

If you plan to do one major deployment to release the major feature, no doubts you will have a roll-out plan on how to execute the deployment with proper steps which elaborates the roll-out strategy. Even if you think that the roll-out/deployment is going to be successful always have a rollback plan. List out the things you will need to rollback to the current working version of the application in case things don't turn out as planned and you need to revert back. If you have minor issues which can be fixed fast you will not need to rollback, still if there is a major issue a rollback will be the only way out.

### 5. Features based on condition

Last but not the least, if you are deploying a major feature giving early access to your company employees (or a group within the company) is always a very good idea. Like the feature could be tested on production by the product team. You care now asking how? It is simple just restrict the feature code to be executed when the user is logged in with @yourcompnay.com email address. Once I remember we did it for rolling out a payment method that it would show up only if you use one special email address. So the major feature can be deployed to production and still have filtered access. After the concerned team give a green light you just remove the condition to access the feature and make it available to all customers/users.

## Conclusion

> As far as applicable aim for zero-downtime deployment and run your database migration script on production when the traffic is lowest.

Even if you must have downtime, make sure to look into ways of making it as less as possible beforehand so that the system can be under scheduled maintenance for the least amount of time. Happy Deploying.
