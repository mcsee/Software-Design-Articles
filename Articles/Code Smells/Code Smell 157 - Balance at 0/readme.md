# Code Smell 157 - Balance at 0

![Code Smell 157 - Balance at 0](Code%20Smell%20157%20-%20Balance%20at%200.jpg)

*Today I expected a payment in my wallet. The balance was 0. I panicked.*

> TL;DR: Null is not 0. Error is not 0. just 0 is 0.

# Problems 😔 

- [Nulls](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

- UX

- Usability

# Solutions 😃

1. Make a clear distinction between a Zero and an error.

# Context 💬

I read a lot about security issues. 

Especially on crypto.

Last week, I read about a [crypto hack thread](https://twitter.com/stephenlacy/status/1554697083331891201).

When my wallet showed me 0 as a balance, I panicked.

It was just a UX smell.

The blockchain was unreachable 💩

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/4b6caebfa8707878eba0416c260fd180) -->

```python
def get_balance(address):
    url = "https://blockchain.info/q/addressbalance/" + address
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        return 0
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/f59614042404c4d55eac82d3f6f9c8a0) -->

```python
def get_balance(address):
    url = "https://blockchain.info/q/addressbalance/" + address
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        raise BlockchainNotReachableError("Error reaching blockchain")
```

# Detection 🔍

[X] Manual

This is a design smell. 

We can find patterns when an [exception](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md) or [return code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2072%20-%20Return%20Codes/readme.md) is thrown and masked with a 0.

# Tags 🏷️

- UX

# Conclusion 🏁

Always follow The [Least Astonishment principle](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) as a guide.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Code Smell 139 - Business Code in the User Interface](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20139%20-%20Business%20Code%20in%20the%20User%20Interface/readme.md)

[Code Smell 73 - Exceptions for Expected Cases](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md)

[Code Smell 72 - Return Codes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2072%20-%20Return%20Codes/readme.md)

# More Information 📕

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

# Credit

Photo by [Jasmin Sessler](https://unsplash.com/@jasmin_sessler) on [Unsplash](https://unsplash.com/s/photos/panic)  

# Disclaimer 📘

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

> My real criticism with Null is that it brings back again unnecessarily all the agony of having to choose whether to run your program fast without checking or run it slow with checking.

_Tony Hoare_ (Null Inventor)
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)