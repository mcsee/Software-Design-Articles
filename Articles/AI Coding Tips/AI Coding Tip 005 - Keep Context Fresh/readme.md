# AI Coding Tip 005 - Keep Context Fresh

![AI Coding Tip 005 - Keep Context Fresh](AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh.png)

*Keep your prompts clean and focused, and stop the context rot*

> TL;DR: Clear your chat history to keep your AI assistant sharp.
 
# Common Mistake ❌

You keep a single chat window open for hours. 

You switch from debugging a React component to writing a SQL query in the same thread. 

The conversation flows, and the answers seem accurate enough. 

But then something goes wrong. 

The AI tries to use your old JavaScript context to help with your database schema. 

This creates "context pollution."

The assistant gets confused by irrelevant data from previous tasks and starts to hallucinate.

# Problems Addressed 😔

* **Attention Dilution**: The AI loses focus on your current task.
* **Hallucinations**: The model makes up subtle facts based on old, unrelated prompts.
* **Token Waste**: You pay for "noise" in your history.
* **Illusion of Infinite Context**: Today, context windows are huge. But you need to stay focused.
* **Stale Styles**: The AI keeps using old instructions you no longer need.
* **Lack of Reliability**: Response quality decreases as the context window fills up.

# How to Do It 🛠️

1. You need to identify when a specific microtask is complete. *(Like you would when coaching a new team member)*.
2. Click the "New Chat" button immediately and [commit the partial solution](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md).
3. If the behavior will be reused, you save it as a new skill *(Like you would when coaching a new team member)*.
4. You provide a clear, isolated instruction for the new subject. *(Like you would when coaching a new team member)*.
5. Place your most important instructions at the beginning or end.
6. Limit your prompts to 1,500-4,000 tokens for best results. (Most tools show the content usage).
7. Keep an eye on your conversation title (usually titled after the first interaction). If it is not relevant anymore, it is a smell. Create a new conversation.

# Benefits 🎯

* You get more accurate code suggestions.
* You reduce the risk of the AI repeating past errors.
* You save time and tokens because the AI responds faster with less noise.
* Response times stay fast.
* You avoid cascading failures in complex workflows.
* You force yourself to write down agents.md or [skills.md](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) for the next task

# Context 💬

Large Language Models use an "Attention" mechanism. 

When you give them a massive history, they must decide which parts matter. 

Just like a "God Object" in clean code, a "God Chat" violates the Single Responsibility Principle. 

When you keep it fresh and hygienic, you ensure the AI's "working memory" stays pure.

## Prompt Reference 📝

**Bad Prompt (Continuing an old thread):**

<!-- [Gist Url](https://gist.github.com/mcsee/19c620f471518466d21009062a064edf) -->

```markdown
Help me adjust the Kessler Syndrome Simulator
in Python function to sort data. 

Also, can you review this JavaScript code? 

And I need some SQL queries tracking crashing satellites, too. 

Use camelCase. 

Actually, use snake_case instead. Make it functional. 

No!, wait, use classes.

Change the CSS style to support
dark themes for the orbital pictures.
```

## Good Prompt (In a fresh thread):

<!-- [Gist Url](https://gist.github.com/mcsee/39d9bec7e03cbbd13384de71c3ac8610) -->

```markdown
Sort the data from @kessler.py#L23.

Update the tests using the skill 'run-tests'.
```

## Considerations ⚠️

You must extract *agents.md* or *skills.md* before starting the new chat. *(Like you would when coaching a new team member)*

Use metacognition: *Write down what you have learned*. *(Like you would when coaching a new team member)*

The AI will not remember them across threads. *(Like you would when coaching a new team member)*

## Type 📝

[X] Semi-Automatic

# Tags 🏷️

- Complexity

## Level 🔋

[X] Intermediate

## Related Tips 🔗

[AI Coding Tip 001 - Commit Before Prompt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20001%20-%20Commit%20Before%20Prompt/readme.md)

Place the most important instructions at the beginning or end

## Conclusion 🏁

Fresh context leads to incrementalism and small solutions, [Failing Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md). 

When you start over, you win back the AI's full attention and fresh tokens.

**Pro-Tip 1**: This is not *just* a coding tip. If you use Agents or Assistants for *any* task, you should use this advice.

**Pro-Tip 2**: Humans need to [sleep to consolidate](https://simple.wikipedia.org/wiki/Sleep_deprivation) what we have learned in the day; bots need to write down [skills](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20004%20-%20Use%20Modular%20Skills/readme.md) to start fresh on a new day.

## More Information ℹ️

[Attention Is All You Need (Paper)](https://arxiv.org/abs/1706.03762)

[Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)

[Full Prompt Engineering Guide: Context Management](https://www.promptingguide.ai/) 
  
[Avoiding AI Hallucinations](https://zapier.com/blog/ai-hallucinations/) 

[Anthropic Context Window Best Practices](https://docs.anthropic.com/claude/docs/long-context-window-tips) 

[Token Economy in Large Language Models](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them) 

## Also Known As 🎭

Context Reset

Thread Pruning

Session Hygiene

## Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the AI Coding Tip series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)