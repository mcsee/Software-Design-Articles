# Code Smell 107 - Variables Reuse

![Code Smell 107 - Variables Reuse](Code%20Smell%20107%20-%20Variables%20Reuse.jpg)

*Reusing variables makes scopes and boundaries harder to follow*

> TL;DR: Don't read and write the same variable for different purposes

# Problems

- Readability

- Hidden problems

# Solutions

1. Don't reuse variables

2. [Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md) to isolate scopes

# Context

When programming a script it is common to reuse variables.

This leads to confusion and makes debugging harder.

We should narrow the scope as much as possible.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/88615884493c78d45a57be565964ae5b)
```java
// print line total
double total = item.getPrice() * item.getQuantity();
System.out.println("Line total: " + total );

// print amount total 
total = order.getTotal() - order.getDiscount();
System.out.println( "Amount due: " + total );

// variable is reused
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/9657946be3bcd5a81aebc12d4ef82d0b)
```java
function printLineTotal() {
  double total = item.getPrice() * item.getQuantity();
  System.out.println("Line total: " + total );
}

function printAmountTotal() {
  double total = order.getTotal() - order.getDiscount();
  System.out.println( "Amount due: " + total );
}
```

# Detection

[X] Automatic 

Linters can use the parse tree to find variable definition and usages.

# Tags

- Readability

# Conclusion

Avoid reusing variable names. Use more specific and different names.

# Relations

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 154 - Too Many Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20154%20-%20Too%20Many%20Variables/readme.md)

# More Info

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Credits

Photo by [Sigmund](https://unsplash.com/@sigmund) on [Unsplash](https://unsplash.com/s/photos/recycle)
  
* * *

> Simplicity before generality, use before reuse.

_Kevlin Henney_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)