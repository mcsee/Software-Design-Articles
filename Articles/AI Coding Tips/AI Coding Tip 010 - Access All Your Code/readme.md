# AI Coding Tip 010 - Access All Your Code

![AI Coding Tip 010 - Access All Your Code](AI%20Coding%20Tip%20010%20-%20Access%20All%20Your%20Code.png)

*Stop copying code chunks. Start letting AI agents work directly with your files.*

> TL;DR: Use terminal-based AI tools to give your assistant direct access to your local files and test suites.

# Common Mistake ❌

You copy code snippets into a web browser chat like [ChatGPT](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/ChatGPT%20is%20Amazing.%20And%20It%20is%20FREE/readme.md), Claude, or Grok.

You manually move code back and forth and give small chunks of code, filling up the context window. 

You lose the context of your folder structure, relations among modules, and the whole architecture. 

The AI often (wrongly) guesses your project layout and hallucinates.

When you do this, you get inconsistent code and outdated logic.

# Problems Addressed 😔

* **Context Tax:** Manual copying wastes your focus.

* **Hallucinations:** The AI suggests libraries you don't actually have.

* **Isolated logic:** The assistant doesn't know if your code even builds.

* **Manual effort:** You have to run every test and fix every error yourself.

You're basically playing assistant to the AI, running around doing the busywork.

# How to Do It 🛠️

Download a **CLI** or *IDE* tool like Claude Code, OpenCode, Windsurf, or similar, and let it access *ALL* your codebase.

(You'll need to check compliance, set up safeguards, and respect any NDAs).

Open your terminal and start an interactive session. Let the agent navigate through all your code.

Describe what you want to accomplish at a high level and delegate to the orchestrator agent.

Review the [proposed plan](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md) in the terminal.

Approve the changes to update your local files.

Let the agent run your tests and fix failures automatically.

# Benefits 🎯

Full project context through local AST and RAG indexing.

Self-healing code through automated shell feedback loops.

Multi-file edits in a single prompt.

Parallel development using multiple agent instances.

Iterative incremental learning and experimentation. Baby steps.

# Context 🧠

We were all blown away when ChatGPT came out.

I [wrote an article 2 days after its release](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/ChatGPT%20is%20Amazing.%20And%20It%20is%20FREE/readme.md), understanding it was a **game-changer**. 

Even people like me who had been working with earlier GPT models.

Four years later, you still see many developers coding this way.

It works for small algorithms and functions, but falls apart for real software engineering.

# Prompt Reference 📝

### Bad Prompt

<!-- [Gist Url](https://gist.github.com/mcsee/772f28a23cc7224ada1faa75ff88a923) -->

```javascript
// Please fix the login bug in this snippet:

async function loginUser(email, password) {
  const url = 'https://api.penrosebrain.com/login';

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
  } catch (error) {
    console.error('There was an error:', error.message);
    alert(error.message);
  }
}
```

### Good Prompt

<!-- [Gist Url](https://gist.github.com/mcsee/1772e55d3cd2f1ab908d51b4512cc9e4) -->

```javascript
// opencode: "Create a failing text, fix the login bug, run tests, 
// Ensure it passes the new test and all the previous ones
// Create a Pull Request so I can review it

async function loginUser(email, password) {
  const url = 'https://api.penrosebrain.com/login';

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
  } catch (error) {
    console.error('There was an error:', error.message);
    alert(error.message);
  }
}
```

# Considerations ⚠️

CLI agents have a learning curve. 

Always [review all changes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) before [committing](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md) them. 

Use a sandbox environment if you run untrusted code.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

Don't use this for tiny, one-off scripts. 

Web chats work better for creative brainstorming or generating images. 

High token usage in long sessions can drive up your API costs.

# Tags 🏷️

- Complexity

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

Connect external data using the Model Context Protocol (MCP).

Run local models if you need 100% privacy.

# Conclusion 🏁

Move your AI assistant to the terminal. 

You'll work faster and make fewer mistakes. 

When you delegate the boring parts, you can focus on architecture and high-level design. 

# More Information ℹ️

[Why CLIs Are Better for AI Coding Agents Than IDEs](https://www.firecrawl.dev/blog/why-clis-are-better-for-agents)

[How Cursor Actually Indexes Your Codebase](https://towardsdatascience.com/how-cursor-actually-indexes-your-codebase/) 
 
[Aider - AI Pair Programming in your Terminal](https://aider.chat/) 
 
[Claude Code Overview](https://code.claude.com/docs/en/overview)
 
[OpenCode vs Claude Code: Comparing AI Coding Agents](https://www.builder.io/blog/opencode-vs-claude-code)
 
[AI Coding Assistants for Large Codebases](https://www.augmentcode.com/tools/ai-coding-assistants-for-large-codebases-a-complete-guide) 

[Boosting My Developer Productivity with AI in 2025](https://blog.marcnuri.com/boosting-developer-productivity-ai-2025) 

[OpenCode Documentation](https://opencode.ai/docs/) 

[Introducing Advanced Tool Use on the Claude Developer Platform](https://www.anthropic.com/engineering/advanced-tool-use) 

[What is OpenCode? - AI Quick Reference](https://milvus.io/ai-quick-reference/what-is-opencode) 

# Also Known As 🎭

Agentic Coding

Terminal Agents

Autonomous Coding Loops

# Tools 🧰

Claude Code, OpenCode, Aider, Codex CLI.

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the AI Coding Tip series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)