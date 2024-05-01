# Code Smell 243 - Concatenated Properties
            
![Code Smell 243 - Concatenated Properties](Code%20Smell%20243%20-%20Concatenated%20Properties.jpg)

*You join independent information*

> TL;DR: Don't mix ortoghonal behavior

# Problems

- Maintainability

- Error Prone

- Performance Penalties

- [Premature optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

- [The principle of least astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) principle violation

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Violation

- Duplication of Logic on breaking the attributes

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Solutions

1. Break Orthogonal behavior and properties

# Context

Parsing data is always a problem, where joining elements is much easier than breaking them.

If you use a separator to break the attributes, you need to make sure the separator does not belong to the domain, and you should escape it.

If you map your data to relational databases, search queries will be more difficult and less performant for concatenated attributes

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/ed66e002ac7cf031d7256b7529a1624d)

```javascript
class Point {
    constructor(coordString) {
        this.coordString = coordString;
    }

    x() {
        const coords = this.coordString.split(',');
        if (coords.length !== 2) {
            throw new Error('Invalid coordinate string format');
        }
        return parseFloat(coords[0]);
    }

    y() {
        const coords = this.coordString.split(',');
        if (coords.length !== 2) {
            throw new Error('Invalid coordinate string format');
        }
        return parseFloat(coords[1]);
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/7a5cb375b631c683845d61095b0d9ded)

```javascript
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
```

# Detection

[X] Semi-Automatic 

This is a semantic smell, but you can find suspicious concatenation actions on peer reviews. 

# Tags

- Coupling

# Level

[X] Beginner 

# AI Assistants

AI Assistants don't usually suggest this kind of premature optimization of bad rules

# Conclusion

Don't mix unrelated things since breaking things is always harder than having them separated.

# Relations

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Tomas Sobek](https://unsplash.com/@tomas_nz) on [Unsplash](https://unsplash.com/photos/photo-of-red-and-blue-zippers-nVqNmnAWz3A)
    
* * *

>Design is choosing how you will fail.

_Ron Fein_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)