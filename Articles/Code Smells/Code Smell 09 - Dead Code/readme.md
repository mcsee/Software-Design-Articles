# Code Smell 09 - Dead Code

![Code Smell 09 - Dead Code](Code%20Smell%2009%20-%20Dead%20Code.jpg)

*Code that is no longer used or needed.*

> TL;DR: Do not keep code "just in case I need it".

# Problems 😔 

- Maintainability

# Solutions 😃

- Remove the code
- [KISS](https://en.wikipedia.org/wiki/KISS_principle)

# Examples

- Gold plating code or [Yagni](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) code.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/9e793df7489a96dc27d29d0f4e963bdf) -->

```javascript
class Robot {   
  walk() {
    // ...
    }
  serialize() {
    // ..
  }
  persistOnDatabase(database) {
    // ..
  }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/e1075cc971b5f7af28e37d29b492735d) -->

```javascript
class Robot {   
  walk() {
    // ...
    }  
}
```
	    
# Detection 🔍

Coverage tools can find dead code (uncovered) if you have a great suite of tests.

# Exceptions 🛑

- Avoid metaprogramming. When used, it is very difficult to find references to the code.

[Laziness I - Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Tags 🏷️

- YAGNI

# Conclusion 🏁

Remove dead code for simplicity.

If you are uncertain of your code, you can temporarily disable it using [Feature Toggle](https://en.wikipedia.org/wiki/Feature_toggle).

Removing code is always more rewarding than adding.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 54 - Anchor Boats](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2054%20-%20Anchor%20Boats/readme.md)

# More Information 📕

[Laziness I - Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Credits 🙏

Photo by [Ray Shrewsberry](https://pixabay.com/users/ray_shrewsberry-7673058/) on [Pixabay](https://pixabay.com/)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)