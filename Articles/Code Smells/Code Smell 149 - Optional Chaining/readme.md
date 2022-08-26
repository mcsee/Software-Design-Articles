# Code Smell 149 - Optional Chaining

![Code Smell 149 - Optional Chaining](Code%20Smell%20149%20-%20Optional%20Chaining.jpg)

*Our code is more robust and legible. But we hide NULL under the rug*

> TL;DR: Avoid Nulls and undefined. If you avoid them you will never need Optionals.

# Problems

- Nulls

- [IF Polluting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

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

[Code Smell 145 - Short Circuit Hack](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20145%20-%20Short%20Circuit%20Hack/readme.md)

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20%2012%20-%20Null/readme.md)

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md)

# More Info

- [Optional Chaining Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

[WAT?](https://www.destroyallsoftware.com/talks/wat)

# Credits

Photo by [engin akyurt](https://unsplash.com/@enginakyurt) on [Unsplash](https://unsplash.com/s/photos/chains)
  
* * *

> He who fights with monsters might take care lest he thereby become a monster. And if you gaze for long into an abyss, the abyss gazes also into you.

_Nietzsche_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)