# Code Smell 292 - Missing Return

![Code Smell 292 - Missing Return](Code%20Smell%20292%20-%20Missing%20Return.jpg)

*When your code loses its way*

> TL;DR: Missing return statements cause unexpected behavior.

# Problems 😔

- Silent failures
- Unreliable results
- Hard debugging
- Inconsistent and misleading behavior
- Broken logic

# Solutions 😃

1. Always return values
2. Use clear flow
3. Validate conditions
4. Test all return paths
5. Use [early returns](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20156%20-%20Implicit%20Else/readme.md)
6. Remove [IFs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

# Refactorings ⚙️

[Refactoring 014 - Remove IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

# Context 💬

When you forget to return a value, your function keeps executing and your app might show incomplete or wrong information.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/85ddf9b20f667119b5a7d57a512ee1c1) -->

```kotlin
fun totalDistance(activity: Activity): Double {
    if (activity.type == "Running") {
        activity.calculateDistance() 
        // Missing return here
    } else {
        return 0.0
    }
    // Other options are omitted for simplicity
    // Some languages raise a runtime error 
    // If the function doesn't return a value
    // of the correct type (in this case a Double)
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/f979ec3c11052161c87d9498a9e641a9) -->

```kotlin
fun totalDistance(activity: Activity): Double {
    if (activity.type == "Running") {
        return activity.calculateDistance() 
        // Now it returns the value
    } else {
        return 0.0
    }
}
```

# Detection 🔍

[X] Automatic 

You can detect this smell when your function lacks a return statement in certain branches. 

Most static analyzers and linters often catch this.

# Tags 🏷️

- IFs

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️

It's important to maintain a clear and predictable relationship between your code and the [Real World](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

If a function is intended to calculate and return a value, it should always do so.  

Failing to return a value breaks the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md), leading to inaccurate behavior and unreliable results.

# AI Generation 🤖

AI tools usually don't generate this smell.

# AI Detection 🥃

Most AI-powered linters quickly catch missing returns with static analysis or by examining your code's [Abstract Syntax Tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree).

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: correct the missing return

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60kotlin%0D%0Afun+totalDistance%28activity%3A+Activity%29%3A+Double+%7B%0D%0A++++if+%28activity.type+%3D%3D+%22Running%22%29+%7B%0D%0A++++++++activity.calculateDistance%28%29+%0D%0A++++++++%2F%2F+Missing+return+here%0D%0A++++%7D+else+%7B%0D%0A++++++++return+0.0%0D%0A++++%7D%0D%0A++++%2F%2F+Other+options+are+omitted+for+simplicity%0D%0A++++%2F%2F+Some+languages+raise+a+runtime+error+%0D%0A++++%2F%2F+If+the+function+doesn%27t+return+a+value%0D%0A++++%2F%2F+of+the+correct+type+%28in+this+case+a+Double%29%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=correct+the+missing+return%3A+%60%60%60kotlin%0D%0Afun+totalDistance%28activity%3A+Activity%29%3A+Double+%7B%0D%0A++++if+%28activity.type+%3D%3D+%22Running%22%29+%7B%0D%0A++++++++activity.calculateDistance%28%29+%0D%0A++++++++%2F%2F+Missing+return+here%0D%0A++++%7D+else+%7B%0D%0A++++++++return+0.0%0D%0A++++%7D%0D%0A++++%2F%2F+Other+options+are+omitted+for+simplicity%0D%0A++++%2F%2F+Some+languages+raise+a+runtime+error+%0D%0A++++%2F%2F+If+the+function+doesn%27t+return+a+value%0D%0A++++%2F%2F+of+the+correct+type+%28in+this+case+a+Double%29%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60kotlin%0D%0Afun+totalDistance%28activity%3A+Activity%29%3A+Double+%7B%0D%0A++++if+%28activity.type+%3D%3D+%22Running%22%29+%7B%0D%0A++++++++activity.calculateDistance%28%29+%0D%0A++++++++%2F%2F+Missing+return+here%0D%0A++++%7D+else+%7B%0D%0A++++++++return+0.0%0D%0A++++%7D%0D%0A++++%2F%2F+Other+options+are+omitted+for+simplicity%0D%0A++++%2F%2F+Some+languages+raise+a+runtime+error+%0D%0A++++%2F%2F+If+the+function+doesn%27t+return+a+value%0D%0A++++%2F%2F+of+the+correct+type+%28in+this+case+a+Double%29%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=correct+the+missing+return%3A+%60%60%60kotlin%0D%0Afun+totalDistance%28activity%3A+Activity%29%3A+Double+%7B%0D%0A++++if+%28activity.type+%3D%3D+%22Running%22%29+%7B%0D%0A++++++++activity.calculateDistance%28%29+%0D%0A++++++++%2F%2F+Missing+return+here%0D%0A++++%7D+else+%7B%0D%0A++++++++return+0.0%0D%0A++++%7D%0D%0A++++%2F%2F+Other+options+are+omitted+for+simplicity%0D%0A++++%2F%2F+Some+languages+raise+a+runtime+error+%0D%0A++++%2F%2F+If+the+function+doesn%27t+return+a+value%0D%0A++++%2F%2F+of+the+correct+type+%28in+this+case+a+Double%29%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60kotlin%0D%0Afun+totalDistance%28activity%3A+Activity%29%3A+Double+%7B%0D%0A++++if+%28activity.type+%3D%3D+%22Running%22%29+%7B%0D%0A++++++++activity.calculateDistance%28%29+%0D%0A++++++++%2F%2F+Missing+return+here%0D%0A++++%7D+else+%7B%0D%0A++++++++return+0.0%0D%0A++++%7D%0D%0A++++%2F%2F+Other+options+are+omitted+for+simplicity%0D%0A++++%2F%2F+Some+languages+raise+a+runtime+error+%0D%0A++++%2F%2F+If+the+function+doesn%27t+return+a+value%0D%0A++++%2F%2F+of+the+correct+type+%28in+this+case+a+Double%29%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=correct+the+missing+return%3A+%60%60%60kotlin%0D%0Afun+totalDistance%28activity%3A+Activity%29%3A+Double+%7B%0D%0A++++if+%28activity.type+%3D%3D+%22Running%22%29+%7B%0D%0A++++++++activity.calculateDistance%28%29+%0D%0A++++++++%2F%2F+Missing+return+here%0D%0A++++%7D+else+%7B%0D%0A++++++++return+0.0%0D%0A++++%7D%0D%0A++++%2F%2F+Other+options+are+omitted+for+simplicity%0D%0A++++%2F%2F+Some+languages+raise+a+runtime+error+%0D%0A++++%2F%2F+If+the+function+doesn%27t+return+a+value%0D%0A++++%2F%2F+of+the+correct+type+%28in+this+case+a+Double%29%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60kotlin%0D%0Afun+totalDistance%28activity%3A+Activity%29%3A+Double+%7B%0D%0A++++if+%28activity.type+%3D%3D+%22Running%22%29+%7B%0D%0A++++++++activity.calculateDistance%28%29+%0D%0A++++++++%2F%2F+Missing+return+here%0D%0A++++%7D+else+%7B%0D%0A++++++++return+0.0%0D%0A++++%7D%0D%0A++++%2F%2F+Other+options+are+omitted+for+simplicity%0D%0A++++%2F%2F+Some+languages+raise+a+runtime+error+%0D%0A++++%2F%2F+If+the+function+doesn%27t+return+a+value%0D%0A++++%2F%2F+of+the+correct+type+%28in+this+case+a+Double%29%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=correct+the+missing+return%3A+%60%60%60kotlin%0D%0Afun+totalDistance%28activity%3A+Activity%29%3A+Double+%7B%0D%0A++++if+%28activity.type+%3D%3D+%22Running%22%29+%7B%0D%0A++++++++activity.calculateDistance%28%29+%0D%0A++++++++%2F%2F+Missing+return+here%0D%0A++++%7D+else+%7B%0D%0A++++++++return+0.0%0D%0A++++%7D%0D%0A++++%2F%2F+Other+options+are+omitted+for+simplicity%0D%0A++++%2F%2F+Some+languages+raise+a+runtime+error+%0D%0A++++%2F%2F+If+the+function+doesn%27t+return+a+value%0D%0A++++%2F%2F+of+the+correct+type+%28in+this+case+a+Double%29%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60kotlin%0D%0Afun+totalDistance%28activity%3A+Activity%29%3A+Double+%7B%0D%0A++++if+%28activity.type+%3D%3D+%22Running%22%29+%7B%0D%0A++++++++activity.calculateDistance%28%29+%0D%0A++++++++%2F%2F+Missing+return+here%0D%0A++++%7D+else+%7B%0D%0A++++++++return+0.0%0D%0A++++%7D%0D%0A++++%2F%2F+Other+options+are+omitted+for+simplicity%0D%0A++++%2F%2F+Some+languages+raise+a+runtime+error+%0D%0A++++%2F%2F+If+the+function+doesn%27t+return+a+value%0D%0A++++%2F%2F+of+the+correct+type+%28in+this+case+a+Double%29%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=correct+the+missing+return%3A+%60%60%60kotlin%0D%0Afun+totalDistance%28activity%3A+Activity%29%3A+Double+%7B%0D%0A++++if+%28activity.type+%3D%3D+%22Running%22%29+%7B%0D%0A++++++++activity.calculateDistance%28%29+%0D%0A++++++++%2F%2F+Missing+return+here%0D%0A++++%7D+else+%7B%0D%0A++++++++return+0.0%0D%0A++++%7D%0D%0A++++%2F%2F+Other+options+are+omitted+for+simplicity%0D%0A++++%2F%2F+Some+languages+raise+a+runtime+error+%0D%0A++++%2F%2F+If+the+function+doesn%27t+return+a+value%0D%0A++++%2F%2F+of+the+correct+type+%28in+this+case+a+Double%29%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

A missing return statement breaks your code’s flow and produces unreliable results. 

Always ensure every branch in your function returns something meaningful.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 73 - Exceptions for Expected Cases](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md)

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

[Code Smell 115 - Return True](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20115%20-%20Return%20True/readme.md)

[Code Smell 118 - Return False](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20118%20-%20Return%20False/readme.md)

[Code Smell 186 - Hardcoded Business Conditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20186%20-%20Hardcoded%20Business%20Conditions/readme.md)

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

[Code Smell 156 - Implicit Else](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20156%20-%20Implicit%20Else/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Tim Johnson](https://unsplash.com/@mangofantasy) on [Unsplash](https://unsplash.com/photos/white-and-gray-animal-on-gray-rocky-mountain-during-daytime-ywIZ8ZYxzWU)
         
* * *

> A bug is never just a mistake. It represents something bigger.

_Sergey Zefirov_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)