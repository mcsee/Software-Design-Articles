# Code Smell 231 - Redundant Data
            
![Code Smell 231 - Redundant Data](Code%20Smell%20231%20-%20Redundant%20Data.jpg)

*Where are your sources of truth?*

> TL;DR: Say it only once

# Problems

- Don't Repeat Yourself principle violation

- Consistency problems

- Maintainability

- Testing and Debugging

# Solutions

1. Keep the responsibilities to relevant objects and delegate to a single source of truth

# Context

The principle of "Don't Repeat Yourself" (DRY) encourages you to avoid redundancy and duplication of behavior.

Redundant data can lead to inconsistencies because updates or changes need to be made in multiple places. 

If you update one instance of the data and forget to update another, your system can become inconsistent, which can lead to errors and unexpected behavior.

Maintaining redundant data can be a nightmare when it comes to making changes or updates since It increases the workload and the likelihood of introducing errors during maintenance. 

With a single source of truth, you only need to make changes in one place, simplifying the maintenance process.

When data is repeated in multiple places, it becomes difficult to identify the authoritative source of that data, leading to confusion for developers.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/49c09f2dd730d321372e3bbab37feb5f) -->

```python
class Transfer:
    def __init__(self, amount, income, expense):
        self.amount = amount
        self.income = income
        self.expense = expense

class Income:
    def __init__(self, amount):
        self.amount = amount
        # amount is the same for party and counterparty

class Expense:
    def __init__(self, amount):
        self.amount = amount

transfer_amount = 1000  
# simplification: should be a money object with the currency

income = Income(transfer_amount)
expense = Expense(transfer_amount)
transfer = Transfer(transfer_amount, income, expense)

print("Transfer amount:", transfer.amount)
print("Income amount:", transfer.income.amount)
print("Expense amount:", transfer.expense.amount)
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/9574b28e226eed4436d571abb5b1f59e) -->

```python
class Transfer:
    def __init__(self, amount):
        self.amount = amount
        self.income = Income(self)
        self.expense = Expense(self)

class Income:
    def __init__(self, transfer):
        self.transfer = transfer

    def get_amount(self):
        return self.transfer.amount

class Expense:
    def __init__(self, transfer):
        self.transfer = transfer

    def get_amount(self):
        return self.transfer.amount

transfer_amount = 1000  
transfer = Transfer(transfer_amount)

print("Transfer amount:", transfer.amount)
print("Income amount:", transfer.income.get_amount())
print("Expense amount:", transfer.expense.get_amount())
```

# Detection

[X] Manual

This is a semantic smell

# Exceptions

- For performance issues, you can add [caches](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2049%20-%20Caches/readme.md) and redundancy, but you need extra effort to keep the data synchronized

# Tags

- Data

# Conclusion

In larger and more complex systems, redundancy becomes a significant problem. 

As your system grows, the challenges associated with maintaining and synchronizing redundant data also increase.

Redundant data also increases the surface area for testing and debugging.

You need to ensure that all copies of the data behave consistently, which can be a challenging task.

# Relations

[Code Smell 49 - Caches](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2049%20-%20Caches/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Jørgen Håland](https://unsplash.com/@jhaland) on [Unsplash](https://unsplash.com/photos/a-couple-of-sheep-standing-on-top-of-a-grass-covered-field-4yOgRb_b_i4)  
  
* * *

> Everything will ultimately fail. Hardware is fallible, so we add redundancy. This allows us to survive individuals hardware failures, but increases the likelihood of having at least one failure at any given time.

_Michael Nygard_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)