# Code Smell 79 - TheResult

![Code Smell 79 - TheResult](Code%20Smell%2079%20-%20TheResult.jpg)

*If a name is already used, we can always prefix it with 'the'.*

> TL;DR: don't prefix your variables.

# Problems

- Readability

- Meaningless names

# Solutions

1. Use intention revealing names.

2. Avoid *Indistinct noise words*.

# Refactorings

[Refactoring 006 - Rename Result Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20006%20-%20Rename%20Result%20Variables/readme.md)

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

// ..

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

[Code Smell 38 - Abstract Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2038%20-%20Abstract%20Names/readme.md)

# More info

- [What is in a name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20—%20Part%20II%20Rehab/readme.md).

- [How To Be Great At Giving Meaningful Names](https://medium.com/shipmnts/how-to-be-great-at-giving-meaningful-names-54b19de66cdf).

# Credits

Photo by [Josue Michel](https://unsplash.com/@josuemichelphotography) on [Unsplash](https://unsplash.com/s/photos/chosen-one)  

* * *

> One difference between a smart programmer and a professional programmer is that the professional understands that clarity is king. Professionals use their powers for good and write code that others can understand.

_Robert C. Martin_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)