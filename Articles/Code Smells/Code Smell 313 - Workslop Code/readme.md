# Code Smell 313 - Workslop Code

![Code Smell 313 - Workslop Code](Code%20Smell%20313%20-%20Workslop%20Code.jpg)

*When AI Fills the Gaps, You Should Think Through*

> TL;DR: Workslop happens when you accept AI-generated code that looks fine but lacks understanding, structure, or purpose.

# Problems 😔

- Hollow logic
- Unclear or ambiguous intent
- Misleading structure
- Disrespect for human fellows
- Missing edge-cases
- Fake productivity
- Technical debt

# Solutions 😃

1. Validate generated logic in [real world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) scenarios
2. Rewrite unclear parts
3. Add domain meaning
4. Refactor the structure for clarity
5. Add a [human peer review](https://learning.oreilly.com/library/view/perform-code-reviews/9781098172657/)
6. Clarify the context

If you want, I can create a full list of 25+ solutions to completely fight workslop in teams and code.

# Refactorings ⚙️

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

[Refactoring 005 - Replace Comment with Function Name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md)

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

[Refactoring 032 - Apply Consistent Style Rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20032%20-%20Apply%20Consistent%20Style%20Rules/readme.md)

[Refactoring 016 - Build With The Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)

# Context 💬

You get "workslop" when you copy AI-generated code without understanding it.

The code compiles, tests pass, and it even looks clean, yet you can’t explain why it works.

You copy and paste code without reviewing it, which often leads to catastrophic failures.

[From Helpful to Harmful: How AI Recommendations Destroyed My OS](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Artificial%20Intelligence/From%20Helpful%20to%20Harmful%20How%20AI%20Recommendations%20Destroyed%20My%20OS/readme.md)

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/0a15900d7bfa2315e7d62d1c07f08d03) -->

```python
def generate_invoice(data):
    if 'discount' in data:
        total = data['amount'] - (data['amount'] * data['discount'])
    else:
        total = data['amount']
    if data['tax']:
        total += total * data['tax']
    return {'invoice': total, 'message': 'success'}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/13da485ef194f7004540cad0ac328970) -->

```python
def calculate_total(amount, discount, tax):
    subtotal = amount - (amount * discount)
    total = subtotal + (subtotal * tax)
    return total

def create_invoice(amount, discount, tax):
    total = calculate_total(amount, discount, tax)
    return {'total': total, 'currency': 'USD'}
