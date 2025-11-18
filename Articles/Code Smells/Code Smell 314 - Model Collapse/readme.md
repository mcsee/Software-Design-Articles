# Code Smell 314 - Model Collapse

![Code Smell 314 - Model Collapse](Code%20Smell%20314%20-%20Model%20Collapse.jpeg)

*When AI assistants repeatedly modify code without human oversight, code quality erodes through accumulated micro-decisions*

> TL;DR: You let repeated AI edits slowly distort your code’s meaning

# Problems 😔

- Unclear intent
- [Naming drift](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)
- Readability
- Lost domain terms
- Duplicated logic
- Generic abstractions
- [Model collapse](https://en.wikipedia.org/wiki/Model_collapse)
- Semantic decay
- Code entropy accumulation
- Lost domain knowledge
- Degraded naming clarity
- Architectural drift
- Code [inbreeding](https://en.wikipedia.org/wiki/Inbreeding)
- [Technical debt](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20179%20-%20Known%20Bugs/readme.md) buildup
- Semantic meaning loss

# Solutions 😃

1. Preserve domain-specific language
2. Review every AI change
3. Write golden tests
4. Introduce [small objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20177%20-%20Missing%20Small%20Objects/readme.md)
5. Reject unclear edits in merge requests and code reviews
6. Fight [workslop code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20313%20-%20Workslop%20Code/readme.md)

# Refactorings ⚙️

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

[Refactoring 032 - Apply Consistent Style Rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20032%20-%20Apply%20Consistent%20Style%20Rules/readme.md)

[Refactoring 016 - Build With The Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)

[Refactoring 011 - Replace Comments with Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md)

# Context 💬

When you let AI assistants modify code repeatedly without critical human review, you create a degradation pattern similar to model collapse in machine learning.

Each iteration introduces small deviations from best practices.

The AI optimizes for immediate problem-solving rather than long-term maintainability.

Variable names become generic.

You use [comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md) as an excuse to replace clear code.

Functions grow longer.

Domain concepts blur into technical implementations.

The codebase transforms into AI slop: technically functional but semantically hollow code.

You request simple changes: rename something, extract something, improve clarity.

Each iteration shifts names, removes nuance, and replaces domain words with generic ones.

Your code no longer accurately reflects the real-world domain.

You lose the shape of the system.

This is slow erosion.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/4b8324539feec8b65b6c0d5c8a4d59b7) -->

```python
def process_data(d, t='standard'):
    """Process customer data"""
    if t == 'standard':
        result = []
        for item in d:
            if item.get('status') == 'active':
                temp = item.copy()
                temp['processed'] = True
                total = 0
                for x in temp.get('items', []):
                    total += x.get('price', 0)
                temp['total'] = total
                result.append(temp)
        return result
    elif t == 'premium':
        result = []
        for item in d:
            if item.get('status') == 'active' and \
               item.get('tier') == 'premium':
                temp = item.copy()
                temp['processed'] = True
                total = 0
                for x in temp.get('items', []):
                    total += x.get('price', 0) * 0.9
                temp['total'] = total
                result.append(temp)
        return result
    return []
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/fcd8185058a26a51e4ec3464a3997790) -->

```python
class CustomerOrder:
    def __init__(self, customer, items, status):
        self._customer = customer
        self._items = items
        self._status = status
    
    def is_active(self):
        return self._status.is_active()
    
    def calculate_total(self):
        return self._customer.apply_pricing_tier(
            sum(item.price() for item in self._items)
        )
    
    def mark_as_processed(self):
        return ProcessedOrder(self, self.calculate_total())

class OrderProcessor:
    def process_active_orders(self, orders):
        return [
            order.mark_as_processed() 
            for order in orders 
            if order.is_active()
        ]
```

# Detection 🔍

[X] Manual

You can detect AI-degraded code by reviewing commit history for patterns: consecutive AI-assisted commits without human refactoring, increasing function length over time, proliferation of generic variable names (data, temp, result, item), growing comment-to-code ratio, and duplicated logic with minor variations.

Code review tools can track these metrics and flag potential degradation.

# Exceptions 🛑

AI assistance remains valuable for boilerplate generation, test case creation, and initial prototyping when you immediately review and refactor the output.

The smell appears when you chain multiple AI modifications without human intervention or when you accept AI suggestions without understanding their implications.

# Tags 🏷️

- Technical Debt

# Level 🔋

[x] Intermediate

# Why the Bijection Is Important 🗺️

Your code should maintain a clear [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between domain concepts in the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) and your implementation.

When AI assistants modify code without understanding your domain, they break this mapping.

A "Customer" becomes "data", an "Order" becomes "item", and "apply pricing tier" becomes "calculate total with discount".

You lose the vocabulary that connects your code to business reality.

Each AI iteration moves further from domain language toward generic programming constructs, making the code harder to understand and maintain.

# AI Generation 🤖

AI generators frequently create this smell when you prompt them to modify existing code multiple times.

Each interaction optimizes for the immediate request without considering the cumulative architectural impact.

The AI suggests quick fixes that work but don't align with your codebase's design patterns or domain model.

AI assistants tend to replace domain language with generic language.

They optimize for pattern consistency instead of meaning.

They smooth away intent.

# AI Detection 🧲

AI can address this issue if you instruct it to restore domain terms and request that it explain its naming choices.

*You* are accountable for the work you delegate to the AI, and *you* must approve every change.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: "Review this code for domain clarity. Replace generic names with domain concepts. Extract duplicated logic into cohesive objects. Ensure each class and method represents a clear business concept. Show me the domain model this code implements."

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+process_data%28d%2C+t%3D%27standard%27%29%3A%0D%0A++++%22%22%22Process+customer+data%22%22%22%0D%0A++++if+t+%3D%3D+%27standard%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++elif+t+%3D%3D+%27premium%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27+and+%5C%0D%0A+++++++++++++++item.get%28%27tier%27%29+%3D%3D+%27premium%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29+%2A+0.9%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++return+%5B%5D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=%22Review+this+code+for+domain+clarity.+Replace+generic+names+with+domain+concepts.+Extract+duplicated+logic+into+cohesive+objects.+Ensure+each+class+and+method+represents+a+clear+business+concept.+Show+me+the+domain+model+this+code+implements.%22%3A+%60%60%60python%0D%0Adef+process_data%28d%2C+t%3D%27standard%27%29%3A%0D%0A++++%22%22%22Process+customer+data%22%22%22%0D%0A++++if+t+%3D%3D+%27standard%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++elif+t+%3D%3D+%27premium%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27+and+%5C%0D%0A+++++++++++++++item.get%28%27tier%27%29+%3D%3D+%27premium%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29+%2A+0.9%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++return+%5B%5D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+process_data%28d%2C+t%3D%27standard%27%29%3A%0D%0A++++%22%22%22Process+customer+data%22%22%22%0D%0A++++if+t+%3D%3D+%27standard%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++elif+t+%3D%3D+%27premium%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27+and+%5C%0D%0A+++++++++++++++item.get%28%27tier%27%29+%3D%3D+%27premium%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29+%2A+0.9%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++return+%5B%5D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=%22Review+this+code+for+domain+clarity.+Replace+generic+names+with+domain+concepts.+Extract+duplicated+logic+into+cohesive+objects.+Ensure+each+class+and+method+represents+a+clear+business+concept.+Show+me+the+domain+model+this+code+implements.%22%3A+%60%60%60python%0D%0Adef+process_data%28d%2C+t%3D%27standard%27%29%3A%0D%0A++++%22%22%22Process+customer+data%22%22%22%0D%0A++++if+t+%3D%3D+%27standard%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++elif+t+%3D%3D+%27premium%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27+and+%5C%0D%0A+++++++++++++++item.get%28%27tier%27%29+%3D%3D+%27premium%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29+%2A+0.9%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++return+%5B%5D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+process_data%28d%2C+t%3D%27standard%27%29%3A%0D%0A++++%22%22%22Process+customer+data%22%22%22%0D%0A++++if+t+%3D%3D+%27standard%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++elif+t+%3D%3D+%27premium%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27+and+%5C%0D%0A+++++++++++++++item.get%28%27tier%27%29+%3D%3D+%27premium%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29+%2A+0.9%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++return+%5B%5D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=%22Review+this+code+for+domain+clarity.+Replace+generic+names+with+domain+concepts.+Extract+duplicated+logic+into+cohesive+objects.+Ensure+each+class+and+method+represents+a+clear+business+concept.+Show+me+the+domain+model+this+code+implements.%22%3A+%60%60%60python%0D%0Adef+process_data%28d%2C+t%3D%27standard%27%29%3A%0D%0A++++%22%22%22Process+customer+data%22%22%22%0D%0A++++if+t+%3D%3D+%27standard%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++elif+t+%3D%3D+%27premium%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27+and+%5C%0D%0A+++++++++++++++item.get%28%27tier%27%29+%3D%3D+%27premium%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29+%2A+0.9%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++return+%5B%5D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+process_data%28d%2C+t%3D%27standard%27%29%3A%0D%0A++++%22%22%22Process+customer+data%22%22%22%0D%0A++++if+t+%3D%3D+%27standard%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++elif+t+%3D%3D+%27premium%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27+and+%5C%0D%0A+++++++++++++++item.get%28%27tier%27%29+%3D%3D+%27premium%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29+%2A+0.9%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++return+%5B%5D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=%22Review+this+code+for+domain+clarity.+Replace+generic+names+with+domain+concepts.+Extract+duplicated+logic+into+cohesive+objects.+Ensure+each+class+and+method+represents+a+clear+business+concept.+Show+me+the+domain+model+this+code+implements.%22%3A+%60%60%60python%0D%0Adef+process_data%28d%2C+t%3D%27standard%27%29%3A%0D%0A++++%22%22%22Process+customer+data%22%22%22%0D%0A++++if+t+%3D%3D+%27standard%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++elif+t+%3D%3D+%27premium%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27+and+%5C%0D%0A+++++++++++++++item.get%28%27tier%27%29+%3D%3D+%27premium%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29+%2A+0.9%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++return+%5B%5D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+process_data%28d%2C+t%3D%27standard%27%29%3A%0D%0A++++%22%22%22Process+customer+data%22%22%22%0D%0A++++if+t+%3D%3D+%27standard%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++elif+t+%3D%3D+%27premium%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27+and+%5C%0D%0A+++++++++++++++item.get%28%27tier%27%29+%3D%3D+%27premium%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29+%2A+0.9%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++return+%5B%5D%0D%0A%60%60%60) | [You](https://you.com/search?q=%22Review+this+code+for+domain+clarity.+Replace+generic+names+with+domain+concepts.+Extract+duplicated+logic+into+cohesive+objects.+Ensure+each+class+and+method+represents+a+clear+business+concept.+Show+me+the+domain+model+this+code+implements.%22%3A+%60%60%60python%0D%0Adef+process_data%28d%2C+t%3D%27standard%27%29%3A%0D%0A++++%22%22%22Process+customer+data%22%22%22%0D%0A++++if+t+%3D%3D+%27standard%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++elif+t+%3D%3D+%27premium%27%3A%0D%0A++++++++result+%3D+%5B%5D%0D%0A++++++++for+item+in+d%3A%0D%0A++++++++++++if+item.get%28%27status%27%29+%3D%3D+%27active%27+and+%5C%0D%0A+++++++++++++++item.get%28%27tier%27%29+%3D%3D+%27premium%27%3A%0D%0A++++++++++++++++temp+%3D+item.copy%28%29%0D%0A++++++++++++++++temp%5B%27processed%27%5D+%3D+True%0D%0A++++++++++++++++total+%3D+0%0D%0A++++++++++++++++for+x+in+temp.get%28%27items%27%2C+%5B%5D%29%3A%0D%0A++++++++++++++++++++total+%2B%3D+x.get%28%27price%27%2C+0%29+%2A+0.9%0D%0A++++++++++++++++temp%5B%27total%27%5D+%3D+total%0D%0A++++++++++++++++result.append%28temp%29%0D%0A++++++++return+result%0D%0A++++return+%5B%5D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

The "Habsburg problem" analogy in AI, also called "Habsburg AI," refers to how AI models can degrade when repeatedly  trained on content generated primarily by other AI models, like the [inbreeding](https://en.wikipedia.org/wiki/Inbreeding) issues suffered by the Habsburg royal family.

This causes a loss of diversity and robustness in the AI's outputs, eventually leading AI's responses to become progressively worse or semantically hollow.

You must actively review and refactor AI-generated code to maintain quality.

Treat AI assistants as junior developers whose work requires supervision.

Each AI suggestion should strengthen your domain model, not weaken it. When you notice generic patterns replacing domain language, stop and refactor.

Your code's long-term maintainability depends on preserving the connection between business concepts and implementation.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 313 - Workslop Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20313%20-%20Workslop%20Code/readme.md)

[Code Smell 144 - Fungible Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20144%20-%20Fungible%20Objects/readme.md)

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 43 - Concrete Classes Subclassified](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2043%20-%20Concrete%20Classes%20Subclassified/readme.md)

[Code Smell 46 - Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)

[Code Smell 48 - Code Without Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

[Code Smell 38 - Abstract Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2038%20-%20Abstract%20Names/readme.md)

[Code Smell 175 - Changes Without Coverage](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20175%20-%20Changes%20Without%20Coverage/readme.md)

[Code Smell 227 - Cowboy Coding](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20227%20-%20Cowboy%20Coding/readme.md)

# More Information 📕

[Model Collapse from Wikipedia](https://en.wikipedia.org/wiki/Model_collapse)

[House of Hausburg from Wikipedia](https://en.wikipedia.org/wiki/House_of_Habsburg#Habsburg_inbreeding_and_extinction_of_the_male_lines)

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

* * *

> Code is design

_Ward Cunningham_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)