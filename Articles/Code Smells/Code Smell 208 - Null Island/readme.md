# Code Smell 208 - Null Island
            
![Code Smell 208 - Null Island](Code%20Smell%20208%20-%20Null%20Island.jpg)

*You can avoid null if you try*

> TL;DR: Don't use null for real places

# Problems 😔 

- Tight Coupling

- Unexpected Results

# Solutions 😃

1. Model unknown locations polymorphically

# Context 💬

[Null Island](https://en.wikipedia.org/wiki/Null_Island) is a fictional place that sits at [0°N 0°E](https://www.google.com/maps/place/0%C2%B000'00.0%22N+0%C2%B000'00.0%22E/@0,0,35771m/), at the intersection of the Prime Meridian and the Equator in the Atlantic Ocean. 

Many GPS systems place data with missing or invalid coordinates at this exact point. That's where the name "Null Island" comes from.

There's no landmass at this location. It's open ocean. 

This point has become a popular reference for geographic information systems (GIS) and mapping software, because it helps filter out errors in location data.

Data visualization specialists started using the term around 2008, after noticing that failed geocoding requests and invalid coordinate entries often defaulted to (0, 0).

Natural Earth, a public domain mapping dataset, deliberately includes a fictional one-square-meter island at that exact point to help catch geocoding errors. The trick works: researchers have found more than 300,000 Flickr photos and countless social media posts geotagged to Null Island, and during the COVID-19 pandemic, Johns Hopkins' tracking dashboard plotted confirmed cases there whenever the real location was missing.

# Sample Code 💻

## Wrong 🚫

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

## Right 👉

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
            "Can't calculate distance" +
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
              { location -> println("${person.name} is " +
                  "${location.calculateDistance(rio)} kilometers " +
                  "from Rio.") },
              { println("${person.name} is at an unknown " +
                  "location.") }
          )
      }
}
```

# Detection 🔍

[X] Semi-Automatic 

You can check for special numbers used as nulls

# Tags 🏷️

- Null

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

Real coordinates map to real places on Earth. That is the [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between your model and the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

When you reuse (0, 0) to mean "unknown location," you collapse two different concepts into a single representation. 

A real point in the Atlantic Ocean and the absence of data aren't the same thing, and your model shouldn't pretend they are.

Modeling the unknown location as its own type keeps the mapping honest. 

Real coordinates always mean a real place, and missing data gets its own explicit representation instead of borrowing one that already means something else.

# AI Generation 🤖

AI generators create this smell often. 

When you ask for a location class, they default to primitive latitude and longitude doubles and reach for (0.0, 0.0) as a convenient placeholder for missing data, the same shortcut developers take under deadline pressure.

# AI Detection 🧲

AI generators rarely catch this smell on their own. 

Unless you explicitly ask for a type that represents unknown locations, they treat (0.0, 0.0) as a normal default value and won't suggest polymorphism unless you request it.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Replace the (0.0, 0.0) sentinel value with a polymorphic Location type that separates known coordinates from an explicit unknown location

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60kotlin%0D%0Aclass+Person%28val+name%3A+String%2C+%0D%0A+++++++++++++val+latitude%3A+Double%2C%0D%0A+++++++++++++val+longitude%3A+Double%29%0D%0A%0D%0Afun+main%28%29+%7B%0D%0A++++val+people+%3D+listOf%28%0D%0A++++++++Person%28%22Alice%22%2C+40.7128%2C+-74.0060%29%2C+%0D%0A++++++++%2F%2F+New+York+City%0D%0A++++++++Person%28%22Bob%22%2C+51.5074%2C+-0.1278%29%2C+%0D%0A++++++++%2F%2F+London%0D%0A++++++++Person%28%22Charlie%22%2C+48.8566%2C+2.3522%29%2C+%0D%0A++++++++%2F%2F+Paris%0D%0A++++++++Person%28%22Tony+Hoare%22%2C+0.0%2C+0.0%29+%0D%0A++++++++%2F%2F+Null+Island%0D%0A++++%29%0D%0A++++%0D%0A++++for+%28person+in+people%29+%7B%0D%0A++++++++if+%28person.latitude+%3D%3D+0.0+%26%26+person.longitude+%3D%3D+0.0%29+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+on+Null+Island%21%22%29%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+at+%22+%2B%0D%0A++++++++++++++++++++%22%28%24%7Bperson.latitude%7D%2C+%24%7Bperson.longitude%7D%29.%22%29%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Replace+the+%280.0%2C+0.0%29+sentinel+value+with+a+polymorphic+Location+type+that+separates+known+coordinates+from+an+explicit+unknown+location%3A+%60%60%60kotlin%0D%0Aclass+Person%28val+name%3A+String%2C+%0D%0A+++++++++++++val+latitude%3A+Double%2C%0D%0A+++++++++++++val+longitude%3A+Double%29%0D%0A%0D%0Afun+main%28%29+%7B%0D%0A++++val+people+%3D+listOf%28%0D%0A++++++++Person%28%22Alice%22%2C+40.7128%2C+-74.0060%29%2C+%0D%0A++++++++%2F%2F+New+York+City%0D%0A++++++++Person%28%22Bob%22%2C+51.5074%2C+-0.1278%29%2C+%0D%0A++++++++%2F%2F+London%0D%0A++++++++Person%28%22Charlie%22%2C+48.8566%2C+2.3522%29%2C+%0D%0A++++++++%2F%2F+Paris%0D%0A++++++++Person%28%22Tony+Hoare%22%2C+0.0%2C+0.0%29+%0D%0A++++++++%2F%2F+Null+Island%0D%0A++++%29%0D%0A++++%0D%0A++++for+%28person+in+people%29+%7B%0D%0A++++++++if+%28person.latitude+%3D%3D+0.0+%26%26+person.longitude+%3D%3D+0.0%29+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+on+Null+Island%21%22%29%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+at+%22+%2B%0D%0A++++++++++++++++++++%22%28%24%7Bperson.latitude%7D%2C+%24%7Bperson.longitude%7D%29.%22%29%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60kotlin%0D%0Aclass+Person%28val+name%3A+String%2C+%0D%0A+++++++++++++val+latitude%3A+Double%2C%0D%0A+++++++++++++val+longitude%3A+Double%29%0D%0A%0D%0Afun+main%28%29+%7B%0D%0A++++val+people+%3D+listOf%28%0D%0A++++++++Person%28%22Alice%22%2C+40.7128%2C+-74.0060%29%2C+%0D%0A++++++++%2F%2F+New+York+City%0D%0A++++++++Person%28%22Bob%22%2C+51.5074%2C+-0.1278%29%2C+%0D%0A++++++++%2F%2F+London%0D%0A++++++++Person%28%22Charlie%22%2C+48.8566%2C+2.3522%29%2C+%0D%0A++++++++%2F%2F+Paris%0D%0A++++++++Person%28%22Tony+Hoare%22%2C+0.0%2C+0.0%29+%0D%0A++++++++%2F%2F+Null+Island%0D%0A++++%29%0D%0A++++%0D%0A++++for+%28person+in+people%29+%7B%0D%0A++++++++if+%28person.latitude+%3D%3D+0.0+%26%26+person.longitude+%3D%3D+0.0%29+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+on+Null+Island%21%22%29%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+at+%22+%2B%0D%0A++++++++++++++++++++%22%28%24%7Bperson.latitude%7D%2C+%24%7Bperson.longitude%7D%29.%22%29%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Replace+the+%280.0%2C+0.0%29+sentinel+value+with+a+polymorphic+Location+type+that+separates+known+coordinates+from+an+explicit+unknown+location%3A+%60%60%60kotlin%0D%0Aclass+Person%28val+name%3A+String%2C+%0D%0A+++++++++++++val+latitude%3A+Double%2C%0D%0A+++++++++++++val+longitude%3A+Double%29%0D%0A%0D%0Afun+main%28%29+%7B%0D%0A++++val+people+%3D+listOf%28%0D%0A++++++++Person%28%22Alice%22%2C+40.7128%2C+-74.0060%29%2C+%0D%0A++++++++%2F%2F+New+York+City%0D%0A++++++++Person%28%22Bob%22%2C+51.5074%2C+-0.1278%29%2C+%0D%0A++++++++%2F%2F+London%0D%0A++++++++Person%28%22Charlie%22%2C+48.8566%2C+2.3522%29%2C+%0D%0A++++++++%2F%2F+Paris%0D%0A++++++++Person%28%22Tony+Hoare%22%2C+0.0%2C+0.0%29+%0D%0A++++++++%2F%2F+Null+Island%0D%0A++++%29%0D%0A++++%0D%0A++++for+%28person+in+people%29+%7B%0D%0A++++++++if+%28person.latitude+%3D%3D+0.0+%26%26+person.longitude+%3D%3D+0.0%29+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+on+Null+Island%21%22%29%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+at+%22+%2B%0D%0A++++++++++++++++++++%22%28%24%7Bperson.latitude%7D%2C+%24%7Bperson.longitude%7D%29.%22%29%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60kotlin%0D%0Aclass+Person%28val+name%3A+String%2C+%0D%0A+++++++++++++val+latitude%3A+Double%2C%0D%0A+++++++++++++val+longitude%3A+Double%29%0D%0A%0D%0Afun+main%28%29+%7B%0D%0A++++val+people+%3D+listOf%28%0D%0A++++++++Person%28%22Alice%22%2C+40.7128%2C+-74.0060%29%2C+%0D%0A++++++++%2F%2F+New+York+City%0D%0A++++++++Person%28%22Bob%22%2C+51.5074%2C+-0.1278%29%2C+%0D%0A++++++++%2F%2F+London%0D%0A++++++++Person%28%22Charlie%22%2C+48.8566%2C+2.3522%29%2C+%0D%0A++++++++%2F%2F+Paris%0D%0A++++++++Person%28%22Tony+Hoare%22%2C+0.0%2C+0.0%29+%0D%0A++++++++%2F%2F+Null+Island%0D%0A++++%29%0D%0A++++%0D%0A++++for+%28person+in+people%29+%7B%0D%0A++++++++if+%28person.latitude+%3D%3D+0.0+%26%26+person.longitude+%3D%3D+0.0%29+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+on+Null+Island%21%22%29%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+at+%22+%2B%0D%0A++++++++++++++++++++%22%28%24%7Bperson.latitude%7D%2C+%24%7Bperson.longitude%7D%29.%22%29%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Replace+the+%280.0%2C+0.0%29+sentinel+value+with+a+polymorphic+Location+type+that+separates+known+coordinates+from+an+explicit+unknown+location%3A+%60%60%60kotlin%0D%0Aclass+Person%28val+name%3A+String%2C+%0D%0A+++++++++++++val+latitude%3A+Double%2C%0D%0A+++++++++++++val+longitude%3A+Double%29%0D%0A%0D%0Afun+main%28%29+%7B%0D%0A++++val+people+%3D+listOf%28%0D%0A++++++++Person%28%22Alice%22%2C+40.7128%2C+-74.0060%29%2C+%0D%0A++++++++%2F%2F+New+York+City%0D%0A++++++++Person%28%22Bob%22%2C+51.5074%2C+-0.1278%29%2C+%0D%0A++++++++%2F%2F+London%0D%0A++++++++Person%28%22Charlie%22%2C+48.8566%2C+2.3522%29%2C+%0D%0A++++++++%2F%2F+Paris%0D%0A++++++++Person%28%22Tony+Hoare%22%2C+0.0%2C+0.0%29+%0D%0A++++++++%2F%2F+Null+Island%0D%0A++++%29%0D%0A++++%0D%0A++++for+%28person+in+people%29+%7B%0D%0A++++++++if+%28person.latitude+%3D%3D+0.0+%26%26+person.longitude+%3D%3D+0.0%29+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+on+Null+Island%21%22%29%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+at+%22+%2B%0D%0A++++++++++++++++++++%22%28%24%7Bperson.latitude%7D%2C+%24%7Bperson.longitude%7D%29.%22%29%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60kotlin%0D%0Aclass+Person%28val+name%3A+String%2C+%0D%0A+++++++++++++val+latitude%3A+Double%2C%0D%0A+++++++++++++val+longitude%3A+Double%29%0D%0A%0D%0Afun+main%28%29+%7B%0D%0A++++val+people+%3D+listOf%28%0D%0A++++++++Person%28%22Alice%22%2C+40.7128%2C+-74.0060%29%2C+%0D%0A++++++++%2F%2F+New+York+City%0D%0A++++++++Person%28%22Bob%22%2C+51.5074%2C+-0.1278%29%2C+%0D%0A++++++++%2F%2F+London%0D%0A++++++++Person%28%22Charlie%22%2C+48.8566%2C+2.3522%29%2C+%0D%0A++++++++%2F%2F+Paris%0D%0A++++++++Person%28%22Tony+Hoare%22%2C+0.0%2C+0.0%29+%0D%0A++++++++%2F%2F+Null+Island%0D%0A++++%29%0D%0A++++%0D%0A++++for+%28person+in+people%29+%7B%0D%0A++++++++if+%28person.latitude+%3D%3D+0.0+%26%26+person.longitude+%3D%3D+0.0%29+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+on+Null+Island%21%22%29%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+at+%22+%2B%0D%0A++++++++++++++++++++%22%28%24%7Bperson.latitude%7D%2C+%24%7Bperson.longitude%7D%29.%22%29%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Replace+the+%280.0%2C+0.0%29+sentinel+value+with+a+polymorphic+Location+type+that+separates+known+coordinates+from+an+explicit+unknown+location%3A+%60%60%60kotlin%0D%0Aclass+Person%28val+name%3A+String%2C+%0D%0A+++++++++++++val+latitude%3A+Double%2C%0D%0A+++++++++++++val+longitude%3A+Double%29%0D%0A%0D%0Afun+main%28%29+%7B%0D%0A++++val+people+%3D+listOf%28%0D%0A++++++++Person%28%22Alice%22%2C+40.7128%2C+-74.0060%29%2C+%0D%0A++++++++%2F%2F+New+York+City%0D%0A++++++++Person%28%22Bob%22%2C+51.5074%2C+-0.1278%29%2C+%0D%0A++++++++%2F%2F+London%0D%0A++++++++Person%28%22Charlie%22%2C+48.8566%2C+2.3522%29%2C+%0D%0A++++++++%2F%2F+Paris%0D%0A++++++++Person%28%22Tony+Hoare%22%2C+0.0%2C+0.0%29+%0D%0A++++++++%2F%2F+Null+Island%0D%0A++++%29%0D%0A++++%0D%0A++++for+%28person+in+people%29+%7B%0D%0A++++++++if+%28person.latitude+%3D%3D+0.0+%26%26+person.longitude+%3D%3D+0.0%29+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+on+Null+Island%21%22%29%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+at+%22+%2B%0D%0A++++++++++++++++++++%22%28%24%7Bperson.latitude%7D%2C+%24%7Bperson.longitude%7D%29.%22%29%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60kotlin%0D%0Aclass+Person%28val+name%3A+String%2C+%0D%0A+++++++++++++val+latitude%3A+Double%2C%0D%0A+++++++++++++val+longitude%3A+Double%29%0D%0A%0D%0Afun+main%28%29+%7B%0D%0A++++val+people+%3D+listOf%28%0D%0A++++++++Person%28%22Alice%22%2C+40.7128%2C+-74.0060%29%2C+%0D%0A++++++++%2F%2F+New+York+City%0D%0A++++++++Person%28%22Bob%22%2C+51.5074%2C+-0.1278%29%2C+%0D%0A++++++++%2F%2F+London%0D%0A++++++++Person%28%22Charlie%22%2C+48.8566%2C+2.3522%29%2C+%0D%0A++++++++%2F%2F+Paris%0D%0A++++++++Person%28%22Tony+Hoare%22%2C+0.0%2C+0.0%29+%0D%0A++++++++%2F%2F+Null+Island%0D%0A++++%29%0D%0A++++%0D%0A++++for+%28person+in+people%29+%7B%0D%0A++++++++if+%28person.latitude+%3D%3D+0.0+%26%26+person.longitude+%3D%3D+0.0%29+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+on+Null+Island%21%22%29%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+at+%22+%2B%0D%0A++++++++++++++++++++%22%28%24%7Bperson.latitude%7D%2C+%24%7Bperson.longitude%7D%29.%22%29%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Replace+the+%280.0%2C+0.0%29+sentinel+value+with+a+polymorphic+Location+type+that+separates+known+coordinates+from+an+explicit+unknown+location%3A+%60%60%60kotlin%0D%0Aclass+Person%28val+name%3A+String%2C+%0D%0A+++++++++++++val+latitude%3A+Double%2C%0D%0A+++++++++++++val+longitude%3A+Double%29%0D%0A%0D%0Afun+main%28%29+%7B%0D%0A++++val+people+%3D+listOf%28%0D%0A++++++++Person%28%22Alice%22%2C+40.7128%2C+-74.0060%29%2C+%0D%0A++++++++%2F%2F+New+York+City%0D%0A++++++++Person%28%22Bob%22%2C+51.5074%2C+-0.1278%29%2C+%0D%0A++++++++%2F%2F+London%0D%0A++++++++Person%28%22Charlie%22%2C+48.8566%2C+2.3522%29%2C+%0D%0A++++++++%2F%2F+Paris%0D%0A++++++++Person%28%22Tony+Hoare%22%2C+0.0%2C+0.0%29+%0D%0A++++++++%2F%2F+Null+Island%0D%0A++++%29%0D%0A++++%0D%0A++++for+%28person+in+people%29+%7B%0D%0A++++++++if+%28person.latitude+%3D%3D+0.0+%26%26+person.longitude+%3D%3D+0.0%29+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+on+Null+Island%21%22%29%0D%0A++++++++%7D+else+%7B%0D%0A++++++++++++println%28%22%24%7Bperson.name%7D+lives+at+%22+%2B%0D%0A++++++++++++++++++++%22%28%24%7Bperson.latitude%7D%2C+%24%7Bperson.longitude%7D%29.%22%29%0D%0A++++++++%7D%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Don't use [Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md) to represent [real objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20126%20-%20Fake%20Null%20Object/readme.md)

# Relations 👩‍❤️‍💋‍👨

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Code Smell 126 - Fake Null Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20126%20-%20Fake%20Null%20Object/readme.md)

[Code Smell 160 - Invalid Id = 9999](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20160%20-%20Invalid%20Id%20=%209999/readme.md)

# More Information 📕

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

[Wikipedia](https://en.wikipedia.org/wiki/Null_Island)

A research buoy once sat right at 0°N 0°E collecting climate data until 2021, and the exact antipode of Null Island, at 0°N 180°E, is nicknamed "Antinull Island."

[![Watch the video](https://img.youtube.com/vi/daiCb6pT1qY/sddefault.jpg)](https://youtu.be/daiCb6pT1qY) 

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).
  
* * *

> The billion dollar mistake of having null in the language. And since JavaScript has both null and undefined, it's the two billion dollar mistake.

_Anders Hejlsberg_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)