---
layout: post
title: 'Node.js MySQL tutorial: a step-by-step getting started guide with Express
  js REST API'
date: 2020-11-23T23:15:25.000+11:00
comments: true
tags:
- Web Development
- NodeJs
cover: "/images/nodejs-mysql-tutorial/00nodejs-mysql-tutorial-full.jpg"
pagetitle: 'Node.js MySQL tutorial: a step-by-step getting started guide with Express
  js REST API'
description: Follow this 2500+ word step-by-step tutorial to learn Node.js and MySQL
  together. You will build a REST API for quotes using Express Js in this guide.
keywords: Nodejs mysql tutorial, Node.js mysql tutorial, nodejs mysql, nodejs express
  mysql, node.js express mysql example, nodejs mysql express tutorial

---
Node.js and MySQL mix very well together. In this Node.js MySQL tutorial, we will look into how to get started with both of them step-by-step to build REST API for quotes using Express js.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/nodejs-mysql-tutorial/00nodejs-mysql-tutorial.jpg" title="Node.js MySQL step-by-step tutorial" alt="Node.js MySQL tutorial step-by-step to build a quotes REST API with Express js">

<!-- more -->

## Table of contents

1.  [Why Node.js MySQL tutorial](#why-node.js-mysql-tutorial)
2.  [Prerequisites for Node.js MySQL tutorial](#prerequisites-for-node.js-mysql-tutorial)
3.  [Node.js MySQL tutorial steps](#node.js-mysql-tutorial-steps)
    1.  [Setup Express js for Node.js MySQL tutorial](#setup-express-js-for-node.js-mysql-tutorial)
        1.  [Delete public folder](#delete-public-folder)
        2.  [Delete existing routes and create a new route for quotes](#delete-existing-routes-and-create-a-new-route-for-quotes)
    2.  [Setup MySQL with quote table](#setup-mysql-with-quote-table)
    3.  [Wire up Node.js with MySQL](#wire-up-node.js-with-mysql)
        1.  [Install mysql2 in the express app](#install-mysql2-in-the-express-app)
    4.  [Show the quotes - Get API](#show-the-quotes---get-api)
        1.  [Paginate the quotes for Node.js MySQL tutorial](#paginate-the-quotes-for-node.js-mysql-tutorial)
        2.  [Next steps](#next-steps)
    5.  [Save new quote - POST API for Node.js MySQL tutorial](#save-new-quote---post-api-for-node.js-mysql-tutorial)
4.  [TLDR; I want to run it quickly](#tldr%3B-i-want-to-run-it-quickly)
5.  [Conclusion](#conclusion)

## Why Node.js MySQL tutorial

Node.js has been popularly coupled with NoSQL databases, especially Mongo DB. If you move an older codebase to Node.js you will not have the option to choose a database. Most older systems or even new ones use a relational database management system like MySQL. This leads to a need for a step-by-step Node.js MySQL tutorial.

If you are starting a new project don't blindly use a NoSQL like Mongo DB. This hilarious but accurate [video](https://youtu.be/b2F-DItXtZs) from 2010 about MySQL vs Mongo still makes perfect sense. 

> Use a NoSQL database if your project absolutely needs it else a relational database would suffice.

## Prerequisites for Node.js MySQL tutorial

1.You have Node.js installed on your machine (or a docker container that can run Node.js). We will be using Node.js version 12 and npm x.
1. You are familiar with how Node.js works generally and also know about Node.js frameworks. We will use Express js for this guide.
1. Some git knowledge would be really helpful
1. You have access to a MySQL instance either running locally or remotely. I would suggest using [remote MySQL](https://remotemysql.com/). You should know how RDBMS works.
1. You can code with an IDE, I will be using VS code but you can use any editor or IDE for this Node.js MySQL tutorial.

## Node.js MySQL tutorial steps

We will be building a simple REST API with Express js that can give out quotes. Before diving deeper into the steps, I would really recommend you to take a refresher on [REST](https://www.codecademy.com/articles/what-is-rest)(REpresentational State Transfer). It will be best to read on REST verbs and run some cURL commands to POST APIs.

Given you have Node.js running (either on the machine or with Docker), we can start with setting up Express first:

### Setup Express js for Node.js MySQL tutorial

To set up express, we will use the express-generator. You can generate an express js app without any view engine for this Node.js MySQL tutorial with the following command:

``` bash
npx express-generator --no-view --git nodejs-mysql
```

<img class="center" src="/images/generic/loading.gif" data-echo="/images/nodejs-mysql-tutorial/01express-generator-output.jpg" title="Generate Express.js with generator" alt="Output of Node.js Express generator without view and with git ignore">

To quickly check the output execute the following:

``` bash
cd nodejs-mysql && npm install && DEBUG=nodejs-mysql:* npm start
```

You should see the below output on your browser:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/nodejs-mysql-tutorial/02express-running.jpg" title="Express running on the browser" alt="Default express output on the browser">

The generated basic express app can be seen in this [pull request](https://github.com/geshan/nodejs-mysql/pull/1/files).

#### Delete public folder

As we are building a REST API for quote in this Node.js tutorial with Express we will delete the public folder. We don’t need any CSS or js for the purpose of this tutorial as we will deal with JSON.

To delete the public folder run the following command:

``` bash
rm -rf public
```

#### Delete existing routes and create a new route for quotes

At this point, we will make some changes to the routes. We will delete the `routes/users.js` file that we don’t need anymore. We will then add the `routes/quoets.js` file that looks like below:

``` js
const express = require('express');
const router = express.Router();

/* GET quotes listing. */
router.get('/', function(req, res, next) {
  res.json({
    data: [
      {
        quote: 'There are only two kinds of languages: the ones people complain about and the ones nobody uses.',
        author: 'Bjarne Stroustrup'
      }
    ],
    meta: {
      page: 1
    }
  });
});

module.exports = router;
```

For now the `/routes` will give a static output of only one quote as shown above. We will make it dynamic in the next steps.

After that, we will need to link up the quotes route with the `app.js` file. After the linking my `app.js` file looks like below:

``` js
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const quotesRouter = require('./routes/quotes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/quotes', quotesRouter);

module.exports = app;
```

One more thing to do is, change the `index.js` file to show a JSON output in place of rendering a view/HTML template. After this change the `index.js` file looks like below:

``` js
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: 'ok'});
});

module.exports = router;
```

I have also changed all the `var` to `const` as it makes more sense. If you want to view all the changes in one go, it is available in this [pull request](https://github.com/geshan/nodejs-mysql/pull/2/files).

You can see the last changes by running the following on your command line:

``` bash
DEBUG=nodejs-mysql:* npm start
```

You should see the below when you hit `http://localhost:3000/quotes` on your browser:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/nodejs-mysql-tutorial/03quotes-static-output.jpg" title="Quotes API with static output" alt="Quotes API static output for Node.js MySQL tutorial using Express js">


### Setup MySQL with quote table

At this juncture, for this Node.js MySQL tutorial, we will create a Quotes API. The consumers can fetch quotes and add new ones too. To enable this we will use a single table called `quote`, its structure is given below:

``` sql
CREATE TABLE `quote` 
( `id` INT(11) NOT NULL AUTO_INCREMENT , 
 `quote` VARCHAR(255) NOT NULL , 
 `author` VARCHAR(255) NOT NULL , 
 `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , 
 `updated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
 PRIMARY KEY (`id`), 
 INDEX `idx_author` (`author`), UNIQUE `idx_quote_uniqie` (`quote`)
) 
 ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;
```

This is a simple table with 5 columns. The first one is `id` the auto-incremented primary key. Then there is `quote` and `author`. Both of these columns are varchar.

After that there is `created_at` and `updated_at`. Both date columns have a default value of `CURRENT_TIMESTAMP` so we don’t need to send these values from code. Also not that, updated_at will be auto-updated when the row is updated because of this: `on update CURRENT_TIMESTAMP`.

You can run the above to create the `quote` table, to fill up some good programming-related quotes run the following insert SQL query too:

``` sql
INSERT INTO `quote` (`id`, `quote`, `author`) VALUES
(1, 'There are only two kinds of languages: the ones people complain about and the ones nobody uses.', 'Bjarne Stroustrup'),
(3, 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 'Martin Fowler'),
(4, 'First, solve the problem. Then, write the code.', 'John Johnson'),
(5, 'Java is to JavaScript what car is to Carpet.', 'Chris Heilmann'),
(6, 'Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'John Woods'),
(7, "I'm not a great programmer; I'm just a good programmer with great habits.", 'Kent Beck'),
(8, 'Truth can only be found in one place: the code.', 'Robert C. Martin'),
(9, "If you have to spend effort looking at a fragment of code and figuring out what it's doing, then you should extract it into a function and name the function after the 'what'.", 'Martin Fowler'),
(10, 'The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times; premature optimization is the root of all evil (or at least most of it) in programming.', 'Donald Knuth'),
(11, 'SQL, Lisp, and Haskell are the only programming languages that I’ve seen where one spends more time thinking than typing.', 'Philip Greenspun'),
(12, 'Deleted code is debugged code.', 'Jeff Sickel'),
(13, 'There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies and the other way is to make it so complicated that there are no obvious deficiencies.', 'C.A.R. Hoare'),
(14, 'Simplicity is prerequisite for reliability.', 'Edsger W. Dijkstra'),
(15, 'There are only two hard things in Computer Science: cache invalidation and naming things.', 'Phil Karlton'),
(16, 'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.', 'Bill Gates');
```

The above query will add 15 quotes to the table, it should be a good starting point for the get quotes API. Notice that id 2 is missing and this is done on purpose. You can view the database init file [here](https://github.com/geshan/nodejs-mysql/blob/master/db/init.sql) too.

### Wire up Node.js with MySQL

At this stage, we will connect to MySQL from Node.js express application. To do this task, we will use [Mysql2](https://github.com/sidorares/node-mysql2) library. If you are asking why not the default [Mysql](https://github.com/mysqljs/mysql). It is because of 2 main reasons:

* Mysql2 has a [wrapper for promises](https://github.com/sidorares/node-mysql2/blob/master/documentation/Promise-Wrapper.md) out of the box
* Mysql2 supports [prepared statements](https://github.com/sidorares/node-mysql2#using-prepared-statements) which are faster and safer

If you want a head to head comparison of these two libraries please head to [npm compare](https://npmcompare.com/compare/mysql,mysql2).

#### Install mysql2 in the express app

To start querying the MySQL database with Nodejs, we will first install the `mysql2` library with npm:

``` bash
npm install --save mysql2
```
The above command will install the `mysql2` library and also add it to the `package.json` file. The next step is to update the `/quotes` route to show quotes from the database rather than a static quote.

### Show the quotes - Get API

When you hit `http://localhost:3000` after starting the express js app, you can see something like below:

``` js
{
  "data": [
    {
    "quote": "There are only two kinds of languages: the ones people complain about and the ones nobody uses.",
    "author": "Bjarne Stroustrup"
    }
  ],
  "meta": {
  	"page": 1
  }
}
```

Let’s pull similar data from our database table `quote` and improvise more on it.

To show multiple quotes we will change the static response with a dynamic one. For that, we will need to connect to the database. Let’s create a config file that has the database credentials like below called `config.js` at the root of the project (besides app.js):

``` js
const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || 'remotemysql.com',
    user: env.DB_USER || '2ZE90yGC6G',
    password: env.DB_PASSWORD || 'JZFqXibSmX',
    database: env.DB_NAME || '2ZE90yGC6G',
    waitForConnections: true,
    connectionLimit: env.DB_CONN_LIMIT || 2,
    queueLimit: 0,
    debug: env.DB_DEBUG || false
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};
  
module.exports = config;
```

We have created a `config.js` file that has the credentials for the database taken from the environment variable. If the environment variables are not set we use the fallback values.

After that, create `db.js` file in `/services` folder which should look like the following:

``` js
const mysql = require('mysql2/promise');
const config = require('../config');
const pool = mysql.createPool(config.db);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);

  return rows;
}

module.exports = {
  query
}
```

In this simple DB wrapper, we create a pool of connections for MySQL. As our config has `connectionLimit` of 2 it will create a maximum of 2 connections to the database. Then there is a straightforward `query` method exposed out that can run the SQL query with given params.

After that, create a `/services/quotes.js` file with the following contents:

``` js
const db = require('../services/db');

async function getMultiple(){
  const data = await db.query('SELECT id, quote, author FROM quote');
  const meta = {page: 1};

  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple
}
```

Till this point, it is a very simple file that includes the `db` service created above. Then there is a `getMultiple` function exposed out with module.exports. Beware this will query all the records on the database which should be 15 at this stage. We will make it paginated in the next step.

Consequently we will wire up the `getMultiple` function in `/services/quotes.js` with the route `/quotes` in the `/routes/quotes.js` file like below:

``` js
const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');

/* GET quotes listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await quotes.getMultiple());
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

module.exports = router;
```

I think this is the right time to install `nodemon`, I would recommend to install it globally like below:

``` bash
npm install -g nodemon #you might need sudo depending on your config
```

With nodemon, you can restart the Node.js server on each code change, which is very helpful while developing. You can run the app now with `nodemon` like below to check the result on a browser:

``` bash
DEBUG=nodejs-mysql:* nodemon bin/www
```

When you hit `http://localhost:3000` on the browser, you should see a similar output or lots of `JSON` on the browser:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/nodejs-mysql-tutorial/04quotes-dynamic-output.jpg" title="Quotes API with dynamic output from DB" alt="Quotes API dynamic output for Node.js MySQL tutorial using Express js from DB table quote">

If you go back and check your console where you ran `nodemon` you should be able to see something like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/nodejs-mysql-tutorial/05nodemon-output.jpg" title="Nodemon output for quotes API" alt="Quotes API nodemon output for Node.js MySQL tutorial using Express js">

If you change any file the server will restart because of nodemon. In the next step of this Node.js MySQL tutorial with express js, we will paginate the results 10 quotes on the page. If you want to see the code changes we did to get the quotes from the database it is here in this [pull request](https://github.com/geshan/nodejs-mysql/pull/4/files).

#### Paginate the quotes for Node.js MySQL tutorial

At this juncture, we will start to paginate the quotes 10 quotes per page. The has already been put in place in the `/config.js` file at line no. 14 as `listPerPage: env.LIST_PER_PAGE || 10,` we will use it now.

We will add a `/helper.js` on the root that should look like below:

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

We will use this helper.js file to calculate the offset. The other function will return an empty array if the rows variable is empty, else it will return rows.

Next we will update the query to get quotes in `/services/quotes.js` service. The change quote service looks like below:

``` js
const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    'SELECT id, quote, author FROM quote LIMIT ?,?', 
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

The main difference for the pagination feature compared to the older quotes service is the query has offset and limit passed to it. Notice that we are using a prepared statement which makes the query secure from SQL injection. You can read more about SQL injection prevention with prepared statements in this [stackoverflow answer](https://stackoverflow.com/a/8265319/112849).

The other file changed to get the pagination feature is `/routes/quotes.js`. The new quotes.js route looks like below now:

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

The only change here is we are passing the `page` query parameter to the `getMultiple` function. This will enable pagination like `/quotes?page=2` etc.

If you run the app and hit the browser with `http://localhost:3000/quotes?page=2` you will see 5 quotes like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/nodejs-mysql-tutorial/06pagination-output.jpg" title="Nodemon output for quotes API pagination" alt="Quotes API pagination output for Node.js MySQL tutorial using Express js">

So what happened here, the main change is in the way we construct the `SELECT` query. Depending on the page number we calculate an offset and pass a different query:

* For page 1, the query is `SELECT id, quote, author FROM quote LIMIT 0,10`
* For page 2, the query becomes `SELECT id, quote, author FROM quote LIMIT 10,10`

As you see the offset calculation makes it possible to get the next set of 10 quotes where 10 is the no. of items we want to list as per our config. This might be a big change to comprehend in one go, please have a look at this [pull request](https://github.com/geshan/nodejs-mysql/pull/5/files) for all the code that has changed for the pagination feature to come to life.

#### Next steps

As you have a basic GET API up and running you can add more features to it like:

* Add a new route like `/quotes/{id}` to get a single quote by id
* You can add quote filter/search capability like by the author for instance
* You can also search by word using SQL Like `%computer%` can give all quotes that have the word computer in it
* To make matters exciting for practice, add a new column called `category` and update the API.

I will leave it up to you on what else you would want to build on top of the newly created GET quotes REST API endpoint. The next step is to create a POST API to create new quotes.

### Save new quote - POST API for Node.js MySQL tutorial

To create new quotes we will need a Post API. Before we get on with it, let’s clear out our assumptions:

1. We will not use a sophisticated validation library like [Joi](https://github.com/sideway/joi) for this demo.
1. We will keep the response codes as simple as possible
1. We will not build PUT (update) and DELETE endpoints. As you can run the INSERT query UPDATE and DELETE will be similar with a difference of the quote ID/IDs being passed in the request body.

Let’s get cracking with the code for the POST quotes API. The first thing is we will add the POST quotes route to `/routes/quotes.js` file just above `module.exports = router` line:

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

After that we will add `validateCreate` and `create` functions in the `/services/quotes.js` service file and expose `create` in module.exports  like below:

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
    'INSERT INTO quote (quote, author) VALUES (?, ?)', 
    [quote.quote, quote.author]
  );

  let message = 'Error in creating quote';

  if (result.affectedRows) {
    message = 'Quote created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}
```

I know the validation is a bit primitive but it does the job for now. A better way to do it would be to use Joi or a similar validation library. Next up let’s add a new error handler to show our validation or other errors as JSON responses in the `/app.js` file like below:

``` js
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
})

module.exports = app;
```

Make sure to put it just above the `module.exports = app` line so that they get executed after the routes. Now you can start your app and try the cURL commands below:

``` bash
curl -i -X POST -H 'Accept: application/json' -H 'Content-type: application/json' http://localhost:3000/quotes --data '{"quote":"Controlling complexity is the essence of computer programming."}' ; #should give an error about missing author

curl -i -X POST -H 'Accept: application/json' -H 'Content-type: application/json' http://localhost:3000/quotes --data '{"quote":"Controlling complexity is the essence of computer programming.","author":"Brian Kernighan"}'; #should work
```

Below is the output of both cURL commands:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/nodejs-mysql-tutorial/07curl-output.jpg" title="cURL output for quotes API pagination" alt="Quotes API cURL for POST output of Node.js MySQL tutorial using Express js">

Depending on the configs and the database records you might get a `duplicate entry` error. Just change the quote to something different and try. The code changes for the POST quote API is in this [pull request](https://github.com/geshan/nodejs-mysql/pull/6/files).

You can find lots of quotes to try [here](https://quote-garden.herokuapp.com/api/v2/genres/computer?page=1&limit=100).

---

So there you have it, a basic RESTful API for quotes that can crate new quotes with a POST endpoint. There is a GET endpoint to fetch quotes with pagination.

## TLDR; I want to run it quickly

As all the code is in a public [Github repository](https://github.com/geshan/nodejs-mysql), you can get started in no time running the following commands:

1. Clone the repository: `git clone git@github.com:geshan/nodejs-mysql.git`
1. Then run `cd nodejs-mysql`
1. After that execute `npm install`
1. Consequently run: `npm start`
1. Then hit `https://localhost:3000/quote` on your favorite browser
1. You should see something like below:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/nodejs-mysql-tutorial/04quotes-dynamic-output.jpg" title="Quotes API with dynamic output from DB" alt="Quotes API dynamic output for Node.js MySQL tutorial using Express js from DB table quote">

You can look at the code and try to see how the whole thing is pieced together in this Node.js MySQL tutorial with Express Js for a quotes REST API. This API can act as a good base for a [Node.js microservice](/blog/2020/11/nodejs-microservices/).

You can dockerize the REST API app following this step-by-step [tutorial](/blog/2020/11/nodejs-with-docker/). After that app is dockerized you can host it easily on something like Google Cloud Run. If you want a quick start testing ground without Docker, I would recommend [Glitch](https://glitch.com/).

## Conclusion

Creating a REST API with Node.js and MySQL is not that difficult. 

> Some things are not taken care of in this Node.js MySQL tutorial with Express but this is an excellent good starting point.