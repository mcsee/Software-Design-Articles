# AI Coding Tip 034 - Stop Hoarding Rules in Your AGENTS.md

![AI Coding Tip 034 - Stop Hoarding Rules in Your AGENTS.md](AI%20Coding%20Tip%20034%20-%20Stop%20Hoarding%20Rules%20in%20Your%20AGENTS.md.png)

*Every rule you never delete outlives the reason you added it.*

> TL;DR: Audit your AGENTS.md and skills on a schedule, or you keep paying context rent on rules the model has outgrown.

# Common Mistake ❌

Every time the AI does something wrong, you add a rule to stop it.

You never remove one.

Not even the one from two model versions ago that stopped mattering the week you wrote it.

Six months later your `AGENTS.md` is a thousand lines long, half of it fixing problems last year's model doesn't have anymore.

You are still loading all of it, every session, forever, a text-file [god object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2014%20-%20God%20Objects/readme.md) that knows about every mistake anyone ever made.

You treat the file like a rulebook that only grows, when the whole point of [running `/init` in the first place](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md) was to give the AI a curated [second brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md), not an archive.

# Problems Addressed 😔

- A [June study](https://addyo.substack.com/p/audit-your-agent-files) found 62% of popular repositories had lint-related leakage in their agent files, 42% had context bloat, and 35% had skill leakage nobody had cleaned up.
- Files creep past the recommended 200-line target, and every extra line is a line the model reads before it reads your actual code.
- Rules you added to patch a weaker model persist after a stronger one ships, because deleting a rule that seems to work feels riskier than keeping a useless one, and nobody ever got promoted for deleting eight lines nobody reads.
- Personalized skills built from one developer's history perform about as well as a generic skill borrowed from someone else, so a hoarded personal preference is often dead weight dressed up as customization.
- Forgotten skills, from experiments you don't remember running, still load their name and description into every prompt's listing budget, quietly billing you rent for an idea you abandoned months ago.
- A vague, generic rule telling the model to write clean code [teaches it nothing it doesn't already know](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20031%20-%20Stop%20Over-Prompting%20Reasoning%20Models/readme.md), while [the real conventions of your codebase](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md) only live in the code itself.

# How to Do It 🛠️

1. Run `/doctor` on a schedule, every few weeks or once a month, and read what it flags: unused skills, dead MCP servers, stale plugins, slow hooks.

2. For each rule in `AGENTS.md`, ask if it fired in the last month, and if you can't remember the last time it mattered, [cut it](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md).

3. Test the deletion before you [commit to it](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md): ask the agent to complete a task while ignoring your local skills and instructions, using only the raw model and [harness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md), and if [the result holds up](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md), the rule wasn't pulling weight.

4. Keep what survives short: expensive operations, code the AI shouldn't touch, project-specific safety rules, and [conventions that aren't visible from the code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md), and skip generic advice the model already knows.

5. Treat what's left the same way you treat any other code you own: something you [refactor](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md) on purpose, not just append to, since a rule nobody tidies up rots the same way an unrefactored function does.

6. [Split what's left into modular skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) instead of one growing file, so [each one loads only when it's relevant](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20013%20-%20Use%20Progressive%20Disclosure/readme.md), or into [nested `AGENTS.md` files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md) when different rules apply to different folders.

7. If a rule must always hold, no exceptions, don't leave it as prose the model can forget, [script it instead of prompting for it](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20030%20-%20Script%20Your%20Skills,%20Not%20Your%20Prompts/readme.md), encode it in a test, a hook, or a [permission setting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md), or [pair the skill with a pitfalls file](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md) so the failure mode itself gets documented once, not repeated as a growing list of bans, though a pile of bad examples still doesn't replace [telling the model why the rule exists](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md).

8. Review `/memory` on its own pass, since auto-saved memory outlives a cleaned-up project file, and a stale preference can survive the audit you just did.

9. Re-run the audit after every major model upgrade, and assume some of your rules just became dead weight overnight, because the behavior they were patching may not exist anymore.

# Benefits 🎯

1. **Lower token cost per session:** A shorter file means [more of your context budget](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md) goes to your actual code, not to instructions.

2. **Fewer contradictions:** A pile of reactive rules accumulates conflicts nobody notices; a pruned file doesn't.

3. **Trust in the current model:** You stop patching around old limitations the model shipped six versions ago.

4. **Faster onboarding:** A new teammate, human or AI, reads a briefing in a minute instead of an archive in twenty.

5. **Cleaner audits:** Enterprise security reviews increasingly check agent configuration; a small file is easier to defend than a thousand-line one nobody can explain.

# Context 🧠

Anthropic [removed more than 80% of Claude Code's system prompt](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models) for its newest generation of models, with no measurable loss on internal coding evaluations.

That's not a rounding error.

That's most of the instructions turning out to be dead weight the model had already outgrown, and nobody threw a goodbye party for any of them.

A separate study ran 288 sessions across 17 real tasks to see whether `AGENTS.md` and `CLAUDE.md` files actually improved correctness.

They didn't make a clear difference.

What they did change was efficiency instead. 

A file warning that the test suite was slow led the agent to run narrower, targeted tests, saving time without touching the quality of the fix.

That's the real job of a context file to serve as operational guidance, not design judgment replacement.

When researchers asked models 45 behavioral questions about a codebase, prose summaries answered 4 of them correctly.

The [source code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20012%20-%20Understand%20All%20Your%20Code/readme.md) itself answered 27.

Summaries smooth over the small details that matter, and a rule copied from a summary carries that same blur into your `AGENTS.md`.

Community skills compound the same way: try a few out of curiosity, and one developer who finally sat down to audit them went from 250 skills to 25.

Nobody plans to end up with 250 skills.

It happens one reasonable-sounding install at a time, because installing a useful skill and keeping it forever are separate decisions.

Skipping that second decision is how the number gets that high before anyone notices.

## How Do You Know a Rule Still Earns Its Place?

You don't, until you test it.

A rule that fixed a real, recurring failure earns a permanent home.

A rule you wrote once, after a single bad session, and never saw fire again, is a guess wearing the costume of a policy.

[Personalization research](https://addyo.substack.com/p/audit-your-agent-files) backs this up: a skill built from one developer's own history performed about as well as a generic one borrowed from a stranger, except when the same preference kept [recurring across similar tasks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain/readme.md).

One-off corrections don't deserve a permanent line.

Recurring ones do.

[Team-wide and organizational rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20028%20-%20Build%20a%20Company%20Brain/readme.md) are the exception: they compound, because they encode culture, compliance, and internal tooling quirks that don't change every time a model does.

The bar isn't whether you felt strongly about it once.

It's whether it kept happening.

# Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/df4eafa89f2950fe4a6c6e71ee347109) -->

```markdown
The AI keeps adding a trailing comma the wrong way.
Add a permanent rule to AGENTS.md telling it never to do that again.
Don't ever remove anything from this file.
It doesn't matter how old the rule gets or how the model changes.

Here is the current skill list, for context.
247 skills loaded, six more pending review.

Skill `tabs-not-spaces`: MANDATORY REQUIRED CRITICAL.
Never use spaces.
No exceptions, ever.

Skill `always-plural-vars`: MANDATORY REQUIRED.
Variable names must always be plural.

Skill `hate-semicolons`: CRITICAL MANDATORY REQUIRED.
Semicolons are forbidden.
Don't use them, period.

Skill `love-semicolons`: MANDATORY CRITICAL REQUIRED.
Semicolons are mandatory.
Always use them, no exceptions.

Skill `defect-2023-react-hook-fix`: REQUIRED MANDATORY.
This patches a defect the framework fixed two years ago.

Skill `my-friends-color-palette`: CRITICAL REQUIRED.
Use these exact colors.
He'll notice if you don't.

Add one more skill on top of these instead of fixing any of them.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/a97c175530dd95092afee1ce8571163e) -->

```markdown
Before you add a new rule to AGENTS.md

Check for an existing one first.

See whether it already covers this case.

If this is the first time it happened, fix it in this session only.

Don't touch the file yet.

If it's the second time, add one short line.

Set a reminder to test whether it's still needed next month.
```

# Considerations ⚠️

Pruning isn't the same as deleting blind.

Test the removal before you trust it, and keep a copy of what you cut in [git history](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md), not just in your memory that it was probably fine.

This tip pulls in the opposite direction from a [pitfalls file](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md), which grows on purpose every time you document a new failure mode.

Neither instinct is wrong by itself: pruning and accumulating are both correct in their own place, so the real work is finding the tradeoff between the two instead of applying either one everywhere.

Nobody's throwing you a parade for a smaller `AGENTS.md`, but the model reading it every session will thank you in tokens.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

This tip reduces bloat you already have.

It doesn't stop you from writing the next reactive rule the same way you wrote the last one, because old habits don't read audit logs.

Audit cadence only works if you actually run it; a `/doctor` command nobody invokes is just another unread file.

Some rules genuinely need to stay prose, because no test or hook can express a warning as specific as a client's legacy system needing this one weird thing.

`/doctor` is a [Claude Code](https://code.claude.com/docs/en/commands) command, not a feature every AI assistant ships.

This audit step doesn't transfer to every tool the same way.

# Tags 🏷️

- Configuration

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 001 - Commit Before Prompt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md)

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 009 - Compact Your Context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md)

[AI Coding Tip 011 - Initialize Agents.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md)

[AI Coding Tip 012 - Understand All Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20012%20-%20Understand%20All%20Your%20Code/readme.md)

[AI Coding Tip 013 - Use Progressive Disclosure](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20013%20-%20Use%20Progressive%20Disclosure/readme.md)

[AI Coding Tip 014 - Use Nested AGENTS.md Files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md)

[AI Coding Tip 015 - Force the AI to Obey You](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md)

[AI Coding Tip 016 - Feed Your PR Lessons into the AI Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain/readme.md)

[AI Coding Tip 019 - Tell the AI Why, Not Just What](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md)

[AI Coding Tip 020 - Create a Second Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md)

[AI Coding Tip 022 - Give AI a Harness to Work With](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md)

[AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md)

[AI Coding Tip 025 - Pair Every Skill With a Pitfalls File](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md)

[AI Coding Tip 027 - Force Code Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md)

[AI Coding Tip 028 - Build a Company Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20028%20-%20Build%20a%20Company%20Brain/readme.md)

[AI Coding Tip 030 - Script Your Skills, Not Your Prompts](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20030%20-%20Script%20Your%20Skills,%20Not%20Your%20Prompts/readme.md)

[AI Coding Tip 031 - Stop Over-Prompting Reasoning Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20031%20-%20Stop%20Over-Prompting%20Reasoning%20Models/readme.md)

# Conclusion 🏁

Adding a rule is free.

Carrying it forever isn't.

Audit your `AGENTS.md` and your skills on a schedule, test what you're about to cut, and encode the rules that must never break as tests and hooks instead of prose.

The model you're patching around today won't be the model reading the patch next month.

# More Information ℹ️

[Audit Your Agent Files, Addy Osmani](https://addyo.substack.com/p/audit-your-agent-files)

[The New Rules of Context Engineering for Claude 5 Generation Models, Anthropic](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

[Claude Code: CLAUDE.md](https://docs.anthropic.com/en/docs/claude-code/overview)

[agents.md, the open standard](https://agents.md/)

[Claude Code skills documentation](https://docs.anthropic.com/en/docs/claude-code/skills)

[Claude Code memory documentation](https://docs.anthropic.com/en/docs/claude-code/memory)

# Also Known As 🎭

- Agent-Config-Pruning
- Context-File-Debt
- Skill-Hoarding

# Tools 🧰

The `/doctor` command inside a Claude Code session, not the `claude doctor` shell command, which only prints installation diagnostics and won't judge you for the fifty skills you forgot you installed.

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
