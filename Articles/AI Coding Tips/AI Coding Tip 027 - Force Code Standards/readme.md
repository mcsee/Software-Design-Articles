# AI Coding Tip 027 - Force Code Standards

![AI Coding Tip 027 - Force Code Standards](AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards.png)

*Style errors double when nobody enforces them.*

> TL;DR: Wire your standards into hooks, skills, and a judge, so the harness blocks violations before a human opens the diff.

# Common Mistake ❌

You paste your coding standards into [AGENTS.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md) and trust the AI to remember them.

Then [a human reviewer manually checks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) [naming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20159%20-%20Mixed%20Case/readme.md), [indentation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20164%20-%20Mixed%20Indentations/readme.md), and [spacing](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20211%20-%20Tab%20over%20Spaces/readme.md) on every pull request.

Nobody wires a hook, [a skill](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md), or a judge that blocks the diff before a human ever opens it.

The standards live in prose, and prose is optional.

# Problems Addressed 😔

- A [CodeRabbit analysis of 470 pull requests](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report) found AI-generated code carries roughly 1.7x more defects than human-only code, and nearly 2x more naming and style consistency errors

- [Human reviewers burn attention on indentation and casing instead of design](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md), feeding the same [broken windows](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20173%20-%20Broken%20Windows/readme.md) that erode a codebase over time

- [Enforcement depends on someone remembering to check](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md), so it drifts the moment nobody's watching

- The AI violates a rule it read in prose, because prose isn't a gate, only a [suggestion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md)

