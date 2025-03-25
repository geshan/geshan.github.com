---
layout: post
title: "3 free Node.js hosting services you should be using today (with step-by-step deployment examples)"
date: 2021-01-14T22:30:22.000+11:00
comments: true
tags:
  - Web Development
  - Node.js
cover: "/images/free-nodejs-hosting/01free-nodejs-hosting-new03.jpg"
pagetitle: "3 free Node.js hosting services you should be using today (with step-by-step deployment examples)"
description: "Use these 3 completely free Node.js hosting services to host your Node.js application. Follow this guide to see how to deploy your Node.js app to these services."
keywords: free node.js hosting, free node js hosting, node js free hosting, node.js free hosting
---

Hosting Node.js applications is easy, finding a completely free Node.js hosting service that is reliable is not. In this post, we will discuss 3 hosting services where you can host your Node.js applications or API for free which you should start using now. We will also deploy a demo app step-by-step on each of these 3 platforms. I wished to have found more than 3 but finding even 3 was not very easy. This post was last updated on 2025-03-27.

<!-- more -->

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/01free-nodejs-hosting-new03.jpg" title="3 free node.js hosting services you should try now" alt="3 free node.js hosting services you should try now">

## Table of contents

- [Free Node.js Hosting options](#free-node.js-hosting-options)
- [Prerequisites](#prerequisites)
- [Free Node.js hosting services](#free-node.js-hosting-services)
- [Issues with these services](#issues-with-these-services)
- [Free Node.js hosting platforms to deploy your app](#free-node.js-hosting-platforms-to-deploy-your-app)
  - [Render](#render)
    - [Deploy Node.js Quotes API to Render](#deploy-node.js-quotes-api-to-render)
  - [Genezio](#genezio)
    - [Deploy Node.js app on Genezio](#deploy-node.js-app-on-genezio)
  - [Cyclic](#cyclic)
    - [Deploy Node.js Quotes API to Cyclic](#deploy-node.js-quotes-api-to-cyclic)
- [Quick comparison of Free Node.js hosting services](#quick-comparison-of-free-node.js-hosting-services)
- [Other options for free Node.js hosting](#other-options-for-free-node.js-hosting)
- [Conclusion](#conclusion)

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

The free Node.js hosting services are Render (free tier), Genzio (free plan), and Koyeb. All these services can host your Node.js application for $0 a month a.k.a. absolutely and completely free. You don't even need to add a credit card for backup or safety reasons. But there are strings attached, as discussed next.

## Issues with these services

Render apps sleep if they are inactive for 15 minutes.

Or you can use something like Cron-Job.org to ping your Render service every 10 minutes to keep it awake. Render apps might take up to 30 seconds to respond after sleeping.

With completely free services there will always be some kind of limitation. For example, you will get less resources like CPU and memory. Also, you might not get a custom domain or SSL certificate for free. These restrictions are logical and acceptable for free services. 

Well, that is still better than the above two options if you only have only one [coding challenge](/blog/2020/09/take-home-coding-challenges-outshine-competition/) to deploy.

## Free Node.js hosting platforms to deploy your app

Ok, let’s cut the rant and get to deploying a demo application. For this illustration I will use A [node.js Express Tutorial with Pug](https://github.com/yashcrest/nodejs-express-tutorial).

This is a demo project to show how to build a demo app with Express js and Pug and you can find the code open-source on [Github](https://github.com/yashcrest/nodejs-express-tutorial). Time to see this app hosted for free on Render.

### Render

[Render](https://render.com?utm_source=geshan.com.np) is a relatively new company that used to provide only static hosting for free. Now it provides an array of free servcies including Node.js and Docker hosting. The [pricing](https://render.com/pricing?utm_source=geshan.com.np) page lists static site, services, PostgreSQL and Redis for free. There is a catch for PostgreSQL though, it runs free for 90 days only.

> Render has one of the smoothest developer experience and deploy the Node.js app was a breeze.

It also has comprehensive [docs](https://render.com/docs?utm_source=geshan.com.np) to help you deploy not only Node.js apps for free but a host of other languages and frameworks. Some other things you can deploy on Render are Python, Go, PHP (Laravel) and Docker. You can also host other [Node.js alternatives](/blog/2022/08/nodejs-alternatives/) on Render like Deno and Bun.js.

#### Deploy Node.js Quotes API to Render

You will need a [free account](https://dashboard.render.com/?utm_source=geshan.com.np) on Render to get started. After you have registered with your preferred method like Github or Email, please follow the steps below to run your Node.js app on Render:

- Login to your Render account
- On the dashboard, under "Web Services", click "New Web Service" as seen below:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/25render-new-service.jpg" title="Add a new Render servcie" alt="Add a new Render servcie">

- On the next screen, choose `Public Git Repository`, then paste the following GitHub URL: `https://github.com/geshan/nodejs-express-tutorial` and click `Connect` as seen here:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/25-render-service-url.jpg" title="Add GitHub repo URL for the Render service" alt="Add GitHub repo URL for the Render service">

- On the next page, type in `nodejs-express-tutorial` as the name of the app, and set the language to `Node`.

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/25-render-app-name.jpg" title="Add a name for the Render web service" alt="Add a name for the Render web service">

- On the same page, make sure the build command is `npm install` and the start command is `node index.js`. Also make sure the plan is `Free`.

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/25render-app-command.jpg" title="Configure build and start command for Render web service" alt="Configure build and start command for Render web service">

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/25render-app-plan.jpg" title="Choose Free Web Service Plan" alt="Choose Free Web Service Plan">

- Then click the white `Deploy Web Service` button at the bottom of the page.

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/25render-app-deploy.jpg" title="Configure build and start command for Render web service" alt="Configure build and start command for Render web service">

- It will take a few minutes to build and deploy. You will see an output like the one below:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/25render-app-deployed.jpg" title="Render web service deployment successful" alt="Render web service deployment successful">

- Your application's URL will be visible under the app name. Click it to check if your app is running. If you click the link too early (while it’s still deploying), it may return a `404` response. Just wait a bit — once it’s live visiting the URL will show something like this:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/25render-app-running.jpg" title="Render web service Up and running successfully" alt="Render web service Up and running successfully">

That was a quick and easy way to get your Node.js app up and running on Render. Next, let’s look how to deploy the same application on Genezio.

### Genezio

[Genezio](https://genezio.com/deployment-platform/) is a great place to deploy both frontend and backend apps.

> [Genezio Pricing](https://genezio.com/deployment-platform/pricing/) is pretty straight forward. Personal projects run free and it integrates with GitHub, BitBucket, and GitLab.

Let's look at how we can deploy our Node.js app on Genezio.

#### Deploy Node.js app on Genezio

Given you have [registered](https://app.genez.io/auth/signup) on to Genezio with Github and are logged in, do the following steps:

- Fork the [https://github.com/geshan/nodejs-express-tutorial](https://github.com/geshan/nodejs-express-tutorial) to your GitHub account
- Go to Genezio [dashboard](https://app.genez.io/new-project)
- Click on "Import from Github" and
- You will be asked to connect Genezio with GitHub.

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/05genezio-connect-github.jpg" title="Connect Genezio to github" alt="Connect Genezio to github">

- Once connected with GitHub, search for the forked repo.

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/05genez-import-repo.jpg" title="Link your GitHub with Genez via its app" alt="Link your GitHub with Genez via its app">

- Once the repo is imported to Genezio, if you have any Environment Variables you can add them and click "Create".

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/05genez-create-repo.jpg" title="Create repo in genezio" alt="Create repo in genezio">

- Subsequently, Genezio will build and deploy the app for you in a live URL in a couple of minutes.

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/05genezio-live-url.jpg" title="Genezio URL" alt="Genzio URL">

- To view the working app click on the URL on overview page

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/05genezio-overview.jpg" title="Genezio Dashboard" alt="Genzio dashboard">

- It should come up something like this

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/05genezio-live-website.jpg" title="Live website deployed in Genezio" alt="Live website deployed in Genezio">

- You can also edit your code directly in Genezio or get help on your code using Genezio AI built in.

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/05genezio-ai.jpg" title="Chat with Genezio AI" alt="Chat with Genezio Ai">

### Cyclic

[Cyclic](https://app.cyclic.sh/#/join/geshan) aims to be a servive that offers full stack services for free. It is a serverless wrapper built very well on top of [AWS](https://docs.cyclic.sh/docs/overview/architecture). As it says on its website

> Connect your nodejs github repo, let us build, deploy and manage the hosting. Authorize our github app and you will have a fully featured software pipeline.

As mentioned its [pricing](https://www.cyclic.sh/pricing) page, which has a self claimed `generous free tier` we can deploy one app which can be invoked 10K times in a month. It also has some hard and soft limits mentioined in the [limits](https://docs.cyclic.sh/docs/overview/limits) page.

#### Deploy Node.js Quotes API to Cyclic

Given you have [registered](https://app.cyclic.sh/#/join/geshan) on to Cyclic with GitHub and you are logged in, follow the steps below:

- Fork the `https://github.com/geshan/nodejs-posgresql` repository to your GitHub account
- Go to your fork and click the "Deploy to cyclic" navy blue button
- You will be asked to connect Cyclic with GitHub, you can approve the repo as below

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/20cyclic-link.jpg" title="Link your GitHub with Cyclic vai its app" alt="Link your GitHub with Cyclic vai its app">

- Subsequently, Cyclic will build and deploy the app and show you "You're Live!" in a couple of minutes maximum, when the process is done as follows:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/21cyclic-live.jpg" title="Your app is live with Cyclic" alt="Your app is live with Cyclic">

- Now we can click on the "Go to nodejs-posgresql Dashboard" button. It will take us to the overview page like below:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/22cyclic-app-overview.jpg" title="Your app overview on Cyclic" alt="Your app overview on Cyclic">

- To view the working app click the "App URL" link, which will show something like:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/23cyclic-homepage.jpg" title="Our app main page working on Cyclic" alt="Our app main page working on Cyclic">

- Next, add `/quotes` to the URL and you should see something similar to the following:

<img class="center" loading="lazy" src="/images/free-nodejs-hosting/24cyclic-quotes.jpg" title="Node.js Quotes API running on Cyclic" alt="Node.js Quotes API running on Cyclic">

---

There you have it, the same Node.js API deployed on all 3 free Node.js hosting services without even needing to reach your wallet for your credit card.

## Quick comparison of Free Node.js hosting services

Below is a quick comparison table for Render, Genezio, and Vercel.

| Feature/Service | CPU | Memory | Sleeps on no activity? | Is FAAS/Serverless? | No. of apps? |
| :-------------: | :-: | :----: | ---------------------- | ------------------- | ------------ |
|     Render      | N/A |  N/A   | After 15 mins          | No                  | 5            |
|     Genezio     | N/A |  1 GB  | No                     | Yes                 | Multiple     |
|     Vercel      | N/A |  1 GB  | No                     | Yes                 | Unlimited    |

After that contrast, let’s look at some other options that are free but still ask for your credit card as a backup option that they can charge if you use more resources.

## Other options for free Node.js hosting

Some other services where you can host your Node.js application free/almost free but you need to put your credit card are as follows:

1. Railway - [Railway](https://railway.app?referralCode=Tcesg7) is a great service with free $5 a month. We can even run a database on Railway without adding a credit card.
1. Fly.io - Pretty good, it is like CDN for the backend. The [free plan](https://fly.io/docs/about/pricing/) has 3 shared-CPU-1x VMs with 256 MB of RAM. Asks for a credit-card on registration.
1. Google Cloud Run - You can host your Node.js app on [Google Cloud Run](https://cloud.google.com/run) as [serverless containers](/blog/2023/04/serverless-containers/). You can get up to [2 million requests](https://cloud.google.com/run/pricing) per month free. But it will involve setting up Google Cloud Registry and other tools. Part of Google Cloud Platform which asks for a credit card on registration.
1. Glitch - [Glitch](https://glitch.com/pricing) can host one of your Node.js Apps for free. It is better used to code collaboratively than host a Node.js app or API.

> You can host your Node.js App on all 3 of the big cloud providers AWS, Azure, and GCP and/or their function as a service (FAAS) serverless options or even on free-forever VM. But, they will ask for your credit-card.

You can even explore other cloud providers like IBM Cloud or Alibaba to host your Node.js app for $0 a month. Heroku will sunset it's free plan soon. I will leave the digging deeper part for you.

If your app needs a database, you can also use [Postgres with Docker](/blog/2021/12/docker-postgres/) or use free services like ElephantSQL or Neon.tech.

## Conclusion

Hosting a small test project with Node.js should not be a hassle.

> You should be able to do it easily with any of the above 3 services that give it absolutely free.

You can also use the other services that give it for free but ask you to put down your credit card number. The choice is yours!
