# Code Smell 14 - God Objects

![Code Smell 14 - God Objects](francisco-ghisletti-Wf2tCunxqQU-unsplash.jpg)

*An object that knows too much or does too much.*

> TL;DR: Don't take too many responsibilities.

# Problems

- Cohesion

- Coupling

[Coupling - The one and only software design problem](Theory\Coupling - The one and only software design problem)

# Solutions

- Split responsibilities.
- Follow Single Responsibility Principle.
- Follow [The Boy Scout Rule](https://medium.com/@biratkirat/step-8-the-boy-scout-rule-robert-c-martin-uncle-bob-9ac839778385).

# Examples

- Libraries

# Exceptions

- [Facades](https://en.wikipedia.org/wiki/Facade_pattern)

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/9e31898b70c00fcb2d71d6d9a47be02d)
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

[Gist Url]: # (https://gist.github.com/mcsee/93818a16a693b7371c8a81670ef522e5)
```javascript
class Soldier {
   run() {}
   fight() {}
   clean() {}    
  }

```

# Detection

Linters can count methods and warn against a threshold.

# Tags

- Cohesive

# Conclusion

Libraries were fine in the 60. In Object-Oriented Programming, we will distribute responsibilities among many objects.

# Also Known as

- Large Class

# Relations

- [Code Smell 34 - Too Many Attributes](Code Smells\Code Smell 34 - Too Many Attributes)

# More info

- [Wikipedia](https://en.wikipedia.org/wiki/God_object)
- [Refactoring Guru](https://refactoring.guru/es/smells/large-class)
- [Coupling](Theory\Coupling - The one and only software design problem)

# Credits

Photo by [Francisco Ghisletti](https://unsplash.com/@tank_ghisletti) on [Unsplash](https://unsplash.com/s/photos/greek-god-statue)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()