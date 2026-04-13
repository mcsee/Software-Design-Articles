# Refactoring 009 - Protect Public Attributes
            
![Refactoring 009 - Protect Public Attributes](Refactoring%20009%20-%20Protect%20Public%20Attributes.jpg)

*Forget about data structures, DTOs, POJOs, and anemic objects.*

> TL;DR: Avoid external manipulation

# Problems Addressed 😔

- Encapsulation Violation
- [Anemic](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md) Models

# Related Code Smells 💨

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 40 - DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

# Context 💬

Public attributes are a direct invitation to break encapsulation. 

When you expose an object's internal state, you lose control over its consistency and lifecycle. 

Any external consumer can modify its data without the object even knowing, leading to Anemic Models that are little more than glorified data structures.

You should force the interaction through a controlled interface. 

This allows the object to maintain its invariants, validate state changes, and hide implementation details. 

It transforms your code from a collection of leaked data into a set of robust, self-governing objects that truly own their behavior.

# Steps 👣 

1. Change the visibility of your attributes from *public* to *private*.

# Sample Code 💻

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/803a3400fe6b241417de5abd17b89606) -->

```java
public class Song {
   String artistName;
   String albumName;
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/bfefa85761d0030892bcbdd438ca7f59) -->

```java
public class Song {
   // 1- Change the visibility 
   // of your attributes from public to private
   private String artistName;
   private String AlbumName;
  
  // We can't access attributes until we add methods
}
```

# Type 📝

[X] Semi-Automatic

You can change the visibility with an IDE or text editor.

# Safety 🛡️

This is not a safe refactor.

Existing dependencies may break.

# Why is the Code Better? ✨

You can change encapsulated code easily.

The code is not repeated.

# How Does it Improve the Bijection? 🗺️

This refactoring improves the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between code and the real-world domain.

Public attributes violate the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) principle by exposing internal implementation details.

When you protect the attributes, you reduce [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) and create a proper interface that reflects domain behavior rather than technical structure.

# Limitations ⚠️

Some languages don't have visibility options.

# Tags 🏷️

- Anemic Models

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 001 - Remove Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Identify all public attributes in the class.2. Change their visibility from public to private.3. Create appropriate getter and setter methods with proper validation

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+artistName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+all+public+attributes+in+the+class.2.+Change+their+visibility+from+public+to+private.3.+Create+appropriate+getter+and+setter+methods+with+proper+validation%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+artistName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+artistName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+all+public+attributes+in+the+class.2.+Change+their+visibility+from+public+to+private.3.+Create+appropriate+getter+and+setter+methods+with+proper+validation%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+artistName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+artistName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+all+public+attributes+in+the+class.2.+Change+their+visibility+from+public+to+private.3.+Create+appropriate+getter+and+setter+methods+with+proper+validation%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+artistName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+artistName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+all+public+attributes+in+the+class.2.+Change+their+visibility+from+public+to+private.3.+Create+appropriate+getter+and+setter+methods+with+proper+validation%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+artistName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+artistName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+all+public+attributes+in+the+class.2.+Change+their+visibility+from+public+to+private.3.+Create+appropriate+getter+and+setter+methods+with+proper+validation%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+artistName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# See also 📚

[Wikipedia](https://en.wikipedia.org/wiki/Encapsulation_(computer_programming))

[Refactoring Guru](https://refactoring.guru/refactoring/techniques/dealing-with-generalization/hide-delegate)

# Credits 🙏

Image by [Couleur](https://pixabay.com/users/couleur-1195798/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)