# Code Smell 140 - Short Circuit Evaluation

![Code Smell 140 - Short Circuit Evaluation](shortcircuit.jpg)

# Code Smell 140 - Short Circuit Evaluation

![Code Smell 140 - Short Circuit Evaluation](shortcircuit.jpg)

*We learn short circuits in our first programming courses. We need to remember why.*

> TL;DR: Be lazy when evaluating boolean conditions

# Problems

- Side effects

- Biyection Fault

- Performance issues

# Solutions

1. Use a short circuit instead of a complete evaluation

# Context

We learn booleans in our 101 computer courses.

Boolean's truth tables are great for mathematics, but we need to be more intelligent as software engineerings.

Short circuit evaluation helps us to be lazy and even build invalid full evaluations.  

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/57e3cb3fc3c5e8c90a544834022f3ab8)
```php
<?

if (isOpen(file) & size(contents(file)) > 0)
  // Full evaluation 
  // Will fail since we cannot retrieve contents 
  // from not open file
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/c548b8d38d7ddfd3dc98aa799ef975c1)
```php
<?

if (isOpen(file) && size(contents(file)) > 0)
  // Short circuit evaluation 
  // If file is not open it will not get the contents  
```

# Detection

[X] Automatic 

We can warn our developers when they use full evaluation.

# Exceptions

Don't use short-circuit as an IF alternative. 

if the operands have side effects, this is another code smell. 

# Tags

- Boolean

# Conclusion

Most programming languages support short-circuits. 

Many of them have it as the only option.

We need to favor these kinds of expressions.

# Relations

[Code Smell 101 - Comparison Against Booleans](../../Code%20Smells/Code%20Smell%20101%20-%20Comparison%20Against%20Booleans/readme.md)

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](../../Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md)

# More Info

- [Wikipedia](https://en.wikipedia.org/wiki/Short-circuit_evaluation)

* * *

> Writing a class without its contract would be similar to producing an engineering component (electrical circuit, VLSI (Very Large Scale Integration) chip, bridge, engine...) without a spec. No professional engineer would even consider the idea.

_Bertrand Meyer_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)