# Code Smell 127 - Mutable Constants

![Code Smell 127 - Mutable Constants](sangharsh-lohakare-8o_LkMpo8ug-unsplash.jpg)

*You declare something a constant. But you can mutate it.*

> TL;DR: Use inmutable constants

# Problems

- [Mutability](Theory\The Evil Power of Mutants)

- The Least Surprise Principle violation

- Coupling

# Solutions

1. Enforce [mutability](Theory\The Evil Power of Mutants)

2. Avoid constants. They are hard to mock in tests.

# Context

We learned to declare constants in our first course on computer programming.

As always, it is not important if something is constant. 

It is important if it does not mutate.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/3317c6e127e2d8b800174415eb79a08e)
```javascript
const DISCOUNT_PLATINUM = 0.1;
const DISCOUNT_GOLD = 0.05;
const DISCOUNT_SILVER = 0.02;

// Since variables are constants we cannot reassign them
const DISCOUNT_PLATINUM = 0.05; // Error

// We can group them
const ALL_CONSTANTS = {
  DISCOUNT: {
    PLATINUM = 0.1;
    GOLD = 0.04;
    SILVER = 0.02;  
  },
};

const ALL_CONSTANTS = 3.14; // Error

ALL_CONSTANTS.DISCOUNT.PLATINUM = 0.08; // NOT AN ERROR. WTF!


const ALL_CONSTANTS = Object.freeze({
  DISCOUNT: 
    PLATINUM = 0.1;
    GOLD = 0.05;
    SILVER = 0.02; 
});

const ALL_CONSTANTS = 3.14; // Error

ALL_CONSTANTS.DISCOUNT.PLATINUM = 0.12; // NOT AN ERROR. WTF!
```

## Right
 
[Gist Url]: # (https://gist.github.com/mcsee/e656ae640875909f55bd7eda10b4d227)
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

// Code works, but it is coupled and we cannot test it

Class TaxesProvider {
  applyPlatinum(product);
}

// Now we can couple to a interface (the protocol of taxes provider)
// Since class has no setters it is constant an immutable
// And we can replace it on tests
```

# Detection

[X] Semi-Automatic 

We can perform mutation testing to find changed values.

# Tags

- Constants

# Conclusion

Mutability is very important.

We need to enforce it with the right tools.

# Relations

[Code Smell 86 - Mutable Const Arrays](Code Smells\Code Smell 86 - Mutable Const Arrays)

[Code Smell 107 - Variables Reuse](Code Smells\Code Smell 107 - Variables Reuse)

[Code Smell 02 - Constants and Magic Numbers](Code Smells\Code Smell  02 - Constants and Magic Numbers)

# More Info

- [The Evil Power of Mutants](Theory\The Evil Power of Mutants)

# Credits

This smell was inspired by [This](https://dev.to/bytebodger/javascript-constants-with-objectfreeze-4beg)

Photo by [Sangharsh Lohakare](https://unsplash.com/@sangharsh_l) on [Unsplash](https://unsplash.com/s/photos/mutation)
  
* * *

> You start digging in the code. The more you dig, the more stuff you turn up. Eventually you dig yourself into a hole you can’t get out of. To avoid digging your own grave, refactoring must be done systematically.

_Eric Gamma_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()