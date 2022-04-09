# Code Smell 79 - TheResult

*If a name is already used, we can always prefix it with 'the'.*

![Code Smell 79 - TheResult](josue-michel-XA3f5CSa6h8-unsplash.jpg)

> TL;DR: don't prefix your variables.

# Problems

- Readability

- Meaningless names

# Solutions

1. Use intention revealing names.

2. Avoid *Indistinct noise words*.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/eba3cf3c61494bd4e6a087776bfc5484)
```javascript
var result;

result = getSomeResult();

var theResult;

theResult = getSomeResult();
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/35dba1f621ebe19431e5fbe693546c9a)
```javascript
var averageSalary;

averageSalary = calculateAverageSalary();

//..

var averageSalaryWithRaises;

averageSalaryWithRaises = calculateAverageSalary();
```

# Detection

As with many of our naming conventions, we can instruct our linters to forbid names like *theXxx...*.

# Tags

- Readability

# Conclusion

Always use intention revealing names. 

If your names collide use local names, extract your methods and avoid 'the' prefixes.

# Relations

[Code Smell 38 - Abstract Names](https://maximilianocontieri.com/code-smell-38-abstract-names)

# More info

- [What is in a name](https://maximilianocontieri.com/what-exactly-is-a-name-part-ii-rehab).

- [How To Be Great At Giving Meaningful Names](https://medium.com/shipmnts/how-to-be-great-at-giving-meaningful-names-54b19de66cdf).

# Credits

Photo by [Josue Michel](https://unsplash.com/@josuemichelphotography) on [Unsplash](https://unsplash.com/s/photos/chosen-one)  

* * *

> One difference between a smart programmer and a professional programmer is that the professional understands that clarity is king. Professionals use their powers for good and write code that others can understand.

_Robert C. Martin_
 
[Software Engineering Great Quotes](Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://maximilianocontieri.com/how-to-find-the-stinky-parts-of-your-code)