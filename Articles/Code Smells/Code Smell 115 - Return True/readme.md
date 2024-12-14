# Code Smell 115 - Return True

![Code Smell 115 - Return True](Code%20Smell%20115%20-%20Return%20True.jpg)

*Booleans are natural code smells. Returning and casting them is sometimes a mistake*

> TL;DR: Don't return true or false. Be declarative.

# Problems

- Readability

- Primitive Obsession

- [If/Else abuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Solutions

1. Return truth value in a declarative way

2. Replace *IF* With polymorphism.

# Context

Dealing with low-level abstractions, we usually return booleans. 

When we create complex and mature software, we start to forget about this primitive obsession and care about [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) rules and identities.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/973a11295d0d93baa620763dd8eff801) -->

```java
boolean isEven(int num) {
     if(num % 2 == 0) {
       return true;
     } else {
       return false;
     }        
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/ab38ef6fcc5dd6dea98f1edb452e75e9) -->

```java
boolean isEven(int numberToCheck) {
  // You decouple the what (to check for even or odd)
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

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

[Code Smell 118 - Return False](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20118%20-%20Return%20False/readme.md)

# More Info

- [How to get rid of IFs forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Credits

Photo by [engin akyurt](https://unsplash.com/@enginakyurt) on [Unsplash](https://unsplash.com/s/photos/flag)  

* * *

> The good news is: Anything is possible on your computer. The bad news is: Nothing is easy.

_Ted Nelson_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)