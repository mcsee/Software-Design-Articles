# Code Smell 247 - Javascript Replace
            
![Code Smell 247 - Javascript Replace](Code%20Smell%20247%20-%20Javascript%20Replace.jpg)

*You want to replace all, but you replace one ocurrence*

> TL;DR: Bad function names will lead you to defects

# Problems 😔 

- [Misleading Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

- The least surprise principle violation

# Solutions 😃

1. Avoid ambiguous or bad names

2. Wrap with your functions

3. Use mature languajes

# Context 💬

Some names in immature languages break the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) principle.

When you use them, you agree on some semantics that are not the actual behavior.

Consequently, you must know accidental implementations to avoid this [defect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md).

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/6283f6599373f54c37ad914fbbf89849) -->

```javascript
const pets = '😺🐶😺';
const justDogs = pets.replace('😺', '🐩');

const catsArePresent = justDogs.includes('😺');
// returns true
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/d1d819ebfaf99b4143e2545fab928adf) -->

```javascript
const pets = '😺🐶😺';

const justDogs = pets.replaceAll('😺', '🐩');
// Or
const justDogs = pets.replace(/😺/g, '');

const catsArePresent = justDogs.includes('😺');
// returns false
```

# Detection 🔍

[X] Automatic

You can search and forbid the usage of *replace()* in your code and define *replaceFirst()* if you need to change only the first occurrence

# Tags 🏷️

- Naming

- Javascript

- Language Specific

# Level 🔋

[x] Beginner

# AI Generation 🤖

All generators avoided this problem.

# AI Detection 🥃

ChatGPT and Copilot use [Regular Expressions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2041%20-%20Regular%20Expression%20Abusers/readme.md) to solve the problem.

Gemini and Claude failed to spot the mistake.

None of them use *replaceAll()* (introduced in [ES2021](https://www.w3schools.com/js/js_2021.asp))

# Conclusion 🏁

Using *replace()* instead of *replaceAll()* would not fully achieve the intended result of replacing all occurrences. 

It would only replace the first occurrence, potentially leading to incorrect behavior if there are multiple occurrences.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 38 - Abstract Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2038%20-%20Abstract%20Names/readme.md)

[Code Smell 41 - Regular Expression Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2041%20-%20Regular%20Expression%20Abusers/readme.md)

# More Information 📕

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Jari Hytönen](https://unsplash.com/@jarispics) on [Unsplash](https://unsplash.com/photos/four-assorted-color-tabby-kittens-on-brown-basket-YCPkW_r_6uA)
    
* * *

> We must not blame programmers for their bugs. They belong to them only until the code is merged to the repository. After that, all bugs are ours!

_Yegor Bugayenko_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)