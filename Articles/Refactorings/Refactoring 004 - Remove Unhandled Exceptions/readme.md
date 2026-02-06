# Refactoring 004 - Remove Unhandled Exceptions

![Refactoring 004 - Remove Unhandled Exceptions](Refactoring%20004%20-%20Remove%20Unhandled%20Exceptions.jpg)

*Creating YAGNI exception classes pollutes our environment. Let's remove them.*

> TL;DR: Remove unnecessary and unreferenced empty exception classes.

# Problems Addressed 😔

- Empty Classes

- Namespace Polluted

# Related Code Smells 💨

[Code Smell 26 - Exceptions Polluting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2026%20-%20Exceptions%20Polluting/readme.md)

# Context 💬

Many developers create custom exception classes for every *possible* error scenario as a "best practice." 

Most of these classes end up as empty shells—boilerplate code that is never specifically caught or handled.

When you create an exception class that no one catches, you are violating the YAGNI (You Ain't Gonna Need It) principle. You end up with a polluted namespace and a codebase filled with "just in case" artifacts. 

This noise hides the truly critical errors that actually require specialized handling.

Refactoring these out simplifies your hierarchy and ensures that when a custom exception **does exist**, it actually serves a purpose.

# Steps 👣 

1. Check there are no references to the empty exception class.

2. Replace the throw sentence with a generic one.

# Sample Code 📖

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/c95a843d906b0e339ec617779f79f538) -->

```ruby
class RangeNotSatisfiedException < StandardError
end

begin
    raise RangeNotSatisfiedException.new
      "Range must be betweet 0 and 10"
rescue RangeNotSatisfiedException => e
    puts e.message 
    puts e.exception_type 
end
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/63915cf29a543ce091267619bb21917b) -->

```ruby
# 1. Check there are no references to the empty exception class.

# 2. Replace the throw sentence with a generic one.

begin
    raise StandardError.new "Range must be betweet 0 and 10"
rescue StandardError => exception
    puts exception.message 
    puts exception.exception_type 
