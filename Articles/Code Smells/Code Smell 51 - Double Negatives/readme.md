# Code Smell 51 - Double Negatives

![Code Smell 51 - Double Negatives](daniel-herron-vBxbZokRL10-unsplash.jpg)

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

[Code Smell 24 - Boolean Coercions](Code Smells\Code Smell 24 - Boolean Coercions)

[Code Smell 07 - Boolean Variables](Code Smells\Code Smell 07 - Boolean Variables)

[Code Smell 06 - Too Clever Programmer](Code Smells\Code Smell 06 - Too Clever Programmer)

# More info

[What exactly is a name — Part II Rehab](Theory\What exactly is a name — Part II Rehab)

%[https://refactoring.com/catalog/removeDoubleNegative.html]

https://levelup.gitconnected.com/knot-of-nots-avoiding-negative-names-for-boolean-methods-641896a94a42

# Credits

<span>Photo by [Daniel Herron](https://unsplash.com/@herrond) on [Unsplash](https://unsplash.com/s/photos/no)</span>

* * *

> It’s harder to read code than to write it.

_Joel Spolsky_
 
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)