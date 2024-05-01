# Code Smell 170 - Refactor with Functional Changes
            
![Code Smell 170 - Refactor with Functional Changes](Code%20Smell%20170%20-%20Refactor%20with%20Functional%20Changes.jpg)

*Developing is great. refactoring is amazing. Don't make it at the same time*

> TL;DR: Don't change functionally and refactor at the same time.

# Problems

- Hard to review solutions

- Merge Conflicts

# Solutions

1. Never change functionality while refactoring

# Context

Sometimes we detect a refactoring is needed for further development.

We are experts at learning.

We should put our solution on hold. Work on the refactoring, and continue with our solution.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/f07e5ef021600a82d086fe7cb001fb84)

```kotlin
getFactorial(n) {
  return n * getFactorial(n);
}

// Rename and Change

factorial(n) {
  return n * factorial(n-1);
}

// This is a very small example
// Things go works while dealing with huge code
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/7ae7ad75035ee5c5d1180d0db966dece)

```kotlin
getFactorial(n) {
  return n * getFactorial(n);
}

// Change

getFactorial(n) {
  return n * getFactorial(n-1);
}

// Run the tests

factorial(n) {
  return n * factorial(n-1);
}

// Rename
```

# Detection

This is a refactoring smell.

[X] Manual

# Tags

- Refactoring

# Conclusion

We should use a physical token.

Either we are in the refactoring stage or the developing stage.

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Dannie Jing](https://unsplash.com/@dannie_jing) on [Unsplash](https://unsplash.com/s/photos/circus)
  
* * *

> When I’m studying code, refactoring leads me to higher levels of understanding that I would otherwise miss. Those who dismiss comprehension refactoring as useless fiddling with the code don’t realize they never see the opportunities hidden behind the confusion.

_Martin Fowler_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)