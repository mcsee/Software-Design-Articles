# Null: The Billion Dollar Mistake

![Null: The Billion Dollar Mistake](Null%20The%20Billion%20Dollar%20Mistake.png)

*He is not your friend. It does not simplify life or make you more efficient. Just more lazy. It is time to stop using null*

> TL;DR: The simple mistake that is causing a lot of problems.

# Tearing Down Another Inveteracy

You have been heavily using *null*.

It is comfortable, efficient, and fast, yet you have suffered a bazillion problems related to its use.

What cognitive bias currently prevents you from recognizing the problem and starting to solve it?

## What Does Null Stand For?

*Null* is a flag. It represents different situations depending on the context in which it is used and invoked.

This yields the most serious error in software development: Coupling a hidden decision in the contract between an object and who uses it.

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

As if this were not enough, it breaks the bijection which is the more important design rule. 

Representing multiple elements of the domain with the same entity forces you to have contextual interpretations.

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

A good software principle challenges you to have high cohesion. 

All objects should be as specific as possible and have a single responsibility (The S for [Solid](https://en.wikipedia.org/wiki/SOLID)).

The least cohesive object of any system is your wildcard: *null*

![null bijection](Null%20The%20Billion%20Dollar%20Mistake.png)

*Null* is mapped to several different concepts in the real-world.

## Catastrophic Failures

Null is [not polymorphic](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2045%20-%20Not%20Polymorphic/readme.md) with any object, so any function that invokes it will break the chain of subsequent calls.

Example 1: Let's model the interaction between people during the COVID-19 pandemic.

<!-- [Gist Url](https://gist.github.com/mcsee/ec7035f1f818db309662460fc8a59d96) -->

```php
<?

final class City {
   public function interactionBetween($somePerson, $anotherPerson) {
       if ($this->meetingProbability() < random()) {
          return null; // no interaction       
       } else {
          return new PersonToPersonInteraction(
             $somePerson, $anotherPerson);
       }
    }
}

final class PersonToPersonInteraction {
   public function propagate($aVirus) {
       if ($this->somePerson->isInfectedWith($aVirus) 
           && $aVirus->infectionProbability() > random()) {
           $this->anotherPerson->getInfectedWith($aVirus);
       }
   }
}

$covid19 = new Virus();
$janeDoe = new Person();
$johnSmith = new Person();
$wuhan = new City();

$interaction = $wuhan->interactionBetween($johnSmith, $janeDoe);
if ($interaction != null) {
    $interaction->propagate($covid19);
}

/* In this example we modeled the interaction 
between an infected person and a healthy one.
Jane is healthy but might be infected 
if Virus R0 applies to her. */
```

You can see two *null* flags and the corresponding if clause.

Null propagation seems to be contained, but looks are deceiving.

## A Little Bit of History

The creation of *null* happened due to a fortuitous event in 1965.

[Tony Hoare](https://en.wikipedia.org/wiki/Tony_Hoare): The creator of the QuickSort algorithm and also a winner of the Turing Prize (the Nobel Prize in Computing), added it to the [Algol](https://en.wikipedia.org/wiki/ALGOL_60) language because it seemed practical and easy to do. 

Several decades later, he showed his repentance:

This excellent article tells the story in detail:

[Null Pointer References](https://medium.com/@hinchman_amanda/null-pointer-references-the-billion-dollar-mistake-1e616534d485)

> I call it my billion-dollar mistake...At that time, I was designing the first comprehensive type system for references in an object-oriented language. My goal was to ensure that all use of references should be absolutely safe, with checking performed automatically by the compiler. But I couldn't resist the temptation to put in a null reference, simply because it was so easy to implement. This has led to innumerable errors, vulnerabilities, and system crashes, which have probably caused a billion dollars of pain and damage in the last forty years.
> -- Tony Hoare, inventor of ALGOL W.

The full video is also available [here](https://www.infoq.com/presentations/Null-References-The-Billion-Dollar-Mistake-Tony-Hoare/).

## The Excuse

You use *null* because it is easy (to write down) and because you believe it improves the efficiency of your software.

By making this mistake, you ignore that the code is read up to [10 times more than it is written](https://www.ybrikman.com/writing/2018/08/12/the-10-to-1-rule-of-writing-and-programming/).

Reading code with *nulls* is arduous. 

Therefore, you are only postponing the problem later.

Regarding efficiency (which is the most used excuse to [generate coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)).

Unless in very specific and critical cases, its performance loss is negligible. 

It is just justified in those systems that prioritize efficiency over readability, adaptability, and, maintainability (there's always a trade-off regarding quality attributes).

This cognitive bias persisted over time although according to the current state of the art, modern virtual machines optimize the code for you.

To use evidence instead of gut feelings, you need to start benchmarking instead of erroneously claiming that efficiency is more important than readability.

![Null Joke](Null%20Joke.jpg)

## Fail Fast

*Null* is (ab)used to mask unexpected situations and spread the error in the code too far away, generating the much-feared ripple effect.

[Code Smell 16 - Ripple Effect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2016%20-%20Ripple%20Effect/readme.md)

One of the principles of good design is to fail fast.

Example 2: Given a data entry form for a patient, you are requested to fill in the date of birth.

If there is an error in the visual component and the object creation, it could be built with a *null* date of birth.

When running some nightly batch process that collects all the dates of the patients to calculate an average age, the admitted patient will generate an error.

The stack with useful information for the developer will be very far from where the defect is present. Happy debugging!

![The Horror](The%20Horror.jpg)

Photo by [Victoria Heath](https://unsplash.com/@vheath) on [Unsplash](https://unsplash.com/s/photos/hacker)

What is more, there might be different systems with different programming languages, data transmission through an API, files, etc.

The developer's nightmare is having to debug that [defect](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md) early in the morning and try to find the problem's root cause.

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

## Incomplete objects

Null is used in many ways, as listed above. 

If you allow incomplete models, non-completeness is usually modeled with a *null*. 

This adds complexity by populating the code with controlling ifs.

The presence of nulls generates repeating code and messes up the code with multiple ifs controls.

Fostering incomplete models forces us to make two additional mistakes:

1. Pollute code with *setters* to complete the essential information needed.

[Nude Models - Part I: Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)

2. Build mutable models violating bijection ignoring real-world entities that do not mutate their essence.

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

### Typed languages ​​that do not handle optionally

Most typed languages ​​prevent errors by ensuring that the object that is sent as a parameter (or returned) can answer a certain protocol. 

Unfortunately, some of these languages ​​have taken the step backward of allowing to declare that the object is of a certain type and (optionally) null.

This breaks the chain of invocations forcing put Ifs to control the absence of the object violating the Solid [open/closed principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).

What's more, *null* corrupts type controls. If you use a typed language and trust the compiler defense network. 

*Null* manages to penetrate it like a virus and spread to the other types as pointed out below.

[The worst mistake of computer science](https://www.lucidchart.com/techblog/2015/08/31/the-worst-mistake-of-computer-science)

# The Solution

Do not use it.

# The Alternatives

As usual to solve all your problems, you should stay loyal to the only axiomatic design rule.

*Search the problem domain for solutions to bring them to your model.*

## Model polymorphic absences

In the above case when objects must declare a type, there are more elegant solutions that avoid *ifs* to model optionally.

In classification languages, it is enough to use the [NullObject design pattern](https://en.wikipedia.org/wiki/Null_object_pattern) in your concrete class sibling and declare the supertype as a type of the collaborator based on the [Liskov substitution principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle) (L of SOLID).

However, if you decide to implement that solution you will be violating another design principle stating:

*You should subclassify for essential reasons and not reuse code or adjust class hierarchies.*

The best solution in a classification language is to declare an interface to which both the real class and the null object class must adhere.

In the first example:

<!-- [Gist Url](https://gist.github.com/mcsee/bde14771106be4ffad1389a16f23c5c8) -->

```php
<?

Interface SocialInteraction {
    public function propagate($aVirus);
}

final class SocialDistancing implements SocialInteraction {
    public function propagate($aVirus) { 
    // Do nothing !!!!
    }
}

final class PersonToPersonInteraction implements SocialInteraction {
   public function propagate($aVirus) {
       if ($this->somePerson->isInfectedWith($aVirus) 
           && $aVirus->infectionProbability() > random()) {
              $this->anotherPerson->getInfectedWith($aVirus);
       }
   }
}

final class City {

    public function interactionBetween($aPerson, $anotherPerson) {
        return new SocialDistancing(); 
        // The cities are smart enough to implement
        // social distancing to model Person to Person interactions
    }
}

$covid19 = new Virus();
$janeDoe = new Person();
$johnSmith = new Person();
$wuhan = new City();

$interaction = $wuhan->interactionBetween($johnSmith, $janeDoe);
$interaction->propagate($covid19);

/* Jane will not be affected since the interaction
 prevents from propagating the virus */
```

No viruses are involved and neither ifs nor nulls!

In this example, *null* is replaced with a specialization that, unlike it, exists in the problem domain.

### The patient's birth date revisited

Let's go back to the patient's form example. You needed to compute the average leaving out not filled forms.

<!-- [Gist Url](https://gist.github.com/mcsee/eae5a5035af62088a004f24ed6074986) -->

```php
<? 

Interface Visitable {
    public function accept($aVisitor);
}

final class Date implements Visitable {
    public function accept($aVisitor) {
        $aVisitor->visitDate($this);
    }
}

final class DateNotPresent implements Visitable {
    public function accept($aVisitor) {
        $aVisitor->visitDateNotPresent($this);
    }
}

final class AverageCalculator {
    private $count = 0;
    private $ageSum = 0;

    public function visitDate($aDate) {
        $this->count++;
        $this->ageSum += today() - $aDate;
    }

    public function visitDateNotPresent($aDate) {
    }

    public function average() {
        if ($this->count == 0)
            return 0;
        else
            return $this->ageSum / $this->count;
    }
}

function averagePatientsAge($patients) {
    $calculator = new AverageCalculator();
    foreach ($patients as $patient)
        $patient->birthDate()->accept($calculator);
    return $calculator->average();
}
```

This example uses [Visitor pattern](https://en.wikipedia.org/wiki/Visitor_pattern) to navigate objects that can behave as null objects.

No nulls

Furthermore, you removed non-essential if using polymorphism and left the solution open to *other besides average* calculations through the open/closed principle.

You build a less algorithmic but more declarative, maintainable, and extensible solution.

### Use languages ​​with explicit modeling of absences

Some languages ​​support optionally the concept of Maybe/Optional which is a particular case of the proposed solution implemented above at the language level.

[Wikipedia](https://en.wikipedia.org/wiki/Option_type)

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Refactoring 015 - Remove NULL](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20015%20-%20Remove%20NULL/readme.md)

# Conclusions

Using *null* is a discouraged practice based on deep-rooted practices in the industry. 

Despite this, almost all commercial languages ​​allow it and developers use it.

You should, at least, begin to question its use and be more mature and responsible in developing software.

* * * * *

Part of the objective of this series of articles is to generate spaces for debate and discussion on software design.

[Object Design Checklist](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Object%20Design%20Checklist/readme.md)

I welcome your comments and suggestions on this article.

This article is also available in Spanish [here](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md), and Chinese [here](https://www.infoq.cn/article/UYYOS0VgETwcGmO1pH07).