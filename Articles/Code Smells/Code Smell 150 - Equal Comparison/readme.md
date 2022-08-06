# Code Smell 150 - Equal Comparison

![Code Smell 150 - Equal Comparison](piret-ilver-98MbUldcDJY-unsplash.jpg)

*Every developer compares attributes equally. They are mistaken.*

> TL;DR: Don't export and compare, just compare.

# Problems

- Encapsulation break

- Code Duplication

- Information Hiding violation

- [Anthropomorphism](https://en.wikipedia.org/wiki/Anthropomorphism) violation

# Solutions

1. Hide the comparison in a single method

# Context

Attribute comparison is heavily used in our code.

We need to focus on behavior and responsibilities.

It is an object's responsibility to compare with other objects. Not our own.

Premature Optimizers will tell us this is less performant.

We should ask them for real evidence and contrast the more maintainable solution.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/d3eda35a36e6dfe7cb292ff2be5a7b71)
```javascript
if (address.street == 'Broad Street') {
  

if (location.street == 'Bourbon St') {
  
// 15000 usages in a big system  
// Comparisons are case sensitive
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/7ecfc60fccc9053db2a7b22dc30f31cd)
```javascript
if (address.isAtStreet('Broad Street') {
    }

// ...

if (location.isAtStreet('Bourbon St') {
    }  
// 15000 usages in a big system  
  
function isAtStreet(street) {
  // We can change Comparisons to 
  // case sensitive in just one place. 
}

```

# Detection

[X] Semi-Automatic 

We can detect attribute comparison using syntax trees.

There can be good uses for primitive types as with many other smells.
 
# Tags

- Encapsulation

# Conclusion

We need to put responsibilities in a single place.

Comparing is one of them.

If some of our business rules change we need to change a *single point*.

# Relations

[Code Smell 63 - Feature Envy](Code Smells\Code Smell 63 - Feature Envy) 

[Code Smell 101 - Comparison Against Booleans](Code Smells\Code Smell 101 - Comparison Against Booleans)

[Code Smell 122 - Primitive Obsession](Code Smells\Code Smell 122 - Primitive Obsession)

# Credits

Photo by [Piret Ilver](https://unsplash.com/@saltsup) on [Unsplash](https://unsplash.com/s/photos/scale?)  

* * *

> Behavior is the most important thing about software. It is what users depend on. Users like it when we add behavior (provided it is what they really wanted), but if we change or remove behavior they depend on (introduce bugs), they stop trusting us.

_Michael Feathers_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()