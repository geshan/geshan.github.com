---
layout: post
title: 'Express Helmet: the must-have seatbelt for a secure Node.js application'
date: 2021-01-08T22:30:22.000+11:00
comments: true
tags:
- Web Development
- Node.js
cover: "/images/express-helmet/01express-helmet.jpg"
pagetitle: 'Express Helmet js: the must-have seatbelt for a secure Node.js application'
description: Secure your Node.js Express application with Helmet js by adding some
  essential response headers, read more to know how easy it is in this 1400+ words
  guide.
keywords: express helmet, helmet js, nodejs express helmet, express helmet js, express
  js helmet

---
Security is everyone’s responsibility. Express Helmet secures your Node.js application from some obvious threats. While writing a Node.js [Express](https://expressjs.com/) application, always use [Helmet](https://github.com/helmetjs/helmet) to safeguard your application or API from usual security risks like XSS, Content Security Policy, and others.

In this post, we will see how we can add Helmet to an existing API and how it bolsters the security of the application. Let’s get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/express-helmet/01express-helmet.jpg" title="Use Helmet js to secure your Node.js Express app" alt="Use Helmet js to secure your Node.js Express app">

Background Photo by [Harley-Davidson](https://unsplash.com/@harleydavidson) on [Unsplash](https://unsplash.com/photos/ZZbniSDAGoU)

## Table of contents

* [Web application security](#web-application-security)
  * [Handy OWASP cheat sheets](#handy-owasp-cheat-sheets)
  * [Node.js Web application security](#nodejs-web-application-security)
* [Example Express Js application](#example-express-js-application)
* [Express without Helmet Js](#express-without-helmet-js)
* [Express Helmet to the rescue](#express-helmet-to-the-rescue)
  * [Helmet js with sane defaults](#helmet-js-with-sane-defaults)
  * [Response headers for security](#response-headers-for-security)
    * [Content Security Policy](#content-security-policy)
    * [Expect Certificate Transparency](#expect-certificate-transparency)
    * [Referrer Policy](#referrer-policy)
    * [Strict Transport Security](#strict-transport-security)
* [Quick scan](#quick-scan)
  * [Before Express Helmet](#before-express-helmet)
  * [After Express Helmet](#after-express-helmet)
* [Conclusion](#conclusion)

## Web application security

Web application security is a pretty vast topic, people have [written](https://www.oreilly.com/library/view/web-application-security/9781492053101/) [books](https://leanpub.com/wasec) about it. For example, OWASP comes up with a yearly [top 10 web application security risks](https://owasp.org/www-project-top-ten/) where Injection (like SQL injection) and Cross-Site Scripting (XSS) usually make it into the top 10 list.

> For example, with [Node.js and MySQL](/blog/2020/11/nodejs-mysql-tutorial/) you would want to use the [MySQL2](https://github.com/sidorares/node-mysql2) library vs [MySQL](https://github.com/mysqljs/mysql) library because it supports [prepared statements](https://github.com/sidorares/node-mysql2#using-prepared-statements) which can tackle SQL injection from the database level.

There would be a lot of other security things you would want to learn about depending on how sensitive your public-facing application and its related data is.

### Handy OWASP cheat sheets

If you want to get your hands dirty with some Security stuff they have a long list of [Cheat Sheets](https://cheatsheetseries.owasp.org/Glossary.html) to get started quickly. It includes cheat sheets from [docker security](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html) to [SQL injection prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html). You want to find something on security, chances are you will find a cheat sheet from OWASP on that topic.

### Node.js Web application security

Focusing on a web application built with Node.js and Express. A library like Helmet can help on setting the right response headers which are great for a more secure application. As Node.js has a built-in web server it is easier for controlling the HTTP response headers from Node.js itself than another web server like Apache or Nginx.

If you are using Koa you can use [Koa Helmet](https://github.com/venables/koa-helmet) to add important response headers.

> In case you are using other languages do consider the options available found in the [see also](https://helmetjs.github.io/see-also/) section of the Helmet js website.

For instance, there is a [Secure Headers](https://github.com/BePsvPT/secure-headers) composer package for PHP, and for Django there exists a pip package called [Django CSP](https://django-csp.readthedocs.io/en/latest/index.html).

## Example Express Js application

In this walkthrough, we will use the Currency API application which is [open source](https://github.com/geshan/currency-api/). It is a simple currency converter proxy API that gives the exchange rate from one currency to the other for a given date.

I have used it for other examples too like the [faster docker builds](/blog/2020/10/docker-build-example-faster-docker-build/) one. I have also used the same application for [docker multi-stage build](/blog/2019/11/how-to-use-docker-multi-stage-build/) post. It is a simple API, let’s analyze the headers and security risks it poses without Helmet.

## Express without Helmet Js

Below is the screenshot of the Header for the Currency API Node.js Express app without Helmet hosted on Vercel:

<img class="center" loading="lazy" src="/images/express-helmet/02express-without-helmet.jpg" title="Express without helmet does not have needed security HTTP Response Headers" alt="Express without helmet does not have needed security HTTP Response Headers">

One of the things that caught my attention is the `x-powered-by` response header. I don’t think it adds any value to the client by knowing it is an Express app. On the contrary, if an attacker finds out we are using an old version of Express, the attacker will try to exploit any known vulnerability. This header will be removed by Helmet.

Some more headers that would make the server secure that are missing are:

* Content-Security-Policy
* Strict-Transport-Security
* Expect-CT
* Referrer-Policy
* X-Content-Type-Options

At this juncture, let’s add Helmet js to our Currency API Express application as the next step.

## Express Helmet to the rescue

We have seen that some Response headers are crucial for security. To get these essential Response headers that instruct the browser to make our website more secure we will add Helmet Js to our application. We can add Helmet to our Express API app by simply installing it with:

``` bash
npm instal --save helmet
```

After that, we will require helmet in our `index.js` file and use it as a middleware like below:

``` js
const bodyParser = require('body-parser');
const helmet = require('helmet');
const exchangeRates = require('./src/exchangeRates');

const app = express();
app.use(helmet());
```

You can view the changes as a [pull request](https://github.com/geshan/currency-api/pull/113/files).

### Helmet js with sane defaults

As seen in the above code change, we have just used helmet with `app.use(helmet());` without any extra configs added. The good thing about Express Helmet is that it automatically adds 11 sub middlewares with sane default configs.

> This may be one of the reasons that even the Express.js security best practices for production [recommends](https://expressjs.com/en/advanced/best-practice-security.html#use-helmet) to use helmet js.

In addition to using Helmet, it also mentions [securing cookies](https://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely) and other things.

Looking further, it's time to see what new response headers has Helmet added with the default configuration:

<img class="center" loading="lazy" src="/images/express-helmet/03express-with-helmet.jpg" title="Express with helmet has many needed security HTTP Response Headers" alt="Express with helmet has many needed security HTTP Response Headers">

I had done a similar request last time but this time the `x-powered-by` response header is missing, thanks to Express Helmet. On the contrary, Helmet has added some new hearers which are very useful from a security point of view. We will see further, what these headers are and analyze 4 of the main ones.

### Response headers for security

By adding Helmet with default configuration we can see that some new response headers have been added to our Currency API app’s response:

* [Content-security-policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) is also known as CSP for short
* [Expect-CT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT) - CT is Certificate Transparency
* [Referrer-Policy](https://web.dev/referrer-best-practices/#referer-and-referrer-policy-101)
* [Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)

Let’s discuss these 4 in a bit more detail:

#### Content Security Policy

This header adds a layer of security by declaring which dynamic resources are allowed to load. It helps to mitigate Cross Site Scripting (XSS) and some forms of Click jacking too. You can read more about [CSP](https://content-security-policy.com/).

For instance, with a strict CSP you can block images from other websites Following is the value of the Header given by Helmet as default:

```html
content-security-policy: default-src 'self';base-uri 'self';block-all-mixed-content;font-src 'self' https: data:;frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests
```

With the above policy, you can’t load a remote style as `style-src` is set to only `self`. Depending on your specific needs you can relax the policy. Have a look at the [config options](https://github.com/helmetjs/helmet#reference) available on Express Helmet.

#### Expect Certificate Transparency

Expect-CT as the name suggests checks for misuse of certificates. When a site enables the [Expect-CT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT) header, they are requesting that the browser check that any certificate for that site appears in public CT logs.

Browsers ignore the Expect-CT header over HTTP; the header only has an effect on HTTPS connections. So this is an explicit check by the browser that the given certificate for the website is a valid one as per [public logs](https://www.certificate-transparency.org/known-logs). Helmet adds `expect-ct: max-age=0` meaning the browser should expect the certificate to be valid.

#### Referrer Policy

In simple terms, referrer policy defines what data should be picked up from the referrer of the request. Helmet by default puts this to no data which means no part of the URL neither the origin nor the query string can be used on your website. Web.dev has a great piece on [Referrer best practices](https://web.dev/referrer-best-practices) with easy to understand graphical explanations. Helmet adds `referrer-policy: no-referrer`, which is pretty restrictive.

#### Strict Transport Security

This response header tells the browser that the website needs to be accessed using HTTPS not HTTP. It has `max-age` and `includeSubdomain` directives. Max-age tells the browser the time in seconds the browser should remember that the website should only be accessed using HTTPS. The `includeSubdomain` directive which is optional, tells this rule applies to the site’s subdomains as well. Helmet adds the following:

```html
strict-transport-security: max-age=15552000; includeSubDomains
```

So it says that the website needs to be accessed via HTTPS for 180 days with its subdomains.

There are other headers added by Helmet like `x-permitted-cross-domain-policies`, `X-Content-Type-Options`, etc, they are a bit less important than the 4 mentioned above.

## Quick scan

You can do a quick scan of your website’s security headers on [SecurityHeaders.com](https://securityheaders.com/). Below is the before and after results of the Currency API Express application:

### Before Express Helmet

<img class="center" loading="lazy" src="/images/express-helmet/04express-before-helmet.jpg" title="Express before adding helmet got a D on SecurityHeader.com" alt="Express before adding helmet got a D on SecurityHeader.com">

As seen above, without the use of Express helmet it is missing important HTTP response headers like Content-Security-Policy, Referrer-Policy, and others. The score for the website at this point is a "D".

### After Express Helmet

<img class="center" loading="lazy" src="/images/express-helmet/05express-after-helmet.jpg" title="Express after adding helmet got an amazing A on SecurityHeader.com" alt="Express after adding helmet got an amazing A SecurityHeader.com">

So from a poor "D" before Express Helmet, it jumped to a great "A" on Security Headers website.

> This means Helmet is a must for every Node.js Express application for better security response headers.

If you are building an Express js application and thinking of putting it on production make adding Helmet js part of your go-to production checklist.

## Conclusion

Helmet is a great package for all Node.js Express applications.

> It should be used with proper configurations so that the application is secure and still optimally permissive too.

There are other factors than just response headers and for better overall security we should focus also on other factors like secure cookies, the latest and secure versions of the packages, etc.