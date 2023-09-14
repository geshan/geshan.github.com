---
layout: post
title: How to Use LIMIT in Postgres Delete in two roundabout ways
date: 2023-09-14T22:47:52.000+11:00
comments: true
tags:
- Software Engineering
- Postgres
cover: "/images/postgres-delete-limit/01postgres-delete-limit.jpg"
pagetitle: How to Use LIMIT in Postgres Delete in two roundabout ways
description: "In this guide, you will learn how to use limit in Postgres DELETE statement with a sub query and a CTE with examples of each, click and learn them now!"
keywords: postgres delete limit, postgres limit delete, postgresql delete limit
---
Postgres is a very popular and feature-rich database. However, unlike other database management systems like MySQL, you cannot use the `LIMIT` keyword in Delete or Update statements. You can only use it in a select statement. In this blog post, you will learn about a couple of workarounds that can help delete rows on a Posgrest table with an arbitrary limit, let’s get going!

<!-- more -->

<img class="center" src="/images/postgres-delete-limit/01postgres-delete-limit.jpg" title="How to Use LIMIT in Postgres Delete in two roundabout ways" alt="How to Use LIMIT in Postgres Delete in two roundabout ways">

## Table of contents

* [The example quotes schema](#the-example-quotes-schema)
* [MySQL Delete allows LIMIT](#mysql-delete-allows-limit)
* [Postgres Delete does not allow LIMIT](#postgres-delete-does-not-allow-limit)
* [Solution 1: Use DELETE with WHERE IN and SELECT](#solution-1%3A-use-delete-with-where-in-and-select)
* [Solution 2: Use Common Table Expression (CTE)](#solution-2%3A-use-common-table-expression-(cte))
* [Conclusion](#conclusion)

## The example quotes schema

For the scope of this blog post, you will use a simple schema with 2 tables, author and quote. This schema has been conveniently borrowed from another post on this blog about [Cascade delete in Postgres](/blog/2023/04/delete-cascade-postgres/) database. The schema looks like the below:

<img class="center" loading="lazy" src="/images/delete-cascade-postgres/02author-quotes-er.jpg" title="Entity relationship (ER) diagram of Author and Quotes relationship" alt="Entity relationship (ER) diagram of Author and Quotes relationship">

You can create the schema with the following create table statements:

```sql
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

To insert some data you can run the following insert statements:

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

Notice that if you delete the author all the related quotes will be deleted due to the ON DELETE CASCADE, which is discussed in the above-mentioned post. The create table will be pretty similar even in other flavors of databases like MySQL, which you are doing to know about next.

## MySQL Delete allows LIMIT

Before you dive into how to achieve DELETE with LIMIT in Postgres, let's briefly mention that some database management systems, like MySQL, allow you to use the LIMIT clause directly with the DELETE statement. This can be quite convenient, as it allows you to limit the number of rows deleted in a single query. For example, if you want to delete only 1 quote by author ID 2 (Bjarne Stroustrup) from the above schema it can be done with the following query:

```sql
DELETE FROM quote WHERE author_id = 2 LIMIT 1;
```

In the above MySQL example, only 1 row that matches the author condition will be deleted. Unfortunately, Postgres does not offer this feature natively. In Postgres [LIMIT](https://www.postgresql.org/docs/current/queries-limit.html) can only be used in Select statements. More on that in the next section.

## Postgres Delete does not allow LIMIT

Postgres, a powerful and versatile relational database system, doesn't support the LIMIT clause directly in the DELETE statement. This can be a limitation when you want to delete a specific number of rows from a table without writing complex queries or scripts.

So, how can you achieve similar functionality in Postgres? Let's explore two common workarounds.

## Solution 1: Use DELETE with WHERE IN and SELECT

One way to delete a limited number of rows in Postgres is by combining the DELETE statement with a WHERE condition that uses the IN clause along with a subquery. Here's how you can delete only 1 row for user id 2, similar to the above MySQL exmaple:

```sql
DELETE FROM quote WHERE id IN 
(SELECT id  FROM quote WHERE author_id = 2 LIMIT 1)
```

In this example, you use a subquery to select the IDs of the rows from the quote table you want to delete, limiting the result set to 1 row. Then, you use the DELETE statement with a WHERE clause that specifies the IDs to delete. This effectively limits the number of rows deleted to 1 for the user id 2. It is more like [piping](https://ryanstutorials.net/linuxtutorial/piping.php#piping) in bash where the output of one command is used as the input for the next command.

This approach provides a workaround to achieve the desired result, but it's essential to note that it may not be the most efficient solution for large tables. The subquery in the IN clause can impact performance, especially when dealing with extensive datasets. You will also need to think of the CASCADE effects where it might seem like only 1 row is being deleted but due to related rows and other rows related to the children's rows, it can delete 100s or 1000s of rows too. Next, you will learn about another solution to achieve limit while deleting records in Postgres.

## Solution 2: Use Common Table Expression (CTE)

Another approach to achieving a limited DELETE operation in Postgres is by using a Common Table Expression (CTE). A CTE allows you to define a temporary result set that you can reference within your DELETE statement. Here's how you can use it to delete only 1 quote for author id 2:

```sql
WITH rows_to_delete AS (
    SELECT id
    FROM quote
    WHERE author_id=2
    LIMIT 1
)
DELETE FROM quote
WHERE id IN (SELECT id FROM rows_to_delete);
```

In this solution, you first create a CTE called "rows_to_delete" that selects the IDs of the rows to be deleted, limited to 1 row for the author ID 2. Then, you use the DELETE statement with a WHERE clause that references the CTE to perform the deletion.

Using a CTE can be a more efficient and cleaner way to achieve the desired result compared to the subquery approach. It separates the query logic into distinct parts, making the query easier to read and maintain. The same logic of cascade delete applies to this method too. You can test it out on [SQLFiddle](http://sqlfiddle.com/#!17/8bd76/1) too.

## Conclusion

While Postgres does not provide a native LIMIT clause for the DELETE statement like some other database systems, you can still achieve the same functionality using workarounds. In this comprehensive exploration, you learned about two common methods: using DELETE with WHERE IN and SELECT and leveraging Common Table Expressions (CTEs). These techniques allow you to limit the number of rows deleted in a roundabout way, providing you with greater control over your data manipulation operations in Postgres.

Additionally, it's crucial to consider database design and indexing when dealing with large datasets to ensure efficient DELETE operations. Proper indexing and query optimization can significantly improve the performance of your database queries, including DELETE statements. You can use the same approach with Update statements too.

In conclusion, mastering these workarounds will empower you to efficiently manage your data in Postgres, even when faced with the absence of a native LIMIT clause in the DELETE statement. By understanding these techniques, you can make more informed decisions about how to manipulate your data effectively and efficiently in your Postgres database. Keep learning!
