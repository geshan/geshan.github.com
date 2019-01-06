---
layout: post
title: "You can do it in SQL, stop writing extra code for that"
date: 2018-12-14 19:30:54 +1100
comments: true
categories: 
- Technology
- Misc
- SQL
- Software Engineering
- database
description: Use SQL to do math like sum, average etc. Utilize it for grouping one to many relational values like getting categories of product. Leverage SQL for string manipulation like using CONCAT_WS for...
keywords: SQL, Beginner
cover: /images/do-it-in-sql/tea-lights.jpg
---

“SQL, Lisp, and Haskell are the only programming languages that I’ve seen where one spends more time thinking than typing." - Philip Greenspun

Even with thinking more than typing SQL (Structured Query Language) we software engineers use it as a way to pull data only. 

> We usually don't leverage SQL's power of data manipulation and do the needed changes in code. 

This is quite prevalent in software engineers who work in web applications. This post aims to enlighten you about the powers of SQL you might know but generally don't use.

{% img center /images/do-it-in-sql/tea-lights.jpg 'You can do it in SQL, stop writing extra code for that' 'You can do it in SQL, stop writing extra code for that' %}
<!-- more -->

## TLDR;

> Use SQL to do math like sum, average etc. Utilize it for grouping one to many relational values like getting categories of product. Leverage SQL for string manipulation like using CONCAT_WS for concating first name and last name. Exploit SQL to sort by a custom priority formula. Examples below...

## The Example

It will be easier to explain the superpowers of SQL putting it in action on an example. Below is a basic schema with 2 tables in MYSQL for a refunds microservice:

{% img center /images/do-it-in-sql/refund-schema.png 'You can do it in SQL- refund schema' 'You can do it in SQL - refund schema example' %}

