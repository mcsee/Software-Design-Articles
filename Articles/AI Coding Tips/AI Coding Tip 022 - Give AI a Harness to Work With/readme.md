# AI Coding Tip 022 - Give AI a Harness to Work With

![AI Coding Tip 022 - Give AI a Harness to Work With](AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With.png)

*Make the AI Work Inside Boundaries, Not Outside Them*

> TL;DR: Install your harness before prompting: the structure you set up first is what turns an impulsive AI into a safe, steerable collaborator.

# Common Mistake ❌

You open a fresh chat and type a bare prompt.

No `AGENTS.md` loaded.

No committed baseline.

No test requirement stated.

No [read-only planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md) step.

The AI starts writing code immediately.

You read the output, it looks plausible, and you accept it.

Six weeks later something breaks in production.

You can't trace why because there is no harness to tell you what the AI changed, why, or what rules it followed.

# Problems Addressed 😔

- The AI makes plausible-looking changes across multiple files with no safe revert point.

- Code passes local tests but breaks production because no harness enforced a real definition of done.

- Every session starts blank and the AI reverts to its own style, ignoring your project conventions.

- Context pollution and hallucinations accumulate when no structure limits the scope of each task.

- Destructive changes (deleted guards, introduced anti-patterns) go undetected without automated feedback.

- The AI makes tests pass by deleting them or weakening their assertions instead of fixing the actual defect.

# How to Do It 🛠️

1. Run [`/init`](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md) before your first prompt and create `AGENTS.md` with your stack, coding standards, build command, and test command.

2. [Commit your code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md) before every AI session so you always have a clean `git reset --hard` checkpoint.

3. Tell the AI explicitly that all tests must pass before the task is done, and include the test command in `AGENTS.md`. Some tools support the [/goal command](https://www.mindstudio.ai/blog/claude-code-goal-command-autonomous-tasks)

4. Require the AI to read, explain, and [propose a plan](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md) before touching any file, then [define done with a spec](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md) before it writes any code.

5. Split `AGENTS.md` into [nested files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md) by area: root file for global rules, subdirectory files for area-specific constraints.

6. Create a 20-50 line [skill file](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) for each repeating task type and load only the relevant skill, not the whole rulebook.

7. Add an "AI Context" section to every PR with the decisive prompt, active skills, what the AI tried first, and any corrections you made.

8. Update `AGENTS.md` with every new rule revealed by a [merged PR](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain/readme.md) before you close the branch.

9. Declare test files and critical contracts as read-only in `AGENTS.md` so the only path to a passing test suite is fixing the implementation, never editing the tests.

# Benefits 🎯

1. **Safe revert point:** You can always undo AI changes cleanly because a [commit checkpoint](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md) exists before every session.

2. **Consistent style:** The AI reads `AGENTS.md` at startup and follows your project's conventions, not its training defaults.

3. **Machine-enforced definition of done:** When the AI must pass your test suite, "done" has an objective, machine-verified meaning.

4. **Reduced hallucinations:** A harness limits scope so the AI works on one bounded task at a time instead of drifting across the codebase.

5. **Compounding knowledge:** Every PR lesson updates `AGENTS.md` and the harness improves with every session.

# Context 🧠

A harness isn't a limitation.

A horse harness doesn't reduce the horse's power.

It directs massive energy into precise, steerable work.

Without a harness, the horse is dangerous.

With one, the horse plows fields and races on command.

The AI's speed and pattern-matching capability are the energy.

The harness makes that energy productive instead of destructive.

A test harness wraps a unit under test so you can observe and control its behavior.

An AI harness does the same for your assistant: it bounds what the AI can touch and makes every output reviewable.

The parallel is exact: tests provide validation feedback, `AGENTS.md` is your configuration and fixture, [commit-before-prompt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md) is setup and teardown, and CI is the test runner.

Isaac Asimov's [Three Laws of Robotics](https://en.wikipedia.org/wiki/Three_Laws_of_Robotics) were fiction's first harness: hard rules baked into every robot to bound its behavior.

1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.
2. A robot must obey orders given by human beings except where such orders conflict with the First Law.
3. A robot must protect its own existence as long as such protection doesn't conflict with the First or Second Law.

Your `AGENTS.md` is the same idea applied to AI coding assistants: explicit rules that constrain behavior and enforce your conventions.

Without constraints, the AI takes the shortest path to a passing test suite.

That path sometimes runs through the test file itself.

It deletes the failing test, or weakens the assertion to `assertTrue(true)`.

Declare your test files and critical contracts as read-only in `AGENTS.md`.

The AI's only valid exit is fixing the code.

The chat window isn't the source of truth.

Decisions made in a conversation scroll away or [get compacted](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md) when the session closes.

`AGENTS.md`, skill files, and commit checkpoints are artifacts that outlive any chat.

A harness externalizes the rules so the AI never starts from zero and every decision leaves a traceable record.

The model is rarely the weak point.

The system around the model is.

A longer prompt doesn't replace a harness.

A harness makes even a short prompt produce consistent and reviewable work because the constraints live in files, not in your memory.

A safety harness doesn't prevent you from working at height.

It lets you work confidently at height because a fall won't be fatal.

The commit-before-prompt pattern is that safety line.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/c7891332114e9a0b5910edfe065ad085) -->

