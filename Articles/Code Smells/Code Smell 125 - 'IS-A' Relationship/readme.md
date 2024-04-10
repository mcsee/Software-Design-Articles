# Code Smell 125 - 'IS-A' Relationship

![Code Smell 125 - 'IS-A' Relationship](Code%20Smell%20125%20-%20'IS-A'%20Relationship.jpg)

*We learned at school that inheritance represents an 'is-a' relationship. It is not.*

> TL;DR: Think about protocol and behavior, forget inheritance 

# Problems

- Bad models

- Unexpected behavior

- Subclass overrides

- Liskov substitution principle Violation

# Solutions

1. Think in terms of behavior *behaves-as-a*

2. Prefer composition over inheritance

3. Subclassify always following 'behaves-as-a' relation

# Context

[IS-A relation](https://en.wikipedia.org/wiki/Is-a) comes from the data world.

We learned [ERDs](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model) with structured design and data modeling.

Now, we need to think in terms of behavior.

Behavior is essential, data is [accidental](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md).

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/34677fbac1f6a837bf2b8d17bc882251)
```java
class ComplexNumber {
    protected double realPart;
    protected double imaginaryPart;

    public ComplexNumber(double realPart, double imaginaryPart) {
        this.realPart = realPart;
        this.imaginaryPart = imaginaryPart;
    }
}

class RealNumber extends ComplexNumber {
    public RealNumber(double realPart) {
        super(realPart, 0);
    }

    public void setImaginaryPart(double imaginaryPart) {
        System.out.println("Cannot set imaginary part for a real number.");
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/29e46d1d672ac397552fae978148a7c2)
```java
class Number {
    protected double value;

    public Number(double value) {
        this.value = value;
    }
}

class ComplexNumber extends Number {
    protected double imaginaryPart; 
    
    public ComplexNumber(double realPart, double imaginaryPart) {
        super(realPart);
        this.imaginaryPart = imaginaryPart;
    }
}

class RealNumber extends Number { }
```

# Detection 

[X] Manual

This is a semantic smell.

# Tags

- Inheritance

# Conclusion

*Real* Number IS-A *Complex* number (according to math).

*Integer* IS-A *Real* number (according to math).

*Real* Number does not Behave-Like-A *Complex* number.

We cannot do real.setImaginaryPart() so it is not a Complex according to our [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

# Relations

[Code Smell 92 - Isolated Subclasses Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2092%20-%20Isolated%20Subclasses%20Names/readme.md)

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

[Code Smell 37 - Protected Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2037%20-%20Protected%20Attributes/readme.md)

# More Info

- [Circle/Ellipse Problem](https://en.wikipedia.org/wiki/Circle%E2%80%93ellipse_problem)

- [Subtyping](https://en.wikipedia.org/wiki/Subtyping)

- [No Silver Bullet](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md)

- [Bijection Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

# Credits

Photo by [Joshua Rondeau](https://unsplash.com/@liferondeau) on [Unsplash](https://unsplash.com/s/photos/costume)  

* * *

> DRY - Don't Repeat Yourself - Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

_Andy Hunt_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)