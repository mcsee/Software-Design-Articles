# Code Smell 136 - Classes With just One Subclass

![Code Smell 136 - Classes With just One Subclass](benjamin-davies-9b5dvrjb05g-unsplash.jpg)

*Being generic and foreseeing the future is good (again).*

> TL;DR: Don't over-generalize

# Problems

- Speculative Design

- Complexity

- Over-Engineering

# Solutions

1. Remove the abstract class until you get more examples

# Context

In the past, programmers told us to design for change. 

Nowadays, We keep following the scientific method. 

Whenever we find a duplication we remove it. 

Not before. 

Not with interfaces, not with classes.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/ce3cbe785c4b1d542a2b0660acabbc8f)
```python
class Boss(object):
    def __init__(self, name):
        self.name = name 
        
class GoodBoss(Boss):
    def __init__(self, name):
        super().__init__(name)
        
# This is actually a very classification example
# Bosses should be immutable but can change their mood
# with constructive feedback
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/441d6bf98d916336dbfa2670d7109640)
```python
class Boss(object):
    def __init__(self, name):
        self.name = name  
        
# Bosses are concrete and can change mood
```

# Detection

[X] Automatic 

This is very easy for our linters since they can trace this error at compile time.

# Exceptions

Some frameworks create an abstract class as a placeholder to build our models over them.

Subclassifing should be never our first option. 

A more elegant solution would be to declare [an interface](Code Smells\Code Smell 135 - Interfaces With just One Realization) since it is less coupled.

# Tags

- Over Design

# Relations

[Code Smell 114 - Empty Class](Code Smells\Code Smell 114 - Empty Class)

[Code Smell 11 - Subclassification for Code Reuse](Code Smells\Code Smell  11 - Subclassification for Code Reuse)

[Code Smell 43 - Concrete Classes Subclassified](Code Smells\Code Smell 43 - Concrete Classes Subclassified)

[Code Smell 92 - Isolated Subclasses Names](Code Smells\Code Smell 92 - Isolated Subclasses Names)

[Code Smell 135 - Interfaces With just One Realization](Code Smells\Code Smell 135 - Interfaces With just One Realization)

# Conclusion

We need to wait for abstractions and not be creative and speculative.

# Credits

Photo by [Benjamin Davies](https://unsplash.com/photos/9b5dvrjb05g#:~:text=Photo%20by%20Benjamin%20Davies%20on%20Unsplash) on Unsplash

* * *

> Writing a class without its contract would be similar to producing an engineering component (electrical circuit, VLSI (Very Large Scale Integration) chip, bridge, engine...) without a spec. No professional engineer would even consider the idea.

_Bertrand Meyer_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()