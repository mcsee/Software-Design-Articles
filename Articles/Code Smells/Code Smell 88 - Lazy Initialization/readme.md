# Code Smell 88 - Lazy Initialization

![Code Smell 88 - Lazy Initialization](Code%20Smell%2088%20-%20Lazy%20Initialization.jpg)

*Yet another premature optimization pattern*

> TL;DR: Do not use lazy initialization. Use an object provider instead.

# Problems

- Surprising Side Effects

- Premature Optimization

- Fail Fast Violation

- Implementative Coupling

- The Least Surprise Principle Violation

- [Null Usage](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

- Mutability

- Transactional and Multi-threaded applications problems

- [Debugging Problems](https://martinfowler.com/bliki/LazyInitialization.html)

# Solutions

1. Inject Responsibilities with First Class Objects

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/0d762f54e37352ed72eee7e77d0ae5e0)

```ruby
class Employee
  def emails
    @emails ||= []
  end
  
  def voice_mails
    @voice_mails ||= []
  end
end
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/dbd08513d5005325e63954515052555d)

```ruby
class Employee
  attr_reader :emails, :voice_mails

  def initialize
    @emails = []
    @voice_mails = []
  end
end
# You can also inject a design pattern to externally deal
# with voice_mails so you can mock it in your tests
```

# Detection

Lazy initialization is a common pattern when used checking for a non-initialized variable. 

It should be straightforward to detect them.

# Tags

- Premature Optimization

# Conclusion

[Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20root%20of%20all%20evil/readme.md) are another antipattern often combined with lazy initialization.

We must avoid premature optimizations. If we have *real* performance problems we should use a Proxy, Facade or more independent solution.

# Relations

[Code Smell 32 - Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2032%20-%20Singletons/readme.md)

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

# More Info

- [Wikipedia](https://en.wikipedia.org/wiki/Lazy_initialization)

- [Martin Fowler](https://martinfowler.com/bliki/LazyInitialization.html)

# Credits

Photo by [Sam Solomon](https://unsplash.com/@samsolomon) on [Unsplash](https://unsplash.com/s/photos/lazy)  

* * *

> We have to stop optimizing for programmers and start optimizing for users.

_Jeff Atwood_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)