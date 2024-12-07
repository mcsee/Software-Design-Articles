# Refactoring 001 - Remove Setters

![Refactoring 001 - Remove Setters](Refactoring%20001%20-%20Remove%20Setters.jpg)

*Setters violate immutability and add accidental coupling*

> TL;DR: Make your attributes private to favor mutability 

# Problems Addressed

- Mutability

- setXXX() violates good naming policies since it does not exist on the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

- Accidental [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Related Code Smells

[Code Smell 28 - Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 109 - Automatic Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20109%20-%20Automatic%20Properties/readme.md)

# Steps

1. Locate the setters' usage

2. If you are setting essential properties move them to the constructor and remove the method

3. If you need to change an accidental property it is not a setter. Remove the setXXX prefix

# Sample Code

## Before
 
[Gist Url]: # (https://gist.github.com/mcsee/b34136c13dddf4cd751579c2b51d91a3)

```java
public class Point {
   protected int x;
   protected int y;
  
   public Point() {
        this.x = 0;
        this.y = 0;        
   }
    
   public void setX(int x) {
	this.x = x;
   }
  
   public void setY(int y) {
        this.y = y;
  } 
}

Point location = new Point();
// At this moment, it is not clear which points represent
// It is coupled to the constructor decision.
// Might be null or some other convention

location.setX(1);
// Now we have point(1,0)

location.setY(2);
// Now we have point(1,2)
```

## After

[Gist Url]: # (https://gist.github.com/mcsee/d8a4183ef00f5636c2d821f96a9cefd0)

```java
public class Car {
   protected int speed;
  
   public Car() {     
   }
    
   public void setSpeed(Speed desiredSpeed) {
	this.speed = desiredSpeed;
   }   
}

Car tesla = new Car();
// We have no speed??

tesla.setSpeed(100 km/h);
// Now our car runs fast
```

[Gist Url]: # (https://gist.github.com/mcsee/28a11e50d2880767238e6198ccaa93f5)

```java
public class Car {
   protected int speed;
  
   public Car() {    
     this.speed = 0 km/h;
   }
    
   public void speed(Speed desiredSpeed) {
	    this.speed = desiredSpeed;
   }   
}

// 1. Locate the setters usage
// 3. If you need to change an accidental property
// it is not a setter. Remove the setXXX prefix

Car tesla = new Car();
// Our car is stopped

tesla.speed(100 km/h);
// We tell the desired speed. We don't set anything
// We don't care if the car stores its new speed.
// if it manages through the engine
// if the road is moving etc
```
	     
# Type

[X] Semi-Automatic

We should detect setters (unless they use meta-programming) with our IDEs.

We can also remove them and see which tests fail if we have good coverage.

# Safety

This is not a safe refactoring since you might miss some methods calling the removed setters.

You need to make sure to have good coverage and also an excellent QA process to ensure a smooth refactoring.

# Tags

- Mutability

# Related Refactorings

- Remove Getters

- Pass essential properties in the constructor

- Initialize essential properties in the constructor

# Why is the Code Better?

This refactoring improves encapsulation and integrity adding an extra access control layer.

# Credits

Image by [Comfreak](https://pixabay.com/users/comfreak-51581/) on [Pixabay](https://pixabay.com/)

* * *

This article is part of the Refactoring Series.