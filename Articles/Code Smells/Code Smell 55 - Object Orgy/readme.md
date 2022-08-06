# Code Smell 55 - Object Orgy

![Code Smell 55 - Object Orgy](1D6WXUHg0fTqfLwNJKVthcgD6WXUHg0fTqfLwNJKVthcg.jpeg)

*If you see your objects as data holders you will violate their encapsulation, but you shouldn't, as in real life, you should always ask for consent.*

> TL;DR: Don't mess with other object's data.

# Problems

- Information Hiding Violation

- Encapsulation Violation

- Coupling

# Solutions

1. Couple to interfaces and behavior, never data.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/ee56984fadcd35eb91b7e2617eec875a)
```php
<?

final class Point {
    public $x;
    public $y;
}

final class DistanceCalculator {
    function distanceBetween(Point $origin, Point $destination) {
        return sqrt((($destination->x - $origin->x) ^ 2) + (($destination->y - $origin->y) ^ 2));
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/4135a48a51ff4361359326f2d4b2076e)
```php
<?

final class Point {
    private $rho;
    private $theta;

    public function x() {
        return $this->rho * cos($this->theta);
    }

    public function y() {
        return $this->rho * sin($this->theta);
    }
}

final class DistanceCalculator {
    function distanceBetween(Point $origin, Point $destination) {

        return sqrt((($destination->x() - $origin->x() ^ 2) + (($destination->y() - $origin->y()) ^ 2)));
    }

}
```

# Detection

You can set your linters to warn you for public attributes, setters and getters usage and discourage them.

# Tags

- Coupling

# Conclusion

If your classes are polluted with setters, getters and public methods you will certainly have ways to couple to their accidental implementation.

# Also Known as

- Inappropriate intimacy

# Relations

[Code Smell 01 - Anemic Models](Code Smells\Code Smell  01 - Anemic Models)

[Code Smell 28 - Setters](Code Smells\Code Smell 28 - Setters)

# More info

- [Wikipedia](https://en.wikipedia.org/wiki/Object_orgy)

- [Refactoring.Guru](https://refactoring.guru/es/smells/inappropriate-intimacy)

- [C2 Wiki](http://wiki.c2.com/?InappropriateIntimacy)

# Credits

Picture by <a href="https://www.nationalgallery.org.uk/paintings/nicolas-poussin-a-bacchanalian-revel-before-a-term#">Nicolas Poussin</a> 

* * *

> A data structure is just a stupid programming language.

_Bill Gosper_
 
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()