- Two human reviewers catch two different subsets of the same [code without standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

# How to Do It 🛠️

1. Turn each standard into a machine-checkable rule instead of a paragraph of prose.

2. Wire a [pre-commit or pre-merge hook](https://git-scm.com/docs/githooks) that runs the linter automatically on every change.

3. Add a validator skill that [reads the rule set fresh](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md) and re-checks the whole diff, not just what the AI remembers.

4. Route ambiguous rules, like naming intent, to a large language model (LLM) judge instead of a [human reviewer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md).

5. Block the commit, the merge, or [the session end](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md) until every gate reports zero violations.

6. [Log every violation the judge catches as a new rule](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain/readme.md), so the harness never misses it again.

# Benefits 🎯

1. **Consistent gate:** Every diff hits the same rule set, so two reviewers never catch two different subsets of the same violation.

2. **Faster reviews:** [Humans spend their attention on design and correctness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md), not indentation or casing.

3. **No memory decay:** A skill [reads the standards file fresh every session](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md) instead of trusting what the AI claims to remember.

4. **Judge for nuance:** An LLM judge catches the semantic violations a regular expression can't parse, like a misleading name.

5. **Compounding rules:** [Every violation the judge finds becomes a new check](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md), so the harness gets stricter over time.

6. **Measurable drop:** You can track the naming and style defect rate over time and watch it fall toward zero.

# Context 🧠

Standards enforcement isn't new.

[Stephen C. Johnson wrote the first lint in 1978](https://en.wikipedia.org/wiki/Lint_(software)) to catch mistakes in C code nobody wanted to check by eye.

Checkstyle, PMD, and ESLint followed, each one refusing to trust a human to notice a [mixed indentation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20164%20-%20Mixed%20Indentations/readme.md).

[SonarQube](https://www.sonarsource.com/resources/library/linting-is-not-all-you-need/) added a server that gates a whole pipeline, not just a single file.

[Mago](https://mago.carthage.software/) does the same for PHP now, running a linter, a formatter, and a static analyzer in one Rust binary fast enough to run on every keystroke.

None of these tools ever asked a human to vote on a [tab versus a space](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20211%20-%20Tab%20over%20Spaces/readme.md) or a [mixedCase versus snake_case](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20159%20-%20Mixed%20Case/readme.md) name.

AI coding didn't remove that need.

It multiplied it.

A [CodeRabbit analysis of 470 pull requests](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report) found AI-generated code carries about 1.7x more defects overall than human-only code.

Naming and style consistency errors came in at nearly 2x, the exact class of mistake a linter was built to catch decades ago.

A model can now write in [any human language](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20128%20-%20Non%20English%20Coding/readme.md), [misspell an identifier](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2098%20-%20Speling%20Mistakes/readme.md), or [reorder parameters inconsistently](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2087%20-%20Inconsistent%20Parameters%20Sorting/readme.md) across two files it never compared side by side.

A linter still catches the syntactic version of these mistakes.

The semantic version, like a name that lies about its role, needs a judge that [reads intent, not just tokens](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md).

That's where an [LLM-as-judge](https://arxiv.org/pdf/2508.02994) step fits: a second AI pass, wired into the same [harness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md) that runs the linter, checking the rules no regular expression can express.

[Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) are the natural home for that judge.

A skill reads the standards file fresh every time, instead of trusting a memory that decays across [sessions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md).

Pair the judge with a [criteria check before the task ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md), so the AI can't say a task is done until the standards gate reports zero violations.

A gate that blocks the diff is just another way to [force the AI to obey you](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md), not by asking nicely, but by refusing to let a violation through.

This doesn't replace [reviewing every line before commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md).

It removes the mechanical part of that review, so [a human is free to judge design instead of counting spaces](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md).

When the judge catches a new violation, log it the same way you'd log a [pitfall](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md), so the harness never makes that mistake twice.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/0cb16aa4f4f5b217b6a6313b5b583b3b) -->

```markdown
Please follow our coding standards for this feature.
Use consistent naming and formatting like the rest of the codebase.
I'll check it during code review before we merge.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/5fa81ed7a20b27715261493648bf6ee5) -->

```markdown
Before you say this task is done, run this standards checklist:

- [ ] Run the linter on every changed file, fix every violation.

- [ ] Run the formatter, don't hand-format a single line.

- [ ] Invoke the code-standards-validator skill on the full diff.

- [ ] Check every identifier: no abbreviations, no misleading names.

- [ ] Check indentation matches the project config, no mixed tabs.

- [ ] Check casing: one convention, no mixedCase next to snake_case.

- [ ] Check parameter order against other functions in the file.

- [ ] Check spelling in every identifier, comment, and string.

- [ ] Judge comment quality: flag dead comments and restated code.

- [ ] Judge naming intent: does each name say what it does?

- [ ] Confirm no file mixes languages in identifiers or comments.

- [ ] Log any new violation type as a rule for the next run.

- [ ] Don't report the task done until every box above is checked.

Show me the completed checklist, not just the final code.
```

# Considerations ⚠️

A linter still beats an LLM judge on speed and cost for anything syntactic.

Reserve the judge for rules that [need intent, not tokens](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md).

A gate that blocks too aggressively gets bypassed with `--no-verify`, which defeats the whole point.

Review the judge's false positives the same way you'd review a flaky linter rule.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

An LLM judge costs tokens and time on every gate, so it doesn't replace a linter.

It complements one.

A judge can disagree with itself across two runs on borderline style calls, so keep the deterministic rules in the linter and reserve the judge for what's genuinely ambiguous.

# Tags 🏷️

- Knowledge Management

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 011 - Initialize Agents.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md)

[AI Coding Tip 015 - Force the AI to Obey You](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md)

[AI Coding Tip 016 - Feed Your PR Lessons into the AI Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain/readme.md)

[AI Coding Tip 019 - Tell the AI Why, Not Just What](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md)

[AI Coding Tip 022 - Give AI a Harness to Work With](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md)

[AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md)

[AI Coding Tip 025 - Pair Every Skill With a Pitfalls File](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md)

# Conclusion 🏁

A linter never asked permission to reject bad code.

Neither should your [harness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md).

Wire the standards into hooks, skills, and a judge, so the diff gets rejected before a human ever has to say so.

# More Information ℹ️

[Lint (software) - Wikipedia](https://en.wikipedia.org/wiki/Lint_(software))

[State of AI vs Human Code Generation Report - CodeRabbit](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)

[When AIs Judge AIs: The Rise of Agent-as-a-Judge Evaluation for LLMs](https://arxiv.org/pdf/2508.02994)

[Awesome Static Analysis - curated list of linters and code quality tools](https://github.com/lukehutch/awesome-static-analysis)

# Also Known As 🎭

- Harness-Enforced-Standards
- Machine-Judged-Style
- Standards-as-Code
- Linter-Native-Review

# Tools 🧰

[Mago](https://mago.carthage.software/)

[ESLint](https://eslint.org/)

[SonarQube](https://www.sonarsource.com/products/sonarqube/)

[PHP_CodeSniffer](https://github.com/PHPCSStandards/PHP_CodeSniffer)

[Ruff](https://docs.astral.sh/ruff/)

[RuboCop](https://rubocop.org/)

[Checkstyle](https://checkstyle.sourceforge.io/)

[golangci-lint](https://golangci-lint.run/)

[Clippy](https://doc.rust-lang.org/clippy/)

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)
