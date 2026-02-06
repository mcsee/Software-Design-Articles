# Refactoring 005 - Replace Comment with Function Name

![Refactoring 005 - Replace Comment with Function Name](Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name.png)

*Comments should add value. And function names too.*

> TL;DR: Don't comment on what you are doing. Name what you are doing. 

# Problems Addressed 😔

- Bad Names

- Comments

# Related Code Smells 💨

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

[Code Smell 75 - Comments Inside a Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2075%20-%20Comments%20Inside%20a%20Method/readme.md)

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

# Context 💬

Comments are often a "crutch" for poorly named identifiers or complex, low-level logic.

You write them to explain the intent that the code fails to express on its own. 

Comments are not executed; they drift, rot, and eventually lie when the code changes.

Instead of describing a block of code with a natural language remark, you should encapsulate that logic into a well-named function. 

This shifts the explanation from a passive note to an active, declarative abstraction. 

When the code explains itself through its structure and naming, you eliminate the maintenance burden of keeping documentation in sync with execution.

# Steps 👣 

1. Name the function with the previous comment

2. Remove the Comment

# Sample Code 📖

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/ec23401dcd3a6e03ca6613d3c58867d0) -->

```php
<?

function repl($str) {
  // Replaces with spaces the braces 
 
  $str = str_replace(array("\{","\}")," ",$str);
  return $str;

}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/25b76368b744b08194ea3c853fc8f5e8) -->

```php
<?

// 1. Name the function with the previous comment
// 2. Remove the Comment

function replaceBracesWithSpaces($input) {
  
  return str_replace(array("\{","\}")," ", $input);

}
```

# Type 📝

[X] Semi-Automatic

Some IDEs have this refactoring although naming is not fully automatic.

# Safety 🛡️

This is a safe refactoring.

# Why is the Code Better? ✨

Comments always lie.

It is hard to maintain comments.

On the contrary, Functions are alive and self-explanatory.

# How Does it Improve the Bijection? 🗺️      

A comment only describes the code in natural language. 

If you change the code, the comment and the behavior can drift apart, breaking the mapping between intention and execution.

When you replace a comment with a well-chosen function name, you create a direct [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between "what the code does" and "how you call it." 

The name becomes the single source of truth. 

This keeps the mental model aligned with the actual implementation, so both the reader and the compiler operate on the same unambiguous contract.

# Limitations ⚠️

As always, very important design decisions are valid comments.

# Tags 🏷️

- Comments

# Level 🔋

[X] Beginner

# Related Refactorings 🔄

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Name the function with the previous comment 2. Remove the Comment

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+repl%28%24str%29+%7B%0D%0A++%2F%2F+Replaces+with+spaces+the+braces+%0D%0A+%0D%0A++%24str+%3D+str_replace%28array%28%22%5C%7B%22%2C%22%5C%7D%22%29%2C%22+%22%2C%24str%29%3B%0D%0A++return+%24str%3B%0D%0A%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Name+the+function+with+the+previous+comment+2.+Remove+the+Comment%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+repl%28%24str%29+%7B%0D%0A++%2F%2F+Replaces+with+spaces+the+braces+%0D%0A+%0D%0A++%24str+%3D+str_replace%28array%28%22%5C%7B%22%2C%22%5C%7D%22%29%2C%22+%22%2C%24str%29%3B%0D%0A++return+%24str%3B%0D%0A%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+repl%28%24str%29+%7B%0D%0A++%2F%2F+Replaces+with+spaces+the+braces+%0D%0A+%0D%0A++%24str+%3D+str_replace%28array%28%22%5C%7B%22%2C%22%5C%7D%22%29%2C%22+%22%2C%24str%29%3B%0D%0A++return+%24str%3B%0D%0A%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Name+the+function+with+the+previous+comment+2.+Remove+the+Comment%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+repl%28%24str%29+%7B%0D%0A++%2F%2F+Replaces+with+spaces+the+braces+%0D%0A+%0D%0A++%24str+%3D+str_replace%28array%28%22%5C%7B%22%2C%22%5C%7D%22%29%2C%22+%22%2C%24str%29%3B%0D%0A++return+%24str%3B%0D%0A%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+repl%28%24str%29+%7B%0D%0A++%2F%2F+Replaces+with+spaces+the+braces+%0D%0A+%0D%0A++%24str+%3D+str_replace%28array%28%22%5C%7B%22%2C%22%5C%7D%22%29%2C%22+%22%2C%24str%29%3B%0D%0A++return+%24str%3B%0D%0A%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Name+the+function+with+the+previous+comment+2.+Remove+the+Comment%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+repl%28%24str%29+%7B%0D%0A++%2F%2F+Replaces+with+spaces+the+braces+%0D%0A+%0D%0A++%24str+%3D+str_replace%28array%28%22%5C%7B%22%2C%22%5C%7D%22%29%2C%22+%22%2C%24str%29%3B%0D%0A++return+%24str%3B%0D%0A%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+repl%28%24str%29+%7B%0D%0A++%2F%2F+Replaces+with+spaces+the+braces+%0D%0A+%0D%0A++%24str+%3D+str_replace%28array%28%22%5C%7B%22%2C%22%5C%7D%22%29%2C%22+%22%2C%24str%29%3B%0D%0A++return+%24str%3B%0D%0A%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Name+the+function+with+the+previous+comment+2.+Remove+the+Comment%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+repl%28%24str%29+%7B%0D%0A++%2F%2F+Replaces+with+spaces+the+braces+%0D%0A+%0D%0A++%24str+%3D+str_replace%28array%28%22%5C%7B%22%2C%22%5C%7D%22%29%2C%22+%22%2C%24str%29%3B%0D%0A++return+%24str%3B%0D%0A%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+repl%28%24str%29+%7B%0D%0A++%2F%2F+Replaces+with+spaces+the+braces+%0D%0A+%0D%0A++%24str+%3D+str_replace%28array%28%22%5C%7B%22%2C%22%5C%7D%22%29%2C%22+%22%2C%24str%29%3B%0D%0A++return+%24str%3B%0D%0A%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Name+the+function+with+the+previous+comment+2.+Remove+the+Comment%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+repl%28%24str%29+%7B%0D%0A++%2F%2F+Replaces+with+spaces+the+braces+%0D%0A+%0D%0A++%24str+%3D+str_replace%28array%28%22%5C%7B%22%2C%22%5C%7D%22%29%2C%22+%22%2C%24str%29%3B%0D%0A++return+%24str%3B%0D%0A%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# See also 📚

[What Exactly Is a Name? Part I: The Quest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20Exactly%20Is%20a%20Name%20-%20Part%20I%20The%20Quest/readme.md)

# Credits 🙏

Image by [Jannik Texler](https://pixabay.com/users/texler-3778340/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)