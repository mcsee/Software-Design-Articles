# Code Smell 117 - Unrealistic Data

![Code Smell 117 - Unrealistic Data](Code%20Smell%20117%20-%20Unrealistic%20Data.jpg)

*Programmers are lazy and seldom try to learn from real business domains*

> TL;DR: Use real case scenarios and real data (when possible)

# Problems

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Violation

- Bad test use cases

- Readability

# Solutions

1. Change test data for a real one.

2. Use [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) to map real entities and real data.

# Context

In the past, developers used to fake domain data.

We considered [Hello Word](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/We%20Should%20Get%20Rid%20of%20HelloWorld%20Forever/readme.md) a good practice and we tested with abstract data.

We developed using a [waterfall model](https://en.wikipedia.org/wiki/Waterfall_model) very far from real users.

With bijection and MAPPER techniques, DDD and [TDD](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD%20Conference%202021/TDD%20Conference%202021%20-%20All%20Talks/readme.md), [user acceptance testing](https://en.wikipedia.org/wiki/Acceptance_testing) became more important.

Using Agile methodologies, we need to test with real-world data.

If we find an error in a production system, we need to add a case covering the exact mistake with real data.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/d9b312e97d7233738ea06f322ae41da1)
```python
class BookCartTestCase(unittest.TestCase):
    def setUp(self):
        self.cart = Cart()

    def test_add_book(self):
       self.cart.add_item('xxxxx', 3, 10)
        # This is not a real example
       self.cart.emailAddress('sarsasa')
        # This is not a real email

       self.assertEqual(self.cart.total, 30, msg='Book Cart total not correct after adding books')
       self.assertEqual(self.cart.items['xxxxx'], 3, msg='Quantity of items not correct after adding book')
 
    def test_remove_item(self):
        self.cart.add_item('fgdfhhfhhh', 3, 10)
        self.cart.remove_item('fgdfhhfhrhh', 2, 10)    
        # We made a typo since example is not a real one
        self.assertEqual(self.cart.total, 10, msg='Book Cart total not correct after removing book')
        self.assertEqual(self.cart.items['fgdfhhfhhh'], 1, msg='Quantity of books not correct after removing book')
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/539d4699db494d180219620b7baeedea)
```python
class BookCartTestCase(unittest.TestCase):
    def setUp(self):
        self.cart = Cart()

    def test_add_book(self):
       self.cart.add_item('Harry Potter', 3, 10)
       self.cart.emailAddress('seller@example.com')
       
       self.assertEqual(self.cart.total, 30, msg='Book Cart total not correct after adding books')
       self.assertEqual(self.cart.items['Harry Potter'], 3, msg='Quantity of items not correct after adding book')

    # We don't reuse same example.
    # We use a new REAL book
    def test_remove_item(self):
        self.cart.add_item('Divergent', 3, 10)
        self.cart.remove_item('Divergent', 2, 10)    
        self.assertEqual(self.cart.total, 10, msg='Book Cart total not correct after removing book')
        self.assertEqual(self.cart.items['Divergent'], 1, msg='Quantity of books not correct after removing book')

```

# Detection

[X] Manual

This is a semantic smell.

# Exceptions

On some domains and under regulation we cannot use real data. 

We should fake it with meaningful data.

# Tags

- Testing

# Conclusion

Code comments are a [code smell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20%2005%20-%20Comment%20Abusers/readme.md).

Reading tests is the only way to learn how the software behaves.

We need to be extra explicit on our tests.

# Relations

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20%2005%20-%20Comment%20Abusers/readme.md)

# More Info

- [Given/Then/When](https://en.wikipedia.org/wiki/Given-When-Then)

- [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

# Credits

Photo by [Hofmann Natalia](https://unsplash.com/@natali333) on [Unsplash](https://unsplash.com/s/photos/surreal)

Thanks to [Curtis Einsmann](https://twitter.com/curtiseinsmann/status/1487118139196420099)
  
* * *

> You do not really understand something unless you can explain it to your grandmother.

_Albert Einstein_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)