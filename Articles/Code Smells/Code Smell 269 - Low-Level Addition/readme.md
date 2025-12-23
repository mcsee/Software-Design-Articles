# Code Smell 269 - Low-Level Addition

![Code Smell 269 - Low-Level Addition](Code%20Smell%20269%20-%20Low-Level%20Addition.jpg)

*Don't care how you do things. Care about what you do*

> TL;DR: Ditch the Loops: Write Cleaner Code with Declarative Style

# Problems 😔 

- Verbose logic
- Repeated patterns
- Readability
- Maintainability

# Solutions 😃

1. Remove loops
2. Simplify logic
3. Write declarative and high-level code

# Context 💬

When summing a collection, you might manually loop through the elements and add each one to a variable. 

This approach works but adds unnecessary lines of code and makes it harder to follow. 

Using language high-level functions, you can make your code shorter, clearer, and less error-prone.

It tells you exactly what the code is doing and not how it is doing it.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/77bb05bc96d301c961d096fa5bbd4687) -->

```python
transaction_values = [10.0, -5.21, 101.32, 1.11, -0.38]
balance = 0
for transaction_value in transaction_values:
    balance += transaction_value
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/1dd5fadc08e94b85be0d1cfca26ce8a6) -->

```python
transactions_values = [10.0, -5.21, 101.32, 1.11, -0.38]
balance = sum(transactions_values)
```

# Detection 🔍

[X] Semi-Automatic 

You can detect this smell when you see explicit loops accumulating a result, especially in simple operations like summing values.  

# Tags 🏷️

- Primitive Obsession

# Level 🔋

[X] Beginner 

# AI Generation 🤖

AI generators can sometimes produce this smell by writing verbose loops instead of using functions like *sum()*.

If you don't specify the need for cleaner, declarative solutions, they might opt for more lines of code.

# AI Detection 🥃

AI systems can easily detect and simplify this smell when you ask them to reduce code complexity with simple instructions to "optimize" or "simplify," most AI tools suggest using *sum()* in this case.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Refactor to higher level functions

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Atransaction_values+%3D+%5B10.0%2C+-5.21%2C+101.32%2C+1.11%2C+-0.38%5D%0D%0Abalance+%3D+0%0D%0Afor+transaction_value+in+transaction_values%3A%0D%0A++++balance+%2B%3D+transaction_value%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Refactor+to+higher+level+functions%3A+%60%60%60python%0D%0Atransaction_values+%3D+%5B10.0%2C+-5.21%2C+101.32%2C+1.11%2C+-0.38%5D%0D%0Abalance+%3D+0%0D%0Afor+transaction_value+in+transaction_values%3A%0D%0A++++balance+%2B%3D+transaction_value%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Atransaction_values+%3D+%5B10.0%2C+-5.21%2C+101.32%2C+1.11%2C+-0.38%5D%0D%0Abalance+%3D+0%0D%0Afor+transaction_value+in+transaction_values%3A%0D%0A++++balance+%2B%3D+transaction_value%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Refactor+to+higher+level+functions%3A+%60%60%60python%0D%0Atransaction_values+%3D+%5B10.0%2C+-5.21%2C+101.32%2C+1.11%2C+-0.38%5D%0D%0Abalance+%3D+0%0D%0Afor+transaction_value+in+transaction_values%3A%0D%0A++++balance+%2B%3D+transaction_value%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Atransaction_values+%3D+%5B10.0%2C+-5.21%2C+101.32%2C+1.11%2C+-0.38%5D%0D%0Abalance+%3D+0%0D%0Afor+transaction_value+in+transaction_values%3A%0D%0A++++balance+%2B%3D+transaction_value%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Refactor+to+higher+level+functions%3A+%60%60%60python%0D%0Atransaction_values+%3D+%5B10.0%2C+-5.21%2C+101.32%2C+1.11%2C+-0.38%5D%0D%0Abalance+%3D+0%0D%0Afor+transaction_value+in+transaction_values%3A%0D%0A++++balance+%2B%3D+transaction_value%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Atransaction_values+%3D+%5B10.0%2C+-5.21%2C+101.32%2C+1.11%2C+-0.38%5D%0D%0Abalance+%3D+0%0D%0Afor+transaction_value+in+transaction_values%3A%0D%0A++++balance+%2B%3D+transaction_value%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Refactor+to+higher+level+functions%3A+%60%60%60python%0D%0Atransaction_values+%3D+%5B10.0%2C+-5.21%2C+101.32%2C+1.11%2C+-0.38%5D%0D%0Abalance+%3D+0%0D%0Afor+transaction_value+in+transaction_values%3A%0D%0A++++balance+%2B%3D+transaction_value%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Atransaction_values+%3D+%5B10.0%2C+-5.21%2C+101.32%2C+1.11%2C+-0.38%5D%0D%0Abalance+%3D+0%0D%0Afor+transaction_value+in+transaction_values%3A%0D%0A++++balance+%2B%3D+transaction_value%0D%0A%60%60%60) | [You](https://you.com/search?q=Refactor+to+higher+level+functions%3A+%60%60%60python%0D%0Atransaction_values+%3D+%5B10.0%2C+-5.21%2C+101.32%2C+1.11%2C+-0.38%5D%0D%0Abalance+%3D+0%0D%0Afor+transaction_value+in+transaction_values%3A%0D%0A++++balance+%2B%3D+transaction_value%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Favoring declarative functions like *sum()* improves readability and reduces potential errors. 

You reduce the need for manual loops and make it easier to maintain. It shows exactly what the code is doing with minimal syntax and clutter.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 53 - Explicit Iteration](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2053%20-%20Explicit%20Iteration/readme.md)

[Code Smell 123 - Mixed 'What' and 'How'](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20123%20-%20Mixed%20'What'%20and%20'How'/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Kati Hoehl](https://unsplash.com/@helenatheactress) on [Unsplash](https://unsplash.com/photos/a-wooden-abacusk-sitting-on-top-of-a-table-next-to-a-plant-i3rBo3b9QbA)
    
* * *

> The most important property of a program is whether it accomplishes the intention of its user.

_C.A.R. Hoare_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)