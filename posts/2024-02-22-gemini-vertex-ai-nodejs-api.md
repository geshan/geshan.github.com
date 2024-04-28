---
layout: post
title: "How to create a text summarizer API using Gemini on Vertex AI with Node.js a step-by-step guide [Part 2]"
date: 2024-02-22T23:47:42.000+11:00
comments: true
tags:
- AI
- Gen AI
- Node.js
- GCP
cover: "/images/gemini-vertex-ai-nodejs-api/01gemini-vertex-ai-nodejs-api.jpg"
pagetitle: "How to create a text summarizer API using Gemini on Vertex AI with Node.js a step-by-step guide [Part 2]"
description: "Learn how to create a simple summarizer with Gemini API on Vertex AI with Node.js that runs on the CLI."
keywords: Gemini, Gemini api, vertex ai, gemini node.js, vertex ai nodejs, vertex ai node.js, google gemini, gemini pro nodejs
---
Gemini by Google is a powerful LLM and in this tutorial, you will use the Gemini Pro 1.0 version to summarize text from a URL. In the previous [part](https://geshan.com.np/blog/2024/02/gemini-vertex-ai-nodejs/) you learned how to set up a GCP project, try out the prompt on Vertex AI studio and then try to code on the CLI. In this part, you will refactor and converter that code to take in a URL, scrape its content, and use it to create the summary, let's get going!

<!-- more -->

<img class="center" src="/images/gemini-vertex-ai-nodejs-api/01gemini-vertex-ai-nodejs-api.jpg" title="How to create a text summarizer API using Gemini on Vertex AI with Node.js a step-by-step guide [Part 2]" alt="How to create a text summarizer API using Gemini on Vertex AI with Node.js a step-by-step guide [Part 2]">

## Table of contents

* [Where we left in the last part](#where-we-left-in-the-last-part)
* [Build the Node.js API](#build-the-node.js-api)
  * [Create gemini.js file](#create-gemini.js-file)
  * [Add scraper.js file](#add-scraper.js-file)
  * [New cli.js](#new-cli.js)
  * [Build the Express.js API](#build-the-express.js-api)
* [Conclusion](#conclusion)

## Where we left in the last part

From the [last part](/blog/2024/02/gemini-vertex-ai-nodejs/), you have a folder called `summarizer-gemini` which has the `@google-cloud/vertexai` NPM module installed and `cli.js` file that can summarize the static text which is in the same file. When you run `node –no-warnings cli.js`, it will show you an output similar to the following:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs/17cli-output-sync.jpg" title="Better one shot non-streamed output after changing the code to work in a sync manner" alt="Better one shot non-streamed output after changing the code to work in a sync manner">

After the quick recap, in the next section, you will build the API step-by-step starting with some code refactoring and reorganization. Then you will add a scraper and glue everything up with two entry points, one is a CLI and another one is a Web App with API.

## Build the Node.js API

As the first task for this part, you will refactor the code from `cli.js` to another file called `gemini.js`.

### Create gemini.js file

Create a new file called `gemini.js` and it will have the following code (which is similar to the `cli.js` file):

```js
const { VertexAI } = require('@google-cloud/vertexai');

const vertex_ai = new VertexAI({ project: 'gemini-api-414910', location: 'us-central1' });
const model = 'gemini-pro';

const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generation_config: {
    "max_output_tokens": 2048,
    "temperature": 0.9,
    "top_p": 1
  },
  safety_settings: [
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    }
  ],
});

async function getSummary(text) {
  const prompt = 'As an expert writer with more than a decade of experience please summarize the following in under 125 words words. You are allowed to rephrase given the summary means the same as the original text:\n\n';
  const req = {
    contents: [{ role: 'user', parts: [{ text: `${prompt}${text}` }] }],
  };

  const resp = await generativeModel.generateContent(req);
  const summary = resp.response?.candidates[0]?.content?.parts[0]?.text;

  return summary;
};

module.exports = {
  getSummary
}
```

The things that have changed here is, that you have renamed the `getContent` function to `getSummary`. Then you have also removed the static text that had news about removing waste from waterways to a new variable called `text`. The `text` variable is passed in as a parameter to the `getSummary` function which makes it dynamic. Then you expose the get summary with the `module.exports` so that it can be used with require in any other file and get the returned summary.

In the next section, you will add a basic scraper using Axios and Cheerio (packaged together as axrio).

### Add scraper.js file

As the aim is to scrape content from a given URL, you will need to add a new NPM package. It is a mixture of [Axios](https://axios-http.com/) and [Cheerio](https://cheerio.js.org/) called [Axrio](https://www.npmjs.com/package/@geshan/axrio). The readme shows how easy it is to use to scrape any given web page. To install `axrio` you can run the following:

```bash
npm install --save @geshan/axrio
```

Running the `npm install` will result in something as follows:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs-api/02install-axrio.jpg" title="Install axrio with NPM to scrape any web page" alt="Install axrio with NPM to scrape any web page">

After that you can create a new file named `scraper.js` which should have the following content:

```js
const axrio = require('@geshan/axrio');

async function getContents(url) {
  try {
    const timeoutInMs = 2000;
    const $ = await axrio.getPage(url, timeoutInMs);

    const bodyContents = $('body').contents().toArray()
      .map(element => element.type === 'tag' ? $(element).text().trim() + ' ' : '')
      .join(' ');

    return bodyContents;
  } catch (e) {
    console.log('Error ', e);
    return '';
  }
}

module.exports = {
  getContents
}
```

Let’s analyze the contents of this file, first, you require the `axrio` package. After that, a function named `getContents` is defined that takes in a URL parameter. In that function, you load the page contents using Axrio to a `$` const. Then you loop through all the nodes of the `body` tag. If the element is a `tag` (not a `script`) it adds it to the array (with the map). At the end, it joins all the pieces with a space in between them.

That is the contents of the page and it returns it. In case of any error, it logs the error and returns an empty string. To test this out you will create a new `cli.js` that will use both the scraper and Gemini files, next.

### New cli.js

Now let’s glue up the Scraper and the Gemini service from the new `cli.js`. The new `cli.js` will look like the below:

```js
const scraper = require('./scraper');
const summaryGenerator = require('./gemini');

(async () => {
  const url = process.argv[2] || 'https://7news.com.au/news/travellers-arriving-in-nsw-urged-to-check-luggage-for-unwanted-stowaway-c-13642953';
  console.log(`Getting summary for url: ${url} \n`);
  const pageContents = await scraper.getContents(url);
  if (pageContents.length === 0) {
    return 'Could not get data from the given URL';
  }
  console.log(await summaryGenerator.getSummary(pageContents));
})();
```

Here, you first require the `scraper.js` and the `gemini.js`  as `summaryGenerator`. Then you have an async [IIEF](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) - Immediately Invoked Function Expression which parses the URL from the CLI parameters. If the URL is not provided it falls back to a News post from 7News. Then it prints the URL it is going to use for scraping and ultimately generating a summary.

After that, it sends the URL to the scraper’s `getContents` function to get the contents of that web page. If there is no content (even due to an error) it returns `could not get data from the given URL` else it sends the page contents to the `getSummary` of the `gemini.js` file to get the summary. 

If you run this script with `node --no-warnings cli.js https://7news.com.au/news/advice-for-swifties-on-getting-to-taylor-swifts-eras-tour-shows-at-sydney-olympic-park-c-13672302` it will show something like the below:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs-api/03updated-cli.jpg" title="New CLI file that can take in the URL scrape it and send out the summary" alt="New CLI file that can take in the URL scrape it and send out the summary">

Now the summarizer is working in the CLI, if you don’t provide a URL it will fallback to the 7News luggage URL. There is a two-second timeout for fetching the page so it will throw an error for slow websites. There is no validation of the URL and other things can be made better too. In the next section, you will add it working as an API.

### Build the Express.js API

To build the API layer on your summarizer using Gemini you will need to install Express.js first with:

```bash
npm install --save express
```

It will look like the below when express is installed with NPM:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs-api/04install-express.jpg" title="Install latest Express.js with npm install" alt="Install latest Express.js with npm install">

Then you can add a file named `index.js` on the root with the following contents:

```js
const express = require('express');
const scraper = require('./scraper');
const summaryGenerator = require('./gemini');

const app = express();
const port = process.env.PORT || '3000';

app.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

app.get('/summary', async (req, res) => {
  const url = req.query?.url || 'https://7news.com.au/news/travellers-arriving-in-nsw-urged-to-check-luggage-for-unwanted-stowaway-c-13642953';
  try {
    new URL(url); //validates if given string is a valid URL
  } catch (err) {
    return res.status(400).json({message: `provider URL ${url} is not a valid URL`});
  }
  console.log(`Getting summary for url: ${url} \n`);
  const pageContents = await scraper.getContents(url);
  if (pageContents.length === 0) {
    return res.status(501).json({message: 'Could not get data properly from the given URL'});    
  }
  const summary = await summaryGenerator.getSummary(pageContents);

  res.json({ summary });
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
```

In this file that has a web server with Express.js, you first require all 3 components needed to make the summarizer API work. Those are the express instance, scraper, and the `gemini.js` file required as the `summaryGenerator` const.

Then, you instantiate a new express app as the `app` const and pull in the port from the environment variable. If the environment variable of `PORT` is not set you fall back to port `3000`. 

The first route you have added for the Express app is `/` which returns a JSON object with a `message` key that has the value `alive`. This acts like a health check for the summarizer API.

After that the bulk of the work is taking place in the `/summary` GET API route. Here you try to get the `url` from the query parameter `url` if not found, you fall back to the news story about luggage in NSW by 7News. It also checks if the given string is a valid URL using the `new URL` construct. If it is not a valid URL the API responds with a status code of `400` and a relevant message.

Then you log the URL to know which web page is being scraped. Subsequently, you scrape the content of that URL’s web page by passing the URL in the scraper’s `getContent` function. It will return the contents of the page if things go fine else it will come back with an empty string. The case of the empty string being returned will translate into a 501 response with the message `Could not get data properly from the given URL`. This can happen if the URL takes more than 2 seconds to respond or the data cannot be easily parsed by the scraper.

If all goes well it will respond with the summary in the `summary` key of the response. At the end of the file the web server is started with the `app.listen` call with a log when the server starts.

You can run it with `node index.js`, for local development you can also use [nodemon](/blog/2021/02/nodemon/). You can also add it as the `npm start` script in the `package.json` file’s script section as highlighted below:

```js/1
"scripts": {
  "start": "node index.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

Then you can run `npm start` on the root of the folder which will give the following output:

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs-api/05npm-start.jpg" title="Start the summarizer API Express.js server with npm start" alt="Start the summarizer API Express.js server with npm start">

After that if you go to your favorite browser and hit `http://localhost:3000/summary?url=https://developer.mozilla.org/en-US/docs/Glossary/IIFE` on the address bar you will see something like the below (if everything went fine):

<img class="center" loading="lazy" src="/images/gemini-vertex-ai-nodejs-api/06gemini-summarizer-api-working.jpg" title="Gemini based text summarizer API working with Node.js and Express" alt="Gemini based text summarizer API working with Node.js and Express">

There you have it, you have successfully converted the sample that you got from Vertex AI - `Get Code` section into a working API. You can easily deploy it to a service like Cloud Run on GCP with or without Dockerzing the app. If you push your code to GitHub you can also use [Cloud Shell Editor](/blog/2024/01/cloud-shell-editor/) to get and deploy the code to Cloud Run, which can be a topic for another blog post. To deploy this code on Cloud Run, some other things will need to be dynamic or picked from the environment variables like the GCP project and GCP location.

The code is also available as an open-source [GitHub repository](https://github.com/geshan/summarizer-gemini) for your reference.

You can also create a [e-commerce product description generator](/blog/2024/04/gemini-ecommerce-product-description-generator/) using Gemini over Vertex AI that takes in pictures and a prompt to give out a decent product description. Try it.

## Conclusion

In part 2 of this tutorial, you were able to convert the sample code into a full-fledged API. You also have a quick way to test out any URL using the modified `cli.js` file. Here is the [part 1](/blog/2024/02/gemini-vertex-ai-nodejs/).

I hope it gives you a solid base to create your Gen AI apps using the Gemini API on Vertex AI in the Google Cloud Platform. This is just scratching the surface, with the right prompts you can create APIs that can do many things like categorize text, generate other text, etc. The possibilities are endless. I hope you learned a useful skill.
