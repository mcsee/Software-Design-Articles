# Code Smell 127 - Mutable Constants

![Code Smell 127 - Mutable Constants](Code%20Smell%20127%20-%20Mutable%20Constants.jpg)

*You declare something a constant. But you can mutate it.*

> TL;DR: Use inmutable constants

# Problems 😔 

- [Mutability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

- The Least Surprise Principle violation

- Coupling

# Solutions 😃

1. Enforce [mutability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

2. Avoid constants. They are hard to mock in tests.

# Context 💬

We learned to declare constants in our first course on computer programming.

As always, it is not important if something is constant. 

It is important if it does not mutate.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/3317c6e127e2d8b800174415eb79a08e) -->

```javascript
const DISCOUNT_PLATINUM = 0.1;
const DISCOUNT_GOLD = 0.05;
const DISCOUNT_SILVER = 0.02;

// Since variables are constants you cannot reassign them
const DISCOUNT_PLATINUM = 0.05; // Error

// You can group them
const ALL_CONSTANTS = {
  DISCOUNT: {
    PLATINUM = 0.1;
    GOLD = 0.05;
    SILVER = 0.02;  
  },
};

const ALL_CONSTANTS = 3.14; // Error

ALL_CONSTANTS.DISCOUNT.PLATINUM = 0.08; // NOT AN ERROR. OOPS!

const ALL_CONSTANTS = Object.freeze({
  DISCOUNT: 
    PLATINUM = 0.1;
    GOLD = 0.05;
    SILVER = 0.02; 
});

const ALL_CONSTANTS = 3.14; // Error

ALL_CONSTANTS.DISCOUNT.PLATINUM = 0.12; // NOT AN ERROR. OOPS!
```

## Right 👉
 
<!-- [Gist Url](https://gist.github.com/mcsee/e656ae640875909f55bd7eda10b4d227) -->

```javascript
export const ALL_CONSTANTS = Object.freeze({
  DISCOUNT: Object.freeze({
    PLATINUM = 0.1;
    GOLD = 0.05;
    SILVER = 0.02;  
  }),
});

const ALL_CONSTANTS = 3.14; // Error

ALL_CONSTANTS.DISCOUNT.PLATINUM = 0.12; // ERROR
// Code works, but it is coupled and you cannot test it

class TaxesProvider {
  applyPlatinum(product);
}

// Now you can couple to an interface (the protocol of taxes provider)
// Since class has no setters it is constant and immutable
// And you can replace it on tests
```

# Detection 🔍

[X] Semi-Automatic 

We can perform mutation testing to find changed values.

# Tags 🏷️

- Mutability

# Conclusion 🏁

Mutability is very important.

We need to enforce it with the right tools.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 86 - Mutable Const Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2086%20-%20Mutable%20Const%20Arrays/readme.md)

[Code Smell 107 - Variables Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20107%20-%20Variables%20Reuse/readme.md)

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

# More Information 📕

- [The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Credits 🙏

This smell was inspired by [This](https://dev.to/bytebodger/javascript-constants-with-objectfreeze-4beg)

Photo by [Sangharsh Lohakare](https://unsplash.com/@sangharsh_l) on [Unsplash](https://unsplash.com/s/photos/mutation)
  
* * *

> You start digging in the code. The more you dig, the more stuff you turn up. Eventually you dig yourself into a hole you can’t get out of. To avoid digging your own grave, refactoring must be done systematically.

_Eric Gamma_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)