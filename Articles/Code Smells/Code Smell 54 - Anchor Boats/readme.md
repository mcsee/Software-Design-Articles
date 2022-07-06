# Code Smell 54 - Anchor Boats

![Code Smell 54 - Anchor Boats](kris-mikael-krister-CliuXLGbKV4-unsplash.jpg)

*Code is there. Just in case. We might need it soon.*

> TD:LR; Don't leave code for future use.

# Problems

- Complexity

- Coupling

# Solutions

1. Remove dead code.

2. Leave covered and real tested code.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/22deb44d4e95b4a3ca8ce9ba18d0f908)
```php
<?

final class DatabaseQueryOptimizer {
  
  public function selectWithCriteria($tableName, $criteria) {
    / /Make some optimizations manipulating criterias
  }
  
  private function sqlParserOptimization(SQLSentence $sqlSentence): SQLSentence {
    // Parse the SQL converting it to an string and then working with their nodes as strings and lots of regex
    // This was a very costly operation overcoming real SQL benefits.
    // But since we made too much work we decide to keep the code.
  }  
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/7d520c7f266d0180f42c3fc12b41fddc)
```php
<?

final class DatabaseQueryOptimizer {
  
  public function selectWithCriteria($tableName, $criteria) {
    // Make some optimizations manipulating criterias
  } 
}
```

# Detection

Using some [mutation testing](https://en.wikipedia.org/wiki/Mutation_testing) variants we can remove the dead code and see it test fails.

We need to have good coverage to rely on this solution.

# Tags

- YAGNI

# Conclusion

Dead code is always a problem.

We can use modern development techniques like TDD to ensure all code is alive.

[How to Squeeze Test Driven Development on Legacy Systems](TDD\How to Squeeze Test Driven Development on Legacy Systems) 

# Also Known as

- Speculative Generality

# Relations

[Code Smell 09 - Dead Code](Code Smells\Code Smell 09 - Dead Code)

# More info

- [Exception not Found](https://exceptionnotfound.net/boat-anchor-the-daily-software-anti-pattern)

- [Wikipedia](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)

- [Refactoring.guru](https://refactoring.guru/smells/speculative-generality)

# Also Known as 

- Speculative Generality

# Credits

Photo by [Kris Mikael Krister](https://unsplash.com/@kmkr) on [Unsplash](https://unsplash.com/s/photos/anchor)

Thanks to @[Apoorv Tyagi](@apoorvtyagi) for pointing this out.

* * *

> It is very hard to predict, especially the future.

_Niels Bohr_ 
 
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)