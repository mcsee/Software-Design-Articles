# Code Smell 08 - Long Chains Of Collaborations

![Code Smell 08 - Long Chains Of Collaborations](Code%20Smell%2008%20-%20Long%20Chains%20Of%20Collaborations.jpg)

*Long chains of method calls create tight coupling and ripple effects. Any change in the chain breaks dependent code.*

> TL;DR: Send messages only to your direct acquaintances, not their friends.

# Problems 😔 

- Tight [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)
- Broken encapsulation 
- [Ripple effect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2016%20-%20Ripple%20Effect/readme.md)
- Fragile, brittle design
- Poor readability
- Difficult testing and maintenance

# Solutions 😃

- Create intermediate methods
- Apply the [Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter).
- Create higher level messages
- Simplify message passing
- Encapsulate collaborations
- Raise abstraction level

# Refactorings ⚙️

[Refactoring 034 - Reify Parameters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20034%20-%20Reify%20Parameters/readme.md)

[Refactoring 010 - Extract Method Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

# Context 💬

When you call a.b().c().d(), you create a dependency chain. 

Any change inside one link forces you to update all the code that relies on it. 

You expose too much internal structure and violate encapsulation. 

You also create [brittle tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md) that break after small refactors.

Instead of chaining, introduce clear responsibilities and let each class talk only to its direct acquaintances.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/de702945b0bb7cd80f696f8cbe19c91c) -->

```javascript
class Dog {
   constructor(feet) {
     this.feet = feet;    
  }
  getFeet() {    
    return this.feet;
  }  
}

class Foot {
  move() { }
}

feet = [new Foot(), new Foot(), new Foot(), new Foot()];
dog = new Dog(feet);

for (var foot of dog.getFeet()) {
  foot.move(); 
}

// Equivalent to dog.getFeet()[0].move(); dog.getFeet()[1].move() ...
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/b3b7d73ffb6554df2c06fce3b93a134f) -->

```javascript
class Dog {
   constructor(feet) {
     this.feet = feet;    
  }
  walk() {
    // This is encapsulated on how the dog walks
    for (var foot of this.feet) {
      foot.move(); 
    }
  }
}

class Foot {
  move() { }
}

