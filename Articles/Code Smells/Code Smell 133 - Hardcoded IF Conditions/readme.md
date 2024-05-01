# Code Smell 133 - Hardcoded IF Conditions

![Code Smell 133 - Hardcoded IF Conditions](Code%20Smell%20133%20-%20Hardcoded%20IF%20Conditions.jpg)

*Hard coding is fine. For a short period of time*

> TL;DR: Don't leave a hardcoded mess on IFs.

# Problems

- Testability

- Hardcoded values

- Open/Closed Principle Violation

# Solutions

1. Replace all [IFs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md) with a dynamic condition or [polymorphism](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md).

# Context

Hard-coding *iF* conditions is great when doing [Test-Driven Development](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD%20Conference%202021/TDD%20Conference%202021%20-%20All%20Talks/readme.md).

We need to clean up stuff.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/894c442e034658ee3a6d602c1dcfcca4)

```csharp
private string FindCountryName (string internetCode)
{
  if (internetCode == "de")
    return "Germany";
  else if(internetCode == "fr") 
    return "France";
  else if(internetCode == "ar")
    return "Argentina";
    // lots of else clauses
  else
    return "Suffix not Valid";
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/5d45c77d532eb370ca6b78606c0db05e)

```csharp
private string[] country_names = {"Germany", "France", "Argentina"} 
// and lots more
private string[] Internet_code_suffixes= {"de", "fr", "ar" } // more
 
private Dictionary<string, string> Internet_codes = 
   new Dictionary<string, string>();

// There are more efficient ways for collection iteration
// This pseudocode is for illustration
int currentIndex = 0; 
foreach (var suffix in Internet_code_suffixes) {
  Internet_codes.Add(suffix, Internet_codes[currentIndex]);
  currentIndex++;
}

private string FindCountryName(string internetCode) {
  return Internet_codes[internetCode];
}
```

# Detection

[X] Automatic 

By checking If/else conditions we can detect hard-coded conditions.

# Tags

- IFs

# Conclusion

In the past, hard-coding was not an option.

With modern methodologies, we learn by hard-coding, and then, we generalize and refactor our solutions.

# Relations

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

[Code Smell 186 - Hardcoded Business Conditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20186%20-%20Hardcoded%20Business%20Conditions/readme.md)

# More Info

- [How to Get Rid of IFs forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

- [Test Driven Development](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD%20Conference%202021/TDD%20Conference%202021%20-%20All%20Talks/readme.md)

# Credits

Photo by [Jessica Johnston](https://unsplash.com/@jdjohnston) on Unsplash

* * *

> Don't be (too) clever. My point was to discourage overly clever code because "clever code" is hard to write, easy to get wrong, harder to maintain, and often no faster than simpler alternatives because it can be hard to optimize.

_Bjarne Stroustrup_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)