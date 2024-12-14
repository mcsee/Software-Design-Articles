# Code Smell 198 - Hidden Assumptions
            
![Code Smell 198 - Hidden Assumptions](Code%20Smell%20198%20-%20Hidden%20Assumptions.jpg)

*Software is about contracts and ambiguous contracts are a nightmare*

> TL;DR: Keep your code explicit

# Problems

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- [Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) Principle violation

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault

# Solutions

1. Be declarative and explicit

2. Don't oversimplify

# Context

Hidden assumptions are underlying beliefs or expectations not explicitly stated in the code.

They are still present and can impact the behavior of the software.

Various reasons can give rise to assumptions such as incomplete requirements, incorrect presumptions about the user or environment, limitations of the programming language or tools, and bad accidental decisions.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/33f7a662d4394e6c94c6603f88d9e975) -->

```python
tenCentimeters = 10
tenInches = 10

tenCentimeters + tenInches
# 20
# this error is based on the hidden assumption of a unit (any)
# and caused the Mars Climate Orbiter failure
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/a0ee2b3ec2e963149bb2b39a9cfa1a08) -->

```python
class Unit:
    def __init__(self, name, symbol):
        self.name = name
        self.symbol = symbol

class Measure:
    def __init__(self, scalar, unit):
        self.scalar = scalar
        self.unit = unit

    def __str__(self):
        return f"{self.scalar} {self.unit.symbol}"

centimetersUnit = Unit("centimeters", "cm")
inchesUnit = Unit("inches", "in")

tenCentimeters = Measure(10, centimetersUnit)
tenInches = Measure(10, inchesUnit)

tenCentimeters + tenInches
# error until you introduce a conversion factor
# in this case the conversion is constant 
# inches = centimeters / 2.54
```

# Detection

[X] Manual

This is a design smell

# Tags

- Coupling

# Conclusion

Hidden assumptions can be difficult to identify and can lead to bugs, security vulnerabilities, and usability issues.

To mitigate these risks, software developers should be aware of their assumptions and biases.

Developers also need to engage with users to understand their needs and expectations.

They must test their software in various scenarios to uncover hidden assumptions and edge cases.

# Relations

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

# More Info

[Mars Climate Orbiter Disaster](https://solarsystem.nasa.gov/missions/mars-climate-orbiter/in-depth/)

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

[Measure Solution](https://www.semanticscholar.org/paper/Arithmetic-with-measurements-on-dynamically-typed-Wilkinson-Prieto/40ac4b9918f8fa71fde88449ce9261857317c192)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Christian Pfeifer](https://unsplash.com/@sailingaroundtheworld) on [Unsplash](https://unsplash.com/photos/l6OraG-v0d8)

* * *

> A human organization is just as much an information system as any computer system. It is almost certainly more complex, but the same fundamental ideas apply. Things that are fundamentally difficult, like concurrency and coupling, are difficult in the real world of people, too.

_Dave Farley_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)