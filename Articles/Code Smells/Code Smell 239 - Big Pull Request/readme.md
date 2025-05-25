# Code Smell 239 - Big Pull Request
            
![Code Smell 239 - Big Pull Request](Code%20Smell%20239%20-%20Big%20Pull%20Request.jpg)

*You make too many different changes in a single pull request*

> TL;DR: Always stick to baby steps

# Problems 😔 

- Readability

- Code Review time and complexity

- Merge Conflicts

- Testing Challenges

# Solutions 😃

1. Break the change in atomic parts

# Context 💬

When pull requests become very large, they can pose several challenges and problems for development teams.

You must avoid merge requests making different unrelated changes.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/8324fa9cdd7a18f1f66f33ad874244c8) -->

```javascript
function generateFibonacci(ordinal) {
  const fibonacciSequence = [0, 1];

  for (let index = index; index < ordinal; index++) {
    const nextFibonacci = fibonacciSequence[index - 1]
          + fibonacciSequence[index - 2];
    fibonacciSequence.push(nextFibonacci);
  }

  return fibonacciSequence;
}

// This function solves a very different problem
// You should not mix them in a single pull request

function voyagerDistanceFromEarth(
    currentDistanceInKms, yearsTravelled) {
  const speedOfVoyagerInKmS = 17; 

  return currentDistanceInKms + 
        speedOfVoyagerInKmS * yearsTravelled * 60 * 60 * 24 * 365.25;
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/9d8adddf01f4ba19917b6307cdcd66f3) -->

```javascript
function generateFibonacci(ordinal) {
  const fibonacciSequence = [0, 1];

  for (let index = index; index < ordinal; index++) {
    const nextFibonacci = fibonacciSequence[index - 1]
          + fibonacciSequence[index - 2];
    fibonacciSequence.push(nextFibonacci);
  }

  return fibonacciSequence;
}

// You break it into two different pull requests
```

# Detection 🔍

[X] Automatic 

You can put a threshold and a warning on big merge requests.

# Exceptions 🛑

- Big refactors that cannot be made with baby steps

# Tags 🏷️

- Complexity

# Level 🔋

[ X] Beginner

# AI Assistants

AI assistants do not create pull requests. 

They generate the code you need.

# Conclusion 🏁

Software engineers must be experts at managing (and avoiding) [accidental complexity](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md).

# Relations 👩‍❤️‍💋‍👨

[Code Smell 170 - Refactor with Functional Changes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20170%20-%20Refactor%20with%20Functional%20Changes/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Håkon Grimstad](https://unsplash.com/@grimstad) on [Unsplash](https://unsplash.com/photos/blue-and-black-butterfly-on-brown-stick-hteXWSF9jA4)
    
* * *

> First make the change easy (warning: this might be hard), then make the easy change.

_Kent Beck_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)