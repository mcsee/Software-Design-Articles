# Code Smell 65 - Variables Named after Types

![Code Smell 65 - Variables Named after Types](Code%20Smell%2065%20-%20Variables%20Named%20after%20Types.jpg)

*Names should always indicate role.*

> TL;DR: Don't name your variables with the accidental type

# Problems

- Declarative

- Design for Change

- Coupling to accidental implementation

# Solutions

1. Rename your variable according to the role.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/00c30c369fe7339e28d50f858392cf4c) -->

```java
public bool CheckIfStringHas3To7LowercaseCharsFollowedBy3or4Numbers
    (string textToCheck)
{
        Regex regex = new Regex(@"[a-z]{2,7}[1-9]{3,4}")
        var bool = regex.IsMatch(textToCheck);
        return bool;
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/91e3a3f2b1351fa0e09fb8c56a5c2779) -->

```java
public bool CheckIfStringHas3To7LowercaseCharsFollowedBy3or4Numbers
    (string password)
{
  Regex stringHas3To7LowercaseCharsFollowedBy3or4Numbers = 
    new Regex(@"[a-z]{2,7}[1-9]{3,4}")
  var hasMatch =
    stringHas3To7LowercaseCharsFollowedBy3or4Numbers.IsMatch(password);
  return hasMatch;  
}
```

# Detection

This is a semantic rule. We can instruct our linters to warn us from using names related to existing classes, types o reserved words since they are too implementative.

# Tags

- Declarative

# Level

[X] Beginner

# Conclusion

The first name we can across is related to an accidental point of view. It takes time to build a theory on the models we are building using our [MAPPERS](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md). Once we get there, we must rename our variables-

# Relations

[Code Smell 38 - Abstract Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2038%20-%20Abstract%20Names/readme.md)

[Code Smell 174 - Class Name in Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20174%20-%20Class%20Name%20in%20Attributes/readme.md)

# More Info

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

%[http://xunitpatterns.com/Intent%20Revealing%20Name.html]

# Credits

Photo by [Sangga Rima Roman Selia](https://unsplash.com/@sxy_selia) on [Unsplash](https://unsplash.com/s/photos/name)
  
This idea came from this tweet

%[https://twitter.com/BelloneDavide/status/1377522389312008193]	    

* * *

> Types are essentially assertions about a program.  And I think it’s valuable to have things be as absolutely simple as possible, including not even saying what the types are.

_Dan Ingalls_
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)
