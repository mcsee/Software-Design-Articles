# Code Smell 81 - Result

![Code Smell 81 - Result](Code%20Smell%2081%20-%20Result.jpg)

*result = ???*

> TL;DR: Use good names always. Result is always a very bad name.

# Problems

- Readability

# Solutions

1. [Rename](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20006%20-%20Rename%20Result%20Variables/readme.md) *result*.

2. If you don't know how to name it, just name the variable with the same name as the last function call.

3. Don't use IDEs without automatic refactors.

# Refactorings

[Refactoring 006 - Rename Result Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20006%20-%20Rename%20Result%20Variables/readme.md)

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/9d1f20a108047109bf229baf1c4c9976)
```javascript
var result;

result = lastBlockchainBlock();
//

// Many function calls

addBlockAfter(result);
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/75488df759013fcc4f3381b1006b7f82)
```javascript
var lastBlockchainBlock;

lastBlockchainBlock = findlastBlockchainBlock();
// ...

// Many function calls 
// we should refactor them to minimize space
// between variable definition and usage

addBlockAfter(lastBlockchainBlock);
```

# Detection

We must forbid the word result to be a variable name. 

# Tags

- Readability

# Conclusion

*Result* is an example of generic and meaningless names. 

Refactoring is cheap and safe.

> Always leave the campground cleaner than you found it.

> When you find a mess on the ground, clean it, doesn’t matter who did it. Your job is to always leave the ground cleaner for the next campers.

# Relations

[Code Smell 79 - TheResult](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2079%20-%20TheResult/readme.md)

# More Info

- [What is in a name? Part I: Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md).

# Credits

Photo by [KMA](https://unsplash.com/@kmaimg) on [Unsplash](https://unsplash.com/s/photos/magician)
  
* * *

> Code is like humor. When you have to explain it, it’s bad.

_Cory House_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)