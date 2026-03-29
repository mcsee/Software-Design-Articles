# AI Coding Tip 015 - Force the AI to Obey You

![AI Coding Tip 015 - Force the AI to Obey You](AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You.png)

*Don't let your most important instructions drown in context noise*

> TL;DR: Bury critical rules and AI models ignore them. Use progressive disclosure and explicit markers to force compliance.

# Common Mistake ❌

You write a long skill file with dozens of rules.
You bury the most critical ones somewhere in the middle.
The lazy AI follows the easy instructions and skips the hard ones.
You never notice until the output is already wrong and you are frustrated.

# Problems Addressed 😔

- AI models suffer from **attention dilution** — the longer the context, the weaker the focus on any single rule
- Critical constraints buried mid-file get ignored silently
- The AI doesn't tell you it skipped a rule — it just doesn't follow it
- Large skills consume so much context that late instructions compete with early ones
- You waste time debugging outputs instead of trusting your skill
- Re-running the same prompt gives inconsistent results

# How to Do It 🛠️

1. **Start with a MANDATORY block** — put your non-negotiable rules at the very top, before any context or explanation
2. **Use explicit severity markers** — prefix rules with `MANDATORY`, `CRITICAL`, or `IMPORTANT` in ALL CAPS
3. **Apply progressive disclosure** — start with the strictest rules, then reveal nuance and context only after anchoring the constraints
4. **Repeat key rules at the end** — models give extra weight to what they read first *and* last (primacy and recency effect)
5. **Split large skills into focused modules** — one file per concern beats one giant file every time
6. **Use structural separators** — `---`, `===`, or explicit headers like `## RULES (READ FIRST)` to visually isolate critical sections
7. **Prefer numbered rules over prose** — "Rule 1: Never do X" is harder to skip than "you should avoid doing X in most cases"
8. **Write a short TL;DR at the top** — a one-line summary of the skill's purpose acts as a memory anchor for the whole file
9. **Add a violation example** — show explicitly what breaking the rule looks like so the model has a concrete anti-pattern to avoid
10. **Test adversarially** — craft prompts designed to make the AI break your rules, then fix the skill until they hold

# Benefits 🎯

- Your most critical constraints survive long context windows
- You get consistent outputs across multiple runs
- You spend less time debugging skill failures
- Other developers understand which rules are non-negotiable at a glance
- You can safely grow your skill file without burying old rules

# Context 🧠

AI models don't read skill files the way humans do.
They process tokens sequentially, but attention is not uniform.
Rules near the start and end of a prompt get more weight.
Rules in the middle of a 200-line skill file get the least.

This matters most when your skill file grows beyond ~50 lines.
Small skills rarely have this problem.
Large, multi-purpose skills suffer from it constantly.

Progressive disclosure is a UX concept you can apply to prompts.
You reveal information in layers: constraints first, then context, then examples, then edge cases.
The AI "commits" to the constraints before it encounters exceptions.

## Prompt Reference 📝

### Bad Prompt ❌
```
You are a code reviewer. Here is a lot of context about the project, the team, the coding standards, the history of the codebase, the preferred libraries...
[100 lines later]
...and by the way, never suggest using any deprecated APIs.
Also, always respond in Spanish.
```

> The language rule and the API rule are buried.
> The AI will forget them or apply them inconsistently.

### Good Prompt ✅
```
## MANDATORY RULES (apply to every response):
1. CRITICAL: Always respond in Spanish. No exceptions.
2. CRITICAL: Never suggest deprecated APIs.
3. MANDATORY: Keep suggestions under 5 lines each.

---

## Context (read after committing to the rules above)
You are a code reviewer for a legacy PHP project...
[context follows]

---

## Reminder (same rules repeated):
- Language: Spanish only
- No deprecated APIs
- Max 5 lines per suggestion
```

> The AI reads the rules first, then the context.
> The repetition at the end reinforces both constraints.

# Considerations ⚠️

- MANDATORY and CRITICAL only work if you use them sparingly.
  When everything is critical, nothing is.
- Don't repeat every rule — repeat only the ones that are genuinely catastrophic to break.
- Progressive disclosure doesn't mean hiding context.
  It means ordering context from most-constrained to least.
- Some models respond better to numbered rules than to prose.
  Test both formats with your target model.
- Very long skill files are often a design smell.
  Ask yourself if you can split one skill into two focused ones.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

- This tip applies to models with large context windows (8k+ tokens).
  Smaller context limits change the tradeoff entirely.
- You can't fully compensate for a poorly structured skill by just adding CRITICAL markers — clean structure matters more.
- Repetition helps, but too much repetition wastes tokens and can confuse the model with contradictory-looking rewrites.
- This doesn't replace testing. Always validate your skill with adversarial prompts before trusting it in production.

# Tags 🏷️

- Context Window

# Level 🔋

[X] Intermediate

# Related Tips 🔗

- Tip: Keep your skill files focused on a single concern
- Tip: Use TL;DR anchors at the top of every long prompt
- Tip: Test your prompts adversarially before shipping
- Tip: Prefer explicit rules over implicit conventions in skills
- Tip: Split skills by domain, not by file size

# Conclusion 🏁

A long skill file doesn't enforce itself.
You need to structure it so the AI can't ignore the parts that matter.
Put critical rules first. Mark them explicitly. Repeat the non-negotiables at the end.
When you apply progressive disclosure, you guide the AI the same way you guide a human reader — from constraints to context, not the other way around. 

# More Information ℹ️

[Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)
[Attention Is All You Need (original Transformer paper)](https://arxiv.org/abs/1706.03762)
[Anthropic Prompt Engineering Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
[OpenAI Best Practices for Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)
[Primacy and Recency Effects in LLM Prompts](https://learnprompting.org/docs/intermediate/review)
[Progressive Disclosure (UX principle)](https://www.nngroup.com/articles/progressive-disclosure/)
[Large Language Models as Instruction Followers](https://arxiv.org/abs/2109.01652)
[Prompt Injection and Instruction Hierarchy](https://arxiv.org/abs/2302.12173)
[Structured Prompting for Reliable LLM Outputs](https://arxiv.org/abs/2212.10535)
[Context Length and Model Attention Patterns](https://arxiv.org/abs/2404.02060)

# Also Known As 🎭

- Instruction anchoring
- Constraint-first prompting
- Rule salience in prompts
- Attention-aware skill design

# Tools 🧰

- Claude.ai (skill / system prompt editor)
- Cursor rules (`.cursorrules` file)
- GitHub Copilot instructions (`.github/copilot-instructions.md`)
- Continue.dev (custom system prompts)
- LangChain PromptTemplate
- OpenAI Playground (system message editor)

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

***

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)