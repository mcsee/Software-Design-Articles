# Code Smell 60 - Global Classes

![Code Smell 60 - Global Classes](alfons-morales-YLSwjSy7stw-unsplash.jpg)

*Classes are handy. We can call them and invoke them any time. Is this good?*

TL;DR: Don't use your classes as a global point of access.

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

[Code Smell 18 - Static Functions](Code Smells\Code Smell 18 - Static Functions)

[Code Smell 17 - Global Functions](Code Smells\Code Smell 17 - Global Functions)

# More info

[Singleton - The root of all evil](Theory\Singleton - The root of all evil)

[Coupling - The one and only software design problem](Theory\Coupling - The one and only software design problem) 

# Credits

Photo by [Alfons Morales](https://unsplash.com/@alfonsmc10) on [Unsplash](https://unsplash.com/s/photos/large-library)

* * *

> Write shy code — modules that don't reveal anything unnecessary to other modules and that don't rely on other modules' implementations.

_Dave Thomas_
 
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()