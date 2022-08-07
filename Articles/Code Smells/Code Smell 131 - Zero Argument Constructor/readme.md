# Code Smell 131 - Zero Argument Constructor

![Code Smell 131 - Zero Argument Constructor](ade-adebowale-DKr6BEdI2sE-unsplash.jpg)

*Objects created without arguments are often mutable and erratic*

> TL;DR: Pass all your essential arguments when creating objects.

# Problems

- [Mutability](../../Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

- Anemic Models

# Solutions

1. Use one complete and single constructor.

2. Avoid [Setters](../../Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md) and [Getters](../../Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)

# Context

It is common usage using a zero-argument constructor and a bunch of setters to change it.

[Beans](https://en.wikipedia.org/wiki/JavaBeans) is a well-known example of this code smell.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/d42be6d1931e7f4f80781b1360e86a0f)
```java
 public Person();

// Anemic and mutable
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/af9b6b0a60b76d984cd43b2c26720040)
```java
public Person(String name, int age) {
     this.name = name;
     this.age = age;
     } 
 }

// We 'pass' the essence to the object 
// So it does not mutate
```

# Detection

[X] Automatic 

We can check all constructors, but there are some false positives.

Stateless objects are a valid example.

# Tags

- Mutability

# Conclusion

Empty constructors are mutability hints and accidental implementation issues.

We need to research usages to improve our solutions.

# Relations

[Code Smell 68 - Getters](../../Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)

[Code Smell 28 - Setters](../../Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)

[Code Smell 01 - Anemic Models](../../Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 40 - DTOs](../../Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

# More Info

- [Nullary Constructor](https://en.wikipedia.org/wiki/Nullary_constructor)

- [Nude Models — Part I : Setters](../../Theory/Nude%20Models - Part%20I Setters/readme.md)

- [Nude Models — Part II : Getters](../../Theory/Nude%20Models - Part%20II Getters/readme.md)

- [The Evil Power of Mutants](../../Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Credits

Photo by [Ade Adebowale](https://unsplash.com/@adebowax) on [Unsplash](https://unsplash.com/s/photos/crane)  

* * *

> Don't worry about design, if you listen to your code a good design will appear...Listen to the technical people. If they are complaining about the difficulty of making changes, then take such complaints seriously and give them time to fix things.

_Martin Fowler_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)