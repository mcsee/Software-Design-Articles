# Code Smell 118 - Return False

![Code Smell 118 - Return False](morgan-housel-h-f5OGUjE0U-unsplash.jpg)

*Checking for a boolean condition to return a boolean value is awkward*

> TL;DR: Don't return explicit booleans. Most boolean usages are code smells.

# Problems

- Declarativeness

- Ninja Code

- Implementative solutions

# Solutions

1. Return a boolean proposition instead of checking a negation.

2. Answer must be a business logic formula, not an algorithm.

# Context

When dealing with boolean formulas, it is more readable to show a business boolean formula than introduce a negated [IF](../../Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md) clause.

Programmers tend to return accidental implementative solutions instead of real business rules.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/57c079a22fe139667c8330a937d4dcca)
```javascript
function canWeMoveOn() {
  if (work.hasPendingTasks())
    return false;
  else
    return true;
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/0f0cfe7cd5133dc605555eeb20feaa95)
```javascript
function canWeMoveOn() {
  return !work.hasPendingTasks();
}
```

# Detection

[X] Automatic 

Based on syntax trees, we can safely refactor the code.

# Tags

- Boolean

# Conclusion

Beware of returning booleans. 

After the return, you will need an [If statement](../../Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md) which is also a [code smell](../../Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md).

# Relations

[Code Smell 115 - Return True](../../Code%20Smells/Code%20Smell%20115%20-%20Return%20True/readme.md)

[Code Smell 101 - Comparison Against Booleans](../../Code%20Smells/Code%20Smell%20101%20-%20Comparison%20Against%20Booleans/readme.md)

[Code Smell 24 - Boolean Coercions](../../Code%20Smells/Code%20Smell%2024%20-%20Boolean%20Coercions/readme.md)

[Code Smell 62 - Flag Variables](../../Code%20Smells/Code%20Smell%2062%20-%20Flag%20Variables/readme.md)

[Code Smell 102 - Arrow Code](../../Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

[Code Smell 51 - Double Negatives](../../Code%20Smells/Code%20Smell%2051%20-%20Double%20Negatives/readme.md)

# More Info

- [How to Get Rid of Annoying Ifs Forever](../../Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Credits

Photo by [Morgan Housel](https://unsplash.com/@morganhousel) on [Unsplash](https://unsplash.com/s/photos/not)
  
Thanks to Nico K. for this suggestion.

* * *

> It's not at all important to get it right the first time. It's vitally important to get it right the last time.

_Andrew Hunt_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)