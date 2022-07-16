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

When dealing with boolean formulas, it is more readable to show a business boolean formula than introduce a negated [IF](Theory\How to Get Rid of Annoying IFs Forever) clause.

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

After the return, you will need an [If statement](Theory\How to Get Rid of Annoying IFs Forever) which is also a [code smell](Code Smells\Code Smell 36 - Switch case elseif else if statements).

# Relations

[Code Smell 115 - Return True](Code Smells\Code Smell 115 - Return True)

[Code Smell 101 - Comparison Against Booleans](Code Smells\Code Smell 101 - Comparison Against Booleans)

[Code Smell 24 - Boolean Coercions](Code Smells\Code Smell 24 - Boolean Coercions)

[Code Smell 62 - Flag Variables](Code Smells\Code Smell 62 - Flag Variables)

[Code Smell 102 - Arrow Code](Code Smells\Code Smell 102 - Arrow Code)

[Code Smell 51 - Double Negatives](Code Smells\Code Smell 51 - Double Negatives)

# More Info

- [How to Get Rid of Annoying Ifs Forever](Theory\How to Get Rid of Annoying IFs Forever)

# Credits

Photo by [Morgan Housel](https://unsplash.com/@morganhousel) on [Unsplash](https://unsplash.com/s/photos/not)
  
Thanks to Nico K. for this suggestion.

* * *

> It's not at all important to get it right the first time. It's vitally important to get it right the last time.

_Andrew Hunt_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()