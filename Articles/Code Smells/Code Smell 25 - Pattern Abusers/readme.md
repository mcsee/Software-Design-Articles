# Code Smell 25 - Pattern Abusers

![Code Smell 25 - Pattern Abusers](Code%20Smell%2025%20-%20Pattern%20Abusers.jpeg)

*Patterns are awesome. With great powers comes great responsibility.*

> TL;DR: Don't abuse patterns.

# Problems

- Over design

- Readability

# Solutions

1. Measure the tradeoff of patterns usage.

2. Create solutions based on real-world names ([essential](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md)) over architecture (accidental).

3. Choose [good names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md).

4. User [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) technique to find [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) real entities.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/a94aac5dd5fee1e1c19b4b07e87e7887)
```java
public final class FileTreeComposite {
    // name should be inferred from behavior
}
    
public final class DateTimeConverterAdapterSingleton { }
public final class PermutationSorterStrategy { } 
public final class NetworkPacketObserver { }    
public final class AccountsComposite { }
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/9adec62e0637199e351100eb2ece56f2)
```java
public final class FileSystem {
    // These names map 1:1 to real-world concepts
}

public final class DateTimeFormatter { }
public final class BubbleSort { }
public final class NetworkSniffer { }
public final class Portfolio { }
```

# Detection

It would be very difficult to create automatic detection rules. 

A class name with more than one pattern on it, is a warning.

# Tags

- Abuser

- Naming

# Conclusion

Chose when to apply a pattern solution. You are not [smarter](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md) for using too many patterns. You are smart if you choose the right opportunity for everyone.

# Relations

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Singleton - The root of all evil](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20root%20of%20all%20evil/readme.md)

[Code Smell 38 - Abstract Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2038%20-%20Abstract%20Names/readme.md)

[Code Smell 47 - Diagrams](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2047%20-%20Diagrams/readme.md)

[Code Smell 32 - Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2032%20-%20Singletons/readme.md)

# More Info

[How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Credits

Photo by [Nathan Dumlao](https://unsplash.com/@nate_dumlao) on [Unsplash](https://unsplash.com/s/photos/addict)

* * *

>  When you have a hammer, every problem looks like a nail.

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)