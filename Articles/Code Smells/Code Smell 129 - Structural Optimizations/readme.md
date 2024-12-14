# Code Smell 129 - Structural Optimizations

![Code Smell 129 - Structural Optimizations](Code%20Smell%20129%20-%20Structural%20Optimizations.jpg)

*We love to improve time and space complexity by guessing not real scenarios*

> TL;DR: Don't optimize anything until you have a real-use scenario benchmark.

# Problems

- Readability

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) and [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) violations

- Premature Optimization

# Solutions

1. Cover your scenarios with tests.

2. Write readable (and possibly non-performant) code.

3. Do a real benchmark with real user data. (No, iterating your code 100,000 times might not be a real use case).

4. If you have conclusive data, you need to improve the benchmark's found bottlenecks using the [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle).

5. Attack the worst 20% of problems causing 80% bad performance.

# Context

In university and online courses, we learn algorithms, data structures, and computational complexity before good design rules.

We tend to overestimate the (possible) performance problems and underestimate code readability and software lifetime.

Premature optimization often has no evidence of solving real problems.

We need to surgically improve our code when the facts tell us we have a real issue.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/b8d538891f3b1cf508e984399af004b0) -->

```javascript
for (k = 0; k < 3 * 3; ++k) {
     i = Math.floor(k / 3);
     j = k % 3;
     console.log(i + ' ' +  j);
  }
 
// This cryptic piece of code iterates a
// two-dimensional array
// You don't have proof this will be useful
// In real contexts
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/b68e67c449b7d0a5b13f69381f02e8e4) -->

```javascript
for (outerIterator = 0; outerIterator< 3; outerIterator++) {
    for (innerIterator = 0; innerIterator< 3; innerIterator++) {
        console.log(outerIterator + ' ' + innerIterator);
    }
}

// This is a readable double for-loop
// 3 is a small number
// No performance issues (by now)
// You will wait for real evidence
```

# Detection

[X] Manual

This is a semantic smell. 

We might find the code harder to read.

# Tags

- Premature Optimization

# Conclusion

We need to stop optimizing for machines and start optimizing for human readers and code maintainers.

We need to avoid programming languages designed for premature optimization and favor robust ones.

# Relations

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# More Info

- [Premature optimization is the root of all evil is the root of evil](https://okaleniuk.medium.com/premature-optimization-is-the-root-of-all-evil-is-the-root-of-evil-a8ab8056c6b)

# Credits

Photo by [Priscilla Du Preez](https://unsplash.com/@priscilladupreez) on [Unsplash](https://unsplash.com/s/photos/fast)
  
* * *

> Optimism is an occupational hazard of programming: feedback is the treatment.

_Kent Beck_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)