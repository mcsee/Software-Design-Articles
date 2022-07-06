# Code Smell 89 - Math Feature Envy

![Code Smell 89 - Math Feature Envy](michal-matlon-4ApmfdVo32Q-unsplash.jpg)

*One class calculating formulas for another class.*

> TL;DR: Leave the formulas to the objects gathering the information.

# Problems

- Declaratively

- Low reuse

- Real-world concept missing

- Encapsulation

# Solutions

1. Move the math formula to the class

2. Search for [real-world abstractions](Theory\The One and Only Software Design Principle)

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

[Code Smell 63 - Feature Envy](Code Smells\Code Smell 63 - Feature Envy)

# More Info

- [The one and only one software principle](Theory\The One and Only Software Design Principle)

# Credits

Photo by [Michal Matlon](https://unsplash.com/@michalmatlon) on [Unsplash](https://unsplash.com/s/photos/math)
  
* * *

> Computer science is not about machines, in the same way that astronomy is not about telescopes. There is an essential unity of mathematics and computer science.

_Michael R. Fellows_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)