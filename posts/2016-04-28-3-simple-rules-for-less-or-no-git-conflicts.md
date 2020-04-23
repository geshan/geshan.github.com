---
layout: post
title: "3 simple rules for less or no git conflicts"
date: 2016-04-28 10:14:43 +04:00
comments: true
tags:
- Misc
- git
- Software Engineering
cover: /images/3-rules-git-conflict/git-conflict.png
lastModified: 2020-04-23 10:03:22 +11:00
---

Do you write at least 10 lines of code a day in any programming language? Do you work alone or in a team? If your answer is yes to both questions, you need to learn `git` even if you work alone in a project. [Git](https://git-scm.com/) is the most popular versions control system and it has become a must have software engineer skill.

I have seen teams fall into this trap of git conflicts when they start using git and some type of [gitflow](https://geshan.com.np/blog/2014/12/do-you-git-your-code-follow-this-simplified-gitflow-model/). Merging branches to the main branch becomes a pain when there are git conflicts. In this post I am going to reveal 3 simple rules to avoid git conflicts.

<img class="center" src="/images/generic/loading.gif" data-echo="/images/3-rules-git-conflict/git-conflict.png" title="3 simple rules for less or no git conflicts" alt="3 simple rules for less or no git conflicts">
<!-- more -->

## Assumption

You have some working knowledge of git. You follow a git branching model like gitflow or [simplified gitflow](https://geshan.com.np/blog/2015/09/how-to-use-simplified-gitflow-branching-model-video/).

## Rule 1: Keep your changes small

This is the golden rule to avoid git conflicts in teams. Conflicts occurs when 2 team members make changes around the same line of code. Like John changes like 5-10 in readme.md. Jack changes like 7-15 in the same readme.md file on a different branch. Have a rule of thumb that each pull request can have at most 20 files changed with 200 line addition. If changes are less there is less chances of having things overlapped. As a side effect, it will make deploying and testing changes easy too.

## Rule 2: Rebase with your main branch (generally master) when it changes

When your main branch changes, rebase the branch you are working on with it. Usually `master` is the main branch so it will be best if you rebase with master at least once a day. This saves you from bringing in lots of changes done by other team member late. Its the same concept as above, get small changes step by step many times than getting it all at once. At the end of the day always do the following, given you are on your working branch

```
git checkout master
git fetch
git pull --rebase origin master
git checkout -
git rebase master
```

You get the latest master. Then you go back to your previous branch and rebase your branch with latest master.

## Rule 3: Review pull requests faster and merge them to main branch

As I have stated earlier "An open pull request (PR) is a liability in at least 2 ways. 1 it’s a feature/fix not shipped to customers. 2 it will invite code conflicts soon." Have a rule, pull requests need action by 3 days of
opening them. You can review code, if code is ok deploy and merge or review code, fix issues then deploy and merge. This will help the team ship things faster as well as not have pull requests open unattended for weeks.

### Useful Tip

You followed the above rules, still landed in a git conflict situation? Use `git cherry-pick`. If you have more than one commit in your working branch first [squash](https://geshan.com.np/blog/2014/07/4-git-tips-beyond-basics/) it to one commit. Then create a new branch out of master/your main branch and do `git cherry-pick <sha-of-your-squashed-commit>`. Given you have only 1 commit on your working branch `feature11` and you are on `feature11` right now, do the following:

```
git checkout master; git fetch && git pull --rebase origin master
git checkout -b feature-11-new
git cherry-pick 249bd9b150fdb1e6fc9e58af9823f70cc52579a3
```

In the above example `249bd9b150fdb1e6fc9e58af9823f70cc52579a3` is used for demo only. You can know your SHA hash with `git log -1` being on branch `feature11`.

## Conclusion

There is no silver bullet to avoid git conflicts all the time. You will face it now and then. If you run into git conflicts everyday the process and system needs to change. Be logical, if you have a PR with 50 files changed and 700 new lines you will face conflicts. Keep changes small.

> I hope you face less git conflicts or even completely avoid them.
