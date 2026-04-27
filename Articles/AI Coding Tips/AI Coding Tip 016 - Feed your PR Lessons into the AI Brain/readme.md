# AI Coding Tip 016 - Feed Your PR Lessons into the AI Brain

![AI Coding Tip 016 - Feed Your PR Lessons into the AI Brain](AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain.png)

*Your PR descriptions are training data for your future self, and for every agent after you.*

> TL;DR: Improve the AI tools, rules, skills, and workflows you use in every pull request so your team and future agents can learn, reproduce, and improve on every change.

# Common Mistake ❌

You write clean code.

The AI helps you ship fast after it understands [all your context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md), and you merge the PR.

You write "Fix bug" as the description.

Two weeks later, nobody knows what prompt produced that fix, which [SKILL.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) was active, or why you chose that approach over the alternative.

Not your teammates.

Not a new AI agent.

Not you.

The AI's reasoning evaporates the moment you close the chat.

# Problems Addressed 😔

- You lose the exact prompt that produced a working solution and can't reproduce it.
- Future [agents](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md) start from zero on every PR instead of building on past decisions.
- AGENTS.md, SKILL.md, and rules stay generic because nobody tracks which ones actually worked.
- Onboarding new developers (or new agents) takes longer because context lives nowhere.
- You repeat the same debugging cycles because you never wrote down what failed first.
- The team can't measure whether AI assistance improves over time.
- Code reviews become guesswork when reviewers can't see the AI's reasoning.
- You miss chances to promote a one-off good prompt into a permanent SKILL.md.

# How to Do It 🛠️

1. **Add an "AI Context" section to every PR description:** Write which agent or tool you used (Claude Code, Copilot, Cursor, Windsurf) and the model version.

2. **Paste or link the key prompt:** You don't need the full conversation.

   Include the decisive prompt that unlocked the solution.

3. **List the active configuration files:** Name every SKILL.md, AGENTS.md section, RULES file, or WORKFLOW.md that shaped the output.

4. **Note what the AI got wrong first:** Write one line about the failed attempt before the correct solution.

   This is the most valuable information your future self will read.

5. **Flag any manual correction you applied:** If you edited the AI output, say so and say why.

   This is feedback your team can turn into a new rule.

6. **Update AGENTS.md as part of the PR:** If the code change revealed a missing rule or a better workflow step, add it immediately, while context is still fresh.

7. **Update or create SKILL.md entries:** If you invented a reusable prompt pattern, extract it into a skill file so every future agent can use it.

8. **Tag the PR with an "ai-assisted" label:** This lets you filter and audit AI-assisted changes later for quality review.

9. **Review AI-trace PRs in retros:** Once a sprint, pick two PRs with rich AI context and ask what rule or skill you should add.

10. **Ask the LLM to update what it learned:** Write a final prompt for the AI to update its own knowledge.

# Benefits 🎯

1. **Reusable learning units:** Every PR becomes a lesson agents can read and reuse.
2. **Living AGENTS.md:** Your rules file grows richer with each merged change instead of staying a static document nobody updates.
3. **Shorter feedback loop:** You compress the gap between a good prompt and a reusable [skill](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md).
4. **Clearer onboarding:** New developers understand *why* code looks the way it does, not just *what* it does.
5. **Built-in audit trail:** You track AI-assisted decisions without extra tooling.
6. **Measurable AI effectiveness:** Teams can see which skills produce the fewest corrections.
7. **Smarter future agents:** Every agent inherits your project's accumulated knowledge instead of starting blind.
8. **Faster code reviews:** Reviewers read explicit context instead of guessing.

# Context 🧠

AI agents don't share memory across sessions by default.

Every new task starts with a blank slate unless you give them written context.

AGENTS.md, SKILL.md, and WORKFLOW.md files solve this for project-level knowledge.

Pull requests solve it for *change-level* knowledge.

Think of a PR as a commit message for your AI reasoning.

A commit message records *what* changed.

An AI-trace PR description records *how* and *why* the AI reached that solution.

Teams that treat PRs as AI learning artifacts get better over time: each merged change makes the next AI session smarter.

