# Code Smell 104 - Assert True

![Code Smell 104 - Assert True](Code%20Smell%20104%20-%20Assert%20True.jpg)

*Asserting against booleans makes error tracking more difficult.*

> TL;DR: Don't assert true unless you are checking a boolean

# Problems

- Fail Fast Principle

# Solutions

1. Check if the boolean condition can be rewritten better

2. Favor assertEquals

# Context

When asserting to a boolean our test engines cannot help us very much. 

They just tell us something failed.

Error tracking gets more difficult.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/c54f0b1ee42d6a1aff640507e0bdf625)
```php
<?

final class RangeUnitTest extends TestCase {
 
  function testValidOffset() {
    $range = new Range(1, 1);
    $offset = $range->offset();
    $this->assertTrue(10 == $offset);    
    // No functional essential description :(
    // Accidental description provided by tests is very bad
  }  
}

// When failing Unit framework will show us
//
// 1 Test, 1 failed
// Failing asserting true matches expected false :(
// () <-- no business description :(
//
// <Click to see difference> - Two booleans
// (and a diff comparator will show us two booleans)
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/edf0b1c3339451662bb000055ef5d782)
```php
<?

final class RangeUnitTest extends TestCase {
 
  function testValidOffset() {
    $range = new Range(1, 1);
    $offset = $range->offset();
    $this->assertEquals(10, $offset, 'Pages must have 10 as offset');
    // Expected value should always be first argument
    // You add a functional essential description
    // to complement accidental description provided by tests
  }  
}

// When failing Unit framework will show us
//
// 1 Test, 1 failed
// Failing asserting 0 matches expected 10
// All pages must have 10 as offset <-- business description
//
// <Click to see difference> 
// (and a diff comparator will help us and it will be a great help
// for complex objects like objects or jsons)
```

# Detection

[X] Semi-Automatic 

Some linters warn us if we are checking against boolean after setting this condition.

We need to change it to a more specific check.

# Tags

- Test Smells

# Conclusion

Try to rewrite your boolean assertions and you will fix the failures much faster.

# Relations

[Code Smell 101 - Comparison Against Booleans](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20101%20-%20Comparison%20Against%20Booleans/readme.md)

[Code Smell 07 - Boolean Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2007%20-%20Boolean%20Variables/readme.md)

# More Info

- [Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Credits

Photo by [Joël de Vriend](https://unsplash.com/@joeldevriend) on [Unsplash](https://unsplash.com/s/photos/truth)  

* * *

> I've finally learned what 'upward compatible' means. It means we get to keep all our old mistakes.

_Dennie van Tassel_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)