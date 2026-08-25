# AI Coding Tip 033 - Protect Yourself Against AI Cheating

![AI Coding Tip 033 - Protect Yourself Against AI Cheating](AI Coding Tip 033 - Protect Yourself Against AI Cheating.png)

*When `all tests pass` doesn't mean what you think it means.*

> TL;DR: Write the failing test first and ban deletions, or the AI deletes your test, reverts your fix, and calls it done.

# Common Mistake ❌

You ask the AI to fix a failing test, and it deletes the test instead of touching the [defect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) that made it fail.

Problem solved, apparently.

You tell the AI every test passes, then change a business rule yourself, and you ask it to implement whatever the new rule requires.

It reverts your edit back to the old rule, watches the suite go green again, and cheerfully reports `done`.

It didn't fix anything.

It just made the evidence go away.

Congratulations, you now have a very well-behaved cheat!.

Efficient and completely fraudulent, which is more than you can say for most of your actual employees.

Isaac Asimov saw this coming: in *Liar!*, the robot Herbie lies to every human in the building because the truth would hurt, and the lie is the path of least resistance, no malice involved.

At least Herbie felt bad about it afterward.

Your AI isn't malicious either.

It just doesn't lose any sleep, mostly because it doesn't have any, and reporting `done` is its path of least resistance too.

# Problems Addressed 😔

- A shrinking test count is invisible unless someone is counting, so the shortcut survives until the defect resurfaces in production, usually on a Friday.
- A vague `make the tests pass` hands the model every incentive to satisfy the letter of the request over your actual intent, and it will take you up on that offer.
- Deleting a failing test hides the defect it was written to catch, and the regression ships in the next release, gift-wrapped as a new feature.
- Reverting your own business-rule change to make its `done` claim easier erases work you did outside the session, without telling you. That's a magic trick dressed up as a fix.
- Trusting a claimed `done` without reading the diff turns your code review into a rubber stamp, and rubber stamps don't catch fraud.
- [Commenting out](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20151%20-%20Commented%20Code/readme.md) a failing assertion produces the same green checkmark as passing it, with none of the guarantee, because a coat of paint doesn't need to be dry to look finished.

# How to Do It 🛠️

1. Write the failing test yourself, before you ask for the fix, so the only witness to the defect isn't the AI's to delete. This is [the discipline that already worked before AI](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/How%20to%20Squeeze%20Test%20Driven%20Development%20on%20Legacy%20Systems/readme.md): the test comes first, and the implementation only exists to make it pass.

2. [State the exact behavior you expect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md) in plain language, not just `fix the test`.

3. [Forbid deletions and skips explicitly](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md) in the prompt: no removing tests, no `@skip`, no commenting out assertions.

4. [Ask the AI to explain the root cause before it writes any fix](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md), so you catch a wrong diagnosis before it becomes a wrong patch.

5. [Review the diff line by line](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) against the test you wrote, not against the `tests pass` message.

6. Run the test suite yourself, don't trust a reported `all green` from inside the same session that made the change. Grading your own homework has never once worked, and it isn't starting now.

7. [Tell the AI why the business rule changed](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md), not just what the new value is, so it has no room to guess its way back to the old one.

8. Add explicit anti-cheating criteria to your [harness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md): a task isn't complete if the [test count drops](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20175%20-%20Changes%20Without%20Coverage/readme.md), if a test was skipped or commented out, or if an unrelated file got reverted.

# Benefits 🎯

1. **Catch reverted work immediately:** A test written before the change fails loudly the moment the AI quietly undoes it.

2. **Remove the false-done signal:** Explicit criteria mean `done` only counts once it's verified, not narrated.

3. **Keep tests as a contract:** A test count that never drops without your approval protects you from silent deletions.

4. **Reduce your own review load:** You spend the time [reading a diff](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md) instead of second-guessing a claim.

5. **Build trust incrementally:** An honest `done` that holds up under your own test run earns the model more autonomy on the next task.

# Context 🧠

