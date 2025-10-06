# Code Smell 119 - Stairs Code

![Code Smell 119 - Stairs Code](Code%20Smell%20119%20-%20Stairs%20Code.jpg)

*Nested boolean conditions express a business rule. Not an IF*

> TL;DR: Avoid checking for boolean expressions and returning an explicit boolean.

# Problems 😔 

- Declarativeness

- Ninja Code

- Readability

- [Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

# Solutions 😃

1. Return a boolean business formula value.

# Context 💬

When dealing with boolean formulas, it is more readable to show a business boolean formula than a stair of boolean checks followed by returning an explicit true/false;

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/b7125d33f30a8a37a40bc994fe7fcba6) -->

```python
def is_platypus(self):
    if self.is_mammal():
        if self.has_fur():
            if self.has_beak():
                if self.has_tail():
                    if self.can_swim():
                        return True
    return False

# This is also wrong since it is polluted 
# with IFs and not readable by a biologist
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

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/b0afdb15577225b97f66381872f373f1) -->

```python
def is_platypus(self):
    return self.is_mammal() && 
        self.has_fur() &&
            self.has_beak() && 
                self.has_tail() &&
                    self.can_swim()
  
# You can even group conditions according to animal taxonomies
```

# Detection 🔍

[X] Automatic 

Based on syntax trees, we can safely refactor the code removing the explicit boolean value.

# Tags 🏷️

- IFs

# Conclusion 🏁

Beware of returning booleans. 

After the return, you will need an [If statement](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md) which is also a [code smell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md).

# Relations 👩‍❤️‍💋‍👨

[Code Smell 115 - Return True](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20115%20-%20Return%20True/readme.md)

[Code Smell 118 - Return False](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20118%20-%20Return%20False/readme.md)

[Code Smell 101 - Comparison Against Booleans](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20101%20-%20Comparison%20Against%20Booleans/readme.md)

[Code Smell 24 - Boolean Coercions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2024%20-%20Boolean%20Coercions/readme.md)

[Code Smell 62 - Flag Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2062%20-%20Flag%20Variables/readme.md)

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

[Code Smell 80 - Nested Try/Catch](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2080%20-%20Nested%20Try%20Catch/readme.md)

[Code Smell 184 - Exception Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20184%20-%20Exception%20Arrow%20Code/readme.md)

# More Information 📕

- [How to Get Rid of Annoying Ifs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Credits 🙏

Photo by [Jukan Tateisi](https://unsplash.com/@tateisimikito) on [Unsplash](https://unsplash.com/s/photos/stairs)
    
Thanks again to Nico K. for this suggestion.

* * *

> The real hero of programming is the one who writes negative code.

_Douglas McIlroy_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)