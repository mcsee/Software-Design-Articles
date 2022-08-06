# Code Smell 68 - Getters

![Code Smell 68 - Getters](vidar-nordli-mathisen-cSsvUtTVr0Q-unsplash.jpg)

*Getting things is widespread and safe. But it is a very bad practice.*

# Problems

- Naming

- Information Hiding

- Coupling

- Encapsulation Violation

- Mutability

- Anemic Models

# Solutions

1.  Avoid Getters

2. Use domain names instead

3. Protect your implementation decisions.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/39d40cf2f0d4159c95d90243c59a4df5)
```php
<?php

final class Window {
    public $width;
    public $height;
    public $children;

    public function getWidth() {
        return $this->width;
    }

    public function getArea() {
        return $this->width * $this->height;
    }

    public function getChildren() {
        return $this->children;
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/cd465eb9ca4f2771fb3dc5e30dc491cc)
```php
<?php

final class Window {
    private $width;
    private $height;
    private $children;

    public function width() {
        return $this->width;
    }

    public function area() {
        return $this->height * $this->width;
    }

    public function addChildren($aChild) {
        // Do not expose internal attributes
        return $this->children[] = $aChild;
    }
}
```

# Detection

Getters coincide in certain scenarios with a true responsibility. It will be reasonable for a window to return its color and it may accidentally store it as color. so a *color()* method returning the attribute color might be a good solution.

*getColor()* breaks [bijection](Theory\The One and Only Software Design Principle) since it is implementative and has no real counterpart on our [mappers](Theory\What is (wrong with) software). 

Most linters can warn us if they detect anemic models with getters and setters.

# Tags

- Information Hiding

# Conclusion

Getters and Setters are a bad established practice. Instead of focusing on object behavior (essential), we are desperate to know object guts (accidental) and violate their implementation.

# Relations

[Code Smell 28 - Setters](Code Smells\Code Smell 28 - Setters)

[Code Smell 01 - Anemic Models](Code Smells\Code Smell  01 - Anemic Models)

[Code Smell 64 - Inappropriate Intimacy](Code Smells\Code Smell 64 - Inappropriate Intimacy)

# More info

[Nude Models - Part II: Getters](Theory\Nude Models - Part II Getters)

# Credits

Photo by [Vidar Nordli-Mathisen](https://unsplash.com/@vidarnm) on [Unsplash](https://unsplash.com/s/photos/pull)  

* * *

> The value of a prototype is in the education it gives you, not in the code itself.

_Alan Cooper_
 
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()