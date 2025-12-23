# Code Smell 152 - Logical Comment

![Code Smell 152 - Logical Comment](Code%20Smell%20152%20-%20Logical%20Comment.jpg)

*Temporary hacks might be permanent*

> TL;DR: Don't change code semantics to skip code.

# Problems 😔 

- Readability 

- Non-Intention Revealing

# Solutions 😃

1. If you need a temporary hack, make it explicit

2. Rely on your source control system

# Context 💬

Changing code with a temporary hack is a very bad developer practice.

We might *forget* some temporary solutions and leave them forever.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/a07a71db83f2c65adefffd736e77ee91) -->

```javascript
if (cart.items() > 11 && user.isRetail())  { 
  doStuff();
}
doMore();
// Production code

// the false acts to temporary skip the if condition
if (false && cart.items() > 11 && user.isRetail())  { 
  doStuff();
}
doMore();

if (true || cart.items() > 11 && user.isRetail())  {
// Same hack to force the condition
// The code after the true is never evaluated
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/174010435acb2c12f45124f2a085fa51) -->

```javascript
if (cart.items() > 11 && user.isRetail())  { 
  doStuff();
}
doMore();
// Production code

// Either if you need to force or skip the condition
// you can do it with a covering test forcing
// real world scenario and not the code

testLargeCartItems() 
testUserIsRetail()
```

# Detection 🔍

[X] Semi-Automatic 

Some linters might warn us of strange behavior.

# Tags 🏷️

- Comments

# Conclusion 🏁

Separation of concerns is extremely important in our profession.

Business logic and hacks should always be apart.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 151 - Commented Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20151%20-%20Commented%20Code/readme.md)

# Credits 🙏

Photo by [Belinda Fewings](https://unsplash.com/@bel2000a) on [Unsplash](https://unsplash.com/s/photos/road-closed)  

Thanks, @[Ramiro Rela](@racter) for this tip

* * *

> You might not think that programmers are artists, but programming is an extremely creative profession. It's logic-based creativity.

_John Romero_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)