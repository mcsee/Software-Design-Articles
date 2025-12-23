# Code Smell 288 - Unthrown Exceptions

![Code Smell 288 - Unthrown Exceptions](Code%20Smell%20288%20-%20Unthrown%20Exceptions.jpg)

*When You Forget to Throw, Your Code Will Blow 💣💥*

> TL;DR: Creating a new exception without throwing it leads to silent failures.

# Problems 😔

- **Silent** failures
- Unhandled errors
- Misleading logic
- Hidden defects
- Hollow [Exceptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2026%20-%20Exceptions%20Polluting/readme.md)

# Solutions 😃

1. Always ensure you **throw exceptions**
2. Check exception usage and catching
3. Test exception paths
4. Use **linters**
5. Avoid creating [unused exceptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2026%20-%20Exceptions%20Polluting/readme.md)

# Context 💬

When you create a new exception but **forget to throw it**, your code might appear to work correctly, but it **silently** ignores critical errors.

Creating exceptions is the same as creating business objects and constructors should not have [**side effects**](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20142%20-%20Queries%20in%20Constructors/readme.md).

Unless you throw them, it is **[dead code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2009%20-%20Dead%20Code/readme.md)**.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/245571d7abd11ef733f02b850be470af) -->

```python
class KlendathuInvasionError(Exception):
    def __init__(self, message):
        self.message = message
    # This is a hollow exception        

def deploy_troops(safe):
    if not safe:
        KlendathuInvasionError("Drop zone is hot!")  
        # Never thrown
    print("Troopers deployed.")

deploy_troops(False)
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/8594a2641887d973c8b7b397d1facdab) -->

```python
class KlendathuInvasionError(Exception):
    def __init__(self, message):
        super().__init__(message)

def deploy_troops(safe):
    if not safe:
        raise Exception("Drop zone is hot!")
    # You throw the exception
    print("Troopers deployed.")

try:
    deploy_troops(False)
except KlendathuInvasionError as e:
    print(f"Abort mission: {e}")
    # You handle the exception
