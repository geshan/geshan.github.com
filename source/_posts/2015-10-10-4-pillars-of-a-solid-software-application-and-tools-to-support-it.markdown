---
layout: post
title: "4 pillars of a solid software application and tools to support it"
date: 2015-10-10 10:21:52 +0400
comments: true
categories:
- Technology
- misc
- Programming
- testing
- logging
- deployment
---

Software development is not just punching some code on the keyboard for desired output. The business side of software development always takes priority than the technicalities of it.  

I have seen some software development teams are slow because they have a lot of technical debt. Some teams are naive, the members don't want to explore new things . They are stuck with 5 year old technology like FTP, old legacy framework etc. In this post, I will shed some light on the four basic and important things of a solid software application. This contents of post is language and framework agnostic. It is applicable to any software project.

{% img center /images/4-pillars-software-application/4-pillars-software-application.png '4 pillars of a solid software application' '4 pillars of a solid software application' %}

<!-- more -->

**Assumptions**

For this post I have made the following assumptions:

* The software development team is using some Version Control System (VCS) like git.
* There is some form of project management and team structure in place.

## Maintainable Code

Making software work is super important, making it just work is a problem. I have seen teams writing code for the sake of making it work. Sometimes it feels like the code is there just for compilers/interpreters not humans. Code, simple, readable and maintainable is also important. We have discussed some rules about making code maintainable do [read](http://blog.yipl.com.np/7-golden-rules-of-simple-clean-code/) it. [Naming things well](http://www.slideshare.net/pirhilton/how-to-name-things-the-hardest-problem-in-programming) and writing relevant code comments is also undermined.  

Having a culture of code review always helps. If someone else can check your code before its merged to the main branch, it is a good practice to follow. It opens up more ways to learn how to code in a practical way. Code reviews are better done in systems like [Github](http://github.com), [Bitbucket](http://bitbucket.org) and [Gitlab](http://gitlab.com).

## Automated Testing with Continuous Integration

Having automated tests is important. Opt for the test type that matches your team's current skill set. Unit testing are good to have. Writing testable code and giving team members the skill to do unit testing is an investment. Best way to approach unit testing will be grab the low hanging fruit. It will be better to start with Smoke Tests or basic functional tests. Doing a web application on each push/deployment? Check that all pages respond with a 200 HTTP response.

Step by step add more tests and time for your team members to gain more skills. As soon as you have some form of automated tests, wire it up with a [Continuous Integration (CI)](https://en.wikipedia.org/wiki/Continuous_integration) service. Some good options are [Travis CI](https://travis-ci.com), [Wercker](http://wercker.com), [Shippable CI](http://shippable.com).

## Automated Deployment

Finished feature should reach production from developer's machine in less time. It will be possible using automated deployment using latest tools. Are you using File Transfer Protocol (FTP) in 2015? You should stop it now, the first step towards automation for a FTP user is use [GitFTP](http://git-ftp.github.io/git-ftp/). It is an automated way to get the changed files to server than copying it over a FTP client.

Do one step deployment and least human work. Tools like [Capistrano](http://capistranorb.com/), [Fabric](http://www.fabfile.org/), [Rocketeer](http://rocketeer.autopergamene.eu/) are used for automated deployment process. To sum it up, [the best deployment tool is... the one that fits your needs](http://geshan.com.np/blog/2015/08/the-best-automated-deployment-tool-the-one-that-fits-your-needs/).

## Logging with Monitoring

Logs are the only way your software application talks back to you. Gather all your system, application logs and make it accessible via a web interface. Follow the logging [standard](https://tools.ietf.org/html/rfc5424) and use free SAAS to render your logs in a readable way that gives you value. If dog is a man’s best friend, log is a developer’s best friend. Understand and exploit [the importance of logging in your software application](http://geshan.com.np/blog/2015/08/importance-of-logging-in-your-applications/).

Just having logs is not enough, view your logs after each change. Always check your logs after each deployment to track any suspicious activity. You can use Logentries(http://logentries.com) and Loggly(http://loggly.com) for cloud logging.  

## Conclusion

I have not focused on the server and devOps part of the software application and deployment. These are the practices all software engineers should adhere to. These should be the goals whenever a new project starts.

> Without 4 stable legs even a chair falls. Save your application from going down follow these 4 practices.
