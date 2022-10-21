# Code Smell 171 - Plural Classes
            
![Code Smell 171 - Plural Classes](Code%20Smell%20171%20-%20Plural%20Classes.jpg)

*Classes are my precious*

> TL;DR: Classes represent concepts. And concepts are singular.

# Problems

- Naming

- Code Standards

# Solutions

1. Rename classes to singular

# Context

Naming things is hard.

We need to agree on certain rules.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/5d0c869a94d623684baefce9897563e2)
```scala
class Users
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/34c2fa54fa1629971b55d084541e9ce2)
```scala
class User
```

# Detection

[X] Automatic 

This is a syntactic rule.

# Tags

- Naming

# Conclusion

Name concepts in the singular.

Classes are concepts.

# More Info

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Anton Malanin](https://unsplash.com/@antomalani) on [Unsplash](https://unsplash.com/s/photos/twins)
  
* * *

> We are still in the infancy of naming what is really happening on software development projects.

_Alistair Cockburn_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)