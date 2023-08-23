# Code Smell 93 - Send me Anything

![Code Smell 93 - Send me Anything](Code%20Smell%2093%20-%20Send%20me%20Anything.jpg)

*Magic functions that can receive a lot of different (and not polymorphic arguments)*

> TL;DR: Create a clear contract. Expect just one protocol.

# Problems

- Fail Fast principle violation

- Error prune

- Readability

- [If polluting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

- [Nulls](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

- Bad Cohesion

# Solutions

1. Take just one "kind" of input

2. Arguments should adhere to a single protocol.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/d6efbffa513dae1c59059439c64eea1b)
```php
<?

function parseArguments($arguments) {
    $arguments = $arguments ?: null;
    // Always the billion-dollar mistake (null)
    if (is_empty($arguments)) {
        $this->arguments = http_build_query($_REQUEST);
        // Global coupling and side effects
    } elseif (is_array($arguments)) {
        $this->arguments = http_build_query($arguments);
    } elseif (!$arguments) { // null unmasked
        $this->arguments = null;
    } else {
        $this->arguments = (string)$arguments;
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/7876a9b6bacf55a72abcaf5e2ca2e008)
```php
<?

function parseArguments(array $arguments) {
    $this->arguments = http_build_query(arguments)    
}
```

# Detection

We can detect this kind of method when they do different things, asking for the argument *kind*

# Tags

- If Polluter

# Conclusion

Magic castings and flexibility have a price. They put the rubbish under the rug and violate the fail fast principle.

# Relations

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md)

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

# Credits

Photo by [Hennie Stander](https://unsplash.com/@henniestander) on [Unsplash](https://unsplash.com/s/photos/juggler)
  

* * *

> Referential transparency is a very desirable property: it implies that functions consistently yield the same results given the same input, irrespective of where and when they are invoked.

_Edward Garson_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)