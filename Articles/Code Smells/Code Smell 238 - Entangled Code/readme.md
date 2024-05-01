# Code Smell 238 - Entangled Code
            
![Code Smell 238 - Entangled Code](Code%20Smell%20238%20-%20Entangled%20Code.jpg)

*You execute code. Move to the other stuff, and continue with the previous code*

> TL;DR: Don't mix your train of thought

# Problems

- Readability

- Bad Scoping

# Solutions

1. Move the code close together

2. Try to [extract the method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Refactorings

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Context

Entangled code is related beyond time and space.

You are reading the code, then skip to another subject and return to the first one.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/59914b6bd6ac72937d729894a52b5ec5)

```python
def planetary_properties(semi_major_axis,
                         incoming_radiation, reflected_radiation):
    Gravitational_Constant = 1.0    
    Sun_Mass = 1.0    
    # Up to here, there's a preparation
    # for the orbital period computation
    
    albedo = reflected_radiation / incoming_radiation
    # This is unrelated to the previous computation
    
    # You resume the first computation
    orbital_period_squared = (
        (4 * math.pi**2 * semi_major_axis**3) /
        (Gravitational_Constant * Sun_Mass)
    )
    retrun orbital_period, albedo
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/4be2d21770d15e0b851a94fd5da0ec3f)

```python
def planetary_properties(semi_major_axis,
                         incoming_radiation, reflected_radiation):
    Gravitational_Constant = 1.0    
    Sun_Mass = 1.0    
     orbital_period_squared = (
        (4 * math.pi**2 * semi_major_axis**3) /
        (Gravitational_Constant * Sun_Mass)
    )
    # This is related to the first computation part
    
    albedo = reflected_radiation / incoming_radiation
    # This is related to the second part
    
    # The final solution is to break the function into two
    # This is a trivial example for illustration purposes
    # Things usually get more complicated and entangled
   
    retrun orbital_period, albedo
```

# Detection

[X] Semi-Automatic 

Some linters can infer scopes and make suggestions.

# Tags

- Readability

# Level

[X] Beginner

# AI Assistants

AI assistants suggest code without this mistake and improve this problem when asked.

# Conclusion

This is a tiny tip and a short example of [tidying](https://amzn.to/42nVekV)

# Relations

[Code Smell 107 - Variables Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20107%20-%20Variables%20Reuse/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Michael Hamments](https://unsplash.com/@35mmtodgt) on [Unsplash](https://unsplash.com/photos/a-dead-tree-in-the-middle-of-a-field-XJ19LCMozUc)
    
* * *

> Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.

_Brian Kernighan_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)