# Code Smell 32 - Singletons

![Code Smell 32 - Singletons](maria-teneva-vf4O1OwtPnk-unsplash.jpg)

*The most used and (in)famous design pattern in the world is causing us great harm.*

# Problems

- Coupling

- Testability

- Accidental problems

- Multi threading

- Premature Optimization

[Code Smell 20 - Premature Optimization](Code Smells\Code Smell 20 - Premature Optimization)

# Solutions

1. Avoid it.

2. Use contextual unique objects.

3. Benchmark object creation.

# Examples

- Database Access

- Globals

- Logging

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/5f0b4685e3af22e2a0a82f9f642c5c79)
```php
<?

class Singleton {
    private static $instance = null;

    private function __construct() {
    }

    public static function getInstance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/48af2ebb8874c53f5aa5091c24c832e5)
```php
<?

interface Religion {
    // Define behavior
}

final class God {
    // There can be as many as you wish
}

final class PolythiesticReligion implements Religion {
    private $gods;

    public function __construct(Collection $gods) {
        $this->gods = $gods;
    }
}

final class MonotheisticReligion implements Religion {
    private $godInstance;

    public function __construct(God $onlyGod) {
        $this->godInstance = $onlyGod;
    }
}

// According to christianity there's only one God.
// This does not hold on other religions

$christianGod = new God();
$christianReligion = new MonotheisticReligion($christianGod);
// Under this context God is unique. We cannot create or change a new one.
// This is a scoped global

$jupiter = new God();
$saturn = new God();
$mythogicalReligion = new PolythiesticReligion([$jupiter, $saturn]);

// Gods are unique (or not) according to context
// We can create test religions with or without unicity
// This is less coupled since we break the direct reference to God class
// God class Single Responsibility is to create gods. Not to manage them


```

# Detection

This is a design pattern. We should avoid it by policy. 

We can add linter rules for patterns like *'getInstance()'* so new developers cannot infect code with this anti-pattern.
 
# Tags

- Globals

# Conclusion

This is an historical mistake already acknowledged by the community. Nevertheless, lazy developers bring it again and again. We need to reach a consensus on its drawbacks.

# Relations

[Code Smell 06 - Too Clever Programmer](Code Smells\Code Smell 06 - Too Clever Programmer)

[Code Smell 25 - Pattern Abusers](Code Smells\Code Smell 25 - Pattern Abusers)

# More info

[Singleton - The root of all evil](Theory\Singleton - The root of all evil)

# Credits

Photo by [Maria Teneva](https://unsplash.com/@miteneva) on [Unsplash](https://unsplash.com/s/photos/rotten) 

* * *

> The Diagram is Not the Model. The model is not the diagram. It is an abstraction, a set of concepts and relationships between them.

_Eric Evans_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)