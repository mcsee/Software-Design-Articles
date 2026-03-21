# AI Coding Tip 009 - Compact Your Context

![AI Coding Tip 009 - Compact Your Context](AI%20Coding%20Tip%20009%20-%20Compact%20Your%20Context.png)

*Stop the memory rot*

> TL;DR: You can keep your AI sharp by forcing it to summarize and prune what it remembers (a.k.a. compacting).

# Common Mistake ❌

You keep a single, long conversation open for hours. 

You feed the AI with every error log and every iteration of your code. 

Eventually, the AI starts to ignore your early instructions or hallucinate nonexistent functions.

# Problems Addressed 😔

* **Context Decay:** The AI loses track of your original goals in the middle of a long chat.
* **Hallucinations:** The model fills memory gaps with hallucinations or outdated logic.
* **Token Waste:** You pay for the AI to re-read useless error logs from three hours ago.
* **Reduced Reasoning:** A bloated context makes the AI less smart and more prone to simple mistakes.

# How to Do It 🛠️

1. **Restart often:** You can [start a new chat](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md) once you finish a sub-task.
2. **Request a State Summary:** Before you close a conversation, ask the AI to summarize the current decisions and [plan](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md).
3. **Add Human Checkpoints:** After the summary, [confirm](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md) you are still on track.
4. **Use Markdown Docs:** Keep a small `context.md` file with your current stack and rules.
5. **Prune the Logs:** You should only paste the relevant 5 lines of a stack trace instead of the whole irrelevant 200-line output. 
6. **Divide and conquer:** Break large tasks into smaller ones, invoking their own skills with local tokens and a [fresh context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md).
7. **Divide the responsibility:** A General doesn't need to know what every soldier is doing on the battlefield.
8. **Create and persist as Skill:** After you have taught the AI, you should refactor the knowledge and business rules.
9. **Keep an Eye on the Context Size:** Most tools have visual indicators of the window consumption.
10. **Use Local Persistence:** Some tools allow sharing memory among agents and their sub-agents.

# Benefits 🎯

* You get more accurate code suggestions.
* You avoid divergences
* You follow the AI's train of thought.
* You spend less time correcting the AI's hallucinations.
* The AI follows your project constraints more strictly and keeps focused on your tasks

# Context 🧠

Large Language Models have limited attention.

Long context windows are a trap.

Many modern models offer a very large context window.

In practice, they ignore a lot of them to your frustration.

Even with large context windows, they prioritize the beginning and end of the prompt.

## Prompt Reference 📝

### Bad Prompt

<!-- [Gist Url](https://gist.github.com/mcsee/b1bcbbb135a31de06fdeba168bd58e78) -->

```markdown
Here is the 500-line log of my failed build. 

Also, remember that we changed the database schema 

Three hours ago in this chat.

Add the unit tests as I described above.

Now, refactor the whole component.
```

### Good Prompt

<!-- [Gist Url](https://gist.github.com/mcsee/87997843376e51fcb5701de7d6ea1e02) -->

```markdown
I am starting a new session. Here is the current state: 

We use *PostgreSQL* with the 'Users' table schema [ID, Email]. 

The AuthService`interface is [login(), logout()]. 

Refactor the LoginComponent` to use these.
```

# Considerations ⚠️

You must ensure you don't purge *[essential](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md)* context. 

If you prune too much, the AI might suggest libraries that conflict with your current setup.

Review the compacted information.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

You can use this tip manually in any chat interface. 

If you use advanced agents like Claude Code or Cursor, they might handle some of this automatically, but manual pruning is still more reliable.

# Tags 🏷️

- Context

# Level 🔋

[X] Intermediate

# Related Tips 🔗

[AI Coding Tip 004 - Use Modular Skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md)

[AI Coding Tip 005 - Keep Context Fresh](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md)

AI Coding Tip 010 - Create Skill from Conversation 

# Conclusion 🏁

You are the curator of the AI's memory. 

If you let the context rot, the code will rot, too.

Keep it clean and compact. 🧹

# More Information ℹ️

[Lost in the Middle: How Language Models Use Long Context](https://arxiv.org/abs/2307.03172)

[LLMLingua: Prompt Compression for LLMs](https://llmlingua.com/) 

[How to Manage Context in AI Coding](https://www.cursor.com/blog/context)

[Avoiding LLM Hallucinations](https://www.ibm.com/topics/ai-hallucinations)

[Prompt Engineering Guide: Context Management](https://www.promptingguide.ai/)
 
# Also Known As 🎭

- Compaction
- Summarization
- Context Pruning
- Token Management
- Prompt Compression

# Tools 🧰

* Claude Code
* Cursor
* Windsurf

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)