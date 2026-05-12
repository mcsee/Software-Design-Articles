# AI Coding Tip 019 - Tell the AI Why, Not Just What

![AI Coding Tip 019 - Tell the AI Why, Not Just What](AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What.png)

*State your reasons before your prompt and the AI will solve the right problem.*

> TL;DR: Tell the AI your reason before your request to get solutions that match your real constraints.

# Common Mistake ❌

You send commands to the AI without context.

"Refactor this."

"Optimize this query."

"Add error handling."

The AI complies, but returns a generic (and probably hallucinated) solution that solves the average case, not your specific one.

You spend the next three messages correcting the trade-offs you never mentioned.

# Problems Addressed 😔

- The LLM has dozens of valid solutions for any request and picks the *most statistically common one* without [your context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md).

- You get correct (but wrong) results: technically valid code that doesn't fit your constraints.

- You iterate more than necessary because the AI guessed wrong about what mattered.

- The model makes trade-offs you didn't intend, favoring speed when you needed readability.

- When the AI doesn't know the constraint, it can't explain why it chose a specific approach.

# How to Do It 🛠️

1. Identify the real reason behind your request before you type it.

2. Add one sentence explaining the constraint or goal before your request.

3. Specify the limiting factor: performance, memory, audience, team skill level, or deadline.

4. Name the trade-off that matters most to you.

5. Include who will use or maintain the result.

6. Force yourself to enter [plan mode](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md) to reason together.

# Benefits 🎯

1. **Better Trade-offs:** The LLM navigates to solutions that match your actual constraints instead of the generic average.

2. **Fewer Iterations:** You get the right solution in the first attempt instead of correcting trade-offs after the fact.

3. **Principled Decisions:** The AI can explain why it chose a specific approach because it knows what you optimized for.

4. **Domain-Aware Results:** Context enables domain-specific patterns that generic requests never trigger.

5. **Smarter Refactoring:** [Research shows](https://seal-queensu.github.io/publications/pdf/IDE-Jonathan-2025.pdf) that adding motivation to refactoring requests improves success from 15.6% to 86.7%.

# Context 🧠

## Why the Why Changes Everything

For any given coding problem, the LLM can give you dozens of valid solutions.

Each trades off different qualities: speed vs. memory, readability vs. performance, simplicity vs. flexibility.

Without a reason, the model defaults to the most statistically common solution from its training data.

That solution works for the generic case.

It almost never matches your specific constraints.

When you add the why, the model reweights the entire solution space toward what matters to you.

"Refactor this function" and "Refactor this function because you are deploying to edge devices with 512MB RAM" activate completely different reasoning paths.

The second prompt forces the model to consider memory-efficient algorithms, smaller data structures, and lazy loading patterns.

More precise advice like "never use ellipses because this will be read by text-to-speech" is better than just "never use ellipses."

The same principle applies to every coding request.

When you [avoid comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md), you document only design decisions.

This is another example of why you need to add the why.

Modern models have more reasoning, and you can check the approach, not just the result.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/3f550bfe4a5aea909180b31d6cbad32a) -->

```markdown
Refactor this function
```

## Good Prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/ebdf2a812373af23ae503b8623402032) -->

```markdown
Refactor this function
because you are deploying to mobile devices
with limited memory (512MB RAM).

The trade-off that matters most
is memory usage over speed.

Many developers will maintain this code.
Keep it readable.

Avoid heavy data structures
or lazy-loading patterns
that require deep knowledge of the framework.
```

# Considerations ⚠️

One clear reason is enough.

You don't need to write a [long paragraph](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2075%20-%20Comments%20Inside%20a%20Method/readme.md).

The why should describe the constraint, not the implementation.

Don't confuse "why" with "what".

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

Adding context makes your prompts longer.

You need to know your own constraints before you can explain them to the AI.

Some requests genuinely have no specific constraint.

In those cases, the generic solution is fine.

# Level 🔋

[X] Beginner

# Tags 🏷️

- Prompt Engineering

# Related Tips 🔗

[AI Coding Tip 002 - Prompt in English](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20002%20-%20Prompt%20in%20English/readme.md)

[AI Coding Tip 005 - Keep Context Fresh](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md)

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

# Conclusion 🏁

Every coding problem has multiple valid solutions.

The AI picks the generic one unless you tell it which trade-off matters.

One sentence explaining your constraint shifts the model from solving the average problem to solving your exact problem.

Tell the AI why.

# More Information ℹ️

[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903)

[Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

[Prompting Best Practices - Claude API Docs](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

[LLM-Driven Code Refactoring: Opportunities and Limitations](https://seal-queensu.github.io/publications/pdf/IDE-Jonathan-2025.pdf)

[Best Practices for Prompt Engineering with the OpenAI API](https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api)

# Also Known As 🎭

- Reason-Driven-Prompting
- Constraint-First-Prompting
- Motivation-Aware-Prompting

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)
