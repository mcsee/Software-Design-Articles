# How to Squeeze Test Driven Development on Legacy Systems

![How to Squeeze Test Driven Development on Legacy Systems](How%20to%20Squeeze%20Test%20Driven%20Development%20on%20Legacy%20Systems.jpg)

> TL;DR: A guide to use TDD on Legacy Systems

*We all love T.D.D. We know its benefits, we have read a thousand tutorials on how to build a system using this technique. But this not feasible for currently legacy systems.*

# What is TDD? 

[Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD) is a software **DEVELOPMENT** process that relies on the repetition of a *very short* development cycle.

We turn requirements into very specific test cases.

We improve software so all tests pass. 

This is opposed to incorporating functionality that has not been proven to comply with requirements. 

Created in 2003 by Kent Beck (also the [xUnit testing Framework](https://en.wikipedia.org/wiki/XUnit) testing system author).

## The Cycle

1) Add a test (*it must fail*)

Solely based on behavior. Forgetting everything about accidental implementation.

2) Run all tests.
The new test must fail. All the rest should pass.

3) Write the simplest possible solution to make the test pass.
The programmer must not write code that is beyond the functionality the test checks. ([K.I.S.S.](https://es.wikipedia.org/wiki/Keep_It_Simple) and [Y.A.G.N.I](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it) design principles)

If the all test passes restart the process or ...

4) (optionally) make a refactor (when code stinks).

**NEVER DO BOTH 1 and 4 Together.**

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)

## Design Benefits 

* Testability and better class interfaces

