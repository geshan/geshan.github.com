---
layout: post
title: How to create a React search bar a step-by-step guide
date: 2022-10-29T22:48:55.000+11:00
comments: true
tags:
- Javascript
- React
- Web Development
cover: "/images/react-search-bar/01react-search-bar.jpg"
pagetitle: How to create a React search bar a step-by-step guide
description: In this tutorial, learn how to add a React search bar to an existing
  app step-by-step.
keywords: react search bar, reactjs search bar, search bar react, search bar reactjs

---
React is the [most popular](https://2021.stateofjs.com/en-US/libraries/front-end-frameworks) frontend framework (ok a library) in terms of usage for the past 6 years. Being able to search content is a very useful feature for all websites and React apps are no exception. In this post, you will learn how to add a React search bar to an existing React app step-by-step. Let’s get going!

<!-- more -->

<img class="center" loading="lazy" src="/images/react-search-bar/01react-search-bar.jpg" title="Add React search bar to an existing React app" alt="Add React search bar to an existing React app">

## Table of contents

* [Popularity of React](#popularity-of-react)
* [Prerequisites](#prerequisites)
* [Existing React App - HackerNews](#existing-react-app---hackernews)
    * [Structure of components](#structure-of-components)
* [Add React search bar component](#add-react-search-bar-component)
* [Wire up React search bar component](#wire-up-react-search-bar-component)
* [Test the search bar component](#test-the-search-bar-component)
* [Conclusion](#conclusion)


## Popularity of React

In the past 5 years, people have searched for React a lot on Google [compared to Vue.js or Angular](https://trends.google.com/trends/explore?date=2017-10-01%202022-10-28&q=%2Fg%2F11c0vmgx5d,%2Fm%2F012l1vxv,%2Fg%2F11c6w0ddw9). In addition to that, the state of JS survey result of 2021 puts React as the [most used](https://2021.stateofjs.com/en-US/libraries/front-end-frameworks/) JavaScript framework for the past 6 years. It is also the one with the most awareness among software engineers for 3 years in a row since 2019. 

<img class="center" loading="lazy" src="/images/react-search-bar/02react-popularity.jpg" title="React.js is very popular" alt="React.js is very popular">

At the time of writing, React has 197K starts on Github with 40.8K forks. As of Oct 2022, it is downloaded more than 17.75 million times each week on NPM as per [NPM trends](https://npmtrends.com/@angular/core-vs-react-vs-svelte-vs-vue). This is more than double of weekly downloads for Vue, Angular, and Svelte’s NPM combined.

In the long-running war of frontend frameworks, React looks like it has won the race. Will it still be the leader in the next 5 years, only time will tell.

## Prerequisites

Before getting hands dirty with the code below are some requisites:

1. Any prior experience with React.js would be helpful
1. Previous knowledge of working with Git and GitHub will be beneficial
1. A general understanding of how APIs work and are called from React.js would be needed.
1. Knowing about some React concepts like props, [function components](https://reactjs.org/docs/components-and-props.html#function-and-class-components), use effect hook, and fragments will be useful.

Given those things mentioned, it is time to proceed to the existing Example app which lists the latest news from the HackerNews frontpage using an API.

## Existing React App - HackerNews

For this step-by-step tutorial, you will add a simple React search bar to an existing application. The app in context is a basic HackerNews frontpage news listing app. It is created using [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) (CRA) with React [18.2](https://reactjs.org/blog/2022/03/29/react-v18.html). This app calls the unofficial HackerNews API provided by [Algolia](https://hn.algolia.com/api). 

It calls the front page API to get the 20 latest news stories to be specific. The app is [using Fetch](https://github.com/geshan/react-search-bar/blob/master/src/HackerNewsStoriesWithSerach.js#L11) and not any other library like Axios to call the API. It shows a loading message while the data is being fetched and there is some [basic](https://github.com/geshan/react-search-bar/blob/master/src/HackerNewsStoriesWithSerach.js#L17) error [handling](https://github.com/geshan/react-search-bar/blob/master/src/HackerNewsStoriesWithSerach.js#L33) built in too.

You can view the full code of the app on [GitHub](https://github.com/geshan/react-search-bar) and see it in action on [Netlify](https://reactjs-search-bar.netlify.app/). It does not have the search functionally at this point and this is where you will add the React search bar to the app. The search bar will help users find stories by title or even author name. To understand how you are going to come to the solution, in the next section you will learn how the components are structured.

### Structure of components

Initially, the app was built as a [single component](https://github.com/geshan/hackernews-react/blob/master/src/HackerNewsStories.js) called `HackerNewsStories`. The same component would [call the API](https://github.com/geshan/hackernews-react/blob/master/src/HackerNewsStories.js#L11) and then later [render the stories](https://github.com/geshan/hackernews-react/blob/master/src/HackerNewsStories.js#L31-L39). This would still do the job but when you need to add the search functionality it would make the component bloated, and convoluted.

In the example [GitHub repository](https://github.com/geshan/react-search-bar/) used for this tutorial, this has been broken down into two components. The first component is named `HackerNewsStoriesWithSearch` being far sighed and future-oriented. The second component is called `HackerNewsStories`. 

The first component [calls](https://github.com/geshan/react-search-bar/blob/master/src/HackerNewsStoriesWithSerach.js#L11) the HackerNews API and does the [error handling](https://github.com/geshan/react-search-bar/blob/master/src/HackerNewsStoriesWithSerach.js#L33) part. Where and the second component, only renders the passed [stories](https://github.com/geshan/react-search-bar/blob/master/src/HackerNewsStoriesWithSerach.js#L34) after [looping](https://github.com/geshan/react-search-bar/blob/master/src/HackerNewsStories.js#L6) through them. It renders the stories in an [H3](https://github.com/geshan/react-search-bar/blob/master/src/HackerNewsStories.js#L9) with a link to the story on the title, the author, and the points. Visually it can be depicted like the below:

<img class="center" loading="lazy" src="/images/react-search-bar/03reactjs-search-bar.jpg" title="React App components strcutre before adding the search bar" alt="React App components strcutre before adding the search bar">

Now, your goal is to add search functionality to this simple app. To add this React search bar you will introduce a new search component that will have a search text box. On typing, it will start filtering the news stories while you type. You will do this by passing the keyword and the function to handle the keyword into this new component. When the component is integrated into the above application it will look as follows:

<img class="center" loading="lazy" src="/images/react-search-bar/04reactjs-search-bar-added.jpg" title="App components strcutre after adding the react search bar" alt="App components strcutre after adding the react search bar">

The `HackerNewsStoriesWithSerach` component will house both the `SearchBar` and the `HackerNewsStories` components. It will also be responsible to communicate with the API and manage errors if any. So this component will be the main driver. The `SearchBar` and `HackerNewsStories` will play their part to make the application work with the new functionality. Given the overall component, the structure is clear, now it is time to dive into the code.


##  Add React search bar component

As discussed in the above component structure you will add the `SearchBar` component. The code for `src/SearchBar.js` file which holds the component is as follows:

```js
const SearchBar = ({keyword, onChange}) => {
  const BarStyle = {width:"20rem",background:"#F0F0F0", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyle}
     key="search-bar"
     value={keyword}
     placeholder={"search news"}
     onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
```

This is a simple component that takes in two props (or parameters). The first one is the `keyword` it will be set as the value of the input text box. The second one is the `onChange` function which will be called each time something is typed in the search box. 

Some basic style is defined for the React search bar and it is added to the returned `input` element. Lastly, the `SearchBar` component is exported from this file. In the next section, you will see how this component is glued up with the existing components.

## Wire up React search bar component

At this juncture, the `SearchBar` component has been written up. But it is not used until it is integrated into the currently existing components `HackerNewsStoriesWithSearch` and `HackerNewsStories`. To achieve the search functionality you will wire this new component to the existing components as follows:

```js/3,7,10,15-17,27-31,44-45
import { useState, useEffect } from 'react';
import HackerNewsStories from './HackerNewsStories';
import SearchBar from './SearchBar';

const HackerNewsStoriesWithSearch = () => {
  const [stories, setStories] = useState([]);
  const [allStories, setAllStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');

  const fetchStories = async () => {
    try {
      const data = await (await fetch('https://hn.algolia.com/api/v1/search_by_date?tags=front_page&hitsPerPage=20')).json();
      const stortedStories = data.hits.sort((story, nextStory) => (story.points < nextStory.points ? 1 : -1));
      setAllStories(stortedStories);
      setStories(stortedStories);
      setError(null);
    } catch (err) {
      setError(err.message);
      setStories(null);
    } finally {
      setLoading(false);
    }
  };

  const updateKeyword = (keyword) => {
    const filtered = allStories.filter(story => {
     return `${story.title.toLowerCase()} ${story.author.toLowerCase()}`.includes(keyword.toLowerCase());
    })
    setKeyword(keyword);
    setStories(filtered);
 }

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <> { /* React fragment */}
    <div className="wrapper">
      <h2>Latest HN Stories</h2>
      {loading && <div>HackerNews frontpage stories loading...</div>}
      {error && <div>{`Problem fetching the HackeNews Stories - ${error}`}</div>}
      <SearchBar keyword={keyword} onChange={updateKeyword}/>
      <HackerNewsStories stories={stories} />
    </div>
    </>
  )
}

export default HackerNewsStoriesWithSearch;
```

There are some changes made in the above `HackerNewsStoriesWithSearch` component and they are highlighed in the above code example. Firstly you imported the `SearchBar` component on line 3. Then, you have added `const [allStories, setAllStories] = useState([]);` on line 7. This all-stories variable will hold the initial list of fetched stories that will be used to filter stories by a given keyword. 

It uses React’s [useEffect  hook](https://reactjs.org/docs/hooks-effect.html) to pull the data. You can even do [Javascript Memoization](/blog/2021/02/javascript-memoization/) to not call the API on each page reload or cache the response for some minutes on the local storage.

Next, the `updateKeyword` function is defined which filters out stories based on the keyword existing in the story’s title and author. It filters stories from all stories so that each search is done on the full set of stories, not a filtered subset. Then it sets the filtered stories as stories that will be rendered by the `HackerNewsStories` component. It also updates the keyword that will be passed in and displayed on the input box by the `SearchBar` component.

After that, the `SearchBar` component is added on line 45. Here you pass in the `keyword` variable and `updatedKeyword` function as `onChange so that the component works as intended. 

One thing to notice here is, because there are multiple elements returned by this component it is wrapped into a [React fragment](/blog/2023/02/react-fragments/) with its [short syntax](https://reactjs.org/docs/fragments.html#short-syntax). Without this wrapping, it will throw an `Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.` error. After this integration, the search functionality will work.

For you to get the full context of this application, below HackerNews Stories component that loops through the passed-in stories and renders the title, author, and point in an H3 element:


```js
const HackerNewsStories = ({stories = []}) => {
  return (    
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
};

export default HackerNewsStories;
```

The above component is pretty simple. When stories are available it loops through the stories with an [array Map](/blog/2021/03/javascript-array-functions/#map) function. Then it renders the needed properties from each story object. In the next section, you will test whether the app is running with the new search functionality.

## Test the search bar component

To test the React HackerNews front page stories app with the search functionality you can run `npm start` after running `npm install`. It will open your default browser on port 3000 which will look like the below when searching:

<img class="center" loading="lazy" src="/images/react-search-bar/05react-search-bar-working.gif" title="React search bar working as intended to filter by title and author name" alt="React search bar working as intended to filter by title and author name">

Or you can try out the search feature on [Netilfy branch preview](https://deploy-preview-5--reactjs-search-bar.netlify.app/) too. All the code done for this guide is available for your reference in this [pull request](https://github.com/geshan/react-search-bar/pull/5). First, you search for `st` which filters posts where `st` is found in the title or the author’s name. Then you search for `jp` and find one story where the author’s name has `jp` in it. So the functionality is working fine.

Congrats! You have added search to a relatively dynamic app that changes with time.

## Conclusion

In this guide, you were introduced to a simple yet useful React app that fetches the front page stories from HackerNews. Then the component structure was discussed with the need of a refactor to introduce the new React search bar feature. Then you added the React search bar component that took in the keyword and the function to work on change. After that, you wired up this new component with the two existing components and tested that the search functionality works as expected.

> This kind of a simple clientside filter would work for a small amount of data (<100 records) but for a larger dataset, it will always be better to do it in the backend with something purpose-built for search.

I hope you learned how to add a React search bar in this step-by-step tutorial. Keep React-ing :)