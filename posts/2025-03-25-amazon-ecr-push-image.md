---
layout: post
title: "How to create an Amazon Elastic Container Registry (ECR) and push a docker image to it [Part 1]"
date: 2025-03-25T22:41:57.000+11:00
comments: true
tags:
- AWS
cover: "/images/amazon-ecr-push-image/01amazon-ecr-push-image.jpg"
pagetitle: "How to create an Amazon Elastic Container Registry (ECR) and push a docker image to it"
description: "Learn how create a private Amazon Elastic Container Registry (ECR), then build and push a Node.js Hello World app's Docker image to it."
keywords: amazon ecr push image, amazon ecr, private amazon ecr
---
Amazon Elastic Container Registry (ECR) is a fully managed container registry that can store (Docker) container images, making it easy to pull, share, and deploy container images. This post will teach you how to create a private Amazon ECR and push Docker container images of a simple Node.js Hello World app with Express. Let’s get started!

<!-- more -->

<img class="center" src="/images/amazon-ecr-push-image/01amazon-ecr-push-image.jpg" title="Push a Docker image to Amazon Elastic Container Registery (ECR)" alt="Push a Docker image to Amazon Elastic Container Registery (ECR)">

## What is Amazon ECR

Amazon Elastic Container Registry (ECR) is an Amazon Web Service (AWS) service that stores and manages Docker images, making it easy to pull and deploy them to services like Elastic Container Service (ECS), Elastic Kubernetes Service (EKS), and/or AWS Lambda functions. Below is a quick overview of how it works from the [official website](https://aws.amazon.com/ecr/).

<img class="center" src="/images/amazon-ecr-push-image/02amazon-ecr-works.jpg" loading="lazy" title="How Amazon ECR fits in the pipeline" alt="How Amazon ECR fits in the pipeline">

Amazon ECR also has [commands](https://docs.aws.amazon.com/cli/latest/reference/ecr/) in the AWS CLI to do everything you can from the user interface. For this post, you will use the user interface to build and push a Docker image for a simple [Node.js Express](/blog/2021/05/nodejs-express-tutorial/) Hello World app.

## The Node.js Hello World app

It is assumed that you have Node.js 20+ installed on your local machine. If not, you can clone [this](https://github.com/geshan/nodejs-aws-ecs-fargate) repository in your [AWS CloudShell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html). AWS CloudShell has Node 20 installed by default.

The Node.js Hello World app used for this tutorial is an Express 5.x app. You can start a Node.js app with `npm init`, and to install Express 5.x, you can run `npm install express@next`. Then, in the folder that has the `package.json` and `package-lock.json`, you can create an `index.js` file with the following code:

```js
const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

It is a simple Node.js app with only one route `/` that prints `Hello World` using Express.  If you run `node index.js` , you will see the following:

```bash
> node index.js
Example app listening on port 80
```

After that, if you hit `http://localhost` on your favorite browser, you will see the text `Hello World` on the browser tab.

The next important file in the repository is the `Dockerfile` with the following content:

```bash
#buld stage
FROM public.ecr.aws/docker/library/node:22 AS build

WORKDIR /srv
COPY package*.json ./

# Install dependencies based on the `package.json` and `package-lock.json`
# files in the host folder
RUN npm ci --omit=dev


# Production stage, only includes what is needed for production
FROM public.ecr.aws/docker/library/node:22-alpine

ENV NODE_ENV=production
USER node

COPY --from=build /srv .
ADD . .

# Specify the command to run when launching the container
EXPOSE 80
CMD ["node", "index.js"]
```

It is a Dockerfile using  [Docker multi-stage build](/blog/2019/11/how-to-use-docker-multi-stage-build/) to create the build and the production stage.

The easiest way to get started is to clone this repository in your AWS Cloud Shell and build the image there. Before that, you will first create the private Amazon ECR.

## Create private Amazon ECR

Amazon Elastic Container Registry (ECR) can be public or private. For example, this [Node.js docker image](https://gallery.ecr.aws/docker/library/node) is being served from the public ECR. No authentication is required to pull the node image. Conversely, the apps you develop will to be accessible to the public, so they are in a private ECR, which has some form of access control to ensure only the right users have access to it.

To create a private Amazon Elastic Container Registry (ECR), you must be logged into your AWS account and have the correct IAM permissions. This post does not cover the IAM permissions. In your AWS console, search for `ecr` as shown below:

<img class="center" src="/images/amazon-ecr-push-image/03search-for-ecr.jpg" loading="lazy" title="Search for ecr on Amazon web console" alt="Search for ecr on Amazon web console">

Then click on `Elastic Container Registry` which will take you to the following page:

<img class="center" src="/images/amazon-ecr-push-image/04create-amazon-ecr-button.jpg" loading="lazy" title="UI button to create Amazon ECR (private)" alt="UI button to create Amazon ECR (private)">

On this page, click on the `Create` yellow button, which will take you to the form below:

<img class="center" src="/images/amazon-ecr-push-image/05private-ecr-app-name.jpg" loading="lazy" title="UI button to create Amazon ECR (private)" alt="UI button to create Amazon ECR (private)">

On the form, fill in the repository name as `nodejs/hello-world`, where `nodejs` is the namespace and `hello-world` is the app name.

It is better to keep the tags immutable so they are not overwritten. To do this, click the `Immutable` radio button in the `Image tag mutability` section. After that, keep the Encryption settings as is and click the `Create` button at the bottom of this page.

It might take some seconds for the EC registry to be created, and you will be taken to the `Private repositories` listing page as seen below:

<img class="center" src="/images/amazon-ecr-push-image/06private-ecr-created.jpg" loading="lazy" title="AWS Console UI showing the private Amazon ECR created" alt="AWS Console UI showing the private Amazon ECR created">

In the next part, you will learn how to build and push a Docker container image using AWS Cloudshell. You are using AWS Cloudshell, so there is nothing to install on your machine. You can also do the same using your machine. 

## Build and push Node.js Docker image

To build and push the Node.js Hello World (with Express.js) Docker image, you must first go to the repository by clicking its name, as seen in the previous screenshot.

You will land on the `Images` page of the repository, which will look like the below:

<img class="center" src="/images/amazon-ecr-push-image/07ecr-without-images.jpg" loading="lazy" title="AWS Console UI showing just created private Amazon ECR without any Docker images" alt="AWS Console UI showing just created private Amazon ECR without any Docker images">

Before doing anything else, please click the `CloudShell` link at the bottom left side of the page. It will provision and run a shell for you:

<img class="center" src="/images/amazon-ecr-push-image/08aws-cloudshell.jpg" loading="lazy" title="AWS Console UI showing AWS CloudShell without any command" alt="AWS Console UI showing AWS CloudShell without any command">

Type in the following command in the shell:

```bash
mkdir projects && cd projects && git clone https://github.com/geshan/nodejs-aws-ecs-fargate.git && cd nodejs-aws-ecs-fargate
```

The above command creates a folder called `projects` and then goes into it. After that, it clones the above Node.js (Express) Hello World App, which also has the abovementioned Dockerfile. Subsequently, the last command takes you into the `nodejs-aws-ecs-fargate` folder.

It will result in the following state:

<img class="center" src="/images/amazon-ecr-push-image/09aws-cloudshell-with-commands.jpg" loading="lazy" title="AWS Console UI showing AWS CloudShell with create project related commands" alt="AWS Console UI showing AWS CloudShell with create project related commands">

After that, click on the `View push commands` button on the left side of the page it will show a pop-up as seen below:

<img class="center" src="/images/amazon-ecr-push-image/10ecr-show-push-commands.jpg" loading="lazy" title="AWS Console UI showing  ECR login, docker build related commands" alt="AWS Console UI showing  ECR login, docker build related commands">

Copy all four visible commands and paste them into Notepad or your IDE.  The commands I got were:

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <long-id-here>.dkr.ecr.us-east-1.amazonaws.com

docker build -t nodejs/hello-world .

docker tag nodejs/hello-world:latest <long-id-here>.dkr.ecr.us-east-1.amazonaws.com/nodejs/hello-world:latest


docker push <long-id-here>.dkr.ecr.us-east-1.amazonaws.com/nodejs/hello-world:latest
```

Then, run them individually on your console, maintaining the order. After the first command, you will see `Login Succeeded`. That command is used to log in to the Elastic container registry.

<img class="center" src="/images/amazon-ecr-push-image/11aws-cloudshell-erc-login.jpg" loading="lazy" title="AWS Console UI showing AWS CloudShell with ECR login command output" alt="AWS Console UI showing AWS CloudShell with ECR login command output">

The `docker build` command will take up to 5 minutes, wait for it.  After the build is done, it will look something like the below:

<img class="center" src="/images/amazon-ecr-push-image/12aws-cloudshell-docker-build.jpg" loading="lazy" title="AWS Console UI showing AWS CloudShell with Docker build command output" alt="AWS Console UI showing AWS CloudShell with Docker build command output">

The third command tags the built container with `nodejs/hello-world:latest `, which results in nothing. The fourth command pushes the image to the private Amazon ECR. If everything goes well, when it finishes, it will look like the following:

<img class="center" src="/images/amazon-ecr-push-image/13aws-cloudshell-docker-tag-push-image.jpg" loading="lazy" title="AWS Console UI showing AWS CloudShell with Docker tag and push command output" alt="AWS Console UI showing AWS CloudShell with Docker tag and push command output">

After that, close the cloud shell and refresh the `Images` page of the private Amazon ECR. You will see the pushed Docker image in the registry as follows:

<img class="center" src="/images/amazon-ecr-push-image/14amazon-ecr-with-pushed-image.jpg" loading="lazy" title="AWS Console UI showing Amazon ECR with the pushed Docker image of a Node.js Express Hello World App" alt="AWS Console UI showing Amazon ECR with the pushed Docker image of a Node.js Express Hello World App">

You can see the image’s details by clicking the `latest` link, which will show you:

<img class="center" src="/images/amazon-ecr-push-image/14amazon-ecr-with-pushed-image.jpg" loading="lazy" title="AWS Console UI showing Amazon ECR with the pushed Docker image details" alt="AWS Console UI showing Amazon ECR with the pushed Docker image details">

You can deploy the image's URL as a container in ECS, EKS, or even a Lambda function. The next part of this blog post series will discuss that.

## Conclusion

In this post, you learned about Amazon Elastic Container Registry (ECR), a service in Amazon Web Services (AWS). Then, you built a simple Hello World Node.js app with Express 5.x. After that, using the AWS interface, you created a private AWS ECR Docker image registry. Consequently, look at the command provided. You used AWS CodeShell to build and push the Hello World Node.js app image after cloning the repository from GitHub.

I hope you learned the basics of Amazon ECR, in the next part, you will deploy the container on Amazon Elastic Container Service (ECS) using Fargate for serverless resource provisioning. Keep learing!
