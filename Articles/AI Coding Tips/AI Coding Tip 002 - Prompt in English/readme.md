# AI Coding Tip 002 - Prompt in English

![AI Coding Tip 002 - Prompt in English](AI%20Coding%20Tip%20002%20-%20Prompt%20in%20English.jpg)

*Speak the model’s native tongue.*

> TL;DR: When you prompt in English, you align with how AI learned code and spend fewer tokens.

*Disclaimer: You might have noticed English is not my native language. This article targets people whose native language is different from English.*

# Common Mistake ❌
 
You write your prompt in your native language (other than English) for a technical task. 

You ask for complex *React hooks* or *SQL optimizations* in Spanish, French, or Chinese.

You follow your train of thought in your native language. 

You assume the AI processes these languages with the same technical depth as English.

You think modern AI handles all languages equally for technical tasks.

# Problems Addressed 😔

The AI copilot misreads intent. 

The AI mixes language and syntax.

The AI assistant generates weaker solutions.

Non-English languages use [more tokens](https://denyslinkov.medium.com/why-is-gpt-3-15-77x-more-expensive-for-certain-languages-2b19a4adc4bc). You [waste](https://arxiv.org/pdf/2305.15425) your context window.

The translation uses part of the available tokens in an intermediate prompt besides your instructions.

The AI might misinterpret technical terms that lack a direct translation.

For example: "[Callback](https://en.wikipedia.org/wiki/Callback_(computer_programming))" becomes "[Retrollamada](https://es.wikipedia.org/wiki/Retrollamada_(inform%C3%A1tica))" or "[Rappel](https://es.wikipedia.org/wiki/R%C3%A1pel)". The AI misunderstands your intent or wastes context tokens to disambiguate the instruction.

# How to Do It 🛠️

1. Define the problem clearly.
2. Translate intent into simple English.
3. Use short sentences.
4. Keep business names in [English](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20128%20-%20Non%20English%20Coding/readme.md) to favor polymorphism.
5. Never mix languages inside one prompt *(e.g., "Haz una función que fetchUser()…")*.

# Benefits 🎯

You get more accurate code.  

You fit more instructions into the same message. 

You reduce hallucinations.  

# Context 🧠

Most AI coding models are trained mostly on English data.  

English accounts for over 90% of AI training sets.

Most libraries and docs use English.  

Benchmarks show higher accuracy with English prompts.

While models are polyglots, their reasoning paths for code work best in English. 

## Prompt Reference 📝

Bad prompt 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/325bb924aa27f5f414ec13e98552618a) -->

```markdown
Mejorá este código y hacelo más limpio
```

Good prompt 👉

<!-- [Gist Url](https://gist.github.com/mcsee/f6c16e46a88b88ac8d4d3ececedb33bb) -->

```markdown
Refactor this code and make it cleaner
```

# Considerations ⚠️

You should avoid slang.  

You should avoid long prompts.  

You should avoid mixed languages.

Models seem to understand mixed languages, but it is not the best practice.

Some English terms vary by region. "Lorry" vs "truck". Stick to American English for programming terms.

# Type 📝

[X] Semi-Automatic

You can ask your model to warn you if you use a different language, but this is overkill.

# Limitations ⚠️

You can use other languages for explanations.  

You should prefer [English for code generation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20128%20-%20Non%20English%20Coding/readme.md).  

You must review the model reasoning anyway.

This tip applies to Large Language Models like GPT-4, Claude, or Gemini. 

Smaller, local models might only understand English reliably.

# Tags 🏷️

- Standards

# Level 🔋

[x] Beginner   

# Related Tips 🔗

- Commit Before You Prompt

- Review Diffs, Not Code  

# Conclusion 🏁

Think of English as the language of the machine and your native tongue as the language of the human. 

When you use both correctly, you create better software.

# More Information ℹ️

[Common Crawl Language Statistics](https://commoncrawl.org/) 

[HumanEval-XL: Multilingual Code Benchmark](https://arxiv.org/abs/2402.16694)

[Bridging the Language Gap in Code Generation](https://arxiv.org/abs/2408.09701)

[StackOverflow’s 2024 survey report](https://tao-hpu.medium.com/why-we-recommend-english-for-ai-coding-the-30-performance-advantage-no-ones-talking-about-1c4cba55c146)

[AI systems are built on English - but not the kind most of the world speaks](https://www.uwa.edu.au/news/article/2025/may/ai-systems-are-built-on-english-but-not-the-kind-most-of-the-world-speaks)

[Prompting in English: Not that Ideal After All](https://pureai.com/blogs/mind-the-prompt/2025/12/prompting-in-english-not-that-ideal-after-all.aspx)

[OpenAI’s documentation explicitly notes that non-English text often generates a higher token-to-character ratio](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them)

[Code Smell 128 - Non-English Coding](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20128%20-%20Non%20English%20Coding/readme.md)

# Also Known As 🎭

English-First Prompting  

Language-Aligned Prompting  

# Disclaimer 📢

The views expressed here are my own.

I am a human who writes as best as possible for other humans. 

I use AI proofreading tools to improve some texts.

I welcome constructive criticism and dialogue.

I shape these insights through 30 years in the software industry, 25 years of teaching, and writing over 500 articles and a book.

* * *

This article is part of the *AI Coding Tip* series.

[AI Coding Tips](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/AI%20Coding%20Tips//AI%20Coding%20Tips/readme.md)