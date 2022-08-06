# Code Smell 11 - Subclassification for Code Reuse

![Code Smell 11 - Subclassification for Code Reuse](brandon-green-GEyXGTY2e9w-unsplash.jpg)

*Code reuse is good. But subclassing generates a static coupling.*

> TL;DR: Favor composition over inheritance. Always. Period.

# Problems

- Coupling

- Maintainability

# Solutions

- Replace inheritance with composition.

# Exceptions

- If hierarchy follows the principle *behaves like* then it is safe.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/4f53d085c8b566936c04483064e25ed9)
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

## Right

[Gist Url]: # (https://gist.github.com/mcsee/9f0082db40c2ab590b2b6ea9702bbb22)
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

# Detection

- Overriding can issue warnings when subclassing concrete methods.
- Deep Hierarchies (more than 3 levels) are also a clue of bad subclassing.

# Tags

- Composition

# Conclusion

In legacy systems is very common to have *Deep Hierarchies* and *method overriding*, we need to refactor them and subclass by *essential* reasons and not implementative ones.

# Relations

[Code Smell 58 - Yo-yo Problem](Code Smells\Code Smell 58 - Yo-yo Problem)

# More info

- [Liskov Substitution](https://en.wikipedia.org/wiki/Liskov_substitution_principle)

# Credits

Photo by [Brandon Green](https://unsplash.com/@brandgreen) on [Unsplash](https://unsplash.com/s/photos/tree)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()