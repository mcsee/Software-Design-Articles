# Code Smell 61 - Coupling to Classes

![Code Smell 61 - Coupling to Classes](Code%20Smell%2061%20-%20Coupling%20to%20Classes.jpg)

> TL;DR: Leave classe alone!

*Classes are handy. We can call them and invoke them any time. Is this good?*

# Problems 😔 

- Coupling

- Extensibility

- Hard to mock

# Solutions 😃

1. Use interfaces or traits (if available).

2. Use Dependency Injection.

3. Favor Loose Coupling.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/e805e3d4540de21d6c1c3ff0341aac5a) -->

```java
public class MyCollection { 
     public bool HasNext { get; set;} 
     // implementation details
     
     public object Next(); 
     // implementation details
}

public class MyDomainObject
     sum(MyCollection anObjectThatCanBeIterated) {
 // Tight coupling
}

// You cannot fake or mock this method 
// since it always expects an instance of MyCollection
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/0358951abbf771f2b63a3ae6833ea210) -->

```java
public interface Iterator { 
     public bool HasNext { get; set;}
     public object Next();
}

public Iterator Reverse(Iterator iterator) {
    var list = new List<int>();
    while (iterator.HasNext) {
       list.Insert(0, iterator.Next());
    }
    return new ListIterator(list);
}

public class MyCollection implements Iterator { 
     public bool HasNext { get; set;} // Implementation details
     public object Next(); // Implementation details
}

public class myDomainObject sum(Iterator anObjectThatCanBeIterated) {
 // Loose coupling
}

// Can use any Iterator
// (even a mocked one as long as it adheres to the protocol)
```

# Detection 🔍

We can use almost any linter to find references to classes. We should not abuse since many uses might be false positives.

# Tags 🏷️

- Coupling

# Level 🔋

[X] Intermediate

# Conclusion 🏁

Dependencies to Interfaces make a system less coupled and thus more extensible and testable.

Interfaces change less often than concrete implementations.

Some objects implement many interfaces, declaring which part depends on which interface makes the coupling more granular and the object more cohesive. 

# Relations 👩‍❤️‍💋‍👨

[Code Smell 30 - Mocking Business](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md)

# More Information 📕

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

[Wikipedia](https://en.wikipedia.org/wiki/Loose_coupling)

# Credits 🙏

Photo by [Marco Bianchetti](https://unsplash.com/@marcobian) on [Unsplash](https://unsplash.com/s/photos/hug)

* * *

> When your code depends on an interface, that dependency is usually very minor and unobtrusive. Your code doesn’t have to change unless the interface changes, and interfaces typically change far less often than the code behind them. When you have an interface, you can edit classes that implement that interface or add new classes that implement the interface, all without impacting code that uses the interface.

> For this reason, it is better to depend on interfaces or abstract classes than it is to depend on concrete classes. When you depend on less volatile things, you minimize the chance that particular changes will trigger massive recompilation.

_Michael Feathers_
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)