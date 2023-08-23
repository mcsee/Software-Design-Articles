# Code Smell 204 - Tests Depending on Dates
            
![Code Smell 204 - Tests Depending on Dates](Code%20Smell%20204%20-%20Tests%20Depending%20on%20Dates.jpg)

*It is a good idea to assert something has happened in the future*

> TL;DR: Tests must be in full control and you can't manage time.

# Problems

- Fragile Tests

- CI/CD Breaks

# Solutions

1. Tests should be always in full environmental control.

2. Create a time source

# Context

I read a [Tweet](https://twitter.com/housecor/status/1639975667713409030) about adding a fixed date to check for the removal of a feature flag (which is another [code smell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2029%20-%20Settings%20-%20Configs/readme.md)).
The test will fail in an unpredictable way preventing releases and breaking CI/CD pipeline.
There are also other bad examples we will never reach some date, tests running at midnight, different timezones, etc.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/7e96669a0239ea203c90423e2e08b22d)
```java
class DateTest {
    @Test
    void testNoFeatureFlagsAfterFixedDate() {
        LocalDate fixedDate = LocalDate.of(2023, 4, 4);
        LocalDate currentDate = LocalDate.now();        
        Assertions.assertTrue(currentDate.isBefore(fixedDate) ||
           !featureFlag.isOn());
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/3ccfe6623e9eea63c135afa59c4dbf4f)
```java
class DateTest {
    @Test
    void testNoFeatureFlags() {   
        Assertions.assertFalse(featureFlag.isOn());
    }
}
```

# Detection

[X] Semi-Automatic 

We can check assertions based on time on our tests.

# Tags

- Testing

# Conclusion

Proceed with caution with tests and dates. 

They are often a cause of mistakes.

# Relations

[Code Smell 52 - Fragile Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md)

# More Info

[Twitter](https://twitter.com/1639975667713409030)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).
  
* * *

> Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice.

_Christopher Alexander_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)