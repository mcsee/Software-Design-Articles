# Code Smell 180 - BitWise Optimizations
            
![Code Smell 180 - BitWise Optimizations](Code%20Smell%20180%20-%20BitWise%20Optimizations.jpg)

*Bitwise operators are faster. Avoid these micro-optimizations*

> TL;DR: Don't use bitwise operators unless your business model is bitwise logic.

# Problems

- Readability

- Clevereness

- Premature Optimization

- Maintainability

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)  Violation

# Solutions

1. Improve readability

# Context

Some clever programmers solve problems we don't have. 

We should optimize code based on evidence and use the scientific method.

We should benchmark only if necessary and improve code only if really necessary and bear the cost of changeability and maintainability.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/46a0a22d915e949c42cfb8260a5689bc)

```javascript
const nowInSeconds = ~~(Date.now() / 1000)

// The double bitwise NOT operator ~~ 
// is a bitwise operation that performs a bitwise
// negation followed by a bitwise negation again.
// This operation effectively truncates any decimal places
// converting the result to an integer.
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/31a2d5a8699579d5472688b3ac9d9f61)

```javascript
const nowInSeconds = Math.floor(Date.now() / 1000)
```

# Detection

[X] Semi-Automatic 

We can tell our linters to warn us and manually check if it is worth the change.

# Exceptions

- Real-time and mission-critical software.

# Tags

- Premature Optimization

# Conclusion

If we find this code in a pull request or code review, we need to understand the reasons. If they are not justified, we should do a rollback and change it to a normal logic.

# Relations

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

[Code Smell 165 - Empty Exception Blocks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20165%20-%20Empty%20Exception%20Blocks/readme.md)

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 129 - Structural Optimizations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20129%20-%20Structural%20Optimizations/readme.md)

# More Info

[Tilde Operator ~~](https://stackoverflow.com/questions/5971645/what-is-the-double-tilde-operator-in-javascript)

[Javascript BitWise Operators](http://rocha.la/JavaScript-bitwise-operators-in-practice)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Frédéric Barriol](https://unsplash.com/@webmaster13870) on [Unsplash](https://unsplash.com/s/photos/clock)  

Original Article [Here](https://dev.to/dvddpl/clever-coding-tricks-that-we-dont-need--228l).
  
* * *

> Watch the little things; a small leak will sink a great ship.

_Benjamin Franklin_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)