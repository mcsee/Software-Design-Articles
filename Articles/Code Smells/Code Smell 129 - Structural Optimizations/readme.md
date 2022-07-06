# Code Smell 129 - Structural Optimizations

![Code Smell 129 - Structural Optimizations](priscilla-du-preez-msCvfyAmAx0-unsplash.jpg)

*We love to improve time and space complexity by guessing not real scenarios*

> TL;DR: Don't optimize anything until you have a real use scenario benchmark.

# Problems

- Readability

- [Bijection](Theory\The One and Only Software Design Principle) and [MAPPER](Theory\What is (wrong with) software) violations

- Premature Optimization

# Solutions

1. Cover your scenarios with tests.

2. Write readable (and possible non-performant) code.

3. Do a real benchmark with real user data. (No, iterating your code 100,000 times might not be a real use case).

4. If you have conclusive data, you need to improve benchmark's found bottlenecks using [Pareto principle](https://en.wikipedia.org/wiki/Pareto_principle).

5. Attack the worst 20% problems causing 80% bad performance.

# Context

At university and online courses, we learn algorithms, data structures, and computational complexity before good design rules.

We tend to overestimate the (possible) performance problems and underestimate code readability and software lifetime.

Premature optimization often has no evidence of solving real problems.

We need to surgically improve our code when the facts tell us we have a real issue.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/b8d538891f3b1cf508e984399af004b0)
```javascript
for (k = 0; k < 3 * 3; ++k) {
     i = Math.floor(k / 3);
     j = k % 3;
     console.log(i + ' ' +  j);
  }
 
// This cryptic piece of code iterates a
// two dimensional array
// We don't have proofs this will be useful
// In real contexts
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/b68e67c449b7d0a5b13f69381f02e8e4)
```javascript
for (innerIterator = 0; innerIterator < 3; innerIterator++) {
  for (outerIterator = 0; outerIterator < 3; outerIterator++) {
   console.log(innerIterator + ' ' +  outerIterator);
  }
 }

// This is a readable double for-loop
// 3 is a small number
// No performance issues (by now)
// We will wait for real evidence

```

# Detection

[X] Manual

This is a semantic smell. 

We might find the code is harder to read.

# Tags

- Premature Optimization

# Conclusion

We need to stop optimizing for machines and start optimizing for humans readers and code maintainers.

We need to avoid programming languages designed for premature optimization and favor robust ones.

# Relations

[Code Smell 06 - Too Clever Programmer](Code Smells\Code Smell 06 - Too Clever Programmer)

[Code Smell 20 - Premature Optimization](Code Smells\Code Smell 20 - Premature Optimization)

# More Info

- [Premature optimization is the root of all evil is the root of evil](https://okaleniuk.medium.com/premature-optimization-is-the-root-of-all-evil-is-the-root-of-evil-a8ab8056c6b)

# Credits

Photo by [Priscilla Du Preez](https://unsplash.com/@priscilladupreez) on [Unsplash](https://unsplash.com/s/photos/fast)
  
* * *

> Optimism is an occupational hazard of programming: feedback is the treatment.

_Kent Beck_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)