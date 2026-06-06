# AI Coding Tip 023 - Shrink your AI's Pull Request

![AI Coding Tip 023 - Shrink your AI's Pull Request](AI%20Coding%20Tip%20023%20-%20Shrink%20your%20AI's%20Pull%20Request.png)

*Cap the size before the agent writes a single line.*

> TL;DR: Tell your AI to split work into small reviewable pull requests before it writes any code.

# Common Mistake ❌

You ask your AI agent to build a feature.

The agent opens a 2,000-line pull request that touches twelve files across the backend, the frontend, and the tests.

You stare at the diff and you have [no idea where to start reviewing](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md).

Reviewer attention is the scarcest resource on your team today and a bottleneck.

You skim, you trust the tests, you click approve.

That pull request ships with [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) you never saw.

# Problems Addressed 😔

- Reviewers procrastinate on reviewing or skim huge AI-generated pull requests.

- AI co-authored code already contains roughly 1.7 times more issues per change than human-only code, so large diffs hide more [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md).

- Merge conflicts multiply while the pull request sits open.

- You lose the ability to revert one logical change without ripping out the rest.

- A failing continuous integration run on a giant change blocks every other branch behind it.

- You sacrifice the second pair of eyes guarantee that code review provides.

- Human reviewers are the scarcest resource on your team.

- Every oversized pull request drains the attention they can never get back.

# How to Do It 🛠️

1. Write a short [spec](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md) before you prompt the agent.

2. Ask the AI to read the spec and [propose a plan](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md) that splits the work into small reviewable pull requests.

3. Give the agent a concrete size cap, for example 100 lines per pull request.

4. Tell the agent each pull request must do one logical thing and stand on its own.

5. Review the [plan](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md) first and reject any step that [mixes refactoring with new behavior](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20170%20-%20Refactor%20with%20Functional%20Changes/readme.md).

6. Let the agent open each pull request immediately so continuous integration starts running early.

7. [Reference related past pull requests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain/readme.md) as context for the agent.

8. Reject any pull request that grows beyond the cap and [ask the AI to split it again](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md).

# Benefits 🎯

1. **Reviewable code:** A human can [finish reading the diff](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md) without losing focus.

2. **Faster feedback:** Smaller pull requests get reviewed in hours, not days.

3. **Easier rollbacks:** You revert one small commit instead of untangling a megachange.

4. **Fewer merge conflicts:** Short-lived branches rarely collide with main.

5. **Earlier continuous integration signals:** Each pull request triggers its own pipeline as soon as it opens.

6. **Higher review quality:** Reviewers [stay engaged](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) on small diffs and catch real defects.

7. **Cheaper context:** The agent loads a [focused task](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20013%20-%20Use%20Progressive%20Disclosure/readme.md) instead of the whole codebase.

# Context 🧠

