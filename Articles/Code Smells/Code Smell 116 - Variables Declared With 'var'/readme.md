# Code Smell 116 - Variables Declared With 'var'

![Code Smell 116 - Variables Declared With 'var'](Code%20Smell%20116%20-%20Variables%20Declared%20With%20'var'.jpg)

*Var, Let, Const: are all the same, aren't they?*

> TL;DR: Choose wisely your variable names, scope, and mutability.

# Problems 😔 

- [Mutability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

- Readability

# Solutions 😃

1. Declare const all variables unless you need to change them.

# Context 💬

Most languages don't need variable declarations.

Some other languages allow us to state mutability. 

We should be strict and explicit with our declarations.

# Sample Code 📖

## Wrong 🚫

https://gist.github.com/mcsee/f310bf19719788bfe2dbca3dab16a2c3

## Right 👉

https://gist.github.com/mcsee/c0c6bf0726100b918e5aa04955519465

# Detection 🔍
 
[X] Manual

With [mutation testing](https://en.wikipedia.org/wiki/Mutation_testing) by forcing a 'const' declaration, we can check if a value remains constant and be more declarative by explicitly enforcing it.

# Tags 🏷️

- Mutability

# Conclusion 🏁

Readability is always very important. 

We need to explicitly state our intentions and usages.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 86 - Mutable Const Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2086%20-%20Mutable%20Const%20Arrays/readme.md)

[Code Smell 158 - Variables not Variable](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20158%20-%20Variables%20not%20Variable/readme.md)

# More Information 📕

- [Differences between let, const, and var](https://twitter.com/SajalShlan/status/1495010893683314689)

- [The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)
  
* * *

> Just as it is a good practice to make all fields private unless they need greater visibility, it is a good practice to make all fields final unless they need to be mutable.

_Brian Goetz_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)