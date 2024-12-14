# Code Smell 44 - Magic Corrections

![Code Smell 44 - Magic Corrections](Code%20Smell%2044%20-%20Magic%20Corrections.jpg)

*Compilers are smarter than us. On a Friday night production deploy they betray us.*

> TL;DR: Avoid magic coercions by all means

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

<!-- [Gist Url](https://gist.github.com/mcsee/e86fe7a699dd825c3f238c6073b5e7ea) -->

```php
<?

new Date(31, 02, 2020);

1 + 'Hello';

!3;

// Valid on most languages
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/4daf2c3a710dfe5b647ec871d1d10ca8) -->

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

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 84 - Max < Min (Javascript)](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2084%20-%20Max%20%20Min%20(Javascript)/readme.md)

# More Info

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Credits

Photo by [Senor Sosa](https://unsplash.com/@senor_sosa) on [Unsplash](https://unsplash.com/s/photos/hacker)

* * *

> Hackers are arrogant geek romantics. They lack the attentive spirit of inquiry.     

_Bruce Sterling_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)