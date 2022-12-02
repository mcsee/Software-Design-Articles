# Code Smell 181 - Nested Classes
            
![Code Smell 181 - Nested Classes](Code%20Smell%20181%20-%20Nested%20Classes.jpg)

*Nested or Pseudo-Private Classes seem great for hiding implementation details.*

> TL;DR: Don't use nested classes

# Problems

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) fault to real-world concepts.

- Lack of testability

- Lack of reuse

- Scopes and [namespaces complexity](https://stackoverflow.com/questions/47452783/code-style-and-smells-nested-classes)

# Solutions

1. Make the class public

2. Keep the public class under your own namespace/module.

3. Use a Facade to the external world to hide it.

# Context

Some languages allow us to create private concepts that only live inside a more significant idea. 

These classes are harder to test, harder to debug, and reuse.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/836b485a9a9bb29e8292f9e79b867cbb)
```java
class Address {
  String description = "Address: ";

  public class City {
    String name = "Doha";
  }
}

public class Main {
  public static void main(String[] args) {
    Address homeAddress = new Address();
    Address.City homeCity = homeAddress.new City();
    System.out.println(homeAddress.description + homeCity.name);
  }
}

// The output is "Adress: Doha"
//
// If we change privacy to 'private class City' 
//
// We get an error " Address.City has private access in Address"
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/abcc622d9f0f27c40fd94202535dcced)
```java
class Address {
  String description = "Address: ";
}
 
class City {
  String name = "Doha";
}

public class Main {
  public static void main(String[] args) {
    Address homeAddress = new Address();
    City homeCity = new City();
    System.out.println(homeAddress.description + homeCity.name);
  }
}

// The output is "Adress: Doha"
//
// Now we can reuse and test the City concept
```

# Detection

[X] Automatic 

Since this is a language feature, we can detect it and avoid its usage.

# Tags

- Hierarchies

# Conclusion

Many features are bloated with complex features.

We seldom need these new pop culture features.

We need to keep a [minimal](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) set of concepts.

# More Info

- [W3 schools](https://www.w3schools.com/java/java_inner_classes.asp)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Dana Ward](https://unsplash.com/@danaward) on [Unsplash](https://unsplash.com/s/photos/spiral)  
 
* * *

> Developers are drawn to complexity like moths to a flame, frequently with the same result.

_Neal Ford_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)