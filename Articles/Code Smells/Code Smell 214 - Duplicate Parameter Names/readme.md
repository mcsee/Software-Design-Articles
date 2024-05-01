# Code Smell 214 - Duplicate Parameter Names
            
![Code Smell 214 - Duplicate Parameter Names](Code%20Smell%20214%20-%20Duplicate%20Parameter%20Names.jpg)

*Two arguments of the same type. Two equal names*

> TL;DR: Turn on Strict Checks

# Problems

- Unexpected errors

- Ambiguity

- The Least Surprise Principle violation

- Portability

# Solutions

1. Enable [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

2. Use role-naming arguments

# Context

Most compilers forbid duplicate parameters since they are a common mistake in a large parameters list

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/d7f79fb931bf07d11b28a4f6ca4d2239)

```javascript
function addNumbers(a, b, a) {
  console.log(a + b);
}

addNumbers(2, 3, 4);

// Outputs 7 (2 + 3 + 2)
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/1fc2681a474de57d2b124b709df9137a)

```javascript
"use strict";

function addNumbers(a, b, a) { }
//                          ^
// SyntaxError: Duplicate parameter name not allowed in this context
```

# Detection

[X] Automatic 

By enabling strict mode, the compiler will warn us

# Tags

- Naming

# Conclusion

Enable the stricter modes you can find on your compilers.

Try to [fail fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) and catch errors as early as possible and leave the hard and dumb work to the tools.

# Relations

[Code Smell 188 - Redundant Parameter Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20188%20-%20Redundant%20Parameter%20Names/readme.md)

[Code Smell 65 - Variables Named after Types](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2065%20-%20Variables%20Named%20after%20Types/readme.md)

# More Info

[Sonar Source](https://rules.sonarsource.com/csharp/RSPEC-3872)

[Mozilla Org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Caroline Veronez](https://unsplash.com/@carolineveronez) on [Unsplash](https://unsplash.com/photos/bbjmFMdWYfw)
    
* * *

> One of the things I've been trying to do is look for simpler or rules underpinning good or bad design. I think one of the most valuable rules is avoiding duplication. "Once and only once" is the Extreme Programming phrase.

_Martin Fowler_ 
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)