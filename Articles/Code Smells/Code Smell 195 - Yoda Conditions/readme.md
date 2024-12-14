# Code Smell 195 - Yoda Conditions
            
![Code Smell 195 - Yoda Conditions](Code%20Smell%20195%20-%20Yoda%20Conditions.jpg)

*Best is to put the expected value last, if conditions you want to write.*

> TL;DR: In a natural way, write your conditions.

# Problems

- Readability

- The least surprise principle violation

# Solutions

1. Write your conditions with the expected value as the second.

2. Name the variables accordingly.

# Context

Most programmers write the variable or condition first and the test value second.

In fact, this is the correct order for assertions.

In some languages, this style is used to avoid accidental assignment instead of equality comparison, which can result in a logic error in the code.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/530570169b351c8d411c310d9a182d1a) -->

```javascript
if (42 == answerToLifeMeaning) {
  // prevents the accidental assignation typo
  // since ‘42 = answerToLifeMeaning’ is invalid
  // but ‘answerToLifeMeaning = 42’ is valid
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/3a59fd09423eef0bbc5ab7857d041309) -->

```javascript
if (answerToLifeMeaning == 42) {
  // might be mistaken with answerToLifeMeaning = 42
}
```

# Detection

[X] Semi-Automatic 

We can check for constant values on the first side of the comparison.

# Tags

- Readability

# Conclusion

Reliable, direct, and clear be when conditions your writing.

# Relations

[Code Smell 99 - First Second](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2099%20-%20First%20Second/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Lia](https://unsplash.com/@liaphotography) on [Unsplash](https://unsplash.com/photos/2Wc_wz2k1Bs)  
  
* * *

> Any man can make mistakes, but only an idiot persists in his error.

_Marcus Cicero_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)