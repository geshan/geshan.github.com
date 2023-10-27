---
layout: post
title: How to use the string_agg function in Postgres with examples
date: 2023-10-27T22:52:57.000+11:00
comments: true
tags:
- Software Engineering
- Postgres
cover: "/images/postgres-string_agg/01postgres-string_agg.jpg"
pagetitle: How to use the string_agg function in Postgres with examples
description: "Learn how to use Postgres string_agg function with examples of top 100 billioinaires in the world, pretty fun!"
keywords: postgres string_agg, string_agg postgres, mysql group_concat postgres
---
Are you a software engineer who works with PostgreSQL? Do you often find yourself needing to manipulate and aggregate strings in your database? If so, you're in luck because PostgreSQL provides a powerful function called string_agg. In this blog post, you dive into what string_agg is, how it's related to MySQL's group_concat, and walk through a couple of examples using real data. By the end, you'll have a solid understanding of how to make the most string_agg in your PostgreSQL queries. Let’s get going!

<!-- more -->

<img class="center" src="/images/postgres-string_agg/01postgres-string_agg.jpg" title="How to use the string_agg function in Postgres with examples" alt="How to use the string_agg function in Postgres with examples">

## Table of contents

* [Postgres string_agg](#postgres-string-agg)
* [Related to MySQL group_concat](#related-to-mysql-group-concat)
* [Example of billionaires data](#example-of-billionaires-data)
* [List the billionaires by country and birth year with count per country](#list-the-billionaires-by-country-and-birth-year-with-count-per-country)
* [List the billionaires by category and count per category](#list-the-billionaires-by-category-and-count-per-category)
* [Conclusion](#conclusion)

## Postgres string_agg

Postgres string_agg is an [aggregate function](https://www.postgresql.org/docs/9.0/functions-aggregate.html) that allows you to concatenate values from multiple rows into a single string. It is particularly useful when dealing with string aggregation or concatenation in a SQL query. This function can be applied to columns of text, varchar, or other string types. The basic syntax of string_agg is as follows:

```sql
string_agg(expression, delimiter)
```
The two parts are expression and delimeter:

* expression: The expression or column you want to concatenate.
* delimiter: The separator that will be inserted between the concatenated values.

For instance, you have customers in multiple countries, and for a campaign, you want to send emails to them. The need is to get all the customer emails grouped by country it can be done with a query that looks like the below:

```sql
SELECT country.name, string_agg(customer.email, ‘, ’)
FROM customer INNER JOIN country ON customer.country_id = country.id 
GROUP By country.name
```

## Related to MySQL group_concat

If you're familiar with MySQL, you might have used the [group_concat](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_group-concat) function. string_agg in Postgres serves a similar purpose as group_concat in MySQL. They both allow you to aggregate and concatenate values from multiple rows into a single string. However, there are some syntax and implementation differences between the two.

Below is an example of the usage of group_concat taken directly form the MySQL docs:
```sql
SELECT student_name,
         GROUP_CONCAT(DISTINCT test_score
                      ORDER BY test_score DESC SEPARATOR ' ')
FROM student
GROUP BY student_name;
```

Here the query will get the distinct test_score highest first grouped by student and separated by a space character.

Now that we have a clear understanding of what string_agg is and how it compares to group_concat, let's move on to some practical examples using real data of billionaires of the world.

## Example of billionaires data

Yes, you heard it right, the top 100 billionaires of the world. Thankfully, Kaggle has a [billionaires dataset](https://www.kaggle.com/datasets/nelgiriyewithana/billionaires-statistics-dataset) of 2023 that lists 2540 billionaires in the world with many fields. I downloaded the CSV and removed most of the fields not relevant to this example. I also took only the top 100 billionaires from that list to create a Postgres table as follows:

```sql
CREATE TABLE "billionaire" (
  "id" serial PRIMARY KEY,
  "rank" integer,
  "worth" integer,
  "name" varchar,
  "gender" varchar,
  "category" varchar,
  "country" varchar,
  "city" varchar,
  "source" varchar,
  "industries" varchar,
  "citizenship_country" varchar,
  "organization" varchar,
  "title" varchar,
  "birth_year" integer
);
```

I have deliberately kept the structure very simple and have not added any index or unique indexes to the table as it will have only 100 rows. The goal of this tutorial is to understand the Postgres string_agg function, not something else. The data of the 10 (or 100) billionaires can be inserted with the following insert statement:

```sql
INSERT INTO "billionaire" (
  rank, worth, name, gender, category, country, city, 
  source, industries, citizenship_country, organization, title, birth_year
) VALUES
(1,211000,'Bernard Arnault & family','M','Fashion & Retail','France','Paris','LVMH','Fashion & Retail','France','LVMH Moët Hennessy Louis Vuitton','Chairman and CEO',1949),
(2,180000,'Elon Musk','M','Automotive','United States','Austin','Tesla, SpaceX','Automotive','United States','Tesla','CEO',1971),
(3,114000,'Jeff Bezos','M','Technology','United States','Medina','Amazon','Technology','United States','Amazon','Chairman and Founder',1964),
(4,107000,'Larry Ellison','M','Technology','United States','Lanai','Oracle','Technology','United States','Oracle','CTO and Founder',1944),
(5,106000,'Warren Buffett','M','Finance & Investments','United States','Omaha','Berkshire Hathaway','Finance & Investments','United States','Berkshire Hathaway Inc. (Cl A)','CEO',1930),
(6,104000,'Bill Gates','M','Technology','United States','Medina','Microsoft','Technology','United States','Bill & Melinda Gates Foundation','Cochair',1955),
(7,94500,'Michael Bloomberg','M','Media & Entertainment','United States','New York','Bloomberg LP','Media & Entertainment','United States','Bloomberg','CEO',1942),
(8,93000,'Carlos Slim Helu & family','M','Telecom','Mexico','Mexico City','Telecom','Telecom','Mexico','América Móvil','Honorary Chairman',1940),
(9,83400,'Mukesh Ambani','M','Diversified','India','Mumbai','Diversified','Diversified','India','Reliance Industries','Founder and Chairman',1957),
(10,80700,'Steve Ballmer','M','Technology','United States','Hunts Point','Microsoft','Technology','United States','Los Angeles Clippers','Owner',1956);
```

The above is not the full list of top 100 billionares in 2023, it is just the 10. You can get the full list of top 100 in this [gist](https://gist.github.com/geshan/b2495283109e19a8e19af837a5c8eb50#file-02billionarire-data-sql).

You can run [Postgres with Docker](/blog/2021/12/docker-postgres/) and Docker Compose locally. Still, The easiest way for you to test this without needing to install Postgres locally will be to use ElephantSQL. Their [free plan](https://www.elephantsql.com/plans.html) will give you a database with a max of 20MB of data and 5 concurrent connections which is more than enough to try out this example. You can follow their official [getting started documentation](https://www.elephantsql.com/docs/index.html) to set up a database and insert the date using the above SQL statements.

Once you have the database set up with the 100 rows added. You can ask various questions as you will do in the next section.

## List the billionaires by country and birth year with count per country

You can get answers to questions like listing all the billionaires by country and year of birth youngest first with the count by country. It can be done easily by using the `string_agg` function in Postgres as below:

```sql
SELECT
    b.country,
    STRING_AGG (
	    b.name || ' - ' || b.birth_year, ', '
      ORDER BY b.birth_year DESC
    ) billionaire_birth_year,
    COUNT(b.name) as no_of_billionaires
FROM
    billionaire b
GROUP BY
    b.country
ORDER BY no_of_billionaires DESC;
```

The output will look like the below:

<img class="center" src="/images/postgres-string_agg/02postgres-string_agg-example.jpg" title="Top 100 Billionares with Birth year by country and count per country" alt="Top 100 Billionares with Birth year by country and count per country">

The output has been truncated with the top 10 rows but it will list all the 20 rows/countries if you run it on ElephantSQL Browser or any other CLI tool like [psql](https://www.postgresql.org/docs/current/app-psql.html) or a GUI like [DataGrip](https://www.jetbrains.com/datagrip/). You can already see the power of string_agg function in PostgreSQL. Let’s ask one more question in the next section and that will be all the examples.

## List the billionaires by category and count per category

The query this time is which category of work has the most billionaires and list the names alphabetically and number of billionaires by category. It can be achieved by:

```sql
SELECT
    b.category,
    STRING_AGG (
	    b.name, ', '
      ORDER BY b.name ASC
    ) billionaire_birth_year,
    COUNT(b.name) as no_of_billionaires
FROM
    billionaire b
GROUP BY
    b.category
ORDER BY no_of_billionaires DESC;
```

The output will look like the below:

<img class="center" src="/images/postgres-string_agg/03postgres-string_agg-billionaires.jpg" title="Top 100 Billionares by category and count per category" alt="Top 100 Billionares by category and count per category">

Surely in 2023, there are more billionaires making their money from the technology category than any other. For instance, in the top 100 billionaires of the world Real Estate has 2 whereas tech has 16, so work in tech :). You can play around with the data and ask more questions to get more insights with SQL and string_agg.

## Conclusion

PostgreSQL's string_agg function is a powerful tool for string aggregation in SQL queries. It allows you to concatenate values from multiple rows into a single string, making it ideal for tasks such as generating comma-separated lists or creating custom reports.

In this blog post, you found out what string_agg is and how it relates to MySQL's group_concat. You also learned its practical use with real data, including listing billionaires by country and category.

The next time you find yourself working on a PostgreSQL project that involves string aggregation, remember the string_agg function and how it can simplify your queries and data processing. Happy querying!