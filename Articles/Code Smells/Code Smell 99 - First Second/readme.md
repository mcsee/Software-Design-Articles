# Code Smell 99 - First Second

![Code Smell 99 - First Second](priscilla-du-preez-tQagUWpAx5k-unsplash.jpg)

*How many times do we see lazy argument names?*

> TL;DR: Name your arguments according to the role and not the accidental position

# Problems

- Readability

- Intention Revealing Names

# Solutions

1. Use meaningful names

# Context

When writing methods, we usually don't stop to find decent names.

We never refactor the obvious, neither.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/552f2a10d660ee37744f111fe9bf6665)
```python
class Calculator:
  def subtract(self, first, second):
    return first - second

class CalculatorTest  
  def test_multiply():
    assert equals(first, second)
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/bbbc636c7c309c86b4f1114b1f57f6b8)
```python
class Calculator:
  def subtract(self, minuend, subtrahend):
    return minuend - subtrahend

class CalculatorTest  
  def test_multiply():
    assert equals(expectedValue, realValue)
```

# Detection

[x] Manual

We can warn for forbidden words like 'first' and 'second' as argument names.

# Tags

- Readability

# Conclusion

Always follow rule suggesting parameter.

Name your collaborators according to the role.

# Relations

[Code Smell 65 - Variables Named after Types](../../Code%20Smells/Code%20Smell%2065%20-%20Variables%20Named%20after%20Types/readme.md)

# More Info

[What exactly is a name — Part II Rehab](../../Theory/What%20exactly%20is%20a%20name%20—%20Part%20II%20Rehab/readme.md)

# Credits

Photo by [Priscilla Du Preez](https://unsplash.com/@priscilladupreez) on [Unsplash](https://unsplash.com/s/photos/two)
  
* * *

> Final source code is the real software design.

_Jack Reeves_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)