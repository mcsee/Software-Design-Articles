# Code Smell 91 - Test Asserts without Description

![Code Smell 91 - Test Asserts without Description](Code%20Smell%2091%20-%20Test%20Asserts%20without%20Description.jpg)

*We are big fans of xUnit. But we don't care much for the programmers.*

> TL;DR: Use asserts with declarative descriptions.

# Problems 😔 

- Readability

- Hard debugging

- Time waste

# Solutions 😃

1. Put a nice descriptive assertion

2. Share guides for problem-solving

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/4edc85bb65bc9a70d11706086e0fab99) -->

```php
<?

public function testNoNewStarsAppeared(): void
  {
     $expectedStars = $this->historicStarsOnFrame();
     $observedStars = $this->starsFromObservation();
     // These sentences get a very large collection
  
     $this->assertEquals($expectedStars, $observedStars);
     // If something fails you will have a very hard time debugging
    }
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/72a551eb26d02f1480142e9cd41a5ca7) -->

```php
<?

public function testNoNewStarsAppeared(): void
  {
     $expectedStars = $this->historicStarsOnFrame();
     $observedStars = $this->starsFromObservation();
     // These sentences get a very large collection
  
     $newStars = array_diff($expectedStars, $observedStars);
  
     $this->assertEquals($expectedStars, $observedStars,
         'There are new stars ' . print_r($newStars,true));
     // Now you can see EXACTLY why the assertion failed 
     // with a clear and
     // declarative Message
    }
```

# Detection 🔍

Since *assert* and *assertDescription* are different functions, we can adjust our policies to favor the latter.

# Tags 🏷️

- Testing

# Level 🔋

[X] Beginner

# Conclusion 🏁

Be respectful to the reader of your assertions.

It might even be yourself!

# More Information 📕

- [XUnit: Assert Description Deprecation](https://github.com/xunit/xunit/issues/350)

# Credits 🙏

Photo by [Startaê Team](https://unsplash.com/@startaeteam) on [Unsplash](https://unsplash.com/s/photos/dialogue)  

* * *

> Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.

_John Woods_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)