# Code Smell 89 - Math Feature Envy

![Code Smell 89 - Math Feature Envy](Code%20Smell%2089%20-%20Math%20Feature%20Envy.jpg)

*One class calculating formulas for another class.*

> TL;DR: Leave the formulas to the objects gathering the information.

# Problems

- Declaratively

- Low reuse

- Real-world concept missing

- Encapsulation

# Solutions

1. Move the math formula to the class

2. Search for [real-world abstractions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/4b3483f5be825913df7a6c709efebdbc)
```javascript
function area(rectangle) { 
  return rectange.width * rectangle.height;
  // Notice we are sending consecutive messages to
  // the same object and doing calculations
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/891b1df84cd9e0528fad2dae42322c54)
```javascript
class Rectangle {
    constructor(width, height, color) { 
         this.height = height;
         this.width = width;
    }
 
    area() {
        return this.width * this.height;
    }
}
```

# Detection

Since many cascading messages are sending to the same object, we can detect a pattern.

# Tags

- Encapsulation

- Coupling

# Conclusion

This is a very basic smell. If we are manipulating another object characteristics, we should let it do it the maths for us.

# Relations

[Code Smell 63 - Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2063%20-%20Feature%20Envy/readme.md)

# More Info

- [The one and only one software principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

# Credits

Photo by [Michal Matlon](https://unsplash.com/@michalmatlon) on [Unsplash](https://unsplash.com/s/photos/math)
  
* * *

> Computer science is not about machines, in the same way that astronomy is not about telescopes. There is an essential unity of mathematics and computer science.

_Michael R. Fellows_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)