# Code Smell 141 - IEngine , AVehicle, ImplCar

![Code Smell 141 - IEngine , AVehicle, ImplCar](Code%20Smell%20141%20-%20IEngine%20,%20AVehicle,%20ImplCar.jpg)

*Have you ever seen an IEngine in the wild?*

> TL;DR: Don't prefix or suffix your classes

# Problems 😔 

- Readability

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault

- Implementative Names

# Solutions 😃

1. Remove prefixes and suffixes

2. Name your objects after what they do

# Context 💬

Some languages have cultural conventions related to data types, Abstract classes, or Interfaces.

These names load our models with cognitive translations hard to follow. 

We must [KISS](https://en.wikipedia.org/wiki/KISS_principle).

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/00b852bfb884a47c5d7adf0543ec3a61) -->

```java
public interface IEngine
{
    void Start();
}

public class ACar {}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/4507889577dd937dda844b8119782a50) -->

```java
public interface Engine
{
    void Start();
}

public class Vehicle {}
public class Car {}
```

# Detection 🔍

[X] Automatic  

If we have a Thesaurus we can point to awkward names.

# Exceptions 🛑

In C# it's a common practice to put "I" in the name of an interface because without it, you can't tell whether it is an interface or a class.

This is a language smell.

# Tags 🏷️

- Naming

# Level 🔋

[X] Beginner

# Conclusion 🏁

Use real names for your models.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 130 - AddressImpl](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20130%20-%20AddressImpl/readme.md)

# More Information 📕

- [What is in a name: Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Credits 🙏

Photo by Tim Mossholder on Unsplash

* * *

>Some people, when confronted with a problem, think "I know, I’ll use regular expressions." Now they have two problems.

_Jamie Zawinski_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)