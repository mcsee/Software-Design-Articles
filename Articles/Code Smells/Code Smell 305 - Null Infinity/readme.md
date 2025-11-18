# Code Smell 305 - Null Infinity

![Code Smell 305 - Null Infinity](Code%20Smell%20305%20-%20Null%20Infinity.jpg)

*To infinity but not beyond*

> TL;DR: Use *Infinity* instead of *None* when looking for minimums

# Problems 😔

- [Accidental IFs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)
- Wrong default
- Bad [polymorphism](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)
- Extra conditions
- Hidden initialization
- Wrong domain [mapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)
- Misleading behavior
- Unnecessary conditionals
- Complex logic
- [Null checks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)
- Error-prone code

# Solutions 😃

1. Remove the [Accidental IFs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)
2. Use *infinite value* (If your language supports it)
3. Remove *None check*
4. Respect [math semantics](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)  and consistency
5. Apply the [null object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20015%20-%20Remove%20NULL/readme.md) pattern
6. Reduce boilerplate, simplifying your code
7. Use float('inf') as base case for minimums ♾️
8. Use float('-inf') as base case for maximums -♾️
9. Remove conditional branches

# Refactorings ⚙️

[Refactoring 014 - Remove IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

[Refactoring 015 - Remove NULL](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20015%20-%20Remove%20NULL/readme.md)

# Context 💬

## Problem 1:

You want to find the greatest number in a list of positive numbers.

You start with 0 and compare.

An amazing [Null Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md). No Accidental IFs involved. Clean code. 👌

## Problem 2:

You want to find the lowest number in a list.

Most beginners start with *None* and check "if current is *None* or x < current".

You don’t need that.

You can start with *float("inf")* ♾️.

It [behaves-as-a](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20125%20-%20'IS-A'%20Relationship/readme.md) a number.

You can compare, sort, and minimize it.

This gives you simpler logic and **polymorphic** code.

The holy grail of behavior.

Polymorphism is the deadliest enemy of accidental IFs.

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/1d662b973019fe705138a02200f7d91c) -->

```python
def find_minimum_price(products):
    min_price = None
    
    for product in products:
        if min_price is None:
            min_price = product.price
        elif product.price < min_price:
            min_price = product.price
    
    return min_price

def find_minimum_in_list(numbers):
    if not numbers:
        return None
    
    minimum = None
    for number in numbers:
        if minimum is None or number < minimum:
            minimum = number
    
    return minimum

# Usage leads to more None checks
prices = [10.5, 8.2, 15.0, 7.8]
min_price = find_minimum_in_list(prices)
if min_price is not None:
    print(f"Minimum price: ${min_price}")
else:
    print("No prices found")
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/6410bb3fceb20ab8a149579182f12158) -->

```python
def find_minimum_price(products):
    min_price = float('inf')
        
    for product in products:
        if product.price < min_price:
            # This is an essential IF, you should not remove it
            min_price = product.price
            # No accidental IF here (if min_price is None:)
    
    return min_price if min_price != float('inf') else None

def find_minimum_in_list(numbers):
    minimum = float('inf')
    
    for number in numbers:
        if number < minimum:
            minimum = number
    
    return minimum if minimum != float('inf') else None

