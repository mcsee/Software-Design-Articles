# Code Smell 77 - Timestamps

![Code Smell 77 - Timestamps](Code%20Smell%2077%20-%20Timestamps.gif)

*Timestamps are widely used. They have a central issuing authority and do not go back, do they?*

> TL;DR: Don't use timestamps for sequence. Centralize and lock your issuer.

# Problems

- Bijection Fault.

- Timestamp Collisions.

- Timestamp precision.

- Packet Disorders.

- Bad [Accidental Implementation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) (Timestamp) for an Essential Problem (Sequencing).

# Solutions

1. Use a centralizing sequential stamper. (NO, not a [Singleton](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20root%20of%20all%20evil/readme.md)).

2. If you need to model a sequence, [model a sequence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/395fe180085be252c2ff97020b9f3bc9) -->

```python
import time
  
# ts stores the time in seconds
ts1 = time.time()
ts2 = time.time() # might be the same!!
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/67d4df804716d5fb10bcbb7d8ce6f7fe) -->

```python
numbers = range(1, 100000)
# create a sequence of numbers and use them with a hotspot

# or
sequence = nextNumber()
```

# Detection

Timestamps are very popular in many languages and are ubiquitous. 

We need to use them just to model... timestamps.

# Tags

- Bijection

# Conclusion

This smell was inspired by recent [Ingenuity software fault](https://www.hebergementwebs.com/transport/the-autonomous-helicopter-mars-named-ingenuity-is-confused-by-a-time-stamp-issue-providing-insightful-lessons-for-self-driving-cars-ai).

If we don't follow our [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) rules and model sequences with time, we will face trouble.

Luckily, Ingenuity is a sophisticated Autonomous vehicle and has a robust fail-safe landing software.

This video describes the glitch

[![Watch the video](https://img.youtube.com/vi/6IoMiwxL2wU/sddefault.jpg)](https://youtu.be/6IoMiwxL2wU) 

# Relations

[Code Smell 39 - new Date()](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2039%20-%20new%20Date()/readme.md)

[Code Smell 32 - Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2032%20-%20Singletons/readme.md)

[Code Smell 71 - Magic Floats Disguised as Decimals](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2071%20-%20Magic%20Floats%20Disguised%20as%20Decimals/readme.md)

# More Info

- [Timestamp proposed changes](https://ieeexplore.ieee.org/document/805196)

- [Build a Mapper](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

- [What is wrong with software](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

* * *

> The most beautiful code, the most beautiful functions, and the most beautiful programs are sometimes not there at all. 

_Jon Bentley_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)