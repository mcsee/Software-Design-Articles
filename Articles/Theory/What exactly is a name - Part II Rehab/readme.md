# What exactly is a name - Part II Rehab

![What exactly is a name - Part II Rehab](What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab.jpg)

*We all agree: a good name is always the most important thing. Let’s find them.*

> TL;DR: Change your bad names for good ones

_We all use names for programming, it doesn’t matter if the language is high or low level, whether it is Imperative, Functional, or [Object -Oriented](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Explain%20in%205%20Levels/Explain%20in%205%20Levels%20of%20Difficulty%20Object-Oriented%20Programming/readme.md). Names are everywhere. But we continue to misuse them. In this second part, we will see how to change some habits._

# The search is ongoing

In a previous article, we introduced various definitions and techniques for looking for good names.

In this article, we will try to show some present problems with nomenclature in order to improve our practices.

[What exactly is a name - Part I The Quest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md)

## We do not need help

All objects help, There are no “non-supportive” objects.

> In the real-world there are no helpers.

We have a single design rule. If a concept does not exist in the real-world and we cannot explain it to a domain expert, that object must not exist.

![Lifeguard](https://cdn.hashnode.com/res/hashnode/image/upload/v1599773186331/h7PjoVYs2.jpeg)

Photo by [Big Dodzy](https://unsplash.com/@bigdodzy) on [Unsplash](https://unsplash.com/s/photos/baywatch)

> Rule 9: Helpers don’t exist

[Code Smell 22 - Helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md)

## We don’t need bosses

All objects are born equal. Our designed objects will have [social equality](https://en.wikipedia.org/wiki/Social_equality). 

There are no managers. 

There are objects with different responsibilities.

In the real-world, there are no managers (unless we are modeling job roles).

> Rule 10: Managers do not exist.

![Manager](https://cdn.hashnode.com/res/hashnode/image/upload/v1599773241609/kJmrWx6Jj.jpeg)

Photo by [Amy Hirschi](https://unsplash.com/@amyhirschi) on [Unsplash](https://unsplash.com/s/photos/boss)

## We don’t need to say “objects.”

Objects are omnipresent. Naming a class by saying Object… is a code smell like the ones mentioned above.

> Rule 11: Objects don’t exist. They all are.

## [All your Base are belong to us](https://es.wikipedia.org/wiki/All_your_base_are_belong_to_us)

Unless we are modeling a space or military system we should not name our classes with the name Base.

_Base_ stands for the absence of a real-world abstract concept and the chances we are reusing code through inheritance. Yet another code smell.

This violates the design principle that suggests we favor the (dynamic) composition of objects over the (static) inheritance of classes.

> Rule 12: Base objects do not exist.

[![Watch the video](https://img.youtube.com/vi/jQE66WA2s-A/sddefault.jpg)](https://youtu.be/jQE66WA2s-A) 

All these names are very bad. There are  [humorous sites](https://projects.haykranen.nl/java/) that generate them automatically.

## We don’t need accessors

As we saw in previous articles, having _setters_ and _getters_ leads to encapsulation violations and misassignments of responsibilities. We should be suspicious of all _getXXX()_ or _setXXX()_ functions.

We do not usually find these responsibilities in domain entities in the bijection to the real-world. There are no real _set()_ and _get()_ responsibilities in business models.

[Nude Models - Part I: Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)

In the accidental case of matching responsibility with an attribute, we will call the function in the same way without the _get()_ prefix.

<!-- [Gist Url](https://gist.github.com/mcsee/2fd1605ce5b27e5c6db52c4e8482b4bc) -->

```php
<?

class Polygon {

    function getVertices(): Collection { // Wrong
        // ...
    }

    function vertices(): Collection { // Right
        // ...
    }
}
```

[Nude Models - Part II: Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md)

> Rule 13: There are no setXXX or getXXX methods.

## Don’t ask who I am

Functions that start with _isXXX()_ are usually implementative.

They ask for a type (avoiding the double dispatch pattern), generate coupling, and are always followed by an if.

As a general rule, we should restrict the use of Booleans to situations where such Booleans exist in the real-world.

As a corollary, thinking on the MAPPER, distrust the _isXXX()_ methods.

> Rule 14: There are no isXXX() methods.

## If it smells like interface it is Interface

Names like iterable, serializable, etc. preach about the object’s responsibilities. They will be excellent interface names and therefore we should not use them to name classes.

> Rule 15: The names… able remain for the interfaces (therefore they cannot be instantiated)

## Ducks on a pond

Ducks are always present in software development.

There’s the [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging) technique. And this is the [duck typing](https://en.wikipedia.org/wiki/Duck_typing) technique

![Rubber Duck](https://cdn.hashnode.com/res/hashnode/image/upload/v1599774256560/0gVqSW2xx.jpeg)

Photo by [Jordan M. Lomibao](https://unsplash.com/@jlcruz_photography) on [Unsplash](https://unsplash.com/s/photos/rubber-duck)

> When I see a bird that walks like a duck, it swims like a duck, and sounds like a duck, I call that bird a duck.
> 
> James Whitcomb Riley

This technique suggests that we know objects by their responsibilities and their context role. A corollary states we should name objects according to that responsibility.

> Rule 16: Use names after observing behavior.

## Naming patterns

The greatest benefit of known design patterns is the unification of a common language.

We all know what a _decorator_, a _strategy_, an _adapter_ or a _facade_ is. And we know that you should never use _Singletons_:

[Singleton - The root of all evil](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20root%20of%20all%20evil/readme.md)

> Rule 17: Use pattern names for implementing concepts.

## If it is abstract, it has an abstract name.

Our language is very rich and has many words that model concepts. If we want to group concepts using the Aristotelian classification technique, we will name the classes with those names.

This is a classic example to show inheritance:

The common superclass of _{Car, Boat, Airplane}_ Should not be **AbstractCar** or **BaseCar**, neither **BaseBoat** nor **Movable**.

It should be **Vehicle**.

> Rule 18: Abstract names must be discovered. Not invented.
> 
> Corollary 18: Do not use the word abstract as part of a name.

## Responsibility is the best name

The best rule for naming a class is finding its counterpart in the bijection. Should this be hard, we should understand the concept based on their responsibilities.

Let’s see an example:

If it can be traversed, it can be added and it can be removed, it is not an **ArrayHelper**, not an **ArrayManager**, not a **BaseArray**, much less an **ArrayObject**.

For example, when trying to group: _Array_, _Set_, _LinkedList_, Multiset, _Stack_, _Queue_, etc. we can derive the word that best describes them all.

Its main responsibility is to **collect** items, therefore we are in the presence of a **Collection**.

We will learn this only after knowing many of its subclasses using the Liskov Substitution Principle (the L for Solid).

> Rule 19: In order to name concepts we must know their protocol.

## We speak the same language

As for myself a native Spanish speaker teaching at a University, students often ask us if they should assign names in Spanish (the business language) or in English (the base language of programming languages).

If we are to be consistent with the polymorphism of the functions, we must always use the **same** language.

For the _foreach() iterator_ to be polymorphic with all iterable objects it must have its name in English.

If we create an object with a **recorrer()** function _(traverse in Spanish)_, we will lose the polymorphism and we will have to couple it with an if rule.

> 20: The code must be written in English.

# Rules Summary

*   Names must be declarative and not implementing.
*   Names must be contextual.
*   Do not mix type with the role.
*   Do not use setters or getters.
*   Do not use non-existent terms such as Manager, Helper, Base.
*   Do not use too generic terms, such as Object.
*   Assign responsibilities before assigning names.
*   When in doubt, put bad names.
*   Avoid comments.

----

Part of the objective of this series of articles is to generate spaces for debate and discussion on software design.
 
We look forward to comments and suggestions on this article.

You can hit me up on [Twitter](https://twitter.com/mcsee1).