# Code Smell 212 - Elvis Operator
            
![Code Smell 212 - Elvis Operator](Code%20Smell%20212%20-%20Elvis%20Operator.jpg)

*Your code is not safer using this operator*

> TL;DR: Don't propagate nulls.

# Problems

- [NULL](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md) propagation

- Harder to read code

- Hacky code

# Solutions

1. Remove the nulls. 

2. If you can't remove it, deal explicitly with them.

# Context

The Elvis operator is also known as the null-coalescing operator or the null-safe operator.

It is a shorthand operator used in some programming languages to simplify null-checking.

The Elvis operator takes the form of ?. and is used to access a property or method of an object only if that object is not null. 

If the object is null, the operator returns null without attempting to access the property or method, thus avoiding a potential null reference exception.

The nickname "Elvis operator" originated from the visual resemblance of the operator to the famous singer Elvis Presley's hairstyle. 

The symbol "?:", with its round shape on top and a curl underneath, vaguely resembles the pompadour hairstyle that Elvis Presley was known for.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/a976521e75a08ca0c57cb0153039e67e)
```java
String shipTo = address?.zipCode();

```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/1f0771dc50c77d39c6577405142e52e8)
```java
String shipTo = null;
if (address != null) {
    shipTo = address.zipCode();
}   

// This keeps the billion-dollar mistake error 
```

# Detection

[X] Automatic 

We can detect this operator usage and replace them with more strict checks.

# Tags

- Null

# Conclusion

The code can be difficult to follow and may require additional comments or explanations to make it clear what is happening.

The operator hides potential errors or bugs in the code. 

For example, if an object is null and the Elvis operator is used to return a default value, this may mask the fact that there is a problem with the code that is causing the object to be null in the first place.

In several languages, such as Common Lisp, Clojure, Lua, Object Pascal, Perl, Python, Ruby, and JavaScript, the OR operator (typically || or or) has the same behavior as the above: returning its first operand if it would evaluate to true in a boolean environment, and otherwise evaluating and returning its second operand. 

When the left-hand side is true, the right-hand side is not even evaluated; it is "short-circuited." This is different from the behavior in other languages such as C/C++, where the result of || will always be a boolean. 

# Relations

[Code Smell 149 - Optional Chaining](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20149%20-%20Optional%20Chaining/readme.md)

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Code Smell 140 - Short Circuit Evaluation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20140%20-%20Short%20Circuit%20Evaluation/readme.md)

# More Info

[Wikipedia](https://en.wikipedia.org/wiki/Elvis_operator)

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Susan Mohr](https://unsplash.com/@theinnervizion) on [Unsplash](https://unsplash.com/photos/INLHpZKShao)
    
* * *

> You can't communicate complexity, only an awareness of it.

_Alan Perlis_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)