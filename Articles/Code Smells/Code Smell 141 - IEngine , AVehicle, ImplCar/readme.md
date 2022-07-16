# Code Smell 141 - IEngine , AVehicle, ImplCar

![Code Smell 141 - IEngine , AVehicle, ImplCar](tim-mossholder-VurHDpO4VYI-unsplash.jpg)

*Have you ever seen an IEngine in the wild?*

> TL;DR: Don't prefix or suffix your classes

# Problems

- Readability

- [Bijection](Theory\The One and Only Software Design Principle) Fault

- Implementative Names

# Solutions

1. Remove prefixes and suffixes

2. Name your objects after what they do

# Context

Some languages have cultural conventions related to data types, Abstract classes, or Interfaces.

These names load our models with cognitive translations hard to follow. 

We must [KISS](https://en.wikipedia.org/wiki/KISS_principle).

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/00b852bfb884a47c5d7adf0543ec3a61)
```java
public interface IEngine
{
    void Start();
}

public class ACar 
{

}

public class ImplCar 
{

}

public class CarImpl
{

}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/4507889577dd937dda844b8119782a50)
```java
public interface Engine
{
    void Start();
}

public class Vehicle 
{

}

public class Car 
{

}
```

# Detection

[X] Automatic  

If we have a Thesaurus we can point to awkward names.

# Exceptions

In C# it's a common practice to put "I" in the name of an interface because without it, you can't tell whether it is an interface or a class.

This is a language smell.

# Tags

- Naming

# Conclusion

Use real names for your models.

# Relations

[Code Smell 130 - AddressImpl](Code Smells\Code Smell 130 - AddressImpl)

# More Info

- [What is in a name: Part II Rehab](Theory\What exactly is a name — Part II Rehab)

# Credits

Photo by Tim Mossholder on Unsplash

* * *

>Some people, when confronted with a problem, think “I know, I’ll use regular expressions.” Now they have two problems.

_Jamie Zawinski_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()