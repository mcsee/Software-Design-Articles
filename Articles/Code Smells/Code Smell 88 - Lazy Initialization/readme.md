# Code Smell 88 - Lazy Initialization

![Code Smell 88 - Lazy Initialization](sam-solomon-Xxj3UwgLfeI-unsplash.jpg)

*Yet another premature optimization pattern*

> TL;DR: Do not use lazy initialization. Use an object provider instead.

# Problems

- Surprising Side Effects

- Premature Optimization

- Fail Fast Violation

- Implementative Coupling

- The Least Surprise Principle Violation

- [Null Usage](https://maximilianocontieri.com/null-the-billion-dollar-mistake)

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
#We can also inject a design pattern to externally deal
#with voice_mails so we can mock it in our tests
```

# Detection

Lazy initialization is a common pattern when used checking for a non-initialized variable. 

It should be straightforward to detect them.

# Tags

- Premature Optimization

# Conclusion

[Singletons](https://maximilianocontieri.com/singleton-the-root-of-all-evil) are another antipattern often combined with lazy initialization.

We must avoid premature optimizations. If we have *real* performance problems we should use a Proxy, Facade or more independent solution.

# Relations

[Code Smell 32 - Singletons](https://maximilianocontieri.com/code-smell-32-singletons)

[Code Smell 12 - Null](https://maximilianocontieri.com/code-smell-12-null)

# More Info

- [Wikipedia](https://en.wikipedia.org/wiki/Lazy_initialization)

- [Martin Fowler](https://martinfowler.com/bliki/LazyInitialization.html)

# Credits

Photo by [Sam Solomon](https://unsplash.com/@samsolomon) on [Unsplash](https://unsplash.com/s/photos/lazy)  

* * *

> We have to stop optimizing for programmers and start optimizing for users.

_Jeff Atwood_
 
[Software Engineering Great Quotes](Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://maximilianocontieri.com/how-to-find-the-stinky-parts-of-your-code)