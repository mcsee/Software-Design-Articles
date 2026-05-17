# AI Coding Tip 020 - Create a Second Brain

![AI Coding Tip 020 - Create a Second Brain](AI%20Coding%20Tip%20020%20-%20Create%20a%20Second%20Brain.png)

*Build a Persistent Memory Layer Your AI Can Actually Use*

> TL;DR: Use Obsidian with Markdown notes, YAML metadata, and direct AI file access to build a Second Brain with LLMs that gives your tools persistent project context.

# Common Mistake ❌

You paste a snippet of code or a problem description into an AI chat, get a good answer, and close the tab.

The next week you face the same problem again.

You search your chat history, find nothing useful, and paste the same snippet again.

Your AI starts fresh every session with zero memory of what you built, decided, or debugged before.

# Problems Addressed 😔

- You repeat yourself constantly because context resets between sessions and your AI remembers nothing.
- You lose architectural decisions, debugging notes, meeting commitments, and design rationale after each conversation ends.
- Your AI gives generic answers because it lacks the specific context of your project and past decisions.
- Mental load accumulates as you juggle multiple projects, notifications, and context switches simultaneously.
- You lose track of decisions made weeks ago without a structured retrieval system.
- As you age or face cognitive overload, you forget context between sessions, repeat past mistakes, and lose the thread of long-running projects.
- Notification fatigue builds when every system demands your attention in real time instead of on your schedule and you forget what you were searching for.

# How to Do It 🛠️

