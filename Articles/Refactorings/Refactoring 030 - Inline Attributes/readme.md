# Refactoring 030 - Inline Attributes

![Refactoring 030 - Inline Attributes](Refactoring%20030%20-%20Inline%20Attributes.jpg)

*Avoid accidental redundancy*

> TL;DR: Don’t pass attributes your object already owns

# Problems Addressed 😔

- [Redundant Parameters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20188%20-%20Redundant%20Parameter%20Names/readme.md)
- Unclear responsibility
- Duplicated logic
- Parameter [pollution](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2010%20-%20Too%20Many%20Arguments/readme.md)
- Low cohesion
- Parameter redundancy
- [Code duplication](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)
- Incomplete [extracted method object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

# Related Code Smells 💨

[Code Smell 188 - Redundant Parameter Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20188%20-%20Redundant%20Parameter%20Names/readme.md)

[Code Smell 174 - Class Name in Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20174%20-%20Class%20Name%20in%20Attributes/readme.md)

[Code Smell 10 - Too Many Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2010%20-%20Too%20Many%20Arguments/readme.md)

[Code Smell 46 - Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)

[Code Smell 143 - Data Clumps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20143%20-%20Data%20Clumps/readme.md)

# Steps 👣

1. Identify methods that receive owned attributes
2. Remove those parameters from the method signature
3. Replace usage with direct access to the attribute
4. Rename the method if needed to match the new intention

# Sample Code 💻

## Before  🚨

<!-- [Gist Url](https://gist.github.com/mcsee/809c0549ca6d1fd122e47cceaf37432c) -->

```javascript
class Auto {
  constructor(motor) {
    this.motor = motor
  }

  startEngine(motor) {
    motor.ignite()
  }
}

// Usage
const motor = new Motor()
const auto = new Auto(motor)

auto.startEngine(motor)
// Redundant and maybe inconsistent
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/a12f2af0e07a80086bf702e7736328fd) -->

```javascript
class Auto {
  constructor(motor) {
    this.motor = motor
  }
    
  // 1. Identify methods that receive owned attributes    
  startEngine() {
    // 2. Remove those parameters from the method signature  
    // 4. Rename the method if needed to match the new intention
    this.motor.ignite()
  }
}

// Adjust usage to call without passing motor
const motor = new Motor()
const auto = new Auto(motor)

// 3. Replace usage with direct access to the attribute  
auto.startEngine() // No parameter needed
```

# Type 📝

[X] Automatic

# Safety 🛡️

This refactoring is straightforward and safe if you have good test coverage.

# Why is the Code Better? ✨

You remove [accidental complexity](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md).

You stop pretending your method needs information from the outside.

You reduce the cognitive load and improve encapsulation.

You clarify which attributes are [essential](maximilianocontieri.com/refactoring-016-build-with-the-essence).

You avoid passing the same data through different paths.

You reduce parameter redundancy and simplify method signatures.

You eliminate the possibility of passing inconsistent values since methods now directly access the object's state.

This makes the code more maintainable and reduces the cognitive load when reading method calls.

The methods become more cohesive by relying on their own object's data rather than external parameters.

# How Does it Improve the Bijection? 🗺️

This refactoring enhances the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) by aligning object behavior more closely with real-world entities.

You match the real-world concept: an object uses what it owns.

You improve the anthropomorphism and avoid unrealistic indirection.

You also reduce internal and external [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md).

# Limitations ⚠️

This works only if the method always uses the internal attribute.

If you need to inject different versions for testing or variations, consider using [dependency injection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20024%20-%20Replace%20Global%20Variables%20with%20Dependency%20Injection/readme.md) or a strategy pattern.

# Refactor with AI 🤖

> Suggested Prompt: 1. Identify methods that receive owned attributes 2. Remove those parameters from the method signature 3. Replace usage with direct access to the attribute 4. Rename the method if needed to match the new intention 

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Auto+%7B%0D%0A++constructor%28motor%29+%7B%0D%0A++++this.motor+%3D+motor%0D%0A++%7D%0D%0A%0D%0A++startEngine%28motor%29+%7B%0D%0A++++motor.ignite%28%29%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0Aconst+motor+%3D+new+Motor%28%29%0D%0Aconst+auto+%3D+new+Auto%28motor%29%0D%0A%0D%0Aauto.startEngine%28motor%29%0D%0A%2F%2F+Redundant+and+maybe+inconsistent%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+methods+that+receive+owned+attributes+2.+Remove+those+parameters+from+the+method+signature+3.+Replace+usage+with+direct+access+to+the+attribute+4.+Rename+the+method+if+needed+to+match+the+new+intention+%3A+%60%60%60javascript%0D%0Aclass+Auto+%7B%0D%0A++constructor%28motor%29+%7B%0D%0A++++this.motor+%3D+motor%0D%0A++%7D%0D%0A%0D%0A++startEngine%28motor%29+%7B%0D%0A++++motor.ignite%28%29%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0Aconst+motor+%3D+new+Motor%28%29%0D%0Aconst+auto+%3D+new+Auto%28motor%29%0D%0A%0D%0Aauto.startEngine%28motor%29%0D%0A%2F%2F+Redundant+and+maybe+inconsistent%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Auto+%7B%0D%0A++constructor%28motor%29+%7B%0D%0A++++this.motor+%3D+motor%0D%0A++%7D%0D%0A%0D%0A++startEngine%28motor%29+%7B%0D%0A++++motor.ignite%28%29%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0Aconst+motor+%3D+new+Motor%28%29%0D%0Aconst+auto+%3D+new+Auto%28motor%29%0D%0A%0D%0Aauto.startEngine%28motor%29%0D%0A%2F%2F+Redundant+and+maybe+inconsistent%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+methods+that+receive+owned+attributes+2.+Remove+those+parameters+from+the+method+signature+3.+Replace+usage+with+direct+access+to+the+attribute+4.+Rename+the+method+if+needed+to+match+the+new+intention+%3A+%60%60%60javascript%0D%0Aclass+Auto+%7B%0D%0A++constructor%28motor%29+%7B%0D%0A++++this.motor+%3D+motor%0D%0A++%7D%0D%0A%0D%0A++startEngine%28motor%29+%7B%0D%0A++++motor.ignite%28%29%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0Aconst+motor+%3D+new+Motor%28%29%0D%0Aconst+auto+%3D+new+Auto%28motor%29%0D%0A%0D%0Aauto.startEngine%28motor%29%0D%0A%2F%2F+Redundant+and+maybe+inconsistent%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Auto+%7B%0D%0A++constructor%28motor%29+%7B%0D%0A++++this.motor+%3D+motor%0D%0A++%7D%0D%0A%0D%0A++startEngine%28motor%29+%7B%0D%0A++++motor.ignite%28%29%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0Aconst+motor+%3D+new+Motor%28%29%0D%0Aconst+auto+%3D+new+Auto%28motor%29%0D%0A%0D%0Aauto.startEngine%28motor%29%0D%0A%2F%2F+Redundant+and+maybe+inconsistent%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+methods+that+receive+owned+attributes+2.+Remove+those+parameters+from+the+method+signature+3.+Replace+usage+with+direct+access+to+the+attribute+4.+Rename+the+method+if+needed+to+match+the+new+intention+%3A+%60%60%60javascript%0D%0Aclass+Auto+%7B%0D%0A++constructor%28motor%29+%7B%0D%0A++++this.motor+%3D+motor%0D%0A++%7D%0D%0A%0D%0A++startEngine%28motor%29+%7B%0D%0A++++motor.ignite%28%29%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0Aconst+motor+%3D+new+Motor%28%29%0D%0Aconst+auto+%3D+new+Auto%28motor%29%0D%0A%0D%0Aauto.startEngine%28motor%29%0D%0A%2F%2F+Redundant+and+maybe+inconsistent%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Auto+%7B%0D%0A++constructor%28motor%29+%7B%0D%0A++++this.motor+%3D+motor%0D%0A++%7D%0D%0A%0D%0A++startEngine%28motor%29+%7B%0D%0A++++motor.ignite%28%29%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0Aconst+motor+%3D+new+Motor%28%29%0D%0Aconst+auto+%3D+new+Auto%28motor%29%0D%0A%0D%0Aauto.startEngine%28motor%29%0D%0A%2F%2F+Redundant+and+maybe+inconsistent%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+methods+that+receive+owned+attributes+2.+Remove+those+parameters+from+the+method+signature+3.+Replace+usage+with+direct+access+to+the+attribute+4.+Rename+the+method+if+needed+to+match+the+new+intention+%3A+%60%60%60javascript%0D%0Aclass+Auto+%7B%0D%0A++constructor%28motor%29+%7B%0D%0A++++this.motor+%3D+motor%0D%0A++%7D%0D%0A%0D%0A++startEngine%28motor%29+%7B%0D%0A++++motor.ignite%28%29%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0Aconst+motor+%3D+new+Motor%28%29%0D%0Aconst+auto+%3D+new+Auto%28motor%29%0D%0A%0D%0Aauto.startEngine%28motor%29%0D%0A%2F%2F+Redundant+and+maybe+inconsistent%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Auto+%7B%0D%0A++constructor%28motor%29+%7B%0D%0A++++this.motor+%3D+motor%0D%0A++%7D%0D%0A%0D%0A++startEngine%28motor%29+%7B%0D%0A++++motor.ignite%28%29%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0Aconst+motor+%3D+new+Motor%28%29%0D%0Aconst+auto+%3D+new+Auto%28motor%29%0D%0A%0D%0Aauto.startEngine%28motor%29%0D%0A%2F%2F+Redundant+and+maybe+inconsistent%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+methods+that+receive+owned+attributes+2.+Remove+those+parameters+from+the+method+signature+3.+Replace+usage+with+direct+access+to+the+attribute+4.+Rename+the+method+if+needed+to+match+the+new+intention+%3A+%60%60%60javascript%0D%0Aclass+Auto+%7B%0D%0A++constructor%28motor%29+%7B%0D%0A++++this.motor+%3D+motor%0D%0A++%7D%0D%0A%0D%0A++startEngine%28motor%29+%7B%0D%0A++++motor.ignite%28%29%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Usage%0D%0Aconst+motor+%3D+new+Motor%28%29%0D%0Aconst+auto+%3D+new+Auto%28motor%29%0D%0A%0D%0Aauto.startEngine%28motor%29%0D%0A%2F%2F+Redundant+and+maybe+inconsistent%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Tags 🏷️

- Encapsulation

# Level 🔋

[X] Beginner

# Related Refactorings 🔄

[Refactoring 010 - Extract Method Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

[Refactoring 016 - Build With The Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)

[Refactoring 020 - Transform Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20020%20-%20Transform%20Static%20Functions/readme.md)

[Refactoring 024 - Replace Global Variables with Dependency Injection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20024%20-%20Replace%20Global%20Variables%20with%20Dependency%20Injection/readme.md)

- Remove Parameter

- Introduce Parameter Object

# Credits 🙏

Image by [F. Muhammad](https://pixabay.com/users/artisticoperations-4161274/) on [Pixabay](https://pixabay.com//)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)