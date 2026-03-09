# Refactoring 039 - Extract Global Internalization

![Refactoring 039 - Extract Global Internalization](Refactoring%20039%20-%20Extract%20Global%20Internalization.jpg)

*Decouple your logic from global functions*

> TL;DR: You can remove hidden dependencies by passing an explicit translator interface to your methods.

# Problems Addressed 😔

- Hidden global dependencies

- Hardcoded logic

- Untestable side effects

- Tight coupling issues

- Difficult internationalization

# Related Code Smells 💨

[Code Smell 17 - Global Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2017%20-%20Global%20Functions/readme.md)  
 
[Code Smell 32 - Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2032%20-%20Singletons/readme.md)

# Context 💬

When you implement specialized logic like a translation service, you often rely on global access to simplify string retrieval.

However, this creates a hidden dependency that forces every caller to depend on a global state.

By refactoring to a Domain Translator, you transform a magic global function into an explicit contract.

This shift allows you to swap implementations, handle different contexts (like technical versus public descriptions), and test logic in isolation without touching a localization subsystem.

You move the responsibility of "interpreting" data away from the global scope and into a controlled, injectable tool that respects your system's boundaries.

# Steps 👣

1. Identify the call to a global function or static utility.

2. Create a domain interface that defines the translation contract.

3. Change the method signature to accept this interface as a parameter.

4. Replace the global call with a call to the parameter.

5. Provide a concrete implementation in your production entry point.

# Sample Code 💻

## Before 🚨

<!-- [Gist Url](https://gist.github.com/mcsee/d1ce286510fba9e65b0be88bf617f9cd) -->

```java
public class NearEarthObject {
    private double energy;
    private double probability;

    public String getStatusDescription() {
        int level = calculateTorinoLevel();
        String key = "LEVEL_" + level;
        // You are calling a global static function
        // This makes the object hard to test
        return GlobalTranslator.translate(key);
    }
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/319a76a22fbb375f427d21ff9506ed78) -->

```java
// File: Translator.java
// Step 2: Create a domain interface

public interface Translator {
    String translate(String key);
}

// File: NearEarthObject.java
public class NearEarthObject {
    private double energy;
    private double probability;

    // Step 3: Accept the interface as a parameter
    public String getStatusDescription(Translator translator) {
        int level = calculateTorinoLevel();
        String key = "LEVEL_" + level;
        // Step 4: Replace the global call with the parameter
        return translator.translate(key);
    }
}
```

# Type 📝

[X] Manual

# Safety 🛡️

This refactoring is generally safe. 

You must update all callers of the modified method to pass an implementation of the interface. 

Modern IDEs can flag these missing arguments immediately.

# Why is the Code Better? ✨

The code becomes more modular and testable. 

You can now test your domain logic by passing a hardcoded translator (it is not a mock) without setting up a global localization system. 

You also gain flexibility because you can change the translation strategy at runtime without modifying the domain object.

# How Does it Improve the Bijection? 🗺️

In the MAPPER, an object and the observer who describes it are distinct entities. 

By removing global calls, you maintain a better Bijection. 

You separate the essence of the simulated object from the context-dependent way humans talk about it. This reduces Coupling between the model and the infrastructure.

# Limitations ⚠️

If you have many methods requiring the translator, passing it as a parameter might lead to long parameter lists. 

In such cases, you can inject the translator into the object's constructor instead.

# Tags 🏷️

- Coupling

# Related Refactorings 🔄

[Refactoring 020 - Transform Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20020%20-%20Transform%20Static%20Functions/readme.md)

[Refactoring 024 - Replace Global Variables with Dependency Injection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20024%20-%20Replace%20Global%20Variables%20with%20Dependency%20Injection/readme.md)

# Refactor with AI 🤖

You can guide an AI to apply this refactoring by giving it these instructions:

"Identify any static calls to global translation or utility functions in this class. 

Extract an interface for that functionality and refactor the methods to accept that interface as a parameter."

# Level 🔋
[X] Intermediate

# See also 📚

Dependency Injection by Mark Seemann.

# Credits 🙏

Image by [Oli Lynch](https://pixabay.com/users/olilynch-3815693/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)