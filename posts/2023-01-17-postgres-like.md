---
layout: post
title: How to use LIKE in PostgreSQL a beginner’s guide with practical examples
date: 2023-01-17T22:47:55.000+11:00
comments: true
tags:
- Software Engineering
- Postgres
cover: "/images/postgres-like/01postgres-like.jpg"
pagetitle: How to use LIKE in PostgreSQL a beginner’s guide with practical examples
description: In this tutorial, you will learn how to use the PostgreSQL LIKE and ILIKE expressions with practical examples.
keywords: postgres like, like postgres, postgresql like, like postgresql
---
PostgreSQL is one of the most [popular](https://db-engines.com/en/ranking/relational+dbms) relational databases. It is an open-source RDBMS having 35 years of active development behind it. In this tutorial, you will learn how to use the LIKE expression in a WHERE statement to get rows that match or do not match a given pattern. Let’s get going!

<!-- more -->

<img class="center" loading="lazy" src="/images/postgres-like/01postgres-like.jpg" title="Postgres LIKE with practical examples" alt="Postgres LIKE with practical examples">

## Table of contents

* [Why use LIKE in WHERE](#why-use-like-in-where)
* [Example for Postgres Like](#example-for-postgres-like)
* [Match any number of characters](#match-any-number-of-characters)
* [Match the exact number of characters](#match-the-exact-number-of-characters)
* [ILIKE for case insensitive matching](#ilike-for-case-insensitive-matching)
* [A word of caution](#a-word-of-caution)
* [Conclusion](#conclusion)

## Why use LIKE in WHERE

The WHERE expression in relational databases including PostgreSQL is used to filter out rows while doing a select, update or delete operation. For instance, if you want to select all the rows in a table of customers with the first name `John`, it can be written as:

```sql
SELECT * from customer WHERE first_name = ‘John’;
```

If the table had 100K rows and 5 of the customers had their first name exactly as `John` those 5 rows would be selected. You can also use WHERE in the update and delete operation, as mentioned. 

In case you want to filter out rows with a `WHERE` expression but based on some pattern in the string then you will use the `LIKE` expression. In the above example, if you wanted to list all customers whose first name starts with a `J` then you can write it as:

```sql
SELECT * from customer WHERE first_name LIKE ‘J%;
```

Now the above SELECT where will list out all the customers whose name starts with a `J`. You can also do something similar with a Regex like `/J.*/gm` as seen in this [Regex 101 example](https://regex101.com/r/Fjoj7y/1). 

In the next section, you will learn about the Quotes example used in the [Node.js PostgreSQL tutorial](/blog/2021/01/nodejs-postgresql-tutorial/).

## Example for Postgres Like

For this guide on Postgres LIKE, you will use the example of Quotes from the Node.js PostgreSQL post. It is expected that you know about relational databases and PostgreSQL. You should also know about running the database server and running queries on that server. 

Below is the SQL to create the schema and insert 17 quotes:

```sql
CREATE TABLE quote (
    id SERIAL PRIMARY KEY,
    quote character varying(255) NOT NULL UNIQUE,
    author character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

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

The schema is simple with one table called `quote`. It has 5 columns in total, first one is the ID which is a serial number and the primary key of the table. Then you have the quote and author columns, both are VARCHAR of length 255 characters. The quote column is unique, meaning there can be only one unique quote on the table and the database engine will not allow the exact same quote to be saved more than once. Then you have created two helper columns to know when the quote was created and last updated. 

To test things out you can either run PostgreSQL locally or run [PostgreSQL with Docker](/blog/2021/12/docker-postgres/) and Docker compose. Another way to run this example without installing anything is, by trying out a working PostgreSQL server with the prebuilt example on [SQLFiddle](http://sqlfiddle.com/#!17/655d65/25). 

It is advisable to get started with the SQLFiddle link as it requires no installation or any other process, just click the link and start modifying your query to see output on the fly. You can highlight a single query on SQLFiddle and execute only that one. In the next section, you will learn how to use `LIKE` to match any number of characters in the column values.

## Match any number of characters

The `LIKE` expression can be used to find by pattern in mainly two ways. The first one is a pattern where you don’t care about the number of characters before or after your given pattern. The other one is the number of characters is important and defined. You can also use a mix of these two types. In this part, you will learn about pattern matching any number of characters.

From the above `quotes` table with 17 quotes, the first task for you is to find the quotes that begin with a `There`. It can be done by using the following SQL select query:

```sql
SELECT quote, author FROM quote WHERE quote LIKE 'There%';
```

It will give you 3 quotes as follows:

<img class="center" loading="lazy" src="/images/postgres-like/02postgres-like-starts-with.jpg" title="Result of Postgres LIKE exmaple to find rows that starts with a pattern" alt="Result of Postgres LIKE exmaple to find rows that starts with a pattern">

As you can see, with the `%` with the LIKE expression it does not matter how many characters are after the pattern. In the above case, the pattern, therefore, became starts with `There`, and then it can have any number of characters. Similarly, you can use it to find quotes that end with a given pattern too.

Another example to test matching any number of characters can be to list out quotes that have the word `only` in them. It can be done by running the following SQL query:

```sql
SELECT quote, author FROM quote WHERE quote LIKE '%only%';
```

Here you are telling the SQL engine to select quote and author columns from the quote table and filter by the quote column. The filter has only one condition, the quote should have the word `only` in it and any number of characters before or after the pattern of `only`. The first `%` is for the characters before the pattern `only` and the second `%` is for the characters after `only`. It will result in 5 quotes as seen below:

<img class="center" loading="lazy" src="/images/postgres-like/03postgres-like-contains.jpg" title="Result of Postgres LIKE exmaple to find rows that contains a pattern" alt="Result of Postgres LIKE exmaple to find rows that contains a pattern">

Even here the number of characters before and after the pattern used in the like expression did not matter. As long as the quote had the word `only` it was returned. You can also use th `NOT` keyword with like to inverse the condition, for example `NOT LIKE ‘%only%’ will give all the quotes that don’t have the word `only`. Next, you will find out how to construct a pattern with the exact number of characters.

## Match the exact number of characters

In the above examples, you learned about creating a pattern where the number of characters before or after the given pattern is not relevant. Now you will create other patterns for the Postgres LIKE expression where the number of characters is important. To build upon what you have just learned, you will use the `%` matcher for any number of characters with the `_` matcher that defines a specific number of characters.

Let’s suppose you know that there is a quote that has a word that 4-letter word and starts with `go` and you want to search for that quote. You can do it by running:


```sql
SELECT quote, author FROM quote WHERE quote LIKE '%go__%';
```

This will render only one quote with the word that matches the pattern `good` as follows:


<img class="center" loading="lazy" src="/images/postgres-like/04postgres-like-match-chars.jpg" title="Result of Postgres LIKE exmaple to find rows that match X no. of characters" alt="Result of Postgres LIKE exmaple to find rows that match X no. of characters">

So, the pattern you asked the DB engine to match in the quote columns is anything before and after a word that starts with `go` and then has exactly two characters after it. The exact two characters after the pattern of `go` are denoted by using `_` exactly twice. So it could match words like `good`, `gone`, `gold` etc and it did that job well. 

If you look closely there is another quote by Martin Fowler, who states:

> Any fool can write code that a computer can understand. Good programmers write code that humans can understand.

It has the word `Good` in it but that one did not show up in the above SQL query with the LIKE expression with the pattern `%go__%’. Why? Because the LIKE expression is case-sensitive. To perform case incentive pattern matching you will need to use ILIKE, discussed in the next section.

## ILIKE for case insensitive matching

By default, the `LIKE` expression in Postgres is case sensitive. To do a case insensitive comparison you will need to use the `ILIKE` expression. As `LIKE` is case sensitive in the above example of `LIKE ‘%go__%’` it did not fetch the quote with the word `Good` in it. To fetch both `good` and `Good` you will need to use the `ILIKE` expression as follows:

```sql
SELECT quote, author FROM quote WHERE quote ILIKE '%go__%';
```

The above query comes back with 2 quotes as expected given that it does a case-insensitive pattern matching.

<img class="center" loading="lazy" src="/images/postgres-like/05postgres-like-case-insensitive.jpg" title="Result of Postgres ILIKE exmaple to match pattern being case insensitive" alt="Result of Postgres ILIKE exmaple to match pattern being case insensitive">

There you have it, some practical and useful examples of both `LIKE` and `ILIKE` within a hands-on context. The code example is on [SQLFiddle](http://sqlfiddle.com/#!17/655d65/25) for your reference. 

You can also use ILIKE with the above example with `%` for any number of chacters and a combination of `NOT` and other variations. Similary, you can use both `LIKE` and `ILIKE` with more complex select statement having joins, update, and delete statements too.

## A word of caution

Even though `LIKE` and `ILIKE` are very useful, be very careful when you run them in a database with a lot of records. 

> If there are proper indexes on the searched fields it might work Ok but if the database is under-indexed these queries can take a long time. 

They take a long time because it matches the pattern in text fields which is a resource-heavy operation compared to say matching integers. 

You are aware of a tool but be careful when and how to use it. It might be ok to use in a reporting scenario. On the other hand, using it to perform searches for the user might not yield the best results depending on the scale. 

## Conclusion

In this guide, you learned about Postgres LIKE expression. Then you ran through the Quotes example and got acquainted with constructing patterns to match any number of characters with `%` operation. After that, you use the `_` operator to create a pattern to match a specific number of characters. Toward the end, you learned about using the `ILIKE` expression instead of the `LIKE` expression if you want to do a case-insensitive comparison. Finally, you were made aware to use both the `LIKE` and `ILIKE` expressions appropriately and in the right context.

I hope you have learned about how to use the LIKE expression in your Postgres where clauses. The same implementation for LIKE can be applied to other databases like MySQL too. Keep learning!
