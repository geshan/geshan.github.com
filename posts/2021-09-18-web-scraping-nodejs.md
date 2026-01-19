---
layout: post
title: The final guide to web scraping with Node.js
date: 2021-09-18T21:30:35.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
- Node.js
cover: "/images/nodejs-web-scraping/01nodejs-web-scraping.jpg"
pagetitle: The final guide to web scraping with Node.js
description: Learn how to scrape any webpage with or without Javascript rendering
  using Node.js. This tutorial will be the only guide you need to start web scraping
  with Node.js successfully.
keywords: web scraping node.js, node.js web scraping, node web scraping, web scapring
  node

---
Web scraping is the process of extracting data from a website in an automated way and Node.js can be used for web scraping. Even though other languages and frameworks are more popular for web scraping, Node.js can be utilized well to do the job too. In this post, we will learn how to do web scraping with Node.js for websites that don’t need and need Javascript to load. Let’s get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/nodejs-web-scraping/01nodejs-web-scraping.jpg" title="Web scraping with Nodejs for webpages that need or do not need JavaScript to render" alt="Web scraping with Nodejs for webpages that need or do not need JavaScript to render">


## Table of contents

- [Table of contents](#table-of-contents)
- [Web scraping the dos and don’ts](#web-scraping-the-dos-and-donts)
- [Prerequisites](#prerequisites)
- [Web scraping with Node.js the simple example](#web-scraping-with-nodejs-the-simple-example)
  - [Axios and Cheerio for Node.js web scraping](#axios-and-cheerio-for-nodejs-web-scraping)
- [Node.js web scraping rendering JavaScript](#nodejs-web-scraping-rendering-javascript)
  - [Puppeteer for web scraping](#puppeteer-for-web-scraping)
- [Conclusion](#conclusion)

## Web scraping the dos and don’ts

Web scraping can be very advantageous to aggregate data from multiple sources or even track what one’s competitor is doing. But, it can have its own [legal](https://techcrunch.com/2021/06/14/supreme-court-revives-linkedin-bid-to-protect-user-data-from-web-scrapers/) and technical issues too. A general technical problem being too many requests coming from the same IP in a very short amount of time as the traffic is coming from a machine than a browser or a human. 

Even when scraping a website it is best to [respect the robots.txt file](https://www.promptcloud.com/blog/how-to-read-and-respect-robots-file/) and be nice to the maintainers of the website. Don’t be that person who would send 50 requests per second to a website from the same IP address adding unnecessary load to the servers and making the website slow for other users. Next up, we will look at an example of a simple web scraper with Node.js.

Python’s [Scrapy](https://scrapy.org/) framework might be one of the best tools to do web scraping but if you just know Javascript you can build a pretty decent web scraper with Node.js too.

## Prerequisites

Before we dive into the code, below are some prerequisites

1. You have Node.js (preferably the latest LTS version) and NPM node running on your machine
1. Instaling NPM modules is known to you
1. Any prior knowledge or experience of [web scraping](https://en.vpnwelt.com/web-scraping-tools/), CSS selectors, or Xpath will be helpful.

Let’s get started with some code now.

## Web scraping with Node.js the simple example

Websites and webpages can basically be divided into two broad categories. The first segment doesn’t need JavaScript rendering to show most of the content of the webpage, and the second needs Javascript execution to render any of its content. The first group of websites is much easier to scrape because the HTML rendered is almost the same for a browser that can execute Javascript compared to a bot that cannot execute JavaScript.

The second set of websites are mainly the Single Page Applications (SPA) that are built with JavaScript framework/libraries like React which need JavaScript execution to show any relevant content. We will see an example later for this class of websites. For now, we will dive into an example that doesn’t need any Javascript execution to get the meaningful contents of the website. For this simple example, we will use Axios and Cheerio to scrape a property listing website called Domain.com,au to check how many rental properties are listed for a given postal code.

You can use [Bright data](https://brightdata.grsm.io/gva84uxcbadg) to scarpe data from multiple sources. It also has proxy to make web scraping even more easier.

### Axios and Cheerio for Node.js web scraping

Prior to writing some code to scrape out information. It is best we analyze some patterns that will make our work easier. There are two main things to consider while scraping content, they are the URL and the structure of the page(s) you want to scrape the information out of. URLs have patten, in our example, if you search for rental properties on Domain the URL with postcode looks like: `https://www.domain.com.au/rent/?postcode=2000&excludedeposittaken=1` so 2000 is the postcode part that can be changed to any valid postal code in Australia and it will work.

Similarly, when we inspect the page and look for the part we need that is the no. of properties in that postcode. It is available in a “strong” tag inside the “h1” tag. It is easy to see in the inspector of your browser of choice, I am using chrome below:

<img class="center" loading="lazy" src="/images/nodejs-web-scraping/02nodejs-web-scraping-browser.jpg" title="Using chrome inspect for Node.js web scraping" alt="Using chrome inspect for Node.js web scraping">

Here [CSS selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) are your best friend, [XPATH](https://devhints.io/xpath) is another powerful option but generally, I prefer CSS selectors. Below is a quick look at the innerText property of ‘h1>strong’ which gives out the text we are after:

<img class="center" loading="lazy" src="/images/nodejs-web-scraping/03nodejs-web-scraping-dollor.jpg" title="CSS selector and inner text for Node.js web scraping" alt="CSS selector and inner text for Node.js web scraping">

Now as we know what to target for in the webpage, below is a quick example of getting the number of properties open for rent in a given postcode of Australia pulled in from Domain.com.au rental listing page using Axios and Cheerio:

```js
const axios = require('axios');
const cheerio = require('cheerio');

(async () => {
  const args = process.argv.slice(2);
  const postCode = args[0] || 2000;
  const url = `https://www.domain.com.au/rent/?postcode=${postCode}&excludedeposittaken=1`;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const noOfProperties = $('h1>strong').text();
    console.log(`${noOfProperties} are open for rent in ${postCode} postcode of Australia on Domain`);
  } catch (e) {
    console.error(`Error while fetching rental properties for ${postCode} - ${e.message}`);
  }
})();
```

You can install axios and cheerio with `npm i --save axios cheerio` to any Node.js project initiated with an `npm install -y`.

In the above code, first, we require both [Axios](https://github.com/axios/axios) and [Cheerio](https://github.com/cheeriojs/cheerio) and then we create an async [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (Immediately Invoked Function Expression) as we would like to use await inside it. Given it is immediately invoked we don’t need to explicitly call the function.

Inside the function, we get the arguments from the command line if any. Then we set the `postCode` as the third argument from the command like `node axios-cheerio.js 2100`, in the above code, the `postCode` will be set to 2100.

Subsequently, we set the URL to be the domain’s URL for finding rental properties in a given postcode. After that we call the URL to get its HTML using Axios, we do an await to unwrap the promise. Once we have the response, we pass it to cheerio with cheerio load to parse the response body. Consequently, as we have the full HTML we use Cheerio’s easy Jquery like API to parse out the text for the strong HTML tag inside the H1 tag which has a value like `217 properties`. 

Then finally we print the message and add more strings to show output on the console. If we wanted to scrape multple URLs at once that can be achieve with [JavaScript Promise.all](/blog/2022/07/javascript-promise-all/). If you are sending requests to multiple URLs it would be better to [wait 1 second](/blog/2022/08/javascript-wait-1-second/) before sending a request to another URL. This will make sure that your IP is not blocked by the website.

In case of any error, we just log the error message. The script when run with `node axios-cheerio.js 2100` gives the following output:

<img class="center" loading="lazy" src="/images/nodejs-web-scraping/04axios-cheerio-domain.jpg" title="Node.js web scraping with Axios and Cheerio for Domain" alt="Node.js web scraping with Axios and Cheerio for Domain">

Great our basic scraper with Axios and Cheerio is working. The above code is available in the [pull request](https://github.com/geshan/nodejs-web-scraping/pull/2). If you want a shortcut method I have created [Axrio](https://www.npmjs.com/package/@geshan/axrio) too which is used in the [Domain scraper](https://github.com/geshan/domain-scraper) project I wrote up in 2018.

Axios and Cheerio are just one of the combinations you can use. In place of Axios, you can use other libraries like Got, Superagent, and [the likes](https://blog.logrocket.com/5-ways-to-make-http-requests-in-node-js/). In place of Cheerio, you can also try out [JsDOM](https://www.npmjs.com/package/jsdom). The main point is to get the HTML and parse it to extract out the information we need from the HTML.

Next up, we will look at how to scrape web pages that require JavaScript to render any meaningful content for our Node.js web scraping tutorial.

## Node.js web scraping rendering JavaScript

Domain was a relatively easy website as it renders the full HTML with server-side rendering. Now if we use Axios and Cheerio to scrape the job titles from Workable’s [job listing](https://jobs.workable.com/) page it will find nothing. Because the page renders no jobs until the JavaScript on the page fires up calls the respective API and paints the response from the API.

These types of Single Page Applications (SPA) will need a real or [headless browser](https://en.wikipedia.org/wiki/Headless_browser) to execute the JavaScript on the page and get the HTML to the scraper as if it would work for a browser. Let’s use Puppeteer to scrape the job titles from Workable’s jobs page.

[Puppeteer](https://github.com/puppeteer/puppeteer) is a Node library that provides a high-level API to control Chrome or Chromium. It runs headless (no GUI) by default but can run on full GUI mode too. It can be used for a lot of other things than just rendering JavaScript to assist in scraping. It can be used to generate screenshots or PDFs, fill up forms, use for automated testing, etc. Speaking of testing, there are only two [types of automated tests](/blog/2016/03/there-are-only-two-types-of-automated-software-tests/) fast ones and not fast ones.

### Puppeteer for web scraping

To use Puppeteer, we can install it with `npm i --save puppeteer`, it will download the recent version of chromium too. If you want to use your own browser you can try `puppeteer-core`. For this guide, we will use puppeteer to keep things simple.

To scrape the job titles on the first page of Workable we will use the following code:

```js
const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();

    await page.goto('https://jobs.workable.com/');
    await page.setViewport({ width: 1440, height: 744 });
    await navigationPromise;

    await page.waitForSelector('ul li h3 a');
    let jobTitles = await page.$$eval('ul li h3 a', titles => {
      return titles.map(title => title.innerText);
    });
    console.log(`Job Titles on first page of Workable are: ${jobTitles.join(', ')}`);
    await browser.close();
  } catch (e) {
    console.log(`Error while fetching workable job titles ${e.message}`);
  }
})();
```

The code has been partially generated with the [Headless Recorder](https://chrome.google.com/webstore/detail/headless-recorder/djeegiggegleadkkbgopoonhjimgehda?hl=en) Google Chrome Plugin, you can view its code on [GitHub](https://github.com/checkly/headless-recorder) too if you are interested.

The code at first includes puppeteer. Then in the IIFE async function similar to the above example, starts the browser and open a new tab. After that, it goes to `https://jobs.workable.com` and sets the viewport. Consequently, it waits for the navigation to and waits for the selector `ul li h3 a`. Then it gets all the `a` tags in `ul li h3`, all 10 of them, and loops through them to get the inner text that holds the job titles. Which is set in the `jobTitles` array. After that, it logs all the scraped job titles and then closes the browser. We can also use other [Node.js logging libraries](/blog/2021/01/nodejs-logging-library/) in place of console.log.

This is how it looks when you run it:

<img class="center" loading="lazy" src="/images/nodejs-web-scraping/05puppeteer-workable.jpg" title="Node.js web scraping with Puppeteer on Workable" alt="Node.js web scraping with Puppeteer on Workable">

If the code is run with docker it will need a [different way](https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#tips) to start the browser. For the above example, I am running it on a Mac. The above code is available as a [pull request](https://github.com/geshan/nodejs-web-scraping/pull/4) for your reference. We could have possibly taken the whole HTML rendered after executing the JavaScript and put it into Cheerio to parse it but the above method works too.

All the working code is available as a [Github repository](https://github.com/geshan/nodejs-web-scraping) for your reference. We can also use [Node.js with Docker](/blog/2020/11/nodejs-with-docker/) to make the code run seamlessly in multiple operating systems and environments.

In addition to scraping just one page, we could get all the links and loop through (or even better promise.all) the pages but at that point, it would be a full-on spider than just web page scraping.

Another alternative to Puppeteer is [Playwright](https://playwright.dev/). It is similar to puppeteer and has a similar API, the advantage is it supports multiple [browsers](https://playwright.dev/docs/browsers) like Firefox and Safari. The headless recorder plugin can generate a good starting script for both Puppeteer and Playwright so you can get a very good starting point if you are not well versed in writing such automation scripts. If you want to learn web [scraping with Python](https://www.scrapingdog.com/blog/web-scraping-with-python/), here is the perfect guide for you.

## Conclusion

We saw how to scrape web pages with Node.js for both types of web pages that don’t require JavaScipt to render meaningful HTML and that requires JavaScript. Using your browser’s inspect tool and some URL pattern matching will surely help you scraper web pages much better.