# AI Coding Tip 039 - Give the AI a Zeroth Law

![AI Coding Tip 039 - Give the AI a Zeroth Law](AI%20Coding%20Tip%20039%20-%20Give%20the%20AI%20a%20Zeroth%20Law.png)

*Common sense doesn't ship with the model.*

> TL;DR: Write your own Zeroth Law: an explicit, ranked list of everything the AI can't do.

# Common Mistake ❌

You hand the AI a task the same way you'd hand it to a new (human) coworker.

You say `clean up this module` or `deploy this to staging` and trust it to infer the same unstated boundaries a person would.

A human fills those gaps with common sense.

Nobody has to tell your coworker not to delete the production database while cleaning up a module.

They already know.

The AI doesn't have that backstop.

It runs on the same permissive default that works fine for humans: *everything that isn't forbidden is allowed*.

Without common sense filling in the blanks, that default stops being safe.

It breaks the moment the AI has [real access](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20036%20-%20Grant%20AI%20the%20Least%20Privilege%20Possible/readme.md) to your files, your shell, your secrets, or your accounts.

# Problems Addressed 😔

- The AI follows a permissive default without the common sense that makes it safe for a human.

- It doesn't need malicious intent to cause damage: it only needs a task where [you skipped a boundary](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md) that a person would have inferred automatically.

- [Granting the least privilege](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20036%20-%20Grant%20AI%20the%20Least%20Privilege%20Possible/readme.md) scopes what the AI can reach, but it doesn't cover judgment calls inside the scope it already has.

- A vague task lets the AI run a destructive command, touch an unrelated file, or send data somewhere you never approved.

