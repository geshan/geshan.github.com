---
layout: post
title: "How to Upsert Data in Postgres Using INSERT ON CONFLICT UPDATE"
date: 2024-12-14T21:37:45.000+11:00
comments: true
tags:
- Postgres
- Software Engineering
- Web Development
cover: "/images/postgres-insert-on-conflict-update/01postgres-insert-on-conflict-update.jpg"
pagetitle: "How to Upsert Data in Postgres Using INSERT ON CONFLICT UPDATE"
description: "Learn how to upsert data in Postgres using the INSERT ON CONFLICT UPDATE clause with practical examples. Combine insert and update operations into one UPSERT."
keywords: postgres on conflict update, postgres upsert, postgres upsert example, postgres upsert multiple rows, postgres upsert single row
---
Updating existing data is a core requirement of any web application; doing it efficiently will make your life easier. PostgreSQL, a robust and feature-rich relational database, offers a powerful and elegant solution for managing these updates: `INSERT ON CONFLICT UPDATE`. It is helpful to combine insert and update to Upsert and use the same logic for both operations. In this post, you will learn how to use `INSERT ON CONFLICT UPDATE` in Postgres to Upsert data effectively with practical examples. Let’s get going!

<!-- more -->

<img class="center" src="/images/postgres-insert-on-conflict-update/01postgres-insert-on-conflict-update.jpg" title="How to Upsert Data in Postgres Using INSERT ON CONFLICT UPDATE" alt="How to Upsert Data in Postgres Using INSERT ON CONFLICT UPDATE">

## Table of contents

