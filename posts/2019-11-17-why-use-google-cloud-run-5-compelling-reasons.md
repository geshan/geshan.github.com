---
layout: post
title: 5 compelling reasons to opt for serverless containers on Google Cloud Run
date: 2019-11-17T15:39:38.000+00:00
comments: true
tags:
- Docker
- devops
- Google Cloud Run
- Software Engineering
cover: "/images/reasons-to-use-google-cloud-run/00reasons-to-use-cloud-run.jpg"
pagetitle: 5 reasons to use serverless containers on Google Cloud Run
description: Read the 5 most compelling reasons to use serverless containers. No.
  1. no need to learn a new language, framework or paradigm
keywords: serverless containers, Google Cloud, Google Cloud Run, serverless, containers

---
Google [Cloud Run](https://cloud.google.com/run/) makes deploying serverless containers a breeze. It has a fully managed serverless version, which gives huge scalability, high availability, and cost based on precise usage. Being serverless, there are no servers for you to manage. In addition to these awesome reasons, this post discusses 5 more compelling reasons to use serverless containers on Google Cloud Run for your next project.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/reasons-to-use-google-cloud-run/00reasons-to-use-cloud-run.jpg" title="5 compelling reasons to use Google Cloud Run" alt="5 compelling reasons to use Cloud Run">

<!-- more -->

## Serverless pain points

Function as a service (FAAS) has lots of advantages, still, there are some pain points too. [Bret McGowen](https://twitter.com/bretmcg) (a developer advocate at Google Cloud) did a survey about `Serverless pain points`. Below is a summary of the results (as presented at [Serverless Conf 2019 NYC](https://acloud.guru/series/serverlessconf-nyc-2019/view/what-is-cloud-run) by Bret)

<img class="center" src="/images/generic/loading.gif" data-echo="/images/reasons-to-use-google-cloud-run/01serverless-issues.jpg" title="Serverless Pain points from a survey" alt="Serverless Pain points from a survey">

It is very clear that `Cold Starts` and `Vendor Lock-in` are the two big ones. In this post, later we will into how Cloud Run manages these two issues.

## How I ran into Google Cloud Run

A year back I was helping some masters students here in Sydney with a side project. I was mentoring them, guiding them to have a real-world project they could include in their resumes. For this project, we started using Google Cloud Platform, why? Because you get [$300 free credit](https://cloud.google.com/free/docs/gcp-free-tier) for a year :) simple. There are other Serverless containers offerings like [AWS Fargate](https://aws.amazon.com/fargate/) and [Azure Containers](https://azure.microsoft.com/en-au/product-categories/containers/). I don’t think they are as good and as software engineer friendly as Cloud Run. In my opinion, Google Cloud Run actually brings serverless containers to the masses. Running serverless containers on Cloud Run is very easy. If you can dockerize your app, you can run it in a serverless way on Cloud Run on serverless containers.

I wanted to learn how to set up a Google Kubernetes Engine ([GKE](https://cloud.google.com/kubernetes-engine/)) Kubernetes cluster, so I teamed up with another DevOps Engineer and started to configure a Kubernetes cluster. As the app’s backend API was already containerized and GKE was managed K8s I thought getting a running URL would not take long.

> To my surprise, it took us like 2 days worth of work just to get a working URL for that API.

Fast forward 2 months, the project didn’t really go as planned and the k8s cluster was stopped in Feb 2019. Then in mid-Apr 2019, I read news about Google Cloud Run being available. It promised HTTPs URLs for any container with a web server running on port 8080.

> I thought let’s give it a try. To my delightful surprise, I could get a working serverless HTTPs URL for the same app in like 30 mins.

That just blew my mind and I instantly became a Google Cloud Run Fan. If you liked my story, in addition to the official guides/videos do have a look at the [unofficial Cloud Run FAQ](https://github.com/ahmetb/cloud-run-faq) and the [awesome Cloud Run](https://github.com/steren/awesome-cloudrun) repos on Github. I have also done a talk on [Serverless Containers](/blog/2019/11/from-0-to-working-serverless-url-for-a-containerized-app-with-google-cloud-run-slides-and-video/ "Serverless containers talk and video") on Google Cloud run.

## Google Cloud Run in the wild

Hopefully, after the above story, you want to read more about why should you invest time in learning and using Google Cloud Run. After that half failed, a somewhat successful project I tried Google Cloud Run for another personal side project. That project was [Nepal_News_En](https://twitter.com/nepal_news_en) twitter account. It currently has \~11k followers.

> This is a relatively simple project, it gets news about Nepal in the English language from 14 sources (both local Nepalese media and international media).

It collects the news from either RSS or scrapes the headlines where RSS is not provided.

Currently running with a cron(ish) setup the app gets \~1 request per minute including collection and posting to Twitter. This small app is hosted on Google Cloud Run and I am paying `under $0.10` a month but bear in mind the requests are pretty heavy as it has to scrape and extract out news headlines then save it into a database. If you have more questions about this app comment below are contact me over email.

Of course, it runs on serverless containers. With the amazing and generous [pricing](https://cloud.google.com/run/pricing "Google Cloud Run pricing") of Google Cloud Run the app runs almost free of cost.

## Reasons to use serverless containers

As Cloud run is serverless you already have the advantages of a Serverless offering. In my opinion, the following are some more compelling reasons to use serverless containers on Google Cloud Run:

### 1.  No need to learn a new framework/paradigm

The first thing to distinguish is Function as a Service (FAAS) is only one type of serverless offering, Amazon S3 is a backend as a service and it is also a serverless offering. So, as we generally think FAAS = serverless. Going Serverless means to deploy a function to one of the cloud providers. This has its own strings attached, you have too many functions to manage, you need to think of how to manage a fully stateless function, etc.

Then you might need to learn a new framework like [Serverlss framework](https://serverless.com/) to get the real value out of a FAAS.

> With containers it's all gone, you are probably using [docker](https://geshan.com.np/blog/categories/docker/) containers already. Instead of deploying them on your Kubernetes cluster, you can just run them on fully managed Cloud Run and it works.

Another advantage of serverless containers is you are `not locked-in` to one provider, as they are containers you can run them wherever you want. If you want to move some Kubernetes cluster in the future that will be an easy move.

### 2. Serverless containers can run any language/binary/framework

Function as a Service(FAAS) have their own place and it gives you unprecedented abstraction like you don’t need to worry about OS-level issues or security problems. But on the flip side, you are confined to the given runtimes and allowed versions. For example, if you want to run Node 12/14 on [AWS Lambda](https://aws.amazon.com/lambda/) it is not possible out of the box. Let’s take this even further, what if you want to run Rust or Fortran :). You can’t do it.

> On Google cloud run you can even run [Fortran](https://github.com/zachmccormick/fortran-cloudrun) or [Pascal](https://medium.com/google-cloud/serverless-computing-with-pascal-d7a16633db44) if you want.

As long as it is a container and can expose a web-server on port 8080 (or any configured post) you can run anything you want on serverless containers.

### 3. HTTPs URL + custom domain mapping

Configuring SSL is not an easy task, with [Let’s Encrypt](https://letsencrypt.org/) you can get a free certificate still you have to configure and install it well. HTTPs secure websites are important from every aspect, even for things like [SEO](https://support.google.com/webmasters/answer/7451184?hl=en).

> Cloud Run gives you HTTPs URL as soon as you deploy your container.

As an added bonus, you can even [map your own domain](https://cloud.google.com/run/docs/mapping-custom-domains "Cloud run domain mapping") to the running set of containers.

### 4. Google cloud toolset at your disposal

Google Cloud Platform, in my opinion, is the most software engineer friendly cloud platform of them all. You can build your containers with [Cloud Build](https://cloud.google.com/cloud-build/), push them to [Container Registry](https://cloud.google.com/container-registry/) for running them later as serverless containers on Cloud Run.

> On top of it, you can even debug your application in production with [Stackdriver debugger](https://cloud.google.com/debugger/) and get performance analysis with [Stackdriver trace](https://cloud.google.com/trace/).

There is a [profiler](https://cloud.google.com/profiler/) if you want to use and [monitoring](https://cloud.google.com/monitoring/) and [logging](https://cloud.google.com/logging) too. You can use all of these tools very easily with Google Cloud Run. For my side project, I am using trace and debugger sometimes. Trace has been very helpful to know the execution times for the scrapers of the project.

### 5. Decreased go-to-market lead time

Business value is the most important thing a software engineer can deliver. If you choose the latest language/framework and set of technologies but the business can’t earn money, you might have already failed. With serverless containers on Google Cloud Run you can focus solely on delivering the right business value to your customers and decreasing time-to-market.

> You will not have to design and execute a full-on CI/CD pipeline and deployment strategy.

You can get your product to the hands of your customers much faster. Even if your product becomes a massive hit and garners millions of requests per day as you are serverless the cloud provider (in this case Google) is going to scale your apps for you (given they are stateless). So you as a software engineer can focus on solving business problems to make more money for the business with serverless containers doing their job well.

## Conclusion

Vendor lock-in and cold start are the two major issues with FAAS serverless model. With Google Cloud run you don’t need to worry about both these big issues for serverless containers.

> As its containers, you can move anywhere and with the [concurrency model](https://cloud.google.com/run/docs/about-concurrency) of Cloud run, the cold start problem is handled to a good extent.

With the recent feature add of [minimum instances](https://cloud.google.com/run/docs/configuring/min-instances "Cloud run minimum instances"), you can even have a few containers running all the time (then it is not serverless containers anymore). If you are concerned about the cost at this point, you might want to read this [comparison](https://medium.com/google-cloud/cloud-run-vs-cloud-functions-whats-the-lowest-cost-728d59345a2e) between Cloud Run and Cloud functions.

If you are convinced by now to use serverless containers with Google Cloud Run, take [Laravel](/blog/2019/10/get-laravel-6-running-on-google-cloud-run-step-by-step-with-ci/) or [Symfony](/blog/2019/11/how-to-run-symfony-on-google-cloud-run-with-the-demo-app-step-by-step-guide/) for a spin. You can even try a simple NodeJs [app](https://github.com/geshan/currency-api) if you like.

All of them have the `Run on Google Cloud` button which makes deploying insanely easy. If you want to set up your CI/CD pipeline have a look at the [cloudbuild.yml](https://github.com/geshan/currency-api/blob/master/cloudbuild.yaml) file in the Currency API NodeJs repo. For a general overview of serverless containers, please watch my [talk](/blog/2019/11/from-0-to-working-serverless-url-for-a-containerized-app-with-google-cloud-run-slides-and-video/).

> All in all, if I start a new pet project or even a production load ready project today I will go with serverless containers on Cloud Run for sure.