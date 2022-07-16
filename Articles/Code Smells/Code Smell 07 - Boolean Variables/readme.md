# Code Smell 07 - Boolean Variables

![Code Smell 07 - Boolean Variables](phil-hearing-XIvn5uz8wGQ-unsplash.jpg)

*Using boolean variables as flags, exposes accidental implementation and pollutes the code with Ifs.*

> TL;DR: Don't use boolean variables, they force you to write Ifs. Create polymorfic states instead.

# Problems

- Extensibility

- Comparison in some languages

# Solutions

- If Boolean maps to a real world entity is safe.
Otherwise, model as a State to favor Extensibility. 
This also follows [Open/Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).

# Examples

- Flags 

# Exceptions

-  Real world true/false rules

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/5a3e8e05def917a29b84be7264493a67)
```php
<?

function processBatch(
    bool $useLogin,
    bool $deleteEntries,
    bool $beforeToday) {
    // ...
}
``` 

## Right

[Gist Url]: # (https://gist.github.com/mcsee/66956e6ccfe8126d0819fa193d793dd5)
```php
<?

function processBatch(
    LoginStrategy $login,
    DeletionPolicy $deletionPolicy,
    Date $cutoffDate) {
    // ...
}
``` 

# Detection

Automatic detection can warn for boolean usage, but this can yield false positives.

# Relations

Some languages have issues with boolean comparators.

![0_QjZ76_c6hmi1UfXc[1].jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1603587404705/M5_udJ8Cw.jpeg)

In these coupled with accidental complexity languages, booleans are a common error source.

# Also Known as

- Flag Abuser
 
# Tags

- Declarative

- Primitive

# More info

%[https://martinfowler.com/bliki/FlagArgument.html]

# Conclusion

Take extra care when declaring something *boolean*. Flags are difficult to maintain and extend. 
Learn more about the domain. Try migrating to [state design pattern](https://en.wikipedia.org/wiki/State_pattern). Use polymorphism instead of ifs/switch/cases.

# Credits

Photo by [Phil Hearing](https://unsplash.com/@philhearing) on [Unsplash](https://unsplash.com/s/photos/flag-finish)

These tweets inspired this code smell:

[Twitter](https://twitter.com/1319247170294472705)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()