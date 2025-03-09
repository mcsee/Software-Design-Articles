# Code Smell 268 - Ternary Metaprogramming

![Code Smell 268 - Ternary Metaprogramming](Code%20Smell%20268%20-%20Ternary%20Metaprogramming.jpg)

*The Ternary Metaprogramming Trap*

> TL;DR: Avoid using ternary operators for dynamic method calls

# Problems

- Reduced code readability
- Increased debugging difficulty
- Potential runtime errors
- Decreased maintainability
- Possible refactoring problems
- Obscured program flow
- [Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md) pitfalls

# Solutions

1. Use explicit conditionals
2. Apply the strategy pattern
3. Create descriptive methods

# Context

Ternary metaprogramming uses conditional operators to select and invoke methods dynamically. 

It leads to code that's harder to understand, debug, and maintain. 

You risk introducing subtle bugs and making your code obscure to other developers.

Clean Code is the opposite of [Clever Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md).

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/c9358a49673ff171d4e6ee820cd38db5) -->

```javascript
const method = success ? 'start' : 'stop';
obj[method]();
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/3b0d3f749a608dcb64814b921a5c7e43) -->

```javascript
if (success) {
    obj.start();
} else {
    obj.stop();
}
```

# Detection

[X] Automatic 

Your linters can detect this smell by looking for ternary operators to select method names, especially when combined with bracket notation for method calls. 

You can also watch for variables that store method names based on conditions.

# Tags

- Metaprogramming

# Level

[X] Beginner

# AI Generation

AI code generators might introduce this smell since they prioritize code brevity over readability. 

They could generate ternary metaprogramming patterns when trying to produce concise code.

# AI Detection

AI detectors can identify this smell by recognizing patterns of ternary operators used for method selection. 

They may need specific instructions about readability and maintainability.

## Try Them!

*Remember AI Assistants make lots of mistakes*

> Suggested Prompt: Remove metaprogramming usage

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aconst+method+%3D+success+%3F+%27start%27+%3A+%27stop%27%3B%0D%0Aobj%5Bmethod%5D%28%29%3B%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Remove+metaprogramming+usage%3A+%60%60%60javascript%0D%0Aconst+method+%3D+success+%3F+%27start%27+%3A+%27stop%27%3B%0D%0Aobj%5Bmethod%5D%28%29%3B%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aconst+method+%3D+success+%3F+%27start%27+%3A+%27stop%27%3B%0D%0Aobj%5Bmethod%5D%28%29%3B%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Remove+metaprogramming+usage%3A+%60%60%60javascript%0D%0Aconst+method+%3D+success+%3F+%27start%27+%3A+%27stop%27%3B%0D%0Aobj%5Bmethod%5D%28%29%3B%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aconst+method+%3D+success+%3F+%27start%27+%3A+%27stop%27%3B%0D%0Aobj%5Bmethod%5D%28%29%3B%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Remove+metaprogramming+usage%3A+%60%60%60javascript%0D%0Aconst+method+%3D+success+%3F+%27start%27+%3A+%27stop%27%3B%0D%0Aobj%5Bmethod%5D%28%29%3B%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aconst+method+%3D+success+%3F+%27start%27+%3A+%27stop%27%3B%0D%0Aobj%5Bmethod%5D%28%29%3B%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Remove+metaprogramming+usage%3A+%60%60%60javascript%0D%0Aconst+method+%3D+success+%3F+%27start%27+%3A+%27stop%27%3B%0D%0Aobj%5Bmethod%5D%28%29%3B%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Qwen](https://chat.qwen.ai) | [Qwen](https://chat.qwen.ai) | 

# Conclusion

Ternary metaprogramming can seem clever and concise but creates more problems than it solves. 

By favoring explicit conditionals and well-named methods, you can write easier-to-understand, debug, and maintain code.

Remember that code is read far more often than written, so prioritize clarity over brevity.

# Relations

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 207 - Dynamic Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20207%20-%20Dynamic%20Methods/readme.md)

[Code Smell 21 - Anonymous Functions Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2021%20-%20Anonymous%20Functions%20Abusers/readme.md)

# More Info

[Laziness I - Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Burst](https://unsplash.com/@burst) on [Unsplash](https://unsplash.com/photos/woman-standing-in-brown-field-while-looking-sideways-aoN3HWLbhdI)  
  
* * *

> Programs must be written for people to read, and only incidentally for machines to execute.

_Harold Abelson_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)