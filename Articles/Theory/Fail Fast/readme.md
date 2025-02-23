# Fail Fast

![Fail Fast](Fail%20Fast.jpg)

> TL;DR: Fail fast. Don't hide your mistakes under the rug.

Failure to program in the 1950s had dire consequences. Machine time was very expensive. Jumping from punch cards to the compiler and then to execution could take hours or even days.

Luckily those times are long gone. Are they?

![Broken](https://cdn.hashnode.com/res/hashnode/image/upload/v1599358370864/3_fDLepJU.jpeg)

Photo by [chuttersnap](https://unsplash.com/@chuttersnap) on [Unsplash](https://unsplash.com/s/photos/fail)

# A methodological step back

In the 1980s, punch cards were no longer used. The code was written in a text editor, then the program was compiled and linked to generate executable code for a typical desktop application. 

This process was slow and tedious.

An error involved generating *logs* to a file with parts of the* execution stack* to try to isolate the cause of the defect. Try a fix, recompile, link, etc. and so iteratively.

With the arrival of interpreted languages, ​​we began to believe in the magic of editing the code *' on the fly'* with a *debugger* where we could access the state.

However, in the late 1990s with the rise of web systems, we went back several steps. Except in those cases where we could simulate the system on a local server, we put logs in the code again while debugging our integrated software remotely.
On the other hand. Thanks to the misuse of invalid abstractions our software-generated errors are far away from the failure and root cause of the problem.

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

This is worsened by the use of invalid representations with possible Null values ​​that generate unpredictable failures when trying to find out the origin of null values many function calls later.

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Defensive programming

The rise of autonomous cars allows us to learn about the behavior of drivers. Initially, the cars worked well following the traffic rules, but this caused accidents with cars driven by human beings. 

The solution was to train autonomous cars to drive defensively.

![Self-driving cars](https://cdn.hashnode.com/res/hashnode/image/upload/v1599358506859/K97ZPkU2M.jpeg)

As in many of our solutions, we are going to reverse the burden of proof.

> Let's suppose that the preconditions are not met and if so, fail quickly.

The argument against this type of inline control is always the same: The code becomes slightly *more complex *and potentially *less performant*. 

As always, in the face of laziness, we will reply that we privilege the robust code, and in the face of performance, we will request concrete evidence through a benchmark that shows what the true penalty really is.

As we saw in the article about the immutability of objects if an invalid date is created we must immediately report the problem.

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

<!-- [Gist Url](https://gist.github.com/mcsee/0a519a375e302a5d25ec09185bf95312) -->

```php
<?php

final class Date {

    function __construct($aMonthDay, $aMonth) {
        if (!$aMonth->includes($aMonthDay)) {
            throw new InvalidDateException($aMonthDay, $aMonth);
        }
        // ...
    }
}

$day30 = new Day(30);
$year2020 = new Year(2020);
$feb2020 = new YearMonth(2, $year2020);
$invalidDate = new Date($day30, $feb2020);
// will raise an exception. 
// No, It will not coerce to March,1st
// or do "under the rug magic" 
// to cover up the programmer contract violation
```

In this way, we will fail very close to the place where the fault occurs, and we can take action. Most of the "modern" languages ​​hide the dirt under the carpet and allow "continue (as if nothing happens)" the execution so that we have to debug the cause of the problem with logs in order to carry out a forensic analysis in search of the failure root cause far away.

## Representation is always important

The best way to fail fast is to properly represent objects while respecting our only design rule:

> Bijection with the real-world.

A misrepresentation of a geographic coordinate using an array with two integers is not going to know how to "defend" itself from possible invalid situations.

<!-- [Gist Url](https://gist.github.com/mcsee/ff148550e3d2018c2ee345ea0790e8fc) -->

```php
<?

$coordinate = array('latitude'=>1000, 'longitude'=>2000); 
// They are just arrays. A Bunch of raw data
```

For example, we can represent latitude 1000°, and longitude 2000° on a map as follows and this will generate errors when we want to calculate distances in some component that uses this coordinate (probably doing some kind of modulus magic and getting very cheap tickets).

![terraplanismo](https://cdn.hashnode.com/res/hashnode/image/upload/v1599358580807/9U8vls-h6.jpeg)

This is solved with good representations and with small objects that respect the bijection of both valid and invalid behaviors and states.

A bijection is straight: a coordinate is not an array. not all arrays are coordinates.

<!-- [Gist Url](https://gist.github.com/mcsee/a1794b5ca43c5229bb9e1c8b6a8b1041) -->

```php
<?

final class GeographicCoordinate{

    function __construct($latitude, $longitude) {
        if (!$this->isValidLatitude($latitude)) {
            throw new InvalidLatitudeException($latitude);
        }
        // ...
    }
}
```

This would be the first iteration. The coordinate should check that the latitude is within a range. But that would couple the coordinate to latitude violating the bijection rule. Latitude is not an integer and vice versa.

Let's be extreme:

<!-- [Gist Url](https://gist.github.com/mcsee/33f84258133eb9bafbac1f85532527c6) -->

```php
<?

final class Latitude {
    function __construct($degrees) {
        if (!$degrees->between(-90, 90)) {
            throw new InvalidLatitudeException($degrees);
        }
        // ...
    }
}
```

With this solution, we do not have to do any checks when building geographic coordinates because the latitude is valid per construction invariant and because it is correctly modeling its real counterpart.

As the last iteration, we should think about what a degree is. An integer? A float? It is clear that a degree exists in reality so we have to model it. No chance to escape.

By now performance purists are often outraged by the following thought:

> It is much easier and more readable to create a coordinate as an array than to do all that indirection of creating degrees, latitudes, longitudes, and coordinates.

To make this decision we always have to do performance, maintainability, reliability, and root cause analysis of our failures. Based on our desired quality attributes we will privilege one over the other. In my personal experience, the good and precise models survive much better requirements change and ripple effects, but that depends on each particular case.

![compass](https://cdn.hashnode.com/res/hashnode/image/upload/v1599358674225/EriqqmSnX.jpeg)

Photo by [Robert Penaloza](https://unsplash.com/@robertography) on [Unsplash](https://unsplash.com/s/photos/latitude)

# Let's go back to space

As the last example let's go back to the situation where the Mars Climate Orbiter rocket mentioned in the article exploded:

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

The rocket was developed by two teams from different countries using different metric systems. The example below is a simplified scenario.

<!-- [Gist Url](https://gist.github.com/mcsee/0f0f44841986926a762be86eef72ca4b) -->

```php
<?

$distance = 12.4; // miles
$supplyRatio = 10 ; // tons each kilometer
$neededSupply = $distance / $supplyRatio; 
// since units could not be mixed the should raise an error
// but the units were all floats 
// so the engine keep working and exploded
```

Instead of failing early and getting caught up in a *self-healing code routine *this error spread and blew up the rocket.

A simple check of measures would have detected the error and, potentially taken some corrective action.

# The exception is the rule

Our code must always be defensive and controlled by its invariants at all times as indicated by[ Bertrand Meyer.](https://en.wikipedia.org/wiki/Object-Oriented_Software_Construction) It is not enough to turn on and off [software assertions](https://en.wikipedia.org/wiki/Assertion_(software_development)). 

These assertions must always be on in productive environments. Once again, when faced with doubts about performance penalties, the forceful response must be certain evidence of significant degradation.

Exceptions must occur at all levels. If a movement is created with an invalid date the exception must be reported when creating the date. If the date is valid but it is incompatible with some business rule (for example, you cannot settle movements in the past) this must also be controlled.

<!-- [Gist Url](https://gist.github.com/mcsee/f7e0e7c0e3843e94ec021d2352a19f9b) -->

```php
<?

final class Movement { 

    function __construct($aParty, $aCounterParty, $anAmount, $aDate) {
        if ($aDate < Date::today()) {
            throw new InvalidMovementDateException($aDate);
        } // ...
   }
}
```

The solution is robust but it is coupling the movement to date and a static method of a global class. One of the worst possible couplings for a system that could run in multiple time zones.

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

To solve this problem we have several options:

1.  Leave the coupling to the class.
2.  Send as a parameter a date validator that can validate the date using double dispatch.
3.  Remove date validation responsibility from the movement.

When in doubt about our design decisions, we can always go back to our bijection and ask our business expert whose responsibility is this.

It is clear that by taking the third option we could potentially create movements with invalid dates. But the validity (or not) of the date is not a movement's responsibility and does not belong to its representation invariants.

The case would be different if a movement has an agreement date, a creation date, and a settlement date with clear business constraints among them. But then we would be facing a very low cohesive object.

> As always, design decisions involve continuous trade-offs.

# Conclusions

Suspecting an invalid situation, we must throw an exception in all cases. When in doubt, it should be done as early as possible.

We should never hide errors by coupling ourselves to the decision to mask this problem with the use of it that has to understand the situation.

We must strictly follow the bijection rule, creating the necessary abstractions that can defend themselves.

* * * * *

Part of the objective of this series of articles is to generate spaces for debate and discussion on software design.

[Object Design Checklist](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Object%20Design%20Checklist/readme.md)

We look forward to comments and suggestions on this article.

This article was published at the same time in Spanish [here](https://medium.com/@mcsee/falla-r%C3%A1pido-a24c0081d65a).