---
layout: post
title: "Don't just learn a new language/framework, implement it as a running open source project"
date: 2018-10-08 15:27:26 +1100
comments: true
categories: 
- Technology
- misc
- git
- docker
cover: /images/language-framework-learn/cycle.jpg
description: Imagine you already read 3 books about cycling. Then someone gave you a cycle and asked to ride it, will you be able to ride it? The simple answer is "No".
keywords: Beginner software engineer, learning, software engineering
---

“For the things we have to learn before we can do them, we learn by doing them.” ― Aristotle, The Nicomachean Ethics. Imagine you already read 3 books about cycling. Then someone gave you a cycle and asked to ride it, will you be able to ride it? The simple answer is "No". It is not about how much have you read about cycling or how many videos did you watch about it. It is about getting on a cycle, balancing on it, learning the feet, hands and eye co-ordination. Same goes for learning a new tech skill, a new language or framework.

{% img center /images/language-framework-learn/cycle.jpg 'Dont just learn a new language framework, implement it as a running open source project' 'Dont just learn a new language framework, implement it as a running open source project' %}

<!-- more -->

Now if you think how will I do this new project I don't even know language 'X' or framework 'Y' stop complaining. Maybe you are a new starter in tech or coding but you need to know how to learn new things. The best way to learn something new is by doing it. 

> This post will focus on getting some common things right. It will help you get from I want to learn 'X' to I have a project running in 'X', so follow on. 

If you are convinced about doing a project to learn something new, open source it. Github is the de facto service to host your open source projects. Then you can leverage lots of services for free. This post will be equally useful for coding new starters as well as experienced software engineers.

## TLDR;

> Write a project to learn that language/framework, open source it then leverage services for free. Don't just watch courses, read the docs and then find solutions. Learn by doing. Use git and implement docker in your project. Code correctly add a code quality check service to be aware of the best practices, deploy your project to get a working URL for it.

{% img center /images/language-framework-learn/lang-framework-learn.jpg 'Dont just learn a new language framework, implement it as a running open source project' 'Dont just learn a new language framework, implement it as a running open source project' %}

## Don't just watch courses, read the docs and find solutions

Nowadays, there are a plethora of choices to learn new things. Still, video courses are one of the most popular media. You can learn something new on [Udemy](https://www.udemy.com), [Pluralsight](https://www.pluralsight.com/) or even [Youtube](https://youtube.com). 

> Until you learn by doing, watching the videos is only going to help to a certain level. It is better for you to go through the official documentation. 

For instance, reading the React JS docs is better than only going through a React JS course. You find out the creators' perspective. The reason behind creating another Javascript framework/library helping you find proper solutions.

## Learn Git to collaborate

"No man is an island", especially in tech you generally don't work alone. You are part of a team. So even when learning something new try to find someone who you can collaborate with. 

> Git is immensely [popular](https://trends.google.com/trends/explore?q=git,svn,mercurial,bazaar) compared to any of its competition. It is beneficial when there is more than 1 person writing code for a project. 

You should learn git by doing, check the Github [tutorial](https://try.github.io/). I would highly recommend the learn by doing section. After you push it to Github anyone can potentially contribute to it.

## Implement docker, get over works on my machine syndrome

In 2018, if you want to make your application more accessible, use [Docker](https://www.docker.com/). This will also help a lot in increasing contribution for your open source project. Running your project locally with docker compose will be like executing 2 commands. 

> Docker has many advantages. For a beginner, it is a way to make sure your app runs the same way on your machine, your friend's machine. 

It will also be the same on the server you deploy your app to. As long as it runs on Docker well, you can rest assured it will run without issues on any environment. 

## Add code quality check

Just making it work should not be your priority. Writing quality should also be in your priority. Add code quality checks for the open source project you created for learning. Depending on the language/framework you could choose any service. 

> I would highly recommend [Code Climate](https://codeclimate.com/quality/). Code Climate supports a wide array of languages from Javascript to PHP and from Java/Kotlin to Swift for mobile developers.

With the new [browser plugin](https://codeclimate.com/browser-extension/), you get insights about your code in a Github pull request screen. You just connect it once to your Github repo and start seeing your code quality report. You can then better your code quality too. You can have a look at this [example](https://codeclimate.com/github/geshan/currency-api/src/exchangeRates.js/source).

## Deploy your project

Now you are writing a new project to learn your favorite 'X' or 'Y'. You have written some parts of it, you are collaborating with Git and have the code open source on Github. You have Docker in place and code quality checks run on each push, great! But you can't show it to your friend who is living in a different city/country right? Wrong!

You can use different services to deploy your web application. With a URL you can show it to your friend, a recruiter or anyone who knows the URL. 

> You can deploy it for free to services like [Heroku](https://www.heroku.com) or [Zeit Now](https://zeit.co/now). If you have Dockerized your open source app I would recommend Zeit Now. 

With the recent [Github integration](https://zeit.co/github), Zeit Now will give a new URL to each pull request. This makes testing a breeze. You can check an example on a demo [currency converter API](https://github.com/geshan/currency-api/pull/9) app I wrote.

## Conclusion

> To conclude, learning by doing is the best way to learn a new thing. Your aim should be to not only make it work but do it following the best practices. That is where code quality comes into play. If you can add automated tests and continuous integration it will be icing on the cake for a starter. Wish you all the best for learning by doing! 
