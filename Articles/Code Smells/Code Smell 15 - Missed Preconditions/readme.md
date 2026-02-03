# Code Smell 15 - Missed Preconditions

![Code Smell 15 - Missed Preconditions](Code%20Smell%2015%20-%20Missed%20Preconditions.jpg)

*Assertions, Preconditions, Postconditions and invariants are our allies to avoid invalid objects. Avoiding them leads to hard-to-find errors.*

> TL;DR: If you turn off your assertions just in production your phone will ring at late hours.

# Problems 😔 

- Consistency
- Contract breaking
- Hard debugging
- Late failures
- Bad cohesion

# Solutions 😃

- Create strong preconditions
- Raise exceptions
- Use [Fail-Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) principle
- Defensive Programming 
- Enforce object invariants
- Avoid [anemic models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)
  
# Refactorings ⚙️

[Refactoring 016 - Build With The Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md)

[Refactoring 035 - Separate Exception Types](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20035%20-%20Separate%20Exception%20Types/readme.md)

# Examples

- Constructors are an excellent [first line of defense](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20016%20-%20Build%20With%20The%20Essence/readme.md).

- [Anemic Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md) lack these rules.

- [DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md) are also a common mistake in the industry.

# Context 💬

You often assume that "someone else" checked the objects before it reached your function. 

This assumption is a trap. When you create objects without enforcing their internal rules, you create "Ghost Constraints." 

These are rules that exist in your mind but not in the code.

If you allow a "User" object to exist without an email or a "Transaction" to have a negative amount, you create a time bomb. 

The error won't happen when you create the object; it will happen much later when you try to use it. 

This makes finding the root cause very difficult. 

You must ensure that once you create an object, it remains valid from the very birth throughout its entire lifecycle.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/61e95b5c7a8d697cb748cd49b43aab90) -->

```python
class Date:
  def __init__(self, day, month, year):
    self.day = day
    self.month = month
    self.year = year

  def setMonth(self, month):
    self.month = month

startDate = Date(3, 11, 2020)
# OK

startDate = Date(31, 11, 2020)
# Should fail

startDate.setMonth(13)
# Should fail
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/b5eebe620b66c510bafe04a7a4f8ef82) -->

```python
class Date:
  def __init__(self, day, month, year):
  	if month > 12:
    	raise Exception("Month should not exceed 12")
    #
    # etc ...
  
    self._day = day
    self._month = month
    self._year = year
 
startDate = Date(3, 11, 2020)
# OK

startDate = Date(31, 11, 2020)
# fails