1. Choose a local Markdown tool like [Obsidian](https://obsidian.md), [Logseq](https://logseq.com), [Foam](https://foambubble.github.io/foam/), or [Tolaria](https://github.com/refactoringhq/tolaria) to store all your knowledge as plain `.md` files you own and control.

2. Organize your vault using the PARA system: Projects (active work with deadlines), Areas (ongoing responsibilities), Resources (reference material), and Archives (inactive items).

3. Write atomic [Zettelkasten](https://zettelkasten.de/introduction/) notes: one idea per file, with a unique identifier and explicit links that explain *why* two concepts relate, not just what they are.

4. Add YAML [front matter](https://en.wikipedia.org/wiki/Book_design#Front_matter) to every note so your AI gets searchable, structured metadata it can query and filter:

<!-- [Gist Url](https://gist.github.com/mcsee/c70678ff61bc01c7ee5ced76272b6d36) -->

```yaml
---
title: "JWT Authentication Design"
type: architecture-decision
status: approved
component: auth-service
tags: [security, backend]
created: 2018-12-09
related: ["OAuth Flow", "Session Management"]
---
```

5. Use Dataview or Obsidian Bases to query your vault like a database and surface all tasks due today, pending decisions, or notes grouped by component with a single dynamic query; every note is a record with metadata and legible text.

6. Give your AI direct access to [all your vault](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20010%20-%20Access%20All%20Your%20Code/readme.md) as local files so Claude, Devin, and Codex can read your entire codebase and notes simultaneously.

7. Create a `AGENTS.md` in each sub-project that points to the relevant vault sections, following the nested agents pattern from [AI Coding Tip 014](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md).

8. Dictate notes on the go using [voice input](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20018%20-%20Use%20Voice-Driven-Development/readme.md) and paste the transcript into your vault to capture context in real time without interrupting your flow.

9. Sync your vault to mobile and tablet using Obsidian Sync, Dropbox, OneDrive, or Syncthing so your Second Brain travels with you everywhere.

10. Set up [OpenClaw](https://openclaw.ai/) or a local LLM (Ollama or LM Studio) to index your vault and answer questions via Telegram or WhatsApp, as a private assistant that never sends your data to the cloud.

11. Ask your AI to scan your vault periodically for orphaned notes, missing connections, and hidden patterns, acting as a tireless librarian that reorganizes your knowledge network over time without falling into vault-design paralysis.

12. [Bootstrap your vault](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20011%20-%20Initialize%20Agents.md/readme.md) from your existing knowledge: ask ChatGPT, Claude, Grok, or Gemini to summarize and export your most relevant past conversations as Markdown notes, since you already have a Second Brain scattered across chat history waiting to be harvested.

# Benefits 🎯

1. **Persistent Context:** Your AI starts every session knowing your architecture, past decisions, and current priorities instead of starting blank.
2. **Pattern Discovery:** The LLM finds connections between notes you wrote months apart and surfaces forgotten solutions to current problems.
3. **Focus Protection:** You capture every interruption into your inbox and process it on your schedule, eliminating notification fatigue.
4. **Memory Extension:** You can retrieve exact decisions and reasoning from months ago without relying on biological memory alone, making it especially valuable for senior developers, people with attention challenges, or anyone whose cognitive load has grown beyond what one brain can hold.
5. **Privacy by Default:** When you use local models like Ollama with OpenClaw, your notes, code, and queries never leave your machine.
6. **Compounding Knowledge:** Every note you add makes your Second Brain denser: the more you use it, the more valuable it becomes.
7. **Mobile Access:** You can query and update your knowledge base from any device, making your Second Brain available wherever you work.
8. **Distraction-Free Writing:** You work in plain text files with minimal formatting, much like [zenware](https://www.urbandictionary.com/define.php?term=zenware), so you stay focused on ideas instead of tools.
9. **Visual Graph:** You can open Obsidian's Graph View to see all your notes as a visual network where nodes are notes and edges are links, revealing clusters, hub concepts, and hidden connections at a glance.

# Context 🧠

Tiago Forte's "Building a Second Brain" methodology introduced the CODE framework: Capture, Organize, Distill, Express.

For developers, this maps directly to how you learn, document, and reuse knowledge across projects.

Niklas Luhmann, a sociologist who wrote over 50 books, developed the [Zettelkasten method](https://es.wikipedia.org/wiki/Zettelkasten) using a physical slip box of interconnected atomic notes.

Your Obsidian vault is that slip box, and your AI can search, analyze, and extend it at any time.

LLMs have three types of memory: parametric (knowledge encoded during training), working (the current context window), and external (your files on disk).

Your Second Brain fills the external memory layer and gives the AI permanent access to your project-specific knowledge that survives every session reset.

Just as neural networks in LLMs store patterns in weights, your Second Brain stores patterns in linked Markdown files, extending the model's memory with your lived experience as a developer.

Andrej Karpathy [captured this architecture](https://x.com/karpathy/status/2039805659525644595) in one sentence: "Obsidian is the IDE; the LLM is the programmer; the wiki is the codebase."

The front matter you add to each note acts as structured metadata that significantly improves how AI retrieves and ranks relevant information.

RAG (Retrieval-Augmented Generation) pipelines embed your notes as vectors and return the most semantically similar ones when you ask a question, injecting them directly into the AI's context window.

I borrowed [this idea](https://ernestokiszkurno.blogspot.com/2021/08/second-brain.html) many years ago from @Ernesto Kiszkurno and have written more than 500 technical articles since then.

## Prompt Reference 📝

## Bad Article 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/4dd64940c391cc4c3e2008bf51bc81a3) -->

```txt
Create a note about the movie
"Howl's Moving Castle".
```

## Good Article 👉

<!-- [Gist Url](https://gist.github.com/mcsee/e6a65e74abd2cb8f35646816326c828d) -->

```markdown
---
title: "Howl's Moving Castle"
type: movie-note
status: draft
director: Hayao Miyazaki
year: 2004
genre: [fantasy, animation, anti-war]
rating: 9/10
tags: [ghibli, miyazaki, adaptation]
related: ["Studio Ghibli", "Diana Wynne Jones"]
created: 2026-05-16
expected publish date: 2026-06-12
---

## Poster
![Howl's Moving Castle](Howl's%20Moving%20Castle.jpg)

## Summary
Two or three lines describing the plot without
spoiling the ending.

## Themes to Explore
Bullet list of ideas: anti-war message,
identity and transformation, Sophie's arc,
Miyazaki's pacifism compared to the novel.

## Characters
Use wikilinks: [Howl], [Sophie Hatter],
[Calcifer], [The Witch of the Waste].

## Article Ideas
Numbered list of angles for a critical article:
compare Miyazaki's changes from the Diana Wynne
Jones novel, analyze the anti-war allegory,
explore the feminist reading of Sophie's curse.

## Related Notes
[Studio Ghibli filmography]
[Diana Wynne Jones bibliography]
[War themes in animation]
```

# Considerations ⚠️

Keep your notes in plain Markdown files, not HTML (despite current trends) or proprietary formats.

Markdown is readable by both humans and LLMs, diffs cleanly in Git, and works with every static site generator.

Don't use MCP connectors or remote APIs to give your AI access to your vault. 

Point it directly at local files instead.

Direct file access is faster, cheaper, and requires no extra infrastructure.

The `AGENTS.md` files you create per project are part of your Second Brain, not separate from it.

If you have privacy concerns about cloud AI providers reading your notes, run a local model with Ollama or LM Studio through OpenClaw.

Your data never leaves your machine or private cloud.

Mind maps and Canvas diagrams in Obsidian help you visualize codebase architecture and sprint planning spatially, while the linked Markdown notes behind each node stay searchable by your AI.

Your files are local.

Nobody can see them, nobody can index them, and you can open any note with the simplest text editor in the world.

If you use a cloud AI model instead of a local one, you can add a guardrail to restrict what files the AI can read, so sensitive notes never leave your control.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

Large vaults with thousands of notes can slow down semantic search and local LLM indexing on low-end hardware.

Front matter requires discipline to maintain consistently: inconsistent metadata reduces query quality over time.

Local LLMs powerful enough to reason over a large vault require significant RAM (16 GB minimum, 32 GB recommended).

# Tags 🏷️

- Knowledge Management

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 010 - Access All Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20010%20-%20Access%20All%20Your%20Code/readme.md)

[AI Coding Tip 014 - Use Nested AGENTS.md Files](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files/readme.md)

[AI Coding Tip 018 - Use Voice-Driven-Development](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20018%20-%20Use%20Voice-Driven-Development/readme.md)

# Conclusion 🏁

Your biological brain is for having ideas, not storing them.

Build a Second Brain from local Markdown files and give your AI direct access to it.

You get persistent context, pattern discovery, and a knowledge base that compounds every time you use it. 🧠

# More Information ℹ️

[Zettelkasten Introduction](https://zettelkasten.de/introduction/)

[Obsidian - Local Markdown Knowledge Base](https://obsidian.md)

[Twitter](https://x.com/2039805659525644595)

[Front Matter in Real books](https://en.wikipedia.org/wiki/Book_design#Front_matter)

[Dataview Plugin for Obsidian](https://blacksmithgu.github.io/obsidian-dataview/)

[Andrej Karpathy LLM Wiki Pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

[Foam - Second Brain for VS Code](https://foambubble.github.io/foam/)

[Building a Second Brain - Tiago Forte](https://www.buildingasecondbrain.com/)

[Second Brain (Spanish)](https://ernestokiszkurno.blogspot.com/2021/08/second-brain.html)

# Also Known As 🎭

- Personal-Knowledge-Management
- AI-Memory-Extension
- Developer-Second-Brain
- Local-Knowledge-Base

# Tools 🧰

- [Obsidian](https://obsidian.md)
- [Logseq](https://logseq.com)
- [Foam](https://foambubble.github.io/foam/)
- [Tolaria](https://github.com/refactoringhq/tolaria)
- [Dataview Plugin](https://blacksmithgu.github.io/obsidian-dataview/)
- [OpenClaw](https://openclaw.ai/)
- [Ollama](https://ollama.com)
- [LM Studio](https://lmstudio.ai)

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)
