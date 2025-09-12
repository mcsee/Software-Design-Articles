# Code Smell 04 - String Abusers

![Code Smell 04 - String Abusers](Code%20Smell%2004%20-%20String%20Abusers.jpg)

*Too much parsing, exploding, regex, strcmp, strpos and string manipulation functions.*

> TL;DR: Use real abstractions and real objects instead of accidental string manipulation.

# Problems 😔 

- Complexity
- Readability
- Maintainability
- Lack of abstractions
- Fragile logic
- Hidden intent
- Hard debugging
- Poor modeling 
- Regex mess

# Solutions 😃

1) Work with objects instead.

2) Replace strings with data structures dealing with object relations.

3) Go back to Perl :) 

4) identify [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) problems between real objects and the strings.

# Examples

- Serializers

- Parsers

# Context 💬  

When you abuse strings, you try to represent structured concepts with plain text.

You parse, explode, and regex your way around instead of modeling the domain.

This creates fragile code that breaks with small input changes.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/19b5965879d11e6c185d4591add24042) -->

```php
<?php

$schoolDescription = 'College of Springfield';

preg_match('/[^ ]*$/', $schoolDescription, $results);
$location = $results[0]; // $location = 'Springfield'.

$school = preg_split('/[\s,]+/', $schoolDescription, 3)[0]; 
//'College'
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/9aea4a3d401b7e3c2e80101ff348dfa6) -->

```php
<?

class School {
    private $name;
    private $location;

