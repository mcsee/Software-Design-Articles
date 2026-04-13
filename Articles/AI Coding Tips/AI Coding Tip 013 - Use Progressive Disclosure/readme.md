# AI Coding Tip 013 - Use Progressive Disclosure

![AI Coding Tip 013 - Use Progressive Disclosure](AI%20Coding%20Tip%20013%20-%20Use%20Progressive%20Disclosure.png)

*Structure your skills so the AI loads only the files it needs. Split complexity across modular files and use keywords to trigger conditional loading.*

> TL;DR: You reduce token usage when you trigger conditional loading instead of loading all files at once.

# Common Mistake ❌

You load a complex skill with 20 associated files into your [context window](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md) all at once.

Your context window fills up immediately.

You waste tokens on irrelevant file content and cases that don't match what you're asking.

The AI gets lost in noise and disobeys your commands. 

You can't ask follow-up questions because there's no space left, and hallucinations happen.

# Problems Addressed 😔

- You waste tokens loading [skill files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) you don't need
- The AI reads case definitions that don't apply to your input
- Context window fills up before you can iterate or ask follow-ups
- Response time slows down because the AI is overwhelmed
- You lose precision when the AI picks the wrong file or rule

# How to Do It 🛠️

1. Split your skill into multiple files (one per concern)
2. Write a smart description with clear conditional triggers
3. Define keywords that trigger file loading
4. Create conditional rules: "If input contains X, load file Y."
5. Include response templates so the AI knows how to structure answers
6. Nest file references only when needed (e.g., array.md loads *nested.md* only for nested arrays)
7. Test your keywords to ensure the AI picks them up correctly

# Benefits 🎯

The AI loads only the files it needs. 

You save 90% of tokens on irrelevant skill content. 

Response times stay fast even with complex skills.

Your context window stays clean for follow-up questions. 

Each request is precise because the AI only sees rules that matter.

# Context 🧠

Agentic skills can be massive.

A syntax validator might have files for declarations, arrays, nested arrays, function calls, and scripts.

If you load all of them, the AI wastes tokens reading rules that don't apply.

[Progressive disclosure](https://agentskills.io/what-are-skills#how-skills-work) in skills works by defining keywords that trigger file loading.

When you write "DECLARE 123", the skill recognizes the DECLARE keyword and loads declaration.md.

The AI only reads what matters.

You write descriptions using "What," "When," or "How" patterns.

You create conditional rules in your main skill file.

You include response templates so answers stay consistent.

The AI requests what it needs using keywords, so you don't have to guess.

## How Skills Work 🔄

Skills implement progressive disclosure at three stages:

**Discovery**: At startup, agents load only the name and description of each available skill.

Just enough information to know when a skill might be relevant.

No full instructions, no referenced files, no code—only the metadata.

**Activation**: When a task matches a skill's description, the agent reads the full *SKILL.md* instructions into context.

Now the agent has the complete instructions and knows what to do.

Still no unnecessary files or code loaded yet.

**Execution**: The agent follows the instructions, optionally loading referenced files or executing bundled code as needed.

Only when the AI detects it needs something does it load that file or run that script.

This approach keeps agents fast while giving them access to more context when they actually need it.

Each step is triggered by actual need, not preloaded upfront.

## Prompt Reference 📝

### Bad Prompt:

<!-- [Gist Url](https://gist.github.com/mcsee/19429244a643795ae53a059584c51237) -->

```markdown
# SKILL.md (15,000 tokens - Monolithic)

Validates DECLARE, arrays, nested arrays,
function calls, loops, all in one file.

DECLARE Rules:
- First char uppercase
- Can't start with a number

Array Rules:
- Use square brackets [item]
- Examples: [foo], [bar]

Function Call Rules:
- Parentheses required: func()
- Parameters separated by commas

Loop Rules:
- FOR, WHILE, DO keywords
- Body must be indented
```

When you ask "Is DECLARE 123 valid?" the AI loads all 15,000 tokens covering every rule.

Context window fills up fast.

### Good Prompt:

<!-- [Gist Url](https://gist.github.com/mcsee/6588cf4f42df0b6e9e8a1fd0b437d170) -->

```markdown
# SKILL.md (800 tokens - Modular)

Validates foo syntax: DECLARE, arrays,
nested arrays, function calls, loops.

Rules:
- DECLARE detected → load declaration.md
- detected → load array.md
- detected → load function-call.md

Template: [input] valid?
[YES/NO]. Reason: [rule].

**declaration.md** (1,200 tokens):

First character must be uppercase.
Cannot start with a number.
Examples: DECLARE x, DECLARE foo

**array.md** (1,500 tokens):

Must use brackets: [item]
References nested-array.md for [x]
Examples: [foo], [bar], [123]

3 Files total (could be more)
```

When you ask "Is DECLARE 123 valid?", the AI loads only *SKILL.md* (800) + declaration.md (1,200) = 2,000 tokens.

Context stays clean for follow-up questions.

# Considerations ⚠️

Define your keywords upfront so the AI recognizes them consistently. 

Each file should handle one concern (declarations, arrays, etc.).

Don't create too many nested references or the loading chain becomes confusing. 

Test your keyword patterns to make sure the AI recognizes them.

If your skill includes scripts, review them carefully. 

Scripts can create security risks if they run without review.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

Progressive disclosure works best when keywords are distinctive. 

Generic words like "function" might trigger too often and load the wrong file.

Deeply nested file structures (3+ levels) are confusing to maintain. 

External scripts need a security review before you share skills from online repositories. 

Keywords must be clear, or the AI loads files unpredictably.

# Tags 🏷️

- Standards

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 001 - Commit Before Prompt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md)

[AI Coding Tip 005 - Keep Context Fresh](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md)

[AI Coding Tip 009 - Compact Your Context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md)

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

# Conclusion 🏁

Progressive disclosure in skills means splitting files by concern and using keywords to trigger conditional loading. 

You define what the AI needs to see, not dump everything.

Include templates so responses stay consistent.

When you get good at this pattern, even complex skills stay fast, efficient, and focused. 🎯

# More Information ℹ️

[Agent skills progressive disclosure](https://agentskills.io/what-are-skills#how-skills-work)
 
[Context Windows and Token Limits](https://docs.anthropic.com/en/docs/about-claude/models/overview) 

[UX Progressive Disclosure at Wikipedia](https://en.wikipedia.org/wiki/Progressive_disclosure) 
 
[Efficient Prompt Design](https://platform.openai.com/docs/guides/prompt-engineering)

[API Cost Optimization](https://docs.anthropic.com/en/docs/about-claude/models/overview)

[Code Context Patterns](https://arxiv.org/abs/2304.08134)

[![Watch the video](https://img.youtube.com/vi/DQHFow2NoQc/sddefault.jpg)](https://youtu.be/DQHFow2NoQc) 

[![Watch the video](https://img.youtube.com/vi/hTKhLgRcAys/sddefault.jpg)](https://youtu.be/hTKhLgRcAys) 

# Also Known As 🎭

- Layered context disclosure
- Just-in-time information architecture
- Context-on-demand

# Tools 🧰

- Windsurf with [progressive disclosure](https://docs.windsurf.com/windsurf/cascade/skills)
- GitHub Copilot with skills
- Claude with custom skills
- VS Code Copilot Chat
- Agentic frameworks
- Token counter tools

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

***

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)
