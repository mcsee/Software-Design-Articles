# Code Smell 105 - Comedian Methods

![Code Smell 105 - Comedian Methods](Code%20Smell%20105%20-%20Comedian%20Methods.jpg)

*Use professional and meaningful names*

> TL;DR: Don't be informal or offensive

# Problems 😔 

- Readability

- Unprofessional work

# Solutions 😃

1. Choose good and professional names.

# Context 💬

Our profession has a creative side.

Sometimes we get bored and try to be funny.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/fe5ba2b148a1b9b5f11cd7022b059fe6) -->

```javascript
function erradicateAndMurderAllCustomers();
// unprofessional and offensive
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/19ae535002ea19708c13334a1171af37) -->

```javascript
function deleteAllCustomers();
// more declarative and professional
```

# Detection 🔍

[X] Semi-Automatic 

We can have a list of forbidden words.

We can also check them in code reviews. 

Names are contextual, so it would be a difficult task for an automatic linter.

Naming conventions should be generic and should not include cultural jargon.

# Tags 🏷️

- Declarative Code

# Conclusion 🏁

Be professional in the way you name things in your code. 

Don't be try to be a comedian by giving a variable a silly name. 

You should write production code so future software developers (even you) should easily understand.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 38 - Abstract Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2038%20-%20Abstract%20Names/readme.md)

# More Information 📕

- [What is in a name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20Exactly%20Is%20a%20Name%20-%20Part%20I%20The%20Quest/readme.md)

# Credits 🙏

Photo by [Stewart Munro](https://unsplash.com/@stewartmunro) on [Unsplash](https://unsplash.com/s/photos/comedy)
  
* * *

> This ‘users are idiots, and are confused by functionality’ mentality of Gnome is a disease. If you think your users are idiots, only idiots will use it.

_Linus Torvalds_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)