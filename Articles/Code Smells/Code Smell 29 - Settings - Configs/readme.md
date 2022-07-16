# Code Smell 29 - Settings - Configs

![Code Smell 29 - Settings - Configs](Iu2NeJu9tSwmk-nVYy5RJPGFALErsqn1yKO3tNHBT2A.jpg)

*Changing system behavior in a control board is the customer's dream. And the software engineer's nightmare.*
 
# Problems

- Duplicated Code

- [If Pollution](Theory\How to Get Rid of Annoying IFs Forever)

- Global usage

- [Coupling](Theory\Coupling - The one and only software design problem)

- Testability and explosion of testing scenarios.

- Complexity
 
# Solutions

1. Avoid Settings

2. Create polymorphic objects. Inject them externally.

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
```

# Detection

This is an architectural pattern so it should be controlled/avoided by design policies. 

# Examples

- External Connection Settings

- User settings

- [Feature Toggle](https://en.wikipedia.org/wiki/Feature_toggle)

# Exceptions

- Sometimes we use Feature togging as a safeguard mechanism. This is acceptable in a legacy system. These toggles should be very short-lived in a [CI/CD](https://en.wikipedia.org/wiki/CI/CD) system.

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

https://jeromedane.medium.com/feature-flags-are-dangerous-88ef9d6c9f04

# More Info

[How to Get Rid of Annoying IFs Forever](Theory\How to Get Rid of Annoying IFs Forever)
 
* * *

> Simplicity is the soul of efficiency. 

_Austin Freeman_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the *CodeSmell* Series.

[How to Find the Stinky parts of your Code]()