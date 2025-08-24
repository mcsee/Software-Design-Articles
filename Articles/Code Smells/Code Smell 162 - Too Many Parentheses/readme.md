# Code Smell 162 - Too Many Parentheses
            
![Code Smell 162 - Too Many Parentheses](Code%20Smell%20162%20-%20Too%20Many%20Parentheses.jpg)

*Parentheses are free of charge. Aren't they?*

> TL;DR: Use as few parentheses as possible.

# Problems 😔 

- Readability

- Syntactic complexity

# Solutions 😃

1. Remove all not necessary parentheses

# Context 💬

We read code from left to right (at least in western culture). 

Parentheses often break this flow, adding cognitive complexity

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/03c6940b1fa140572f29bfe37cf784c1) -->

```javascript
schwarzschild =
  ((((2 * GRAVITATION_CONSTANT)) * mass) / ((LIGHT_SPEED ** 2)))
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/5b468c4d60d25dec61e538d0c1ed1329) -->

```javascript
schwarzschild = (2 * GRAVITATION_CONSTANT * mass) / (LIGHT_SPEED ** 2)
```

# Detection 🔍

[X] Automatic 

This is a fully automated code smell.

It is based on syntax trees.

Many tools detect it.

# Exceptions 🛑

On some complex formulas, we can add extra parenthesis for terms readability.

# Tags 🏷️
 
- Bloaters

# Conclusion 🏁

We write code once and read it too many times.

Readability is king.  

# Relations 👩‍❤️‍💋‍👨

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

# Disclaimer 📘

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Nick Fewings](https://unsplash.com/@jannerboy62) on [Unsplash](https://unsplash.com/s/photos/signs)
  
* * *

> If someone claims to have the perfect programming language, he is either a fool or a salesman or both.

_Bjarne Stroustrup_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)