---
layout: post
title: "How to deploy a container image to Amazon Elastic Container Service (ECS) with Fargate: a beginner’s tutorial [Part 2]"
date: 2025-03-26T22:48:57.000+11:00
comments: true
tags:
- AWS
cover: "/images/amazon-ecs-tutorial/01amazon-ecs-tutorial.jpg"
pagetitle: "How to deploy a container image to Amazon Elastic Container Service (ECS) with Fargate: a beginner’s tutorial"
description: "Learn how deploy a container from a private Amazon ECR repository to ECS with Fargate step-by-step with screenshots."
keywords: amazon ecs tutorial, amazon ecs
---
Amazon Elastic Container Service (ECS) is a fully managed container orchestration service that simplifies the deployment, management, and scaling of containerized applications on AWS. It manages containers without the need to learn Kubernetes. With Fargate, resource management can also be serverless. In this post, you will learn how to deploy a built container image from Amazon Elastic Container Registry (ECR) to Amazon Elastic Container Service (ECS) provisioned with Fargate. The goal is to do the bare minimum to get a URL/IP from a container image on ECR (image built and pushed in [part 1](/blog/2025/03/amazon-ecr-push-image/) of this series), let’s get going!

<!-- more -->

<img class="center" src="/images/amazon-ecs-tutorial/01amazon-ecs-tutorial.jpg" title="Deploy a Docker image from ECR to ECS with resources managed by AWS Fargate" alt="Deploy a Docker image from ECR to ECS with resources managed by AWS Fargate">

## Table of contents

