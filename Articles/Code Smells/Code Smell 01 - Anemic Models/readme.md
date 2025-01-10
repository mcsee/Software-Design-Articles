# Code Smell 01 - Anemic Models

![Code Smell 01 - Anemic Models](Code%20Smell%2001%20-%20Anemic%20Models.jpg)

*Your objects have no behavior.*

> TL;DR: Don't use objects as data structures

Protocol is empty (with setters/getters).

If we ask a domain expert to describe an entity he/she would hardly tell it is *'a bunch of attributes'*.

# Problems

- No Encapsulation.

- No [mapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) to real-world entities.

- Duplicate Code.

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Writer / Reader mismatch.

# Solutions

1) Find Responsibilities.

2) Protect your attributes.

3) Hide implementations. 

4) Delegate

# Examples

- DTOs

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/73f84d80f7c3e89a216dd9e40ab71bcc) -->

```java
public class Song {
   String name;
   String authorName;
   String albumName;
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/78f2dd78120db843c960ed41839f29cb) -->

```java
public class Song {
   private String name;
   private Artist author; // Will reference rich objects
   private Album album; // instead of primitive data types

   public String albumName() {
     return album.name() ;
}
```

# Detection

Sophisticated linters can automate detection.
They should ignore setters and getters and count real behavior methods.

# Tags

- Anemic
- OOP as Data
- Encapsulation
- Setters/Getters
- Mutability

# Level

[X] Beginner

# Conclusion

Avoid anemic models. Focus always on protocol instead of data. 
[behavior](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) is essential, data is accidental.

# Relations

[Code Smell 28 - Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)

[Code Smell 15 - Missed Preconditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2015%20-%20Missed%20Preconditions/readme.md)

# More Info

- [Wikipedia](https://en.wikipedia.org/wiki/Anemic_domain_model)
- [Refactoring Guru](https://refactoring.guru/es/smells/data-class)
- [Nude Models - Part I : Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)
- [Nude Models - Part II : Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md)
- [How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)

# Also Known as

- Data Class

* * *

> Object-oriented programming increases the value of these metrics by managing this complexity. The most effective tool available for dealing with complexity is abstraction. Many types of abstraction can be used, but encapsulation is the main form of abstraction by which complexity is managed in object-oriented programming.

_Rebecca Wirfs-Brock_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

# Credits

Photo by Stacey Vandergriff on Unsplash

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)