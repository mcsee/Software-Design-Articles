# Code Smell 19 - Optional Arguments

![Code Smell 19 - Optional Arguments](Code%20Smell%2019%20-%20Optional%20Arguments.jpg)

*Disguised as a friendly shortcut is another coupling smell.*

> TL;DR: Optional Arguments generate a hidden coupling in the name of smaller code.

# Problems

-  Coupling

- Unexpected results

- Side effects

- Ripple Effect

- In languages with optional arguments but limited to basic types, we need to set a flag and add an accidental IF (another smell).

# Solutions

1. Make arguments explicit.

2. All function calls must the have same [arity](https://en.wikipedia.org/wiki/Arity).

3. Use *Named Parameters* if your language supports them.
 
# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/66738047685e798a4e4008e291dcff70)

```php
<?

final class Poll {
    
    function _construct(
        array $questions,
        bool $annonymousAllowed = false,
        $validationPolicy = 'Normal') {
        
        if ($validationPolicy == 'Normal') {
          $validationPolicy = new NormalValidationPolicy();
        }
        // ...
    }
}

// Valid
new Poll([]);
new Poll([], true);
new Poll([], true , new NormalValidationPolicy());
new Poll([], , new StrictValidationPolicy());
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/559b802e5a6a0e1aa432e594fe5f28dc)

```php
<? 

final class Poll {
    
    function _construct(
        array $questions,
        AnonnyomousStrategy $annonymousStrategy,
        ValidationPolicy $validationPolicy) {
        // ...
    }
}

// invalid
new Poll([]);
new Poll([], new NoAnonnyomousValidStrategy());
new Poll([], , new StrictValidationPolicy());

// Valid
new Poll(
    [], 
    new NoAnonnyomousValidStrategy(), new StrictValidationPolicy()
);
```

# Detection

Detection is easy if the language supports optional arguments.
 
# Tags

- Optional

- Laziness

# Conclusion

Be explicit. Favor readability over shorter (and more coupled) function calls.

# Relations

[Code Smell 172 - Default Argument Values Not Last](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20172%20-%20Default%20Argument%20Values%20Not%20Last/readme.md)

[Code Smell 42 - Warnings/Strict Mode Off](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2042%20-%20Warnings%20Strict%20Mode%20Off/readme.md)
 
# More Info

- [Function Arity](https://en.wikipedia.org/wiki/Arity)

- [Decoupling a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)

[How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)

* * *

>  The trouble with programmers is that you can never tell what a programmer is doing until it’s too late. 

_Seymour Cray_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)