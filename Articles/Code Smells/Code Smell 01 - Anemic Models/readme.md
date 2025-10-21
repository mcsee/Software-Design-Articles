# Code Smell 01 - Anemic Models

![Code Smell 01 - Anemic Models](Code%20Smell%2001%20-%20Anemic%20Models.jpg)

*Your objects have no behavior.*

> TL;DR: Don't use objects as data structures

# Problems 😔

- Lack of encapsulation

- No [mapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) to real-world entities

- Duplicated Code

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Writer / Reader mismatch

- Missing behavior

# Solutions 😃

1) Find Responsibilities.

2) Protect your attributes.

3) Hide implementations. 

4) Follow Tell-Don't-Ask principle

# Refactorings ⚙️

[Refactoring 016 - Build With The Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)

[Refactoring 009 - Protect Public Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20009%20-%20Protect%20Public%20Attributes/readme.md)

[Refactoring 001 - Remove Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md)

# Examples 📚

- DTOs

# Context 💬

If you let your objects become data buckets, you kill the connection between your logic and your language.  

Anemic models are classes that contain only data (properties) with little or no behavior. 

They're essentially glorified data structures with getters and setters.

When you create anemic models, you end up putting all the logic that should live in these objects into service classes instead duplicated the logic across multiple services.

This approach breaks object-oriented principles by separating data from the behavior that manipulates it. 

You'll find yourself writing procedural code that pulls data out of objects, performs operations on it, and then pushes the results back in. 

This creates tight coupling between your services and objects, making your codebase harder to maintain and evolve.

When you identify an anemic model in your code, it's a sign that you're missing opportunities for better encapsulation and more intuitive object design. 

Rich domain models lead to code that's more maintainable, testable, and closer to how you think about the problem domain.

# Sample Code 💬

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/73f84d80f7c3e89a216dd9e40ab71bcc) -->

```java
public class Song {
   String name;
   String authorName;
   String albumName;
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/78f2dd78120db843c960ed41839f29cb) -->

```java
public class Song {
   private String name;
   private Artist author; // Will reference rich objects
   private Album album; // instead of primitive data types

   public String albumName() {
     return album.name() ;
}
```

# Detection 🔍

[X] Semi-Automatic

Sophisticated linters can automate detection.

They should ignore [setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md) and [getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md) and count real behavior methods.

# Tags 🏷️

- Anemic Models

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️

If we ask a domain expert to describe an entity he/she would hardly tell it is *'a bunch of attributes'*.

The power of object-oriented programming comes from modeling real-world concepts directly in code. 

When you create anemic models, you break the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between the domain and your code.

# AI Generation 🤖

AI code generators often produce anemic models because they follow common but flawed patterns found in many codebases. 

When you ask an AI to generate a basic model class, it will typically create a class with properties and getters/setters but no behavior. 

This perpetuates the anemic model anti-pattern.

You need to specifically instruct AI tools to generate rich domain models with behavior, not just data holders. 

Be explicit in your prompts about including relevant methods that encapsulate business logic within the model.

# AI Detection 🥃

AI tools can help identify anemic models with simple instructions like "find classes with many getters/setters but few business methods" or "identify service classes that should be refactored into domain models."

Determining which behavior truly belongs in a model requires domain knowledge and design judgment that current AI tools lack. 

AI can flag potential issues, but you still need to make the final decision about where behavior belongs.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Convert the anemic object into a rich one focusing on behavior instead of structure

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+name%3B%0D%0A+++String+authorName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Convert+the+anemic+object+into+a+rich+one+focusing+on+behavior+instead+of+structure%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+name%3B%0D%0A+++String+authorName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+name%3B%0D%0A+++String+authorName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Convert+the+anemic+object+into+a+rich+one+focusing+on+behavior+instead+of+structure%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+name%3B%0D%0A+++String+authorName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+name%3B%0D%0A+++String+authorName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Convert+the+anemic+object+into+a+rich+one+focusing+on+behavior+instead+of+structure%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+name%3B%0D%0A+++String+authorName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+name%3B%0D%0A+++String+authorName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Convert+the+anemic+object+into+a+rich+one+focusing+on+behavior+instead+of+structure%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+name%3B%0D%0A+++String+authorName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+name%3B%0D%0A+++String+authorName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Convert+the+anemic+object+into+a+rich+one+focusing+on+behavior+instead+of+structure%3A+%60%60%60java%0D%0Apublic+class+Song+%7B%0D%0A+++String+name%3B%0D%0A+++String+authorName%3B%0D%0A+++String+albumName%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Anemic models might seem convenient at first, but they lead to scattered logic, poor encapsulation, and maintenance headaches. 

Senior developers create rich domain models focusing on their behavior.

By moving logic from services into models, you create code that's more intuitive, maintainable, and aligned with object-oriented principles. 

Your objects should do things, not just store data. 

Avoid anemic models. Focus always on protocol instead of data.

[behavior](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) is essential, data is accidental.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 28 - Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)

[Code Smell 15 - Missed Preconditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2015%20-%20Missed%20Preconditions/readme.md)

[Code Smell 210 - Dynamic Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20210%20-%20Dynamic%20Properties/readme.md)

[Code Smell 70 - Anemic Model Generators](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2070%20-%20Anemic%20Model%20Generators/readme.md)

[Code Smell 109 - Automatic Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20109%20-%20Automatic%20Properties/readme.md)

[Code Smell 40 - DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

[Code Smell 131 - Zero Argument Constructor](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20131%20-%20Zero%20Argument%20Constructor/readme.md)

[Code Smell 68 - Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)

[Code Smell 55 - Object Orgy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2055%20-%20Object%20Orgy/readme.md)

[Code Smell 27 - Associative Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2027%20-%20Associative%20Arrays/readme.md)

[Code Smell 190 - Unnecessary Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20190%20-%20Unnecessary%20Properties/readme.md)

[Code Smell 113 - Data Naming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20113%20-%20Data%20Naming/readme.md)

[Code Smell 146 - Getter Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20146%20-%20Getter%20Comments/readme.md)

[Code Smell 47 - Diagrams](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2047%20-%20Diagrams/readme.md)

[Code Smell 139 - Business Code in the User Interface](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20139%20-%20Business%20Code%20in%20the%20User%20Interface/readme.md)

[Code Smell 143 - Data Clumps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20143%20-%20Data%20Clumps/readme.md)

[Code Smell 63 - Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2063%20-%20Feature%20Envy/readme.md)

[Code Smell 114 - Empty Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20114%20-%20Empty%20Class/readme.md)

[Code Smell 26 - Exceptions Polluting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2026%20-%20Exceptions%20Polluting/readme.md)

[Code Smell 72 - Return Codes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2072%20-%20Return%20Codes/readme.md)

# More Information 📕

[Wikipedia](https://en.wikipedia.org/wiki/Anemic_domain_model)

[Refactoring Guru](https://refactoring.guru/es/smells/data-class)

[Nude Models - Part I : Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)

[Nude Models - Part II : Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md)

[How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)

# Also Known as 🪪

- Data Class

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by Stacey Vandergriff on Unsplash

* * *

> Object-oriented programming increases the value of these metrics by managing this complexity. The most effective tool available for dealing with complexity is abstraction. Many types of abstraction can be used, but encapsulation is the main form of abstraction by which complexity is managed in object-oriented programming.

_Rebecca Wirfs-Brock_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)