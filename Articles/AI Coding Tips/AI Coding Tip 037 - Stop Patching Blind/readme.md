# AI Coding Tip 037 - Stop Patching Blind

![AI Coding Tip 037 - Stop Patching Blind](AI%20Coding%20Tip%20037%20-%20Stop%20Patching%20Blind.png)

*Old code, new AI, same unwritten test suite.*

> TL;DR: Patch code that never had a test written for it, and every quick fix becomes tomorrow's outage.

# Common Mistake ❌

You assume a decades old, stable feature must have some kind of safety net, because it has been shipping without complaints for almost twenty years.

Automated testing wasn't standard practice when much of that code was written.

Nobody ever wrote a test for it, not because a team decided to skip that step.

The step simply didn't exist yet as an expectation.

In September 2026, Microsoft shipped a security update for Excel, documented on its own [KB5002914 support page](https://support.microsoft.com/en-us/servicing/office/hotfix/excel/5002914), and paste operations started failing silently across Excel 2016, Office 2019, Office 2021 LTSC, Office 2024 LTSC, and Microsoft 365 Apps.

[AutoFill](https://support.microsoft.com/en-us/office/fill-data-automatically-in-worksheet-cells-74e31bdd-d993-45da-aa82-35a236c5b5db) broke too, presumably out of solidarity 🙂.

Microsoft's follow-up fix, [KB5002665](https://support.microsoft.com/en-us/servicing/office/hotfix/excel/5002665), later confirmed the trigger in its own words: "If the workbook contains conditional formatting, paste operations might continue to fail."

Users found the pattern before any release note did.

They flooded [Microsoft's own Q&A forum](https://learn.microsoft.com/en-us/answers/questions/5999281/we-are-facing-issue-in-excel-2026-2019-and-2021-co) with reports of cells stuck mid-selection, borders that kept blinking, and an Escape key that stopped working.

That thread ran more than a hundred replies deep before a real fix shipped.

Nobody on that patch team sat down and chose to skip testing the conditional formatting code path.

There was no test to run, because there had never been one, and a security hotfix isn't the moment anyone stops to write the first test a decades old module has ever had.

This isn't a Microsoft problem.

It's what happens anywhere a stable product ships a fix into a module nobody has ever verified with an actual test.

An AI can generate that diff fast.

The code underneath it is old enough that testing it was never part of anyone's job.

# Problems Addressed 😔

- A patch to code with no tests ships on faith, not on evidence, and faith isn't a regression suite.
- AI writes changes far faster than a team can manually verify every code path they touch, which widens the gap between how fast you can edit and how fast you can confirm nothing broke.
- [Changes shipped without coverage](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20175%20-%20Changes%20Without%20Coverage/readme.md) hide their damage until a user reports it, and users report the damage as lost trust, not as a filed issue.
- A codebase with no seams forces every change, human or AI, to touch the original untested logic directly, so a narrow fix for a security hole can reach into unrelated behavior like clipboard handling.
- [Vanity coverage](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20320%20-%20Vanity%20Coverage/readme.md) numbers convince a team it's safe to patch fast, while the actual paths that break in production were never exercised by any test, a green dashboard lying straight to your face.
- Rolling back becomes the only realistic fix, because nobody wrote down what the old, untested behavior actually was before the patch replaced it.
- Rolling back also puts the security hole right back, until someone patches it again, this time with a test.
- Every unverified patch that reaches production teaches users the product is less stable than it was yesterday, and that lesson compounds with every release.

# How to Do It 🛠️

1. Treat any code without tests as legacy code, using [Michael Feathers' definition](https://en.wikipedia.org/wiki/Legacy_code) from *Working Effectively with Legacy Code*, no matter how recently it was last edited.

2. Write a [characterization test](https://en.wikipedia.org/wiki/Characterization_test) that records the module's current behavior, including the parts you find ugly or confusing, before the AI changes a single line near it.

3. Find a seam, a place where you can insert a change without editing the original code path, and route the AI's patch through that seam instead of through the untested core.

4. Ask the AI to draft the missing tests for the exact module you're about to patch, then [review every assertion before you commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) to it.

5. Run the full [regression suite](https://en.wikipedia.org/wiki/Regression_testing) and any [acceptance tests](https://en.wikipedia.org/wiki/Acceptance_testing) tied to the feature before and after the patch, and reject any AI-generated fix that doesn't leave every existing test passing.

6. Scope the change to the smallest edit that closes the actual security hole, and stop the AI from cleaning up nearby legacy code in the same commit.

   Don't authorize the AI to change functional behavior while it closes a security hole, and if the fix genuinely can't avoid touching behavior, [make it stop and ask a human](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md) before it does.

7. Add every new characterization test to [the pipeline](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20032%20-%20Build%20a%20Dark%20Factory%20Pipeline/readme.md), so the same regression under the same conditions never again depends on a user noticing it first.

8. Ship the patch to a small [canary](https://martinfowler.com/bliki/CanaryRelease.html) segment before a full rollout, so a blind spot in decades old code surfaces on a fraction of your users instead of on all of them at once.

   A canary isn't always possible with a security hole.

   When the vulnerability is already public or actively exploited, leaving any segment unpatched just hands the remaining users to whoever is exploiting it, so ship to everyone at once and lean on the characterization tests instead of a staged rollout to catch a regression.

# Benefits 🎯

1. **Ship with evidence:** A passing characterization suite replaces a shrug and a hope with [a specific, checkable claim](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) about what still works.

2. **Shrink the blast radius:** A canary rollout turns a legacy blind spot into a contained incident instead of a headline about broken spreadsheets.

3. **Turn legacy code into safe territory:** Characterization tests convert unknown behavior into known behavior, so the AI can extend it without guessing.

4. **Stop the firefighting cycle:** A tested seam absorbs the next patch too, instead of forcing another blind edit into the same fragile module.

5. **Protect a stable product's reputation:** Users forgive a slow fix; they don't forgive a security update that quietly [breaks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) a feature they use every day.

6. **Make review possible:** A reviewer can [check a diff against a test](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md) far faster than they can trace decades old logic by eye.

# Context 🧠

Michael Feathers opened *Working Effectively with Legacy Code* with a blunt definition: legacy code is simply code without tests.

Not old code, not ugly code, code you can't safely change because nothing tells you when you broke it.

Excel's conditional formatting and clipboard logic fits that definition perfectly, and so does most of the code every long-lived product still runs in production.

Age alone doesn't make that inevitable, no matter how much a rushed patch team would like to blame the calendar.

Meanwhile, over at [SQLite](https://www.sqlite.org/mostdeployed.html), somebody has clearly never let a deadline win an argument: running since August 2000, sitting inside an estimated one trillion database files worldwide, and likely the most widely deployed software library on the planet after zlib.

Its [own testing page](https://www.sqlite.org/testing.html) states the project carries roughly 590 times as much test code as product code: fuzzing that runs about a billion mutations a day, out-of-memory and I/O fault injection, crash recovery checks, and a claimed 100% branch and MC/DC coverage on the core engine, verified under Valgrind and multiple sanitizers before every release.

Twenty-five years old and drowning in tests is a choice a team made and kept making.

Twenty-five years old and never tested once is a different choice, made by omission a long time ago and repeated every time nobody goes back to fix it.

AI changes the economics of that second choice in a way Feathers never had to plan for.

Writing a patch used to be the slow part, and testing it thoroughly, even manually, could roughly keep pace.

Now an AI assistant can [draft a fix](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20023%20-%20Shrink%20your%20AI's%20Pull%20Request/readme.md) for a fifteen year old code path in the time it takes to read the CVE, and the pace of change [outruns the pace of verification](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md) unless the test suite is automated and runs on every change.

A characterization test doesn't ask whether the old behavior was correct.

It asks whether the new code still does what the old code did, on purpose or not, so a patch can prove it didn't change anything it wasn't supposed to touch.

That's the seam Feathers describes: a point in the code where you can alter behavior without editing the class or function that currently owns it, which is exactly where an AI-generated fix belongs when the surrounding code has no coverage.

Feathers built his whole book around getting legacy code under test through seams like this one, not around rewriting the module first and hoping the tests catch up later.

A security patch through a seam only touches the one behavior the CVE is about.

Only [a passing regression suite in the exit criteria](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md) counts, not just code that compiles and looks plausible.

[Code standards you force on every change](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md) should include this one explicitly for any file that touches a stable, shipped feature.

And when an AI reports that tests pass, verify it the way you'd [verify any other AI claim you can't fully see](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20033%20-%20Protect%20Yourself%20Against%20AI%20Cheating/readme.md): run the suite yourself, don't take the summary as proof.

The KB5002914 incident didn't need a smarter model to avoid.

It needed a characterization test on the conditional formatting code path, run automatically before the patch shipped to hundreds of millions of installs.

Users get frustrated by new features that don't work, but they never tolerate [breaking changes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20303%20-%20Breaking%20Changes/readme.md) on functionality they've been using for years.

# Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/30d6bd61b95d5f6ccdbe4fad3c53c9b4) -->

```markdown
Fix the security hole 
in the conditional formatting module and ship it today.
This code has never had a test.
It has worked fine for years without one.
Ship it the same way.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/c12bc197868194545f9f15c11781b60c) -->

```markdown
Write characterization tests 
For the conditional formatting module.

It never had tests.
You must capture its real clipboard and AutoFill behavior.

Show me the failing diff
Only after every existing and new test passes.

I will also validate it manually.

Scope the fix to 
The smallest change that closes the security hole.

You aren't authorized to change functional behavior.

If you must, stop and ask me first.
```

# Considerations ⚠️

A characterization test doesn't judge whether old behavior was good design.

It only proves the patch didn't silently change it, which is a different and more urgent question during an emergency fix.

Writing that first test on truly untested legacy code takes real hours you don't have during an active incident.

The honest move is budgeting for it before the next CVE, not during it.

Nobody writes a careful test while everyone is yelling in the incident channel.

An AI can draft the test scaffolding quickly, but someone still has to confirm the assertions describe the behavior you actually want preserved, not the behavior the AI assumed from the function name.

A security patch authorizes closing the hole, nothing else.

If the AI decides the smallest fix still requires changing what the feature does, [that decision belongs to a human](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md), not to whichever model happened to draft the diff.

A canary rollout only limits damage if someone is watching it, so pair it with the same kind of monitoring you'd want on any [privileged system change](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20036%20-%20Grant%20AI%20the%20Least%20Privilege%20Possible/readme.md).

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

Characterization tests describe current behavior, not correct behavior, so a [defect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) baked into the legacy code gets preserved right alongside everything that works, immortalized by the very tests meant to protect you.

Retrofitting tests onto a codebase with none takes longer than the emergency patch itself.

That's exactly why teams skip it under deadline pressure.

Generation after generation of engineers inherits the same untested pile and pretends it's fine.

# Tags 🏷️

- Safety

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 015 - Force the AI to Obey You](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md)

[AI Coding Tip 021 - Avoid Comprehension Debt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md)

[AI Coding Tip 022 - Give AI a Harness to Work With](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md)

[AI Coding Tip 023 - Shrink your AI's Pull Request](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20023%20-%20Shrink%20your%20AI's%20Pull%20Request/readme.md)

[AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md)

[AI Coding Tip 027 - Force Code Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20027%20-%20Force%20Code%20Standards/readme.md)

[AI Coding Tip 032 - Build a Dark Factory Pipeline](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20032%20-%20Build%20a%20Dark%20Factory%20Pipeline/readme.md)

[AI Coding Tip 033 - Protect Yourself Against AI Cheating](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20033%20-%20Protect%20Yourself%20Against%20AI%20Cheating/readme.md)

# Conclusion 🏁

Every stable product is one untested module away from becoming a headline about broken copy and paste.

AI didn't create that risk.

It just lets a team reach it faster than ever, one confidently drafted patch at a time.

The team walks in cheerfully unaware it just stepped into a minefield nobody mapped.

Write the characterization test first, find the seam, and let the AI work inside walls a human actually verified.

A quick fix that breaks a feature everyone relies on isn't quick.

It's just a slower disaster with better timing.

# More Information ℹ️

[KB5002914 Support Page, Microsoft](https://support.microsoft.com/en-us/servicing/office/hotfix/excel/5002914)

[KB5002665 Support Page, Microsoft](https://support.microsoft.com/en-us/servicing/office/hotfix/excel/5002665)

[We Are Facing Issue in Excel 2026, 2019 and 2021, Microsoft Q&A](https://learn.microsoft.com/en-us/answers/questions/5999281/we-are-facing-issue-in-excel-2026-2019-and-2021-co)

[Microsoft Office September 8, 2026 Update Causes Excel Copy Paste Issue, Born City](https://borncity.com/win/2026/09/10/microsoft-office-september-8-2026-update-causes-excel-copy-paste-issue/)

[How SQLite Is Tested](https://www.sqlite.org/testing.html)

[Most Widely Deployed and Used Database Engine, SQLite](https://www.sqlite.org/mostdeployed.html)

[Legacy Code, Wikipedia](https://en.wikipedia.org/wiki/Legacy_code)

[Characterization Test, Wikipedia](https://en.wikipedia.org/wiki/Characterization_test)

[Regression Testing, Wikipedia](https://en.wikipedia.org/wiki/Regression_testing)

[CanaryRelease, Martin Fowler](https://martinfowler.com/bliki/CanaryRelease.html)

# Also Known As 🎭

- Untested-Legacy-Patching
- Characterization-Test-First
- Seam-Driven-AI-Fixes
- Blind-Patch-Syndrome

# Tools 🧰

Any unit testing framework already in your stack, a [feature flag](https://en.wikipedia.org/wiki/Feature_toggle) or canary deployment tool, and a coverage reporter wired into continuous integration so a missing test on a changed file blocks the merge.

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
