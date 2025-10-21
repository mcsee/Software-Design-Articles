# Code Smell 07 - Boolean Variables

![Code Smell 07 - Boolean Variables](Code%20Smell%2007%20-%20Boolean%20Variables.jpg)

*Using Boolean variables as flags introduces accidental implementation complexity and pollutes the code with Ifs.*

> TL;DR: Avoid Boolean variables, they lead to conditional logic and force you to write Ifs. Create polymorphic states instead.

# Problems 😔 

- Extensibility
- Comparison in some languages
- Missed [polymorphism](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)
- Limited semantics
- Primitive obsession

# Solutions 😃

- If Boolean maps to a real-world entity is safe.
- Model Booleans as a State to favor Extensibility following the [Open/Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).
- Create intention-revealing objects
- Replace Booleans with [polymorphism](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

# Refactorings ⚙️

[Refactoring 014 - Remove IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

# Examples 📚

- Flags
- Status indicators

# Context 💬

Boolean variables tempt you to oversimplify complex domains. 

When you use a Boolean, you force two states where many might exist. 

This creates coupling because you hardcode behavior based on *true/false* checks scattered throughout your code.

Booleans also hide intent. A variable named flag tells you nothing about what it represents in the real world. 

Even descriptive names like *isActive* or *hasPermission* leak implementation details instead of revealing domain concepts.

The problems multiply when you need a third state. You cannot extend a Boolean without breaking existing code. 

You end up with multiple Boolean combinations that create implicit states, making your code fragile and hard to understand.

Real-world entities rarely have just two states. 

A traffic light isn't "on" or "off"—it's red, yellow, or green. An order isn't just "paid" or "unpaid"—it might be pending, processed, shipped, or delivered. 

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/5a3e8e05def917a29b84be7264493a67) -->

```php
<?

function processBatch(
    bool $useLogin,
    bool $deleteEntries,
    bool $beforeToday) {
    // ...
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/66956e6ccfe8126d0819fa193d793dd5) -->

```php
<?

function processBatch(
    LoginStrategy $login,
    DeletionPolicy $deletionPolicy,
    Date $cutoffDate) {
    // ...
}
```

# Detection 🔍

[X] Manual

Automatic detection can warn for B usage, but this can yield false positives.

You can search for boolean attributes in classes, Boolean parameters in methods, and conditional statements that check Boolean values. 

Look for variables with "is", "has", "can", or "flag" in their names. 

Watch for multiple Boolean combinations that represent different states.

# Exceptions 🛑

- Real-world true/false rules
- Some languages have issues with Boolean comparators.

![0_QjZ76_c6hmi1UfXc[1].jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1603587404705/M5_udJ8Cw.jpeg)

In these coupled with accidental complexity languages, Booleans are a common error source.

# Tags 🏷️

- IFs

# Level 🔋
  
[x ] Intermediate  

# Why the Bijection Is Important 🗺️

Your code should always mirror reality. 

When you use a Boolean to represent an employee's status, you break the bijection between your software and the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

Real employees don't have a *true/false* state. They have concrete statuses like "on vacation" or "working remotely."

This broken [mapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) creates a gap between how domain experts think and how your code works. Business people talk about "vacation status" or "remote work," not about "is_on_vacation equals true." 

When you model with Booleans, you force translation between business language and code, increasing cognitive load and error potential.

The [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) violation compounds when requirements change. Adding a new employee status means modifying all the boolean logic scattered across your codebase. 

With proper domain modeling, you simply add a new status class. The broken mapping makes your code rigid where reality is flexible.

# AI Generation 🤖

AI code generators frequently create Boolean flags because they optimize for brevity and simplicity. 

They often suggest *is_active* or *has_permission* flags when generating boilerplate code. 

You need to explicitly request domain modeling to avoid this pattern.

# AI Detection 🧲

AI tools can detect Boolean variables with medium accuracy when you provide context. 

You need to specify that you want domain-driven design and state pattern usage. 

Simple prompts might not catch the smell without explicit instructions to avoid Booleans.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: correct=Replace Boolean variables with polymorphism

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+processBatch%28%0D%0A++++bool+%24useLogin%2C%0D%0A++++bool+%24deleteEntries%2C%0D%0A++++bool+%24beforeToday%29+%7B%0D%0A++++%2F%2F+...%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=correct%3DReplace+Boolean+variables+with+polymorphism%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+processBatch%28%0D%0A++++bool+%24useLogin%2C%0D%0A++++bool+%24deleteEntries%2C%0D%0A++++bool+%24beforeToday%29+%7B%0D%0A++++%2F%2F+...%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+processBatch%28%0D%0A++++bool+%24useLogin%2C%0D%0A++++bool+%24deleteEntries%2C%0D%0A++++bool+%24beforeToday%29+%7B%0D%0A++++%2F%2F+...%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=correct%3DReplace+Boolean+variables+with+polymorphism%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+processBatch%28%0D%0A++++bool+%24useLogin%2C%0D%0A++++bool+%24deleteEntries%2C%0D%0A++++bool+%24beforeToday%29+%7B%0D%0A++++%2F%2F+...%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+processBatch%28%0D%0A++++bool+%24useLogin%2C%0D%0A++++bool+%24deleteEntries%2C%0D%0A++++bool+%24beforeToday%29+%7B%0D%0A++++%2F%2F+...%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=correct%3DReplace+Boolean+variables+with+polymorphism%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+processBatch%28%0D%0A++++bool+%24useLogin%2C%0D%0A++++bool+%24deleteEntries%2C%0D%0A++++bool+%24beforeToday%29+%7B%0D%0A++++%2F%2F+...%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+processBatch%28%0D%0A++++bool+%24useLogin%2C%0D%0A++++bool+%24deleteEntries%2C%0D%0A++++bool+%24beforeToday%29+%7B%0D%0A++++%2F%2F+...%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=correct%3DReplace+Boolean+variables+with+polymorphism%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+processBatch%28%0D%0A++++bool+%24useLogin%2C%0D%0A++++bool+%24deleteEntries%2C%0D%0A++++bool+%24beforeToday%29+%7B%0D%0A++++%2F%2F+...%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+processBatch%28%0D%0A++++bool+%24useLogin%2C%0D%0A++++bool+%24deleteEntries%2C%0D%0A++++bool+%24beforeToday%29+%7B%0D%0A++++%2F%2F+...%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=correct%3DReplace+Boolean+variables+with+polymorphism%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+processBatch%28%0D%0A++++bool+%24useLogin%2C%0D%0A++++bool+%24deleteEntries%2C%0D%0A++++bool+%24beforeToday%29+%7B%0D%0A++++%2F%2F+...%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Take extra care when declaring something *Boolean*. 

Flags are difficult to maintain and extend.

Learn more about the domain. Try migrating to [state design pattern](https://en.wikipedia.org/wiki/State_pattern). Use polymorphism instead of ifs/switch/cases.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 51 - Double Negatives](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2051%20-%20Double%20Negatives/readme.md)

[Code Smell 62 - Flag Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2062%20-%20Flag%20Variables/readme.md)

[Code Smell 104 - Assert True](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20104%20-%20Assert%20True/readme.md)

[Code Smell 24 - Boolean Coercions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2024%20-%20Boolean%20Coercions/readme.md)

[Code Smell 101 - Comparison Against Booleans](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20101%20-%20Comparison%20Against%20Booleans/readme.md)

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 199 - Gratuitous Booleans](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20199%20-%20Gratuitous%20Booleans/readme.md)

[Code Smell 270 - Boolean APIs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20270%20-%20Boolean%20APIs/readme.md)

# More Information 📕

[Martin Fowler](https://martinfowler.com/bliki/FlagArgument.html)

# Also Known as 🪪

- Flag Abuser

# Credits 🙏

Photo by [Phil Hearing](https://unsplash.com/@philhearing) on [Unsplash](https://unsplash.com/s/photos/flag-finish)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)