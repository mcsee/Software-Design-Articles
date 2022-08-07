# Code Smell 102 - Arrow Code

![Code Smell 102 - Arrow Code](greater-than-g750acc9a1_1280.png)

*Nested IFs and Elses are very hard to read and test*

> TL;DR: Avoid nested IFs. Even Better: Avoid ALL IFs

# Problems

- Readability 

# Solutions

1. Extract Method

2. Combine Boolean Conditions

3. Remove accidental IFs

# Context

In procedural code, it is very common to see complex nested ifs. This solution is more related to scripting than object-oriented programming.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/0313b55715cf050e4eadb80e7b0ffad2)
```javascript
if (actualIndex < totalItems)
    {
      if (product[actualIndex].Name.Contains("arrow"))
      {
        do
        {
          if (product[actualIndex].price == null)
          {
            // handle no price
          }
          else
          {
            if (!(product[actualIndex].priceIsCurrent()))
            {
              // add price
            }
            else
            {
              if (!hasDiscount)
              {
                // handle discount
              }
              else
              {
                // etc
              }
            }
          }
          actualIndex++;
        }
        while (actualIndex < totalCounf && totalPrice < wallet.money);
      }
      else
        actualIndex++;
    }
    return actualIndex;
  }  
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/a01fc3411e8aff647a2ff0812f313318)
```javascript
foreach (products as currentProduct)
  addPriceIfDefined(currentProduct)

addPriceIfDefined() 
{
  // Several extracts
}
```

# Detection

[X] Automatic 

Since many linters can parse trees, we can check on compile-time for nesting levels.

# Tags

- Readability

- Complexity

# Conclusion

Following [uncle bob's advice](https://learning.oreilly.com/library/view/97-things-every/9780596809515/ch08.html), we should leave the code cleaner than we found it.

Refactoring this problem is easy.

# Relations

[Code Smell 78 - Callback Hell](../../Code%20Smells/Code%20Smell%2078%20-%20Callback%20Hell/readme.md)

[Code Smell 03 - Functions Are Too Long](../../Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 36 - Switch/case/elseif/else/if statements](../../Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

# More Info

- [C2 Wiki](http://wiki.c2.com/?ArrowAntiPattern)

- [Flattening Arrow Code](https://blog.codinghorror.com/flattening-arrow-code/)

- [Refactoring.com](https://refactoring.com/catalog/replaceNestedConditionalWithGuardClauses.html)

* * *

> The purpose of software engineering is to control complexity, not to create it.

_Pamela Zave_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)