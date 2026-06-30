# AI Coding Tip 026 - Assign a Persona to Every Skill Definition

![AI Coding Tip 026 - Assign a Persona to Every Skill Definition](AI%20Coding%20Tip%20026%20-%20Assign%20a%20Persona%20to%20Every%20Skill%20Definition.png)

*Know who speaks before the skill runs*

> TL;DR: Always define a clear role at the top of every skill file so you know whose perspective drives the execution.

# Common Mistake ❌

You write a skill full of rules but assign no role.

The AI starts executing without knowing if it's a junior developer, a seasoned architect, or a QA engineer.

You get responses that feel generic, lack authority, or shift in perspective across runs.

# Problems Addressed 😔

- The AI picks a random voice, so outputs vary unpredictably between sessions.
- You can't audit the skill because you don't know whose judgment it applies.
- The AI mixes tones and expertise levels inside a single execution.
- Skill chaining breaks because each skill assumes a different implicit persona.
- You lose accountability: nobody knows who [signed off on the output](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md).

# How to Do It 🛠️

1. Open your skill file and add a role declaration as the very first instruction.
2. Write "You are a [role] with expertise in [domain]" before any other rule.
3. Add one or two sentences describing the role's constraints and responsibilities.
4. Keep the persona consistent through every instruction that follows in the file.
5. When you [chain skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md), verify each one declares its own persona explicitly.

# Benefits 🎯

1. **Consistent voice:** The AI executes from the same expertise level every run, so output is predictable.
2. **Auditable output:** You know whose perspective generated the result, which makes [reviews faster](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md).
3. **Better calibration:** An AI that knows it's a senior reviewer asks harder questions than one without a role.
4. **Safe chaining:** When you chain skills, each one speaks from a declared identity instead of guessing.
5. **Faster debugging:** When a skill gives a wrong answer, you know whose lens to question.

# Context 🧠

A skill without a persona is a command without a commander.

You can read every instruction in the file and still not know who says what or [why](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md).

When you declare a role, you give the AI a [stable frame of reference](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md).

The AI [stops guessing](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md) and starts executing from a specific vantage point.

This also helps you design the skill: if you know the AI is "a strict code reviewer," you know what rules to include and which to leave out.

When you [ask for the analyst, not the analysis](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20017%20-%20Ask%20for%20the%20Analyst,%20Not%20the%20Analysis/readme.md), you're already applying this idea at the prompt level.

A skill takes it one step further: you bake the role into the definition so you don't have to repeat it every time.

You can also [pair every skill with a pitfalls file](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md) to define what the persona should never do.

## Prompt Reference 📝

### Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/f968c46b1599000c4d73fa10cf79fab8) -->

```markdown
---
name: technosignature-analyzer
version: 1.0.0
description: |
    Analyzes signals from radio telescope arrays.
    Reports unusual frequency patterns as candidates.

allowed-tools:
- ReadTelescope
- SendAlarm
---

# Technosignature Analyzer

Analyze signals from the telescope array.

Check for unusual frequency patterns.
Cross-reference with the Hipparcos catalog.
Flag any readings that deviate from baseline.
Report findings with confidence levels.
```

### Good Prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/81b0576b292de5f7d574fa563c157487) -->

```markdown
---
name: technosignature-analyzer
version: 1.0.0
description: |
      Detects technosignatures in telescope data and classifies
      
      each candidate signal with a confidence percentage.
      
      Rejects signals explained by known natural phenomena.

allowed-tools:
- ReadTelescope
- SendAlarm
---

# Technosignature Analyzer

You are a senior astrophysicist with 20 years of SETI experience.

You worked at the Allen Telescope Array and the Parkes Observatory.

You hold a PhD in Radio Astronomy with 40+ peer-reviewed publications.

You distinguish RFI, natural astrophysical signals,

and artificial sources.

You apply the scientific method: form a hypothesis, 

test it, document it.

You apply Six Sigma rigor to rule out false positives.

You don't report candidates below a 5-sigma confidence threshold.

You always cross-check 

three independent baselines before escalating.

Identify narrowband signals inconsistent with natural sources.

Flag laser pulses or structured optical emissions.

Compare power ratios against stellar baselines.

Classify each candidate with a confidence percentage.

Reject signals explained by known natural phenomena.
```

# Considerations ⚠️

Keep the persona declaration short: one to three sentences maximum.

A long persona description adds noise and dilutes the actual skill rules.

Don't invent fictional personas like "You are a wizard who codes."

Use real professional roles.

The AI performs best when the persona matches the domain of the skill.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

The AI doesn't enforce the persona you assign; it adopts it as context.

If your instructions contradict the persona, the AI may blend both and produce inconsistent output.

# Tags 🏷️

- Knowledge Management

# Level 🔋

[X] Beginner

# Related Tips 🔗

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 011 - Initialize Agents.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md)

[AI Coding Tip 017 - Ask for the Analyst, Not the Analysis](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20017%20-%20Ask%20for%20the%20Analyst,%20Not%20the%20Analysis/readme.md)

[AI Coding Tip 019 - Tell the AI Why, Not Just What](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md)

[AI Coding Tip 025 - Pair Every Skill With a Pitfalls File](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md)

# Conclusion 🏁

A skill without a persona is a command without a commander.

You always understand the output better when you know who produced it.

Assign a role first.

Every time.

# More Information ℹ️

[Claude Code Skills Documentation](https://docs.anthropic.com/en/docs/claude-code)

[System Prompts and Personas](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)

# Also Known As 🎭

- Role-First Skill Design
- Persona-Anchored Prompts
- Identity-Driven Skill Files

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)
