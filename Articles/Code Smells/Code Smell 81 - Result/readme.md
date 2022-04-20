# Code Smell 81 - Result

*result = ???*

![Code Smell 81 - Result](kma-r-5ytz5i00A-unsplash.jpg)

> TL;DR: Use good names always. Result is always a very bad name.

# Problems

- Readability

# Solutions

1. Rename *result*.

2. If you don't know how to name it, just name the variable with the same name as the last function call.

3. Don't use IDEs without automatic refactors.

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
//...

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

[Code Smell 79 - TheResult](Code Smells\Code Smell 79 - TheResult)

# More info

- [What is in a name? Part I: Rehab](https://maximilianocontieri.com/what-exactly-is-a-name-part-ii-rehab).

# Credits

Photo by [KMA .](https://unsplash.com/@kmaimg) on [Unsplash](https://unsplash.com/s/photos/magician)
  
* * *

> Code is like humor. When you have to explain it, it’s bad.

_Cory House_
 
[Software Engineering Great Quotes](Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://maximilianocontieri.com/how-to-find-the-stinky-parts-of-your-code)