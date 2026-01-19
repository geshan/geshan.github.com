---
layout: post
title: A step-by-step guide to using Inquirer.js for creating a CLI app in Node.js
date: 2023-03-25T23:27:57.000+11:00
comments: true
tags:
- Node.js
- Javascript
- Web Development
cover: "/images/inquirer-js/01inquirer-js.jpg"
pagetitle: A step-by-step guide to using Inquirer.js for creating a CLI app in Node.js
description: In this step-by-step tutorial learn how to use Inquirer.js to create a simple yet complete CLI app using Node.js.
keywords: inquirer js, inquirer, npm inquirer
---
Inquirer.js is a useful NPM package to create Command Line Interface (CLI) apps with Node.js. You can make interactive interfaces by using Inquirer with questions of type option, list, checkbox, input, etc. This makes the CLI application built in Node.js with Inquirer.js useful. In this guide, you will learn how to create a basic CLI app in Node.js with Inquirer.js, let’s get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/inquirer-js/01inquirer-js.jpg" title="Learn how to use Inquirer.js to bulid CLI apps in Node.js" alt="Learn how to use Inquirer.js to bulid CLI apps in Node.js">

## Table of contents

* [Example App](#example-app)
* [Prerequisites](#prerequisites)
    * [Initial setup](#initial-setup)
    * [Install inquirer.js and Axios](#install-inquirer.js-and-axios)
    * [Code to get the first name](#code-to-get-the-first-name)
    * [Code to guess gender and nationality calling APIs](#code-to-guess-gender-and-nationality-calling-apis)
    * [Sew up everything together](#sew-up-everything-together)
* [Popularity of Inquirer.js](#popularity-of-inquirer.js)
* [Inquirer.js plugins](#inquirer.js-plugins)
* [Conclusion](#conclusion)

## Example App

For this tutorial, you will create a command line application that will ask for a first name and then try to determine the nationality and gender of that name by calling a couple of APIs. Both gender and nationalities will have a probability provided by respective APIs and the app will look like the below when complete:

<img class="center" loading="lazy" src="/images/inquirer-js/02inquirer-js-app-demo.gif" title="Running CLI app built with Inquirer.js in Node.js" alt="Running CLI app built with Inquirer.js in Node.js">

This is not a simple listing of the options avaiable in Inquirer.js. So get ready to build a simple yet complete and useful CLI app using Inquirer.js.

### Prerequisites

Before we dive in, below are some prerequisites for better understanding the code:

1. Knowledge of how to use Node.js and install NPM packages is required
1. General understanding of how promises and async/await work is necessary 
1. Prior experience using Git and GitHub will be helpful
1. Any prior knowledge of building CLI apps will be beneficial

Now you can get your hands dirty with some commands and code.

### Initial setup

To get the basic setup of the project with a readme and the git ignore file you can clone the repository with the following command:

```bash
git clone -b initial-setup git@github.com:geshan/inquirer-demo.git
```


Then you can go into this folder with the basic setup with `cd inquirer-demo`. To set up the project as a Node.js NPM project you will have to run:

```bash
npm init -y
```

The above command will initialize the project as an NPM project and the `-y` flag accepts the command with all the default values. At this point, you will have a `package.json` file at the root of the project. One important thing here is to add the `” type”: “module”,` as seen [here](https://github.com/geshan/inquirer-demo/blob/master/package.json#L6) in your package.json file to allow the usage of `import` in place of `require` in the scripts. In the next section, you will install the needed NPM packages.

### Install inquirer.js and Axios

To build your basic but useful command line interface application with Node.js, you will install two packages. Those two NPM packages are [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) and Axios. You will use Inquirer to get the input from the user over the CLI. Axios will be used to do GET requests to the API that guess the gender and nationalities of the given first name.

To install both packages you can execute:

```bash
npm install --save inquirer axios
```

This will install both packages and add them to the package.json file too. Next, you will code up the part to get the first name and ask for which actions to perform.

### Code to get the first name

Now as you have the necessary package installed and available for use, the next part is to write code to get the first name and operations the user wants to perform. To do this using Inquirer.js with validation you will write the code as seen below:

```js
import inquirer from 'inquirer';

(async () => {
  try {
    const answers = await getAnswers();
    console.log('The answers are: ', answers);
  } catch (err) {
    console.error(`There was an error while talking to the API: ${err.message}`, err);
  }
})();

function getAnswers() {
  return inquirer.prompt([{
    name: 'firstName',
    message: 'What is your first name?',
    type: 'input',
    validate: (firstName) => {
      if(!firstName.length) {
        return 'Please provide a first name';
      }
      if(firstName.length <= 3 || firstName.length > 20) {
        return 'Please provide a first name between 4 and 20 characters long';
      }

      return true;
    },
    filter: (firstName) => {
      return firstName.trim();
    }
  },
  {
    name: 'options',
    message: 'What would you like to guess for the given first name?',
    type: 'checkbox',
    choices: ['gender', 'nationality'],
    validate: (options) => {
      if (!options.length) {
        return 'Choose at least one of the above, use space to choose the option'
      }

      return true;
    }
  }]);
}
```

You can see here, the inquirer package is imported to ask for input from the user. Then you have defined an async [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) to enable async/await syntax. In this guide I wrote for another publication, you can learn all about [async JavaScript](https://blog.appsignal.com/2022/11/09/how-to-handle-async-code-in-javascript.html) including callbacks, promises and async/await syntax.

In this IIFE, the `getAnswers` function is called with the `await` keyword as it returns a promise that resolves to the `answers` object. Then the `answers` object is logged to see what is captured from the user. In case of an error, the error is logged on the console with a `console.error`.

The main part of this file is in the `getAnswers` function. It starts by returning the result of an `inquirer.prompt` that returns a [promise](https://github.com/SBoudrias/Inquirer.js/#inquirerpromptquestions-answers---promise). With the `prompt` method you can pass an array of questions and get back the answers object with the answer for each question. For this particular app, you are passing two questions, the first one to ask for the first name and the second one to ask for the operations to perform. 

The first name is a regular input field where the user can type in an answer. The important part is you are using a `validate` function to make sure that the first name is between 3 and 20 characters. Other checks could have been done here like the first name cannot be numeric. Another feature you have used is the `filter` function that filters the value sent in by the user. The filter function here trims out any spaces before or after the answer, this means if the user input `    liam    ` it will result in `liam` trimming the spaces entered by the user before and after the input.

Next, you are asking the user for the choice of `gender` and/or `nationality`. Hence the choices option is used with two values accordingly. The `validate` function in this question makes sure that at least one of the two options is selected before going on. If you do not select any option the app will look like the below:

<img class="center" loading="lazy" src="/images/inquirer-js/03inquirer-js-validation.jpg" title="Example of validation in Inquirer.js" alt="Example of validation in Inquirer.js">

And when you have entered the right values the app will go ahead and log the answers array. 
You can save the above file as `answers.js` and run it with `node answers.js` command. You can view the full code of this file on [GitHub](https://github.com/geshan/inquirer-demo/blob/master/answers.js) too. As you have the required input from the user, next you will write the code to call the free APIs to guess the gender and nationality of the provided first name.

### Code to guess gender and nationality calling APIs

In this section, you will write the code to fetch the gender and nationality guesses for the given first name from the respective APIs.

```js
async function guessGender(firstName) {
  const response = await axios.get(`https://api.genderize.io/?name=${firstName}`);
  const { gender, probability } = response.data;
  console.log(`The API guessed the gender for ${firstName} to be ${gender} with ${(probability * 100).toFixed(2)}% probability`);
}

async function guessNationality(firstName) {
  const response = await axios.get(`https://api.nationalize.io/?name=${firstName}`);
  const { country } = response.data;
  if (!country || !country[0]) {
    console.log(`The API could not guess the nationality for the name ${firstName}`);
    return;
  }
  //can use this API to get country name from ISO 2 - http://api.worldbank.org/v2/country/np?format=json
  console.log(`The API guessed the nationality for ${firstName} to be ${country[0].country_id} with the highest probability of ${(country[0].probability * 100).toFixed(2)}%`);
}
```

There are two functions in the above code block. The first one is `guessGender` which calls the `genderize.io` API passing the first name to guess the gender. It uses the [Axios](https://axios-http.com/) package to make the HTTP Get call. Axios is a popular promise-based HTTP client that can be used in both Node.js and the browser. To make this call more resilient you can use [Axios Timeout](/blog/2022/11/axios-timeout/) too. From the response body, it plucks out the `gender` and the `probability` using destructuring to use it in the log to print out the guessed gender of the given first name with its probability. The `toFixed` method is used in the log to show an output like `95.74%` in place of `95.7537437%`.

Next, you have coded the `guessNationality` function that does a similar thing by doing an HTTP Get call on the `nationalize.io` API using Axios. This API returns an array of countries with its probability for nationality. From this list, as it is sorted with the highest probability first, you pick the first country and print its `id` (which is the ISO2 code) and the probability with a `toFixed` formatting. In the next section, you will join up the above two code pieces to have a fully functioning CLI application to get the first name and guess the gender and/or nationality of that first name.

### Sew up everything together

At this juncture, you will piece together all the above code to form the working CLI application. The full application with fetching the answers from the user and calling the APIs looks as follows:

```js
import axios from 'axios';
import inquirer from 'inquirer';

(async () => {
    try {
    const answers = await getAnswers();

    console.log('Calling API(s) might take some time...');
    for(const option of answers.options) {
      if (option === 'gender') {
        await guessGender(answers.firstName);
      }

      if (option === 'nationality') {
        await guessNationality(answers.firstName)
      }
    }
    
  } catch (err) {
    console.error(`There was an error while talking to the API: ${err.message}`, err);
  }
})();

function getAnswers() {
  return inquirer.prompt([{
    name: 'firstName',
    message: 'What is your first name?',
    type: 'input',
    validate: (firstName) => {
      if(!firstName.length) {
        return 'Please provide a first name';
      }
      if(firstName.length <= 3 || firstName.length > 20) {
        return 'Please provider a first name between 4 and 20 characters long';
      }

      return true;
    },
    filter: (firstName) => {
      return firstName.trim();
    }
  },
  {
    name: 'options',
    message: 'What would you like to guess for the given first name?',
    type: 'checkbox',
    choices: ['gender', 'nationality'],
    validate: (options) => {
      if (!options.length) {
        return 'Choose at least one of the above, use space to choose the option'
      }

      return true;
    }
  }]);
}

async function guessGender(firstName) {
  const response = await axios.get(`https://api.genderize.io/?name=${firstName}`);
  const { gender, probability } = response.data;
  console.log(`The API guessed the gender for ${firstName} to be ${gender} with ${(probability * 100).toFixed(2)}% probability`);
}

async function guessNationality(firstName) {
  const response = await axios.get(`https://api.nationalize.io/?name=${firstName}`);
  const { country } = response.data;
  if (!country || !country[0]) {
    console.log(`The API could not guess the nationality for the name ${firstName}`);
    return;
  }
  //can use this API to get country name from ISO 2 - http://api.worldbank.org/v2/country/np?format=json
  console.log(`The API guessed the nationality for ${firstName} to be ${country[0].country_id} with the highest probability of ${(country[0].probability * 100).toFixed(2)}%`);
}
```

While sewing up the code, the new thing that has been added is how the answers are parsed in the async IIFE. After the answers have been collected, a log is added to notify the user that API(s) are being called which can take some time. Then you loop through each of the options in the `answer.options` array. If the option is `gender` you call the `guessGender` function by passing the first name. Similarly, if the option is `nationality` you call the `guessNationality` function again passing the first name. For all function calls of `getAnswers`, `guessGender`, and `guessNationalty` they are wrapped in a try, catch so that in case of any error it is logged. 

All the code is available in a [GitHub repository](https://github.com/geshan/inquirer-demo) for your reference, the above [file](https://github.com/geshan/inquirer-demo/blob/master/index.js) is also included. You can use other options available on Inquirer.js too like [list](https://github.com/SBoudrias/Inquirer.js/#list---type-list), [expand](https://github.com/SBoudrias/Inquirer.js/#expand---type-expand) and [confirm](https://github.com/SBoudrias/Inquirer.js/#confirm---type-confirm) types as per need. 

You can run the final code by executing `node index.js` which will look like the following:

<img class="center" loading="lazy" src="/images/inquirer-js/02inquirer-js-app-demo.gif" title="Running CLI app built with Inquirer.js in Node.js" alt="Running CLI app built with Inquirer.js in Node.js">

Hurray! You have built a running CLI application in Node.js using Inquirer.js and also used important features of the library like validation and filter in the process. You can run multiple commands with [NPM concurrently](/blog/2022/09/npm-concurrently/) or try [JavaScript Promise all](/blog/2022/07/javascript-promise-all/) for a similar effect programatically.

You might not know that Inquirer.js is one of the most popular Node.js NPM libraries to build CLI apps much more used than the native [Node.js readline](/blog/2022/03/nodejs-readline/), that is what you will find out next. 

## Popularity of Inquirer.js

Inquirer.js is one of the most popular NPM libraries to write a CLI application in Node.js. As per [NPM trends](https://npmtrends.com/enquirer-vs-inquirer-vs-prompt-vs-prompts) it has been downloaded almost 28.5 million times in the week ending 12-Mar-2023 as seen below:

<img class="center" loading="lazy" src="/images/inquirer-js/04inquirer-js-popularity.jpg" title="With almost 28.5 million downloads per week, Inquirer.js is pretty popular" alt="With almost 28.5 million downloads per week, Inquirer.js is pretty popular">

It was created 10 years ago and has over 17.6K stars. It is not as popular as [commander.js](https://github.com/tj/commander.js) but has the advantage of being a bit simple and supporting Promises. Another advantage is the plugin architecture of Inquirer.js discussed in the next section. 

## Inquirer.js plugins

Inquirer.js has a plugin-enabled architecture and there are many [plugins](https://github.com/SBoudrias/Inquirer.js#plugins) available. For instance, you could make the output colorful using the [NPM chalk] package pipe [plugin](https://github.com/LitoMore/inquirer-chalk-pipe) with Inquirer. Similarly, you could also use make use of the [auto complete](https://github.com/mokkabonna/inquirer-autocomplete-prompt), [data time](https://github.com/DerekTBrown/inquirer-datepicker-prompt) and even [emoji](https://github.com/tannerntannern/inquirer-emoji) plugins.

The plugins ecosystem makes Inquirer.js a more interesting option in comparison to other options.

## Conclusion

In this tutorial, you learned how to create a simple yet complete and useful CLI application in Node.js using Inquirer.js which can guess the gender and nationality of a given first name by calling a couple of APIs. You also used advanced features of Inquirer.js like validation and filter. Then you were informed about the enormous popularity of Inquirer.js and its useful plugins. 

I hope you learned something new and how to build a useful CLI application in Node.js using Inquirer.js.
