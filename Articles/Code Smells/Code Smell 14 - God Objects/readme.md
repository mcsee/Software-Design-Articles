# Code Smell 14 - God Objects

![Code Smell 14 - God Objects](Code%20Smell%2014%20-%20God%20Objects.jpg)

*An object that knows too much or does too much.*

> TL;DR: Don't take too many responsibilities in a single class.

# Problems 😔 

- Low cohesion

- High [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Single Responsibility Violation

# Solutions 😃

- Split responsibilities.

- Follow the Single Responsibility Principle.

- Apply the [Boy Scout Rule](https://medium.com/@biratkirat/step-8-the-boy-scout-rule-robert-c-martin-uncle-bob-9ac839778385).

# Refactorings ⚙️

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Examples 📚

- Libraries

# Context 💬

God Objects form when you concentrate too many responsibilities in a single class. 

These objects become central hubs that know everything and control everything in your system. 

You create them gradually, with each added method making the class harder to maintain.

Libraries and [utility](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md) classes from procedural programming encouraged this pattern in the 1960s.

Object-oriented design distributes responsibilities across many focused objects.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/9e31898b70c00fcb2d71d6d9a47be02d) -->

```javascript
class Soldier {
   run() {}
   fight() {}
   driveGeneral() {}
   clean() {} 
   fire() {} 
   bePromoted() {}
   serialize() {}
   display() {} 
   persistOnDatabase() {}
   toXML() {}
   jsonDecode() {}
  
  // ...
  }
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/93818a16a693b7371c8a81670ef522e5) -->

```javascript
class Soldier {
   run() {}
   fight() {}
   clean() {}    
  }
```

# Detection 🔍

Linters can count methods and warn against a threshold.

# Exceptions 🛑

- [Facades](https://en.wikipedia.org/wiki/Facade_pattern)

# Tags 🏷️

- Coupling

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️

When you model your software, you need to maintain a clear bijection between your code and the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md). 

God Objects break this mapping by lumping multiple real-world concepts into a single artificial construct. 

You will not find a single entity that manages users, processes payments, sends emails, and generates reports.

You have distinct roles and responsibilities. 

When you create a God Object, you lose this clear [correspondence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md), making your code harder to understand and maintain.

# AI Generation 🤖

AI code generators frequently create God Objects when you ask them to "create a complete system" or "build a payment system.".

They tend to group related functionality into convenient single classes rather than distributing responsibilities properly. 

You need to explicitly instruct them to separate concerns and create focused classes.

# AI Detection 🧲

AI tools can detect God Objects when you provide clear instructions. 

The assistants can count methods, analyze dependencies, and suggest splitting classes. 

They struggle to determine the right boundaries without domain knowledge about your specific system.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Suggest how to split it into smaller, cohesive classes, each handling a single responsibility

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Soldier+%7B%0D%0A+++run%28%29+%7B%7D%0D%0A+++fight%28%29+%7B%7D%0D%0A+++driveGeneral%28%29+%7B%7D%0D%0A+++clean%28%29+%7B%7D+%0D%0A+++fire%28%29+%7B%7D+%0D%0A+++bePromoted%28%29+%7B%7D%0D%0A+++serialize%28%29+%7B%7D%0D%0A+++display%28%29+%7B%7D+%0D%0A+++persistOnDatabase%28%29+%7B%7D%0D%0A+++toXML%28%29+%7B%7D%0D%0A+++jsonDecode%28%29+%7B%7D%0D%0A++%0D%0A++%2F%2F+...%0D%0A++%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Suggest+how+to+split+it+into+smaller%2C+cohesive+classes%2C+each+handling+a+single+responsibility%3A+%60%60%60javascript%0D%0Aclass+Soldier+%7B%0D%0A+++run%28%29+%7B%7D%0D%0A+++fight%28%29+%7B%7D%0D%0A+++driveGeneral%28%29+%7B%7D%0D%0A+++clean%28%29+%7B%7D+%0D%0A+++fire%28%29+%7B%7D+%0D%0A+++bePromoted%28%29+%7B%7D%0D%0A+++serialize%28%29+%7B%7D%0D%0A+++display%28%29+%7B%7D+%0D%0A+++persistOnDatabase%28%29+%7B%7D%0D%0A+++toXML%28%29+%7B%7D%0D%0A+++jsonDecode%28%29+%7B%7D%0D%0A++%0D%0A++%2F%2F+...%0D%0A++%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Soldier+%7B%0D%0A+++run%28%29+%7B%7D%0D%0A+++fight%28%29+%7B%7D%0D%0A+++driveGeneral%28%29+%7B%7D%0D%0A+++clean%28%29+%7B%7D+%0D%0A+++fire%28%29+%7B%7D+%0D%0A+++bePromoted%28%29+%7B%7D%0D%0A+++serialize%28%29+%7B%7D%0D%0A+++display%28%29+%7B%7D+%0D%0A+++persistOnDatabase%28%29+%7B%7D%0D%0A+++toXML%28%29+%7B%7D%0D%0A+++jsonDecode%28%29+%7B%7D%0D%0A++%0D%0A++%2F%2F+...%0D%0A++%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Suggest+how+to+split+it+into+smaller%2C+cohesive+classes%2C+each+handling+a+single+responsibility%3A+%60%60%60javascript%0D%0Aclass+Soldier+%7B%0D%0A+++run%28%29+%7B%7D%0D%0A+++fight%28%29+%7B%7D%0D%0A+++driveGeneral%28%29+%7B%7D%0D%0A+++clean%28%29+%7B%7D+%0D%0A+++fire%28%29+%7B%7D+%0D%0A+++bePromoted%28%29+%7B%7D%0D%0A+++serialize%28%29+%7B%7D%0D%0A+++display%28%29+%7B%7D+%0D%0A+++persistOnDatabase%28%29+%7B%7D%0D%0A+++toXML%28%29+%7B%7D%0D%0A+++jsonDecode%28%29+%7B%7D%0D%0A++%0D%0A++%2F%2F+...%0D%0A++%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Soldier+%7B%0D%0A+++run%28%29+%7B%7D%0D%0A+++fight%28%29+%7B%7D%0D%0A+++driveGeneral%28%29+%7B%7D%0D%0A+++clean%28%29+%7B%7D+%0D%0A+++fire%28%29+%7B%7D+%0D%0A+++bePromoted%28%29+%7B%7D%0D%0A+++serialize%28%29+%7B%7D%0D%0A+++display%28%29+%7B%7D+%0D%0A+++persistOnDatabase%28%29+%7B%7D%0D%0A+++toXML%28%29+%7B%7D%0D%0A+++jsonDecode%28%29+%7B%7D%0D%0A++%0D%0A++%2F%2F+...%0D%0A++%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Suggest+how+to+split+it+into+smaller%2C+cohesive+classes%2C+each+handling+a+single+responsibility%3A+%60%60%60javascript%0D%0Aclass+Soldier+%7B%0D%0A+++run%28%29+%7B%7D%0D%0A+++fight%28%29+%7B%7D%0D%0A+++driveGeneral%28%29+%7B%7D%0D%0A+++clean%28%29+%7B%7D+%0D%0A+++fire%28%29+%7B%7D+%0D%0A+++bePromoted%28%29+%7B%7D%0D%0A+++serialize%28%29+%7B%7D%0D%0A+++display%28%29+%7B%7D+%0D%0A+++persistOnDatabase%28%29+%7B%7D%0D%0A+++toXML%28%29+%7B%7D%0D%0A+++jsonDecode%28%29+%7B%7D%0D%0A++%0D%0A++%2F%2F+...%0D%0A++%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Soldier+%7B%0D%0A+++run%28%29+%7B%7D%0D%0A+++fight%28%29+%7B%7D%0D%0A+++driveGeneral%28%29+%7B%7D%0D%0A+++clean%28%29+%7B%7D+%0D%0A+++fire%28%29+%7B%7D+%0D%0A+++bePromoted%28%29+%7B%7D%0D%0A+++serialize%28%29+%7B%7D%0D%0A+++display%28%29+%7B%7D+%0D%0A+++persistOnDatabase%28%29+%7B%7D%0D%0A+++toXML%28%29+%7B%7D%0D%0A+++jsonDecode%28%29+%7B%7D%0D%0A++%0D%0A++%2F%2F+...%0D%0A++%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Suggest+how+to+split+it+into+smaller%2C+cohesive+classes%2C+each+handling+a+single+responsibility%3A+%60%60%60javascript%0D%0Aclass+Soldier+%7B%0D%0A+++run%28%29+%7B%7D%0D%0A+++fight%28%29+%7B%7D%0D%0A+++driveGeneral%28%29+%7B%7D%0D%0A+++clean%28%29+%7B%7D+%0D%0A+++fire%28%29+%7B%7D+%0D%0A+++bePromoted%28%29+%7B%7D%0D%0A+++serialize%28%29+%7B%7D%0D%0A+++display%28%29+%7B%7D+%0D%0A+++persistOnDatabase%28%29+%7B%7D%0D%0A+++toXML%28%29+%7B%7D%0D%0A+++jsonDecode%28%29+%7B%7D%0D%0A++%0D%0A++%2F%2F+...%0D%0A++%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Soldier+%7B%0D%0A+++run%28%29+%7B%7D%0D%0A+++fight%28%29+%7B%7D%0D%0A+++driveGeneral%28%29+%7B%7D%0D%0A+++clean%28%29+%7B%7D+%0D%0A+++fire%28%29+%7B%7D+%0D%0A+++bePromoted%28%29+%7B%7D%0D%0A+++serialize%28%29+%7B%7D%0D%0A+++display%28%29+%7B%7D+%0D%0A+++persistOnDatabase%28%29+%7B%7D%0D%0A+++toXML%28%29+%7B%7D%0D%0A+++jsonDecode%28%29+%7B%7D%0D%0A++%0D%0A++%2F%2F+...%0D%0A++%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Suggest+how+to+split+it+into+smaller%2C+cohesive+classes%2C+each+handling+a+single+responsibility%3A+%60%60%60javascript%0D%0Aclass+Soldier+%7B%0D%0A+++run%28%29+%7B%7D%0D%0A+++fight%28%29+%7B%7D%0D%0A+++driveGeneral%28%29+%7B%7D%0D%0A+++clean%28%29+%7B%7D+%0D%0A+++fire%28%29+%7B%7D+%0D%0A+++bePromoted%28%29+%7B%7D%0D%0A+++serialize%28%29+%7B%7D%0D%0A+++display%28%29+%7B%7D+%0D%0A+++persistOnDatabase%28%29+%7B%7D%0D%0A+++toXML%28%29+%7B%7D%0D%0A+++jsonDecode%28%29+%7B%7D%0D%0A++%0D%0A++%2F%2F+...%0D%0A++%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Libraries were fine in the 1960s.

In Object-Oriented Programming, you need to distribute responsibilities among many objects.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 34 - Too Many Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2034%20-%20Too%20Many%20Attributes/readme.md)

[Code Smell 202 - God Constant Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20202%20-%20God%20Constant%20Class/readme.md)

[Code Smell 124 - Divergent Change](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20124%20-%20Divergent%20Change/readme.md)

[Code Smell 22 - Helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md)

[Code Smell 143 - Data Clumps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20143%20-%20Data%20Clumps/readme.md)

# More Information 📕

[Wikipedia](https://en.wikipedia.org/wiki/God_object)

[Refactoring Guru](https://refactoring.guru/es/smells/large-class)

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Also Known as 🪪

- Large Class

# Credits 🙏

Photo by [Francisco Ghisletti](https://unsplash.com/@tank_ghisletti) on [Unsplash](https://unsplash.com/s/photos/greek-god-statue)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)