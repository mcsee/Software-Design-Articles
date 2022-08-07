# Code Smell 76 - Generic Assertions

![Code Smell 76 - Generic Assertions](fleur-dQf7RZhMOJU-unsplash.jpg)

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

[Gist Url]: # (https://gist.github.com/mcsee/6712052beddeaac0d959785726fa82ca)
```python
square = Square(5)

assert square.area() != 0

# This will lead to false negatives since it is too vague
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/d9f05a81f7689e86c353ccd6a29e8306)
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

We should use development techniques like [TDD](TDD\How to Squeeze Test Driven Development on Legacy Systems) that request concrete business cases and make concrete assertions based on our domain.

# Relations

[Code Smell 30 - Mocking Business](Code Smells\Code Smell 30 - Mocking Business)

[Code Smell 52 - Fragile Tests](Code Smells\Code Smell 52 - Fragile Tests)

# More info

- [Test Driven Development](TDD\How to Squeeze Test Driven Development on Legacy Systems)

- [The Only Design Principle](Theory\The One and Only Software Design Principle)

- [Mutation Testing](https://en.wikipedia.org/wiki/Mutation_testing)

# Credits

This smell was inspired by @[Mario Cervera](@macerub) and used with his [permission](https://twitter.com/macerub/status/1401209540436283397).

Photo by [Fleur](https://unsplash.com/@yer_a_wizard) on [Unsplash](https://unsplash.com/s/photos/measure)
  

* * *

> A program that produces incorrect results twice as fast is infinitely slower. 

_John Osterhout_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()