# Code Smell 108 - Float Assertions

![Code Smell 108 - Float Assertions](Code%20Smell%20108%20-%20Float%20Assertions.jpg)

*Asserting two float numbers are the same is a very difficult problem*

> TL;DR: Don't compare floats

# Problems 😔 

- Wrong test results

- Fragile tests

- Fail fast principle violation

# Solutions 😃

1. Avoid floats unless you have REAL performance concerns

2. Use arbitrary precision numbers

3. If you need to compare floats compare with tolerance.

# Context 💬

Comparing float numbers is an old computer science problem.

The usual solution is to use threshold comparisons.

We recommend avoiding floats at all and trying to use infinite precision numbers.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/2fc79af85305eaada328fd324cb38c0d) -->

```java
Assert.assertEquals(0.0012f, 0.0012f); // Deprecated
Assert.assertTrue(0.0012f == 0.0012f); // Not JUnit - Smell
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/570958fcfb8e52379b7ddde2389ad6f8) -->

```java
Assert.assertEquals(0.0012f, 0.0014f, 0.0002); // true
Assert.assertEquals(0.0012f, 0.0014f, 0.0001); // false
// The last parameter is the delta threshold

Assert.assertEquals(12 / 10000, 12 / 10000); // true
Assert.assertEquals(12 / 10000, 14 / 10000); // false
```

# Detection 🔍

[X] Automatic 

We can add a check con *assertEquals()* on our testing frameworks to avoid checking for floats.

# Tags 🏷️

- Testing

# Conclusion 🏁

We should always avoid comparing floats.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 71 - Magic Floats Disguised as Decimals](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2071%20-%20Magic%20Floats%20Disguised%20as%20Decimals/readme.md)

# More Information 📕

- [Fail fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Credits 🙏

Photo by [Mika Baumeister](https://unsplash.com/@mbaumi) on [Unsplash](https://unsplash.com/s/photos/numbers)
  
* * *

> God made the natural numbers; all else is the work of man. 

_Leopold Kronecker_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)