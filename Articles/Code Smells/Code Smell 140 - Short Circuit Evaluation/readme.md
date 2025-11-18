# Code Smell 140 - Short Circuit Evaluation

![Code Smell 140 - Short Circuit Evaluation](Code%20Smell%20140%20-%20Short%20Circuit%20Evaluation.jpg)

*We learn short circuits in our first programming courses. We need to remember why.*

> TL;DR: Be lazy when evaluating boolean conditions

# Problems 😔 

- Side effects

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault

- Performance issues

# Solutions 😃

1. Use a short circuit instead of a complete evaluation

# Context 💬

We learn booleans in our 101 computer courses.

Boolean's truth tables are great for mathematics, but we need to be more intelligent as software engineerings.

Short circuit evaluation helps us to be lazy and even build invalid full evaluations.  

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/57e3cb3fc3c5e8c90a544834022f3ab8) -->

```php
<?

if (isOpen(file) & size(contents(file)) > 0)
  // It performs a full evaluation since it is the bitwise AND
  // will fail since you cannot retrieve contents
  // from a file that is not open
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/c548b8d38d7ddfd3dc98aa799ef975c1) -->

```php
<?

if (isOpen(file) && size(contents(file)) > 0)
  // Short circuit evaluation 
  // If the file is not open it willtry to get the contents
```

# Detection 🔍

[X] Automatic 

We can warn our developers when they use full evaluation.

# Exceptions 🛑

Don't use short-circuit as an IF alternative. 

If the operands have side effects, this is another code smell. 

# Tags 🏷️

- IFs

# Conclusion 🏁

Most programming languages support short-circuits. 

Many of them have it as the only option.

We need to favor these kinds of expressions.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 101 - Comparison Against Booleans](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20101%20-%20Comparison%20Against%20Booleans/readme.md)

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md)

[Code Smell 145 - Short Circuit Hack](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20145%20-%20Short%20Circuit%20Hack/readme.md)

# More Information 📕

[Wikipedia](https://en.wikipedia.org/wiki/Short-circuit_evaluation)

* * *

> Writing a class without its contract would be similar to producing an engineering component (electrical circuit, VLSI (Very Large Scale Integration) chip, bridge, engine...) without a spec. No professional engineer would even consider the idea.

_Bertrand Meyer_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)