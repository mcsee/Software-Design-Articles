# AI Coding Tip 040 - Make the AI Audit Your Own Contradictions

![AI Coding Tip 040 - Make the AI Audit Your Own Contradictions](AI%20Coding%20Tip%20040%20-%20Make%20the%20AI%20Audit%20Your%20Own%20Contradictions.png)

*When your rules disagree, the AI breaks the tie.*

> TL;DR: Ask the AI to list where your prompts, skills, and decisions contradict each other before it invents a tie-breaker.

# Common Mistake ❌

You work with the AI for hours, days, then weeks with the console open on fire.

You write prompts, add agents, instructions, memories, and pile up skills.

Along the way you learn the domain and take decisions.
 
You discover the requirements as you go as humans do.

Your AI follows each new instruction and never mentions the contradictory old ones.

Nothing in the context marks which instruction replaces which.

You never read the whole pile as a big-picture document.

So you ask for the next feature, and the AI reads two instructions that disagree.

It doesn't [stop to ask you](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20038%20-%20Make%20the%20AI%20Ask%20Before%20It%20Builds/readme.md).

It picks one and keeps going with total confidence.

# Problems Addressed 😔

- Two or three instructions disagree, and the AI picks one arbitrarily instead of asking which one wins.

- The AI fills the gap with an invented hallucinated rule, and nothing in the output tells you it made a choice.

- Your decisions drift as you learn the domain, so the [old ones](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20168%20-%20Undocumented%20Decisions/readme.md) sit next to the new ones.

- Decisions you never made explicit stay [hidden](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20198%20-%20Hidden%20Assumptions/readme.md) until the AI trips over them.

- Your [AGENTS.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md), your [skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md), and your agent definitions each keep their own copy of a rule, and the copies drift apart.

- A wrong guess lands in the context and becomes a premise for the next answer.

- A confident answer built on a coin flip is a hallucination you asked for.

# How to Do It 🛠️

1. [Commit your work](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md) so the audit starts from a clean checkpoint.

2. Gather everything the AI reads: your [AGENTS.md files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md), your [skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md), your agent definitions, your memory notes, and the decisions from the chat.

3. Open a [fresh adversarial session](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md) and load only those files, plus a short [summary](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context/readme.md) of the long chat.

4. Tell the AI to audit only, with [no edits and no new features](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md).

5. Ask for *every contradiction* in a numbered table, quoting both conflicting instructions exactly and naming the file or message where each one lives.

6. Ask the LLM to rank each item by what breaks first if the AI guesses wrong.

7. Ask for a second list with the decisions you never made explicit, and tell the AI to surprise you with the ones you don't remember making.

8. Read both quoted lines of every item yourself, because the AI can also invent a contradiction.

9. Pick the winner of each item, one at a time, and write down [the reason](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md) next to it.

10. Keep each winner in one place and replace every other copy with a pointer, using a [pitfalls file](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md) for the traps you found.

11. Run the same audit with a [different model](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20029%20-%20Stop%20Using%20One%20Model%20for%20Everything/readme.md), because a model misses its own blind spots.

12. Repeat after every long session, since iterating is how you learn the domain and how new contradictions arrive.

# Benefits 🎯

1. **Surface silent choices:** The AI lists the conflict instead of settling it, so you see the [hidden assumptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20198%20-%20Hidden%20Assumptions/readme.md) it was making for you.

2. **Find forgotten decisions:** The second list shows decisions you made on Monday and forgot by Thursday, or never made at all.

3. **Remove the tie-breaker:** When the rules agree, the AI has nothing to invent.

4. **Shrink your rules:** Every resolved contradiction deletes a line, so your AGENTS.md stops [hoarding rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20034%20-%20Stop%20Hoarding%20Rules%20in%20Your%20AGENTS.md/readme.md).

5. **Learn the domain faster:** The list maps exactly where your understanding changed, which is the knowledge worth keeping in your [second brain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain/readme.md).

6. **Make decisions durable:** Each winner lives in one place that the [whole team](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20028%20-%20Build%20a%20Company%20Brain/readme.md) and every future session can read.

7. **Understand your own setup:** You rebuild the picture the AI works from, which is the cure for [comprehension debt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md).

8. **Pay almost nothing:** One [read-only](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md) prompt costs far less than a day of chasing output that followed the wrong rule.

9. **Talk to a rubber duck buddy:** Explaining your rules out loud to the AI works like [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging), and you spot your own contradictions while you explain them.

# Context 🧠

You don't learn a domain by reading about it.

