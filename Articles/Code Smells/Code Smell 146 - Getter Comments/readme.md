# Code Smell 146 - Getter Comments

![Code Smell 146 - Getter Comments](Code%20Smell%20146%20-%20Getter%20Comments.jpg)

*Comments are a code Smell. Getters are another code smell. Guess what?*

> TL;DR: Don't use getters. Don't comment getters

# Problems 😔 

- Comment Abusers

- Readability

- Getters

# Solutions 😃

1. Remove getter comments

2. Remove getters

# Context 💬

A few decades ago, we used to comment on every method. Even trivial ones

Comment should describe only a critical design decision.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/29cd4411aa32467291998e467e6ef503) -->

```solidity
contract Property {
    int private price;   

    function getPrice() public view returns(int) {           
           /* returns the Price  */

        return price;
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/bf1ab1d44b078d797796d19554032591) -->

```solidity
contract Property {
    int private _price;   

    function price() public view returns(int) {        
        return _price;
    }
}
```

# Detection 🔍

[X] Semi-Automatic

We can detect if a method is a getter and has a comment. 

# Exceptions 🛑

The function needs a comment, that is accidentally a getter and the comment is related to a design decision

# Tags 🏷️

- Comments

# Conclusion 🏁

Don't comment getters. 

They add no real value and bloat your code.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

[Code Smell 68 - Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

# Credits 🙏

Photo by Reimond de Zuñiga on Unsplash

* * *

> Code should be remarkably expressive to avoid most of the comments. There'll be a few exceptions, but we should see comments as a 'failure of expression' until proven wrong.

_Robert Martin_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)