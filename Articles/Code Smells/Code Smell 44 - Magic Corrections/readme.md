# Code Smell 44 - Magic Corrections

![Code Smell 44 - Magic Corrections](senor-sosa-JnCzJcjsAJQ-unsplash.jpg)

*Compilers are smarter than us. On a Friday night production deploy they betray us.*

# Problems

- Fail Fast

- Declarativeness

- Ambiguity

# Solutions

1. Fail Fast

2. Do not trust magic coercion.

3. Be Explicit

# Examples

- Type Casting

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/e86fe7a699dd825c3f238c6073b5e7ea)
```php
<?

new Date(31, 02, 2020);

1 + 'Hello';

!3;

// Valid on most languages
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/4daf2c3a710dfe5b647ec871d1d10ca8)
```php
<?

new Date(31, 02, 2020);
// Throw an exception

1 + 'Hello';
// Type Mismatch

!3;
// Negating is a boolean operation
```

# Detection

Many of this vicious are encouraged by languages themselves. 

We should be very declarative and explicit and don't abuse language accidental magic solutions.
 
# Tags

- Declarative

- Smart

# Conclusion

Programmers pretend to be smart by exploiting language features.

They feel they belong to *community standards* that enforce bad behaviors like a sect.

# Relations

[Code Smell 06 - Too Clever Programmer](Code Smells\Code Smell 06 - Too Clever Programmer)

# More Info

[Fail Fast](Theory\Fail Fast)

# Credits

Photo by [Senor Sosa](https://unsplash.com/@senor_sosa) on [Unsplash](https://unsplash.com/s/photos/hacker)

* * *

> Hackers are arrogant geek romantics. They lack the attentive spirit of inquiry.     

_Bruce Sterling_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()