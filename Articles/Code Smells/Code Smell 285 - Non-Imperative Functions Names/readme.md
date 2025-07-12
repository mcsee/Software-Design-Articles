# Code Smell 285 - Non-Imperative Functions Names

![Code Smell 285 - Non-Imperative Functions Names](Code%20Smell%20285%20-%20Non-Imperative%20Functions%20Names.jpg)

*Be Imperative!!*

> TL;DR: Functions with unclear names hide intent and confuse readers. Use descriptive, action-oriented names.

# Problems 😔 

- Unclear function purpose
- Increased cognitive load
- Misleading context
- Reduced readability
- Difficult collaboration
- Hidden functionality

# Solutions 😃

1. Use action-oriented verbs
2. Make [names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md) descriptive
3. Reflect the function’s purpose
4. Avoid generic terms
5. Provide meaningful context
6. Express single responsibility clearly
7. Match action to outcome

# Refactorings ⚙️

[Refactoring 005 - Replace Comment with Function Name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md)

# Context 💬

Functions named with generic terms force readers to dive into the implementation to understand their behavior. 

This wastes time and increases the chance of errors. 

[Naming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md) becomes even more critical when working with standalone functions, where the class name doesn't provide additional context.

This issue directly relates to the *Tell, Don’t Ask principle*. 

Instead of exposing ambiguous behaviors that force the caller to infer functionality, imperative names convey the exact action, guiding the reader without needing to inspect the code. 

When you name functions descriptively, you eliminate unnecessary guesswork and align with this principle.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/2a6f11c6af157a4b5025c7e1ca12b8bc) -->

```javascript
public String dateFormatting(Date date) {
    return new SimpleDateFormat("yyyy-MM-dd").format(date);
}

public void load() {
    System.out.println("Loading...");
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/2ea10469fbc891b3a2003e1c308cd3dd) -->

```javascript
public String formatDate(Date date) {
    return new SimpleDateFormat("yyyy-MM-dd").format(date);
}

public void loadUserPreferences() {
    System.out.println("Loading user preferences...");
}
```

# Detection 🔍

[X] Manual

You can detect this smell by reviewing function names that use vague terms like *do*, *run*, *process*, *load*, etc. 

Automated linters can flag these patterns or highlight functions with overly generic names.

# Tags 🏷️

- Naming

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 

Function names should create a clear [one-to-one correspondence]((https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)) between their name and functionality. 

Breaking this [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)  forces developers to examine code details for context, slowing down debugging, reviews, and extensions.

# AI Generation 🤖

AI tools sometimes generate generic function names without understanding your domain. 

When using AI, specify that function names must be descriptive and action-oriented.

# AI Detection 🥃

AI models can help detect ambiguous names by comparing function signatures with predefined naming best practices. 

Combining AI with manual code review yields the best results.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Convert it to more declarative names

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Apublic+String+dateFormatting%28Date+date%29+%7B%0D%0A++++return+new+SimpleDateFormat%28%22yyyy-MM-dd%22%29.format%28date%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+void+load%28%29+%7B%0D%0A++++System.out.println%28%22Loading...%22%29%3B%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Convert+it+to+more+declarative+names%3A+%60%60%60javascript%0D%0Apublic+String+dateFormatting%28Date+date%29+%7B%0D%0A++++return+new+SimpleDateFormat%28%22yyyy-MM-dd%22%29.format%28date%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+void+load%28%29+%7B%0D%0A++++System.out.println%28%22Loading...%22%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Apublic+String+dateFormatting%28Date+date%29+%7B%0D%0A++++return+new+SimpleDateFormat%28%22yyyy-MM-dd%22%29.format%28date%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+void+load%28%29+%7B%0D%0A++++System.out.println%28%22Loading...%22%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Convert+it+to+more+declarative+names%3A+%60%60%60javascript%0D%0Apublic+String+dateFormatting%28Date+date%29+%7B%0D%0A++++return+new+SimpleDateFormat%28%22yyyy-MM-dd%22%29.format%28date%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+void+load%28%29+%7B%0D%0A++++System.out.println%28%22Loading...%22%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Apublic+String+dateFormatting%28Date+date%29+%7B%0D%0A++++return+new+SimpleDateFormat%28%22yyyy-MM-dd%22%29.format%28date%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+void+load%28%29+%7B%0D%0A++++System.out.println%28%22Loading...%22%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Convert+it+to+more+declarative+names%3A+%60%60%60javascript%0D%0Apublic+String+dateFormatting%28Date+date%29+%7B%0D%0A++++return+new+SimpleDateFormat%28%22yyyy-MM-dd%22%29.format%28date%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+void+load%28%29+%7B%0D%0A++++System.out.println%28%22Loading...%22%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Apublic+String+dateFormatting%28Date+date%29+%7B%0D%0A++++return+new+SimpleDateFormat%28%22yyyy-MM-dd%22%29.format%28date%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+void+load%28%29+%7B%0D%0A++++System.out.println%28%22Loading...%22%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Convert+it+to+more+declarative+names%3A+%60%60%60javascript%0D%0Apublic+String+dateFormatting%28Date+date%29+%7B%0D%0A++++return+new+SimpleDateFormat%28%22yyyy-MM-dd%22%29.format%28date%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+void+load%28%29+%7B%0D%0A++++System.out.println%28%22Loading...%22%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Apublic+String+dateFormatting%28Date+date%29+%7B%0D%0A++++return+new+SimpleDateFormat%28%22yyyy-MM-dd%22%29.format%28date%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+void+load%28%29+%7B%0D%0A++++System.out.println%28%22Loading...%22%29%3B%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Convert+it+to+more+declarative+names%3A+%60%60%60javascript%0D%0Apublic+String+dateFormatting%28Date+date%29+%7B%0D%0A++++return+new+SimpleDateFormat%28%22yyyy-MM-dd%22%29.format%28date%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+void+load%28%29+%7B%0D%0A++++System.out.println%28%22Loading...%22%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Function names are not just labels; they are contracts with the reader. 

[Ambiguous names]([https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md) break this contract and lead to confusion. 

Descriptive, action-oriented names simplify communication and make your code easier to maintain and extend.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 33 - Abbreviations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md)

[Code Smell 153 - Too Long Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20153%20-%20Too%20Long%20Names/readme.md)

[Code Smell 38 - Abstract Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2038%20-%20Abstract%20Names/readme.md)

[Code Smell 174 - Class Name in Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20174%20-%20Class%20Name%20in%20Attributes/readme.md)

# See also 📚

[What exactly is a name - Part I The Quest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md)

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits    

Photo by [britishlibrary](https://unsplash.com/@britishlibrary) on [Unsplash](https://unsplash.com/photos/grayscale-photo-of-men-standing-beside-houses-toxJVcTa26k)
  
* * *

> A function name should be a verb or a verb phrase, and it needs to be
meaningful

_Robert C. Martin_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)