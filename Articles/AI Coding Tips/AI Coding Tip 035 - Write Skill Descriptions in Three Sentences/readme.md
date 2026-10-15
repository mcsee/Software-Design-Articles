# AI Coding Tip 035 - Write Skill Descriptions in Three Sentences

![AI Coding Tip 035 - Write Skill Descriptions in Three Sentences](AI%20Coding%20Tip%20035%20-%20Write%20Skill%20Descriptions%20in%20Three%20Sentences.png)

*A skill nobody finds in time is a skill you don't have.*

> TL;DR: Split every skill description into three sentences: when to read it, when to use it, and what it does.

# Common Mistake ❌

You write a skill description as one long paragraph.

It explains everything the skill does.

You list every feature, every parameter, every [edge case it handles](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md).

That's the same way a [function keeps growing](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md), until nobody remembers its original job.

An agent [scans a hundred skill descriptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md) to pick one.

It can't tell in a glance whether yours applies.

So it skips your skill for one with a sharper trigger.

Or it opens the whole file just to check.

That's the exact context cost [progressive disclosure](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20013%20-%20Use%20Progressive%20Disclosure/readme.md) was invented to avoid.

You are suffering the problem you were supposed to solve.

# Problems Addressed 😔

- Too many skills, or overly long descriptions, degrade agent performance, since the router itself burns precious context deciding which one to open.
- A description that only states [what a skill does](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md) can't rule itself out early, so every candidate stays in play too long, like a job application listing every tool you've touched instead of the one job you want.
- Two skills covering overlapping topics with similar prose become indistinguishable at a glance, and that confusion breeds mistakes: the agent picks the wrong one or asks which you meant.
- A skill you can't trigger without naming it might as well not exist, since a discoverable library's whole point is that the agent finds it on its own, not because you pointed the way.
- This is a special problem on large skill codebases with [many similar names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md).

# How to Do It 🛠️

1. Name the skill after the moment someone reaches for it, not the topic it covers.

2. Open the description with a first sentence that repeats that same trigger moment.

3. Write a second sentence naming the exact situation that calls for the skill.

4. Close with a third sentence stating what the skill does, nothing more.

5. Reread the three sentences, and cut one if two answer the same question.

6. Keep it to three sentences; a fourth is usually a hedge in disguise.

7. Test it cold on an agent that has never seen the skill, and see if it opens the file on its own.

# Benefits 🎯

1. **Faster routing:** The agent decides to open your skill without reading its whole body first.

2. **Fewer wrong picks:** A sharp trigger sentence keeps adjacent skills from colliding on the same task.

3. **Lower context cost:** Skills that stay closed until needed leave more of the [context budget](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md) for your actual code.

4. **Easier maintenance:** Three sentences are trivial to update after every model release, while a paragraph invites you to leave it stale.

5. **Cleaner libraries:** A description you can't compress to three sentences is usually a sign the skill itself does too much and should [split into two](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md).

# Context 🧠

A skill acts as a router before it's a document.

Its only job is deciding whether to open the file, not explaining anything once it's open.

That trigger lives in two places: the name, and the first line of the description.

Everything after that first sentence just confirms the decision.

The same restraint applies to the rest of the skill: you shouldn't over-specify it, and you shouldn't smuggle implementation steps into the trigger.

Skills rot the same way an unpruned [`AGENTS.md` rots](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20034%20-%20Stop%20Hoarding%20Rules%20in%20Your%20AGENTS.md/readme.md).

You need to treat the description the same way: keep it durable, and regenerate it instead of patching it forever.

## Why Three, Not One or Five?

One sentence collapses when to read, [when to use](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md), and what it does into a single clause, and the trigger usually gets dropped.

Five sentences drift back toward the feature-dump paragraph this tip is trying to kill.

Three is the smallest [magic number](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md) that keeps those questions separate.

# Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/2a7f73046103ed4a26692be0e9e6471e) -->

