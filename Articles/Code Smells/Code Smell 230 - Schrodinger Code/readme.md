# Code Smell 230 - Schrödinger Code
            
![Code Smell 230 - Schrödinger Code](Code%20Smell%20230%20-%20Schrdinger%20Code.jpg)

*Your code is dead and alive*

> TL;DR: Look carefully for race conditions

# Problems 😔 

- Principle of the Least Surprise violation

- [Race Conditions](https://en.wikipedia.org/wiki/Race_condition)

# Solutions 😃

1. Avoid race conditions 

2. Avoid global variables

3. Use proper [synchronization](https://en.wikipedia.org/wiki/Semaphore_(programming))

# Context 💬

Schrödinger code is code that can be in two different states at the same time, but the state of the code is not determined until it is executed. 

This can happen when the code contains a race condition, or when the code depends on the state of a global variable that can be changed by other threads or processes.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/b55ffb2e174db3880e40a162405d8fd1) -->

```python
import threading

cats_alive = 0

def thread_1():
  cats_alive += 1

def thread_2():
  cats_alive -= 1

if cats_alive > 0:
  feedThem()

# The value of cats_alive is indeterminate, 
# so the code can be in either of the two states:
#
# 1. cats_alive > 0 and feedThem() is called.
# 2. cats_alive <= 0 and feedThem() is not called.
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/d147d5084dc7c0680f4ff01c10cce152) -->

```python
import threading

lock = threading.Lock()
cats_alive = 0

def thread_1():
  with lock:
    cats_alive += 1

def thread_2():
  with lock:
    cats_alive -= 1

if cats_alive > 0:
  feedThem()

# With the lock, the two threads cannot access 
# the `cats_alive` variable at the same time.
# This means that the value of `cats_alive` is always determined, 
# and the program will not exhibit Schrödinger code behavior.
```

# Detection 🔍

[X] Manual

Make code reviews on concurrent code

# Tags 🏷️

- Concurrency

- Globals

# Conclusion 🏁

To avoid Schrödinger code, avoid race conditions and avoid depending on the state of global variables that can be changed by other threads or processes.

If you need to use a global variable in your code, ensure it is correctly synchronized.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 198 - Hidden Assumptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20198%20-%20Hidden%20Assumptions/readme.md)

[Code Smell 32 - Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2032%20-%20Singletons/readme.md)

[Code Smell 60 - Global Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2060%20-%20Global%20Classes/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Yerlin Matu](https://unsplash.com/@yerlinmatu) on [Unsplash](https://unsplash.com/photos/shallow-focus-photography-of-white-and-brown-cat-GtwiBmtJvaU)  
  
* * *

> The last thing you wanted any programmer to do is mess with internal state

_Alan Kay_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)