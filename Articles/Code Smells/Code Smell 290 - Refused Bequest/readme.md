# Code Smell 290 - Refused Bequest

![Code Smell 290 - Refused Bequest](Code%20Smell%20290%20-%20Refused%20Bequest.jpg)

*Ignoring your inheritance leads to conflicts with your origins.*

> TL;DR: Subclasses should honor ALL their parent’s contract.

# Problems 😔

- Wrong abstraction
- [Subclassification for code reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)
- Misleading hierarchy
- Unused or overridden methods
- Unnecessary complexity
- Liskov Principle Violation
- Maintainability
- [YoYo Hierarchies](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2058%20-%20Yo-yo%20Problem/readme.md)
- [Concrete classes subclassified](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2043%20-%20Concrete%20Classes%20Subclassified/readme.md)

# Solutions 😃

1. Favor composition over inheritance
2. Don't subclass for [code reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)
3. Rethink hierarchy
4. Extract shared logic
5. Use interfaces
6. Remove dead code

# Refactorings ⚙️

[Refactoring 023 - Replace Inheritance with Delegation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20023%20-%20Replace%20Inheritance%20with%20Delegation/readme.md)

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

# Context 💬

When you create a subclass, it should use or extend the behavior of its parent.

If it ignores or overrides most of it, you probably force inheritance where it doesn’t belong to reuse code.

This makes the code misleading and hard to maintain.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/d9d22eba3e918b4a712086f3097f5069) -->

```javascript
class House {
  constructor(address) {
    this.address = address;
  }
  address() {
    return this.address;
  }
  openDoor() {
    console.log("Door opened at " + this.address);
  }
}

class Motorhome extends House {
  constructor() {
    super(null);
  }
  address() {
    return null;
    // This implementation is the same as the parent's
    // and is also a refused bequest
  }
  openDoor() {
    console.log("Motorhome door opened.");
  }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/678e9788a6e79ea53246b2260b3ee586) -->

```javascript
class House {
  constructor(address) {
    this.address = address;
  }
  address() {
    return this.address;
  }
  openDoor() {
    console.log("Door opened at " + this.address);
  }
}

class Motorhome {
  // does not inherit from House
  constructor(gps) {
    this.gps = gps;
  }
  openDoor() {
    console.log("Motorhome door opened at " + this.gps.getLocation());
  }
}
```

# Detection 🔍

[X] Manual

Look for subclasses that override or ignore most of their parent’s behavior.

You should reconsider the inheritance if a subclass sets parent properties to null or reimplements core methods.

# Tags 🏷️

- Inheritance

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

Your software should reflect real-world relationships.

When you force a subclass that doesn’t logically extend its parent in the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md), you mislead developers and introduce maintenance problems.

# AI Generation 🤖

AI can generate this smell when it defaults to inheritance for reuse instead of composition.

This happens when AI follows generic templates without understanding the context.

# AI Detection 🥃

AI can detect this smell by analyzing class structures and inheritance trees. However, it struggles with subtle cases where inheritance initially seems valid but breaks expectations.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Replace+inheritance+with+delegation%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Replace+inheritance+with+delegation%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Replace+inheritance+with+delegation%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Replace+inheritance+with+delegation%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=Replace+inheritance+with+delegation%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | 
| [DeepSeek](https://chat.deepseek.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [DeepSeek](https://chat.deepseek.com/?q=Replace+inheritance+with+delegation%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | 
| [Meta AI](https://www.meta.ai/chat?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Meta AI](https://www.meta.ai/?q=Replace+inheritance+with+delegation%3A+%60%60%60javascript%0D%0Aclass+House+%7B%0D%0A++constructor%28address%29+%7B%0D%0A++++this.address+%3D+address%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+this.address%3B%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Door+opened+at+%22+%2B+this.address%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Motorhome+extends+House+%7B%0D%0A++constructor%28%29+%7B%0D%0A++++super%28null%29%3B%0D%0A++%7D%0D%0A++address%28%29+%7B%0D%0A++++return+null%3B%0D%0A++++%2F%2F+This+implementation+is+the+same+as+the+parent%27s%0D%0A++++%2F%2F+and+is+also+a+refused+bequest%0D%0A++%7D%0D%0A++openDoor%28%29+%7B%0D%0A++++console.log%28%22Motorhome+door+opened.%22%29%3B%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | 

# Conclusion ✔️

When you design a class hierarchy, you need to make sure that subclasses logically inherit from their parent.

If a subclass refuses some of the behavior, you should rethink your design.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

[Code Smell 58 - Yo-yo Problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2058%20-%20Yo-yo%20Problem/readme.md)

[Code Smell 43 - Concrete Classes Subclassified](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2043%20-%20Concrete%20Classes%20Subclassified/readme.md)

# More Information 📕

[Refactoring Guru](https://refactoring.guru/es/smells/refused-bequest)

[Code Smells](https://code-smells.com/object-orientation-abusers/refused-bequest)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Hanson Lu](https://unsplash.com/@hansonluu) on [Unsplash](https://unsplash.com/photos/white-maul-type-c-motorhome--Avc2AiE1_Q)

* * *

> Favor object composition over class inheritance.

_Erich Gamma_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)

* * *