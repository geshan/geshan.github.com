---
layout: post
title: "Do you git your code? Follow this simplified gitflow branching model to improve productivity"
date: 2014-12-13 07:52:40 +0400
comments: true
categories:
 - Git
 - Technology
 - Misc
---

Git or a similar VCS is the backbone for code collaboration in a multi-developers environment. When you follow
a proper branch naming convention, git branching and merging can also be tied to an issue flow for better
project management.

Source code Version Control System (VCS) and automated testing open doors to other great software quality and
delivery practices like continuous integration and automated deployment etc. Amongst various version control
system software [git](http://git-scm.com) is a distributed system that is very popular and easy to use once
you get used to it.

{% img center /images/simplified-gitflow/simple-git-flow.jpg 'Simplified git-flow' 'Simplified git-flow' %}

<!-- more -->
The full [gitflow](hhttp://nvie.com/posts/a-successful-git-branching-model/) has 3 perpetual branches develop,
release and master. Tickets/Issues can be grouped to release from develop. This in turn creates difficulty when
tracing the ticket that caused any problem when it occurs.

Simplified gitflow has only one perpetual branch master which decreases the complexity, only one ticket can be
deployed and tested in any given environment like staging or production. When only one ticket is deployed on a
given environment, it is very easy to trace a problem if it occurs. As the full gitflow, master is the stable
branch which can be deployed to production anytime.

If a new feature or bug fix needs to be done, the developer will follow the given steps:

1. Create a branch from latest **master** branch following a naming convention like feat-123 for feature no. 123
1. Work on it, after completing it push the branch feat-123 to the remote git repository (could be github or any other), preferably with just one commit
1. Open a pull request (or merge request) from the pushed branch feat-123 to **master**
1. After the pull request is accepted, deploy it on staging environment and test it.
1. Test it, if everything is ok, create a tag from feat-123 like 12-12-14 (today's date) and deploy it to production
1. Test it on production, if everything is fine on production after testing merge the tag to master.

The above steps are repeated for each ticket, feature of bug fix. Generally its good to wait an hour or two to merge
the tag to master to make sure at that all the things are running fine. Smaller deployments also help to increase
the overall stability of the whole systems. I am following simplified git-flow for
[blogging](https://github.com/geshan/geshan.github.com/network) as well, for this blog source branch acts as master.

For a detailed example with explanation and git commands read the following slides:

<center><iframe src="//www.slideshare.net/slideshow/embed_code/42503092" width="510" height="420" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe></center>

You can also view the [interactive slides](http://gitflow-talk.herokuapp.com/).
> I believe you have learned something new and will be willing to integrate the simplified gitflow in
> your daily work with your team decreasing complexity and increasing productivity.


