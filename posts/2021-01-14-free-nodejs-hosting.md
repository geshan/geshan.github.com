---
layout: post
title: 3 free Node.js hosting services you should be using today (with step-by-step
  deployment examples)
date: 2021-01-14T22:30:22.000+11:00
comments: true
tags:
- Web Development
- Node.js
cover: "/images/free-nodejs-hosting/01free-nodejs-hosting-new.jpg"
pagetitle: 3 free Node.js hosting services you should be using today (with step-by-step
  deployment examples)
description: Use these 3 completely free Node.js hosting services to host your Node.js
  application. Follow this 2000+ words guide to see how to deploy your Node.js app
  to these services.
keywords: free node.js hosting, free node js hosting, node js free hosting, node.js
  free hosting

---
Hosting Node.js applications is easy, finding a completely free Node.js hosting service that is reliable is not. In this post, we will discuss 3 hosting services where you can host your Node.js applications or API for free which you should start using now. We will also deploy a demo app step-by-step on each of these 3 platforms. I wished to have found more than 3 but finding even 3 was not very easy.

<!-- more -->

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/01free-nodejs-hosting-new.jpg" title="3 free node.js hosting services you should try now" alt="3 free node.js hosting services you should try now">

## Table of contents

* [Free Node.js Hosting options](#free-node.js-hosting-options)
* [Prerequisites](#prerequisites)
* [Free Node.js hosting services](#free-node.js-hosting-services)
* [Issues with these services](#issues-with-these-services)
* [Free Node.js hosting platforms to deploy your app](#free-node.js-hosting-platforms-to-deploy-your-app)
  * [Heroku](#heroku)
    * [Deploy Node.js Quotes API to Heroku](#deploy-node.js-quotes-api-to-heroku)
  * [Vercel](#vercel)
    * [Deploy Node.js Quotes API on Vercel](#deploy-node.js-quotes-api-on-vercel)
  * [Cyclic](#cyclic)
    * [Deploy Node.js Quotes API to Cyclic](#deploy-node.js-quotes-api-to-cyclic)
* [Quick comparison of Free Node.js hosting services](#quick-comparison-of-free-node.js-hosting-services)
* [Other options for free Node.js hosting](#other-options-for-free-node.js-hosting)
* [Conclusion](#conclusion)

## Free Node.js Hosting options

This post is about services where you can host your Node.js application completely free, yes for $0 a month. Of course, when you don’t pay anything you will need to make some trade-offs. Still, this is not a list with just a couple of free options and a bulk of paid alternatives like the other posts I have seen and read.

> I have tried all of the 3 services on my own and they work pretty well for demo and small-sized applications.

Needless to say, we would not use a free service to host a medium-sized or a production-level application. All of these 3 main services DO NOT ask for your credit card even for backup purposes so keep them inside your wallets.

I will include 3+ other services that ask for credit cards or have pretty inexpensive plans towards the end to make the list a bit more comprehensive.

## Prerequisites

All 3 of these services that we are going to look at in the next sections. Before we dive into actually deploying our Node.js applications below are some prerequisites:

1. You have a GitHub account and know how to fork repositories
2. Your application code is available on GitHub
3. You are able to add third-party applications to your GitHub account.

Time to start revealing our free Node.js hosting services:

## Free Node.js hosting services

The free Node.js hosting services are Heroku (free tier), Vercel (hobby free forever plan), and Cyclic. All these services can host your Node.js application for $0 a month a.k.a. absolutely and completely free. You don't even need to add a credit card for backup or safety reasons. But there are strings attached, as discussed next.

## Issues with these services

Heroku free dynos sleep if they are inactive for 30 minutes.

> There is a workaround called [Kaffeine](https://kaffeine.herokuapp.com/) that calls your Heroku service every 30 minutes.

Or you can use something like Cron-Job.org to ping your Heroku service every 20 minutes to keep it awake. Heroku has a maximum of 5 applications available on the free tier.

Vercel is an amazing service, where you could host both your backend API and frontend application in the same repository. It focuses more on the frontend side of things.

> The downside is that Vercel uses serverless functions. It is like a great wrapper on top of AWS Lambda. It only allows personal GitHub repositories for free, not organizational ones.

With serverless functions, the issues of cold start and losing application state comes into the picture.

Cyclic is another awesome service where the app does not sleep if you don’t get requests for 30 minutes. It is serverless and a great wrapper on top of multiple AWS services.

> The con here is you get only 1 app free but it gets 1 shared CPU and 1 GB of shared memory.

Well, that is still better than the above two options if you only have only one [coding challenge](/blog/2020/09/take-home-coding-challenges-outshine-competition/) to deploy.

## Free Node.js hosting platforms to deploy your app

Ok, let’s cut the rant and get to deploying a demo application. For this illustration I will use A [node.js Express API](/blog/2021/01/nodejs-postgresql-tutorial/) that talks with a PostgreSQL database on [ElephantSQL](https://www.elephantsql.com/).

This is a simple quotes API and you can find the code open-source on [Github](https://github.com/geshan/nodejs-posgresql). Time to see this app hosted for free on Heroku.

### Heroku

[Heroku](https://heroku.com) is a salesforce company and one of the first Platform-as-a-service (PaaS) companies that made it big, really big. It has been around since 2007, and it has evolved and adapted well to the changing technology landscape in the past 15 years. We can host multiple languages as Heroku Dynos and Node.js is definitely one of them.

> Heroku even 11 years back in 2010 was more like throw me your app and I will run it for you, this was before Docker and containers were a thing.

Now in 2021, they have a host of services, and luckily the Free plan is still alive on their [pricing](https://www.heroku.com/pricing) page. Time to proceed to how you can deploy the demo app on Heroku:

#### Deploy Node.js Quotes API to Heroku

You will need a [free account](https://signup.heroku.com/) on Heroku to get started. After you have registered, please follow the steps below to run your Node.js app on Heroku:

* Login to your Heroku account
* Go to: [https://github.com/geshan/nodejs-posgresql](https://github.com/geshan/nodejs-posgresql)
* Click on the “Deploy to Heroku” button
* On the Heroku “Create New App” page give the app a name like `nodejs-heroku-try` or something that is available
* Then click “Deploy App”
* Wait for a minute or two and it will build and deploy the app like below:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/02nodejs-heroku.jpg" title="Deploy a Node.js API on Heroku from its interface" alt="Deploy a Node.js API on Heroku from its interface">

* After that click the “View” button, you should see something like below:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/03nodejs-app-on-heroku.jpg" title="Node.js API running on Heroku" alt="Node.js API running on Heroku">

* Add `/quotes` to the URL and you should see the quotes in JSON format as follows:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/04nodejs-quotes-api-on-heroku.jpg" title="Node.js Quotes API running on Heroku" alt="Node.js Quotes API running on Heroku">

Wasn’t that easy, there you have the quotes API built with Node.js and Express running on the first free Node.js hosting platform: Heroku.

It did not run magically though, the settings were already present on the repo in the [app.json](https://github.com/geshan/nodejs-posgresql/blob/master/app.json) file. This tells Heroku how to deploy the app. For a real-life app, we will need to set the correct environment variable mainly secrets like database credentials properly.

To make it better you can Fork the repository and connect [Github as a deployment method](https://devcenter.heroku.com/articles/github-integration) for Heroku.

Furthermore, you can set up [Pipelines](https://devcenter.heroku.com/articles/pipelines) to create staging and production environments in Heroku. You can also use the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) for more control over your apps. I leave further exploration to you. Next, let’s look at how to deploy the same application on Vercel.

### Vercel

[Vercel](https://vercel.com) (previously known as Zeit) is a great place to deploy frontend apps. Being a layer on top of serverless functions it can also run some other languages and [Node.js is included](https://vercel.com/docs/runtimes#official-runtimes/node-js) in that list. Amongst other good features, a very handy feature with Vercel is you get a unique URL for each pull request which makes testing that particular branch a breeze. They call this deploy preview.

> [Vercel Pricing](https://vercel.com/pricing) is pretty straight forward. Personal projects run free and it integrates with GitHub, BitBucket, and GitLab.

Let's look at how we can deploy our Quotes API Node.js app on Vercel.

#### Deploy Node.js Quotes API on Vercel

After you have [registered](https://vercel.com/signup) with Vercel and are logged into Vercel, do the following steps:

* Visit [https://github.com/geshan/nodejs-posgresql](https://github.com/geshan/nodejs-posgresql) (you don’t even need to fork the repo)
* Click on the blue “Deploy” button
* Give it a name in the Vercel UI like below:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/05nodejs-vercel-linkup.jpg" title="Link up Node.js App Github Repo with Vercel" alt="Link up Node.js App Github Repo with Vercel">

* And click "Continue"
* You can create your own repo on Github from the screen below:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/06nodejs-vercel-create-repo.jpg" title="Create Github Repo within Vercel for Node.js free hosting" alt="Create Github Repo within Vercel for Node.js free hosting">

* After that, select the root as the project’s source code, then click “Continue”

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/07nodejs-vercel-project-root.jpg" title="Choose root as the project source code in Vercel" alt="Choose root as the project source code in Vercel">

* Subsequently, click deploy in the next screen:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/08nodejs-vercel-deploy.jpg" title="Deploy the app on Vercel with Deploy button" alt="Deploy the app on Vercel with Deploy button">

* It will build and deploy the app and you will see a screen like below:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/09nodejs-vercel-deployed.jpg" title="The app is deployed on Vercel" alt="The app is deployed on Vercel">

* Now, click the “Visit” button, you should see something like the following:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/10nodejs-vercel-app-running.jpg" title="The app is running on Vercel" alt="The app is running on Vercel">

* Add `/quotes` to the URL and you should see the quotes in a JSON format like below:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/11nodejs-vercel-api-running.jpg" title="The quotes API is running on Vercel" alt="The quotes API is running on Vercel">

This is set up very well now, you should go to the app’s settings page if you want to tweak anything. You can add environment variables and do other things in the settings. You can even look at the function’s logs.

Each time you open a new pull request in that repository Vercel will give you a deploy preview URL which is very handy. You can see how it looks like below:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/12nodejs-vercel-deploy-preview.jpg" title="Vercel deploy preview on GitHub pull request" alt="Vercel deploy preview on GitHub pull request">

On merge to master/main branch, it will auto-deploy the code to the main URL. You can use the [Vercel CLI](https://vercel.com/docs/cli) for re-deployments, setting up environment variables, and a host of other things.

Both Heroku and Vercel have powerful CLI to make your life easier for deploying the apps and doing other things like having a look at the app logs from the CLI.

Next, let's look at how Cyclic compares to Heroku and Vercel.

### Cyclic

[Cyclic](https://app.cyclic.sh/#/join/geshan) aims to be a servive that offers full stack services for free. It is a serverless wrapper built very well on top of [AWS](https://docs.cyclic.sh/docs/overview/architecture). As it says on its website

> Connect your nodejs github repo, let us build, deploy and manage the hosting. Authorize our github app and you will have a fully featured software pipeline.

As mentioned its [pricing](https://www.cyclic.sh/pricing) page, which has a self claimed `generous free tier` we can deploy apps which can be invoked 100K times in a month. It also has some hard and soft limits mentioined in the [limits](https://docs.cyclic.sh/docs/overview/limits) page.

#### Deploy Node.js Quotes API to Cyclic

Given you have [registered](https://app.cyclic.sh/#/join/geshan) on to Cyclic with GitHub and you are logged in, follow the steps below:

* Fork the `https://github.com/geshan/nodejs-posgresql` repository to your GitHub account
* Go to your fork and click the "Deploy to cyclic" navy blue button
* You will be asked to connect Cyclic with GitHub, you can approve the repo as below

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/20cyclic-link.jpg" title="Link your GitHub with Cyclic vai its app" alt="Link your GitHub with Cyclic vai its app">

* Subsequently, Cyclic will build and deploy the app and show you "You're Live!" in a couple of minutes maximum, when the process is done as follows:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/21cyclic-live.jpg" title="Your app is live with Cyclic" alt="Your app is live with Cyclic">


* Now we can click on the "Go to nodejs-posgresql Dashboard" button. It will take us to the overview page like below:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/22cyclic-app-overview.jpg" title="Your app overview on Cyclic" alt="Your app overview on Cyclic">

* To view the working app click the "App URL" link, which will show something like:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/23cyclic-homepage.jpg" title="Our app main page working on Cyclic" alt="Our app main page working on Cyclic">

* Next, add `/quotes` to the URL and you should see something similar to the following:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/24cyclic-quotes.jpg" title="Node.js Quotes API running on Cyclic" alt="Node.js Quotes API running on Cyclic">

---

There you have it, the same Node.js API deployed on all 3 free Node.js hosting services without even needing to reach your wallet for your credit card.

## Quick comparison of Free Node.js hosting services

Below is a quick comparison table for Heroku, Vercel, and Cyclic.

| Feature/Service | CPU | Memory | Sleeps on no activity? | Is FAAS/Serverless? | No. of apps? |
| :---: | :---: | :---: | --- | --- | --- |
| Heroku | 1x | 512 MB | After 30 mins | No | 5 |
| Vercel | N/A | 1 GB | No | Yes | Unlimited |
| Cyclic | N/A | 1 GB | No | Yes | Multiple |

After that contrast, let’s look at some other options that are free but still ask for your credit card as a backup option that they can charge if you use more resources.

## Other options for free Node.js hosting

Some other services where you can host your Node.js application free/almost free but you need to put your credit card are as follows:

1. Railway.app - [Railway](https://railway.app/pricing) is a great service with free $5 a month. We can even run a database on Railway without adding a credit card.
1. Fly.io - Pretty good, it is like CDN for the backend. The [free plan](https://fly.io/docs/about/pricing/) has 3 shared-CPU-1x VMs with 256 MB of RAM. Asks for a credit-card on registration.
1. Google Cloud Run - You can host your Node.js app on [Google Cloud Run](https://cloud.google.com/run) as [serverless containers](/blog/2019/11/why-use-google-cloud-run-5-compelling-reasons/). You can get up to [2 million requests](https://cloud.google.com/run/pricing) per month free. But it will involve setting up Google Cloud Registry and other tools. Part of Google Cloud Platform which asks for a credit card on registration.
1. Glitch - [Glitch](https://glitch.com/pricing) can host one of your Node.js Apps for free. It is better used to code collaboratively than host a Node.js app or API.

> You can host your Node.js App on all 3 of the big cloud providers AWS, Azure, and GCP and/or their function as a service (FAAS) serverless options or even on free-forever VM. But, they will ask for your credit-card.

You can even explore other cloud providers like IBM Cloud or Alibaba to host your Node.js app for $0 a month. I will leave the digging deeper part for you.


## Conclusion

Hosting a small test project with Node.js should not be a hassle.

> You should be able to do it easily with any of the above 3 services that give it absolutely free.

You can also use the other services that give it for free but ask you to put down your credit card number. The choice is yours!