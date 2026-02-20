# Code Smell 17 - Global Functions

![Code Smell 17 - Global Functions](Code%20Smell%2017%20-%20Global%20Functions.jpg)

*Discouraged by Object-Oriented Programming, Many mixed languages support it. And developers abuse them.*

> TL;DR: Global functions bring a lot of coupling. Don't use them.

# Problems 😔 

- Tight Coupling

- Poor Readability

- Maintainability

- Testability

- Hidden side-effects

# Solutions 😃

- Wrap the function in a context object.

# Refactorings ⚙️

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

[Refactoring 010 - Extract Method Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

[Refactoring 020 - Transform Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20020%20-%20Transform%20Static%20Functions/readme.md)

[Refactoring 024 - Replace Global Variables with Dependency Injection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20024%20-%20Replace%20Global%20Variables%20with%20Dependency%20Injection/readme.md)

# Examples

- External Resources Access, Database access, Time and Operating System resources.

# Context 💬

When you place a function in the global scope, you allow any part of your system to access it at any time.

This sounds convenient, but it creates a web of invisible connections. 

If you want to change how that function works, you must check every corner of your application.

This practice also makes testing nearly impossible. 

When a method calls a global function like getSystemTime() or saveToDatabase(), you cannot easily replace that function with a mock or a fake version during a test. 

You end up testing the entire environment instead of just your logic.

# Sample Code 💻

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/4713b63031ad073d46701b7b4c81b028) -->

```php
<?

class Employee {
    function taxesPayedUntilToday() {
        return database()->select(
            "SELECT TAXES FROM EMPLOYEE".
            " WHERE ID = " . $this->id() .
            " AND DATE < " . currentDate());
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/74d9534ee563afc1fdf766b90115fb10) -->

```php
<?

