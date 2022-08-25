# Code Smell 01 - Anemic Models

![Code Smell 01 - Anemic Models](joe-myrick-8BLozwvsmkM-unsplash.jpg)

*Your objects have no behavior.*

> TL;DR: Don't use objects as data structures

Protocol is empty (with setters/getters).

If we ask a domain expert to describe an entity he/she would hardly tell it is *'a bunch of attributes'*.

# Problems

- No Encapsulation.

- No [mapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles//Theory/Theh%20Oneh%20andh%20Onlyh%20Softwareh%20Designh%20Principle) to real world entities.

- Duplicate Code

- [Coupling](/Theory/Coupling - The one and only software design problem)

- Writer / Reader mismatch.

# Solutions

1) Find Responsibilities.

2) Protect your attributes.

3) Hide implementations. 

4) Delegate

# Examples

- DTOs

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/73f84d80f7c3e89a216dd9e40ab71bcc)
```python
class Window:
    def __init__(self):
        self.height = None
        self.width = None

    def getHeight(self):
        return self.height

    def setHeight(self, height):
        self.height = height

    def getWidth(self):
        return self.width

    def setWidth(self, width):
        self.width = width
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/78f2dd78120db843c960ed41839f29cb)
```python
class GraphicWindow:

  def area(self):
    # implementation
    return

  def open(self):
    # implementation
    return

  def isOpen(self):
    # implementation
    return 
```

# Detection

Sophisticated linters can automate detection.
They should ignore setters and getters and count real behavior methods.

# Also Known as

- Data Class

# Tags

- Anemic
- OOP as Data
- Encapsulation
- Setters/Getters
- Mutability

# Conclusion

Avoid anemic models. Focus always on protocol instead of data. 
[Behaviour](Theory\No Silver Bullet) is essential, data is accidental.

# Relations

[Code Smell 28 - Setters](Code Smells\Code Smell 28 - Setters)

[Code Smell 15 - Missed Preconditions](Code Smells\Code Smell 15 - Missed Preconditions)

# More info

- [Wikipedia](https://en.wikipedia.org/wiki/Anemic_domain_model)
- [Refactoring Guru](https://refactoring.guru/es/smells/data-class)
- [Nude Models — Part I : Setters](Theory\Nude Models - Part I Setters)
- [Nude Models — Part II : Getters](Theory\Nude Models - Part II Getters)
- [How to Decouple a Legacy System](Theory\How to Decouple a Legacy System)

* * *

> Object-oriented programming increases the value of these metrics by managing this complexity. The most effective tool available for dealing with complexity is abstraction. Many types of abstraction can be used, but encapsulation is the main form of abstraction by which complexity is managed in object-oriented programming.

_Rebecca Wirfs-Brock_

[Software Engineering Great Quotes](/Quotes/Software Engineering Great Quotes)

# Credits

Photo by Stacey Vandergriff on Unsplash

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()