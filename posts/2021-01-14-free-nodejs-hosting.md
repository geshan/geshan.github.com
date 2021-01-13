---
layout: post
title: 3 free Node.js hosting services you should be using today (with step-by-step
  deployment examples)
date: 2021-01-14T22:30:22.000+11:00
comments: true
tags:
- Web Development
- NodeJs
cover: "/images/free-nodejs-hosting/01free-nodejs-hosting.jpg"
pagetitle: 3 free Node.js hosting services you should be using today (with step-by-step
  deployment examples)
description: Use these 3 completely free Node.js hosting services to host your Node.js
  application. Follow this 2000+ words guide to see how to deploy your Node.js app
  to these services.
keywords: free node.js hosting, free node js hosting, node js free hosting, node.js
  free hosting

---
Hosting Node.js applications is easy, finding a completely free Node.js hosting service that is reliable is not. In this post, we will discuss 3 hosting services where you can host your Node.js applications or API for free which you should start using now. We will also deploy a demo app step-by-step on each of these 3 platforms. I wished to have found more than 3 but finding even 3 was not very easy.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/01free-nodejs-hosting.jpg" title="3 free node.js hosting services you should try now" alt="3 free node.js hosting services you should try now">

<!-- more -->
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
  * [Zeet](#zeet)
    * [Deploy Node.js Quotes API to Zeet](#deploy-node.js-quotes-api-to-zeet)
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
1. Your application code is available on GitHub
1. You are able to add third-party applications to your GitHub account.

Time to start revealing our free Node.js hosting services:

## Free Node.js hosting services

The free Node.js hosting services are Heroku (free tier), Vercel (hobby free forever plan), and Zeet. All these services can host your Node.js application for $0 a month a.k.a. absolutely and completely free. You don't even need to add a credit card for backup or safety reasons. But there are strings attached, as discussed next.

## Issues with these services

Heroku free dynos sleep if they are inactive for 30 minutes.

> There is a workaround called [Kaffeine](https://kaffeine.herokuapp.com/) that calls your Heroku service every 30 minutes.

Or you can use something like Cron-Job.org to ping your Heroku service every 20 minutes to keep it awake. Heroku has a maximum of 5 applications available on the free tier.

Vercel is an amazing service, where you could host both your backend API and frontend application in the same repository. It focuses more on the frontend side of things.

> The downside is that Vercel uses serverless functions. It is like a great wrapper on top of AWS Lambda. It only allows personal GitHub repositories for free, not organizational ones.

With serverless functions, the issues of cold start and losing application state comes into the picture.

Zeet.co is another awesome service where neither the app sleeps if you don’t get requests for 30 minutes nor it is serverless.

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

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/02nodejs-heroku.jpg" title="Deploy a Node.js API on Heroku from its interface" alt="Deploy a Node.js API on Heroku from its interface">

* After that click the “View” button, you should see something like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/03nodejs-app-on-heroku.jpg" title="Node.js API running on Heroku" alt="Node.js API running on Heroku">

* Add `/quotes` to the URL and you should see the quotes in JSON format as follows:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/04nodejs-quotes-api-on-heroku.jpg" title="Node.js Quotes API running on Heroku" alt="Node.js Quotes API running on Heroku">

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

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/05nodejs-vercel-linkup.jpg" title="Link up Node.js App Github Repo with Vercel" alt="Link up Node.js App Github Repo with Vercel">

* And click "Continue"
* You can create your own repo on Github from the screen below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/06nodejs-vercel-create-repo.jpg" title="Create Github Repo within Vercel for Node.js free hosting" alt="Create Github Repo within Vercel for Node.js free hosting">

* After that, select the root as the project’s source code, then click “Continue”

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/07nodejs-vercel-project-root.jpg" title="Choose root as the project source code in Vercel" alt="Choose root as the project source code in Vercel">

* Subsequently, click deploy in the next screen:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/08nodejs-vercel-deploy.jpg" title="Deploy the app on Vercel with Deploy button" alt="Deploy the app on Vercel with Deploy button">

* It will build and deploy the app and you will see a screen like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/09nodejs-vercel-deployed.jpg" title="The app is deployed on Vercel" alt="The app is deployed on Vercel">

* Now, click the “Visit” button, you should see something like the following:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/10nodejs-vercel-app-running.jpg" title="The app is running on Vercel" alt="The app is running on Vercel">

* Add `/quotes` to the URL and you should see the quotes in a JSON format like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/11nodejs-vercel-api-running.jpg" title="The quotes API is running on Vercel" alt="The quotes API is running on Vercel">

This is set up very well now, you should go to the app’s settings page if you want to tweak anything. You can add environment variables and do other things in the settings. You can even look at the function’s logs.

Each time you open a new pull request in that repository Vercel will give you a deploy preview URL which is very handy. You can see how it looks like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/12nodejs-vercel-deploy-preview.jpg" title="Vercel deploy preview on GitHub pull request" alt="Vercel deploy preview on GitHub pull request">

On merge to master/main branch, it will auto-deploy the code to the main URL. You can use the [Vercel CLI](https://vercel.com/docs/cli) for re-deployments, setting up environment variables, and a host of other things.

Both Heroku and Vercel have powerful CLI to make your life easier for deploying the apps and doing other things like having a look at the app logs from the CLI. 

Next, let's look at how Zeet compares to Heroku and Vercel.

### Zeet

[Zeet](https://zeet.co) brands itself as the easiest way to deploy. It supports both code from Github or a public docker container. Zeet is not as popular as either Heroku or Vercel but it packs a punch with its simplicity quotient.

> As Zeet doesn’t run serverless functions or sleep in 30 mins it looks like a promising option to host just one app for free.

As per its [pricing](https://zeet.co/pricing) page, we can run one project for free with limited and shared resources. Time to dig more into Zeet:

#### Deploy Node.js Quotes API to Zeet

Given you have [registered](https://zeet.co/new) on to Zeet with GitHub and you are logged into Zeet, follow the steps below:

* Fork the “https://github.com/geshan/nodejs-posgresql” repository to your GitHub account
* Go to Zeet, click the green “+ New Project” button on the top right of Zeet
* Then click “GitHub” and click the green “Continue” button under the “Trial $0” option
* After that, click “Continue” besides the “Nodejs-posgresql” repo that you have just forked and then click “Deploy Now” as seen below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/13nodejs-zeet-deploy-now.jpg" title="Deploy Node.js app to Zeet" alt="Deploy Node.js app to Zeet">

* Subsequently, choose “Node.js 14” on “Build Method” and click “Save” as follows:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/14nodejs-zeet-commands.jpg" title="Node.js app to deploy on Zeet" alt="Node.js app to deploy on Zeet">

* Give it some time to build and deploy, after that, you will see something like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/15nodejs-zeet-deployed.jpg" title="Node.js app deployed on Zeet" alt="Node.js app deployed on Zeet">

* If you click the green "Visit" button, it will not work now. There is one small config left. Click on “Settings” then click on the “Networking” link on the left then set the "Port" to be `3000` as seen below, after that click “Save” on the bottom right as seen below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/16nodejs-zeet-port.jpg" title="Configure right port for the Node.js app on Zeet" alt="Configure right port for the Node.js app on Zeet">

* This should redeploy the App, if you go back to the “Deployments” tap it should be deploying/deployed.
* Consequently, click the “Visit” button again you should see something like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/17nodejs-zeet-app-running.jpg" title="Node.js app running on Zeet" alt="Node.js app running on Zeet">

* Next add `/quotes` to the URL and you should see something similar to the following:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/18nodejs-zeet-api-running.jpg" title="Node.js Quotes API running on Zeet" alt="Node.js Quotes API running on Zeet">

Like Vercel, Zeet also provides a deploy preview URL on each pull request. I have a feeling they wanted to compete Zeit with Zeet :), if you know what I mean. Below is a preview of how the deploy perview URL looks like as a comment in your pull reqeust:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/free-nodejs-hosting/19nodejs-zeet-deploy-preview.jpg" title="Node.js App deploy preview on Zeet" alt="Node.js App deploy preview on Zeet">

Anyway if you want to deploy your own app you will need to delete this demo app and add your own app. Zeet only allows 1 free app. They have more demos in their [GitHub account](https://github.com/zeet-demo). Zeet does not have a CLI app which is good I suppose as it wants to keep things simple and clean.

There you have it, the same Node.js API deployed on all 3 free Node.js hosting services without even needing to reach your wallet for your credit card.

## Quick comparison of Free Node.js hosting services

Below is a quick comparison table for Heroku, Vercel, and Zeet.

|                  Feature/Service                  |    CPU   |    Memory   | Sleeps on no activity? | Is FAAS/Serverless? | No. of apps? |
|:-------------------------------------------------:|:--------:|:-----------:|------------------------|---------------------|--------------|
|       [Heroku](https://www.heroku.com/free)       |    1x    |   512 MB    | After 30 mins          | No                  | 5            |
| [Vercel](https://vercel.com/docs/platform/limits) |    N/A   |     1 GB    | No                     | Yes                 | Unlimited    |
|          [Zeet](https://zeet.co/pricing)          | 1 Shared | 1 GB Shared | No                     | No                  | 1            |


After that contrast, let’s look at some other options that are free but still ask for your credit card as a backup option that they can charge if you use more resources. 

## Other options for free Node.js hosting

Some other services where you can host your Node.js application free/almost free but you need to put your credit card are as follows:

1. Fly.io - pretty good, it is like CDN for the backend. [Free plan](https://fly.io/docs/about/pricing/) has 3 shared-cpu-1x VMs with 256 MB of RAM. Asks for a credit-card on registration.
1. Google Cloud Run - You can host your Node.js app on Google Cloud Run as serverless containers. You can get up to [2 million requests](https://cloud.google.com/run/pricing) per month free. But it will involve setting up Google Cloud Registry and other tools. Part of Google Cloud Platform which asks for a credit card on registration.
1.Openode.io - If you have an open-source project you can ask them for a [free plan](https://www.openode.io/pricing). The cheapest plan with 50MB of memory is just $0.75 a month.

> You can host your Node.js App on all 3 of the big cloud providers AWS, Azure, and GCP and/or their function as a service (FAAS) serverless options or even on free-forever VM. But, they will ask for your credit-card.

You can even explore other cloud providers like IBM Cloud or Alibaba to host your Node.js app for $0 a month. I will leave the digging deeper part for you.

## Conclusion

Hosting a small test project with Node.js should not be a hassle.

> You should be able to do it easily with any of the above 3 services that give it absolutely free.

You can also use the other services that give it for free but ask you to put down your credit card number. The choice is yours!
