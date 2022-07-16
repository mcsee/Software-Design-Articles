# Code Smell 25 - Pattern Abusers

![Code Smell 25 - Pattern Abusers](1_9N_GZwPSlDwAMJeqod0npA.jpeg)

*Patterns are awesome. With great powers comes great responsibility.*

> TL;DR: Don't abuse patterns.

# Problems

- Over Design

- Readability

# Solutions

1. Measure the tradeoff of patterns usage.

2. Create solutions based on real world names ([essential](Theory\No Silver Bullet)) over architecture (accidental).

3. Choose [good names](Theory\What exactly is a name — Part II Rehab).

4. User [MAPPER](Theory\What is (wrong with) software) technique to find [bijection](Theory\The One and Only Software Design Principle) real entities.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/a94aac5dd5fee1e1c19b4b07e87e7887)
```java
public final class FileTreeComposite {
    // name should be inferred from behaviour
}
    
public final class DateTimeConverterAdapterSingleton {
    //
}

public final class PermutationSorterStrategy {
    //
} 

public final class NetworkPacketObserver {
    //
}
    
public final class AccountsComposite {
    //
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/9adec62e0637199e351100eb2ece56f2)
```java
public final class FileSystem {
    // These names map 1:1 to real world concepts
}

public final class DateTimeFormatter {
    //
}

public final class BubbleSort {
    //
}

public final class NetworkSniffer {
    //
}

public final class Portfolio {
    //
}        
```

# Detection

It would be very difficult to create automatic detection rules. 

A class name with more than one pattern on it, is a warning.

# Tags

- Abuser

- Naming

# Conclusion

Chose when to apply a pattern solution. You are not [smarter](Code Smells\Code Smell 06 - Too Clever Programmer) for using too many patterns. You are smart if you choose the right opportunity for everyone.

# Relations

[Code Smell 06 - Too Clever Programmer](Code Smells\Code Smell 06 - Too Clever Programmer)

[Singleton - The root of all evil](Theory\Singleton - The root of all evil)

# More Info

[How to Decouple a Legacy System](Theory\How to Decouple a Legacy System)

[What exactly is a name — Part II Rehab](Theory\What exactly is a name — Part II Rehab)

# Credits

Photo by [Nathan Dumlao](https://unsplash.com/@nate_dumlao) on [Unsplash](https://unsplash.com/s/photos/addict)

* * *

>  When you have a hammer, every problem looks like a nail.

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()