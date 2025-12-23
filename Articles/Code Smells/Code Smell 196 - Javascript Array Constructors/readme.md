# Code Smell 196 - Javascript Array Constructors
            
![Code Smell 196 - Javascript Array Constructors](Code%20Smell%20196%20-%20Javascript%20Array%20Constructors.jpg)

*Array creation is homogenous and predictable, or is it a hack?*

> TL;DR: Be very careful with Javascript Arrays.

# Problems 😔 

- The Least surprise principle violation

# Solutions 😃

1. Be as declarative as possible

2. Avoid creating Arrays with one argument.

# Context 💬

Javascript has a lot of magic tricks.

Knowing them makes some developers proud and a sense of belonging to juniors.

A language should be intuitive, homogeneous, predictable, simple, and pure.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/5d0644c120630d637c9649d7c92805c7) -->

```javascript
const arrayWithFixedLength = new Array(3);

console.log(arrayWithFixedLength); // [ <5 empty items> ]
console.log(arrayWithFixedLength[0]); // Undefined
console.log(arrayWithFixedLength[1]); // Undefined
console.log(arrayWithFixedLength[3]); // Undefined
console.log(arrayWithFixedLength[4]); // Undefined too
// But should be Index out of range
console.log(arrayWithFixedLength.length); // 3
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/a7f4c59210257cb279efc6747b4e3122) -->

```javascript
const arrayWithTwoElements = new Array(3, 1);

console.log(arrayWithTwoElements); // [ 3, 1 ]
console.log(arrayWithTwoElements[0]); // 3
console.log(arrayWithTwoElements[1]); // 1
console.log(arrayWithTwoElements[2]); // Undefined
console.log(arrayWithTwoElements[5]); 
  // Undefined (should be out of range)
console.log(arrayWithTwoElements.length); // 2

const arrayWithTwoElementsLiteral = [3,1];

console.log(arrayWithTwoElementsLiteral); // [ 3, 1 ]
console.log(arrayWithTwoElementsLiteral[0]); // 3
console.log(arrayWithTwoElementsLiteral[1]); // 1
console.log(arrayWithTwoElementsLiteral[2]); // Undefined
console.log(arrayWithTwoElementsLiteral[5]); // Undefined
console.log(arrayWithTwoElementsLiteral.length); // 2
```

# Detection 🔍

[X] Automatic 

We can check for the notation with one argument and flag it as a warning.

# Tags 🏷️

- Complexity

# Conclusion 🏁

Many "modern" languages are full of hacks to make life easier for programmers but are a source of potential undiscovered bugs.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md)

[Code Smell 93 - Send me Anything](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2093%20-%20Send%20me%20Anything/readme.md)

# Disclaimer 📘

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Ryan Quintal](https://unsplash.com/@ryanquintal) on [Unsplash](https://unsplash.com/photos/US9Tc9pKNBU)
  
Originally on this tweet:

[Twitter](https://x.com/1621348702907502593)
  
* * *

> When someone says, "I want a programming language in which I need only say what I want done," give him a lollipop.

_Alan J. Perlis_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)