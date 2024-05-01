# Code Smell 114 - Empty Class

![Code Smell 114 - Empty Class](Code%20Smell%20114%20-%20Empty%20Class.jpg)

*Have you encountered classes without behavior? Classes are their behavior.*

> TL;DR: Remove all empty classes.

# Problems

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault

- Namespace [Polluting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2026%20-%20Exceptions%20Polluting/readme.md)

- Classes used as [DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

- Classes used as [global references](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2060%20-%20Global%20Classes/readme.md)

# Solutions

1. Remove the classes and replace them with objects instead.

2. If your classes are Anemic Exceptions, [remove them](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20004%20-%20Remove%20Unhandled%20Exceptions/readme.md).

# Context

Many developers still think classes are [data repositories](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md).

They couple *different behavior* concept with *returning different data*.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/729e6032d21c0c2997228680170ff768)

```javascript
class ShopItem { 
  code() { }
  description() { }                 
}

class BookItem extends ShopItem { 
   code() { return 'book' }
   description() { return 'some book'}     
}

// concrete Class has no real behavior, just return different 'data'
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/a8c680954291f8d9be4023ff8062b504)

```javascript
class ShopItem { 
  constructor(code, description) {
    // validate code and description
    this._code = code;
    this._description = description;
  }
  code() { return this._code }
  description() { return this._description }                 
  // Add more functions to avoid anemic classes
  // getters are also code smells, so you need to iterate it
}

bookItem = new ShopItem('book', 'some book);
// create more items
```

# Detection

[X] Automatic 

Several linters warn us of empty classes. 

We can also make our own scripts using [metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md).

# Tags

- Behavior

# Conclusion

Classes are what they do, their behavior.

Empty classes do nothing.

# Relations

[Code Smell 26 - Exceptions Polluting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2026%20-%20Exceptions%20Polluting/readme.md)

[Code Smell 40 - DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

[Code Smell 60 - Global Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2060%20-%20Global%20Classes/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 136 - Classes With just One Subclass](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20136%20-%20Classes%20With%20just%20One%20Subclass/readme.md)

# More Info

- [The one and only Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

- [Refactoring 004 - Remove Unhandled Exceptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20004%20-%20Remove%20Unhandled%20Exceptions/readme.md)

# Credits

Photo by [Kelly Sikkema](https://unsplash.com/@kellysikkema) on [Unsplash](https://unsplash.com/s/photos/empty)
  
* * *

> An error arises from treating object variables (instance variables) as if they were data attributes and then creating your hierarchy based on shared attributes. Always create hierarchies based on shared behaviors, side.

_David West_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)