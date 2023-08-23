# Code Smell 199 - Gratuitous Booleans
            
![Code Smell 199 - Gratuitous Booleans](Code%20Smell%20199%20-%20Gratuitous%20Booleans.jpg)

*A code that either returns or no returns at all*

> TL;DR: Check carefully your boolean expressions

# Problems

- Readability

- Possible Defects

# Solutions

1. Refactor and remove obsolete code

# Context

When a function is designed to return an invariant value, it may be poor design, but it shouldn’t adversely affect the outcome of your program. However, when it happens on all paths through the logic, it is likely a mistake.

This rule raises an issue when a function contains several return statements that all return the same value.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/dc73985cd7ff45aa7496f41f96e81fe3)
```python
# Gratuitous boolean expressions

if a > 0 and True:
    # This code was left on debugging and passed
    # by mistake during code reviews
    print("a is positive")
else:
    print("a is not positive")

```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/c8d0be601736520faa86a8d7e781be2f)
```python
if a > 0:
    print("a is positive")
else:
    print("a is not positive")
```

# Detection

[X] Automatic 

Many [linters](https://rules.sonarsource.com/javascript/type/Code%20Smell/RSPEC-2589) can detect this problem by parsing execution trees.

# Tags

- Complexity

# Conclusion

Boolean expressions should be straightforward to read and understand.

# Relations

[Code Smell 115 - Return True](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20115%20-%20Return%20True/readme.md)

[Code Smell 118 - Return False](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20118%20-%20Return%20False/readme.md)

[Code Smell 101 - Comparison Against Booleans](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20101%20-%20Comparison%20Against%20Booleans/readme.md)

# More Info

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

[SonarSource](https://rules.sonarsource.com/javascript/type/Code%20Smell/RSPEC-2589)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Jungwoo Hong](https://unsplash.com/@hjwinunsplsh) on [Unsplash](https://unsplash.com/images/things/arrow)
    
* * *

> The central enemy of reliability is complexity.

_Daniel Geer_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)