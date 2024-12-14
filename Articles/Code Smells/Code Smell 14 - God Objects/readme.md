# Code Smell 14 - God Objects

![Code Smell 14 - God Objects](Code%20Smell%2014%20-%20God%20Objects.jpg)

*An object that knows too much or does too much.*

> TL;DR: Don't take too many responsibilities.

# Problems

- Cohesion

- Coupling

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Solutions

- Split responsibilities.

- Follow Single Responsibility Principle.

- Follow [The Boy Scout Rule](https://medium.com/@biratkirat/step-8-the-boy-scout-rule-robert-c-martin-uncle-bob-9ac839778385).

# Examples

- Libraries

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/9e31898b70c00fcb2d71d6d9a47be02d) -->

```javascript
class Soldier {
   run() {}
   fight() {}
   driveGeneral() {}
   clean() {} 
   fire() {} 
   bePromoted() {}
   serialize() {}
   display() {} 
   persistOnDatabase() {}
   toXML() {}
   jsonDecode() {}
  
  // ...
  }
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/93818a16a693b7371c8a81670ef522e5) -->

```javascript
class Soldier {
   run() {}
   fight() {}
   clean() {}    
  }
```

# Detection

Linters can count methods and warn against a threshold.

# Exceptions

- [Facades](https://en.wikipedia.org/wiki/Facade_pattern)

# Tags

- Cohesive

# Conclusion

Libraries were fine in the 60. In Object-Oriented Programming, we will distribute responsibilities among many objects.

# Also Known as

- Large Class

# Relations

[Code Smell 34 - Too Many Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2034%20-%20Too%20Many%20Attributes/readme.md)

[Code Smell 202 - God Constant Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20202%20-%20God%20Constant%20Class/readme.md)

[Code Smell 124 - Divergent Change](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20124%20-%20Divergent%20Change/readme.md)

# More Info

- [Wikipedia](https://en.wikipedia.org/wiki/God_object)
- [Refactoring Guru](https://refactoring.guru/es/smells/large-class)
- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Credits

Photo by [Francisco Ghisletti](https://unsplash.com/@tank_ghisletti) on [Unsplash](https://unsplash.com/s/photos/greek-god-statue)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)