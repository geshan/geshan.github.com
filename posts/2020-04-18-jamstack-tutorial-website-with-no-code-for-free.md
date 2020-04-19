---
layout: post
title: "JAMstack tutorial to create a website with just clicks and no code at all for free [Step by step]"
date: 2020-04-19T20:35:47Z
comments: true
tags:
- Web Development
cover: "/images/jamstack-tutorial/00jamstack-tutorial.jpg"
pagetitle: "JAMStack Tutorial: Set up website with no coding for $0 [Step by step]"
description: This JAMStack tutorial (30+ screenshots and 2000+ words) explains how to set up a JAMStack website with just clicks step by step. Website runs for $0.
keywords: jamstack tutorial, jamstack website, static site generators, jamstack, jamstack cms, jamstack apps
---

This JAMstack tutorial will show you how to create a JAMstack website with just clicks, no code and for $0. It will detail how to set up a JAMstack website step by step with 30+ screenshots and 2000+ words. It will involve using a git-based CMS service to edit your content easily. Let's get started.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/00jamstack-tutorial.jpg" title="JAMstack tutorial to create a JAMstack website with just clicks and no code at all [Step by step]" alt="JAMstack tutorial to create a JAMstack website with just clicks and no code at all [Step by step]">

<!-- more -->

## Prerequisites

