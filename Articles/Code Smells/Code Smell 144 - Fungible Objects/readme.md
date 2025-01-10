# Code Smell 144 - Fungible Objects

![Code Smell 144 - Fungible Objects](Code%20Smell%20144%20-%20Fungible%20Objects.jpg)

*We have heard a lot about NFTs. Now we master the Fungible concept*

> TL;DR: Respect the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md). Make fungible what is Fungible in real-world and vice-versa.

# Problems

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault

- Over Design

# Solutions

1. Identify fungible elements on your domains

2. Model them as interchangeable

# Context

According to [Wikipedia](https://en.wikipedia.org/wiki/Fungibility)

> Fungibility is the property of a good or a commodity whose individual units are essentially interchangeable and each of whose parts is indistinguishable from another part.

In software, we can replace fungible objects with others.

When [mapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) our objects with real ones, we sometimes forget about the *partial* model and build over design. 

![Fungible Model](Fungible%20Model.png) 

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/3fc2c7089aa88088a73138ee6b62e675) -->

```java
public class Person implements Serializable {
    private final String firstName;
    private final String lastName;

    public Person(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

shoppingQueueSystem.queue(new Person('John', 'Doe'));
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/97a8fd4467d51b6769f7ba63210dddee) -->

```java
public class Person  { 
} 

shoppingQueueSystem.queue(new Person());
// The identity is irrelevant for queue simulation
```

# Detection

[X] Manual

This is a semantic smell.

We need to understand the model to check whether it is right or not.

# Tags

- Over Design

# Level

[X] Intermediate

# Conclusion

Make fungible what is fungible and vice-versa.

Sounds easy but requires design skills and avoiding accidental complexity.

# Relations

[Code Smell 190 - Unnecessary Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20190%20-%20Unnecessary%20Properties/readme.md)

# Credits

Photo by [Andrey Metelev](https://unsplash.com/@metelevan) on [Unsplash](https://unsplash.com/s/photos/nft)
  
* * *

> People think that computer science is the art of geniuses but the actual reality is the opposite, just many people doing things that build on each other, like a wall of mini stones.

_Donald Knuth_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)