# Code Smell 13 - Empty Constructors

![Code Smell 13 - Empty Constructors](Code%20Smell%2013%20-%20Empty%20Constructors.jpg)

*No-Parameterized constructors are a code smell of an **invalid** object that will dangerously mutate.
Incomplete objects cause lots of issues.*

> TL;DR: Pass the essence to all your objects so they will not need to mutate.

# Problems

- Mutability

- Incomplete objects

- Concurrency inconsistencies between creation and essence setting.

- Setters

[Nude Models - Part I: Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)

# Solutions

1. Pass the object's essence on creation

2. Create objects with their immutable essence.

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Examples

- Some persistence frameworks in static typed languages require an empty constructor.

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

# Exceptions

- Stateless objects. Always better solution than static class methods.

# More Info

[Code Exposed](https://codexposed.hashnode.dev/constructors-demystified)

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

[Code Smell 10 - Too Many Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2010%20-%20Too%20Many%20Arguments/readme.md)

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

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * * 

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)