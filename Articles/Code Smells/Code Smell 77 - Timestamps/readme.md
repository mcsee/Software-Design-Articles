# Code Smell 77 - Timestamps

![Code Smell 77 - Timestamps](km6rnydpMsN7heLcoaNw5A-1200-80.gif)

*Timestamps are widely used. They have a central issuing authority and do not go back, do they?*

> TL;DR: Don't use timestamps for sequence. Centralize and lock your issuer.

# Problems

- Bijection Fault.

- Timestamp Collisions.

- Timestamp precision.

- Packet Disorders.

- Bad [Accidental Implementation](Theory\No Silver Bullet) (Timestamp) for an Essential Problem (Sequencing).

# Solutions

1. Use a centralizing sequential stamper. (NO, not a [Singleton](Theory\Singleton - The root of all evil)).

2. If you need to model a sequence, [model a sequence](Theory\The One and Only Software Design Principle).

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/395fe180085be252c2ff97020b9f3bc9)
```python
# using time module
import time
  
# ts stores the time in seconds
ts1 = time.time()
ts2 = time.time() # might be the same!!
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/67d4df804716d5fb10bcbb7d8ce6f7fe)
```python
numbers = range(1, 100000)
# create a sequence of numbers and use them with a hotspot

# or
sequence = nextNumber()

```

# Detection

Timestamps are very popular on many languages and are ubiquitous. 

We need to use them just to model... timestamps.

# Tags

- Bijection

# Conclusion

This smell was inspired by recent [Ingenuity software fault](https://www.hebergementwebs.com/transport/the-autonomous-helicopter-mars-named-ingenuity-is-confused-by-a-time-stamp-issue-providing-insightful-lessons-for-self-driving-cars-ai).

If we don't follow our [MAPPER](Theory\The One and Only Software Design Principle) rules and model sequences with time, we will face trouble.

Luckily, Ingenuity is a sophisticated Autonomous vehicle and has a robust fail-safe landing software.

This video describes the glitch

%[https://www.youtube.com/watch?v=6IoMiwxL2wU]

# Relations

[Code Smell 39 - new Date()](Code Smells\Code Smell 39 - new Date())

[Code Smell 32 - Singletons](Code Smells\Code Smell 32 - Singletons)

[Code Smell 71 - Magic Floats Disguised as Decimals](Code Smells\Code Smell 71 - Magic Floats Disguised as Decimals)

# More info

- [Timestamp proposed changes](https://ieeexplore.ieee.org/document/805196)

- [Build a Mapper](Theory\The One and Only Software Design Principle)

- [What is wrong with software](Theory\What is (wrong with) software)

* * *

> The most beautiful code, the most beautiful functions, and the most beautiful programs are sometimes not there at all. 

_Jon Bentley_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)