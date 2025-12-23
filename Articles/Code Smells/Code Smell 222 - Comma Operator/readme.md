# Code Smell 222 - Comma Operator
            
![Code Smell 222 - Comma Operator](Code%20Smell%20222%20-%20Comma%20Operator.jpg)

*Don't abuse this fancy operator*

> TL;DR: Use comma operator just for loops

# Problems 😔 

- Readability

- Hidden Defects

# Solutions 😃

1. Avoid operator usage

2. Prefer *[foreach](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2053%20-%20Explicit%20Iteration/readme.md)* operator

3. Break the sentences

# Context 💬

In JavaScript, the comma operator allows you to evaluate multiple expressions sequentially and return the value of the last expression.

It's denoted by a comma and separates multiple expressions within a larger expression.

Each expression is evaluated in order from left to right, and the final value of the entire comma-separated expression is the value of the last expression.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/b18abdb155a811f6f3f694b079837330) -->

```javascript
const gravitationalConstant = 6.67430e-11;

const massBlackHole1 = 1.5e31;  
// Mass of the first black hole in kg

const massBlackHole2 = 2.2e32;  
// Mass of the second black hole in kg

const distanceBlackHoles = 5.7e20;  
// Distance between black holes in meters

var force = (distanceSquared = distanceBlackHoles*distanceBlackHoles,
            (gravitationalConstant * massBlackHole1*massBlackHole2) /
             distanceSquared);
// Two operations in a single statement with comma operator
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/3a928ca6aa06e70c0f20d40487c6bad9) -->

```javascript
function calculateGravitationalForce(mass1, mass2, distance) {
  const gravitationalConstant = 6.67430e-11;
  return (gravitationalConstant * mass1 * mass2) / 
    (distance * distance);  
}

const massBlackHole1 = 1.5e31; 
// Mass of the first black hole in kg

const massBlackHole2 = 2.2e32; 
// Mass of the second black hole in kg

const distanceBlackHoles = 5.7e20; 
// Distance between black holes in meters

const force = calculateGravitationalForce(
  massBlackHole1,
  massBlackHole2,
  distanceBlackHoles
);
// Notice force is calculated with a separate function
```

# Detection 🔍

[X] Automatic 

Many [linters](https://rules.sonarsource.com/javascript/RSPEC-878/) can detect this problem.

# Exceptions 🛑

- For loops are a valid exception dough they might lead you to [another code smell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2053%20-%20Explicit%20Iteration/readme.md)

# Tags 🏷️

- Readability

# Conclusion 🏁

This valid operator was designed to shorten *for loops* but is now sometimes abused.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 53 - Explicit Iteration](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2053%20-%20Explicit%20Iteration/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏
Photo by [Stephen Hickman](https://unsplash.com/@stevo6960) on [Unsplash](https://unsplash.com/photos/YmNrPi4FfLU)
    
* * *

> My computer's so fast it finishes an infinite loop in 5 minutes.

_Chisel Wright_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)