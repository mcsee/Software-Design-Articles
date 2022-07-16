# Code Smell 147 - Too Many Methods

![Code Smell 147 - Too Many Methods](marcin-simonides-GYZ9F3U1gBk-unsplash.jpg)

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

2. [Extract Class](Refactorings\Refactoring 007 - Extract Class)

# Related Refactorings

[Refactoring 007 - Extract Class](Refactorings\Refactoring 007 - Extract Class)

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

public class DateToStringFormater {
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

[Code Smell 124 - Divergent Change](Code Smells\Code Smell 124 - Divergent Change)

[Code Smell 143 - Data Clumps](Code Smells\Code Smell 143 - Data Clumps)

[Code Smell 94 - Too Many imports](Code Smells\Code Smell 94 - Too Many imports)

[Code Smell 22 - Helpers](Code Smells\Code Smell 22 - Helpers)

[Code Smell 34 - Too Many Attributes](Code Smells\Code Smell 34 - Too Many Attributes)

# More info

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
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()