# Code Smell 284 - Encrypted Functions

![Code Smell 284 - Encrypted Functions](Code%20Smell%20284%20-%20Encrypted%20Functions.jpg)

*Cryptic Code is Bad Code*

> TL;DR: Avoid obfuscated functions in your code.

This article is based on a [real social hacking disguised as a job interview](https://www.linkedin.com/posts/franco-aguilera-2583685a_the-code-challenge-scam-they-tried-to-hack-activity-7270114822950703107-K3DW/)

# Problems 😔 

- Hidden vulnerabilities

- Readability

- Testability

- Trust issues

- Bad Naming

# Solutions 😃

1. Use clear names

2. Avoid obfuscation

3. Explain intent clearly

4. Review shared code

5. Don't trust code from unreliable sources

6. Avoid modification since it is a sign of [Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# Context 💬

When you write functions with cryptic or obfuscated names, you make your code unreadable and untrustworthy. 

This pattern often hides malicious intent or makes debugging and collaboration unnecessarily hard. 

Cryptic code also frustrates team members and future maintainers, increasing technical debt and security risks.

Remember, hacking has a strong social component compared to what you see in Hollywood movies.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/fc14884bd6d4a0b5d76e6b96eb30b10a) -->

```javascript
function _0xaexad(_0x12bfc3, _0x43a1e9) {
  return _0x12bfc3 ^ _0x43a1e9;
}

const result = _0xaexad(0x1a, 0x2f);
console.log(result);
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/d3c4ca8ecbf71ab3a7ef157d87a5ac8d) -->

```javascript
function xorOperation(orValue1, orValue2) {
  return orValue1 ^ orValue2;
}

const result = xorOperation(26, 47);
console.log(result);
```

# Detection 🔍

[X] Automatic 

You can detect this smell by scanning your codebase for meaningless or obfuscated function names. 

Use linters or code analysis tools to flag short, cryptic, or randomly named functions. 

Manual code reviews can also help identify suspicious patterns.

# Tags 🏷️

- Security

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 

Readable and meaningful names create a [one-to-one](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) correspondence between the real-world concept and your code. 

Breaking this connection makes your program confusing and error-prone. 

# AI Generation 🤖

AI generators sometimes produce cryptic function names, especially when they optimize for brevity or imitate obfuscated patterns. 

# AI Detection 🥃

AI tools can detect and fix this smell when you ask them to refactor unclear function names or enforce coding standards. 

They can analyze your entire codebase and suggest meaningful replacements for obfuscated names.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: remove encryption

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+_0xaexad%28_0x12bfc3%2C+_0x43a1e9%29+%7B%0D%0A++return+_0x12bfc3+%5E+_0x43a1e9%3B%0D%0A%7D%0D%0A%0D%0Aconst+result+%3D+_0xaexad%280x1a%2C+0x2f%29%3B%0D%0Aconsole.log%28result%29%3B%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=remove+encryption%3A+%60%60%60javascript%0D%0Afunction+_0xaexad%28_0x12bfc3%2C+_0x43a1e9%29+%7B%0D%0A++return+_0x12bfc3+%5E+_0x43a1e9%3B%0D%0A%7D%0D%0A%0D%0Aconst+result+%3D+_0xaexad%280x1a%2C+0x2f%29%3B%0D%0Aconsole.log%28result%29%3B%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+_0xaexad%28_0x12bfc3%2C+_0x43a1e9%29+%7B%0D%0A++return+_0x12bfc3+%5E+_0x43a1e9%3B%0D%0A%7D%0D%0A%0D%0Aconst+result+%3D+_0xaexad%280x1a%2C+0x2f%29%3B%0D%0Aconsole.log%28result%29%3B%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=remove+encryption%3A+%60%60%60javascript%0D%0Afunction+_0xaexad%28_0x12bfc3%2C+_0x43a1e9%29+%7B%0D%0A++return+_0x12bfc3+%5E+_0x43a1e9%3B%0D%0A%7D%0D%0A%0D%0Aconst+result+%3D+_0xaexad%280x1a%2C+0x2f%29%3B%0D%0Aconsole.log%28result%29%3B%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+_0xaexad%28_0x12bfc3%2C+_0x43a1e9%29+%7B%0D%0A++return+_0x12bfc3+%5E+_0x43a1e9%3B%0D%0A%7D%0D%0A%0D%0Aconst+result+%3D+_0xaexad%280x1a%2C+0x2f%29%3B%0D%0Aconsole.log%28result%29%3B%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=remove+encryption%3A+%60%60%60javascript%0D%0Afunction+_0xaexad%28_0x12bfc3%2C+_0x43a1e9%29+%7B%0D%0A++return+_0x12bfc3+%5E+_0x43a1e9%3B%0D%0A%7D%0D%0A%0D%0Aconst+result+%3D+_0xaexad%280x1a%2C+0x2f%29%3B%0D%0Aconsole.log%28result%29%3B%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+_0xaexad%28_0x12bfc3%2C+_0x43a1e9%29+%7B%0D%0A++return+_0x12bfc3+%5E+_0x43a1e9%3B%0D%0A%7D%0D%0A%0D%0Aconst+result+%3D+_0xaexad%280x1a%2C+0x2f%29%3B%0D%0Aconsole.log%28result%29%3B%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=remove+encryption%3A+%60%60%60javascript%0D%0Afunction+_0xaexad%28_0x12bfc3%2C+_0x43a1e9%29+%7B%0D%0A++return+_0x12bfc3+%5E+_0x43a1e9%3B%0D%0A%7D%0D%0A%0D%0Aconst+result+%3D+_0xaexad%280x1a%2C+0x2f%29%3B%0D%0Aconsole.log%28result%29%3B%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+_0xaexad%28_0x12bfc3%2C+_0x43a1e9%29+%7B%0D%0A++return+_0x12bfc3+%5E+_0x43a1e9%3B%0D%0A%7D%0D%0A%0D%0Aconst+result+%3D+_0xaexad%280x1a%2C+0x2f%29%3B%0D%0Aconsole.log%28result%29%3B%0D%0A%60%60%60) | [You](https://you.com/search?q=remove+encryption%3A+%60%60%60javascript%0D%0Afunction+_0xaexad%28_0x12bfc3%2C+_0x43a1e9%29+%7B%0D%0A++return+_0x12bfc3+%5E+_0x43a1e9%3B%0D%0A%7D%0D%0A%0D%0Aconst+result+%3D+_0xaexad%280x1a%2C+0x2f%29%3B%0D%0Aconsole.log%28result%29%3B%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Avoid obfuscating your function names. 

Write code that communicates your intent. 

When you prioritize readability, you make your software easier to understand, debug, and maintain. 

Cryptic code might look [clever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md), but it adds unnecessary complexity.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 138 - Packages Dependency](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20138%20-%20Packages%20Dependency/readme.md)

[Code Smell 215 - Deserializing Object Vulnerability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20215%20-%20Deserializing%20Object%20Vulnerability/readme.md)

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# More Information 📕

[Linkedin Post](https://www.linkedin.com/posts/franco-aguilera-2583685a_the-code-challenge-scam-they-tried-to-hack-activity-7270114822950703107-K3DW/)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Nikita Pavlov](https://unsplash.com/@pavme) on [Unsplash](https://unsplash.com/photos/a-person-with-a-mask-2RBo6q8bBko)      
  
* * *

> The strength of a cryptographic system depends entirely on the strength of its weakest component. 

_Bruce Schneier_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)