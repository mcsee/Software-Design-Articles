# Singleton - The root of all evil

![Singleton - The root of all evil](Singleton%20-%20The%20root%20of%20all%20evil.jpg)

> TL;DR: Don't ever user Singletons

*Allowed global variables and supposed memory savings.*

*For 20 years I have been teaching software at the University of Buenos Aires. In the software engineering course we teach design patterns and the same “scheme” is always repeated almost like a type of deja vu, the same sequence that I had the opportunity to witness in several of my works and in the free software that I use:* 

> The ‘magical’ appearance of the Singleton pattern.

# The origin of evil
The pattern has been used in the industry for decades. Its popularity is attributed to the excellent book [Design Patterns](https://en.wikipedia.org/wiki/Design_Patterns). There are numerous software frameworks that use it and we rarely find literature that discourages its use.
Despite this, in the corresponding  [Wikipedia](https://en.wikipedia.org/wiki/Design_Patterns) entry we can read a Dantesque warning:

> 
Critics consider the singleton to be an  [anti-pattern](https://en.wikipedia.org/wiki/Anti-pattern)  in that it is frequently used in scenarios where it is not beneficial, introduces unnecessary restrictions in situations where a sole instance of a class is not actually required, and introduces  [global state](Link)  into an application.

![Devil](https://cdn.hashnode.com/res/hashnode/image/upload/v1598394410649/AWB5yatBl.jpeg)

Let’s be pragmatic as always, and look at the arguments for and against its use:

## Reasons not to use it

### 1. Violates the [bijection principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) 

As we saw in previous articles, every object in our computable model has to be [mapped](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) on a **1 to 1** relationship with a real-world entity.

Singletons are often linked to objects that need to be unique. As usual we will have to distinguish among the objects that are **essentially** unique (for problem domain drivers) and differentiate them from the **accidentally** unique ones regarding implementation reasons, efficiency, resource consumption, global access, etc.
Most **accidentally** unique objects are not present in the real-world, and we will see later on that the presumably **essentially** unique ones may not be so if we consider different contexts, environments, or situations.

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

### 2. Generates coupling
It is a global reference. Again according to Wikipedia:

> An implementation of the singleton pattern must provide global access to that instance.

What a priori appears as a benefit for preventing us from having to pass context information, generates coupling. The reference to the singleton cannot be changed according to the environment (development, production), nor can dynamic strategy changes related to the current load be made, it cannot be replaced by a double test and it prevents us from making changes due to the possible ripple effect.

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

### 3. It says a lot about (accidental) implementation and little about his (essential) responsibilities
By focusing early on implementation issues (the *Singleton* is an implementation pattern) we orient ourselves according to **accidentality** (**how**) and underestimate the most important thing of an object: the responsibilities it has (**what**).
When carrying out premature optimization in our designs, we usually award a concept that we have just discovered as *Singleton*.

[Gist Url]: # (https://gist.github.com/mcsee/5f0b4685e3af22e2a0a82f9f642c5c79)
```php
<?

class God {
    private static $instance = null;

    private function __construct() { }

    public static function getInstance() {
    if (null === self::$instance) {
        self::$instance = new self();
    }
    return self::$instance;
   }
}
```

### 4. It prevents us from writing good unit tests
The aforementioned coupling has as a corollary; the impossibility of having full control over the side effects of a test to guarantee its determinism. We must depend on the global state referenced by the Singleton.

### 5. Does not save up memory space
The argument used to propose its use is to avoid the construction of multiple volatile objects. This supposed advantage is not real in virtual machines with efficient garbage collection mechanisms.
In such virtual machines, used by most modern languages, keeping objects in a memory area whose Garbage Collector algorithm is a double pass (mark & ​​sweep) is much more expensive than creating volatile objects and quickly removing them.

### 6. It prevents us from using dependency injection
As good solid design advocates, we favor inversion of control through dependency injection to avoid coupling. In this way the service provider (formerly a hardcoded Singleton) is decoupled from the service itself, replacing it with an injectable dependency that meets the defined requirements, coupling us to what and not how.

### 7. It violates the instantiation contract
When we ask a class to create a new instance we expect the contract to be honored and give us a fresh new instance. However, many Singleton implementations hide the creation omission silently, rather than failing quickly to indicate that there is a business rule that instances should not be arbitrarily created.

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

[Gist Url]: # (https://gist.github.com/mcsee/df78952fd4871362eaffcc6ce7ab6c94)
```php
<?

final class God extends Singleton {
}

$christianGod = new God();
```

A better answer would be to show with an exception it is not valid to create new instances in this execution context.

[Gist Url]: # (https://gist.github.com/mcsee/74b7ad0cc6e4a80cb376fc8bb41fac4a)
```php
<?

class Singleton {
    private function __construct() {
        throw new Exception('Cannot Create new instances');
    }
}
```

This will force us to have a private constructor to use it internally. Thus violating the contract that all classes can create instances. Another code smell.

### 8. It forces us to explicitly couple to implementation
When invoking a class to use it (again, to use its **what**), we will have to couple with the fact that it is accidentally a *Singleton* (its **how**), generating a relation that, when trying to break it, would produce the much-feared ripple effect.

[Gist Url]: # (https://gist.github.com/mcsee/e9a082aca6e2e7e4412d5da4290a5f0a)
```php
<?

$christianGod = God::getInstance();
// Why should us be aware of getInstance when creating an object ?
```

### 9. It hinders the creation of automated tests
If we use the TDD development technique, objects are defined purely and exclusively based on their behavior. Therefore, in no case, the construction of software using TDD will arise the Singleton concept. If business rules state that there must be a single provider of a certain service, this will be modeled through a controlled access point (which should not be a global class, much less a *Singleton*).
Trying to create unit tests in an existing system coupled to a Singleton can be an almost impossible task.

### 10. Unique concepts are contextual
When the pattern is stated it is usually accompanied by some idea that in the real-world seems rather unique. For example, if we want to model the behavior of **God** according to the vision of Christianity, there could not be more than one **God**. But these rules are relative to the context and subjective vision of each religion. Various belief systems may coexist in the same world with their own gods (some monotheistic and other polytheistic beliefs).

![1_1UifacKmCXcooGNdkuL9KA[1].png](https://cdn.hashnode.com/res/hashnode/image/upload/v1598399753458/4F_Zy5fo1.png)

*Pattern structure according to the design pattern book*

![1_bsk45zjPHDm9lJkQL2-6AQ[1].jpeg](https://cdn.hashnode.com/res/hashnode/image/upload/v1598399779576/5dmcI3KYb.jpeg)

*The class (and all the metamodel) is not present in the bijection. Any relationship linked to the class will be invalid*

### 11. It is difficult to keep up in multi-threaded environments
Pattern implementation can be tricky in programs with multiple threads. If two  [execution threads](https://en.wikipedia.org/wiki/Thread_(computing)) try to create the instance at the same time and it does not exist yet, only one of them should succeed in creating the object. The classic solution to this problem is to use [mutual exclusion](https://en.wikipedia.org/wiki/Mutual_exclusion)  in the class creation method that implements the pattern, to make sure it is reentrant.

### 12. Accumulates garbage that takes up memory space
Singletons are references attached to classes, just as classes are global references these are not reached by the garbage collector. In case the Singleton is a complex object, this entire object, in addition to the transitive closure of all its references, will stay in memory throughout the execution.

### 13. The accumulated garbage state is the enemy of unit tests
The persistent state is the enemy of unit tests. One of the things that makes unit tests effective is that each test must be **independent** of all the others. If this is not true, then the order in which the tests are run may affect the test results and the tests become **non-deterministic**. This can lead to cases where tests fail when they shouldn’t, and worse, can lead to tests that pass only in the order they were performed. This can hide mistakes and is very bad.

Avoiding static variables is a good way to prevent the state from being preserved between tests. Singletons, by their very nature, depend on an instance that is kept in a static variable. This is an invitation for the dependency test.

![1_BGHmfxceo83F9CixiDnq4A[1].jpeg](https://cdn.hashnode.com/res/hashnode/image/upload/v1598399814552/PbDJPyJdP.jpeg)

### 14. Limiting the creation of new objects violates the single responsibility principle.
> The single responsibility of a class is to create instances.
Adding any other responsibility to any class implies violating the  [single responsibility principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) (the S for Solid). A class should not worry about being or not being a *Singleton*. They should only be responsible for their commitments to business rules. In case of needing the uniqueness of these instances, this would be the responsibility of a third object in the middle such as a Factory or a Builder.

### 15. The cost of having a global reference is not just the coupling
Singletons are frequently used to provide a global access point to some service. What ends up happening is design dependencies are hidden within the code and are not visible when examining the interfaces of their classes and methods.

The need to create something global to avoid passing it explicitly is a **code smell**. There are always better solutions and alternatives to using a global reference that do not require passing all collaborators between methods.

### 16. He’s the easy friend from the party
Many singletons are themselves abused as a global reference repository.
The temptation to use the singleton as an entry point for new references is huge.

There are many examples where a Singleton is used as a quick-reach reference container.

As if it was not enough to be the root of all evil he is also the easy friend of the party. In large projects, it just accumulates garbage to get out of trouble.

Since it does not have a corresponding entity on the bijection, adding responsibilities that do not correspond to it, is like adding one more stain to the tiger. Apparently without doing damage but generating ripple effect when wishing to do a healthy decoupling.

![images_RIiBoPtpMiRsMKX3dnzl5gb1Urj1-s21q3umz[1].jpeg](https://cdn.hashnode.com/res/hashnode/image/upload/v1598399872287/1vrhfU5gZ.jpeg)

## Reasons to use it
Having stated the arguments against Singleton let’s try to see the possible benefits:

### 1. It allows us to save up memory

This argument is fallacious according to the current state of the art of languages ​​with a decent virtual machine and garbage collector. It is enough to carry out a benchmark and look for evidence to convince us.

### 2. It’s good for unique concepts modeling

The Singleton can be used to guarantee the uniqueness of a concept. But it is not the only way or the best.
Let’s rewrite the previous example:

[Gist Url]: # (https://gist.github.com/mcsee/48af2ebb8874c53f5aa5091c24c832e5)
```php
<?

interface Religion {
    // Define common behavior for religions
}

final class God {
    // Different religions have different beliefs
}

final class PolythiesticReligion implements Religion {
    private $gods;

    public function __construct(Collection $gods) {
        $this->gods = $gods;
    }
}

final class MonotheisticReligion implements Religion {
    private $godInstance;

    public function __construct(God $onlyGod) {
        $this->godInstance = $onlyGod;
    }
}

// According to Christianity and some other religions,
// there’s only one God.
// This does not hold for other religions.

$christianGod = new God();
$christianReligion = new MonotheisticReligion($christianGod);
// Under this context God is unique.
// You cannot create or change a new one.
// This is a scoped global.

$jupiter = new God();
$saturn = new God();
$mythogicalReligion = new PolythiesticReligion([$jupiter, $saturn]);

// Gods are unique (or not) according to context
// You can create test religions with or without unicity
// This is less coupled since you break the direct reference to God class
// God class Single Responsibility is to create gods. Not to manage them
```

Access and creation of the single instance are not coupled. Creation is done through a factory and direct references to classes are decoupled. Furthermore, the factory can be easily mocked in test cases.

### 3. It prevents us from repeating expensive initializations

There are objects that require a certain cost of resources to create. If this cost is large, we will not be able to generate them constantly. One possible solution is to use a Singleton and have it available all time. As always we will focus on **what** and we will look for some other **hows** generating less coupling. If we need a single control point or a cache we will have to access a known object related to a certain context (and easily replaceable according to the environment, the test setup, etc.). Certainly a Singleton will not be our first choice.

# Solutions

There are multiple techniques to gradually remove the (ab)use of Singletons. In this article we list some of them:

[How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)

# Conclusions

The disadvantages listed in this article are much greater than the advantages, and the evidence from the examples in the industry should be a strong indicator of the **non-use of the evil pattern** in any case. As our profession matures, we will leave behind these kinds of bad solutions.

Part of the objective of this series of articles is to generate spaces for debate and discussion on software design.

We look forward to comments and suggestions on this article!

If you liked this post, you can follow me on [Twitter](https://twitter.com/mcsee1) where I share daily tips about coding and software design.