startDate.setMonth(13)
# fails since invariant makes object immutable
```

# Detection 🔍

- It's difficult to find missing preconditions, as long with assertions and invariants.

# Tags 🏷️

- Fail-Fast

# Level 🔋

[x] Beginner

# Why the Bijection Is Important 🗺️

In the MAPPER, a person cannot have a negative age or an empty name. 

If your code allows these states, you break the bijection. 

When you maintain a strict one-to-one relationship between your business rules and your code, you eliminate a whole category of "impossible" defects.

# AI Generation 🤖

AI generators often create "happy path" code.

They frequently skip validations to keep the examples short and concise. 

You must explicitly ask them to include preconditions.

# AI Detection 🧲

AI tools are great at spotting missing validations. 

If you give them a class and ask "What invariants are missing here?", they usually find the missing edge cases quickly.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Add constructor preconditions to this class to ensure it never enters an invalid state based on real-world constraints. Fail fast if the input is wrong.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+Date%3A%0D%0A++def+__init__%28self%2C+day%2C+month%2C+year%29%3A%0D%0A++++self.day+%3D+day%0D%0A++++self.month+%3D+month%0D%0A++++self.year+%3D+year%0D%0A%0D%0A++def+setMonth%28self%2C+month%29%3A%0D%0A++++self.month+%3D+month%0D%0A%0D%0AstartDate+%3D+Date%283%2C+11%2C+2020%29%0D%0A%23+OK%0D%0A%0D%0AstartDate+%3D+Date%2831%2C+11%2C+2020%29%0D%0A%23+Should+fail%0D%0A%0D%0AstartDate.setMonth%2813%29%0D%0A%23+Should+fail%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Add+constructor+preconditions+to+this+class+to+ensure+it+never+enters+an+invalid+state+based+on+real-world+constraints.+Fail+fast+if+the+input+is+wrong.%3A+%60%60%60python%0D%0Aclass+Date%3A%0D%0A++def+__init__%28self%2C+day%2C+month%2C+year%29%3A%0D%0A++++self.day+%3D+day%0D%0A++++self.month+%3D+month%0D%0A++++self.year+%3D+year%0D%0A%0D%0A++def+setMonth%28self%2C+month%29%3A%0D%0A++++self.month+%3D+month%0D%0A%0D%0AstartDate+%3D+Date%283%2C+11%2C+2020%29%0D%0A%23+OK%0D%0A%0D%0AstartDate+%3D+Date%2831%2C+11%2C+2020%29%0D%0A%23+Should+fail%0D%0A%0D%0AstartDate.setMonth%2813%29%0D%0A%23+Should+fail%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+Date%3A%0D%0A++def+__init__%28self%2C+day%2C+month%2C+year%29%3A%0D%0A++++self.day+%3D+day%0D%0A++++self.month+%3D+month%0D%0A++++self.year+%3D+year%0D%0A%0D%0A++def+setMonth%28self%2C+month%29%3A%0D%0A++++self.month+%3D+month%0D%0A%0D%0AstartDate+%3D+Date%283%2C+11%2C+2020%29%0D%0A%23+OK%0D%0A%0D%0AstartDate+%3D+Date%2831%2C+11%2C+2020%29%0D%0A%23+Should+fail%0D%0A%0D%0AstartDate.setMonth%2813%29%0D%0A%23+Should+fail%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Add+constructor+preconditions+to+this+class+to+ensure+it+never+enters+an+invalid+state+based+on+real-world+constraints.+Fail+fast+if+the+input+is+wrong.%3A+%60%60%60python%0D%0Aclass+Date%3A%0D%0A++def+__init__%28self%2C+day%2C+month%2C+year%29%3A%0D%0A++++self.day+%3D+day%0D%0A++++self.month+%3D+month%0D%0A++++self.year+%3D+year%0D%0A%0D%0A++def+setMonth%28self%2C+month%29%3A%0D%0A++++self.month+%3D+month%0D%0A%0D%0AstartDate+%3D+Date%283%2C+11%2C+2020%29%0D%0A%23+OK%0D%0A%0D%0AstartDate+%3D+Date%2831%2C+11%2C+2020%29%0D%0A%23+Should+fail%0D%0A%0D%0AstartDate.setMonth%2813%29%0D%0A%23+Should+fail%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+Date%3A%0D%0A++def+__init__%28self%2C+day%2C+month%2C+year%29%3A%0D%0A++++self.day+%3D+day%0D%0A++++self.month+%3D+month%0D%0A++++self.year+%3D+year%0D%0A%0D%0A++def+setMonth%28self%2C+month%29%3A%0D%0A++++self.month+%3D+month%0D%0A%0D%0AstartDate+%3D+Date%283%2C+11%2C+2020%29%0D%0A%23+OK%0D%0A%0D%0AstartDate+%3D+Date%2831%2C+11%2C+2020%29%0D%0A%23+Should+fail%0D%0A%0D%0AstartDate.setMonth%2813%29%0D%0A%23+Should+fail%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Add+constructor+preconditions+to+this+class+to+ensure+it+never+enters+an+invalid+state+based+on+real-world+constraints.+Fail+fast+if+the+input+is+wrong.%3A+%60%60%60python%0D%0Aclass+Date%3A%0D%0A++def+__init__%28self%2C+day%2C+month%2C+year%29%3A%0D%0A++++self.day+%3D+day%0D%0A++++self.month+%3D+month%0D%0A++++self.year+%3D+year%0D%0A%0D%0A++def+setMonth%28self%2C+month%29%3A%0D%0A++++self.month+%3D+month%0D%0A%0D%0AstartDate+%3D+Date%283%2C+11%2C+2020%29%0D%0A%23+OK%0D%0A%0D%0AstartDate+%3D+Date%2831%2C+11%2C+2020%29%0D%0A%23+Should+fail%0D%0A%0D%0AstartDate.setMonth%2813%29%0D%0A%23+Should+fail%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+Date%3A%0D%0A++def+__init__%28self%2C+day%2C+month%2C+year%29%3A%0D%0A++++self.day+%3D+day%0D%0A++++self.month+%3D+month%0D%0A++++self.year+%3D+year%0D%0A%0D%0A++def+setMonth%28self%2C+month%29%3A%0D%0A++++self.month+%3D+month%0D%0A%0D%0AstartDate+%3D+Date%283%2C+11%2C+2020%29%0D%0A%23+OK%0D%0A%0D%0AstartDate+%3D+Date%2831%2C+11%2C+2020%29%0D%0A%23+Should+fail%0D%0A%0D%0AstartDate.setMonth%2813%29%0D%0A%23+Should+fail%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Add+constructor+preconditions+to+this+class+to+ensure+it+never+enters+an+invalid+state+based+on+real-world+constraints.+Fail+fast+if+the+input+is+wrong.%3A+%60%60%60python%0D%0Aclass+Date%3A%0D%0A++def+__init__%28self%2C+day%2C+month%2C+year%29%3A%0D%0A++++self.day+%3D+day%0D%0A++++self.month+%3D+month%0D%0A++++self.year+%3D+year%0D%0A%0D%0A++def+setMonth%28self%2C+month%29%3A%0D%0A++++self.month+%3D+month%0D%0A%0D%0AstartDate+%3D+Date%283%2C+11%2C+2020%29%0D%0A%23+OK%0D%0A%0D%0AstartDate+%3D+Date%2831%2C+11%2C+2020%29%0D%0A%23+Should+fail%0D%0A%0D%0AstartDate.setMonth%2813%29%0D%0A%23+Should+fail%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+Date%3A%0D%0A++def+__init__%28self%2C+day%2C+month%2C+year%29%3A%0D%0A++++self.day+%3D+day%0D%0A++++self.month+%3D+month%0D%0A++++self.year+%3D+year%0D%0A%0D%0A++def+setMonth%28self%2C+month%29%3A%0D%0A++++self.month+%3D+month%0D%0A%0D%0AstartDate+%3D+Date%283%2C+11%2C+2020%29%0D%0A%23+OK%0D%0A%0D%0AstartDate+%3D+Date%2831%2C+11%2C+2020%29%0D%0A%23+Should+fail%0D%0A%0D%0AstartDate.setMonth%2813%29%0D%0A%23+Should+fail%0D%0A%60%60%60) | [You](https://you.com/search?q=Add+constructor+preconditions+to+this+class+to+ensure+it+never+enters+an+invalid+state+based+on+real-world+constraints.+Fail+fast+if+the+input+is+wrong.%3A+%60%60%60python%0D%0Aclass+Date%3A%0D%0A++def+__init__%28self%2C+day%2C+month%2C+year%29%3A%0D%0A++++self.day+%3D+day%0D%0A++++self.month+%3D+month%0D%0A++++self.year+%3D+year%0D%0A%0D%0A++def+setMonth%28self%2C+month%29%3A%0D%0A++++self.month+%3D+month%0D%0A%0D%0AstartDate+%3D+Date%283%2C+11%2C+2020%29%0D%0A%23+OK%0D%0A%0D%0AstartDate+%3D+Date%2831%2C+11%2C+2020%29%0D%0A%23+Should+fail%0D%0A%0D%0AstartDate.setMonth%2813%29%0D%0A%23+Should+fail%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Always be explicit on object integrity.

Turn on production assertions. 

Yes, even if it means taking a small performance hit.

Trust me, tracking down object corruption is way harder than preventing it upfront.

Embracing the fail-fast approach isn't just good practice - it's a lifesaver.

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Relations 👩‍❤️‍💋‍👨

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 189 - Not Sanitized Input](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md)

[Code Smell 40 - DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

# More Information 📕

[Object-Oriented Software Construction (by Bertrand Meyer)](https://en.wikipedia.org/wiki/Object-Oriented_Software_Construction)

# Credits 🙏

Photo by [Jonathan Chng](https://unsplash.com/@jon_chng) on [Unsplash](https://unsplash.com/s/photos/running-track)

* * *

> Writing a class without its contract would be similar to producing an engineering component (electrical circuit, VLSI (Very Large Scale Integration) chip, bridge, engine...) without a spec. No professional engineer would even consider the idea.

_Bertrand Meyer_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)