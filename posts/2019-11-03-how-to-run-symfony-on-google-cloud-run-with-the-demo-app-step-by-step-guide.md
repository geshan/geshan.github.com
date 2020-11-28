---
layout: post
title: How to run Symfony on Google Cloud Run with the demo app [Step-by-Step Guide]
date: 2019-11-03T14:22:00.000+00:00
comments: true
tags:
- Programming
- Symfony
- Docker
- devops
- Google Cloud Run
cover: "/images/symfony-on-google-cloud-run/00symfony-on-gcr.jpg"
pagetitle: How to Run Symfony on Google Cloud Run step by step guide - demo app
description: Follow this step by step guide to run Symfony Demo app on Google Cloud
  Run
keywords: Symfony, PHP, Google Cloud, Google Cloud Run, Symfony Hosting, Symfony Demo
  app

---
Symfony is without doubts one of the most [popular](https://raygun.com/blog/top-php-frameworks/) PHP frameworks. It has amazing flexibility and is written in an applaudable modular fashion. Some Symfony components even [power](https://symfony.com/projects/laravel) other prominent frameworks like Laravel. Running Symfony is a bit tricky at times, especially the [permissions](https://symfony.com/doc/current/setup/file_permissions.html) of the cache and logs folder, this blog post demystifies running the Symfony [Demo App](https://github.com/symfony/demo) in a docker container and hosting it serverless on [Google Cloud Run](https://cloud.google.com/run/).

<img class="center" src="/images/generic/loading.gif" data-echo="/images/symfony-on-google-cloud-run/00symfony-on-gcr.jpg" title="Get Symfony running on Google Cloud Run with the demo app" alt="Get Symfony running on Google Cloud Run with the demo app">

<!-- more -->

## Prerequisites

1. You have done at least one project with Symfony (of course you are comfortable with PHP and composer)
1. You have a good working knowledge of git and Github
1. Know a fair bit of [docker](https://geshan.com.np/blog/categories/docker/), maybe even [multi-stage build](/blog/2019/11/how-to-use-docker-multi-stage-build/)
1. Have a working Google cloud account (they give you [$300 credit](https://cloud.google.com/free/) free for 1 yr, no reasons not to have an account)

This post is not going to be a detailed one like the last one about [Laravel on Google Cloud Run](https://geshan.com.np/blog/2019/10/get-laravel-6-running-on-google-cloud-run-step-by-step-with-ci/). If you are fairly new Git or Docker, please do read the above-mentioned post thoroughly.

## Steps

Before going to the steps, the repo is hosted on my [Github](https://github.com/geshan/symfony-demo-google-cloud-run) and it is open-source of course. It might look insanely easy but we will go through some details after the steps. So let’s get started now:

### 1. Go to the repo

Navigate to the open-source [Github](https://github.com/geshan/symfony-demo-google-cloud-run) repo. That is a very easy step, isn’t it? :)

<img class="center" src="/images/generic/loading.gif" data-echo="/images/symfony-on-google-cloud-run/01github-repo.jpg" title="Github repo with Symfony demo app dockerized and ready for Google Cloud Run" alt="Github repo with Symfony demo app dockerized and ready for Google Cloud Run">

### 2. Click on the Google Cloud button

Then click on the `Run on Google Cloud` blue button, as shown below: 02google-cloud-button

<img class="center" src="/images/generic/loading.gif" data-echo="/images/symfony-on-google-cloud-run/02google-cloud-button.jpg" title="Just click the Google Cloud button and see it roll" alt="Just click the Google Cloud button and see it roll">

### 3. Choose correct settings on Google cloud CLI

After that, given you are logged into your Google account and have Google cloud setup with 1 or more projects, click `Proceed`. You might need to wait a bit, after that

1. Choose the project – `Choose a project to deploy this application`
1. Choose the region – `Choose a region to deploy this application`, I usually choose `us-central-1`

Then wait for the container to be built and deployed, you can see my process below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/symfony-on-google-cloud-run/03deploy-symfony.jpg" title="Steps to deploy Symfony on Google Cloud Run" alt="Steps to deploy Symfony on Google Cloud Run">

If everything goes fine on your Google Cloud Shell, you will see HTTPs URL you can go to in order to see your Symfony demo app running like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/symfony-on-google-cloud-run/04symfony-running.jpg" title="Symfony running on Google Cloud Run" alt="Symfony running on Google Cloud Run">

One issue with this setup is that data will not be saved if you click around and add new posts. This happens because the data is saved in the SQLite file, as it is not persisted new containers get the old file and you get the same data pushed in the repo.

## So what just happened?

There are some things you need to consider for this automagic deployment of the Symfony App. Let’s look at what just happened above:

1. The Symfony Demo app has been dockerized, have a look at this [Dockerfile](https://github.com/geshan/symfony-demo-google-cloud-run/blob/master/Dockerfile) and the [Apache config](https://github.com/geshan/symfony-demo-google-cloud-run/blob/master/docker/000-default.conf) too. The Dockerfile uses multistage build, on stage to install dependencies with composer and another one with Apache to run the application.
1. If you want to run it locally, just run `docker-compose up` then go to `http://localhost:8080`. [8080](https://cloud.google.com/run/docs/reference/container-contract) is the required port needed for Google Cloud Run.
1. Thanks to the [Google Cloud Run button](https://cloud.google.com/blog/products/serverless/introducing-cloud-run-button-click-to-deploy-your-git-repos-to-google-cloud) and the Cloud Shell script that does the automagic deployment.

To make the most out of this tutorial, you can fork the [repo](https://github.com/geshan/symfony-demo-google-cloud-run), add your own button then explore more with it.

## Conclusion

Running Symfony entails some tricky configuration :) so the Dockerized version is a breeze to run. I really believe that Google [Cloud Run](/blog/2019/11/why-use-google-cloud-run-5-compelling-reasons/) is a superior product if you know how to dockerize your web app and run it on port 8080 you can get amazing scalability with unparallel ease to make it run. I have written a much longer guide to run [Laravel on Google Cloud Run](https://geshan.com.np/blog/2019/10/get-laravel-6-running-on-google-cloud-run-step-by-step-with-ci/) too.

> I would recommend Cloud Run for any pet project or even production application.