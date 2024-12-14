# Code Smell 67 - Middle Man

![Code Smell 67 - Middle Man](Code%20Smell%2067%20-%20Middle%20Man.jpg)

> TL;DR: Remove the Intermediators

*Let's break Demeter's Law.*

# Problems

- Unnecessary Indirection

- Empty Classes

- Readability

# Solutions

1. Remove Middle man.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/8f89b53d0be21a6779e4be53673edf5c) -->

```java
public class Client {
    Address address;
    public ZipCode zipCode() {
        return address.zipCode();
    }
}

public class Address {
    private ZipCode zipCode;
    
    public ZipCode zipCode() {
        return new ZipCode('CA90210');
    }
}

public class Application {   
   ZipCode zipCode = client.zipCode();
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/63674fe800fca77d3a7edc39bde428c8) -->

```java
public class Client {
   public ZipCode zipCode() {
      // Can also store it
      return new ZipCode(’CA90210’);
   }
}

public class Application {   
   ZipCode zipCode = client.address().zipCode();
}
```

# Detection

Same as its [opposite smell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2008%20-%20Long%20Chains%20Of%20Collaborations/readme.md), We can detect this small using parsing trees.

# Tags

- Coupling

- Declarative

- Readability

# Conclusion

This is exactly the opposite to [Message Chain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2008%20-%20Long%20Chains%20Of%20Collaborations/readme.md). We make explicit the message chain. 

# Relations

[Code Smell 08 - Long Chains Of Collaborations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2008%20-%20Long%20Chains%20Of%20Collaborations/readme.md)

[Code Smell 114 - Empty Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20114%20-%20Empty%20Class/readme.md)

[Code Smell 200 - Poltergeist](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20200%20-%20Poltergeist/readme.md)

# More Info

[Refactoring Guru](https://refactoring.guru/smells/middle-man)

[Refactoring.com](https://refactoring.com/catalog/removeMiddleMan.html)

[C2 Wiki](https://wiki.c2.com/?MiddleMan)

[JetBrains](https://www.jetbrains.com/help/idea/remove-middleman.html#remove_middleman_example)

[Wikipedia](https://en.wikipedia.org/wiki/Law_of_Demeter)

# Credits

Photo by [Dan Counsell](https://unsplash.com/@dancounsell) on [Unsplash](https://unsplash.com/s/photos/robber)
  
* * *

> Whenever I have to think to understand what the code is doing, I ask myself if I can refactor the code to make that understanding more immediately apparent.

_Martin Fowler_

* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)