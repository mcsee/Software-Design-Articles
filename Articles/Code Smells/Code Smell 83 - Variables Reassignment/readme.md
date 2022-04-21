# Code Smell 83 - Variables Reassignment

*Variable reuse is something we see in big chunks of code.*

![Code Smell 83 - Variables Reassignment](robby-mccullough-DtzJFYnFPJ8-unsplash.jpg)

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
  def __init__(self, name):
    self.name = name
  def taxesCharged(self):
    return 1;
class Money:
  pass 

lastPurchase = Item('Soda');
# Do something with the purchase

taxAmount = lastPurchase.taxesCharged();
# Lots of stuff related to the purchase
# I drink the soda

# I cannot extract method from below without passing
# useless lastPurchase as parameter

# a few hours later..
lastPurchase = Item('Whisky');
# I bough another drink

taxAmount += lastPurchase.taxesCharged();
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/d5f970273099100449221f600cd7612f)
```python
class Item:
  def __init__(self, name):
    self.name = name
  def taxesCharged(self):
    return 1;
class Money:
  pass 
  
def buySupper():
  supperPurchase = Item('Soda');
  # Do something with the purchase
 
  # Lots of stuff related to the purchase
  # I drink the soda
  return supperPurchase;

def buyDrinks():
  # I could extract method! 

  # a few hours later..
  drinksPurchase = Item('Whisky');
  # I bough another drink
  
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

[Code Smell 03 - Functions Are Too Long](https://maximilianocontieri.com/code-smell-03-functions-are-too-long)

# More Info

- [The Evil power of Mutants](https://maximilianocontieri.com/the-evil-powers-of-mutants)

- [Stack Exchange](https://softwareengineering.stackexchange.com/questions/115520/should-i-reuse-variables)

- [Wikiversity](https://en.wikiversity.org/wiki/Software_Design/Don%27t_reuse_a_variable)

# Credits

Photo by [Robby McCullough](https://unsplash.com/@mybbor) on [Unsplash](https://unsplash.com/s/photos/spiral)

[Twitter](https://twitter.com/1414832436547133440)

* * *

> Either way you look at it (DRY or laziness), the idea is the same: make your program flexible. When change comes (and it always does), you'll have a much easier time changing with it.

_Chris Pine_
 
[Software Engineering Great Quotes](Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://maximilianocontieri.com/how-to-find-the-stinky-parts-of-your-code)