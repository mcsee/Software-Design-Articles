# Code Smell 300 - Package Hallucination

![Code Smell 300 - Package Hallucination](Code%20Smell%20300%20-%20Package%20Hallucination.jpg)

*A chain is only as strong as its weakest link, and hallucinating dependencies will damage your software supply chain. DO NOT trust blindly on AI generators.*

> TL;DR: Avoid hallucinated or fake packages that can compromise security and stability. 

# Problems 😔

- Unsupervised [Vibe Coding](https://en.wikipedia.org/wiki/Vibe_coding)
- Security risks
- Dependency confusion
- [Too Many Imports](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2094%20-%20Too%20Many%20imports/readme.md)
- [Typesquatting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20263%20-%20Squatting/readme.md)
- Injection attacks
- Supply chain corruption
- Untrusted sources
- [Package Poisoning](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20138%20-%20Packages%20Dependency/readme.md)

# Solutions 😃

1. Validate package names
2. Use trusted repositories
3. Lock dependencies
4. Monitor for typos
5. Audit third-party packages
6. Lock dependency versions
7. Use private repositories
8. Verify package checksums
9. Implement allow-lists
10. Audit dependencies regularly

# Context 💬

When AI generated code add external libraries to your project, you are assuming they come from reliable sources. 

If you're not careful, you might accidentally pull a malicious or incorrect package. 

[From Helpful to Harmful: How AI Recommendations Destroyed My OS](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/From%20Helpful%20to%20Harmful%20How%20AI%20Recommendations%20Destroyed%20My%20OS/readme.md)

This is called "package hallucination" .

Attackers often publish fake packages with names similar to popular ones (typesquatting), hoping developers will install them by mistake. 

These packages can inject harmful code into your system through the package supply chain.

In a [recent paper](https://arxiv.org/pdf/2406.10279), the authors found a lot of evidence of these attacks on the wild.

Researchers tested 16 language models and generated more than half a million code snippets. 

They found that nearly 440,000 dependencies pointed to libraries that simply don't exist.

These are very harmful backdoors for hackers.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/27c3782443868d992951d86b91964cbe) -->

```json
// package.json
{
  "name": "my-app",
  "dependencies": {
    "react": "^18.2.0",
    "lodahs": "1.0.0",  // Typosquatting attack
    "internal-logger": "2.1.0" 
    // Vulnerable to dependency confusion
  }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/d1aa123981988448e9baa9434f6f32ed) -->

```json
// package.json
{
  "name": "my-app",
  "dependencies": {
    "react": "18.2.0",
    "lodash": "4.17.21",  // Correct spelling with exact version
    "@company-scope/internal-logger": "2.1.0" // Scoped package
  },
  "resolutions": {
    "lodash": "4.17.21"  
    // Force specific version for nested dependencies
  },
  "packageManager": "yarn@3.2.0" // Lock package manager version
}
```

# Detection 🔍

[X] Semi-Automatic 

You can detect this smell by reviewing all dependencies *manually* and using tools like automated linters or IDEs that flag suspicious or misspelled package names. 

Also, dependency lock files help track exactly which versions were installed.

# Tags 🏷️

- Security

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

Modeling a [one-to-one](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between real-world dependencies and those in your code ensures trust and predictability. 

When you allow hallucinated packages, you break this trust, potentially introducing [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md), security holes, and maintenance nightmares.

# AI Generation 🤖

AI generators can unintentionally create this smell by suggesting incorrect or non-existent package names as [the article proved](https://arxiv.org/pdf/2406.10279).

They may confuse similar-sounding libraries or suggest outdated/renamed packages.

# AI Detection 🥃

AI can fix this smell when given clear instructions to validate package names against official registries or enforce naming conventions. 

With proper training data, AI tools can flag potential typesquatting attempts automatically.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: verify and replace invalid packages

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60json%0D%0A%2F%2F+package.json%0D%0A%7B%0D%0A++%22name%22%3A+%22my-app%22%2C%0D%0A++%22dependencies%22%3A+%7B%0D%0A++++%22react%22%3A+%22%5E18.2.0%22%2C%0D%0A++++%22lodahs%22%3A+%221.0.0%22%2C++%2F%2F+Typosquatting+attack%0D%0A++++%22internal-logger%22%3A+%222.1.0%22+%0D%0A++++%2F%2F+Vulnerable+to+dependency+confusion%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=verify+and+replace+invalid+packages%3A+%60%60%60json%0D%0A%2F%2F+package.json%0D%0A%7B%0D%0A++%22name%22%3A+%22my-app%22%2C%0D%0A++%22dependencies%22%3A+%7B%0D%0A++++%22react%22%3A+%22%5E18.2.0%22%2C%0D%0A++++%22lodahs%22%3A+%221.0.0%22%2C++%2F%2F+Typosquatting+attack%0D%0A++++%22internal-logger%22%3A+%222.1.0%22+%0D%0A++++%2F%2F+Vulnerable+to+dependency+confusion%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60json%0D%0A%2F%2F+package.json%0D%0A%7B%0D%0A++%22name%22%3A+%22my-app%22%2C%0D%0A++%22dependencies%22%3A+%7B%0D%0A++++%22react%22%3A+%22%5E18.2.0%22%2C%0D%0A++++%22lodahs%22%3A+%221.0.0%22%2C++%2F%2F+Typosquatting+attack%0D%0A++++%22internal-logger%22%3A+%222.1.0%22+%0D%0A++++%2F%2F+Vulnerable+to+dependency+confusion%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=verify+and+replace+invalid+packages%3A+%60%60%60json%0D%0A%2F%2F+package.json%0D%0A%7B%0D%0A++%22name%22%3A+%22my-app%22%2C%0D%0A++%22dependencies%22%3A+%7B%0D%0A++++%22react%22%3A+%22%5E18.2.0%22%2C%0D%0A++++%22lodahs%22%3A+%221.0.0%22%2C++%2F%2F+Typosquatting+attack%0D%0A++++%22internal-logger%22%3A+%222.1.0%22+%0D%0A++++%2F%2F+Vulnerable+to+dependency+confusion%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60json%0D%0A%2F%2F+package.json%0D%0A%7B%0D%0A++%22name%22%3A+%22my-app%22%2C%0D%0A++%22dependencies%22%3A+%7B%0D%0A++++%22react%22%3A+%22%5E18.2.0%22%2C%0D%0A++++%22lodahs%22%3A+%221.0.0%22%2C++%2F%2F+Typosquatting+attack%0D%0A++++%22internal-logger%22%3A+%222.1.0%22+%0D%0A++++%2F%2F+Vulnerable+to+dependency+confusion%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=verify+and+replace+invalid+packages%3A+%60%60%60json%0D%0A%2F%2F+package.json%0D%0A%7B%0D%0A++%22name%22%3A+%22my-app%22%2C%0D%0A++%22dependencies%22%3A+%7B%0D%0A++++%22react%22%3A+%22%5E18.2.0%22%2C%0D%0A++++%22lodahs%22%3A+%221.0.0%22%2C++%2F%2F+Typosquatting+attack%0D%0A++++%22internal-logger%22%3A+%222.1.0%22+%0D%0A++++%2F%2F+Vulnerable+to+dependency+confusion%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60json%0D%0A%2F%2F+package.json%0D%0A%7B%0D%0A++%22name%22%3A+%22my-app%22%2C%0D%0A++%22dependencies%22%3A+%7B%0D%0A++++%22react%22%3A+%22%5E18.2.0%22%2C%0D%0A++++%22lodahs%22%3A+%221.0.0%22%2C++%2F%2F+Typosquatting+attack%0D%0A++++%22internal-logger%22%3A+%222.1.0%22+%0D%0A++++%2F%2F+Vulnerable+to+dependency+confusion%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=verify+and+replace+invalid+packages%3A+%60%60%60json%0D%0A%2F%2F+package.json%0D%0A%7B%0D%0A++%22name%22%3A+%22my-app%22%2C%0D%0A++%22dependencies%22%3A+%7B%0D%0A++++%22react%22%3A+%22%5E18.2.0%22%2C%0D%0A++++%22lodahs%22%3A+%221.0.0%22%2C++%2F%2F+Typosquatting+attack%0D%0A++++%22internal-logger%22%3A+%222.1.0%22+%0D%0A++++%2F%2F+Vulnerable+to+dependency+confusion%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60json%0D%0A%2F%2F+package.json%0D%0A%7B%0D%0A++%22name%22%3A+%22my-app%22%2C%0D%0A++%22dependencies%22%3A+%7B%0D%0A++++%22react%22%3A+%22%5E18.2.0%22%2C%0D%0A++++%22lodahs%22%3A+%221.0.0%22%2C++%2F%2F+Typosquatting+attack%0D%0A++++%22internal-logger%22%3A+%222.1.0%22+%0D%0A++++%2F%2F+Vulnerable+to+dependency+confusion%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=verify+and+replace+invalid+packages%3A+%60%60%60json%0D%0A%2F%2F+package.json%0D%0A%7B%0D%0A++%22name%22%3A+%22my-app%22%2C%0D%0A++%22dependencies%22%3A+%7B%0D%0A++++%22react%22%3A+%22%5E18.2.0%22%2C%0D%0A++++%22lodahs%22%3A+%221.0.0%22%2C++%2F%2F+Typosquatting+attack%0D%0A++++%22internal-logger%22%3A+%222.1.0%22+%0D%0A++++%2F%2F+Vulnerable+to+dependency+confusion%0D%0A++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Package hallucination is a dangerous code smell that exposes your application to serious threats. 

By validating every dependency and using strict version controls, you protect yourself from malicious injections and ensure software integrity.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 138 - Packages Dependency](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20138%20-%20Packages%20Dependency/readme.md)

[Code Smell 94 - Too Many imports](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2094%20-%20Too%20Many%20imports/readme.md)

[Code Smell 263 - Squatting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20263%20-%20Squatting/readme.md)

# More Information 📕

[We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs](https://arxiv.org/pdf/2406.10279)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [JJ Ying](https://unsplash.com/@jjying) on [Unsplash](https://unsplash.com/photos/tilt-shift-lens-photo-of-stainless-steel-chain-PDxYfXVlK2M)
        
* * *

> Controlling complexity is the essence of computer programming.

_Fred Brooks_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)