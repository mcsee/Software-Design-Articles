# Code Smell 217 - Empty Implementation
            
![Code Smell 217 - Empty Implementation](Code%20Smell%20217%20-%20Empty%20Implementation.jpg)

*You create empty methods instead of failing*

> TL;DR: Don't fill in methods to comply

# Problems 😔 

- Fail Fast Principle Violation

# Solutions 😃

1. Throw an error indicating implementation is not complete

# Context 💬

Creating an empty implementation might seem fine to jump to more interesting problems. 

The code left won't fail fast so debugging it will be a bigger problem

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/56e55a0fdee9d223fc050652b298f699) -->

```javascript
class MerchantProcessor {
  processPayment(amount) {
    // no default implementation
  }
}

class MockMerchantProcessor extends MerchantProcessor {
  processPayment(amount) {
     // Empty implementation to comply with the compiler
     // Won't do anything
  }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/77dcf4848f489f7011aefbe4971d4b0a) -->

```javascript
class MerchantProcessor {
  processPayment(amount) {
    throw new Error('Should be overridden');
  }
}

class MockMerchantProcessor extends MerchantProcessor {
  processPayment(amount) {
     throw new Error('Will be implemented when needed');
  }
}

// or better...

class MockMerchantProcessor extends MerchantProcessor {
  processPayment(amount) {
    console.log('Mock payment processed: $${amount}');
  }
}
```

# Detection 🔍

[X] Manual

Since empty code is valid sometimes only a good peer review will find these problems.

# Tags 🏷️

- Hierarchies

# Level 🔋

[X] Beginner

# Conclusion 🏁

Being lazy and deferring certain decisions is acceptable, but it's crucial to be explicit about it.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 30 - Mocking Business](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md)

[Code Smell 114 - Empty Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20114%20-%20Empty%20Class/readme.md)

# More Information 📕

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Joey Kyber](https://unsplash.com/@jtkyber1) on [Unsplash](https://unsplash.com/photos/45FJgZMXCK8)
    
* * *

> There is an art to knowing where things should be checked and making sure that the program fails fast if you make a mistake. That kind of choosing is part of the art of simplification.

_Ward Cunningham_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)