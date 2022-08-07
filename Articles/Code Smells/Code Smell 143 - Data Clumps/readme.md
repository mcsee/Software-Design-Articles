# Code Smell 143 - Data Clumps

![Code Smell 143 - Data Clumps](dynamic-wang-F3KHLtv6844-unsplash.jpg)

*Some objects are always together. Why don't we split them?*

> TL;DR: Make cohesive primitive objects travel together

# Problems

- Bad Cohesion

- Duplicated Code

- Validation Complexity

- Readability

- Maintainability

# Solutions

1. Extract Class

2. Find small objects

# Context

This smell is friends with primitive obsession. 

If two or more primitive objects are glued together, with business logic repeated and rules between them, we need to find the existing concept on the [bijection](../../Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/076c003ce49b9fc4af66f4dffeb71079)
```csharp
public class DinnerTable
{
    public DinnerTable(Person guest, DateTime from, DateTime to)
    {
        Guest = guest; 
        From = from;
        To = to;
    }
    private Person Guest;
    private DateTime From; 
    private DateTime To;
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/a848e76a45559291a2f71cd76aa91961)
```csharp
public class TimeInterval
{
    public TimeInterval(DateTime from, DateTime tol)
    {
        // We shoud validate From < To
        From = from;
        To = to;
    }
}

public DinnerTable(Person guest, DateTime from, DateTime to)
{    
    Guest = guest;
    Interval = new TimeInterval(from, to);
}

// Even Better...

public DinnerTable(Person guest, Interval reservationTime)
{    
    Guest = guest;
    Interval = reservationTime;
}

```

# Detection

[X] Semi-Automatic 

Detection based on cohesion patterns is available o a few linters.

# Tags

- Cohesion

# Conclusion

Group behavior in the right place and hide the primitive data.

# Relations

[Code Smell 122 - Primitive Obsession](../../Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 01 - Anemic Models](../../Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 27 - Associative Arrays](../../Code%20Smells/Code%20Smell%2027%20-%20Associative%20Arrays/readme.md)

# More Info

- [Refacting Guru](https://refactoring.guru/es/smells/data-clumps)

- [Wikipedia](https://en.wikipedia.org/wiki/Data_clump)

# Credits

Photo by Dynamic Wang on Unsplash

* * *

> The heart of the software is its ability to solve domain-related problems for its user. All other features, vital though they may be, support this basic purpose.

_Eric Evans_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)