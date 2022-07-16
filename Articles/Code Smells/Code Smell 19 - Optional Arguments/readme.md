# Code Smell 19 - Optional Arguments

![Code Smell 19 - Optional Arguments](xcoyoteP201.jpg)

*Disguised as a friendly shortcut is another coupling smell.*

> TL;DR: Optional Arguments generate a hidden coupling in the name of smaller code.

# Problems

-  Coupling

- Unexpected results

- Side effects

- Ripple Effect

- In languages with optional arguments but limited to basic types, we need to set a flag and add an accidental IF (another smell).

# Solutions

1.  Make arguments explicit.
2.  All function calls must have same [arity](https://en.wikipedia.org/wiki/Arity).
3. Use *Named Parameters* if your language supports them.
 
# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/66738047685e798a4e4008e291dcff70)
```php
<?

final class Poll {
    
    function _construct(array $questions, bool $annonymousAllowed = false, $validationPolicy = 'Normal') {
        
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
new Poll([], new NoAnonnyomousValidStrategy(), new StrictValidationPolicy());
```

# Detection

Detection is easy if language supports optional arguments.
 
# Tags

- Optional

- Laziness

# Conclusion

Be explicit. Favor readability over shorter (and more coupled) function call.
 
# More info

- [Function Arity](https://en.wikipedia.org/wiki/Arity)

- [Decoupling a Legacy System](Theory\How to Decouple a Legacy System)

[How to Decouple a Legacy System](Theory\How to Decouple a Legacy System)

* * *

>  The trouble with programmers is that you can never tell what a programmer is doing until it’s too late. 

_Seymour Cray_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()