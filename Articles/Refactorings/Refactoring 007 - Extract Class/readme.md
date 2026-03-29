# Refactoring 007 - Extract Class

![Refactoring 007 - Extract Class](Refactoring%20007%20-%20Extract%20Class.jpg)

*Behavior is repeated across the system. But you are missing a real world concept*

> TL;DR: Put together what belongs together 

# Problems Addressed 😔

- Code Duplication

- Missing Abstraction

- Low Cohesion

# Related Code Smells 💨

[Code Smell 124 - Divergent Change](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20124%20-%20Divergent%20Change/readme.md)

[Code Smell 143 - Data Clumps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20143%20-%20Data%20Clumps/readme.md)

[Code Smell 147 - Too Many Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20147%20-%20Too%20Many%20Methods/readme.md)

# Context 💬

When a class starts doing work that should be delegated to others, it suffers from Low Cohesion. 

You often see this through "Data Clumps"—groups of variables that always travel together—or methods that seem unrelated to the class's primary responsibility. 

This bloat makes the code harder to understand and creates a "God Object" that changes for too many different reasons.

You need to extract these related behaviors and properties into a new, dedicated class, you give a name to a previously hidden concept. 

This not only promotes code reuse across the system but also ensures that each class has a single, well-defined reason to change. 

You are not just moving code; you are discovering the missing abstractions in your domain model.

# Steps 👣 

1. Extract the methods (and accidentally the properties) coupled into a new concept

2. Use the new concept

# Sample Code 💻

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/04dfcde00d2d40c8741f9af2fbeba469) -->

```java
final class Person {
 
      private String name;
   
      // Below cohesive properties
      private String homeAreaCode;
      private String homeNumber;
      
      public String name() {
          return name;
      }
   
      // Below cohesive behavior
      public String telephoneNumber() {
          return ("(" + homeAreaCode + ") " + homeNumber);
      }
      String areaCode() {
          return homeAreaCode;
      }
      String officeNumber() {
          return officeNumber;
      } 
 }
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/3038811d4e9e821908b54092ad8efaee) -->

```java
// 1. Extract the methods (and accidentally the properties) 
// coupled into a new concept      
   public class TelephoneNumber {
   
      private String number;
      private String areaCode;
   
      public String telephoneNumber() {
          return ("(" + areaCode + ") " + number);
      }
      public String areaCode() {
          return areaCode;
      }
      public String number() {
          return number;
      }
   }
   
final class Person {

      private String name;
  
      // 2. Use the new concept
      private TelephoneNumber officeTelephone = new TelephoneNumber();
      
      public String name() {
          return name;
      }
      public String telephoneNumber() {
          return officeTelephone.getTelephoneNumber();
      }
     
  }
