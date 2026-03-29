# AI Coding Tip 014 - Use Nested AGENTS.md Files

![AI Coding Tip 014 - Use Nested AGENTS.md Files](AI%20Coding%20Tip%20014%20-%20Use%20Nested%20AGENTS.md%20Files.png)

*Context is precious. Don't waste it.*

> TL;DR: Split your AGENTS.md into layered files so your AI loads only the rules that matter for the code you touch.

# Common Mistake ❌

You put one massive `AGENTS.md` at your project root and cram everything into it.

Framework rules, database patterns, frontend conventions, CI configuration—all loaded at once.

Your AI reads rules that have nothing to do with what you're actually working on.

This wastes context and weakens the guidance that matters.

# Problems Addressed 😔

- Your AI follows rules meant for other parts of the codebase
- Irrelevant context crowds out the rules you actually need
- Updating one big file can break guidance for unrelated areas
- Teammates get confused by your personal preferences

# How to Do It 🛠️

1. Create a root `AGENTS.md` with global rules: coding standards, commit format, architecture overview, and general gotchas
2. Add subdirectory `AGENTS.md` files in each major area (`model/`, `tests/`, `api/`) with area-specific rules
3. Create `AGENTS.local.md` for personal preferences and add it to `.gitignore`
4. Keep files short, opinionated, and actionable—three bullets over three paragraphs
5. Trust the loading system: most tools load root files at startup and subdirectory files only when you touch files there
```
FermiCalculator/
├── AGENTS.md          ← loaded at startup (always) with general
│                    rules
├── model/
│   └── AGENTS.md      ← loaded when you make changes to your
│                    model/, model conventions
├── tests/
│   └── AGENTS.md      ← loaded when you change your tests/,
│                    mocking rules
├── ui/
│   └── AGENTS.md      ← loaded when you make changes to ui/,
│                    UI code standards
└── api/
│   └── AGENTS.md      ← loaded when you make changes to api/,
│                    OpenApi formatting
└── database/
│   └── AGENTS.md      ← loaded when you make changes to the
│                    persistence/ DDL Rules
```

# Benefits 🎯

- The AI reads only rules relevant to what you're working on
- You reduce context waste in every session
- Each team area owns its own guidance independently
- Personal preferences stay personal — they don't pollute shared files
- Smaller files are easier to review and maintain

# Context 🧠

AI coding assistants load context files to understand your project.

Tools like Claude Code, Cursor, and Copilot support instruction files (`AGENTS.md`, `CLAUDE.md`, `.cursorrules`).

When everything's in one file, the assistant can't filter what's relevant.

The layered approach works like good software: separation of concerns.

The root file sets foundations.

Subdirectory files add specifics.

Local files hold personal quirks.

This helps any project with multiple distinct areas—monorepos benefit most.

Remember, you always need to [manage your context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md) wisely.

## Prompt Reference 📝

### Bad Prompt:

<!-- [Gist Url](https://gist.github.com/mcsee/3c41aa0fc99359208d994f57b2c9d798) -->

```markdown
Here are all the conventions for my project:

[pastes 200 lines of mixed rules for backend, frontend, 
mobile, and CI]

Now help me fix this React component.
```

### Good Prompt:

<!-- [Gist Url](https://gist.github.com/mcsee/37438b2614dae30e2b08602fe5c3760e) -->

```markdown
I'm working in UI/. My AGENTS.md for this area says: 

use functional components, no class components,

Tailwind only for styling, 

test with React Testing Library.

Help me fix this component.
```

# Considerations ⚠️

- Not all tools support lazy loading of subdirectory files—check your tool first
- A short bad `AGENTS.md` hurts less than a long one. Vague rules get ignored or misapplied
- Add `AGENTS.md` when you create new subdirectories
- Review your root file regularly. Outdated rules mislead more than no rules

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

- Works best with tools that support hierarchical context loading (Claude Code, Cursor, some Copilot)
- Single-file projects don't need this structure
- You still need good rules—the hierarchy only helps if content is solid
- `AGENTS.local.md` support varies by tool; check your documentation

# Tags 🏷️

- Standards

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 005 - Keep Context Fresh](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md)

- Write short, opinionated rules — not documentation
- Use examples in your AGENTS.md, not just descriptions
- Version-control your AGENTS.md alongside your code
- Audit context files when AI suggestions degrade in quality

# Conclusion 🏁

You don't need one perfect `AGENTS.md`.

You need the right rules in the right place.

Split context by area, keep files tight, and let tools load only what's relevant.

Your AI works better with less noise. 🗂️

# More Information ℹ️

[Stop Using Claude Code as a ChatBot](https://craftbettersoftware.com/p/stop-using-claude-code-like-a-chatbot)

[Claude Code CLAUDE.md documentation](https://docs.anthropic.com/en/docs/claude-code/memory)

[Cursor Rules documentation](https://docs.cursor.com/context/rules-for-ai)

[GitHub Copilot custom instructions](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)

[OpenAI ChatGPT custom instructions](https://openai.com/blog/custom-instructions-for-chatgpt)

[Continue.dev context files](https://docs.continue.dev/customization/context-providers)

[Aider conventions file](https://aider.chat/docs/usage/conventions.html)

[Cody context and instructions](https://sourcegraph.com/docs/cody)

[Monorepo tooling with Nx](https://nx.dev/concepts/mental-model)

[Context window management in LLMs](https://www.anthropic.com/research/claude-character)

[Prompt engineering guide](https://www.promptingguide.ai/)

# Also Known As 🎭

- Hierarchical context files
- Layered instructions
- Nested AI rules
- Scoped assistant configuration

# Tools 🧰

- Claude Code (`CLAUDE.md`)
- Cursor (`.cursorrules` / `.cursor/rules`)
- GitHub Copilot (`.github/copilot-instructions.md`)
- Aider (`CONVENTIONS.md`)
- Continue.dev (`.continuerc.json`)

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

***

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)
