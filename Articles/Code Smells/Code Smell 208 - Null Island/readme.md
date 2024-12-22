# Code Smell 208 - Null Island
            
![Code Smell 208 - Null Island](Code%20Smell%20208%20-%20Null%20Island.jpg)

*You can avoid null if you try*

> TL;DR: Don't use null for real places

# Problems

- Coupling

- Unexpected Results

# Solutions

1. Model the unknown location with polymorphism

# Context

[Null Island](https://en.wikipedia.org/wiki/Null_Island) is a fictional place, which is located at the coordinates [0�N 0�E](https://www.google.com/maps/place/0%C2%B000'00.0%22N+0%C2%B000'00.0%22E/@0,0,35771m/), at the intersection of the Prime Meridian and the Equator in the Atlantic Ocean. 

The name "Null Island" comes from the fact that this location represents the point where a lot of GPS systems place any data that has missing or invalid location coordinates.

In reality, there is no landmass at this location, and it is actually in the middle of the ocean. 

This point has become a popular reference for geographic information systems (GIS) and mapping software, as it serves as a way to filter out errors in location data.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/8103413f0cbda26e2133f977a3180d8a) -->

```kotlin
class Person(val name: String, 
             val latitude: Double,
             val longitude: Double)

fun main() {
    val people = listOf(
        Person("Alice", 40.7128, -74.0060), 
        // New York City
        Person("Bob", 51.5074, -0.1278), 
        // London
        Person("Charlie", 48.8566, 2.3522), 
        // Paris
        Person("Tony Hoare", 0.0, 0.0) 
        // Null Island
    )
    
    for (person in people) {
        if (person.latitude == 0.0 && person.longitude == 0.0) {
            println("${person.name} lives on Null Island!")
        } else {
            println("${person.name} lives at " +
                    "(${person.latitude}, ${person.longitude}).")
        }
    }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/dea28242b003409926f2d49cf7ad0849) -->

```kotlin
abstract class Location {
    abstract fun calculateDistance(other: Location): Double
    abstract fun ifKnownOrElse(knownAction: (Location) -> Unit,
        unknownAction: () -> Unit)
}

class EarthLocation(val latitude: Double, val longitude: Double): 
  Location() {
    override fun calculateDistance(other: Location): Double {
        val earthRadius = 6371.0
        val latDistance = Math.toRadians(
            latitude - (other as EarthLocation).latitude)
        val lngDistance = Math.toRadians(
            longitude - other.longitude)
        val a = sin(latDistance / 2) * sin(latDistance / 2) +
          cos(Math.toRadians(latitude)) * 
          cos(Math.toRadians(other.latitude)) *
          sin(lngDistance / 2) * sin(lngDistance / 2)
        val c = 2 * atan2(sqrt(a), sqrt(1 - a))
        return earthRadius * c
}
    
    override fun ifKnownOrElse(knownAction: 
      (Location) -> Unit, unknownAction: () -> Unit) {
        knownAction(this)
    }
}

class UnknownLocation : Location() {
    override fun calculateDistance(other: Location): Double {
        throw IllegalArgumentException(
            "Cannot calculate distance" +
            " from an unknown location.")
    }

    override fun ifKnownOrElse(knownAction:
        (Location) -> Unit, unknownAction: () -> Unit) {
            unknownAction()
    }
}

class Person(val name: String, val location: Location)

fun main() {
    val people = listOf(
        Person("Alice", EarthLocation(40.7128, -74.0060)), 
        // New York City
        Person("Bob", EarthLocation(51.5074, -0.1278)), 
        // London
        Person("Charlie", EarthLocation(48.8566, 2.3522)),
        // Paris
        Person("Tony", UnknownLocation()) 
        // Unknown location
    )
    val rio = EarthLocation(-22.9068, -43.1729)
    // Rio de Janeiro coordinates

    for (person in people) {
        person.location.ifKnownOrElse(
            { location -> println(person.name" is " +
                person.location.calculateDistance(rio) +
                    " kilometers { println("${person.name} " 
                        + "is at an unknown location.") }
       )
    }
}
```

# Detection

[X] Semi-Automatic 

We can check for special numbers used as nulls

# Tags

- Null

# Conclusion

Don't use [Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md) to represent [real objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20126%20-%20Fake%20Null%20Object/readme.md)

# Relations

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Code Smell 126 - Fake Null Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20126%20-%20Fake%20Null%20Object/readme.md)

[Code Smell 160 - Invalid Id = 9999](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20160%20-%20Invalid%20Id%20=%209999/readme.md)

# More Info

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

[Wikipedia](https://en.wikipedia.org/wiki/Null_Island)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).
  
* * *

> The billion dollar mistake of having null in the language. And since JavaScript has both null and undefined, it's the two billion dollar mistake.

_Anders Hejlsberg_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)