---
layout: post
title: "Node.js SQLite: Build a simple REST API with Express step-by-step"
date: 2021-10-29T21:50:35.000+11:00
comments: true
tags:
- Software Engineering
- Javascript
- NodeJs
cover: "/images/nodejs-sqlite/01nodejs-sqlite.jpg"
pagetitle: "Node.js SQLite: Build a simple REST API with Express step-by-step"
description: Learn how build a REST API with Node.js and SQLite using Express js step by step using Quotes as an example following this tutorial.
keywords: nodejs sqlite, node.js sqlite, node.js sqlite tutorial, nodejs sqlite tutorial

---
Node.js can be used very well with relational databases and SQLite is no exception. In this post, we will build a simple REST API for Quotes step-by-step with SQLite and Node.js using the Express Js framework step-by-step.

<!-- more -->

<img class="center" loading="lazy" src="/images/nodejs-sqlite/01nodejs-sqlite.jpg" title="Build Node.js SQLite REST API with Express js" alt="Build Node.js SQLite REST API with Express js">

## Table of contents

* [Prerequisites](#prerequisites)
* [SQLite and Node.js](#sqlite-and-node.js)
* [Setup SQLite database with Quote table](#setup-sqlite-database-with-quote-table)
* [Setup Express with Better SQLite 3](#setup-express-with-better-sqlite-3)
* [Get Quotes API with pagination](#get-quotes-api-with-pagination)
* [Post API to save a new quote with Node.js SQLite](#post-api-to-save-a-new-quote-with-node.js-sqlite)
* [Next steps](#next-steps)
* [TLDR quick start](#tldr-quick-start)
* [Conclusion](#conclusion)

## Prerequisites

Before we dive into the code, below are some good to have prerequisites:

1. You have a general working knowledge of Node.js and Express Js.
1. You have Node.js (preferably latest LTS) running on your machine or on have [Docker with Node.js](/blog/2020/11/nodejs-with-docker/) running
1. SQLite is installed and running on your system, you can get it from [here](https://www.sqlite.org/download.html) and try `sqlite3 --version` after it is installed.
1. Any prior experience with the SQLite database would be helpful but not essential.
1. Some git experience will be good to have.

In the next stop of this Node.js SQLite tutorial, we will set up the database.

## SQLite and Node.js

There is no doubt that SQLite is the [most deployed and used database](https://www.sqlite.org/mostdeployed.html), every mobile phone has it, every Mac and windows 10 machine has in addition to countless millions of other applications. Unlike other relational databases that have a server where clients connect to like MySQL or PostgreSQL, SQLite is a [self-contained](https://www.sqlite.org/selfcontained.html) database. It works as a stand-alone file but still packs the punch with a long list of [features](https://www.sqlite.org/fullsql.html). SQLite is [ultra-reliable](https://www.sqlite.org/hirely.html) and [fast](https://www.sqlite.org/fasterthanfs.html). It was developed to [work offline in a battleship](https://corecursive.com/066-sqlite-with-richard-hipp/).

If SQLite is not really a client-server architecture relational database would there be any use-case for using Node.js with it? Yes, there are many, for instance, if we create an offline-first application that needs a relational database the only choice would be SQLite. Some people even run integration or end-to-end [tests](https://medium.com/swlh/laravel-5-8-testing-with-sqlite-899d0fdd3494) on SQLite where the main database of the application is a client server-based database. Usually, an object-relational mapper (ORM) is utilized to do this kind of seamless database swap. Another use-case can be if we are building an Electron app and need a database to support any actions offline. SQLite can even be leveraged as temporary storage to unblock the user to perform an action offline which can later be synced with another API/database when the device is back online. There can be many other usages for this demo we will build a simple Quotes API. 

## Setup SQLite database with Quote table

We will build a Quotes API with SQLite as our database of choice. For this, we will first create a SQLite database with:

```bash
mkdir nodejs-sqlite
cd nodjs-sqlite
sqlite3 quotes.db
```

First, we create a folder called `nodejs-sqlite` then went into it. After that, we created the database with the `sqlite3` command. It will give us a SQLite prompt like the below:

<img class="center" loading="lazy" src="/images/nodejs-sqlite/02sqlite-cli.jpg" title="SQLite CLI to run SQL commands" alt="SQLite CLI to run SQL commands">

We can create the “quotes” table with the following SQL:

```sql
CREATE TABLE quote (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote text NOT NULL UNIQUE,
  author text NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

After the `quote` table is created, we will insert some quotes for later testing by executing the SQL query as seen below:

```sql
INSERT INTO quote (quote, author) VALUES 
('There are only two kinds of languages: the ones people complain about and the ones nobody uses.', 'Bjarne Stroustrup'), 
('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 'Martin Fowler'), 
('First, solve the problem. Then, write the code.', 'John Johnson'), 
('Java is to JavaScript what car is to Carpet.', 'Chris Heilmann'), 
('Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'John Woods'), 
('I''m not a great programmer; I''m just a good programmer with great habits.', 'Kent Beck'), 
('Truth can only be found in one place: the code.', 'Robert C. Martin'), 
('If you have to spend effort looking at a fragment of code and figuring out what it''s doing, then you should extract it into a function and name the function after the "what".', 'Martin Fowler'), 
('The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times; premature optimization is the root of all evil (or at least most of it) in programming.', 'Donald Knuth'), 
('SQL, Lisp, and Haskell are the only programming languages that I’ve seen where one spends more time thinking than typing.', 'Philip Greenspun'), 
('Deleted code is debugged code.', 'Jeff Sickel'), 
('There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies and the other way is to make it so complicated that there are no obvious deficiencies.', 'C.A.R. Hoare'), 
('Simplicity is prerequisite for reliability.', 'Edsger W. Dijkstra'), 
('There are only two hard things in Computer Science: cache invalidation and naming things.', 'Phil Karlton'), 
('Measuring programming progress by lines of code is like measuring aircraft building progress by weight.', 'Bill Gates'), 
('Controlling complexity is the essence of computer programming.', 'Brian Kernighan'),
('The only way to learn a new programming language is by writing programs in it.', 'Dennis Ritchie');
```

After inserting the 17 rows, if we run `SELECT * FROM quote” we will see an output as follows:

<img class="center" loading="lazy" src="/images/nodejs-sqlite/03quotes-on-sqlite.jpg" title="Quotes on SQLite database table with SQL select" alt="Quotes on SQLite database table with SQL select">

Next up, we will set up Express.js to show the quotes pulled in from the database we just created.

## Setup Express with Better SQLite 3

There are multiple ways to set up Express js, we will use NPM to set up express. To setup express, we will run the following commands in the same directory that has the `quotes.db` file:

```bash
npm init -y
npm install express better-sqlite3
```

The first command will set up the npm project with the default setting. It will also create the package.json file. The second command will install “express” and “better-sqlite3” NPM packages that we need to create our Quotes API.

## Get Quotes API with pagination

To add the GET Quotes API, we will add an `index.js` file on the root of the project besides `package.json` that will have the following contents:

```js
const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const quotesRouter = require('./routes/quotes');

app.get('/', (req, res) => {
  res.json({message: 'alive'});
});

app.use('/quotes', quotesRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

The above `index.js` will be our server with Express for this Node.js SQLite demo tutorial. In this file we require express and set it up with 2 routes, the root `/` just sends back an alive message. It acts more like a health check/ping to the application.

Consequently, we set up the `/quotes` route which is handled by the quotes router file defined in `/routes/quotes` explained next. After then we listen to the port and start the server.

Next, we will add a file `routes/quotes.js` as referenced on `/index.js` with the following contents:

```js
const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');

/* GET quotes listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(quotes.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

module.exports = router;
```

In this `/routes/quotes.js` file we create a new express router and add a get `/` route which will listen to `/quotes` route. We do a try-catch and call the next middleware if there is an error.

It also requires the `/services/quotes.js` file from this file we call the `getMultiple` function to get multiple quotes passing the page from the query parameter which will be parsed as `/quotes?page=1` from the query string.

Next up, we will create the quotes service at `/services/quotes.js` which will contain the following things:

```js
const db = require('../services/db');
const config = require('../config');

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM quote LIMIT ?,?`, [offset, config.listPerPage]);
  const meta = {page};

  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple
}
```

In this file we require two other files, first one is `/services/db.js` which will be the entry point to the database that will run queries on the database. The next one is the `/config.js` that has configuration options like the number of rows we want to show per page put in as `listPerPage`. 

This file has a `getMultiple` method that is used to query multiple quotes from the database. It uses an easy offset calculator based on the page number and list per page config. The offset is passed in the query to get multiple quotes. Limit and offset are used to enable easy pagination in the above code.

After that we will create the referenced `/services/db.js` with the following content:

```js
const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('quotes.db'), {fileMustExist: true});

function query(sql, params) {
  return db.prepare(sql).all(params);
}

module.exports = {
  query
}
```

This `/services.db.js` file is the only file that communicates with the SQLite database. It has the full path of the database file `quotes.db` and we also require and use the `better-sqlite3` NPM package to run our SQL queries.

This file has only one function `query` that uses the [prepare](https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#preparestring---statement) function from our library of choice. The prepare function creates a [prepared statement](https://en.wikipedia.org/wiki/Prepared_statement). By using [all](https://github.com/JoshuaWise/better-sqlite3/blob/master/docs/api.md#allbindparameters---array-of-rows) method with the prepared statement it returns all the rows that are retrured after running the query. In our case with the offset and limit, it will return 10 rows maximum.

The quotes service also required the config.js file at the root of the project and it will have the following code:

```js
const env = process.env;

const config = {
  listPerPage: env.LIST_PER_PAGE || 10,
}

module.exports = config;
```

The `/config.js` is like a helper file used to store any configuration or credentials. For this Node.js SQLite example, we only store the list per page config which is either taken from the environment variable or if that is not available it falls back to the value 10.

After adding all these files, if we run the server with node or [nodemon](/blog/2021/02/nodemon/) command like:

```bash
node index.js
```

We can see the following output on the browser when we hit `http://localhost:3000`

<img class="center" loading="lazy" src="/images/nodejs-sqlite/04nodejs-sqlite-get-quotes.jpg" title="Quotes on the GET API with Node.js and SQLite using Express" alt="Quotes on the GET API with Node.js and SQLite using Express">

So, what happened here is the GET request to get multiple quotes traveled in the following way:

And it fetched the data from the `quotes.db` SQLite database and rendered it back to the browser. As the pagination is also set up we can try `https://localhost:3000/quotes?page=2` which will give us 7 quotes from id 11 to 17, if we try page 3 it will return an empty data array as there are only 17 quotes in the SQLite database. All the code added for this step can be viewed as a [pull request](https://github.com/geshan/nodejs-sqlite/pull/2) for your reference.

In the following section, we will add the POST Quote API which will enable us to create a new quote.

## Post API to save a new quote with Node.js SQLite

To add a new Quote we will crate a POST quote API for this Node.js SQLite tutorial. Before that, we need to make sure that Express can accept JSON in the body. To enable Express js accepting JSON in the request body we will need to add the following line after the Express app has been initialized in the `/index.js` file.

```js
app.use(express.json());
```

Below this line our routes will be placed. Consequently we will add the POST quote route in the `/routes/quotes.js` file as follows:

```js
/* POST quote */
router.post('/', function(req, res, next) {
  try {
    res.json(quotes.create(req.body));
  } catch(err) {
    console.error(`Error while adding quotes `, err.message);
    next(err);
  }
});
```

Here we added a new route to POST quotes. It calls the create method in the quotes service and sends the response back as JSON. If there is any error while creating the new quote on SQLite with Nodejs it will log the error and call the `next` middleware.

Subsequently, we will add the create function in the `/services/quotes.js` as below:

```js
function validateCreate(quote) {
  let messages = [];

  console.log(quote);

  if (!quote) {
    messages.push('No object is provided');
  }

  if (!quote.quote) {
    messages.push('Quote is empty');
  }

  if (!quote.author) {
    messages.push('Author is empty');
  }
  
  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function create(quoteObj) {
  validateCreate(quoteObj);
  const {quote, author} = quoteObj;
  const result = db.run('INSERT INTO quote (quote, author) VALUES (@quote, @author)', {quote, author});
  
  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'Quote created successfully';
  }

  return {message};
}
```

In the above code snippet, we have added the 2 methods `validateCreate` and  `create` in the quotes service. This create method runs the insert query to add a new quote to the database after the validation has passed. In the validating method, we check if the quote and author exist, if any of the two is missing an error with HTTP status code 400 is sent back. In a more real-world application, the [Joi](https://github.com/sideway/joi) NPM package can be used for better validation. 

Notice, what we have called the `db.run` function not `db.query` as in the get quotes call. We will add this `run` function in the `/services/db.js` file as seen below:

```js
function run(sql, params) {
  return db.prepare(sql).run(params);
}
```

Both the `run` function in `/sevices/db.js` and the `create` function in `/services/quotes.js` will need to be exposed out being included in the `module.exports` definition.

After that given our server is running, we can run the following cURL command to insert a new code:

```bash
curl -i -X POST -H 'Accept: application/json' \
    -H 'Content-type: application/json' http://localhost:3000/quotes \
    --data '{"quote":"Before software can be reusable it first has to be usable.","author":"Ralph Johnson"}'
```

It will result in the following output:

```bash
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 40
ETag: W/"28-Gw37o554emBLJSQVDFBkjoN6exA"
Date: Wed, 27 Oct 2021 11:17:29 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Quote created successfully"}
```

Hurray! Our add quotes API is also working too. All the code to introduce the POST API to add a new quote can be seen in this [pull request](https://github.com/geshan/nodejs-sqlite/pull/3).

## Next steps

For your own practice, you can add the update (PUT) and delete endpoints to get a better hold of how to do a full-on CRUD API.

## TLDR quick start

All the code for this tutorial is available in a public GitHub repository for your reference. To get started quickly for the thing that has been built please follow the steps below:

1. Clone the repository with `git clone git@github.com:geshan/nodejs-sqlite.git`
1. Then execute `cd nodejs-sqlite`
1. After that, run: `npm install && npm start`
1. Subsequently, hit `http://loalhost:3000/quote` on your favorite browser
1. You should see the following:

<img class="center" loading="lazy" src="/images/nodejs-sqlite/04nodejs-sqlite-get-quotes.jpg" title="Quotes on the GET API with Node.js and SQLite using Express" alt="Quotes on the GET API with Node.js and SQLite using Express">

## Conclusion

In this tutorial about Node.js and SQLite, we have learned how to create a minimal REST API for Quotes. This is more like a starting point to build bigger things.

> You can use the open-source [Github repository](https://github.com/geshan/nodejs-sqlite) to use this example as a base to build your own API with Node.js and SQLite using the Express.js framework. Best of luck!
