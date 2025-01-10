# Code Smell 266 - Collection Aliasing

![Code Smell 266 - Collection Aliasing](Code%20Smell%20266%20-%20Collection%20Aliasing.jpg)

*Exposing your collections couples your solution*

> TL;DR: Use immutable collections to prevent unintended side effects.

# Problems

- Unpredictable behavior
- Debugging challenges
- Data corruption
- Violation of the Principle of Least Astonishment
- Premature optimization
- Unexpected [Mutations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)
- Concurrency problems
- Compromised thread safety
- Increased [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Solutions

1. Use immutable collections
2. Create immutable classes
3. Copy the collection before modification
4. Avoid [collection getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20256%20-%20Mutable%20Getters/readme.md)
5. Avoid [automatic properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20109%20-%20Automatic%20Properties/readme.md)
6. Favor information hiding and encapsulation

# Context

Aliasing happens when two or more variables refer to the same object. 

This can lead to unexpected side effects, especially when one variable modifies the shared object. 

You can't change immutable collections after creation helping you prevent accidental aliasing.

Premature optimizators will argue that copying collections is an expensive operation that you should avoid.

This is a special case of [Object Aliasing](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20267%20-%20Objects%20Aliasing/readme.md).

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/60235f0e33f8eb07c6a52c92a36eb2f1) -->

```java
public class MutableExample {
  public static void main(String[] args) {
    List<Integer> numbers = List.of(1, 2, 3);
    List<Integer> otherNumbers = numbers; // Aliasing
    otherNumbers.add(4);
    System.out.println(numbers); // Output: [1, 2, 3, 4]
  }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/af93d425f2ad43f93dbb9e0dd630e61d) -->

```java
public class ImmutableExample {
  public static void main(String[] args) {
    List<Integer> numbers = List.of(1, 2, 3);
    List<Integer> otherNumbers = List.copyOf(numbers); 
    // Creating a copy
    otherNumbers.add(4);
    System.out.println(numbers); // Output: [1, 2, 3]
  }
}
```

# Detection

[X] Semi-Automatic 

Several static analysis tools can warn you of aliasing abuse.

# Tags

- Immutability

# Level

[x] Intermediate

# AI Generation

AI code generators might not always create immutable objects by default, especially when working with mutable collections.

You can prompt them to prioritize immutable collections and wrap existing ones to avoid aliasing.

# AI Detection

AI tools can analyze code for potential aliasing issues and suggest using immutable collections instead.

# Conclusion

You can avoid unintended side effects using immutable collections.

This will make your code more predictable and easier to reason about.

# Relations

[Code Smell 267 - Objects Aliasing](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20267%20-%20Objects%20Aliasing/readme.md)

[Code Smell 86 - Mutable Const Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2086%20-%20Mutable%20Const%20Arrays/readme.md)

[Code Smell 127 - Mutable Constants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20127%20-%20Mutable%20Constants/readme.md)

[Code Smell 256 - Mutable Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20256%20-%20Mutable%20Getters/readme.md)

[Code Smell 109 - Automatic Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20109%20-%20Automatic%20Properties/readme.md)

[Code Smell 68 - Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)

# More Info

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

[Nude Models - Part II: Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md)

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Martino Pietropoli](https://unsplash.com/@martino_pietropoli) on [Unsplash](https://unsplash.com/photos/woman-walking-with-shadow-pirWeToS2mA)
    
* * *

> If an object is immutable, it can be in only one state, and you win big.

_Joshua Bloch_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)