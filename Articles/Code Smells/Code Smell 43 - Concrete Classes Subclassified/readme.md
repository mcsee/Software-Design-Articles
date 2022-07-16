# Code Smell 43 - Concrete Classes Subclassified

![Code Smell 43 - Concrete Classes Subclassified](0_bKw_eYs-EsV9XndG.jpg)

*Inheritance. Concrete classes. Reuse. A fantastic mix up.*

# Problems

- Bad Models

- Coupling

- [Liskov Substitution](https://en.wikipedia.org/wiki/Liskov_substitution_principle) Violation

- Method overriding

- [Mapper](Theory\What is (wrong with) software) fault

# Solutions

1. Subclasses should be specializations.

2. Refactor Hierarchies.

3. Favor Composition.

4. Leaf classes should be concrete.

5. Not leaf classes should be abstract.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/9780cd7772afddbc8356bab8aa5eabed)
```java
class Stack extends ArrayList {
    public void push(Object value) { … }
    public Object pop() { … }
}

// Stack does not behave Like an ArrayList
// besides pop, push, top it also implements (or overrides) get, set, add, remove and clear
// stack elements can be arbitrary accessed

// both classes are concrete
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/3edd25966d27541140a3e4672f5e9b3c)
```java
abstract class Collection {
    public abstract int size();
    
}

final class Stack extendes Collection { 
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

# Detection

Overriding a concrete method is a clear smell. We can enforce these policies on most linters.

Abstract classes should have just a few concrete methods. We can check against a predefined threshold for offenders.

# Tags

- Composition

# Conclusion

Accidental sub-classification is the first obvious advantage for junior developers. 

More mature ones find composition opportunities instead. 

Composition is dynamic, multiple, pluggable, more testable, more maintainable and less coupled than inheritance.

Only sub-classify an entity if it follows the relationships *behaves like*.

After sub-classing the parent class should be abstract.

# Relations

[Code Smell 11 - Subclassification for Code Reuse](Code Smells\Code Smell 11 - Subclassification for Code Reuse)

# More info
 
%[https://en.wikipedia.org/wiki/Composition_over_inheritance]

* * *

> Software is a gas; it expands to fill its container.

_Nathan Myhrvold_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()