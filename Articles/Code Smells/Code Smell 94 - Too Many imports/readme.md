# Code Smell 94 - Too Many imports

![Code Smell 94 - Too Many imports](Code%20Smell%2094%20-%20Too%20Many%20imports.jpg)

*If your class relies on too many others, it will be coupled and fragile. A long import list is a good indicator.*

> TL;DR: Don't import too much.

# Problems 😔 

- Coupling

- Single Responsibility Principle violation

- Low Cohesion

# Solutions 😃

1. Break the class

2. Hide intermediate accidental implementation

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/1ee88717de17b2cc57b12fbd5d6e9bf2) -->

```java
import java.util.LinkedList;
import java.persistence;
import java.util.ConcurrentModificationException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import java.util.NoSuchElementException 
import java.util.Queue;
import org.fermi.common.util.ClassUtil;
import org.fermi.Data;
// You rely on too many libraries

public class Demo {
   public static void main(String[] args) {
      
   }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/920db69fda667e32b9d682fdab61c634) -->

```java
import org.fermi.domainModel;
import org.fermi.workflow;

// You rely on few libraries
// and you hide their implementation
// So maybe transitive imports are the same
// but you don't break encapsulation

public class Demo {
   public static void main(String[] args) {
      
   }
}
```

# Detection 🔍

We can set a warning threshold on our linters.

# Tags 🏷️

- Bloaters
 
# Level 🔋

[X] Beginner

# Conclusion 🏁

We need to think about dependencies when building our solutions to minimize Ripple Effect.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 61 - Coupling to Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2061%20-%20Coupling%20to%20Classes/readme.md)

[Code Smell 300 - Package Hallucination](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20300%20-%20Package%20Hallucination/readme.md)

# More Information 📕

[Coupling: The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

[Namespaces on Wikipedia](https://en.wikipedia.org/wiki/Namespace)

# Credits 🙏

Photo by [Zdeněk Macháček](https://unsplash.com/@zmachacek) on [Unsplash](https://unsplash.com/s/photos/pile)

[X](https://twitter.com/BelloneDavide/status/1447623706767921153)

* * *

> Fools ignore complexity. Pragmatists suffer it. Some can avoid it. Geniuses remove it.

_Alan Perlis_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)