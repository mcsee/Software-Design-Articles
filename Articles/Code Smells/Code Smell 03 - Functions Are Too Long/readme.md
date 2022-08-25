# Code Smell 03 - Functions Are Too Long

![Code Smell 03 - Functions Are Too Long](Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long.jpg)

*Humans get bored beyond line 10.*

> TL;DR: Refactor and extract functions longer than 5 lines.

# Problems

- Low Cohesion
- High coupling
- Difficult to read
- Low Reuse

# Solutions

1) Refactor

2) Create small objects dealing with some tasks. Unit test them.

3) Compose methods 

# Examples

- Libraries

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/1f12fb2d0cb9f8eea202526597cf4b83)
```php
<?

function setUpChessBoard() {
    $this->placeOnBoard($this->whiteTower);
    $this->placeOnBoard($this->whiteKnight);
    // A lot of lines more
    
    // Empty space to pause definition
    $this->placeOnBoard($this->blackTower);
    $this->placeOnBoard($this->blackKnight);
    // A lot of more lines
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/0f66ce8c2bba8990e44a36495fa4c3e1)
```php
<?

function setUpChessBoard() {
    $this->placeWhitePieces();
    $this->placeBlackPieces();
}
```

# Detection
All linters can measure and warn when methods are larger than a predefined threshold.

# Relations

-[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

# More info

- [Refactoring Guru](https://refactoring.guru/es/smells/long-method)

# Tags

- Complexity

# Conclusion

Extract long method into smaller pieces. Break complex algorithms in parts. You can also unit test these parts.

# Also Known as

- Long Method

# Credits

Photo by [Hari Panicker](https://unsplash.com/@invisibleecho) on [Unsplash](https://unsplash.com/s/photos/long-road)

* * *

> Programs are meant to be read by humans and only incidentally for computers to execute.

_Donald Knuth_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)