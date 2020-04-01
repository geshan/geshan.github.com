---
layout: post
title: "How to efficiently monitor Crons with a simple bash trick"
date: 2019-11-27 15:40:30 +0000
comments: true
categories: 
- Software Engineering
cover: /images/monitor-crons/monitor-crons.jpg
pagetitle: How to effectively monitor crons with a simple bash trick
description: Follow this example to monitor crons efficiently with a bash trick
keywords: bash, cron, monitor cron
---
If you have worked with software systems long enough you have surely worked with crons. Cron is a time-based task scheduler in UNIX-like operating systems. We use to run some task/script periodically, for example, every day at 9:30 AM.

Setting up and running crons has changed in the past years from a crontab command to now running it on Kubernetes as CronJob, still, the basics remain the same and it is very important to monitor cron jobs. You don't want to wake up to some client not being paid because the CronJob did not run.

This post is going to highlight one cool bash trick which simplifies cron monitoring. The solution is language and framework agnostic as it is done in the command itself. Let's dive deeper into this way of monitoring crons.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/monitor-crons/monitor-crons.jpg" title="Use a bash trick to efficiently monitor crons" alt="Use a bash trick to efficiently monitor crons">

<!-- more -->

## Monitoring Crons is important

We were working on a project that had two CronJobs one running every 6 hours and the other one running every fortnight. This project was done in Symfony and the crons were set up as Symfony commands executed on Kubernetes as CronJob. 
As we monitor our applications with New Relic, we monitor and get notified if the Crons don't run in time with OpsGenie Heartbeat Monitoring. 
You can use Healthchecks or Cronitor, anything that suits your needs, the main thing is getting an alert when crons don't run in the expected time and frequency.
So all good till now, but when I looked into the code to ping OpsGenie I saw multiple ways of doing it. Mostly it was like get the latest OpsGenie API/SDK and call it from the application. Someone had even built a wrapper library to do this heartbeat ping and other things. 

## The Problem

Following were the problems with this approach:

* The solution was to call the Heartbeat REST API from the application which resulted in extra dependencies and extra code for the application
* Calling the API after a successful cron run was language/framework-specific, for example, the code written for PHP won't work for NodeJs/Typescript.
* If the API was to upgrade to a new version a different set of change would be needed to each application as the call depended on the application code

## The Solution

The solution to all the above problems is very simple, use bash with the && operator, so that the ping only runs if the cron run is successful.

> "&&" is used to chain commands together, such that the next command is run if and only if the preceding command exited without errors (or, more accurately, exits with a return code of 0). - Source

We ran our Symfony cron command with ping to OpsGenie like below:

```
bin/console our-cron:command \
&& curl -X GET 'https://api.opsgenie.com/v2/heartbeats/our-cron/ping' --header 'Authorization: GenieKey '"$OPSGENIE_API_KEY"''
```

We did a bit different variation to the above command and created a bash script where the command and name of the heartbeat were sent as parameters.

#### Another SAAS

We are using OpsGenie but there are other SAAS providers in the cron monitoring space too. One you can use for a single monitor for free is [Cronitor.io](https://cronitor.io/). In addition to [cron monitoring](https://cronitor.io/
cron-job-monitoring), Cronitor provides simple [uptime monitoring](https://cronitor.io/uptime-monitoring) for websites and APIs. It also has a handy CLI tool to import your existing crontab and send it to Cronitor.

### So what issues did it solve?

* There is no need to pull an extra library/package just to do a curl. Like OpsGenie PHP client which I had considered pulling in initially :)
* The solution is language/framework agnostic. As long as the docker container has bash/sh or any shell (which it generally has) the solution works for PHP, NodeJs (typescript), Python or even GoLang.
* If the API upgrades the change is the same across all repositories.

## Conclusion

Try to look for solutions out of the box. If we were to solve the problem as it was done earlier we would have either pulled in a new library or built our own OpsGenice Client of some sort. It would solve the problem but give us more dependencies and code to maintain for the future.

> When trying to find a fix for a problem, step back and think of solutions that are not very obivious.
