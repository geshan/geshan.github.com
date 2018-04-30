---
layout: post
title: "How to do a zero downtime database (DB) migration (schema change) with a practical example"
date: 2018-04-30 22:00:41 +0400
comments: true
categories: Technology
---

Database migration on production database is never easy. Depending on the volume of requests some teams schedule database migration to off hours. You can run your alter statements with zero or minimal downtime following the steps mentioned below with a practical example.

IMAGE

<!-- more -->

## Example

As an example for this post, let's assume you work for an E-commerce company which has both recurring and new customers. You have partners who publicize a discount code valid for a given date range and get a percent of the order's total tracked by their discount code. Below is the schema for the partner and coupon code.

Partner: id, name, email, website
Partner_discount_code : id, fk_partner, platform, code, commission_percent

SCHEMA DIAGRAM

Now the new requirement is to track different commission percent for new and recurring customer. New and recurring customers are evaluated by a different system/microservice and is also responsible for commission calculation based on order total which is out of scope of this focuedd example. To do commission tracking by customer type we would decide to add 2 new columns commission_percent_new_customer, commission_percent_recurring_customer, the difficult question is how to roll it out without downtime.

NEW_SCHEMA_Diagaram

## Evaluating Downtime

In the above example there can be 2 types of downtime as follows:

1. Tables locked while migration runs
2. Downtime because of newly introduced columns and code not matching to it

For the first downtime issue depending on the database it can be mitigated to a significant level with executing proper alter SQL statements. For example in MYSQL if ",algorithm=inplace, lock=none" is suffixed with your alter it will run with 0 to minimum table lock allowing reads and writes while the migration runs. This is specially important when altering tables with millions of rows as the alter can take minutes depending on the structure and data volume of the table.

For the second issue, if db alter and code release is deployed in a specific sequence it can be handled much better.  The deploment steps are listed below:

## Deployment Steps

1. Add the two new columns to the partner_discount_code, let's say code is in v 1.1 now
2. Deploy code v 1.2 which adds and edits all 3 columns - commission_percent, cpr, cpn
3. Test that all the things work as expected, even if you need to roll back nothing breaks and it's fully backwards compatible
4. When everything is fine, deploy code v 1.3 that adds or edits only on the 2 new columns
5. Test it for a day or two, then as per need you can drop the commission_percent column on the partner_discount_code table as it's not used anymore

FINAL SCHEMA

## Things to consider

* Always be careful with database migration. It's is surely safe to take a backup of the table you will run the alter statement on before executive it.
* Don't deploy the code first that write to new columns then run the migration, it will result in errors.
* Always think of backwards compatibility usually without a revert migration. Generally, access to production database is only given to a select few.

## Conclusion

Database migration is not difficult if it is done the right way. Hope this post helps you run your DB migrations in a smoother fashion.
