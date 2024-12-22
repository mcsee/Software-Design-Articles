# Code Smell 27 - Associative Arrays

![Code Smell 27 - Associative Arrays](Code%20Smell%2027%20-%20Associative%20Arrays.jpg)

*[Key, values], magic, fast, malleable and error prone.*

> TL;DR: Use arrays for rapid prototyping, use object for serious business.
 
# Problems

- Coupling

- Information Hiding

- Code Duplication

- Fail Fast

- Integrity

# Solutions

1. Reify objects

2. Create cohesive small objects

3. Don't leave them anaemic, find their cohesive relations.

# Sample Code

## Wrong 

<!-- [Gist Url](https://gist.github.com/mcsee/ff148550e3d2018c2ee345ea0790e8fc) -->

```php
<?

$coordinate = array('latitude'=>1000, 'longitude'=>2000); 
// They are just arrays. A Bunch of raw data
```

### Anaemic

<!-- [Gist Url](https://gist.github.com/mcsee/1ac19d1af240d28a59c01134cd487b7e) -->

```php
<?

final class GeographicCoordinate {

    function __construct($latitudeInDegrees, $longitudeInDegrees) {
        $this->longitude = $longitudeInDegress;
        $this->latitude = $latitudeInDegress;
    }
}

$coordinate = new GeographicCoordinate(1000, 2000);
// Should throw an error since these values don't exist on Earth
```

### Validated

<!-- [Gist Url](https://gist.github.com/mcsee/4753e242da21027d2a8e7243de877250) -->

```php
<?

final class GeographicCoordinate {

    function __construct($latitudeInDegrees, $longitudeInDegrees) {
        if (!$this->isValidLatitude($latitudeInDegrees)) {
            throw new InvalidLatitudeException($latitudeInDegrees);
            // ...
            $this->longitude = $longitudeInDegrees;
            $this->latitude = $latitudeInDegrees;
        }
    }
}

$coordinate = new GeographicCoordinate(1000, 2000);
// throws an error since these values don't exist on Earth
```

## Right

### Degrees deserves reification

<!-- [Gist Url](https://gist.github.com/mcsee/33f84258133eb9bafbac1f85532527c6) -->

```php
<?

final class Latitude {
    function __construct($degrees) {
        if (!$degrees->between(-90, 90)) {
            throw new InvalidLatitudeException($degrees);
        }
        // ...
    }
}
```

*Many people suffer from __primitive obsession__ and believe this is over design. 
Designing software is about making decisions and comparing trade-offs.
The performance argument is not valid nowadays since modern virtual machines can efficiently deal with small short-lived objects.*

<!-- [Gist Url](https://gist.github.com/mcsee/9f7c55093672a63ec8c89ca24b9a7277) -->

```php
<?

final class GeographicCoordinate {

    function distanceTo(GeographicCoordinate $coordinate) { }
    function pointInPolygon(Polygon $polygon) { }
}

// Now you are in geometry world
// (and not in the world of arrays anymore). 
// You can safely do many exciting things.
```

# Detection

We cannot forbid Associative Arrays since they are very good as a first approach.

They will be fine for exporting data, serialization, persistence and other accidental implementation issues.

We should avoid them on our systems.

# Tags

- Primitive

# Conclusion

When creating objects, we must not think of them as *data*. This is a common misconception.

We should stay loyal to our [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) and discover real-world objects.

Most associative arrays have cohesion and represent real-world entities, and we must treat them as first class objects.

# Relations

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

[Refactoring 012 - Reify Associative Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20012%20-%20Reify%20Associative%20Arrays/readme.md)

# Credits

Photo by [Melissa Askew](https://unsplash.com/@melissaaskew) on [Unsplash](https://unsplash.com/s/photos/group)

* * *

> There’s nothing more permanent than a temporary hack.

_Kyle Simpson_ 

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)
