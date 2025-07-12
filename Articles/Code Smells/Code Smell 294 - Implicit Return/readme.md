# Code Smell 294 - Implicit Return

![Code Smell 294 - Implicit Return](Code%20Smell%20294%20-%20Implicit%20Return.jpg)

*Your language adds clever features. Making YOU more obsolete*

> TL;DR: Overusing implicit returns makes your code harder to read and debug.

# Problems 😔

- Reduced readability
- Hidden logic and unclear intent
- Debugging difficulties
- Misleading simplicity
- Over-reliance on syntax
- Language dependency
- Loss of explicitness
- Inconsistent style

# Solutions 😃

1. Use explicit returns
2. Break down complex logic
3. Avoid nested closures
4. Prioritize clarity over brevity
5. Stick to conventions

# Refactorings ⚙️

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Context 💬

Recently, I wrote an article on this series:

[Code Smell 292 - Missing Return](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20292%20-%20Missing%20Return/readme.md)

One of my readers, Marcel Mravec pointed out this "feature": 

> New in Swift 5.1: The return keyword can now be omitted when declaring functions and computed properties that only contain a single expression, which is really nice when declaring simpler convenience APIs:

[Omitting the return keyword](https://www.swiftbysundell.com/tips/omitting-the-return-keyword/)

This kind of "language feature" creates more friction when transitioning from accidental languages. In this era you need to be ready to transition between [accidental languages](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) quickly.

Some languages allows you to omit the return keyword in single-expression functions and closures. 

While this can make your code concise, overusing it can lead to confusion, especially in complex or nested logic. 

When you rely too much on fancy tricks like implicit returns or [ridiculous castings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md), you risk making your code harder to understand and debug.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/f34e156d4c046b12e1ad27b0d7fb4eaf) -->

