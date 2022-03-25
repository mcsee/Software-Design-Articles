# Code Smell 124 - Divergent Change

*You change something in a class. You change something unrelated in the same class*

![Code Smell 124 - Divergent Change](https://github.com/mcsee/Software-Design-Articles/blob/main/Articles/Code%20Smells/Divergente-final-television.jpg?raw=true)

> TL:DR; Classes should have just one responsibility and one reason to change.

# Problems

- [Coupling](https://maximilianocontieri.com/coupling-the-one-and-only-software-design-problem)

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
  
  renderHTML(): {
    renderDocType();
    renderTitle();
    renderRssHeader();
    renderRssTitle();
    renderRssDescription();
   // ...
  }
  //HTML render can change

  renderRssDescription() {
   // ...
  }

  renderRssTitle() {
   // ...
  }

  renderRssPubDate() {
   // ...
  }
  //RSS Format might change

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
  //HTML render can change
}

class RSSFeed {
  render() {
    this.renderDescription();
    this.renderTitle();
    this.renderPubDate();
    //...
  }  
  //RSS Format might change
  //Might have unitary tests 
  //etc
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

%[https://maximilianocontieri.com/code-smell-34-too-many-attributes]

%[https://maximilianocontieri.com/code-smell-94-too-many-imports]

%[https://maximilianocontieri.com/code-smell-14-god-objects]

# More Info

- [Refactoring.guru](https://refactoring.guru/es/smells/divergent-change)

* * *

> A design that doesn’t take change into account risks major redesign in the future.

_Erich Gamma_
 
%[https://maximilianocontieri.com/software-engineering-great-quotes]

* * *

This article is part of the CodeSmell Series.

%[https://maximilianocontieri.com/how-to-find-the-stinky-parts-of-your-code]