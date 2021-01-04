---
layout: post
title: How to split a new feature into independent parts before coding it
date: 2015-07-04T07:08:17.000+04:00
comments: true
tags:
- Programming
- Software Engineering
cover: "/images/split-feature/strong-base.jpg"

---
As software engineers, we always face a problem on how to break this task down to independent release ready parts before writing code. It is also a shared responsibility of the project manager to jot down optimally small and independent tasks/tickets still it is not what we get especially if the product is new and has not been released to production. In my experience having this language, and framework agnostic skill will help you become a senior and better software engineer.

Sometimes the task description is a one-liner that you can interpret to anything of your liking. So, this post will help you solve this issue, where, given a task how do you plan to split it into **independent release ready** parts. Regardless of the language and framework, software design, and architecture play an important role in the life of your software, a strong base is needed to build a software system that will last longer.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/split-feature/strong-base.jpg" title="A strong base for longer lasting software system" alt="A strong base for longer lasting software system">

<!-- more -->

## Some Assumptions

For this post following are the assumptions:

1. A project management system like JIRA/Redmine/Trello is used where tasks are defined as tickets/cards.
2. A Version Control System (VCS) is being used for the project you are working for.
3. There is a team structure in place, where if you are the software engineer there is a team lead above you.
4. Possibly your team follows Agile software development methodology

## How to split that feature

As an example, let's take Project X with project code PX as the project you are working on. And you are assigned the task PX-4 to develop/code the user system (users are ubiquitous to every software system) that has the following contents:

    Title: Develop a user system for the backend
    
    Description: 
    Users should be able to create, view, edit and delete other users in the system.

Now after you are ready to do this task what should your next step be? Jump on your desk start writing code? Surely not. You need to organize and discuss each of your tasks and have a mindset to split it into independent release ready tasks first in your mind and best document it on something. So how do you do it then?

<img class="center" src="/images/generic/loading.gif" data-echo="/images/split-feature/un-tangle.jpg" title="Untangle and organize your task" alt="Untangle and organize your task">

### Think CRUD

CRUD - Create Read Update Delete is in the given sequence because in my opinion when you start writing code for a new feature you should do each step one after the other in that sequence.

As an analogy, it's like if you are given a block of unsliced bread you don't start biting pieces off it, you first cut it into slices of the right thickness and then eat the slices one after the other. The same goes for when you write code for a feature. In relation to the user system for backend, think in terms that you will first finish the create user and show user parts then only approach the edit and delete segments.

The same technique can be ported to an API development scenario where you will do the POST first, then do the GET after which PUT and DELETE can follow. You can easily test it with curl and see that your POST is persisting data in the database table and your GET responds with the correct data in the desired format. The same can be followed for PUT and DELETE.

### Scope it and outline steps to solve it

This is important, you need to have a scope defined for the task and you need to write down how you are going to write code to complete the task. It is best to discuss your scope and steps to a solution with your team lead, communication is always important for software engineers. You can care less about non-functional requirements still it has been agreed upon with your lead developer. As an example I have added a [gist](http://bit.ly/1IAbO3t) in markdown that outlines the scope and steps to the solution of the PX-4 user system for the backed, it included below as well.

<script src="https://gist.github.com/geshan/3efdf863612f540691de.js"></script>

So the task is divided into 5 major parts and each part has 2-3 subparts, this gives you a clear sense of what needs to be done and you can estimate each subpart which adds up to the total estimation of the whole task. Though you might have the urge to develop the login and registration part, you need to stop yourself and focus on the scope to meet the estimation provided. Focus is necessary for the task to be completed well.

### Independent release ready parts

As outlined above, you should then subgroup the tasks to independent release ready parts. What do you consider release ready will depend on many factors like:

* Is the project already in production?
* How many people are using it?
* Is there a [feature switch](/blog/2016/09/how-to-do-a-minimum-viable-feature-switch/ "How to do a minimum viable feature switch, includes a simple code example") that can turn the feature on or off? (like with a cookie or email address)

Thereby, you will again need to discuss this with your lead on what can be considered release ready. Let's say for our example user system task PX-4 the discussion ended on the understanding that as the project is not released to the public so the independent tasks are:

1. Create user and view the user is functional with validation (Points 1,2 and 3 in the gist)
2. Update and delete can be done in the next increment (Points 3 and 4 in the gist)

For your own work as a software engineer, if you write tests then it is best to write tests for each main point in the task breakdown. If you do test-driven development then you will write tests first, if you do test supported development make it a habit to write tests for each task after completing it then piling up all the tests at the end, which will save you time.

### Push each day and communicate

With an assumption that git is being used for the project, it is highly recommended that you push each day's end. Communication is always key to success, so as per the need you may need to update your team lead on the progress. If your team follows scrum and has a daily stand-up meeting it will be easier to update on what you have done as the big task is organized in a way where it is easy to track progress.

## Conclusion

Only coding a feature does not close the task, you need to test it very well on staging, and if the project is deployed on production the testing needs to be done well on production too.

> It is a very good practice to commit early and commit ofter, in case you have continuous integration set up you will get feedback early on the whole test suite.

It is also advised to follow release early release often, this is possible if you are able to complete the independent release ready parts with less/no problems. Then you can release in increments as you wrote the feature in increments. Checking the code and as per need refactoring your code for the feature is also very important.

I hope after all this our example backend user system task PX-4 is deployed using [automated deployment](/blog/2015/08/the-best-automated-deployment-tool-the-one-that-fits-your-needs/) without problems on the desired environment, well tested and no further issues are reported for the task. It is time to close the task and continue practicing this new skill you learned to first split a given task into independent release ready subparts. Enjoy!