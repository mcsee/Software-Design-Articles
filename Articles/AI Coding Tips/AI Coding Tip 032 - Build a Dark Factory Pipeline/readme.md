# AI Coding Tip 032 - Build a Dark Factory Pipeline

![AI Coding Tip 032 - Build a Dark Factory Pipeline](AI%20Coding%20Tip%20032%20-%20Build%20a%20Dark%20Factory%20Pipeline.png)

*Build a factory where no human needs to work, keep the code coming, and place regular human audits.*

> TL;DR: Run your pipeline like a dark factory: automated, sampled, and policed by an adversarial model.

# Common Mistake ❌

You let one model write a pull request, then hand the same model (or a suspiciously agreeable fresh instance of it) the job of approving its own work.

Humans like you are a scarce resource and a bottleneck, so you decide that nobody else will [look at the diffs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md).

# Problems Addressed 😔

- Models like their own output when asked to judge it, a documented self-preference bias that makes same-model review about as objective as a suspect grading their own trial.

- Skip the checkpoints, and your pipeline drifts into unreviewed [workslop](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20313%20-%20Workslop%20Code/readme.md) that nobody catches until it ships.

- [100% human review](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) doesn't scale once your agents merge dozens of pull requests a day.

- Fake full coverage looks safe on a dashboard the same way [vanity coverage](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20320%20-%20Vanity%20Coverage/readme.md) does, great on a slide deck and useless in production.

- Skip the second opinion, and your pipeline quietly [collapses](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20314%20-%20Model%20Collapse/readme.md) into repeating its own mistakes.

# How to Do It 🛠️

1. [Assign](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20026%20-%20Assign%20a%20Persona%20to%20Every%20Skill%20Definition/readme.md) a good builder model to write the code from a [spec](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md) written by another model.

2. Assign a separate model from a [different vendor or family](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20029%20-%20Stop%20Using%20One%20Model%20for%20Everything/readme.md) as the adversarial verifier, whose only job is to find fault with the builder's output.

3. Reject any pull request the verifier flags, and require the builder to fix it before a human in the loop analyzes it.