```

# Detection 🔍

You can detect this smell by reviewing your code for instances where you create exceptions but do not raise them.

You can also search for instances where an exception is instantiated but never raised.

Automated linters and static analyzers can flag such issues.

# Tags 🏷️

- Exceptions

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️

An exception represents a [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md) failure inside your program.

If you create an exception but never throw it, your code lies about the presence of an error.

When you fail to throw an exception, you break the [one-to-one](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) correspondence between the real-world problem and its coding representation.

# AI Generation 🤖

AI generators might create this smell if they generate exception-handling code without **ensuring that exceptions are properly raised**.

Always review AI-generated code for proper error handling.

# AI Detection 🦾

AI-based linters can detect this smell by analyzing unreferenced exception instances.

Fixing it requires proper domain knowledge to decide **where to throw the exception**.

## Try Them! 🛞

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: make sure the exception was thrown

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+KlendathuInvasionError%28Exception%29%3A%0D%0A++++def+__init__%28self%2C+message%29%3A%0D%0A++++++++self.message+%3D+message%0D%0A++++%23+This+is+a+hollow+exception++++++++%0D%0A%0D%0Adef+deploy_troops%28safe%29%3A%0D%0A++++if+not+safe%3A%0D%0A++++++++KlendathuInvasionError%28%22Drop+zone+is+hot%21%22%29++%0D%0A++++++++%23+Never+thrown%0D%0A++++print%28%22Troopers+deployed.%22%29%0D%0A%0D%0Adeploy_troops%28False%29%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=make+sure+the+exception+was+thrown%3A+%60%60%60python%0D%0Aclass+KlendathuInvasionError%28Exception%29%3A%0D%0A++++def+__init__%28self%2C+message%29%3A%0D%0A++++++++self.message+%3D+message%0D%0A++++%23+This+is+a+hollow+exception++++++++%0D%0A%0D%0Adef+deploy_troops%28safe%29%3A%0D%0A++++if+not+safe%3A%0D%0A++++++++KlendathuInvasionError%28%22Drop+zone+is+hot%21%22%29++%0D%0A++++++++%23+Never+thrown%0D%0A++++print%28%22Troopers+deployed.%22%29%0D%0A%0D%0Adeploy_troops%28False%29%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+KlendathuInvasionError%28Exception%29%3A%0D%0A++++def+__init__%28self%2C+message%29%3A%0D%0A++++++++self.message+%3D+message%0D%0A++++%23+This+is+a+hollow+exception++++++++%0D%0A%0D%0Adef+deploy_troops%28safe%29%3A%0D%0A++++if+not+safe%3A%0D%0A++++++++KlendathuInvasionError%28%22Drop+zone+is+hot%21%22%29++%0D%0A++++++++%23+Never+thrown%0D%0A++++print%28%22Troopers+deployed.%22%29%0D%0A%0D%0Adeploy_troops%28False%29%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=make+sure+the+exception+was+thrown%3A+%60%60%60python%0D%0Aclass+KlendathuInvasionError%28Exception%29%3A%0D%0A++++def+__init__%28self%2C+message%29%3A%0D%0A++++++++self.message+%3D+message%0D%0A++++%23+This+is+a+hollow+exception++++++++%0D%0A%0D%0Adef+deploy_troops%28safe%29%3A%0D%0A++++if+not+safe%3A%0D%0A++++++++KlendathuInvasionError%28%22Drop+zone+is+hot%21%22%29++%0D%0A++++++++%23+Never+thrown%0D%0A++++print%28%22Troopers+deployed.%22%29%0D%0A%0D%0Adeploy_troops%28False%29%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+KlendathuInvasionError%28Exception%29%3A%0D%0A++++def+__init__%28self%2C+message%29%3A%0D%0A++++++++self.message+%3D+message%0D%0A++++%23+This+is+a+hollow+exception++++++++%0D%0A%0D%0Adef+deploy_troops%28safe%29%3A%0D%0A++++if+not+safe%3A%0D%0A++++++++KlendathuInvasionError%28%22Drop+zone+is+hot%21%22%29++%0D%0A++++++++%23+Never+thrown%0D%0A++++print%28%22Troopers+deployed.%22%29%0D%0A%0D%0Adeploy_troops%28False%29%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=make+sure+the+exception+was+thrown%3A+%60%60%60python%0D%0Aclass+KlendathuInvasionError%28Exception%29%3A%0D%0A++++def+__init__%28self%2C+message%29%3A%0D%0A++++++++self.message+%3D+message%0D%0A++++%23+This+is+a+hollow+exception++++++++%0D%0A%0D%0Adef+deploy_troops%28safe%29%3A%0D%0A++++if+not+safe%3A%0D%0A++++++++KlendathuInvasionError%28%22Drop+zone+is+hot%21%22%29++%0D%0A++++++++%23+Never+thrown%0D%0A++++print%28%22Troopers+deployed.%22%29%0D%0A%0D%0Adeploy_troops%28False%29%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+KlendathuInvasionError%28Exception%29%3A%0D%0A++++def+__init__%28self%2C+message%29%3A%0D%0A++++++++self.message+%3D+message%0D%0A++++%23+This+is+a+hollow+exception++++++++%0D%0A%0D%0Adef+deploy_troops%28safe%29%3A%0D%0A++++if+not+safe%3A%0D%0A++++++++KlendathuInvasionError%28%22Drop+zone+is+hot%21%22%29++%0D%0A++++++++%23+Never+thrown%0D%0A++++print%28%22Troopers+deployed.%22%29%0D%0A%0D%0Adeploy_troops%28False%29%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=make+sure+the+exception+was+thrown%3A+%60%60%60python%0D%0Aclass+KlendathuInvasionError%28Exception%29%3A%0D%0A++++def+__init__%28self%2C+message%29%3A%0D%0A++++++++self.message+%3D+message%0D%0A++++%23+This+is+a+hollow+exception++++++++%0D%0A%0D%0Adef+deploy_troops%28safe%29%3A%0D%0A++++if+not+safe%3A%0D%0A++++++++KlendathuInvasionError%28%22Drop+zone+is+hot%21%22%29++%0D%0A++++++++%23+Never+thrown%0D%0A++++print%28%22Troopers+deployed.%22%29%0D%0A%0D%0Adeploy_troops%28False%29%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Aclass+KlendathuInvasionError%28Exception%29%3A%0D%0A++++def+__init__%28self%2C+message%29%3A%0D%0A++++++++self.message+%3D+message%0D%0A++++%23+This+is+a+hollow+exception++++++++%0D%0A%0D%0Adef+deploy_troops%28safe%29%3A%0D%0A++++if+not+safe%3A%0D%0A++++++++KlendathuInvasionError%28%22Drop+zone+is+hot%21%22%29++%0D%0A++++++++%23+Never+thrown%0D%0A++++print%28%22Troopers+deployed.%22%29%0D%0A%0D%0Adeploy_troops%28False%29%0D%0A%60%60%60) | [You](https://you.com/search?q=make+sure+the+exception+was+thrown%3A+%60%60%60python%0D%0Aclass+KlendathuInvasionError%28Exception%29%3A%0D%0A++++def+__init__%28self%2C+message%29%3A%0D%0A++++++++self.message+%3D+message%0D%0A++++%23+This+is+a+hollow+exception++++++++%0D%0A%0D%0Adef+deploy_troops%28safe%29%3A%0D%0A++++if+not+safe%3A%0D%0A++++++++KlendathuInvasionError%28%22Drop+zone+is+hot%21%22%29++%0D%0A++++++++%23+Never+thrown%0D%0A++++print%28%22Troopers+deployed.%22%29%0D%0A%0D%0Adeploy_troops%28False%29%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Always throw exceptions **immediately** after you create them.

Silent failures can lead to significant issues in your code, making it harder to maintain and debug.

Proper error handling and **good coverage** ensure your code behaves predictably and reliably.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 165 - Empty Exception Blocks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20165%20-%20Empty%20Exception%20Blocks/readme.md)

[Code Smell 26 - Exceptions Polluting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2026%20-%20Exceptions%20Polluting/readme.md)

[Code Smell 142 - Queries in Constructors](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20142%20-%20Queries%20in%20Constructors/readme.md)

[Code Smell 09 - Dead Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2009%20-%20Dead%20Code/readme.md)

[Code Smell 132 - Exception Try Too Broad](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20132%20-%20Exception%20Try%20Too%20Broad/readme.md)

[Code Smell 73 - Exceptions for Expected Cases](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Bethany Reeves](https://unsplash.com/@bethanyreeeves) on [Unsplash](https://unsplash.com/photos/a-rusted-boat-sitting-on-top-of-a-rocky-beach-pRJ3Unwsnjw)

* * *

> Software is like entropy: It is difficult to grasp, weighs nothing, and obeys the Second Law of Thermodynamics; i.e., it always increases.

_Norman Augustine_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)