# Refactoring 012 - Reify Associative Arrays
            
![Refactoring 012 - Reify Associative Arrays](Refactoring%20012%20-%20Reify%20Associative%20Arrays.jpg)

*Converting your anemic dictionaries is easy*

> TL;DR: Convert your key/value into full behavioral objects

# Problems Addressed

* [Associative arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2027%20-%20Associative%20Arrays/readme.md)
    
* Fail Fast principle violation
    
* [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault
    
* Hard to find method references
    
# Related Code Smells

[Code Smell 27 - Associative Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2027%20-%20Associative%20Arrays/readme.md) 

# Context

You have anemic associative arrays that hold unstructured data and you want to have richer objects with stricter controls (possibly including type checking in static typed languages)

# Steps
 
1. Find the references to the object or associative array
    
2. Reify it
    
3. Replace generic calls with [setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md) and [getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md) for every key (You also will be able to debug them better)
    
4. Add parameter and return type hinting to interfaces (if your language supports it)
    
5. Add stronger assertions on the setters between different keys.
    
(if you are using TCR, you can do baby refactoring steps)

# Sample Code

## Before

[Gist Url]: # (https://gist.github.com/mcsee/ca8de4d5b62f43e87002b6424de11d60)

```php
<?

class AuthenticationHelper extends Singleton {

  private $data = [];

  function setParameter(string $key, ?$value) {
    // no type checking
    // value as the name is too generic
    // Since SOME parameters might be null
    // You cannot check a single parameter for not null

    $this->data[$key] = value;
  }

  function getParameter(string $key) {
    // no return type hinting
    return $this->data[$key] ?? null;
  }

}

// Usages

AuthenticationHelper::getInstance->setParameter('oauth2_token', []);
// type error not caught

AuthenticationHelper::getInstance->setParameter('scopes', null);
// We need to enforce this not to be NULL

AuthenticationHelper::getInstance->setParameter('user', 'Elon');
// This should not mutate
// No validation with business rules

$credential =
  AuthenticationHelper::getInstance->getParameter('oauth2token');
// Typo not detected

// You can not easily find references to methods setting the oauth2_token
``` 

## After

[Gist Url]: # (https://gist.github.com/mcsee/d8c3cb918572138803015c91a0274d9d)

```php
<?

class AuthenticationCredentials {

  private $user;
  private $oauth2_token;
  
  function __construct(User $user) {
    $this->validateUser($user);
    // Specific validation rules
      
    $this->user = $user;
    // Cannot mutate 
  }

  function oauth2_token(string $token): void {
    // You can add specific validations
    $this->oauth2_token = $token;
  }

  function oauth2_token(): string {    
    // Return type hinting
    return $this->oauth2_token;
  }

}

// Usages

$credentials = new AuthenticationCredentials(new User('Elon'));
// Valid since creation
  
$credentials->oauth2_token([]);
// type errors are caught

$credentials->oauth2_token(null);
// cannot be null. Fail fast

$credentials->scope();
// Typo detected
``` 

Now, you have an anemic data class or [DTO](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md). It is time to give it behavior and (possibly) remove some getters and setters.

# Type

[X] Semi-Automatic

You can perform this refactor with the aid of an IDE.

# Safety

This is not an automatic refactoring but small steps are safe if you have good coverage.

# Why is code better?

Your new object fails fast and is more declarative.

You can debug it easily and find the referencing methods.

# Limitations

In dynamically typed languages you cannot enforce type or domain restrictions for the values

# Tags

- Anemic
    
# Related Refactorings

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md) 

# See also

[Code Smell 27 - Associative Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2027%20-%20Associative%20Arrays/readme.md) 

# Credits

Image from [MustangJoe](https://pixabay.com/users/mustangjoe-2162920/) en [Pixabay](https://pixabay.com/)

---

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles//readme.md)