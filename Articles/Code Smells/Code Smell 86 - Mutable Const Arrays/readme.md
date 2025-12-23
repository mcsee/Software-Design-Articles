# Code Smell 86 - Mutable Const Arrays

![Code Smell 86 - Mutable Const Arrays](Code%20Smell%2086%20-%20Mutable%20Const%20Arrays.jpg)

*Const declares something to be constant. Can it mutate?*

> TL;DR: Don't rely on languages cheating about directives.

# Problems 😔 

- Unexpected side effects

- Accidental complexity

# Solutions 😃

1. Use better languages

2. Use [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/03563ad0268ac240336fcab195f8da29) -->

```javascript
const array = [1, 2];

array.push(3)

// array => [1, 2, 3]
// Wasn't it constant ?
// constant != immutable ?
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/c1610a6305aa2a1f3b9add686652d0b7) -->

```javascript
const array = [1, 2];

const newArray = [...array, 3]

// array => [1, 2] Didn't mutate
// newArray = [1, 2, 3]
```

# Detection 🔍

Since this is a "language feature", we can explicitly forbid it.

# Tags 🏷️

- Mutability 

# Level 🔋

[X] Intermediate

# Conclusion 🏁

We should always favor immutability on our designs and take extra care with side effects.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 116 - Variables Declared With 'var'](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20116%20-%20Variables%20Declared%20With%20'var'/readme.md)

[Code Smell 127 - Mutable Constants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20127%20-%20Mutable%20Constants/readme.md)

# More Information 📕

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Credits 🙏

Photo by [Zorik D](https://unsplash.com/@justzorik) on [Unsplash](https://unsplash.com/s/photos/zombie)  

[Twitter](https://x.com/1430154471921922049)

* * *

> Correctness is clearly the prime quality. If a system does not do what it is supposed to do, then everything else about it matters little.

_Bertrand Meyer_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)