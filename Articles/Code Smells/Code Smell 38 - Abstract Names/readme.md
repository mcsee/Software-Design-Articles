# Code Smell 38 - Abstract Names

![Code Smell 38 - Abstract Names](rodion-kutsaev-F573ZRbKOEw-unsplash.jpg)

*Avoid too abstract names. Names should have real world meaning*

# Problems

- Implemental Naming

- Meaningless names

- Broken [MAPPER](Theory\What is (wrong with) software) and [Bijection](Theory\The One and Only Software Design Principle) to real world entities.

# Solutions

1. Choose meaningful names.

2. Find metaphors.

3. Avoid words like *abstract*, *base*, *generic*, *helper* etc.

4. Use [rules](Theory\What exactly is a name — Part II Rehab) for naming.

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

[Code Smell 22 - Helpers](Code Smells\Code Smell 22 - Helpers)

[Code Smell 25 - Pattern Abusers](Code Smells\Code Smell 25 - Pattern Abusers)

# More info

[What exactly is a name — Part II Rehab](Theory\What exactly is a name — Part II Rehab)

# Credits

Photo by [Rodion Kutsaev](https://unsplash.com/@frostroomhead) on [Unsplash](https://unsplash.com/s/photos/abstract)

* * *

> There are only two hard things in Computer Science: cache invalidation and naming things.

_Phil Karlton_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)


