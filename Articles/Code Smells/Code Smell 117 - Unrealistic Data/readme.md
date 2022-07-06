# Code Smell 117 - Unrealistic Data

![Code Smell 117 - Unrealistic Data](hofmann-natalia-lxrkrBx-c_o-unsplash.jpg)

*Programmers are lazy and seldom try to learn from real business domains*

> TL;DR: Use real case scenarios and real data (when possible)

# Problems

- [Bijection](Theory\The One and Only Software Design Principle) Violation

- Bad test use cases

- Readability

# Solutions

1. Change test data for a real one.

2. Use [MAPPER](Theory\The One and Only Software Design Principle) to map real entities and real data.

# Context

In the past, developers used to fake domain data.

We considered [Hello Word](TDD\We Should Get Rid of HelloWorld Forever💩) a good practice and we tested with abstract data.

We developed using a [waterfall model](https://en.wikipedia.org/wiki/Waterfall_model) very far from real users.

With bijection and MAPPER techniques, DDD and [TDD](TDD Conference 2021\TDD Conference 2021 - All Talks), [user acceptance testing](https://en.wikipedia.org/wiki/Acceptance_testing) became more important.

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

# Tags

- Testing

# Conclusion

Code comments are a [code smell](Code Smells\Code Smell 05 - Comment Abusers).

Reading tests is the only way to learn how the software behaves.

We need to be extra explicit on our tests.

# Exceptions

On some domains and under regulation we cannot use real data. 

We should fake it with meaningful data.

# Relations

[Code Smell 05 - Comment Abusers](Code Smells\Code Smell 05 - Comment Abusers)

# More Info

- [Given/Then/When](https://en.wikipedia.org/wiki/Given-When-Then)

- [MAPPER](Theory\The One and Only Software Design Principle)

# Credits

Photo by [Hofmann Natalia](https://unsplash.com/@natali333) on [Unsplash](https://unsplash.com/s/photos/surreal)

Thanks to [Curtis Einsmann](https://twitter.com/curtiseinsmann/status/1487118139196420099)
  
* * *

> You do not really understand something unless you can explain it to your grandmother.

_Albert Einstein_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)