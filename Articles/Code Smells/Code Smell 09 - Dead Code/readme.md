# Code Smell 09 - Dead Code

![Code Smell 09 - Dead Code](Code%20Smell%2009%20-%20Dead%20Code.jpg)

*Code that is no longer used or needed.*

> TL;DR: Do not keep code "just in case I need it".

# Problems 😔 

- Maintainability
- Extra reading
- Broken intent
- Wasted effort

# Solutions 😃

1. Remove the code
2. [KISS](https://en.wikipedia.org/wiki/KISS_principle)
3. Shrink codebase
4. Test behavior only
5. Trust version control

# Refactorings ⚙️

[Refactoring 021 - Remove Dead Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20021%20-%20Remove%20Dead%20Code/readme.md)

# Examples 📚

- Gold plating code or [Yagni](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) code.

# Context 💬

Dead code appears when you change requirements, and you fear deleting things. 

You comment logic, keep old branches, or preserve unused methods just in case. 

When you do that, you lie about what the system can actually do. 

The code promises behavior that never happens.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/9e793df7489a96dc27d29d0f4e963bdf) -->

```javascript
class Robot {   
  walk() {
    // ...
    }
  serialize() {
    // ..
  }
  persistOnDatabase(database) {
    // ..
  }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/e1075cc971b5f7af28e37d29b492735d) -->

```javascript
class Robot {   
  walk() {
    // ...
    }  
}
```
	    
# Detection 🔍

Coverage tools can find dead code (uncovered) if you have a great suite of tests.

# Exceptions 🛑

Avoid metaprogramming. When used, it is very difficult to find references to the code.

[Laziness I - Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Tags 🏷️

- YAGNI

# Level 🔋

[x] Beginner

# Why the Bijection Is Important 🗺️

Your program must mirror the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) with a clear [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

Dead code breaks that mapping. The domain has no such behavior, yet the code claims it exists. 

When you do that, you destroy trust. 

Readers cannot know what matters and what doesn't.

# AI Generation 🤖

AI generators often create dead code. 

They add defensive branches, legacy helpers, and unused abstractions to look complete. 

When you do not review the result, the smell stays.

# AI Detection 🧲

AI tools can remove this smell with simple instructions. 

You can ask them to delete unreachable code and align logic with tests. 

They work well when you already have coverage.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: remove dead code

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=remove+dead+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=remove+dead+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=remove+dead+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=remove+dead+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=remove+dead+code%3A+%60%60%60javascript%0D%0Aclass+Robot+%7B+++%0D%0A++walk%28%29+%7B%0D%0A++++%2F%2F+...%0D%0A++++%7D%0D%0A++serialize%28%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A++persistOnDatabase%28database%29+%7B%0D%0A++++%2F%2F+..%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Remove dead code for simplicity.

If you are uncertain of your code, you can temporarily disable it using [Feature Toggle](https://en.wikipedia.org/wiki/Feature_toggle).

Removing code is always more rewarding than adding.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 54 - Anchor Boats](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2054%20-%20Anchor%20Boats/readme.md)

# More Information 📕

[Laziness I - Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Credits 🙏

Photo by [Ray Shrewsberry](https://pixabay.com/users/ray_shrewsberry-7673058/) on [Pixabay](https://pixabay.com/)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)