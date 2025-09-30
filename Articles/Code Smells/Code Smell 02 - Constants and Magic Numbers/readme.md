# Code Smell 02 - Constants and Magic Numbers

![Code Smell 02 - Constants and Magic Numbers](Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers.jpg)

*A method makes calculations with lots of numbers without describing their semantics*

> TL;DR: Avoid Magic numbers without explanation. You don't know their source and are very afraid of changing them.

# Problems 😔 

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Low testability

- Low readability

# Solutions 😃

1) Rename the constant to a meaningful, intention-revealing name.

2) [Replace constants with parameters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20003%20-%20Extract%20Constant/readme.md), so you can mock them from the outside.

3) The constant definition is often a different object than the constant (ab)user.

# Refactorings ⚙️

[Refactoring 003 - Extract Constant](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20003%20-%20Extract%20Constant/readme.md)

[Refactoring 025 - Decompose Regular Expressions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20025%20-%20Decompose%20Regular%20Expressions/readme.md)

# Examples

- Algorithms Hyper Parameters

# Context 💬  

Magic numbers are literal values embedded directly into your code without explanation. 

They often appear in algorithms, configuration rules, or business logic as unexplained numeric values. 

At first, they might feel faster to write, but over time they turn into hidden assumptions that no one remembers. 

Future maintainers must guess their meaning, increasing the risk of errors when the values need to change. 

Constants help, but naming them meaningfully and placing them in the right context is what turns a magic number into a reliable, self-explanatory part of your code.
									  
# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/dec9856bf69a06c367d2e683b179577a) -->

```php
<?

function energy($mass) {
    return $mass * (299792 ** 2)
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/2e4c88a516078500ce833dbfbd3d9b0e) -->

```ruby
# Storing magnitudes without units is another smell
class PhysicsConstants
   LIGHT_SPEED = 299792458.freeze
end

def energy(mass)
    mass * PhysicsConstants::LIGHT_SPEED ** 2
end
```
												    
# Detection 🔍

[X] Semi-Automatic

Many linters can detect number literals in attributes and methods.

# Tags 🏷️

- Declarative Code

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️  

When you replace a magic number with a named constant, you create a [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between the value and its meaning. 

This one-to-one relationship ensures every numeric value has a clear, unambiguous purpose in your system. 

Without it, the same number could be reused for different reasons, leading to confusion and accidental coupling. 

A bijection between meaning and value makes the code easier to navigate, test, and evolve without fear of breaking unrelated parts.

# AI Generation 🤖

Large Language Models can introduce magic numbers when generating code, especially in examples or algorithm implementations. 

Treat AI-generated values with the same suspicion you would any human-written literal. 

Always check if the number is a placeholder, a real-world constant, or an algorithmic parameter, and replace it with a meaningful name before merging it into production code.

# AI Detection 🥃  

Code reviewers should stay alert to magic numbers introduced by AI tools, which often lack context or semantic naming. 

Automated linters can flag number literals, but human insight is critical to understand if a value requires refactoring into a named constant. 

Keep your eyes open for AI-generated black box numbers that might slip past initial checks but can cause maintenance headaches later.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Replace Magic numbers with constants

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+energy%28%24mass%29+%7B%0D%0A++++return+%24mass+%2A+%28299792+%2A%2A+2%29%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Replace+Magic+numbers+with+constants%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+energy%28%24mass%29+%7B%0D%0A++++return+%24mass+%2A+%28299792+%2A%2A+2%29%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+energy%28%24mass%29+%7B%0D%0A++++return+%24mass+%2A+%28299792+%2A%2A+2%29%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Replace+Magic+numbers+with+constants%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+energy%28%24mass%29+%7B%0D%0A++++return+%24mass+%2A+%28299792+%2A%2A+2%29%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+energy%28%24mass%29+%7B%0D%0A++++return+%24mass+%2A+%28299792+%2A%2A+2%29%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Replace+Magic+numbers+with+constants%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+energy%28%24mass%29+%7B%0D%0A++++return+%24mass+%2A+%28299792+%2A%2A+2%29%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+energy%28%24mass%29+%7B%0D%0A++++return+%24mass+%2A+%28299792+%2A%2A+2%29%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Replace+Magic+numbers+with+constants%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+energy%28%24mass%29+%7B%0D%0A++++return+%24mass+%2A+%28299792+%2A%2A+2%29%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+energy%28%24mass%29+%7B%0D%0A++++return+%24mass+%2A+%28299792+%2A%2A+2%29%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Replace+Magic+numbers+with+constants%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+energy%28%24mass%29+%7B%0D%0A++++return+%24mass+%2A+%28299792+%2A%2A+2%29%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁
 
You should address and remove your magic numbers to safeguard your code's readability, maintainability, and testability. 

Clear, semantic naming and decoupling constants from their consumers are essential steps toward crafting cleaner, more resilient software. 

Every magic number you replace with intention-revealing logic is a step away from brittle code and closer to robust, professional craftsmanship. 

Don't let numbers dictate your code; define their purpose and context instead.
		
# Relations 👩‍❤️‍💋‍👨

[Code Smell 158 - Variables not Variable](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20158%20-%20Variables%20not%20Variable/readme.md)

[Code Smell 127 - Mutable Constants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20127%20-%20Mutable%20Constants/readme.md)

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 162 - Too Many Parentheses](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20162%20-%20Too%20Many%20Parentheses/readme.md)

[Code Smell 198 - Hidden Assumptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20198%20-%20Hidden%20Assumptions/readme.md)

[Code Smell 202 - God Constant Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20202%20-%20God%20Constant%20Class/readme.md)

# More Information 📕

[Refactoring Guru](https://refactoring.guru/es/replace-magic-number-with-symbolic-constant)

[How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)

# Credits 🙏

Photo by [Kristopher Roller](https://unsplash.com/@krisroller) on [Unsplash](https://unsplash.com/s/photos/magic)

* * *

> In a purely functional program, the value of a [constant] never changes, and yet, it changes all the time! A paradox!

_Joel Spolsky_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)