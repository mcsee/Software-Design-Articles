# Code Smell 39 - new Date()

![Code Smell 39 - new Date()](Code%20Smell%2039%20-%20new%20Date().jpg)

*70s first tutorial: getCurrentDate(). Piece of Cake. We are in the 20s Time is global no more*

> TL;DR: Don't user new Date()

# Problems

- Coupling

- Fragile Tests

- Timezone Problems

# Solutions

1. Use Dependency injection to decouple time source.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/272ba8ead8cb11037d97f6a0cd473ef2)
```javascript
var today = new Date();
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/51f09b9c56f077aa2954745c1f43da2c)
```javascript
var ouagadougou = new Location(); 
var today = myTimeSource.currentDateIn(ouagadougou);

function testGivenAYearHasPassedAccruedInterestsAre10() {
    var mockTime = new MockedDate(new Date(2021, 1, 1));
    var domainSystem = new TimeSystem(mockTime);
    // ..
    mockTime.moveDateTo(new Date(2022, 1, 1));
    // … You set up the yearly interest rate
    assertEquals(10, domainSystem.accruedInterests());
}
```

# Detection

We should forbid global functions policies. We need to couple to accidental and pluggable time sources.

# Tags

- Globals

# Conclusion

```Date.today() , Time.now()```,  and other global system calls are coupling smell. 

Since **tests must be in full environmental control**. We should easily set up time, moved it back and forth etc.

**Date** and **Time** classes should only create immutable instances. It is not their responsibility to give the actual time. This violates Single Responsibility Principle.

The passage of time is always scorned by programmers. This makes objects mutable and designs poor and coupled.

# Relations

[Code Smell 18 - Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md)

[Code Smell 77 - Timestamps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2077%20-%20Timestamps/readme.md)

# More Info

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

* * *

> In programming, the hard part isn't solving problems, but deciding what problems to solve.

_Paul Graham_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)