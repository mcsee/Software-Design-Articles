# Code Smell 57 - Versioned Functions

![Code Smell 57 - Versioned Functions](Code%20Smell%2057%20-%20Versioned%20Functions.jpeg)

> TL;DR: Don't version your names!

*sort, sortOld, sort20210117, workingSort, It is great to have them all. Just in case*

# Problems

- Readability

- Maintainability

# Solutions

1. Keep just one working version of your artifact (class, method, attribute).

2. Leave time control to your version control system.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/3b63bc3a76faf6e98c3770171f8e1c10)

```javascript
findMatch()
findMatch_new()
findMatch_newer()
findMatch_newest()
findMatch_version2()
findMatch_old()
findMatch_working()
findMatch_for_real()
findMatch_20200229()
findMatch_thisoneisnewer()
findMatch_themostnewestone()
findMatch_thisisit()
findMatch_thisisit_for_real()
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/1e3df98869010c8b9f37f1a76ff80c8b)

```javascript
findMatch()
```

# Detection

We can add automatic rules to find versioned methods with patterns.

Like many other patterns we might create an internal policy and communicate.

# Tags

- Versioning
 
# Conclusion

Time and code evolution management is always present in software development. Luckily nowadays we have mature tools to address this problem.
 
# Relations

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)
 
# Credits

<span>Photo by [K8](https://unsplash.com/@k8_iv) on [Unsplash](https://unsplash.com/s/photos/onion)</span>

Original idea

[Twitter](https://x.com/1341808635115151360)

* * *

> That's why I write, because life never works except in retrospect. You can't control life, at least you can control your version.

_Chuck Palahniuk_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)