final class EmployeeTaxesCalculator {
    function taxesPayedUntilToday($context) {
        return $context->SelectTaxesForEmployeeUntil(
            $this->ssn,
            $context->currentDate());
    }
}
```

# Detection 🔍

Many modern languages avoid them. For the permissive ones, scope rules can be applied and automatically checked.

# Exceptions 🛑

Some languages use global functions as their core library (like *str_len* in C or some PHP functions). 

In these cases, you might **wrap** them in your own objects to improve testability, but the functions themselves are part of the platform.

# Tags 🏷️

- Globals

# Level 🔋

[x] Beginner

# Why the Bijection Is Important 🗺️

In the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md), objects have responsibilities and specific contexts. 

A Global Function doesn't exist in a real-world simulation because every action belongs to an actor or a component. 

When you use global functions, you break the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between your code and the entities you model. 

You create a God-like action that exists nowhere and everywhere at the same time.

# AI Generation 🤖

AI tools often suggest global functions because they look for the shortest code path. 

They frequently provide [utility](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md) snippets that live in the global scope because they don't know the specific architecture of your project.

# AI Detection 🧲

You can ask an AI to "Refactor these global functions into domain objects" or "Apply dependency injection to remove global scope dependencies." 

Many AI models are very good at identifying which class should own a specific logic.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Take these global functions and group them into logical context objects. Use dependency injection so I can test the classes that use them.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+Employee+%7B%0D%0A++++function+taxesPayedUntilToday%28%29+%7B%0D%0A++++++++return+database%28%29-%3Eselect%28%0D%0A++++++++++++%22SELECT+TAXES+FROM+EMPLOYEE%22.%0D%0A++++++++++++%22+WHERE+ID+%3D+%22+.+%24this-%3Eid%28%29+.%0D%0A++++++++++++%22+AND+DATE+%3C+%22+.+currentDate%28%29%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Take+these+global+functions+and+group+them+into+logical+context+objects.+Use+dependency+injection+so+I+can+test+the+classes+that+use+them.%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+Employee+%7B%0D%0A++++function+taxesPayedUntilToday%28%29+%7B%0D%0A++++++++return+database%28%29-%3Eselect%28%0D%0A++++++++++++%22SELECT+TAXES+FROM+EMPLOYEE%22.%0D%0A++++++++++++%22+WHERE+ID+%3D+%22+.+%24this-%3Eid%28%29+.%0D%0A++++++++++++%22+AND+DATE+%3C+%22+.+currentDate%28%29%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+Employee+%7B%0D%0A++++function+taxesPayedUntilToday%28%29+%7B%0D%0A++++++++return+database%28%29-%3Eselect%28%0D%0A++++++++++++%22SELECT+TAXES+FROM+EMPLOYEE%22.%0D%0A++++++++++++%22+WHERE+ID+%3D+%22+.+%24this-%3Eid%28%29+.%0D%0A++++++++++++%22+AND+DATE+%3C+%22+.+currentDate%28%29%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Take+these+global+functions+and+group+them+into+logical+context+objects.+Use+dependency+injection+so+I+can+test+the+classes+that+use+them.%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+Employee+%7B%0D%0A++++function+taxesPayedUntilToday%28%29+%7B%0D%0A++++++++return+database%28%29-%3Eselect%28%0D%0A++++++++++++%22SELECT+TAXES+FROM+EMPLOYEE%22.%0D%0A++++++++++++%22+WHERE+ID+%3D+%22+.+%24this-%3Eid%28%29+.%0D%0A++++++++++++%22+AND+DATE+%3C+%22+.+currentDate%28%29%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+Employee+%7B%0D%0A++++function+taxesPayedUntilToday%28%29+%7B%0D%0A++++++++return+database%28%29-%3Eselect%28%0D%0A++++++++++++%22SELECT+TAXES+FROM+EMPLOYEE%22.%0D%0A++++++++++++%22+WHERE+ID+%3D+%22+.+%24this-%3Eid%28%29+.%0D%0A++++++++++++%22+AND+DATE+%3C+%22+.+currentDate%28%29%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Take+these+global+functions+and+group+them+into+logical+context+objects.+Use+dependency+injection+so+I+can+test+the+classes+that+use+them.%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+Employee+%7B%0D%0A++++function+taxesPayedUntilToday%28%29+%7B%0D%0A++++++++return+database%28%29-%3Eselect%28%0D%0A++++++++++++%22SELECT+TAXES+FROM+EMPLOYEE%22.%0D%0A++++++++++++%22+WHERE+ID+%3D+%22+.+%24this-%3Eid%28%29+.%0D%0A++++++++++++%22+AND+DATE+%3C+%22+.+currentDate%28%29%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+Employee+%7B%0D%0A++++function+taxesPayedUntilToday%28%29+%7B%0D%0A++++++++return+database%28%29-%3Eselect%28%0D%0A++++++++++++%22SELECT+TAXES+FROM+EMPLOYEE%22.%0D%0A++++++++++++%22+WHERE+ID+%3D+%22+.+%24this-%3Eid%28%29+.%0D%0A++++++++++++%22+AND+DATE+%3C+%22+.+currentDate%28%29%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Take+these+global+functions+and+group+them+into+logical+context+objects.+Use+dependency+injection+so+I+can+test+the+classes+that+use+them.%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+Employee+%7B%0D%0A++++function+taxesPayedUntilToday%28%29+%7B%0D%0A++++++++return+database%28%29-%3Eselect%28%0D%0A++++++++++++%22SELECT+TAXES+FROM+EMPLOYEE%22.%0D%0A++++++++++++%22+WHERE+ID+%3D+%22+.+%24this-%3Eid%28%29+.%0D%0A++++++++++++%22+AND+DATE+%3C+%22+.+currentDate%28%29%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+Employee+%7B%0D%0A++++function+taxesPayedUntilToday%28%29+%7B%0D%0A++++++++return+database%28%29-%3Eselect%28%0D%0A++++++++++++%22SELECT+TAXES+FROM+EMPLOYEE%22.%0D%0A++++++++++++%22+WHERE+ID+%3D+%22+.+%24this-%3Eid%28%29+.%0D%0A++++++++++++%22+AND+DATE+%3C+%22+.+currentDate%28%29%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Take+these+global+functions+and+group+them+into+logical+context+objects.+Use+dependency+injection+so+I+can+test+the+classes+that+use+them.%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+Employee+%7B%0D%0A++++function+taxesPayedUntilToday%28%29+%7B%0D%0A++++++++return+database%28%29-%3Eselect%28%0D%0A++++++++++++%22SELECT+TAXES+FROM+EMPLOYEE%22.%0D%0A++++++++++++%22+WHERE+ID+%3D+%22+.+%24this-%3Eid%28%29+.%0D%0A++++++++++++%22+AND+DATE+%3C+%22+.+currentDate%28%29%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Structured programming considers global functions **harmful**. Yet, we can observe some bad practices cross paradigm boundaries.

- Singleton and Classes are global points of access.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 60 - Global Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2060%20-%20Global%20Classes/readme.md)

[Singleton - The Root of All Evil](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20Root%20of%20All%20Evil/readme.md)

[Code Smell 22 - Helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md)

[Code Smell 209 - Side Effects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20209%20-%20Side%20Effects/readme.md)

# More Information 📕

[Wikipedia](https://en.wikipedia.org/wiki/Global_variable)

# Credits 🙏

Photo by [Mae Mu](https://unsplash.com/@picoftasty) on [Unsplash](https://unsplash.com/s/photos/spaghetti)

* * *

> The road to programming hell is paved with global variables.

_Steve McConnell_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)