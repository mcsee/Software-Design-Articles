# Code Smell 178 - Subsets Violation
            
![Code Smell 178 - Subsets Violation](Code%20Smell%20178%20-%20Subsets%20Violation.jpg)

*Invisible objects have rules we need to enforce in a single point*

> TL;DR: Create Small objects and restrict your domain.

# Problems

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault 

- [Fail fast principle violation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

- [Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md) validation

# Solutions

1. Create small objects and validate the domain.

# Context

This is a primitive obsession smell.

*EmailAddresses* are a subset of *string*.

*Valid Ages* are a subset of *Real*.

*Ports* are a subset of *Integers*.

A *wordle word* is a subset of String.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/6fedc83479a0894ca2467247ecd5e85c)
```java
destination = "destination@example.com"
  
destination = "destination.example.com"
// No error thrown
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/51ea6966c13b5aa25c34437218eef5b8)
```java
public class EmailAddress {
    public String emailAddress;

    public EmailAddress(String address) {
        string expressions = @"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$";
        if (!Regex.IsMatch(email, expressions) {
          throw new Exception('Invalid address);
        }
        this.emailAddress = address;
    }
}

destination = new EmailAddress("destination@example.com);
```

Not to be confused with the anemic [Java version](http://officedev.github.io/ews-java-api/docs/releases/api-2.0/apidocs/microsoft/exchange/webservices/data/property/complex/EmailAddress.html)

# Detection

[X] Manual

This is a semantic smell.

# Tags

- Primitive Obsession

# Conclusion

We need to be loyal to the bijection of the real world. 

Subsets are very important for early validations and fail fast principle.

# Relations

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

# More Info

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Mona Eendra](https://unsplash.com/@monaeendra) on [Unsplash](https://unsplash.com/s/photos/boxed?)  

* * *

> Every craftsman starts his or her journey with a basic set of good-quality tools.

_Andrew Hunt_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)