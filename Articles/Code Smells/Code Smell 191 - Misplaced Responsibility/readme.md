# Code Smell 191 - Misplaced Responsibility
            
![Code Smell 191 - Misplaced Responsibility](Code%20Smell%20191%20-%20Misplaced%20Responsibility.jpg)

*You have a clear responsibility for the wrong object*

> TL;DR: Don't be afraid to create or overload the proper objects.

# Problems 😔 

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault.

# Solutions 😃

1. Find actual behavior on the real objects using the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

2. Answer the question: 'Whose responsibility is..?'

# Context 💬

Finding responsible objects is a tough task.

If we talk to anybody outside the software world, they will tell us where we should place every responsibility.

Software engineers, on the contrary, tend to put behavior in strange places like [helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md).

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/66489fee9b0707d7514d520c515ad102) -->

```javascript
function add(a, b) {
  return a + b;
}
// this is natural in many programming languages,
// but unnatural in real life

class GraphicEditor {
  constructor() {
    this.PI = 3.14;
    // You shouldn't define the constant here
  }

  pi() {
    return this.PI;
    // Not this object's responsibility
  }

  drawCircle(radius) {
    console.log("Drawing a circle with radius ${radius} " +
    "and circumference " + (2 * this.pi()) * radius");
  }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/57f86bc7ab8f2e4c67039733ddacb118) -->

```javascript
class Integer {
  function add(adder) {
    return this + adder;
  }
}
// This won't compile in many programming languages
// But it is the right place for adding responsibility

class GraphicEditor {
  drawCircle(radius) {
    console.log("Drawing a circle with radius " + radius +
      " and circumference " + (2 * RealConstants.pi() * radius));    
  }
}
// PI's definition is RealConstants (or Number)'s responsibility

class RealConstants {
  pi() {
    return 3.14;
  }
}
```

# Detection 🔍

[X] Manual

This is a semantic smell.

# Exceptions 🛑

- Some languages force you to add protocol in some objects and not on everyone (like primitive integers, Strings, Arrays, etc.)

# Tags 🏷️

- Behavior

# Conclusion 🏁

If you put the responsibilities in the proper object, you will surely find them in the same place.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 22 - Helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md)

[Code Smell 63 - Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2063%20-%20Feature%20Envy/readme.md)

# More Information 📕

- [Clean Code Book](https://amzn.to/3k2apxY)

# Disclaimer 📘

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Austin Neill](https://unsplash.com/@arstyy) on [Unsplash](https://unsplash.com/photos/OWbH9a8Yi2I)
    
* * *

> We know an object by what it does, by what services it can provide. That is to say, we know objects by their behaviors.

_David West_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)