    function description() {
        return $this->name . ' of ' . $this->location->name;
    }
}
```

# Detection 🔍

[X] Semi-Automatic

Automated detection is not easy. 

If your code uses too many string functions, linters can trigger a warning.

# Tags 🏷️

- Primitive Obsession

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️  

You must mirror the [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) domain in your code.

When you flatten roles, addresses, or money into raw strings, you lose control. 

This mismatch leads to errors, duplication, and weak models. 

One-to-one mapping between domain and code gives you clarity and robustness.

# AI Generation 🤖     

AI generators often produce string-abusing code because it looks shorter and easier. 

The generated solution can be correct for toy cases but fragile in real systems.

# AI Detection 🧲  

You can instruct AI tools to replace string checks with domain objects.

With clear prompts, AI can spot and fix string abuse effectively. 

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Convert it to more declarative

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Reify+Strings+to+objects%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24schoolDescription+%3D+%27College+of+Springfield%27%3B%0D%0A%0D%0Apreg_match%28%27%2F%5B%5E+%5D%2A%24%2F%27%2C+%24schoolDescription%2C+%24results%29%3B%0D%0A%24location+%3D+%24results%5B0%5D%3B+%2F%2F+%24location+%3D+%27Springfield%27.%0D%0A%0D%0A%24school+%3D+preg_split%28%27%2F%5B%5Cs%2C%5D%2B%2F%27%2C+%24schoolDescription%2C+3%29%5B0%5D%3B+%0D%0A%2F%2F%27College%27%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Convert+it+to+more+declarative%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24schoolDescription+%3D+%27College+of+Springfield%27%3B%0D%0A%0D%0Apreg_match%28%27%2F%5B%5E+%5D%2A%24%2F%27%2C+%24schoolDescription%2C+%24results%29%3B%0D%0A%24location+%3D+%24results%5B0%5D%3B+%2F%2F+%24location+%3D+%27Springfield%27.%0D%0A%0D%0A%24school+%3D+preg_split%28%27%2F%5B%5Cs%2C%5D%2B%2F%27%2C+%24schoolDescription%2C+3%29%5B0%5D%3B+%0D%0A%2F%2F%27College%27%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Reify+Strings+to+objects%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24schoolDescription+%3D+%27College+of+Springfield%27%3B%0D%0A%0D%0Apreg_match%28%27%2F%5B%5E+%5D%2A%24%2F%27%2C+%24schoolDescription%2C+%24results%29%3B%0D%0A%24location+%3D+%24results%5B0%5D%3B+%2F%2F+%24location+%3D+%27Springfield%27.%0D%0A%0D%0A%24school+%3D+preg_split%28%27%2F%5B%5Cs%2C%5D%2B%2F%27%2C+%24schoolDescription%2C+3%29%5B0%5D%3B+%0D%0A%2F%2F%27College%27%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Convert+it+to+more+declarative%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24schoolDescription+%3D+%27College+of+Springfield%27%3B%0D%0A%0D%0Apreg_match%28%27%2F%5B%5E+%5D%2A%24%2F%27%2C+%24schoolDescription%2C+%24results%29%3B%0D%0A%24location+%3D+%24results%5B0%5D%3B+%2F%2F+%24location+%3D+%27Springfield%27.%0D%0A%0D%0A%24school+%3D+preg_split%28%27%2F%5B%5Cs%2C%5D%2B%2F%27%2C+%24schoolDescription%2C+3%29%5B0%5D%3B+%0D%0A%2F%2F%27College%27%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Reify+Strings+to+objects%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24schoolDescription+%3D+%27College+of+Springfield%27%3B%0D%0A%0D%0Apreg_match%28%27%2F%5B%5E+%5D%2A%24%2F%27%2C+%24schoolDescription%2C+%24results%29%3B%0D%0A%24location+%3D+%24results%5B0%5D%3B+%2F%2F+%24location+%3D+%27Springfield%27.%0D%0A%0D%0A%24school+%3D+preg_split%28%27%2F%5B%5Cs%2C%5D%2B%2F%27%2C+%24schoolDescription%2C+3%29%5B0%5D%3B+%0D%0A%2F%2F%27College%27%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Convert+it+to+more+declarative%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24schoolDescription+%3D+%27College+of+Springfield%27%3B%0D%0A%0D%0Apreg_match%28%27%2F%5B%5E+%5D%2A%24%2F%27%2C+%24schoolDescription%2C+%24results%29%3B%0D%0A%24location+%3D+%24results%5B0%5D%3B+%2F%2F+%24location+%3D+%27Springfield%27.%0D%0A%0D%0A%24school+%3D+preg_split%28%27%2F%5B%5Cs%2C%5D%2B%2F%27%2C+%24schoolDescription%2C+3%29%5B0%5D%3B+%0D%0A%2F%2F%27College%27%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Reify+Strings+to+objects%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24schoolDescription+%3D+%27College+of+Springfield%27%3B%0D%0A%0D%0Apreg_match%28%27%2F%5B%5E+%5D%2A%24%2F%27%2C+%24schoolDescription%2C+%24results%29%3B%0D%0A%24location+%3D+%24results%5B0%5D%3B+%2F%2F+%24location+%3D+%27Springfield%27.%0D%0A%0D%0A%24school+%3D+preg_split%28%27%2F%5B%5Cs%2C%5D%2B%2F%27%2C+%24schoolDescription%2C+3%29%5B0%5D%3B+%0D%0A%2F%2F%27College%27%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Convert+it+to+more+declarative%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24schoolDescription+%3D+%27College+of+Springfield%27%3B%0D%0A%0D%0Apreg_match%28%27%2F%5B%5E+%5D%2A%24%2F%27%2C+%24schoolDescription%2C+%24results%29%3B%0D%0A%24location+%3D+%24results%5B0%5D%3B+%2F%2F+%24location+%3D+%27Springfield%27.%0D%0A%0D%0A%24school+%3D+preg_split%28%27%2F%5B%5Cs%2C%5D%2B%2F%27%2C+%24schoolDescription%2C+3%29%5B0%5D%3B+%0D%0A%2F%2F%27College%27%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Reify+Strings+to+objects%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24schoolDescription+%3D+%27College+of+Springfield%27%3B%0D%0A%0D%0Apreg_match%28%27%2F%5B%5E+%5D%2A%24%2F%27%2C+%24schoolDescription%2C+%24results%29%3B%0D%0A%24location+%3D+%24results%5B0%5D%3B+%2F%2F+%24location+%3D+%27Springfield%27.%0D%0A%0D%0A%24school+%3D+preg_split%28%27%2F%5B%5Cs%2C%5D%2B%2F%27%2C+%24schoolDescription%2C+3%29%5B0%5D%3B+%0D%0A%2F%2F%27College%27%0D%0A%60%60%60) | [You](https://you.com/search?q=Convert+it+to+more+declarative%3A+%60%60%60php%0D%0A%3C%3Fphp%0D%0A%0D%0A%24schoolDescription+%3D+%27College+of+Springfield%27%3B%0D%0A%0D%0Apreg_match%28%27%2F%5B%5E+%5D%2A%24%2F%27%2C+%24schoolDescription%2C+%24results%29%3B%0D%0A%24location+%3D+%24results%5B0%5D%3B+%2F%2F+%24location+%3D+%27Springfield%27.%0D%0A%0D%0A%24school+%3D+preg_split%28%27%2F%5B%5Cs%2C%5D%2B%2F%27%2C+%24schoolDescription%2C+3%29%5B0%5D%3B+%0D%0A%2F%2F%27College%27%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 
	
# Conclusion 🏁

Don't abuse strings. 

Favor real objects. 

Add missing protocol to distinguish them from raw strings.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 121 - String Validations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20121%20-%20String%20Validations/readme.md)

[Code Smell 295 - String Concatenation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20295%20-%20String%20Concatenation/readme.md)

# More Information 📕

# Credits 🙏

Photo by [Nathaniel Shuman](https://unsplash.com/@nshuman1291) on [Unsplash](https://unsplash.com/)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)