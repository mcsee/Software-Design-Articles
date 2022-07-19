# Code Smell 145 - Short Circuit Hack

![Code Smell 145 - Short Circuit Hack](michael-dziedzic-pM9pkc9J918-unsplash.jpg)

*Don't use boolean evaluation as a readability shortcut*

> TL;DR: Don't use Boolean comparison for side effect functions.

# Problems

- Readability

- Side Effects

# Solutions

1. Convert [short circuits](Code Smells\Code Smell 140 - Short Circuit Evaluation) into IFs

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

[Code Smell 140 - Short Circuit Evaluation](Code Smells\Code Smell 140 - Short Circuit Evaluation)

[Code Smell 06 - Too Clever Programmer](Code Smells\Code Smell 06 - Too Clever Programmer)

[Code Smell 149 - Optional Chaining](Code Smells\Code Smell 149 - Optional Chaining)
 
# Credits

Photo by Michael Dziedzic on Unsplash

* * *

> A computer is a stupid machine with the ability to do incredibly smart things, while computer programmers are smart people with the ability to do incredibly stupid things. They are, in short, a perfect match.

_Bill Bryson_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()