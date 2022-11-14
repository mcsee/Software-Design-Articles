# Code Smell 51 - Double Negatives

![Code Smell 51 - Double Negatives](Code%20Smell%2051%20-%20Double%20Negatives.jpg)

*Not operator is our friend. Not not operator is not our friend.*

# Problems

- Readability

# Solutions

1. Name your variables, methods and classes with positive names.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/f5c32dfa2aefa4f7fcb180ea28995508)
```javascript
if ( !work.isNotFinished() )
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/842684ebe8f5496d1d6374436a0c9473)
```javascript
if ( work.isDone() )
```

# Detection

This is a semantic smell. We need to detect it on code reviews.

We can tell linters to check for Regular Expressions like *!not* or *!isNot* etc as a warning.

# Tags

- Readability

# Conclusion

Double negation is a very basic rule we learn as junior developers.

There are lots of production systems filled with this smell. 

We need to trust our test coverage and make safe renames and other refactors.

# Relations

[Code Smell 24 - Boolean Coercions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2024%20-%20Boolean%20Coercions/readme.md)

[Code Smell 07 - Boolean Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2007%20-%20Boolean%20Variables/readme.md)

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

# More info

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

%[https://refactoring.com/catalog/removeDoubleNegative.html]

https://levelup.gitconnected.com/knot-of-nots-avoiding-negative-names-for-boolean-methods-641896a94a42

# Credits

<span>Photo by [Daniel Herron](https://unsplash.com/@herrond) on [Unsplash](https://unsplash.com/s/photos/no)</span>

* * *

> It’s harder to read code than to write it.

_Joel Spolsky_
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)