end
```

# Type 📝

[X] Automatic

If the Exception class has no references, you can perform a Safe Remove and replace it with *Exception* class.

# Safety 🛡️

Unless you use metaprogramming, checking for references should be safe enough.

# Why is the Code Better? ✨

- You remove an empty class that nobody uses. 

- You shrink the code.

# How Does it Improve the Bijection? 🗺️

You remove noise that breaks the [1:1 relationship](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between concepts and code. 

Each class should represent something meaningful. 

An unused exception pretends there's a case that never occurs. It lies. 

By deleting it, you align your code more closely to the truth. 

Now, each exception you see signals a real event, not a hypothetical one.

# Limitations ⚠️

If we need to declare an empty exception class as documentation for an API module, our clients might need to catch it.

This is a [gold plating](https://en.wikipedia.org/wiki/Gold_plating_(project_management)) and [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) example.

# Tags 🏷️

- Exceptions

# Level 🔋

[X] Beginner

# Related Refactorings 🔄

[Refactoring 021 - Remove Dead Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20021%20-%20Remove%20Dead%20Code/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Check there are no references to the empty exception class.2. Replace the throw sentence with a generic one.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60ruby%0D%0Aclass+RangeNotSatisfiedException+%3C+StandardError%0D%0Aend%0D%0A%0D%0Abegin%0D%0A++++raise+RangeNotSatisfiedException.new%0D%0A++++++%22Range+must+be+betweet+0+and+10%22%0D%0Arescue+RangeNotSatisfiedException+%3D%3E+e%0D%0A++++puts+e.message+%0D%0A++++puts+e.exception_type+%0D%0Aend%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Check+there+are+no+references+to+the+empty+exception+class.2.+Replace+the+throw+sentence+with+a+generic+one.%3A+%60%60%60ruby%0D%0Aclass+RangeNotSatisfiedException+%3C+StandardError%0D%0Aend%0D%0A%0D%0Abegin%0D%0A++++raise+RangeNotSatisfiedException.new%0D%0A++++++%22Range+must+be+betweet+0+and+10%22%0D%0Arescue+RangeNotSatisfiedException+%3D%3E+e%0D%0A++++puts+e.message+%0D%0A++++puts+e.exception_type+%0D%0Aend%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60ruby%0D%0Aclass+RangeNotSatisfiedException+%3C+StandardError%0D%0Aend%0D%0A%0D%0Abegin%0D%0A++++raise+RangeNotSatisfiedException.new%0D%0A++++++%22Range+must+be+betweet+0+and+10%22%0D%0Arescue+RangeNotSatisfiedException+%3D%3E+e%0D%0A++++puts+e.message+%0D%0A++++puts+e.exception_type+%0D%0Aend%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Check+there+are+no+references+to+the+empty+exception+class.2.+Replace+the+throw+sentence+with+a+generic+one.%3A+%60%60%60ruby%0D%0Aclass+RangeNotSatisfiedException+%3C+StandardError%0D%0Aend%0D%0A%0D%0Abegin%0D%0A++++raise+RangeNotSatisfiedException.new%0D%0A++++++%22Range+must+be+betweet+0+and+10%22%0D%0Arescue+RangeNotSatisfiedException+%3D%3E+e%0D%0A++++puts+e.message+%0D%0A++++puts+e.exception_type+%0D%0Aend%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60ruby%0D%0Aclass+RangeNotSatisfiedException+%3C+StandardError%0D%0Aend%0D%0A%0D%0Abegin%0D%0A++++raise+RangeNotSatisfiedException.new%0D%0A++++++%22Range+must+be+betweet+0+and+10%22%0D%0Arescue+RangeNotSatisfiedException+%3D%3E+e%0D%0A++++puts+e.message+%0D%0A++++puts+e.exception_type+%0D%0Aend%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Check+there+are+no+references+to+the+empty+exception+class.2.+Replace+the+throw+sentence+with+a+generic+one.%3A+%60%60%60ruby%0D%0Aclass+RangeNotSatisfiedException+%3C+StandardError%0D%0Aend%0D%0A%0D%0Abegin%0D%0A++++raise+RangeNotSatisfiedException.new%0D%0A++++++%22Range+must+be+betweet+0+and+10%22%0D%0Arescue+RangeNotSatisfiedException+%3D%3E+e%0D%0A++++puts+e.message+%0D%0A++++puts+e.exception_type+%0D%0Aend%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60ruby%0D%0Aclass+RangeNotSatisfiedException+%3C+StandardError%0D%0Aend%0D%0A%0D%0Abegin%0D%0A++++raise+RangeNotSatisfiedException.new%0D%0A++++++%22Range+must+be+betweet+0+and+10%22%0D%0Arescue+RangeNotSatisfiedException+%3D%3E+e%0D%0A++++puts+e.message+%0D%0A++++puts+e.exception_type+%0D%0Aend%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Check+there+are+no+references+to+the+empty+exception+class.2.+Replace+the+throw+sentence+with+a+generic+one.%3A+%60%60%60ruby%0D%0Aclass+RangeNotSatisfiedException+%3C+StandardError%0D%0Aend%0D%0A%0D%0Abegin%0D%0A++++raise+RangeNotSatisfiedException.new%0D%0A++++++%22Range+must+be+betweet+0+and+10%22%0D%0Arescue+RangeNotSatisfiedException+%3D%3E+e%0D%0A++++puts+e.message+%0D%0A++++puts+e.exception_type+%0D%0Aend%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60ruby%0D%0Aclass+RangeNotSatisfiedException+%3C+StandardError%0D%0Aend%0D%0A%0D%0Abegin%0D%0A++++raise+RangeNotSatisfiedException.new%0D%0A++++++%22Range+must+be+betweet+0+and+10%22%0D%0Arescue+RangeNotSatisfiedException+%3D%3E+e%0D%0A++++puts+e.message+%0D%0A++++puts+e.exception_type+%0D%0Aend%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Check+there+are+no+references+to+the+empty+exception+class.2.+Replace+the+throw+sentence+with+a+generic+one.%3A+%60%60%60ruby%0D%0Aclass+RangeNotSatisfiedException+%3C+StandardError%0D%0Aend%0D%0A%0D%0Abegin%0D%0A++++raise+RangeNotSatisfiedException.new%0D%0A++++++%22Range+must+be+betweet+0+and+10%22%0D%0Arescue+RangeNotSatisfiedException+%3D%3E+e%0D%0A++++puts+e.message+%0D%0A++++puts+e.exception_type+%0D%0Aend%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Credits 🙏

Image by [danielkirsch](https://pixabay.com/users/danielkirsch-4218687/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)