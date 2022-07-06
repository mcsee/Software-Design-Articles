# Code Smell 92 - Isolated Subclasses Names

![Code Smell 92 - Isolated Subclasses Names](edvard-alexander-rolvaag-E75ZuAIpCzo-unsplash.jpg)

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

[Code Smell 11 - Subclassification for Code Reuse](Code Smells\Code Smell 11 - Subclassification for Code Reuse)

# More Info

- [What is in a name?](Theory\What exactly is a name — Part I The Quest)

- [MAPPER](Theory\The One and Only Software Design Principle)

# Credits

Photo by [Edvard Alexander Rølvaag](https://unsplash.com/@edvardr) on [Unsplash](https://unsplash.com/s/photos/hierarchy)
  
* * *

> The programmer's primary weapon in the never-ending battle against slow system is to change the intramodular structure. Our first response should be to reorganize the modules' data structures.

_Frederick P. Brooks_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)