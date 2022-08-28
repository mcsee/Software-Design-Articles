# Code Smell 145 - Short Circuit Hack

![Code Smell 145 - Short Circuit Hack](Code%20Smell%20145%20-%20Short%20Circuit%20Hack.jpg)

*Don't use boolean evaluation as a readability shortcut*

> TL;DR: Don't use Boolean comparison for side effect functions.

# Problems

- Readability

- Side Effects

# Solutions

1. Convert [short circuits](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20140%20-%20Short%20Circuit%20Evaluation/readme.md) into IFs

# Context

Smart programmers like to write hacky and obscure code even when there is no strong evidence for this improvement.

Premature optimization always hurts readability.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/be2e697d71cfb438110d911c9e4751dc)
```javascript
userIsValid() && logUserIn();

// this expression is short circuit
// Does not value second statament
// Unless the first one is true

functionDefinedOrNot && functionDefinedOrNot();

// in some languages undefined works as a false
// If functionDefinedOrNot is not defined does
// not raise an erron and neither runs
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/5c48bd13ce74f1605cf8d6a8ed2de4d9)
```javascript
if (userIsValid()) {
    logUserIn();
}

if(typeof functionDefinedOrNot == 'function') {  
    functionDefinedOrNot();
}
// Checking for a type is another code smell
```

# Detection

[X] Semi-Automatic 

We can check if the functions are impure and change the short circuit to an IF.

Some actual linters warn us of this problem

# Tags

- Premature Optimizacion

# Conclusion

Don't try to look smart. 

We are not in the 50s anymore.

Be a team developer.

# Relations

[Code Smell 140 - Short Circuit Evaluation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20140%20-%20Short%20Circuit%20Evaluation/readme.md)

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 149 - Optional Chaining](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20149%20-%20Optional%20Chaining/readme.md)
 
# Credits

Photo by Michael Dziedzic on Unsplash

* * *

> A computer is a stupid machine with the ability to do incredibly smart things, while computer programmers are smart people with the ability to do incredibly stupid things. They are, in short, a perfect match.

_Bill Bryson_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)