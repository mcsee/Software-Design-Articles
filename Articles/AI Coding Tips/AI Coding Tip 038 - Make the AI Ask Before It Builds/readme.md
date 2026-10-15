# AI Coding Tip 038 - Make the AI Ask Before It Builds

![AI Coding Tip 038 - Make the AI Ask Before It Builds](AI%20Coding%20Tip%20038%20-%20Make%20the%20AI%20Ask%20Before%20It%20Builds.png)

*A one-line request hides a dozen decisions you never made.*

> TL;DR: Force the AI to ask about the decisions you left out before it builds anything (/megaplan).

# Common Mistake ❌

You type a one-line request like *build a site to monitor AI progress and the risk of AI rebelling* and expect a working plan back.

The AI doesn't ask where you want to host it, how you want to deploy it, or which stack you already trust.

It fills the blanks for you with plausible statistical decisions.

Then it [runs with](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20227%20-%20Cowboy%20Coding/readme.md) the implicit decisions, with the quiet confidence of someone who has never once been asked to justify any of them.

Devin's [`/megaplan`](https://docs.devin.ai/desktop/cascade/modes) command exists because that gap is common enough to deserve its own workflow.

The tool pauses and asks you a structured set of questions before it writes a single file.

Other agentic coding tools ship a similar planning pause under different names.

You don't need that specific command to get the behavior.

You can prompt any capable AI assistant to simulate it:

> Ask it to list every unstated decision in your request, then wait for your answers before it starts building.

Skipping that step doesn't save time.

It just moves the cost from a five-minute question-and-answer round to a rewrite after the AI already guessed wrong.

Usually right when you thought you were done, which is exactly when nobody wants to hear about it.

# Problems Addressed 😔

