---
layout: post
title: "How to do a zero downtime database (DB) migration (schema change) with a practical example"
date: 2018-04-30 22:00:41 +04:00
comments: true
tags:
- database
- deployment
- devops
- Software Engineering
cover: /images/db-migration/db-migration.png
description: Database migration on a production database is never simple. You can run your alter statements with zero or minimal downtime following the steps mentioned below with a practical example.
keywords: database, sql, database migration, database schema migration
---

Database migration on a production database is never simple. Depending on the volume of requests some teams schedule database migration to off hours. You can run your alter statements with zero or minimal downtime following the steps mentioned below with a practical example.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/db-migration/db-migration.png" title="How to do a zero downtime database" alt="How to do a zero downtime database">

<!-- more -->

## Example

As an example for this post, let's assume you work for an E-commerce company which has both recurring and new customers. You have partners who publicize a discount code valid for a given date range and get a percent of the order's total tracked by their discount code. Below is the schema for the partner and coupon code. Below is the initial schema before any change:

<img class="center" src="/images/generic/loading.gif" data-echo="/images/db-migration/schema-01.png" title="Initial DB schema" alt="Initial DB Schema">

Now the new requirement is to track different commission percent for the new and recurring customer. New and recurring customers are evaluated by a different system/microservice and it is also responsible for commission calculation based on order total which is out of the scope of this focused example. 

To do commission tracking by customer type we would decide to add 2 new columns commission_percent_new_customer, commission_percent_recurring_customer, the difficult question is how to roll it out without downtime.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/db-migration/schema-02.png" title="Updated schema with 2 new columns" alt="Updated schema with 2 new columns">

### Migration script (DB schema alter statement)

The following migration script will update the DB schema to be in the above state for MYSQL DB:

```
ALTER TABLE `partner_discount_code` ADD `commission_percent_new_customer` DECIMAL NULL AFTER `commission_percent`,
ADD `commission_percent_recurring_customer` DECIMAL NULL AFTER `commission_percent_new_customer`, 
,algorithm=inplace,lock=none;
```

Notice the `algorithm=inplace,lock=none` it is discussed below.

## Evaluating Downtime

In the above example there can be 2 types of downtime as follows:

1. Tables locked while migration runs
2. Downtime because of newly introduced columns and code not matching to it

For the first downtime issue depending on the database, it can be mitigated to a significant level with executing proper alter SQL statements. For example in MYSQL if `,algorithm=inplace, lock=none` is suffixed with your alter it will run with 0 to minimum table lock allowing reads and writes while the migration runs. This is especially important when altering tables with millions of rows as the alter can take minutes depending on the structure and data volume of the tables involved.

For the second issue, if db alter and code release is deployed in a specific sequence it can be handled much better. The deployment steps are listed below:

## Deployment Steps

1. Add the two new columns to the partner_discount_code, let's say the code is in v 1.1 now
2. Deploy code v 1.2 which adds and edits all 3 columns - commission_percent, commission_percent_new_customer and commission_percent_recurring_customer.
3. Test that all the things work as expected, even if you need to roll back nothing breaks and it's fully backward compatible
4. When everything is fine, deploy code v 1.3 that adds or edits only on the 2 new columns
5. Test it for a day or two, then as per need you can drop the commission_percent column on the partner_discount_code table as it's not used anymore

### Final schema after dropping commission_percent column

<img class="center" src="/images/generic/loading.gif" data-echo="/images/db-migration/schema-03.png" title="Updated schema with 1 column less" alt="Updated schema with 1 column less">

## Things to consider

* Always be careful with database migration. It's is surely safe to take a backup of the table you will run the alter statement on before executive it.
* Don't deploy the code first that write to new columns then run the migration, it will result in errors as the code will try to access non-existing column(s).
* Always think of backward compatibility usually without a revert migration. Generally, access to production database is only given to a select few.
* Run drop or rename columns only after you are fully satisfied that the new changes are not breaking anything.
* It is better to run migrations (alter SQL) manually than part of the deployment to keep things segregated and more predictable.

## Conclusion

Database migration is not difficult if it is done the right way. Hope this post helps you run your DB migrations in a smoother fashion.
