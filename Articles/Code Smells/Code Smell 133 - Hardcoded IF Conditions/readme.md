# Code Smell 133 - Hardcoded IF Conditions

![Code Smell 133 - Hardcoded IF Conditions](jessica-johnston-nnH2l-k77nc-unsplash.jpg)

*Hard coding is fine. For a short period of time*

> TL;DR: Don't leave a hardcoded mess on IFs.

# Problems

- Testability

- Hardcoded values

- Open/Closed Principle Violation

# Solutions

1. Replace all [IFs](Theory\How to Get Rid of Annoying IFs Forever) with a dynamic condition or [polymorphism](Theory\How to Get Rid of Annoying IFs Forever).

# Context

Hard-coding *iF* conditions is great when doing [Test-Driven Development](TDD Conference 2021\TDD Conference 2021 - All Talks).

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
    // lots of elses
  else
    return "Suffix not Valid";
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/5d45c77d532eb370ca6b78606c0db05e)
```csharp
private string[] country_names = {"Germany", "France", "Argentina"} // lots more
private string[] Internet_code_suffixes= {"de", "fr", "ar" } // more
 
private Dictionary<string, string> Internet_codes = new Dictionary<string, string>();

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

[Code Smell 36 - Switch/case/elseif/else/if statements](Code Smells\Code Smell 36 - Switch case elseif else if statements)

[Code Smell 102 - Arrow Code](Code Smells\Code Smell 102 - Arrow Code)

# More Info

- [How to Get Rid of IFs forever](Theory\How to Get Rid of Annoying IFs Forever)

- [Test Driven Development](TDD Conference 2021\TDD Conference 2021 - All Talks)

# Credits

Photo by [Jessica Johnston](https://unsplash.com/@jdjohnston) on Unsplash

* * *

> Don't be (too) clever. My point was to discourage overly clever code because "clever code" is hard to write, easy to get wrong, harder to maintain, and often no faster than simpler alternatives because it can be hard to optimize.

_Bjarne Stroustrup_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()