- A vague request forces the AI to create defaults for hosting, deployment, and the technology stack, and those defaults rarely match what you actually wanted.
- Every silent guess is a [hidden assumption](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20198%20-%20Hidden%20Assumptions/readme.md) baked into the code before you ever see it.
- You discover the wrong choice only after the AI has already generated [hundreds of lines](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md) built on top of it.
- Rewriting a wrong foundation costs more than answering four questions up front ever would.
- A single vague prompt can hide a dozen [accidental](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) decisions: language, framework, database, hosting, authentication, and more, and each one compounds the others.
- Without a [documented decision trail](https://en.wikipedia.org/wiki/Architectural_decision), nobody, including future you, can tell why the AI chose a particular database or cloud provider.

# How to Do It 🛠️

1. State your goal in one sentence, the same way you normally would.

2. Ask the AI to stop before writing any code and list every decision your request left open.

3. Require the AI to phrase each open decision as a direct question with a short list of concrete options, not an open-ended essay prompt.

4. Answer each question explicitly, even the ones that feel obvious to you, because what's obvious to you may not be the AI's default.

5. Ask the AI to restate your answers as a short plan before it writes any code, so you can [catch a bad interpretation while it's still just text](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md).

6. Only after you approve that plan, let the AI proceed to implementation.

7. [Save the question-and-answer list alongside the project](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md) so the next session, human or AI, inherits the same context instead of guessing again.

# Benefits 🎯

1. **Surface hidden decisions early:** You see every assumption the AI would otherwise have made silently, before any code depends on it.

2. **Cut expensive rewrites:** Fixing a wrong answer to a question costs a sentence; fixing a wrong foundation costs a rewrite.

3. **Keep control of the architecture:** You choose the hosting, the stack, and the deployment path instead of inheriting the AI's default guess.

4. **Create a paper trail:** The question list becomes a lightweight [record of design decisions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20168%20-%20Undocumented%20Decisions/readme.md) you can revisit later.

5. **Improve the next request too:** Once you've answered the stack and deployment questions once, you can [reuse those answers for related prompts](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md) in the same project.

6. **Force clearer thinking on your side:** Writing out the answers often reveals that you hadn't fully decided either, which is better to discover now than mid-build.

# Context 🧠

Devin, the agentic coding tool from Cognition, introduced `/megaplan` as a planning command you invoke before asking it to build something substantial.

Instead of jumping straight into code, it interrogates your request first: where should this run, what should it integrate with, which technology choices matter to you, and what should it explicitly leave out of scope.

You answer, and only then does it draft a plan grounded in your actual constraints instead of its best guess, which is a nice change of pace from tools that treat your silence as informed consent.

Inside Devin Desktop, Plan Mode sits next to Code and Ask as a Cascade mode, and typing the `/megaplan` command in the input box triggers the same clarifying-question form.

Claude Code ships a comparable pause under its own name: Plan Mode keeps Claude reading and researching without touching a file until you approve what it found, and you reach it with `Shift+Tab` pressed twice or by typing `/plan`.

Claude Code has no native `/megaplan` command, so third parties added one: [rickmellor/megaplan](https://github.com/rickmellor/megaplan) and [peteromallet/megaplan](https://github.com/peteromallet/megaplan) both bolt a `/megaplan` command onto Claude Code.

Devin Desktop's `/megaplan` behaves like Plan Mode with an interview up front, while peteromallet's version behaves more like [a multi-stage pipeline with critique and gates between phases](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20032%20-%20Build%20a%20Dark%20Factory%20Pipeline/readme.md).

Either way, the closest thing Claude Code has to Devin Desktop's question-first flow is entering Plan Mode and explicitly asking it to interview you before it proposes anything.

The command name matters less than the underlying discipline: [separate the decision-gathering step from the building step](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md), and don't let the AI collapse both into one silent leap.

You can simulate this with almost any AI assistant that supports a system prompt or a [project-level instruction file](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md).

You can ask it directly:

> Before you write any code, list every decision this request leaves open, phrase each one as a question with a short set of options, and wait for my answers.

That single instruction turns a vague one-liner into a short interview, and a short interview is far cheaper than a wrong implementation.

This isn't the same as [spec-driven development](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md), which formalizes requirements into a written specification before any code exists.

A megaplan-style interview is narrower and faster: it targets only the decisions your specific request left ambiguous, not a full requirements document.

You can use both together: run the interview first to pin down the open decisions, then feed the answers into your spec.

The habit also pairs with [asking for the analyst instead of the analysis](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20017%20-%20Ask%20for%20the%20Analyst,%20Not%20the%20Analysis/readme.md): you want the AI to question your request before it executes it.

There's a version of this that goes further: you treat the AI as an augmented adversary you argue with, not a form you fill out.

When one of its questions exposes a tradeoff you haven't actually thought through, you push back and defend your answer, even when another option is faster to type.

An AI that disagrees with your first answer and asks why is more useful here than one that accepts anything you type.

You're stress-testing a decision by making the AI argue the other side of it with you.

It's the same value [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging) has always offered, except the duck talks back and actually asks the follow-up question you were avoiding.

And it reinforces a rule you should already be enforcing: [the AI answers to you, not the other way around](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md), so it should [ask why before it assumes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md), not assume and explain itself afterward.

# Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/8c9de5bf30879c8e3d5f93cd473333cd) -->

```markdown
Build a site to monitor AI progress and the risk of AI rebelling.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/b337f7263f4f896d50d4678d9166b179) -->

```markdown
I want to build a site to monitor AI progress.

It should also track a risk.

That risk is AI systems acting against human interests.

Before you write any code, list open decisions.

This request leaves several decisions open.

Phrase each one as a direct question.

Give a short set of concrete options.

Wait for my answers before you plan or build anything.

Cover at least:
- Where do we host and deploy the site?
- Which frontend and backend technologies do we use?
- Which data sources feed the monitoring dashboard?
- How do we keep the risk assessment content current?

Don't guess any of these on your own.

Ask me first.
```

# Considerations ⚠️

A megaplan-style interview works best on requests with real ambiguity, not on requests that are already fully specified.

Asking four clarifying questions about a one-line fix to a typo wastes more time than it saves, and everyone in the conversation knows it.

You need to judge when the interview earns its cost, and you can skip it for genuinely small, unambiguous tasks.

The AI can only ask about decisions it recognizes as open.

It may still miss an assumption that seems obvious to it but isn't to you, so you should treat the interview as a strong filter, not a guarantee that nothing was left unstated.

Answering the questions takes real effort on your part.

If you rush through them with vague or contradictory answers, you've just moved the guessing from the AI back to yourself, and the plan will be just as shaky.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

It adds an extra round trip before any code appears, which slows down truly trivial requests without a proportional benefit.

You can't fire off a request, grab a coffee, and come back to finished code.

You come back to a question waiting for your answer.

# Tags 🏷️

- Planning

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[AI Coding Tip 008 - Use Spec-Driven Development with AI](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md)

[AI Coding Tip 011 - Initialize Agents.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md)

[AI Coding Tip 015 - Force the AI to Obey You](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md)

[AI Coding Tip 017 - Ask for the Analyst, Not the Analysis](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20017%20-%20Ask%20for%20the%20Analyst,%20Not%20the%20Analysis/readme.md)

[AI Coding Tip 019 - Tell the AI Why, Not Just What](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md)

[AI Coding Tip 020 - Create a Second Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md)

[AI Coding Tip 021 - Avoid Comprehension Debt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md)

[AI Coding Tip 032 - Build a Dark Factory Pipeline](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20032%20-%20Build%20a%20Dark%20Factory%20Pipeline/readme.md)

# Conclusion 🏁

A one-line request always hides more decisions than it states.

You can let the AI guess them and pay for it later, or you can make it ask and pay a few minutes now.

The `/megaplan` habit isn't about a specific command in a specific tool.

It's about refusing to let a machine make your architecture decisions by default.

Ask first.

Build second.

# More Information ℹ️

[Requirements Elicitation, Wikipedia](https://en.wikipedia.org/wiki/Requirements_elicitation)

[Decision Matrix, Wikipedia](https://en.wikipedia.org/wiki/Decision_matrix)

[Socratic Method, Wikipedia](https://en.wikipedia.org/wiki/Socratic_method)

[Architectural Decision, Wikipedia](https://en.wikipedia.org/wiki/Architectural_decision)

# Also Known As 🎭

- Megaplan-Style-Prompting
- Decision-First-Prompting
- Clarify-Before-Build
- AI-Requirements-Interview

# Tools 🧰

Devin's `/megaplan` command, Claude Code's plan mode, and any assistant you can instruct through a system prompt or a project-level rules file.

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans.

I use AI proofreading tools to improve some texts.

Most AI detectors will flag this article as AI-generated. That's expected. It's a technical article. It has a rigid format and clear steps to follow. 

That's exactly the pattern those tools are trained to catch. I've apparently been "writing like an AI" for decades, long before AI existed. This is a technical article, not a novel.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)
