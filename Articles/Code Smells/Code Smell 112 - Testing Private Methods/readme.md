# Code Smell 112 - Testing Private Methods

![Code Smell 112 - Testing Private Methods](Code%20Smell%20112%20-%20Testing%20Private%20Methods.jpg)

*If you work on unit testing, sooner or later you will face this dilemma*

> TL;DR: Don't test your private methods.

# Problems

- Breaking Encapsulation

- Code Duplication

# Solutions

1. If your method is simple, you don't need to test it.

2. If your method is complicated, you need to convert it into a Method Object.

3. Do not make your methods public for testing.

4. Do not [use metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md) to avoid protection.

5. Do not move the private computation to [helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md).

6. Do not use [static methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md) for computations.

# Context

We test our classes and methods.

At some point, we rely on auxiliary computations and we need to test them in a white-box way.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/47c21b9a717ee1ac9b7d2f10bbb7a2d0)
```php
<?

final class Star {
  
  private $distanceInParsecs;
  
  public function timeToReachLightToUs() {
    return $this->convertDistanceInParsecsToLightYears($this->distanceInParsecs);
  }
  
  private function convertDistanceInParsecsToLightYears($distanceInParsecs) {
      return 3.26 * $distanceInParsecs;
      // function is using an argument which is already available.
      // since it has private access to $distanceInParsecs
      // this is another smell indicator.

      // We cannot test this function since it is private
  }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/acf7c184cef3babb5251da6ea946f5ae)
```php
<?

final class Star {
  
  private $distanceInParsecs;   
  
  public function timeToReachLightToUs() {
    return new ParsecsToLightYearsConverter($this->distanceInParsecs);
  }
}

final class ParsecsToLightYearsConverter {
  public function convert($distanceInParsecs) {
      return 3.26 * $distanceInParsecs;
  }
}

final class ParsecsToLightYearsConverterTest extends TestCase {
  public function testConvert0ParsecsReturns0LightYears() {
    $this->assertEquals(0, (new ParsecsToLightYearsConverter)->convert(0));
  }
    // we can add lots of tests and rely on this object
    // So we don't need to test Star conversions.
    // We can yet test Star public timeToReachLightToUs()
    // This is a simplified scenario

}
```

# Detection

[X] Semi-Automatic 

This is a semantic smell.

We can only find metaprogramming abuse on some unit frameworks.

# Tags

- Test Smells

# Conclusion

With this guide, we should always choose the method object solution.

# Relations

[Code Smell 21 - Anonymous Functions Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2021%20-%20Anonymous%20Functions%20Abusers/readme.md)

[Code Smell 22 - Helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md)

[Code Smell 18 - Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md)

# More Info

- [Testing Private Methods Guide](http://shoulditestprivatemethods.com/)

[Laziness I - Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Credits

Photo by [Dan Nelson](https://unsplash.com/@danny144) on [Unsplash](https://unsplash.com/s/photos/private)
  
* * *

> Just as it is a good practice to make all fields private unless they need greater visibility, it is a good practice to make all fields final unless they need to be mutable.

_Brian Goetz_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)