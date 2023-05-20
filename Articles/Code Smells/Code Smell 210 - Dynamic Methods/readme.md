# Code Smell 210 - Dynamic Methods
            
![Code Smell 210 - Dynamic Methods](Code%20Smell%20210%20-%20Dynamic%20Methods.jpg)

**

> TL;DR: 

# Problems

- 

# Solutions

1. 

# Refactorings

%[

# Context

While dynamic properties can be useful in certain situations, they can also introduce some potential problems:

    Lack of Type Safety: When adding dynamic properties, it's easy to accidentally introduce typos or use the wrong property names. This can lead to runtime errors that can be difficult to debug, especially in larger codebases.

    Potential Conflicts: In some cases, dynamic properties may have the same name as properties defined in the class or object, leading to conflicts or unexpected behavior.

    Maintenance Difficulty: Using dynamic properties can make code harder to read and maintain over time, especially when many dynamic properties are used throughout a codebase.

    Lack of Code Completion Support: IDEs and text editors may not be able to provide code completion or other helpful features for dynamic properties, making it more difficult for developers to work with them.

It's important to use dynamic properties judiciously and consider the potential drawbacks before implementing them in your code. In some cases, it may be better to define properties explicitly in a class or object to ensure type safety and improve code clarity.


Dynamic properties refer to properties that can change over time. These properties can be observed in various systems and can include things such as velocity, acceleration, temperature, and pressure.

In physics, dynamic properties are often used to describe the behavior of objects in motion. For example, the velocity of an object can change as it accelerates or decelerates. The acceleration of an object can also change as forces act upon it.

In chemistry, dynamic properties can be used to describe the behavior of chemical reactions. For example, the rate of a chemical reaction can change over time as reactants are consumed and products are formed.

In computer science, dynamic properties are often used to describe the behavior of software systems. For example, the memory usage of a program can change over time as it executes different tasks.

Overall, dynamic properties are important because they allow us to describe how systems change and evolve over time, and can help us predict and control their behavior.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/1fceddaa27b7dcbb2cf0ba4f85861237)
```python
class Dream:
    pass

nightmare = Dream()

nightmare.presentation = "I am the Sandman"
# presentation is not defined
# it is dynamic property

print(nightmare.presentation) 
# Output: "I am the Sandman"
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/b2f04e4bafd415006b4ace96e4456612)
```python
class Dream:
    def __init__(self):
        self.presentation = ""

nightmare = Dream()

nightmare.presentation = "I am the Sandman"

print(nightmare.presentation) 
# Output: "I am the Sandman"

```

# Detection

[X] Automatic 

[X] Manual

# Exceptions

-

# Tags

- 

# Conclusion

Dynamic properties are supported in many programming languages, including:

    PHP
    Python
    Ruby
    JavaScript
    C#
    Objective-C
    Swift
    Kotlin
    Groovy

In these languages, dynamic properties can be added to objects at runtime, and accessed using the object's property accessor syntax. The specific syntax and rules for using dynamic properties may vary between languages, so it's important to consult the documentation for the specific language you're working with.

# Relations

%[

# More Info

- []()

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Karsten Würth](https://unsplash.com/@karsten_wuerth) on [Unsplash](https://unsplash.com/photos/0w-uTa0Xz7w)
    
* * *

> 

__
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)