```swift
func calculatePrice(items: [Double], taxRate: Double) -> Double {
    items.reduce(0) { $0 + $1 } * (1 + taxRate / 100)
    // If you are not familiar to swift 
    // you cannot understand what is returning
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/c0385349b8c777e7f8ea4e4c2f1a646e) -->

```swift
func calculatePrice(items: [Double], taxRate: Double) -> Double {
    let subtotal = items.reduce(0) { sum, item in 
        sum + item 
    }
    let taxFactor = 1 + taxRate / 100
    return subtotal * taxFactor
}
```

# Detection 🔍

[X] Automatic 

This is a language feature.

Using [Abstract syntax trees](https://en.wikipedia.org/wiki/Abstract_syntax_tree) most linters can warn you, but they don't flag it as a smell.

# Tags 🏷️

- Readability

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

When you learn to program in pseudocode, you acknowledge functions return values. 

Writing less code is not always better. 

Sometimes you break the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between your knowledge and the code you write.

When you abuse implicit returns, you break the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) by hiding the logical flow of your program.

It's harder for others (and your future self) to understand the intent behind the code.

# AI Generation 🤖

AI generators often favor concise code, which can lead to overuse of implicit returns. 

While this makes the code shorter, it may sacrifice readability and maintainability.

# AI Detection 🥃

AI tools can identify and refactor implicit returns into explicit ones with simple instructions. 

You should always review the changes to ensure they improve clarity without introducing unnecessary verbosity. You are the pilot!

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Convert it using explicit returns

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60swift%0D%0Afunc+calculatePrice%28items%3A+%5BDouble%5D%2C+taxRate%3A+Double%29+-%3E+Double+%7B%0D%0A++++items.reduce%280%29+%7B+%240+%2B+%241+%7D+%2A+%281+%2B+taxRate+%2F+100%29%0D%0A++++%2F%2F+If+you+are+not+familiar+to+swift+%0D%0A++++%2F%2F+you+cannot+understand+what+is+returning%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Convert+it+using+explicit+returns%3A+%60%60%60swift%0D%0Afunc+calculatePrice%28items%3A+%5BDouble%5D%2C+taxRate%3A+Double%29+-%3E+Double+%7B%0D%0A++++items.reduce%280%29+%7B+%240+%2B+%241+%7D+%2A+%281+%2B+taxRate+%2F+100%29%0D%0A++++%2F%2F+If+you+are+not+familiar+to+swift+%0D%0A++++%2F%2F+you+cannot+understand+what+is+returning%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60swift%0D%0Afunc+calculatePrice%28items%3A+%5BDouble%5D%2C+taxRate%3A+Double%29+-%3E+Double+%7B%0D%0A++++items.reduce%280%29+%7B+%240+%2B+%241+%7D+%2A+%281+%2B+taxRate+%2F+100%29%0D%0A++++%2F%2F+If+you+are+not+familiar+to+swift+%0D%0A++++%2F%2F+you+cannot+understand+what+is+returning%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Convert+it+using+explicit+returns%3A+%60%60%60swift%0D%0Afunc+calculatePrice%28items%3A+%5BDouble%5D%2C+taxRate%3A+Double%29+-%3E+Double+%7B%0D%0A++++items.reduce%280%29+%7B+%240+%2B+%241+%7D+%2A+%281+%2B+taxRate+%2F+100%29%0D%0A++++%2F%2F+If+you+are+not+familiar+to+swift+%0D%0A++++%2F%2F+you+cannot+understand+what+is+returning%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60swift%0D%0Afunc+calculatePrice%28items%3A+%5BDouble%5D%2C+taxRate%3A+Double%29+-%3E+Double+%7B%0D%0A++++items.reduce%280%29+%7B+%240+%2B+%241+%7D+%2A+%281+%2B+taxRate+%2F+100%29%0D%0A++++%2F%2F+If+you+are+not+familiar+to+swift+%0D%0A++++%2F%2F+you+cannot+understand+what+is+returning%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Convert+it+using+explicit+returns%3A+%60%60%60swift%0D%0Afunc+calculatePrice%28items%3A+%5BDouble%5D%2C+taxRate%3A+Double%29+-%3E+Double+%7B%0D%0A++++items.reduce%280%29+%7B+%240+%2B+%241+%7D+%2A+%281+%2B+taxRate+%2F+100%29%0D%0A++++%2F%2F+If+you+are+not+familiar+to+swift+%0D%0A++++%2F%2F+you+cannot+understand+what+is+returning%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60swift%0D%0Afunc+calculatePrice%28items%3A+%5BDouble%5D%2C+taxRate%3A+Double%29+-%3E+Double+%7B%0D%0A++++items.reduce%280%29+%7B+%240+%2B+%241+%7D+%2A+%281+%2B+taxRate+%2F+100%29%0D%0A++++%2F%2F+If+you+are+not+familiar+to+swift+%0D%0A++++%2F%2F+you+cannot+understand+what+is+returning%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Convert+it+using+explicit+returns%3A+%60%60%60swift%0D%0Afunc+calculatePrice%28items%3A+%5BDouble%5D%2C+taxRate%3A+Double%29+-%3E+Double+%7B%0D%0A++++items.reduce%280%29+%7B+%240+%2B+%241+%7D+%2A+%281+%2B+taxRate+%2F+100%29%0D%0A++++%2F%2F+If+you+are+not+familiar+to+swift+%0D%0A++++%2F%2F+you+cannot+understand+what+is+returning%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60swift%0D%0Afunc+calculatePrice%28items%3A+%5BDouble%5D%2C+taxRate%3A+Double%29+-%3E+Double+%7B%0D%0A++++items.reduce%280%29+%7B+%240+%2B+%241+%7D+%2A+%281+%2B+taxRate+%2F+100%29%0D%0A++++%2F%2F+If+you+are+not+familiar+to+swift+%0D%0A++++%2F%2F+you+cannot+understand+what+is+returning%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Convert+it+using+explicit+returns%3A+%60%60%60swift%0D%0Afunc+calculatePrice%28items%3A+%5BDouble%5D%2C+taxRate%3A+Double%29+-%3E+Double+%7B%0D%0A++++items.reduce%280%29+%7B+%240+%2B+%241+%7D+%2A+%281+%2B+taxRate+%2F+100%29%0D%0A++++%2F%2F+If+you+are+not+familiar+to+swift+%0D%0A++++%2F%2F+you+cannot+understand+what+is+returning%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Abusing implicit returns might save a few keystrokes but costs you readability and maintainability. 

You should be explicit when your logic gets complex or spans multiple lines.

Sadly, many languages encourage this code smell.

Some of them allow it on single expressions like:

- Swift
- Kotlin
- Scala

Some of them allow it on lambdas:

- Javascript
- Python

And many other allow your tu omit the return anytime:

- Ruby
- CoffeeScript
- Haskell
- Elixir
- F#
- Erlang
- Clojure

You will notice this a feature present on most [functional languages](https://en.wikipedia.org/wiki/Functional_programming).

# Relations 👩‍❤️‍💋‍👨

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 292 - Missing Return](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20292%20-%20Missing%20Return/readme.md)

[Code Smell 156 - Implicit Else](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20156%20-%20Implicit%20Else/readme.md)

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Thank you [Marcel Mravec](https://www.linkedin.com/in/mravec/) for this suggestion.

Photo by [愚木混株 cdd20](https://unsplash.com/@cdd20) on [Unsplash](https://unsplash.com/photos/a-group-of-red-arrows-on-a-black-surface-HQH-GOZ6K2c)      
  
* * *

> Explicit is better than implicit.

_Tim Peters_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)