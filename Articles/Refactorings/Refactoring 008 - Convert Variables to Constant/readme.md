# Refactoring 008 - Convert Variables to Constant
            
![Refactoring 008 - Convert Variables to Constant](Refactoring%20008%20-%20Convert%20Variables%20to%20Constant.jpg)

*If I see a Variable that doesn't change. I call that variable a constant*

> TL;DR: Be explicit on what mutates and what doesn't.

# Problems Addressed 😔

- [Mutability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

- Code Optimization

# Related Code Smells 💨

[Code Smell 158 - Variables not Variable](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20158%20-%20Variables%20not%20Variable/readme.md)

[Code Smell 127 - Mutable Constants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20127%20-%20Mutable%20Constants/readme.md)

[Code Smell 116 - Variables Declared With 'var'](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20116%20-%20Variables%20Declared%20With%20'var'/readme.md)

# Steps 👣 

1. Find the scope of the variable

2. Define a constant with the same scope

3. Replace the variable 

# Sample Code 📖

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/3ae265e1ae7422164c175b16a7f822d3) -->

```javascript
let lightSpeed = 300000;
var gravity = 9.8;

// 1. Find the scope of the variable
// 2. Define a constant with the same scope
// 3. Replace the variable
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/e25d1ded85b4547d20fee70e4c1f0ca6) -->

```javascript
const lightSpeed = 300000;
const gravity = 9.8;

// 1. Find the scope of the variable
// 2. Define a constant with the same scope
// 3. Replace the variable 

// If the object is compound, 
// we might need Object.freeze(gravity);
```

# Type 📝

[X] Automatic

Our IDEs can check if a variable is written but never updated.

# Safety 🛡️

This is a safe refactoring.

# Why is the Code Better? ✨

Code is more compact and declarative.

We can make and step further and use operators like *var*, *let*, *const*, etc.

The scope is clearer.

# Tags 🏷️

- Mutability

# Level 🔋

[X] Beginner

# Related Refactorings 🔄

[Refactoring 003 - Extract Constant](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20003%20-%20Extract%20Constant/readme.md)

# See also 📚

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

* * * 

This article is part of the Refactoring Series

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)