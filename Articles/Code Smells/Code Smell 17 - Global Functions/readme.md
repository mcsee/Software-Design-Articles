# Code Smell 17 - Global Functions

![Code Smell 17 - Global Functions](mae-mu-coJsSbM4yDc-unsplash.jpg)

*Discouraged by Object-Oriented Programmings, Many mixed languages support it. And developers abuse them.*

> TL;DR: Global function bring a lot of coupling. Don't use them.

# Problems

- Coupling

- Readability

- Maintainability

- Testability

# Solutions

- Wrap the function in a context object.

# Examples

- External Resources Access, Database access, Time and Operating System resources.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/4713b63031ad073d46701b7b4c81b028)
```php
<?

class Employee {
    function taxesPayedUntilToday() {
        return database()->select(
            "SELECT TAXES FROM EMPLOYEE".
            " WHERE ID = " . $this->id() .
            " AND DATE < " . currentDate());
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/74d9534ee563afc1fdf766b90115fb10)
```php
<?

final class EmployeeTaxesCalculator {
    function taxesPayedUntilToday($context) {
        return $context->SelectTaxesForEmployeeUntil(
            $this->ssn,
            $context->currentDate());
    }
}
```

# Detection

Many modern languages avoid them. For the permissive ones, scope rules can be applied and automatically checked.

# Tags

- Global

# Conclusion

Structured programming considers global functions **harmful**. Yet, we can observe some bad practices cross paradigm boundaries.

# Relations

- Singleton and Classes are global points of access.

[Singleton - The root of all evil](Theory\Singleton - The root of all evil)

# More Info

- [Wikipedia](https://en.wikipedia.org/wiki/Global_variable)

# Credits

Photo by [Mae Mu](https://unsplash.com/@picoftasty) on [Unsplash](https://unsplash.com/s/photos/spaghetti)

* * *

> The road to programming hell is paved with global variables.

_Steve McConnell_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()