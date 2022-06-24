---
layout: post
title: 5 benefits of pair programming you should know about
date: 2020-06-14T20:35:47.000+00:00
comments: true
tags:
- Software Engineering
cover: "/images/pair-programming-benefits/01pair-programming-benefits.jpg"
pagetitle: 5 pair programming benefits you should know about
description: This post starts by defining pair programming and proceeds to it's benefits,
  then concludes with summary of a research.(1400+ words)
keywords: pair programming, pair program, pair programming benefits, benefits of pair
  programming, pair programming advantages, advantages of pair programming

---
There are proven benefits of pair programming you and your team can take advantage of. I have been pair programming here and there for some years now. I have pair programmed with engineers senior to me as well as software engineers junior to me. Every time while pair programming I have learned something new from the other person regardless of my colleague’s programming experience. I believe you and your team can also reap these rewards of pair programming, let’s get started.

<!-- more -->

<img class="center" loading="lazy" src="/images/pair-programming-benefits/01pair-programming-benefits.jpg" title="Pair programming in action" alt="Pair programming in action">

## What is pair programming?

Pair programming is believed to be an [agile software development](/blog/2020/09/agile-software-development/) technique where two people write code together on a single machine. It is automatically a very collaborative and learning experience. There is a lot of communication between the pair as they need to plan and discuss the code on the fly.

If you have not paired then you must try it once to know what it really feels like. Basically, imagine you are writing a single line of code and another software engineer is beside you thinking and guiding you through why and how for that line of code. It is a great activity for a pair of software engineers.

## Styles of pair programming

There are multiple styles of pair programming, I think the most popular one is “Driver and Navigator”. I have done this style of pair programming with my seniors as well as software engineers less experienced than me. Below is a quick rundown of the styles.

1. **Driver and Navigator**: The driver is on the keyboard, writes the code focused on the tiny goal at hand while the navigator reviews code on-the-go and keeps an eye on the bigger picture. The driver and Navigator switch roles in a defined amount of time like every 30 minutes.
2. **Ping Pong**: Software Engineer A writes a falling test, Software Engineer B write the implementation to make it pass. And the cycle goes on, it is great for Test Driven Development (TDD).

You can read about more styles of programming in this amazing blog post on Martin Fowler’s [website](https://martinfowler.com/articles/on-pair-programming.html) and [Stackify](https://stackify.com/pair-programming-styles/).

## The benefits

Software engineering is a team sport. Same as while playing sports, even in software engineering if one member of the team is injured or not performing well the whole team comes together to help that member. In this particular case, we are more interested in the pair working together well to come to a better solution than one person doing it. With that in mind, let’s jump into the benefits of doing pair programming that your team should know about.

### Improves productivity and knowledge

When two people pair program on a certain task as they say two heads are better than one, I think it is a more productive episode of work. If the driver encounters a road bump the navigator and help solve the issue. On top of that, it can really help to share knowledge about parts of the system the other software engineer is not much aware of. For example, in January this year, I pair programmed with a colleague of mine on a microservice I had never worked on.

> If I had to do the task alone it would take me days but as he was much more experienced than me on that service we could get the task done in 1 day.

So it was better items of productivity as well as me getting acquainted with that new system. With all those benefits included, there is another added advantage of collective code ownership as we did it together.

### Already reviewed once

As pair programming involves 2 engineers writing code for the same task at the same time on a single computer the code is reviewed on the go. As the driver is writing code, the navigator is reviewing it almost realtime and also thinking about any design, architecture related issues, and possible bugs. It is much better than an asynchronous code review because both software engineers are already familiar with the task and problem in context as well as know if the code working or not at the same time.

> I remember my pair programming session with our lead developer some years back, where I was writing code and he was giving very meaningful feedback while I was writing code.

This made the review process later a lot easier and with very little friction than usual.

### Unblock tasks

Sometimes you can’t do your task because it is blocked by another task being done by one of the software engineers in your team. Rather than waiting for the software engineer to finish that blocking task help them with pair programming together. In the end, its the team’s achievement or goals that matter more than individual ones.

> So create that synergy and help your teammate get the task done faster pair programming that in turn unblocks you too.

Once, I was pair programming with a junior software engineer for the above reason, it was a great experience and I learned a couple of things from him too.

### Learning on the fly

This is probably a very undermined benefit of pair programming. While pair programming you observe the other software engineer and learn lots of things on the fly. While you are on the go you pick up how the other engineer uses keyboard shortcuts or tools that you were not aware of. This is really helpful when you pair program with someone senior to you, you get to know their routine and how they use the same tools more productively.

> Again going back to my pair programming experience from Jan 2020, I learned that “Ctrl+e”  on CLI send you to the end of the line and my friend learned about -A and -B params in [grep](http://linuxcommand.org/lc3_man_pages/grep1.html) to show lines after and before matching text.

Some years back I learned about multiple selections in the IDE in one of the pair programming sessions I had. So just pair program to learn more on the go.

### Great onboarding for new members

Pair programming can be one of the tools to make your company’s and team’s onboarding process for software engineers even better. If new team members can have a good session of pair programming with one of the experienced team members they will get the know the ins and outs of the system much faster and hands-on.

> New team members will get acquainted with the service, tooling, and the way of working in a more practical way than just reading or hearing about it.

I remember doing a pair programming session with one of the new software engineers a couple of years back and he was amazed by the way we wrote tests and how rigorous our code review process was.

## The cons

Of course, pair programming is not all rosy, there are downsides to it. Some of the challenges associated with pair programming are the exhaustion related to it. Paring forces you to be focused for longer periods of time, find common ground and share a good wavelength with the other software engineer. This is intense and gets you tired quickly.

> I recollect my first pair programming experience, it was very tiring after that 2-hour session. So doing pair programming for long hours is not really productive in my opinion.

Sometimes being in very different skill levels can be another disadvantage as it would be quite difficult for a senior engineer with a decade of experience and a junior engineer to pair if the senior engineer is not open to it. Getting along is a very important part of pair programming, you should not just pair program randomly with any team member.

## Conclusion

A [study](https://collaboration.csc.ncsu.edu/laurie/Papers/XPSardinia.PDF) done at the University of Utah about costs and benefits of pair programming summarizes that while pair programming many mistakes are caught as they are typed than a later stage. It also highlights that designs are better and code length is shorter among other findings. A good explanation of that study can be found in this post by [Milandhar](https://dev.to/milandhar/the-benefits-of-pair-programming-470h) on dev.to.

> All in all, from my experience as well as in the above study the benefits of pair programming surely outweigh the cost. It should be one of the tools you can use when needed to make yourself a better software engineer.