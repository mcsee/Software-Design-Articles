# Code Smell 147 - Too Many Methods

![Code Smell 147 - Too Many Methods](Code%20Smell%20147%20-%20Too%20Many%20Methods.jpg)

*Util classes are great to gather protocol*

> TL;DR: Don't add accidental protocol to your classes

# Problems

- Readability

- Single Responsibility Violation

- Bad Cohesion

- High Coupling

- Low Reusability

# Solutions

1. Break your class

2. [Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

# Refactorings

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

# Context

We tend to put a protocol in the first class we find.

That's not a problem.

We just need to refactor.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/d1c326e90aa2feba4746c6e019999312)

```java
public class MyHelperClass {
  public void print() { }
  public void format() { }
  // ... many methods more

  // ... even more methods 
  public void persist() { }
  public void solveFermiParadox() { }      
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/c64e13c3ea97620ce02dab73ffc517b2)

```java
public class Printer {
  public void print() { }
}

public class DateToStringFormatter {
  public void format() { }
}

public class Database {
  public void persist() { }
}

public class RadioTelescope {
  public void solveFermiParadox() { }
}
```

# Detection

[X] Automatic 

Most linters count methods and warn us.

# Relations

[Code Smell 124 - Divergent Change](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20124%20-%20Divergent%20Change/readme.md)

[Code Smell 143 - Data Clumps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20143%20-%20Data%20Clumps/readme.md)

[Code Smell 94 - Too Many imports](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2094%20-%20Too%20Many%20imports/readme.md)

[Code Smell 22 - Helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md)

[Code Smell 34 - Too Many Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2034%20-%20Too%20Many%20Attributes/readme.md)

# More Info

[Refactoring Guru](https://refactoring.guru/smells/large-class)

# Tags

- Cohesion

- Bloaters

# Conclusion

Splitting classes and protocol is a good practice to favor small and reusable objects.

# Credits

Photo by [Marcin Simonides](https://unsplash.com/@cinusek) on [Unsplash](https://unsplash.com/s/photos/full)  

* * *

There is no code so big, twisted, or complex that maintenance can't make it worse.

Gerald M. Weinberg
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)