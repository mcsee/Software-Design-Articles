# Code Smell 110 - Switches With Defaults

![Code Smell 110 - Switches With Defaults](Code%20Smell%20110%20-%20Switches%20With%20Defaults.jpg)

*Default means 'everything we don't know yet'. We cannot foresee the future.*

> TL;DR: Don't add a default clause to your cases. Change it for an exception. Be Explicit.

# Problems

- Coupling

- [Fail Fast principle violation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

- Open/closed principle violation

# Solutions

1. Replace if and cases with polymorphism

2. Change Default code to an Exception

# Context

When using cases, we usually add a default case so it doesn't fail. 

Failing is always better than making decisions without evidence.

Since [case and switches](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md) are also a smell, we can avoid them.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/ddad35dc0be43c82d4aff94ad2b79d09)
```javascript
switch (value) {
  case value1:
    // if value1 matches the following will be executed..
    doSomething();
    break;
  case value2:
    // if value2 matches the following will be executed..
    doSomethingElse();
    break;
  default:
    // if the value does not presently match the above values
    // or future values
    // the following will be executed
    doSomethingSpecial();
    break;
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/78ca0363b28677b5ff24973b2fc4806f)
```javascript
switch (value) {
  case value1:
    // if value1 matches the following will be executed..
    doSomething();
    break;
  case value2:
    // if value2 matches the following will be executed..
    doSomethingElse();
    break;
  case value3:
  case value4:
    // You currently know these options exist
    doSomethingSpecial();
    break;
  default:
    // if value does not match the above values you need to take a decision
    throw new Exception('Unexpected case ' + value + ' need to consider it');
    break;
}
```

# Detection

[X] Semi Automatic 

We can tell our linters to warn us on default uses unless there's an exception.

# Tags

- Fail Fast

# Conclusion

Writing robust code doesn't mean we need to take decisions without evidence.

# Relations

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

# More Info

- [Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Credits

Photo by [Joshua Woroniecki](https://unsplash.com/@joshua_j_woroniecki) on [Unsplash](https://unsplash.com/s/photos/crystal-ball)
  
* * *
  
> The cost of adding a feature isn’t just the time it takes to code it. The cost also includes the addition of an obstacle to future expansion. The trick is to pick the features that don’t fight each other.

_John Carmack_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)