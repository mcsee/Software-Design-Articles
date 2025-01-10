# Code Smell 121 - String Validations

![Code Smell 121 - String Validations](Code%20Smell%20121%20-%20String%20Validations.jpg)

*You need to validate strings. So you don't need strings at all*

> TL;DR: Search for missing domain objects when validating strings.

# Problems

- Primitive obsession.

- [Bijection Fault](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

- Validated strings are a subset of all possible strings.

- [Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) principle violation.

- Single Responsibility Principle violation.

- DRY Principle Violation.

# Solutions

1. Create a first-class object representing the concept under the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

# Context

Serious software has lots of string validations.

Often, They are not in the correct places.

This leads to non-robust and corrupt software.

The simple solution is to build only real-world and valid abstractions.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/1b6799dac071ce8bd2a1082dfdbd668d) -->

```php
<?

// First Example: Address Validation
class Address { 
  function __construct(string $emailAddress) {
     // String validation on Address class violates 
     // Single Resposnibility Principle
     $this->validateEmail($emailAddress);
     // ...
   }
  
  private function validateEmail(string $emailAddress) {
    $regex = "/[a-zA-Z0-9_-.+]+@[a-zA-Z0-9-]+.[a-zA-Z]+/";
    // Regex is a sample / It might be wrong
    // Emails and Urls should be first class objects

    if (!preg_match($regex, $emailAddress))
    {
      throw new Exception(
        'Invalid email address ' . emailAddress);
    }    
  }
}

// Second Example: Wordle

class Wordle { 
  function validateWord(string $wordleword) {
    // Wordle word should be a real-world entity. 
    // Not a subset of strings
  }
 }
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/d2eace32ecb9f7564ebeaf8136118f53) -->

```php
<?

// First Example: Address Validation
class Address { 
  function __construct(EmailAddress $emailAddress) {
     // Email is always valid / Code is cleaner
     // ...
   }
}
  
class EmailAddress { 
  // You can reuse this object many times avoiding copy-pasting
  string $address; 
  private function __construct(string $emailAddress) {
    $regex = "/[a-zA-Z0-9_-.+]+@[a-zA-Z0-9-]+.[a-zA-Z]+/";
    // Regex is a sample / It might be wrong
    // Emails and Urls are first class objects

    if (!preg_match($regex, $emailAddress))
    {
      throw new Exception('Invalid email address ' . emailAddress);
    }   
    $this->address = $emailAddress;
  }
}

// Second Example: Wordle

class Wordle { 
  function validateWord(WordleWord $wordleword) {
    // Wordle word is a real-world entity. Not a subset of string
  }
 }

class WordleWord { 
  function __construct(string $emailAddress) {
    // Avoid building invalid world words
    // For example length != 5
  }
 }
```

# Detection

[X] Semi-Automatic 

We can check all constructors validating strings and [reify](https://en.wikipedia.org/wiki/Reification_(computer_science)) the missing concepts.

# Tags

- Primitive Obsession

# Conclusion

Small objects are hard to find.

Primitive obsessors [always complain](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md) about this kind of indirections.

Creating these new small concepts keeps our model loyal to the bijection and ensures our models are always healthy.

# Relations

[Code Smell 41 - Regular Expression Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2041%20-%20Regular%20Expression%20Abusers/readme.md)

[Code Smell 04 - String Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2004%20-%20String%20Abusers/readme.md)

# More Info

- [The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

- [How to Develop a Wordle Game](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Wordle/How%20to%20Develop%20a%20Wordle%20Game%20using%20TDD%20in%2025%20Minutes/readme.md)

- [Object Reification](https://en.wikipedia.org/wiki/Reification_(computer_science))

# Credits

Photo by [Brett Jordan](https://unsplash.com/@brett_jordan) on [Unsplash](https://unsplash.com/s/photos/letters)
  
* * *

> Less than 10% of the code has to do with the ostensible purpose of the system; the rest deals with input-output, data validation, data structure maintenance, and other housekeeping.

_Mary Shaw_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)