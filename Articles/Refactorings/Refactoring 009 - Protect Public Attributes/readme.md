# Refactoring 009 - Protect Public Attributes
            
![Refactoring 009 - Protect Public Attributes](Refactoring%20009%20-%20Protect%20Public%20Attributes.jpg)

*Forget about data structures, DTOs, POJOs, and anemic objects.*

> TL;DR: Avoid external manipulation

# Problems Addressed

- Encapsulation Violation

- Anemic Models

# Related Code Smells

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 40 - DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

# Steps

1. Change the visibility of your attributes from public to private.

# Sample Code

## Before

[Gist Url]: # (https://gist.github.com/mcsee/803a3400fe6b241417de5abd17b89606)

```java
public class Song {
   String artistName;
   String albumName;
}
```

## After

[Gist Url]: # (https://gist.github.com/mcsee/bfefa85761d0030892bcbdd438ca7f59)

```java
public class Song {
   // 1- Change the visibility of your attributes from public to private
   private String artistName;
   private String AlbumName;
  
  // We cannot access attributes until we add methods
}
```

# Type

[X] Semi-Automatic

We can change the visibility with an IDE or text editor.

# Safety

This is not a safe refactor.

Existing dependencies may break.

# Why is the Code Better?

We can change encapsulated code easily.

The code is not repeated.

# Limitations

Some languages don't have visibility options.

# Tags

- Anemic

# Related Refactorings

[Refactoring 001 - Remove Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md)

# Credits

Image by [Couleur](https://pixabay.com/users/couleur-1195798/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)