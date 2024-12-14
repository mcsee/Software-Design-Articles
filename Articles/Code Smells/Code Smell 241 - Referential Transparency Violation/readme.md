# Code Smell 241 - Referential Transparency Violation
            
![Code Smell 241 - Referential Transparency Violation](Code%20Smell%20241%20-%20Referential%20Transparency%20Violation.jpg)

*Pure functions produce the same output for the same input and have no side effects*

> TL;DR: Your functions should be replaceable by the computation result.

# Problems

- Readability

- Principle of least astonishment violation

- Testability

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Solutions

1. Avoid side effects and erratic behavior
 
# Context

Breaking referential transparency occurs when the code introduces side effects or relies on a mutable state.

This violates the principle that an expression or function can be replaced with its value without changing the program's behavior.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/8d91de12e8bce988a1ef8a16b858bcd4) -->

```python
# Global mutable variable
counter = 0

# Function with side effect
def increment_counter():
    global counter
    counter += 1
    return counter

# Function with implicit dependency and non-deterministic
def get_random_number():
    import random
    return random.randint(1, 100)

# Function with non-deterministic behavior
def get_current_time():
    import time
    return time.time()
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/e396dd603b41cc11865ad780ca6ffed6) -->

```python
import random
import time

# Function without side effects
def increment_counter(counter):
    return counter + 1

# Function without side effects (but not deterministic)
def get_random_number():
    return random.randint(1, 100)

# Function without side effects (can also be injected)
def get_current_time(timesource):
    return timesource.time()
```

# Detection

[X] Semi-Automatic 

Many linters warn you when you violate referential transparency

# Tags

- Coupling

# Level

[x] Intermediate

# AI Assistants

Most AI assistants will avoid violating referential transparency.

# Conclusion

Functional programming is known for its ability to enable concise, expressive, and maintainable code, as well as facilitating parallel and concurrent programming due to its emphasis on immutable data and pure functions. 

There are many concepts to borrow from it.

# Relations

[Code Smell 209 - Side Effects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20209%20-%20Side%20Effects/readme.md)

# More Info

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Wilhelm Gunkel](https://unsplash.com/@wilhelmgunkel) on [Unsplash](https://unsplash.com/photos/white-and-black-diamond-shape-illustration-3VQ4AfOKCVc)
    
* * *

> Referential transparency is a very desirable property: it implies that functions consistently yield the same results given the same input, irrespective of where and when they are invoked.

_Edward Garson_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)