If JAMstack is something new for you have a look at my previous post detailing [what is JAMstack](https://geshan.com.np/blog/2020/04/static-vs-dynamic-websites-jam-stack/#jam-stack-with-a-cms) and some of it's technical aspects. For this tutorial following are the prerequisites:

1. You must have a working email address (a no brainier, still good to be explicit).
1. Knowledge of markdown would be beneficial.
1. Knowledge of a static site generator like [Hugo](https://gohugo.io/) would help.
1. Previous know-how of using any Content Management System (CMS) like Drupal or Wordpress would be great.

## Table of Contents

This post has multiple sections shown below in the table of content:

- [Services involved](#services-involved)
- [Steps](#steps)
  * [1. Register on Github](#1.-register-on-github)
    + [1.1. Start to register](#1.1.-start-to-register)
    + [1.2. Complete set up](#1.2.-complete-set-up)
    + [1.3. Verify email](#1.3.-verify-email)
    + [1.4. See your Github profile page](#1.4.-see-your-github-profile-page)
  * [2. Register on Netlify](#2.-register-on-netlify)
    + [2.1. Registration page](#2.1.-registration-page)
    + [2.2. Register on Netlify with Github](#2.2.-register-on-netlify-with-github)
    + [2.3. Registered on Netlify](#2.3.-registered-on-netlify)
  * [3. Register on Forestry](#3.-register-on-forestry)
    + [3.1. Forestry Sign Up Page](#3.1.-forestry-sign-up-page)
    + [3.2. Register on Forestry with Github](#3.2.-register-on-forestry-with-github)
    + [3.3. Registration Success on Forestry](#3.3.-registration-success-on-forestry)
  * [4. Register on Stackbit with Github](#4.-register-on-stackbit-with-github)
    + [4.1. Stackbit registration](#4.1.-stackbit-registration)
    + [4.2. Authorize Stackbit on Github](#4.2.-authorize-stackbit-on-github)
    + [4.3. Stackbit registration done](#4.3.-stackbit-registration-done)
  * [5. Build your project](#5.-build-your-project)
    + [5.1. Choose Fresh then click Continue to site generator](#5.1.-choose-fresh-then-click-continue-to-site-generator)
    + [5.2. Choose Hugo click continue to cms](#5.2.-choose-hugo-click-continue-to-cms)
    + [5.3. Choose Forestry click connect accounts](#5.3.-choose-forestry-click-connect-accounts)
    + [5.4. Add Project name](#5.4.-add-project-name)
    + [5.5. Connect Stackbit to Forestry](#5.5.-connect-stackbit-to-forestry)
    + [5.6. Connect Github to Stackbit](#5.6.-connect-github-to-stackbit)
    + [5.7. Wait for it to build and deploy](#5.7.-wait-for-it-to-build-and-deploy)
    + [5.8. Claim website on Netlify - Authorize](#5.8.-claim-website-on-netlify---authorize)
    + [5.9. Click view website](#5.9.-click-view-website)
  * [6. Edit text on the website](#6.-edit-text-on-the-website)
    + [6.1. Edit your website on Forestry](#6.1.-edit-your-website-on-forestry)
    + [6.2. Go to Home, click hero section and edit text](#6.2.-go-to-home--click-hero-section-and-edit-text)
    + [6.3. Edit the text of home hero section like below](#6.3.-edit-the-text-of-home-hero-section-like-below)
    + [6.4. Website deploying](#6.4.-website-deploying)
    + [6.5. Site deployed](#6.5.-site-deployed)
    + [6.6. Changes Updated](#6.6.-changes-updated)
- [Further steps](#further-steps)
- [Caveats](#caveats)
- [Conclusion](#conclusion)

## Services involved

You will need to register to the 4 (or less) online services to get your JAMstack website up and running. The good news is all of them have a free plan so your website will have a recurring running cost of exactly $0, hurray!

1. **[Github](https://github.com)** - To host the code, probably you already have a Github account :)
1. **[Netlify](https//netlify.com)** - CDN to host the website, it will be fast as it will be static files mainly
1. **[Forestry](https://forestry.io)** - Git-based Content Management System (CMS) service to edit the JAMStack website content, your content changes will reflect on the website in a couple of minutes. Still fast for a JAMstack website.
1. **[Stackbit](https//stackbit.com)** - Service to manage above 3 and glue all of them together to bring your JAMstack website to life.

Let's dive in now.

## Steps

### 1. Register on Github

The first step is to register on Github, If you already have a Github account skip to [Step 2](#2.-register-on-netlify). Github is the service that will host your JAMstack website code. You can do a lot of things on Github and it is the de-facto service of open-source software and general code collaboration.

#### 1.1. Start to register

Go to [https://github.com/join](https://github.com/join) and fill the details like below and yes complete the puzzle to prove that you are a human :) :

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/01register-on-github.jpg" title="First step is to register on Github" alt="First step is to register on Github. Github registration details">

Then click "Create account"

#### 1.2. Complete set up

After that scroll to the next page and click "Complete Setup"

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/02complete-steup-github.jpg" title="Complete Github Set up" alt="Complete your Github Set up">

If you want to choose other options, it is up to you but nothing is mandatory.

#### 1.3. Verify email

One more step is to verify your email, you will get an email for Github about registration with a title like `[GitHub] Please verify your email address.` open that email and click "Verify email address" to verify your email.

I promise you this is the only time you will need to verify your email, all other accounts have Github sign up Yay!

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/03verify-email-github.jpg" title="Verify Github Email" alt="Verify your Github Email">

After your email is verified you will see the blue notification on top of the page as below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/04email-verified-github.jpg" title="Github Email verified" alt="Your Github email is verified">

#### 1.4. See your Github profile page

Just as a quick check, have a look at your Github profile.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/05github-profile.jpg" title="Your Github profile, looks pretty empty for now :)" alt="Your Github profile, looks pretty empty for now :)">

Carry on to register on Netlify.

### 2. Register on Netlify

Netlify will host your JAMstack website on it's own Content Delivery Network (CDN), they have a free plan. So let's get a Netlify account too.

#### 2.1. Registration page

Head on to the [Netlify registration page](https://app.netlify.com/signup) and click "Github":

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/06register-on-netlify.jpg" title="Netlify Signup Page" alt="Netlify Signup Page">

#### 2.2. Register on Netlify with Github

After you click the "Github" icon it will ask you to "Authorize netlify" on Github, so click the "Authorize netlify" button on the pop-up window.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/07register-on-nelify-with-github.jpg" title="Register on Nelify with Github" alt="Register on Nelify with Github">

#### 2.3. Registered on Netlify

Great! You have a Netlify account now.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/08nelify-registration-done.jpg" title="Registered on Netlify" alt="Registered on Netlify">

Leave the tab as it is or close it, Let get a new tab to register on Forestry.io.

### 3. Register on Forestry

Forestry is a git-based online Content Management System (CMS) service that makes editing content on your JAMStack website a breeze. Head on to [Forestry Sign Up](https://app.forestry.io/signup) page.

#### 3.1. Forestry Sign Up Page

Here too just click the "Github" logo to carry on with the registration.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/09register-on-forestry.jpg" title="Forestry sign up page" alt="Forestry sign up page">

#### 3.2. Register on Forestry with Github

Similar to Netlify, click the green button to "Authorize forestryio", in the pop-up to complete the sign-up process.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/10register-on-forrestry-with-github.jpg" title="Register on Forestry with Github" alt="Register on Forestry with Github">

#### 3.3. Registration Success on Forestry

Success! Your Forestry account is registered, let's go to the next step.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/11forestry-registration-success.jpg" title="Registered on Forestry.io" alt="Registered on Forestry.io">

### 4. Register on Stackbit with Github

Stackbit is the magic glue that will cement all the other 3 services together to inject life to your JAMStack website. Let's go ahead and get an account for Stackbit on it's [Login](https://app.stackbit.com/login) page.

#### 4.1. Stackbit registration

Click the "I agree to the terms and license" checkbox and then click on the "Github" logo. It will start the process to link up Stackbit with Github.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/12stackbit-registration.jpg" title="Stackbit login page" alt="Stackbit Login Page">

#### 4.2. Authorize Stackbit on Github

Similar to Forestry.io, click the "Authorize Stackbit App by Stackbit" green button to register on Stackbit with Github.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/13stackbit-register-with-github.jpg" title="Authorize Stackbit on Github" alt="Authorize Stackbit on Github">

#### 4.3. Stackbit registration done

Great! The last registration is done too. Now we can build your website, woohoo!

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/15stackbit-new-project-start.jpg" title="Stackbit Dashboard" alt="Stackbit Dashboard">

### 5. Build your project

To build your project on Stackbit from the dashboard click "Build Your Project" as seen above to choose the theme:

#### 5.1. Choose Fresh then click Continue to site generator

Click "Fresh" as your theme, it is a blog theme. If you want you can choose another theme as well, "Azimuth" is good for SAAS products. Let's go with Fresh for now, then click "Continue to site generation".

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/16stackbit-choose-fresh-theme.jpg" title="Choose Fresh as your website theme" alt="Choose Fresh as your website theme">

#### 5.2. Choose Hugo click continue to cms

After that, click "Hugo", we are selecting Hugo as it claims to be the "[fastest](https://gohugo.io/)" static site generator.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/17stackbit-choose-hugo-ssg.jpg" title="Choose Hugo as the Static site generator for your website" alt="Choose Hugo as the Static site generator for your website">


#### 5.0. Choose Forestry click connect accounts

Next step is to choose the CMS, let's choose Forestry you have an account there already :)

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/18stackbit-choose-forestry-cms.jpg" title="Choose Forestry as the CMS on Stackbit" alt="Choose Forestry as the CMS on Stackbit">

#### 5.4. Add Project name

Then it is time to name the project and connect your accounts, I have named it `jamstack-fresh`, name it as you  want.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/19stackbit-name-project.jpg" title="Name the project on Stackbit" alt="Name the project on Stackbit">

For all the things to function correctly, you will need to connect Forestry and Github with Stackbit. Click the connect button beside Forestry to connect Forestry with Stackbit.

#### 5.5. Connect Stackbit to Forestry

On the pop-up click the green "Authorize" to link up Stackbit and Forestry.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/20stackbit-forestry-connect.jpg" title="Connect Forestry with Stackbit" alt="Connect Forestry with Stackbit">

After it is authorized correctly it will show the "Connected" checkbox on the page, as below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/21stackbit-forestry-connected.jpg" title="Connected Forestry to Stackbit" alt="Connected Forestry to Stackbit">

#### 5.6. Connect Github to Stackbit

Similar to Forestry, click the "Connect" button beside "Github" and click the green "Install" button to add Stackbit to your Github account.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/22stackbit-github-connect.jpg" title="Connect Github to Stackbit" alt="Connect your github account to stackbit">

---

Great! now as both services are connected it is time to click "Create your project" as below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/23stackbit-both-connected.jpg" title="Both Github and Forestry are connected with Stackbit now" alt="Both Github and Forestry are connected with Stackbit now">


#### 5.7. Wait for it to build and deploy

We are getting close the, your website should be building at this point like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/24stackbit-deploying-fresh.jpg" title="Deploying the website" alt="Building and deploying the website">

---

After a couple of minutes it should be deployed, it will show up as below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/25stackbit-deployed-fresh.jpg" title="Your website is deployed" alt="Website deployed on Netlify with Stackbit">


#### 5.8. Claim website on Netlify - Authorize

Now it is time to Claim your Netlify URL, Click the "Claim" button to do so.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/26stackbit-netlify-claim.jpg" title="Claim your Netlify URL" alt="Claim your Netlify URL">

---

Great! now your URL has been claimed on Netlify too.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/27stackbit-netlify-success.jpg" title="Connected to Netlify successfully" alt="Connected to Netlify successfully">


#### 5.9. Click view website

Hurray! Let's see your website live, click the "View Site" blue button, your site should open on a new tab and look like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/28fresh-working.jpg" title="Yes! your website is working" alt="Yes! your JAMstack website is working">


### 6. Edit text on the website

Good news, your website is up on a URL like: [https://jamstack-fresh-a9bfb.netlify.app/](https://jamstack-fresh-a9bfb.netlify.app/). Now you have to edit it to make it yours. Let's change the homepage text to say something different. For that click the "Edit in Forestry" blue button, you will be taken to the forestry dashboard.

#### 6.1. Edit your website on Forestry

Click on the "Home" link on the sidebar.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/29forestry-dashboard.jpg" title="Click on Home to left sidebar to start editing home page contents" alt="Click on Home to left sidebar to start editing home page contents of your JAMStack website following this JAMstack tutorial">

#### 6.2. Go to Home, click hero section and edit text

Then click on "Hero Section"

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/30forestry-home-edit.jpg" title="Click on home then Hero section to edit it" alt="Click on home then Hero section to edit it">

#### 6.3. Edit the text of home hero section like below

Now edit the Title to something like "Welcome to JAMStack test" and the content to something like below.
After that click on the "Save" at the top right and then go to the tab with your website open, it should be deploying now.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/31forestry-home-hero-edit.jpg" title="Edit the hero section of homepage" alt="Edit the hero section of homepage">

As you might have figured out by now, there will be some mapping to do. Generally, it is easy to find the element you need to edit to get your desired result.

#### 6.4. Website deploying

The website will say "Publishing Site" like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/32site-deploying.jpg" title="Deploying the text changes to Netlify" alt="Deploying the text changes to Netlify">

#### 6.5. Site deployed

After like a minute it will say "Rebuild Successful" now its time to click "Refresh" or refresh the browser.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/33site-deployed.jpg" title="Website deployed with the text changes" alt="Website deployed with the text changes">

#### 6.6. Changes Updated

After you refresh you should see your changes, yes it is that easy to edit content.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/jamstack-tutorial/34site-content-changed.jpg" title="Website content updated to reflect the changes done" alt="Website content updated to reflect the changes done">

Please check out the "Media" menu on the sidebar below the "Site" title and play around upload images. Add the images to your content. It is pretty easy.

## Further steps

Here are some of the further steps you can take to enhance your new web presence:

1. Please read through the [Forestry Product Tour](https://forestry.io/docs/quickstart/tour/) to know other things like adding an image from the media library and doing other changes. You will need to fiddle around with Forestry. It would be great to check the Forestry documentation for [Managing Content](https://forestry.io/docs/editing/) and [Media Library](https://forestry.io/docs/editing/media-library/), it is easy.
1. You can get a free top-level domain like a .tk, .ml, .cf or .gq for free. So you can have **mywebsite.gq** free from [Freenom](https://www.freenom.com/), if you want a .com try another domain registrar like [NameCheap](https://www.namecheap.com/).
1. You can then configure [Custom Domain in netlify](https://docs.netlify.com/domains-https/custom-domains/) to get it working on the domain name you registered.
1. If you are really serious about your website or blog try to optimize it better for SEO, for this you will need some coding and help from someone who knows Go lang and has worked with Hugo.
1. If you want to move out from medium to your own JAMstack website you can try Stackbit [medium import](https://www.stackbit.com/medium/).

## Caveats

There are some caveats you should consider for this free website, they are as follows:

* Be mindful of the **build minutes**, Netlify [free plan](https://www.netlify.com/pricing/) has 300 build minutes per month. Basically that means each time you hit save or add a new image from Forestry it will trigger a build and deploy on Netlify.

> Each build will take around a minute or more and this reduces your build time quota of 300 minutes every month. So, it is advisable to bulk your changes, mainly the text ones and be careful and use the "Save"  button sparingly.

* Even though setting up the website is just clicks, I think this website will be a good one for a proof of concept or staging. If you want a great production-ready performance-tuned website there will be some coding changes required.

## Conclusion

Now you have a fully functional website in under 15 mins, there was no coding involved and you didn't even have to take your credit card out.

> This is just scratching the surface, now you can show your running website to people but do remember to optimize it well before going live.
