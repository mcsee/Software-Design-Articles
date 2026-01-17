# Nude Models - Part II: Getters

![Nude Models - Part II: Getters](Nude%20Models - Part%20II Getters.jpg)

*Ye olde Reliable Data Structures and Their Controversial (Read) Access.*

> TL;DR: Why you should avoid getters

_Using objects as data structures is an established practice that generates many problems associated with the maintainability and evolution of software. It misuses brilliant concepts that were stated five decades ago. In this second part we will reflect on the_ **_reading_** _access of these objects._

In the first part of this article, we showed the transition from hidden information in data structures towards living objects responsibilities (the essential **what**) hiding the implementation (the accidental **how**).

[Nude Models - Part I: Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)

In this second part, we will show the drawbacks of using _getters_.

![Building](https://cdn.hashnode.com/res/hashnode/image/upload/v1598579222019/VLttZIpFk.jpeg) 

Photo by [Dominik Vanyi](https://unsplash.com/@dominik_photography) on [Unsplash](https://unsplash.com/s/photos/mining)

# The name that doesn't exist in real-world (Reprise)

Programmers conventionally use the names of the form **_getAttribute…()_** to expose (and lose control of) a previously private attribute. Due to the same arguments stated on setter’s [article](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md), this name cannot be [**mapped**](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) to a real-world equivalent through [**bijection**](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

The final conclusion regarding these names is:

> There should never be methods of the form setAttribute…() or getAttribute…()

# Do not expose collections

Many objects manage collections. The contents management, the invariants or the traversal method should be the **sole responsibility** of these objects.

Suppose we want to draw the polygon [presented on Part I](/dev-genius/nude-models-part-i-setters-77ac784a91f3), on a canvas. We will achieve it with the following code:

<!-- [Gist Url](https://gist.github.com/mcsee/7b491e643c6a3fe6cba647fa29162c5d) -->

```php
<?

$triangle = 
    new Polygon([new Point(1, 1), new Point(2, 2), new Point(3, 3)]);
$lastPoint = $triangle->getVertices()->last();
foreach ($triangle->getVertices() as $vertex) {
    $canvas->drawLine($vertex, $lastPoint);
    $lastPoint = $vertex;
}
```

Drawing a Polygon

By exposing the vertices collection (and since collections are [passed by reference](https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_reference) in most languages) we lose control over that collection.

Nothing prevents this other code from running:

<!-- [Gist Url](https://gist.github.com/mcsee/a154cc16b478e6146d185c788ead7a36) -->

```php
<?

  $triangle = new 
    Polygon([(new Point(1,1), new Point(2,2), new Point(3,3))]);
  array_shift($triangle->getVertices());
```

*array_shift()* removes the first value from the array

This causes the triangle to mutate, generating an inconsistency real-world bijection. Two-sided polygons would violate the principle of being a closed figure.

This defect will be noticed a long time later because it has not been detected in time, thus violating the fail fast principle.

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

> In no case shall such objects expose their collections, thus enforcing [Demeter’s law.](https://en.wikipedia.org/wiki/Law_of_Demeter)

In case you need to return the collected elements, you should answer with a copy ([shallow](https://en.wikipedia.org/wiki/Object_copying)) to avoid losing control. With the current state of the art, copying collections is extremely fast. If they were very large collections, there are design solutions with iterators, proxies and cursors to avoid performing the full copy operation.

## Iterating collections

How do we solve the polygon draw operation ?

[Iterating a collection](https://en.wikipedia.org/wiki/Iterator_pattern) is a well-known topic when working with design patterns:

If we want to go around our polygon, we can return an iterator (indicating **what** we need to do) without revealing our underlying data structure (**how** we traverse it).

<!-- [Gist Url](https://gist.github.com/mcsee/6a5a88acd88887469e762a91cbedb88c) -->

```php
<?

function iterator(): Iterator {
    return new ArrayIterator($this->vertices);
}
```

Returning an iterator allows the object to change its representation

In case of languages supporting [anonymous functions](https://en.wikipedia.org/wiki/Anonymous_function) or [closures](https://en.wikipedia.org/wiki/Closure_(computer_programming)), we could take the responsibility of iterating elements without exposing an iterator outwards:

<!-- [Gist Url](https://gist.github.com/mcsee/5d54b7dddaa7b707ea51d03e28508e32) -->

```php
<?

function verticesDo($function) {
    foreach ($this->vertices as $vertex) {
        $$function($vertex);
    }
}
```

## Mutating collections

Polygons must not mutate because vertices are part of their minimal **essence**: if we remove any of their vertices, they are no longer that polygon that makes them **unique**.

There are many business objects that can mutate in their accidental collections and there are mechanisms to manage such mutations.

If we wanted to model a _Twitter_ account and keep its followers, knowing the business rules, the account is created without followers.

_let’s ignore the suggestions that it offers us when creating the new account._

<!-- [Gist Url](https://gist.github.com/mcsee/d628f6f8a4382b668d6eae966bd6765e) -->

```php
<?

  final class TwitterAccount {
  private $followers;
  
  private function __construct() {
      $this->followers = [];
    }
  }
```

Using _setters_ and _getters_, a novice programmer would be tempted to add a follower in this way:

<!-- [Gist Url](https://gist.github.com/mcsee/a3345c7c768547dc37e3c4c90be97c32) -->

```php
<?

  $mcsee1 = new TwitterAccount('mcsee1');
  $pontifex = new TwitterAccount('pontifex');
  $mcsee1->getFollowers()[] = $pontifex;
```

A correct responsibility assignment guided by business rules suggests that it is the account’s responsibility to add a new follower, carry out validations (for example, that it is was not followed previously) and keep collection integrity.

Therefore, a better solution would be:

<!-- [Gist Url](https://gist.github.com/mcsee/cdc635137dd1b626c64ad3d8045f7f54) -->

```php
<?

  $mcsee1 = new TwitterAccount('mcsee1');
  $pontifex = new TwitterAccount('pontifex');
  $mcsee1->addFollower($pontifex);
```

## Double encapsulation

In the 90s there was a tendency to create a **double encapsulation** of attributes as an extreme approach on privacy. This means that, even from the private methods of an object, direct access to variables would be avoided.

This practice doesn't generate any benefits. Adds unnecessary indirection, and expose setters and getters in languages ​​that have no distinction between **public** and **private** methods.

In addition, it hides the **coupling** between an attribute and the direct methods that reference it, avoiding possible refactorings.

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

## Tell, don’t ask

There is a [principle](https://www.infoworld.com/article/2073723/why-getter-and-setter-methods-are-evil.html) that states:

> Don’t ask for the information you need to get the job done; ask the object that has the information to do the work for you

This principle is known as: [Tell, don’t ask](https://martinfowler.com/bliki/TellDontAsk.html).

It reminds us that, instead of requesting **data** from an object and acting on this data, we should tell an object **what** to do. This encourages movement of **behavior** along with the **knowledge** that the object is responsible for managing.

## Too much information can kill us

Paraphrasing Demeter’s Law and minimum coupling and maximum cohesion laws:

*   Each unit should have limited knowledge of others and only know those units closely related to itself.
*   Each unit should speak only to its friends and not speak to strangers.
*   Just talk to your immediate friends.

Adding **accidental** complexity with _setters_ and _getters_ implies generating coupling, violating these rules and generating a greater ripple effect in case of possible changes.

![Police Line](https://cdn.hashnode.com/res/hashnode/image/upload/v1598579634016/fQFvpDrIP.jpeg) Photo by [Macau Photo Agency](https://unsplash.com/@macauphotoagency) on [Unsplash](https://unsplash.com/s/photos/crime-scene)

## Setters and getters violate anthropomorphism

Let’s go back to our only design rule that asks for a [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between the model we are building and the real-world and respecting the principle of [Anthropomorphism](https://en.wikipedia.org/wiki/Anthropomorphism) (giving a living entity to each object).

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

In doing so, we will discover that the **responsibilities** we give to objects after they have been returned with a _getter_ do not **map** with the real-world violating [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

On this [page](https://www.yegor256.com/2014/09/16/getters-and-setters-are-evil.html#a-ball-and-a-dog) there is an excellent example of disrespected anthropomorphism when using _getters_.

## Changing the way we think

When we start to model our objects forgetting about their **accidental** representation, we will be able to avoid [anemic classes](https://en.wikipedia.org/wiki/Anemic_domain_model) (which only fulfill the function of saving data, resulting in a well-known [anti-pattern](https://en.wikipedia.org/wiki/Anti-pattern)).

As with data structures, there is no way for an anemic class to guarantee the integrity of your data and relationships.

Since operations on anemic classes are **outside** of anemic classes boundaries there is no **single point of control**. Therefore, we will generate both **repeated code** and access points to these attributes that exist in our model.
We will always pursue to emulate the behavior of objects like **black boxes**, getting much more realistic and declarative bijections.

# Recommendations

*   Do not use _setters_. There are no well-reasoned reasons for doing so.
*   Don’t use _getters_. In case any of the responsibilities of an object is related to responding to a message matching an attribute, do it thinking beforehand if we are not **breaking the encapsulation.**
*   Never prefix the function name with the word get. If a polygon in the real-world can answer what its vertices are, be it with the real-world name (**_vertices()_**).
*   In case of returning collections, return a **copy** or a **proxy** so as not to lose control and favor the use of iterators.
*   Have no **public** attributes. For practical purposes it is like having _setters_ and _getters_. It is also a _code smell_ of anemic objects.
*   Have no **public static** attributes. In addition to what is listed above the classes should be stateless and this is a code smell indicating that a class is being used as a global variable.

[Singleton - The Root of All Evil](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20Root%20of%20All%20Evil/readme.md)

## Transition from a legacy code system

Not all is bad news. Converting a bad model into a good one is possible through a correct **responsibilities reassignment,** and with the help of the appropriate refactors.

If we have the opportunity of improving a system with **good coverage**, we can gradually encapsulate the objects, restricting their access in an **incremental iterative way.**

In case of not having enough coverage we will be in front of a [legacy code system](https://en.wikipedia.org/wiki/Legacy_code) according to the excellent definition of [Michael Feathers](https://twitter.com/mfeathers):

> A legacy code system is one that has no coverage.

Should this be the case, we must **first cover** the existing functionality, and then we can carry out the necessary transformations.       

![Rainbow](https://cdn.hashnode.com/res/hashnode/image/upload/v1598579706117/BoxGDholW.jpeg)

Photo by [Greg Nunes](https://unsplash.com/@greg_nunes) on [Unsplash](https://unsplash.com/s/photos/rainbow)

# Conclusion 🏁

The well established practice of using _setters_ and _getters_ generates **coupling** and prevents the **incremental evolution** of our computer systems.

According to the arguments stated in this article, we should restrict their use as much as possible.

* * *

Part of the objective of this series of articles is to generate spaces for debate and discussion on software design.

We look forward to comments and suggestions on this article.

This article is also available in Spanish [here](https://medium.com/dise%C3%B1o-de-software/modelos-desnudos-parte-ii-getters-8432b8c6e4f3).