# Code Smell 05 - Comment Abusers

![Code Smell 05 - Comment Abusers](Code%20Smell%2005%20-%20Comment%20Abusers.jpg)

*The code has lots of comments. Comments are coupled to implementation and hardly maintained.*

> TL;DR: Leave comments just for important design decisions. Don't explain the obvious.

# Problems 😔 

- Maintainability

- Obsolete Documentation

- Readability

- Duplication between code and comments

# Solutions 😃

1) Refactor methods.

2) Rename methods with more declarative names.

3) Break down large methods.

4) If a comment describes what a method does, [name the method with this description](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md).

5) Just comment on important design decisions.

[What Exactly Is a Name? Part I: The Quest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20Exactly%20Is%20a%20Name%20-%20Part%20I%20The%20Quest/readme.md)

# Refactorings ⚙️

[Refactoring 005 - Replace Comment with Function Name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md)

[Refactoring 011 - Replace Comments with Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md)

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Examples 📚

- Libraries

- Class Comments

- Method Comments

# Context 💬

You write comments when you feel your code doesn't speak by itself. 

Most of the time, you add noise instead of clarity.  

Later, those comments lie when you change the code but forget to update the explanation. 

Instead of helping, they hurt.  

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/4fb1f04c950ece88450fec59ed6a827b) -->

```php
<?

final class ChatBotConnectionHelper {
    // ChatBotConnectionHelper is used
    // to create connection strings to Bot Platform
    // Use this class with getString() function
    // to get connection string to platform

    function getString() {
        // Get Connection String from Chatbot
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/698102c04428aec69356cad26d4c50cd) -->

```php
<?

final class ChatBotConnectionSequenceGenerator {

