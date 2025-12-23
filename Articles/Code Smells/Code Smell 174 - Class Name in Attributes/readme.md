# Code Smell 174 - Class Name in Attributes
            
![Code Smell 174 - Class Name in Attributes](Code%20Smell%20174%20-%20Class%20Name%20in%20Attributes.jpg)

*Redundancy in names is a bad smell. Names should be contextual*

> TL;DR: Don't prefix your attributes with your class name

# Problems 😔 

- Not Contextual Names

# Solutions 😃

1. Remove the class prefix from the attribute

# Context 💬

This is a naming smell, we should not read attributes in isolation and names are contextual.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/a826cc57021603442286f8c40d6981a2) -->

```java
public class Employee {
   String empName = "John";
   int empId = 5;
   int empAge = 32;
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/60f3381be1d06def7f68419ec2776b3a) -->

```java
public class Employee {
   String name;
   int id; // Ids are another smell
   int age; // Storing the age is another code smell
}
```

# Detection 🔍

[X] Semi-Automatic 

When the full name is included in the prefix, our linters can warn us.

# Tags 🏷️

- Naming

# Conclusion 🏁

Careful naming is a very important task.

We need to name after the behavior, not type or data

# Relations 👩‍❤️‍💋‍👨

[Code Smell 188 - Redundant Parameter Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20188%20-%20Redundant%20Parameter%20Names/readme.md)

[Code Smell 141 - IEngine , AVehicle, ImplCar](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20141%20-%20IEngine%20,%20AVehicle,%20ImplCar/readme.md)

[Code Smell 96 - My Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2096%20-%20My%20Objects/readme.md)

[Code Smell 65 - Variables Named after Types](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2065%20-%20Variables%20Named%20after%20Types/readme.md)

# More Information 📕

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

- [Linux Hint](https://linuxhint.com/java-class-attributes/)

# Disclaimer 📘

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Phoenix Han](https://unsplash.com/@phienix_han) on [Unsplash](https://unsplash.com/s/photos/mushroom)
  
* * *

> Copying skips understanding. Understanding is how you grow. You have to understand why something works or why something is how it is. When you copy it, you miss that. You just repurpose the last layer instead of understanding all the layers underneath.

_Jason Fried_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)