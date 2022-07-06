# Code Smell 109 - Automatic Properties

![Code Smell 109 - Automatic Properties](kony-v2ogJh_Pbxg-unsplash.jpg)

*What happens if you combine 4 code smells?*

> TL;DR: Avoid Getters, Avoid Setters, Avoid Metaprogramming. Think about Behavior.

# Problems

- Information Hiding Violation

- [Mutability](Theory\The Evil Power of Mutants)

- [Fail Fast Principle](Theory\Fail Fast) violation

- Duplicate code when setting properties

# Solutions

1. [Remove automatic setters and getters](Refactorings\Refactoring 001 - Remove Setters)

# Context

Setters and getters are a bad industry practice.

Many IDEs favor this code smell. 

Some languages provide explicit support to build anemic models and DTOs.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/2353f11cfb336aaeda194c4a11a21324)
```csharp
class Person
{
  public string name 
  { get; set; }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/198d8a232bd1abf52cda0884fb96bc5f)
```csharp
class Person
{
  private string name  
  
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

[Code Smell 28 - Setters](Code Smells\Code Smell 28 - Setters)

[Code Smell 68 - Getters](Code Smells\Code Smell 68 - Getters)

[Code Smell 70 - Anemic Model Generators](Code Smells\Code Smell 70 - Anemic Model Generators)

[Code Smell 40 - DTOs](Code Smells\Code Smell 40 - DTOs)

[Code Smell 01 - Anemic Models](Code Smells\Code Smell 01 - Anemic Models)

# More Info

- [W3 schools](https://www.w3schools.com/cs/cs_properties.php)

- [Lazyness I - Metaprogramming](Theory\Lazyness I - Metaprogramming)

- [Lazyness II - Code Wizards](Theory\Lazyness II - Code Wizards)

- [Refactoring 001 - Remove Setters](Refactorings\Refactoring 001 - Remove Setters)

- [The Evil Power of Mutants](Theory\The Evil Power of Mutants)

- [Fail Fast](Theory\Fail Fast)

# Credits

Photo by [Kony](https://unsplash.com/@konyxyzx) on [Unsplash](https://unsplash.com/s/photos/shoot)
  
* * *

> Nothing is harder than working under a tight deadline and still taking the time to clean up as you go.

_Kent Beck_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)