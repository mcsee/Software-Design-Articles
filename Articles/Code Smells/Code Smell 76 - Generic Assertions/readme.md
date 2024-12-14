# Code Smell 76 - Generic Assertions

![Code Smell 76 - Generic Assertions](Code%20Smell%2076%20-%20Generic%20Assertions.jpg)

*Don't make weak tests to create a false sensation of coverage.*

> TL;DR: Test Assertions should be precise. Not too Vague and not too specific. There is no silver bullet.

# Problems

- False Negatives

- Lack of Trust

# Solutions

1. Check the right case

2. Assert for a functional case.

3. Don't test implementation.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/6712052beddeaac0d959785726fa82ca) -->

```python
square = Square(5)

assert square.area() != 0

# This will lead to false negatives since it is too vague
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/d9f05a81f7689e86c353ccd6a29e8306) -->

```python
square = Square(5)

assert square.area() = 25

# Assertion should be precise
```

# Detection

With [Mutation Testing](https://en.wikipedia.org/wiki/Mutation_testing) techniques we can find these errors on our tests.

# Tags

- Testing

# Conclusion

We should use development techniques like [TDD](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/How%20to%20Squeeze%20Test%20Driven%20Development%20on%20Legacy%20Systems/readme.md) that request concrete business cases and make concrete assertions based on our domain.

# Relations

[Code Smell 30 - Mocking Business](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md)

[Code Smell 52 - Fragile Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md)

# More Info

- [Test Driven Development](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/How%20to%20Squeeze%20Test%20Driven%20Development%20on%20Legacy%20Systems/readme.md)

- [The Only Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

- [Mutation Testing](https://en.wikipedia.org/wiki/Mutation_testing)

# Credits

This smell was inspired by @[Mario Cervera](@macerub) and used with his [permission](https://twitter.com/macerub/status/1401209540436283397).

Photo by [Fleur](https://unsplash.com/@yer_a_wizard) on [Unsplash](https://unsplash.com/s/photos/measure)
  

* * *

> A program that produces incorrect results twice as fast is infinitely slower. 

_John Osterhout_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)