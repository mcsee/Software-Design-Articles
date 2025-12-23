# Code Smell 84 - Max < Min (Javascript)

![Code Smell 84 - Max < Min (Javascript)](Code%20Smell%2084%20-%20Max%20%20Min%20(Javascript).jpg)

*Some functions do not behave as expected. Sadly, most programmers accept them.*

> TL;DR: Don't trust max() and min() functions. Just ignore them.

# Problems 😔 

- Principle of the least astonishment

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Violation.

- Unexpected Results

# Solutions 😃

1. Use mature languages.

2. Avoid *max()* and *min()* functions.

3. Model Infinites carefully.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/8440adc57486989468045de4df3c9bef) -->

```javascript
console.log(Math.max() > Math.min());

// returns false

console.log(Math.max());

// returns -Infinite
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/7f275da71e96bd4050e17c0ec7511c14) -->

```javascript
console.log(Math.max() > Math.min());
console.log(Math.max());

// returns Exception. Not enough arguments passed.
// Max requires at least one argument
```

# Detection 🔍

These functions belong to the standard Math library. Therefore, they are not easy to avoid. 

We can block them on our linters.

# Tags 🏷️

- Types

# Level 🔋

[x] Intermediate

# Conclusion 🏁

We need to be very careful using functions that violate real-world concepts using language tricks.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md)

# More Information 📕

- [Principle of the least astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment)

- [Bijection Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

- [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

# Credits 🙏

Photo by [Cris Baron](https://unsplash.com/@cris024) on [Unsplash](https://unsplash.com/s/photos/infinite)
  
Inspired by @@[Oliver Jumpertz](@OliverJumpertz)

[Twitter](https://x.com/1416798870747684864)

* * *

> Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.

_Rick Cook_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)