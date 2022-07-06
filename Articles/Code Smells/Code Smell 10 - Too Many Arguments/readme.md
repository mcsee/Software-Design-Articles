# Code Smell 10 - Too Many Arguments

![Code Smell 10 - Too Many Arguments](tobias-tullius-xP5an6iXcf0-unsplash.jpg)

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

# Exceptions

- Operations in real world needing not cohesive collaborators.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/ea7d32472830d5ea877be1438807fe89)
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
           float marginBotton         
        ) {
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/200a18dd99a76a95155df4cb032b1d10)
```java
final public class PaperSize {
    // ...
}

final public class Document {
    // ...
}

final public class PrintMargins {
    // ...
}

final public class PrintRange {
    // ...
}

final public class ColorConfiguration {
    // ...
}

final public class PrintOrientation {
    // ...
}

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
  void print(Document documentToPrint, 
         PrintSetup setup        
        ) {
    }
}
```

# Detection

Most linters warn when the arguments list is too large.

# Tags

- primitive

# Conclusion

Relate arguments and group them.
Always favor real world mappings. Find in real world how to group the arguments in cohesive objects.

If a function gets too many arguments, some of them might be related to the class construction. This is a design smell too.

# Relations

[Code Smell 34 - Too Many Attributes](Code Smells\Code Smell 34 - Too Many Attributes)

[Code Smell 13 - Empty Constructors](Code Smells\Code Smell 13 - Empty Constructors)

# Credits

Photo by [Tobias Tullius](https://unsplash.com/@tobiastu) on [Unsplash](https://unsplash.com/s/photos/loaded)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)