# Refactoring 003 - Extract Constant

![Refactoring 003 - Extract Constant](Refactoring%20003%20-%20Extract%20Constant.jpg)

*You need to use some values explaining their meaning and origin*

> TL;DR: Name all your magic numbers

# Problems Addressed 😔

- Readability

- Complexity

- Code Reuse

# Related Code Smells 💨

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

# Context 💬

Numbers or strings often lack clear intent in code.

When they appear without a name, they become Magic Numbers—mysterious values that force the reader to guess the developer's original goal.

This creates high cognitive load and maintenance traps. 

If you need to change a value used in multiple places, you risk introducing bugs through manual "search and replace."

By extracting these literals into named constants, you transform "mystery code" into declarative code.

You provide a single source of truth that explains the Why behind the What, making the logic more understandable.

# Steps 👣 

1. Move the constant code fragment to a constant declaration

2. Replace the values with a reference to the constant.

# Sample Code 📖

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/4beca4e8726130c29a74b956df6aefe2) -->

```java
double energy(double mass) {
  return mass * 300.000 ^ 2;
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/17728639113169878b08a95a373624e3) -->

```java
// 1. Move the constant code fragment to a constant declaration
final double LIGHT_SPEED = 300.000;

double energy(double mass) {
  // 2. Replace the old code with a reference to the constant.
  return mass * LIGHT_SPEED ^ 2;
}
```

# Type 📝

[X] Automatic
 
Many IDEs support this safe refactoring

# Safety 🛡️

This is a safe refactoring.

# Why is the Code Better? ✨

Constant names add meaning to our code.

Magic numbers are difficult to understand and change.

Code must be as declarative as possible.

# How Does it Improve the Bijection? 🗺️     

Every constant you name creates a clear one-to-one mapping between intent and value. That’s bijection.

A raw number like 86400 might mean seconds in a day, but it forces readers to compute that.

Naming it SECONDS_IN_A_DAY makes the mapping explicit.

You remove ambiguity, and readers don’t have to reverse-engineer your logic.

That’s how you keep code understandable at a glance.

# Tags 🏷️

- Readability

# Level 🔋

[X] Beginner

# Related Refactorings 🔄

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

[Refactoring 008 - Convert Variables to Constant](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20008%20-%20Convert%20Variables%20to%20Constant/readme.md)

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Move the constant code fragment to a constant declaration 2. Replace the values with a reference to the constant.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Adouble+energy%28double+mass%29+%7B%0D%0A++return+mass+%2A+300.000+%5E+2%3B%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Move+the+constant+code+fragment+to+a+constant+declaration+2.+Replace+the+values+with+a+reference+to+the+constant.%3A+%60%60%60java%0D%0Adouble+energy%28double+mass%29+%7B%0D%0A++return+mass+%2A+300.000+%5E+2%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Adouble+energy%28double+mass%29+%7B%0D%0A++return+mass+%2A+300.000+%5E+2%3B%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Move+the+constant+code+fragment+to+a+constant+declaration+2.+Replace+the+values+with+a+reference+to+the+constant.%3A+%60%60%60java%0D%0Adouble+energy%28double+mass%29+%7B%0D%0A++return+mass+%2A+300.000+%5E+2%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Adouble+energy%28double+mass%29+%7B%0D%0A++return+mass+%2A+300.000+%5E+2%3B%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Move+the+constant+code+fragment+to+a+constant+declaration+2.+Replace+the+values+with+a+reference+to+the+constant.%3A+%60%60%60java%0D%0Adouble+energy%28double+mass%29+%7B%0D%0A++return+mass+%2A+300.000+%5E+2%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Adouble+energy%28double+mass%29+%7B%0D%0A++return+mass+%2A+300.000+%5E+2%3B%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Move+the+constant+code+fragment+to+a+constant+declaration+2.+Replace+the+values+with+a+reference+to+the+constant.%3A+%60%60%60java%0D%0Adouble+energy%28double+mass%29+%7B%0D%0A++return+mass+%2A+300.000+%5E+2%3B%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Adouble+energy%28double+mass%29+%7B%0D%0A++return+mass+%2A+300.000+%5E+2%3B%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Move+the+constant+code+fragment+to+a+constant+declaration+2.+Replace+the+values+with+a+reference+to+the+constant.%3A+%60%60%60java%0D%0Adouble+energy%28double+mass%29+%7B%0D%0A++return+mass+%2A+300.000+%5E+2%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Credits 🙏

Image by [Tumisu](https://pixabay.com/users/tumisu-148124/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)