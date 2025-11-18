# Code Smell 11 - Subclassification for Code Reuse

![Code Smell 11 - Subclassification for Code Reuse](Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse.jpg)

*Code reuse is good. But subclassing generates a static coupling.*

> TL;DR: Favor composition over inheritance. Always. Period.

# Problems 😔 

- Coupling
- Maintainability

# Solutions 😃

- Replace inheritance with composition

# Refactorings ⚙️

[Refactoring 023 - Replace Inheritance with Delegation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20023%20-%20Replace%20Inheritance%20with%20Delegation/readme.md)

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/4f53d085c8b566936c04483064e25ed9) -->

```java
public class Rectangle {
    
    int length;
    int width;
    
    public Rectangle(int length, int width) {
        length = length;
        width = width;
    }
   
    public int area() {
        return length * width;
    }
}

public class Square extends Rectangle {
     
     public Square(int size) {
        super(size, size); 
    }
   
    public int area() {
        return length * length;
    }
}

public class Box extends Rectangle{    
      
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/9f0082db40c2ab590b2b6ea9702bbb22) -->

```java
abstract public class Shape{
    
    abstract public int area();
}

public final class Rectangle extends Shape {
    
    int length;
    int width;
    
    public Rectangle(int length, int width) {
        length = length;
        width = width;
    }
   
    public int area() {
        return length * width;
    }
}

public final class Square extends Shape {
     
     int size;
      
     public Square(int size) {
        size = size; 
    }
   
    public int area() {
        return size * size;
    }
}

public final class Box {
    
    Square shape;
    
    public Box(int size) {
        shape = new Square(size); 
    }
    
    public int area() {
        return shape.area();
    }
}
```

# Detection 🔍

- Overriding can issue warnings when subclassing concrete methods.
- Deep Hierarchies (more than 3 levels) are also a clue of bad subclassing.

# Exceptions 🛑

- If hierarchy follows the principle *behaves like* then it is safe.

# Tags 🏷️

- Hierarchies

# Conclusion 🏁

In legacy systems is very common to have *Deep Hierarchies* and *method overriding*, we need to refactor them and subclass by *essential* reasons and not implementative ones.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 58 - Yo-yo Problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2058%20-%20Yo-yo%20Problem/readme.md)

[Code Smell 46 - Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)

[Code Smell 136 - Classes With just One Subclass](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20136%20-%20Classes%20With%20just%20One%20Subclass/readme.md)

[Code Smell 137 - Inheritance Tree Too Deep](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20137%20-%20Inheritance%20Tree%20Too%20Deep/readme.md)

[Code Smell 95 - Premature Classification](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2095%20-%20Premature%20Classification/readme.md)

[Code Smell 37 - Protected Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2037%20-%20Protected%20Attributes/readme.md)

[Code Smell 125 - 'IS-A' Relationship](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20125%20-%20'IS-A'%20Relationship/readme.md)
														
[Code Smell 92 - Isolated Subclasses Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2092%20-%20Isolated%20Subclasses%20Names/readme.md)

[Code Smell 43 - Concrete Classes Subclassified](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2043%20-%20Concrete%20Classes%20Subclassified/readme.md)

[Code Smell 161 - Abstract/Final/Undefined Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20161%20-%20Abstract%20Final%20Undefined%20Classes/readme.md)

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

# More Information 📕

- [Liskov Substitution](https://en.wikipedia.org/wiki/Liskov_substitution_principle)

# Credits 🙏

Photo by [Brandon Green](https://unsplash.com/@brandgreen) on [Unsplash](https://unsplash.com/s/photos/tree)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)