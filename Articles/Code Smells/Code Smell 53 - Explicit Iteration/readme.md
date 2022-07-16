# Code Smell 53 - Explicit Iteration

![Code Smell 53 - Explicit Iteration](elena-mozhvilo-LJ5ZYYZAOWo-unsplash.jpg)

*We learned loops back in school. But enumerators and iterators are the next generation.*

> TL;DR: Don't use indices while iterating. Prefer Higher level collections.

# Problems

- Encapsulation

- Declarativeness

# Solutions

1. Favor *foreach()* or high order iterators

2. You will be able to use yield(), caches, proxies, lazy loading and much more when you hide your implementation details.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/9277f66f0a09b0e01ab217a65f80fe61)
```javascript
for (i = 0; i < colors.count(), i++) {
  print(colors[i]);
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/c5640773e3691e2aa6ac6db27b5596bf)
```javascript
foreach (color of colors) {
  print(color);
}

// Closures and arrow functions
colors.foreach(color => print(color));
```

# Detection

Linters can find this smell using regex.

There might be false positives. See exceptions below.

# Exceptions

If the problem domain needs the elements to be bijected to natural numbers like indices, the first solution is adequate.

Remember all time to find real world analogies.

[The One and Only Software Design Principle](Theory\The One and Only Software Design Principle)

# Tags

- Declarative

# Conclusion

This kind of smell do not ring the bell to many developers because they think this is a subtlety. 

Clean code is full of this few declarative things that can make a difference.

# Relations

[Code Smell 33 - Abbreviations](Code Smells\Code Smell 33 - Abbreviations)

# More info

[What is (wrong with) software?](Theory\What is (wrong with) software)

# Credits

<span>Photo by [Elena Mozhvilo](https://unsplash.com/@miracleday) on [Unsplash](https://unsplash.com/s/photos/jack-in-the--box)</span>

* * *

> If you get tired of writing for loops, take a break and continue later.

_David Walker_
 
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

Original twitter thread by @[Matt Moll](@MattCodeJourney)

[Twitter](https://twitter.com/1346193744178110465)

* * * 

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()