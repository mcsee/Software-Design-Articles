# Code Smell 319 - Hardcoded Stateless Properties

![Code Smell 319 - Hardcoded Stateless Properties](Code%20Smell%20319%20-%20Hardcoded%20Stateless%20Properties.jpg)

*Don't turn collaborators into permanent roommates*

> TL;DR: You should avoid storing stateless utility classes as instance variables initialized with new.

# Problems 😔

- Hardcoded dependencies

- Testing difficulties

- High [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Hidden side effects

- Rigid design

- Misleading intent

- Premature Optimization

- Stack clutter 

# Solutions 😃

1. Use dependency injection

2. Pass as parameter

3. Use static methods

4. Inline the logic

5. Use local variables

6. Inline object creation

# Refactorings ⚙️

[Refactoring 024 - Replace Global Variables with Dependency Injection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20024%20-%20Replace%20Global%20Variables%20with%20Dependency%20Injection/readme.md)

[Refactoring 030 - Inline Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20030%20-%20Inline%20Attributes/readme.md)

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

# Context 💬

Hardcoding a stateless class in the constructor creates permanent coupling.

Even if the class is cheap to instantiate, you lose the ability to swap it.

Stateless objects shouldn't be part of the object's internal state.

You confuse readers by making a tool look essential to the object's identity.

It makes testing harder because you can't mock the hardcoded dependency.

# Sample Code 💻

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/102f1f7f5e9f77c870f5003462b630d9) -->

```typescript
class UserProcessor {
  private provider: MockDataProvider;

  constructor() {
    // You hardcode the dependency here.
    // This makes the class harder to test.
    this.provider = new MockDataProvider();
  }

  process(data: any) {
    return this.provider.format(data);
  }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/0965eabeba57076334be9f0fdd2ea4b7) -->

```typescript
interface DataProvider {
  format(data: any): any;
}

class UserProcessor {
  // You inject the dependency via constructor.
  // Now you can swap it or mock it easily.
  constructor(private readonly provider: DataProvider) {}

  process(data: any) {
    return this.provider.format(data);
  }
}
```

<!-- [Gist Url](https://gist.github.com/mcsee/6b90f13086c4bd981ae07cd416f793ca) -->

```typescript
// Simpler but coupled
 class UserProcessor {
    constructor() {
      // Empty
    }
  
    process(data: any) {
      return new MockDataProvider().format(data);
    }
  }