Michael Bolin, the Tech Lead for the Codex CLI repo at OpenAI, [recently described his workflow](https://newsletter.eng-leadership.com/p/how-openai-codex-tech-lead-does-ai) for building a permissions system.

The first thing he asked Codex was to create a plan and break the work into right-sized pull requests.

The initial output was about six pull requests.

He explicitly reminded the agent that a human still has to review the code.

A [2025 CodeRabbit study](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report) analyzed 470 open-source pull requests and found that AI co-authored pull requests contain roughly 1.7 times more issues per change than human-only pull requests.

Critical issues rose about 40 percent.

Major issues rose about 70 percent.

Big AI pull requests hide more defects per line than big human pull requests do.

[Salesforce reported](https://engineering.salesforce.com/scaling-code-reviews-adapting-to-a-surge-in-ai-generated-code/) that AI-assisted coding pushed their average pull request past 1,000 lines and 20 files.

Review latency went up.

Worst of all, review time for the largest pull requests started to plateau, a clear signal that reviewers had stopped engaging.

Reviewer attention is finite and scarce.

Once it's depleted, no tool can restore it.

Small pull requests solve the math.

A SmartBear study of 2,500 pull requests found smaller ones ship with fewer [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md).

[Teams that keep pull requests near 50 lines](https://www.swarmia.com/blog/why-small-pull-requests-are-better/) ship roughly 40 percent more code than teams who routinely exceed 200.

Small pull requests are a form of functional slicing.

Each slice cuts vertically through the feature so it compiles, tests, and deploys on its own.

A [spec-driven approach](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md) naturally produces sliceable work: the spec defines the boundary, and the AI splits the implementation into shippable increments.

Incrementalism and baby steps keep main green at every commit.

The AI [doesn't practice incremental delivery](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md) by default.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/d6b735d1e7284aa1cec4ef662eb86a55) -->

```markdown
Build the complete user authentication feature: login,
registration, password reset, email verification, OAuth
with Google and GitHub, session management, rate limiting,
and all the tests. Make it production-ready.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/91da47a9ed46f25b304856a848e5f9b3) -->

```markdown
Here is the spec for the user authentication feature:
[spec content]

Before writing any code, read the spec and propose a
plan that splits the work into pull requests of at most
100 lines each.

Each pull request must do one logical thing and pass CI
on its own.

Keep refactoring and new behavior in separate PRs.

Show me the plan only. Don't write any code until I
approve the plan.
```

# Considerations ⚠️

A 100-line cap is a guideline, not a law.

A trivial rename across 50 files can be longer and still trivial to review.

Never [mix a refactor with a functional change](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20170%20-%20Refactor%20with%20Functional%20Changes/readme.md) in the same pull request.

A reviewer can't tell if a behavior change is intentional or a side effect of the refactor.

Keep structural changes and behavior changes in separate pull requests, even when the AI wants to bundle them, to avoid [divergent change](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20124%20-%20Divergent%20Change/readme.md).

Some features have tight internal coupling and resist clean splits.

Be honest about that limit instead of forcing artificial splits that confuse reviewers.

Avoid long-lived feature branches.

A branch that lives for weeks drifts from main and accumulates merge conflicts.

When the feature isn't ready to ship but the code is ready to merge, use a [feature toggle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20242%20-%20Zombie%20Feature%20Flags/readme.md) instead.

Each pull request merges to main behind the toggle and the feature activates when all pieces are in place.

Stacked pull requests work well when one change depends on another.

Each layer should compile and pass tests on its own.

If your team takes two days to review a small pull request, the workflow collapses.

Fix the review service level agreement before you push smaller pull requests on people.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

Some agents resist splitting and try to ship everything in one pull request even after you ask.

You may need to repeat the cap or paste it into your [project skill file](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) or [AGENTS.md harness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md) so the rule survives a [fresh context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md).

# Tags 🏷️

- Planning

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 013 - Use Progressive Disclosure](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20013%20-%20Use%20Progressive%20Disclosure/readme.md)

[AI Coding Tip 022 - Give AI a Harness to Work With](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md)

# Conclusion 🏁

Your AI doesn't care how big the pull request is.

You do.

Human reviewers are the scarcest resource in your pipeline.

The AI can write code all day.

Reviewers can't review all day.

Set the size cap before the agent starts, and ask for the split plan first.

That single instruction protects the human who has to read the code. 🚀

# More Information ℹ️

[How OpenAI Codex Tech Lead Does AI-Assisted Engineering, by Gregor Ojstersek](https://newsletter.eng-leadership.com/p/how-openai-codex-tech-lead-does-ai)

[State of AI vs Human Code Generation Report, CodeRabbit](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)

[Scaling Code Reviews: Adapting to a Surge in AI-Generated Code, Salesforce Engineering](https://engineering.salesforce.com/scaling-code-reviews-adapting-to-a-surge-in-ai-generated-code/)

[Why small pull requests are better, Swarmia](https://www.swarmia.com/blog/why-small-pull-requests-are-better/)

[Agent pull requests are everywhere, GitHub Blog](https://github.blog/ai-and-ml/generative-ai/agent-pull-requests-are-everywhere-heres-how-to-review-them/)

[GitHub Targets Large Merge Problem with Stacked PRs, InfoQ](https://www.infoq.com/news/2026/04/github-stacked-prs/)

# Also Known As 🎭

- Right-Sized-AI-PRs
- AI-PR-Budgeting
- Reviewable-AI-Commits
- Pre-Coding-PR-Plan

# Tools 🧰

- Codex CLI
- GitHub Stacked PRs (gh-stack)
- Graphite
- CodeRabbit

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)