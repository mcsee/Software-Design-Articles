# Code Smell 135 - Interfaces With just One Realization

![Code Smell 135 - Interfaces With just One Realization](Code%20Smell%20135%20-%20Interfaces%20With%20just%20One%20Realization.jpg)

*Being generic and foreseeing the future is good.*

> TL;DR: Don't over-generalize

# Problems

- Speculative Design

- Complexity

- Over-Engineering

# Solutions

1. Remove the interface until you get more examples

# Context

In the past, programmers told us to design for change. 

Nowadays, We follow the scientific method. 

Whenever we find a duplication we remove it. 

Not before.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/e86499e8b367ce0d5524c347ed821cda)
```java
public interface Vehicle {
    public void start();
    public void stop();
}

public class Car implements Vehicle {
    public void start() {
        System.out.println("Running...");
    }
    public void stop() {
        System.out.println("Stopping...");
    }
}

// No more vehicles??
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/c7c06a683be5fe72d481840c2720e0d5)
```java
public class Car {
    public void start() {
        System.out.println("Running...");
    }
    public void stop() {
        System.out.println("Stopping...");
    }
}

// Wait until more vehicles are discovered
```

# Detection

[X] Automatic 

This is very easy for our linters since they can trace this error at compile time.

# Exceptions

This rule applies to inter system definition and business logic.

Some frameworks define an Interface as protocol to be fulfilled.

On our [bijections](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) we need to model existing real-world protocols.

Interfaces are the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) correspondence to protocol.

Dependency injection/Inversion protocols declare interfaces that are fulfilled with their realizations. Until then, they can be empty.

If your language defines an interface for test mocking, it is another [code smell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md).

# Tags

- Over Design

# Relations

[Code Smell 130 - AddressImpl](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20130%20-%20AddressImpl/readme.md)

[Code Smell 30 - Mocking Business](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md)

[Code Smell 136 - Classes With just One Subclass](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20136%20-%20Classes%20With%20just%20One%20Subclass/readme.md)

# Conclusion

We need to wait for abstractions and not be creative and speculative

# Credits

Photo by [Brian Kostiuk](https://unsplash.com/photos/WZ43jnCeWOs) on Unsplash

* * *

> I love software, because if you can imagine something, you can build it.

_Ray Ozzie_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)