# Code Smell 187 - If/Else Backwards
            
![Code Smell 187 - If/Else Backwards](Code%20Smell%20187%20-%20If%20Else%20Backwards.jpg)

*The first thing we read after the if the condition is the IF*

> TL;DR: You have the important else condition on the else.

# Problems

- Readability

# Solutions

1. Swap the conditions.

# Context

It is not as straightforward as it appears to write IF clauses in an elegant manner.

There are lots of variants and choices. 

We need to pay special attention to readability.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/7f2c51762feac4966f03df57f57db76f) -->

```kotlin
fun addToCart(item: Any) {
    if (!cartExists()) {
        // Condition is negated
        this.createCart();
        this.cart.addItem(Item);
        // Repeated Code
    }
    else {
        // Normal case is on the else clause
        this.cart.addItem(Item);
    }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/b804c849ea5ac33be4e27abe929837c1) -->

```kotlin
fun addToCart(item: Any) {
    if (cartExists()) {
        this.cart.addItem(Item);
    }
    else {      
        this.createCart();
        this.cart.addItem(Item);
    }
}   

fun addToCartShorter(item: Any) {
    if (!cartExists()) {
        this.createCart();
    }
    this.cart.addItem(Item);    
}
```

# Detection

[X] Semi-Automatic 

We can find negated expressions on IF conditions and check for this anti-pattern.

# Tags

- IFs

# Conclusion

We need to read code like prose.

Humans read the standard case first and the exceptional one after it.

# Relations

[Code Smell 51 - Double Negatives](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2051%20-%20Double%20Negatives/readme.md)

[Code Smell 156 - Implicit Else](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20156%20-%20Implicit%20Else/readme.md)

# More Info

- [Know the Code](https://knowthecode.io/if-else-backwards-code-pattern)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Karol Kasanicky](https://unsplash.com/@karolkas) on [Unsplash](https://unsplash.com/s/photos/upside)
    
* * *

> Beauty is more important in computing than anywhere else in technology because software is so complicated. Beauty is the ultimate defense against complexity.

_D. Gelernter_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)