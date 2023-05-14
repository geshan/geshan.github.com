---
layout: post
title: A beginner's guide to using React Toastify with code examples
date: 2023-05-14T23:47:52.000+11:00
comments: true
tags:
- Javascript
- Web Development
cover: "/images/react-toastify/01react-toastify.jpg"
pagetitle: A beginner's guide to using React Toastify with code examples
description: In this tutorial you will learn how use React Toastify to show toast message on an exiting React.js application.
keywords: react toastify, toastify react, react toast, toast react
---
React Toastify is the most popular NPM package to show toast messages on a React.js application. In this guide, you will learn how to use React Toastify in a simple React.js app that guesses nationalities for a given name, let’s get going!

<!-- more -->

<img class="center" loading="lazy" src="/images/react-toastify/01react-toastify.jpg" title="Learn how to use React Toasitfy on a React.js app" alt="Learn how to use React Toasitfy on a React.js app">

## Table of contents

* [Why use React?](#why-use-react)
* [Options to show messages in React](#options-to-show-messages-in-react)
* [React Toastify](#react-toastify)
* [When to use React Toastify](#when-to-use-react-toastify)
* [How to use React Toastify](#how-to-use-react-toastify)
* [Popularity of React Toastify](#popularity-of-react-toastify)
* [Conclusion](#conclusion)

<!-- tocstop -->

## Why use React?

React is a the most popular JavaScript library for building user interfaces. As per the [State of JavaScript 2022](https://2022.stateofjs.com/en-US/libraries/front-end-frameworks/) survey, React is used by 82% of the respondents making it the most used library. Not only that, it has been no. 1 since 2016 in that survey. It is known for its declarative syntax, its component-based architecture, and its ability to be used with a variety of different front-end frameworks.

React is popular for a number of reasons. First, the declarative syntax makes it easy to write code that is both readable and maintainable. Second, React is pretty performant. It is able to render complex user interfaces without sacrificing performance. Third, React is very flexible. It can be used to build a wide variety of different user interfaces, from simple web pages to complex mobile apps.

Eventhough the latest docs React is not favoring [Create React App (CRA)](https://create-react-app.dev/), it is pointing to meta frameworks like Next.js and others. For this guide, we will use a React.js application created with CRA to show the toast messages using React Toasitfy.

## Options to show messages in React

There are a number of different ways to show messages with React. One option is to use the built-in alert() function. However, this function is not very flexible and it can only be used to show a single message at a time.

Another option is to use a third-party library. The two popular ones on NPM are [React Hot Toast](https://react-hot-toast.com/) and [React Toastify](https://fkhadra.github.io/react-toastify/introduction). React Toastify is a library that makes it easy to show toast notifications in React applications or other applicaitons built with meta frameworks that use React in the background like Next.js. 

Toast notifications are small, temporary messages that are displayed at the bottom of the screen or some other position on the screen. They are often used to notify users of errors, successes, or other important events. In the next section, you will learn more about React Toastify and how to use it in a React app.

## React Toastify

React Toastify is the most popular library used to display toast messages in React applications. It provides a simple and flexible API for creating toast messages that can be customized to fit your application’s look and feel. React Toastify offers different types of toasts, including success, error, warning, and info messages. The library also allows you to set the duration, position, and styling of the toast messages.

React Toastify provides a convenient and customizable way to display toast messages in React applications. Its simplicity, flexibility, and extensive features make it a the most popular choice among developers for handling notifications and user feedback. By using React Toastify, you can enhance the user experience, improve communication, and streamline the presentation of information.

React Toastify offers a powerful and user-friendly solution for displaying toast messages in React applications. It simplifies the process by providing a single component that handles the display of notifications, allowing developers to focus on the content and behavior. React Toastify comes with a range of features, including customizable appearance, position, duration, and the ability to add actions or buttons to the toast. It is compatible with different React versions and actively maintained by the developer community.

React Toastify is a popular library for showing toast notifications in React applications. It is easy to use and it comes with a number of features, such as:

* Support for different toast types, such as success, error, and warning
* Support for different toast positions, such as top, bottom, left, and right
* Support for toast animations
* Support for toast icons
* Support for toast customizability

In the next seciton you will learn about when to use a toast message package like React Toastify.


## When to use React Toastify

React Toastify is particularly useful in scenarios where you need to display notifications or toast messages to users. Some common use cases include:

Notifications for successful form submissions: After a user submits a form, you can display a success message to provide feedback and acknowledge the completion of the action.

Displaying errors or validation messages: When form validation fails or an error
occurs, React Toastify can be used to show error messages or highlight specific fields that require attention.

Feedback during asynchronous operations: When performing asynchronous operations like API calls or file uploads, you can show loading indicators or progress bars using React Toastify to keep users informed about the ongoing process.

Informational messages: You can use React Toastify to display informative messages or announcements to users, such as system updates, new features, or important notifications.

In the next part, you will learn how to use React Toastify to inform the user about the result of an API call to guess the nationalities for a given name.

## How to use React Toastify

React Toastify can be used in any React app be it a native React application or React running behind a meta framework like Next.js or Remix. You can run [Next.js in a docker container](/blog/2023/01/nextjs-docker/) too. For this guide, you will implement it in an exiting React.js application that guesses the nationalities of a given name, which is open source and all the code is available on [GitHub](https://github.com/geshan/name-nationality). 

Without React Toasitfy the app looks like the below:

<img class="center" loading="lazy" src="/images/react-toastify/02react-toastify-without.jpg" title="Name to Nationalities guessing app without using React Toastify" alt="Name to Nationalities guessing app without using React Toastify">

After adding React Toasitfy to show the success (or error) of fetching the guessed nationalities for a given name the app looks as follows:

<img class="center" loading="lazy" src="/images/react-toastify/05react-toastify-app.jpg" title="Name to Nationalities guessing app with React Toastify" alt="Name to Nationalities guessing app with React Toastify">

To install React Toastify in your React.js applicaiton you should first run:

```bash
npm install --save react-toastify
```

After that you can import and use the toasitify elements like `toast` and `ToastContainer`.  You will edit the `/src/App.js` file as follows, the edited code is highlighted in yellow:

```js/3-4,11,19-28,32-35,63
{% raw %}
import { useState } from 'react';
import './App.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [nationalities, setNationalities] = useState([]);
  const [personName, setPersonName] = useState('');

  async function fetchNationalities() {
    const toastId = 'fetched-nationalities';
    try {
      const data = await (await fetch(`https://api.nationalize.io/?name=${personName}`)).json();
      const hasCountryData = data.country && data.country.length
      const nationalities =  hasCountryData ? data.country : [];
      setNationalities(nationalities);
          
      const message = hasCountryData ? `${data.country.length} guess(es) found` : 'No nationality match found';
      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, //3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId,
        transition: Slide
      });
    } catch (err) {
      console.log(`err: ${err.message}`);
      setNationalities([]);
      toast.error('Cound not fetch nationalities, please try again later', {
        position: toast.POSITION.TOP_RIGHT,
        toastId
      });
    }
  }

  async function handleSubmit(e){
    e.preventDefault();
    await fetchNationalities();
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="title-form">
          <h2>Check Name's Nationalities percent</h2>
          <div style={{ marginBottom: '20px' }}>
            <form name="nationalities-form" onSubmit={handleSubmit}>
              <input
                name="personName"
                type="text"
                onChange={(e) => setPersonName(e.target.value)}
                value={personName}
                placeholder="Enter a person's name"
              />
              <button onClick={handleSubmit}>Get Nationalities</button>
            </form>
          </div>
        </div>
        <div className="results">
          <div className="toast-container"><ToastContainer limit={2}/></div>
          <div className="nationalities">
            {Array.isArray(nationalities) && nationalities.map(
              nationality => {
                const flagUrl = `https://flagcdn.com/w160/${nationality.country_id.toLowerCase()}.jpg`;
                const altText = `${nationality.country_id} flag`;
                return <div key={nationality.country_id}><h3>{nationality.country_id} - {(nationality.probability * 100).toFixed(2)}%</h3> <img src={flagUrl} alt={altText} style={{
                  border: "1px solid black"
                }} /></div>
              }
            )}
          </div>
        </div>        
      </header>
    </div>
  );
}

export default App;
{% endraw %}
```

Let’s try to understand the changes that have been done to get React Toasitfy working:

* First you have imported `Slide`, `ToastContainer` and `toast` function from react-toastify and also imported the `ReactToastify.css` style sheet used to style the toast messages.
* After that, on line 11 you have defined the `toastId` as `fetched-nationalites` it is used to eliminate duplicates of the same toast later. This will be used later in the code.
* In place of setting a message variable, you are calling `toast.success` on line no. 19. You are also passing other parameters as an object defining the position to show the toast on the top center. You are also specifying other config options like `autoClose` after 3 seconds, make it draggable, etc. One important config passed is the `toastId` which prevents duplicates. All these option are well defined in the [usage section](https://fkhadra.github.io/react-toastify/positioning-toast) of the React Toasitfy official docs. 
* Then, you have also defined a `toast.error` in case there is any error calling the API on line 32. Here as well a couple of configs have been used.
* Lastly, you are defining a div with class `toast-container` that has the `ToastContainer` element in it.  This is the div that houses the toast messages and it has a limit of 2 set on it.

If you run the app with `npm start` and point your browser to `http://loccalhost:3000` then type `chris` in the text box you will see an output like the below:

<img class="center" loading="lazy" src="/images/react-toastify/03react-toastify-guess-app.gif" title="Name to Nationalities guessing app with React Toastify Running" alt="Name to Nationalities guessing app with React Toastify Running">

For your reference, all the changes is available as a [pull request](​​https://github.com/geshan/name-nationality/pull/13) on GitHub. You can also try out the app with React Toastify on [Netlify](https://deploy-preview-13--name-nationality.netlify.app/). You can also view the generic React Toastify examples ona Next.js app in this [GitHub repo](https://github.com/geshan/react-toastify-examples). This Next.js example is also running on [Vercel](https://react-toastify-examples.vercel.app/).

This app uses [React Fragments](/blog/2023/02/react-fragments/) and if you want you can also add a [React Search Bar](/blog/2022/10/react-search-bar/). In the next section, you will find out that [React Toastify](https://www.npmjs.com/package/react-toastify) is the most popular NPM package to show toast messages.


## Popularity of React Toastify

Without doubts, React Toastify is the most popular NPM library to show toast message in React. The distant second is React Hot Toast as per [NPM Trends](https://npmtrends.com/react-confirm-alert-vs-react-hot-toast-vs-react-toastify-vs-react-toastr-vs-react-toasts) as seen below:

<img class="center" loading="lazy" src="/images/react-toastify/04react-toastify-popularity.jpg" title="React Toastify is the most popular NPM package to show toast message, second one is Hot React Toast" alt="React Toastify is the most popular NPM package to show toast message, second one is Hot React Toast">

As you can see, React Toastify has more than 2.5x the number of downloads compared to its nearest competitor [React Hot Toast](https://react-hot-toast.com/). In terms of absolute numbers, React Hot Toast had 565K downloads in the week of 7-May-2023, where as React Toasity has 1.41 million download in the same week. Other libraries like React Confirm Alert, React Toaster and React Toasts don’t come close to the top two libraries to show react toast messages.

If you need to show toast messages in your React.js app React Toasitfy is the safest bet, the second best thing can be React Hot Toast.

## Conclusion

In this blog post, you explored why React is widely used and the options available for displaying messages in React applications. You learned about React Toastify and provided code examples to demonstrate its usage. Various scenarios where React Toastify can be beneficial, such as form submissions, error handling, asynchronous operations, and informational messages were also discussed.

Remember to leverage the power of React Toastify's configuration options to customize the appearance, position, and behavior of toast messages to align with your application's design and user experience goals.

By incorporating React Toastify into your React projects, you can elevate the way you communicate with users and deliver a more engaging and interactive web application.

Happy coding with React Toastify!
