# Code Smell 213 - Hoisting
            
![Code Smell 213 - Hoisting](Code%20Smell%20213%20-%20Hoisting.jpg)

*You can prevent undefined*

> TL;DR: Declare your variables and look after the scope

# Problems

- Readability

- Least Surprise Principle violation

- Variable Shadowing 

# Solutions

1. Be explicit on declarations

2. Use ['const' declaration](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20116%20-%20Variables%20Declared%20With%20'var'/readme.md) when possible.

3. Declare variables at the beginning of the scope.

4. Use [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

# Context

Hoisting allows variable declarations to be moved to the top of their containing scope during the compilation phase. 

Variables declared with var and function declarations are "hoisted" to the top of their respective scopes automatically in several languages.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/6d889d8015a9acd6b8de8382e7dd28fc)

```javascript
console.log(willBeDefinedLater); 
// Output: undefined (but no error)

var willBeDefinedLater = "Beatriz";
console.log(willBeDefinedLater); 
// Output: "Beatriz"
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/fe321a8c79ef2b6520e752ad091f20c3)

```javascript
const dante = "abandon hope all ye who enter here"; 
// Declaring a constant 'dante'
// with value "abandon hope all ye who enter here"

console.log(dante); 
// Output: "abandon hope all ye who enter here"

dante = "Divine Comedy"; // Error: Assignment to constant variable
```

# Detection

[X] Semi-Automatic 

We can perform mutation testing to check if changing the scope of the variables brings unexpected results. 

# Tags

- Mutability

# Conclusion

Hoisting is yet another magic tool some compilers provide to favor lazy programmers. 

But if it fights back in debugging time.

# Relations

[Code Smell 116 - Variables Declared With 'var'](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20116%20-%20Variables%20Declared%20With%20'var'/readme.md)

[Code Smell 42 - Warnings/Strict Mode Off](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2042%20-%20Warnings%20Strict%20Mode%20Off/readme.md)

# More Info

[Wikipedia](https://en.wiktionary.org/wiki/hoisting)

[Strict Mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Ash from Modern Afflatus](https://unsplash.com/de/@modernafflatusphotography) on [Unsplash](https://unsplash.com/photos/iiRQxPCDQ_Y)  
  
* * *

> The best error message is the one that never shows up.

_Thomas Fuchs_ 
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)