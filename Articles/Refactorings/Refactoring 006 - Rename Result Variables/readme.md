# Refactoring 006 - Rename Result Variables

![Refactoring 006 - Rename Result Variables](scoreboard-gc2d9cf2d9_1920.jpg)

*'Result' is a very bad generic name. Just Fix it*

> TL;DR: Use the last call as a semantic guide.

# Problems Addressed

- Bad naming on variables

# Related Code Smells

[Code Smell 81 - Result](Code Smells\Code Smell 81 - Result)

[Code Smell 79 - TheResult](Code Smells\Code Smell 79 - TheResult)

# Steps

1. Name the variable with the same name as the last function call.

# Sample Code

## Before

[Gist Url]: # (https://gist.github.com/mcsee/c4f1e90fb0a61724ea5993e04d572b5c)
```javascript
function doubleFavoriteNumber(n) {
    return this.favoriteNumber * n;
}

var result = doubleFavoriteNumber(2);

// Many lines after we have no idea what does 
// result holds

// var result ???
```

## After

[Gist Url]: # (https://gist.github.com/mcsee/5a9bbc54b45798a610f0a76b8c25a583)
```javascript
function doubleFavoriteNumber(n) {
    return this.favoriteNumber * n;
}

const favoriteNumberDoubled = doubleFavoriteNumber(2);

// Many instructions after

// We can use favoriteNumberDoubled knowing its semantics
```

# Type

[X] Semi-Automatic

As with many name heuristics, we can replace the variable with another refactor *rename variable*

# Why code is better?

A variable scope can last a lot.

Assignment and usage might be very far away from each other.

# Tags

- Naming 

# See also

[What is in a name?](Theory\What exactly is a name — Part I The Quest)

# Credits

Image by [HeungSoon](https://pixabay.com/users/heungsoon-4523762/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.