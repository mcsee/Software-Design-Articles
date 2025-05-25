# How to Decouple a Legacy System

![How to Decouple a Legacy System](How%20to%20Decouple%20a%20Legacy%20System.jpg)
				   
> TL;DR: An exercise on improving legacy code

_There are many articles explaining how to make a good design and what rules to follow. In this note we will see a concrete example on how to convert a_ [_legacy design_](https://en.wikipedia.org/wiki/Legacy_system) _into a better one._

# The problem

Many existing systems have coupling problems. Therefore, their maintainability is reduced. Making a change in this type of system brings a large ripple effect.

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

Let’s assume we have an existing process.

The system applies various algorithms to deduce the [hyper-parameters](https://en.wikipedia.org/wiki/Hyperparameter_(machine_learning)) of a supervised learning model.

A new requirement is requested:

> To be able to see, in production, data on the performance of each strategy in real time.

## Decoupling the system

Let’s see the process entry point:

<!-- [Gist Url](https://gist.github.com/mcsee/f5a1eb2029a0fe9eda501b15af24dc6e) -->

```php
<?

	StrategySupervisedHelper::getInstance()->optimize($processId);
```

… the supervised learning class:

<!-- [Gist Url](https://gist.github.com/mcsee/c78cb4669ac25321a7bd5df168291394) -->

```php
<?

  class StrategySupervisedHelper extends Singleton {
	// ...
  }
```

and the method invoked:

<!-- [Gist Url](https://gist.github.com/mcsee/ebfd83f5a1e176d6a769de243fb8d422) -->

```php
<?  public function optimize($processId);
```

In the case of a productive system, the first thing we must do is identify its current coverage. The system has a series of automated unit and functional tests.

To measure coverage we will use the [Mutation testing technique](https://en.wikipedia.org/wiki/Mutation_testing).

<!-- [Gist Url](https://gist.github.com/mcsee/956c2e3d5ce16ec1964021c08441cceb) -->

```php
<? 

private function optimize($processId) {
	throw new Exception('Testing coverage');
}
```

Unfortunately just a single test fails, so we discovered that the process is not covered and we see that the Michael Feathers maxim is sadly applied:

> An inherited system is one that has no tests

The strategy to refactor an inherited system is to **cover** the existing functionality before making any changes.

## 1 — Creating deferred tests.

Writing tests reveals good design interfaces among objects. Due to the current solution and the coupling it has incorporated, it is very difficult to write tests.

However, we cannot refactor to write the tests without writing the tests previously. It seems that we are facing a vicious circle.

![exit](https://cdn.hashnode.com/res/hashnode/image/upload/v1599600794299/bBJ6ooEe7.jpeg)

Photo by [Justin Chen](https://unsplash.com/@jkcphotos) on [Unsplash](https://unsplash.com/s/photos/no-exit)

The possible solution to this deadlock is to write the tests **declaratively**, thus generating better interfaces.

We will run them manually until the coupling is resolved.

## 2 — We write tests to cover pre-existing functionality.

Tests can be written with a tool from the [xUnit](https://en.wikipedia.org/wiki/XUnit) family with a false assertion (they always fail).

After having covered (for now manually) the necessary cases we can start with the refactor.

## 3 — The class name does not represent a real name in the bijection.

Helpers do not exist in the real-world, nor should they exist in any computable model.

Let’s think about the responsibilities to choose the name in [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

<!-- [Gist Url](https://gist.github.com/mcsee/3d11a4f44134f4de3f3d60b286f19dd8) -->

```php
<?

class SupervisedLearningAlgorithm extends Singleton {

}
```

For now the name is good enough, and it gives us an idea of the responsibilities of your instances in the real-world.

## 4 — The class is a singleton.

There are no valid reasons to use singletons. This fact, in addition to generating all the problems described here:

[Singleton - The root of all evil](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20root%20of%20all%20evil/readme.md)

yields a very implemental invocation (coupled to _getInstance()_) and not very declarative...

<!-- [Gist Url](https://gist.github.com/mcsee/756c4d1547d031a6a184373abbab3ce7) -->

```php
<?

SupervisedLearningAlgorithm::getInstance()->optimize($processId);
```

which we will change to:

<!-- [Gist Url](https://gist.github.com/mcsee/244f934c8d755f7ad018ce3c98b2a145) -->

```php
<?

(new SupervisedLearningAlgorithm())->optimize($processId);
```

leaving the class definition as follows:

<!-- [Gist Url](https://gist.github.com/mcsee/43845711d2a84e446d62530082aef0d9) -->

```php
<?

class SupervisedLearningAlgorithm {

}
```

An important design rule is:

> Do not subclass concrete classes.

If the language allows this, we explicitly declare it:

<!-- [Gist Url](https://gist.github.com/mcsee/7a685e33d9b00c13d5192a9dccc0c30a) -->

```php
<?

final class SupervisedLearningAlgorithm {
}
```

## 5 — The same parameter in all methods.

The object is created and then it gets a magic parameter setting the identifier of the process to be optimized. This argument travels by all methods.

This is a _code smell_ suggesting us to check the **cohesion** between this parameter and the process.

<!-- [Gist Url](https://gist.github.com/mcsee/b471c753797f1834ddc3b69c08c19bc8) -->

```php
<?

final class SupervisedLearningAlgorithm {
  public function calculate($processId) {
  }
    
  private function analize($processId) {
  }
    
  private function executeAndGetData(
    $processId,
    $isUsingFastMethod = null) {
  }
    // ... etc etc etc
}
```

Looking at **bijection** we conclude there can be no algorithm without a process. We don’t want to have a class with _setters_ to mutate it:

[Nude Models - Part I: Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)

Therefore we will pass all the **essential** attributes during construction.

The way to know if an attribute is **essential** is to take away all the responsibilities associated with that object. If it can no longer carry out its responsibilities, it is because the attribute belongs to the [minimal attribute set](https://en.wikipedia.org/wiki/Maximal_and_minimal_elements).

<!-- [Gist Url](https://gist.github.com/mcsee/29ef86bca93e15f691a1a40e12473e4c) -->

```php
<?

final class SupervisedLearningAlgorithm {
    public function __construct($processId) {
    }
}
```

In this way, the strategy is **immutable** in its essence, with all the benefits it brings us.

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

## 6 — We find a design pattern.

The process, according to bijection, models a real-world process. This seems to fit the [**Command**](https://en.wikipedia.org/wiki/Command_pattern)pattern.

However, we believe that it is closer to a [**method object**](https://refactoring.guru/replace-method-with-method-object) where there is an ordered sequence of executions, modeling the different steps of an algorithm.

## 7 — Interchangeable behavior resembles yet another pattern.

As the name we assigned to the object according to its responsibilities suggests, this process models an execution strategy that will compete with other polymorphic strategies.

This is the intention of the [Strategy pattern](https://en.wikipedia.org/wiki/Strategy_pattern).

Names should match the observed responsibilities.

[What exactly is a name - Part I The Quest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md)

![athletes](https://cdn.hashnode.com/res/hashnode/image/upload/v1599600974587/bjJryTrPG.jpeg)

Photo by [Nicolas Hoizey](https://unsplash.com/@nhoizey) on [Unsplash](https://unsplash.com/s/photos/athletics)

<!-- [Gist Url](https://gist.github.com/mcsee/719ec5c9d38316fadca3749b1cd13e6f) -->

```php
<?

final class SupervisedLearningStrategy {
}
```

## 8 — We eliminate nulls.

There is never a valid reason to use **null**. **Null** does not exist in real life.

It violates the principle of **bijection** and generates coupling between the function caller and the argument. Also, it generates unnecessary **ifs** as **null** is not polymorphic with any other object.

<!-- [Gist Url](https://gist.github.com/mcsee/862500b561af3151dee26e8c645ee4f7) -->

```php
<?

private function 
  executeAndGetData($processId, $isUsingFastMethod = null) {

}

private function 
  executeAndGetData($processId, bool $isUsingFastMethod = false) {

}
```

We change the absence of the argument to a boolean truth value.

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

## 9 — We remove the default parameters.

The private function in the previous example has a default parameter.

The default parameters produce **coupling** and ripple effect. They are available for the programmer laziness. Since it is a private function the replacement scope is the same class. We make it explicit, replacing all invocations:

## 10 — We remove hard coded constants.

These constants coupled within the code will not allow us to make good tests "manipulating time".

Remember that the tests have to **be in control of the entire environment** and the time is **global** and **fragile** to match the tests.

From now on, it will be an essential parameter of object creation (Refactoring by [adding parameters](https://refactoring.guru/es/add-parameter) is a safe task, which can be done by any modern IDE.

## 11 — We decouple the log.

The log stores relevant information in production about the executions of the strategy. As usual, using a _Singleton_ as a global reference.

This new bond prevents us from being able to test it. This _Singleton_ is in another module over which we have no control, so we are going to use a wrapping technique.

<!-- [Gist Url](https://gist.github.com/mcsee/34f6706535f866c50e5aaee21984388c) -->

```php
?>

function logInfo(array $infoToLog) {
	SingletonLogger::info($infoToLog);
}
```

Besides from being a Singleton, the log uses **static** class messages.

<!-- [Gist Url](https://gist.github.com/mcsee/783152c267fa646dc34099a5ad9d4d84) -->

```php
<?	

SingletonLogger::info($infoToLog);
```

Let’s remember that:

> The only protocol that a class should contain is the one related to its single responsibility (the S for Solid): creating instances.

Since the reference is to a static method, we cannot replace the class call with a polymorphic method. Instead, we will use an anonymous function.

<!-- [Gist Url](https://gist.github.com/mcsee/bf90641050515afd1b1271572f0d9507) -->

```php
<?

function logInfo(array $infoToLog) {
  
	$loggingFunction = function() use ($infoToLog) {
		SingletonLogger::info($infoToLog);
	};
	
	$loggingFunction($infoToLog);
}
```

Then, we can decouple the reference to the log and extract it from the class by reducing the coupling, generating better cohesion from the strategy and favoring its testability.

We can now use the object with several different kind of loggers (like [tests doubles](https://en.wikipedia.org/wiki/Test_double)).

<!-- [Gist Url](https://gist.github.com/mcsee/135d5fa5b2e90ece1abc555f05cf7229) -->

```php
<?

final class SupervisedLearningAlgorithm {
  public function __construct($processId, closure $loggingFunction) {
  }
}
```

With the call from the productive code:

<!-- [Gist Url](https://gist.github.com/mcsee/eafe7b5c3391c87cbe12d06ef6fe2bf6) -->

```php
<?

$loggingFunction = function() use ($infoToLog) {
  SingletonLogger::info($infoToLog);
};

new SupervisedLearningAlgorithm{$processId, $loggingFunction);
```

And the call from the tests:

<!-- [Gist Url](https://gist.github.com/mcsee/65c634a08f4dd86c9827d9f3fcbbbcba) -->

```php
<?

$loggingFunction = function () use ($infoToLog) {
    $this->loggedData[] = $infoToLog;
};

new SupervisedLearningAlgorithm($processId, $loggingFunction);
$this->assertEquals([...], $this->loggedData);
```

## 12 — We reify objects.

On the way of our refactoring we find some fixes with persistent data. Such data travel cohesively, so it makes sense to think of it as an object with real-world responsibilities:

<!-- [Gist Url](https://gist.github.com/mcsee/37108b975f23284e69eff888ba7b146e) -->

```php
<?

private function getDataToPersist($runTime, $isClustering) {

    return [
        'processId' => $this->processId,
        'date' => new Timestamp(),
        'runTime' => $runTime,
        'isClustering' => $isClustering
    ];
}
```

By creating the new concept, we are in danger of building an [anemic model](https://en.wikipedia.org/wiki/Anemic_domain_model). Let’s see what hidden responsibilities you have:

<!-- [Gist Url](https://gist.github.com/mcsee/211688cc5fcdc55ca9d26c708346fa85) -->

```php
<?

final class LearningAlgorithmRunData {
    // look for responsibilities related to the cohesive data
}
```

## 13 — We complete the coverage.

We did not forget to program the tests that we could not write at the beginning. As we have a much less coupled design it is now very easy to do.

<!-- [Gist Url](https://gist.github.com/mcsee/c278dcb011a45969b27b4752add129bb) -->

```php
<?

function testOptimizationIsGoodEnough() {
	//
	$this->assertEquals($expected, $real);	
}

function testOptimizationBelowThreshold() {
	//
	$this->assertEquals($expected, $real);		
}
```

And our system is much less "legacy" compared to when we found it.

![notes](https://cdn.hashnode.com/res/hashnode/image/upload/v1599601047677/uHl2buUNa.jpeg)

Photo by [Kelly Sikkema](https://unsplash.com/@kellysikkema) on [Unsplash](https://unsplash.com/s/photos/tidy)

# Summary

After hard iterative and incremental work, through short steps, we have achieved a better solution in the following aspects:

*   Less Coupling.
*   Immutability.
*   Better Names.
*   No Setters / Getters.
*   No Ifs.
*   Without Null.
*   Without Singletons.
*   No default parameters.
*   Better test coverage.
*   Following the Open/Closed principle (Solid’s O) to be able to add new polymorphic algorithms.
*   Following the principle of Single Responsibility (The S for Solid).
*   Without overloading the classes with protocol.

![statue](https://cdn.hashnode.com/res/hashnode/image/upload/v1599601008235/QL0Lm0DUb.jpeg)

Photo by [Zac Farmer](https://unsplash.com/@zacfarmerart) on [Unsplash](https://unsplash.com/s/photos/very-old)

# Conclusion 🏁

Modifying an existing system by improving its design is possible, taking into account clear design rules and taking small steps. We must have professional responsibility and courage to make the relevant changes, leaving a much better solution than when we found it.

Part of the objective of this series of articles is to generate spaces for debate and discussion on software design.

We look forward to comments and suggestions on this article.

This article is also available in Spanish [here](/diseño-de-software/cómo-desacoplar-un-sistema-heredado-e7fca5ffe628).