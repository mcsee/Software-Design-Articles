# Code Smell 04 - String Abusers

![Code Smell 04 - String Abusers](Code%20Smell%2004%20-%20String%20Abusers.jpg)

*Too many parsing, exploding, regex, strcomp, strpos and string manipulation functions.*

> TL;DR: Use real abstractions and real objects instead of string accidental manipulation.

# Problems

- Complexity
- Readability
- Maintainability
- Lack of Abstractions

# Solutions

1) Work with objects instead.

2) Replace strings with data structures dealing with object relations.

3) Go back to Perl :) 

4) Find [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) problems between real objects and the strings.

# Examples

-Serializers

-Parsers

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/19b5965879d11e6c185d4591add24042)

```php
<?

$schoolDescription = 'College of Springfield';

preg_match('/[^ ]*$/', $schoolDescription, $results);
$location = $results[0]; // $location = 'Springfield'.

$school = preg_split('/[\s,]+/', $schoolDescription, 3)[0]; //'College'
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/9aea4a3d401b7e3c2e80101ff348dfa6)

```php
<?

class School {
    private $name;
    private $location;

    function description() {
        return $this->name . ' of ' . $this->location->name;
    }
}
```

# Detection

Automated detection is not easy. If code uses too many string functions it can trigger a warning.

# Relations

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 121 - String Validations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20121%20-%20String%20Validations/readme.md)

# More Info

# Tags

- Mapping

# Conclusion

Don't abuse strings. Favor real objects. Find absent protocol to distinguish them from strings.

# Credits

Photo by [Nathaniel Shuman](https://unsplash.com/@nshuman1291) on [Unsplash](https://unsplash.com/)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)