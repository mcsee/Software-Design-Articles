# Code Smell 10 - Too Many Arguments

![Code Smell 10 - Too Many Arguments](Code%20Smell%2010%20-%20Too%20Many%20Arguments.jpg)

*Objects or Functions need too many arguments to work.*

> TL;DR: Don't pass more than three arguments to your functions.

# Problems 😔 

- Low maintainability
- Low Reuse			 
- Coupling

# Solutions 😃

1. Find cohesive relations among arguments

2. Create a "context".

3. Consider using a [Method Object](https://wiki.c2.com/?MethodObject) Pattern.

4. Avoid "basic" Types: strings, arrays, integers, etc. Think on objects.

# Refactorings ⚙️

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

[Refactoring 010 - Extract Method Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

[Refactoring 034 - Reify Parameters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20034%20-%20Reify%20Parameters/readme.md)

# Context 💬

When you add arguments to make a function work, you encode knowledge in position and order. 

You force your callers to remember rules that belong to the domain.

When you do this, you move behavior away from meaningful objects, and you replace intent with mechanics.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/ea7d32472830d5ea877be1438807fe89) -->

```java
public class Printer {   
  void print(String documentToPrint, 
           String papersize,
           String orientation, 
           boolean grayscales,
           int pagefrom,
           int pageTo,
           int copies,
           float marginLeft,
           float marginRight,
           float marginTop,
           float marginBottom         
        ) {
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/200a18dd99a76a95155df4cb032b1d10) -->

```java
final public class PaperSize { }
final public class Document { }
final public class PrintMargins { }
final public class PrintRange { }  
final public class ColorConfiguration { }
final public class PrintOrientation { }
// Class definition with methods and properties omitted for simplicity

final public class PrintSetup {
    public PrintSetup(PaperSize papersize,
           PrintOrientation orientation, 
           ColorConfiguration color,
           PrintRange range,
           int copiesCount,
           PrintMargins margins
           ) {}
}

final public class Printer {   
  void print(
         Document documentToPrint, 
         PrintSetup setup        
        ) {
    }
}
```

# Detection 🔍

Most linters warn when the arguments list is too large.

You can also detect this smell when a function signature grows over time.

# Exceptions 🛑

Operations in real-world needing not cohesive collaborators.

Some low-level functions mirror external APIs or system calls. 

In those cases, argument lists reflect constraints you cannot control.

# Tags 🏷️

- Bloaters

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️

Good design keeps a clear [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between concepts in the program and concepts in the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

When you spread a concept across many arguments, you break that mapping.

You force callers to assemble meaning manually, and the model stops representing the domain.

# AI Generation 🤖

AI generators often create this smell. 

They optimize for quick success and keep adding parameters instead of creating new abstractions.

# AI Detection 🧲

AI generators can fix this smell when you ask for value objects or domain concepts explicitly. 

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Refactor this function by grouping related parameters into meaningful domain objects and reduce the argument list to one parameter

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Refactor+this+function+by+grouping+related+parameters+into+meaningful+domain+objects+and+reduce+the+argument+list+to+one+parameter%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Refactor+this+function+by+grouping+related+parameters+into+meaningful+domain+objects+and+reduce+the+argument+list+to+one+parameter%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Refactor+this+function+by+grouping+related+parameters+into+meaningful+domain+objects+and+reduce+the+argument+list+to+one+parameter%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Refactor+this+function+by+grouping+related+parameters+into+meaningful+domain+objects+and+reduce+the+argument+list+to+one+parameter%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Refactor+this+function+by+grouping+related+parameters+into+meaningful+domain+objects+and+reduce+the+argument+list+to+one+parameter%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Relate arguments and group them.

Always favor real-world mappings. Find in real-world how to group the arguments in cohesive objects.

If a function gets too many arguments, some of them might be related to the class construction. This is a design smell too.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 34 - Too Many Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2034%20-%20Too%20Many%20Attributes/readme.md)

[Code Smell 13 - Empty Constructors](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2013%20-%20Empty%20Constructors/readme.md)

[Code Smell 87 - Inconsistent Parameters Sorting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2087%20-%20Inconsistent%20Parameters%20Sorting/readme.md)

# Credits 🙏

Photo by [Tobias Tullius](https://unsplash.com/@tobiastu) on [Unsplash](https://unsplash.com/s/photos/loaded)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)