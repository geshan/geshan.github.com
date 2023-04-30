---
layout: post
title: How to use ON DELETE CASCADE in Postgres with an example
date: 2023-04-29T23:34:52.000+11:00
comments: true
tags:
- Software Engineering
- Postgres
cover: "/images/delete-cascade-postgres/01delete-cascade-postgres.jpg"
pagetitle: How to use ON DELETE CASCADE in Postgres with an example
description: In this tutorial you will learn how to set up and use ON DELETE CASCADE in Postgres with a working example of Author and Quotes.
keywords: delete cascade postgres, postgres delete cascade, postgresql delete cascade, delete cascade postgresql
---
Postgres is one of the most [popular](https://db-engines.com/en/system/PostgreSQL) open-source relational database systems in use today. One of the useful features of PostgreSQL is on delete cascade that simplifies the code in your application. In this guide, you will learn how to set up and use `ON DELETE CASCADE` in foreign keys in Postgres, let’s get going!

<!-- more -->

<img class="center" loading="lazy" src="/images/delete-cascade-postgres/01delete-cascade-postgres.jpg" title="Learn how to use ON DELETE CASCADE in Postgres" alt="Learn how to use ON DELETE CASCADE in Postgres">

## Table of contents

* [Prerequisites](#prerequisites)
* [Author and Quotes example](#author-and-quotes-example)
    * [ON DELETE CASCADE or something else](#on-delete-cascade-or-something-else)
    * [Create tables on ElephantSQL](#create-tables-on-elephantsql)
    * [Insert data in created tables](#insert-data-in-created-tables)
    * [Delete an author row](#delete-an-author-row)
    * [Check the ON DELETE CASCADE has worked](#check-the-on-delete-cascade-has-worked)
* [Conclusion](#conclusion)

<!-- tocstop -->

## Prerequisites

Before diving into the SQL code, below are some prerequisites for this tutorial:

1. You should have a working Postgres server instance to test your code. You can use a local [Postgres Docker](/blog/2021/12/docker-postgres/) instance or simply use a free database on [Elephant SQL](https://www.elephantsql.com/plans.html) or [Neon.tech](https://neon.tech/)
1. Prior experience with any relations database management system (RDBMS) would be helpful.
1. Previous understanding of how foreign keys work in RDBMS will be advantageous
1. Being able to read Entity Relationship (ER) diagrams will make it easier for you to understand the context.

Given that is mentioned, you can continue with the guide now.

## Author and Quotes example

For this tutorial, you will use an example of an author and quotes. One author can have multiple quotes and one quote will always have only one author. It can be represented in an ER diagram as follows (diagram generated with dbdiagram.io):

<img class="center" loading="lazy" src="/images/delete-cascade-postgres/02author-quotes-er.jpg" title="Entity relationship (ER) diagram of Author and Quotes relationship" alt="Entity relationship (ER) diagram of Author and Quotes relationship">

In terms of Postgres Data Definition Language (DDL), the above ER diagram with two related entities translates to the following create table statements:

```sql/10
CREATE TABLE author (
    id SERIAL NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE quote (
    id SERIAL NOT NULL PRIMARY KEY,
    quote character varying(255) NOT NULL UNIQUE,
    author_id INTEGER REFERENCES author(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
```

There are two entities (tables) `author` and `quote`. The author table has 4 columns; id, name, created_at, and udpated_at. `ID` is a serial which is an integer autoincremented by 1 and the primary key of the table. The `name` column is a varying character that can be up to 255 characters and cannot be null, it holds the author's name. The `created_at` and `updated_at` columns are timestamp columns by default have the current timestamp.

The `quote` entity (table) also has an integer serial primary key similar to the `author` table. Then, it has a `quote` column that can hold up to 255 characters and always needs a value. The interesting column is the foreign key to the `author` table called `author_id` as highlighed above. 

The `auhtor_id` foreign key column is an integer and refers to the `id` column on the author. The main point here is it has `ON DELETE CASCADE` which means when an author is deleted all the related quotes will also be deleted. This is like a domino effect when the parent row is deleted all its child rows are deleted too. 

Depending on how `ON DELETE CASCADE` is added on relational databases like Postgres, deleting one row on table A can delete related rows on table B, similarly deleting one row on table B can delete related rows on table C. This creates a ripple effect that can delete many related children and children of children rows. So you have to be careful about how to set up on delete cascade.

After the `author_id` column, the `quote` table has `created_at` and `updated_at` similar to the columns with the same name on the `author` table.

### ON DELETE CASCADE or something else

To delete the related child rows for a parent row, there are mainly two ways. The first is to let the database server delete the related child rows with `ON DELETE CASCADE`. The second is not deleting the child rows from the database server with RESTRICT or NO ACTION. You can read more about it on the [official docs](https://www.postgresql.org/docs/current/ddl-constraints.html#:~:text=Restricting%20and%20cascading%20deletes%20are,you%20do%20not%20specify%20anything.) of Postgres.

If you choose to not delete the rows on the database server level, you will have to delete all the child rows manually from your application before the parent row(s) can be deleted. Like most things in tech, there are tradeoffs for both approaches. You should understand the implications of using the ripple/domino effect on the database level or manually deleting the child rows from the application so that the parent row can be deleted without any errors.

When you create records with relationships you must create the parent first then the child and its child. In case of delete, you have to delete the leaf (last level children), the branches (children) and then only delete the parent (root). It can be understood with a diagram better:

<img class="center" loading="lazy" src="/images/delete-cascade-postgres/03create-delete.jpg" title="How to create and delete records in a one to many parent child relationship" alt="How to create and delete records in a one to many parent child relationship">


Depending on how much data there is on the database and which database engine (if any) the database server uses, sometimes it might be wiser to not have strict foreign keys. If you want to add a column to a table with a million rows that have a child table with billion rows, things would get complicated quite quickly when the foreign keys are strict and could block both the tables while running the `ALTER TABLE` script.

In the next section, you will see how to create the above tables and insert some data. Then delete one parent row and see that its child rows are automatically deleted due to the ON DELETE CASCADE instruction on the foreign key.

### Create tables on ElephantSQL

For this example, you will use ElephantSQL, you can follow their [documentation](https://www.elephantsql.com/docs/index.html) to create an empty database for free. Create a new free database named something like `quotes-author-01` and go to the “Browser” section and run the above create table statements using the blue "Execute" button as seen below:

<img class="center" loading="lazy" src="/images/delete-cascade-postgres/04create-tables.jpg" title="Create tables author and quote with in a one to many parent child relationship" alt="reate tables author and quote with in a one to many parent child relationship">

The above SQL statements will create two tables author and quotes. The main point to focus on here is the `author_id INTEGER REFERENCES author(id) ON DELETE CASCADE,` which sets up the ON DELETE CASCADE mechanism. So, whenever any author row is deleted, any related quote rows will also be deleted. Let’s see how that happens in the next section.

### Insert data in created tables

To delete data you will need to add some data to the two tables. To add data in the `author` and `quote` table created in the previous section, please run the following on the same “Browser” screen on ElephantSQL (you can run them on your local Postgres instance too).

```sql
INSERT INTO author(name) VALUES 
('Martin Fowler'),
('Bjarne Stroustrup'),
('John Johnson');
 
 INSERT INTO quote (quote, author_id) VALUES
 ('Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', 1),
 ('If you have to spend effort looking at a fragment of code and figuring out what it is doing, then you should extract it into a function and name the function after the "what".', 1),
 ('There are only two kinds of languages: the ones people complain about and the ones nobody uses.', 2),
 ('If you think it is simple, then you have misunderstood the problem.', 2),
 ('First, solve the problem. Then, write the code.', 3);
```

It will look like the below when the insert statements are executed successfully:

<img class="center" loading="lazy" src="/images/delete-cascade-postgres/05insert-data.jpg" title="Insert data on tables author and quote" alt="Insert data on tables author and quote">

To make sure that the insert statements have worked correctly, you can run the following SELECT statement and see all the relevant data joining both the author and quote table:

```sql
SELECT q.id, q.quote, a.name, a.id as author_id, q.created_at 
FROM quote q INNER JOIN author a on a.id = q.author_id;
```

It is a simple inner join between the `author` and `quote` table using the `author_id` foreign key. The output of the above SELECT statement will look as follows:

<img class="center" loading="lazy" src="/images/delete-cascade-postgres/06select-data-before-delete.jpg" title="Select data before ON CASCADE DELETE with 5 rows" alt="Select data before ON CASCADE DELETE with 5 rows">

Now given the test data is inserted into both tables, In the next section, you will delete an author row and see that it deletes the related quote rows as well.

### Delete an author row

Now, it is time to test the `ON DELETE CASCADE` in action. To verify that the cascade deleting works as expected and will delete the quotes related to the author you will delete the author with id 2 which is Bjarne Stourstrup. This DELETE statement will delete one row in the `author` table and also delete 2 more rows in the `quote` table. It will happen because you have set up the `ON DELETE CASCADE` on the foreign key from the `quote` table to the `author` table. To delete the row with id 2 on the author, you can run the following statement on the “Browser” screen on ElephantSQL:

```sql
DELETE from author WHERE id = 2; # Bjarne Stroustrup
```

When it executes without errors, it will look as follows:

<img class="center" loading="lazy" src="/images/delete-cascade-postgres/07on-delete-cascade.jpg" title="Delete author with id 2" alt="Delete author with id 2">

You have successfully deleted row id 2 on the author, the row for Bjarne Stroustrup. Now it should have deleted the two quotes by Bjarne which is described in the next section.

### Check the ON DELETE CASCADE has worked

The author Bjarne Stroustrup with id 2 had two quotes on the quote table with ids 3 and 4. To check that both the related quotes are deleted when the author is deleted you can again run the following select statement that joins those two tables:
 
```sql
SELECT q.id, q.quote, a.name, a.id as author_id, q.created_at 
FROM quote q INNER JOIN author a on a.id = q.author_id;
```

After deleting the author with id 2 (Bjarne Stroustrup) due to the ON DELETE CASCADE in place it would delete the two quotes too as seen in the output below:

<img class="center" loading="lazy" src="/images/delete-cascade-postgres/08after-delete.jpg" title="After ON DELETE CASCADE related quotes of the author id 2 is deleted too" alt="After ON DELETE CASCADE related quotes of the author id 2 is deleted too">

Congrats! Now you understand how the domino effect of ON DELETE CASCADE works in Postgres. It is a similar concept in other relational database systems like MySQL.

## Conclusion

In this tutorial, you learned how to set up an ON DELETE CASCADE with a foreign key in Postgres using the example of one Author having multiple Quotes schema. After that, you added some example data and then deleted an author to see the effect of ON DELETE CASCADE. In effect, it deleted the related quotes for the deleted author from the database server level without adding any more application-level code.

I hope you learned how ON DELETE CASCADE works on Postgres, it is a similar approach in other relations databases too.
