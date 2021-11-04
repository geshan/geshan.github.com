---
layout: post
title: How Software Deployment tools have changed in the past 20 years
date: 2021-04-01T21:45:37.000+11:00
comments: true
tags:
- Software Engineering
- devops
cover: "/images/software-deployment-tools/01software-deployment-tools.jpg"
pagetitle: How Software Deployment tools have changed in the past 20 years
description: Read the journey from FTP to kubectl apply and chatops in the past 20
  years where I share my software deployment tools' experience.
keywords: software deployment tools, deployment tools, automated deployment tools,
  open source deployment tools

---
I have used a variety of software deployment tools in the last 20 years. From FTP to deploying Docker containers on Kubernetes using a chatbot, I think I have seen the most of it. In this post, I will take you on a journey of web software deployment tools from 2001 to 2021, let’s get started!
<!-- more -->

<img class="center" loading="lazy" src="/images/software-deployment-tools/01software-deployment-tools.jpg" title="Software deployment can sometimes be similar to deploying the army" alt="Software deployment can sometimes be similar to deploying the army">



## Table of contents

* [What are software deployment tools?](#what-are-software-deployment-tools)
* [When did my web journey start?](#when-did-my-web-journey-start)
* [First software deployment tools - web interface and FTP in 2000 - 2008](#first-software-deployment-tools---web-interface-and-ftp-in-2000---2008)
* [SSH, Git pull as software deployment tools 2008-2011](#ssh-git-pull-as-software-deployment-tools-2008-2011)
* [Hello Capistrano circa 2012-2015](#hello-capistrano-circa-2012-2015)
* [Docker is the way to go - 2016](#docker-is-the-way-to-go---2016)
* [Kubernetes it is 2016-2021](#kubernetes-it-is-2016-2021)
* [Quick recap](#quick-recap)
* [How to choose your software deployment tool?](#how-to-choose-your-software-deployment-tool)
* [Conclusion](#conclusion)
## What are software deployment tools?

Software deployment tools have also been popularized as deployment automation tools in the last 8-10 years.

> Basically, any software that helps you get the first version of your software or the subsequent changes available to the software’s users is a software deployment tool. 

For this piece, I will be focused on deployment software that can deploy any form of web software be it website and/or web apps. I will not discuss how desktop software or an operating system like [Windows 98](https://en.wikipedia.org/wiki/Windows_98) used to be available on a CD.

Let me try to explain what software deployment tools and what the triggering layers can be. Software deployment tools are the tools that are used to deploy a piece of software (mainly web software). For instance, Capistrano, Fabric, Docker run, Kubectl apply, and the likes. The triggering layers where these tools run are software like Jenkins, Bamboo, Github actions. Let’s get that thing straight. I would like to make the distinction clear visually below:

<img class="center" loading="lazy" src="/images/software-deployment-tools/02software-deployment-tools.jpg" title="Software deployment tools and triggering tools are different" alt="Software deployment tools and triggering tools are different">

As you can see, we will be discussing the yellow part not the green part of the above diagram. So how did it all begin for me to deploy a website to a free web host, it was not “the cloud” in the early 2000s. I consider [automated deployment](https://geshan.com.np/blog/2015/10/4-pillars-of-a-solid-software-application-and-tools-to-support-it/#automated-deployment) a pillar of solid software development.

Also, I will not be mentioning infrastructure provisioning and infrastructure as code tools like Ansible, Puppet, Salt and Terraform. They belong to another class of tools that are not used for web software deployment automation.

## When did my web journey start?

Back in 1999-2000 when people didn’t have an email address, I had websites running on free website hosts. It was the era of [dial up internet](https://en.wikipedia.org/wiki/Dial-up_Internet_access) back then. 

> It was the time of the 33.6k and 56k [modems](https://en.wikipedia.org/wiki/Modem) that made [this](https://www.youtube.com/watch?v=gsNaR6FRuO0) sound to connect to the internet using the phone line. Young people with 5G on mobile these days will never know the value of the internet we had then.

I looked into Archive.org and found a website I had deployed circa 2000. Of course, I am not going to embarrass myself sharing the website but I can tell you it had [marquee tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/marquee), gifs, a couple of [Java Applets](https://en.wikipedia.org/wiki/Java_applet), and page counters. Below is a screenshot of archive.org for the above-mentioned anonymous website.

<img class="center" loading="lazy" src="/images/software-deployment-tools/03archive.jpg" title="Old website deployed with FTP since 2001" alt="Old website deployed with FTP since 2001">

Of course it was a [static site](https://geshan.com.np/blog/2020/04/static-vs-dynamic-websites-jam-stack/#static-website) with some HTML, JavaScript and CSS. And it was deployed either from a web interface or the reliable File Transfer Protocol (FTP) client.

## First software deployment tools - web interface and FTP in 2000 - 2008

My first encounter with a deployment tool was a web interface called file manager. I had a bunch of HTML files with not-so-good CSS and Javascript that worked on our [Pentium](https://en.wikipedia.org/wiki/Pentium#Pentium) or II Desktop at that time. Our desktop because that machine was more like a family machine and I was one of its users. 

> Anyway, like a script kiddie 21 years back I had built this amazing (back then) website and wanted to put it online. 

My best bet on a 33.6 kbps connection was to upload it with a web interface called `File Manager`.  The file manager in those days looked like below:

<img class="center" loading="lazy" src="/images/software-deployment-tools/04file-manager.jpg" title="File manager to upload files from early 2000s" alt="File manager to upload files from early 2000s">

Notice “Internet Explorer” which was the only popular browser back then. After using the file manager for some months I stumbled upon File Transfer Protocol (FTP) software.

FTP used to be an advanced thing back then. 

> I have used Core FTP, Cute FTP, and FileZilla FTP clients between 2000 and 2008. If you ask me if FTP is automated deployment, my answer would be a “No”.

As usual, I would play safe and copy almost the whole website again when I had to deploy changes.

<img class="center" loading="lazy" src="/images/software-deployment-tools/05filezilla-ftp.jpg" title="Filezilla FTP client was popular in mid 2000s" alt="Filezilla FTP client was popular in mid 2000s">

I clearly remember in my first job as an Intern in 2007 I used fireFTP and Filezilla to copy Drupal files to the server. Even in my second job in 2008, I used SVN and FileZilla to copy PHP files to the server for a web application I was developing then.

> Probably towards the end of 2008 when I/we had started using Git at [YIPL](https://younginnovations.com.np/). It was a needed change from SVN and Git is still amazing.

I should have Googled and found out something like [Git FTP](https://github.com/git-ftp/git-ftp) if it existed then. That takes us to our next phase of software deployment tools.

## SSH, Git pull as software deployment tools 2008-2011

So around Q4 of 2008, I joined the company we co-founded [Young Innovations](https://younginnovations.com.np/). We were super early adopters of Git back then. Remember, Github started in 2008 and was not popular till 2010ish. In 2008-2010 we used [Gitosis](https://wiki.archlinux.org/index.php/gitosis) to configure Git access in our team with SSH public keys. So, I clearly know the difference between Git and Github.

We used to SSH into our servers and our deployment process was more like this:

1. SSH into the production server without password using SSH keys
1. Go to the right folder
1. Make sure the latest changes are on master, then execute `git pull origin master` on the website folder
1. As per need restart the server (it used to be Apache as far as I remember, as we mostly did PHP development back then).

This worked pretty well, I would say it worked much better than using FTP as you don’t need to remember which files to copy and the process was mostly Ok unless you faced git conflicts and stuff like that. Looking back I would have written a [Fabric](http://www.fabfile.org/) script that did it as an atomic task, if anything failed it would stop the deployment.

> Looks like a lot of other developers were doing this git pull thing even in 2018, opening up the .git [security hole](https://www.zdnet.com/article/almost-400k-websites-risk-hacking-data-theft-via-open-git-repos-researcher-warns/).

Anyhow, this was a way we deployed till 2010 but I would not recommend anyone do it now in 2021.

## Hello Capistrano circa 2012-2015

In 2012, I moved to a new country and joined a fashion E-commerce startup in U.A.E -- [Namshi](https://en-ae.namshi.com/). For the first time, I saw a proper automated deployment tool in action. It was not Capistrano, it was a custom-built CLI tool that had steps to select and the git branch or tag can be deployed live. Later we used [Capistrano](https://capistranorb.com/) in 2013 for one of the [Service Oriented Architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture) “SOA” component we built in Symfony2. To be honest, I really liked how we deployed with Capistrano compared to FTP or login to server and run `git pull` or even this custom tool. It was a one command deploy, no selections no interruptions, with atomic deployments to any environment staging or production.

Capistrano is opinionated but it had the [features](https://github.com/capistrano/capistrano/blob/master/README.md#features) sorted.

> The new version was built in a new folder and when it was ready to get traffic the symlink would be pointed to the latest release. After that, the server would be reloaded/restarted. So simple yet so effective. 

We could deploy git branches or tag and to multiple stages; mainly staging and live. It was a single command on the root of the project, wait for a couple of minutes, and done. The rollbacks were fast, all ACL was managed by SSH Keys. 

Even now if you have 1 to under 10 VMs and want to deploy a web application I would say Capistrano is your best bet. There are other flavors in Ruby and PHP but the basic deployment idea introduced by Capistrano stays the same.

<img class="center" loading="lazy" src="/images/software-deployment-tools/06capistrano.jpg" title="Capistrano is still one of the best automated deployment tools if you deploy your software in VMs" alt="Capistrano is still one of the best automated deployment tools if you deploy your software in VMs">

Capistrano is the pioneer in deploying web software safely with minimal or no downtime. Many other software deployment tools have followed Capistrano’ss pursuit like [Mina](https://github.com/mina-deploy/mina), [deployer](https://deployer.org/), etc. Another less opinionated deployment tool is [Fabric](http://www.fabfile.org/). It is written in Python. By this time we had written tests for the apps we built, there was a good continuous integration (CI) process in place on Travis. The [Continuous Delivery](/blog/2017/08/adopt-a-painless-continuous-delivery-culture/) (CD) part was mainly done with the cap deploy.

We had happily used Capistrano for 3-4 years and then in 2015 came Docker. It disrupted how people thought about web software development and deployment. I will still say, the best software deployment tool is the one [that fits your needs](/blog/2015/08/the-best-automated-deployment-tool-the-one-that-fits-your-needs/). Around 2015 I wrote a couple of fabric scripts to automate the deployment of CMS like Drupal for YIPL. It was helpful for them too. Then we all stumbled upon [Docker](https://www.docker.com/).

## Docker is the way to go - 2016

Docker was a paradigm shift and we were possibly one of the first teams in the MENA region to get our hands dirty with it.

To keep the concerns clear, Docker is not an automated deployment tool per se. It is a software packaging software that lets you run your software consistently in all environments from dev to production creating a “general” parity. In turn, it makes software deployment a lot easier also because the build and deploy/run process is separated. Learn more about why you should [use Docker in development](/blog/2018/10/why-use-docker-3-reasons-from-a-development-perspective/) and how it has [changed software engineering](/blog/2018/11/4-ways-docker-changed-the-way-software-engineers-work-in-past-half-decade/) in the past years.

<img class="center" loading="lazy" src="/images/software-deployment-tools/07docker-kubernetes.jpg" title="Docker and Kubernetes go hand in hand for a reliable software deployment experience" alt="Docker and Kubernetes go hand in hand for a reliable software deployment experience">

I remember we were running less than 5 apps on Docker in production. I am not aware of the specifics but I suppose we were doing Docker pull and docker run as it was less than 10 containers.

Bear in mind, adding containers to your workflow does add more layers and complications in the CI/CD process. There will be a need to have a container registry like DockerHub, AWS ECR, or Google Container Registry. A builder will be needed to build images before they can be deployed and run. And after sometime when the number of running containers grow you will need a container orchestrator like Kubernetes. 

In terms of advancing deployment triggers, we had a chatbot on Hipchat/Slack written with Hubot that can run `cap deploy` or `kubectl apply` or `helm install` on an AWS VM for us. This made deployment a much easier task.

<img class="center" loading="lazy" src="/images/software-deployment-tools/08chatops.jpg" title="Chatops is a great way to democratize software deployment process" alt="Chatops is a great way to democratize software deployment process">

Later we started using Kubernetes in full swing.

## Kubernetes it is 2016-2021

As far as I remember 2016 was a turning point. Our senior DevOps engineer did an internal talk to introduce Kubernetes to the tech team. It made little sense than on what was the power of Kubernetes.

We were on AWS and I believe Kubernetes was managed with [Kops](https://github.com/kubernetes/kops) back then, there was no [AWS EKS](https://aws.amazon.com/eks/) and GKE had recently started I think. We were deploying apps with Kubernetes artifacts. Sooner than later we moved to Helm to deploy all our apps. Even the older apps deployed with Capistrano and other legacy tools had been dockerized and deployed with Kubernetes. We were using Minikube on our dev machines too.

The deployment process was very smooth. Push changes to git, wait for the docker build to pass, and deploy with a chatbot. We had [Roger](https://github.com/namshi/roger) our own open-source docker builder and later we were building docker images on Google cloud build and deploying on self-managed Kubernetes with [Helm](https://helm.sh/) and Helm charts using `helm install`. Eventually, Namshi did move to [GCP](https://tech.namshi.io/blog/2019/01/15/from-cloud-to-cloud-how-namshi-migrated-a-6yo-aws-infrastructure-to-gcp/) in 2019.

Later when I joined a new company in mid-2018, we were using Kubernetes and going back to `kubectl apply` to deploy things. Containers running with Kubernetes and deployed with Kubectl have been what I am used to now since 2018.

## Quick recap

So to recap the software deployment tools I have used in the past 20 years are:

* 2001 - 2008 - Web interface and File Transfer Protocol (FTP) clients
* 2009 - 2011 - SSH and git pull :)
* 2012 - 2015 - Capistrano and a few Fabric scripts
* 2016 - 2021 - Kubectl apply with Docker and Kubernetes, some Helm between 2016-2018

If you see the trend, FTP was used for 7 years or more and Kubeclt is inching towards beating it. It is just a matter of time Kubectl will be used the longest as I don’t see it changing any time soon.

## How to choose your software deployment tool?

Well by now I have written enough about how the software deployment tools and automated deployments tools have changed in the last 20 years. If you want to choose a software deployment tool for your team in 2021 below is an oversimplified flow chart that should help you:

<img class="center" loading="lazy" src="/images/software-deployment-tools/09choose-deployment-tool.jpg" title="Choose a software deployment tool that fits your current need" alt="Choose a software deployment tool that fits your current need">

You can view a [larger version](/images/software-deployment-tools/09choose-deployment-tool-full.jpg) too.

## Conclusion

[Deployment is not a release](/blog/2018/10/deployment-is-not-release/), always separate your deployment which is a technical task from release which is a business operation. This is the main point, if you use a full-on feature flag SAAS or just an if-else in code to do this it is up to you.

> In 2021, if your team uses FTP/Capistrano to deploy web software and the business makes thousands of dollars a month your team is a lot better than “modern” teams using Docker containers, Kubernetes, etc and burning thousands of dollars a month. 

The goal is to make money and happy customers software and software deployment tools are just means to achieve that goal. Choose what helps you reach business goals, not the latest fad. Happy deploying!