feet = [new Foot(), new Foot(), new Foot(), new Foot()];
dog = new Dog(feet);
dog.walk();
```

# Detection 🔍

[x] Automatic

You can automatically detect this smell using static analysis tools that examine abstract syntax trees (ASTs) and count chained method calls.

# Exceptions 🛑

- **Builders**: `new CarBuilder().withEngine().withWheels().build()`
- **Fluent APIs**: Designed intentionally for chaining
- **DSLs**: Domain-specific languages where chaining improves readability

Even in these cases, keep chains consistent, predictable, and limited in depth.
  
# Tags 🏷️

- Complexity

# Level 🔋

[x] Beginner

# Why the Bijection Is Important 🗺️

In the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between your code and the MAPPER, each concept should match a single element. 

When you chain too many calls, you blur the map. 

Your objects start revealing paths instead of intentions. 

That breaks the direct link between the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) and the problem it solves.

# AI Generation 🤖

AI models often create this smell. 

They chain method calls to access deep data instead of creating higher-level abstractions. 

This happens because the model learns from large codebases that favor shortcuts over clarity.

# AI Detection 🧲

You can ask an AI to rewrite a chain into a single message or to apply the Law of Demeter. 

Simple instructions like "encapsulate this chain" usually work.
 
# Conclusion 🏁

Avoid successive message calls. 

Try to hide the intermediate collaborations and create new protocols.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: correct=break this collaboration chain

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Dog+%7B%0D%0A+++constructor%28feet%29+%7B%0D%0A+++++this.feet+%3D+feet%3B++++%0D%0A++%7D%0D%0A++getFeet%28%29+%7B++++%0D%0A++++return+this.feet%3B%0D%0A++%7D++%0D%0A%7D%0D%0A%0D%0Aclass+Foot+%7B%0D%0A++move%28%29+%7B+%7D%0D%0A%7D%0D%0A%0D%0Afeet+%3D+%5Bnew+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%5D%3B%0D%0Adog+%3D+new+Dog%28feet%29%3B%0D%0A%0D%0Afor+%28var+foot+of+dog.getFeet%28%29%29+%7B%0D%0A++foot.move%28%29%3B+%0D%0A%7D%0D%0A%0D%0A%2F%2F+Equivalent+to+dog.getFeet%28%29%5B0%5D.move%28%29%3B+dog.getFeet%28%29%5B1%5D.move%28%29+...%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=correct%3Dbreak+this+collaboration+chain%3A+%60%60%60javascript%0D%0Aclass+Dog+%7B%0D%0A+++constructor%28feet%29+%7B%0D%0A+++++this.feet+%3D+feet%3B++++%0D%0A++%7D%0D%0A++getFeet%28%29+%7B++++%0D%0A++++return+this.feet%3B%0D%0A++%7D++%0D%0A%7D%0D%0A%0D%0Aclass+Foot+%7B%0D%0A++move%28%29+%7B+%7D%0D%0A%7D%0D%0A%0D%0Afeet+%3D+%5Bnew+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%5D%3B%0D%0Adog+%3D+new+Dog%28feet%29%3B%0D%0A%0D%0Afor+%28var+foot+of+dog.getFeet%28%29%29+%7B%0D%0A++foot.move%28%29%3B+%0D%0A%7D%0D%0A%0D%0A%2F%2F+Equivalent+to+dog.getFeet%28%29%5B0%5D.move%28%29%3B+dog.getFeet%28%29%5B1%5D.move%28%29+...%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Dog+%7B%0D%0A+++constructor%28feet%29+%7B%0D%0A+++++this.feet+%3D+feet%3B++++%0D%0A++%7D%0D%0A++getFeet%28%29+%7B++++%0D%0A++++return+this.feet%3B%0D%0A++%7D++%0D%0A%7D%0D%0A%0D%0Aclass+Foot+%7B%0D%0A++move%28%29+%7B+%7D%0D%0A%7D%0D%0A%0D%0Afeet+%3D+%5Bnew+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%5D%3B%0D%0Adog+%3D+new+Dog%28feet%29%3B%0D%0A%0D%0Afor+%28var+foot+of+dog.getFeet%28%29%29+%7B%0D%0A++foot.move%28%29%3B+%0D%0A%7D%0D%0A%0D%0A%2F%2F+Equivalent+to+dog.getFeet%28%29%5B0%5D.move%28%29%3B+dog.getFeet%28%29%5B1%5D.move%28%29+...%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=correct%3Dbreak+this+collaboration+chain%3A+%60%60%60javascript%0D%0Aclass+Dog+%7B%0D%0A+++constructor%28feet%29+%7B%0D%0A+++++this.feet+%3D+feet%3B++++%0D%0A++%7D%0D%0A++getFeet%28%29+%7B++++%0D%0A++++return+this.feet%3B%0D%0A++%7D++%0D%0A%7D%0D%0A%0D%0Aclass+Foot+%7B%0D%0A++move%28%29+%7B+%7D%0D%0A%7D%0D%0A%0D%0Afeet+%3D+%5Bnew+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%5D%3B%0D%0Adog+%3D+new+Dog%28feet%29%3B%0D%0A%0D%0Afor+%28var+foot+of+dog.getFeet%28%29%29+%7B%0D%0A++foot.move%28%29%3B+%0D%0A%7D%0D%0A%0D%0A%2F%2F+Equivalent+to+dog.getFeet%28%29%5B0%5D.move%28%29%3B+dog.getFeet%28%29%5B1%5D.move%28%29+...%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Dog+%7B%0D%0A+++constructor%28feet%29+%7B%0D%0A+++++this.feet+%3D+feet%3B++++%0D%0A++%7D%0D%0A++getFeet%28%29+%7B++++%0D%0A++++return+this.feet%3B%0D%0A++%7D++%0D%0A%7D%0D%0A%0D%0Aclass+Foot+%7B%0D%0A++move%28%29+%7B+%7D%0D%0A%7D%0D%0A%0D%0Afeet+%3D+%5Bnew+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%5D%3B%0D%0Adog+%3D+new+Dog%28feet%29%3B%0D%0A%0D%0Afor+%28var+foot+of+dog.getFeet%28%29%29+%7B%0D%0A++foot.move%28%29%3B+%0D%0A%7D%0D%0A%0D%0A%2F%2F+Equivalent+to+dog.getFeet%28%29%5B0%5D.move%28%29%3B+dog.getFeet%28%29%5B1%5D.move%28%29+...%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=correct%3Dbreak+this+collaboration+chain%3A+%60%60%60javascript%0D%0Aclass+Dog+%7B%0D%0A+++constructor%28feet%29+%7B%0D%0A+++++this.feet+%3D+feet%3B++++%0D%0A++%7D%0D%0A++getFeet%28%29+%7B++++%0D%0A++++return+this.feet%3B%0D%0A++%7D++%0D%0A%7D%0D%0A%0D%0Aclass+Foot+%7B%0D%0A++move%28%29+%7B+%7D%0D%0A%7D%0D%0A%0D%0Afeet+%3D+%5Bnew+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%5D%3B%0D%0Adog+%3D+new+Dog%28feet%29%3B%0D%0A%0D%0Afor+%28var+foot+of+dog.getFeet%28%29%29+%7B%0D%0A++foot.move%28%29%3B+%0D%0A%7D%0D%0A%0D%0A%2F%2F+Equivalent+to+dog.getFeet%28%29%5B0%5D.move%28%29%3B+dog.getFeet%28%29%5B1%5D.move%28%29+...%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Dog+%7B%0D%0A+++constructor%28feet%29+%7B%0D%0A+++++this.feet+%3D+feet%3B++++%0D%0A++%7D%0D%0A++getFeet%28%29+%7B++++%0D%0A++++return+this.feet%3B%0D%0A++%7D++%0D%0A%7D%0D%0A%0D%0Aclass+Foot+%7B%0D%0A++move%28%29+%7B+%7D%0D%0A%7D%0D%0A%0D%0Afeet+%3D+%5Bnew+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%5D%3B%0D%0Adog+%3D+new+Dog%28feet%29%3B%0D%0A%0D%0Afor+%28var+foot+of+dog.getFeet%28%29%29+%7B%0D%0A++foot.move%28%29%3B+%0D%0A%7D%0D%0A%0D%0A%2F%2F+Equivalent+to+dog.getFeet%28%29%5B0%5D.move%28%29%3B+dog.getFeet%28%29%5B1%5D.move%28%29+...%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=correct%3Dbreak+this+collaboration+chain%3A+%60%60%60javascript%0D%0Aclass+Dog+%7B%0D%0A+++constructor%28feet%29+%7B%0D%0A+++++this.feet+%3D+feet%3B++++%0D%0A++%7D%0D%0A++getFeet%28%29+%7B++++%0D%0A++++return+this.feet%3B%0D%0A++%7D++%0D%0A%7D%0D%0A%0D%0Aclass+Foot+%7B%0D%0A++move%28%29+%7B+%7D%0D%0A%7D%0D%0A%0D%0Afeet+%3D+%5Bnew+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%5D%3B%0D%0Adog+%3D+new+Dog%28feet%29%3B%0D%0A%0D%0Afor+%28var+foot+of+dog.getFeet%28%29%29+%7B%0D%0A++foot.move%28%29%3B+%0D%0A%7D%0D%0A%0D%0A%2F%2F+Equivalent+to+dog.getFeet%28%29%5B0%5D.move%28%29%3B+dog.getFeet%28%29%5B1%5D.move%28%29+...%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Dog+%7B%0D%0A+++constructor%28feet%29+%7B%0D%0A+++++this.feet+%3D+feet%3B++++%0D%0A++%7D%0D%0A++getFeet%28%29+%7B++++%0D%0A++++return+this.feet%3B%0D%0A++%7D++%0D%0A%7D%0D%0A%0D%0Aclass+Foot+%7B%0D%0A++move%28%29+%7B+%7D%0D%0A%7D%0D%0A%0D%0Afeet+%3D+%5Bnew+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%5D%3B%0D%0Adog+%3D+new+Dog%28feet%29%3B%0D%0A%0D%0Afor+%28var+foot+of+dog.getFeet%28%29%29+%7B%0D%0A++foot.move%28%29%3B+%0D%0A%7D%0D%0A%0D%0A%2F%2F+Equivalent+to+dog.getFeet%28%29%5B0%5D.move%28%29%3B+dog.getFeet%28%29%5B1%5D.move%28%29+...%0D%0A%60%60%60) | [You](https://you.com/search?q=correct%3Dbreak+this+collaboration+chain%3A+%60%60%60javascript%0D%0Aclass+Dog+%7B%0D%0A+++constructor%28feet%29+%7B%0D%0A+++++this.feet+%3D+feet%3B++++%0D%0A++%7D%0D%0A++getFeet%28%29+%7B++++%0D%0A++++return+this.feet%3B%0D%0A++%7D++%0D%0A%7D%0D%0A%0D%0Aclass+Foot+%7B%0D%0A++move%28%29+%7B+%7D%0D%0A%7D%0D%0A%0D%0Afeet+%3D+%5Bnew+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%2C+new+Foot%28%29%5D%3B%0D%0Adog+%3D+new+Dog%28feet%29%3B%0D%0A%0D%0Afor+%28var+foot+of+dog.getFeet%28%29%29+%7B%0D%0A++foot.move%28%29%3B+%0D%0A%7D%0D%0A%0D%0A%2F%2F+Equivalent+to+dog.getFeet%28%29%5B0%5D.move%28%29%3B+dog.getFeet%28%29%5B1%5D.move%28%29+...%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Relations 👩‍❤️‍💋‍👨

[Code Smell 67 - Middle Man](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2067%20-%20Middle%20Man/readme.md)

[Code Smell 16 - Ripple Effect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2016%20-%20Ripple%20Effect/readme.md)

[Code Smell 63 - Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2063%20-%20Feature%20Envy/readme.md)

[Code Smell 52 - Fragile Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md)

[Code Smell 271 - The Hollywood Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20271%20-%20The%20Hollywood%20Principle/readme.md)

# More Information 📕

[Refactoring Guru](https://refactoring.guru/es/smells/message-chains)

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Also Known as 🪪

- Message Chains
- Law of Demeter

# Credits 🙏

Photo by [Chewy](https://unsplash.com/@chewy) on [Unsplash](https://unsplash.com/s/photos/dog)

* * *

> Talk only to your friends, not to strangers.

_Karl Lieberherr_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)