This matches the continuous improvement loop from lean manufacturing (kaizen) applied to AI-assisted development.

You inspect every unit of work, identify waste (bad prompts, missing rules), and standardize the improvement (new skill, updated workflow).

# Prompt Reference 📝

### Bad PR Description:

<!-- [Gist Url](https://gist.github.com/mcsee/5f4bcfe32624177db8df99e4637d1ce8) -->

```markdown
Fixed the payment bug

[x] Fixed the null check
[x] Tests pass

 - if ($payment !== null) {
 -     $payment->process();
 - }
 + if ($payment !== null && $payment->isValid()) {
 +     $payment->process();
 + }

// No AI context. No prompt. No record of what failed first.
// The next agent reads this diff and learns nothing.
```

### Good PR Description:

<!-- [Gist Url](https://gist.github.com/mcsee/2a573fe0c7b698cbd676ea561cfe774a) -->

```markdown
Fixed PaymentProcessor null check with Null Object pattern

**AI Context**
Tool    : Claude Code (claude-sonnet-4-20250514)
Skill   : /skills/php-clean-code.md §3
Rules   : /AGENTS.md#error-handling
Workflow: /workflows/refactor-feature.md
Prompt  : "Refactor PaymentProcessor using the
           Null Object pattern instead of null
           checks. Follow AGENTS.md conventions."

**What the AI tried first**
Inline null guard. Rejected — violates AGENTS.md
rule on conditionals.

**Manual correction applied**
Renamed NullPayment to NullPaymentMethod to match
domain vocabulary. Added to AGENTS.md#naming.

payment.ts
 - if ($payment !== null) {
 -     $payment->process();
 - }
 + $payment->process();

AGENTS.md

 ## error-handling
  - Don't use null checks inline.
  - Use guard clauses only at system boundaries.
 + - Replace null checks with Null Object pattern.
 + - Null Objects live in /src/NullObjects/.
 + - Null Object class names follow NullX convention.

skills/clean-code.md
## Null Handling
- - Avoid null returns when possible.
+ - Never check for null inside domain logic.
+ - Inject a Null Object instead.
+ - Example: NullPaymentMethod implements PaymentMethod.
+ - Prompt: "Replace null check in X with a Null Object
+    that implements the same interface."
```

# Considerations ⚠️

Keep the AI Context section short.

Three to five lines are enough.

You document it, not transcribe it.

Sensitive business logic in prompts needs the same care as any other PR content.

Your repo's access policy applies.

Not every PR needs full AI tracing.

A one-line typo fix doesn't.

A non-trivial refactor or new feature always does.

Don't paste the entire conversation.

Extract the signal: the decisive prompt and the first failed attempt.

AGENTS.md updates from PR traces should go through review like any other code change.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

- This practice requires team discipline.
- One developer skipping it breaks the knowledge chain.
- AI tools that don't expose prompt history make extraction harder.
- Use tools that let you copy the context.
- Large monorepos with many SKILL.md files need a naming convention so PR references stay unambiguous.
- You can't retroactively trace PRs merged before you adopted this practice.
- Start from today and move forward.

# Tags 🏷️

- Standards

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 011 - Initialize Agents.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md)

[AI Coding Tip 014 - Use Nested AGENTS.md Files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md)

# Conclusion 🏁

Pull requests aren't just code snapshots.

They're the cheapest knowledge transfer mechanism your team has.

When you log the prompt, the active skills, the rules, and the first failure alongside the final diff, you turn every merged change into a lesson.

Your AGENTS.md improves.

Your SKILL.md library grows.

Your next AI session starts smarter than the last.

Stop letting AI reasoning disappear at merge time. 🧠

# More Information ℹ️

[GitHub: Writing good pull request descriptions](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/getting-started/best-practices-for-pull-requests)

[Conventional Commits: Structured commit messages](https://www.conventionalcommits.org/)

[ADR: Architecture Decision Records as a model for AI traces](https://adr.github.io/)

# Also Known As 🎭

- AI-Aware-Pull-Requests
- Prompt-Traced Code Reviews
- AI-Knowledge-Commits

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)