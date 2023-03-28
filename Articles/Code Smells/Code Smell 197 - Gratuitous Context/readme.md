# Code Smell 197 - Gratuitous Context
            
![Code Smell 197 - Gratuitous Context](Code%20Smell%20197%20-%20Gratuitous%20Context.jpg)

*This is a nice way to mark 'your' classes and objects*

> TL;DR: Don't prefix or suffix your names with irrelevant information

# Problems

- Lack of Polymorphism

- Bad Naming

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) violation with names

# Solutions

1. Remove this context from your names

# Context

In software development, gratuitous context refers to the unnecessary inclusion of additional information or data in code or user interfaces that do not contribute to the functionality or usability of the software.

It can make the software more difficult to use, understand and maintain.

It also increases the risk of errors or defects. 

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/0e69debe5bcce802a00b09be29a1a668)
```rust
struct WEBBExoplanet {
    name: String,
    mass: f64, 
    radius: f64, 
    distance: f64, 
    orbital_period: f64, 
}

struct WEBBGalaxy {
    name: String,
    classification: String,
    distance: f64, 
    age: f64,
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/111aa1f4c0d67b3230f6166aadecd9d6)
```rust
struct Exoplanet {
    name: String,
    mass: f64, 
    radius: f64, 
    distance: f64, 
    orbital_period: f64, 
}

struct Galaxy {
    name: String,
    classification: String,
    distance: f64, 
    age: f64,
}
```

# Detection

[X] Semi-Automatic 

We can find command patterns and rename all objects.

# Tags

- Naming

# Conclusion

Class Preffixing was a widespread practice decades ago to claim ownership. 

Carefully consider the context and content of the software, and avoid including unnecessary or extraneous information wherever possible.

Now we know clean names are more important.

# Relations

[Code Smell 141 - IEngine , AVehicle, ImplCar](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20141%20-%20IEngine%20,%20AVehicle,%20ImplCar/readme.md)

[Code Smell 130 - AddressImpl](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20130%20-%20AddressImpl/readme.md)

[Code Smell 174 - Class Name in Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20174%20-%20Class%20Name%20in%20Attributes/readme.md)

# More Info

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Mitchell Griest](https://unsplash.com/es/@griestprojects) on [Unsplash](https://unsplash.com/photos/psDzkLlifxQ)
    
* * *

> The most dangerous kind of waste is the waste we do not recognize.

_Shigeo Shingo_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)