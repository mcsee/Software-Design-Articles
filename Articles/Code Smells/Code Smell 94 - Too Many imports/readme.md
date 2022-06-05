# Code Smell 94 - Too Many imports

*If your class relies on too many others, it will be coupled and fragile. A long import list is a good indicator.*

![Code Smell 94 - Too Many imports](zdenek-machacek-jbe0iCwo-U0-unsplash.jpg)

> TL;DR: Don't import too much.

# Problems

- Coupling

- Single Responsibility Principle violation

- Low Cohesion

# Solutions

1. Break the class

2. Hide intermediate accidental implementation

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/1ee88717de17b2cc57b12fbd5d6e9bf2)
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
//We rely on too many libraries

public class Demo {
   public static void main(String[] args) {
      
   }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/920db69fda667e32b9d682fdab61c634)
```java

import org.fermi.domainModel;
import org.fermi.workflow;

//We rely on few libraries
//and we hide their implementation
//So maybe transitive imports are the same
//but we don't break encapsulation

public class Demo {
   public static void main(String[] args) {
      
   }
}
```

# Detection

We can set a warning threshold on our linters.

# Tags

- Coupling

- Ripple Effect

# Conclusion

We need to think about dependencies when building our solutions to minimize Ripple Effect.

# Relations

[Code Smell 61 - Coupling to Classes](https://maximilianocontieri.com/code-smell-61-coupling-to-classes)

# More Info

- [Coupling: The one and only software design problem](https://maximilianocontieri.com/coupling-the-one-and-only-software-design-problem)

- [Namespaces on Wikipedia](https://en.wikipedia.org/wiki/Namespace)

# Credits

Photo by [Zdeněk Macháček](https://unsplash.com/@zmachacek) on [Unsplash](https://unsplash.com/s/photos/pile)

[Twitter](https://twitter.com/1447623706767921153)

* * *

> Fools ignore complexity. Pragmatists suffer it. Some can avoid it. Geniuses remove it.

_Alan Perlis_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://maximilianocontieri.com/how-to-find-the-stinky-parts-of-your-code)