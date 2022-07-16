# Code Smell 105 - Comedian Methods

![Code Smell 105 - Comedian Methods](stewart-munro-b1BrEXiYfFg-unsplash.jpg)

*Use professional and meaningful names*

> TL;DR: Don't be informal or offensive

# Problems

- Readability

- Unprofessional work

# Solutions

1. Choose good and professional names.

# Context

Our profession has a creative side.

Sometimes we get bored and try to be funny.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/fe5ba2b148a1b9b5f11cd7022b059fe6)
```javascript
function erradicateAndMurderAllCustomers();

// unprofessional and offensive
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/19ae535002ea19708c13334a1171af37)
```javascript
function deleteAllCustomers();

// more declarative and professional
```

# Detection

[X] Semi-Automatic 

We can have a list of forbidden words.

We can also check them in code reviews. 

Names are contextual, so it would be a difficult task for an automatic linter.

Naming conventions should be generic and should not include cultural jargon.

# Tags

- Naming

# Conclusion

Be professional in the way you name things in your code. 

Don't be try to be a comedian by giving a variable a silly name. 

You should write production code so future software developers (even you) should easily understand.

# Relations

[Code Smell 38 - Abstract Names](Code Smells\Code Smell 38 - Abstract Names)

# More Info

- [What is in a name](Theory\What exactly is a name — Part I The Quest)

# Credits

Photo by [Stewart Munro](https://unsplash.com/@stewartmunro) on [Unsplash](https://unsplash.com/s/photos/comedy)
  
* * *

> This ‘users are idiots, and are confused by functionality’ mentality of Gnome is a disease. If you think your users are idiots, only idiots will use it.

_Linus Torvalds_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()