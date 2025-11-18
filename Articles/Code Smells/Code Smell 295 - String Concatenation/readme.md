# Code Smell 295 - String Concatenation

![Code Smell 295 - String Concatenation](Code%20Smell%20295%20-%20String%20Concatenation.jpg)

*Untangling the string mess in your code*

> TL;DR: Avoid string concatenation for complex strings, use templates.

# Problems 😔

- Readability
- Maintainability
- Error-prone code
- [Security](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md) concerns
- Unexpected outputs
- Context fragmentation
- Translation nightmares
- Context loss
- *(You will not see "Performance Issues" in this list)*

# Solutions 😃

1. Implement message templates
2. Separate text and logic
3. Maintain translation context
4. Abstract string creation.
5. Use *sprintf()* or equivalent in your programming language.

# Refactorings ⚙️     

[Refactoring 036 - Replace String Concatenations with Text Blocks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20036%20-%20Replace%20String%20Concatenations%20with%20Text%20Blocks/readme.md)

# Context 💬

String concatenation often starts innocently but quickly becomes a mess.

When you build strings by joining multiple fragments, you create complex and hard-to-translate code.

Translation requires context, but concatenation splits natural sentences into disconnected fragments.

This creates a perfect storm of confusing code that breaks when languages with different word orders or grammatical structures are introduced.

Performance is rarely a concern and optimizing string concatenation is a [Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md) smell.

The clean code argument is always stronger than making premature optimizations thinking you are clever than the compiler.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/817c24c7df44cbac6d09c1d20407ea4c) -->

```R
name <- 'Art Vandelay'
age <- 30
city <- 'New York'

message <- paste0('User ', 
  name,
  ' is ',
  age,
  ' years old and lives in ', 
  city, 
  '.')

# Same problem
message <- "User 
  " %<% name %>
  " is " %<% age %>
  " years old and lives in "
  %<% city %> 
  "."

print(message)
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/c391ce7554d325397f4236f80e5195bd) -->

```R
name <- "Art Vandelay"
age <- 30
city <- "New York"

message <- sprintf(
  "User %s is %d years old and lives in %s.", 
  name,
  age,
  city)
# Easier to understand and translate
# Some human languages might change the order 
# of the subparts
glue("User {name} is {age} years old and lives in {city}.")