You learn it by building, being wrong, and changing your mind, like the [scientific method](https://en.wikipedia.org/wiki/Scientific_method).

Your changes of mind end up as new prompts, new skills, and new lines in your AGENTS.md file, stacked on top of the old ones.

Nothing deletes the contradicted old ones.

Your head updates the decision.

The context doesn't.

I hit this recently.

I asked an AI to enumerate every contradiction across my prompts, agents, and skills.

It also surprised me with decisions I had never made at all.

The AI had been making them for me.

Two of my validator skills disagree on how long a TL;DR can be: 160 characters in one, 120 in the other.

Together they're a coin flip, and the AI flips it without telling you.

Researchers tested this in [ConInstruct](https://arxiv.org/abs/2511.14342): Claude-4.5-Sonnet detected the conflicts with an F1 of 87.3%, and DeepSeek-R1 with 91.5%.

Yet the models rarely tell you or ask for clarification.

Many AIs are too polite and submissive.

They are trained to please you, so they chase the reward of a happy answer.

A human colleague would stop and ask you what you meant.

Your AI keeps going and hides the doubt.

The ability to spot the conflict is already there, and you only need to ask.

Drew Breunig calls two instructions that disagree a [context clash](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html), and every [long session](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md) piles up more of them.

The [Claude Code docs](https://code.claude.com/docs/en/memory) say so themselves: when two instructions contradict each other, Claude may pick one arbitrarily.

Ranking your own rules is your job, the same way a [ranked list of laws](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20039%20-%20Give%20the%20AI%20a%20Zeroth%20Law/readme.md) lets a lower rule yield to a higher one.

When you [make the AI ask before it builds](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20038%20-%20Make%20the%20AI%20Ask%20Before%20It%20Builds/readme.md), you pull decisions out of your head before the work starts.

The audit pulls out the ones that piled up after.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/f781304917be46dfa3ae17e1f284b843) -->

```markdown
Check my AGENTS.md, my skills, and this chat.
Tell me if everything looks consistent.
If it does, continue with the next feature.
```

## Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/19010e7ad014ecb19c2e34cea5d4bd35) -->

```markdown
Use an adversarial, independent subagent for this audit.

Audit only.
Don't edit any file.
Don't build anything.

Read AGENTS.md, every skill, and every agent definition.
Read the decisions from this chat.

List every contradiction in a numbered table.
Quote both conflicting instructions exactly.
Name the file or message where each one lives.
Say what you'd do if both applied to one task.
Rank each item by what breaks first if you guess wrong.

Then list the decisions I never made explicit.
These are the places where you had to guess.
Surprise me with the ones I don't remember making.

Don't resolve anything.
Ask me which side wins, one item at a time.
```

# Considerations ⚠️

Not every contradiction is a mistake.

A general rule with a deliberate exception (the exception that confirms the rule) looks like a conflict on paper.

You should ask the AI to flag those separately, and you decide.

The AI can also hallucinate a contradiction that isn't there.

That's why you read both quoted lines before you change anything.

A model that helped write the context may share its blind spots, and [Greptile found](https://www.greptile.com/blog/model-inversion) that models catch more defects in code written by other models than in their own.

A [second model](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20029%20-%20Stop%20Using%20One%20Model%20for%20Everything/readme.md) gives you a better audit for the same reason.

Some contradictions may only show up at runtime, when the AI meets a real task.

A text audit can't find those, and I don't know yet how many there are.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

The audit only finds contradictions that exist in the text you load.

A conflict between your instructions and the real state of the codebase needs [tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md), not a prompt.

A huge pile of files may not fit in one session, so you should audit them in pairs: AGENTS.md against skills, then skills against agents.

The AI proposes, and you decide.

If you skip the deciding, you've only moved the coin flip to a different place.

# Tags 🏷️

- Context Window

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 038 - Make the AI Ask Before It Builds](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20038%20-%20Make%20the%20AI%20Ask%20Before%20It%20Builds/readme.md)

[AI Coding Tip 039 - Give the AI a Zeroth Law](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20039%20-%20Give%20the%20AI%20a%20Zeroth%20Law/readme.md)

[AI Coding Tip 034 - Stop Hoarding Rules in Your AGENTS.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20034%20-%20Stop%20Hoarding%20Rules%20in%20Your%20AGENTS.md/readme.md)

[AI Coding Tip 005 - Keep Context Fresh](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md)

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

[AI Coding Tip 025 - Pair Every Skill With a Pitfalls File](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20025%20-%20Pair%20Every%20Skill%20With%20a%20Pitfalls%20File/readme.md)
 
[AI Coding Tip 029 - Stop Using One Model for Everything](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20029%20-%20Stop%20Using%20One%20Model%20for%20Everything/readme.md)

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[AI Coding Tip 019 - Tell the AI Why, Not Just What](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20019%20-%20Tell%20the%20AI%20Why,%20Not%20Just%20What/readme.md)

[AI Coding Tip 021 - Avoid Comprehension Debt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20021%20-%20Avoid%20Comprehension%20Debt/readme.md) 

[AI Coding Tip 024 - Force a Criteria Check Before the Task Ends](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20024%20-%20Force%20a%20Criteria%20Check%20Before%20the%20Task%20Ends/readme.md)

# Conclusion 🏁

You change your mind as you learn, and that's healthy.

Your context doesn't change with you.

You need to make the AI read all of it and list where it disagrees with itself.

Then you decide each conflict yourself.

The AI already sees the contradictions, so you should make it tell you.

# More Information ℹ️

[LLMs Get Lost In Multi-Turn Conversation, Laban et al.](https://arxiv.org/abs/2505.06120)

[ConInstruct: Evaluating Large Language Models on Conflict Detection and Resolution in Instructions, He et al.](https://arxiv.org/abs/2511.14342)

[The Instruction Hierarchy: Training LLMs to Prioritize Privileged Instructions, OpenAI](https://arxiv.org/abs/2404.13208)

[How Long Contexts Fail, Drew Breunig](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html)

[Model Inversion, Greptile](https://www.greptile.com/blog/model-inversion)

# Also Known As 🎭

- Contradiction-Audit

- Context-Conflict-Check

- Self-Consistency-Review

- Decision-Conflict-Report

# Tools 🧰

The `/doctor prompt-audit` command in [Claude Code](https://code.claude.com/docs/en/memory) checks your instruction files for outdated or conflicting content, and it proposes edits without applying them until you ask.

Any other assistant that can read your AGENTS.md files, skills, and agent definitions can run the same audit with the good prompt above.

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans.

I use AI proofreading tools to improve some texts.

Most AI detectors will flag this article as AI-generated. That's expected. It's a technical article. It has a rigid format and clear steps to follow. 

That's exactly the pattern those tools are trained to catch. I've apparently been "writing like an AI" for decades, long before AI existed. This is a technical article, not a novel.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

# Credits 🙏

Image by [Efraimstochter](https://pixabay.com/users/efraimstochter-12351/) from [Pixabay](https://pixabay.com/)

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)