* Simpler designs (KISS, YAGNI, Gold Plating avoidance, [Fake it till you make it](https://en.wikipedia.org/wiki/Fake_it_till_you_make_it), [Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md))

* Isolation on failures (less debugger or logging uses).

* Design by contracts. 

* Modularization 

* Bottom up building.

* Normal Use cases and Exceptions (Alternate cases) separation.

* Full branches coverage (we cannot add code without a test covering it). 

* Instant feedback / psychological rewards.

* Small steps incremental approach.
 
* Based on Wittgenstein learning ideas by incremental examples and Cognitive Behavioral Therapy.

* Defer implementation issues and Premature optimization.

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

## Requirements

Test must be in *full environmental control*.

No Globals, No [Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20root%20of%20all%20evil/readme.md), [No Settings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2029%20-%20Settings%20-%20Configs/readme.md), No [Database](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2031%20-%20Accidental%20Methods%20on%20Business%20Objects/readme.md), No Caches, No External API Calls and no side effects at all.

TDD can detect [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) problems. 

Solving them leads to cleaner code focused on business logic alone and *encapsulating [implementation decisions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md)*. 

We must deal with coupling problems using *test doubles*: [mocks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md), stubs, fake objects, spy, proxies, dummy objects, etc.

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Working on existing systems

According to the popular myth, we can't use TDD on existing systems. This is not true. Let's show an example.

[How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)

## The real-world example

* We have a ticketing system needing to showcase several artists performing live-streaming during COVID-19 pandemic.

* Users can search for artists based on a type-ahead selector on a React application.

* System performs database queries on a heavy concurrent back-end system.

* We need to remove *redundant* SQL queries matching part of artists names. 

* [Like SQL Operator](https://www.w3schools.com/sql/sql_like.asp) is very expensive on relational systems, and we are not allowed to change back-end architecture.

# The Problem

We need to simplify redundant searches. That's all.

<!-- [Gist Url](https://gist.github.com/mcsee/e440f9528ac25f93eea05b6e162e60db) -->

```sql
SELECT * FROM ARTISTS
WHERE ((artist.fullname LIKE '%Arcade Fire%')
OR (artist.fullname LIKE '%Radiohead.%') 
OR (artist.fullname LIKE '%Radiohead%') 
OR (artist.fullname LIKE '%Sigur Ros%') 
OR (artist.fullname LIKE '%Sigur%')))
…
```

System will execute just:

<!-- [Gist Url](https://gist.github.com/mcsee/6bbc4c4e9718114546d113d86edf2dca) -->

```sql
SELECT * FROM ARTISTS
WHERE ((artist.fullname LIKE '%Arcade Fire%')
OR (artist.fullname LIKE '%Radiohead%') 
OR (artist.fullname LIKE '%Sigur%')))
…
```

Since this part is redundant and expensive to the database:

<!-- [Gist Url](https://gist.github.com/mcsee/9dfb863ad16e502ba99b367f668d25d1) -->

```sql
OR (artist.fullname LIKE '%Radiohead.%') 
OR (artist.fullname LIKE '%Sigur Ros%') 

/*This part is unnecessary */
```
   
## Let's get to work

> Always start with the simplest problem 
 
1) Add a test (empty case) 

<!-- [Gist Url](https://gist.github.com/mcsee/9c07677d781d362b513265371ee425ae) -->

```php
<?
use PHPUnit\Framework\TestCase; 
   
class LikePatternSimplifierTest1 extends TestCase {
   function test01NoPatternsShouldReturnEmpty() {
       $this->assertEquals(
           [],
           (new LikePatternSimplifier())->simplify([]));
   }
}
```

Notice:
* Class **LikePatternSimplifier** is not created yet.
* No function **simplify()** is defined.
* We number tests according to definition order.
* First test is the easiest one and also the *Zero Case* of Zombies methodology.

[How I Survived the Zombie Apocalypse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD/How%20I%20Survived%20the%20Zombie%20Apocalypse/readme.md)

> Test fails (as expected). Let’s create the class and the function.

3) Write the simplest possible solution to make the test pass.

<!-- [Gist Url](https://gist.github.com/mcsee/32aa44cff1af0494bed7666bbf9ec68c) -->

```php
<?

final class LikePatternSimplifier {
    function simplify(array $patterns): array {
        return [];
    }
}
```

Notice:
* First solution is always hard-coded.

* * *

> Continue with another trivial case

1) Add a test (simple expression) 

<!-- [Gist Url](https://gist.github.com/mcsee/a4076fb03f7af62a82d88ee7d803ae3f) -->

```php
<?

function test02SinglePatternDoesNotSimplify() {
    $this->assertEquals(
        ['Arcade Fire'],
        (new LikePatternSimplifier())->simplify(['Arcade Fire']));
}
```

3) And the simplest solution for both cases.

<!-- [Gist Url](https://gist.github.com/mcsee/548c0df24149b087b6e5bd30e3e866c0) -->

```php
<?

   function simplify(array $patterns): array {
      return $patterns;
   }
```

Works like a charm in both cases.

We are taking **baby steps**, **slicing** the problem and following **divide and conquer** principle.

* * *

> Continue with another (not so simple) case:

1) Add a test (two independent expressions).

<!-- [Gist Url](https://gist.github.com/mcsee/63f2766fcbb24aeb2fe03c2b4be15166) -->

```php
<?
   function test03TwoUnrelatedPatternsDontSimplify() {
      $this->assertEquals(
          ['Arcade Fire' , 'Radiohead.'],
          (new LikePatternSimplifier())->simplify(
              ['Arcade Fire' , 'Radiohead.']));
   }
```

Code works correctly without changes. Is this a good test?

We will discuss it on a more advanced article.

Let's move on.

* * *

> Continue with a desired and juicy business case.

1) Add a test (one expression containing the other).

<!-- [Gist Url](https://gist.github.com/mcsee/9719eeea751c2eef90efb6717bf8503b) -->

```php
<?

  function test04LeftPatternIncludedInRightOneShouldBeSimplified() {
    $this->assertEquals(
        ['Sigur'],
        (new LikePatternSimplifier())->simplify(
            ['Sigur', 'Sigur Ros']));
  }
```

> Let’s make it work.

3) Add the simplest solution for all the already written cases.

This is an ugly algorithmic solution, but we will improve it with a refactoring once we become more confident.

We cannot *fake it* anymore. We need to *make it*.

<!-- [Gist Url](https://gist.github.com/mcsee/ff2a499a73034fa621ae684742de6d0a) -->

```php
<?

function simplify(array $patterns): array {
    return array_values(array_filter($patterns,
        function ($outerPattern) use ($patterns) {
            foreach ($patterns as $innerPattern) {
                if ($outerPattern != $innerPattern &&
                    substr_compare(
                        $outerPattern, 
                        $innerPattern,
                        0,
                        strlen($innerPattern)
                        )
                        === 0) {
                    return false;
                }
            }
            return true;
    }));
}
```

Ugly, not performant, undeclarative and complex.

We don't care. We need to gain confidence and learn on the domain.

Luckily, we will soon have time for better solutions.

* * *

> Continue with another case.

1) Add a test (left expression containing the right one) 

<!-- [Gist Url](https://gist.github.com/mcsee/851bbc77560f890f6676031d2c1cb033) -->

```php
<?

function test05RightPatternIncludedInLeftOneShouldBeSimplified() {
    $this->assertEquals(
        ['Sigur'],
        (new LikePatternSimplifier())->simplify(
            ['Sigur Ros', 'Sigur']));
}
```

… and we are Green, so we are covering the business rule stating that terms order is not relevant. (Commutative Property).

We make it explicit so no smart refactor can ever break it!

* * *

> Move on with another (not so simple) case.

1) Add a test (Capitalization is not relevant to MYSQL engine but our users might not be aware of that) 

<!-- [Gist Url](https://gist.github.com/mcsee/5e195837ad99e937c9951d4cea7b5036) -->

```php
<?

function test06CapitalizationIsNotImportantWeMustSimplify() {
    $this->assertEquals(
        ['Sigur'],
        (new LikePatternSimplifier())->simplify(
            ['SIgur rOs', 'Sigur']));
}
```

2) We run the tests and **the new one** is broken. Let’s fix it!

3) The simplest solution for all the already written cases (with the new case).

<!-- [Gist Url](https://gist.github.com/mcsee/e0db739062069689de3efcd018192e39) -->

```php
<?

function simplify(array $patterns): array {
    return array_values(array_filter($patterns,
        function ($outerPattern) use ($patterns) {
        foreach ($patterns as $innerPattern) {
            if ($outerPattern != $innerPattern &&
                substr_compare(
                    $outerPattern,
                    $innerPattern,
                    0,
                    strlen($innerPattern),
                    true)
                  === 0) {
                return false;
            }
        }
        return true;
    }));
}
```

… and tests are all green again with the ugly improved solution.

* * *

Code smells and we have several test cases. We need a better solution.

4) Let’s refactor the solution with a more efficient and readable one

<!-- [Gist Url](https://gist.github.com/mcsee/0beea3108976e868fdc78292b24ffbf4) -->

```php
<?

private function alreadyIncludesPattern(
    array $patterns, string $needlePattern): bool {
    foreach ($patterns as $innerPattern) {
        if ($needlePattern != $innerPattern &&
            substr_compare
                ($needlePattern,
                 $innerPattern,
                 0,
                 strlen($innerPattern), true) === 0) {
            return false;
        }
    }
    return true;
}

function simplify(array $patterns): array {
    return array_values(array_filter($patterns,
        fn ($outerPattern) => $this->alreadyIncludesPattern(
            $patterns, $outerPattern)));
}
```

* * *

> Let’s test first production scenario requested by customers.

1) Add two unrelated redundant prefixes

<!-- [Gist Url](https://gist.github.com/mcsee/2bd6fdca179095400a4f5f6f9e52a696) -->

```php
<?

function test07MultipleRelatedPatternsSimplifyTwoOfThem() {
    $this->assertEquals(['Arcade Fire', 'Radiohead', 'Sigur'],
        (new LikePatternSimplifier())->simplify(
            ['Arcade Fire',
             'Radiohead.',
             'Radiohead',
             'Sigur Ros',
             'Sigur']));
}
```

And it works !

* * *

> We inject it on our legacy code:

Before

<!-- [Gist Url](https://gist.github.com/mcsee/25cb8c5f34c73399e24d9b338941f687) -->

```php
<?

private function addTerms(string $SQLSelect) {
    $selectSentence = $this->createSqlWhere();
    foreach ($this->texts() as $text) {
        $selectSentence->addWhere(
            $this->tableAlias() . 
            " LIKE '%" . 
            $this->sanitize($text) .
            "%'");
    }
    $SQLselect->addWhere($selectSentence->asSQLSentence());
}
```

Let's inject it.

<!-- [Gist Url](https://gist.github.com/mcsee/820585e06dad19fde4cddd17d357a473) -->

```php
<?

private function addTerms(string $SQLselect) {
    $selectSentence = $this->createSqlWhere();
    // INJECTED CODE
    $simplifiedTerms = 
        (new LikePatternSimplifier())->simplify($this->texts());
    // INJECTED CODE
    foreach ($simplifiedTerms as $text) {
        $selectSentence->addWhere(
            $this->tableAlias() .
            " LIKE '%" .
            $this->sanitize($text) .
            "%'");
    }
    $SQLselect->addWhere($selectSentence->asSQLSentence());
}
```

* * *

![Old car](https://cdn.hashnode.com/res/hashnode/image/upload/v1606153347776/Old%20car.jpeg)

# What really happened

Up to here, we worked in isolation scenario. 

Software development is a group activity. 

The quality assurance engineers found additional possible benefits.

Pattern could be in the middle of the string. 

Customer agreed to add this functionality.

> Lets consider those cases

<!-- [Gist Url](https://gist.github.com/mcsee/ab38f62dcecbe3f1a421f4eddca93b9b) -->

```php
<?

function test08LeftPatternMiddleOfRightOneShouldSimplify() {
  $this->assertEquals(
      ['house'],
      (new LikePatternSimplifier())->simplify
      (['house', 'casahousecasa']));
}

function test09RightPatternMiddleOfLeftOneShouldSimplify() {
  $this->assertEquals(
      ['medio'],
      (new LikePatternSimplifier())->simplify(
          ['enmediodetodo', 'medio']));
}

function test10RightPatternMiddleOfLeftOneUnrelatedShouldSimplify() {
  $this->assertEquals(
      ['medio', 'nada'],
      (new LikePatternSimplifier())->simplify(
          ['enmediodetodo', 'medio', 'nada']));
}

// Test data were suggested by Spanish speaking QA Engineers
```
  
* * *

New cases are broken since they were not represented by a previous one. We keep fixing them.

4) Let’s change the solution to cover all previous cases and the new ones.

<!-- [Gist Url](https://gist.github.com/mcsee/c1a978fb7b7ca24fed559ab83844887c) -->

```php
<?

private function alreadyIncludesPattern(
    array $patternsWithoutDuplicates, string $needlePattern): bool {
    foreach ($patternsWithoutDuplicates as $innerPattern) {
        if ($needlePattern != $innerPattern &&
            (stripos($needlePattern, $innerPattern) !== false)) {
            return false;
        }
    }
    return true;
}

function simplify(array $patterns): array {
    return array_values(array_filter($patterns,
        fn ($outerPattern) =>
            $this->alreadyIncludesPattern($patterns, $outerPattern)));
}
```

## The end is the beginning

- TDD works in all stages.

- Using CI/CD codefix went into production.

- Happy ending.

![ok](https://cdn.hashnode.com/res/hashnode/image/upload/v1605840867027/ok.png)

Once we submitted the *intelligent* SQL simplifier something bad happened.

This was actual SQL after terms of bad handling:
```						   
SELECT * FROM artists WHERE (())      										   ``` 

This SQL generation mistaken as an empty condition.

* * *

> So we will fix it TDD Way.
We isolate the defect and add it as a broken TDD Case

<!-- [Gist Url](https://gist.github.com/mcsee/399681e65513e52b989477831d2c1f69) -->

```php
<?

function 
    test12SamePatternsDifferentCaseShouldYieldJustOneTermLowercase() {
    $this->assertEquals(
        ['yes'],
        (new LikePatternSimplifier())->simplify(
            ['yes', 'Yes']));
}
```

Of Course, it fails since previous implementation brought an empty solution (and a customer complaint).

We can fix it by doing a duplicate's remover case-insensitive pre-processor at the beginning of simplify function:

<!-- [Gist Url](https://gist.github.com/mcsee/0dae05cfead4089b3da9c93669e193f1) -->

```php
<?

private function removeDuplicates(
  array $patternsWithPossibleDuplicates): array {
  return array_intersect_key(
      $patternsWithPossibleDuplicates,
      array_unique(
          array_map("strtolower", $patternsWithPossibleDuplicates)));
}

function simplify(array $patterns): array {
  $patternsWithoutDuplicates = $this->removeDuplicates($patterns);
  return array_values(array_filter($patternsWithoutDuplicates,
      fn ($outerPattern) => 
         $this->alreadyIncludesPattern(
             $patternsWithoutDuplicates, $outerPattern)));
}
```

To see if we must test private methods please visit [shoulditestprivatemethods.com](shoulditestprivatemethods.com) 

* * *

Tests are green again. 

Not dealing with case-sensitive duplicate's algorithm worked again.

> Lets consider a different order.

<!-- [Gist Url](https://gist.github.com/mcsee/b82191e3251fff7d23fb97bc640f7dae) -->

```php
<?

function 
    test13SamePatternsDifferentCaseDifferentOrderSimplifyLowerCase() {
    $this->assertEquals(
        ['yes'],
        (new LikePatternSimplifier())->simplify(
            ['Yes', 'yes']));
}
```

> Against our intuition we see it fails.

This is because the unit is bringing a ‘Yes’ instead of a ‘yes’.

The solution depends on the product owner. We can:

1) normalize all outputs.

2) change the test based on the property that our *SQL Engine* is case-insensitive on text fields.

We choose 2) 

* * *

Tests are green again

> We add more tests considering mixed cases

<!-- [Gist Url](https://gist.github.com/mcsee/04555137bdad3fd71b3845e21c0e8585) -->

```php
<?

function test14SamePatternsDifferentCaseWithExtraSimplifyTwo() {
    $this->assertEquals(
        ['Yes', 'no'],
        (new LikePatternSimplifier())->simplify(
            ['Yes', 'yes', 'no']
        )
    );
}

function test15TwoPairsOfPatternsDifferentCaseSimplifyTwo() {
    $this->assertEquals(
        ['Yes', 'no'],
        (new LikePatternSimplifier())->simplify(
            ['Yes', 'yes', 'no', 'No']
        )
    );
}

function test16TwoPairsOfPatternsDifferentCaseExtraSimplifyThree() {
    $this->assertEquals(
        ['Yes', 'no', 'Sure'],
        (new LikePatternSimplifier())->simplify(
            ['Yes', 'yes', 'no', 'No', 'Sure']
        )
    );
}

function test17TwoPairsOfPatternsDifferentCaseTrickySimplifyTwo() {
    $this->assertEquals(
        ['Yes', 'no'],
        (new LikePatternSimplifier())->simplify(
            ['Yes', 'yes', 'no', 'No', 'Not Sure']
        )
    );
}
// ’Not sure’ is a special case of ‘No’ 
// which makes sense in a like pattern
```

* * *

## Missing Opportunities

Tests worked with the new Solution and given expected SQL.

Case went to peer review.

One of the reviewers asked about *not like* comparison finding an improvement opportunity.

We asked our customer-on-site for agreement.

If user chooses not to see *‘head*’ => it is choosing not to see *‘Radiohead‘* and *Talking heads*.

In SQL: NOT LIKE ‘%head%’ implies NOT LIKE ‘%Radiohead%’ which is redundant in an AND condition.

Our simplifier was already aware of that, so we injected in a second place being confident tests were already covering that scenario.

* * *

# Conclusion 🏁

- Quality Assurance engineering should add a broken integration test before correcting the implementation that should comply with it.

- Implementing on a big system requires special techniques to gradually remove coupling.

- TDD influenced all the written code.
We have all the new code covered. (17 unit tests and 3 SQL Generation tests).

- We gained confidence on every new case add ensuring they didn’t break previous ones.

- We should [only test private methods](http://shoulditestprivatemethods.com/) using method objects/FunctionAsObject or reflection.

- We used TDD on Development, Code Review, QA fixing and Production Defects Life-cycle.

- We developed a parallel customer system (the tests). They will always be our first omnipresent user.

- Solutions were as simple as possible.

- It’s __very possible__ to make TDD on existing projects with lots of code.

- TDD does not replace or overlap QA Process and tasks. 

- Multiple roles were involved and added value: Developers, QA engineers, Customers and Code Reviewers.

- We faked it until we made it.

- TDD does **not guarantee** a good design.

- We should never **change or optimize** not covered code.

* * *

> Legacy Code is all the code without tests.

_Michael Feathers_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

#Credits

<span>Photo by [Anne Nygård](https://unsplash.com/@polarmermaid) on [Unsplash](https://unsplash.com/s/photos/old-junk-car)

* * *

Part of the objective of this series of articles is to generate spaces for debate and discussion on software design.

[Object Design Checklist](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Object%20Design%20Checklist/readme.md)

We look forward to comments and suggestions on this article.

If you like this article please [let me know](https://twitter.com/mcsee1), so I can write more on TDD on Legacy systems.