print(message)
```

# Detection 🔍

[X] Semi-Automatic

You can detect this smell by looking for concatenation operation abuse.

Many linters can also look for multiple string literals mixed with variables inside these functions.

You can also watch for combined string fragments that would form natural sentences.

Code with many single-character string literals (like spaces or punctuation) concatenated to variables is a strong indicator.

# Tags 🏷️

- Declarative Code

# Level 🔋

[x] Beginner

# Why the Bijection Is Important 🗺️

In natural language, sentences represent complete thoughts with proper grammar and structure.

When you fragment these into concatenated pieces, you break the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between human-readable text and your code representation.

This mismatch causes multiple problems: for translators who need complete sentences to maintain context, for developers trying to understand the final output, and for maintenance when requirements change.

The world has many cultures and languages and the string order might change.

Templates maintain this bijection by keeping sentence structures intact, making your code a closer representation of the real-world language it produces.

# AI Generation 🤖

AI code generators often create this smell because they use the most direct approach to string manipulation.

When prompted to "create a message with a username," they frequently default to basic concatenation without considering the translation or maintenance implications.

AI generators may not understand the broader context unless you explicitly instruct them to use template systems.

# AI Detection 🥃

Most AI tools can detect and fix this smell with specific instructions.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: use string templates instead of concatenation

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60R%0D%0Aname+%3C-+%27Art+Vandelay%27%0D%0Aage+%3C-+30%0D%0Acity+%3C-+%27New+York%27%0D%0A%0D%0Amessage+%3C-+paste0%28%27User+%27%2C+%0D%0A++name%2C%0D%0A++%27+is+%27%2C%0D%0A++age%2C%0D%0A++%27+years+old+and+lives+in+%27%2C+%0D%0A++city%2C+%0D%0A++%27.%27%29%0D%0A%0D%0A%23+Same+problem%0D%0Amessage+%3C-+%22User+%0D%0A++%22+%25%3C%25+name+%25%3E%0D%0A++%22+is+%22+%25%3C%25+age+%25%3E%0D%0A++%22+years+old+and+lives+in+%22%0D%0A++%25%3C%25+city+%25%3E+%0D%0A++%22.%22%0D%0A%0D%0Aprint%28message%29%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=use+string+templates+instead+of+concatenation%3A+%60%60%60R%0D%0Aname+%3C-+%27Art+Vandelay%27%0D%0Aage+%3C-+30%0D%0Acity+%3C-+%27New+York%27%0D%0A%0D%0Amessage+%3C-+paste0%28%27User+%27%2C+%0D%0A++name%2C%0D%0A++%27+is+%27%2C%0D%0A++age%2C%0D%0A++%27+years+old+and+lives+in+%27%2C+%0D%0A++city%2C+%0D%0A++%27.%27%29%0D%0A%0D%0A%23+Same+problem%0D%0Amessage+%3C-+%22User+%0D%0A++%22+%25%3C%25+name+%25%3E%0D%0A++%22+is+%22+%25%3C%25+age+%25%3E%0D%0A++%22+years+old+and+lives+in+%22%0D%0A++%25%3C%25+city+%25%3E+%0D%0A++%22.%22%0D%0A%0D%0Aprint%28message%29%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60R%0D%0Aname+%3C-+%27Art+Vandelay%27%0D%0Aage+%3C-+30%0D%0Acity+%3C-+%27New+York%27%0D%0A%0D%0Amessage+%3C-+paste0%28%27User+%27%2C+%0D%0A++name%2C%0D%0A++%27+is+%27%2C%0D%0A++age%2C%0D%0A++%27+years+old+and+lives+in+%27%2C+%0D%0A++city%2C+%0D%0A++%27.%27%29%0D%0A%0D%0A%23+Same+problem%0D%0Amessage+%3C-+%22User+%0D%0A++%22+%25%3C%25+name+%25%3E%0D%0A++%22+is+%22+%25%3C%25+age+%25%3E%0D%0A++%22+years+old+and+lives+in+%22%0D%0A++%25%3C%25+city+%25%3E+%0D%0A++%22.%22%0D%0A%0D%0Aprint%28message%29%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=use+string+templates+instead+of+concatenation%3A+%60%60%60R%0D%0Aname+%3C-+%27Art+Vandelay%27%0D%0Aage+%3C-+30%0D%0Acity+%3C-+%27New+York%27%0D%0A%0D%0Amessage+%3C-+paste0%28%27User+%27%2C+%0D%0A++name%2C%0D%0A++%27+is+%27%2C%0D%0A++age%2C%0D%0A++%27+years+old+and+lives+in+%27%2C+%0D%0A++city%2C+%0D%0A++%27.%27%29%0D%0A%0D%0A%23+Same+problem%0D%0Amessage+%3C-+%22User+%0D%0A++%22+%25%3C%25+name+%25%3E%0D%0A++%22+is+%22+%25%3C%25+age+%25%3E%0D%0A++%22+years+old+and+lives+in+%22%0D%0A++%25%3C%25+city+%25%3E+%0D%0A++%22.%22%0D%0A%0D%0Aprint%28message%29%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60R%0D%0Aname+%3C-+%27Art+Vandelay%27%0D%0Aage+%3C-+30%0D%0Acity+%3C-+%27New+York%27%0D%0A%0D%0Amessage+%3C-+paste0%28%27User+%27%2C+%0D%0A++name%2C%0D%0A++%27+is+%27%2C%0D%0A++age%2C%0D%0A++%27+years+old+and+lives+in+%27%2C+%0D%0A++city%2C+%0D%0A++%27.%27%29%0D%0A%0D%0A%23+Same+problem%0D%0Amessage+%3C-+%22User+%0D%0A++%22+%25%3C%25+name+%25%3E%0D%0A++%22+is+%22+%25%3C%25+age+%25%3E%0D%0A++%22+years+old+and+lives+in+%22%0D%0A++%25%3C%25+city+%25%3E+%0D%0A++%22.%22%0D%0A%0D%0Aprint%28message%29%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=use+string+templates+instead+of+concatenation%3A+%60%60%60R%0D%0Aname+%3C-+%27Art+Vandelay%27%0D%0Aage+%3C-+30%0D%0Acity+%3C-+%27New+York%27%0D%0A%0D%0Amessage+%3C-+paste0%28%27User+%27%2C+%0D%0A++name%2C%0D%0A++%27+is+%27%2C%0D%0A++age%2C%0D%0A++%27+years+old+and+lives+in+%27%2C+%0D%0A++city%2C+%0D%0A++%27.%27%29%0D%0A%0D%0A%23+Same+problem%0D%0Amessage+%3C-+%22User+%0D%0A++%22+%25%3C%25+name+%25%3E%0D%0A++%22+is+%22+%25%3C%25+age+%25%3E%0D%0A++%22+years+old+and+lives+in+%22%0D%0A++%25%3C%25+city+%25%3E+%0D%0A++%22.%22%0D%0A%0D%0Aprint%28message%29%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60R%0D%0Aname+%3C-+%27Art+Vandelay%27%0D%0Aage+%3C-+30%0D%0Acity+%3C-+%27New+York%27%0D%0A%0D%0Amessage+%3C-+paste0%28%27User+%27%2C+%0D%0A++name%2C%0D%0A++%27+is+%27%2C%0D%0A++age%2C%0D%0A++%27+years+old+and+lives+in+%27%2C+%0D%0A++city%2C+%0D%0A++%27.%27%29%0D%0A%0D%0A%23+Same+problem%0D%0Amessage+%3C-+%22User+%0D%0A++%22+%25%3C%25+name+%25%3E%0D%0A++%22+is+%22+%25%3C%25+age+%25%3E%0D%0A++%22+years+old+and+lives+in+%22%0D%0A++%25%3C%25+city+%25%3E+%0D%0A++%22.%22%0D%0A%0D%0Aprint%28message%29%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=use+string+templates+instead+of+concatenation%3A+%60%60%60R%0D%0Aname+%3C-+%27Art+Vandelay%27%0D%0Aage+%3C-+30%0D%0Acity+%3C-+%27New+York%27%0D%0A%0D%0Amessage+%3C-+paste0%28%27User+%27%2C+%0D%0A++name%2C%0D%0A++%27+is+%27%2C%0D%0A++age%2C%0D%0A++%27+years+old+and+lives+in+%27%2C+%0D%0A++city%2C+%0D%0A++%27.%27%29%0D%0A%0D%0A%23+Same+problem%0D%0Amessage+%3C-+%22User+%0D%0A++%22+%25%3C%25+name+%25%3E%0D%0A++%22+is+%22+%25%3C%25+age+%25%3E%0D%0A++%22+years+old+and+lives+in+%22%0D%0A++%25%3C%25+city+%25%3E+%0D%0A++%22.%22%0D%0A%0D%0Aprint%28message%29%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60R%0D%0Aname+%3C-+%27Art+Vandelay%27%0D%0Aage+%3C-+30%0D%0Acity+%3C-+%27New+York%27%0D%0A%0D%0Amessage+%3C-+paste0%28%27User+%27%2C+%0D%0A++name%2C%0D%0A++%27+is+%27%2C%0D%0A++age%2C%0D%0A++%27+years+old+and+lives+in+%27%2C+%0D%0A++city%2C+%0D%0A++%27.%27%29%0D%0A%0D%0A%23+Same+problem%0D%0Amessage+%3C-+%22User+%0D%0A++%22+%25%3C%25+name+%25%3E%0D%0A++%22+is+%22+%25%3C%25+age+%25%3E%0D%0A++%22+years+old+and+lives+in+%22%0D%0A++%25%3C%25+city+%25%3E+%0D%0A++%22.%22%0D%0A%0D%0Aprint%28message%29%0D%0A%60%60%60) | [You](https://you.com/search?q=use+string+templates+instead+of+concatenation%3A+%60%60%60R%0D%0Aname+%3C-+%27Art+Vandelay%27%0D%0Aage+%3C-+30%0D%0Acity+%3C-+%27New+York%27%0D%0A%0D%0Amessage+%3C-+paste0%28%27User+%27%2C+%0D%0A++name%2C%0D%0A++%27+is+%27%2C%0D%0A++age%2C%0D%0A++%27+years+old+and+lives+in+%27%2C+%0D%0A++city%2C+%0D%0A++%27.%27%29%0D%0A%0D%0A%23+Same+problem%0D%0Amessage+%3C-+%22User+%0D%0A++%22+%25%3C%25+name+%25%3E%0D%0A++%22+is+%22+%25%3C%25+age+%25%3E%0D%0A++%22+years+old+and+lives+in+%22%0D%0A++%25%3C%25+city+%25%3E+%0D%0A++%22.%22%0D%0A%0D%0Aprint%28message%29%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

String concatenation creates fragile code that's hard to maintain and nearly impossible to translate correctly.

By switching to template-based approaches, you create more readable and maintainable code that preserves the natural structure of human language.

This approach makes translation far easier as translators work with complete sentences rather than fragments.

Your future self (and your translators) will thank you for using templates instead of cobbling strings together one piece at a time.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 04 - String Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2004%20-%20String%20Abusers/readme.md)

[Code Smell 121 - String Validations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20121%20-%20String%20Validations/readme.md)

[Code Smell 189 - Not Sanitized Input](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md)

[Code Smell 236 - Unwrapped Lines](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20236%20-%20Unwrapped%20Lines/readme.md)

[Code Smell 243 - Concatenated Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20243%20-%20Concatenated%20Properties/readme.md)

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

[Code Smell 218 - Magic Concatenation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20218%20-%20Magic%20Concatenation/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Amador Loureiro](https://unsplash.com/@amadorloureiro) on [Unsplash](https://unsplash.com/photos/letter-wood-stamp-lot-BVyNlchWqzs)

* * *

> Programming is the art of telling another human what one wants the computer to do.

_Donald Knuth_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)