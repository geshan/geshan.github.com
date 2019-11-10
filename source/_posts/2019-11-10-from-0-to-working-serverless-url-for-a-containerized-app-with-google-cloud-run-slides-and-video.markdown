---
layout: post
title: "From 0 to working Serverless URL for a Containerized app with Google Cloud Run [Slides and Video]"
date: 2019-11-10 02:52:17 +0000
comments: true
categories:
- Technology
- misc
- Programming
- Talks
- Docker
- Google Cloud Run
cover: /images/serverless-containers/01serverless-containers.jpg
---

What is the fastest way to get a working URL for your stateless container in a serverless way? With 0 doubts it is [Google Cloud Run](https://cloud.google.com/run/). Containers and Docker are far more popular than Serverless if we look at [Google Trends](https://trends.google.com/trends/explore?date=2015-01-01%202019-11-10&q=serverless,containers,docker), still there is a meeting point for both these technologies and Cloud Run does a great job to make it super easy to deploy serverless containers in minutes. This post details about a talk I gave at Serverless Days Sydney 2019 about serverless containers.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/serverless-containers/01serverless-containers.jpg" title="Get running HTTPs URL for your Servereless Containers with Google Cloud Run" alt="Get running HTTPs URL for your Servereless Containers with Google Cloud Run">

<!-- more -->

## Talk Abstract

Ever wondered if you could run your web application container on a serverless platform? Wait no further with the recent Google cloud run release it is already possible. You can get from 0 to a working serverless URL for a containerized app in no time. Till now there was nothing that married the goodness of serverless with container's ease. Cloud run also makes deploying new versions very easy with its web interface. This talk will be a run-through of deploying and running a simple nodejs app on Google Cloud Run in a matter of minutes.

## Slides

<script async class="speakerdeck-embed" data-id="7821895f8f434f24ba25a9cbf0def45b" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

Slides are also on [SlideShare](https://www.slideshare.net/geshan/from-0-to-working-serverless-url-for-a-containerized-app-with-google-cloud-run-2).

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/bw3-IPw40Ic" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Some details

Serverless has seen a good amount of growth in recent months/years. Come out of the illusion that serverless is just Function As A Service (FAAS), for example [S3](https://aws.amazon.com/serverless/) is serverless. So be more open to ideas like serverless containers where you don’t need to learn another language/framework/paradigm to get your product faster to your customers. Serverless containers IMHO is that sweet spot with a good level of abstraction as well as having the needed control. Serverless containers enable you to go serverless without the need to be tied to FAAS. 

With Google Cloud, you can take advantage of the whole suite of amazing developer-friendly products like [Google Cloud Build](https://cloud.google.com/cloud-build/), [Container registry](https://cloud.google.com/container-registry/), etc. With the Google Stack Driver offerings like [logging](https://cloud.google.com/logging/), [trace](https://cloud.google.com/trace/) and [debugger](https://cloud.google.com/debugger/) (which you can use to debug apps even on production), etc, it is sure that Google has put that extra effort to make it’s cloud offering more software engineer friendly than other competitors.

## Conclusion

Focus on delivering value to your customers, the faster your customers can use your software the sooner you get the feedback. I did the same setup to run a Node.js app on [GKE](https://cloud.google.com/kubernetes-engine/) with full Kubernetes setup, it took me ~2 days with help from another Devops person. I am not saying Kubernetes doesn’t have a place, it is surely not easy to set up and you can’t get a URL for your container in minutes :). With Cloud Run, I built the container pushed it and deployed it from the web interface. All of it took like 15 mins with the container build time.

> With the Run on Google Cloud Run button, you can deploy any containerized web app on Cloud Run in minutes. Try [Laravel](https://geshan.com.np/blog/2019/10/get-laravel-6-running-on-google-cloud-run-step-by-step-with-ci/) and [Symfony](https://geshan.com.np/blog/2019/11/how-to-run-symfony-on-google-cloud-run-with-the-demo-app-step-by-step-guide/) if you want. In case you are looking for a full CI/CD kind of setup for your serverless containers check out this [currency API repo](https://github.com/geshan/currency-api), the CI/CD part is in the [cloudbuild.yml](https://github.com/geshan/currency-api/blob/master/cloudbuild.yaml) file.