- [What is Amazon Elastic Container Service (ECS)](#what-is-amazon-elastic-container-service-ecs)
- [Create an Elastic Container Service cluster](#create-an-elastic-container-service-cluster)
- [Create a task definition for ECS](#create-a-task-definition-for-ecs)
- [Create an ECS Service](#create-an-esc-service)
- [Important note](#important-note)
- [Conclusion](#conclusion)

## What is Amazon Elastic Container Service (ECS)

[Amazon ECS](https://aws.amazon.com/ecs/) is a fully managed container orchestration service that helps you to more efficiently deploy, manage, and scale containerized applications. You can provision the underlying resource with Fargate or Elastic Compute 2 (EC2) instances. With [Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html), you can use Amazon ECS to run containers without having to manage servers or clusters of Amazon EC2 instances.

Below is a diagram of how Amazon ECS with Fargate fits in the pipeline with AWS CodePipeline, ECR, and other services including Docker in the mix:

<img class="center" src="/images/amazon-ecs-tutorial/02aws-cp-ecr-ecs.jpg" loading="lazy" title="How Amazon ECS with Fargate fits in the pipeline with AWS CodePipeline, ECR and other services" alt="How Amazon ECS with Fargate fits in the pipeline with AWS CodePipeline, ECR and other services">

You can also use the AWS CLI to create the cluster, service, and task definition. For this tutorial, however, you will use the AWS console UI to keep things simple.

## Create an Elastic Container Service cluster

First, you must create an Amazon Elastic Container Service (ECS) cluster to deploy your Docker Image. For this, after logging in to your AWS console with a user having the correct IAM permissions, search for `ecs` on the search bar and click on the `Clusters` link under `Top Features` as seen below:

<img class="center" src="/images/amazon-ecs-tutorial/03search-for-ecs.jpg" loading="lazy" title="AWS console showing search for ecs to go to Elastic Container Service - Clusters" alt="AWS console showing search for ecs to go to Elastic Container Service - Clusters">

After the clusters listing page loads, click on the `Create Cluster` orange button on the top right of the page:

<img class="center" src="/images/amazon-ecs-tutorial/04ecs-create-cluster.jpg" loading="lazy" title="AWS console showing ECS Clusters empty page with Create Cluster button" alt="AWS console showing ECS Clusters empty page with Create Cluster button">

Then, in the form that loads, type in the cluster's name. I am using `dev-cluster` as an example. In the `Infrastructure` section, make sure `AWS Fargate (serverless)` is checked, as follows:

<img class="center" src="/images/amazon-ecs-tutorial/05ecs-create-cluster-form.jpg" loading="lazy" title="AWS console showing ECS create cluster form with name and infrastructure section" alt="AWS console showing ECS create cluster form with name and infrastructure section">

Don’t change any of the other optional settings and scroll to the bottom of the form, where you will see the `Create` button, click that:

<img class="center" src="/images/amazon-ecs-tutorial/06ecs-create-cluster-button.jpg" loading="lazy" title="AWS console showing ECS create cluster form's end section with Create button" alt="AWS console showing ECS create cluster form's end section with Create button">

It might take a couple of minutes for the cluster to be created, and it will show up on the Clusters listing page as seen below:

<img class="center" src="/images/amazon-ecs-tutorial/07ecs-cluster-created.jpg" loading="lazy" title="AWS console showing ECS cluster created called dev-cluster" alt="AWS console showing ECS cluster created called dev-cluster">

Hurray! Your ECS Cluster with Fargate has been created. In the next section, you will create a task definition.

## Create a task definition for ECS

A task is your application's [blueprint](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html). It can be created from a JSON file or the AWS Web UI. There are many parameters for a task, but you will only focus on the important ones for the tutorial's scope.

To create a task definition, click on `Task definitions` as seen in the previous screenshot, it will take you to the `Task definitions` listing page. Here, click on the `Create new task definition` orange button and select `Create new task definition` as seen below:

<img class="center" src="/images/amazon-ecs-tutorial/08ecs-create-task-link.jpg" loading="lazy" title="AWS console showing ECS Create new task definition link on the Task defintions page" alt="AWS console showing ECS Create new task definition link on the Task defintions page">

On the task definition form, put in the `Task definition family` as `nodejs-apps` and make sure you have `AWS Fargate` selected in the Launch type of `Infrastructure requirements` :

<img class="center" src="/images/amazon-ecs-tutorial/09ecs-task-form.jpg" loading="lazy" title="AWS console showing ECS Create new task definition form with task definition family and infrastructure options" alt="AWS console showing ECS Create new task definition form with task definition family and infrastructure options">

In the task size section, select CPU as `.5 vCPU` and Memory as `1 GB`. As we are running a simple Hello World Node.js application, these resources would be more than enough.  Then, select the `Task role` and `Task execution role` as `ecsTaskExecutionRole`.

<img class="center" src="/images/amazon-ecs-tutorial/10ecs-task-size-role.jpg" loading="lazy" title="AWS console showing ECS Create new task definition form with task resources and roles" alt="AWS console showing ECS Create new task definition form with task resources and roles">

Now scroll down to the `Container-1` section and name the app as `hello-world`, for the Image URL part, copy the image URI you pushed in [part 1](/blog/2025/03/amazon-ecr-push-image/) of this series from the container registry page as shown below:

<img class="center" src="/images/amazon-ecs-tutorial/11ecr-copy-image-uri.jpg" loading="lazy" title="AWS console showing ECR image page to copy the image URI for the built and pushed image" alt="AWS console showing ECR image page to copy the image URI for the built and pushed image">

Then paste the URI in the `Image URI` field, as it is a single container task; this container will be `Essential Container` - Yes. In the port mapping section, expose port 3000 in the `Container port` field with the `Protocol` being TCP, name the port `nodejs-3000`, and keep `App Protocol` as HTTP as selected. It will look like the following:

<img class="center" src="/images/amazon-ecs-tutorial/12ecs-task-container.jpg" loading="lazy" title="AWS console showing ECS Create new task definition form with task container settings like name, Image URI, port, protocol, etc" alt="AWS console showing ECS Create new task definition form with task container settings like name, Image URI, port, protocol, etc">

Scroll down to the `Environment variables` and add an environment variable called `PORT` with the value `3000`:

<img class="center" src="/images/amazon-ecs-tutorial/13ecs-task-container-port-env.jpg" loading="lazy" title="AWS console showing ECS Create new task definition form with task container settings adding PORT environment variable" alt="AWS console showing ECS Create new task definition form with task container settings adding PORT environment variable">

After that, scroll to the bottom of the form and click the `Create` button:

<img class="center" src="/images/amazon-ecs-tutorial/14ecs-task-create.jpg" loading="lazy" title="AWS console showing ECS Create new task definition form submisstion with Create button" alt="AWS console showing ECS Create new task definition form submisstion with Create button">

You will see the service definition has been created:

<img class="center" src="/images/amazon-ecs-tutorial/15ecs-task-created.jpg" loading="lazy" title="AWS console showing ECS task created" alt="AWS console showing ECS task created">

Until now, you have only created a service definition, not a service, so no containers are running. In the next section, you will create a service with a task that will bring up the container.

## Create an ESC Service

To create a service, click `Clusters` on the previous screenshot and then click on the cluster name, which should be `dev-cluster`. In the cluster detail page, on the `Services` tab, click the `Create` button on the bottom right of the page to create a service:

<img class="center" src="/images/amazon-ecs-tutorial/16ecs-service-create-link.jpg" loading="lazy" title="AWS console showing ECS service create link in the Cluster page, Services tab" alt="AWS console showing ECS service create link in the Cluster page, Services tab">

On the create service form, select the `Compute options` as `Launch type` with `FARGATE` as `Launch type` and the `Platform version` as `LATEST`:

<img class="center" src="/images/amazon-ecs-tutorial/17ecs-service-create-form.jpg" loading="lazy" title="AWS console showing ECS service create form with compute configuration" alt="AWS console showing ECS service create form with compute configuration">

In the `Deployment Configuration` section, `Application type` would be pre-selected as `Service`, in the `Family` field, select in `nodejs-apps` and select the `Revision` to be `LATEST`. Then name the service `hello-world-service`, then leave the other settings as-is like `Replica` has `Desired tasks` of  1:

<img class="center" src="/images/amazon-ecs-tutorial/18ecs-service-deployment-config.jpg" loading="lazy" title="AWS console showing ECS service create form with deployment configuration" alt="AWS console showing ECS service create form with deployment configuration">

Then scroll down to the `Networking` section, this is the important part. Expand it, make sure the VPC is selected as is. In the `Subnets` section click `Clear current selection` and from the drop-down, choose only one subnet that has `us-east-1a` .

In the `Security group` section, choose `Create new security group`. In the `Security group name` field, type in `port-3000-open-from-anywhere`. Similarly, type in `Open port 3000 from anywhere` in the `Security group description` field.

After that, in the `Inbound rule for security groups` part, choose Customized TCP as `Type`; in the Port Range field, type in `3000,` and select' Anywhere' for the source field. Also, make sure that the `Public IP` is `Turned On`:

<img class="center" src="/images/amazon-ecs-tutorial/19ecs-service-networking.jpg" loading="lazy" title="AWS console showing ECS service create form with networking and security group configuration" alt="AWS console showing ECS service create form with networking and security group configuration">

After that, scroll to the bottom of the form and click `Create` to create the service.

<img class="center" src="/images/amazon-ecs-tutorial/20ecs-service-create-button.jpg" loading="lazy" title="AWS console showing ECS service create form with the Create button at the end" alt="AWS console showing ECS service create form with the Create button at the end">

It will take some time for the service to come up, you can click on the Service name `hello-world-service`:

<img class="center" src="/images/amazon-ecs-tutorial/21ecs-service-creating.jpg" loading="lazy" title="AWS console showing ECS service created and service showing up in the Services tab" alt="AWS console showing ECS service created and service showing up in the Services tab">

Then, on the `Tasks` tab on the service page, click on the task ID:

<img class="center" src="/images/amazon-ecs-tutorial/22ecs-service-running.jpg" loading="lazy" title="AWS console showing ECS service running and Tasks tab selected" alt="AWS console showing ECS service running and Tasks tab selected">

On the task page, click on the `Networking` Tab and click the `open address` beside the `Public IP` as shown below:

<img class="center" src="/images/amazon-ecs-tutorial/23ecs-service-task-networking.jpg" loading="lazy" title="AWS console showing ECS service task and the networking tab with the Public IP" alt="AWS console showing ECS service task and the networking tab with the Public IP">

When the IP opens in a new tab browser (if it is Chrome, allow the tab to load it insecurely without HTTPs), then append `:3000` to the IP as the Hello World Node.js app is set to run on 3000 with the `PORT` environment variable, you should see the app run by printing `Hello World!` on the browser:

<img class="center" src="/images/amazon-ecs-tutorial/24ecs-service-running-on-browser.jpg" loading="lazy" title="ESC Service and task accessible using the IP on a browser tab" alt="ESC Service and task accessible using the IP on a browser tab">

Congratulations, your Node.js Hello World container is now running on ECS with Fargate. You should read about the difference between an ESC [Task and a service](https://davidlhw.dev/notes/aws-ecs-diff-bwt-task-and-service/).

## Important note

This is a simple example: in a real-life, production-ready application, you would have added a Load Balancer and some DNS records. You would also configure the Security groups, Subnets, VPCs, and IAM settings much more precisely.

You would have written some form of CI/CD pipeline to deploy the new changes automatically. You would have also added some monitoring and logging to the application.

Delete the cluster, service definition, and container registry if you don’t need them anymore.

## Conclusion

As a recap, you learned about Amazon Elastic Container Service (ECS) and how to provision it with Fargate to have serverless resources. Then, this tutorial taught you how to create an ECS task definition. After that, you deployed a service with the correct parameters to expose the service via a public IP without using a Load Balancer. Keep updating your AWS knowledge!
