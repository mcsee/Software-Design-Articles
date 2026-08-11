# AI Coding Tip 031 - Stop Over-Prompting Reasoning Models

![AI Coding Tip 031 - Stop Over-Prompting Reasoning Models](AI%20Coding%20Tip%20031%20-%20Stop%20Over-Prompting%20Reasoning%20Models.png)

*The perfect prompt doesn't instruct the model on what it already knows how to do.*

> TL;DR: Reasoning models already verify and pace themselves, so drop those prompts and set real effort, scope, length, autonomy.

# Common Mistake ❌

You still write prompts for a model that evolved and stopped needing them.

"Double-check your work," "think step by step," "be concise," and a wall of REQUIRED/MANDATORY rules get pasted into every request, the same [gratuitous context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20197%20-%20Gratuitous%20Context/readme.md) you'd flag in a variable name, on the assumption that more instruction always buys better output, as if the model just needed one more all-caps reminder to remember how to think.

Current reasoning models (as of August 2026) already verify their own steps and pace their own depth.

Those extra lines don't add safety, they add friction, waste tokens, and the model spends effort fighting your instructions instead of the task.

# Problems Addressed 😔

- Forced verification instructions cause reasoning models to over-verify, [burning tokens](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md) on redundant checks the model would have run anyway.

- "Think deeply" as a universal prefix no longer maps to anything: modern APIs expose an explicit effort level, so a vague plea does nothing a real setting wouldn't do better.

- ALWAYS/NEVER absolutes written for judgment calls turn a nuanced decision into a rule the model follows literally, even when the literal reading is wrong.

- "Be concise" without specifics leaves the model guessing what to cut, so it either [pads the response](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md) or cuts something you needed.

- Contradictions inherited from older prompt versions, the same rule stated twice, slightly differently, in two sections, leave the model to arbitrate a conflict you never meant to create, sometimes by hallucinating its own resolution.

- Missing autonomy rules mean the model either stalls asking permission for trivial calls or barrels ahead on changes you wanted to review first.

# How to Do It 🛠️

1. Delete forced verification lines like "double-check your work" or "review before answering," since Anthropic's guidance on Opus 5 states directly: *"If your prompt contains explicit verification instructions... remove them: they cause over-verification in modern models."*

2. Replace "think deeply" or "think hard" with the model's official effort selector (`low`/`medium`/`high`/`max`), and start low, raising it only when a task actually needs the extra depth.

3. Turn ALWAYS/NEVER language into decision criteria instead of blanket orders, and reserve absolute words for invariants that are genuinely always true, the same way you'd [force the model to obey](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md) only the rules that are actually non-negotiable.

4. Replace a bare "be concise" with [what to keep and what to cut](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md): name the sections that matter and the ones that don't.

5. Deduplicate inherited rules so each constraint lives in exactly one place in the prompt, stated once.

6. State an explicit autonomy policy as [a harness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md), the way OpenAI's GPT-5.6 guide does: *"For requests to analyze, review, or plan, inspect and report. Don't implement changes unless asked,"* the same [read-only planning step](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md) you'd force on any other run.

7. Set explicit length in the request itself, a paragraph, a table, three bullets, instead of leaving "how long" to the model's judgment.

8. Rewrite the prompt using the 2026 template: Role, Objective, Success criteria, Constraints, Output format, and Stopping rules, the same explicit exit condition you'd [force before closing out any task](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md), and drop step-by-step process instructions in favor of describing the outcome.

9. State [clear, verifiable exit criteria](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md), the same ones you'd expect from a human collaborator.

# Benefits 🎯

1. **Better results, not just shorter ones:** [OpenAI reports](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5-6_prompting_guide) that trimming their internal agent prompts, cutting repeated instructions, unnecessary examples, and irrelevant tool descriptions, raised evaluation scores by 10 to 15%.

2. **Lower token cost:** The same trimming dropped token consumption between 41 and 66%, and cost by up to 67%.

3. **Less over-verification:** Removing forced double-check instructions stops the model from re-verifying work it already verified as part of normal reasoning.

4. **Effort matches the task:** An explicit effort level replaces a vague "think hard," so simple requests stay cheap and hard ones get the depth they need.

5. **Fewer surprise expansions:** A stated scope stops the model from turning a one-file fix into a refactor of the whole module.

6. **No arbitration needed:** A prompt with one copy of each rule leaves nothing for the model to reconcile on its own.

# Context 🧠

This shift tracks a change in what the model already does by default.

Older models needed to be told to verify, to slow down, to stay on topic, because without that scaffolding they skipped steps.

Reasoning models like GPT-5.6, Opus 5, and Kimi-3 already run an internal verification pass and already pace their depth against the task, so the same scaffolding stops helping and starts duplicating work the model was going to do anyway.