```yaml
---
name: pdf-toolkit
description: >
  This skill handles PDF work.
  It generates new PDF files from templates.
  It merges multiple PDFs into one document.
  It adds text or image watermarks to any page.
  It extracts text or images from existing files.
  It converts pages to PNG or JPEG.
  It splits a file by page range.
  It rebuilds a file's bookmark structure after edits.
---
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/9d97d35f8edca7769318a7981de85882) -->

```yaml
---
name: pdf-toolkit
description: >
  Read this when a task touches an existing PDF file on disk.
  Use it to merge, split, watermark, or extract PDF content.
  It saves you from hand-rolling a PDF library call each time.
  It wraps the library behind one consistent interface.
---
```

# Considerations ⚠️

Three sentences is a target, not a hard limit.

A fourth sentence is fine if it adds a genuine constraint.

The rule assumes one skill per file, with one clear trigger.

A skill covering several unrelated triggers should probably [split into two](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md).

Compressing a description takes more editing time than writing five loose sentences.

Budget for a second pass instead of shipping the first draft.

The three sentences aren't the place to [give the skill a voice](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20026%20-%20Assign%20a%20Persona%20to%20Every%20Skill%20Definition/readme.md) either.

That framing belongs inside the file, not in the trigger a router only glances at.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

This tip covers the description field, not the skill's body.

A tight trigger on a badly organized file still wastes tokens once the agent opens it, and it doesn't [document what happens when the skill fails halfway through](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md).

Different [harnesses](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md) parse and weight descriptions differently, so a trigger tuned for one runtime may need retuning for another.

A three-sentence trigger is still prose, so it can't guarantee routing the way a [scripted rule](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20030%20-%20Script%20Your%20Skills,%20Not%20Your%20Prompts/readme.md) can, though it does make the prose easier for a model to act on correctly.

A skill can have a perfect trigger and still get skipped if the agent's list of available skills is too long to scan, and no amount of clever wording fixes a router that never reads that far down the list.

# Tags 🏷️

- Knowledge Management

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

[AI Coding Tip 009 - Compact Your Context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md)

[AI Coding Tip 013 - Use Progressive Disclosure](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20013%20-%20Use%20Progressive%20Disclosure/readme.md)

[AI Coding Tip 019 - Tell the AI Why, Not Just What](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md)

[AI Coding Tip 022 - Give AI a Harness to Work With](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20022%20-%20Give%20AI%20a%20Harness%20to%20Work%20With/readme.md)

[AI Coding Tip 025 - Pair Every Skill With a Pitfalls File](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md)

[AI Coding Tip 026 - Assign a Persona to Every Skill Definition](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20026%20-%20Assign%20a%20Persona%20to%20Every%20Skill%20Definition/readme.md)

[AI Coding Tip 030 - Script Your Skills, Not Your Prompts](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20030%20-%20Script%20Your%20Skills,%20Not%20Your%20Prompts/readme.md)

[AI Coding Tip 034 - Stop Hoarding Rules in Your AGENTS.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20034%20-%20Stop%20Hoarding%20Rules%20in%20Your%20AGENTS.md/readme.md)

# Conclusion 🏁

A skill description isn't a summary, is a filter.

Give it three jobs: when to read it, when to use it, what it does.

Anything more belongs inside the file.

Anything less leaves one of those questions unanswered, right when it matters.

Nobody grades your `SKILL.md` on prose style.

The router grades it on speed, and it doesn't hand out partial credit.

# More Information ℹ️

[Agent Skills documentation, Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)

# Also Known As 🎭

- Three-Sentence-Skill-Rule
- Skill-Trigger-Writing
- Progressive-Disclosure-Descriptions

# Tools 🧰

The `description` field in a Claude Code `SKILL.md` frontmatter block is the only part an agent reads before deciding to open the file.

Whatever wisdom lives in the other 400 lines never gets a chance if that field reads like a shrug.

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