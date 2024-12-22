# Code Smell 232 - Reusable Code
            
![Code Smell 232 - Reusable Code](Code%20Smell%20232%20-%20Reusable%20Code.jpg)

*Don't Repeat Yourself. Don't Repeat Yourself*

> TL;DR: You can find missing abstractions by looking at repeated code

# Problems

- DRY principle violation

- Maintainability

- Ripple Effect

# Solutions

1. Create the repeated code

2. Introduce an abstraction

3. Replace the references and point to the new abstraction

4. Remove the duplication

# Context

Repeated code is a symptom of missing abstractions. 

This is natural in the learning process since we cannot foresee those abstractions.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/b1380b6b9850ec6f12c14bfeebbfc505) -->

```python
def calculate_area(length, width):
    return length * width

def calculate_volume(length, width, height):
    return length * width * height
``` 

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/582e44a1004c102199039c5961f32ceb) -->

```python
def calculate_area(length, width):
    return length * width

def calculate_volume(length, width, height):
    base_area = calculate_area(length, width)
    return base_area * height
``` 

# Detection

[X] Semi-Automatic

Some linters can find repeated code patterns.

# Exceptions

The abstraction must have a dependency correspondence on the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) 

# Tags

- Bloaters

# Level

[X] Beginner

# Conclusion

Repeated code is a problem and a hint for a missing abstraction.

Remember you *don't need to avoid* copying and pasting.

You must explicitly *write* the repeated code and remove the duplication by introducing an abstraction.

Avoiding the cut and paste is a shortcut and a symptom of premature optimization.

# Relations

[Code Smell 46 - Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)

[Code Smell 182 - Over Generalization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20182%20-%20Over%20Generalization/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Mitchell Griest](https://unsplash.com/@griestprojects) on [Unsplash](https://unsplash.com/photos/person-showing-assorted-color-bags-psDzkLlifxQ)
  
---
 
> Pasting code from the internet into production code is like chewing gum found in the street.

_Mike Johnson_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md) 

---

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)