    function connectionSequence() {
    }
}
```

# Detection 🔍

[X] Semi-Automatic

Linters can detect comments and check the ratio of comments to lines of code against a predefined threshold.

# Tags 🏷️

- Comments

# Level 🔋

[X] Beginner 

# Why the Bijection Is Important 🗺️

Your software should reflect the domain with no translators in between.

When you use comments as crutches, you break the one-to-one mapping between the real-world concept and its code representation.

This mismatch creates confusion and [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md).

# AI Generation 🤖

AI tools often generate comments to explain code in natural language.

This can pollute your source when the code already speaks for itself.

# AI Detection 🧲

AI tools can easily remove redundant comments and suggest clearer names.

You only need to instruct them to "remove obvious comments and refactor for clarity."

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: correct=Remove all Comments

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afinal+class+ChatBotConnectionHelper+%7B%0D%0A++++%2F%2F+ChatBotConnectionHelper+is+used%0D%0A++++%2F%2F+to+create+connection+strings+to+Bot+Platform%0D%0A++++%2F%2F+Use+this+class+with+getString%28%29+function%0D%0A++++%2F%2F+to+get+connection+string+to+platform%0D%0A%0D%0A++++function+getString%28%29+%7B%0D%0A++++++++%2F%2F+Get+Connection+String+from+Chatbot%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=correct%3DRemove+all+Comments%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afinal+class+ChatBotConnectionHelper+%7B%0D%0A++++%2F%2F+ChatBotConnectionHelper+is+used%0D%0A++++%2F%2F+to+create+connection+strings+to+Bot+Platform%0D%0A++++%2F%2F+Use+this+class+with+getString%28%29+function%0D%0A++++%2F%2F+to+get+connection+string+to+platform%0D%0A%0D%0A++++function+getString%28%29+%7B%0D%0A++++++++%2F%2F+Get+Connection+String+from+Chatbot%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afinal+class+ChatBotConnectionHelper+%7B%0D%0A++++%2F%2F+ChatBotConnectionHelper+is+used%0D%0A++++%2F%2F+to+create+connection+strings+to+Bot+Platform%0D%0A++++%2F%2F+Use+this+class+with+getString%28%29+function%0D%0A++++%2F%2F+to+get+connection+string+to+platform%0D%0A%0D%0A++++function+getString%28%29+%7B%0D%0A++++++++%2F%2F+Get+Connection+String+from+Chatbot%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=correct%3DRemove+all+Comments%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afinal+class+ChatBotConnectionHelper+%7B%0D%0A++++%2F%2F+ChatBotConnectionHelper+is+used%0D%0A++++%2F%2F+to+create+connection+strings+to+Bot+Platform%0D%0A++++%2F%2F+Use+this+class+with+getString%28%29+function%0D%0A++++%2F%2F+to+get+connection+string+to+platform%0D%0A%0D%0A++++function+getString%28%29+%7B%0D%0A++++++++%2F%2F+Get+Connection+String+from+Chatbot%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afinal+class+ChatBotConnectionHelper+%7B%0D%0A++++%2F%2F+ChatBotConnectionHelper+is+used%0D%0A++++%2F%2F+to+create+connection+strings+to+Bot+Platform%0D%0A++++%2F%2F+Use+this+class+with+getString%28%29+function%0D%0A++++%2F%2F+to+get+connection+string+to+platform%0D%0A%0D%0A++++function+getString%28%29+%7B%0D%0A++++++++%2F%2F+Get+Connection+String+from+Chatbot%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=correct%3DRemove+all+Comments%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afinal+class+ChatBotConnectionHelper+%7B%0D%0A++++%2F%2F+ChatBotConnectionHelper+is+used%0D%0A++++%2F%2F+to+create+connection+strings+to+Bot+Platform%0D%0A++++%2F%2F+Use+this+class+with+getString%28%29+function%0D%0A++++%2F%2F+to+get+connection+string+to+platform%0D%0A%0D%0A++++function+getString%28%29+%7B%0D%0A++++++++%2F%2F+Get+Connection+String+from+Chatbot%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afinal+class+ChatBotConnectionHelper+%7B%0D%0A++++%2F%2F+ChatBotConnectionHelper+is+used%0D%0A++++%2F%2F+to+create+connection+strings+to+Bot+Platform%0D%0A++++%2F%2F+Use+this+class+with+getString%28%29+function%0D%0A++++%2F%2F+to+get+connection+string+to+platform%0D%0A%0D%0A++++function+getString%28%29+%7B%0D%0A++++++++%2F%2F+Get+Connection+String+from+Chatbot%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=correct%3DRemove+all+Comments%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afinal+class+ChatBotConnectionHelper+%7B%0D%0A++++%2F%2F+ChatBotConnectionHelper+is+used%0D%0A++++%2F%2F+to+create+connection+strings+to+Bot+Platform%0D%0A++++%2F%2F+Use+this+class+with+getString%28%29+function%0D%0A++++%2F%2F+to+get+connection+string+to+platform%0D%0A%0D%0A++++function+getString%28%29+%7B%0D%0A++++++++%2F%2F+Get+Connection+String+from+Chatbot%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afinal+class+ChatBotConnectionHelper+%7B%0D%0A++++%2F%2F+ChatBotConnectionHelper+is+used%0D%0A++++%2F%2F+to+create+connection+strings+to+Bot+Platform%0D%0A++++%2F%2F+Use+this+class+with+getString%28%29+function%0D%0A++++%2F%2F+to+get+connection+string+to+platform%0D%0A%0D%0A++++function+getString%28%29+%7B%0D%0A++++++++%2F%2F+Get+Connection+String+from+Chatbot%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=correct%3DRemove+all+Comments%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afinal+class+ChatBotConnectionHelper+%7B%0D%0A++++%2F%2F+ChatBotConnectionHelper+is+used%0D%0A++++%2F%2F+to+create+connection+strings+to+Bot+Platform%0D%0A++++%2F%2F+Use+this+class+with+getString%28%29+function%0D%0A++++%2F%2F+to+get+connection+string+to+platform%0D%0A%0D%0A++++function+getString%28%29+%7B%0D%0A++++++++%2F%2F+Get+Connection+String+from+Chatbot%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Leave comments just for important design decisions. Don't comment on a method with a bad name, rename it.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 75 - Comments Inside a Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2075%20-%20Comments%20Inside%20a%20Method/readme.md)

[Code Smell 57 - Versioned Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2057%20-%20Versioned%20Functions/readme.md)

[Code Smell 168 - Undocumented Decisions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20168%20-%20Undocumented%20Decisions/readme.md)

[Code Smell 151 - Commented Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20151%20-%20Commented%20Code/readme.md)

[Code Smell 183 - Obsolete Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md)

[Code Smell 146 - Getter Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20146%20-%20Getter%20Comments/readme.md)

# More Information 📕

[Refactoring Guru](https://refactoring.guru/es/smells/comments)

[What is in a name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20Exactly%20Is%20a%20Name%20-%20Part%20I%20The%20Quest/readme.md)

[Comments as a bad sign](https://dev.to/alexbunardzic/code-comments-are-a-sign-that-something-s-off-19e1)

[How to comment your code](https://arter.dev/how-to-comment-your-code-like-a-boss)

# Credits 

Photo by [Volodymyr Hryshchenko](https://unsplash.com/@lunarts) on [Unsplash](https://unsplash.com/s/photos/chat)

* * *

> If you have to spend effort looking at a fragment of code and figuring out what it’s doing, then you should extract it into a function and name the function after the what.

_Martin Fowler_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)