There are 2 refunds and 7 related payments as example [data](http://sqlfiddle.com/#!9/b242d/5 "Try the example in sql fiddle").

### Some assumptions

For the refunds microservice example schema and applications following assumptions are made:

1. Refunds microservice and data structure store the fk_item (the id of the ordered/delivered item), but it is not a hard foreign key.
1. Item can be refunded in either cash or credit for the amount paid for the same. 
1. Items can be refunded many times as long as remaining balance can cover requested refund amount for each cash and credit. For example, item was paid 50 in cash and 50 in credit. 2 refunds of 20 cash and 20 credit can be done. So after these transactions balance will be 10 cash and 10 credit for that item (50-20-20).
1. Each refund can have multiple items payment. Each payment can be of type either cash or credit.
1. All amounts are stored in cents so they are integers.

Now let's use some SQL powers. You can find the example with related queries running on [SQL Fiddle](http://sqlfiddle.com/#!9/b242d/5).

### Do the math in SQL

As software engineers, let's say if we need to find the total cash and credit amount refunded for an item what would we do? We would run something like:

```
SELECT fk_item, fk_refund, amount, is_cash 
FROM payment WHERE fk_item=2001;
```  
With current data, it will give 3 rows like below:

{% img center /images/do-it-in-sql/01result-without-group.png 'Result without grouping and aggregate function sum' 'Result without grouping and aggregate function sum' %}


With these 3 rows, we would loop over them. If it is cash accumulate it to cashBalance variable, if not sum it up to creditBalace variable. Rather than that it would be a lot easier (probably faster) to do in SQL like:

```
SELECT fk_item, SUM(amount) AS total_paid, 
IF(is_cash = 1, 'cash', 'credit') as type
FROM payment 
WHERE fk_item = 2001 
GROUP BY fk_item, is_cash;
```  

Resulting in:

{% img center /images/do-it-in-sql/02result-with-grouping.png 'Result with grouping and aggregate function sum' 'Result with grouping and aggregate function sum' %}

The result is easy now if you need the total refund for the item just change the GROUP BY to be on fk_item and it's done. For 2 and 3 records it won't feel significant. If there were say 20 refunds for that item, the first solution with a loop is writing more code with no gain.  Like sum, other SQL functions can be used too. Simple math operations like [sum](https://www.w3schools.com/sql/func_mysql_sum.asp "Sum in mysql"), multiply, [average](https://www.w3schools.com/sql/func_mysql_avg.asp "Average function in mysql") etc can be easy with SQL. This means no more loops.

### Use GROUP_CONCAT to fetch related 1:m relation values

[Group concat](http://www.mysqltutorial.org/mysql-group_concat/) is a powerful operation in SQL databases. It is very useful when you need to get data from one to many relationship. For instance, you want to get all tags for a blog post or you want to get all categories of a product. Concerning this refunds example, one item can be refunded multiple times. So we will get all the refunds associated with the item id. To get this we will run only 1 query and get it without any loops in the code like below:

```
SELECT fk_item, 
GROUP_CONCAT(DISTINCT fk_refund) refund_ids FROM payment
WHERE fk_item = 2001;
```
This results in:

{% img center /images/do-it-in-sql/03result-group-concat.png 'Result with group_concat' 'Result with group_concat' %}

Now we know that item 2001 has been refunded twice for 2 refunds. It will be easy to explode the refund Ids with `,` and proceed with any related operation.

### String manipulation

Many [string manipulation](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html "Mysql string functions") tasks like substring, concatenation, change case, and string compare can be done in SQL. With this example, I am going to show the usage of `CONCAT_WS`. It is concat with a separator. It can also be used to select for instance first_name and last_name with space in between. 

> In case of having an optional middle name `COALESCE` can be used with `CONCAT_WS`. That is something for you to explore :).

In this example, I will select refund_nr with it's related reason:

```
SELECT CONCAT_WS("-", refund_nr, reason) AS refund_nr_with_reason
FROM refund;
```

Resulting in:

{% img center /images/do-it-in-sql/04result-concat-ws.png 'Result with concat_ws' 'Result with concat_ws' %}

If this needs to be shown on the credit note document, for example, no extra code is needed to join the values again. SQL makes it one step easier again.

### Sorting with a custom formula

All software engineers know you can sort based on a column. But if you are given a custom priority formula to sort, what would you do? Probably again resort back to code and loop to sort. So lets set the priority formula rules for above example:

1. Premium customer refunds get the highest priority (we hack it with a priority of 9999999999)
1. Other than premium customers cash refunds get a priority of amount * 25 for credit it is amount * 20.

As per above rules it is decided that premium customers and priority above 50000 (in cents) will be processed first. Then other refunds will be processes. Let's get the priority refunds as below:

```
SELECT r.refund_nr, r.reason, p.fk_item, p.amount, p.is_cash, 
IF(p.premium_customer = 1, 9999999999, p.amount * (IF(is_cash = 1, 25, 20))) AS priority FROM 
refund AS r INNER JOIN payment AS p ON r.id = p.fk_refund
HAVING priority > 50000
ORDER BY priority DESC
``` 

The results are below:

{% img center /images/do-it-in-sql/05result-priority-formula.png 'Result with sorting based on custom formula' 'Result with sorting based on custom formula' %}

With proper use of IF in SQL sorting by a custom priority formula is a lot easier than trying to do it with loops in code. Notice that even smaller amounts like 7.5 (750 cents) and 9.0 (900 cents) came to highest priority as these refund payment amounts were associated with premium customers.

> Use the superpowers of SQL to make your life easier as a software engineer. 

You can play with the example and run your own queries on [SQL fiddle](http://sqlfiddle.com/#!9/b242d/5 "The full example with queries in sql fiddle").

## Conclusion

There are other tricks of SQL that can help you as a software engineer. Like `UPDATE` with `INSERT` using `ON DUPLICATE KEY UPDATE`. Whenever you have an itch of doing some manipulation for data pulled in from database in code with loops, think again. The main takeaway from this story is:

> Exploit the power of SQL to write less code because "the best code is the code that was never written". If it is not written there is no need to maintain it.
