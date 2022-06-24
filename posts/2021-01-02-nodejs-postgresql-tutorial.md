---
layout: post
title: 'Node.js Postgresql tutorial: Build a simple REST API with Express step-by-step'
date: 2021-01-01T21:15:35.000+11:00
comments: true
tags:
- Web Development
- NodeJs
cover: "/images/nodejs-postgresql-tutorial/01nodejs-postgres-tutorial.jpg"
pagetitle: 'Node.js Postgresql tutorial: Build a simple REST API with Express step-by-step'
description: Follow this 2500+ word step-by-step tutorial to learn Node.js and PostgreSQL
  together. You will build a REST API for quotes using Express Js in this guide.
keywords: Nodejs postgres tutorial, Node.js postgres tutorial, nodejs postgres, nodejs
  express postgres, node.js express postgres example, nodejs postgres express tutorial,
  Node js postgresql tutorial, node js postgres tutorial

---
Node.js can be used efficiently with relational databases like PostgreSQL. In this post about Node.js PostgreSQL tutorial, we are going to build a REST API for Quotes step-by-step using Express Js.

<img class="center" loading="lazy" src="/images/nodejs-postgresql-tutorial/01nodejs-postgres-tutorial.jpg" title="Node.js postgresql tutorial to build a quotes REST API using Express step-by-step" alt="Node.js postgresql tutorial to build a quotes REST API using Express step-by-step">

<!-- more -->

## Table of contents


