---
layout: post
title: "The best automated deployment tool is... the one that fits your needs"
date: 2015-08-29 15:22:48 +04:00
comments: true
tags:
- deployment
- devops
- Software Engineering
cover: /images/deployment-tools/fabric-deployment.png
---

The process of getting completed feature or bug fix code from the development environment to
your web servers is web software deployment. We have been deploying code in various ways, a
decade back we were used to uploading our files using File Transfer Protocol (FTP). I would
not considering copying files from the development machine to a web server a form of automated
deployment, basically it was a necessary evil at that time.

If you still use FTP at this time like [22%](http://bit.ly/sw-eng-np-pt3) of Nepali developers you really need to move on. In this post I will briefly mention some deployment tools and try to analyze their pros and cons. Still as the title reads the best automated deployment tool is the one that best fits your needs.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/deployment-tools/fabric-deployment.png" title="Automated Deployment demo" alt="Automated Deployment demo">
<!-- more -->

## What is automated Deployment?

Generally web application deployment needs some pre-defined steps to be done so that the software
changes are shipped from the development environment to staging/production environment. It is done
so that the changes are available for customers/users to use the new features developed by the
engineering team. If some or most parts of your deployment process is manual it is not automated
deployment. For example if you ssh into your server and do a git pull it can't really be considered
automated deployment process.

>Automated deployment is a form of deployment where the defined steps for shipping code from a
development environment to staging/production environment is one step procedure and fully or partially
automated.

In my opinion, automated deployment is a language/framework agnostic need for every application as it
saves lots of time and it can be one of the first steps towards devops culture. It is something both
the development and system admin/devops team can work together to automate things. It will also open
doors to further automation like continuous delivery, for example your tests pass on a CI service and
the code can be deployed automatically to your staging servers.

## Automated deployment characteristics

It should have the following characteristics :

* It can be trigged with just one action like one command on the command line and it will do the job.
* The steps will be pre-defined, reproducible and predictable.
* There is little or no human intervention from the start to the end.
* It should show the deployment progress as it happens, better feedback
* It should be atomic, which means either all the steps are completed or nothing happens.

## Good to have features

Some good to have features for automated deployment tools are

* It should be able to deploy the same code in multiple servers
* Each deployment should be done from a given branch/tag/commit of a Version Control System (VCS) like git
* It should trigger notification in the form of email/chat message
* Everyone should be able to view which branch/tag is deployed
* When a deployment is in progress, it should stop other deployment to start
* Rollback of the last deployment should be easy and fast.

## Free Tools available

Lets look at the free tools available and their popularity as per github activity
in the table below:

| No. | Name       | Written In | GitHub Link | Github Stars | Github Watchers | Github Forks | Open Issues | Open PRs |
|-----|------------|------------|-------------|--------------|-----------------|--------------|-------------|----------|
| 1   | [Capistrano](http://capistranorb.com/) | Ruby       | [Link](https://github.com/capistrano/capistrano)        | 7457         | 328             | 1253         | 47          | 3        |
| 2   | [Fabric](http://www.fabfile.org/)     | Python     | [Link](https://github.com/fabric/fabric)        | 5805         | 315             | 1017         | 256         | 124      |
| 3   | [Mina](http://mina-deploy.github.io/mina/)       | Ruby       | [Link](https://github.com/mina-deploy/mina)        | 2694         | 92              | 267          | 30          | 10       |
| 4   | [Rocketter](http://rocketeer.autopergamene.eu/)  | PHP        | [Link](https://github.com/rocketeers/rocketeer)        | 1721         | 81              | 142          | 73          | 5        |
| 5   | [Deployer](http://deployer.org/)   | PHP        | [Link](https://github.com/deployphp/deployer)        | 1322         | 84              | 192          | 17          | 5        |

* data is from 29-Aug-2015

## So which one should I choose?

I cannot give you a clear cut winner from the above table, it will depend solely on your needs.
Still as per your needs I can describe briefly the two tools I have used do. I have used [Capistrano](http://capistranorb.com/) and [Fabric](http://www.fabfile.org/). Let's look at how
they differ.

### Capistrano

Capistrano written in ruby has been around as an automated deployment tools for years not, its quite stable and has support for lots of languages and frameworks from symfony to NodeJs etc. You can get more
information about it from this [podcast](https://changelog.com/110/) and the official [docs](https://github.com/capistrano/capistrano/blob/master/README.md).

The good thing about Capistrano is it already has a defined [flow](http://capistranorb.com/documentation/getting-started/flow/) on how to deploy applications.
If you can understand the flow [visually](https://raw.githubusercontent.com/mpasternacki/capistrano-documentation-support-files/master/default-execution-path/Capistrano%20Execution%20Path.jpg) and know how to make/edit a recipe and
structure your tasks you are done. Another good thing about Capistrano as it keeps versions of releases
and does a symlink switch when the view version is ready. Same thing for rollback, it is fast because
basically it is just a symlink switch to the immediate old successful deployed version of the code.

### Fabric

Python fabric is also an old player in the automated deployment domain, check its [docs](http://docs.fabfile.org/en/1.10/) too. You can also get deployment
scripts for some applications but the thing here is it is more like a remote command runner. You
get a clean slate to structure your deployment process as you want then you can write your
deployment commands and run then in the sequence you want. It give you the freedom to write the way
you want and choose the sequence of tasks you want for your deployment procedure.

### Other tools

Generally other tools are based on Capistrano style deployment, some say they are faster than Capistrano
because they batch the ssh commands and run them once etc but the basic idea does not really change. I
cannot peronally endorse any other tool as I have used them by my own.

## What next

If you are already doing automated deployment you can look at making it even easier, like deploying
from a Chat interface like Hipchat or Slack. It is termed as [ChatOps](http://blog.flowdock.com/2014/11/11/chatops-devops-with-hubot/) where one can instruct a
bot to deploy an application. If you don't want to go the chat path, you can even build a web interface
to trigger deployments like [Samson](https://developer.zendesk.com/blog/introducing-samson-a-web-interface-for-deployments) by Zendesk.

If you have your tests running you can even explore continuous delivery.

Further more the whole deployment process can be revamped with introduction of containers and
[Docker](https://www.docker.com/). If docker is setup right, you may not even need deployment tools but
it will surely take lots of resources to get the docker setup running and functioning correctly for
production usage.

## Conclusion

The decision to choose the right deployment tool that fits your language/framework, application and team
needs will be yours. Try choosing a tool that will do the job well and can be used for a long time without
big problems.

> So the main catch here is, if you want to deploy a big application, want stability and structure go
for the safer option like Capistrano. If you are just starting with automated deployment for a smaller
application and want to automated deploy with your own custom flow use Fabric for its flexibility.

Choose the right tool and get started with automated deployment. Happy Automated Deploying. Bye Bye FTP and ssh into a server then `git pull origin master`.
