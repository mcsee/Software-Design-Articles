# Code Smell 216 - Fat Interface
            
![Code Smell 216 - Fat Interface](Code%20Smell%20216%20-%20Fat%20Interface.jpg)

*You should not define too much behavior together*

> TL;DR: Split your interfaces 

# Problems 😔 

- Interface Segregation Principle Violation

- Coupling

# Solutions 😃

1. Split the interface

2. Use composition instead of inheritance

# Context 💬

The term "Fat Interface" emphasizes that the interface is overloaded with methods, including those that may not be necessary or used by all clients. 

The interface violates the principle of segregating interfaces into smaller, more focused contracts.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/dc549ce28d805020e657f227eef10c5f) -->

```java
interface Animal {
  void eat();
  void sleep();
  void makeSound();
  // This protocol should be common to all animals
}

class Dog implements Animal {
  public void eat() { }
  public void sleep() { }
  public void makeSound() { }
}

class Fish implements Animal
  public void eat() { }
  public void sleep() {
    throw new UnsupportedOperationException("I do not sleep");
  }
  public void makeSound() {
    throw new UnsupportedOperationException("I cannot make sounds");
  }
}

class Bullfrog implements Animal
  public void eat() { }
  public void sleep() { 
    throw new UnsupportedOperationException("I do not sleep");  
  }
  public void makeSound() { }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/811c638d22fb50bff24336695a6750ae) -->

```java
interface Animal {
  void move();
  void reproduce();  
}
// You can even break these two responsibilities

class Dog implements Animal {
  public void move() { }
  public void reproduce() { } 
}

class Fish implements Animal {
  public void move() { }
  public void reproduce() { } 
}

class Bullfrog implements Animal {
  public void move() { }
  public void reproduce() { } 
}
```

# Detection 🔍

[X] Manual

We can check the size of the interface protocol

# Level 🔋

[X] Intermediate

# Tags 🏷️

- Bloaters

# Conclusion 🏁

Favoring small, reusable code components promotes code and behavior reuse.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 61 - Coupling to Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2061%20-%20Coupling%20to%20Classes/readme.md)

[Code Smell 135 - Interfaces With just One Realization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20135%20-%20Interfaces%20With%20just%20One%20Realization/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Towfiqu barbhuiya](https://unsplash.com/fr/@towfiqu999999) on [Unsplash](https://unsplash.com/s/photos/fa)
    
* * *

> The best smells are something that's easy to spot and most of time lead you to really interesting problems. Data classes (classes with all data and no behavior) are good examples of this. You look at them and ask yourself what behavior should be in this class.

_Martin Fowler_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)