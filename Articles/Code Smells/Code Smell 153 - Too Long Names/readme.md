# Code Smell 153 - Too Long Names

![Code Smell 153 - Too Long Names](Code%20Smell%20153%20-%20Too%20Long%20Names.jpg)

*Names should be long and descriptive. How Long?*

> TL;DR: Names should be long enough. No longer.

# Problems

- Readability

- Cognitive Load

# Solutions

1. Use names related to the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

# Context

We used [very short names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md) during the 50s and 60s due to space and time constraints.

This is no longer the case in modern languages.

Sometimes we get too excited.

Naming is an art and we should be cautious with it.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/661d68a82e80799c6f9330d33c271a0b)
```java
PlanetarySystem.PlanetarySystemCentralStarCatalogEntry

// Redundant
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/7da772566dee2fb79f3bfea13196ee22)
```java
PlanetarySystem.CentralStarCatalogEntry
```

# Detection

[X] Semi-Automatic 

Our linters can warn us with too long names.

# Tags

- Bloaters

- Naming

# Conclusion

There are no [hard rules](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20—%20Part%20I%20The%20Quest/readme.md) on name length.

Just Heuristics.

# Relations

[Code Smell 33 - Abbreviations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md)

# More Info

- [What exactly is a name? — Part I: The Quest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20—%20Part%20I%20The%20Quest/readme.md)

- [What exactly is a name? — Part II: Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20—%20Part%20II%20Rehab/readme.md)

- [Long and Short of Naming](https://agileotter.blogspot.com/2009/08/long-and-short-of-naming.html)

# Credits

Photo by [Emre Karataş](https://unsplash.com/@emrekaratas) on [Unsplash](https://unsplash.com/s/photos/long)
  
* * *

> Many people tend to look at programming styles and languages like religions: if you belong to one, you cannot belong to others. But this analogy is another fallacy.

_Niklaus Wirth_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)