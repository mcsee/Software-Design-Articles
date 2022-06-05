# Code Smell 130 - AddressImpl

*It is nice to see a class implementing Interfaces. It is nicer to understand what it does*

![Code Smell 130 - AddressImpl](paula-hayes-Eeee5H-yuoc-unsplash.jpg)

> TL;DR: Name your classes after real-world concepts.

# Problems

- [Bijection](https://maximilianocontieri.com/the-one-and-only-software-design-principle) Fault

- [Bad Names](https://maximilianocontieri.com/what-exactly-is-a-name-part-ii-rehab)

# Solutions

1. Find the correct name using the [MAPPER](Theory\What is (wrong with) software)

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
    //...
}

//Wrong Name - There is no concept 'AddressImpl' in real world
public class AddressImpl implements Address {
    private String street;
    private String houseNumber;
    private City city;
    //..
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/6cf15d798176fd83cbe00e207d8351fc)
```java
//Simple
public class Address {
    private String street;
    private String houseNumber;
    private City city;
    //..
}


//OR
//Both are real-world names
public class Address implements ContactLocation {
    private String street;
    private String houseNumber;
    private City city;
    //..
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

[Code Smell 65 - Variables Named after Types](https://maximilianocontieri.com/code-smell-65-variables-named-after-types)

[Code Smell 38 - Abstract Names](https://maximilianocontieri.com/code-smell-38-abstract-names)

# More Info

- [What's in a Name: Part II: Rehab](https://maximilianocontieri.com/what-exactly-is-a-name-part-ii-rehab)

# Credits

Photo by [Paula Hayes](https://unsplash.com/@phayes007) on [Unsplash](https://unsplash.com/s/photos/mailbox)  

* * *

> Encoded names are seldom pronounceable and are easy to miss-type.

_Robert C. Martin_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://maximilianocontieri.com/how-to-find-the-stinky-parts-of-your-code)