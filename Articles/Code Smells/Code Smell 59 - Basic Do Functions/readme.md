# Code Smell 59 - Basic / Do Functions

![Code Smell 59 - Basic / Do Functions](Code%20Smell%2059%20-%20Basic%20%20%20Do%20Functions.jpg)

*sort, doSort, basicSort, doBasicSort, primitiveSort, superBasicPrimitiveSort, who does the real work?*

> TL;DR: Shortcuts for mini wrappers shout for better solutions.

# Problems

- Readability

- Bad Naming

- Low Cohesion

- Single Responsibility Principle
 
# Solutions

1. Use good object wrappers

2. Use dynamic decorators

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/dd988af705942cfafd5811df60acaed2) -->

```php
<?

final class Calculator {

    private $cachedResults;

    function computeSomething() {
        if (isset($this->cachedResults)) {
            return $this->cachedResults;
        }
        $this->cachedResults = $this->logAndComputeSomething();
    }

    private function logAndComputeSomething() {
        $this->logProcessStart();
        $result = $this->basicComputeSomething();
        $this->logProcessEnd();
        return $result;
    }

    private function basicComputeSomething() {
        // Do Real work here
    }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/ce98c6db785d947e77790c3cc6b4bad0) -->

```php
<?

final class Calculator {
    function computeSomething() {
        // Do Real work here since I am the compute method
    }
}

// Clean and cohesive class, single responsibility

final class CalculatorDecoratorCache {

    private $cachedResults;
    private $decorated;

    function computeSomething() {
        if (isset($this->cachedResults)) {
            return $this->cachedResults;
        }
        $this->cachedResults = $this->decorated->computeSomething();
    }
}

final class CalculatorDecoratorLogger {

    private $decorated;

    function computeSomething() {
        $this->logProcessStart();
        $result = $this->decorated->computeSomething();
        $this->logProcessEnd();
        return $result;
    }
}
```

# Detection

We can instruct our static linters to find wrapping methods if they follow conventions like *doXXX()*, *basicXX()* etc.

# Tags

- Declarativiness

# Level

[X] Beginner

# Conclusion

We came across this kind of methods some time in our developer life, We smelled something was not OK with them. Now is the time to change them!
 
# More Info

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

[Wikipedia](https://en.wikipedia.org/wiki/Wrapper_function)

[Wikipedia](https://en.wikipedia.org/wiki/Decorator_pattern)
 
# Credits

Photo by [Roger Bradshaw](https://unsplash.com/@roger3010) on [Unsplash](https://unsplash.com/s/photos/recursive)

* * *

> The primary disadvantage of Wrap Method is that it can lead to poor names. In the previous example, we renamed the pay method dispatchPay() just because we needed a different name for code in the original method.

_ Michael Feathers_
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)