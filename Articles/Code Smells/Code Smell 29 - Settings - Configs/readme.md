# Code Smell 29 - Settings / Configs

![Code Smell 29 - Settings / Configs](Code%20Smell%2029%20-%20Settings%20-%20Configs.jpg)

*Changing system behavior in a control board is the customer's dream. And the software engineer's nightmare.*

> TL;DR: Don't use Settings / Configs or any Feature Toggle
 
# Problems

- Duplicated Code

- [If Pollution](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

- Global usage

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Testability and explosion of testing scenarios.

- Complexity
 
# Solutions

1. Avoid Settings

2. Create polymorphic objects. Inject them externally.

# Examples

- External Connection Settings

- User settings

- [Feature Toggle](https://en.wikipedia.org/wiki/Feature_toggle)

# Sample Code

## Wrong 

[Gist Url]: # (https://gist.github.com/mcsee/f001710d13fd158e75313c9b54ffc1aa)
```javascript
class VerySpecificAndSmallObjectDealingWithPersistency {   
  retrieveData() {
    if (GlobalSettingsSingleton.getInstance().valueAt('IamAPossibleMistypedString')) {
      this.retriveDataThisWay();
    }
    else {
      this.retriveDataThisOtherWay();    
    }
  }
}


```

## Right
 
[Gist Url]: # (https://gist.github.com/mcsee/b4f9f8e80f19c89e99e10c999871ea2d)
```javascript
class VerySpecificAndSmallObjectDealingWithPersistency { 
   constructor(retrieveStrategy) {   
    this.retrieveStrategy = retrieveStrategy;
  }
  retrieveData() {
    this.retrieveStrategy.retrieveData();        
  }
}
// You get rid of the if condition by using a polymorphic strategy
```

# Detection

This is an architectural pattern so it should be controlled/avoided by design policies. 

# Exceptions

- Sometimes we use Feature toggling as a safeguard mechanism. This is acceptable in a legacy system. These toggles should be very short-lived in a [CI/CD](https://en.wikipedia.org/wiki/CI/CD) system.

- Hyper parameter settings should be managed by configuration objects.

# Tags

-  Globals

# Conclusion

Setting runtime behavior is great for software systems. 

We should configure our objects, so they can behave in different ways, and we should achieve it in an explicit way with explicit behavioral objects.

In this way, our code will be more declarative, clean and testable. It is not as easy as adding an *IF Statement*. This kind of lazy developers bring lots of coupling and unexpected issues on our systems.

> A system with 300 Boolean configurations has more test combinations (2 ^ 300), than the number of atoms in the universe (10 ^ 80).
 
#Also known as

- Feature Toggles

[Feature Flags are Dangerous](https://jeromedane.medium.com/feature-flags-are-dangerous-88ef9d6c9f04)

# Relations

[Code Smell 133 - Hardcoded IF Conditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20133%20-%20Hardcoded%20IF%20Conditions/readme.md)

[Code Smell 186 - Hardcoded Business Conditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20186%20-%20Hardcoded%20Business%20Conditions/readme.md)

# More Info

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)
 
* * *

> Simplicity is the soul of efficiency. 

_Austin Freeman_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the *CodeSmell* Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)