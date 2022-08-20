# Code Smell 161 - Abstract/Final/Undefined Classes

![Code Smell 161 - Abstract/Final/Undefined Classes](william-bossen-CeL6SfbXCx8-unsplash.jpg)

*Your classes are abstract, final o undefined*

> TL;DR: If your language has the right tool, your classes should be either abstract or final.

# Problems

- Subclassification for [Code Reuse](../../Code%20Smells/Code%20Smell%20%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

- Classes with [just one](../../Code%20Smells/Code%20Smell%20136%20-%20Classes%20With%20just%20One%20Subclass/readme.md) concrete subclass

- Liskov Substitution Violation

# Solutions

1. Declare all your leaf classes as *final* and the rest of them *abstract*.

# Context

Managing hierarchies and composition is the main task of a good software designer.

Keeping hierarchies healthy is very important to favor cohesion and avoid [coupling](../../Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md).

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/580be250747d29d198fe4bbf9db41c8e)
```java
public class Vehicle
{
  // class is not leaf. Therefore it should be abstract
  
  //variable that is used to declare the no. of wheels in a vehicle
  private int wheels;
  
  //Variable to define the type of motor used
  private Motor motor;
  
  //an abstract method that only declares, but does not define the start 
  //functionality because each vehicle uses a different starting mechanism
  abstract void start();
}

public class Car extends Vehicle
{
  // class is leaf. Therefore it should be final
}

public class Motorcycle extends Vehicle
{
  // class is leaf. Therefore it should be final
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/712df5f99ec232c4e4d2cdaf1bdf62c0)
```java
abstract public class Vehicle
{
  // class is not leaf. Therefore it should be abstract
  
  //variable that is used to declare the no. of wheels in a vehicle
  private int wheels;
  
  //Variable to define the type of motor used
  private Motor motor;
  
  //an abstract method that only declares, but does not define the start 
  //functionality because each vehicle uses a different starting mechanism
  abstract void start();
}

final public class Car extends Vehicle
{
  // class is leaf. Therefore it should be final
}

final public class Motorcycle extends Vehicle
{
  // class is leaf. Therefore it should be final
}
```

# Detection

[X] Automatic 

Since this is enforced by static analysis, we can't do it with most available tools.

# Tags

- Subclassification

# Conclusion

We should look back at our classes and start qualifying them either as abstract or final.

# Relations

[Code Smell 11 - Subclassification for Code Reuse](../../Code%20Smells/Code%20Smell%20%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

[Code Smell 136 - Classes With just One Subclass](../../Code%20Smells/Code%20Smell%20136%20-%20Classes%20With%20just%20One%20Subclass/readme.md)

[Code Smell 37 - Protected Attributes](../../Code%20Smells/Code%20Smell%2037%20-%20Protected%20Attributes/readme.md)

# More Info

[Coupling - The one and only software design problem](../../Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Disclaimer

Code Smells are just my [opinion](../../Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [William Bossen](https://unsplash.com/@william_bossen) on [Unsplash](https://unsplash.com/s/photos/the-end)
  
* * *

> When the final design seems too simple for the amount of work you've put in, then you know you're done.

_Brady Clark_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)