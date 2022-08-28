# Code Smell 158 - Variables not Variable

![Code Smell 158 - Variables not Variable](Code%20Smell%20158%20-%20Variables%20not%20Variable.jpg)

*You assign a value to a variable and use it, but never change it*

> TL;DR: Be declarative on mutability.

# Problems

- Readability

- Honor the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) mutability.

- Potential performance and memory issues. 

# Solutions

1. Change [the variable to a constant](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20008%20-%20Convert%20Variables%20to%20Constant/readme.md) and be clear on its scope

# Refactorings

[Refactoring 003 - Extract Constant](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20003%20-%20Extract%20Constant/readme.md)

[Refactoring 008 - Convert Variables to Constant](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20008%20-%20Convert%20Variables%20to%20Constant/readme.md)

# Context

We are always learning from the domain.

Sometimes we guess that a value can change with the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

Later on, we learn it won't change.

Therefore we need to promote it to a constant.

This will also avoid [Magic Constants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/ab8aca666d5064bac5a4e8d096900138)
```php
<?php

function configureUser() {
  $password = '123456';
  // Setting a password on a variable is another vulnerability
  // And Code Smell
  $user = new User($password);
  // Notice Variable doesn't change
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/9649878302b3d66603b2cfdce2de87ba)
```php
<?php

define("USER_PASSWORD", '123456')

function configureUser() {  
  $user = new User(USER_PASSWORD);
}

// or 

function configureUser() {  
  $user = new User(userPassword());
}

function userPassword() : string {
  return '123456';
}

// Case is an oversimplification as usual
```

# Detection

[X] Automatic 

Many linters check if the variable has just one assignment.

We can also perform mutation testing and try to modify the variable to see if tests break.

# Tags

- Mutability

# Conclusion

We must challenge ourselves and refactor when the variable scope is clear and we learn more about its properties and [mutability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md). 

# Relations

[Code Smell 116 - Variables Declared With 'var'](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20116%20-%20Variables%20Declared%20With%20'var'/readme.md)

[Code Smell 127 - Mutable Constants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20127%20-%20Mutable%20Constants/readme.md)

[Code Smell 107 - Variables Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20107%20-%20Variables%20Reuse/readme.md)

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

# More Info

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Noah Buscher](https://unsplash.com/@noahbuscher) on [Unsplash](https://unsplash.com/s/photos/tied)  

* * *

> A complex system that works is invariably found to have evolved from a simple system that worked.

_John Gall_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)