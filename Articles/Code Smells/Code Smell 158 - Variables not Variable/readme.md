# Code Smell 158 - Variables not Variable

![Code Smell 158 - Variables not Variable](noah-buscher-txHP_Xkwjeo-unsplash.jpg)

*You assign a value to a variable and use it, but never change it*

> TL;DR: Be declarative on mutability.

# Problems

- Readability

- Honor the [Bijection](../../Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) mutability.

- Potential performance and memory issues. 

# Solutions

1. Change the variable to a constant and be clear on its scope

# Context

We are always learning from the domain.

Sometimes we guess that a value can change with the [MAPPER](../../Theory/What%20is%20(wrong%20with)%20software/readme.md).

Later on, we learn it won't change.

Therefore we need to promote it to a constant.

This will also avoid [Magic Constants](../../Code%20Smells/Code%20Smell%20%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

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

// Case is oversimplification as usual
```

# Detection

[X] Automatic 

Many linters check if the variable has just one assignment.

We can also perform mutation testing and try to modify the variable to see if tests break.

# Tags

- Mutability

# Conclusion

We must challenge ourselves and refactor when the variable scope is clear and we learn more about its properties and [mutability](../../Theory/The%20Evil%20Power%20of%20Mutants/readme.md). 

# Relations

[Code Smell 116 - Variables Declared With 'var'](../../Code%20Smells/Code%20Smell%20116%20-%20Variables%20Declared%20With%20'var'/readme.md)

[Code Smell 127 - Mutable Constants](../../Code%20Smells/Code%20Smell%20127%20-%20Mutable%20Constants/readme.md)

[Code Smell 107 - Variables Reuse](../../Code%20Smells/Code%20Smell%20107%20-%20Variables%20Reuse/readme.md)

[Code Smell 02 - Constants and Magic Numbers](../../Code%20Smells/Code%20Smell%20%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

# Refactorings

[Refactoring 003 - Extract Constant](../../Refactorings/Refactoring%20003%20-%20Extract%20Constant/readme.md)

# More Info

[The Evil Power of Mutants](../../Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Disclaimer

Code Smells are just my [opinion](../../Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Noah Buscher](https://unsplash.com/@noahbuscher) on [Unsplash](https://unsplash.com/s/photos/tied)  

* * *

> A complex system that works is invariably found to have evolved from a simple system that worked.

_John Gall_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)