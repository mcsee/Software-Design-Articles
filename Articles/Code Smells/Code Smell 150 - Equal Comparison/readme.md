# Code Smell 150 - Equal Comparison

![Code Smell 150 - Equal Comparison](Code%20Smell%20150%20-%20Equal%20Comparison.jpg)

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
if (address.street == 'Broad Street') { }  

if (location.street == 'Bourbon St') { }
  
// 24601 usages in a big system  
// Comparisons are case sensitive
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/7ecfc60fccc9053db2a7b22dc30f31cd)

```javascript
if (address.isAtStreet('Broad Street') {  }

if (location.isAtStreet('Bourbon St') { }  
// 24601 usages in a big system  
  
function isAtStreet(street) {
  // You can change Comparisons to 
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

[Code Smell 63 - Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2063%20-%20Feature%20Envy/readme.md) 

[Code Smell 101 - Comparison Against Booleans](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20101%20-%20Comparison%20Against%20Booleans/readme.md)

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 167 - Hashing Comparison](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20167%20-%20Hashing%20Comparison/readme.md)

# Credits

Photo by [Piret Ilver](https://unsplash.com/@saltsup) on [Unsplash](https://unsplash.com/s/photos/scale)  

* * *

> Behavior is the most important thing about software. It is what users depend on. Users like it when we add behavior (provided it is what they really wanted), but if we change or remove behavior they depend on (introduce bugs), they stop trusting us.

_Michael Feathers_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)