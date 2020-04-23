---
layout: post
title: "The most important tip for beginner software engineers is..."
date: 2018-12-21 19:47:44 +11:00
comments: true
tags: 
- Technology
- Software Engineering
cover: /images/tip-beginner-sw-eng/puzzle.jpg
description: First, solve the problem. Then, write the code. - John Johnson
keywords: beginner software engineer, software engineer, software engineer tip
---
Most of the tutorials you have read or watched till now usually do one thing, spoon-feeding. This is "OK" to learn a new thing but not good when you need to `solve` a task. A task usually involves reaching a goal by overcoming a problem. This post unveils the most important "tip" for all beginner software engineers.

<img class="center" src="/images/generic/loading.gif" title="The most important tip for beginner software engineers is" alt="The most important tip for beginner software engineers is" data-echo="/images/tip-beginner-sw-eng/puzzle.jpg">

<!-- more -->

## TL;DR

> First, solve the problem. Then, write the code. - John Johnson

In other words.

> Work the solution out on paper in steps, then start writing the code for it. Don't get tangled in the code and software design.

## So what happens

Many times I have heard this from beginner or even junior software engineers. I could follow the tutorial well and thought I understood the concept. But, when I tried to do a similar thing on my pet project I could not do it. It happens mainly because of 2 reasons. First, you somewhere lost your train of thought and could not establish a chain. Second, you were so tangled in the code that the main problem you were trying to solve became out of focus.

This problem also happens for Software Engineers and even Senior Software Engineers. The good thing is with experience you know when to stop or take a break. Then, come back to the problem with a different prescriptive and find a solution faster. 

> Many of you can relate to this that you were trying so hard to fix an issue for hours. You took a break or slept over it and next session the solution was there in minutes. 

This is not magic this is looking at the problem from another viewpoint.   

## Let's illustrate with an example

You have to do a task, it is to create a refund with payments. A refund always has a reason like damaged, late delivery etc and the payments for that item can be maximum of 2. One of type cash another of type credit (store credit). You are also given the database schema. This is a back-end task and you need to create a POST `/refunds` API that can create the refund and its related payments. The database structure is as below:

<img class="center" src="/images/generic/loading.gif" title="refund schema v2" alt="refund schema v2" data-echo="/images/tip-beginner-sw-eng/refund-schema-v2.png">

You could discuss the API payload too with one of the team members and agreed on the below JSON payload:

```
POST /refunds

{
 reason: "damaged",
 premium_customer: true,
 payments: [
  {
     item_id: 20,
     amount: 5000,
     is_cash: true
  },
  {
     item_id: 20,
     amount: 7250,
     is_cash: false
  }
 ]
}

//decide on the response format
```

### The usual scenario 

What most beginner software engineers will do is start scanning the code base, if there is one. They will immediately start writing some code. If there is any testing culture in place maybe write some automated test code. 

> This is where most beginner and even some experienced software engineers slip. Don't write code when you have not solved the problem.

### The appropriate step

The most appropriate step, in my opinion, is to sit down and solve the problem on paper in steps. So you ask yourself to write `Refund` and its related `Payments` on the database what do I need to do. You come up with a plan in steps and tweak it.

> If you have someone senior you can validate your steps and get feedback. 

This will also decrease the code review time a lot as both of you have already agreed on the modality of the solution.

### So how to do it

The task as mentioned earlier is to write a create/POST API where Refunds with payments can be created. Each refund can have max 2 payment one of type cash and another one of type credit. It can also be one refund with only one payment of either cash or credit. This is how I would have written the following steps on paper:

1. Create a method to get the data from the controller sent by user
1. Validate all the input for values, refund types, and reasons.
1. If all validation passes, generate a random alphanumeric number of length 10 which is not existing in the refund table (recursive check)
1. If validation fails to respond with a proper validation failure message, decide on response structure
1. Start a database transaction
    1. Insert the refund related values of refund_nr, reason_reason, is_premium_customer to the `refund` table
    1. On insert success, get the id of the last insert
    1. With the refund_id, insert payment related values of fk_refund, fk_item, amount, is_cash to the `payment` table
1. If all went well commit the database transaction
1. If there was any issue rollback database transaction
1. Respond with success or failure message depending on the databse transaction’s success with proper structure
1. Wire up the controller and this method

### Follow the plan in steps, now write code

After you have a step by step plan you can start writing code. Then,  you can go more in-depth on the method names, how to get the database connection and other details. 

> Depending on the language and framework you can also decide where should the validation code stay. 

You could even write tests given the company and culture supports and encourages it.  

When your solution is evident in your mind and you have a step by step action plan on paper now you can write code.

> You can even break up the parts in ways that will be easier to finish and wire up. 

For example, the testing logic can be something that can be written separately and tested on its own. It is thinking about independent parts that can be wired up together to form the solution.

## Conclusion

When you face your next task don't start writing code from the get-go. First, get a hold of the problem then devise a solution with steps best done away from a screen on paper. Then refine your solution and discuss with someone. When you are satisfied, translate that solution to code. This is a bit methodical but very effective.

> Code is always a medium to the solution, not the solution itself.
