# Code Smell 109 - Automatic Properties

![Code Smell 109 - Automatic Properties](Code%20Smell%20109%20-%20Automatic%20Properties.jpg)

*What happens if you combine 4 code smells?*

> TL;DR: Avoid Getters, Avoid Setters, Avoid Metaprogramming. Think about Behavior.

# Problems

- Information Hiding Violation

- [Mutability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

- [Fail Fast Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) violation

- Duplicate code when setting properties

# Solutions

1. [Remove automatic setters and getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md)

# Context

Setters and getters are a bad industry practice.

Many IDEs favor this code smell. 

Some languages provide explicit support to build anemic models and DTOs.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/2353f11cfb336aaeda194c4a11a21324) -->

```csharp
class Person
{
  public string name 
  { get; set; }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/198d8a232bd1abf52cda0884fb96bc5f) -->

```csharp
class Person
{
  private string name;  
  
  public Person(string personName)
  {
    name = personName;
    // immutable
    // no getters, no setters
  }

  // ... more protocol, probably accessing private variable name
}
```

# Detection

[X] Automatic 

This is a language feature.

We should avoid immature languages or forbid their worst practices.

# Tags

- Encapsulation

# Conclusion

We need to think carefully before exposing our properties.

The first step is to stop thinking about properties and focus solely on behavior.

# Relations

[Code Smell 28 - Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)

[Code Smell 68 - Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)

[Code Smell 70 - Anemic Model Generators](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2070%20-%20Anemic%20Model%20Generators/readme.md)

[Code Smell 40 - DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 190 - Unnecessary Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20190%20-%20Unnecessary%20Properties/readme.md)

# More Info

[W3 schools](https://www.w3schools.com/cs/cs_properties.php)

[Laziness I - Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

[Laziness II - Code Wizards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20II%20-%20Code%20Wizards/readme.md)

[Refactoring 001 - Remove Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md)

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Credits

Photo by [Kony](https://unsplash.com/@konyxyzx) on [Unsplash](https://unsplash.com/s/photos/shoot)
  
* * *

> Nothing is harder than working under a tight deadline and still taking the time to clean up as you go.

_Kent Beck_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)