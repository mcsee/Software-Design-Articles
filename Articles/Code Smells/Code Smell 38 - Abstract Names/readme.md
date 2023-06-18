# Code Smell 38 - Abstract Names

![Code Smell 38 - Abstract Names](Code%20Smell%2038%20-%20Abstract%20Names.jpg)

*Avoid too abstract names. Names should have real-world meaning*

> TL;DR: Don't use abstract names

# Problems

- Implemental Naming

- Meaningless names

- Broken [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) and [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) to real-world entities.

# Solutions

1. Choose meaningful names.

2. Find metaphors.

3. Avoid words like *abstract*, *base*, *generic*, *helper* etc.

4. Use [rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md) for naming.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/568bc61348f648e3e0db8434b59b92a2)
```php
<?

final class Repository {

}

final class MeetingsCollection {

}

final class AccountsComposite {

}

final class NotesArray {

}

final class LogCollector {

}

abstract class SearcherBase {

}

abstract class AbstractTransportation {

}

```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/106a64e384b1348dea8b1d486b4bacc5)
```php
<?

final class Schedule {

}

final class Portfolio {

}

final class NoteBook {

}

final class Journal {

}

final class Vehicle {

}
```

# Detection

We can set up policies and rules warning for certain words like *base, abstract, helper, manager, object etc*.

# Tags

- Naming

# Conclusion

Finding names is the last thing we should do on our designs. Unless we have a clear business understanding, good names emerge at the end after defined behavior and protocol boundaries.

# Relations

[Code Smell 22 - Helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md)

[Code Smell 25 - Pattern Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2025%20-%20Pattern%20Abusers/readme.md)

# More Info

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Credits

Photo by [Rodion Kutsaev](https://unsplash.com/@frostroomhead) on [Unsplash](https://unsplash.com/s/photos/abstract)

* * *

> There are only two hard things in Computer Science: cache invalidation and naming things.

_Phil Karlton_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)
