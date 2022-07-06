# Code Smell 119 - Stairs Code

![Code Smell 119 - Stairs Code](jukan-tateisi-bJhT_8nbUA0-unsplash.jpg)

*Nested boolean conditions express a business rule. Not an IF*

> TL;DR: Avoid checking for boolean expressions and returning an explicit boolean.

# Problems

- Declarativeness

- Ninja Code

- Readability

- [Arrow Code](Code Smells\Code Smell 102 - Arrow Code)

# Solutions

1. Return a boolean business formula value.

# Context

When dealing with boolean formulas, it is more readable to show a business boolean formula than a stair of boolean checks followed by returning an explicit true/false;

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/b7125d33f30a8a37a40bc994fe7fcba6)
```python
def is_platypus(self):
    if self.is_mammal():
        if self.has_fur():
            if self.has_beak():
                if self.has_tail():
                    if self.can_swim():
                        return True
    return False

# This is also wrong since it is polluted with IFs and not readable by a biologist
def is_platypus(self):
    if not self.is_mammal():
        return False
    if not self.has_fur():
        return False
    if not self.has_beak():
        return False
    if not self.has_tail():
        return False
    if not self.can_swim():
        return False 
    return True
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/b0afdb15577225b97f66381872f373f1)
```python
def is_platypus(self):
    return self.is_mammal() && self.has_fur() && self.has_beak() && self.has_tail() && self.can_swim()
  
# We can even group conditions according to animal taxonomies
```

# Detection

[X] Automatic 

Based on syntax trees, we can safely refactor the code removing the explicit boolean value.

# Tags

- Boolean

# Conclusion

Beware of returning booleans. 

After the return, you will need an [If statement](Theory\How to Get Rid of Annoying IFs Forever) which is also a [code smell](Code Smells\Code Smell 36 - Switch case elseif else if statements).

# Relations

[Code Smell 115 - Return True](Code Smells\Code Smell 115 - Return True)

[Code Smell 118 - Return False](Code Smells\Code Smell 118 - Return False)

[Code Smell 101 - Comparison Against Booleans](Code Smells\Code Smell 101 - Comparison Against Booleans)

[Code Smell 24 - Boolean Coercions](Code Smells\Code Smell 24 - Boolean Coercions)

[Code Smell 62 - Flag Variables](Code Smells\Code Smell 62 - Flag Variables)

[Code Smell 102 - Arrow Code](Code Smells\Code Smell 102 - Arrow Code)

[Code Smell 80 - Nested Try/Catch](Code Smells\Code Smell 80 - Nested Try Catch)

# More Info

- [How to Get Rid of Annoying Ifs Forever](Theory\How to Get Rid of Annoying IFs Forever)

# Credits

Photo by [Jukan Tateisi](https://unsplash.com/@tateisimikito) on [Unsplash](https://unsplash.com/s/photos/stairs)
    
Thanks again to Nico K. for this suggestion.

* * *

> The real hero of programming is the one who writes negative code.

_Douglas McIlroy_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)