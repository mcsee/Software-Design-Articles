# Code Smell 32 - Singletons

![Code Smell 32 - Singletons](Code%20Smell%2032%20-%20Singletons.jpg)

*The most used and (in)famous design pattern in the world is causing us great harm.*

> TL;DR: Don't use Singletons. Ever.

# Problems 😔 

- Coupling

- Testability

- Accidental problems

- Multi threading

- Premature Optimization

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# Solutions 😃

1. Avoid it.

2. Use contextual unique objects.

3. Benchmark object creation.

# Examples

- Database Access

- Globals

- Logging

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/5f0b4685e3af22e2a0a82f9f642c5c79) -->

```php
<?

class God {
    private static $instance = null;

    private function __construct() { }

    public static function getInstance() {
    if (null === self::$instance) {
        self::$instance = new self();
    }
    return self::$instance;
   }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/48af2ebb8874c53f5aa5091c24c832e5) -->

```php
<?

interface Religion {
    // Define common behavior for religions
}

final class God {
    // Different religions have different beliefs
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

// According to Christianity and some other religions,
// there’s only one God.
// This does not hold for other religions.

$christianGod = new God();
$christianReligion = new MonotheisticReligion($christianGod);
// Under this context God is unique.
// You cannot create or change a new one.
// This is a scoped global.

$jupiter = new God();
$saturn = new God();
$mythogicalReligion = new PolythiesticReligion([$jupiter, $saturn]);

// Gods are unique (or not) according to context
// You can create test religions with or without unicity
// This is less coupled 
// since you break the direct reference to God class
// God class Single Responsibility is to create gods. 
// Not to manage them
```

# Detection 🔍

This is a design pattern. We should avoid it by policy. 

We can add linter rules for patterns like *'getInstance()'* so new developers cannot infect code with this anti-pattern.
 
# Tags 🏷️

- Globals

# Conclusion 🏁

This is an historical mistake already acknowledged by the community. Nevertheless, lazy developers bring it up again and again. We need to reach a consensus on its drawbacks.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 25 - Pattern Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2025%20-%20Pattern%20Abusers/readme.md)

# More Information 📕

[Singleton - The Root of All Evil](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20Root%20of%20All%20Evil/readme.md)

# Credits 🙏

Photo by [Maria Teneva](https://unsplash.com/@miteneva) on [Unsplash](https://unsplash.com/s/photos/rotten) 

* * *

> The Diagram is Not the Model. The model is not the diagram. It is an abstraction, a set of concepts and relationships between them.

_Eric Evans_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)