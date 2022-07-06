# Code Smell 13 - Empty Constructors

![Code Smell 13 - Empty Constructors](pexels-brett-jordan-4692281.jpg)

*No-Parameterized constructors are a code smell of an **invalid** object that will dangerously mutate.
Incomplete objects cause lots of issues.*

> TL;DR: Pass the essence to all your objects so they will not need to mutate.

# Problems

- Mutability

- Incomplete objects

- Concurrency inconsistencies between creation and essence setting.

- Setters

[Nude Models - Part I: Setters](Theory\Nude Models - Part I Setters)

# Solutions

1. Pass the object's essence on creation

2. Create objects with their immutable essence.

[The Evil Power of Mutants](Theory\The Evil Power of Mutants)

# Examples

- Some persistence frameworks in static typed languages require an empty constructor.

# Exceptions

- Stateless objects. Always better solution than static class methods.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/d9d34fad693fd4f6309d68636a5010e5)
```javascript
class AirTicket {
   constructor() {     
  }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/2e8f884045798f699399bf1ba9c26ab2)
```javascript
class AirTicket {
   constructor(origin, destination, arline, departureTime, passenger) {     
     
  // ...
  }
}
```

# Detection

Any linter can warn this (possible) situation.

# More info

https://codexposed.hashnode.dev/constructors-demystified

[The Evil Power of Mutants](Theory\The Evil Power of Mutants)

[Code Smell 10 - Too Many Arguments](Code Smells\Code Smell 10 - Too Many Arguments)

# Tags

- Essence

- Incomplete

- Mutable

# Conclusion

Always create complete objects. Make their essence immutable to endure through time.

Every object needs its essence to be a valid one since inception.

We should read Plato's ideas about immutability and create entities in a complete and immutable way.

These immutable objects favor bijection and survive the passing of time.

# Credits

Photo by Brett Jordan in Pexels

* * *

> In a purely functional program, the value of a [constant] never changes, and yet, it changes all the time! A paradox!

_Joel Spolski_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * * 

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)