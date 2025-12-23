# Code Smell 176 - Changes in Essence
            
![Code Smell 176 - Changes in Essence](Code%20Smell%20176%20-%20Changes%20in%20Essence.jpg)

*Mutation is good. Things change*

> TL;DR: Don't change essential attributes or behavior

# Problems 😔 

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) violation

- [Mutability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

- [Ripple Effect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2016%20-%20Ripple%20Effect/readme.md)

# Solutions 😃

1. Protect essential attributes from change.

2. [Remove setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md)

# Refactorings ⚙️

[Refactoring 001 - Remove Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md)

# Context 💬

Heraclitus said:

> No man ever steps in the same river twice. For it’s not the same river and he’s not the same man.

The man stays the same in essence. But his body evolves.

# Refactorings ⚙️

[Refactoring 001 - Remove Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20001%20-%20Remove%20Setters/readme.md)

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/7c1ee7181f403225470c90c2f4668f99) -->

```javascript
const date = new Date();
date.setMonth(4);
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/c758d376a61469d8ce4266b6e9fbe115) -->

```javascript
const date = new Date("2022-03-25");
```

# Detection 🔍

[X] Manual

This is a semantic smell. We need to model which attributes/behaviors are [essential](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) and which are accidental.

# Tags 🏷️

- Mutability 

# Conclusion 🏁

We need to favor immutable objects.

Objects can mutate in [accidental](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) ways, not in essential ones.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 16 - Ripple Effect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2016%20-%20Ripple%20Effect/readme.md)

# More Information 📕

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Disclaimer 📘

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Nick Fewings](https://unsplash.com/@jannerboy62) on [Unsplash](https://unsplash.com/s/photos/heart-arrow)    

* * *

> Changes in software design will eventually mean "one step forward, two steps back". It is inevitable.

_Salman Arshad_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)