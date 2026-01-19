---
layout: post
title: How to Use PostgreSQL COALESCE effectively with examples
date: 2023-07-29T21:45:52.000+11:00
comments: true
tags:
- Software Engineering
- Postgres
cover: "/images/postgresql-coalesce/01postgresql-coalesce.jpg"
pagetitle: How to Use PostgreSQL COALESCE effectively with examples
description: In this guide, you will learn how to use PostgreSQL COALESCE function effectively to handle null value with practial examples.
keywords: postgresql coalesce, postgres coalesce
---
In the world of database management systems, PostgreSQL (Postgres) is a popular choice due to its robust features and flexibility. One powerful function it offers is COALESCE, which allows you to handle null values effectively. In this blog post, you will explore what PostgreSQL COALESCE is, learn when it is useful, and see examples to demonstrate how to use it effectively. Let's get going!

<!-- more -->

<img class="center" loading="lazy" src="/images/postgresql-coalesce/01postgresql-coalesce.jpg" title="How to Use PostgreSQL COALESCE effectively with examples" alt="How to Use PostgreSQL COALESCE effectively with examples">

## Table of contents

* [What is PostgreSQL](#what-is-postgresql)
* [PostgreSQL COALESCE](#postgresql-coalesce)
* [When to Use COALESCE](#when-to-use-coalesce)
* [How to Use PostgreSQL COALESCE (with Examples)](#how-to-use-postgresql-coalesce-with-examples)
  * [Replace null with a value](#replace-null-with-a-value)
  * [Select a different value from another field](#select-a-different-value-from-another-field)
  * [Replace the null value in join with a fallback value](#replace-the-null-value-in-join-with-a-fallback-value)
* [Conclusion](#conclusion)

## What is PostgreSQL

PostgreSQL, often simply Postgres, is a free and open-source database management system (DBMS) with a long history of active development and a strong, proven feature set that has earned it a solid reputation for reliability, data integrity, and performance.

PostgreSQL is a true multi-user, multi-threaded database management system that can handle a wide range of workloads, from small personal databases to large, mission-critical applications. It supports a wide range of data types and operations, including full-text search, spatial data, and JSON data. It is also a [object-oriented](https://arctype.com/blog/postgres-ordbms-explainer/) relational database management system.

PostgreSQL is also highly extensible, with a large community of developers contributing to the project. This means that there is a wide range of extensions available for PostgreSQL, covering everything from performance tuning to data modeling to security. You can know more about PostgreSQL in the video below (in just 100 seconds):

{% youtube "n2Fluyr3lbc" %}

There are many useful features of PostgreSQL, one of them is the built-in Coalesce function. It can be used while selecting data from table(s) which makes your life a lot easier. In the next section, you will learn what is Coalesce in PostgreSQL.

## PostgreSQL COALESCE

COALESCE is a built-in function in Postgres that takes multiple arguments and returns the first non-null value from those arguments. It evaluates the arguments in the order specified and stops as soon as it encounters a non-null value. If all the arguments are null, COALESCE returns null. For example, if you have a column of values that are sometimes null, you can use COALESCE to return a default value for those null values. 

COALESCE is a very useful function for dealing with null values in Postgres. It can be used to ensure that all values in a column are non-null or to return a default value for null values. In the next section, you will out in a bit more detail when to use COALESCE in PostgreSQL.

## When to Use COALESCE

There are several scenarios where using COALESCE in PostgreSQL can be beneficial:

* Handling Null Values: When dealing with database queries or data manipulation, it's common to encounter null values. COALESCE helps you replace null values with alternative non-null values, making your queries or calculations more reliable and consistent.

* Conditional Value Selection: COALESCE allows you to select a preferred value from a list of options based on specific conditions. This is especially useful when working with conditional logic in your queries with `SELECT COALESCE`.

* Displaying Default Values: If you want to display a default value when a column contains a null value, COALESCE can be used to provide a fallback value for better data presentation.

Next, you will learn about how to use the PostgreSQL COALESCE function with some examples.

## How to Use PostgreSQL COALESCE (with Examples)

To demonstrate how to use COALESCE effectively, let's consider an example. Here is a simple [ER-Diagram](https://www.lucidchart.com/pages/er-diagrams) of users and blog posts. One user can have 0 or more blog posts and one blog post will have exactly one author (user). It looks like the below as designed in [DB Diagram](https://dbdiagram.io/d/64c4f31602bd1c4a5ee64183):

<img class="center" loading="lazy" src="/images/postgresql-coalesce/02postgresql-coalesce-erd.jpg" title="ER-Diagram with users and blog posts for PostgreSQL Coalesce examples" alt="ER-Diagram with users and blog posts for PostgreSQL Coalesce examples">

The above schema when exported to Postgres will result in something as follows:

```sql
CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "first_name" varchar,
  "middle_name" varchar,
  "last_name" varchar,
  "role" varchar,
  "created_at" TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE "blog_posts" (
  "id" serial PRIMARY KEY,
  "title" varchar,
  "body" text,
  "excerpt" text,
  "user_id" integer,
  "status" varchar,
  "created_at" TIMESTAMP NOT NULL DEFAULT now()
);

ALTER TABLE "blog_posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
```

Then you can add some data in these two tables executing the following INSERT statements:

```sql
INSERT INTO users (first_name, middle_name, last_name, role) 
VALUES ('John', 'A', 'Doe', 'admin'),
       ('Jane', 'B', 'Doe', 'author'),
       ('John', null, 'White', 'author');

INSERT INTO blog_posts (title, body, excerpt, user_id, status)
VALUES ('Hello World', 'This is my first post', 'This is my first post', 1, 'published'),
       ('Hello Again', 'This is my second post', 'This is my second post', 1, 'published'),
       ('Hello World2', 'This is my first post 1', 'This is my post', 3, 'published'),
       ('Hello Again2', 'This is my second post - draft', null, 3, 'draft');
```

Here you inserted 3 users, John Doe, Jane Doe, and John White. After that you inserted 4 blog posts 2 for John Doe and then the next 2 for John White. Notice that John While user no. 3 does not have a middle name and also has not written any blog posts. You will use this for the example queries. You can find the above schema and data set as a [SQL fiddle](http://sqlfiddle.com/#!17/c72b73/25) if you want to try it on your own on the browser without the need to install anything.

You can also host the above database structure and data on a free hosted service like  [Neon](https://neon.tech/) or [Elephant SQL](https://www.elephantsql.com/). You can also opt to put it on your local machine as a [Postgres Docker](/blog/2021/12/docker-postgres/) container if you wish.

### Replace null with a value

As the first example, your task is to select the “full name” of all the users. Now one (or more) of the users can have a `null` middle name as many people don’t have a middle name. In the data set “John Whilte” does not have a middle name so you can select the full name of all users with:

```sql
SELECT 
id, CONCAT_WS(' ', first_name, COALESCE(middle_name, ''), last_name) 
AS full_name FROM users;
```

Here you are using `CONCAT_WS` to concatenate the selected columns with a ` ` space in between. Then you are utilizing the handy `COALESCE` function for the middle name as it can be null, when the middle name is null you are selecting an empty string. This will result in the following which shows the full name of `John White` without any issues even when his middle name is null:

<img class="center" loading="lazy" src="/images/postgresql-coalesce/03postgresql-coalesce-null-mn.jpg" title="PostgreSQL coalesce example of null middle name while selecting full name" alt="PostgreSQL coalesce example of null middle name while selecting full name">

Have a look at the third row in the result, the full name is as expected `John White` without any middle name.

### Select a different value from another field

For the next example, in the `blog posts` table, the `excerpt` column can be `null`. So the task is, if the excerpt field is null then select the first x (say 5) characters from the body field. This can be done with:

```sql
SELECT
  blog_posts.id as blog_post_id, 
  first_name as author, COALESCE (excerpt, LEFT(body, 5))
FROM
  blog_posts INNER JOIN users on users.id = blog_posts.user_id;
```

This will result in:

<img class="center" loading="lazy" src="/images/postgresql-coalesce/04postgresql-coalesce-excerpt.jpg" title="PostgreSQL coalesce example of selecting expert as the first 5 characters of the body" alt="PostgreSQL coalesce example of selecting expert as the first 5 characters of the body">

In the above query, you are using the `LEFT` function to select the first 5 characters of the body if the excerpt is null. This can be seen in the last row of the result which shows `This ` those are the first 5 characters of the `body` column as the excerpt is null.

Another example of a similar task can be in the case of a product in an e-commerce store. The use-case is if the product is in discount select the `discounted_price` else select the `price` which is the regular price.

Coalesce can also be used with table joins, which you will learn next.

### Replace the null value in join with a fallback value

The last task with the above data structure and the data set is to select all users and blog post titles even if the user does not have any blog posts. If the user does not have any blog post it should show `no title` for that user which will be the user id 2 with the name `Jane` in the above data set. It can be done with a left join as follows:

```sql
SELECT
  users.id,
  COALESCE(blog_posts.title, 'no title')
FROM
  users LEFT JOIN blog_posts on users.id = blog_posts.user_id
```

The above query will result in:

<img class="center" loading="lazy" src="/images/postgresql-coalesce/05postgresql-coalesce-left-join.jpg" title="PostgreSQL coalesce example of left join and replace missing value" alt="PostgreSQL coalesce example of left join and replace missing value">

The left join was used in the above query to list all the users even if the user did not have any blog posts. This is seen in the last row of the results. I hope the above 3 examples were useful to understand how to use PostgreSQL COALESCE.

## Conclusion

PostgreSQL COALESCE function is a powerful function that allows you to handle null values effectively in your database queries. By using COALESCE function, you can replace null values, perform conditional value selection, and display default values as needed. Understanding and leveraging the capabilities of COALESCE enhances the reliability and readability of your SQL queries.

In this blog post, you learned the concept of PostgreSQL COALESCE and its applications. By incorporating COALESCE into your database operations, you can handle null values with ease and improve the accuracy of your data manipulations.

Remember to experiment with COALESCE in your own projects, exploring its versatility and finding creative ways to enhance your SQL queries. Happy coding with Postgres!
