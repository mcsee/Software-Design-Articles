# Code Smell 186 - Hardcoded Business Conditions
            
![Code Smell 186 - Hardcoded Business Conditions](Code%20Smell%20186%20-%20Hardcoded%20Business%20Conditions.jpg)

*You are FTX and your code allows special cases*

> TL;DR: Don't add hard business rules to your code.

# Problems

- Open / Closed Principle Violation

- Hardcoding

- Testability

# Solutions

1. Reify the condition.

2. Create configuration options and set the exception on the configuration behavior.

3. Don't use [Settings/Configs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2029%20-%20Settings%20-%20Configs/readme.md).

# Context

According to [Reuters](https://www.reuters.com/technology/how-secret-software-change-allowed-ftx-use-client-money-2022-12-13/), in a recent FTX scandal, there was a hardcoded condition to skip risk controls to its own portfolio.

The code was explicit and developers were aware of that rule.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/27cdd48bf20694b735f7d5914c086022)

```solidity
if (currentExposure > 0.15 && customer != "Very Special Customer") {
  // Be extra careful not to liquidate
  liquidatePosition();
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/d43ab068cbec6d361fb429fd2860f518)

```solidity
customer.liquidatePositionIfNecessary(0.15);
  
  // This follows the "Tell, Don't ask" principle
```

# Detection

[X] Semi-Automatic 

We can search for primary hardcoded conditions (related to primitive types).

We might have more false positives than actual problems. 

# Tags

- Hardcoding

# Conclusion

If you make code reviews, pay special attention to this kind of hard coding.

# Relations

[Code Smell 133 - Hardcoded IF Conditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20133%20-%20Hardcoded%20IF%20Conditions/readme.md)

[Code Smell 29 - Settings / Configs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2029%20-%20Settings%20-%20Configs/readme.md)

# More Info

- [Reuters on FTX Crash]( https://www.reuters.com/technology/how-secret-software-change-allowed-ftx-use-client-money-2022-12-13/)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Alexander Mils](https://unsplash.com/@alexandermils) on [Unsplash](https://unsplash.com/s/photos/steal-money)  
  
* * *
> Computer science inverts the normal. In normal science, you're given a world, and your job is to find out the rules. In computer science, you give the computer the rules, and it creates the world.

_Alan Kay_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)