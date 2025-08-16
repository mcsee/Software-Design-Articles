# Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)

![Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings).jpg)

*This handy operator is a trouble maker.*

> TL;DR: Don't mix booleans with non-booleans.

# Problems 😔 

- Not Declarative Code

- Hard to debug

- Magic Castings

- Accidental Complexity

# Solutions 😃

1. Be Explicit

2. Don't mix Booleans with non-booleans.

3. [Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

4. Be Smarter than your compiler.

5. Stay loyal to the bijection.

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/2ba58f618ce930b3d8361596e1a76d28) -->

```javascript
!true // returns false
!false // returns true

isActive = true
!isActive // returns false

age = 54
!age // returns false
array = []
!array // returns false
obj = new Object;
!obj // returns false

!!true // returns true
!!false // returns false

!!isActive // returns true
!!age // returns true
!!array // returns true
!!obj // returns true
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/fef521fa00f16f2e302d2f7ef41bf178) -->

```javascript
!true // returns false
!false // returns true

isActive = true 
!isActive // returns false

age = 54
!age // should return type mismatch (or 54 factorial!)
array = []
!array // should return type mismatch
obj = new Object;
!obj // should return type mismatch 
// (what is an object negated in a real domain?)

!!true // returns true - it is idempotent
!!false // returns false - it is idempotent

!!isActive // returns true - it is idempotent
!!age // nonsense
!!array // nonsense
!!obj // nonsense
```

# Detection 🔍

Since this is a "feature" in some languages it would be hard to test. We can set programming policies or choose more [strict languages](https://dev.to/tmaximini/typescript-bang-operator-considered-harmful-3hhi).

We should detect *!* *!!* usages in non-boolean objects and warn our programmers.

# Tags 🏷️

- Types

# Conclusion 🏁

Languages like JavaScript divide their whole universe into *true* or *false* values. This decision hides errors when dealing with non booleans. 

We should be very strict and keep booleans (and their behavior), far away from non booleans.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 24 - Boolean Coercions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2024%20-%20Boolean%20Coercions/readme.md)

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 101 - Comparison Against Booleans](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20101%20-%20Comparison%20Against%20Booleans/readme.md)

# More Information 📕

[Programmer Humor](https://www.reddit.com/r/ProgrammerHumor/comments/6erd7r/the_best_thing_about_a_boolean_is_that_even_if/)

[Double Bang](https://www.bennadel.com/blog/3858-the-double-bang-operator-and-a-misunderstanding-of-how-javascript-handles-truthy-falsy-values.htm)

[Mozilla](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)

[Wat Video](https://www.destroyallsoftware.com/talks/wat)

# Credits 🙏

Photo by [Greg Rakozy](https://unsplash.com/@grakozy) on [Unsplash](https://unsplash.com/s/photos/universe)  

* * *

> It is easier to write an incorrect program than understand a correct one.

_Alan J Perlis_
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)