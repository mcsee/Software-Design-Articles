# Code Smell 130 - AddressImpl

![Code Smell 130 - AddressImpl](Code%20Smell%20130%20-%20AddressImpl.jpg)

*It is nice to see a class implementing Interfaces. It is nicer to understand what it does*

> TL;DR: Name your classes after real-world concepts.

# Problems

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault

- [Bad Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Solutions

1. Find the correct name using the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

# Context

Some languages bring idioms and common usages against good model naming.

We should pick our names carefully.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/f1f4d16d6f90c682f540cd2c0c2cc5f2)
```java
public interface Address extends ChangeAware, Serializable {

    /**
     * Gets the street name.
     *
     * @return the street name
     */
    String getStreet();
    // ...
}

// Wrong Name - There is no concept 'AddressImpl' in real world
public class AddressImpl implements Address {
    private String street;
    private String houseNumber;
    private City city;
    // ..
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/6cf15d798176fd83cbe00e207d8351fc)
```java
// Simple
public class Address {
    private String street;
    private String houseNumber;
    private City city;
    // ..
}


// OR
// Both are real-world names
public class Address implements ContactLocation {
    private String street;
    private String houseNumber;
    private City city;
    // ..
}
```

# Detection

[X] Automatic 

Since this is a naming smell. 

We can search using regular expressions and rename these concepts.

# Tags

- Naming

# Conclusion

We should pick class names according to essential bijection and not follow accidental implementation.

Do not call *I* to your interfaces.

# Relations

[Code Smell 65 - Variables Named after Types](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2065%20-%20Variables%20Named%20after%20Types/readme.md)

[Code Smell 38 - Abstract Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2038%20-%20Abstract%20Names/readme.md)

# More Info

- [What's in a Name: Part II: Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Credits

Photo by [Paula Hayes](https://unsplash.com/@phayes007) on [Unsplash](https://unsplash.com/s/photos/mailbox)  

* * *

> Encoded names are seldom pronounceable and are easy to miss-type.

_Robert C. Martin_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)