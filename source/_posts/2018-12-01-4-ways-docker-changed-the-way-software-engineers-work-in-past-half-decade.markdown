---
layout: post
title: "4 ways Docker changed the way software engineers work in past half decade"
date: 2018-12-01 09:14:51 +1100
comments: true
categories: 
- Technology
- DevOps
- Misc 
- Docker
---

10 years back it was Git that transformed the way software engineers worked. Half a decade back it was [Docker](https://www.docker.com/) that brought the container to the masses. Before Docker, container was like a sacred secret in companies like Google and Heroku. Docker is a software and a company too. It tried to build a broader ecosystem but [Kubernetes](https://kubernetes.io/) stole the thunder along the way keeping [swarm](https://docs.docker.com/engine/swarm/) at bay. This post is not about how some Docker tools are not popular. It is about how Docker has changed the way we work in the past 5 years.

{% img center /images/4-ways-docker/docker-whale.jpg '4 ways Docker changed the way software engineers work in past half decade' '4 ways Docker changed the way software engineers work in past half decade' %}
<!-- more -->

## TLDR;
> With Docker, you ship the whole stack not only your code. Allocate minimum required resources to containers then scale them horizontally. With containers security generally already comes baked In. With Docker and Kubernetes you can get zero downtime and faster deployments leading to business profit. 

## Changed the ways

If you want to go to the technical details of what is a container and why to use docker Google it :). 

> Docker has also partially deprecated many of the configuration management tools. 

This post is about how Docker has changed the way we work after its release in March 2013. Below are some reasons that helped advance our way of working:

### Ship the whole stack, not just code

With containers and Docker in specific, you always ship the whole stack in each version. The whole image gets rebuilt every time. It includes the precise OS+version, specific version of the language. It also has the dependencies like the framework and other libraries (versions depend on how you handle it). It also includes the code you have written and this results in a significant advantage. The advantage is, if it built correctly on your machine, it will potentially build on the server too. As soon as it runs it is the exact same environment on dev, staging, testing and even on production. 

> It happens because you didn't shop only the code, you shipped your code + vendor code + specific language version + precise OS version too.

### Allocate only needed resources to the application and scale horizontally

With each Docker container, you can be specific about how much resources you want to allocate to that particular container. Using software like Kubernetes it becomes so much easier to scale your application. Under high load, the no. of containers can expand and with less load, it can shrink too. So with this mechanism, each container (or pod for Kubernetes) can be allocated the minimum resources and scaled horizontally as per need. 

> For example, a simple Node JS app container/pod can run with like 128 MB memory and 0.25 CPU. As and when load increases run 5 pods in place of 2. 

This requires the application to be built with horizontal scalability in mind. That basically means storing no data on the file system. Treating containers like cattle, not pet helps scale horizontally. It also makes high availability of application an achievable task.

### Security is baked in

Using a container, not virtual machine the attack surface is already decreased. Following container security best practices you can already improve your security measures. Of course, if you have holes in the application like SQL injection that is a different story. Still, with smaller and security-focused images like Alpine, it will be easier to get the basics right. 

> Security is always about keeping the attack surface small. With containers and Docker closing more doors become easier. 

The container should have access to only what it needs. As the file system is temporary for containers it can be a security boon as well as a security auditing issue.

### Deploy faster with zero downtime

Deploying Docker containers is always about shipping the whole stack. So the chances of one file not syncing or one server not getting the latest changes are not there. As a successful build of the image is always required to deploy it any problems will be found in the build process. 

> With software like Kubernetes and Helm, orchestrating and deploying containers become straightforward. With High Availability (HA) in place using proper load balancing, deployments can be zero downtime. 

Easier and faster deployment equates to the ability to deploy smaller changes. Smaller changes done well can lead to a better response to market needs quickly. To sum up, use the right tools to deploy your containers in a way to use it for business advantage. 

## Conclusion

The past 5 years have seen rapid adoption of Docker. With tools like Kubernetes deploying and scaling applications has been much effortless than some years ago. 

> Don't worship your virtual machines, use the resources it provides efficiently. Get on the Docker and containers train and reap its benefits.  
