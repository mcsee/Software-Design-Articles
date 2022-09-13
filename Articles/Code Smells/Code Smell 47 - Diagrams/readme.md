# Code Smell 47 - Diagrams

![Code Smell 47 - Diagrams](Code%20Smell%2047%20-%20Diagrams.jpg)

*Diagrams are not code. They cannot be a code smell. They are just Diagram Smells.*

# Problems

- Maintainability

- Trash code

- Code Duplications

- Diagrams focus only on structure (accidental) and not behavior (essential).

# Solutions

1. Use diagrams only to communicate ideas with other humans.

2. Program on your favorite IDE.

3. Thrash all diagrams. Even the ones generated from the source code.

4. Trust your tests. They are alive and well maintained.

5. Use [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) technique.

# Examples

- [Automatic Code Generators](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20II%20-%20Code%20Wizards/readme.md)

# Sample Code

## Wrong

![class-example-library-domain](https://cdn.hashnode.com/res/hashnode/image/upload/v1607469295593/BHMBjTokB.png)

## Right

[Gist Url]: # (https://gist.github.com/mcsee/36f0af6785ea36a05c3ec394fa71e4e8)
```php
w<?

final class BookItem {
    // No. We will not inherit from concrete class Book since this is another smell

    // No. We will not list a bunch of anemic attributes. since yet this is another smell

    function numberOfPages() {
        //
    }

    function language(): Language {
        //
    }

    function book(): Book {
        // Book can tell us a lot about her/his author, title etc.

    }

    function edition(): BookEdition {
        // ..
    }

    // Loan and overdues are not book items responsibility

}

final class LoanTracker {
    function loan(BookItem $bookCopy, LibraryUser $reader, DatePeriod $loanDates) {
        // DatePeriod is better than anemic $fromDate and $toDate
    }
}

final class LoanTrackerTests extends TestCase {
    // Lots of maintained tests telling us how the system really works
}
```

# Detection

We can remove all code annotations and forbid them by policy. 

# Conclusion

Designing is a contact sport. We need to prototype and learn from our running models. 

Papers and JPGs don't run. They live in the utopic world where everything works smoothly.

[CASE](https://en.wikipedia.org/wiki/Computer-aided_software_engineering) was a very hot trend back in the 90s. 
No good system was developed with these tools.

# Relations

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 25 - Pattern Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2025%20-%20Pattern%20Abusers/readme.md)
 
# More info

[Laziness II - Code Wizards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20II%20-%20Code%20Wizards/readme.md)

%[https://en.wikipedia.org/wiki/Computer-aided_software_engineering]

%[https://en.wikipedia.org/wiki/Domain-driven_design]

# Credits

Photo by [Nick Seagrave](https://unsplash.com/@seagrave) on [Unsplash](https://unsplash.com/s/photos/map)

* * *

> The Diagram is Not the Model. The model is not the diagram. It is an abstraction, a set of concepts and relationships between them.

_Eric Evans_

* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)