4. Define a sampling rate for human audit, the way [quality control samples a manufacturing lot](https://www.fabrico.io/blog/aql-vs-100-percent-inspection/) instead of inspecting every unit (you can't scale).

5. Route that sampled percentage of merged pull requests to a human reviewer chosen at random, not the easiest or newest ones.

6. Log every case where a human overrides the adversarial verdict, and [feed it back](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain/readme.md) as a correction signal for the next run.

7. [Block any merge that skips both the adversarial gate and the sampling gate](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md), with no manual bypass.

# Benefits 🎯

1. **Cut review load without cutting review:** Sampling catches the same class of defects a full review would, at a fraction of the human hours.

2. **Remove self-grading bias:** By policy, a [different model](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20029%20-%20Stop%20Using%20One%20Model%20for%20Everything/readme.md) has no incentive to excuse the builder's assumptions.

3. **Keep an auditable trail:** Every override becomes a labeled example you can use to [retrain or reprompt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md) the pipeline.

4. **Scale past human bandwidth:** The pipeline keeps merging while your reviewers sleep, and still gets audited when they wake up.

5. **Separate concerns cleanly:** The [builder still can't be the auditor](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md), watched over by a second model instead of a checklist alone.

# Context 🧠

Taylorist factory automation solved this exact problem decades before software did, and it never pretended to be a [silver bullet](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) either: even the most automated line still keeps a human walking the floor.

A [lights-out factory](https://en.wikipedia.org/wiki/Lights_out_(manufacturing)) runs an entire production line with no on-site workers, because human presence adds variability, not quality.

Foxconn replaced over 60,000 workers at its Kunshan plant with robots that build phones around the clock, and the [dark factory](https://tractian.com/en/glossary/dark-factory) term stuck because the equipment genuinely doesn't need the lights on.

Some data centers borrow a related trick called hypoxic fire suppression: they hold oxygen at roughly 14 to 15 percent, similar to a mountain summit, low enough that nothing can burn but still safe for a technician to walk through.

That's the detail people usually get wrong when they repeat the no oxygen story.

It isn't zero oxygen.

It's a guardrail tuned so the environment stays safe without needing a human standing watch, which is a lot less cinematic than the version that went viral.

The AI coding world already reuses the [dark factory](https://www.mindstudio.ai/blog/what-is-dark-factory-ai-coding-autonomous-pipeline) label for the same idea: a spec goes in, production code comes out, and [no human touches the happy path](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20030%20-%20Script%20Your%20Skills,%20Not%20Your%20Prompts/readme.md) in between.

## The Auditor Can't Be the Builder

Manufacturing solved oversight with acceptance sampling: pull a small, randomized batch from every lot, and let that batch decide whether the whole lot passes.

You can borrow the same math for code: instead of reviewing every merged pull request, you review a defined percentage, chosen at random, and trust the sample to represent the whole.

The missing piece in most autonomous coding pipelines is the adversarial gate, and skipping it is how you end up with a very expensive rubber stamp.

Research on [adversarial code review](https://www.augmentcode.com/guides/adversarial-code-review) confirms what QA teams have known for years: the maker shouldn't grade the checker, because the same assumptions that produced the [defect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) also produce the blind spot in the review.

Studies on self-preference bias back this up with numbers: judges built from the same model family score their own outputs [higher than a neutral judge would](https://arxiv.org/pdf/2604.06996), which is exactly why a builder and its verifier need to come from different vendors.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/1f2b9db0b3851311dc34223638a65920) -->

```markdown
Write the pull request for the new caching layer, then review
your own diff and tell me if it's ready to merge.

If it looks fine to you, merge it directly. I don't need to see
it unless you have doubts about your own work.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/9447dedd9f1105d6584b699e4d0f3661) -->

```markdown
Model A (builder): write the pull request for the new caching
layer from the attached spec. Don't approve your own diff.

Model B (verifier, different vendor than Model A): review the
diff looking only for defects. Reject it if you find any, and
explain exactly what's wrong. Don't fix it yourself.

Route 10% of every batch of merged pull requests, chosen at
random, to a human reviewer. Log every case where the human
overrides Model B's verdict, in either direction.

Keep track of the defects found by a human reviewer
```

# Considerations ⚠️

The builder and verifier must come from different model families, not just different prompts on the same model, or the self-preference bias survives the split.

Set the sampling rate too low, and systemic drift compounds across dozens of merges before you catch it.

By the time you notice, it's already an incident review, not a code review.

You still need a human in the loop, even for the sampled slice and the override log, because consensus between two models isn't the same as correctness.

Sampling replaces [reviewing every line](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) only where full review can't keep up with the volume, not as a blanket excuse to stop looking.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

This setup assumes you can run several distinct models in your pipeline.

That adds cost and latency compared to a single-model workflow.

None of this comes free.

Adversarial review reduces obvious defects but can still miss subtle domain logic errors that neither model was trained to recognize, which is the humbling part.

# Tags 🏷️

- Safety

# Level 🔋

[X] Advanced

# Related Tips 🔗

[AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md)

[AI Coding Tip 029 - Stop Using One Model for Everything](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20029%20-%20Stop%20Using%20One%20Model%20for%20Everything/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 022 - Give AI a Harness to Work With](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md)

[AI Coding Tip 008 - Use Spec-Driven Development with AI](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI/readme.md)

[AI Coding Tip 016 - Feed Your PR Lessons into the AI Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20016%20-%20Feed%20Your%20PR%20Lessons%20into%20the%20AI%20Brain/readme.md)

[AI Coding Tip 020 - Create a Second Brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md)

[AI Coding Tip 026 - Assign a Persona to Every Skill Definition](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20026%20-%20Assign%20a%20Persona%20to%20Every%20Skill%20Definition/readme.md)

[AI Coding Tip 030 - Script Your Skills, Not Your Prompts](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20030%20-%20Script%20Your%20Skills,%20Not%20Your%20Prompts/readme.md)

# Conclusion 🏁

A dark factory doesn't skip quality control.

It redesigns it so machines catch machines, and humans only need to look at a sample instead of babysitting every commit.

Give your pipeline the same three pieces: a builder, an adversarial verifier from a different vendor, and a sampling gate.

Your reviewers get their weekends back, and the diff still gets caught before it ships.

# More Information ℹ️

[What Is Lights Out Dark Manufacturing?](https://www.advancedtech.com/blog/what-is-lights-out-dark-manufacturing/)

[Lights out (manufacturing), Wikipedia](https://en.wikipedia.org/wiki/Lights_out_(manufacturing))

[Dark Factory: Definition, Technologies and Industrial Use Cases](https://tractian.com/en/glossary/dark-factory)

[Hypoxic Air Fire Preventive System](https://www.conteg.com/products/hypoxic-air-fire-preventive-system)

[What Is the Dark Factory Approach to AI Coding?](https://www.mindstudio.ai/blog/what-is-dark-factory-ai-coding-autonomous-pipeline)

[The Dark Factory Pattern, HackerNoon](https://hackernoon.com/the-dark-factory-pattern-moving-from-ai-assisted-to-fully-autonomous-coding)

[Adversarial Code Review: Why the Maker Shouldn't Grade the Checker](https://www.augmentcode.com/guides/adversarial-code-review)

[Refute-or-Promote: Adversarial Stage-Gated Multi-Agent Review](https://arxiv.org/pdf/2604.19049)

[Quantifying and Mitigating Self-Preference Bias of LLM Judges](https://arxiv.org/html/2604.22891v4)

[AQL Sampling vs 100% Inspection](https://www.fabrico.io/blog/aql-vs-100-percent-inspection/)

# Also Known As 🎭

- Dark-Factory-Pipeline
- Adversarial-Model-Gate
- Sampling-Based-Code-Audit

# Tools 🧰

Any continuous integration pipeline setup that can call two or more distinct model APIs in sequence works here, as part of the [harness](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md) you already use, no need to buy anything fancy just to route a webhook to a human.

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
