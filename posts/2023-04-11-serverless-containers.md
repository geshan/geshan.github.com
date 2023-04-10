---
layout: post
title: A comprehensive guide to Serverless Containers includes 3 services to run them
date: 2023-04-11T23:47:52.000+11:00
comments: true
tags:
- devops
- Docker
- Google Cloud Run
- Web Development
cover: "/images/serverless-container/01serverless-containers.jpg"
pagetitle: A comprehensive guide to Serverless Containers includes 3 services to run them
description: In this extensive guide to Serverless Containers you will learn what they are and 3 services by the Big 3 Clouds to run them including Google Cloud Run.
keywords: serverless containers, containers serverless
---
Serverless containers are one of the easiest and most useful ways to run your applications in the cloud with minimal effort. On top of being simple and quick to get started, serverless containers are affordable and you can use any language/framework. In this post, you will learn about serverless containers (not serverless vs containers) and the 3 services that run them, let’s get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/serverless-container/01serverless-containers.jpg" title="Learn about Serverless Containers with this comprehensive guide" alt="Learn about Serverless Containers with this comprehensive guide">

## Table of contents

* [What is serverless?](#what-is-serverless%3F)
    * [FaaS is one aspect of serverless](#faas-is-one-aspect-of-serverless)
* [Containers, what are they?](#containers%2C-what-are-they%3F)
* [Serverless Containers](#serverless-containers)
    * [The sweet spot](#the-sweet-spot)
* [Components for running serverless containers](#components-for-running-serverless-containers)
* [Services offering serverless containers](#services-offering-serverless-containers)
    * [Google Cloud Run](#google-cloud-run)
    * [AWS Fargate](#aws-fargate)
    * [Azure Container Instance](#azure-container-instance)
* [Quick comparison of the Big 3](#quick-comparison-of-the-big-3)
* [Advantages of using serverless containers](#advantages-of-using-serverless-containers)
* [Conclusion](#conclusion)

## What is serverless?

Before diving into serverless containers, let’s understand what serverless means in general. Serverless computing or simply serverless means different things to different people. As per [Cloudflare](https://www.cloudflare.com/en-gb/learning/serverless/what-is-serverless/), serverless computing is:

> Serverless computing is a method of providing backend services on an as-used basis. Servers are still used, but a company that gets backend services from a serverless vendor is charged based on usage, not a fixed amount of bandwidth or number of servers.

So it is clear that in the serverless model, the provider takes care of the server management and capacity planning. As the consumer, you use it as a pay-per-use. This equates to two things, first one is, the developers can focus on writing and deploying code without worrying about underlying infrastructure and scaling it. The second and most important one is the cost is linear to the usage, which means if you use the compute power/bandwidth once you pay 1 cent for instance if it is used 100K times you pay 1K dollars.

With this concept, many services are working the [serverless model](https://aws.amazon.com/serverless/) like Amazon S3, Amazon DynamoDB, Amazon API Gateway, etc. You pay as much as you used it. In the case of a database like DynamoDB on-demand capacity, it is not provisioned when not used so you pay almost nothing, when there are read/write operations then you pay as per the number of reads or write operations. This is a good thing and a bad thing depending on how you look at it. Then in addition to these “serverless” backends as a service there is the infamous Function as a Service (FaaS) which is improperly synonymous with serverless as discussed next.

### FaaS is one aspect of serverless

Now with the knowledge of what serverless is, you will be more enlightened to understand that Function as a Service (FaaS) is only one aspect of the whole serverless spectrum. But it is “improperly” used as a synonym for serverless. With FaaS, developers write small, single-purpose functions that are executed in response to events. The cloud provider handles all the infrastructure required to run the functions, including scaling, and availability, The events can be an HTTP trigger, a file uploaded to storage like an S3 bucket, a message added to a queue, etc. While FaaS is a powerful tool, it does have some limitations. It's not suitable for all types of applications and can be expensive for long-running tasks. 

The most popular FaaS services offered by the big 3 cloud providers are [Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) by AWS, [Azure Functions](https://azure.microsoft.com/en-au/products/functions) by Microsoft Azure and [Cloud Functions](https://cloud.google.com/functions) by Google Cloud Platform (GCP). Below is a quick comparison of all 3 FaaS offerings by the big 3 Cloud providers:

<img class="center" loading="lazy" src="/images/serverless-container/02serverless-containers-faas.jpg" title="Quick comparision of FaaS offerings by the big 3 clouds AWS, Azure and GCP" alt="Quick comparision of FaaS offerings by the big 3 clouds AWS, Azure and GCP">

All of them are charged by pay per invocation model. The drawback of Function as a Service (FaaS) is that all the infrastructure is brought up and torn down for each request which causes the [cold start](https://dashbird.io/blog/can-we-solve-serverless-cold-starts) problem. The main takeaway here is Serverless > Functions as a Service (FaaS). In the next section, you will learn about containers.

## Containers, what are they?

It is safe to say that containers were made mainstream by Docker. It was Docker who successfully democratized a technology that was already used by big companies like Google years back. As per [Docker](https://www.docker.com/resources/what-container/):

> A container is a standard unit of software that packages up code and all its dependencies so the application runs quickly and reliably from one computing environment to another.

Thereby it is a [standard](https://opencontainers.org/) and you as a software engineer ship the whole stack (your code, its dependencies, the language runtime as well as the Operating System) when you ship changes. [Docker](https://www.docker.com/) is the most popular container technology but there are other players like [Rocket (rkt)](https://www.redhat.com/en/topics/containers/what-is-rkt) too which is not that popular.

Containers are a lightweight way of packaging software that allows applications to run reliably in different computing environments. Containers isolate applications from the underlying system, providing consistent runtime environments across different computing environments, including development, testing, and production. 

> Containers also make it easy to package and deploy applications, allowing developers to build, ship, and run applications anywhere.

Containers work by virtualizing the operating system, allowing multiple containers to run on a single host system without interfering with each other. Each container has its own file system, networking, and computing resources. This makes it easy to run multiple applications on the same host system, without the need for separate virtual machines. As they are very lightweight and fast you can potentially run hundreds (if not thousands) of containers on a host machine.

In the case of Docker, the package made with the underlying operating system, language runtime, and code (both third-party and your custom code) following a recipe called Dockerfile turns into a static image (also called Docker Image). When these images are run they are called Docker Containers. It can be seen visually below:

<img class="center" loading="lazy" src="/images/serverless-container/03docker-build-run.jpg" title="Visual representation of Docker build to image and run as container" alt="Visual representation of Docker build to image and run as container"> 

Containers help your application become cloud provider agnostic (with the use of things like Kubernetes) and it helps with the [development side](/blog/2018/10/why-use-docker-3-reasons-from-a-development-perspective/) too. It is safe to say [Docker and containers have changed the way we software engineers work](/blog/2018/11/4-ways-docker-changed-the-way-software-engineers-work-in-past-half-decade/). They provide a level of abstraction between the application and the infrastructure, making it easy to move an application between different environments without having to worry about dependencies or configuration. In the next part, you will learn about serverless containers.

## Serverless Containers

Amazon says [Serverless Containers are the Future of Container Infrastructure](https://aws.amazon.com/blogs/apn/serverless-containers-are-the-future-of-container-infrastructure/), so let’s understand what they are. As per [Cloud Native wiki](https://www.aquasec.com/cloud-native-academy/serverless-architecture-platforms-benefits-best-practices/serverless-containers/) by Aqua, Serverless containers means:

> The term “serverless containers” refers to technologies that enable cloud users to run containers, but outsource the effort of managing the actual servers or computing infrastructure they are running on.

Running containers at scale in production is not easy. That is where tools like [Kubernetes](https://kubernetes.io/) come into play. Google’s Kubernetes won the container orchestration war some years back after battling with the likes of Docker Swarm and Apache Mesos. Running and scaling a Kubernetes cluster is not only difficult but requires a different set of skill sets. As a software engineer without a platform or DevOps/SRE team, it might be wiser to not run Kubernetes on Production on your own. This is where Serverless containers shine as you don’t have to provision or manage the infrastructure needed to run, operate and scale the containers.

Serverless containers combine the benefits of serverless computing with the flexibility of containerization. 

> With serverless containers, developers can deploy containerized applications without worrying about the underlying infrastructure. 

This means that developers can focus on writing code, while the cloud provider handles the infrastructure management, including the server, operating system, and container management. 

If your application gets 100s or even 1000s of requests per second the cloud provider running the containers on its serverless containers platform will scale up the number of containers to a higher number as per the upper limit selected by you. There are configurations to set the right amount of resources (CPU and memory) you can set per running container. 

> There is no fine-grained control of the resource metrics like 80% CPU usage or 70% memory consumption to scale the containers up or down that is usually managed by the cloud service provider for you. 

Serverless containers also provide a more cost-effective solution for running containerized applications than traditional container deployment models. Because they are billed on the invocation basis you pay for the time your application uses the resources which can be 0 if the application doesn’t get any traffic. And 0 containers = 0 costs as it is serverless and pay per use. But if you were to run a Kubernetes cluster there will be a minimum cost for the nodes that have to be up 24/7 even if the is no traffic. 

> In addition to that, you are not bound to a set list of runtime environments like Python, Javascript, and others. If you want to run Rust, R, or even Pascal it is possible with containers and thereby possible with serverless containers too.  

In the next section, you will know about the sweet spot serverless containers hit.

### The sweet spot

Software engineering teams started to move away from real hardware racked in the server room to multiple virtual machines put into the same hardware. This gave them full control as they could SSH into the machine as the root user and install or change anything they needed. On the other side of this cloud spectrum is serverless Functions (FaaS) where the software engineer only writes code and deploys it as a serverless function. The engineer has no control over the execution model, resources, and how the function scales when it gets many requests. Faas provides a very high level of ease and abstraction with a focus on the code for software engineers.

Besides containers on that spectrum lies containers that give a bit less control than VMs but also provide a good degree of ease and abstraction. Similarly, Platform as a Service (Paas) sits on the other side of the spectrum with higher ease and abstraction and lower control. 

The sweet spot for both control and ease comes with serverless containers. 

> With serverless containers, the software engineer can still have control of the operating system, the language runtime and its versions, etc as the application is containerized. 

Along with that control, the engineer doesn’t need to worry about scaling and resources to a degree with serverless containers giving it the needed points for ease and abstraction too. You can understand this comparison and the spectrum visually as follows:

<img class="center" loading="lazy" src="/images/serverless-container/04serverless-containers-sweet-spot.jpg" title="Serverless containers sweet spot of both control and ease" alt="Serverless containers sweet spot of both control and ease">

With modern serverless container services like Google Cloud run you can also run long-running tasks like a cron job with [Cloud Run Jobs](https://cloud.google.com/run/docs/create-jobs). In the next section, you will learn about the components needed for running serverless containers.

## Components for running serverless containers

To run containers in a production environment you will need some components to work together. First of all, you will need your application to be containerized (read Dockerized) with a Dockerfile that defines the steps to create the container image. Next, similar to GitHub you will need a container registry to push the container image too. The container registry can be public like [Docker Hub](https://hub.docker.com/)’s public version or a private one like [Google container registry](https://cloud.google.com/container-registry) or [AWS Elastic Container Registry](https://aws.amazon.com/ecr/).

When the application is deployed, the deploying command will pull the image from the registry and run it. This is where you can run your container images in [Kubernetes](https://kubernetes.io/) as [pods](https://kubernetes.io/docs/concepts/workloads/pods/) within services. Kubernetes is the layer and orchestrator that takes care of scaling your containers/pods depending on the auto-scaling configuration provided.

The other way to run your images as containers without the need to spin up a full Kubernetes cluster is to host them in one of the serverless container services. You can see the full flow in the image below:

<img class="center" loading="lazy" src="/images/serverless-container/05docker-run.jpg" title="Visual representation of Docker build to image push to registry, pull and run on a platform" alt="Visual representation of Docker build to image push to registry, pull and run on a platform">

This leads us to the services providing serverless container hosting from the big three cloud providers that are discussed next.

## Services offering serverless containers

Many cloud providers are offering serverless container platforms. These platforms allow developers to deploy containerized applications without worrying about the underlying infrastructure, and benefit from the scalability and cost-effectiveness of serverless computing. For this post, the concern is mostly on the big three clouds AWS, Microsoft Azure, and Google Cloud Platform. 

### Google Cloud Run

In my experience, [Cloud Run](https://cloud.google.com/run) service inside the Google Cloud Platform is the best serverless containers platform with unbeatable developer experience. You can deploy a containerized or a [build pack-supported application](https://cloud.google.com/docs/buildpacks/build-application) with a click of a [button](https://cloud.google.com/blog/products/serverless/introducing-cloud-run-button-click-to-deploy-your-git-repos-to-google-cloud). Google Cloud platform defines Cloud Run as:

> Cloud Run is a managed compute platform that lets you run containers directly on top of Google's scalable infrastructure.

Google Cloud Run is serverless so it abstracts away all infrastructure management. You can focus on what matters most, building great applications. With Cloud Run, you can deploy  containers to handle incoming requests, because it is serverless you only pay for the exact duration of requests. 

In addition to that you can specify the number of maximum containers, your application should scale up to in case of a higher load. Similarly, you can also specify the number of minimum containers, which can be 0 making it serverless and pay-per-use. You can read about more [reasons to use Google Cloud Run](/blog/2019/11/why-use-google-cloud-run-5-compelling-reasons/) for your applications.

If Cloud Run can handle the scale of [Ikea](https://www.gcppodcast.com/post/episode-236-ikea-retail-ingka-group-with-matt-lawson/) and [Mail Chimp](https://cloud.google.com/blog/products/serverless/a-developers-guide-to-new-features-in-cloud-run), it can surely handle your workloads. You can also read up on [how to get a working URL with Google Cloud Run](/blog/2019/11/from-0-to-working-serverless-url-for-a-containerized-app-with-google-cloud-run-slides-and-video/) in a matter of minutes. Amongst other great [features](https://cloud.google.com/run#all-features), Google Cloud Run also provides [custom domain names](https://cloud.google.com/run/docs/mapping-custom-domains) with HTTPs and [gradual rollouts with percent traffic](https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration) out of the box. 

You can view some of the amazing features in this FireShip [video](https://youtube.com/watch?v=3OP-q55hOU). Google Cloud Run is [based](https://cloud.google.com/blog/products/serverless/knative-based-cloud-run-services-are-ga) on [Knative](https://knative.dev/docs/). Knative is an open source solution to run serverless containers. In the next section, you will learn about AWS Fargate. 


### AWS Fargate

It will not be an overstatement to mention that Amazon AWS and its services are complicated. Among the hundreds of AWS services, [AWS Fargate](https://aws.amazon.com/fargate/) also lets you run containers in a serverless way, as per AWS:

> AWS Fargate is a serverless, pay-as-you-go compute engine that lets you focus on building applications without managing servers. AWS Fargate is compatible with both Amazon Elastic Container Service (ECS) and Amazon Elastic Kubernetes Service (EKS).

So, AWS Fargate is a serverless compute engine for containers that allows you to run containers without having to manage servers or clusters. With Fargate, you can deploy Docker containers to AWS with ease. Fargate also offers automatic scaling, ensuring that your applications are always available and performing optimally.

The main website states that Farget is useful for Web apps, APIs, and Microservices. It can run and scale containers, and also supports AI and ML training applications. But, the main issue here is the mention of ECS and EKS. If those details of the infrastructure are surfaced then it defeats the whole purpose of being able to run containers in a serverless fashion without needing to dabble with infrastructure.

After watching this [video](https://www.youtube.com/watch?v=WsvuIxaCQGg) about Fargate, it does show up the Cluster, VPC, and details of EC2, security group, and other things. There is a segregation of cluster, service, and task. At this point, it is not as easy to use as Google Cloud run which is classic AWS. In the next part, you will know about Azure Container Instances (ACI)

### Azure Container Instance

Azure Container Instances is a fully managed serverless container solution that allows you to easily run containers without managing servers or clusters. With [Azure Container Instances](https://azure.microsoft.com/en-us/products/container-instances/), you can deploy containers quickly and easily, without the need for infrastructure management. The official docs term ACI as:

> Azure Container Instances is a solution for any scenario that can operate in isolated containers, without orchestration.

As per this [video](https://youtube.com/watch?v=7G_oDLON7Us) by Microsoft the Azure Container Instances (ACI) demo has a full-on YAML file to define the container. To be honest, the configuration does not look easy to set up.

One of the key benefits of Azure Container Instances is its simplicity. You can deploy containers with just a few clicks, using the Azure portal, Azure CLI, or Azure Resource Manager templates. This makes it easy to get started with container deployment, even if you have limited experience with serverless computing. Scaling is the main issue with Azure container instances. As per the official [documentation](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-overview): “For scenarios where you need full container orchestration, including service discovery across multiple containers, automatic scaling, and coordinated application upgrades, we recommend Azure Kubernetes Service (AKS).” This translates to, ACI does not scale your containers it is more like a [Docker Run](/blog/2022/05/docker-commands/#docker-run) command on the cloud, for scaling containers use AKS.

With all of this, it is up to you to choose the right service to host your serverless containers on a Container as a Service (CasS) platform. There are other services too like [Yandex serverless containers](https://cloud.yandex.com/en/services/serverless-containers) and Alibaba’s [Elastic Container Instances](https://www.alibabacloud.com/product/elastic-container-instance) but these type of services cannot be tagged as battle tested. In the next section, you will know about a video that compares the above three offerings.

## Quick comparison of the Big 3

This [video](https://youtube.com/watch?v=Jq8MY1ZGjno) with a comparison of Google Cloud Run, AWS Fargate, and Azure Container Instances (ACI) is a great one. Keep in mind it is from Aug 2020, so things should have changed in the past 3 years. The video is below:

{% youtube "Jq8MY1ZGjno" %}

It would be recommended that you do not miss the [summary](https://youtube.com/watch?v=Jq8MY1ZGjno?t=742), [recap](https://youtube.com/watch?v=Jq8MY1ZGjno?t=790) and [comparison](https://youtube.com/watch?v=Jq8MY1ZGjno?t=910). 

> He concludes that Google Cloud Run is the best to host serverless containers. 

As it can scale to 0 and up easily and you don’t need to manage any underlying infrastructure at all. In the next section, you will learn about the advantages of using serverless containers.

## Advantages of using serverless containers

Below are some advantages of using serverless containers in general and with Google Cloud Run:

* There is no need to learn and new paradigm or framework. As long as your application can be containerized and stateless (as serverless containers don’t keep state)  it can be run as serverless containers. Also, you are not constrained by the limited runtimes provided by FaaS.
* The infrastructure and scaling are generally abstracted away from you. You need to set the resources correctly and specify the minimum and the maximum number of containers you need for your application depending on the volume of requests. So, you also get automatic scaling for free.
* You get a custom domain name and HTTPs URL out of the box in case you are using Google Cloud Run. You also get gradual rollouts with Cloud Run.
* Depending on the Cloud provider, serverless containers play well with the other great services provided by the cloud provider. For instance, Google Cloud run works well with [Cloud Build](https://cloud.google.com/build) and you can push your container easily to [Google Container Registry](https://cloud.google.com/container-registry). You also get logs out of the box with [Google Cloud logging](https://cloud.google.com/logging) for your containers with 0 configs needed.
* If your application/service has less traffic, with scaling to 0 the cost of running serverless containers is minimal. Especially with Google Cloud Run’s amazing [pricing](https://cloud.google.com/run/pricing) you get “2 million requests free per month” which means you can run your hobby projects for $0 a month.

As you are using containers, they are portable. If you want to move to a full-fledged Kubernetes cluster later that can be done easily. The lock-in is less with containers in general. 

## Conclusion

In conclusion, serverless containers offer a powerful and flexible way to build and deploy applications in the cloud. By combining the benefits of containers with the ease of use and low operational overhead of serverless computing, developers can focus on building great applications without worrying about the underlying infrastructure. You also learned about the components of running containers in general and serverless containers.

> With several cloud providers offering serverless container platforms, including Google Cloud Run, AWS Fargate, and Azure Container Instance, it's easier than ever to get started with serverless containers and unlock their many benefits.

Even with the serverless container services Google Cloud Run shines among the big 3 cloud offerings. It is simple, easy to use, abstracts the underlying infrastructure, and scales containers easily to 0. 

> If you want to dabble with serverless containers Google Cloud Run is your best option.

Keep exploring! Don’t walk, Cloud Run to serverless containers.
