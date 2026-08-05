# AI Coding Tip 029 - Stop Using One Model for Everything

![AI Coding Tip 029 - Stop Using One Model for Everything](AI%20Coding%20Tip%20029%20-%20Stop%20Using%20One%20Model%20for%20Everything.png)

*Different stages need different brains.*

> TL;DR: Assign a different model to each pipeline stage since none excels at planning, coding, reviewing, and testing alike.

# Common Mistake ❌

You open one chat with your favorite model and ask it to plan, write, review, and test the same feature end to end.

You treat model loyalty like a virtue, so the same blind spots follow the code from the first line to the last commit.

The [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) it can't see when it writes are the same defects it can't see when it reviews.

# Problems Addressed 😔

- The reviewer inherits the coder's blind spots, so it misses the exact defects the same model would write.

- You lose the benefit of a [second opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20017%20-%20Ask%20for%20the%20Analyst,%20Not%20the%20Analysis/readme.md), since the analyst and the executor are the same mind.

- One vendor's outage, rate limit, or price hike stalls your entire pipeline at once.

- Your codebase drifts toward one model's default style, hiding the exact spots a different model would flag as [unclear](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md).

- Test cases target the failure modes the author already thinks to avoid, so real edge cases slip through untested.

- You already bring in different people for [technical and code reviews](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md), so a single model auditing everything breaks that same principle.

# How to Do It 🛠️

1. Pick a model strong at reasoning to scope the task through [read-only planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md).

2. Hand the plan to a fast, cheap, code-tuned model working inside a [harness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md) that runs tests automatically.

3. Trigger each stage as its own subagent with [fresh context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md), a narrow local objective, and only the [information that stage needs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md).

4. Route the review to a model that didn't write the code.

5. Use a cheap model to review once you have [clear rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md), reusable [skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md), and a solid [harness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md) in place.

6. Ask the reviewing model to extend the test suite with edge cases the author missed.

7. Record which model handled each stage and the assumptions it made in an [Architecture Decision Record](https://en.wikipedia.org/wiki/Architectural_decision) (ADR) or similar document, so you can [spot repeating blind spots](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain/readme.md) later.

8. Rotate the pairings every few months as model strengths shift with new releases.

9. Apply [TDD adversary rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/91%20-%20The%20Dirty%20Secret%20Behind%20Loop%20Engineering/readme.md): pick one model to write the test (Red), another to write the simplest implementation (Green), and a third to decide if it's worth refactoring (Refactor).

# Benefits 🎯

1. **Catch more defects:** A model reviewing code it didn't write spots the exact class of defect its own instincts would miss.

2. **Avoid vendor lock:** You spread load across providers, so one outage or price hike doesn't stall the whole pipeline.

3. **Match cost to complexity:** You save your most expensive reasoning model for planning and give routine syntax work to a cheaper one.

4. **Widen test coverage:** A model with different training data invents edge cases the original author never considered.

5. **Keep [personas](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20026%20-%20Assign%20a%20Persona%20to%20Every%20Skill%20Definition/readme.md) honest:** Rotating models forces you to write role definitions specific enough that any model can fill them.

6. **Prevent style lock-in:** Your codebase stops drifting toward one model's habits and stays closer to your own [standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md).

# Context 🧠

Every model carries a training history of pitfalls that shapes what it notices and what it misses.

Claude models tend toward broad, breadth-first scanning of a problem, while GPT models tend toward narrow, depth-first evidence gathering.

Those different instincts mean the [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) one model writes are often exactly the ones it also fails to catch in review.

Research from the code review vendor [Greptile](https://www.greptile.com/blog/model-inversion) found that Claude-authored pull requests get a 53.7% defect recall rate when Claude reviews itself, but a 62.0% recall rate when GPT reviews the same code.

The same pattern holds in reverse for GPT-authored code.

Cross-model review isn't a trick.

It's the direct result of two models having different blind spots.

Relying on a single model for every stage risks the same failure mode as [model collapse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20314%20-%20Model%20Collapse/readme.md): without a different perspective correcting it, the quality slowly degrades.

Giving one model every stage of development is the AI equivalent of a class exhibiting [divergent change](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20124%20-%20Divergent%20Change/readme.md): one entity keeps changing for many unrelated reasons, and every reason it changes is a reason it can quietly break.

Treat each stage of development as its own [modular](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) role, and hire the model best suited to it, the same way you'd [assign a persona to a skill](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20026%20-%20Assign%20a%20Persona%20to%20Every%20Skill%20Definition/readme.md).

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/9784900436131553e5399007d24cb218) -->

```markdown
Plan, write, review, and test the new payment retry logic.
Make sure the code is correct and the tests cover the edge cases.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/9838775e688f5d54611b60d481a05ef6) -->

```markdown
Stage: Plan
Model: Opus (strong reasoning)
Task: Scope the payment retry logic in read-only mode.
List files to touch and open questions. Don't write code.

Stage: Code
Model: Sonnet (fast, code-tuned)
Task: Implement the plan above. Keep the diff under 200 lines.

Stage: Review
Model: GPT-5.5 (didn't write this code)
Task: Review the diff for correctness and missed edge cases.
List every issue, even minor ones.

Stage: Test
Model: GPT-5.5
Task: Write tests for the edge cases found during review.
Don't just cover the happy path.
```

# Considerations ⚠️

This adds coordination overhead, so it fits multi-day features better than one-line fixes.

You still need a [human-in-the-loop checkpoint](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md) before merge, since cross-model review [catches more defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) but doesn't guarantee zero defects.

Track model versions alongside model names, since a provider's default model changes silently and a rotation you set up in January may mean something different by June.

Costs can rise if you route trivial edits through your most expensive reasoning model, so match the model to the actual complexity of each stage.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

Switching between providers adds latency, since each new model call starts a [cold context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md).

Not every team has budget or API access to more than one provider at once.

# Tags 🏷️

- Prompt Engineering

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 017 - Ask for the Analyst, Not the Analysis](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20017%20-%20Ask%20for%20the%20Analyst,%20Not%20the%20Analysis/readme.md)

[AI Coding Tip 022 - Give AI a Harness to Work With](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md)

[AI Coding Tip 026 - Assign a Persona to Every Skill Definition](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20026%20-%20Assign%20a%20Persona%20to%20Every%20Skill%20Definition/readme.md)

[AI Coding Tip 027 - Force Code Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md)

# Conclusion 🏁

One model can't play every role in your pipeline and catch its own mistakes at the same time.

Split the work across models the way you'd split it across a team.

Plan with one, code with another, and let a third one check the work.

Rotate them as the models change, and let the mismatch between their blind spots do the reviewing for you.

# More Information ℹ️

[Model Inversion: Why Cross-Model Code Review Catches More Defects](https://www.greptile.com/blog/model-inversion)

[Ensemble Learning](https://en.wikipedia.org/wiki/Ensemble_learning)

# Also Known As 🎭

- Stage-Specific Model Routing
- Cross-Model Development Pipeline
- Model-Per-Stage Assignment
- Rotating Model Roles

# Tools 🧰

Claude Code, Codex CLI, Cursor, and OpenRouter all let you configure a different model for each agent or task inside the same workflow.

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
