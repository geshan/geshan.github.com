---
layout: post
title: How to start a tech startup for $0 with Google Cloud Platform and other services
date: 2020-10-05T22:10:25.000+11:00
comments: true
tags:
- Misc
cover: "/images/start-tech-startup/01start-tech-startup.jpg"
pagetitle: Start a tech startup for exactly $0 with Google Clould Platform and other services
description: Learn how to piece together Google Cloud Platform (GCP) services ($300 credit on signup) and other services to start your tech startup with this no-fuss 2000+ words technical guide.
keywords: how to start a tech startup, how to start a startup, start a tech startup, start a startup
---
Learn how to start a tech startup with no money. You might think I am joking but I am not. In this no-fuss technical guide, I will walk you through the process to start a tech startup. This guide will not dive deep into the technical details. If you know technical things like how to set up a DNS, dockerize your applications, etc you can glue together a tech startup for no cost at all.

The [$300 free credit](https://cloud.google.com/free) for 12 months is key to getting your startup off the ground for around 9-10 months. Let’s get started:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/start-tech-startup/01start-tech-startup.jpg" title="Start a tech startup for $0" alt="How to start a tech startup for $0 with Google Cloud Platform and other services">

<!-- more -->


## How to start a tech startup

You have an idea for a tech startup in your mind for some time. You have fiddled around and maybe have a proof of concept or even a minimum viable product ([MVP](https://fonsekainnovations.com/what-does-mvp-mean/)) ready. Now it is time to get your startup out to the world. Or following the [lean startup methodology](http://theleanstartup.com/principles) you want to see if there is a demand for your product. You also want to know if people are willing to pay for this type of service.

For both the above cases, you will need a brand name and a working website or web application. This guide will help you get up and running at $0 stitching together the GCP products and other free services.

## Considerations

1. You will need to register for a new GCP account and bag your [$300 credit](https://cloud.google.com/free) that should be used by 12 months.
1. You will have to register for other services as you follow along with the guide.
1. The aim is to run your staging and production applications for ~ $1 a day, so the $300 will last for just over 9.5 months.
1. After that you will need to find a way to generate money or get more Google Cloud Platform (GCP) credits like from [Google for startups](https://cloud.google.com/developers/startups) or some [other](https://www.joinffl.com/cloud-credits) way.
1. For this guide we will consider having a brochure JAMstack website hosted on Netlify  
1. The web application will be hosted on Google Cloud Run with the MYSQL database on Google Cloud SQL.

It is time to dive deeper into the steps:

## Steps

Before we go deeper into the steps, these steps are going to be technical but not deeply technical. These steps are going to be more like pointers than a step-by-step process with screenshots in hyper details. If you have found the idea till now to be interesting carry on:

### Domain Name

Your brand cannot exist without a domain name. This is where you might want to spend some money if you are more serious about your tech startup. Still, if you want to go the $0 path here is your option. You can register your domain at [FreeNom](https://freenom.com/) for $0. You can get domains ending with .ml, .tk, .ga, and.gq.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/start-tech-startup/02freenom.jpg" title="Freenom for domain at $0" alt="Freenom for free domain name">

The good things are you pay $0 and there is no competition as getting a .com or .net. The flip side is you don’t get a “standard” domain as such. The choice is yours, if you are on a strict budget with $0 I would suggest to get a .ml domain and brand your startup as a “Machine Learning” idea, it has the potential to sell too :).

### DNS, security and caching

The next step after you register the domain is to get a free [Cloudflare](https://www.cloudflare.com/) account. You can then use the DNS provided in your Cloud flare account at FreeNom to direct the website/web application traffic to where you want. In our case, we will like to redirect the brochure JAMStack to Netlify. The web application traffic will go our application hosted on Google Cloud Run. 

<img class="center" src="/images/generic/loading.gif" data-echo="/images/start-tech-startup/03cloudflare.jpg" title="Cloudflare for DNS, caching" alt="Use CloudFlare to manage DNS caching and security">

For now, be able to log in and “Add a site”. Then Google more about how to use cloud flare to linkup the traffic to respective services. On top of DNS management, you will also get things like caching and security for free with Cloud Flare. Again, I will leave you with more Googling to get all these configured correctly. You will also get free HTTPS with Cloudflare no need to wrangle with [certificates](https://letsencrypt.org/) and settings.

### The brochure site

Now as you have your basics setup, it is time to get your brochure JAMStack website up and running. You can follow this step-by-step [tutorial](/blog/2020/04/jamstack-tutorial-website-with-no-code-for-free/) to get you JAMStack website running without a line of code. The main glue here is [Stackbit](https://stackbit.com/). With the recent changes, you could directly go to Stackbit, select a theme, and deploy your website on Netlify. You will also get an easy to use CMS with WYSIWYG type editor that works not only for text but for images, layout, and configuration of your website.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/start-tech-startup/04stackbit.jpg" title="Stackbit for easy to edit JAMStack website" alt="Use stackbit for your brochure JAMStack website">

If your startup is a SAAS product I would recommend using the [Azimuth](https://app.stackbit.com/create?theme=azimuth) theme. It suits very well for SAAS products and with the click of a button, you can even change the color scheme.

### Cement them together

After you have your brochure website running on Netlify with Stackbit. Configure the DNS correctly on Freenom so that the website traffic hits the Netlify website with Cloudflare security enabled. You can scratch the surface to connect Freenom and Cloudflare with this [guide](https://dev.to/hieplpvip/get-a-free-domain-with-freenom-and-cloudflare-k1j).

If you just want to test your idea then you can stop here. With the brochure website, you can start gathering email addresses using [Nelify forms](https://www.netlify.com/products/forms/). Netlify forms free version has limits so please be aware of it, refer to the [Netlify Pricing page](https://www.netlify.com/pricing/). After that, you can figure out if people will pay and should I actually write for the tech startup.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/start-tech-startup/05netlify-forms.jpg" title="Netlify and Netlify forms" alt="Netlify and Netlify forms for getting user data">

Take note that, for all the above services you have not even spent a penny. So you can run your experiment as long as you want. If you have already some code and some form of your tech startup working then proceed further to host it with GCP with serverless containers on Google Cloud Run.

### Time for Google Cloud Platform (GCP)

Now is the time to get your Google Cloud Platform (GCP) account. This is where you will need to search for your credit card. Even though you will not be charged but Google will take in your credit card details.


We will be using serverless containers for your application deployed on Google Cloud Run. We opt for serverless containers because of the [cost](https://cloud.google.com/run/pricing) and other reasons. The other [reasons](/blog/2019/11/why-use-google-cloud-run-5-compelling-reasons/) mainly include no need to learn a new framework/paradigm and you can run any application as long as it can be containerized. You will also get free HTTPs and custom domain mapping to point the application back to the FreeNom domain.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/start-tech-startup/06cloud-run.jpg" title="Serverless containers on cloud run" alt="Serverless containers on cloud run">

With Cloud run you get 2 million requests a month [free](https://cloud.google.com/run/pricing#tables). After that, it is 0.40 $ per million requests. Well, the math is not that simple but it is advertized like that for sure. Google cloud run is a lot easier to set up than a full-blown Kubernetes cluster with similar benefits. Know more about it in this [talk](blog/2019/11/from-0-to-working-serverless-url-for-a-containerized-app-with-google-cloud-run-slides-and-video/).

### Dockerize your application

To deploy your application, you will need to dockerize it. In this [step-by-step guide](blog/2019/10/get-laravel-6-running-on-google-cloud-run-step-by-step-with-ci/) you will see how to deploy a Laravel application to Google Cloud Run Fully managed. Following similar steps, you can deploy any PHP application to Google Cloud Run. Just bear in mind that you choose a lower-cost region like us-central-1 so that you don’t burn the free credit fast.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/start-tech-startup/07cloud-run-costs.jpg" title="Cloud run costs for a small startup" alt="Cloud run costs for a small startup for last 90 days staging and prod both">


With my experience, currently, for an application with both staging and production workloads, it is costing us 10-20 cents a day. This is also going from our free credit.

### Database

Just having some code doesn’t make the application work, the heard of most applications is the data. You can store your data on Google Cloud SQL over MySQL or Postgres SQL. This will be your main money hogger. With the current MySQL [pricing], using two db-f1-micro it is costing us 88 cents a day. 44 cents per day for the staging database and the same for the production one. There is an automatic backup setup for the production one.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/start-tech-startup/08cloud-sql-costs.jpg" title="Cloud sql costs for a small startup" alt="Cloud sql costs for a small startup for last 90 days staging and prod both">

To save cost, if you can live with a maximum of 5 connections at a time you can choose to use [remote mysql](https://remotemysql.com/). If you use remote MySQL for staging your daily cost for the database can come down to 44 cents a day.

One important thing is to keep your Cloud SQL instance behind a firewall. Follow the official [instructions](https://cloud.google.com/sql/docs/mysql/connect-run) to connect Cloud Run fully managed services with the Cloud SQL database.

If you use other forms of data storage the costs will vary depending on what you choose.

### Other GCP services

In addition to Cloud Run and Cloud SQL, you should use other services to make your life easier. You can use Cloud Build to build your containers. It can be linked with Github and you can start building your containers on each push or with some conditions. Cloud build has [120 mins](https://cloud.google.com/cloud-build/pricing) per day free. It should be more than enough for a budding startup like yours.

With Cloud build the container images will be pushed to [Container Registry](https://cloud.google.com/container-registry). Google Container registry uses [Cloud Storage](https://cloud.google.com/storage) to store the images. Set [lifecycle configuration](https://cloud.google.com/storage/docs/lifecycle) on the cloud storage bucket so that files older than X days can be auto-deleted before it mounts up the [cost](https://cloud.google.com/storage/pricing).

You can also make use of the free VM - [F1 micro instance](https://cloud.google.com/free) to do small tasks. We are using it to run a bot built with [Hubot](https://hubot.github.com/). It uses the gcloud command to do things like [deploy cloud run applications](https://cloud.google.com/sdk/gcloud/reference/run/deploy) and display [logs](https://cloud.google.com/sdk/gcloud/reference/logging/logs/list) over Slack. So needless to say we are using [GCP logging](https://cloud.google.com/logging) and you should use it too.

Of course, GCP has a plethora of services but don’t get into the analysis paralysis mode and get nothing done. We used the above services and our product is running. Explore optimally and use the services needed for your product.

### Other free services

The following are other free services that will help you build your tech startup:

1. Github - Github has a [free team plan](https://github.blog/2020-04-14-github-is-now-free-for-teams/) so don’t forget to exploit it. With 2000 minutes for [Github Actions](https://github.com/features/actions) you can use it as your CI/CD pipeline too.
1. Trello / Asana - Depending on your project/product management flavor you can use [Trello](https://trello.com/) or [Asana](https://asana.com/) free version to manage your product development.
1. CodeClimate - To keep a tab on the health of your code you can use CodeClimate [free plan](https://codeclimate.com/quality/pricing/) with 4 seats. This will be a boon for your tech startup’s code quality.
1. ForwardEmail - Great you have your domain but using a Gmail email won’t work best for your brand identity. Get your info@yourdomain.ml for free with [ForwardEmail](https://forwardemail.net/en) free plan.
1. Free CDN - If you are serving images or static assets on your website or web application you can use [Statically](https://statically.io/) to get the CDN optimizations and benefits. Try it, it is free and unlimited too.

If you know of any other services that can help a budding tech startup please do add it to the comments section.

## Conclusion

> You don’t need money to get your tech startup off the ground. If you have the right idea and utilize your tech skills correctly you can get your tech startup started for $0.

I hope you will not let your tech startup idea die and get something running for no cost with GCP and other services.
