---
layout: post
title: "Kubernetes cron jobs: a hands-on guide to optimally configured crons"
date: 2021-02-20T22:48:22.000+11:00
comments: true
tags:
- Software Engineering
- Kubernetes
cover: "/images/kubernetes-cron-job/01kubernetes-cron-job.jpg"
pagetitle: "Kubernetes cron jobs: a hands-on guide to optimally configured crons"
description: Need to configure your Kubernetes Cron jobs optimally? Read this 2000+ words guide to do exactly that.
keywords: kubernetes cron job, kubernetes cron jobs, k8s cron job, k8s cron jobs, kubernetes jobs, what is kubernetes
---
Kubernetes is super effective on running cron jobs as well as other web application workloads. Kubernetes cron job is a special kind of Kubernetes job that runs on a time-based schedule. In this post, we will focus on how to run optimally configured cron jobs on Kubernetes.

<!-- more -->

<img class="center" loading="lazy" src="/images/kubernetes-cron-job/01kubernetes-cron-job.jpg" title="Kubernetes cron jobs, lets configure them optimally" alt="Kubernetes cron jobs, lets configure them optimally">

## Table of contents

* [What is Kubernetes?](#what-is-kubernetes%3F)
* [What does Kubernetes do?](#what-does-kubernetes-do%3F)
* [Kubernetes Cron Job](#kubernetes-cron-job)
  * [Prerequisites](#prerequisites)
  * [Kubernetes cron job a simple example](#kubernetes-cron-job-a-simple-example)
  * [Kubernetes cron job an optimal example](#kubernetes-cron-job-an-optimal-example)
  * [Run Kubernetes cron jobs on the fly](#run-kubernetes-cron-jobs-on-the-fly)
* [Conclusion](#conclusion)

## What is Kubernetes?

Kubernetes has multiple definitions, we will first look at a couple of them and then try to simplify them. To start with, the official “what is Kubernetes” page on Kubernetes.io says:

> Kubernetes is a portable, extensible, open-source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation.

It further adds: “The name Kubernetes originates from Greek, meaning helmsman or pilot. Google open-sourced the Kubernetes project in 2014.” There is also a mention of the over 15 years of Google’s experience running production workload at scale.

Wikipedia page on Kubernetes voices:

> Kubernetes (commonly stylized as K8s) is an open-source container orchestration system for automating computer application deployment, scaling, and management. 

It adds: It was originally designed by Google and is now maintained by the Cloud Native Computing Foundation. It aims to provide a "platform for automating deployment, scaling, and operations of application containers across clusters of hosts".

## What does Kubernetes do?

Ok, now let's simplify stuff. If I say this is the container era for deploying workloads like web applications, cron jobs, and anything in between I won’t be wrong. In container land, Docker has won the race and it is the defacto container tool.

Now, with that in mind. we might start small with containers and run one or two apps in containers. This means at any given time we would be running 1-10 containers. Some time passes, we like the idea and other advantages containers provide. We want to run a couple of more workloads/apps in containers. This equates to having 10s of containers running and maybe in production.

More time passes by and more apps are containerized, at this point we have 100s of containers running. Then how do we scale these containers? How do we make service A talk to service B? How do we handle deployments and rollbacks of 10s of applications that have 100s of containers underlined? How do we effectively manage resources (CPU/RAM) and secrets consistently for these 100s of containers?

The answer to all of the above Hows is a “container orchestrator”. Around 2015 there was a slight competition between Kubernetes, Docker Swarm, and Apache Mesos. By mid-2017, Kubernetes comfortably won the race to become the wildly popular de facto container orchestrator as per [Google Trends](https://trends.google.com/trends/explore?date=2015-01-01%202021-01-31&q=kubernetes,docker%20swarm,apache%20mesos) that we can see below:

<img class="center" loading="lazy" src="/images/kubernetes-cron-job/02kubernetes-cron-job-popularity.jpg" title="Kubernetes won the container orchestrator race in mid 2017" alt="Kubernetes won the container orchestrator race in mid 2017">

Even though Kubernetes is flexible, powerful, and ultra-popular. There are some things [Kubernetes is not](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/#what-kubernetes-is-not), it is better to know about them too. In today’s time, Kubernetes has become a well-established platform with a thriving ecosystem around it.

## Kubernetes Cron Job

I have been part of a team that used Kubernetes in Production in [2016](https://www.slideshare.net/geshan/embrace-chatops-stop-installing-deployment-software-larcon-eu-2016/54). Kubernetes is great at managing long-running workloads like web servers or queue consumers. They roughly translate to [Service](https://kubernetes.io/docs/concepts/services-networking/service/), and [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) artifact in Kubernetes lingo. In addition to being great for long-running workloads, Kubernetes does an amazing job in managing Cron Jobs too. 

If we look at a bit of Kubernetes history, Kubernetes Cron Job was called `ScheduledJob`. In [version 1.5](https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.5.md#action-required-before-upgrading) it was renamed to be called Cron Job. In Kubernetes, [Cron Job](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/) is a special kind of a [Job](https://kubernetes.io/docs/concepts/workloads/controllers/job/) that runs on a repeating schedule. The frequency of the Kubernetes Cron Job is written in the familiar [Cron](https://crontab.guru/) format. For example `0 4 * * *` in the cron format means at 4:00 AM every morning. You can read more about the [cron schedule syntax](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#cron-schedule-syntax) if you want.

How would you know if a cron job missed one or more of its schedule? It is better to know more about effective [cron job monitoring](/blog/2019/11/how-to-efficiently-monitor-crons-with-a-simple-bash-trick/) before it slips unnoticed.

### Prerequisites

* You are generally aware of how Kubernetes works and schedules containers as [pods](https://kubernetes.io/docs/concepts/workloads/pods/).
* You know that Kubernetes manages objects and config in a [declarative way](https://kubernetes.io/docs/concepts/overview/working-with-objects/object-management/#declarative-object-configuration).
* The differences between a service, deployment, and [Horizontal Pod Autoscaler](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
* You generally know what [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) is used for in Kubernetes.
* You are aware of usual Kubernetes terms like Node, Kubelet, and the likes.

Next, we will look into a simple Kubernetes cron job example.

### Kubernetes cron job a simple example

We will try a simple Kubernetes cron job example on [Kind](https://kind.sigs.k8s.io/docs/user/quick-start/). At the time of writing Kind version 0.9.0 starts a Kubernetes cluster of version 1.19.1. Below is our simple Kubernetes cron file that uses node:14-alipine image to print the current date.

``` yaml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: print-date
spec:
  schedule: "*/5 * * * *"
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: print-date
            image: node:14-alpine
            imagePullPolicy: IfNotPresent
            args:
            - -e
            - "console.log(new Date().toString());"
          restartPolicy: OnFailure
  ```

Let’s analyze this simple, not so well configure Cronjob.yaml file in detail:

1. We are using the `batch/v1beta1` API version of Kubernetes  API
1. This is a type of `CronJob` Kubernetes resource/workload
1. We have named the cron job `print-date`
1. The Kubernetes cron job is scheduled to execute every 5 minutes -- `*/5 * * * *`
1. We are using the `node:14-alpine` image which will be taken from docker hub by default
1. `IfNotPresent` image pull policy is the default one. It causes the [kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) to pull an image if it does not already exist.
1. Then we pass in `-e` for eval` and `console.log` to print the current date as string. As the command for the node container is `node` this will print the current date and time.
1. The container will be restarted on failure as per the above-defined [restart policy](https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy).

Now, we will schedule this cron job on a local [kind](https://kind.sigs.k8s.io/) Kubernetes cluster to try it out. The kind version I am using at the time of writing this blog post is 0.9.0 which has installed Kubernetes version 1.19.1.

If we save the above file as `cronjob.yaml` we can add it to Kubernetes with the following command:

``` bash
kubectl apply -f cronjob.yaml
```

After the command runs successfully we will see something like:

``` bash
cronjob.batch/print-date created
```

To check if the cron job is created successfully we can execute the following:

``` bash
kubectl get cronjob
```

If all is good, it will print out something as follows:

``` bash
NAME         SCHEDULE      SUSPEND   ACTIVE   LAST SCHEDULE   AGE
print-date   */5 * * * *                    False          0                    <none>          17s
```

After around 5 minutes if we try `kubectl get po | grep print-date` we should see that the cron has run once, like below:

``` bash
print-date-1613818500-88ln6   0/1     Completed   0          97s
```

To see the logs of the cron job that has run we should execute `kubectl logs print-date-1613818500-88ln6` where `print-date-1613818500-88ln6` is the pod name will be different in your case. It will show us something as follows:

```bash
Sat Feb 20 2021 10:55:03 GMT+0000 (Coordinated Universal Time)
```

Let’s recap the commands below:

<img class="center" loading="lazy" src="/images/kubernetes-cron-job/03kubernetes-cron-job-simple.jpg" title="Kubernetes cron job a simple example - not optimally configured" alt="Kubernetes cron job a simple example - not optimally configured">

In the next part, we will look at configuring the Kubernetes Cron Job optimally.

### Kubernetes cron job an optimal example

In the above simple example, let’s scrutinize some things:

1. What if there is an error in the command, will Kubernetes try to schedule the cron job pod many times?
1. How can we clean up the pods that have completed the job?
1. What if our cron job has not finished and it is time to run the next one. We just want to skip the next run as the current job is not finished.
1. We want to temporarily stop the cron job for the time being.
1. We want to see logs of some older cron job runs even if they have failed or succeeded.

The answers to above questions and more lies in the cron job configuration below:

``` yaml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: print-date
spec:
  schedule: "*/5 * * * *"
  jobTemplate:
    spec:
      backoffLimit: 5
      ttlSecondsAfterFinished: 100
      template:
        spec:
          containers:
          - name: print-date
            image: node:14-alpine
            imagePullPolicy: IfNotPresent
            args:
            - -e
            - "console.log(new Date().toString());"
          restartPolicy: OnFailure
      parallelism: 1
      completions: 1
  concurrencyPolicy: "Forbid"
  successfulJobsHistoryLimit: 3
  failedJobsHistoryLimit: 5
```

Let’s analyze some of the new configurations we have added and what do they do:

1. In this definition `backoffLimit` is used to specify the number of retries before marking the job as [failed](https://kubernetes.io/docs/concepts/workloads/controllers/job/#pod-backoff-failure-policy). For example, if the container doesn’t start or the command has an error, we are specifying it should retry 5 times before backing off (marking the job as a failed one).
1. To lessen the pressure on Kubernetes, we can specify TTL seconds after finished. Where the TTL controller cleans up the job and deletes the job in a [cascading manner](https://kubernetes.io/docs/concepts/workloads/controllers/job/#ttl-mechanism-for-finished-jobs)
1. The `parallelism` and `completions` are by default 1, It can be used to have only 1 pod running in [parallel](https://kubernetes.io/docs/concepts/workloads/controllers/job/#controlling-parallelism).
1. Use of `concurrencyPolicy` is very handy if you want to skip the next run if the current cron job pod is still active. Setting it to `Forbid` can enable this. If your job demands that on the next run the current run should be canceled, it can be set to replace [Concurrency Policy](https://kubernetes.io/docs/tasks/job/automated-tasks-with-cron-jobs/#concurrency-policy).
1. Lastly, we set job history for both success and failure. We do this so that those pods are not cleaned up for a certain limit and we can check the logs if we need to.

Below is a screenshot of reapplying the new definition and checking logs from a run from the new configs we added:

<img class="center" loading="lazy" src="/images/kubernetes-cron-job/04kubernetes-cron-job-better.jpg" title="Kubernetes cron job a better example - optimally configured" alt="Kubernetes cron job a better example - optimally configured">

A new command in the above image is:

``` bash
kubectl get jobs --watch
```
It gets jobs and watches it for any changes. As you can see in the screenshot it detected the change when running job `print-date-1613820600` every second for 2-3 seconds.

### Run Kubernetes cron jobs on the fly

Protip: You can force run a Kubernetes Cron Job (outside of the schedule) with a command like below:

``` bash
kubectl create job print-date-try01 --from=cronjob/print-date
```

It is ultra convinient for testing cron jobs as we don't need to wait for the scheduled run.

We are asking Kubernetes to create a job with the name `print-date-try01. The name has to be unique. If you run it the second time use `try02`. We are telling Kubernetes to create the job from our cron job which is `cronjob/print-date`.

We can see an example of the above command as follows:

<img class="center" loading="lazy" src="/images/kubernetes-cron-job/05kubernetes-cron-job-create-job.jpg" title="Kubernetes cron job a demo for create job which is very useful for testing cron jobs" alt="Kubernetes cron job a demo for create job which is very useful for testing cron jobs">

As seen above the cron job even though scheduled for every 5th minute ran at `11:35:54` and `11:36:35` which is outside of its regular schedule. It was possible because we force ran the cron job on a need basis than waiting for the schedule. This command is very handy when testing Kubernetes cron jobs that are scheduled to run say every hour or every day.

## Conclusion

Kubernetes cron jobs are very useful as we have seen. In addition to being great at handling long-running workloads, Kubernetes also does an amazing job of executing jobs and cron jobs alike.

> Configure your Kubernetes cron jobs optimally to run the cron jobs as you expect on a Kubernetes cluster.

Even modern applications have tasks that need to be done with Cron jobs and Kubernetes cron jobs can be exploited for such tasks.
