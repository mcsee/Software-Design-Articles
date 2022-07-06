# Code Smell 71 - Magic Floats Disguised as Decimals

![Code Smell 71 - Magic Floats Disguised as Decimals](stephen-radford-hLUTRzcVkqg-unsplash.jpg)

TL;DR Don't trust numbers on immature languages like JavaScript.

# Problems

- [Principle of Least Surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) Violation

- [Accidental Complexity](Theory\No Silver Bullet)

- Wrong decimal representations.

# Solutions

1. Choose Mature Languages.

2. Represent [Decimals with Decimals](Theory\The One and Only Software Design Principle).

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/46a81f9ff84ac7c32b2f482e0625efce)
```javascript
console.log(0.2 + 0.1) 
// 0.30000000000000004

// We are adding two decimal numbers
// 2/10  +  1/10 
// Result should be 3/10 as we learnt at school
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/f57afd489e3f65c44e4e92fc1ff74fb8)
```javascript
class Decimal {
  constructor(numerator) {
    this.numerator = numerator;    
  }
   plus(anotherDecimal) {
      return new Decimal(this.numerator + anotherDecimal.numerator);
  }
   toString() {
      return "0." + this.numerator;
   }}     
  
console.log((new Decimal(2).plus(new Decimal(1))).toString());
// 0.3

// We can represent the numbers with a Decimal class (storing only the numerator)
// or with a generic Fraction class (storing both the numerator and denominator)
```

# Detection

Since this is a language feature, it is difficult to detect. We can ask our linters to prevent us from manipulating numbers this way.

# Tags

- JavaScript

- Premature Optimization

# Conclusion

My first programming language was [Commodore 64](https://en.wikipedia.org/wiki/Commodore_64)'s basic back in 1985.

I was very surprised to discover that 1+1+1 was not always 3. Then they introduced integer types. 

JavaScript is 30 years younger, and it has the same immaturity problems.

# Relations

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](Code Smells\Code Smell 69 - Big Bang (JavaScript Ridiculous Castings))

# More info

Here is the technical (and accidental) explanation.

https://blog.pankajtanwar.in/do-you-know-01-02-03-in-javascript-here-is-why

Please, don't argue telling this is fine and expected since this is the binary representation. 

These numbers are decimal, we should represent them as decimals. 

If you think representing them as floats is a great performance improvement, you are wrong. 

Premature optimization is the root of all evil.

[Floating Point Standard - 83 pages](https://en.wikipedia.org/wiki/IEEE_754)

# Credits

Photo by [Stephen Radford](https://unsplash.com/@steve228uk) on [Unsplash](https://unsplash.com/s/photos/explosion)  

* * *

> The purpose of computing is insight, not numbers.

_Richard Hamming_
 
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)