---
layout: post
title: "How to write and deploy a basic Node.js API with Duet AI on VS Code a step-by-step guide"
date: 2023-12-18T23:15:52.000+11:00
comments: true
tags:
- Software Engineering
- Web Development
- Javascript
- Gen AI
- AI
- GCP
- Node.js
cover: "/images/nodejs-duet-ai-vs-code/01nodejs-duet-ai-vs-code.jpg"
pagetitle: "How to write and deploy a basic Node.js API with Duet AI on VS Code a step-by-step guide"
description: "Learn how to write and deploy a basic Node.js API with Duet AI on VS Code, in this step-by-step tutorial with 20+ screenshots!"
keywords: nodejs duet ai, duet ai, duet ai vs code, vs code duet ai
---
As developers, we constantly dance between writing code, managing infrastructure, and keeping tabs on deployment and logs. Wouldn't having an AI teammate that simplifies these tasks be amazing? Duet AI is a Google AI tool that acts as your coding buddy and streamlines the development process, for most applications including Node.js. In this post, you will learn how to use Duet AI to write a simple Node.js API application and deploy it on Google Cloud Run.

<!-- more -->

<img class="center" src="/images/nodejs-duet-ai-vs-code/01nodejs-duet-ai-vs-code.jpg" title="How to write and deploy a basic Node.js API with Duet AI on VS Code a step-by-step guide" alt="How to write and deploy a basic Node.js API with Duet AI on VS Code a step-by-step guide">

## Table of contents

