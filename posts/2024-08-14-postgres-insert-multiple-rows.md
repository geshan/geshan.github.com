---
layout: post
title: "How to insert multiple rows in Postgres using two useful methods"
date: 2024-08-14T20:45:37.000+11:00
comments: true
tags:
- Software Engineering
- Postgres
cover: "/images/postgres-insert-multiple-rows/01postgres-insert-multiple-rows.jpg"
pagetitle: "How to insert multiple rows in Postgres using two useful methods"
description: "Learn to insert multiple rows at once in Postgres with a single insert statement and the copy command in this useful tutorial."
keywords: postgres insert multiple rows, postgers insert multiple rows at once, postgres insert multiple rows copy, postgres insert multiple rows single insert
---
The PostgreSQL database, lovingly known as Postgres, is a powerful open-source database management system. Developers adore it for its robustness, reliability, and expressive SQL (Structured Query Language) capabilities. Often, when working with Postgres, you'll need to insert multiple rows into a table. While the single-row INSERT statement might be the first thing that pops into your mind, there are more efficient approaches when dealing with large amounts of data. In this blog post, you will dive deep into two powerful methods that can significantly streamline the process of inserting multiple rows in Postgres. Let's get started!

<!-- more -->

<img class="center" src="/images/postgres-insert-multiple-rows/01postgres-insert-multiple-rows.jpg" title="How to insert multiple rows in Postgres using two useful methods" alt="How to insert multiple rows in Postgres using two useful methods">

## Table of contents

