# AI Coding Tip 021 - Avoid Comprehension Debt

![AI Coding Tip 021 - Avoid Comprehension Debt](AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt.png)

*Stop shipping code you can't explain.*

> TL;DR: Merging code you don't understand creates comprehension debt that compounds until your team can no longer maintain it.

# Common Mistake ❌

You ask the AI to implement a feature.

The code looks clean.

The tests are green.

You merge it.

Six weeks later, a [defect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) appears in that module.

Nobody on your team can explain how it works.

You ask the AI again.

You merged without understanding.

You built both functional and comprehension debt.

# Problems Addressed 😔

- You lose the ability to debug without the AI.

- Your team can't onboard new members into AI-generated modules.

- Design decisions become invisible and accumulate silently.

- You mistake "tests passing" for "code understood."

- Your velocity metrics look great while comprehension quietly collapses underneath.

- A junior developer can now generate code faster than a [senior engineer can audit it](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md).

- The quality gate you relied on disappears.

# How to Do It 🛠️

1. Ask the AI to [explain every non-trivial block](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md) before you accept it.

2. Close the chat and rewrite the explanation in your own words in a comment or [ADR](https://en.wikipedia.org/wiki/Architectural_decision).

3. Ask the AI "what assumptions did you make here?" for each function it generates.

4. Run a 10-minute AI blackout: try to explain the module to a colleague without reopening the chat.

5. Add a *comprehension check* step in your PR template: "Can you explain this change in 3 sentences?"

6. Use the AI for conceptual inquiry: ask *why* as often as you ask *how.*

7. Identify your [load-bearing decisions](https://addyosmani.com/blog/comprehension-debt/): the choices that, if wrong, will cost you weeks.

8. Keep a short `decisions.md` file with one sentence per [architectural decision](https://en.wikipedia.org/wiki/Architectural_decision) the AI made on your behalf.

# Benefits 🎯

1. **Debuggability:** You can fix [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) without reopening the AI chat because you understand the system.

2. **Onboarding speed:** New teammates can read your decisions file and understand why the code exists.

3. **Reduced rework:** You catch flawed assumptions before they reach production.

4. **Honest velocity:** Your speed metric reflects real output, not deferred understanding.

5. **AI supervision skill:** [Shen and Tamkin](https://arxiv.org/abs/2601.20245) found that cognitive engagement with AI preserves learning outcomes even when you receive AI assistance.

# Context 🧠

Comprehension debt is the growing gap between how much code exists in your system and how much any human genuinely understands.

Addy Osmani [named and described this pattern in March 2026](https://addyosmani.com/blog/comprehension-debt/).

Unlike [technical debt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20148%20-%20ToDos/readme.md), comprehension debt breeds false confidence.

The codebase looks clean.

The tests pass.

The reckoning arrives quietly, at the worst possible moment.

A research team at Anthropic ran a randomized controlled trial with 52 software engineers learning a new library.

The group using AI completed the task in the same time as the control group, but scored 17% lower on a follow-up comprehension quiz (42% vs. 57%) ([Shen and Tamkin, Anthropic, 2026](https://arxiv.org/abs/2601.20245)).

The biggest drops were in debugging ability.

The researchers found six distinct AI interaction patterns.

Three of them involve cognitive engagement and preserve learning outcomes even when you receive full AI assistance.

The tool doesn't destroy understanding.

How you use it does.

You can also think of comprehension debt as a speed asymmetry problem.

AI generates code far faster than you can evaluate it.

When you write code, the review process is a bottleneck, but a productive one.

Reading the PR forces comprehension.

AI-generated code breaks that feedback loop.

The volume is too high.

The output is syntactically clean and superficially correct: exactly the signals that used to make you feel safe to merge.

Surface correctness isn't systemic correctness.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/77a64f748e0fd5af53a675fa2754a164) -->

```markdown
Add Redis caching to the UserRepository class.
```

## Good Prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/9105872c5785f00943d340a3c665df9f) -->

```markdown
Add Redis caching to the UserRepository class.

After you implement it:
1. Explain every non-trivial decision you made.

2. List the assumptions you made about cache expiration,
   key naming, and invalidation strategy.
   
3. Identify any load-bearing decisions: choices that,
   if wrong, would require a full rewrite.
   
4. Write one sentence per decision in decisions.md format
   so my team understands why the code works this way.
```

# Considerations ⚠️

Tests are necessary, but they aren't sufficient.

A test suite can only cover behavior you thought to specify.

Nobody writes a test for a behavior nobody imagined.

When the AI updates hundreds of tests to match new behavior, you must ask: "Were all those changes correct?"

Only comprehension can answer that question.

Tests can't.

[Specs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md) help, but they aren't a substitute for review.

A spec detailed enough to fully describe a program is more or less the program, written in a non-executable language.

Keep your AI context window short and your decisions file honest.

You document decisions, not transcripts.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

Comprehension checks add time to each PR.

Your team must agree to slow down a little to stay safe.

# Tags 🏷️

- Knowledge Management

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 019 - Tell the AI Why, Not Just What](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md)

# Conclusion 🏁

AI makes code cheap to generate.

It doesn't make understanding cheap to skip.

Every time you merge code you can't explain, you borrow from your future self.

You'll pay for comprehension sooner or later.

Pay it now, with curiosity.

# More Information ℹ️

[Comprehension Debt: The Hidden Cost of AI-Generated Code by Addy Osmani](https://addyosmani.com/blog/comprehension-debt/)

[How AI Impacts Skill Formation, Shen and Tamkin, Anthropic (arXiv 2601.20245)](https://arxiv.org/abs/2601.20245)

[Comprehension Debt on O'Reilly Radar](https://www.oreilly.com/radar/comprehension-debt-the-hidden-cost-of-ai-generated-code/)

[Mitigating Epistemic Debt in Generative AI-Scaffolded Programming (arXiv 2602.20206)](https://arxiv.org/pdf/2602.20206)

[AI Technical Debt Compounds: Augment Code Guide](https://www.augmentcode.com/guides/ai-technical-debt-compounds-spec-driven-development)

[![Watch the video](https://img.youtube.com/vi/yiOsikXaQ7c/sddefault.jpg)](https://youtu.be/yiOsikXaQ7c) 

# Also Known As 🎭

- Cognitive-Debt
- AI-Comprehension-Gap
- Invisible-Technical-Debt
- Epistemic-Debt

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)