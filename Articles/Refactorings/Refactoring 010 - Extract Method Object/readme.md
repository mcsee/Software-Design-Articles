# Refactoring 010 - Extract Method Object

![Refactoring 010 - Extract Method Object](Refactoring%20010%20-%20Extract%20Method%20Object.jpg)

*You have a big algorithmic method. Let's break it.*

> TL;DR: Long methods are bad. Move them and break them.

# Problems Addressed 😔

- Lack of Testability

- Accidental Complexity

- [Testing Private Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20112%20-%20Testing%20Private%20Methods/readme.md)

# Related Code Smells 💨

[Code Smell 10 - Too Many Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2010%20-%20Too%20Many%20Arguments/readme.md)

[Code Smell 21 - Anonymous Functions Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2021%20-%20Anonymous%20Functions%20Abusers/readme.md)

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)
 
[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 112 - Testing Private Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20112%20-%20Testing%20Private%20Methods/readme.md)

[Code Smell 206 - Long Ternaries](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20206%20-%20Long%20Ternaries/readme.md)

# Context 💬

Sometimes, a method is so complex that Extract Method isn't enough.

When you break a long algorithm, you end up with too many local variables.

You pass them as parameters between every new sub-method.

This "parameter pollution" signals the algorithm wants its own identity.

When you extract the method into a Method Object, you create a new class.

Local variables become private attributes of that class.

This creates a sandbox for decomposing the algorithm into tiny, cohesive steps.

The original host class stays clean and uncluttered.

You transform a rigid procedure into a testable, reusable component.

