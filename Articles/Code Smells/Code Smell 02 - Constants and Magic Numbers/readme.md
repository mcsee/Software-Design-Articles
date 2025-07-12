# Code Smell 02 - Constants and Magic Numbers

![Code Smell 02 - Constants and Magic Numbers](Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers.jpg)

*A method makes calculations with lots of numbers without describing their semantics*

> TL;DR: Avoid Magic numbers without explanation.  We don't know their source and we are very afraid of changing them.

# Problems 😔 

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Low testability

- Low readability

# Solutions 😃

1) Rename the constant with a semantic and name (meaningful and intention revealing).

2) Replace constants with parameters, so you can mock them from the outside.

3) The constant definition is often a different object than the constant (ab)user.

# Examples

- Algorithms Hyper Parameters

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/dec9856bf69a06c367d2e683b179577a) -->

```php
<?

function energy($mass) {
    return $mass * (299792 ** 2)
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/2e4c88a516078500ce833dbfbd3d9b0e) -->

```ruby
# Storing magnitudes without units is another smell
class PhysicsConstants
   LIGHT_SPEED = 299792458.freeze
end

def energy(mass)
    mass * PhysicsConstants::LIGHT_SPEED ** 2
end
```
												    
# Detection 🔍

Many linters can detect number literals in attributes and methods.

# Tags 🏷️

- Declarative Code

# Conclusion 🏁
 
You should address and remove your magic numbers to safeguard your code's readability, maintainability, and testability. 

Clear, semantic naming and decoupling constants from their consumers are essential steps toward crafting cleaner, more resilient software. 

Every magic number you replace with intention-revealing logic is a step away from brittle code and closer to robust, professional craftsmanship. 

Don't let numbers dictate your code; define their purpose and context instead.
		
# Relations 👩‍❤️‍💋‍👨

[Code Smell 158 - Variables not Variable](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20158%20-%20Variables%20not%20Variable/readme.md)

[Code Smell 127 - Mutable Constants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20127%20-%20Mutable%20Constants/readme.md)

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 162 - Too Many Parentheses](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20162%20-%20Too%20Many%20Parentheses/readme.md)

[Code Smell 198 - Hidden Assumptions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20198%20-%20Hidden%20Assumptions/readme.md)

[Code Smell 202 - God Constant Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20202%20-%20God%20Constant%20Class/readme.md)

# More Information 📕

[Refactoring Guru](https://refactoring.guru/es/replace-magic-number-with-symbolic-constant)

[How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)

# Credits 🙏

Photo by [Kristopher Roller](https://unsplash.com/@krisroller) on [Unsplash](https://unsplash.com/s/photos/magic)

* * *

> In a purely functional program, the value of a [constant] never changes, and yet, it changes all the time! A paradox!

_Joel Spolsky_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)