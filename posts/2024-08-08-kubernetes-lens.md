---
layout: post
title: "Kubernetes Lens: the simple yet powerful K8s IDE"
date: 2024-08-08T22:40:37.000+11:00
comments: true
tags:
- Software Engineering
- Kubernetes
- devops
cover: "/images/kubernetes-lens/01kubernetes-lens.jpg"
pagetitle: "Kubernetes Lens: the simple yet powerful K8s IDE"
description: "Kubernetes lens is the missing tool in your K8s aresenal, in this post learn about it's features and how to use it."
keywords: kubernetes lens, lens kubernetes, k8s lens, lens k8s, kubernetes ide, k8s ide, kubernetes dashboard, k8s dashboard
---
Kubernetes, the de-facto container orchestrator, has revolutionized how we deploy and
manage applications. With Kubernetes, you describe your desired state and it takes care of the rest, ensuring your applications run smoothly across a cluster of machines. However, working with Kubernetes can sometimes be daunting for beginners and even seasoned professionals. That's where Kubernetes Lens comes in as a path-breaker. In this post, you will learn about Kubernetes Lens, and how it has simplified working with Kubernetes. Let’s get going!

<!-- more -->

<img class="center" src="/images/kubernetes-lens/01kubernetes-lens.jpg" title="Kubernetes Lens: the simple yet powerful K8s IDE" alt="Kubernetes Lens: the simple yet powerful K8s IDE">

## Table of contents

