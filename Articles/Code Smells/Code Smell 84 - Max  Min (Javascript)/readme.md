# Code Smell 84 - Max < Min (Javascript)

![Code Smell 84 - Max < Min (Javascript)](cris-baron-A18Ub2FbMlE-unsplash.jpg)

*Some functions do not behave as expected. Sadly, most programmers accept them.*

> TL;DR: Don't trust max() and min() functions. Just ignore them.

# Problems

- Principle of least astonishment

- [Bijection](Theory\The One and Only Software Design Principle) Violation.

- Unexpected Results

# Solutions

1. Use mature languages.

2. Avoid *max()* and *min()* functions.

3. Model Infinites carefully.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/8440adc57486989468045de4df3c9bef)
```javascript
console.log(Math.max() > Math.min());

// returns false

console.log(Math.max());

// returns -Infinite
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/7f275da71e96bd4050e17c0ec7511c14)
```javascript
console.log(Math.max() > Math.min());
console.log(Math.max());

// returns Exception. Not enough arguments passed.
// Max requires at least one argument
```

# Detection

These functions belong to the standard Math library. Therefore, they are not easy to avoid. 

We can block them on our linters.

# Tags

- Javascript

# Conclusion

We need to be very careful using functions that violate real-world concepts using language tricks.

# Relations

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](Code Smells\Code Smell 69 - Big Bang (JavaScript Ridiculous Castings))

# More Info

- [Principle of least astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment)

- [Bijection Principle](Theory\The One and Only Software Design Principle)

- [MAPPER](Theory\What is (wrong with) software)

# Credits

Photo by [Cris Baron](https://unsplash.com/@cris024) on [Unsplash](https://unsplash.com/s/photos/infinite)
  
Inspired by @@[Oliver Jumpertz](@OliverJumpertz)

[Twitter](https://twitter.com/1416798870747684864)

* * *

> Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.

_Rick Cook_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)