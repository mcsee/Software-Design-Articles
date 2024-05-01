# Code Smell 206 - Long Ternaries
            
![Code Smell 206 - Long Ternaries](Code%20Smell%20206%20-%20Long%20Ternaries.jpg)

*You love ternaries too much*

> TL;DR: Don't use ternaries for code execution. You should read them as a math formula.

# Problems

- Difficult to read

- Low Reuse

- Low Testability

# Solutions

1. [Extract the method guards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

# Refactorings

[Refactoring 010 - Extract Method Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

# Context

When a ternary condition is used in code that contains multiple functions, it can be challenging to determine which function is being affected by the condition. 

This can make it harder to identify and fix bugs, as well as to understand how the code works in general.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/274faf5d13f9853f63228fa10ee45d7e)

```javascript
const invoice = isCreditCard ? 
  prepareInvoice();
  fillItems();
  validateCreditCard();
  addCreditCardTax();
  fillCustomerDataWithCreditCard();
  createCreditCardInvoice() 
:
  prepareInvoice();
  fillItems();
  addCashDiscount();
  createCashInvoice();

// The intermediate results are not considered
// The value of the invoice is the result of
// the last execution
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/36ef3f34e5767f120dcabe8eebda1072)

```javascript
const invoice = isCreditCard ? 
                    createCreditCardInvoice() :
                    createCashInvoice();

// or better... 

if (isCreditCard) {
  const invoice = createCreditCardInvoice();
} else {
  const invoice = createCashInvoice();
}

// Even better with polymorphism...

const invoice = paymentMethod.createInvoice();
```

# Detection

[X] Automatic 

Linters can detect large code blocks

# Tags

- Bloaters

# Conclusion

No matter where you have long lines of code, you can always refactor into higher-level functional and shorter methods.

# Relations

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

# More Info

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Jens Lelie](https://unsplash.com/@madebyjens) on [Unsplash](https://unsplash.com/photos/u0vgcIOQG08)

Thanks, Cory 

[Twitter](https://twitter.com/1644774155642863616)
    
* * *

> The programs that live best and longest are those with short functions. You learn just how valuable all those little functions are. All of the payoffs of indirection—explanation, sharing, and choosing—are supported by small functions.

_Martin Fowler_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)