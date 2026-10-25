---
layout: post
title: "41 things about how software engineering has changed in 2026 because of AI, LLMs, and coding agents"
date: 2026-10-25T17:18:55.000+10:00
comments: true
tags:
- AI
- Gen AI
- Software Engineering
cover: "/images/ai-software-engineering/01ai-software-engineering.jpg"
pagetitle: "41 things about how software engineering has changed in 2026 because of AI, LLMs, and coding agents"
description: "41 things about how software engineering has changed in 2026 because of AI, LLMs, and coding agents, and what you need to do to stay relevant in this new era of software development"
keywords: ai software engineering, ai sdlc, agents, llm, gen ai, coding agents, software development
---
November is a special month in the AI space: ChatGPT was [released](https://help.openai.com/en/articles/6825453-chatgpt-release-notes#dec-15-2022) on 30-Nov-2022 (roughly 4 years ago), and Claude Opus 4.5 was [released](https://www.anthropic.com/news/claude-opus-4-5) on 24-Nov-2025 (about a year ago). Software engineering has transformed over the past 10-12 months, and the work of a software engineer has already undergone a paradigm shift, whether you like it or not. In this post, you'll read some thoughts and opinions (and a few facts) on how software engineering has rapidly evolved over the past 12 months or so. Let’s get going!

<!-- more -->

<img class="center" src="/images/ai-software-engineering/01ai-software-engineering.jpg" title="AI has transformed software engineering in 2026" alt="AI has transformed software engineering in 2026" fetchpriority="high">

## Table of contents

- [Claude Opus 4.5 and its afterglow](#claude-opus-4.5-and-its-afterglow)
- [Opinions about software engineering in 2026](#opinions-about-software-engineering-in-2026)
    - [General things about AI and software engineering](#general-things-about-ai-and-software-engineering)
    - [Team size and work done by software engineers](#team-size-and-work-done-by-software-engineers)
    - [AI and job search](#ai-and-job-search)
    - [AI and content slop](#ai-and-content-slop)
    - [Experience is fungible and important at the same time](#experience-is-fungible-and-important-at-the-same-time)
    - [Explosion of code resulting in processes, tools playing catch-up](#explosion-of-code-resulting-in-processes%2C-tools-playing-catch-up)
    - [Cyber security](#cyber-security)
- [Conclusion](#conclusion)

## Claude Opus 4.5 and its afterglow

Around the end of Nov 2025, Claude Opus 4.5 was released, and Claude Code was about 9 months old then. As per the `trust me bro` benchmarks and the official release blog post:

> Claude Opus 4.5 is state-of-the-art on tests of real-world software engineering:

It scored 80.9% on the SWE bench, leaving its closest competitor, GPT 5.1 Codex Max, behind by more than 3 percentage points. The first impression from the official blog post mentions: 

> As our Anthropic colleagues tested the model before release, we heard remarkably consistent feedback. Testers noted that Claude Opus 4.5 handles ambiguity and reasons about tradeoffs without hand-holding.

During the December 2025 holidays, people started playing with this new model and Claude Code and were blown away by how far AI agents (and LLMs) have come, and how they've crossed the chasm. Software engineering will never be the same after this.

## Opinions about software engineering in 2026

With that intro, here are my opinions (and a few facts, maybe some rants) about software engineering in 2026. I initially wanted to write paragraphs and prose, but I thought bullet points (1-3 sentences max) would be more effective, similar to the [101 realities you should know as a software engineer](/blog/2022/09/software-engineering-realities/) post from Sep 2022, just before this AI/Agentic software engineering era. Don’t be fully AI-pilled, give access to your email, Slack, meeting note-taker, and just follow what a model says. Also, don’t be anti-AI and not use the tools of the trade. Below are my thoughts and opinions in no particular order, grouped by topics:


### General things about AI and software engineering

1. If you are not invested in AI, start learning it today. Learn early while investor token subsidies last, which won't be long.
1. Do NOT fight the situation; someone has posted on YouTube [I’m done coding with AI](https://www.youtube.com/watch?v=2ZU3j4GQ4K8) – 1.2 million views in 2 months, but in today’s world, using AI to write (generate) code is not optional. If you go against the tide, you will be the first one on the layoff list. Think like this: if a carpenter doesn't use power tools, they're no longer a carpenter. Artisan carpenters exist, but there are far fewer than regular ones.
1. Software engineering has fundamentally changed; if you got satisfaction and value from writing code, it is better to find another profession. We were always problem solvers; it's time to ship code (probably faster) with AI and reach business goals – don’t love the code/craft, value the solution provided to the business.
1. Software engineering has changed time and again in history, from punch cards to programming languages, but this time the change is very fast and harder to keep up. Given the rate of change in AI (things change every week), even [JavaScript fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4) seems like nothing. 
1. The question now is not whether I use X’s AI agent skills or can I create a skill to do Y. The question you need to ask is, `I did this work 3 times now; how can AI automate it?`. For instance, if you do manual testing of your web app, it's probably time to write a skill with [Browser Agent](​​https://github.com/vercel-labs/agent-browser) to get it done with an LLM.
1. Even software engineers working in niche technology are using AI agents and LLMs. For example, a friend of mine works with [Apex](https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_intro_what_is_apex.htm) (the language used in Salesforce apps), and he is not writing code by hand anymore.
1. The rapid transformation that has happened in software engineering due to AI, LLMs, and AI coding agents in the past 10 months of 2026 is far greater than the changes in software engineering in the past decade (2015-2025). Someone predicted AI in [2027](https://ai-2027.com/); not sure how much of it will be true.
1. Build that side project you always wanted to build; generating code is an almost solved problem. Making money from it is still the harder problem, even with AI help.
1. The concept of the 10x developer originated from a [research paper in 1968](https://www.construx.com/blog/the-origins-of-10x-how-valid-is-the-underlying-research/). In 2026, the difference between a bad software engineer who doesn’t use AI and a great software engineer who heavily leverages AI can be 100x - [source](https://www.htmlallthethings.com/podcast/ai-basics-for-developers)
1. Learn about MCP (model context protocol), AI Agent Skills, and use them. Also, CLIs are back with a bang, as coding agents can use them (or learn to use them) easily.
1. Even if you are a manager, carve out some time to experiment with these coding Agents and make sure your team is using them (if not exploiting them) so that the team members [stay employable and not replaced](https://ghuntley.com/replaced/) in the near future.
1. With code generation being easy and cheap, system design and architecture skills become even more indispensable. You should be able to think one level higher ot be more effective as a software engineer now.
1. Debugging with AI help is a skill you should invest in; your agents should be able to read logs, help debug, and also assist in writing the solution.
1. Big rewrites and upgrades seem to be possible now. Language and framework have become secondary considerations. So your data is your competitive advantage. For reference: Amazon upgraded over 30,000 internal production applications from Java 8 or 11 to Java 17, saving over [4,500 years of development work](https://aws.amazon.com/blogs/devops/amazon-q-developer-just-reached-a-260-million-dollar-milestone/) and capturing $260 million in annualized cost savings.


### Team size and work done by software engineers

1. With the high usage of AI, LLMs, loops, harnesses, and AI coding agents, smaller teams are getting much more work done. By smaller teams, I mean 2-3 engineers and one tech lead (Lead Engineer + Engineering Manager, same person)
1. A single software engineer is able to get a medium-sized task over the line in a single sprint, compared to it taking 2 engineers taking a couple of sprints earlier. This gives rise to a different problem: other engineers in the same team don’t have as much context about who is working on what task and what business value it adds.
1. There is a high expectation of delivery and speed by the business from software engineers, as they have “heard” that AI is making code cheap and a lot can be done in a short amount of time with fewer resources (software engineers). I will leave the interpretation of this to you.
1. My belief was (and to a point still is) that `what to do rests on the product` and `how to do decisions come to the engineering team`. This line is blurring as Product Managers (PMs) open pull requests and software engineers are expected to be “product engineers,” understanding more and more of the business problems, context, and user behavior. A similar phenomenon is happening with designers, too. 
1. Earlier, [pair programming](/blog/2020/06/pair-programming-benefits-for-your-team/) was useful; in this agentic software engineer era, leverage pair prompting (more to come on Pair prompting)

### AI and job search

1. Circa 2021-2022 was the `era of job hopping`; the market had many software engineer jobs, including remote roles (post-COVID boom). People were getting jobs after graduating from coding bootcamps. 2025-2026 is the `era of job hugging`. In this storm of layoffs, be grateful you have a job, your company is doing well financially, and you should be happy with it.
1. The job market is `cold`, and be prepared to interview at multiple companies even if you have loads of experience.
1. The IC job market is shrinking; I see that the focus has shifted to hiring a team lead who is a lead/staff engineer, as well as an Engineering manager with 2-3 direct software engineer reports.
1. Remote roles are much fewer compared to 2021-2022, and in the interview, be prepared to face questions about AI in some way or form. You might even need to use an AI coding agent in one of the coding rounds. I have seen advertised roles disappear in weeks, if not days.
1. In Q4 of 2026, if you are writing 10% or less code by hand, you are still employable. If you are writing a lot of code by hand, rethink your employability as a software engineer and start exploiting coding agents more.
1. Being young and less experienced is an advantage now; you don’t need to unlearn and relearn many things, but the junior job market is squeezed (read: non-existent), so you will need to market yourself as a mid-level engineer. An example here is that one of the “younger” engineers on our team pinged us about [Ocra IDE](https://www.onorca.dev/) that can handle multi-agents (and git subtrees) better than other “IDEs” and stock coding agents.

### AI and content slop

1. Amazing software engineers contributing their time and effort to maintaining open source software were not supported much before the AI era; they are buried under AI slop and [burning out](https://www.jeffgeerling.com/blog/2026/ai-is-destroying-open-source/).
1. Before AI could generate text (walls of text), reading a human-written document that was 10 minutes long to read (240 words per minute, so 2400 words) would be a long document. But with LLMs able to generate text, I have seen documents that take 40 or 50 minutes to read. On skimming, those docs feel like someone documenting their thought process, not writing to achieve any particular goal. Please remember [your reader also has a context window](https://medium.com/@remuslazar/your-reader-has-a-context-window-too-057ca442f3b7), which is small.
1. A similar problem stems with code and code review as well. It is not humanly possible to review code that has 10K lines changed. Now, whether it is slop or not is a different question, and that is where AI code reviews somehow make sense.

### Experience is fungible and important at the same time

1. It is hard to differentiate between a mid-level software engineer (with, say, 2-3 years of experience) and a senior software engineer (with, say, 5-6 years of experience) as they use the same model/AI coding agent, have similar prompting skills, so both the amount and quality of work are similar.
1. With the above context, what you know is still valuable; for instance, if you have never heard of infrastructure as code (and Terraform), you cannot ask the AI model (LLM) or agent that you need IaC code.

### Explosion of code resulting in processes, tools playing catch-up

1. As ~~writing~~ generating code is becoming easier and cheaper, software engineers have the capability to run multiple agents in parallel. There is an explosion of code being produced. A couple of things to note: first, it puts more pressure on downstream processes like code review, QA, CI/CD, and deploying/releasing software. Second, [human brains cannot multitask](https://www.neuroleadership.com/articles/the-myth-of-multitasking), so you might run 3 or 5 agents, but if you need to give them directions, are you actually more productive? I am not talking about giving a task to an agent and reviewing the final output (loop engineering) for this one.
1. First pass of code reviews are done by AI agents and other SaaS like Code Rabbit. I have also seen Codex used for the first review of any opened PR, with skills that have predefined rules run as part of the CI process. The code might be generated by Claude Code or in Cursor IDE. Then it goes for a human review.
1. Having a faster CI/CD process is becoming even more important. Michael Hart was ahead of his time with [LambCI](https://github.com/lambci/lambci) in [2016](https://hichaelmart.medium.com/lambci-4c3e29d6599b), which ran your CI process in an AWS Lambda, with concurrency of 100 or more now. Features like [Lambda Managed Instances](https://docs.aws.amazon.com/lambda/latest/dg/lambda-managed-instances.html) and [90-minute runtime](https://aws.amazon.com/about-aws/whats-new/2026/09/aws-lambda-90-minute-function/) would make Lambda a good alternative for regular CI systems like GitHub Actions in this AI era. Multi-step durable execution of Lambda can run [up to 1 year](https://aws.amazon.com/blogs/compute/announcing-90-minute-function-timeout-on-aws-lambda-managed-instances/).
1. Anthropic built an in-house git alternative called [Scion](https://www.anthropic.com/research/redesigning-source-control) as change requests went from around 5K in mid-June to 30K a day by mid-September 2026. For non-frontier labs like us, you can use [Entire](https://entire.com/), which claims to handle 418 pushes per second.
1. Some months back, I thought Software engineers could be glorified Quality Assurance (QA) engineers, as ~~most~~ all of the code is generated. Looks like there is a [skill](https://github.com/affaan-m/ECC/blob/main/skills/browser-qa/SKILL.md) to do QA too. (For reference, that GitHub repository has 288K stars)
1. With the vast amounts of code being generated and [code being a liability](https://doctorow.medium.com/https-pluralistic-net-2026-01-06-1000x-liability-graceful-failure-modes-d69f384af9e4), it is hard to find the right owner of the code, which has further ripple effects.
1. Just because every feature can be written and possibly every bug (even one affecting 0.01% of the users) can be potentially fixed doesn't mean they both need to be done. This is where judgment and taste in what to build (or fix) become crucial. 


### Cyber security

1. Claude Fable5 (Mythos) by Anthropic was dubbed so powerful at detecting high-risk vulnerabilities that it was first released to a select set of companies with project [Glasswing](https://www.anthropic.com/news/expanding-project-glasswing) before making it available to the public with “guardrails”.
1. Unrelated but important: If a swarm of [AI agents hacks into a system](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), it is Agents gone rogue; if a person hacks into a softare/web system, it is a crime.
1. Just last week, critical vulnerabilities were found in [PHP](https://www.wiz.io/blog/php2shell-php-rce) (php2shell) and [Node.js Brotli decoder](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases), which were apparently uncovered by LLMs.
1. Looking to the future, if the attack is going to be done with a swarm of AI agents, your company should have AI agents on the defense side too for better cybersecurity protection and security posture.


## Conclusion

Nobody knows the future; we are all in the same boat and trying to navigate this uncertainty. One thing is clear: job security in software engineering is gone. And [software engineering may no longer be a lifetime career](https://www.seangoedecke.com/software-engineering-may-no-longer-be-a-lifetime-career/). The future is always unpredictable; take what you hear with a pinch of salt and evaluate who is saying it. If a CEO of a chip company says software engineers will be running 100s of agents, he might want to sell more of the chips. 

There you have it: 41 (14+5+6+3+2+7+4) things to know about software engineering in 2026 and plan your way forward. Best of luck!

