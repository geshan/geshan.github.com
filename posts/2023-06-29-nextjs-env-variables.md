---
layout: post
title: How to use environment variables in Next.js (includes a working example app)
date: 2023-06-29T22:45:52.000+11:00
comments: true
tags:
- Web Development
- Javascript
cover: "/images/nextjs-env-variables/01nextjs-env-variables.jpg"
pagetitle: How to use environment variables in Next.js (includes a working example app)
description: In this tutorial, you will learn how to set Next.js environment variables correctly with a fully functional example app.
keywords: nextjs env variables, nextjs environment variables, nextjs env, nextjs environment
---
Next.js is a React framework that makes building fast, user-friendly websites easy. It uses server-side rendering to pre-render pages on the server, which makes them load faster for users. Environment variables are a way to store sensitive information, such as passwords or API keys, outside of your code. This makes it more secure, it is one of the tenants of the [12-factor app](https://12factor.net/config). In this post, you will learn how to properly use environment variables on both the server and client side of Next.js. Let’s get started!

<!-- more -->

<img class="center" src="/images/nextjs-env-variables/01nextjs-env-variables.jpg" title="Learn how use Next.js environment variables the easy way" alt="Learn how use Next.js environment variables the easy way">

## Table of contents
- [Table of contents](#table-of-contents)
- [Popularity of Next.js](#popularity-of-next.js)
- [Environment variables](#environment-variables)
- [Environment variables in Next.js](#environment-variables-in-next.js)
  - [Next.js browser level environment variables](#nextjs-browser-level-environment-variables)
  - [Environment variable load order in Next.js](#environment-variable-load-order-in-next.js)
- [Example city weather app](#example-city-weather-app)
  - [City weather Next.js app code](#city-weather-next.js-app-code)
- [Conclusion](#conclusion)

## Popularity of Next.js

Next.js is a fast, scalable, and easy-to-use React framework that can be used to build static, dynamic, and server-side rendered applications. It is popular for its static site generation, server-side rendering, routing, pre-rendering, and SEO features. Some of its competitors are Nuxt.js, Gatsby, and Remix.
Next.js is the most popular React.js meta framework if you look at the search trends on Google for the last 5 years.

<img class="center" loading="lazy" src="/images/nextjs-env-variables/02nextjs-popularity.jpg" title="Next.js is the most popular React meta framwork" alt="Next.js is the most popular React meta framwork">

Next, you will learn about environment variables and their use in web applications.

## Environment variables

Environment variables are a set of variables that are used to store information about the environment in which a web application is running. They are defined in a key and value pair. This information can include things like the path to the application's files, the name of the database, and the port number that the application is listening on. 

Environment variables are often used to configure applications, and they can also be used to store data that needs to be accessed by multiple parts of an application.

Environment variables can be a powerful tool for configuring and managing web applications. By understanding how they work, you can use them to make your applications more flexible and easier to maintain. For example, below is a sample `.env` file used for an application’s environment variables:

```bash
DB_HOST=127.0.0.1
DB_NAME=blog
DB_USERNAME=blogger
DB_PASSWORD=O7HEzAM$o7p2u5lw7g
DB_PORT=3306
DB_URL=mysql://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME
```

With the above environment variables in a `.env` file or as operating system-level environment variables, you can choose the database you want. For instance, on staging it will point to a staging database and for a production environment, the production database credentials will be used.
One more thing to notice above is the `DB_URL` which is constructed by referencing the other variables with a `$` sign.

Next.js will automatically expand the variables using $ to [reference](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#referencing-other-variables) other variables, so it will construct a valid `DB_URL` replacing the right environment variables.
In the next section, you will learn about Next.js environment variables.

## Environment variables in Next.js

For this post, you will use Next.js 13 with the [app router](https://nextjs.org/docs/app/building-your-application) (not the pages folder). To use environment variables in Next.js, you can create a `.env.local` file in your project’s root directory. This file will contain all of your environment variables, which you can then access in your code using the process.env object while doing backend execution or server-side components.
For example, if you have an environment variable called SECRET_KEY, you can access it in your code like this:

```bash
const secretKey = process.env.SECRET_KEY;
```

You can also use environment variables to set up different configurations for your website. For example, you could create an environment variable called PRODUCTION that you set to true when your website is live. This would allow you to use different settings for your production website than you would for your development website. You can read more about this in the official [docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#loading-environment-variables).

### Next.js browser level environment variables

At times you will need to expose some variables to be accessible on the frontend at the browser level. Of course, these variables cannot be secret (like a password) as they can be read by everyone as it is part of the frontend code.

Let’s say if you want to use Google Analytics 4 then you will need to expose the GA4 measurement ID to the browser.
To expose a public environment variable in Next.js you have to prefix the environment variable with `NEXT_PUBLIC`, so for the GA4 measurement ID it can be exposed as follows:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID="<your-GA4-ID-here>"
```

You will know about the load order for environment variables in Next.js in the next section.

### Environment variable load order in Next.js

The environment variables have a precedence order in Next.js which is as below:

1. process.env
1. .env.$(NODE_ENV).local
1. .env.local (Not checked when NODE_ENV is `test`.)
1. .env.$(NODE_ENV)
1. .env
   
For `NODE_ENV` the only allowed values are development, production, and test. In case of the precedence, if NODE_ENV is `development` and you define a variable say `DB_HOST` in both `.env.development.local` and `.env`, the value in .`env.development.local` will be used as per above priority order.
You have learned about Next.js environment variables, now it is time to the knowledge into practice in the following section with an example app.

## Example city weather app

To put the things you have learned about Next.js environment variables you will clone and run an example app that can show the temperature of a given city. The application has two parts. The first part to call an API with an API key to get the weather for a city will use a server-only environment variable. 

Then the second part is adding Google Analytics 4 script to the application which will use the public (frontend/browser) level environment variable.
The running app looks like the below:

<img class="center" loading="lazy" src="/images/nextjs-env-variables/03nextjs-app-running.jpg" title="Next.js city weather app running on Vercel" alt="Next.js city weather app running on Vercel">

As you can see, it is a stock Next.js app [installed](https://nextjs.org/docs/getting-started/installation#automatic-installation) with `npx create-next-app@latest`. It does not use Typescript and Tailwind but it does use the new app router and EsLint. To come to the above stage, the following two Next.js environment variables have been used:

```bash
API_NINJAS_API_KEY="API_NINJAS_API_KEY-value"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-**--------"
```

You can understand what is happening in the application by having a look at the visual representation of the communication flow between the systems involved as follows:

<img class="center" loading="lazy" src="/images/nextjs-env-variables/04nextjs-app-architecture.jpg" title="Next.js city weather app talking with API Ninjas API and Google Analytics" alt="Next.js city weather app talking with API Ninjas API and Google Analytics">

When the user hits the URL with (or without the city), the Next.js app will send a request to [API Ninjas](https://api-ninjas.com/) with the API key provided (for free) by API Ninjas. This app calls the API Ninjas’ [weather API](https://api-ninjas.com/api/weather) sending the city name. If no city name is given it falls back to London.

If you put the API Key from API Ninjas in public other people can use it and/or abuse it as well. That is why it is set as a server-level Next.js environment variable. For your app to work you will also need to register and get your own free API key from  API Ninjas.

Another system involved is Google Analytics. A GA4 tag is added to the weather app that will report the page views to Google Analytics. It used the measurement ID to identify the app. You can follow this [tutorial](https://hackernoon.com/setting-up-google-analytics-4-in-a-nextjs-project) to get a step-by-step process to add GA4 on a Next.js app.

The goal of this guide is to explain the Next.js environment variables. As the GA4 script runs on the browser level the measurement id environment variable is set to `NEXT_PUBLIC` so that it can be used on the frontend/browser. This environment variable can be exposed to the public.

The app is deployed on Vercel currently, you can also use [Next.js with Docker](/blog/2023/01/nextjs-docker/) to run the app locally. With Docker, you can easily run any Next.js application without the need to have a specified version of Node.js or NPM. These dependencies can be configured as code in the Dockerfile.

### City weather Next.js app code

The code of the stock Next.js starter template has been changed a bit to add a server call to API Ninjas and also add the Google Analytics 4 script on the page. You will need to know how Next.js works as a prerequisite. All the code changes have been done to the `src/app/page.js` file which looks like the below:

```js
import Image from 'next/image';
import styles from './page.module.css';
import Script from 'next/script';
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

async function getWeatherData(city) {
  const res = await fetch(`https://api.api-ninjas.com/v1/weather?city=${city}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.API_NINJAS_API_KEY,
    },
  })
  const data = await res.json(); 
  data.city = city;
 
  return data;
}

export default async function Home(req) {
  const city = req.searchParams.city || 'London';
  const weatherData = await getWeatherData(city);
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Current temperature in {weatherData.city} is 
          <code className={styles.code}> {weatherData.temp} C</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}></div>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </main>
  )
}
```

The change to this `src/app/page.js` are as follows:

* The `Script` tag has been imported from `next/script` on line no 3
* On the line 4, You have also assigned the Next.js environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` to a constant called `GA_MEASUREMENT_ID`
* From lines 6-17, the getWeatherData async function uses fetch to call the API Ninjas’ weather API passing the city that is passed in as a parameter to the function. It returns the data received from the API call after adding the city to it. This function runs on the server and it used the `API_NINJAS_API_KEY` Next.js environment variable to make the call to the API.
* In the Home component, `city` is fetched from the URL query parameter if it exists else the city variable gets a fallback value of `London` on line 20.
* On line 21, the `getWeatherData` function is called with the city constant set on line 20.
* The name of the city and the current temperature in that city are rendered,  on lines 24-28
* On lines 60-71, the GA4 tag is placed which uses the public Next.js environment variable twice. Once for the Google tag manager and again at line 69 for the GA config.
  
With these changes now you have used both the server side and client (browser) side Next.js environment variable in a small but useful and working application. All the code is available in the public [GitHub repository](https://github.com/geshan/nextjs-weather-geo/tree/master).

You can easily deploy this app on Vercel by clicking the “Deploy” button on the readme or find it running on [Vercel](https://nextjs-weather-geo.vercel.app/?city=Sydney). You can clone/fork the repo and change the to fit your needs.

Hurray! You have learned how to use the Next.js environment variable with the help of an example working app that fetches the live weather for any given city and sends back analytics to GA 4.

## Conclusion

In this guide, you learned about Next.js and its popularity. Then you also gained some knowledge about environment variables for web applications and specifically for Next.js. After that, you learned both types of Next.js environment variables (server and client ones which are public) and the order of precedence to use them.

Then you looked at an example of a Next.js app that pulls in the current weather for any given city using both server-level and client/browser-level environment variables.

I hope you learned something new, keep absorbing more knowledge. If you have any questions or comments please leave them below.
