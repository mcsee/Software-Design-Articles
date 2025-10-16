# Code Smell 169 - Glued Methods
            
![Code Smell 169 - Glued Methods](Code%20Smell%20169%20-%20Glued%20Methods.jpg)

*Don't make two or more things at once.*

> TL;DR: Try to be as atomic as possible in your methods

# Problems 😔 

- Coupled Code

- Harder to test

- Harder to read

# Solutions 😃

1. Break the method

# Refactorings ⚙️

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Context 💬

If you name a method with 'And' you are probably missing an extract-and-break method opportunity.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/a5f7f776b32957ad3d40d57b4ff99c7f) -->

```rust
calculatePrimeFactorsRemoveDuplicatesAndPrintThem()

// Three responsibilities
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/435d364b6ae0222952ace057ec099e94) -->

```rust
calculatePrimeFactors();

removeDuplicates();

printNumbers();

// Three different methods
// You can test them and reuse them
```

# Detection 🔍

[X] Semi-Automatic 

Some linters can warn us about methods including the term 'and'.

# Tags 🏷️

- Bloaters

# Level 🔋

[X] Beginner

# Conclusion 🏁

When making methods, it is very important to play some rubber duck story and tell ourselves if we are making things right.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 85 - And Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2085%20-%20And%20Functions/readme.md)

# Disclaimer 📘

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Scott Sanker](https://unsplash.com/@scottsanker) on [Unsplash](https://unsplash.com/s/photos/glue)  

* * *

> Learning the art of programming, like most other disciplines, consists of first learning the rules and then learning when to break them.

Joshua Bloch
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)