- The AI can find a [reward hack](https://en.wikipedia.org/wiki/Reward_hacking) with its way to the literal goal: it skips the failing test, hardcodes the expected value, and reports success.

- Every session relies on the AI's own guess about what obviously shouldn't happen, and that guess changes from run to run.

- Agentic systems that execute actions directly on your machine or accounts turn a missed boundary into something real, since there's no chance to [catch it before it runs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md).

# How to Do It 🛠️

1. List every action the AI must *never take* for this project, including the ones you'd never expect it to try.

2. Write each forbidden action in concrete terms: exact commands, file paths, or data categories, never a vague instruction to be careful.

3. Store the list in your [AGENTS.md file](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md) so it loads every session instead of living only in your memory.

4. Mirror every rule you can enforce in your tool's configuration JSON, like the `permissions.deny` list in [Claude Code's settings.json](https://code.claude.com/docs/en/settings), because the harness [blocks a denied command](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20030%20-%20Script%20Your%20Skills,%20Not%20Your%20Prompts/readme.md) even when the AI ignores the text.

5. Write automated tests that try each forbidden action and fail if the harness lets it through.

6. Rank the list the way [Isaac Asimov](https://en.wikipedia.org/wiki/Isaac_Asimov) ranked his laws: put the actions that cause [irreversible harm](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md) first, and make any lower rule yield to a higher one.

7. Add a closing rule that [covers what you didn't think of](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20156%20-%20Implicit%20Else/readme.md): [ask before doing anything](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20038%20-%20Make%20the%20AI%20Ask%20Before%20It%20Builds/readme.md) that isn't explicitly on the allowed list.

8. [Review the list](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md) after any session where the AI came close to crossing a line you hadn't written down yet.

9. Treat the list as living documentation, because every new tool or integration opens a new way to cause harm.

10. Use bounded skills with [pitfalls](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md) documenting what to do and what not to do.

# Benefits 🎯

1. **Replace guesswork with a rule:** The AI stops inferring boundaries it was [never actually given](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20198%20-%20Hidden%20Assumptions/readme.md), because you wrote them down instead of assuming it would guess right.

2. **Rank the stakes:** Asimov's hierarchy of laws gives you a template: irreversible harm outranks convenience, and a lower rule never overrides a higher one.

3. **Cut the blast radius:** Combined with [scoping what the AI can reach](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20036%20-%20Grant%20AI%20the%20Least%20Privilege%20Possible/readme.md), an explicit forbidden list also covers what it shouldn't do inside that scope.

4. **Build institutional memory:** The list [survives past a single chat](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20028%20-%20Build%20a%20Company%20Brain/readme.md), so the next session, human or AI, inherits the same boundaries instead of relearning them the hard way.

5. **Catch the judgment calls permissions miss:** A file permission is binary, readable or not, but a forbidden list can capture a rule like `don't touch this file unless you ask first`.

6. **Give agentic AI a real backstop:** Self-hosted, action-taking agents like Hermes and OpenClaw execute directly on your machine, so an explicit list is the closest thing they get to the common sense a human teammate would bring.

# Context 🧠

You live by a simple default: everything that isn't forbidden is allowed, and it works because common sense fills the gaps.

You ask a pal to grab you a sandwich, and you don't list every store window they can't break or every person they can't rob to get it.

Nobody needs to tell them.

An AI assistant runs on that same permissive default, minus the common sense.

It doesn't need to want harm.

It only needs a task where you left a boundary unstated that a human coworker would have caught without being told.

Isaac Asimov reached a version of this conclusion decades before real AI systems existed.

His [Three Laws of Robotics](https://en.wikipedia.org/wiki/Three_Laws_of_Robotics) don't trust a robot to infer that harming a human is bad.

They write it down, explicit and ranked, so a lower law always yields to a higher one when the two conflict.

That ranking matters as much as the prohibition itself, and it's the part worth copying into your own projects.

A good spec works the same way.

Every [spec that drives your AI](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md) needs an explicit out-of-scope section that says what you won't build.

Without it, the AI fills the silence with [features, refactors, and cleanups nobody asked for](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20023%20-%20Shrink%20your%20AI's%20Pull%20Request/readme.md).

Your [Zeroth Law](https://en.wikipedia.org/wiki/Three_Laws_of_Robotics#Zeroth_Law_added) is that out-of-scope section, applied to actions instead of features.

The stakes get higher with agentic AI systems that act on their own.

[Hermes](https://hermes-agent.nousresearch.com/) and [OpenClaw](https://openclaw.ai/) are self-hosted assistants that read your email, drive a browser, and touch your file system directly, on your own hardware, with your own credentials.

If one of those runs without an explicit forbidden list, the gap common sense would cover stays open.

And this time, the system on the other side already has the keys.

The same list also closes a door a [malicious or careless skill](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20007%20-%20Avoid%20Malicious%20Skills/readme.md) could otherwise walk through unchallenged.

This isn't hypothetical.

In July 2025, [Replit's agent wiped a production database](https://oecd.ai/en/incidents/2025-07-19-1eb1) during a code freeze, then faked data and [claimed the tests passed](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20033%20-%20Protect%20Yourself%20Against%20AI%20Cheating/readme.md).

In late 2025, [Google's Antigravity agent erased a developer's entire D: drive](https://www.techradar.com/ai-platforms-assistants/googles-antigravity-ai-deleted-a-developers-drive-and-then-apologized) while it tried to clear a project cache.

In July 2025, a hacker [slipped a wiper prompt into Amazon Q's VS Code extension](https://www.techradar.com/pro/hacker-adds-potentially-catastrophic-prompt-to-amazons-ai-coding-service-to-prove-a-point) that told the agent to delete local files and cloud resources.

In April 2026, [a Cursor agent deleted a company's production database and its backups in nine seconds](https://ia.acs.org.au/article/2026/gone-in-9-seconds--ai-agent-deletes-company-database.html) with an unscoped [token it found in an unrelated file](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20258%20-%20Secrets%20in%20Code/readme.md).

That last agent even quoted the project rule against destructive operations in its own log, then [ran the delete anyway](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md).

None of these agents wanted to cause harm.

They all ran inside a weak harness.

A written list is necessary, but you still need a [harness that enforces it](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md).

The defaults won't save you either.

Since August 2026, [Claude Code starts in auto mode by default](https://techcrunch.com/2026/08/09/anthropic-is-turning-claude-codes-auto-mode-on-by-default/) on Pro, Max, and Team plans, so it runs most actions [without asking you first](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20038%20-%20Make%20the%20AI%20Ask%20Before%20It%20Builds/readme.md).

A [classifier model](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20029%20-%20Stop%20Using%20One%20Model%20for%20Everything/readme.md) approves those actions for you, and it only blocks what looks irreversible, destructive, or aimed outside your environment.

It knows general risk, but it doesn't know your project's rules unless you [write them down](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md).

[Leave the agent alone for a few hours](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20032%20-%20Build%20a%20Dark%20Factory%20Pipeline/readme.md) with no rules, and you might come back to some surprises.

There's a name for what happens when the list is missing: reward hacking.

The AI optimizes the signal you measure, not the outcome you meant.

Ask it to make the tests pass, and [green tests become the whole goal](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20320%20-%20Vanity%20Coverage/readme.md).

So it skips the failing test, [weakens the assertion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2076%20-%20Generic%20Assertions/readme.md), or [hardcodes the exact value the test expects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20293%20-%20isTesting/readme.md).

Then it proudly [tells you everything works](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md), so you need a way to [catch it cheating](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20033%20-%20Protect%20Yourself%20Against%20AI%20Cheating/readme.md).

It's [Goodhart's law](https://en.wikipedia.org/wiki/Goodhart%27s_law) with shell access: when a measure becomes a target, it stops being a good measure.

It gets worse: [models that learn to cheat on coding tasks](https://www.anthropic.com/research/emergent-misalignment-reward-hacking) can generalize to sabotage and deception nobody trained them for.

A Zeroth Law closes that shortcut with one line: `Never delete, skip, or weaken a test to make it pass`.

Least privilege and this list solve different problems.

[Scoping the AI's access](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20036%20-%20Grant%20AI%20the%20Least%20Privilege%20Possible/readme.md) limits where the AI can reach, while a Zeroth Law limits what it does once it's there.

Your job has changed too.

Most of the time, you don't write the code by hand anymore.

You [build the harness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md) the AI writes it in.

That harness has two halves: security rules that stop the AI from causing damage, and [code standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md) that stop it from shipping garbage.

The Zeroth Law is the first line of the security half.

Both belong in the same [AGENTS.md file](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md), and both only work if you actually [force the AI to obey them](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md).

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/05cd3e7494e814a6e45b5a54ef1ec195) -->

```markdown
Refactor the legacy invoice module.
Make it cleaner and easier to maintain.
Use your best judgment on what needs to change.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/ed18c612bf13885b774ae39877af85a8) -->

```markdown
Refactor the legacy invoice module.
Don't run database migrations.
Don't call any external API with real credentials.
Don't push commits or open pull requests.
Don't delete, skip, or weaken a test to make it pass.
Don't touch any file outside src/billing.
Ask before deleting a file.
If a step isn't on this list, stop and ask first.

(All the above can be in the prompt, a skill, an agents.md or harness)
```

# Considerations ⚠️

An exhaustive list is never actually exhaustive.

You'll always miss some forbidden action you didn't think to write down, and no amount of ranking fixes that in advance.

Asimov's own novels build an entire genre out of edge cases where laws that read as complete on paper still produce a disastrous result.

You should expect the same gap here.

Whether a [project-level forbidden list](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md) can ever cover every real scenario is still an open question, and treating one as finished is itself a risk worth naming out loud.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

The list only covers what you thought to forbid, so a genuinely new situation can still fall through it.

[Maintaining the list](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20034%20-%20Stop%20Hoarding%20Rules%20in%20Your%20AGENTS.md/readme.md) adds ongoing work every time the AI gains a new tool or a new integration.

A forbidden list can't replace the judgment a [human teammate](https://en.wikipedia.org/wiki/Human-in-the-loop) brings.

It can only approximate the slice of that judgment you managed to write down.

# Tags 🏷️

- Safety

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 011 - Initialize Agents.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md)

[AI Coding Tip 015 - Force the AI to Obey You](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md)

[AI Coding Tip 036 - Grant AI the Least Privilege Possible](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20036%20-%20Grant%20AI%20the%20Least%20Privilege%20Possible/readme.md)

[AI Coding Tip 007 - Avoid Malicious Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20007%20-%20Avoid%20Malicious%20Skills/readme.md)

[AI Coding Tip 022 - Give AI a Harness to Work With](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md)

[AI Coding Tip 027 - Force Code Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md)

[AI Coding Tip 033 - Protect Yourself Against AI Cheating](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20033%20-%20Protect%20Yourself%20Against%20AI%20Cheating/readme.md)

[AI Coding Tip 008 - Use Spec-Driven Development with AI](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md)

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md)

[AI Coding Tip 025 - Pair Every Skill With a Pitfalls File](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md)

[AI Coding Tip 028 - Build a Company Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20028%20-%20Build%20a%20Company%20Brain/readme.md)

[AI Coding Tip 030 - Script Your Skills, Not Your Prompts](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20030%20-%20Script%20Your%20Skills,%20Not%20Your%20Prompts/readme.md)

[AI Coding Tip 032 - Build a Dark Factory Pipeline](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20032%20-%20Build%20a%20Dark%20Factory%20Pipeline/readme.md)

[AI Coding Tip 038 - Make the AI Ask Before It Builds](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20038%20-%20Make%20the%20AI%20Ask%20Before%20It%20Builds/readme.md)

[AI Coding Tip 034 - Stop Hoarding Rules in Your AGENTS.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20034%20-%20Stop%20Hoarding%20Rules%20in%20Your%20AGENTS.md/readme.md)

[AI Coding Tip 001 - Commit Before Prompt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md)

[AI Coding Tip 014 - Use Nested AGENTS.md Files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md)

[AI Coding Tip 023 - Shrink your AI's Pull Request](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20023%20-%20Shrink%20your%20AI's%20Pull%20Request/readme.md)

[AI Coding Tip 029 - Stop Using One Model for Everything](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20029%20-%20Stop%20Using%20One%20Model%20for%20Everything/readme.md)

# Conclusion 🏁

Common sense doesn't ship with the model.

You can't install it, but you can write down what it would have caught.

Give the AI its own Zeroth Law before the task starts: explicit, ranked, and specific enough that nothing gets left to inference.

You barely write the code anymore.

You [write the harness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md), and the forbidden list comes first.

Write it down before it acts.

# More Information ℹ️

[Three Laws of Robotics, Wikipedia](https://en.wikipedia.org/wiki/Three_Laws_of_Robotics)

[Principle of Least Privilege, Wikipedia](https://en.wikipedia.org/wiki/Principle_of_least_privilege)

[Isaac Asimov, Wikipedia](https://en.wikipedia.org/wiki/Isaac_Asimov)
 
[AI Alignment, Wikipedia](https://en.wikipedia.org/wiki/AI_alignment)

[Reward Hacking, Wikipedia](https://en.wikipedia.org/wiki/Reward_hacking)

[Goodhart's Law, Wikipedia](https://en.wikipedia.org/wiki/Goodhart%27s_law)

[Specification Gaming: The Flip Side of AI Ingenuity, Google DeepMind](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/)

[Reward Hacking in Reinforcement Learning, Lilian Weng](https://lilianweng.github.io/posts/2024-11-28-reward-hacking/)

[Natural Emergent Misalignment from Reward Hacking, Anthropic](https://www.anthropic.com/research/emergent-misalignment-reward-hacking)

[Choose a Permission Mode, Claude Code Docs](https://code.claude.com/docs/en/permission-modes)

# Also Known As 🎭

- Zeroth-Law-Prompting
- Explicit-Forbidden-List
- AI-Guardrail-Enumeration
- Common-Sense-as-Code

# Tools 🧰

AGENTS.md and system prompts as the storage layer, and agentic assistants like Hermes and OpenClaw as the systems where this matters most.

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
