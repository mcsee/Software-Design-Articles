# Code Smell 83 - Variables Reassignment

![Code Smell 83 - Variables Reassignment](Code%20Smell%2083%20-%20Variables%20Reassignment.jpg)

*Variable reuse is something we see in big chunks of code.*

> TL;DR: Don't reuse variable names. You break readability and refactor chances and gain nothing but laziness.

# Problems

- Readability

- Refactor chances

- Missed Optimization

- Mutability

- Garbage Collection Missed Opportunities

# Solutions

1. Define, use and dispose variables.

2. Keep your Definition, Usage and Destroy variables short.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/f97b6362fcfa4018e75d1d2ce9fc9169)

```python
class Item:
  def taxesCharged(self):
    return 1;

lastPurchase = Item('Soda');
# Do something with the purchase

taxAmount = lastPurchase.taxesCharged();
# Lots of stuff related to the purchase
# You drink the soda

# I cannot extract method from below without passing
# useless lastPurchase as parameter

# a few hours later..
lastPurchase = Item('Whisky');
# You bought another drink

taxAmount += lastPurchase.taxesCharged();
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/d5f970273099100449221f600cd7612f)

```python
class Item:
  def taxesCharged(self):
    return 1;
  
def buySupper():
  supperPurchase = Item('Soda');
  # Do something with the purchase
 
  # Lots of stuff related to the purchase
  # You drink the soda
  return supperPurchase;

def buyDrinks():
  # You could extract method! 

  # a few hours later..
  drinksPurchase = Item('Whisky');
  # You bough another drink
  
  return drinksPurchase;

taxAmount = buySupper().taxesCharged() + buyDrinks().taxesCharged();
```

# Detection

Many linters can warn us from reusing variables

# Tags

- Readability

# Conclusion

Reusing variables is a non-contextual copy and paste hint.

# Relations

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

# More Info

- [The Evil power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

- [Stack Exchange](https://softwareengineering.stackexchange.com/questions/115520/should-i-reuse-variables)

- [Wikiversity](https://en.wikiversity.org/wiki/Software_Design/Don%27t_reuse_a_variable)

# Credits

Photo by [Robby McCullough](https://unsplash.com/@mybbor) on [Unsplash](https://unsplash.com/s/photos/spiral)

[Twitter](https://x.com/1414832436547133440)

* * *

> Either way you look at it (DRY or laziness), the idea is the same: make your program flexible. When change comes (and it always does), you'll have a much easier time changing with it.

_Chris Pine_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)