* [Install Duet AI on VS Code](#install-duet-ai-on-vs-code)
* [Writing a simple Node.js API with Duet AI](#writing-a-simple-node.js-api-with-duet-ai)
* [Deploy to cloud run with Duet AI](#deploy-to-cloud-run-with-duet-ai)
* [Conclusion](#conclusion)


## Install Duet AI on VS Code

You can install the Google Cloud Code (Duet AI) extension to [VS Code](https://code.visualstudio.com/) or IntelliJ/[JetBrains](https://www.jetbrains.com/) IDE. For this blog post, you will use VS Code. You can follow the [official guide](https://cloud.google.com/code/docs/vscode/install) to install the Code Cloud extension on your VS Code. Make sure you have linked the right Google Cloud Project where you have enabled Duet AI. After the installation, your VS Code should look like the following:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/02duet-ai-installed.jpg" title="Duet AI (Cloud Code) installed on VS Code" alt="Duet AI (Cloud Code) installed on VS Code">

Please take note of the things I have highlighted in the screenshot, the Google Cloud Project you are connected to, and the Duet AI Icon on the bottom right of VS Code. One more thing you should configure properly is the languages you want Duet AI to support, which can be reached in the Google Cloud Code/Duet AI settings as follows:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/03duet-ai-settings-link.jpg" title="Duet AI (Cloud Code) settings on VS Code" alt="Duet AI (Cloud Code) settings on VS Code">

Then change the settings to include the programming languages you want Duet AI to support, you will find it after scrolling down a bit and you might need to add the languages of your choice:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/04duet-ai-settings-languages.jpg" title="Duet AI (Cloud Code) languages list on VS Code" alt="Duet AI (Cloud Code) languages list on VS Code">

Then you are good to go. In the next section, you will learn how to write a simple Node.js API with Duet AI on VS Code.

## Writing a simple Node.js API with Duet AI

You can either start a new project on your own or clone this open-source GitHub [repository](https://github.com/geshan/nodejs-duet-ai) by running:

```bash
git clone git@github.com:geshan/nodejs-duet-ai.git
```

After the repository is cloned, you can go into it with `cd nodejs-duet-ai` and open it in VS Code. Let's try to initialize the repository with NPM and install Express.js.

To do this, you can ask Duet AI to help you with the following prompt:

```
How do I initialize a Node.js project with NPM?
```

That resulted in:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/05duet-ai-npm-init.jpg" title="Duet AI (Cloud Code) on VS Code helping to initialize a Node.js project with NPM" alt="Duet AI (Cloud Code) on VS Code helping to initialize a Node.js project with NPM">

It gave out the instructions to initialize the project with NPM and also how to add Express.js to the project, as seen above. But, to keep things simple you can run `npm init -y` to just get the `package.json` file set up as I have done above.

As the next step, you will install [Express](https://expressjs.com/) framework to this project. You can ask Duet AI to help you with the following prompt:

```
How do I install and save Express.js to the package.json file?
```

It came back with good instructions but not that great as the `dependencies` part was not there in the `package.json` file.

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/06duet-ai-express.jpg" title="Duet AI (Cloud Code) on VS Code helping to add Express.js to a Node.js project" alt="Duet AI (Cloud Code) on VS Code helping to add Express.js to a Node.js project">

Even though the suggestion was good but not right for the scenario. So you can run `npm install --save express` to install express as well as add it to the `package.json` file, as seen in the above screenshot.

One thing to notice here (which will be true for most/all AI assistants) is, that they can give you a first draft (v1) which kind of works.

> You as the software engineer will need to improvise on the given solution to make it work. Then you will also have to optimize it for performance and scalability.

You can also follow this [Node.js Express](/blog/2021/05/nodejs-express-tutorial/) step-by-step tutorial if you like to create a 1 page Node.js Express application. I also created a `index.js` file with a basic Node.js Express server running on port 8080 copying and changing the code given by Duet AI. The `index.js` looks like the below:

```js
const express = require('express');

const app = express();
const port = 8080 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
```

At this point, you want to add an "OK" route to your Node.js Express application. You can ask Duet AI to help you with the following prompt:

```
how do I add an ok route to express.js?
```

It replied with the following which is useable this time, I added it as seen below:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/07duet-ai-express-route.jpg" title="Duet AI (Cloud Code) on VS Code helping to add Express.js route" alt="Duet AI (Cloud Code) on VS Code helping to add Express.js route">

After that, while adding the route it had a suggestion too:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/08duet-ai-express-suggest.jpg" title="Duet AI (Cloud Code) on VS Code suggesting a new route" alt="Duet AI (Cloud Code) on VS Code suggesting a new route">

Then you can run the server and see the `ok` route is working as expected by running `node index.js`. It will look as follows on your browser: `http://localhost:8080/`:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/09express-running-02.jpg" title="Express running on port 8080" alt="Express running on port 8080">

Now it is time to add a dummy JSON response, so you can ask Duet AI to help you with the following prompt:

```
How can I GET Route with Express.js that returns some blog posts as JSON?
```

That resulted in:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/10duet-ai-dummy-json.jpg" title="Duet AI (Cloud Code) on VS Code suggesting a new route with JSON response for posts" alt="Duet AI (Cloud Code) on VS Code suggesting a new route with JSON response for posts">

You can copy and paste that suggestion to your `index.js` file and run the server again. You can see the dummy JSON response for posts at `http://localhost:8000/posts` as seen below:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/11express-posts-json.jpg" title="Express running on port 8080 with posts JSON" alt="Express running on port 8080 with posts JSON">

Now you have the basic Node.js API running locally with much help from Duet AI. In the next section, you will learn how to deploy this Node.js API on Google Cloud Run from VS Code using Duet AI.


## Deploy to cloud run with Duet AI

To deploy your app to Google Cloud Run, you will need to create a Dockerfile. You can ask Duet AI to help you with this too. Type in the following prompt to get some assistance:

```
Can you give me an optimized dockerfile for this Node.js Express project?
```

Duet AI came back with the following:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/12duet-ai-dockerfile.jpg" title="Duet AI suggesting a Dockerfile for a Node.js app" alt="Duet AI suggesting a Dockerfile for a Node.js app">

So you can copy the suggested code and create a file named `dockerfile` in the root of your project like the below:

```
FROM node:16-slim

EXPOSE 8080

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . ./

CMD [ "npm", "start" ]
```

This `dockerfile` can be made better by implementing multiple things like using Node version 20 the latest LTS as well as using a [multi-stage build](/blog/2019/11/how-to-use-docker-multi-stage-build/). But for now we are going to use this dockerfile with just one line added `EXPOSE 8080` to make it work with Google Cloud Run. 

You can test the Dockerfile by running `docker build -t node-app .` but we will deploy this to Google Cloud Run next. Duet AI as Google Cloud Run support built into it, you can read more about [serverless containers](/blog/2023/04/serverless-containers/) if you like.

If you open your VS Code command palette and type `cloud run`, you will see:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/13duet-ai-cloud-run.jpg" title="Duet AI integrated with Cloud Run" alt="Duet AI integrated with Cloud Run">

When you select that you can deploy your current source code directly to Google Cloud Run without leaving your editor (VS Code). It will take you to the settings page like below:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/14duet-ai-cloud-run-settings-01.jpg" title="Duet AI integrated with Cloud Run service settings" alt="Duet AI integrated with Cloud Run service settings">

In this settings section for Cloud Run, you can set the name of the service (which will take the name of the folder by default), then you can also select the region. After that you can specify the authentication, as you want it to be public the "Allow unauthenticated invocations" is selected. These settings are similar to [deploying](https://cloud.google.com/run/docs/deploying) a Cloud Run service from the Google Cloud Console interface.

When you scroll down you will see more settings as seen below:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/15duet-ai-cloud-run-settings-02.jpg" title="Duet AI integrated with Cloud Run service settings for building" alt="Duet AI integrated with Cloud Run service settings for building">

In this part, you will specify the revision setting and more importantly you will select `Cloud Build` to build your dockerfile on Google [Cloud Build](https://cloud.google.com/build) not your local. This will also push the container to the artifact repository automatically.

After that at the end, you will find the `Deploy` button to deploy your service to Google Cloud Run.

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/16duet-ai-cloud-run-settings-03.jpg" title="Duet AI integrated with Cloud Run service settings for using Dockerfile" alt="Duet AI integrated with Cloud Run service settings for using Dockerfile">

The settings selected here for using Docker and dockerfile are correct. You could also use `cloudbuild.yaml` file but that is out of scope for this post. Next, you can click "Deploy" to deploy your service to Google Cloud Run. That will lead to:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/17duet-ai-cloud-run-deploying.jpg" title="Duet AI deploying Node.js service to Cloud Run" alt="Duet AI deploying Node.js service to Cloud Run">

You can view detailed logs by clicing `Show detailed logs`, which will show you something like:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/18duet-ai-cloud-run-logs.jpg" title="Duet AI deploying Node.js service to Cloud Run logs" alt="Duet AI deploying Node.js service to Cloud Run logs">

As you had selected the build to run on Cloud Build, you can see the process run on Cloud Build in some time like the below:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/19cloud-build.jpg" title="Docker build and push on Cloud Build from Duet AI" alt="Docker build and push on Cloud Build from Duet AI">

It will take some minutes for the whole process to finish, if all of it goes fine you will see a URL where your service will be running on Google Cloud run as follows:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/20cloud-run-deployed.jpg" title="App deployed on Cloud Run with Duet AI" alt="App deployed on Cloud Run with Duet AI">

Then, you can visit that `URL/posts` to see if the app is running properly, and you should be able to see:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/21cloud-run-ok.jpg" title="App deployed on Cloud Run with Duet AI and running well" alt="App deployed on Cloud Run with Duet AI and running well">

You can also check the Cloud Run stats on the service page as seen below:

<img class="center" loading="lazy" src="/images/nodejs-duet-ai-vs-code/22cloud-run-stats.jpg" title="App deployed on Cloud Run with Duet AI and running well with stats" alt="App deployed on Cloud Run with Duet AI and running well with stats">

There you have it, a way to develop a very simple Node.js API with Duet AI. Then you can deploy the app to Cloud Run without leaving your editor/IDE.

## Conclusion

In this post, you learned the basics of Duet AI to create your Node.js API and deploy it on Google Cloud Run. As you have seen Duet AI is very useful for software engineers. It enhances your coding experience and simplifies deployment too. 

> By working alongside Duet AI, you can streamline your development workflow, focus on innovation, and bring your ideas to life faster than ever before. 

So, go ahead, give Duet AI a try, and let your AI teammate take care of the heavy lifting while you code with confidence!

Duet AI also offers additional features like code explanations, refactoring suggestions, and security recommendations. Explore these functionalities to unlock even more potential from your sidekick, Keep exploring!