```

# Type 📝

[X] Automatic

Most IDEs implement this safe refactor.

# Safety 🛡️

This is a safe refactoring.

# Why is the Code Better? ✨

The logic and its rules are centralized in one place.

# How Does it Improve the Bijection? 🗺️

In many software models, you often leave concepts homeless, scattering their behavior and data across unrelated classes. 

This creates a gap between the Real World (where a concept clearly exists) and the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) (where it is missing).

When you extract a class, you reify a concept.

You give a name and a physical place to an idea that was previously hidden in the implementation details. 

This direct 1:1 [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between a real-world entity and a software object reduces cognitive load.

You no longer need to mentally map data clumps back to their original meaning. 

You are not just organizing code; you are making the software more "real."

# Tags 🏷️

- Hierarchies

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

[Refactoring 019 - Reify Email Addresses](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20019%20-%20Reify%20Email%20Addresses/readme.md)

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

[Refactoring 023 - Replace Inheritance with Delegation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20023%20-%20Replace%20Inheritance%20with%20Delegation/readme.md)

[Refactoring 018 - Replace Singleton](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20018%20-%20Replace%20Singleton/readme.md)

[Refactoring 020 - Transform Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20020%20-%20Transform%20Static%20Functions/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Identify classes with low cohesion and unrelated methods.2. Extract related behaviors and properties into new classes.3. Refactor the original class to use the new extracted classes

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Afinal+class+Person+%7B%0D%0A+%0D%0A++++++private+String+name%3B%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+properties%0D%0A++++++private+String+homeAreaCode%3B%0D%0A++++++private+String+homeNumber%3B%0D%0A++++++%0D%0A++++++public+String+name%28%29+%7B%0D%0A++++++++++return+name%3B%0D%0A++++++%7D%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+behavior%0D%0A++++++public+String+telephoneNumber%28%29+%7B%0D%0A++++++++++return+%28%22%28%22+%2B+homeAreaCode+%2B+%22%29+%22+%2B+homeNumber%29%3B%0D%0A++++++%7D%0D%0A++++++String+areaCode%28%29+%7B%0D%0A++++++++++return+homeAreaCode%3B%0D%0A++++++%7D%0D%0A++++++String+officeNumber%28%29+%7B%0D%0A++++++++++return+officeNumber%3B%0D%0A++++++%7D+%0D%0A+%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+classes+with+low+cohesion+and+unrelated+methods.2.+Extract+related+behaviors+and+properties+into+new+classes.3.+Refactor+the+original+class+to+use+the+new+extracted+classes%3A+%60%60%60java%0D%0Afinal+class+Person+%7B%0D%0A+%0D%0A++++++private+String+name%3B%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+properties%0D%0A++++++private+String+homeAreaCode%3B%0D%0A++++++private+String+homeNumber%3B%0D%0A++++++%0D%0A++++++public+String+name%28%29+%7B%0D%0A++++++++++return+name%3B%0D%0A++++++%7D%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+behavior%0D%0A++++++public+String+telephoneNumber%28%29+%7B%0D%0A++++++++++return+%28%22%28%22+%2B+homeAreaCode+%2B+%22%29+%22+%2B+homeNumber%29%3B%0D%0A++++++%7D%0D%0A++++++String+areaCode%28%29+%7B%0D%0A++++++++++return+homeAreaCode%3B%0D%0A++++++%7D%0D%0A++++++String+officeNumber%28%29+%7B%0D%0A++++++++++return+officeNumber%3B%0D%0A++++++%7D+%0D%0A+%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Afinal+class+Person+%7B%0D%0A+%0D%0A++++++private+String+name%3B%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+properties%0D%0A++++++private+String+homeAreaCode%3B%0D%0A++++++private+String+homeNumber%3B%0D%0A++++++%0D%0A++++++public+String+name%28%29+%7B%0D%0A++++++++++return+name%3B%0D%0A++++++%7D%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+behavior%0D%0A++++++public+String+telephoneNumber%28%29+%7B%0D%0A++++++++++return+%28%22%28%22+%2B+homeAreaCode+%2B+%22%29+%22+%2B+homeNumber%29%3B%0D%0A++++++%7D%0D%0A++++++String+areaCode%28%29+%7B%0D%0A++++++++++return+homeAreaCode%3B%0D%0A++++++%7D%0D%0A++++++String+officeNumber%28%29+%7B%0D%0A++++++++++return+officeNumber%3B%0D%0A++++++%7D+%0D%0A+%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+classes+with+low+cohesion+and+unrelated+methods.2.+Extract+related+behaviors+and+properties+into+new+classes.3.+Refactor+the+original+class+to+use+the+new+extracted+classes%3A+%60%60%60java%0D%0Afinal+class+Person+%7B%0D%0A+%0D%0A++++++private+String+name%3B%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+properties%0D%0A++++++private+String+homeAreaCode%3B%0D%0A++++++private+String+homeNumber%3B%0D%0A++++++%0D%0A++++++public+String+name%28%29+%7B%0D%0A++++++++++return+name%3B%0D%0A++++++%7D%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+behavior%0D%0A++++++public+String+telephoneNumber%28%29+%7B%0D%0A++++++++++return+%28%22%28%22+%2B+homeAreaCode+%2B+%22%29+%22+%2B+homeNumber%29%3B%0D%0A++++++%7D%0D%0A++++++String+areaCode%28%29+%7B%0D%0A++++++++++return+homeAreaCode%3B%0D%0A++++++%7D%0D%0A++++++String+officeNumber%28%29+%7B%0D%0A++++++++++return+officeNumber%3B%0D%0A++++++%7D+%0D%0A+%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Afinal+class+Person+%7B%0D%0A+%0D%0A++++++private+String+name%3B%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+properties%0D%0A++++++private+String+homeAreaCode%3B%0D%0A++++++private+String+homeNumber%3B%0D%0A++++++%0D%0A++++++public+String+name%28%29+%7B%0D%0A++++++++++return+name%3B%0D%0A++++++%7D%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+behavior%0D%0A++++++public+String+telephoneNumber%28%29+%7B%0D%0A++++++++++return+%28%22%28%22+%2B+homeAreaCode+%2B+%22%29+%22+%2B+homeNumber%29%3B%0D%0A++++++%7D%0D%0A++++++String+areaCode%28%29+%7B%0D%0A++++++++++return+homeAreaCode%3B%0D%0A++++++%7D%0D%0A++++++String+officeNumber%28%29+%7B%0D%0A++++++++++return+officeNumber%3B%0D%0A++++++%7D+%0D%0A+%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+classes+with+low+cohesion+and+unrelated+methods.2.+Extract+related+behaviors+and+properties+into+new+classes.3.+Refactor+the+original+class+to+use+the+new+extracted+classes%3A+%60%60%60java%0D%0Afinal+class+Person+%7B%0D%0A+%0D%0A++++++private+String+name%3B%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+properties%0D%0A++++++private+String+homeAreaCode%3B%0D%0A++++++private+String+homeNumber%3B%0D%0A++++++%0D%0A++++++public+String+name%28%29+%7B%0D%0A++++++++++return+name%3B%0D%0A++++++%7D%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+behavior%0D%0A++++++public+String+telephoneNumber%28%29+%7B%0D%0A++++++++++return+%28%22%28%22+%2B+homeAreaCode+%2B+%22%29+%22+%2B+homeNumber%29%3B%0D%0A++++++%7D%0D%0A++++++String+areaCode%28%29+%7B%0D%0A++++++++++return+homeAreaCode%3B%0D%0A++++++%7D%0D%0A++++++String+officeNumber%28%29+%7B%0D%0A++++++++++return+officeNumber%3B%0D%0A++++++%7D+%0D%0A+%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Afinal+class+Person+%7B%0D%0A+%0D%0A++++++private+String+name%3B%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+properties%0D%0A++++++private+String+homeAreaCode%3B%0D%0A++++++private+String+homeNumber%3B%0D%0A++++++%0D%0A++++++public+String+name%28%29+%7B%0D%0A++++++++++return+name%3B%0D%0A++++++%7D%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+behavior%0D%0A++++++public+String+telephoneNumber%28%29+%7B%0D%0A++++++++++return+%28%22%28%22+%2B+homeAreaCode+%2B+%22%29+%22+%2B+homeNumber%29%3B%0D%0A++++++%7D%0D%0A++++++String+areaCode%28%29+%7B%0D%0A++++++++++return+homeAreaCode%3B%0D%0A++++++%7D%0D%0A++++++String+officeNumber%28%29+%7B%0D%0A++++++++++return+officeNumber%3B%0D%0A++++++%7D+%0D%0A+%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+classes+with+low+cohesion+and+unrelated+methods.2.+Extract+related+behaviors+and+properties+into+new+classes.3.+Refactor+the+original+class+to+use+the+new+extracted+classes%3A+%60%60%60java%0D%0Afinal+class+Person+%7B%0D%0A+%0D%0A++++++private+String+name%3B%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+properties%0D%0A++++++private+String+homeAreaCode%3B%0D%0A++++++private+String+homeNumber%3B%0D%0A++++++%0D%0A++++++public+String+name%28%29+%7B%0D%0A++++++++++return+name%3B%0D%0A++++++%7D%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+behavior%0D%0A++++++public+String+telephoneNumber%28%29+%7B%0D%0A++++++++++return+%28%22%28%22+%2B+homeAreaCode+%2B+%22%29+%22+%2B+homeNumber%29%3B%0D%0A++++++%7D%0D%0A++++++String+areaCode%28%29+%7B%0D%0A++++++++++return+homeAreaCode%3B%0D%0A++++++%7D%0D%0A++++++String+officeNumber%28%29+%7B%0D%0A++++++++++return+officeNumber%3B%0D%0A++++++%7D+%0D%0A+%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Afinal+class+Person+%7B%0D%0A+%0D%0A++++++private+String+name%3B%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+properties%0D%0A++++++private+String+homeAreaCode%3B%0D%0A++++++private+String+homeNumber%3B%0D%0A++++++%0D%0A++++++public+String+name%28%29+%7B%0D%0A++++++++++return+name%3B%0D%0A++++++%7D%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+behavior%0D%0A++++++public+String+telephoneNumber%28%29+%7B%0D%0A++++++++++return+%28%22%28%22+%2B+homeAreaCode+%2B+%22%29+%22+%2B+homeNumber%29%3B%0D%0A++++++%7D%0D%0A++++++String+areaCode%28%29+%7B%0D%0A++++++++++return+homeAreaCode%3B%0D%0A++++++%7D%0D%0A++++++String+officeNumber%28%29+%7B%0D%0A++++++++++return+officeNumber%3B%0D%0A++++++%7D+%0D%0A+%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+classes+with+low+cohesion+and+unrelated+methods.2.+Extract+related+behaviors+and+properties+into+new+classes.3.+Refactor+the+original+class+to+use+the+new+extracted+classes%3A+%60%60%60java%0D%0Afinal+class+Person+%7B%0D%0A+%0D%0A++++++private+String+name%3B%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+properties%0D%0A++++++private+String+homeAreaCode%3B%0D%0A++++++private+String+homeNumber%3B%0D%0A++++++%0D%0A++++++public+String+name%28%29+%7B%0D%0A++++++++++return+name%3B%0D%0A++++++%7D%0D%0A+++%0D%0A++++++%2F%2F+Below+cohesive+behavior%0D%0A++++++public+String+telephoneNumber%28%29+%7B%0D%0A++++++++++return+%28%22%28%22+%2B+homeAreaCode+%2B+%22%29+%22+%2B+homeNumber%29%3B%0D%0A++++++%7D%0D%0A++++++String+areaCode%28%29+%7B%0D%0A++++++++++return+homeAreaCode%3B%0D%0A++++++%7D%0D%0A++++++String+officeNumber%28%29+%7B%0D%0A++++++++++return+officeNumber%3B%0D%0A++++++%7D+%0D%0A+%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# See also 📚

[Refactoring.com](https://refactoring.com/catalog/extractClass.html)

[Refactoring Guru](https://refactoring.guru/extract-class)
 
# Credits 🙏

Image by [drpepperscott230](https://pixabay.com/users/drpepperscott230-1212529/) from [Pixabay](https://pixabay.com/)

*** 

This article is part of the Refactoring Series

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)