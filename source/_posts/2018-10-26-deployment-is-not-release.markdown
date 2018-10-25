---
layout: post
title: "Deployment is not Release, let's use feature flags"
date: 2018-10-26 08:13:05 +1100
comments: true
categories: 
- Technology
- DevOps
- Misc
---

Breaking down a big feature to epics and stories is always tricky. Then you have sub-stories making the process complicated. If you could deploy the finished task that delivers value to the business it would help. Enter feature flags, using this you can deploy your code to production behind a gate. Code and feature are on production but not fully released to everyone. This post is going to help you adjust your mental model for getting more benefits with feature flags.

{% img center /images/deployment-not-release/flags.jpg 'Deployment is not Release, lets use feature flags' 'Deployment is not Release, lets use feature flags' %}
[Image Source [Unspalsh](https://unsplash.com/photos/jCBzW_Q_UGI)]

<!-- more -->

## Why use feature flags?
  
Have you ever faced a situation that you need to deploy an epic but it is not possible as it is 80% completed? It is an epic that has to be "released" all or nothing. That is where the power of feature flag comes into play. You can deploy (not release to everyone) each new value addition to production. The trick here is to put it behind a simple logic like if email ends in @yourcompany.com. You can check a minimal code [example](https://geshan.com.np/blog/2016/09/how-to-do-a-minimum-viable-feature-switch/. 

> You have to separate the technical deployment process from the business process of releasing a new feature.

## How to use feature flags?

Feature switch, feature toggle are some of the other names of feature flags. It can be effortless like if the logged in user's email is in our white-list we show this form. It can even be a feature that shows up when you add a specific cookie with a defined value in the browser. It can be highly orchestrated too with the use of a SAAS for feature flags. [Launch Darkly](https://launchdarkly.com/) is a feature flag as a service company. You can use it if you have the time and resource to invest in it. 

Any path you take simple or complex the result is you have control over who can access a new feature. The feature is not released to everyone. The difference is how to activate/deactivate a feature flag. It can be as easy as clicking a checkbox or doing another deployment to open up a feature to everyone. 

> My suggestion is to start small, do an if condition in code and start experimenting. If it works well try other ways like a white-list or even a special cookie from the browser.

## Advantages of feature flags

There are many advantages of using feature flags in production. Lets list down a few highlights:

1. Ability to test a feature on production in private with a select group of users.
1. Ability to easily add or remove users who can use that feature.
1. The confidence of releasing near bug-free features. Software engineers and QA can test on production even multiple times. Release the feature after bug fixes only when they are confident. 
1. There will be lesser code conflicts. When the task is complete, code changes are merged to the main branch before/after deployment. This also saves some valuable development time.
1. The benefit of experimenting some things to a white-list of people in production. This can even lead to good feedback and positive changes.

## Conclusion

You can deploy even small tasks to production with a proper use of feature flags. Think about adding value to the customer and deploying often. Test on production and when you are confident release it to everyone. Always remember Deployment != Release. Happy Feature flagging!
