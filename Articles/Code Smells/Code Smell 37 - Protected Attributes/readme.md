# Code Smell 37 - Protected Attributes

![Code Smell 37 - Protected Attributes](Code%20Smell%2037%20-%20Protected%20Attributes.jpg)

*Protected attributes are great for encapsulating and controlling access to our properties. They might be warning us for another smell.*

# Problems

- [Sub classification](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md) for code reuse purposes.

- [Liskov substitution](https://en.wikipedia.org/wiki/Liskov_substitution_principle) violation ([SOLID](https://en.wikipedia.org/wiki/SOLID) principle).

- Possible subclass overrides.

# Solutions

1. Favor composition
2. Don't subclassify attributes.
3. Extract behavior to separate objects.
4. Use [traits](https://en.wikipedia.org/wiki/Trait_(computer_programming) (if available).

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/b599977d400cf92eda495f5f5011fb97)
```php
<?

abstract class ElectronicDevice {

    protected $battery;

    public function __construct(OperatingSystem $battery) {
        $this->battery = $battery;
    }

}

abstract class Idevice extends ElectronicDevice {

    protected $operatingSystem;

    public function __construct(Battery $battery, OperatingSystem $ios) {
        $this->operatingSystem = $ios;
        parent::__construct($battery)
  }

}

final class Ipad extends Idevice {

    public function __construct(Battery $battery, OperatingSystem $ios) {
        parent::__construct($battery, $ios)
  }

}

final class Iphone extends Idevice {

    private $phoneModule:
 
  public __construct(Battery $batery, OperatingSystem $ios, PhoneModule $phoneModule) {
    $this->phoneModule = $phoneModule;
    parent::__construct($battery, $ios)
  }

}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/def8678faff1e1952e7ad43b70f1b6da)
```php
<?

interface ElectronicDevice {
    // ...
}

interface PhoneCommunication {
    // ...
}

final class Ipad implements ElectronicDevice {

    private $operatingSystem;
    private $battery;

    public function __construct(Battery $battery, OperatingSystem $ios) {
        $this->operatingSystem = $ios;
        $this->battery = $battery;
    }
}

final class Iphone implements ElectronicDevice, PhoneCommunication {

    private $phoneModule;
    private $operatingSystem;
    private $battery;

    public function __construct(Battery $battery, OperatingSystem $ios, PhoneModule $phoneModule) {
        $this->phoneModule = $phoneModule;
        $this->operatingSystem = $ios;
        $this->battery = $battery;
    }
}
```

# Detection

In languages supporting *protected* attributes we can avoid them by policy or have a warning of this smell.

# Tags

- Encapsulation

# Conclusion

Protected attributes are yet another tool we should use carefully. Every decision is a smell, and we should be very careful with attributes and inheritance.

# Relations

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

# More Info

[Traits on Wikipedia](https://en.wikipedia.org/wiki/Trait_%28computer_programming%29)

# Credits

Photo by [Jonathan Farber](https://unsplash.com/@farber) on [Unsplash](https://unsplash.com/s/photos/safe-box)

* * *

> Subclasses shouldn’t always share all characteristics of their parent class but will do so with inheritance. This can make a program’s design less flexible. It also introduces the possibility of calling methods on subclasses that don’t make sense or that cause errors because the methods don’t apply to the subclass.

_Steve Klabnik_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)