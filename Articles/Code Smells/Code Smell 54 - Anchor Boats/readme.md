# Code Smell 54 - Anchor Boats

![Code Smell 54 - Anchor Boats](Code%20Smell%2054%20-%20Anchor%20Boats.jpg)

*Code is there. Just in case. We might need it soon.*

> TL;DR: Don't leave code for future use.

# Problems 😔 

- Complexity

- Coupling

# Solutions 😃

1. Remove dead code.

2. Leave covered and real tested code.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/22deb44d4e95b4a3ca8ce9ba18d0f908) -->

```php
<?

final class DatabaseQueryOptimizer {
  
  public function selectWithCriteria($tableName, $criteria) {
    // Make some optimizations manipulating criteria
  }
  
  private function sqlParserOptimization(SQLSentence $sqlSentence)
    : SQLSentence {
    // Parse the SQL converting it to a string 
    // and then working with their nodes as strings and lots of regex
    // This was a very costly operation overcoming real SQL benefits.
    // But since you made too much work you decide to keep the code.
  }  
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/7d520c7f266d0180f42c3fc12b41fddc) -->

```php
<?

final class DatabaseQueryOptimizer {
  
  public function selectWithCriteria($tableName, $criteria) {
    // Make some optimizations manipulating criteria
  } 
}
```

# Detection 🔍

Using some [mutation testing](https://en.wikipedia.org/wiki/Mutation_testing) variants we can remove the dead code and see if test fails.

We need to have good coverage to rely on this solution.

# Tags 🏷️

- YAGNI

# Level 🔋

[X] Intermediate

# Conclusion 🏁

Dead code is always a problem.

We can use modern development techniques like TDD to ensure all code is alive.

[How to Squeeze Test Driven Development on Legacy Systems](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/How%20to%20Squeeze%20Test%20Driven%20Development%20on%20Legacy%20Systems/readme.md)

# Relations 👩‍❤️‍💋‍👨

[Code Smell 09 - Dead Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2009%20-%20Dead%20Code/readme.md)

[Code Smell 200 - Poltergeist](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20200%20-%20Poltergeist/readme.md)

# More Information 📕

- [Exception not Found](https://exceptionnotfound.net/boat-anchor-the-daily-software-anti-pattern)

- [Wikipedia](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)

- [Refactoring.guru](https://refactoring.guru/smells/speculative-generality)

# Also Known as

- Speculative Generality

# Credits 🙏

Photo by [Kris Mikael Krister](https://unsplash.com/@kmkr) on [Unsplash](https://unsplash.com/s/photos/anchor)

Thanks to @[Apoorv Tyagi](@apoorvtyagi) for pointing this out.

* * *

> It is very hard to predict, especially the future.

_Niels Bohr_ 
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)