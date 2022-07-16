# Code Smell 112 - Testing Private Methods

![Code Smell 112 - Testing Private Methods](dan-nelson-ah-HeguOe9k-unsplash.jpg)

*If you work on unit testing, sooner or later you will face this dilemma*

> TL;DR: Don't test your private methods.

# Problems

- Breaking Encapsulation

- Code Duplication

# Solutions

1. If your method is simple, you don't need to test it.

2. If your method is complicated, you need to convert it into a Method Object.

3. Do not make your methods public for testing.

4. Do not [use metaprogramming](Theory\Lazyness I - Metaprogramming) to avoid protection.

5. Do not move the private computation to [helpers](Code Smells\Code Smell 22 - Helpers).

6. Do not use [static methods](Code Smells\Code Smell 18 - Static Functions) for computations.

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

[Code Smell 21 - Anonymous Functions Abusers](Code Smells\Code Smell 21 - Anonymous Functions Abusers)

[Code Smell 22 - Helpers](Code Smells\Code Smell 22 - Helpers)

[Code Smell 18 - Static Functions](Code Smells\Code Smell 18 - Static Functions)

# More Info

- [Testing Private Methods Guide](http://shoulditestprivatemethods.com/)

- [Lazyness I - Metaprogramming](Theory\Lazyness I - Metaprogramming)

# Credits

Photo by [Dan Nelson](https://unsplash.com/@danny144) on [Unsplash](https://unsplash.com/s/photos/private)
  
* * *

> Just as it is a good practice to make all fields private unless they need greater visibility, it is a good practice to make all fields final unless they need to be mutable.

_Brian Goetz_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()