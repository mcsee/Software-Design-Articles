# Code Smell 06 - Too Clever Programmer

![Code Smell 06 - Too Clever Programmer](Code%20Smell%2006%20-%20Too%20Clever%20Programmer.jpg)

*Code is hard to read when you use tricky names with no semantics or rely on accidental language complexity.*

> TL;DR: Don't try to look too smart. Clean code emphasizes readability and simplicity.

# Problems 😔

- Readability

- Maintainability

- Code Quality

- [Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# Solutions 😃

- Refactor the code

- Use [good names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20Exactly%20Is%20a%20Name%20-%20Part%20I%20The%20Quest/readme.md)

- Refactor tricky code

- Prefer clarity first

- Avoid hidden tricks

- Optimize only later with strong real evidence

# Refactorings ⚙️

[Refactoring 005 - Replace Comment with Function Name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md)

# Examples

- Optimized loops

# Context 💬

You might feel the urge to show off your skills with complex tricks or cryptic names.

This makes your code harder to read, debug, and extend.

You must remember that you write code for humans, not machines.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/df27505a28b5f65faaa273b0bfe1f322) -->

```javascript
function primeFactors(n) {
  var f = [],  i = 0, d = 2;  
  
  for (i = 0; n >= 2; ) {
     if(n % d == 0) {
       f[i++]=(d); 
       n /= d;
    }
    else {
      d++;
    }     
  }
  return f;
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/4749cfe51de1c02848df1aa802fa5705) -->

```javascript
function primeFactors(numberToFactor) {
  var factors = [], 
      divisor = 2,
      remainder = numberToFactor;
  
  while(remainder>=2) {
    if(remainder % divisor === 0) {
       factors.push(divisor); 
       remainder = remainder / divisor;
    }
    else {
      divisor++;
    }     
  }
  return factors;
}
```

# Detection 🔍

[X] Semi-Automatic

Automatic detection is possible in some languages.

Look for warnings about complexity, bad names, post-increment variables, and similar patterns.

# Exceptions 🛑

- Optimized code for low-level operations.

# Tags 🏷️

- Complexity

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

When you keep a clear [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between
your program and the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

Other developers and your future self can understand it quickly.

Clever tricks break this mapping and force future readers to guess instead of reading.

# AI Generation 🤖

AI models sometimes generate clever one-liners or compressed solutions.

They might look smart but lack readability and semantics.

# AI Detection 🧲

AI assistants can rewrite clever code into readable code if you instruct them to prefer clarity to optimization.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: correct=Remove cleverness from code

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+primeFactors%28n%29+%7B%0D%0A++var+f+%3D+%5B%5D%2C++i+%3D+0%2C+d+%3D+2%3B++%0D%0A++%0D%0A++for+%28i+%3D+0%3B+n+%3E%3D+2%3B+%29+%7B%0D%0A+++++if%28n+%25+d+%3D%3D+0%29+%7B%0D%0A+++++++f%5Bi%2B%2B%5D%3D%28d%29%3B+%0D%0A+++++++n+%2F%3D+d%3B%0D%0A++++%7D%0D%0A++++else+%7B%0D%0A++++++d%2B%2B%3B%0D%0A++++%7D+++++%0D%0A++%7D%0D%0A++return+f%3B%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=correct%3DRemove+cleverness+from+code%3A+%60%60%60javascript%0D%0Afunction+primeFactors%28n%29+%7B%0D%0A++var+f+%3D+%5B%5D%2C++i+%3D+0%2C+d+%3D+2%3B++%0D%0A++%0D%0A++for+%28i+%3D+0%3B+n+%3E%3D+2%3B+%29+%7B%0D%0A+++++if%28n+%25+d+%3D%3D+0%29+%7B%0D%0A+++++++f%5Bi%2B%2B%5D%3D%28d%29%3B+%0D%0A+++++++n+%2F%3D+d%3B%0D%0A++++%7D%0D%0A++++else+%7B%0D%0A++++++d%2B%2B%3B%0D%0A++++%7D+++++%0D%0A++%7D%0D%0A++return+f%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+primeFactors%28n%29+%7B%0D%0A++var+f+%3D+%5B%5D%2C++i+%3D+0%2C+d+%3D+2%3B++%0D%0A++%0D%0A++for+%28i+%3D+0%3B+n+%3E%3D+2%3B+%29+%7B%0D%0A+++++if%28n+%25+d+%3D%3D+0%29+%7B%0D%0A+++++++f%5Bi%2B%2B%5D%3D%28d%29%3B+%0D%0A+++++++n+%2F%3D+d%3B%0D%0A++++%7D%0D%0A++++else+%7B%0D%0A++++++d%2B%2B%3B%0D%0A++++%7D+++++%0D%0A++%7D%0D%0A++return+f%3B%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=correct%3DRemove+cleverness+from+code%3A+%60%60%60javascript%0D%0Afunction+primeFactors%28n%29+%7B%0D%0A++var+f+%3D+%5B%5D%2C++i+%3D+0%2C+d+%3D+2%3B++%0D%0A++%0D%0A++for+%28i+%3D+0%3B+n+%3E%3D+2%3B+%29+%7B%0D%0A+++++if%28n+%25+d+%3D%3D+0%29+%7B%0D%0A+++++++f%5Bi%2B%2B%5D%3D%28d%29%3B+%0D%0A+++++++n+%2F%3D+d%3B%0D%0A++++%7D%0D%0A++++else+%7B%0D%0A++++++d%2B%2B%3B%0D%0A++++%7D+++++%0D%0A++%7D%0D%0A++return+f%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+primeFactors%28n%29+%7B%0D%0A++var+f+%3D+%5B%5D%2C++i+%3D+0%2C+d+%3D+2%3B++%0D%0A++%0D%0A++for+%28i+%3D+0%3B+n+%3E%3D+2%3B+%29+%7B%0D%0A+++++if%28n+%25+d+%3D%3D+0%29+%7B%0D%0A+++++++f%5Bi%2B%2B%5D%3D%28d%29%3B+%0D%0A+++++++n+%2F%3D+d%3B%0D%0A++++%7D%0D%0A++++else+%7B%0D%0A++++++d%2B%2B%3B%0D%0A++++%7D+++++%0D%0A++%7D%0D%0A++return+f%3B%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=correct%3DRemove+cleverness+from+code%3A+%60%60%60javascript%0D%0Afunction+primeFactors%28n%29+%7B%0D%0A++var+f+%3D+%5B%5D%2C++i+%3D+0%2C+d+%3D+2%3B++%0D%0A++%0D%0A++for+%28i+%3D+0%3B+n+%3E%3D+2%3B+%29+%7B%0D%0A+++++if%28n+%25+d+%3D%3D+0%29+%7B%0D%0A+++++++f%5Bi%2B%2B%5D%3D%28d%29%3B+%0D%0A+++++++n+%2F%3D+d%3B%0D%0A++++%7D%0D%0A++++else+%7B%0D%0A++++++d%2B%2B%3B%0D%0A++++%7D+++++%0D%0A++%7D%0D%0A++return+f%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+primeFactors%28n%29+%7B%0D%0A++var+f+%3D+%5B%5D%2C++i+%3D+0%2C+d+%3D+2%3B++%0D%0A++%0D%0A++for+%28i+%3D+0%3B+n+%3E%3D+2%3B+%29+%7B%0D%0A+++++if%28n+%25+d+%3D%3D+0%29+%7B%0D%0A+++++++f%5Bi%2B%2B%5D%3D%28d%29%3B+%0D%0A+++++++n+%2F%3D+d%3B%0D%0A++++%7D%0D%0A++++else+%7B%0D%0A++++++d%2B%2B%3B%0D%0A++++%7D+++++%0D%0A++%7D%0D%0A++return+f%3B%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=correct%3DRemove+cleverness+from+code%3A+%60%60%60javascript%0D%0Afunction+primeFactors%28n%29+%7B%0D%0A++var+f+%3D+%5B%5D%2C++i+%3D+0%2C+d+%3D+2%3B++%0D%0A++%0D%0A++for+%28i+%3D+0%3B+n+%3E%3D+2%3B+%29+%7B%0D%0A+++++if%28n+%25+d+%3D%3D+0%29+%7B%0D%0A+++++++f%5Bi%2B%2B%5D%3D%28d%29%3B+%0D%0A+++++++n+%2F%3D+d%3B%0D%0A++++%7D%0D%0A++++else+%7B%0D%0A++++++d%2B%2B%3B%0D%0A++++%7D+++++%0D%0A++%7D%0D%0A++return+f%3B%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+primeFactors%28n%29+%7B%0D%0A++var+f+%3D+%5B%5D%2C++i+%3D+0%2C+d+%3D+2%3B++%0D%0A++%0D%0A++for+%28i+%3D+0%3B+n+%3E%3D+2%3B+%29+%7B%0D%0A+++++if%28n+%25+d+%3D%3D+0%29+%7B%0D%0A+++++++f%5Bi%2B%2B%5D%3D%28d%29%3B+%0D%0A+++++++n+%2F%3D+d%3B%0D%0A++++%7D%0D%0A++++else+%7B%0D%0A++++++d%2B%2B%3B%0D%0A++++%7D+++++%0D%0A++%7D%0D%0A++return+f%3B%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=correct%3DRemove+cleverness+from+code%3A+%60%60%60javascript%0D%0Afunction+primeFactors%28n%29+%7B%0D%0A++var+f+%3D+%5B%5D%2C++i+%3D+0%2C+d+%3D+2%3B++%0D%0A++%0D%0A++for+%28i+%3D+0%3B+n+%3E%3D+2%3B+%29+%7B%0D%0A+++++if%28n+%25+d+%3D%3D+0%29+%7B%0D%0A+++++++f%5Bi%2B%2B%5D%3D%28d%29%3B+%0D%0A+++++++n+%2F%3D+d%3B%0D%0A++++%7D%0D%0A++++else+%7B%0D%0A++++++d%2B%2B%3B%0D%0A++++%7D+++++%0D%0A++%7D%0D%0A++return+f%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Clever developers write cryptic code to brag.

Smart developers write clean code.

Clear beats clever.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

[Code Smell 44 - Magic Corrections](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2044%20-%20Magic%20Corrections/readme.md)

[Code Smell 41 - Regular Expression Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2041%20-%20Regular%20Expression%20Abusers/readme.md)

[Code Smell 78 - Callback Hell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2078%20-%20Callback%20Hell/readme.md)

[Code Smell 51 - Double Negatives](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2051%20-%20Double%20Negatives/readme.md)

[Code Smell 33 - Abbreviations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md)

[Code Smell 48 - Code Without Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

[Code Smell 196 - Javascript Array Constructors](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20196%20-%20Javascript%20Array%20Constructors/readme.md)

[Code Smell 25 - Pattern Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2025%20-%20Pattern%20Abusers/readme.md)

[Code Smell 93 - Send me Anything](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2093%20-%20Send%20me%20Anything/readme.md)

[Code Smell 145 - Short Circuit Hack](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20145%20-%20Short%20Circuit%20Hack/readme.md)

[Code Smell 212 - Elvis Operator](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20212%20-%20Elvis%20Operator/readme.md)

[Code Smell 180 - BitWise Optimizations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20180%20-%20BitWise%20Optimizations/readme.md)

[Code Smell 129 - Structural Optimizations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20129%20-%20Structural%20Optimizations/readme.md)

[Code Smell 32 - Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2032%20-%20Singletons/readme.md)

[Code Smell 21 - Anonymous Functions Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2021%20-%20Anonymous%20Functions%20Abusers/readme.md)

[Code Smell 24 - Boolean Coercions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2024%20-%20Boolean%20Coercions/readme.md)

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md)

# More Information 📕

[Are boolean flags a code smell?](https://ardalis.com/are-boolean-flags-on-methods-a-code-smell/)

# Also Known as

- Obfuscator

# Credits 🙏

Photo by [NeONBRAND](https://unsplash.com/@neonbrand) on [Unsplash](https://unsplash.com/s/photos/smart-brain)

* * *

> Programming can be fun, so can cryptography; however they should not be combined.

_Kreitzberg & Shneiderman_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)