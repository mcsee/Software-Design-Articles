# Code Smell 138 - Packages Dependency

![Code Smell 138 - Packages Dependency](olieman-eth-K4Obbh4pHGE-unsplash.jpg)

*There's an industry trend to avoid writing code as much as possible. But this is not for free*

> TL;DR: Write your code unless you need an existing complex solution

# Problems

- [Coupling](Theory\Coupling - The one and only software design problem)

- [Security problems](https://nakedsecurity.sophos.com/2022/05/25/poisoned-python-and-php-packages-purloin-passwords-for-aws-access/)

- Architectural complexity

- [Packages Corruption](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/)

# Solutions

1. Import and implement trivial solutions

2. Rely on external and mature dependencies

# Context

Recently, There's a trend to rely on a hard to trace dependencies.

This introduces coupling into our designs and architectural solutions.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/32a73793d00fc672138e1a98bbdc9aa8)
```javascript
$ npm install --save is-odd

// https://www.npmjs.com/package/is-odd
// This package has about 500k weekly downloads
// https://github.com/i-voted-for-trump/is-odd/blob/master/index.js

module.exports = function isOdd(value) {
  const n = Math.abs(value); 
  return (n % 2) === 1;
};
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/751b57a8178500e9143ea2081237ffaf)
```javascript
function isOdd(value) {
  const n = Math.abs(value); 
  return (n % 2) === 1;
};

// Just solve it inline
```

# Detection

[X] Automatic 

We can check our external dependencies and stick to the minimum.

We can also depend on a certain concrete version to avoid hijacking.

# Tags

- Security

# Conclusion

Lazy programmers push reuse to absurd limits.

We need a good balance between code duplication and crazy reuse.

As always, there are rules of thumb but no rigid rules.

# Relations

[Code Smell 94 - Too Many imports](Code Smells\Code Smell 94 - Too Many imports)
 
# More Info

- [Poisoned Packages](https://nakedsecurity.sophos.com/2022/05/25/poisoned-python-and-php-packages-purloin-passwords-for-aws-access/)

- [Packages Corruption](https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/)

- [Copyright Threats](https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code/)

- [Malware in Packages](https://therecord.media/malware-found-in-npm-package-with-millions-of-weekly-downloads/)

# Credits

Photo by [olieman.eth](https://unsplash.com/@moneyphotos?) on [Unsplash](https://unsplash.com/s/photos/security-box)
  
Thanks to Ramiro Rela for this smell

* * *

> Complexity kills. It sucks the life out of developers, it makes products difficult to plan, build and test, it introduces security challenges, and it causes end-user and administrator frustration.

_Ray Ozzie_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()