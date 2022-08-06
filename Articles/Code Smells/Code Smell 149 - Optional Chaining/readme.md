# Code Smell 149 - Optional Chaining

![Code Smell 149 - Optional Chaining](engin-akyurt-eKBVDW1X2xY-unsplash.jpg)

*Our code is more robust and legible. But we hide NULL under the rug*

> TL;DR: Avoid Nulls and undefined. If you avoid them you will never need Optionals.

# Problems

- Nulls

- [IF Polluting](Theory\How to Get Rid of Annoying IFs Forever)

# Solutions

1. Remove nulls

2. Deal with undefined

# Context

[Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining), Optionals, Coalescence, and many other solutions help us deal with the infamous nulls. 

There's no need to use them once our code is mature, robust, and without nulls.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/7f97455e51c8cd89319117103b25bda5)
```javascript
const user = {
  name: 'Hacker'
};

if (user?.credentials?.notExpired) {
  user.login();
}

user.functionDefinedOrNot?.();

// Seems compact but it is hacky and has lots
// of potential NULLs and Undefined
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/df8b74e09cd2bc4ee69e7b9197585a0a)
```javascript
function login() {}

const user = {
  name: 'Hacker',
  credentials: { expired: false }
};

if (!user.credentials.expired) {
  login();
}

// Also compact 
// User is a real user or a polymorphic NullUser
// Credentials are always defined.
// Can be an instance of InvalidCredentials
// Assuming we eliminated nulls from our code

if (user.functionDefinedOrNot !== undefined) {  
    functionDefinedOrNot();
}

// This is also wrong.
// Explicit undefined checks are yet another code smell
```

# Detection

[X] Automatic 

This is a *Language Feature*. 

We can detect it and remove it.

# Tags

- Null

# Conclusion

Many developers feel safe polluting the code with null dealing.

In fact, this is safes than not treating NULLs at all.

[Nullish Values](https://developer.mozilla.org/en-US/docs/Glossary/Nullish), Truthy and Falsy are also code smells.

We need to aim higher and make cleaner code.

*The good*: remove all nulls from your code

*The bad*: use optional chaining

*The ugly*: not treating nulls at all

# Relations

[Code Smell 145 - Short Circuit Hack](Code Smells\Code Smell 145 - Short Circuit Hack)

[Code Smell 12 - Null](Code Smells\Code Smell  12 - Null)

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](Code Smells\Code Smell 69 - Big Bang (JavaScript Ridiculous Castings))

# More Info

- [Optional Chaining Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

[Null: The Billion Dollar Mistake](Theory\Null - The Billion Dollar Mistake)

[How to Get Rid of Annoying IFs Forever](Theory\How to Get Rid of Annoying IFs Forever)

[WAT?](https://www.destroyallsoftware.com/talks/wat)

# Credits

Photo by [engin akyurt](https://unsplash.com/@enginakyurt) on [Unsplash](https://unsplash.com/s/photos/chains)
  
* * *

> He who fights with monsters might take care lest he thereby become a monster. And if you gaze for long into an abyss, the abyss gazes also into you.

_Nietzsche_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()