# Code Smell 116 - Variables Declared With 'var'

![Code Smell 116 - Variables Declared With 'var'](13151-7612-IMG_2167-xl.jpg)

*Var, Let, Const: are all the same, aren't they?*

> TL;DR: Choose wisely your variable names, scope, and mutability.

# Problems

- [Mutability](../../Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

- Readability

# Solutions

1. Declare const all variables unless you need to change them.

# Context

Most languages don't need variable declarations.

Some other languages allow us to state mutability. 

We should be strict and explicit with our declarations.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/f310bf19719788bfe2dbca3dab16a2c3)
```javascript
var pi = 3.14
var universeAgeInYears = 13.800.000.000

pi = 3.1415 // no error
universeAgeInYears = 13.800.000.001 // no error
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/c0c6bf0726100b918e5aa04955519465)
```javascript
const pi = 3.14 //Value cannot mutate or change 
let universeAgeInYears = 13.800.000.000 // Value can change

pi = 3.1415 // error. cannot define
universeAgeInYears = 13.800.000.001 // no error
```

# Detection
 
[X] Manual

With [mutation testing](https://en.wikipedia.org/wiki/Mutation_testing) by forcing a 'const' declaration, we can check if a value remains constant and be more declarative by explicitly enforcing it.

# Tags

- Mutability

- Javascript

# Conclusion

Readability is always very important. 

We need to explicitly state our intentions and usages.

# Relations

[Code Smell 86 - Mutable Const Arrays](../../Code%20Smells/Code%20Smell%2086%20-%20Mutable%20Const%20Arrays/readme.md)

# More Info

- [Differences between let, const, and var](https://twitter.com/SajalShlan/status/1495010893683314689)

- [The Evil Power of Mutants](../../Theory/The%20Evil%20Power%20of%20Mutants/readme.md)
  
* * *

> Just as it is a good practice to make all fields private unless they need greater visibility, it is a good practice to make all fields final unless they need to be mutable.

_Brian Goetz_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)