# Refactoring 006 - Rename Result Variables

![Refactoring 006 - Rename Result Variables](Refactoring%20006%20-%20Rename%20Result%20Variables.jpg)

*'Result' is a very bad generic name. Just Fix it*

> TL;DR: Use the last call as a semantic guide.

# Problems Addressed

- Bad naming on variables

# Related Code Smells

[Code Smell 81 - Result](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2081%20-%20Result/readme.md)

[Code Smell 79 - TheResult](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2079%20-%20TheResult/readme.md)

# Steps

1. Name the variable with the same name as the last function call.

# Sample Code

## Before

<!-- [Gist Url](https://gist.github.com/mcsee/c4f1e90fb0a61724ea5993e04d572b5c) -->

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

<!-- [Gist Url](https://gist.github.com/mcsee/5a9bbc54b45798a610f0a76b8c25a583) -->

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

# Safety

This is a safe refactoring.

# Why is the Code Better?

A variable scope can last a lot.

Assignment and usage might be very far away from each other.

# Tags

- Naming 

# Related Refactorings

- Rename method

# See also

[What is in a name?](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md)

# Credits

Image by [HeungSoon](https://pixabay.com/users/heungsoon-4523762/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)