* [Adding data](#adding-data)
* [Example quote table](#example-quote-table)
* [Single Insert](#single-insert)
* [Multiple rows with a single insert](#multiple-rows-with-a-single-insert)
    * [On Conflict and DB transaction](#on-conflict-and-db-transaction)
* [Insert multiple rows with copy command](#insert-multiple-rows-with-copy-command)
    * [Use the quotes example for copy](#use-the-quotes-example-for-copy)
* [Conclusion](#conclusion)

## Adding data

As a software engineer, you should always strive to write optimally optimized and efficient code. This can be the number of requests per second the code is expected to handle, the size of data, the number of database connections, and other factors. The same goes for the data manipulation operation you perform on a database, be it MySQL, Postgres, or another database. So, you should know about the trade-offs and choose the best approach given the context.

You will explore the two ways to insert multiple rows in Postgres. First, you will look at inserting multiple rows with a single INSERT statement, then delve into the powerful `COPY` command, that can be used to insert multiple rows from an external CSV file to an existing table. By the end of this comprehensive exploration, you'll have a solid grasp of how to insert multiple rows in Postgres efficiently and effectively.

## Example quote table

For this tutorial, you will use the table called `quote` with the schema given below to do the multiple inserts:

```sql
CREATE TABLE quote (
    id SERIAL NOT NULL PRIMARY KEY,
    quote character varying(255) NOT NULL UNIQUE,
    author character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

It is a simple table with an auto-increment primary key called `id`, then there are two character fields for quote and author. The quote field is unique. After that, there are two fields for the created and updated timestamps to track when the row was created and updated. Next, you will learn how to do a single-row insert.

## Single Insert

The most common way to insert a row into a Postgres table is by using the `INSERT` statement. The basic syntax of an `INSERT` statement is as follows:

```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

Now, to insert a new quote into the quote table, you would use the following SQL statement:

```sql
INSERT INTO quote (quote, author)
VALUES ('The only way to learn a new programming language is by writing programs in it.', 'Dennis Ritchie');
```

This statement inserts a new quote into the quote table with the value `The only way to learn a new programming language is by writing programs in it.` and `Dennis Ritchie` as the author. The above `INSERT` statement works well for a single row, but what if you want to insert multiple rows? For that, you would have to repeat the same `INSERT` statement for each row which is not very efficient, for instance, to add two more quotes with other authors  you will need to execute two more INSERT statements as below:

```sql
INSERT INTO quote (quote, author)
VALUES ('Talk is cheap. Show me the code.', 'Linus Travolds');

INSERT INTO quote (quote, author)
VALUES ('Programs must be written for people to read, and only incidentally for machines to execute.', 'Harold Abelson');
```

As you can see for 3 rows you had to run 3 INSERT statements. Now, you know the single `INSERT` statement is not very efficient for inserting multiple rows. It might involve multiple connections from your app to your database which will be slow. You will learn about a much more efficient way of doing this in the next section.

## Multiple rows with a single insert

There are a couple of other ways to insert multiple rows in Postgres and both of them are much better than running individual `INSERT` statements. One way to do it is to run single `INSERT` statements to insert multiple rows with a bulk insert approach. Another way to insert multiple rows in Postgres is by using the `COPY` command.

Inserting multiple rows with a single insert has a similar syntax as inserting a single row, the main difference is you pass in multiple rows. Below is an example to insert 5 quotes on the above quote table:

```sql
INSERT INTO quote (quote, author) VALUES 
('There are only two kinds of languages: the ones people complain about and the ones nobody uses.', 'Bjarne Stroustrup'), 
('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 'Martin Fowler'), 
('First, solve the problem. Then, write the code.', 'John Johnson'), 
('Java is to JavaScript what car is to Carpet.', 'Chris Heilmann'), 
('Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.', 'John Woods');
```

When you run it with `psql` it will look as follows:

<img class="center" loading="lazy" src="/images/postgres-insert-multiple-rows/02insert-multiple.jpg" title="Inserting multiple rows with single insert query working on psql" alt="Inserting multiple rows with single insert query working on psql">

You can also use the [RETURING keyword](https://www.postgresql.org/docs/current/dml-returning.html) in Postgres to get the inserted data.

### On Conflict and DB transaction

If you do a bulk insert of multiple rows with a single insert, you can easily turn it into an upsert using the `ON CONFLICT` [clause](https://www.postgresql.org/docs/current/sql-insert.html#SQL-ON-CONFLICT). It checks if a unique constraint or a composite key is violated, in that case, you can use the new values to replace the old ones. For instance, in the above example if an already existing quote is inserted again and you want to change the author it will look like this:

```sql
INSERT INTO quote (quote, author)
VALUES
    ('First, solve the problem. Then, write the code.', 'John Johnson1), 
    ('Java is to JavaScript what car is to Carpet.', 'Chris Heilmann1'), 
ON CONFLICT (quote) DO UPDATE
SET author = EXCLUDED.author;
```

The above insert will act like an upsert and update the author to the new values provided in the insert values as the quote already exists and it has a unique constraint.

Another thing to consider is if you are inserting rows with a parent-child table for example, the author is a table and the quote is another table as described in this [Postgres Delete Cascade](/blog/2023/04/delete-cascade-postgres/) post, then it is best done in a database transaction. You will first add the author get the author’s id and use it in the query to insert the quote all in the same database transaction to maintain data integrity. Next, you will learn about the useful COPY command.

## Insert multiple rows with COPY command

The `COPY` command provides a bulk insertion mechanism for inserting multiple rows from a file into a Postgres table with a single command. It can significantly improve performance compared to executing multiple individual INSERT statements. It's particularly useful when you have large datasets to import.

The basic syntax for using the `COPY` command for inserting data from a CSV file to a table is:

```sql
COPY table_name (column1, column2, column3, ...)
FROM file_path/'file_name'
WITH DELIMITER ',' CSV HEADER;
```

Let's break down the different parameters:

1. `table_name`: The table name you want to insert the data into.
2. `column1, column2, column3, ...`: Column names you want to add data for.
3. `FROM 'file_path/file_name'`: Specifies the path of the file you are inserting data from. You can use relative or absolute paths.
4. `WITH DELIMITER ',' CSV HEADER;`: Specifies the format of the file and if the file has header information or not.

### Use the quotes example for copy

You can create a new file named quotes.csv with the following data, similar to the quotes you added with `INSERT` statement in the earlier example:

```csv
quote,author
"Software and cathedrals are much the same — first we build them, then we pray.",Unknown
"Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program.",Linus Torvalds
Programming isn’t about what you know; it’s about what you can figure out.,Chris Pine
The function of good software is to make the complex appear to be simple.,Grady Booch
The most important property of a program is whether it accomplishes the intention of its user.,C.A.R. Hoare
```

You can download the quotes.csv file from [here](https://filebin.net/8je4l43gxeueqm7j/quotes.csv).

For the CSV file you have:

* **Header:** The first line has the header information, which matches the column name of the quotes table.
* **Delimiter:** The delimiter used in the CSV file to separate the columns is a comma.
* **Quote:** Some of the quotes are wrapped in double quotes.

To insert the quotes data from the CSV file into the quote table you can run the following `COPY` command:

```sql
COPY quote("quote","author") from '/tmp/quotes.csv' WITH DELIMITER ',' CSV HEADER;
```

It will insert all 5 rows from the CSV file into the quote table. Below is a screenshot of it being run with psql:

<img class="center" loading="lazy" src="/images/postgres-insert-multiple-rows/03postgres-copy.jpg" title="Postgres copy with a CSV file working on psql" alt="Postgres copy with a CSV file working on psql">

To verify if the `COPY` command has worked properly, you can run the following select statement:

```sql
SELECT id, quote, author, created_at FROM quote;
```

It will list all 5 quotes from the CSV file and the one you inserted earlier in the single insert section. The output should look like the following on psql:

<img class="center" loading="lazy" src="/images/postgres-insert-multiple-rows/04postgres-10-rows.jpg" title="All 10 rows visible with select, 5 from bulk insert and 5 from the copy command" alt="All 10 rows visible with select, 5 from bulk insert and 5 from the copy command">

The `COPY` command has efficiently inserted the data from the `quotes.csv` file. Now, you know how to use the `COPY` command to insert data from a CSV file. To use the copy command you will need extra permissions, below is a line from the official [docs](https://www.postgresql.org/docs/current/sql-copy.html):

> COPY naming a file or command is only allowed to database superusers or users who are granted one of the roles pg_read_server_files, pg_write_server_files, or pg_execute_server_program, since it allows reading or writing any file or running a program that the server has privileges to access.

Given the user has the right permissions, the `COPY` command is a very useful tool. I could not run it on a [Neon](https://neon.tech) database but I could easily run it on a local Postgres database run with [Docker compose](/blog/2021/12/docker-postgres/).

## Conclusion

In this comprehensive guide, you have explored two effective methods for inserting multiple rows in Postgres. You learned the limitations of using individual `INSERT` statements for large datasets and used the single insert to put in multiple rows at once. You then delved into the powerful `COPY` command, discovering how to efficiently insert multiple rows from a CSV file.

By mastering these techniques, you can streamline your data manipulation operations, enhance performance, and optimize your Postgresql workflows. Keep in mind to be aware of the performance considerations, and database design, and indexing when dealing with a huge data set for efficient insert operations. The next time you face the task of inserting multiple rows in a Postgres table, remember these methods and choose the most suitable approach for your needs. Happy coding!
