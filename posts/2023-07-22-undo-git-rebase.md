---
layout: post
title: How to undo a git rebase, a beginner's guide with an easy example
date: 2023-07-22T22:40:52.000+11:00
comments: true
tags:
- Software Engineering
- git
cover: "/images/undo-git-rebase/01undo-git-rebase.jpg"
pagetitle: How to undo a git rebase, a beginner's guide with an easy example
description: In this guide, you will learn how to undo a git rebase the simple way with an easy to follow example with screenshots.
keywords: undo git rebase, git rebase undo
---
Git is the most popular distributed version control system. It is very powerful and valuable too. Git Rebase is done when the main (master) branch has moved ahead and you need to apply the changes from the main branch to your branch while maintaining the history. In this post, you will learn how to undo a git-rebase. Let’s get started!

<!-- more -->

<img class="center" src="/images/undo-git-rebase/01undo-git-rebase.jpg" title="How to undo a git rebase the easy way" alt="How to undo a git rebase the easy way">

## Table of contents

* [What is Git Rebase?](#what-is-git-rebase%3F)
* [When You Would Need to Undo a Rebase](#when-you-would-need-to-undo-a-rebase)
* [How to Undo a Git Rebase](#how-to-undo-a-git-rebase)
* [Important Considerations](#important-considerations)
* [Conclusion](#conclusion)

## What is Git Rebase?

Git rebase is a way to rearrange your commits so that they appear in a linear history. This is useful when you want to integrate changes from multiple branches into a single branch, or when you want to fix a mistake in a commit. It is often used to integrate changes from one branch into another or to squash multiple commits into one.

When you rebase, Git takes the commits from your current branch and applies them on top of the tip of another branch. This means that the commits in your current branch will be rewritten to appear as if they were made on top of the other branch. Git rebase is a powerful tool that can help you keep your Git history clean and organized. It's a good idea to learn how to use it if you're working with git regularly.

Rebase can be a useful tool for keeping your Git history clean and organized. It can also be helpful for collaborating on projects with other people.

The most common use of rebase is to apply your commits (or changes) on top of a shared branch like master/main where other changes are coming in frequently. For instance, you started work on `your-feature-branch` 3 days back. You added 5 commits in the past 3 days but your teammates have merged 7 commits to the main/master branch. Now as it is time to open a pull/merge request you will apply 5 of your commits on top of the 7 merged commits. This is best done by rebasing `your-feature-branch` with the master branch before you open the pull/merge request.

Git rebase is also useful when you want to fix a mistake in a commit. Let's say you've made a `commit`, and then you realize that you made a mistake. You could delete the commit and make a new one, but this would lose your work.

A better way to fix a mistake is to use git rebase. With git rebase, you can edit the commit that you made a mistake in. This will create a new commit with the changes that you want to make. The old commit will still be there, but it will be marked as "rewritten."

Git rebase is a powerful tool that can help you to keep your Git history clean and organized. It's a good idea to learn how to use it if you're working with git regularly. But sometimes you will need to undo a rebase, you will know about some cases to undo a Git rebase in the next section.

## When You Would Need to Undo a Rebase

While git rebase can be a powerful tool, there are several scenarios where you might need to undo a rebase:

* Mistakenly Rebasing the Wrong Branch: If you accidentally rebase the wrong branch, it can lead to unintended changes and potential loss of work. Undoing the rebase becomes necessary to revert to the original state.

* Unforeseen Issues in the Rebased Commits: Sometimes, after completing a rebase, you might realize that the changes introduced are problematic or introduce bugs. In such cases, you would want to undo the rebase and revert to the previous state.

* Collaborative Workflows: When working collaboratively on a shared branch, if others have already based their work on the rebased branch, undoing the rebase can help avoid conflicts and maintain a consistent history.

## How to Undo a Git Rebase

Depending on the stage of your Git rebase you will have to run different commands to undo or stop a rebase.

If you started a git rebase with `git rebase <branch-name>` like `git rebase main` and you encountered a conflict and don’t want to solve the conflict, the easiest way to undo it at this point will be with:

```bash
git rebase abort
```

The above command will abort the git rebase and you will go back to the original branch.

In case you have successfully done a git rebase with the main branch running `git rebase main`, then you will need to run a different set of commands. To switch the state of the branch back to before the rebase you can run:

```bash
git reset --hard ORIG_HEAD
```

It is always advisable to make a backup of your branch before you do such commands with `git checkout -b <branch-name>-backup` to be safe if things do not go as expected. A more detailed way of doing it will be by using [git reflog](https://www.atlassian.com/git/tutorials/rewriting-history/git-reflog). 

Let's walk through the process in a bit more detail :

You can check out the `readme` branch after cloning the repository with `git checkout -b readme origin/readme`. The `readme` branch in this Nextjs weather app [repo](https://github.com/geshan/nextjs-weather-geo) is behind the master branch. You can see the following view with [gitk](https://www.atlassian.com/git/tutorials/git) or git log too.

<img class="center" src="/images/undo-git-rebase/02before-git-rebase.jpg" title="Readme branch before the git rebase" alt="Readme branch before the git rebase">

Now to rebase with the master branch you will run `git rebate master` on the `readme` branch.
It will show the following output

```bash
git rebase master
Successfully rebased and updated refs/heads/readme.
```

Now if you look at the commit history with `gitk`, it will show the following:

<img class="center" src="/images/undo-git-rebase/03after-git-rebase.jpg" title="Readme branch after the git rebase with the master branch" alt="Readme branch after the git rebase with the master branch">

The `readme` branch has been rebased with the `master` branch, if you want to undo the rebase you should run:

```bash
git reset --hard ORIG_HEAD
```

The above command will result in:

```bash
HEAD is now at 2ea1674 Better readme
```

If you see the commit history now, you will see it the same as the previous git commit history which looks like the below:

<img class="center" src="/images/undo-git-rebase/04after-undoing-git-rebase.jpg" title="Readme branch after undoing the git rebase" alt="Readme branch after undoing the git rebase">

Another way to rewrite the git commit history is by using [git reflog](https://github.blog/2015-06-08-how-to-undo-almost-anything-with-git/) which is a very powerful tool to undo almost anything in Git. You can try `git reflog` on this branch and it will show all the changes including the rebase and undoing the rebase. In the next section, you will learn about some important considerations for undoing a git rebase.

## Important Considerations

While the steps outlined above will help you undo a git rebase, it's important to keep the following considerations in mind:

Collaboration and Shared Repositories: If you've pushed the rebased commits to a remote repository and others have based their work on it, undoing the rebase can lead to conflicts. Communicate with your team members and ensure everyone is aware of the changes you're making to maintain a consistent workflow.

Backup and Safety Measures: Creating a backup branch before undoing a rebase is crucial. It allows you to easily revert to the rebased state if needed. Additionally, consider creating a backup of your entire repository to have an extra layer of safety in case anything goes wrong during the undo process.

Review and Testing: After undoing a rebase, thoroughly review and test your code to ensure it functions as expected. It's possible that reverting the rebase might introduce other issues or conflicts that need to be addressed.

You can read about more [git tips](/blog/2014/07/4-git-tips-beyond-basics/) and also follow some simple rules to not encounter [git conflicts](/blog/2016/04/3-simple-rules-for-less-or-no-git-conflicts/). Read both these posts and save yourself from common git related issues.

## Conclusion

Git rebase is a powerful feature that allows you to organize your commit history and create a cleaner workflow. However, there are situations where you might need to undo a git rebase. In this blog post, we explored what git rebase is, discussed scenarios where undoing a rebase becomes necessary, and provided a step-by-step guide on how to undo a git rebase effectively.

By incorporating the git reflog command into the process, you can easily identify the commit or reference to revert to, providing more flexibility and accuracy when undoing a rebase.

Remember, it's essential to carefully consider the implications of undoing a rebase, especially when collaborating with others or when the rebase has already been pushed to a remote repository. Always communicate with your team members and ensure a shared understanding of the Git workflow.

By understanding the process of undoing a git rebase, and utilizing the git reflog command, you can confidently manage your Git history and maintain a clean and organized repository. Happy coding and version controlling!
