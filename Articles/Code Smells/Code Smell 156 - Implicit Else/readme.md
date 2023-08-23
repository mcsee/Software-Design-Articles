# Code Smell 156 - Implicit Else

![Code Smell 156 - Implicit Else](Code%20Smell%20156%20-%20Implicit%20Else.jpg)

*We learn if/else on our first programming day. Then we forget the else*

> TL;DR: Be explicit. Even with Else.

# Problems

- Readability

- Cognitive Load

- Unforeseen conditions

- [Fail Fast Principle violation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Solutions

1. Write the explicit else

# Context

If we early return on an IF sentence we can omit the else part. 

Afterward, we [Remove the IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md) and use polymorphism.

That is when we miss the real cases.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/8d2eb5957180d324326e2c30a72166f6)
```javascript
function carBrandImplicit(model) {
  if (model === 'A4') {
    return 'Audi';
  }
  return 'Mercedes-Benz';
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/34f2e6cc97fb6ef9cb77f8998aaa790e)
```javascript
function carBrandExplicit(model) {
  if (model === 'A4') {
    return 'Audi';
  }
  if (model === 'AMG') {
    return 'Mercedes-Benz';
  }
  
  // Fail Fast
  throw new Exception('Model not found);
}
```

# Detection

[X] Automatic 

We can check syntax trees and parse them and warn for missing else.

We can also rewrite them and perform mutation testing.

# Tags

- Conditionals

# Conclusion

This kind of smell brings a lot of public debate, *and hate*.

We must exchange opinions and value each pros and cons.

# Relations

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

# More Info

[Stop Using Implicit Else](https://javascript.plainenglish.io/advice-from-a-senior-dev-stop-using-the-implicit-else-2a2ecf0a3583)

[When To Use Implicit Else](https://medium.com/lost-but-coding/when-to-use-implicit-else-e891cdcfe1bd)

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Credits

Photo by [Elena Mozhvilo](https://unsplash.com/es/@miracleday) on [Unsplash](https://unsplash.com/s/photos/invisible)
  
* * *

> The biggest issue on software teams is making sure everyone understands what everyone else is doing.

_Martin Fowler_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)