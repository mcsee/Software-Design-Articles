# Code Smell 310 - Vague Date Naming

![Code Smell 310 - Vague Date Naming](Code%20Smell%20310%20-%20Vague%20Date%20Naming.jpg) 

*When 'date' doesn't tell you what you need to know*

> TL;DR: Use descriptive date names that reveal their role and business purpose instead of generic "date" labels.

# Problems 😔

- Unclear purpose
- Maintenance nightmares
- Poor readability
- Debugging confusion
- [Names suggesting types](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2065%20-%20Variables%20Named%20after%20Types/readme.md)
- Vague and [short](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md) names
- Hidden intent
- Wrong context
- Extra guessing
- Hard search
- Misleading reuse
- Ambiguous purpose
- Reduced readability
- Misinterpretation risk

# Solutions 😃

1. Use descriptive names
2. Reveal business intent
3. Keep names [consistent](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)
4. Follow the domain language
5. Add semantic meaning
6. Improve code clarity
7. Add context words
8. Avoid generic terms
9. [Replace comment with better names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md)

# Refactorings ⚙️

[Rename Method](https://refactoring.guru/rename-method)

[Refactoring 005 - Replace Comment with Function Name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md)

# Context 💬

When you work with dates in your applications, you often encounter variables, methods, or attributes simply named 'date'.

This generic naming forces other developers (including your future self) to dig through the code context to understand what the date represents.

Does it track creation time? Publication date? Expiration date? Last modification date?

The ambiguity creates maintenance overhead and increases the likelihood of defects when you mix up different date purposes.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/893e84070f24f645db20d4f74d358bdf) -->

```dart
class Article {
  final DateTime date;
  final String title;
  final String content;

  Article({
    required this.date,
    required this.title,
    required this.content,
  });
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/314166c97119e52d03ae87e4e8d2eb0c) -->

```dart
class Article {
  final DateTime publishDate;
  final String title;
  final String content;

