# Code Smell 06 - Too Clever Programmer

![Code Smell 06 - Too Clever Programmer](Code%20Smell%2006%20-%20Too%20Clever%20Programmer.jpg)

*Code is difficult to read and tricky with names without semantics. Sometimes using language's accidental complexity.*

> TL;DR: Don't pretend you are too smart. Clean code asks for readability and simplicity.

# Problems 😔 

- Readability

- Maintainability

- Code Quality

- Premature Optimization

# Solutions 😃

- Refactor the code

- Use [better names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20Exactly%20Is%20a%20Name%20-%20Part%20I%20The%20Quest/readme.md)

# Refactorings ⚙️

[Refactoring 005 - Replace Comment with Function Name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md)

# Examples

- Optimized loops

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/df27505a28b5f65faaa273b0bfe1f322) -->

```javascript
function primeFactors(n) {
  var f = [],  i = 0, d = 2;  
  
  for (i = 0; n >= 2; ) {
     if(n % d == 0) {
       f[i++]=(d); 
       n /= d;
    }
    else {
      d++;
    }     
  }
  return f;
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/4749cfe51de1c02848df1aa802fa5705) -->

```javascript
function primeFactors(numberToFactor) {
  var factors = [], 
      divisor = 2,
      remainder = numberToFactor;
  
  while(remainder>=2) {
    if(remainder % divisor === 0) {
       factors.push(divisor); 
       remainder = remainder / divisor;
    }
    else {
      divisor++;
    }     
  }
  return factors;
}
```

# Detection 🔍

Automatic detection is possible in some languages.
Watch some warnings related to complexity, bad names, post-increment variables, etc.

# Exceptions 🛑

- Optimized code for low-level operations.

# Tags 🏷️

- Complexity

# Conclusion 🏁

Too clever developers write cryptic code to brag. Smart developers write clean code.
Clear beats clever.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

[Code Smell 44 - Magic Corrections](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2044%20-%20Magic%20Corrections/readme.md)

# More Information 📕

[Are boolean flags a code smell?](https://ardalis.com/are-boolean-flags-on-methods-a-code-smell/)

# Also Known as

- Obfuscator

# Credits 🙏

Photo by [NeONBRAND](https://unsplash.com/@neonbrand) on [Unsplash](https://unsplash.com/s/photos/smart-brain)

* * *

> Programming can be fun, so can cryptography; however they should not be combined.

_Kreitzberg & Shneiderman_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)