- [Kubernetes Lens](#kubernetes-lens)
- [Tools used in the past](#tools-used-in-the-past)
  - [Kubectl](#kubectl)
  - [Kubernetes Dashboard](#kubernetes-dashboard)
  - [Rancher](#rancher)
- [Kubernetes Lens is simple](#kubernetes-lens-is-simple)
- [Kubernetes Lens handy use cases](#kubernetes-lens-handy-use-cases)
  - [Easy-to-see workloads](#easy-to-see-workloads)
  - [Viewing logs and running shell commands in a pod is easy](#viewing-logs-and-running-shell-commands-in-a-pod-is-easy)
  - [Checking the crons and their runs is simple](#checking-the-crons-and-their-runs-is-simple)
- [Conclusion](#conclusion)

## Kubernetes Lens

Kubernetes is complicated but tools to explore it do not need to be complicated. In K8s, you have pods, deployments, services, namespaces, config maps, secrets, and a multitude of other resources to manage. While [kubectl](https://kubernetes.io/docs/reference/kubectl/) is a powerful tool to navigate this Kubernetes jungle, it can sometimes feel overwhelming for beginners and even seasoned professionals. Imagine you have to manage a Kubernetes cluster with 10s of deployments and 100s of pods, trying to find out why a specific Pod is not working or what is the exact CPU and memory consumption of a deployment can be a daunting task with `kubectl`.

Enter [Kubernetes Lens](https://k8slens.dev/), a powerful and user-friendly IDE designed to streamline your Kubernetes experience. Lens is the missing tool in your Kubernetes toolkit. It provides a visually appealing interface to manage and monitor your Kubernetes clusters, simplifying complex tasks and making your Kubernetes journey much easier. You can see how simple the user interface is below (taken from official [docs](https://docs.k8slens.dev/)/GitHub repo)

<img class="center" loading="lazy" src="/images/kubernetes-lens/02kubernetes-lens-ui.jpg" title="Kubernetes Lens in action" alt="Kubernetes Lens in action">

Kubernetes Lens brands itself as "The Kubernetes IDE" and it is [open-source](https://github.com/lensapp/lens), available for Mac, Windows, and Linux. Developed by Mirantis, they have a very good [getting started guide](https://www.mirantis.com/blog/getting-started-with-lens) for Kubernetes Lens. You can also follow the [official guide](https://docs.k8slens.dev/getting-started/install-lens/) from their docs. The main thing to take notice of here is licensing, it has two types of licenses. Lens personal can be used by individuals, education, and startups (less than $10 million in annual revenue or funding) for free. The pro and enterprise licenses are geared towards larger businesses, you can find the latest pricing on their [pricing page](https://k8slens.dev/pricing). They claim:

> With over 1 million users, Lens is the most popular Kubernetes IDE in the world.

Lens has also announced useful new features for the [Lens 2024](https://k8slens.dev/blog/announcing-lens-2024) edition. I have used other tools to manage Kubernetes in the past, those will be discussed in the next section.

## Tools used in the past

Before you delve into the specifics of Kubernetes Lens, let's take a trip down memory lane and look at some of the tools I have used to work with Kubernetes before using Lens. It will also give you a better idea of how things have evolved in the past few years. I have used Kubernetes Lens for more than 2 years now, but before using Kubernetes Lens I have used other tools like:

### Kubectl

[Kubectl](https://kubernetes.io/docs/reference/kubectl/), the command-line interface (CLI) for Kubernetes, has been the go-to tool for interacting with Kubernetes clusters for many years. It is a powerful and flexible tool that gives you complete control over your cluster. With Kubectl, you can:

* Manage deployments, services, and pods
* View logs, exec into containers, and troubleshoot applications
* Configure your cluster and its resources
* Deploy and manage applications

However, Kubectl can have a steep learning curve, especially for beginners. It requires a good understanding of Kubernetes concepts and commands. Trying to find the log of a pod that restarted minutes ago can be a daunting task with Kubectl. Imagine remembering all this to get logs from multiple pods of a deployment:

```bash
kubectl -n <namespace> logs -f deployment/<app-name> --all-containers=true --since=10m
```

It is a great tool and I still use it at times but a GUI is much easier especially when you start and Kubernetes Lens gives that.

### Kubernetes Dashboard

[Kubernetes Dashboard](https://kubernetes.io/docs/tasks/access-application-cluster/web-ui-dashboard/) is a web-based user interface for Kubernetes. It provides a visual representation of your cluster's resources and allows you to perform basic management tasks. With Kubernetes Dashboard, you can:

* View the status of your cluster and its resources
* Deploy and manage applications
* View logs and events

However, Kubernetes Dashboard is not as powerful as Kubectl, and it doesn't offer all of the same functionality. It can also be a bit clunky and slow. Another issue with the Kubernetes dashboard is that it runs as a deployment in your cluster and you need to forward the
port to access it from your machine with `kubectl port-forward service/kubernetes-dashboard 8443:443 -n kubernetes-dashboard`. There have been some [security issues](https://securitylabs.datadoghq.com/cloud-security-atlas/vulnerabilities/exposed-kubernetes-dashboard/) due to the wrongly configured Kubernetes dashboard. I used Kubernetes Dashboard circa 2016-2017, but later I did not use it much.

### Rancher

[Rancher](https://www.rancher.com/) is an open-source container management platform. It provides a user-friendly interface for managing Kubernetes clusters, as well as other container orchestration tools like Docker Swarm and Apache Mesos. With Rancher, you can:

* Deploy and manage Kubernetes clusters
* Monitor and manage your applications
* Set up role-based access control (RBAC)

Rancher is a good choice for organizations that need to manage multiple Kubernetes clusters or that are using a mix of container orchestration tools. If you need to manage multiple clusters or
different container orchestration tools Rancher is a good fit for your need. It does take up a lot of resources to run.  I used Rancher from 2018-2021, it was a good tool and did the job well.

There are other tools to navigate Kubernetes like [K9s](https://k9scli.io/), [Seabird](https://getseabird.github.io/), and [K8Sutdio](​​https://k8studio.io/) but I have not used them to comment about them.

## Kubernetes Lens is simple

Kubernetes Lens simplifies working with Kubernetes by providing a unified and intuitive interface to manage all aspects of your cluster. It offers a rich set of features, including:

* Cluster Management: Manage multiple Kubernetes clusters from a single interface.
* Resource Visualization: View your cluster's resources, including deployments, pods, and services, in a clear and visually appealing way.
* Real-time Monitoring: Monitor the health and performance of your cluster and its resources in real-time.
* Troubleshooting: Diagnose and troubleshoot issues with your applications and clusters.
* Application Management: Deploy and manage applications with ease.

Kubernetes Lens is a powerful tool that can simplify your Kubernetes workflow and boost your productivity. It is easy to use and has a low learning curve, making it ideal for both beginners
and experienced users.

You can customize Lens and it also has [add-ons](https://github.com/lensapp/lens-extensions) for instance the multi-pod logs. In the next section, you will learn about some handy use cases for Kubernetes Lens.

## Kubernetes Lens handy use cases

Now, let's delve into some practical use cases of Kubernetes Lens that will showcase how it can simplify your Kubernetes workflow.

### Easy-to-see workloads

With Kubernetes Lens, you can view all of your workloads, including deployments, pods, and services, in a single view. This makes it easy to see the status of your applications and to quickly identify any issues. To view the workloads for your cluster, click on the "Workloads" tab in the left sidebar:

As you can see, the Workloads view lists all of the deployments, StatefulSets, DaemonSets, Cron Jobs, and Jobs in your cluster. You can filter the list by namespace, name, or status. You can also sort the list by name, creation time, or status.

### Viewing logs and running shell commands in a pod is easy

One of the common tasks you'll need to do when working with Kubernetes is checking the logs of your pods. Kubernetes Lens makes this task easy by providing a built-in log viewer. You can
also tail the logs of a pod to see real-time updates. You can also use the terminal inside the Pod to run shell commands. This makes it easy to troubleshoot issues with your applications.

To view the logs of a pod, click on the pod in the Workloads view, then click on the “Logs” tab. You will see logs like the one below:

<img class="center" loading="lazy" src="/images/kubernetes-lens/03kubernetes-lens-pod-logs.gif" title="Kubernetes Lens with easy navigation and pod logs" alt="Kubernetes Lens with easy navigation and pod logs">

You can also click on the "Terminal" tab to open a [terminal session](https://docs.k8slens.dev/how-to/open-pod-shell/) inside the pod.

### Checking the crons and their runs is simple

In addition to viewing the logs of your pods, you can also check the status of your [Kubernetes cron jobs](/blog/2021/02/kubernetes-cron-job/). Kubernetes Lens provides a dedicated view for cron jobs, which shows you the schedule,history, and status of each cron job. You can also trigger a cron job manually or edit its schedule from the Lens interface.

To view the cron jobs for your cluster, click on the `Cluster Name (Left bar) > Workloads > CronJobs tab` in the left sidebar. It will show you the list of cron jobs with the schedule and other info. You can then select a cron job to see more information about it, including its history, status, and configuration.

There are many features you will like about Lens Kubernetes, please explore it and find the ones you will admire. You can have a look at secrets, replica sets, Horizontal pod scalers (HPA) and many other Kubernetes artifacts.

## Conclusion

Kubernetes Lens is a valuable addition to the toolbox of any software engineer working with Kubernetes. It simplifies complex tasks, provides real-time insights, and enhances productivity, making Kubernetes management a breeze.

If you're not already using Lens, I encourage you to give it a try. It is free to use and available for download on all major platforms for personal use and if the company you work for makes less than $10 million. Happy Kubernetes-ing!
