# Code Smell 98 - Speling Mistakes

![Code Smell 98 - Speling Mistakes](1_efrlN_sS5zPq-_qnY7ZA7g.jpeg)

*Spelling and readability are very important for humans and not important for machines.*

> TL;DR: Take care of your names.

# Problems

- Readability

- Harder to search terms in code.

# Solutions

1. Spellcheck your code.

2. Use an IDE with spellchecking

# Context

Many of us don't speak English as our first language. 

We need to have extra care for our texts and names.

*This article has a typo in its title as proof of context and also a clickbait*😀

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/a4c5716a56fdb9b1b743debae3adfb4c)
```javascript
comboFeededBySupplyer = supplyer.providers();
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/1fc16a4982d8f423107d3e64d3c31e48)
```javascript
comboFedBySupplier = supplier.providers();
```

# Detection

[X] Manual
- We need to read the code in a peer review.

[X] Automatic
- Some IDEs have warnings on the typos.

# Tags

- Readability

- Naming

- Code Styling

# Conclusion

Pay close attention to your names. 

You will probably be the person reading the code in a few months. 

# Relations

[Code Smell 48 - Code Without Standards](../../Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

# More Info

[What exactly is a name — Part I The Quest](../../Theory/What%20exactly%20is%20a%20name%20—%20Part%20I%20The%20Quest/readme.md)

[What exactly is a name — Part II Rehab](../../Theory/What%20exactly%20is%20a%20name%20—%20Part%20II%20Rehab/readme.md)

# Credits

Photo by [Brett Jordan](https://unsplash.com/@brett_jordan) on [Unsplash](https://unsplash.com/s/photos/alphabet)
  
> Inside every well-written large program is a well-written small program.

_C.A.R. Hoare_
  
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)