It can eventually evolve into a full [Strategy pattern](https://en.wikipedia.org/wiki/Strategy_pattern).

# Steps 👣 

1. Create an object to represent an invocation of the method.

2. Move the big method to the new object.

3. Convert the temporary variables of the method into private attributes.

4. Break the big method in the new object by using
[Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

5. Remove parameters from method invocation. Convert them to private attributes.

# Sample Code 💻

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/c8984513652806d25e26f5c184849af0) -->

```java
class BlockchainAccount {
  // ...
  public double balance() {
    String address;    
    // Very long untestable method
  }
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/77d24738ede67a5a99d28e796ce1fade) -->

```java
class BlockchainAccount {
  // ...
  public double balance() {
    return new BalanceCalculator(this).netValue();
  }
}

// 1. Create an object to represent an invocation of the method
// 2. Move the big method to the new object
// 3. Convert the temporary variables 
//   of the method into private attributes
// 4. Break the big method in the new object
//   by using The Extract Method
// 5. Remove parameters from method invocation 
// by also converting them to private attributes 

class BalanceCalculator {
  private String address;
  private BlockchainAccount account;
  
  public BalanceCalculator(BlockchainAccount account) {
    this.account = account;
  }
  
  public double netValue() {
    this.findStartingBlock();
    //...
    this computeTransactions();
  }
}
```

# Type 📝

[X] Semi-Automatic

Some IDEs have tools to extract a function into a method object.

# Safety 🛡️

This is a syntactic and structural refactoring.

You can make these changes safely with IDE tools.

# Why is the Code Better? ✨

You extract the logic into a new, testable component.

You can unit-test it or swap it for a different strategy.

# How Does it Improve the Bijection? 🗺️

A long method hides several real-world concepts inside one opaque procedure.

When you extract it into a dedicated object, each step gets its own name.

Code should map to the real world, as described in the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

Every concept in the domain needs a counterpart in the code.

That's the core idea of the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

The algorithm's partial state becomes attributes, and its steps become methods.

The object's name describes what it computes.

# Tags 🏷️

- Complexity

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

[Refactoring 037 - Testing Private Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20037%20-%20Testing%20Private%20Methods/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Create an object to represent an invocation of the method.2. Move the big method to the new object.3. Convert the temporary variables of the method into private attributes.4. Break the big method in the new object by using Extract Method.5. Remove parameters from method invocation by also converting them to private attributes.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+BlockchainAccount+%7B%0D%0A++%2F%2F+...%0D%0A++public+double+balance%28%29+%7B%0D%0A++++String+address%3B++++%0D%0A++++%2F%2F+Very+long+untestable+method%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Create+an+object+to+represent+an+invocation+of+the+method.2.+Move+the+big+method+to+the+new+object.3.+Convert+the+temporary+variables+of+the+method+into+private+attributes.4.+Break+the+big+method+in+the+new+object+by+using+Extract+Method.5.+Remove+parameters+from+method+invocation+by+also+converting+them+to+private+attributes.%3A+%60%60%60java%0D%0Aclass+BlockchainAccount+%7B%0D%0A++%2F%2F+...%0D%0A++public+double+balance%28%29+%7B%0D%0A++++String+address%3B++++%0D%0A++++%2F%2F+Very+long+untestable+method%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+BlockchainAccount+%7B%0D%0A++%2F%2F+...%0D%0A++public+double+balance%28%29+%7B%0D%0A++++String+address%3B++++%0D%0A++++%2F%2F+Very+long+untestable+method%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Create+an+object+to+represent+an+invocation+of+the+method.2.+Move+the+big+method+to+the+new+object.3.+Convert+the+temporary+variables+of+the+method+into+private+attributes.4.+Break+the+big+method+in+the+new+object+by+using+Extract+Method.5.+Remove+parameters+from+method+invocation+by+also+converting+them+to+private+attributes.%3A+%60%60%60java%0D%0Aclass+BlockchainAccount+%7B%0D%0A++%2F%2F+...%0D%0A++public+double+balance%28%29+%7B%0D%0A++++String+address%3B++++%0D%0A++++%2F%2F+Very+long+untestable+method%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+BlockchainAccount+%7B%0D%0A++%2F%2F+...%0D%0A++public+double+balance%28%29+%7B%0D%0A++++String+address%3B++++%0D%0A++++%2F%2F+Very+long+untestable+method%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Create+an+object+to+represent+an+invocation+of+the+method.2.+Move+the+big+method+to+the+new+object.3.+Convert+the+temporary+variables+of+the+method+into+private+attributes.4.+Break+the+big+method+in+the+new+object+by+using+Extract+Method.5.+Remove+parameters+from+method+invocation+by+also+converting+them+to+private+attributes.%3A+%60%60%60java%0D%0Aclass+BlockchainAccount+%7B%0D%0A++%2F%2F+...%0D%0A++public+double+balance%28%29+%7B%0D%0A++++String+address%3B++++%0D%0A++++%2F%2F+Very+long+untestable+method%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+BlockchainAccount+%7B%0D%0A++%2F%2F+...%0D%0A++public+double+balance%28%29+%7B%0D%0A++++String+address%3B++++%0D%0A++++%2F%2F+Very+long+untestable+method%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Create+an+object+to+represent+an+invocation+of+the+method.2.+Move+the+big+method+to+the+new+object.3.+Convert+the+temporary+variables+of+the+method+into+private+attributes.4.+Break+the+big+method+in+the+new+object+by+using+Extract+Method.5.+Remove+parameters+from+method+invocation+by+also+converting+them+to+private+attributes.%3A+%60%60%60java%0D%0Aclass+BlockchainAccount+%7B%0D%0A++%2F%2F+...%0D%0A++public+double+balance%28%29+%7B%0D%0A++++String+address%3B++++%0D%0A++++%2F%2F+Very+long+untestable+method%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+BlockchainAccount+%7B%0D%0A++%2F%2F+...%0D%0A++public+double+balance%28%29+%7B%0D%0A++++String+address%3B++++%0D%0A++++%2F%2F+Very+long+untestable+method%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Create+an+object+to+represent+an+invocation+of+the+method.2.+Move+the+big+method+to+the+new+object.3.+Convert+the+temporary+variables+of+the+method+into+private+attributes.4.+Break+the+big+method+in+the+new+object+by+using+Extract+Method.5.+Remove+parameters+from+method+invocation+by+also+converting+them+to+private+attributes.%3A+%60%60%60java%0D%0Aclass+BlockchainAccount+%7B%0D%0A++%2F%2F+...%0D%0A++public+double+balance%28%29+%7B%0D%0A++++String+address%3B++++%0D%0A++++%2F%2F+Very+long+untestable+method%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

The Method-Object suits cases where you use several extract methods.

These methods pass partial state among them as algorithm steps.

The method object stores these partial computations in its internal state.

A clear sign is when computations don't relate cohesively to the host method.

You can also apply this technique to [anonymous functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2021%20-%20Anonymous%20Functions%20Abusers/readme.md).

The result is an atomic, testable method object.

# See also 📚

[Wikipedia: Strategy Pattern](https://en.wikipedia.org/wiki/Strategy_pattern)

[Method Object Definition](https://learning.oreilly.com/library/view/smalltalk-best-practice/9780132852098/ch03.xhtml)

[Refactoring.guru](https://refactoring.guru/es/replace-method-with-method-object)

[C2 Wiki](https://wiki.c2.com/?MethodObject)

# Credits 🙏

Image by [Manuel de la Fuente](https://pixabay.com/users/mfuente-1590732/) from [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)