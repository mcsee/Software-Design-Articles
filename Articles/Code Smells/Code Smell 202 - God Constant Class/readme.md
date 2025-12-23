# Code Smell 202 - God Constant Class
            
![Code Smell 202 - God Constant Class](Code%20Smell%20202%20-%20God%20Constant%20Class.jpg)

*Constants should be together to find them easily*

> TL;DR: Don't define too many unrelated constants in the same class. Don't pile up the junk together.

# Problems 😔 

- Bad Cohesion

- High Coupling

- Magic Numbers

- Single Responsibility principle violation

# Solutions 😃

1. Break the contents following Real World responsibilities using the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

# Context 💬

This is a special case of a God Object restricted only to constant definitions.

The repository can be a class, file, or JSON. 

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/402d6689b9a9bdef6a0cedf4e8974805) -->

```javascript
public static class GlobalConstants
{
   public const int MaxPlayers = 10;
   public const string DefaultLanguage = "en-US";
   public const double Pi = 3.14159;
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/d26aa5ca0e29c906689c7e0b3be8cd54) -->

```javascript
public static class GameConstants
{
    public const int MaxPlayers = 10;
}

public static class LanguageConstants
{
    public const string DefaultLanguage = "en-US";
}

public static class MathConstants
{
    public const double Pi = 3.14159;
}
```

# Detection 🔍

[X] Semi-Automatic

We can tell our linters to warn us of too many constants' definitions against a preset threshold. 

# Tags 🏷️

- Coupling

# Conclusion 🏁

Finding correct responsibilities is one of our primary tasks when designing software.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 14 - God Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2014%20-%20God%20Objects/readme.md)

[Code Smell 29 - Settings / Configs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2029%20-%20Settings%20-%20Configs/readme.md)

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

# More Information 📕

[Medium](https://bytedev.medium.com/the-god-constant-class-30d82cd4f677)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Aaron Burden](https://unsplash.com/@aaronburden) on [Unsplash](https://unsplash.com/images/things/book)
    
* * *

> If someone says their code was broken for a couple of days while they are refactoring, you can be pretty sure they were not refactoring.

_Martin Fowler_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)