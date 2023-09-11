# Code Smell 209 - Side Effects
            
![Code Smell 209 - Side Effects](Code%20Smell%20209%20-%20Side%20Effects.jpg)

*Global scope is easy or a nightmare, or both*

> TL;DR: Avoid side effects on your code.

# Problems

- Coupling

- Least Astonishment Principle violation

# Solutions

1. Favor referential transparency

# Context

Referential transparency always produces the same output for a given input and does not have any side effects, such as modifying global variables or performing I/O operations. 

A function or expression is referentially transparent if it can be replaced with its evaluated result without changing the behavior of the program. 

This property allows for easier reasoning about the behavior of a program and enables optimizations such as caching and memorization. 

Functions are treated as mathematical expressions that map inputs to outputs.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/e532e326a6b5ac7d4b88b9aadaa86c0b)
```typescript
let counter = 0;

function incrementCounter(value: number): void {
  // Two side effects  
  counter += value; // it modifies the global variable counter   
  console.log(`Counter is now ${counter}`); // it logs a message to the console
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/9ce2320f04f2a6f2e0c24e581e472091)
```typescript
let counter = 0;

function incrementCounter(counter: number, value: number): number {  
  return counter + value; // Not too efficient  
}
```

# Detection

[X] Automatic 

Most linterns can warn you when accessing the global state or [Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2017%20-%20Global%20Functions/readme.md) and create side effects.

# Tags

- Global

# Conclusion

Functional Programming is amazing and can teach us a lot about how to write clean code. 

We need to understand its pillars.

# Relations

[Code Smell 17 - Global Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2017%20-%20Global%20Functions/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Daan Mooij](https://unsplash.com/@daanmooij) on [Unsplash](https://unsplash.com/photos/91LGCVN5SA)
    
* * *

> The most effective debugging tool is still careful thought, coupled with judiciously placed print statements.

_Brian W. Kernighan_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)