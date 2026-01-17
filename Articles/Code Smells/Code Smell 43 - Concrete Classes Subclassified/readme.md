# Code Smell 43 - Concrete Classes Subclassified

![Code Smell 43 - Concrete Classes Subclassified](Code%20Smell%2043%20-%20Concrete%20Classes%20Subclassified.jpg)

*Inheritance. Concrete classes. Reuse. A fantastic mix up.*

> TL;DR: Don't subclassify concrete classes

# Problems 😔 

- Bad Models

- Coupling

- [Liskov Substitution](https://en.wikipedia.org/wiki/Liskov_substitution_principle) Violation

- Method overriding

- [Mapper](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) fault

# Solutions 😃

1. Subclasses should be specializations.

2. Refactor Hierarchies.

3. Favor Composition.

4. Leaf classes should be concrete.

5. Not leaf classes should be abstract.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/9780cd7772afddbc8356bab8aa5eabed) -->

```java
class Stack extends ArrayList {
    public void push(Object value) { … }
    public Object pop() { … }
}

// Stack doesn't behave Like an ArrayList
// besides pop, push, top it also implements (or overrides) 
// get, set, add, remove and clear
// stack elements can be arbitrary accessed

// both classes are concrete
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/3edd25966d27541140a3e4672f5e9b3c) -->

```java
abstract class Collection {
    public abstract int size();
    
}

final class Stack extends Collection { 
    private contents[] ArrayList;
  
    public Stack() {      
      contents = new long[maxSize];      
    }  
    public void push(Object value) { … }
    public Object pop() { … }
    public int size() {
        return contents.size();
    }
}

final class ArrayList extends Collection {
    public int size() {
     // ...
    }
}
```

# Detection 🔍

Overriding a concrete method is a clear smell. We can enforce these policies on most linters.

Abstract classes should have just a few concrete methods. We can check against a predefined threshold for offenders.

# Tags 🏷️

- Hierarchies

# Conclusion 🏁

Accidental sub-classification is the first obvious advantage for junior developers. 

More mature ones find composition opportunities instead. 

Composition is dynamic, multiple, pluggable, more testable, more maintainable and less coupled than inheritance.

Only sub-classify an entity if it follows the relationships *behaves like*.

After sub-classing the parent class should be abstract.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

# More Information 📕
 
[Wikipedia](https://en.wikipedia.org/wiki/Composition_over_inheritance)

* * *

> Software is a gas; it expands to fill its container.

_Nathan Myhrvold_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)