```

# Detection 🔍

[X] Manual

You feel like the code "just appeared" instead of being designed.

# Tags 🏷️

- Declarative Code

# Level 🔋

[x] Intermediate

# Why the Bijection Is Important 🗺️

When you let AI generate code without verifying intent, you break the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between your [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) and your model. 

The program stops representing your domain and becomes random syntax that only simulates intelligence.

# AI Generation 🤖

This is a specific AI smell.

AIs can produce large volumes of plausible code with shallow logic.

The result looks professional but lacks cohesion, decisions, or constraints from your actual problem space.

This sometimes happens when [model collapses](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20314%20-%20Model%20Collapse/readme.md).

# AI Detection 🧲
 
You can also use AI-generated code detectors.

AI can highlight missing edge cases, repeated logic, or meaningless names, but it can’t restore the original intent or domain meaning. 

Only you can.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Give more meaning to the code

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+generate_invoice%28data%29%3A%0D%0A++++if+%27discount%27+in+data%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D+-+%28data%5B%27amount%27%5D+%2A+data%5B%27discount%27%5D%29%0D%0A++++else%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D%0D%0A++++if+data%5B%27tax%27%5D%3A%0D%0A++++++++total+%2B%3D+total+%2A+data%5B%27tax%27%5D%0D%0A++++return+%7B%27invoice%27%3A+total%2C+%27message%27%3A+%27success%27%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Give+more+meaning+to+the+code%3A+%60%60%60python%0D%0Adef+generate_invoice%28data%29%3A%0D%0A++++if+%27discount%27+in+data%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D+-+%28data%5B%27amount%27%5D+%2A+data%5B%27discount%27%5D%29%0D%0A++++else%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D%0D%0A++++if+data%5B%27tax%27%5D%3A%0D%0A++++++++total+%2B%3D+total+%2A+data%5B%27tax%27%5D%0D%0A++++return+%7B%27invoice%27%3A+total%2C+%27message%27%3A+%27success%27%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+generate_invoice%28data%29%3A%0D%0A++++if+%27discount%27+in+data%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D+-+%28data%5B%27amount%27%5D+%2A+data%5B%27discount%27%5D%29%0D%0A++++else%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D%0D%0A++++if+data%5B%27tax%27%5D%3A%0D%0A++++++++total+%2B%3D+total+%2A+data%5B%27tax%27%5D%0D%0A++++return+%7B%27invoice%27%3A+total%2C+%27message%27%3A+%27success%27%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Give+more+meaning+to+the+code%3A+%60%60%60python%0D%0Adef+generate_invoice%28data%29%3A%0D%0A++++if+%27discount%27+in+data%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D+-+%28data%5B%27amount%27%5D+%2A+data%5B%27discount%27%5D%29%0D%0A++++else%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D%0D%0A++++if+data%5B%27tax%27%5D%3A%0D%0A++++++++total+%2B%3D+total+%2A+data%5B%27tax%27%5D%0D%0A++++return+%7B%27invoice%27%3A+total%2C+%27message%27%3A+%27success%27%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+generate_invoice%28data%29%3A%0D%0A++++if+%27discount%27+in+data%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D+-+%28data%5B%27amount%27%5D+%2A+data%5B%27discount%27%5D%29%0D%0A++++else%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D%0D%0A++++if+data%5B%27tax%27%5D%3A%0D%0A++++++++total+%2B%3D+total+%2A+data%5B%27tax%27%5D%0D%0A++++return+%7B%27invoice%27%3A+total%2C+%27message%27%3A+%27success%27%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Give+more+meaning+to+the+code%3A+%60%60%60python%0D%0Adef+generate_invoice%28data%29%3A%0D%0A++++if+%27discount%27+in+data%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D+-+%28data%5B%27amount%27%5D+%2A+data%5B%27discount%27%5D%29%0D%0A++++else%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D%0D%0A++++if+data%5B%27tax%27%5D%3A%0D%0A++++++++total+%2B%3D+total+%2A+data%5B%27tax%27%5D%0D%0A++++return+%7B%27invoice%27%3A+total%2C+%27message%27%3A+%27success%27%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+generate_invoice%28data%29%3A%0D%0A++++if+%27discount%27+in+data%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D+-+%28data%5B%27amount%27%5D+%2A+data%5B%27discount%27%5D%29%0D%0A++++else%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D%0D%0A++++if+data%5B%27tax%27%5D%3A%0D%0A++++++++total+%2B%3D+total+%2A+data%5B%27tax%27%5D%0D%0A++++return+%7B%27invoice%27%3A+total%2C+%27message%27%3A+%27success%27%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Give+more+meaning+to+the+code%3A+%60%60%60python%0D%0Adef+generate_invoice%28data%29%3A%0D%0A++++if+%27discount%27+in+data%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D+-+%28data%5B%27amount%27%5D+%2A+data%5B%27discount%27%5D%29%0D%0A++++else%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D%0D%0A++++if+data%5B%27tax%27%5D%3A%0D%0A++++++++total+%2B%3D+total+%2A+data%5B%27tax%27%5D%0D%0A++++return+%7B%27invoice%27%3A+total%2C+%27message%27%3A+%27success%27%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+generate_invoice%28data%29%3A%0D%0A++++if+%27discount%27+in+data%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D+-+%28data%5B%27amount%27%5D+%2A+data%5B%27discount%27%5D%29%0D%0A++++else%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D%0D%0A++++if+data%5B%27tax%27%5D%3A%0D%0A++++++++total+%2B%3D+total+%2A+data%5B%27tax%27%5D%0D%0A++++return+%7B%27invoice%27%3A+total%2C+%27message%27%3A+%27success%27%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Give+more+meaning+to+the+code%3A+%60%60%60python%0D%0Adef+generate_invoice%28data%29%3A%0D%0A++++if+%27discount%27+in+data%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D+-+%28data%5B%27amount%27%5D+%2A+data%5B%27discount%27%5D%29%0D%0A++++else%3A%0D%0A++++++++total+%3D+data%5B%27amount%27%5D%0D%0A++++if+data%5B%27tax%27%5D%3A%0D%0A++++++++total+%2B%3D+total+%2A+data%5B%27tax%27%5D%0D%0A++++return+%7B%27invoice%27%3A+total%2C+%27message%27%3A+%27success%27%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

*Workslop* smells like productivity but rots like negligence.

You protect your craft when you question every line the machine gives you. Think, design, and own your code.

Remember, YOU are accountable for your code. Even if Artificial Intelligence writes it for you.

> Have you noticed the copied and pasted text above?

> *If you want, I can create a full list of 25+ solutions to completely fight workslop in teams and code.*

# Relations 👩‍❤️‍💋‍👨

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 197 - Gratuitous Context](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20197%20-%20Gratuitous%20Context/readme.md)

[Code Smell 273 - Overengineering](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20273%20-%20Overengineering/readme.md)

[Code Smell 238 - Entangled Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20238%20-%20Entangled%20Code/readme.md)

[Code Smell 230 - Schrödinger Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20230%20-%20Schrodinger%20Code/readme.md)

[Code Smell 314 - Model Collapse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20314%20-%20Model%20Collapse/readme.md)

# More Information 📕

[Workslop (in spanish)](https://www.linkedin.com/pulse/workslop-el-impuesto-invisible-c%C3%B3mo-la-ia-mal-usada-te-ernesto-mislej-b0k9f/)

[Harvard Review](https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [ZHENYU LUO](https://unsplash.com/@mrnuclear) on [Unsplash](https://unsplash.com/photos/a-room-with-many-machines-kE0JmtbvXxM)

* * *

> The most disastrous thing you can ever learn is your first programming language.

_Alan Kay_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)