# Code Smell 136 - Classes With just One Subclass

![Code Smell 136 - Classes With just One Subclass](Code%20Smell%20136%20-%20Classes%20With%20just%20One%20Subclass.jpg)

*Being generic and foreseeing the future is good (again).*

> TL;DR: Don't over-generalize

# Problems 😔 

- Speculative Design

- Complexity

- Over-Engineering

# Solutions 😃

1. Remove the abstract class until you get more examples

# Context 💬

In the past, programmers told us to design for change. 

Nowadays, We keep following the scientific method. 

Whenever we find a duplication we remove it. 

Not before. 

Not with interfaces, not with classes.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/ce3cbe785c4b1d542a2b0660acabbc8f) -->

```python
class Boss(object):
    def __init__(self, name):
        self.name = name 
        
class GoodBoss(Boss):
    def __init__(self, name):
        super().__init__(name)
        
# This is actually a poor classification example
# Bosses should be immutable but can change their mood
# with constructive feedback
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/441d6bf98d916336dbfa2670d7109640) -->

```python
class Boss(object):
    def __init__(self, name):
        self.name = name  
        
# Bosses are concrete and can change mood
```

# Detection 🔍

[X] Automatic 

This is very easy for our linters since they can trace this error at compile time.

# Exceptions 🛑

Some frameworks create an abstract class as a placeholder to build our models over them.

Subclassing should be never our first option. 

A more elegant solution would be to declare [an interface](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20135%20-%20Interfaces%20With%20just%20One%20Realization/readme.md) since it is less coupled.

# Tags 🏷️

- YAGNI

# Conclusion 🏁

We need to wait for abstractions and not be creative and speculative.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 114 - Empty Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20114%20-%20Empty%20Class/readme.md)

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

[Code Smell 43 - Concrete Classes Subclassified](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2043%20-%20Concrete%20Classes%20Subclassified/readme.md)

[Code Smell 92 - Isolated Subclasses Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2092%20-%20Isolated%20Subclasses%20Names/readme.md)

[Code Smell 135 - Interfaces With just One Realization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20135%20-%20Interfaces%20With%20just%20One%20Realization/readme.md)

[Code Smell 161 - Abstract/Final/Undefined Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20161%20-%20Abstract%20Final%20Undefined%20Classes/readme.md)

# Credits 🙏

Photo by [Benjamin Davies](https://unsplash.com/photos/9b5dvrjb05g) on Unsplash

* * *

> Writing a class without its contract would be similar to producing an engineering component (electrical circuit, VLSI (Very Large Scale Integration) chip, bridge, engine...) without a spec. No professional engineer would even consider the idea.

_Bertrand Meyer_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)