- [Postgres Upsert with INSERT ON CONFLICT UPDATE syntax](#postgres-upsert-with-insert-on-conflict-update-syntax)
- [Upsert example with quotes table](#upsert-example-with-quotes-table)
  - [Upsert a single row in the quotes table](#upsert-a-single-row-in-the-quotes-table)
  - [Upsert multiple rows on the quotes table](#upsert-multiple-rows-on-the-quotes-table)
- [Conclusion](#conclusion)

## Postgres Upsert with INSERT ON CONFLICT UPDATE syntax

The `INSERT ON CONFLICT` clause in PostgreSQL provides an efficient way to perform an upsert operation. Unlike traditional `INSERT` statements coupled with `UPDATE` statements, which require separate queries, `INSERT ON CONFLICT` combines both actions into one. The syntax is as follows:

```sql
INSERT INTO table_name (column1, column2, ...)
VALUES (value1, value2, ...), (value3, value4, ...), ...
ON CONFLICT (unique_constraint) DO UPDATE
SET column1 = excluded.column1, column2 = excluded.column2, …
RETURNING columns/*
```

Let's break down this powerful command:

* `INSERT INTO table_name (column1, column2, ...)`: This specifies the target table and the columns to be inserted or updated.  Ensure your column names are accurate!

* `VALUES (value1, value2, ...), (value3, value4, ...), ...`: These are the values you're trying to insert. You can supply multiple sets of values to upsert multiple rows simultaneously.

* `ON CONFLICT (unique_constraint)`: This is the core of the upsert operation.  You specify the unique constraint (typically a primary key or a unique index) that determines whether to perform an insert or an update. The unique constraint is crucial for identifying whether a row already exists. 

* `SET column1 = excluded.column1, column2 = excluded.column2, ...`: If a conflict is identified (a row with the same unique constraint already exists), this section specifies the columns to update and their new values.  The keyword `excluded` refers to the values that were *originally* provided in the `VALUES` clause.  This helps efficiently update the existing row without any complex subqueries.
* `RETURNING`: clause returns from the insert or update statement the values of any columns after the insert or update was run. You can select some columns or everything with a `*`.

You can read more about the INSERT and INSERT ON CONFLICT part in the Postgres official [docs](https://www.postgresql.org/docs/current/sql-insert.html). You can also read about [Postgres Node.js Tutorial](/blog/2021/01/nodejs-postgresql-tutorial/) if you want to create a simple Node.js app interacting with Postgres. Also, you can read [Postgrest insert multiple rows](/blog/2024/08/postgres-insert-multiple-rows/) to learn about techniques to insert multiple rows into Postgres efficiently with the same example used below.

If your app has a data insertion, it will require updating data, too. Therefore, combining the two tasks into one becomes much more manageable, where Upsert becomes useful. In addition to `INSERT ON CONFICT UPDATE`, in the newer version of Postgres that is 15 and above, a [MERGE statement](https://www.postgresql.org/docs/current/sql-merge.html) is also available.

## Upsert example with quotes table

Let's illustrate `INSERT ON CONFLICT UPDATE` with a practical example using a `quotes` table.  This table stores quotes along with their authors and has the following structure:

```sql
CREATE TABLE quote (
    id SERIAL PRIMARY KEY,
    quote character varying(255) NOT NULL UNIQUE,
    author character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

Now, let's create a query that inserts 17 quotes about programming into this table as the initial data to work with:

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

In the next section, you will see a couple of examples of upserting a single row and then multiple rows in the above `quote` table.

### Upsert a single row in the quotes table

Let’s imagine a scenario where one quote can be edited with a form, and another form exists to insert new quotes. These two forms can use two different queries, one insert, and one update, but it would be much easier and more maintainable if both of these use cases utilized a single SQL query with upsert. That Upsert query in Postgres can be achieved with `INSERT ON CONFLICT UPDATE` as seen below: 

```sql
INSERT INTO quote (id, quote, author) VALUES
(3, 'First, solve the problem. Then, write the code1.', 'John Johnson1')
ON CONFLICT (id) DO UPDATE
SET quote = excluded.quote, author = excluded.author, updated_at = DEFAULT
RETURNING *;
```

This query attempts to upsert a single quote. If a quote’s unique id (the primary key) already exists, both the `quote` and `author` columns will be updated to reflect the new value provided.  The original `created_at` timestamp will be preserved, and `updated_at` will get the last updated time with the `DEFAULT` keyword, equating to the current timestamp. The values above don’t make sense, but they are used to show that the rows are being updated. If you provide the id as `null`, it will be inserted as it will not conflict with any existing id.

### Upsert multiple rows on the quotes table

The power of `INSERT ON CONFLICT UPDATE` truly shines when you need to handle multiple rows.  For instance, let’s say you have a CSV file containing a list of quotes and their authors that you want to import into the `quotes` table. You could use a single query to insert all the quotes, ensuring that existing quotes are efficiently updated.  This demonstrates a significant reduction in overhead compared to performing multiple individual `INSERT` and `UPDATE` operations.

Here’s a sample query that demonstrates this concept with an assumption that the CSV only had two quotes:
  
```sql
INSERT INTO quote (id, quote, author) VALUES
(4, 'Java is to JavaScript what car is to Carpet.2', 'Chris Heilmann2'),
(11, 'Deleted code is debugged code.3', 'Jeff Sickel3')
ON CONFLICT (id) DO UPDATE
SET quote = excluded.quote, author = excluded.author, updated_at = DEFAULT
RETURNING *;
```

If it were an actual application, the `VALUES` part would have been constructed based on the data provided in the CSV. This would have been done with a parameterized query or an ORM (Object-relational mapping) library of the team’s choice. Like above, if you put the `id` as `null`, that row will be inserted. In the case of this `quote` table, the `quote` column is also unique, so if the given quote matches an existing quote, you might get an error. Using the `quote` column as the `conflict target` of the conflict can be another way of dealing with that issue.

In this example, you are using id, but for your use case, you can use any unique column or constraint with a combination of more than one column. If the columns are passed correctly in the `conflict target`, the `ON CONFLICT(...)` part will work as expected.

You can find both examples as a [DB Fiddle](https://www.db-fiddle.com/f/s4d4rRtvm7ez2TJAdAFmg3/3) you can run, which looks like the below when you run it:

<img class="center" src="/images/postgres-insert-on-conflict-update/02postgres-insert-on-conflict-update-db-fiddle.jpg" loading="lazy" title="Postgres insert on conflict update runnable quote example on db fiddle" alt="Postgres insert on conflict update runnable quote example on db fiddle">

You can play around with that DB fiddle, fork it, and use it for your experiments as you please.

## Conclusion

PostgreSQL’s `INSERT ON CONFLICT UPDATE` feature offers a robust and efficient way to manage data updates. Understanding its syntax and other considerations can significantly improve your database operations, especially when dealing with bulk updates whenever possible, for improved performance and maintainability of your applications. 

You learned about UPSERT in Postgres using the `INSERT ON CONFLICT UPDATE` clause used on the quotes table to upsert single and multiple rows. Always prioritize efficient, well-structured SQL and techniques to improve your application’s code, like combining both INSERT and UPDATE into one UPSERT.
