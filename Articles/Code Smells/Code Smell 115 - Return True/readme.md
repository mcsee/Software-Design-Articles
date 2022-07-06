# Code Smell 115 - Return True

![Code Smell 115 - Return True](engin-akyurt-Ej2GP37cxTk-unsplash.jpg)

*Booleans are natural code smells. Returning and casting them is sometimes a mistake*

> TL;DR: Don't return true or false. Be declarative.

# Problems

- Readability

- Primitive Obsession

- [If/Else abuse](Theory\How to Get Rid of Annoying IFs Forever)

# Solutions

1. Return truth value in a declarative way

2. Replace *IF* With polymorphism.

# Context

Dealing with low-level abstractions, we usually return booleans. 

When we create complex and mature software, we start to forget about this primitive obsession and care about [real-world](Theory\The One and Only Software Design Principle) rules and identities.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/973a11295d0d93baa620763dd8eff801)
```java
boolean isEven(int num) {
     if(num%2 == 0) {
       return true;
    } else {
       return false;}        
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/ab38ef6fcc5dd6dea98f1edb452e75e9)
```java
boolean isEven(int numberToCheck) {
  // We decouple the what (to check for even or odd)
  // With how (the algorithm)
  return (numberToCheck % 2 == 0);     
}
```

# Detection

[X] Automatic 

Many linters can check syntactic trees and look for explicit true/value returns.

# Tags

- Primitive

# Conclusion

Search on code libraries for *return true* statements and try to replace them when possible.

# Relations

[Code Smell 36 - Switch/case/elseif/else/if statements](Code Smells\Code Smell 36 - Switch case elseif else if statements)

[Code Smell 118 - Return False](Code Smells\Code Smell 118 - Return False)

# More Info

- [How to get rid of IFs forever](Theory\How to Get Rid of Annoying IFs Forever)

# Credits

Photo by [engin akyurt](https://unsplash.com/@enginakyurt) on [Unsplash](https://unsplash.com/s/photos/flag)  

* * *

> The good news is: Anything is possible on your computer. The bad news is: Nothing is easy.

_Ted Nelson_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)