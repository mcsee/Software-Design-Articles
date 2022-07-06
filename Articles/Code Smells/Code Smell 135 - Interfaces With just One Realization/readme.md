# Code Smell 135 - Interfaces With just One Realization

![Code Smell 135 - Interfaces With just One Realization](brian-kostiuk-WZ43jnCeWOs-unsplash.jpg)

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

On our [bijections](Theory\The One and Only Software Design Principle) we need to model existing real world protocols.

Interfaces are the [MAPPER](Theory\What is (wrong with) software) correspondence to protocol.

Dependency injection protocols declare interfaces that are fulfilled with their realizations. Until then, they can be empty.

If your language defines an interface for test mocking, it is another [code smell](Code Smells\Code Smell 30 - Mocking Business).

# Tags

- Over Design

# Relations

[Code Smell 130 - AddressImpl](Code Smells\Code Smell 130 - AddressImpl)

[Code Smell 30 - Mocking Business](Code Smells\Code Smell 30 - Mocking Business)

[Code Smell 136 - Classes With just One Subclass](Code Smells\Code Smell 136 - Classes With just One Subclass)

# Conclusion

We need to wait for abstractions and not be creative and speculative

# Credits

Photo by [Brian Kostiuk](https://unsplash.com/photos/WZ43jnCeWOs#:~:text=Photo%20by%20Brian%20Kostiuk%20on%20Unsplash) on Unsplash

* * *

> I love software, because if you can imagine something, you can build it.

_Ray Ozzie_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)