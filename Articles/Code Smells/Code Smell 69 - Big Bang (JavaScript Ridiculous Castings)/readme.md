# Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)

![Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](greg-rakozy-0LU4vO5iFpM-unsplash.jpg)

*This handy operator is a trouble maker.*

> TL;DR: Don't mix booleans with non-booleans.

# Problems

- Not Declarative Code

- Hard to debug

- Magic Castings

- Accidental Complexity

# Solutions

1. Be Explicit

2. Don't mix Booleans with non-booleans.

3. [Fail Fast](Theory\Fail Fast)

4. Be Smarter than your compiler.

5. Stay loyal to the bijection.

[The One and Only Software Design Principle](Theory\The One and Only Software Design Principle)

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/2ba58f618ce930b3d8361596e1a76d28)
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

## Right

[Gist Url]: # (https://gist.github.com/mcsee/fef521fa00f16f2e302d2f7ef41bf178)
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
!obj // should return type mismatch (what is an obejct negated in a real domain?)

!!true // returns true - it is idempotent
!!false // returns false - it is idempotent

!!isActive // returns true - it is idempotent
!!age // nonsense
!!array // nonsense
!!obj // nonsense
```

# Detection

Since this is a "feature" in some languages it would be hard to test. We can set programming policies or choose more [strict languages](https://dev.to/tmaximini/typescript-bang-operator-considered-harmful-3hhi).

We should detect *!* *!!* usages in non-boolean objects and warn our programmers.

# Tags

- Casting

- Coercion

- Javascript

# Conclusion

Languages like JavaScript divide their whole universe into *true* or *false* values. This decision hides errors when dealing with non booleans. 

We should be very strict and keep booleans (and their behavior), far away from non booleans.

# Relations

[Code Smell 24 - Boolean Coercions](Code Smells\Code Smell 24 - Boolean Coercions)

[Code Smell 06 - Too Clever Programmer](Code Smells\Code Smell 06 - Too Clever Programmer)

# More info

%[https://www.reddit.com/r/ProgrammerHumor/comments/6erd7r/the_best_thing_about_a_boolean_is_that_even_if/]

https://www.bennadel.com/blog/3858-the-double-bang-operator-and-a-misunderstanding-of-how-javascript-handles-truthy-falsy-values.htm

%[https://developer.mozilla.org/en-US/docs/Glossary/Truthy]

https://www.destroyallsoftware.com/talks/wat

# Credits

Photo by [Greg Rakozy](https://unsplash.com/@grakozy) on [Unsplash](https://unsplash.com/s/photos/universe)  

* * *

> It is easier to write an incorrect program than understand a correct one.

_Alan J Perlis_
 
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()