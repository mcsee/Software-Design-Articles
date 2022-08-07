# Refactoring 003 - Extract Constant

![Refactoring 003 - Extract Constant](fortune-telling-gf7c1e1a3c_1920.jpg)

*You need to use some values explaining their meaning and origin*

> TL;DR: Name all your magic numbers

# Problems Addressed

- Readability

- Complexity

- Code Reuse

# Related Code Smells

- [Code Smell 02 - Constants and Magic Numbers](Code Smells\Code Smell  02 - Constants and Magic Numbers)

# Steps

1. Move the constant code fragment to a constant declaration

2. Replace the values with a reference to the constant.

# Sample Code

## Before

[Gist Url]: # (https://gist.github.com/mcsee/4beca4e8726130c29a74b956df6aefe2)
```java
double energy(double mass) {
  return mass * 300.000 ^ 2;
}
```

## After

[Gist Url]: # (https://gist.github.com/mcsee/17728639113169878b08a95a373624e3)
```java
//1. Move the constant code fragment to a constant declaration
final double LIGHT_SPEED = 300.000;

double energy(double mass) {
  //2. Replace the old code with a reference to the constant.
  return mass * LIGHT_SPEED ^ 2;
}
```

# Type

[X] Automatic
 
Many IDEs support this safe refactoring

# Why code is better?

Constant names add meaning to our code.

Magic numbers are difficult to understand and change.

Code must be as declarative as possible.

# Tags

- Readability

# Related Refactorings

[Refactoring 002 - Extract Method](Refactorings\Refactoring 002 - Extract Method)

# Credits

Image by [Tumisu](https://pixabay.com/users/tumisu-148124/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.