1. [Prerequisites](#prerequisites)
2. [Steps for Node.js PostgreSQL tutorial](#steps-for-node.js-postgresql-tutorial)
   1. [Setup Express with express generator](#setup-express-with-express-generator)
      1. [Delete the public folder](#delete-the-public-folder)
      2. [Delete unnecessary existing routes then create a new route for quotes](#delete-unnecessary-existing-routes-then-create-a-new-route-for-quotes)
      3. [Change index route to give out JSON](#change-index-route-to-give-out-json)
   2. [Setup PostgreSQL with quote table](#setup-postgresql-with-quote-table)
   3. [Link Node.js with Postgres](#link-node.js-with-postgres)
   4. [Show Quotes - GET API with pagination](#show-quotes---get-api-with-pagination)
   5. [Save a new quote - POST API for Node.js PostgreSQL tutorial](#save-a-new-quote---post-api-for-node.js-postgresql-tutorial)
      1. [Adding validation for creating quotes POST API](#adding-validation-for-creating-quotes-post-api)
3. [TLDR; quick rundown](#tldr%3B-quick-rundown)
4. [Conclusion](#conclusion)


You can read my previous tutorial to try [Node.js with MySQL](/blog/2020/11/nodejs-mysql-tutorial/). You should read this guide to use [Docker with Node.js](/blog/2020/11/nodejs-with-docker/), it is also a step-by-step guide. You can, of course, carry on with this Node.js with PostgreSQL tutorial :).

> For your convinience, each step has been carved out as a distinct pull reqeust so that you can follow the tutorial with ease.

## Prerequisites

1. You have Node.js (preferably Node 14.x) installed and running on your machine (or Node.js running with a docker container).
2. You are aware of how Node.js generally works and also have a bit of Express Js experience.
3. Having some knowledge of Git and GitHub will be really useful.
4. For the database we will use a free database on [ElephantSQL](https://www.elephantsql.com/), so please register and set up a free PostgreSQL database there. Of course, you should know how a relational database works.
5. You are able to code using an IDE. I will be using VS Code as an editor but you are free to use any code editor of your choice for this Node.js PostgreSQL tutorial.

## Steps for Node.js PostgreSQL tutorial

We will be building a very simple REST API with Express Js that can send out some quotes. A quick refresher on what [REST APIs](https://www.mulesoft.com/resources/api/what-is-rest-api-design) are would be greatly helpful at this point.

> It will be great to read about HTTP verbs and brush up on some cURL commands too. We will be using cURL to run the examples.

At this juncture, we believe that your Node.js is running fine. So let’s start with setting up Express js:

### Setup Express with express generator

To step Express js with [express-generator](https://expressjs.com/en/starter/generator.html) run the following command:

``` bash
npx express-generator --no-view --git nodejs-postgresql
```

The `--no-view` parameter tells the generator to generate the Express app without any view like Pug. The other `--git` parameter indicates that we want to add the default `.gitignore` file in our Express app.
It will create the needed files in `nodesj-postgresql` directory. Your express will be set up when the command runs successfully. To quickly check if Express is setup correctly run the below:

``` bash
cd nodejs-posgresql && npm install && DEBUG=nodejs-posgresql:* npm start
```

You should see something similar on your browser when you hit `http://localhost:3000` on it:

<img class="center" loading="lazy" src="/images/nodejs-postgresql-tutorial/02express.jpg" title="Express running on local at port 3000" alt="Express running on local at port 3000">

The generated barebones Express Js app can be viewed in this [pull request](https://github.com/geshan/nodejs-posgresql/pull/1/files).

#### Delete the public folder

Because we are building a REST API for quotes for this Node.js PostgreSQL tutorial we don’t need any CSS or JS. Therefore, we will delete the generated `public` folder as we will deal with JSON.

To delete the generated public folder execute the following on your terminal:

``` bash
rm -rf public
```

#### Delete unnecessary existing routes then create a new route for quotes

At this juncture, we will delete the unnecessary users' route found in `routes/users.js`. Consequently, we will add `routes/quotes.js` file that will have the following content:

``` js
const express = require('express');
const router = express.Router();

/* GET quotes listing. */
router.get('/', function(req, res, next) {
  res.json({
    data: [
      {
        quote: 'First, solve the problem. Then, write the code.',
        author: 'John Johnson'
      }
    ],
    meta: {
      page: 1
    }
  });
});

module.exports = router;
```

For now, it will give a static output of only 1 quote as shown above. We will link up the quotes route in the `app.js` file like below:

``` js
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var quotesRouter = require('./routes/quotes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/quotes', quotesRouter);

module.exports = app;
```

The changes on the above file are only on lines 7 and 18 where the users’ router has been replaced with the quotes one.

#### Change index route to give out JSON

The last change in this step is on line 6 of `index.js` file found in the root of the project. We will edit it to send out JSON in place of rendering a view. The file will look like before after this change:

``` js
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: 'alive'});
});

module.exports = router;
```

You can check all the changes made in this step in this [pull request](https://github.com/geshan/nodejs-posgresql/pull/2/files).

To swiftly view the output of the above changes run the following:

``` bash
DEBUG=nodejs-postgresql:* npm start
```

Then hit `http://localhost:3000/quotes` on the browser tab, you will see something like below:

<img class="center" loading="lazy" src="/images/nodejs-postgresql-tutorial/03quotes-static.jpg" title="Quotes API with static output" alt="Quotes API with static output">

We will fetch the quotes from our PostgreSQL database in the next step.

### Setup PostgreSQL with quote table

We want to save you from the hassle of creating and maintaining a database locally on your machine. You can have a free PostgreSQL database on Elephant SQL with 20 MB data and 5 concurrent connections. It is more than enough for the purpose of this tutorial.

To create the PostgreSQL database on [Elephant SQL](https://www.elephantsql.com/) after registering please follow this [documentation](https://www.elephantsql.com/docs/). Create the free (tiny turtle) database in the data center of your choice. If you want to learn more about PostgreSQL follow this multi-part [tutorial](https://www.elephantsql.com/blog/2017-02-24-databases-for-beginners-what-is-sql-what-is-postgresql.html) on Elephant SQL.

After that, to create the quote table run the following SQL in the “browser” section of the created database:

``` sql
CREATE SEQUENCE quote_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

CREATE TABLE quote (
    id bigint DEFAULT nextval('quote_id_seq'::regclass) NOT NULL PRIMARY KEY,
    quote character varying(255) NOT NULL UNIQUE,
    author character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

Here is how it looks on the Elephant SQL interface:

<img class="center" loading="lazy" src="/images/nodejs-postgresql-tutorial/04create-table-elephant-sql.jpg" title="Create Quotes table on Elephant SQL interface" alt="Create Quotes table on Elephant SQL interface">

This is a very simple table with 5 columns. The first one is the `id` which is a sequence and primary key. Then there are `quote` and `author` both are variable characters.

After that `created_at` and `updated_at` are both time stamps. There is a unique index added to the `quote` column so that we don’t have the same quote more than once. After the table is created we will fill up some quotes in the `quote` table executing the insert SQL below:

``` sql
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

After you have inserted the 17 rows, if you run the following on the Elephant SQL browser interface:

``` sql
SELECT * FROM quote;
```

You should see something similar to below:

<img class="center" loading="lazy" src="/images/nodejs-postgresql-tutorial/05select-elephant-sql.jpg" title="SELECT all from quote on Elephant SQL interface" alt="SELECT all from quote on Elephant SQL interface">

You can find the init database SQL file in this [pull request](https://github.com/geshan/nodejs-posgresql/pull/3/files). As our database is set up and ready let’s proceed to link it up with the Node.js Express application.

### Link Node.js with Postgres

To link up the Node.js Express Js application with the database that we have set up we will need to install the Postgres npm library. To get this useful library please run the following command:

``` bash
npm install --save pg
```

The changes we have got by installing this npm package are in this [pull request](https://github.com/geshan/nodejs-posgresql/pull/4/files). Time to proceed to add the GET quotes API route.

### Show Quotes - GET API with pagination

When you go to `http://localhost:3000/quotes` after starting the Express Js app, you can see something like below:

``` js
{
  "data":[
    {
      "quote":"First, solve the problem. Then, write the code.",
      "author":"John Johnson"
    }
  ],
  "meta":{
    "page":1
  }
}
```

Now we will replace this by fetching data from the PostgreSQL database on Elephant SQL. To do this, we will need to connect to the database.

Let’s create a `config.js` file on the root level. This config file has the database credentials and other configs like below:

``` js
const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || 'otto.db.elephantsql.com',
    port: env.DB_PORT || '5432',
    user: env.DB_USER || 'cklijfef',
    password: env.DB_PASSWORD || 'V1qidES5k3DSJICDRgXtyT8qeu2SPCZp',
    database: env.DB_NAME || 'cklijfef',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
```

Subsequently, we will need to add a `services/db.js` file that will use a pool to run our SQL queries. It will look like below:

``` js
const { Pool } = require('pg');
const config = require('../config');
const pool = new Pool(config.db);

/**
 * Query the database using the pool
 * @param {*} query 
 * @param {*} params 
 * 
 * @see https://node-postgres.com/features/pooling#single-query
 */
async function query(query, params) {
    const {rows, fields} = await pool.query(query, params);

    return rows;
}

module.exports = {
  query
}
```

After that we will add a `helper.js` file on the root level that will help us format the results and calculate the offset for pagination. It will have the following contents:

``` js
function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getOffset,
  emptyOrRows
}
```

At this juncture, we will add `services/quotes.js` file which will have contents as below:

``` js
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT id, quote, author FROM quote OFFSET $1 LIMIT $2', 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
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

All of this is glued from the routes file at `routes/quotes.js` which after the change looks like:

``` js
const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await quotes.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

module.exports = router;
```

The main change here in the `routes/quotes.js` file is the addition of quotes service. After that, the `/quotes` is getting the quotes dynamically using the added quotes service.

Please take note that the quotes are already paginated, meaning `https://localhost:3000/quotes?page=2` will give out quotes 11-20 as it has 10 quotes per page in the config.js file. The output at this point for page 2 should look something like below:

<img class="center" loading="lazy" src="/images/nodejs-postgresql-tutorial/06quotes-api-page-2.jpg" title="Quotes on page 2 fetched dynamically from the database table" alt="Quotes on page 2 fetched dynamically from the database table">

Now let’s proceed to add the POST quote API which will insert a new quote on the database. As above, you can view all file changes for this step in this neatly organized [pull request](https://github.com/geshan/nodejs-posgresql/pull/5/files).

### Save a new quote - POST API for Node.js PostgreSQL tutorial

To create a new quote we will keep it a simple POST API. We will not use any validation library and keep the response codes as simple as possible.

The first thing we will do for adding the save new quote endpoint is to add it to the `/routes/quotes.js` file just above `module.exports = router` line as shown below:

``` js
/* POST quotes */
router.post('/', async function(req, res, next) {
  try {
    res.json(await quotes.create(req.body));
  } catch (err) {
    console.error(`Error while posting quotes `, err.message);
    next(err);
  }
});

module.exports = router;
```

For the time being, we will not add any code level validation. The database table `quote`  has the `quote` field required and 255 characters. So, if the quote is empty it will get a database level error. Unlike MySQL, PostgreSQL will give an error if the quote is longer than 255 characters.

In a more real-life scenario, I would recommend using a validation library for these kinds of cases. For now, let’s add the `create` method in `/services/quotes.js` like below:

``` js
async function create(quote) {
  const result = await db.query(
    'INSERT INTO quote(quote, author) VALUES ($1, $2) RETURNING *',
    [quote.quote, quote.author]
  );
  let message = 'Error in creating quote';

  if (result.length) {
    message = 'Quote created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}
```

After you run the server, you can try the following curl to see if it create a new quote:

``` bash
curl -i -X POST -H 'Accept: application/json' \
    -H 'Content-type: application/json' http://localhost:3000/quotes \
    --data '{"quote":"Before software can be reusable it first has to be usable2.","author":"Ralph Johnson"}'
```

It should come back with a 200 response saying the quote has been created. You can try other quotes from this [post](https://dzone.com/articles/best-programming-jokes-amp-quotes).

With the create quote POST API working. You can easily build upon it to create the edit and the delete quote endpoints with respective `UPDATE` and `DELETE` SQL statements. Just be careful to pass the right id to carry out those operations.

Similar to the previous steps, all the code changes for this step can be found in this [pull request](https://github.com/geshan/nodejs-posgresql/pull/6/files).

#### Adding validation for creating quotes POST API

Till now it should be functional but we should not push validation to the database layer as it will be more resource expensive. So in the next part of this step, we will add validation on the code level.

We will add a `validateCreate` method above `create` method in `/services/quotes.js` to do the validation like below:

``` js
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
    messages.push('Quote is empty');
  }

  if (quote.quote && quote.quote.length > 255) {
    messages.push('Quote cannot be longer than 255 characters');
  }

  if (quote.author && quote.author.length > 255) {
    messages.push('Author name cannot be longer than 255 characters');
  }

  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

async function create(quote){
  validateCreate(quote);

  const result = await db.query(
    'INSERT INTO quote(quote, author) VALUES ($1, $2) RETURNING *',
    [quote.quote, quote.author]
  );
  let message = 'Error in creating quote';

  if (result.length) {
    message = 'Quote created successfully';
  }

  return {message};
}
```

So now if you try the below cURL without an author, when the server is running it will show an error:

``` bash
curl -i -X POST -H 'Accept: application/json' \
    -H 'Content-type: application/json' http://localhost:3000/quotes \
    --data '{"quote":"Before software can be reusable it first has to be usable."}' 
```

It will show something like below:

<img class="center" loading="lazy" src="/images/nodejs-postgresql-tutorial/07validation-working.jpg" title="Creating a quote without author will give a validation error" alt="Creating a quote without author will give a validation error">

These changes are also reflected in a [pull request](https://github.com/geshan/nodejs-posgresql/pull/7/files).

> On dev, I would highly recommend using [Nodemon](https://nodemon.io/) as it will restart the server on every file change.

After you have [nodemon](/blog/2021/02/nodemon/) installed globally you can run the app with the following command:

``` bash
DEBUG=nodejs-postgresql:* nodemon bin/www 
```

Nodemon is great for development.

## TLDR; quick rundown

All the code shown above is in a public [GitHub repository](https://github.com/geshan/nodejs-posgresql), to quickly get started with what has already been built you can follow the steps below:

1. Clone the repository with: `git clone git@github.com:geshan/nodejs-posgresql.git`
2. Then run `cd nodejs-postgresql`
3. Subsequently, execute: `npm install && npm start`
4. After that, hit: `https://localhost:3000/quotes` on your favorite browser
5. You should see the following on your browser:

<img class="center" loading="lazy" src="/images/nodejs-postgresql-tutorial/08quotes-page-1.jpg" title="Quotes on page 1" alt="Quotes on page 1">

## Conclusion

Setting up a REST API with Node.js and PostgreSQL was pretty fun till now. Still, it is more like scratching the surface. You can use the [GitHub repo](https://github.com/geshan/nodejs-posgresql) as a boilerplate to create simple REST APIs.

> This tutorial is a great starting point to build a full-on real-life REST API. I hope you can use this as commencement of something exciting. Best of luck!