```

## Detection 🔍

Look for the `new` keyword inside constructors.

Watch for private properties instantiated directly in the constructor rather than passed as parameters.

Most linters flag this pattern automatically when you create instances and assign them to private fields.

## Tags 🏷️

- Premature Optimization

## Level 🔋

[X] Beginner

## Why the Bijection Is Important 🗺️

Software should mimic a [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) of the real world.

In reality, a worker might use a tool to complete a task.

The tool is not a permanent physical attachment to the worker.

When you refactor to use dependency injection, you respect the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) by treating collaborators as external entities, not internal state.

This keeps your simulation flexible and accurate.

## AI Generation 🤖

AI generators frequently create this smell.

They often suggest code that just works by instancing dependencies directly in the constructor to save time.

## AI Detection 🧲

AI can easily detect this smell without explicit instructions.

When you show AI a class with `new` keywords in the constructor, it recognizes the pattern as hardcoded coupling.

AI identifies that stateless utility classes should be injected rather than instantiated internally.

The detection is straightforward because the pattern is syntactically obvious and semantically harmful.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: remove the cached attribute

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+UserProcessor+%7B%0D%0A++private+provider%3A+MockDataProvider%3B%0D%0A%0D%0A++constructor%28%29+%7B%0D%0A++++%2F%2F+You+hardcode+the+dependency+here.%0D%0A++++%2F%2F+This+makes+the+class+harder+to+test.%0D%0A++++this.provider+%3D+new+MockDataProvider%28%29%3B%0D%0A++%7D%0D%0A%0D%0A++process%28data%3A+any%29+%7B%0D%0A++++return+this.provider.format%28data%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=remove+the+cached+attribute%3A+%60%60%60typescript%0D%0Aclass+UserProcessor+%7B%0D%0A++private+provider%3A+MockDataProvider%3B%0D%0A%0D%0A++constructor%28%29+%7B%0D%0A++++%2F%2F+You+hardcode+the+dependency+here.%0D%0A++++%2F%2F+This+makes+the+class+harder+to+test.%0D%0A++++this.provider+%3D+new+MockDataProvider%28%29%3B%0D%0A++%7D%0D%0A%0D%0A++process%28data%3A+any%29+%7B%0D%0A++++return+this.provider.format%28data%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+UserProcessor+%7B%0D%0A++private+provider%3A+MockDataProvider%3B%0D%0A%0D%0A++constructor%28%29+%7B%0D%0A++++%2F%2F+You+hardcode+the+dependency+here.%0D%0A++++%2F%2F+This+makes+the+class+harder+to+test.%0D%0A++++this.provider+%3D+new+MockDataProvider%28%29%3B%0D%0A++%7D%0D%0A%0D%0A++process%28data%3A+any%29+%7B%0D%0A++++return+this.provider.format%28data%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=remove+the+cached+attribute%3A+%60%60%60typescript%0D%0Aclass+UserProcessor+%7B%0D%0A++private+provider%3A+MockDataProvider%3B%0D%0A%0D%0A++constructor%28%29+%7B%0D%0A++++%2F%2F+You+hardcode+the+dependency+here.%0D%0A++++%2F%2F+This+makes+the+class+harder+to+test.%0D%0A++++this.provider+%3D+new+MockDataProvider%28%29%3B%0D%0A++%7D%0D%0A%0D%0A++process%28data%3A+any%29+%7B%0D%0A++++return+this.provider.format%28data%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+UserProcessor+%7B%0D%0A++private+provider%3A+MockDataProvider%3B%0D%0A%0D%0A++constructor%28%29+%7B%0D%0A++++%2F%2F+You+hardcode+the+dependency+here.%0D%0A++++%2F%2F+This+makes+the+class+harder+to+test.%0D%0A++++this.provider+%3D+new+MockDataProvider%28%29%3B%0D%0A++%7D%0D%0A%0D%0A++process%28data%3A+any%29+%7B%0D%0A++++return+this.provider.format%28data%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=remove+the+cached+attribute%3A+%60%60%60typescript%0D%0Aclass+UserProcessor+%7B%0D%0A++private+provider%3A+MockDataProvider%3B%0D%0A%0D%0A++constructor%28%29+%7B%0D%0A++++%2F%2F+You+hardcode+the+dependency+here.%0D%0A++++%2F%2F+This+makes+the+class+harder+to+test.%0D%0A++++this.provider+%3D+new+MockDataProvider%28%29%3B%0D%0A++%7D%0D%0A%0D%0A++process%28data%3A+any%29+%7B%0D%0A++++return+this.provider.format%28data%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+UserProcessor+%7B%0D%0A++private+provider%3A+MockDataProvider%3B%0D%0A%0D%0A++constructor%28%29+%7B%0D%0A++++%2F%2F+You+hardcode+the+dependency+here.%0D%0A++++%2F%2F+This+makes+the+class+harder+to+test.%0D%0A++++this.provider+%3D+new+MockDataProvider%28%29%3B%0D%0A++%7D%0D%0A%0D%0A++process%28data%3A+any%29+%7B%0D%0A++++return+this.provider.format%28data%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=remove+the+cached+attribute%3A+%60%60%60typescript%0D%0Aclass+UserProcessor+%7B%0D%0A++private+provider%3A+MockDataProvider%3B%0D%0A%0D%0A++constructor%28%29+%7B%0D%0A++++%2F%2F+You+hardcode+the+dependency+here.%0D%0A++++%2F%2F+This+makes+the+class+harder+to+test.%0D%0A++++this.provider+%3D+new+MockDataProvider%28%29%3B%0D%0A++%7D%0D%0A%0D%0A++process%28data%3A+any%29+%7B%0D%0A++++return+this.provider.format%28data%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60typescript%0D%0Aclass+UserProcessor+%7B%0D%0A++private+provider%3A+MockDataProvider%3B%0D%0A%0D%0A++constructor%28%29+%7B%0D%0A++++%2F%2F+You+hardcode+the+dependency+here.%0D%0A++++%2F%2F+This+makes+the+class+harder+to+test.%0D%0A++++this.provider+%3D+new+MockDataProvider%28%29%3B%0D%0A++%7D%0D%0A%0D%0A++process%28data%3A+any%29+%7B%0D%0A++++return+this.provider.format%28data%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=remove+the+cached+attribute%3A+%60%60%60typescript%0D%0Aclass+UserProcessor+%7B%0D%0A++private+provider%3A+MockDataProvider%3B%0D%0A%0D%0A++constructor%28%29+%7B%0D%0A++++%2F%2F+You+hardcode+the+dependency+here.%0D%0A++++%2F%2F+This+makes+the+class+harder+to+test.%0D%0A++++this.provider+%3D+new+MockDataProvider%28%29%3B%0D%0A++%7D%0D%0A%0D%0A++process%28data%3A+any%29+%7B%0D%0A++++return+this.provider.format%28data%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

## Conclusion 🏁

Storing stateless dependencies as instance variables makes your code rigid.

When you inject these dependencies instead, you improve testability and keep your objects focused on their true purpose.

## Relations 👩‍❤️‍💋‍👨

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# More Information 📕

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Possessed Photography](https://unsplash.com/es/@possessedphotography) on [Unsplash](https://unsplash.com/)

* * *

> Coupling is the enemy of change

_Rich Hickey_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)