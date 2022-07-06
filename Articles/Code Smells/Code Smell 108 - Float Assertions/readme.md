# Code Smell 108 - Float Assertions

![Code Smell 108 - Float Assertions](mika-baumeister-Wpnoqo2plFA-unsplash.jpg)

*Asserting two float numbers are the same is a very difficult problem*

> TL;DR: Don't compare floats

# Problems

- Wrong test results

- Fragile tests

- Fail fast principle violation

# Solutions

1. Avoid floats unless you have REAL performance concerns

2. Use arbitrary precision numbers

3. If you need to compare floats compare with tolerance.

# Context

Comparing float numbers is an old computer science problem.

The usual solution is to use threshold comparisons.

We recommend avoiding floats at all and trying to use infinite precision numbers.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/2fc79af85305eaada328fd324cb38c0d)
```java
Assert.assertEquals(0.0012f, 0.0012f); // Deprecated
Assert.assertTrue(0.0012f == 0.0012f); // Not JUnit - Smell
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/570958fcfb8e52379b7ddde2389ad6f8)
```java
Assert.assertEquals(0.0012f, 0.0014f, 0.0002); // true
Assert.assertEquals(0.0012f, 0.0014f, 0.0001); // false
// last parameter is the delta threshold

Assert.assertEquals(12 / 10000, 12 / 10000); // true
Assert.assertEquals(12 / 10000, 14 / 10000); // false
```

# Detection

[X] Automatic 

We can add a check con *assertEquals()* on our testing frameworks to avoid checking for floats.

# Tags

- Test Smells

# Conclusion

We should always avoid comparing floats.

# Relations

[Code Smell 71 - Magic Floats Disguised as Decimals](Code Smells\Code Smell 71 - Magic Floats Disguised as Decimals)

# More Info

- [Fail fast](Theory\Fail Fast)

# Credits

Photo by [Mika Baumeister](https://unsplash.com/@mbaumi) on [Unsplash](https://unsplash.com/s/photos/numbers)
  
* * *

> God made the natural numbers; all else is the work of man. 

_Leopold Kronecker_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)