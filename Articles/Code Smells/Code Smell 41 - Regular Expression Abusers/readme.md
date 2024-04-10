# Code Smell 41 - Regular Expression Abusers

![Code Smell 41 - Regular Expression Abusers](Code%20Smell%2041%20-%20Regular%20Expression%20Abusers.jpg)

*RegEx are a wonderful tool, we should to use them carefully and not to look smart.*

> TL;DR: Avoid regular expressions as much as possible.

# Problems

- Readability

- Maintainability

- Testability

- Intention Revealing

# Solutions

1. Use regular expression just for string validation. 

2. If you need to manipulate objects, don't make them strings. 

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/d0e8d1c002a12a9f535ab2fef4440d31)
```perl
val regex = Regex("^\\+(?:[0-9a-zA-Z][– -]?){6,14}[0-9a-zA-Z]$")
``` 

## Right

[Gist Url]: # (https://gist.github.com/mcsee/f3df119d3be0cdfee7fddd6d725f92be)
```perl
val prefix = "\\+"
val digit = "[0-9]"
val space = "[– -]"
val phoneRegex = Regex("^$prefix(?:$digit$space?){6,14}$digit$")
``` 

# Detection

Regular expressions are a valid tool.
There's not much automated way of checking for possible abusers. A whitelist might be of help.
 
 # Tags

-  Primitive Obsession

- Abusers

# Conclusion

Regular expressions are a great tool for string validation. We must use them in a declarative way and just for strings.

Names are very important to understand pattern meanings.

If we need to manipulate objects or hierarchies, we should do it in an *object way*.

Unless we have a conclusive benchmark of **impressive** performance improvement.  
 
# Relations

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md) 

[Code Smell 121 - String Validations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20121%20-%20String%20Validations/readme.md)

[Code Smell 185 - Evil Regular Expressions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20185%20-%20Evil%20Regular%20Expressions/readme.md)

# More Info

[What exactly is a name - Part I The Quest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md)

# Credits

Photo by [John Jennings](https://unsplash.com/@john_jennings) on [Unsplash](https://unsplash.com/s/photos/letters)

* * *

> A Perl program is correct if it gets the job done before your boss fires you. 

_Larry Wall_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)