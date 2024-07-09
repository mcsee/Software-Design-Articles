# Code Smell 256 - Mutable Getters
            
![Code Smell 256 - Mutable Getters](Code%20Smell%20256%20-%20Mutable%20Getters.jpg)

*Using getters is a significant issue. Exposing internals is a major problem*

> TL;DR: Don't expose your internals and lose control

# Problems

- Mutability

- Unexpected Changes

- Ripple Effects

- Thread unsafety

- Encapsulation Principle violation

# Solutions

1. Return shallow copies of your collections

# Context

[Immutable objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md) are essential in functional and object-oriented programming. 

Once created, their state cannot be altered. 

This is key to keeping object integrity and ensuring thread safety in multithreaded applications.

Mutable getters allow callers to access and modify the internal state of an object, leading to potential corruption and unexpected behavior.

**When you break encapsulation, you take responsibility away from an object. Integrity is lost.**

Returning a page in a book is like an immutable copy. It cannot be edited, like a human memory. 

You can edit some memories by bringing them from long-term memory.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/715a932cd775b89b1ea04ce0e42775fe)

```java
public class Person {
    private List<String> hobbies;

    public Person(List<String> hobbies) {
        this.hobbies = hobbies;
    }

    public List<String> getHobbies() {
        return hobbies;
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/ddb3f75add70512e671e57a9440a862c)

```java
public class Person {
    private List<String> hobbies;

    public Person(List<String> hobbies) {
        this.hobbies = new ArrayList<>(hobbies);
    }

    public List<String> hobbies() {
        // This returns a shallow copy
        // This is usually not a big performance issue
        return new ArrayList<>(hobbies);
    }
}
```

# Detection

[X] Semi-Automatic 

You can detect mutable getters by examining the return types of your getters. 

If they return mutable collections or objects, you need to refactor them to return immutable copies or use immutable data structures.
 
# Tags

- Mutability

# Level

[x] Intermediate

# AI Generation

AI generators might create this smell if they prioritize simplicity and brevity over best practices. 

They not always consider the implications of returning mutable objects.

# AI Detection

AI tools can detect this smell if you instruct them to look for getters returning mutable objects or collections. 

They can suggest returning copies or using immutable types to fix the issue.

# Conclusion

Getters are a [code smell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md), but something you need to return objects you hold.

You can do it at your own risk, but retain the tracking of those collections.

Avoid mutable getters to protect your object integrity and encapsulation. 

By returning immutable copies or using immutable types, you can prevent unintended modifications and ensure your objects remain reliable and predictable.

# Relations

[Code Smell 68 - Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)

[Code Smell 109 - Automatic Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20109%20-%20Automatic%20Properties/readme.md)

# More Info

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

[Nude Models - Part II: Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Suzanne D. Williams](https://unsplash.com/es/@scw1217) on [Unsplash](https://unsplash.com/s/photos/tres-pupas-VMKBFR6r_jg)  
  
* * *

> The best programmers write only easy programs.

_Michael A. Jackson_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)