# Cleaner usage - polymorphic behavior
prices = [10.5, 8.2, 15.0, 7.8]
min_price = find_minimum_in_list(prices)
print(f"Minimum price: ${min_price}")
```

# Detection 🔍

[X] Semi-Automatic

You can grep your codebase for *None* inside loops.

If you check against *None* before comparing values, you probably can *smell* it.

# Tags 🏷️

- Null

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️

In math, the identity element for finding a minimum is positive infinity. ♾️

When you use *None*, you break the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

None **is not** a number.

It does not behave as a number; it is not polymorphic with numbers.

It is evil *Null* disguised as *None*.

You must then write special code to treat it.

That breaks the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between your code and math.

When you use float("inf"), you stay close to the real concept.

The code models the domain truthfully.

# AI Generation 🤖

AI models that generate loops often use *None* as the starting point.

They may include unnecessary checks.

This typically occurs when the model attempts to mimic tutorials or is trained with bad code or overly simplified examples.

# AI Detection 🧲

AI can easily detect and fix this issue when you provide clear instructions.

For example

> Use *Infinity* for minimum search initialization

... or

> Apply the null object pattern for mathematical operations.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Use Infinity for minimum search initialization

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+find_minimum_price%28products%29%3A%0D%0A++++min_price+%3D+None%0D%0A++++%0D%0A++++for+product+in+products%3A%0D%0A++++++++if+min_price+is+None%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++++++elif+product.price+%3C+min_price%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++%0D%0A++++return+min_price%0D%0A%0D%0Adef+find_minimum_in_list%28numbers%29%3A%0D%0A++++if+not+numbers%3A%0D%0A++++++++return+None%0D%0A++++%0D%0A++++minimum+%3D+None%0D%0A++++for+number+in+numbers%3A%0D%0A++++++++if+minimum+is+None+or+number+%3C+minimum%3A%0D%0A++++++++++++minimum+%3D+number%0D%0A++++%0D%0A++++return+minimum%0D%0A%0D%0A%23+Usage+leads+to+more+None+checks%0D%0Aprices+%3D+%5B10.5%2C+8.2%2C+15.0%2C+7.8%5D%0D%0Amin_price+%3D+find_minimum_in_list%28prices%29%0D%0Aif+min_price+is+not+None%3A%0D%0A++++print%28f%22Minimum+price%3A+%24%7Bmin_price%7D%22%29%0D%0Aelse%3A%0D%0A++++print%28%22No+prices+found%22%29%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Use+Infinity+for+minimum+search+initialization%3A+%60%60%60python%0D%0Adef+find_minimum_price%28products%29%3A%0D%0A++++min_price+%3D+None%0D%0A++++%0D%0A++++for+product+in+products%3A%0D%0A++++++++if+min_price+is+None%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++++++elif+product.price+%3C+min_price%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++%0D%0A++++return+min_price%0D%0A%0D%0Adef+find_minimum_in_list%28numbers%29%3A%0D%0A++++if+not+numbers%3A%0D%0A++++++++return+None%0D%0A++++%0D%0A++++minimum+%3D+None%0D%0A++++for+number+in+numbers%3A%0D%0A++++++++if+minimum+is+None+or+number+%3C+minimum%3A%0D%0A++++++++++++minimum+%3D+number%0D%0A++++%0D%0A++++return+minimum%0D%0A%0D%0A%23+Usage+leads+to+more+None+checks%0D%0Aprices+%3D+%5B10.5%2C+8.2%2C+15.0%2C+7.8%5D%0D%0Amin_price+%3D+find_minimum_in_list%28prices%29%0D%0Aif+min_price+is+not+None%3A%0D%0A++++print%28f%22Minimum+price%3A+%24%7Bmin_price%7D%22%29%0D%0Aelse%3A%0D%0A++++print%28%22No+prices+found%22%29%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+find_minimum_price%28products%29%3A%0D%0A++++min_price+%3D+None%0D%0A++++%0D%0A++++for+product+in+products%3A%0D%0A++++++++if+min_price+is+None%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++++++elif+product.price+%3C+min_price%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++%0D%0A++++return+min_price%0D%0A%0D%0Adef+find_minimum_in_list%28numbers%29%3A%0D%0A++++if+not+numbers%3A%0D%0A++++++++return+None%0D%0A++++%0D%0A++++minimum+%3D+None%0D%0A++++for+number+in+numbers%3A%0D%0A++++++++if+minimum+is+None+or+number+%3C+minimum%3A%0D%0A++++++++++++minimum+%3D+number%0D%0A++++%0D%0A++++return+minimum%0D%0A%0D%0A%23+Usage+leads+to+more+None+checks%0D%0Aprices+%3D+%5B10.5%2C+8.2%2C+15.0%2C+7.8%5D%0D%0Amin_price+%3D+find_minimum_in_list%28prices%29%0D%0Aif+min_price+is+not+None%3A%0D%0A++++print%28f%22Minimum+price%3A+%24%7Bmin_price%7D%22%29%0D%0Aelse%3A%0D%0A++++print%28%22No+prices+found%22%29%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Use+Infinity+for+minimum+search+initialization%3A+%60%60%60python%0D%0Adef+find_minimum_price%28products%29%3A%0D%0A++++min_price+%3D+None%0D%0A++++%0D%0A++++for+product+in+products%3A%0D%0A++++++++if+min_price+is+None%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++++++elif+product.price+%3C+min_price%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++%0D%0A++++return+min_price%0D%0A%0D%0Adef+find_minimum_in_list%28numbers%29%3A%0D%0A++++if+not+numbers%3A%0D%0A++++++++return+None%0D%0A++++%0D%0A++++minimum+%3D+None%0D%0A++++for+number+in+numbers%3A%0D%0A++++++++if+minimum+is+None+or+number+%3C+minimum%3A%0D%0A++++++++++++minimum+%3D+number%0D%0A++++%0D%0A++++return+minimum%0D%0A%0D%0A%23+Usage+leads+to+more+None+checks%0D%0Aprices+%3D+%5B10.5%2C+8.2%2C+15.0%2C+7.8%5D%0D%0Amin_price+%3D+find_minimum_in_list%28prices%29%0D%0Aif+min_price+is+not+None%3A%0D%0A++++print%28f%22Minimum+price%3A+%24%7Bmin_price%7D%22%29%0D%0Aelse%3A%0D%0A++++print%28%22No+prices+found%22%29%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+find_minimum_price%28products%29%3A%0D%0A++++min_price+%3D+None%0D%0A++++%0D%0A++++for+product+in+products%3A%0D%0A++++++++if+min_price+is+None%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++++++elif+product.price+%3C+min_price%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++%0D%0A++++return+min_price%0D%0A%0D%0Adef+find_minimum_in_list%28numbers%29%3A%0D%0A++++if+not+numbers%3A%0D%0A++++++++return+None%0D%0A++++%0D%0A++++minimum+%3D+None%0D%0A++++for+number+in+numbers%3A%0D%0A++++++++if+minimum+is+None+or+number+%3C+minimum%3A%0D%0A++++++++++++minimum+%3D+number%0D%0A++++%0D%0A++++return+minimum%0D%0A%0D%0A%23+Usage+leads+to+more+None+checks%0D%0Aprices+%3D+%5B10.5%2C+8.2%2C+15.0%2C+7.8%5D%0D%0Amin_price+%3D+find_minimum_in_list%28prices%29%0D%0Aif+min_price+is+not+None%3A%0D%0A++++print%28f%22Minimum+price%3A+%24%7Bmin_price%7D%22%29%0D%0Aelse%3A%0D%0A++++print%28%22No+prices+found%22%29%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Use+Infinity+for+minimum+search+initialization%3A+%60%60%60python%0D%0Adef+find_minimum_price%28products%29%3A%0D%0A++++min_price+%3D+None%0D%0A++++%0D%0A++++for+product+in+products%3A%0D%0A++++++++if+min_price+is+None%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++++++elif+product.price+%3C+min_price%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++%0D%0A++++return+min_price%0D%0A%0D%0Adef+find_minimum_in_list%28numbers%29%3A%0D%0A++++if+not+numbers%3A%0D%0A++++++++return+None%0D%0A++++%0D%0A++++minimum+%3D+None%0D%0A++++for+number+in+numbers%3A%0D%0A++++++++if+minimum+is+None+or+number+%3C+minimum%3A%0D%0A++++++++++++minimum+%3D+number%0D%0A++++%0D%0A++++return+minimum%0D%0A%0D%0A%23+Usage+leads+to+more+None+checks%0D%0Aprices+%3D+%5B10.5%2C+8.2%2C+15.0%2C+7.8%5D%0D%0Amin_price+%3D+find_minimum_in_list%28prices%29%0D%0Aif+min_price+is+not+None%3A%0D%0A++++print%28f%22Minimum+price%3A+%24%7Bmin_price%7D%22%29%0D%0Aelse%3A%0D%0A++++print%28%22No+prices+found%22%29%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+find_minimum_price%28products%29%3A%0D%0A++++min_price+%3D+None%0D%0A++++%0D%0A++++for+product+in+products%3A%0D%0A++++++++if+min_price+is+None%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++++++elif+product.price+%3C+min_price%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++%0D%0A++++return+min_price%0D%0A%0D%0Adef+find_minimum_in_list%28numbers%29%3A%0D%0A++++if+not+numbers%3A%0D%0A++++++++return+None%0D%0A++++%0D%0A++++minimum+%3D+None%0D%0A++++for+number+in+numbers%3A%0D%0A++++++++if+minimum+is+None+or+number+%3C+minimum%3A%0D%0A++++++++++++minimum+%3D+number%0D%0A++++%0D%0A++++return+minimum%0D%0A%0D%0A%23+Usage+leads+to+more+None+checks%0D%0Aprices+%3D+%5B10.5%2C+8.2%2C+15.0%2C+7.8%5D%0D%0Amin_price+%3D+find_minimum_in_list%28prices%29%0D%0Aif+min_price+is+not+None%3A%0D%0A++++print%28f%22Minimum+price%3A+%24%7Bmin_price%7D%22%29%0D%0Aelse%3A%0D%0A++++print%28%22No+prices+found%22%29%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Use+Infinity+for+minimum+search+initialization%3A+%60%60%60python%0D%0Adef+find_minimum_price%28products%29%3A%0D%0A++++min_price+%3D+None%0D%0A++++%0D%0A++++for+product+in+products%3A%0D%0A++++++++if+min_price+is+None%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++++++elif+product.price+%3C+min_price%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++%0D%0A++++return+min_price%0D%0A%0D%0Adef+find_minimum_in_list%28numbers%29%3A%0D%0A++++if+not+numbers%3A%0D%0A++++++++return+None%0D%0A++++%0D%0A++++minimum+%3D+None%0D%0A++++for+number+in+numbers%3A%0D%0A++++++++if+minimum+is+None+or+number+%3C+minimum%3A%0D%0A++++++++++++minimum+%3D+number%0D%0A++++%0D%0A++++return+minimum%0D%0A%0D%0A%23+Usage+leads+to+more+None+checks%0D%0Aprices+%3D+%5B10.5%2C+8.2%2C+15.0%2C+7.8%5D%0D%0Amin_price+%3D+find_minimum_in_list%28prices%29%0D%0Aif+min_price+is+not+None%3A%0D%0A++++print%28f%22Minimum+price%3A+%24%7Bmin_price%7D%22%29%0D%0Aelse%3A%0D%0A++++print%28%22No+prices+found%22%29%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+find_minimum_price%28products%29%3A%0D%0A++++min_price+%3D+None%0D%0A++++%0D%0A++++for+product+in+products%3A%0D%0A++++++++if+min_price+is+None%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++++++elif+product.price+%3C+min_price%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++%0D%0A++++return+min_price%0D%0A%0D%0Adef+find_minimum_in_list%28numbers%29%3A%0D%0A++++if+not+numbers%3A%0D%0A++++++++return+None%0D%0A++++%0D%0A++++minimum+%3D+None%0D%0A++++for+number+in+numbers%3A%0D%0A++++++++if+minimum+is+None+or+number+%3C+minimum%3A%0D%0A++++++++++++minimum+%3D+number%0D%0A++++%0D%0A++++return+minimum%0D%0A%0D%0A%23+Usage+leads+to+more+None+checks%0D%0Aprices+%3D+%5B10.5%2C+8.2%2C+15.0%2C+7.8%5D%0D%0Amin_price+%3D+find_minimum_in_list%28prices%29%0D%0Aif+min_price+is+not+None%3A%0D%0A++++print%28f%22Minimum+price%3A+%24%7Bmin_price%7D%22%29%0D%0Aelse%3A%0D%0A++++print%28%22No+prices+found%22%29%0D%0A%60%60%60) | [You](https://you.com/search?q=Use+Infinity+for+minimum+search+initialization%3A+%60%60%60python%0D%0Adef+find_minimum_price%28products%29%3A%0D%0A++++min_price+%3D+None%0D%0A++++%0D%0A++++for+product+in+products%3A%0D%0A++++++++if+min_price+is+None%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++++++elif+product.price+%3C+min_price%3A%0D%0A++++++++++++min_price+%3D+product.price%0D%0A++++%0D%0A++++return+min_price%0D%0A%0D%0Adef+find_minimum_in_list%28numbers%29%3A%0D%0A++++if+not+numbers%3A%0D%0A++++++++return+None%0D%0A++++%0D%0A++++minimum+%3D+None%0D%0A++++for+number+in+numbers%3A%0D%0A++++++++if+minimum+is+None+or+number+%3C+minimum%3A%0D%0A++++++++++++minimum+%3D+number%0D%0A++++%0D%0A++++return+minimum%0D%0A%0D%0A%23+Usage+leads+to+more+None+checks%0D%0Aprices+%3D+%5B10.5%2C+8.2%2C+15.0%2C+7.8%5D%0D%0Amin_price+%3D+find_minimum_in_list%28prices%29%0D%0Aif+min_price+is+not+None%3A%0D%0A++++print%28f%22Minimum+price%3A+%24%7Bmin_price%7D%22%29%0D%0Aelse%3A%0D%0A++++print%28%22No+prices+found%22%29%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Zero is not the default for everything.

When you want to find a minimum, you should start at infinity.

This clarifies your code, removes conditionals, and provides a better mathematical [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) to math.

Stop treating *None* like a number. *None* is *Null*. And *Null* is [bad](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md).

Infinity is polymorphic and is the [null object for maximum math operations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20126%20-%20Fake%20Null%20Object/readme.md)

Use it.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 125 - 'IS-A' Relationship](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20125%20-%20'IS-A'%20Relationship/readme.md)

[Code Smell 126 - Fake Null Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20126%20-%20Fake%20Null%20Object/readme.md)

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

# More Information 📕

[How to Get Rid of Annoying IFs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Cris Baron](https://unsplash.com/@cris024) on [Unsplash](https://unsplash.com/photos/a-couple-of-people-standing-next-to-each-other-in-the-dark-A18Ub2FbMlE)

* * *

> Code should model the problem, not the solution

_Rich Hickey_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)