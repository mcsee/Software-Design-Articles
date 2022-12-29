# Code Smell 60 - Global Classes

![Code Smell 60 - Global Classes](Code%20Smell%2060%20-%20Global%20Classes.jpg)

*Classes are handy. We can call them and invoke them at any time. Is this good?*

> TL;DR: Don't use your classes as a global point of access.

# Problems

- Coupling

- Classes are global unless we use Namespaces.

- Name polluting

- Static Methods

- Static Constants

- Singletons

# Solutions

1. Use namespaces, module qualifiers or similar

2. Avoid namespace polluting, keep the Global names as short as possible.

3. Class single Responsibility is to create instances. 

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/6b3f0e2a24ea7a6da72dadcbb36a8dd0)
```php
<?

final class StringUtilHelper {
    static function reformatYYYYDDMMtoYYYYMMDD($date) {
    }
}

class Singleton {

}

final class DatabaseAccessor extends Singleton {

}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/9dd928bab5528d07b7f63b5d76821f4f)
```php
<?

namespace Date;

final class DateFormatter {

    function reformatYYYYDDMMtoYYYYMMDD(Date $date) {
    }
    // function is not static since class single responsibility
    // is to create instances and not be a library of utils

}

namespace OracleDatabase;

class DatabaseAccessor {
    // Database is not a singleton and it is namespace scoped
}
```

# Detection

We can use almost any linter or create dependency rules searching for bad class references.

# Tags

- Globals

# Conclusion

We should restrict our classes to small domains and expose just facades to the outside. This greatly reduces coupling.
 
# Relations

[Code Smell 18 - Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md)

[Code Smell 17 - Global Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2017%20-%20Global%20Functions/readme.md)

# More Info

[Singleton - The root of all evil](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20root%20of%20all%20evil/readme.md)

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) 

# Credits

Photo by [Alfons Morales](https://unsplash.com/@alfonsmc10) on [Unsplash](https://unsplash.com/s/photos/large-library)

* * *

> Write shy code — modules that don't reveal anything unnecessary to other modules and that don't rely on other modules' implementations.

_Dave Thomas_
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)