  Article({
    required this.publishDate,
    required this.title,
    required this.content,
  });
}
```

# Detection 🔍

[X] Semi-Automatic

You can detect this smell when you see variables, methods, or properties named generically as "date," "time," "timestamp," or similar non-descriptive temporal names.

Look for methods that manipulate dates without clearly indicating which date they affect.

Code review tools and static analysis can flag generic naming patterns; however, manual inspection often reveals the business context more effectively.

Comments explaining what a date represents are also worth searching for.

Multiple date fields with numeric suffixes (date1, date2) are another hint.

# Exceptions 🛑

Sometimes you work with truly generic date utilities or abstract interfaces where the specific date purpose varies by implementation.

In these rare cases, generic naming might be appropriate, but you should document the expected semantics clearly.

# Tags 🏷️

- Naming

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️

Your code should maintain a clear one-to-one correspondence between real-world concepts and their programmatic representations.

When you name a date generically, you break this bijection by forcing readers to infer the real-world meaning from context.

In the real world, dates have specific purposes: publication dates, creation dates, expiration dates, and birthdates.

Your code should reflect these distinct concepts directly through naming, creating an unambiguous mapping between domain concepts and code elements

A *publishDate* corresponds to an actual publishing date in life.

If you use *date*, you break this [mapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

# AI Generation 🤖

AI code generators frequently create this smell because they default to generic naming patterns when they lack specific business context. They often suggest "date" as a safe, universal name without considering the domain-specific purpose of the temporal data.

Some AI generators create this smell because they favor brevity, naming it *date* instead of clarifying its role.

# AI Detection 🧲

AI tools can easily identify and fix this smell when you provide clear instructions about the business domain and the specific purpose of each date attribute and method.

Modern AI assistants excel at suggesting contextually appropriate names when provided with adequate domain-specific information.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: replace any generic date/time variable names with descriptive names that clearly indicate their business purpose. For each date field, consider what specific moment or event it represents in the domain (creation, publication, expiration, last access, etc.) and name it accordingly

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60dart%0D%0Aclass+Article+%7B%0D%0A++final+DateTime+date%3B%0D%0A++final+String+title%3B%0D%0A++final+String+content%3B%0D%0A%0D%0A++Article%28%7B%0D%0A++++required+this.date%2C%0D%0A++++required+this.title%2C%0D%0A++++required+this.content%2C%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=replace+any+generic+date%2Ftime+variable+names+with+descriptive+names+that+clearly+indicate+their+business+purpose.+For+each+date+field%2C+consider+what+specific+moment+or+event+it+represents+in+the+domain+%28creation%2C+publication%2C+expiration%2C+last+access%2C+etc.%29+and+name+it+accordingly%3A+%60%60%60dart%0D%0Aclass+Article+%7B%0D%0A++final+DateTime+date%3B%0D%0A++final+String+title%3B%0D%0A++final+String+content%3B%0D%0A%0D%0A++Article%28%7B%0D%0A++++required+this.date%2C%0D%0A++++required+this.title%2C%0D%0A++++required+this.content%2C%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60dart%0D%0Aclass+Article+%7B%0D%0A++final+DateTime+date%3B%0D%0A++final+String+title%3B%0D%0A++final+String+content%3B%0D%0A%0D%0A++Article%28%7B%0D%0A++++required+this.date%2C%0D%0A++++required+this.title%2C%0D%0A++++required+this.content%2C%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=replace+any+generic+date%2Ftime+variable+names+with+descriptive+names+that+clearly+indicate+their+business+purpose.+For+each+date+field%2C+consider+what+specific+moment+or+event+it+represents+in+the+domain+%28creation%2C+publication%2C+expiration%2C+last+access%2C+etc.%29+and+name+it+accordingly%3A+%60%60%60dart%0D%0Aclass+Article+%7B%0D%0A++final+DateTime+date%3B%0D%0A++final+String+title%3B%0D%0A++final+String+content%3B%0D%0A%0D%0A++Article%28%7B%0D%0A++++required+this.date%2C%0D%0A++++required+this.title%2C%0D%0A++++required+this.content%2C%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60dart%0D%0Aclass+Article+%7B%0D%0A++final+DateTime+date%3B%0D%0A++final+String+title%3B%0D%0A++final+String+content%3B%0D%0A%0D%0A++Article%28%7B%0D%0A++++required+this.date%2C%0D%0A++++required+this.title%2C%0D%0A++++required+this.content%2C%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=replace+any+generic+date%2Ftime+variable+names+with+descriptive+names+that+clearly+indicate+their+business+purpose.+For+each+date+field%2C+consider+what+specific+moment+or+event+it+represents+in+the+domain+%28creation%2C+publication%2C+expiration%2C+last+access%2C+etc.%29+and+name+it+accordingly%3A+%60%60%60dart%0D%0Aclass+Article+%7B%0D%0A++final+DateTime+date%3B%0D%0A++final+String+title%3B%0D%0A++final+String+content%3B%0D%0A%0D%0A++Article%28%7B%0D%0A++++required+this.date%2C%0D%0A++++required+this.title%2C%0D%0A++++required+this.content%2C%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60dart%0D%0Aclass+Article+%7B%0D%0A++final+DateTime+date%3B%0D%0A++final+String+title%3B%0D%0A++final+String+content%3B%0D%0A%0D%0A++Article%28%7B%0D%0A++++required+this.date%2C%0D%0A++++required+this.title%2C%0D%0A++++required+this.content%2C%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=replace+any+generic+date%2Ftime+variable+names+with+descriptive+names+that+clearly+indicate+their+business+purpose.+For+each+date+field%2C+consider+what+specific+moment+or+event+it+represents+in+the+domain+%28creation%2C+publication%2C+expiration%2C+last+access%2C+etc.%29+and+name+it+accordingly%3A+%60%60%60dart%0D%0Aclass+Article+%7B%0D%0A++final+DateTime+date%3B%0D%0A++final+String+title%3B%0D%0A++final+String+content%3B%0D%0A%0D%0A++Article%28%7B%0D%0A++++required+this.date%2C%0D%0A++++required+this.title%2C%0D%0A++++required+this.content%2C%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60dart%0D%0Aclass+Article+%7B%0D%0A++final+DateTime+date%3B%0D%0A++final+String+title%3B%0D%0A++final+String+content%3B%0D%0A%0D%0A++Article%28%7B%0D%0A++++required+this.date%2C%0D%0A++++required+this.title%2C%0D%0A++++required+this.content%2C%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=replace+any+generic+date%2Ftime+variable+names+with+descriptive+names+that+clearly+indicate+their+business+purpose.+For+each+date+field%2C+consider+what+specific+moment+or+event+it+represents+in+the+domain+%28creation%2C+publication%2C+expiration%2C+last+access%2C+etc.%29+and+name+it+accordingly%3A+%60%60%60dart%0D%0Aclass+Article+%7B%0D%0A++final+DateTime+date%3B%0D%0A++final+String+title%3B%0D%0A++final+String+content%3B%0D%0A%0D%0A++Article%28%7B%0D%0A++++required+this.date%2C%0D%0A++++required+this.title%2C%0D%0A++++required+this.content%2C%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

When you use generic names, you shift the burden to the reader. Choose names that tell the story of the business.

Naming dates specifically isn't just pedantry.

It's about making your code communicate its intent clearly.

The few extra characters you type save countless minutes of confusion for future readers, including your future self.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 65 - Variables Named after Types](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2065%20-%20Variables%20Named%20after%20Types/readme.md)

[Code Smell 33 - Abbreviations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md)

[Code Smell 113 - Data Naming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20113%20-%20Data%20Naming/readme.md)

[Code Smell 174 - Class Name in Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20174%20-%20Class%20Name%20in%20Attributes/readme.md)

[Code Smell 38 - Abstract Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2038%20-%20Abstract%20Names/readme.md)

[Code Smell 194 - Missing Interval](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20194%20-%20Missing%20Interval/readme.md)

[Code Smell 39 - new Date()](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2039%20-%20new%20Date()/readme.md)

# More Information 📕

[What Exactly Is a Name? Part I: The Quest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20Exactly%20Is%20a%20Name%20-%20Part%20I%20The%20Quest/readme.md)

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Towfiqu barbhuiya](https://unsplash.com/@towfiqu999999) on [Unsplash](https://unsplash.com/photos/a-calendar-with-red-push-buttons-pinned-to-it-bwOAixLG0uc)

* * *

> Precise naming is a design decision, not a cosmetic one.

_Eric Evans_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)