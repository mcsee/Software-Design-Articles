# Code Smell 92 - Isolated Subclasses Names

![Code Smell 92 - Isolated Subclasses Names](Code%20Smell%2092%20-%20Isolated%20Subclasses%20Names.jpg)

*If your classes are globals, use fully qualified names*

> TL;DR: Don't use abbreviations in subclasses

# Problems

- Readability

- Mistakes

# Solutions

1. Rename your classes to provide context

2. Use modules, namespaces or fully qualified names

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/78ec88e709cd2a5efc4a0a09903c5a4e)
```java
abstract class PerserveranceDirection { 
}

class North extends PerserveranceDirection {}
class East extends PerserveranceDirection {}
class West extends PerserveranceDirection {}
class South extends PerserveranceDirection {}

// Subclasses have short names and meaningless outside the hierarchy
// If we reference East we might mistake it for the Cardinal Point
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/f46bfc303a23c3e6c2d31d7bb4168f28)
```java
abstract class PerserveranceDirection { 
}

class PerserveranceDirectionNorth extends PerserveranceDirection {}
class PerserveranceDirectionEast extends PerserveranceDirection {}
class PerserveranceDirectionWest extends PerserveranceDirection {}
class PerserveranceDirectionSouth extends PerserveranceDirection {}

// Subclasses have fully quallified names
```

# Detection

Automatic detection is not an easy task. We could enforce local naming policies for subclasses.

# Tags

- Naming

# Conclusion

Choose your names wisely.

If your language supports it, use modules, namespaces and local scopes.

# Relations

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

# More Info

- [What is in a name?](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md)

- [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

# Credits

Photo by [Edvard Alexander Rølvaag](https://unsplash.com/@edvardr) on [Unsplash](https://unsplash.com/s/photos/hierarchy)
  
* * *

> The programmer's primary weapon in the never-ending battle against slow system is to change the intramodular structure. Our first response should be to reorganize the modules' data structures.

_Frederick P. Brooks_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)