The fix isn't a shorter prompt for its own sake, since a short but vague prompt still fails.

It's a prompt where every remaining line does something no default behavior already covers: the real role, the real objective, the real constraints, and the four settings the model can't infer on its own, effort, scope, length, and autonomy.

Autonomy is the one most prompts still skip, because apparently deciding when the model gets to act on its own is less fun than writing a ninth verification clause nobody needed.

A three-level policy works for most tasks: act without asking on reversible, low-risk steps, confirm before anything destructive or hard to undo, and for pure analysis or planning requests, [inspect and report without touching code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md), exactly as OpenAI's guidance states.

As always, you need a [human in the loop](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) to verify the task is complete.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/e61cc163e853403d77c1c084699c59b3) -->

```markdown
Think deeply about this task and be very careful.
Always double-check your work before answering.
Never skip validation, ever, no matter what.
Be concise.
Refactor the payment module.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/8a739ccc11307679599b5da8ce304029) -->

```markdown
Role: Senior backend engineer refactoring a payment module.
Objective: Extract the retry logic in PaymentGateway into its
own class.
Success criteria: Existing tests pass. Retry behavior stays
the same. No new public methods on PaymentGateway.
Constraints: Don't touch the database schema. Don't add new
dependencies.
Output format: A diff, followed by a two-sentence summary of
what moved.
Stopping rules: If a test needs new mocking infrastructure to
pass, stop and ask before adding it. Otherwise proceed without
confirming each file.
Effort: medium.
```

# Considerations ⚠️

[Trimming a prompt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md) isn't the same as leaving out real constraints.

[Business rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md), security limits, and data boundaries stay in the prompt no matter how short the rest of it gets, since those aren't scaffolding, they're the same kind of non-negotiable rule you'd [force through a hook](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md) instead of a wish.

The effort selector is model-specific.

Confirm the exact parameter name and accepted values for the model you're calling before relying on it, since `low`/`medium`/`high`/`max` doesn't map identically across every provider.

An autonomy policy still needs [real stopping rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md), not just permission to act freely.

"Act without asking" without a boundary is how a reversible-looking step turns into an irreversible one.

Older prompts you've relied on for months may still carry verification and hedging language written for older models.

Re-check them against the current model's defaults instead of assuming last year's tuning still applies.

You don't have to do that rewrite by hand.

Feed the old prompt into a meta-prompt that applies this tip's own rules and hands back a trimmed version.

<!-- [Gist Url](https://gist.github.com/mcsee/e81d64733a95d31c27784e644cee4902) -->

```markdown
Rewrite the prompt below for a reasoning model.

Remove: forced verification lines ("double-check your work",
"review before answering"), "think deeply" or "think hard"
phrasing, SIEMPRE/NUNCA rules written for judgment calls
instead of real invariants, a bare "be concise" with no
specifics, and any rule that's stated more than once.

Add: an explicit effort level (low, medium, high, or max),
an explicit scope boundary, an explicit output length, and
an explicit autonomy policy (act without asking, confirm
first, or inspect and report only).

Keep every real business rule, security limit, and data
boundary from the original prompt untouched. Don't invent
new constraints that weren't already there.

Output using this structure: Role, Objective, Success
criteria, Constraints, Output format, Stopping rules.

Old prompt:
<PASTE THE OLD PROMPT HERE>
```

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

This trimming approach targets reasoning models with an explicit effort parameter and strong default self-verification.

Older or smaller models without those defaults may still need the explicit scaffolding this tip removes.

# Tags 🏷️

- Prompt Engineering

# Level 🔋

[X] Beginner

# Related Tips 🔗

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 009 - Compact Your Context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md)

[AI Coding Tip 015 - Force the AI to Obey You](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md)

[AI Coding Tip 022 - Give AI a Harness to Work With](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md)

[AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md)

[AI Coding Tip 027 - Force Code Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md)

# Conclusion 🏁

A prompt written for last year's model is a prompt full of instructions the current model already follows on its own.

Verification, depth, and caution used to be things you had to ask for.

Now they're defaults, and asking for them again just adds noise the model has to work around, like reminding a surgeon to wash their hands before every single incision.

Once useful.

Now just insulting.

Keep the four things a model still can't infer, effort, scope, length, and autonomy, and delete everything else that was only ever compensating for a model that's no longer the one answering.

# More Information ℹ️

[GPT-5.6 Prompting Guide](https://developers.openai.com/cookbook/examples/gpt-5/gpt-5-6_prompting_guide)

[Prompting Claude Opus 5](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering)

# Also Known As 🎭

- Prompt Pruning
- Prompt Minimalism
- Outcome-First Prompting
- Effort-Level Prompting

# Tools 🧰

The `reasoning_effort` parameter (OpenAI) and the extended-thinking budget parameter (Anthropic) set explicit depth instead of a "think hard" instruction.

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
