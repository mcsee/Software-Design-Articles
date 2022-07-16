# Code Smell 114 - Empty Class

![Code Smell 114 - Empty Class](kelly-sikkema-D6AlacFwS_Q-unsplash.jpg)

*Have you encountered classes without behavior? Classes are their behavior.*

> TL;DR: Remove all empty classes.

# Problems

- [Bijection](Theory\The One and Only Software Design Principle) Fault

- Namespace [Polluting](Code Smells\Code Smell 26 - Exceptions Polluting)

- Classes used as [DTOs](Code Smells\Code Smell 40 - DTOs)

- Classes used as [global references](Code Smells\Code Smell 60 - Global Classes)

# Solutions

1. Remove the classes and replace them with objects instead.

2. If your classes are Anemic Exceptions, [remove them](Refactorings\Refactoring 004 - Remove Unhandled Exceptions).

# Context

Many developers still think classes are [data repositories](Code Smells\Code Smell 01 - Anemic Models).

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
  // dd more functions to avoid anemic classes
  // getters are also code smells, so we need to iterate it
}

bookItem = new ShopItem('book', 'some book);
// create more items
```

# Detection

[X] Automatic 

Several linters warn us of empty classes. 

We can also make our own scripts using [metaprogramming](Theory\Lazyness I - Metaprogramming).

# Tags

- Behavior

# Conclusion

Classes are what they do, their behavior.

Empty classes do nothing.

# Relations

[Code Smell 26 - Exceptions Polluting](Code Smells\Code Smell 26 - Exceptions Polluting)

[Code Smell 40 - DTOs](Code Smells\Code Smell 40 - DTOs)

[Code Smell 60 - Global Classes](Code Smells\Code Smell 60 - Global Classes)

[Code Smell 01 - Anemic Models](Code Smells\Code Smell 01 - Anemic Models)

# More Info

- [The one and only Design Principle](Theory\The One and Only Software Design Principle)

- [Refactoring 004 - Remove Unhandled Exceptions](Refactorings\Refactoring 004 - Remove Unhandled Exceptions)

# Credits

Photo by [Kelly Sikkema](https://unsplash.com/@kellysikkema) on [Unsplash](https://unsplash.com/s/photos/empty)
  
* * *

> An error arises from treating object variables (instance variables) as if they were data attributes and then creating your hierarchy based on shared attributes. Always create hierarchies based on shared behaviors, side.

_David West_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()