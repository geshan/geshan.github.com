---
layout: post
title: "How to rename a column in Postgres, from a simple to a real-life example"
date: 2024-05-26T22:42:37.000+11:00
comments: true
tags:
- Software Engineering
- Postgres
cover: "/images/postgres-rename-column/01postgres-rename-column.jpg"
pagetitle: "How to rename a column in Postgres, from a simple to a real-life example"
description: "Learn how to rename a column in Postgres from a simple alter table rename column to a zero downtime real-life example."
keywords: postgres rename column, postgres rename column example, postgres rename column zero downtime, postgres column rename
---
Renaming a column in Postgres might seem straightforward, but as your database grows and your application scales, it's crucial to consider the impact of these changes. A simple rename can cause downtime or even break your application if not executed correctly. This post delves into the intricacies of renaming a Postgres column, providing a clear path from a basic example to a real-world scenario with zero downtime.

<!-- more -->

<img class="center" src="/images/postgres-rename-column/01postgres-rename-column.jpg" title="How to rename a column in Postgres, from a simple to a real-life example" alt="How to rename a column in Postgres, from a simple to a real-life example">

## Table of contents

* [Schema changes are rare but needed](#schema-changes-are-rare-but-needed)
* [Example of customer table simple example](#example-of-customer-table-simple-example)
* [Rename phone to contact_phone](#rename-phone-to-contact-phone)
* [Steps to do a zero downtime column rename](#steps-to-do-a-zero-downtime-column-rename)
  * [Add the new column](#add-the-new-column)
  * [Backfill the data](#backfill-the-data)
  * [Update application code](#update-application-code)
  * [Drop the old column](#drop-the-old-column)
* [Important Considerations for Zero Downtime Rename](#important-considerations-for-zero-downtime-rename)
* [Conclusion](#conclusion)

## Schema changes are rare but needed

In the world of relational databases, schema changes are rare but inevitable. As your application evolves, so do your data requirements. Generally when starting a new application schema changes are frequent, once the application requirements are settled the database schema changes become infrequent. Renaming a column in Postgres is a common operation, often driven by the need for better clarity, consistency, and to reflect changes in the underlying business logic.

While Postgres provides the `ALTER TABLE RENAME COLUMN` command to facilitate this, the execution needs careful planning, especially in a production environment where downtime is a significant concern. This post provides a practical approach, walking you through the steps to rename a column safely and efficiently.

## Example of customer table simple example

Let's begin with a simplified scenario. Imagine you have a `customer` table with the following structure:

```sql
CREATE TABLE customer (
id SERIAL PRIMARY KEY,
first_name VARCHAR(255) NOT NULL,
last_name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
phone VARCHAR(20)
);
```

Now the task is to rename phone to `contact_phone` on the above customer table. You will learn how to do it next with a simple example. The example assumes that there are almost no users on the web application so any changes done will not impact anyone.

## Rename phone to contact_phone

Now, imagine you want to rename the `phone` column to `contact_phone`. In this basic example, you could execute the following SQL command:

```sql
ALTER TABLE customer RENAME COLUMN phone TO contact_phone;
```

This command will rename the `phone` column to `conctact_phone`. But, if this is a large table with millions of rows, it would lock the table for the duration of the rename operation, potentially causing downtime for your application.

As indicated earlier, this is a scenario where there are 10s of rows in the `customer` table. Less than 10 people use the application at this stage. Essentially the application is tested only internally and downtime is expected and normal. 

In the next section, you will learn how to take steps that would cause zero to minimal downtime if the database table had thousands or even millions of rows. On top of that, if the application was used by thousands of people each day.

## Steps to do a zero downtime column rename

In a real-world scenario, a zero-downtime column rename involves multiple steps, ensuring minimal impact on your running application. Imagine you have a customer table with millions of rows and thousands of users using your application each day. Let's delve into these steps:

### Add the new column

Start by adding the new column with the desired name. For our `customer` table example, we will add a column called `contact_phone` column.

```sql
ALTER TABLE customer ADD COLUMN contact_phone VARCHAR(20);
```

After that, the application will write to both columns for some time. Make sure the newly added column is nullable to avoid any errors when inserting newer records.

### Backfill the data

Next, you need to populate the newly added column with data from the old column. You can do this using an `UPDATE` statement:

```sql
UPDATE customer SET contact_phone = phone;
```

This operation will take seconds to minutes depending on how many rows the customer table has. You will need to account for that. Another easier way to do it with a limit enforced with [CTEs](https://www.crunchydata.com/blog/simulating-update-or-delete-with-limit-in-postgres-ctes-to-the-rescue#update-statements). As discussed in the [delete postgres with limit](/blog/2023/09/postgres-delete-limit/) post, it follows a similar approach where you can craft a SQL with a useful where clause to update say 10000 rows at a time and repeat the process multiple times. 

By updating 10000 rows in one batch you will not block the table by doing a big update of millions of rows in one go. Reading more about [locking in Postgres](https://www.citusdata.com/blog/2018/02/15/when-postgresql-blocks/) will help you understand why big updates can be problematic. This batch update is best done from the application level.

Next, you will need to update the writes from the application code.

### Update application code

Modify your application code to use the new column name (`contact_phone`) instead of the old one (`phone`). This step might involve updating queries, data access layers, and any other components interacting with the database.

In the case of writes it will be best to write to both columns for a while to be safe and after a while only write to the new column `contact_phone`. In case of reads, the code can check if the `contact_phone` is available using that column else fallback to `phone`.

After that, you can change the code to not read or write from the old `phone` column. Depending on the number of rows this could take hours to days. Then you can change the code to read and write only on the new column `contact_phone`.

Once you are satisfied that the old column `phone` is not used in any reads or writes, you can drop the old column. For deleting data or dropping columns is always good to take a full database backup just in case if something happens the data is not lost.

### Drop the old column

Once you are confident that the application is fully utilizing the new column and the old column is no longer needed, you can drop it:

```sql
ALTER TABLE customer DROP COLUMN phone;
```

This step should only be done when you are fully confident that the old column `phone` is not used in any read or write operation. Make sure your reporting database and related application or dashboard are updated with this change else your reports will break.

The whole process can be depicted in a single picture with steps as below:

<img class="center" loading="lazy" src="/images/postgres-rename-column/02postgres-rename-column-zdd.jpg" title="States of applicaiton code and databaes table to achive zero (minimal) downtime" alt="States of applicaiton code and databaes table to achive zero (minimal) downtime">

In the next section, you will learn about some considerations for the zero downtime column rename.

## Important Considerations for Zero Downtime Rename

Below are some important considerations to make for zero downtime column renames:

1. Large Tables: For tables with millions of rows, backfilling data can be time-consuming. Consider using batched updates from the application level to minimize downtime.
1. Indexes and Constraints: Remember to recreate any indexes or constraints associated with the old column on the new column. This will help with the performance of the application, be mindful about the indexes and constraints.
1. Application Testing:  Thoroughly test your application after each step to ensure everything functions correctly with the new column name. Make sure the data is written correctly on the new column and read from it properly.
1. Transaction Control: Wrap all operations within a transaction to maintain data consistency in case of errors. Make sure that if there is a change everything is updated or nothing is updated.

Next, you will get a quick recap of this whole post.

## Conclusion

Renaming a column in Postgres can be done easily with the `ALTER TABLE RENAME COLUMN` command in simple scenarios. However, for a production database with high traffic, a zero-downtime approach is essential. By following the steps outlined above, you can execute a column rename with minimal disruption to your application. Always remember to test thoroughly, and consider using tools like feature flags to gradually introduce changes and minimize risk.
