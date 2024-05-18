# Code Smell 250 - Premature Memoization
            
![Code Smell 250 - Premature Memoization](Code%20Smell%20250%20-%20Premature%20Memoization.jpg)

*Memoization is awesome. Let's abuse it*

> TL;DR: Don't apply [premature optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md) too early

# Problems

- Readability

- Code Complexity

- Premature Optimization

- Obscured Logic

# Solutions

1. Apply [memoization](https://en.wikipedia.org/wiki/Memoization) in actual real business situations and measure its impact through empirical benchmarks.		

# Context

Memoization can help you improve the performance of recursive functions involving redundant computations but compromise code readability and maintainability  

It would help if you only used it with *strong factual evidence* on *real* business case scenarios.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/7cdd5907fa5404a79581a3fac7a2af65)

```python
memo = {}
def factorial_with_memo(n):
    if n in memo:
        return memo[n]
    if n == 0:
        return 1
    result = n * factorial_with_memo(n-1)
    memo[n] = result
    return result
  
  # This function optimizes the computation of factorials
  # by storing previously computed values,
  # Reducing redundant calculations 
  # and improving performance for large inputs.
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/3aa806cc9c3d9eb8493706ec031f7343)

```python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n-1)
```

# Detection

[X] Semi-Automatic 

You can search for all places where you are using this technique and validate if they are worth it.

# Exceptions

- Real performance problems with strong factual evidence

# Tags

- Premature Optimization

# Level
 
[X] Intermediate 

# AI Generation

Unless you explicitly ask the IAs to use this technique, they will suggest cleaner solutions.

# AI Detection

ChatGPT, Gemini, and Claude.ai detect some problems with this technique but do not mention readability as a concern.

# Conclusion

It would be best if you kept a balance between performance optimization and code clarity.

You can consider alternatives such as iterative approaches or algorithmic optimizations since memoization significantly compromises code readability.

# Relations

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# More Info

[Wikipedia](https://en.wikipedia.org/wiki/Memoization)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Steffen Lemmerzahl](https://unsplash.com/@steffen_l) on [Unsplash](https://unsplash.com/photos/snow-covered-field-during-daytime-kp1n4gWKTOg)  
  
* * *

> A cache with a bad policy is another name for a memory leak.

_Rico Mariani_ 
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)