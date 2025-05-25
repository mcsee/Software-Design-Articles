# Refactoring 010 - Extract Method Object
            
![Refactoring 010 - Extract Method Object](Refactoring%20010%20-%20Extract%20Method%20Object.jpg)

*You have a big algorithmic method. Let's break it.*

> TL;DR: Long methods are bad. Move them and break them.

# Problems Addressed 😔

- Lack of Testability

- Accidental Complexity

- [Testing Private Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20112%20-%20Testing%20Private%20Methods/readme.md)

# Related Code Smells 💨

[Code Smell 10 - Too Many Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2010%20-%20Too%20Many%20Arguments/readme.md)

[Code Smell 21 - Anonymous Functions Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2021%20-%20Anonymous%20Functions%20Abusers/readme.md)

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)
 
[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 112 - Testing Private Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20112%20-%20Testing%20Private%20Methods/readme.md)

[Code Smell 206 - Long Ternaries](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20206%20-%20Long%20Ternaries/readme.md)

# Steps 👣 

1. Create an object to represent an invocation of the method

2. Move the big method to the new object

3. Convert the temporary variables of the method into private attributes.

4. Break the big method in the new object by using [Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

5. Remove parameters from method invocation by also converting them to private attributes 

# Sample Code 📖

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/c8984513652806d25e26f5c184849af0) -->

```java
class BlockchainAccount {
  // ...
  public double balance() {
    string address;    
    // Very long untestable method
  }
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/77d24738ede67a5a99d28e796ce1fade) -->

```java
class BlockchainAccount {
  // ...
  public double balance() {
    return new BalanceCalculator(this).netValue();
  }
}

// 1. Create an object to represent an invocation of the method
// 2. Move the big method to the new object
// 3. Convert the temporary variables 
//   of the method into private attributes
// 4. Break the big method in the new object b
//   y using The Extract Method
// 5. Remove parameters from method invocation 
// by also converting them to private attributes 

class BalanceCalculator {
  private string address;
  private BlockchainAccount account;
  
  public BalanceCalculator(BlockchainAccount account) {
    this.account = account;
  }
  
  public double netValue() {
    this.findStartingBlock();
    //...
    this computeTransactions();
  }
}
```

# Type 📝

[X] Semi-Automatic

Some IDEs have tools to extract a function into a method object.

# Safety 🛡️

This is a syntactic and structural refactoring. 

We can make the changes automatically in a safe way.

# Why is the Code Better? ✨

We extract the logic into a new component.

We can unit-test it, reuse it, exchange it, etc.

# Tags 🏷️

- Bloaters 

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Conclusion 🏁

The Method-Object is suitable when we are using several extract methods passing partial state among them as parts of an algorithm.

We store these partial computations in the method-object internal state.

A strong indicator of method object opportunity is when computations are not cohesively related to the host method.

We can also reify [anonymous functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2021%20-%20Anonymous%20Functions%20Abusers/readme.md) with more atomic, cohesive, and testable method objects.

# See also 📚

[Wikipedia: Strategy Pattern](https://en.wikipedia.org/wiki/Strategy_pattern)

[Method Object Definition](https://learning.oreilly.com/library/view/smalltalk-best-practice/9780132852098/ch03.xhtml)

[Refactoring.guru](https://refactoring.guru/es/replace-method-with-method-object)

[C2 Wiki](https://wiki.c2.com/?MethodObject)

# Credits 🙏

Image by [Manuel de la Fuente](https://pixabay.com/users/mfuente-1590732/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)