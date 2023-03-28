# Code Smell 53 - Explicit Iteration

![Code Smell 53 - Explicit Iteration](Code%20Smell%2053%20-%20Explicit%20Iteration.jpg)

*We learned loops back in school. But enumerators and iterators are the next generation*

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

Remember all time to find real-world analogies.

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

# Tags

- Declarative

# Conclusion

This kind of smell does not ring a bell to many developers because they think this is a subtlety.

Clean code is full of these few declarative things that can make a difference.

# Relations

[Code Smell 33 - Abbreviations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md)

# More Info

[What is (wrong with) software?](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

# Credits

<span>Photo by [Elena Mozhvilo](https://unsplash.com/@miracleday) on [Unsplash](https://unsplash.com/s/photos/jack-in-the--box)</span>

* * *

> If you get tired of writing for loops, take a break and continue later.

_David Walker_
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

Original twitter thread by @[Matt Moll](@MattCodeJourney)

[Twitter](https://twitter.com/1346193744178110465)

* * * 

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)