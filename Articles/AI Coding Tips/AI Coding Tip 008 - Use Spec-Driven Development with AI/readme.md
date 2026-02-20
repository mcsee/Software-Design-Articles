# AI Coding Tip 008 - Use Spec-Driven Development with AI

![AI Coding Tip 008 - Use Spec-Driven Development with AI](AI%20Coding%20Tip%20008%20-%20Use%20Spec-Driven%20Development%20with%20AI.png)

*Learn guided by the domain*

> TL;DR: Use AI to understand requirements and build a shared mental model while you write the code.

# Common Mistake ❌

You jump directly to code generation with a vague, wishful prompt.

The AI seems to understand your specific business logic, but is condescending with you.

The problem creates a spaghetti mess that is difficult to maintain later.

The AI is not a magic button for lazy people. It is a senior pair programmer and a learning companion.

You follow the [Spec-Driven Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) trend and work in a taylorist cascading way failing into analysis paralysis and unrealistic plans.

# Problems Addressed 😔

Hallucinations: The AI guesses details when you don't provide specific context.

Technical Debt: You build complex systems that collapse under logical errors and don't simulate the real-world [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

Context Fragmentation: The AI loses track of your goals in long sessions.

Logic Drift: The code "works". Yet it doesn't solve the [actual problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

# How to Do It 🛠️

Ask the AI to interview you.

You state the high-level idea and have the AI ask questions to uncover edge cases.

Work together in learning mode. Dave Farley tells us to be [experts at learning](https://modernsoftwareengineering.co.uk/).

Draft a spec.md file. You and the AI collaborate on a document that defines the architecture, data models, and goals.

Use the [Plan Mode](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md).

Keep the AI in a read-only environment to explore your codebase and verify the plan as you execute it.

Plan as you go with the goal in mind without making assumptions about a rigid roadmap.

Always validate the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) against the real-world requirements.

Turn the live spec into a simple checklist of atomic implementation steps.

The backlog will grow and shrink as you learn the domain. It is a live artifact.

Set up a persistent context while you learn.

Create a *.md* file to store project rules that the AI cannot guess.

# Benefits 🎯

You learn about the domain faster because the AI can serve as an encyclopedic mentor.

You stay proudly accountable for the architecture.

You eliminate boilerplate while maintaining system stability.

You close the Human 30% gap by focusing on system coordination.

# Context 🧠

These tools are high-velocity coders, but they are very innocent.

They perform best when you instruct with a clear mission and modular instructions.

This "waterfall in 15 minutes" way favors you and the AI to be on the same page before you trigger the first code diff.

# Prompt Reference 📝

## Bad Prompt:

<!-- [Gist Url](https://gist.github.com/mcsee/819870eea2d40ce051a8632450aaafb6) -->

```markdown
Build me a task management app with React and Node.

Create a behavior specification and a Gantt project
```

## Good Prompt:

<!-- [Gist Url](https://gist.github.com/mcsee/99cef46eb3f178f5b62766341438e815) -->

```markdown
You are a Senior Software Engineer. I want to build a task app.

Ask me 10 clarifying questions about the architecture, security, 
and data model. 

After I answer, help me draft a spec.md.

Let's build it together with TDD and contract tests.
```

# Considerations ⚠️

AI can write bugs with complete conviction.

You must review every change.

# Type 📝

[X] Semi-Automatic

# Tags 🏷️

- Complexity

# Level 🔋

[X] Intermediate

# Related Tips 🔗

Use CLAUDE.md for project memory.

Set up MCP servers for live documentation.

Run parallel agents for large refactors.

# Conclusion 🏁

You should invest [15 minutes](https://harper.blog/2025/04/10/waterfall-in-15-minutes-or-your-money-back/) in planning with the AI instead of rushing. It will save you hours of debugging.

Use the copilot to improve your design with your approval, and let it handle the hard accidental typing.

# More Information ℹ️

[Spec Driven Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)

[Kent Beck Critizing Spec-Driven Development](https://www.linkedin.com/posts/kentbeck_the-descriptions-of-spec-driven-development-activity-7413956151144542208-EGMz)

[Kent Beck Earn and Learn](https://tidyfirst.substack.com/p/earn-and-learn)

[Addy Osmani Coding Workflow](https://addyosmani.com/blog/ai-coding-workflow/)

- Start with a clear path ([specs before code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md))

- Break work into small, iterative chunks

- Provide extensive [context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md) and guidance

- Choose the right model (and use multiple when needed)

- Leverage AI coding across the lifecycle

- Keep a human in the loop - verify, test, and review everything

- [Commit often](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md) and use version control as a safety net. [Never commit code you can’t explain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md).

- Customize the AI’s behavior with rules and examples

- Embrace testing and automation as force multipliers

- Continuously learn and adapt (AI amplifies your skills)

[![Watch the video](https://img.youtube.com/vi/Xahv9nMegXA/sddefault.jpg)](https://youtu.be/Xahv9nMegXA) 

# Also Known As 🎭

Spec-Driven Development

Waterfall in 15 Minutes

[Vibe Coding](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Explain%20in%205%20Levels/Explain%20in%205%20Levels%20of%20Difficulty%20Vibe%20Coding/readme.md) with Discipline

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the AI Coding Tip series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)