# Code Smell 03 - Functions Are Too Long

![Code Smell 03 - Functions Are Too Long](Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long.jpg)

*Humans get bored after line five.*

> TL;DR: Refactor and extract functions longer than five lines.

# Problems 😔 

- Low cohesion
- High coupling
- Hard to read
- Low reusability

# Solutions 😃

1) [Refactor](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

2) Create small objects to handle specific tasks. Unit-test them.

3) Compose methods 

4) [Divide and conquer](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm)

# Refactorings ⚙️

[Refactoring 010 - Extract Method Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

[Refactoring 025 - Decompose Regular Expressions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20025%20-%20Decompose%20Regular%20Expressions/readme.md)
	
[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Examples

- Libraries

# Context 💬  

When you write a long function, you hide too many details in one place.

You force the reader to hold multiple concepts in mind.

You mix unrelated responsibilities and make the code hard to test.

You create a rigid block that breaks easily when you change it.

Short, focused functions let you read, test, and modify code faster.	      

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/1f12fb2d0cb9f8eea202526597cf4b83) -->

```php
<?

function setUpChessBoard() {
    $this->placeOnBoard($this->whiteTower);
    $this->placeOnBoard($this->whiteKnight);
    // A lot more lines
    
    // Empty space to pause definition
    $this->placeOnBoard($this->blackTower);
    $this->placeOnBoard($this->blackKnight);
    // A lot more lines
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/0f66ce8c2bba8990e44a36495fa4c3e1) -->

```php
<?

function setUpChessBoard() {
    $this->placeWhitePieces();
    $this->placeBlackPieces();
}
```

# Detection 🔍

[X] Automatic

All linters can measure and warn when methods exceed a predefined threshold.

# Tags 🏷️

- Bloaters

# Level 🔋

[X] Beginner

# Why the Bijection Is Important 🗺️  

A [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) action should map to a clear, concise function.

When you pack many actions into one function, you lose that mapping.

Developers must mentally reconstruct the steps, which slows comprehension and increases errors.	     

# AI Generation 🤖     

AI generators often create long functions if you give them vague prompts.

They tend to cram all logic into one place unless you explicitly request modular code.	  

# AI Detection 🥃  

AI tools can fix this smell with the right instructions to split code into small, focused functions. 

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Break long functions using extract method refactoring

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+setUpChessBoard%28%29+%7B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A++++%0D%0A++++%2F%2F+Empty+space+to+pause+definition%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Break+long+functions+using+extract+method+refactoring%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+setUpChessBoard%28%29+%7B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A++++%0D%0A++++%2F%2F+Empty+space+to+pause+definition%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+setUpChessBoard%28%29+%7B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A++++%0D%0A++++%2F%2F+Empty+space+to+pause+definition%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Break+long+functions+using+extract+method+refactoring%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+setUpChessBoard%28%29+%7B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A++++%0D%0A++++%2F%2F+Empty+space+to+pause+definition%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+setUpChessBoard%28%29+%7B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A++++%0D%0A++++%2F%2F+Empty+space+to+pause+definition%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Break+long+functions+using+extract+method+refactoring%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+setUpChessBoard%28%29+%7B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A++++%0D%0A++++%2F%2F+Empty+space+to+pause+definition%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+setUpChessBoard%28%29+%7B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A++++%0D%0A++++%2F%2F+Empty+space+to+pause+definition%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Break+long+functions+using+extract+method+refactoring%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+setUpChessBoard%28%29+%7B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A++++%0D%0A++++%2F%2F+Empty+space+to+pause+definition%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+setUpChessBoard%28%29+%7B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A++++%0D%0A++++%2F%2F+Empty+space+to+pause+definition%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Break+long+functions+using+extract+method+refactoring%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Afunction+setUpChessBoard%28%29+%7B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EwhiteKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A++++%0D%0A++++%2F%2F+Empty+space+to+pause+definition%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackTower%29%3B%0D%0A++++%24this-%3EplaceOnBoard%28%24this-%3EblackKnight%29%3B%0D%0A++++%2F%2F+A+lot+more+lines%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 
		 	     
# Conclusion 🏁

Extract long methods into smaller pieces. 

Break complex algorithms into parts. 

You can also unit test these parts.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 75 - Comments Inside a Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2075%20-%20Comments%20Inside%20a%20Method/readme.md)

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

[Code Smell 206 - Long Ternaries](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20206%20-%20Long%20Ternaries/readme.md)

[Code Smell 107 - Variables Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20107%20-%20Variables%20Reuse/readme.md)

[Code Smell 74 - Empty Lines](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2074%20-%20Empty%20Lines/readme.md)

[Code Smell 154 - Too Many Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20154%20-%20Too%20Many%20Variables/readme.md)

[Code Smell 83 - Variables Reassignment](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2083%20-%20Variables%20Reassignment/readme.md)

# More Information 📕

[Refactoring Guru](https://refactoring.guru/es/smells/long-method)

# Also Known as

- Long Method

# Credits 🙏

Photo by [Hari Panicker](https://unsplash.com/@invisibleecho) on [Unsplash](https://unsplash.com/s/photos/long-road)

* * *

> Programs are meant to be read by humans and only incidentally for computers to execute.

_Donald Knuth_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)