# Code Smell 156 - Implicit Else

![Code Smell 156 - Implicit Else](elena-mozhvilo-3Jexb7VC6KA-unsplash.jpg)

*We learn if/else on our first programming day. Then we forget the else*

> TL;DR: Be explicit. Even with Else.

# Problems

- Readability

- Cognitive Load

- Unforeseen conditions

- [Fail Fast Principle violation](Theory\Fail Fast)

# Solutions

1. Write the explicit else

# Context

If we early return on an IF sentence we can omit the else part. 

Afterward, we [Remove the IF](Theory\How to Get Rid of Annoying IFs Forever) and use polymorphism.

That is when we miss the real cases.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/8d2eb5957180d324326e2c30a72166f6)
```javascript
function carBrandImplicit(model) {
  if (model === 'A4') {
    return 'audi';
  }
  return 'Mercedes-Benz';
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/34f2e6cc97fb6ef9cb77f8998aaa790e)
```javascript
function carBrandExplicit(model) {
  if (model === 'A4') {
    return 'audi';
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

[Code Smell 102 - Arrow Code](..\Code Smells\Code Smell 102 - Arrow Code)

[Code Smell 36 - Switch/case/elseif/else/if statements](..\Code Smells\Code Smell 36 - Switch case elseif else if statements)

# More Info

[Stop Using Implicit Else](https://javascript.plainenglish.io/advice-from-a-senior-dev-stop-using-the-implicit-else-2a2ecf0a3583)

[When To Use Implicit Else](https://medium.com/lost-but-coding/when-to-use-implicit-else-e891cdcfe1bd)

[Fail Fast](..\Theory\Fail Fast)

[How to Get Rid of Annoying IFs Forever](..\Theory\How to Get Rid of Annoying IFs Forever)

# Credits

Photo by [Elena Mozhvilo](https://unsplash.com/es/@miracleday) on [Unsplash](https://unsplash.com/s/photos/invisible)
  
* * *

> The biggest issue on software teams is making sure everyone understands what everyone else is doing.

_Martin Fowler_
 
[Software Engineering Great Quotes](../Quotes\Software%20Engineering%20Great%20Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../Code%20Smells/How%20to%20Find%20%the%20%Stinky%20%parts%20%of%20%your%20%Code/readme.md)
