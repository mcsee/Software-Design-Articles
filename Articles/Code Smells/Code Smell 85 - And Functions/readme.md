# Code Smell 85 - And Functions

![Code Smell 85 - And Functions](paul-vhZe9fd9MRs-unsplash.jpg)

*Do not perform more than requested.*

> TL;DR: Unless you need atomicity, do not perform more than one task.

# Problems

- Coupling
- Single Responsibility Principle violation
- Readability
- Low Cohesion
- Testability

# Solutions

1. Break the function

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/059b9deb2e9e13c94a724b82e54f6fda)
```python
def fetch_and_display_personnel():
  data = # ...
  
  for person in data:
    print(person)
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/47a1f8cd217afd58bc47b373b91593ef)
```python
def fetch_personnel():
  return # ...

def display_personnel(data):
  for person in data:
    print(person)
```

# Detection

Functions including "and" are candidates. However, we need to check them carefully since there might be false positives.

# Tags

- Readability
- Naming

# Conclusion

We should avoid doing more than needed, and our functions should be both minimal and atomic.

# More Info

- [What exactly is a name — Part II Rehab](Theory\What exactly is a name — Part II Rehab)

# Credits

Photo by [Paul](https://unsplash.com/@causeimluap) on [Unsplash](https://unsplash.com/s/photos/train)
  
This smell was inspired by

[Twitter](https://twitter.com/1428027665529769985)

* * *

> If it takes more than a sentence to explain what you are doing, it’s almost always a sign that what you are doing is too complicated.

_Sam Altman_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)