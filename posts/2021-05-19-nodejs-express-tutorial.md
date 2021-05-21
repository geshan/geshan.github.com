---
layout: post
title: Node.js Express tutorial to build a 1 page website step-by-step
date: 2021-05-19T23:42:35.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
- NodeJs
cover: "/images/nodejs-express-tutorial/01nodejs-express-tutorial.jpg"
pagetitle: Node.js Express tutorial to build a 1 page website step-by-step
description: Follow this step-by-step tutorial to build a simple 1 page website with Node.js Express and templating with Pug.
keywords: nodejs express, node.js express, node.js express.js, nodejs express tutorial, express tutorial, express tutorial nodejs

---
Express Js is one of the most popular Node.js frameworks. In this Node.js Express tutorial, we will build a mock landing page that can collect the email addresses of people interested to be notified of the launch of our imaginary podcast about headphones. Let’s get started.

<img class="center" loading="lazy" src="/images/nodejs-express-tutorial/01nodejs-express-tutorial.jpg" title="Node.js express tutoral to build a simple 1 page website" alt="Node.js express tutoral to build a simple 1 page website">

<!-- more -->

## Table of contents

* [What we are building](#what-we-are-building)
* [Prerequisites](#prerequisites)
* [Setup project](#setup-project)
* [Install express and pug](#install-express-and-pug)
* [Add the views](#add-the-views)
* [Add the server and routes](#add-the-server-and-routes)
* [Testing](#testing)
* [Next steps](#next-steps)
* [TLDR; need a quick run](#tldr-need-a-quick-run)
* [Conclusion](#conclusion)

## What we are building

For this guide, we are building a simple one-pager landing page for an imaginary podcast about headphones. The website is called “Eventually podcast”. It is going to look something like below:

<img class="center" loading="lazy" src="/images/nodejs-express-tutorial/02eventually-podcast.jpg" title="We are building an imaginary podcast wait list with Node.js and Express" alt="We are building an imaginary podcast wait list with Node.js and Express">

We will be converting a very useful and popular responsive HTML template called [Eventually](https://html5up.net/eventually) by [HTML5UP](https://html5up.net/). Thanks to the amazing creator [AJ](https://twitter.com/ajlkn) for providing such outstanding templates for free.

We will download the responsive theme which will have HTML, JS, and CSS files and we will transform the HTML file into a rudimentary template for this Node.js Express tutorial using [Pug](https://pugjs.org/api/getting-started.html) as the templating engine. To keep the scope of this step-by-step tutorial small, we will not deal with handling the form submission part.

## Prerequisites

Before we begin diving into the code, below are some nice to have prerequisites:

1. You are generally aware of how Node.js and JavaScript works.
1. Familiarity with NPM and installing NPM modules, so having npm and Node.js running locally is expected.
1. Working with Git is a known concept for you. It will be useful if you want to clone and test out the project.
1. Knowledge of basic HTML will also be greatly helpful
1. A general understanding of how Pug templating works will be necessary

Time to get our hands dirty with the code.

## Setup project

To begin, we will create an empty directory named `eventually-podcast` and setup NPM in it running the following commands:

```bash
mkdir eventually-podcast
cd eventually-podcast
npm init -y
``` 
After running `npm init -y` it should look like below:

<img class="center" loading="lazy" src="/images/nodejs-express-tutorial/03npm-init-y.jpg" title="Result of npm init -y for Node.js express tutorial" alt="Result of npm init -y for Node.js express tutorial">

Great! We have our package.json in the folder. Next up we will install express js and pug.

## Install express and pug

We will need [Express](https://expressjs.com/) as our web application framework on top of Node.js and we will use Pug. To install both Express and pug we will run the command as below:

```bash
npm i --save express pug
```

This will add express and pug as dependencies in our `package.json` file.

## Add the views

At this point, we will [download](https://html5up.net/eventually/download) the Eventually template from HTML5UP. Then we can extract the zip file. It will have a folder structure and files like below:

<img class="center" loading="lazy" src="/images/nodejs-express-tutorial/04assets-structure.jpg" title="Folder and file structure for the assets in the downloaded Eventually template" alt="Folder and file structure for the assets in the downloaded Eventually template">

We will add 2 folders on the root level of our Express js project `views` and `public` with:

```bash
mkdir views
mkdir public
```

We will copy the `assets` and `images` folder from the `html5up-eventually` folder we got after unzipping the theme zip file and copy it into `PROJECT_ROOT/public` folder. For my example, I am using headphone images from Pixabay and Unsplash. You can either use what you like or just go with the default provided images.

If you want you can also add a `favicon.ico` file using a [generator](https://realfavicongenerator.net/), I leave it up to you to add or not add a favicon.

After that, you can delete the `saas` folder inside the `assets` folder with:

```bash
rm -rf public/assets/sass
```

We will not be changing any of the CSS so we can safely delete the saas folder for the scope of this tutorial. Consequently, we will add 2 pug empty pug files in the `views` folder executing the following command:

```bash
touch views/layout.pug
touch views/index.pug
```

At this juncture your folder and file structure for the project will look similar to the following:

<img class="center" loading="lazy" src="/images/nodejs-express-tutorial/05project-structure.jpg" title="Folder and file structure of the project with public and views" alt="Folder and file structure of the project with public and views">

Of course, there will be `package.json` and `package-lock.json` as we have already installed Express and Pug in an earlier step. Subsequently, we will fill up the two Pug view files. I used [HTML to Pug](https://html-to-pug.com/) online tool to convert the HTML from the template to be Pug. Our `layout.pug` file should look like below:

```
doctype html
//
  Eventually by HTML5 UP
  html5up.net | @ajlkn
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
head
  title Eventually Podcast | #{title} 
  meta(charset='utf-8')
  meta(name='viewport' content='width=device-width, initial-scale=1, user-scalable=no')
  link(rel='stylesheet' href='/assets/css/main.css')
body.is-preload
  block body-content
```

The two main things to notice here are, first,  the body is a block content that can be extended and changed as per need. And the second thing is on line 7, `#{title}` will be filled up dynamically. Next up, our `index.pug` file will have the following contents:

```
extends layout

block body-content
  // Header
  header#header
    h1 #{mainText} 
    p
      | !{subText}
  // Signup Form
  form#signup-form(method='post' action='#')
    input#email(type='email' name='email' placeholder='Email Address')
    input(type='submit' value='Sign Up')
  // Footer
  footer#footer
    ul.icons
      li
        a.icon.brands.fa-twitter(href='#')
          span.label Twitter
      li
        a.icon.brands.fa-instagram(href='#')
          span.label Instagram
      li
        a.icon.brands.fa-github(href='#')
          span.label GitHub
      li
        a.icon.fa-envelope(href='#')
          span.label Email
    ul.copyright
      li &copy; Untitled.
      li
        | Credits: 
        a(href='http://html5up.net') HTML5 UP
  // Scripts
  script(src='/assets/js/main.js')
```

As `index.pug` extends the layout this template will only fill up the body part. Even here there are two variables used `#{mainText}` and `!{subText}`. The `!` in subtext denotes that it is [unescaped](https://pugjs.org/language/interpolation.html#string-interpolation-unescaped) but we know this string can be trusted as we are passing it ourselves from the server as we will see it in the next part. Generally, it is not advisable to use this as it can lead to unwanted code injection. In the next section, we will set up the server and the root route to render our templates.

## Add the server and routes

At this point, we have already put the Pug templates in place converting the HTML template into Pug syntax. Now, we will add the server and root route to glue it all together with our `index.js` file. The content of our `/index.js` file is as follows:

```js
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || '3000';

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render(
    'index', 
    { 
      title: 'Coming Soon!', 
      mainText: 'Eventually Podcast', 
      subText: `Drop your email address below and we will let you know when we launch the Eventually podcast. 
      <br>Brought to you by amazing people`
    }
    );
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
```

Let’s evaluate what is happening in the above index.js file:

1. Till line 5 we are instantiating a new express application which is our web server as well as the web application framework. 
1. On lines 7-8 we are telling express that we will use `pug` as our views engine and views will be available in the `views` folder
1. On line 9 we are routing all the static files in the `public` folder to be available from the webserver as static files, for instance `BASE_URL/assets/css/main.css` will render our main CSS file.
1. At lines 11-21, we define our `/` route which is a GET route. It renders the `index` view passing needed variables like title, mainText, and subText.
1. Finally at line 23 we start the express server and it is listening to the port which will be 3000 if not passed as an environment variable called `PORT`. If the environment variable is set that will take priority.

## Testing

To test the app, we can run `node index.js`, to make things easier we can add a npm start script that looks like below in the scripts section of the `package.json` file:

```js
"start": "node index.js",
```

Now we can run the app with either `node index.js` or `npm start`, which would yield and output as follows:

<img class="center" src="/images/nodejs-express-tutorial/06npm-start.jpg" loading="lazy" title="Output of NPM start, express server listening at port 3000" alt="Output of NPM start, express server listening at port 3000">

After that, we can check how the app looks at `http://localhost:3000` on the browser of your choice. It should look something like below:

<img class="center" src="/images/nodejs-express-tutorial/07express-pug-running.jpg" loading="lazy" title="Output of the basic application running with Node.js Express and Pug" alt="Output of the basic application running with Node.js Express and Pug">

To make local testing easier we can surely add other helpful NPM packages like [nodemon](/blog/2021/02/nodemon/) and [browser sync](https://browsersync.io/). Those are good to have enhancements.

## Next steps

This is just scratching the surface. If you want to change how the form submission behavior works you can look into the [form submission](https://github.com/geshan/nodejs-express-tutorial/blob/master/public/assets/js/main.js#L141) part in the main.js file and change it to call an internal API or external route. All the code is available as an [open source](https://github.com/geshan/nodejs-express-tutorial) repository on Github for your convenience. 

The application has a [docker file](https://github.com/geshan/nodejs-express-tutorial/blob/master/Dockerfile) if you want to quickly run it locally or deploy it to something like [Google Cloud Run](/blog/2019/11/why-use-google-cloud-run-5-compelling-reasons/). You can dig more about [Node.js and Docker](/blog/2020/11/nodejs-with-docker/) if you want. I have also deployed the application on [Qovery](https://main-eventua-a14nhm0hngan6b2y-gtw.qovery.io/) for quickly testing how it looks, if you want to deploy it yourself you can choose from any of the 3 [free nodejs hosting](/blog/2021/01/free-nodejs-hosting/) services.

## TLDR; need a quick run

To run this app quickly, you can follow these steps given you have Node.js running locally:

1. Git clone git@github.com:geshan/nodejs-express-tutorial.git
1. cd `nodejs-express-tutorial`
1. npm install
1. npm start
1. Navigate to `http://localhost:3000` on your browser to see the output as follows.

<img class="center" src="/images/nodejs-express-tutorial/07express-pug-running.jpg" loading="lazy" title="Output of the basic application running with Node.js Express and Pug" alt="Output of the basic application running with Node.js Express and Pug">

## Conclusion

We just had a look at a simple but useful single-page website using Node.js Express and Pug to create it. I hope this step-by-step tutorial acts as a good starting point for you to build something interesting using Node.js and Express. Keep building!
