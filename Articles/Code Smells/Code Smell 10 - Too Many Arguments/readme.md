# Code Smell 10 - Too Many Arguments

![Code Smell 10 - Too Many Arguments](Code%20Smell%2010%20-%20Too%20Many%20Arguments.jpg)

*Objects or Functions need too many arguments to work.*

> TL;DR: Don't pass more than three arguments to your functions.

# Problems

- Low maintainability

- Low Reuse

- Coupling

# Solutions

- Find cohesive relations among arguments

- Create a "context".

- Consider using a [Method Object](https://wiki.c2.com/?MethodObject) Pattern.

- Avoid "basic" Types: strings, arrays, integers, etc. Think on objects.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/ea7d32472830d5ea877be1438807fe89) -->

```java
public class Printer {   
  void print(String documentToPrint, 
           String papersize,
           String orientation, 
           boolean grayscales,
           int pagefrom,
           int pageTo,
           int copies,
           float marginLeft,
           float marginRight,
           float marginTop,
           float marginBottom         
        ) {
    }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/200a18dd99a76a95155df4cb032b1d10) -->

```java
final public class PaperSize { }
final public class Document { }
final public class PrintMargins { }
final public class PrintRange { }  
final public class ColorConfiguration { }
final public class PrintOrientation { }
// Class definition with methods and properties omitted for simplicity

final public class PrintSetup {
    public PrintSetup(PaperSize papersize,
           PrintOrientation orientation, 
           ColorConfiguration color,
           PrintRange range,
           int copiesCount,
           PrintMargins margins
           ) {}
}

final public class Printer {   
  void print(
         Document documentToPrint, 
         PrintSetup setup        
        ) {
    }
}
```

# Detection

Most linters warn when the arguments list is too large.

# Exceptions

- Operations in real-world needing not cohesive collaborators.

# Tags

- primitive

# Level

[X] Beginner

# Conclusion

Relate arguments and group them.
Always favor real-world mappings. Find in real-world how to group the arguments in cohesive objects.

If a function gets too many arguments, some of them might be related to the class construction. This is a design smell too.

# Relations

[Code Smell 34 - Too Many Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2034%20-%20Too%20Many%20Attributes/readme.md)

[Code Smell 13 - Empty Constructors](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2013%20-%20Empty%20Constructors/readme.md)

[Code Smell 87 - Inconsistent Parameters Sorting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2087%20-%20Inconsistent%20Parameters%20Sorting/readme.md)

[Refactoring 010 - Extract Method Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

# Credits

Photo by [Tobias Tullius](https://unsplash.com/@tobiastu) on [Unsplash](https://unsplash.com/s/photos/loaded)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)