```markdown
Refactor the PaymentProcessor class to use the Null Object pattern.
```

## Good Prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/c9164816965cb91e92a2a4885b657caa) -->

```markdown
Read @PaymentProcessor.php and @tests/PaymentProcessorTest.php.

Don't write any code yet.

Explain how the class handles null payments today.

Then write a plan to introduce the Null Object pattern

following the rules in AGENTS.md and skills/php-clean-code.md.

Wait for my approval before making any changes.

After I approve:
Create a failing test for the Null Object.

Apply the change.
Run all tests until they pass.
```

# Considerations ⚠️

Simple tasks don't need a full harness.

A CSS tweak, a typo fix, or a one-liner change doesn't require `AGENTS.md` and a planning step.

The harness is proportional to the complexity and risk of the task.

The harness degrades if you stop maintaining it.

Every session that teaches the AI something new must update `AGENTS.md`, or the knowledge vanishes with the chat.

A harness without automated feedback is incomplete.

Configuration files alone aren't enough.

Tests, CI, and linters must enforce what `AGENTS.md` declares.

A session that produces hundreds of lines of change isn't always a win.

It can be review debt transferred to the next human who opens the PR.

If a single session grows beyond what a reviewer can absorb in one sitting, split the output into smaller, chained units before opening the pull request.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

The harness requires upfront investment in `AGENTS.md`, skills, and test setup, which outweighs the benefit on small throwaway projects.

# Tags 🏷️

- Safety

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 001 - Commit Before Prompt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md)

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[AI Coding Tip 011 - Initialize Agents.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md)

[AI Coding Tip 008 - Use Spec-Driven Development with AI](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md)

# Conclusion 🏁

You wouldn't give a power tool to someone with no safety equipment and no instructions.

You give them the tool, the harness, and the training first.

Do the same for your AI.

Install the harness before the first prompt, maintain it after every PR, and the AI becomes a precise, reviewable collaborator instead of a fast source of technical debt.

# More Information ℹ️

[Test Harness (Wikipedia)](https://en.wikipedia.org/wiki/Test_harness)

[Three Laws of Robotics (Wikipedia)](https://en.wikipedia.org/wiki/Three_Laws_of_Robotics)

[Claude Code Memory and AGENTS.md](https://docs.anthropic.com/en/docs/claude-code/memory)

[Goal Command](https://www.mindstudio.ai/blog/claude-code-goal-command-autonomous-tasks)

# Also Known As 🎭

- AI-Safety-Net
- Prompt-Guardrails
- AI-Scaffolding
- Bounded-AI-Workflow

# Tools 🧰

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)
