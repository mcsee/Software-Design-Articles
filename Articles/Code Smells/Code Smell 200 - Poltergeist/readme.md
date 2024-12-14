# Code Smell 200 - Poltergeist
            
![Code Smell 200 - Poltergeist](Code%20Smell%20200%20-%20Poltergeist.jpg)

*An object that appears and disappears mysteriously*

> TL;DR: Add the necessary indirection layers, but no more.

# Problems

- [Accidental](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) complexity

- Readability

- YAGNI violation

# Solutions

1. Remove the intermediate object

# Context

A poltergeist (or gypsy wagon) is a short-lived object used to perform initialization or to invoke methods in another, more permanent class. 

An object is responsible for many small tasks, resulting in excessive coupling and a lack of cohesion in the code.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/e51b8f319d33c800895b14e463b3b380) -->

```csharp
public class Driver
{
    private Car car;

    public Driver(Car car)
    {
        this.car = car;
    }

    public void DriveCar()
    {
        car.driveCar();
    }
}

Car porsche = new Car();
Driver homer = new Driver(porsche);
homer.DriveCar();
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/0c13213cc8d76d0f1d5041deb94a7946) -->

```csharp
// You don't need the driver
Car porsche = new Car();
porsche.driveCar();
```

# Detection

[X] Manual

This is a design smell.

# Tags

- Complexity 

# Conclusion

Don't add accidental complexity to the essential complexity we already have. 

Remove [middleman](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2067%20-%20Middle%20Man/readme.md) objects if they are not needed. 

# Relations

[Code Smell 54 - Anchor Boats](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2054%20-%20Anchor%20Boats/readme.md)

[Code Smell 67 - Middle Man](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2067%20-%20Middle%20Man/readme.md)

# More Info

[Wikipedia](https://en.wikipedia.org/wiki/Poltergeist_(computer_programming))

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Lan Gao](https://unsplash.com/@langao) on [Unsplash](https://unsplash.com/images/things/ghost)
    
* * *

> The art of programming is the art of organizing complexity, of mastering multitude and avoiding its bastard chaos as effectively as possible.

_E. W. Dijkstra_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)