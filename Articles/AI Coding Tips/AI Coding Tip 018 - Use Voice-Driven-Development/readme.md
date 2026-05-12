# AI Coding Tip 018 - Use Voice-Driven-Development

![AI Coding Tip 018 - Use Voice-Driven-Development](AI%20Coding%20Tip%20018%20-%20Use%20Voice-Driven-Development.png)

*Talk twice as fast as you type, and create richer prompts with less effort.*

> TL;DR: Dictate your prompts instead of typing them to speak twice as fast and give more context.

# Common Mistake ❌

You write detailed prompts by hand, word by word, staying at your desk.

You restrict yourself to slow keyboard-based interaction with AI tools because that's how you have always worked.

You assume voice input is still unreliable because of syntax complexity (brackets, semicolons, language-specific quirks).

# Problems Addressed 😔

- Typing speed limits the depth and context of your prompts, hurting AI output quality.

- You spend 80% of your job thinking, designing, and communicating, yet you treat writing as a bottleneck instead of optimizing it.

- Staying chained to your desk during focused work reduces mobility, creativity, and wellbeing.

- You miss opportunities to rubber-duck ideas by speaking them aloud to an AI agent.

- You can dictate in seconds complex prompts that would take minutes to type.

# How to Do It 🛠️

1. Enable voice mode in your tool `/voice` or similar.

2. Start dictating your prompt with accuracy in a long prompt with context.

3. Speak naturally in [English](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20002%20-%20Prompt%20in%20English/readme.md), explaining your request with full context, constraints, and examples.

4. Release the key when you finish, and your tool will transcribe and process your input.

5. If your tool doesn't support voice mode, install [Whispr Flow](https://wisprflow.ai) or similar and configure your preferred voice hotkey.

6. Use [Speech-To-Text](https://en.wikipedia.org/wiki/Speech_recognition) in any application (terminal, email, code editor, documents) by holding your hotkey and speaking.

7. Start with one scenario: dictating a single prompt.

8. Expand voice into your entire workflow as it becomes natural: specs, documentation, brainstorming, thinking aloud.

# Benefits 🎯

1. **Speed:** You speak at 150 words per minute versus typing at 80 words per minute, nearly doubling your prompt composition speed.

2. **Richer Prompts:** Speaking encourages thinking aloud, producing more nuanced context and backstory than typed prompts, which improves AI output quality.

3. **Rubber-Ducking:** Explaining a problem verbally to an AI agent often surfaces solutions without explicit effort, just like talking to a colleague.

4. **Mobility:** You can draft specs, think through architecture, or brainstorm ideas while walking, commuting, or in environments that boost creativity.

5. **Health:** You spend less time hunched over your keyboard.

Your posture improves and you move more.

6. **Cognitive Flow:** You stay in thinking mode instead of switching to typing mode.

Your mental focus stays on the problem.

# Context 🧠

## Why Voice Works Now

Historically, voice-to-code failed because speech recognition couldn't parse syntax.

Today, AI understands your intent in natural language and translates it into precise code.

Modern AI assistants like Claude can infer what you mean even when you speak conversationally ("can you fix the bug where users see a blank screen after login") without needing you to type angle brackets or semicolons.

Unlike WhatsApp voice messages, which force the recipient to stop and listen in real time, dictating to an AI agent costs nothing to the receiver.

The AI transcribes your speech into text silently. The result is searchable and editable.

You get the speed of speaking without the rudeness of audio messages.

## Prompt Reference 📝

## Bad Prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/fb4741f49489b5b078076e5c0a92338d) -->

```markdown
Fix the code

# (Typing it in the console)
```

## Good Prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/1c8f74c632cd73cbe19b6be566cf49cd) -->

```markdown
# Dictated by /voice

I have a user authentication function that's failing.

It is highlighted in the editor

When users try to log in with valid credentials

The system returns a 500 error instead of creating a session.

The error logs show it's happening in the password validation step.

I need you to review the authentication logic
identify why the validation is failing
and provide a fix that includes proper error handling
for invalid credentials and missing database connections.
```

# Considerations ⚠️

Dictation may feel awkward the first time because you aren't used to speaking technical requests aloud.

You may ramble or repeat yourself slightly when dictating, but the AI agent will extract what it needs.

Voice works best for high-level requests, architecture decisions, and design thinking, not for precise syntax correction.

You still need to review AI output before committing, just as you would with typed prompts.

# Type 📝

[X] Semi-Automatic

# Limitations ⚠️

Voice input works best in quiet environments; background noise reduces accuracy.

Some very large or precise code changes may be faster to type than dictate.

You need to [speak them in English](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20002%20-%20Prompt%20in%20English/readme.md), or change the overall language.

Most tools won't let you have multiple voice languages.

You need to invest time learning which voice tool works best for your workflow and hardware.

# Level 🔋

[X] Beginner

# Tags 🏷️

- Prompt Engineering

# Related Tips 🔗

[AI Coding Tip 006 - Review Every Line Before Commit](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20006%20-%20Review%20Every%20Line%20Before%20Commit/readme.md)

[AI Coding Tip 003 - Force Read-Only Planning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20003%20-%20Force%20Read-Only%20Planning/readme.md)

[AI Coding Tip 005 - Keep Context Fresh](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20005%20-%20Keep%20Context%20Fresh/readme.md)

[AI Coding Tip 002 - Prompt in English](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips/AI%20Coding%20Tip%20002%20-%20Prompt%20in%20English/readme.md)

# Tools 🧰

Claude Code with `/voice` command

Whispr Flow

ChatGPT [Voice Mode](https://chatgpt.com/es-419/features/voice/)

# Conclusion 🏁

Typing is no longer the bottleneck.

You speak twice as fast as you type, and AI understands natural language.

Use voice to dictate prompts, unlock mobility, improve wellbeing, and create richer input for better code generation.

Start with one prompt today.

# More Information ℹ️

[![Watch the video](https://img.youtube.com/vi/7a1IVtGAKNI/sddefault.jpg)](https://youtu.be/7a1IVtGAKNI) 

[Claude Code Documentation](https://claude.com/claude-code)

[Whispr Flow](https://wisprflow.ai)

[ChatGPT Voice Mode](https://openai.com/chatgpt/voice/)

[Rubber Duck Debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging)

# Also Known As 🎭

- Voice-To-Code
- Dictation-Driven-Development
- Speech-Based-Prompting

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)
