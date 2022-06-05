# Code Smell 131 - Zero Argument Constructor

*Objects created without arguments are often mutable and erratic*

![Code Smell 131 - Zero Argument Constructor](ade-adebowale-DKr6BEdI2sE-unsplash.jpg)

> TL;DR: Pass all your essential arguments when creating objects.

# Problems

- [Mutability](https://maximilianocontieri.com/the-evil-powers-of-mutants)

- Anemic Models

# Solutions

1. Use one complete and single constructor.

2. Avoid [Setters](https://maximilianocontieri.com/code-smell-28-setters) and [Getters](https://maximilianocontieri.com/code-smell-68-getters)

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
public Person(String name, int age){
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

[Code Smell 68 - Getters](https://maximilianocontieri.com/code-smell-68-getters)

[Code Smell 28 - Setters](https://maximilianocontieri.com/code-smell-28-setters)

[Code Smell 01 - Anemic Models](https://maximilianocontieri.com/code-smell-01-anemic-models)

# More Info

- [Nullary Constructor](https://en.wikipedia.org/wiki/Nullary_constructor)

- [Nude Models — Part I : Setters](https://maximilianocontieri.com/nude-models-part-i-setters)

- [Nude Models — Part II : Getters](https://maximilianocontieri.com/nude-models-part-ii-getters)

- [The Evil Power of Mutants](https://maximilianocontieri.com/the-evil-powers-of-mutants)

# Credits

Photo by [Ade Adebowale](https://unsplash.com/@adebowax) on [Unsplash](https://unsplash.com/s/photos/crane)  

* * *

> Don't worry about design, if you listen to your code a good design will appear...Listen to the technical people. If they are complaining about the difficulty of making changes, then take such complaints seriously and give them time to fix things.

_Martin Fowler_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://maximilianocontieri.com/how-to-find-the-stinky-parts-of-your-code)