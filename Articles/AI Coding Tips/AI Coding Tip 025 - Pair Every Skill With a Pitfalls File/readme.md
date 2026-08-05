# AI Coding Tip 025 - Pair Every Skill With a Pitfalls File

![AI Coding Tip 025 - Pair Every Skill With a Pitfalls File](AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File.png)

*The happy path isn't enough.*

> TL;DR: Add a PITFALLS.md next to every SKILL.md so your AI never repeats the same mistake twice.

# Common Mistake ❌

You write a great [SKILL.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md).

The AI follows it well most of the time.

Then it does something wrong.

You correct it in the conversation.

Next [session](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md), the AI does the same wrong thing again.

You never wrote it down.

# Problems Addressed 😔

- Hard-won corrections disappear when the [session ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md)

- Your SKILL.md grows noisy when you add every edge case to it

- The AI repeats the same mistakes across [sessions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md)

- Silent errors look correct until they cause real damage

- You spend time re-teaching lessons you already taught

# How to Do It 🛠️

1. Create a `PITFALLS.md` file in the same folder as your `SKILL.md`.

2. After each [session](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md), add one entry for each thing the AI got wrong.

3. Write each entry with three parts: the trigger, the wrong behavior, and the correct behavior.

4. Reference `PITFALLS.md` from your `SKILL.md` so the AI reads it at the start of every session.

5. Treat it as append-only: never delete entries, only add new ones.

6. Keep the happy path and the pitfalls apart.

# Benefits 🎯

1. **Clean separation:** Your SKILL.md stays focused on the happy path while PITFALLS.md handles the exceptions.

2. **Accumulated memory:** The AI starts every session knowing what failed before, without you repeating it.

3. **Faster iteration:** You stop re-explaining corrections you've already made.

4. **Explicit dark knowledge:** You write down [lessons that lived only in your head](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md).

5. **Compounding improvement:** Your skills get better with every mistake the AI makes, not worse.

6. **Skill brevity:** You keep the skill short and focused, with [progressive disclosure](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20013%20-%20Use%20Progressive%20Disclosure/readme.md) loading pitfalls only as a [final checklist](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md).

# Context 🧠

SKILL.md tells the AI what to do.

PITFALLS.md tells the AI what not to do.

They're complementary, not competing.

Anthropic's own [skill authors](https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills) describe the pitfalls section as "the highest-signal content in any skill."

When that section grows too large to stay inside SKILL.md, it earns its own file.

Think of PITFALLS.md as the scar tissue that lives next to the blueprint.

The same way you [initialize an AGENTS.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md) for a project, you pair every skill with its failure log.

When you [use modular skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md), each skill gets its own folder.

That [folder](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md) is the right place for PITFALLS.md.

> Remember a Skill is a folder with documentation and scripts, not a single file.

The same instinct drives [feeding pull request lessons back into the AI brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain/readme.md): you capture what went wrong so the AI doesn't repeat it.

PITFALLS.md applies that exact pattern to individual skills.

[Each skill builds its own second brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md) of failure memory.

This principle has a long history in good programming practices.

The [same separation principle applies to code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md): keep your normal flow in one place and your exceptional cases in another.

Mixing them creates noise, hides intent, and makes maintenance harder.

SKILL.md and PITFALLS.md apply that discipline to AI instructions.

Many AI Coding Tips find their roots in established programming principles.

When you [separate concerns](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md) in your code, you separate them in your prompts too.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/6792e5e5193934a92c5ec32687afd8a4) -->

```markdown
Write a SKILL.md for validating markdown articles.
Check for required sections and formatting rules.
If something's wrong, we'll fix it in the chat.
```

## Good Prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/37a86604da87e8e538ef08ec1d50016e) -->

```markdown
Write a SKILL.md for validating markdown articles.
Check for required sections and formatting rules.

Also create a PITFALLS.md in the same folder.
Add this first entry:

## Don't use regex to count H2 sections
Trigger: counting sections by heading level
Wrong: regex-based heading detection (/^##/m)
Correct: match section names explicitly by string
Reason: code blocks with # fool regex heading counters

Reference PITFALLS.md at the top of your SKILL.md.
The AI loads it at the start of every session.
```

# Considerations ⚠️

Keep each entry short: trigger, wrong behavior, correct behavior.

Don't delete entries.

Even solved pitfalls can come back after a skill update.

Review PITFALLS.md when you update SKILL.md to check if any entries became obsolete.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

PITFALLS.md only helps if the AI reads it.

Always reference it explicitly inside your SKILL.md so the AI loads it automatically.

# Level 🔋

[X] Intermediate

# Tags 🏷️

- Knowledge Management

# Related Tips 🔗

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

[AI Coding Tip 005 - Keep Context Fresh](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md)

[AI Coding Tip 011 - Initialize Agents.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md)

[AI Coding Tip 013 - Use Progressive Disclosure](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20013%20-%20Use%20Progressive%20Disclosure/readme.md)

[AI Coding Tip 016 - Feed Your PR Lessons into the AI Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain/readme.md)

[AI Coding Tip 020 - Create a Second Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md)

[AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md)

# Conclusion 🏁

Your SKILL.md is the blueprint.

Your PITFALLS.md is the scar tissue.

You need both.

# More Information ℹ️

[Lessons from building Claude Code: How we use skills](https://claude.com/blog/lessons-from-building-claude-code-how-we-use-skills)

[Designing, Refining, and Maintaining Agent Skills at Perplexity](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity)

[Code Smell 73 - Exceptions for Expected Cases](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md)

# Also Known As 🎭

- Negative-Knowledge-File
- Skill-Shadow-File
- Failure-Memory-Companion
- Anti-Pattern-Log

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
