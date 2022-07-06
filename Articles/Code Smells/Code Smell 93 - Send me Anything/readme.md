# Code Smell 93 - Send me Anything

![Code Smell 93 - Send me Anything](Hesxdr1U4.webp)

*Magic functions that can receive a lot of different (and not polymorphic arguments)*

> TL;DR: Create a clear contract. Expect just one protocol.

# Problems

- Fail Fast principle violation

- Error prune

- Readability

- [If polluting](Theory\How to Get Rid of Annoying IFs Forever)

- [Nulls](Theory\Null - The Billion Dollar Mistake)

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
    // Always the billion-dollar mistake
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
    $this->arguments = $arguments;
    // much cleaner, isn't it ?
}
```

# Detection

We can detect this kind of methods when they do different things, asking for the argument *kind*

# Tags

- If Polluter

# Conclusion

Magic castings and flexibility have a price. They put the rubbish under the rug and violate fail fast principle.

# Relations

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](Code Smells\Code Smell 69 - Big Bang (JavaScript Ridiculous Castings))

[Code Smell 06 - Too Clever Programmer](Code Smells\Code Smell 06 - Too Clever Programmer)

[Code Smell 12 - Null](Code Smells\Code Smell 12 - Null)

# Credits

Photo by [Hennie Stander](https://unsplash.com/@henniestander) on [Unsplash](https://unsplash.com/s/photos/juggler)
  

* * *

> Referential transparency is a very desirable property: it implies that functions consistently yield the same results given the same input, irrespective of where and when they are invoked.

_Edward Garson_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)