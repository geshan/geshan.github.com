---
layout: post
title: How to use React fragments, a step-by-step guide for beginners
date: 2023-02-28T23:28:57.000+11:00
comments: true
tags:
- Software Engineering
cover: "/images/react-fragments/01react-fragments-full.jpg"
pagetitle: How to use React fragments, a step-by-step guide for beginners
description: In this tutorial you will learn how to use React fragments editing a simple but useful app that fetches latest HackerNews stories. Read it!
keywords: react fragment, react fragments, fragment react, react component return multiple HTML elements
---
React is one of the most popular JavaScript libraries. React fragments solves the problem of returning multiple elements without the need of wrapping them in an extra Node (usually a div). 

The fragments feature was introduced in v [16.2](https://github.com/facebook/react/blob/main/CHANGELOG.md#react-17) of [React](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html). In this tutorial, you will learn how to use React fragments to add multiple elements to a React component, let’s get started!

<!-- more -->

<img class="center" loading="lazy" src="/images/react-fragments/01react-fragments.jpg" title="Learn how to use React fragments to return multiple HTML elements from React components" alt="Learn how to use React fragments to return multiple HTML elements from React components">

## Table of contents

* [What are React fragments?](#what-are-react-fragments%3F)
* [Example App - HackerNews](#example-app---hackernews)
    * [The problem when not using React fragments](#the-problem-when-not-using-react-fragments)
* [React fragments solve this problem](#react-fragments-solve-this-problem)
* [Conclusion](#conclusion)

## What are React fragments?

React [fragments](https://reactjs.org/docs/fragments.html) is a feature included in React to return more than one HTML element from a React Component. It is a common pattern in React for a component to return multiple elements, but with the usual React component syntax and return, it always expects only a single HTML element to be returned. To comply with this requirement, React developers usually wrap the HTML with an extra div element.

On the other hand, fragments let you group a list of children without adding extra nodes (HTML Elements) to the DOM, which results in a shallow DOM tree. 


## Example App - HackerNews

For this guide, you will use an existing simple React application. It uses the unofficial HackerNews API provided by [Algolia](https://hn.algolia.com/api) to get the Hackernews front-page stories. The app is built on React 18.2 and below is the screenshot of the app in action:

<img class="center" loading="lazy" src="/images/react-fragments/02hackernews-stories.jpg" title="A simple react App to show the latest front-page stories from HackerNews" alt="A simple react App to show the latest front-page stories from HackerNews">

You can find the app running on [Netlify](https://hackernews-react-fragment.netlify.app/) and the code is available on [GitHub](https://github.com/geshan/hackernews-react) for your reference. 

If you look at the [HackerNewsStories](https://github.com/geshan/hackernews-react/blob/before-react-fragments/src/HackerNewsStories.js) component the code looks as follows:

```js
import { useState, useEffect } from 'react';

const HackerNewsStories = () => {
  const [stories, setStories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const data = await (await fetch('https://hn.algolia.com/api/v1/search_by_date?tags=front_page&hitsPerPage=20')).json();
        setStories(
          data.hits.sort((story, nextStory) => (story.points < nextStory.points ? 1 : -1))
        );
        setError(null);
      } catch (err) {
        setError(err.message);
        setStories(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="wrapper">
      <h2>Latest HN Stories</h2>
      {loading && <div>HackerNews frontpage stories loading...</div>}
      {error && <div>{`Problem fetching the HackeNews Stories - ${error}`}</div>}
      <div className="stories-wrapper">
        {stories &&
          stories.map(({ objectID, url, title, author, points }) => (
            title && url &&
            <div className='stories-list' key={objectID}>
              <h3><a href={url} target="_blank" rel="noreferrer">{title}</a> - By <b>{author}</b> ({points} points)</h3>
            </div>                        
          ))}
      </div>
    </div>
  );
};

export default HackerNewsStories;
```

Let’s say due to the design need or to have lesser depth in the DOM tree you want to remove the div with the class `wrapper`. Do you think you can just remove that parent div?

### The problem when not using React fragments

No, because React components do not support returning multiple HTML elements. On the line just below the return you see `<div className="wrapper">` which is an extra div that is an extra HTML Node used. It is needed, if you try to remove it you will get an error. For instance, if you change the above return part to the following code to remove the div with class wrapper:

```js
return (
    <h2>Latest HN Stories</h2>
    {loading && <div>HackerNews frontpage stories loading...</div>}
    {error && <div>{`Problem fetching the HackeNews Stories - ${error}`}</div>}
    <div className="stories-wrapper">
      {stories &&
        stories.map(({ objectID, url, title, author, points }) => (
          title && url &&
          <div className='stories-list' key={objectID}>
            <h3><a href={url} target="_blank" rel="noreferrer">{title}</a> - By <b>{author}</b> ({points} points)</h3>
          </div>                        
        ))}
    </div>
  );
```
It will result in the following error:

<img class="center" loading="lazy" src="/images/react-fragments/03no-react-fragments-error.jpg" title="Error in React while trying to return multiple HTML elements without using React fragments" alt="Error in React while trying to return multiple HTML elements without using React fragments">

Basically, it means you cannot return more than one HTML element from a React Component. This is the problem solved by React fragments, which will be discussed next.

## React fragments solve this problem

To solve this problem of returning more than one HTML element from a React component without wrapping it with another HTML tag/element like a div, you can use React fragments. The same return after using React fragment to return multiple HTML elements will look like the below:

```js
return (
    <Fragment> {/* You can also use the shorter syntax of <> */} 
    <h2>Latest HN Stories</h2>
    {loading && <div>HackerNews frontpage stories loading...</div>}
    {error && <div>{`Problem fetching the HackeNews Stories - ${error}`}</div>}
    <div className="stories-wrapper">
      {stories &&
        stories.map(({ objectID, url, title, author, points }) => (
          title && url &&
          <div className='stories-list' key={objectID}>
            <h3><a href={url} target="_blank" rel="noreferrer">{title}</a> - By <b>{author}</b> ({points} points)</h3>
          </div>                        
        ))}
    </div>
    {/* </> is the closing tag for shorter React fragment syntax */}
    </Fragment>
  );
```

For this to work, you will need to import `Fragment` from react at the top of the component as follows:
```js
import { useState, useEffect, Fragment } from 'react';
```

The above React component now returns 2 or 3 HTML elements, one H2, one of the two divs for loading or error, and the last div which will render the stories with the CSS class `stories-wrapper`. You have easily solved the problem and it is possible to return more than one HTML element from a React component now.

As seen above you can use the full React fragment syntax or the short syntax with just `<>` and `</>`. You will need to use the full syntax if you want to make use of [Keyed fragments](https://reactjs.org/docs/fragments.html#keyed-fragments), where every fragment has a unique key.

To better understand the HTML structure, below is the comparison between before using React fragments with a `div` wrapper and after using React fragments is shown below:

<img class="center" loading="lazy" src="/images/react-fragments/04react-fragments-html.jpg" title="Making the HTML simpler by using React fragments" alt="Making the HTML simpler by using React fragments">

It has multiple advantages, for instance, the depth of the HTML node tree will be lesser. In addition to that if you are creating a subcomponent structure like an HTML table you can get the exact HTML you are after. Also if you have a style sheet targeting elements by their depth, they will work without any change as the HTML will not have any extra layer of div or other HTML elements.

The code change demonstrated in this blog post is available as a [pull request](https://github.com/geshan/hackernews-react/pull/7) for your reference. You can also see the app running with react fragments on [Netlify](https://deploy-preview-7--hackernews-react-fragment.netlify.app/). Start using React fragments now.

## Conclusion

In this guide, you learned what React fragments are. Then you were introduced to a problem of trying to return multiple HTML elements from a regular React Component which got stuck due to an error. Then you employed React fragments to get over the problem and with an easy-to-use Syntax you were able to return multiple elements for a React Component. 

I hope you learned something new after reading this, keep learning!
