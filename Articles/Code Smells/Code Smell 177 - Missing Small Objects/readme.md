# Code Smell 177 - Missing Small Objects
            
![Code Smell 177 - Missing Small Objects](Code%20Smell%20177%20-%20Missing%20Small%20Objects.jpg)

*We see small primitive data everywhere*

> TL;DR: Don't forget to model the smallest ones

# Problems

- Primitive obsession

# Solutions

1. find responsibilities for small objects in the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

2. Reify them

# Context

Since computing early days we map all we see to the familiar primitive data types: Strings, Integers, Collections, etc.

Mapping to dates violates abstraction and [fail-fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) principles.

in the [Wordle TDD Kata](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Wordle/How%20to%20Create%20a%20Wordle%20with%20TDD%20in%20Javascript/readme.md), we describe a Wordle word to be different than a *String* or *Char(5)*, since they don't have the same responsibilities.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/9a4cce1354fa6b13bdf90b19e453fbb8)
```java
public class Person {
    private final String name; 

    public Person(String name) {
        this.name = name;
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/79e4e83a5f5f2a17f310a4ae743221b4)
```java
public class Name {
    private final String name; 

    public Name(String name) {
        this.name = name;
        // Name has its own creation rules, comparison etc.
        // Might be different than a string
    }
}
  
public class Person {
    private final Name name; 

    public Person(Name name) {
        // name is created as a valid one,
        // we don't need to add validations here 
        this.name = name;
    }
}
```

# Detection

[X] Manual

This is a semantic smell. It is related to design activity

# Exceptions

In a very small number of mission-critical systems, we have a tradeoff from abstraction to performance.

This is not the usual case. We do premature optimization not relying on a modern computer and virtual machine optimizations.

As always, we need to stick to evidence in real-world scenarios.

# Tags

- Primitive

# Conclusion

Finding small objects is a very hard task requiring experience to make a good job and avoid overdesign.

There's [no silver bullet](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) in choosing how and when to map something.

# Relations

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

# More Info

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

[How to Create a Wordle with TDD in Javascript](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Wordle/How%20to%20Create%20a%20Wordle%20with%20TDD%20in%20Javascript/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Shane Aldendorff](https://unsplash.com/@pluyar) on [Unsplash](https://unsplash.com/s/photos/magnifying-glass)
  
* * *

> The secret to building large apps is never build large apps. Break your applications into small pieces. Then, assemble those testable, bite-sized pieces into your big application.

_Justin Meyer_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)