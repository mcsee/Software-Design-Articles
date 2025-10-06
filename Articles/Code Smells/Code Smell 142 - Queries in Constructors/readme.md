# Code Smell 142 - Queries in Constructors

![Code Smell 142 - Queries in Constructors](Code%20Smell%20142%20-%20Queries%20in%20Constructors.jpg)

*Accessing a database in domain objects is a code smell. Doing it in a constructor is a double smell*

> TL;DR: Constructors should construct (and probably initialize) objects.

# Problems 😔 

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Side Effects

# Solutions 😃

1. Decouple essential business logic from accidental persistence

2. On persistence classes, run queries in functions other than constructors/destructors

# Context 💬

On legacy code, the database is not correctly separated from business objects.

Constructors should never have side effects.

According to the single responsibility principle, they should only build *valid* objects

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/5125008158d94d51b27e8687bbbbf812) -->

```java
public class Person {
  int childrenCount; 

  public Person(int id) {
    childrenCount = database.sqlCall(
      "SELECT COUNT(CHILDREN) FROM PERSON WHERE ID = " . id); 
  }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/a84b6d71034c47c1f95590d74bd2126d) -->

```java
public class Person {
  int childrenCount; 

  public Person(int id, int childrenCount) {
    this.childrenCount = childrenCount; 
    // You can assign the number in the constructor
    // Accidental Database is decoupled
    // You can test the object
  }
}
```

# Detection 🔍

[X] Semi-Automatic 

Our linters can find SQL patterns on constructors and warn us.

# Tags 🏷️

- Premature Optimization

# Conclusion 🏁

Separation of concerns is key and coupling is our main enemy when designing robust software.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 205 - Code in Destructors](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20205%20-%20Code%20in%20Destructors/readme.md)

# More Information 📕

- [Coupling: The one and only Software Problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Credits 🙏

<span>Photo by [Callum Hill](https://unsplash.com/@inkyhills) on [Unsplash](https://unsplash.com/s/photos/no)</span>

* * *

> My belief is still, if you get the data structures and their invariants right, most of the code will kind of write itself.

_Peter Deustch_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)