---
layout: post
title: "Wercker CI the best CI/CD service is free till now, use it [Slides]"
date: 2016-03-09 09:34:08 +04:00
comments: true
tags: 
- deployment
- Talks
- devops
cover: /images/wercker/wercker-talk.jpg
---
On 7-Mar-2016 I did a short talk titled "The best CI/CD service is free (till now), lets use it" at [Namshi](http://namshi.com). It was a quick rundown of [Wercker](https://app.wercker.com/) CI (Continuous Integration) features and how it works.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/wercker/wercker-talk.jpg" title="Wercker CI the best CI-CD service is free till now, use it" alt="Wercker CI the best CI-CD service is free till now, use it">

<!-- more -->

We are currently using [Travis CI](https://travis-ci.com/) for running our tests and our own open source
[Roger](https://github.com/namshi/roger) app to build docker images. The main objectives of the talk were:

* Suggest using Wercker CI to combine running our tests and building our containers in a sequence. This will prevent us from deploying broken builds

* Inform about a free service that can run 2 concurrent workers to build and deploy containers. It supports closed source projects too.

Here are the slides:

<center>
<script async class="speakerdeck-embed" data-id="48dcb61db6eb4a50b03bfea1320bfeb4" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script> 
</center>
<br/>

We discussed how it's still in beta, which might cause issues in the future. 
We also discussed on how Continuous Delivery and Continuous Deployment are different.

Hope you like it :), comments and suggestions are always welcome.
