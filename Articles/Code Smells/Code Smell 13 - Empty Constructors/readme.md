# Code Smell 13 - Empty Constructors

![Code Smell 13 - Empty Constructors](Code%20Smell%2013%20-%20Empty%20Constructors.jpg)

*Non-Parameterized constructors are a code smell of an **invalid** object that will dangerously mutate. Incomplete objects cause lots of issues.*

> TL;DR: Pass the essence to all your objects so they will not need to mutate.

# Problems 😔 

- Mutability

- Incomplete objects

- Concurrency inconsistencies between creation and essence setting.

- [Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)

# Solutions 😃

1. Pass the object's essence on creation

2. Create objects with their [immutable](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md]) essence.

# Refactorings ⚙️

[Refactoring 001 - Remove Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md)

[Refactoring 016 - Build With The Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)

# Examples 📚

- Some persistence frameworks in static typed languages require an empty constructor.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/d9d34fad693fd4f6309d68636a5010e5) -->

```javascript
class AirTicket {
   constructor() {     
  }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/2e8f884045798f699399bf1ba9c26ab2) -->

```javascript
class AirTicket {
   constructor(origin,
                destination, 
                arline,
                departureTime,
                passenger) {     
     
  // ...
  }
}
```

# Detection 🔍

Any linter can warn this (possible) situation.

# Exceptions 🛑

- Stateless objects. Always better solution than [static class methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md).

# Tags 🏷️

- Anemic Models

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️

In the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md), objects correspond to real-world entities. 

Real people aren't born nameless and formless, then gradually acquire attributes. 

You don't meet someone who *temporarily* has no age or email address. 

When you [model](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) a person, you should capture their essential attributes at birth, just like reality. 

Breaking this [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) by creating hollow objects forces you to represent impossible states. 

Empty constructors create phantom and invalid objects that don't exist in your domain model, violating the mapping between your code and reality.

# AI Generation 🤖

AI code generators frequently produce this smell because they often follow common ORM patterns.

When you prompt AI to "create a Person class," it typically generates empty constructors with getters and setters.

AI tools trained on legacy codebases inherit these patterns and propagate them unless you explicitly request immutable objects with required constructor parameters.

# AI Detection 🧲

AI tools can detect and fix this smell when you provide clear instructions. 

You need to specify that objects should be immutable with required constructor parameters. 

Without explicit guidance, AI tools may not recognize empty constructors as problematic since they appear frequently in training data.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Create an immutable class with required information. Include constructor validation and no setters. Make all fields final and use constructor parameters only

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+AirTicket+%7B%0D%0A+++constructor%28%29+%7B+++++%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Create+an+immutable+class+with+required+information.+Include+constructor+validation+and+no+setters.+Make+all+fields+final+and+use+constructor+parameters+only%3A+%60%60%60javascript%0D%0Aclass+AirTicket+%7B%0D%0A+++constructor%28%29+%7B+++++%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+AirTicket+%7B%0D%0A+++constructor%28%29+%7B+++++%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Create+an+immutable+class+with+required+information.+Include+constructor+validation+and+no+setters.+Make+all+fields+final+and+use+constructor+parameters+only%3A+%60%60%60javascript%0D%0Aclass+AirTicket+%7B%0D%0A+++constructor%28%29+%7B+++++%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+AirTicket+%7B%0D%0A+++constructor%28%29+%7B+++++%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Create+an+immutable+class+with+required+information.+Include+constructor+validation+and+no+setters.+Make+all+fields+final+and+use+constructor+parameters+only%3A+%60%60%60javascript%0D%0Aclass+AirTicket+%7B%0D%0A+++constructor%28%29+%7B+++++%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+AirTicket+%7B%0D%0A+++constructor%28%29+%7B+++++%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Create+an+immutable+class+with+required+information.+Include+constructor+validation+and+no+setters.+Make+all+fields+final+and+use+constructor+parameters+only%3A+%60%60%60javascript%0D%0Aclass+AirTicket+%7B%0D%0A+++constructor%28%29+%7B+++++%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+AirTicket+%7B%0D%0A+++constructor%28%29+%7B+++++%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Create+an+immutable+class+with+required+information.+Include+constructor+validation+and+no+setters.+Make+all+fields+final+and+use+constructor+parameters+only%3A+%60%60%60javascript%0D%0Aclass+AirTicket+%7B%0D%0A+++constructor%28%29+%7B+++++%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Always create complete objects. Make their essence immutable to endure through time.

Every object needs its essence to be a valid one since inception.

We should read Plato's ideas about immutability and create entities in a complete and immutable way.

These immutable objects favor bijection and survive the passing of time.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 28 - Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)

[Code Smell 40 - DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

[Code Smell 10 - Too Many Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2010%20-%20Too%20Many%20Arguments/readme.md)

[Code Smell 116 - Variables Declared With 'var'](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20116%20-%20Variables%20Declared%20With%20'var'/readme.md)

# More Information 📕

[Code Exposed](https://codexposed.hashnode.dev/constructors-demystified)

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Credits 🙏

Photo by Brett Jordan in Pexels

* * *

> In a purely functional program, the value of a [constant] never changes, and yet, it changes all the time! A paradox!

_Joel Spolski_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * * 

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)