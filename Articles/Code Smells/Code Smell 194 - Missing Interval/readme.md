# Code Smell 194 - Missing Interval
            
![Code Smell 194 - Missing Interval](Code%20Smell%20194%20-%20Missing%20Interval.jpg)

*From date should be lower than to date*

> TL;DR: Intervals are there. Why use plain dates?

# Problems

- Missing abstraction

- [Duplicated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)

- Not enforced invariants

- Primitive Obsession

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault

- [Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) principle violation

# Solutions

1. Create and use an Interval Object

# Context

The restriction "From date should be lower than to date" means that the starting date of a certain interval should occur before the ending date of the same interval.

The "From date" should be a date that comes earlier in time than the "To date". 

This restriction is in place to ensure that the interval being defined makes logical sense and that the dates used to define it are in the correct order.

We all know it. But we miss creating the *Interval* object.

Would you create a *Date* as a pair of 3 *Integer numbers*? Certainly, not. 

This is the same. 

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/1e7dafa0143427c7e381017d77da987e)
```kotlin
val from = LocalDate.of(2018, 12, 9)
val to = LocalDate.of(2022, 12, 22)

val elapsed = elapsedDays(from, to)
    
fun elapsedDays(fromDate: LocalDate, toDate: LocalDate): Long {
    return ChronoUnit.DAYS.between(fromDate, toDate)
}

// We need to apply this short function 
// Or the inline version many times in our code
// We don't check from Date to be less than toDate
// We can make accounting numbers with a negative number
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/cff12c234110259b3b39b6a0122e1b76)
```kotlin
// We reify the Interval Concept

data class Interval(val fromDate: LocalDate, val toDate: LocalDate) {
    init {
        if (fromDate >= toDate) {
            throw IllegalArgumentException("From date must be before to date")
        }
        // Of course the Interval must be immutable
        // By using the keyword 'data'
    }

    fun elapsedDays(): Long {
        return ChronoUnit.DAYS.between(fromDate, toDate)
    }
}

val from = LocalDate.of(2018, 12, 9)
val to = LocalDate.of(2002, 12, 22)

val interval = Interval(from, to) // Invalid

```

# Detection

[X] Manual

This is a primitive obsession smell.

It is related to how we model things.

# Tags

- Primitive

# Conclusion

If you find software with missing simple validations, it certainly needs reification.

# Relations

[Code Smell 177 - Missing Small Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20177%20-%20Missing%20Small%20Objects/readme.md)

[Code Smell 46 - Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

# More Info

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Towfiqu barbhuiya](https://unsplash.com/@towfiqu999999) on [Unsplash](https://unsplash.com/photos/bwOAixLG0uc)  
  
* * *

> At any particular point in time, the features provided by our programming languages reflect our understanding of software and programming.

_R. E. Fairley_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)