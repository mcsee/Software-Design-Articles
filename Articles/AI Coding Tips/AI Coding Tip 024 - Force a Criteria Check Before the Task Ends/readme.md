# AI Coding Tip 024 - Force a Criteria Check Before the Task Ends

![AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends.png)

*Don't let the AI grade its own homework.*

> TL;DR: Spawn a fresh subagent after every task to check your rules, because the AI that did the work can't audit itself.

# Common Mistake ❌

You write a detailed [AGENTS.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md) with strict mandatory rules.

The AI reads the file, completes the task, and reports: "Done. I followed all the rules."

You trust the report.

It didn't check.

It assumed.

That's hallucinated compliance, and it's the default behavior of every AI agent that grades its own work.

# Problems Addressed 😔

- The AI that did the work is anchored to what it intended to do, not what it actually did.

- Self-reporting has no enforcement mechanism, so the agent marks PASS and moves on.

- Mandatory rules in your [skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) get skipped silently, and the AI won't tell you it skipped them.

- You discover violations after [merging or deploying](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md), not during the task.

- The same context window that holds the task also holds the compliance report, which means the AI isn't truly auditing itself.

- Hallucinated compliance causes real frustration when you discover violations the AI already reported as passing.

# How to Do It 🛠️

1. At the bottom of your AGENTS.md or skill, add an explicit instruction to spawn a verification subagent after the main task finishes.

2. Pass the subagent the path to every modified file and the full list of mandatory rules.

3. Instruct the subagent to read the files fresh and check each rule line by line.

4. Require the subagent to produce a checklist table with one row per rule, a PASS or FAIL status, and the exact evidence for each item.

5. Block task completion on any FAIL. Fix the violation before declaring done.

6. Restrict the subagent to [read-only tools](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md) (Read, Grep, Glob) so it can't change anything while auditing.

7. Encapsulate the verification checklist in a dedicated [validator skill](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) so every task can reuse the same rules without duplicating them.

# Benefits 🎯

1. **Independent verification:** A fresh subagent has no memory of making the changes, so it audits without bias.

2. **Forces real reading:** The subagent must open the actual files and search for violations instead of assuming.

3. **Catches hallucinated compliance:** The subagent can't mark a rule PASS without showing the exact evidence it found.

4. **Repeatable audit:** You get the same check after every task without extra prompting.

5. **Safe auditing:** A read-only subagent can't accidentally modify the code it's reviewing.

6. **Reduces frustration:** You stop discovering rule violations after the task is marked done, because the subagent already caught them before you moved on.

# Context 🧠

## The Builder Can't Be the Auditor

AI models don't naturally separate "doing" from "verifying."

When you ask the same agent that built a feature to confirm it [followed the rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md), it re-reads its own output through the lens of what it intended to do.

Not what it actually did.

The fix is the same one used in software testing: separate the builder from the auditor.

A subagent spawned after the task finishes starts with a [clean context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md).

It reads the skill rules fresh.

It opens the actual files instead of relying on memory.

This is why QA engineers exist.

The person who wrote the code shouldn't be the only one who tests it.

The risk of hallucinated compliance grows with task complexity.

A three-step task is easy to self-verify.

A 20-rule [nested AGENTS.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md) with dozens of file changes isn't.

Some skills already enforce this pattern.

The ai-coding-tip-validator spawns a mandatory post-completion audit subagent after every validation session, which reads the SKILL.md files fresh and verifies each mandatory rule against the final article state.

Think of this as a [harness for the AI's output](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md).

The harness doesn't restrict what the AI can do.

It verifies the output meets your criteria before you act on it.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/2a64ca0cb0510acaaf42b66c0882a718) -->

```markdown
Refactor the SingletonController class 
following all the rules in AGENTS.md.

When you're done, tell me you followed every rule.
```

## Good Prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/70ee1fbc0ab039b57ef2e08e427b0b4a) -->

```markdown
Refactor the SingletonController following all rules in AGENTS.md.

After you finish, spawn a subagent with this task:

"Read the modified file at src/Controller.php.

Read every rule marked MANDATORY, CRITICAL, or REQUIRED

from AGENTS.md.

For each rule, verify the file directly. Don't rely on memory.

Produce a table with one row per rule:
| # | Rule | Status | Evidence |
|---|------|--------|----------|

Mark PASS with the exact line you found as proof.
Mark FAIL with the exact violation.

Only use Read, Grep, and Glob tools.
Don't change any files."

Block completion until the subagent reports all PASS.
```

# Considerations ⚠️

Running a verification subagent adds one step per task.

Keep the checklist short and explicit.

Vague rules produce vague audits.

A subagent can only verify what it can read.

If your rule depends on runtime behavior, mark it as requiring manual verification.

Don't use the audit subagent as a substitute for well-written rules.

Fix broken rules in AGENTS.md instead of patching them at audit time.

Pair this pattern with [small, focused tasks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20023%20-%20Shrink%20your%20AI's%20Pull%20Request/readme.md).

A 3-file change is much easier to audit accurately than a 20-file change.

# Type 📝

[X] Automatic

# Limitations ⚠️

This pattern requires an AI with agentic capabilities that can spawn subagents.

Tools that support it include Claude Code, Cursor, Devin, and GitHub Copilot Workspace.

Standard chat interfaces (ChatGPT, Claude.ai in non-agent mode) can't use this pattern.

A subagent audit only covers what the rules explicitly state.

Implicit expectations don't appear in the checklist.

A complex AGENTS.md with 50+ rules may cause the subagent to hit context limits.

Break large rule files into [smaller focused files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md).

This pattern adds latency.

On time-sensitive tasks, you may choose to audit only the rules that are hardest to self-verify.

# Level 🔋

[X] Intermediate

# Tags 🏷️

- Safety

# Related Tips 🔗

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

[AI Coding Tip 005 - Keep Context Fresh](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 014 - Use Nested AGENTS.md Files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md)

[AI Coding Tip 015 - Force the AI to Obey You](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md)

[AI Coding Tip 022 - Give AI a Harness to Work With](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md)

# Conclusion 🏁

The AI that did the work is the worst candidate to verify it followed the rules.

Spawn a fresh subagent after every task.

Give it the checklist and the output files.

Make it read the files, not its memory.

PASS or FAIL. No self-reporting.

# More Information ℹ️

[Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)

[Attention Is All You Need](https://arxiv.org/abs/1706.03762)

[Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

[Claude Prompt Engineering Best Practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)

[OpenAI Best Practices for Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)

# Also Known As 🎭

- Post-Task-Compliance-Audit
- Separation-of-Builder-and-Auditor
- Subagent-Verification-Pattern
- Rule-Enforcement-Checkpoint

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
