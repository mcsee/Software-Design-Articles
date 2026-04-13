# AI Coding Tip 015 - Force the AI to Obey You

![AI Coding Tip 015 - Force the AI to Obey You](AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You.png)

*Don't let your most important instructions drown in context noise*

> TL;DR: Bury critical rules and AI models ignore them. Use explicit markers to force compliance.

# Common Mistake ❌

You write a long [skill](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) file with dozens of rules.

You bury the most critical ones somewhere in the middle, polluting the context.

The lazy AI follows the easy instructions and skips the hard ones.

You never notice until the output is already wrong, and you are frustrated.

# Problems Addressed 😔

- AI models suffer from **attention dilution**. The longer the context, the weaker the focus on any single rule
- Critical constraints buried mid-file get ignored **silently**
- The AI doesn't tell you it skipped a rule. It just doesn't follow it
- Large skills consume so much context that late instructions compete with early ones
- You waste time debugging outputs instead of trusting your skill
- Re-running the same prompt gives inconsistent results

# How to Do It 🛠️

1. **Start with a MANDATORY block**. Put your non-negotiable rules at the very top, before any context or explanation
2. **Use explicit severity markers**. Prefix rules with `MANDATORY`, `CRITICAL`, or `IMPORTANT` in ALL CAPS
3. **Apply progressive disclosure**. Start with the strictest rules, then reveal nuance and context only after anchoring the constraints
4. **Repeat key rules at the end**. Models give extra weight to what they read first *and* last (primacy and recency effect)
5. **Split large skills into focused modules**. One file per concern beats one giant file every time
6. **Use structural separators**. Use `---`, `===`, or explicit headers like `## RULES (READ FIRST)` to visually isolate critical sections
7. **Prefer numbered rules over prose**. "Rule 1: Never do X" is harder to skip than "you should avoid doing X in most cases"
8. **Write a short TL;DR at the top**. A one-line summary of the skill's purpose acts as a memory anchor for the whole file
9. **Add a violation example**. Show explicitly what breaking the rule looks like so the model has a concrete anti-pattern to avoid
10. **Test adversarially**. Craft prompts designed to make the AI break your rules, then fix the skill until they hold
11. **Add lots of good and bad examples**. Create another file in the skill directory with good and bad examples.

   Tell the LLM to document the bad examples when it doesn't understand you
12. **Use Local Rules**. Put the most critical rules in a [separate file](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md) and reference it in the skill

# Benefits 🎯

- Your most critical constraints survive long context windows
- You get consistent outputs across multiple runs
- You spend less time debugging skill failures
- Other developers understand which rules are non-negotiable at a glance
- You can safely grow your skill file without burying old rules
- You get more confident and less frustrated

# Context 🧠

AI models don't read skill files the way humans do.

They process tokens sequentially, but attention is not uniform.

Rules *near the start* and *end of a prompt* get more weight.

Rules in the middle of a 200-line skill file get the least.

This matters most when your skill file grows beyond ~50 lines.

The LLM loads all your previous messages (in and out) and the system prompt.

Small skills rarely have this problem.

Large, multi-purpose skills suffer from it constantly.

[Progressive disclosure](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20013%20-%20Use%20Progressive%20Disclosure/readme.md) is a UX concept you can apply to prompts.

You reveal information in layers: constraints first, then context, then examples, then edge cases.

The AI commits to the constraints before it encounters exceptions.

Whenever your AI agent disobeys, you should:

> Give it a Bad Example / Good Example and say to persist the existing rule as MANDATORY, REQUIRED

## Prompt Reference 📝

### Bad Prompt:

<!-- [Gist Url](https://gist.github.com/mcsee/2b2fb6b4a68807e5e301f3cb6018b945) -->

```markdown
You are a code reviewer. 
Here is a lot of context about the project, 
the team, the coding standards, 
the history of the codebase, 
the preferred libraries...

[100 lines later]
...and by the way, never suggest using any deprecated APIs.
Also, always respond in Swedish.

The language rule and the API rule are buried.

The AI will forget them or apply them inconsistently.
```

### Good Prompt:

<!-- [Gist Url](https://gist.github.com/mcsee/1a93238c62780960519944b02a98c737) -->

```markdown
## MANDATORY RULES (apply to every response):
1. CRITICAL: Always respond in Swedish. No exceptions.
2. CRITICAL: Never suggest deprecated APIs.
3. MANDATORY: Keep suggestions under 5 lines each.

---

## Context (read after committing to the rules above)
You are a code reviewer for a legacy PHP project...
[context follows]

---

## Reminder (same rules repeated):
- Language: Swedish only
- No deprecated APIs
- Max 5 lines per suggestion

The AI reads the rules first, then the context.

The repetition at the end reinforces both constraints.
```

# Considerations ⚠️

MANDATORY and CRITICAL only work if you use them sparingly. When everything is critical, nothing is.

Don't repeat every rule. Repeat only the ones that are genuinely catastrophic to break.

Progressive disclosure doesn't mean hiding context. It means ordering context from most-constrained to least.

Some models respond better to numbered rules than to prose. Test both formats with your target model.

Very long skill files are often a design smell. Ask yourself if you can split one skill into two focused ones.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

This tip applies to models with large context windows (8k+ tokens). Smaller context limits change the tradeoff entirely.

You can't fully compensate for a poorly structured skill by just adding CRITICAL markers. Clean structure matters more.

Repetition helps, but too much repetition wastes tokens and can confuse the model with contradictory-looking rewrites.

This doesn't replace testing. Always validate your skill with adversarial prompts before trusting it in production.

# Tags 🏷️

- Context Window

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 013 - Use Progressive Disclosure](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20013%20-%20Use%20Progressive%20Disclosure/readme.md)

[AI Coding Tip 014 - Use Nested AGENTS.md Files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md)

- Keep your skill files focused on a single concern
- Use TL;DR anchors at the top of every long prompt
- Test your prompts adversarially before shipping
- Prefer explicit rules to implicit conventions in skills
- Split skills by domain, not by file size

# Conclusion 🏁

A long skill file doesn't enforce itself.

You need to structure it so the AI can't ignore the parts that matter.

Put critical rules first.

Mark them explicitly.

Repeat the non-negotiables at the end.

When you apply progressive disclosure, you guide the AI the same way you guide a human reader.

From constraints to context, not the other way around.

# More Information ℹ️

[Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)

[Attention Is All You Need (original Transformer paper)](https://arxiv.org/abs/1706.03762)

[Why Your AI Agent Keeps Forgetting (Even With 1M Tokens)](https://hackernoon.com/why-your-ai-agent-keeps-forgetting-even-with-1m-tokens)

[Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)

[OpenAI Best Practices for Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)

[Large Language Models as Instruction Followers](https://arxiv.org/abs/2109.01652)

[Structured Prompting for Reliable LLM Outputs](https://arxiv.org/abs/2212.10535)

[Context Length and Model Attention Patterns](https://arxiv.org/abs/2404.02060)

# Also Known As 🎭

- Instruction-anchoring
- Constraint-first-prompting
- Rule-salience-in-prompts
- Attention-aware-skill-design
 
# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)