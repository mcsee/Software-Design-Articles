# Code Smell 124 - Divergent Change

![Code Smell 124 - Divergent Change](Code%20Smell%20124%20-%20Divergent%20Change.jpg)

*You change something in a class. You change something unrelated in the same class*

> TL;DR: Classes should have just one responsibility and one reason to change.

# Problems

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Code Duplication

- Low Cohesion

- Single Responsibility Principle violation

# Solutions

1. Extract class

# Context

We create classes to fulfill responsibilities.

If an object does too much, it might change in different directions.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/398ed708b96ddabe79971b98edefce4a)
```javascript
class Webpage {
  
  renderHTML() {
    renderDocType();
    renderTitle();
    renderRssHeader();
    renderRssTitle();
    renderRssDescription();
   // ...
  }
  // HTML render can change

  renderRssDescription() {
   // ...
  }

  renderRssTitle() {
   // ...
  }

  renderRssPubDate() {
   // ...
  }
  // RSS Format might change

}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/cb5736ef2d43863b8cae0ff060c1317a)
```javascript
class Webpage {
  
  renderHTML() {
    this.renderDocType();
    this.renderTitle();
    (new RSSFeed()).render();
    this.renderRssTitle();
    this.renderRssDescription();
   // ...
  }
  // HTML render can change
}

class RSSFeed {
  render() {
    this.renderDescription();
    this.renderTitle();
    this.renderPubDate();
    // ...
  }  
  // RSS Format might change
  // Might have unitary tests
  // etc
}
```

# Detection

[X] Semi Automatic

We can automatically detect large classes or track changes.

# Tags

- Coupling

# Conclusion

Classes must follow the Single Responsibility Principle and have just one reason to change.

If they evolve in different ways, they are doing too much.

# Relations

[Code Smell 34 - Too Many Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2034%20-%20Too%20Many%20Attributes/readme.md)

[Code Smell 94 - Too Many imports](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2094%20-%20Too%20Many%20imports/readme.md)

[Code Smell 14 - God Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2014%20-%20God%20Objects/readme.md)

# More Info

- [Refactoring.guru](https://refactoring.guru/es/smells/divergent-change)

* * *

> A design that doesn’t take change into account risks major redesign in the future.

_Erich Gamma_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)