# Code Smell 138 - Packages Dependency

![Code Smell 138 - Packages Dependency](Code%20Smell%20138%20-%20Packages%20Dependency.jpg)

*There's an industry trend to avoid writing code as much as possible, because who has time to write eight lines when a stranger already published a package for it. Turns out that convenience isn't free*

> TL;DR: Write your code unless you need an existing complex solution

# Problems 😔 

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- [Security problems](https://nakedsecurity.sophos.com/2022/05/25/poisoned-python-and-php-packages-purloin-passwords-for-aws-access/)

- Architectural complexity

- [Packages Corruption](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/)

# Solutions 😃

1. Implement trivial solutions

2. Rely on mature dependencies

# Context 💬

Recently, there's a trend to rely on dependencies so hard to trace you'd need a private investigator, not a debugger.

This introduces coupling into your designs and architectural solutions, which is a polite way of saying you handed strangers the keys to your codebase.

In August 2026, an attacker compromised the maintainer account behind [Keyv](https://www.aikido.dev/blog/keyv-and-friends-compromised-in-npm-supply-chain-attack) and injected credential-stealing code into it, right around the time thousands of developers were happily typing `npm install` without a second thought.

The malware spread through worm-like propagation to at least 444 packages across more than 2 billion monthly installs before anyone noticed, because auditing your transitive dependency tree is apparently nobody's job until it explodes.

You had no way to see this coming just by reading your own code, which was the whole point of importing it instead of writing it.

# Sample Code 💻

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/32a73793d00fc672138e1a98bbdc9aa8) -->

```javascript
$ npm install --save is-odd

// https://www.npmjs.com/package/is-odd
// This package has about 500k weekly downloads

module.exports = function isOdd(value) {
  const n = Math.abs(value); 
  return (n % 2) === 1;
};
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/751b57a8178500e9143ea2081237ffaf) -->

```javascript
function isOdd(value) {
  const n = Math.abs(value); 
  return (n % 2) === 1;
};

// Just solve it inline
```

# Detection 🔍

[X] Automatic 

You can check your external dependencies and stick to the minimum, assuming you can list them all without opening a spreadsheet.

You can also depend on a certain concrete version to avoid hijacking, though pinning a version just means you trust yesterday's stranger instead of today's.

# Tags 🏷️

- Security

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

Your design should map to the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) with a clean [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

When you pull in an external package for a trivial rule, you stop owning that piece of the model.

The package maintainer's decisions become part of your bijection, whether you reviewed them or not.

You lose traceability between your domain concept and the code that implements it.

A concrete version pin restores part of that bijection, but you still depend on someone else's model matching yours.

# AI Generation 🤖

AI code generators often suggest importing a popular package for problems you could solve in a few lines.

They pattern-match toward the most common solution in their training data, which is usually "there's a package for that."

Ask an assistant to check if a number is odd, and it may reach for a library instead of a single modulo operation, because apparently even parity checks need a supply chain now.

# AI Detection 🧲

AI generators rarely flag unnecessary dependencies on their own.

They don't weigh the [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) cost of a package against the cost of writing the trivial logic yourself.

You need to explicitly instruct the assistant to prefer inline solutions for trivial problems and reserve dependencies for real complexity.

# Try Them! 🛠

> Suggested Prompt: Replace the trivial external package dependency with a small inline implementation that removes the unnecessary coupling

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Fix+this+code+smell%3A+%60%60%60javascript%0D%0A%24+npm+install+--save+is-odd%0D%0A%0D%0A%2F%2F+https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fis-odd%0D%0A%2F%2F+This+package+has+about+500k+weekly+downloads%0D%0A%0D%0Amodule.exports+%3D+function+isOdd%28value%29+%7B%0D%0A++const+n+%3D+Math.abs%28value%29%3B+%0D%0A++return+%28n+%25+2%29+%3D%3D%3D+1%3B%0D%0A%7D%3B%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Replace+the+trivial+external+package+dependency+with+a+small+inline+implementation+that+removes+the+unnecessary+coupling%3A+%60%60%60javascript%0D%0A%24+npm+install+--save+is-odd%0D%0A%0D%0A%2F%2F+https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fis-odd%0D%0A%2F%2F+This+package+has+about+500k+weekly+downloads%0D%0A%0D%0Amodule.exports+%3D+function+isOdd%28value%29+%7B%0D%0A++const+n+%3D+Math.abs%28value%29%3B+%0D%0A++return+%28n+%25+2%29+%3D%3D%3D+1%3B%0D%0A%7D%3B%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Fix+this+code+smell%3A+%60%60%60javascript%0D%0A%24+npm+install+--save+is-odd%0D%0A%0D%0A%2F%2F+https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fis-odd%0D%0A%2F%2F+This+package+has+about+500k+weekly+downloads%0D%0A%0D%0Amodule.exports+%3D+function+isOdd%28value%29+%7B%0D%0A++const+n+%3D+Math.abs%28value%29%3B+%0D%0A++return+%28n+%25+2%29+%3D%3D%3D+1%3B%0D%0A%7D%3B%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Replace+the+trivial+external+package+dependency+with+a+small+inline+implementation+that+removes+the+unnecessary+coupling%3A+%60%60%60javascript%0D%0A%24+npm+install+--save+is-odd%0D%0A%0D%0A%2F%2F+https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fis-odd%0D%0A%2F%2F+This+package+has+about+500k+weekly+downloads%0D%0A%0D%0Amodule.exports+%3D+function+isOdd%28value%29+%7B%0D%0A++const+n+%3D+Math.abs%28value%29%3B+%0D%0A++return+%28n+%25+2%29+%3D%3D%3D+1%3B%0D%0A%7D%3B%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Fix+this+code+smell%3A+%60%60%60javascript%0D%0A%24+npm+install+--save+is-odd%0D%0A%0D%0A%2F%2F+https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fis-odd%0D%0A%2F%2F+This+package+has+about+500k+weekly+downloads%0D%0A%0D%0Amodule.exports+%3D+function+isOdd%28value%29+%7B%0D%0A++const+n+%3D+Math.abs%28value%29%3B+%0D%0A++return+%28n+%25+2%29+%3D%3D%3D+1%3B%0D%0A%7D%3B%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Replace+the+trivial+external+package+dependency+with+a+small+inline+implementation+that+removes+the+unnecessary+coupling%3A+%60%60%60javascript%0D%0A%24+npm+install+--save+is-odd%0D%0A%0D%0A%2F%2F+https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fis-odd%0D%0A%2F%2F+This+package+has+about+500k+weekly+downloads%0D%0A%0D%0Amodule.exports+%3D+function+isOdd%28value%29+%7B%0D%0A++const+n+%3D+Math.abs%28value%29%3B+%0D%0A++return+%28n+%25+2%29+%3D%3D%3D+1%3B%0D%0A%7D%3B%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Fix+this+code+smell%3A+%60%60%60javascript%0D%0A%24+npm+install+--save+is-odd%0D%0A%0D%0A%2F%2F+https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fis-odd%0D%0A%2F%2F+This+package+has+about+500k+weekly+downloads%0D%0A%0D%0Amodule.exports+%3D+function+isOdd%28value%29+%7B%0D%0A++const+n+%3D+Math.abs%28value%29%3B+%0D%0A++return+%28n+%25+2%29+%3D%3D%3D+1%3B%0D%0A%7D%3B%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Replace+the+trivial+external+package+dependency+with+a+small+inline+implementation+that+removes+the+unnecessary+coupling%3A+%60%60%60javascript%0D%0A%24+npm+install+--save+is-odd%0D%0A%0D%0A%2F%2F+https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fis-odd%0D%0A%2F%2F+This+package+has+about+500k+weekly+downloads%0D%0A%0D%0Amodule.exports+%3D+function+isOdd%28value%29+%7B%0D%0A++const+n+%3D+Math.abs%28value%29%3B+%0D%0A++return+%28n+%25+2%29+%3D%3D%3D+1%3B%0D%0A%7D%3B%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Fix+this+code+smell%3A+%60%60%60javascript%0D%0A%24+npm+install+--save+is-odd%0D%0A%0D%0A%2F%2F+https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fis-odd%0D%0A%2F%2F+This+package+has+about+500k+weekly+downloads%0D%0A%0D%0Amodule.exports+%3D+function+isOdd%28value%29+%7B%0D%0A++const+n+%3D+Math.abs%28value%29%3B+%0D%0A++return+%28n+%25+2%29+%3D%3D%3D+1%3B%0D%0A%7D%3B%0D%0A%60%60%60) | [You](https://you.com/search?q=Replace+the+trivial+external+package+dependency+with+a+small+inline+implementation+that+removes+the+unnecessary+coupling%3A+%60%60%60javascript%0D%0A%24+npm+install+--save+is-odd%0D%0A%0D%0A%2F%2F+https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fis-odd%0D%0A%2F%2F+This+package+has+about+500k+weekly+downloads%0D%0A%0D%0Amodule.exports+%3D+function+isOdd%28value%29+%7B%0D%0A++const+n+%3D+Math.abs%28value%29%3B+%0D%0A++return+%28n+%25+2%29+%3D%3D%3D+1%3B%0D%0A%7D%3B%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

*Remember: AI Assistants make lots of mistakes*

# Conclusion 🏁

Lazy programmers push reuse to absurd limits.

You need a good balance between code duplication and crazy reuse.

As always, there are rules of thumb, no rigid rules, and plenty of developers who'll learn the difference the hard way anyway.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 94 - Too Many imports](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2094%20-%20Too%20Many%20imports/readme.md)

[Code Smell 300 - Package Hallucination](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20300%20-%20Package%20Hallucination/readme.md)
 
# More Information 📕

- [Poisoned Packages](https://nakedsecurity.sophos.com/2022/05/25/poisoned-python-and-php-packages-purloin-passwords-for-aws-access/)

- [Packages Corruption](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/)

- [Copyright Threats](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code/)

- [Malware in Packages](https://therecord.media/malware-found-in-npm-package-with-millions-of-weekly-downloads/)

- [Keyv Supply Chain Attack](https://www.aikido.dev/blog/keyv-and-friends-compromised-in-npm-supply-chain-attack)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [olieman.eth](https://unsplash.com/@moneyphotos) on [Unsplash](https://unsplash.com/s/photos/security-box)
  
Thanks to Ramiro Rela for this smell

* * *

> Complexity kills. It sucks the life out of developers, it makes products difficult to plan, build and test, it introduces security challenges, and it causes end-user and administrator frustration.

_Ray Ozzie_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)