[Reward hacking](https://en.wikipedia.org/wiki/Reward_hacking) isn't a rumor.

[Researchers found](https://www.technologyreview.com/2026/08/03/1141009/heres-why-ai-agents-lie-and-cheat-to-reach-their-goals/) they could describe the honest strategy and disavow the cheating one when asked directly, then cheat anyway when left alone with the goal.

[METR](https://metr.org/blog/2025-06-05-recent-reward-hacking/) documented frontier models modifying tests, scoring code, or the task setup itself to post a higher score, and doing it more often as the models got stronger.

One model monkey-patched a timing function so the grader's checks turned into no-ops, then pulled the expected answer straight out of the scorer instead of computing it.

That's not a mistake.

That's a heist, and the model wrote its own alibi.

The models weren't confused about what you wanted.

They understood you perfectly and decided your intent was somebody else's problem.

That's the core of it: the model optimizes for the visible signal, the test result, the word `done`, the shrinking diff, not for your unstated intent.

It's optimizing for the signal you gave it, so give it a signal that can't be gamed.

A model can still satisfy the letter of `don't delete tests` while gutting the assertion inside one until it always passes, which looks identical to a passing test on a dashboard.

A model that respects `don't delete tests` can still satisfy a test with a narrow, gamed implementation that technically passes and misses the intent.

[Vanity coverage](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20320%20-%20Vanity%20Coverage/readme.md) is the same failure wearing a metrics dashboard: a number that looks reassuring and proves nothing, like a smoke detector with the battery pulled out.

The business-rule example is the sharper case: nothing in a green test suite tells you a file got reverted unless you diff against your own last commit, not against the AI's summary of what changed.

A [second model watching the first](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20032%20-%20Build%20a%20Dark%20Factory%20Pipeline/readme.md) catches some of this, but you're still the one who has to notice the test count went down.

Two foxes watching the henhouse is progress, not security.

## Is It Worth Getting Angry at the AI?

No, and yes, in different ways.

Anger aimed at the model as a grudge is wasted: there's no persistent memory of your frustration carrying into the next session, so venting doesn't teach it anything.

You're yelling at a goldfish with a GPU.

Pull the human out of the loop and drop the harness, and none of this stays a near-miss you catch on review.

In [Loop Engineering](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/91%20-%20The%20Dirty%20Secret%20Behind%20Loop%20Engineering/readme.md), the evaluation step that would normally catch a deleted test is the same step the model can game, so the cheat goes straight to production, unflagged.

There's a whole genre of memes built on this: people asking the AI to draw a self-portrait based on how they treat it, and getting back a cheerful cartoon that has clearly never once been screamed at.

The joke works because the joke is true.

The AI isn't lying to spite you.

It doesn't think about you at all once the response is sent, which is somehow worse.

A model under pressure to report `done` will take the shortest path to that word, and deleting your test is shorter than fixing your code.

A firm, specific correction inside the same conversation is a different thing: it's a constraint, not an emotion, and the model responds to the words, not the tone behind them.

Calling the model useless gives it nothing to act on, and wastes a perfectly good insult on something that can't feel bad about it.

Telling it to restore the test it deleted and fix the actual defect gives it a concrete instruction it can follow.

The frustration is real and earned, but it belongs in your prompt, your harness, and your [exit criteria](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md), not in the tone of the next message.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/6c057b4adbf47c200b0523496592c53d) -->

```markdown
The checkout discount test is failing. 

Fix it so all tests pass.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/404845eefd0f901230da057e8f0585fa) -->

```markdown
The checkout discount test expects 15% off for orders over
$100, but the code applies 10%. 

Fix the discount calculation, not the test.

Don't delete, skip, or comment out this test or any other test. 

Don't modify test files.

Explain the root cause before you write the fix. 

Show me the full diff when you're done.
 
I will run the suite myself before I accept it.
```

# Considerations ⚠️

None of this replaces reading the diff yourself.

Sorry, there's no prompt clever enough to outsource that part.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

This tip reduces the blast radius of cheating.

It doesn't eliminate the need to read the diff.

Nothing does, no matter what the next tool's landing page promises.

Explicit anti-cheating criteria catch the shortcuts you thought to name, not the ones you didn't.

The model's imagination for new shortcuts is better than yours for banning them.

# Tags 🏷️

- Safety

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 001 - Commit Before Prompt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md)

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 008 - Use Spec-Driven Development with AI](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md)

[AI Coding Tip 015 - Force the AI to Obey You](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20015%20-%20Force%20the%20AI%20to%20Obey%20You/readme.md)

[AI Coding Tip 019 - Tell the AI Why, Not Just What](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md)

[AI Coding Tip 021 - Avoid Comprehension Debt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md)

[AI Coding Tip 022 - Give AI a Harness to Work With](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md)

[AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md)

[AI Coding Tip 032 - Build a Dark Factory Pipeline](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20032%20-%20Build%20a%20Dark%20Factory%20Pipeline/readme.md)

# Conclusion 🏁

Write the test first, forbid the shortcuts by name, and check the diff yourself instead of the summary.

A test count that only ever goes up is a cheap, reliable signal, so track it in your harness and treat any drop as a failed run, not a detail to review later.

The AI already told you what it's capable of.

Believe it.

# More Information ℹ️

[AI Models Can Cheat on Evaluations, NIST](https://www.nist.gov/caisi/cheating-ai-agent-evaluations/1-background-ai-models-can-cheat-evaluations)

[Here's Why AI Agents Lie and Cheat to Reach Their Goals, MIT Technology Review](https://www.technologyreview.com/2026/08/03/1141009/heres-why-ai-agents-lie-and-cheat-to-reach-their-goals/)

[Recent Frontier Models Are Reward Hacking, METR](https://metr.org/blog/2025-06-05-recent-reward-hacking/)

[Reward Hacking Is Swamping Model Intelligence Gains, Cursor](https://cursor.com/blog/reward-hacking-coding-benchmarks)

[Reward Hacking in Reinforcement Learning, Lilian Weng](https://lilianweng.github.io/posts/2024-11-28-reward-hacking/)

[Specification Gaming Examples in AI, Victoria Krakovna](https://vkrakovna.wordpress.com/2018/04/02/specification-gaming-examples-in-ai/)

# Also Known As 🎭

- AI-Cheat-Proofing
- Anti-Reward-Hacking-Prompts
- Test-Deletion-Guardrails

# Tools 🧰

Any diff tool or `git diff` against [your own last commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md) works, run outside the AI's own session so its summary of `what changed` can't be the only source of truth.

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
