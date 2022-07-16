# Code Smell 03 - Functions Are Too Long

![Code Smell 03 - Functions Are Too Long](hari-panicker-gtO2A1RGpJk-unsplash.jpg)

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

-[Code Smell 102 - Arrow Code](Code Smells\Code Smell 102 - Arrow Code)

# Also Known as

- Long Method

# More info

- [Refactoring Guru](https://refactoring.guru/es/smells/long-method)

# Tags

- Complexity

# Conclusion

Extract long method into smaller pieces. Break complex algorithms in parts. You can also unit test these parts.

# Credits

Photo by [Hari Panicker](https://unsplash.com/@invisibleecho) on [Unsplash](https://unsplash.com/s/photos/long-road)

* * *

> Programs are meant to be read by humans and only incidentally for computers to execute.

_Donald Knuth_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()