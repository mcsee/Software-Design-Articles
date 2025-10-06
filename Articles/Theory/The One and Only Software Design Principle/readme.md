# The One and Only Software Design Principle

![The One and Only Software Design Principle](The%20One%20and%20Only%20Software%20Design%20Principle.png)

*If we build our entire paradigm on a single rule, we can keep it simple and make excellent models.*

> TL;DR: Just follow this design principle

Being minimalist and being axiomatic means we can derive a set of rules from a single definition.

If we build our entire paradigm over one single rule we can [Keep It Simple, Stupid](https://en.wikipedia.org/wiki/KISS_principle) and make excellent models and thus excellent software.

One of the most underrated quality attributes of software is the kind of being predictable. 

[At the university and books they teach us that software should be fast, reliable, robust, secure, etc](https://books.google.com/books?id=mdiIu8Kk1WMC&pg=PA74&lpg=PA74&dq=clements+quality+attributes&source=bl&ots=UeR_V8ecOU&sig=ACfU3U25yW6Cbz9-Takxo2LNKrcc_yAPoA&hl=es-419&sa=X&redir_esc=y#v=onepage&q=clements%20quality%20attributes&f=false). 

Being predictable is almost nowhere on the top five design priorities.

We are going to make an exercise on object-oriented software design by stating just one principle:

> Each domain object must be represented by a single object in our computable model and vice versa.

![model](https://cdn.hashnode.com/res/hashnode/image/upload/v1598842979012/j-xiUt-jT.png)

The relationship between objects of the model and entities of the real-world is 1:1

We can see the justification of this model in this article:

[What is (wrong with) software?](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

We will then try to derive design rules and heuristics from that axiom, of course without contradicting it.

# The Problem

We will see that most of the language implementations used in the industry ignore this rule and this causes enormous problems.

Invoking difficulties that arose in the construction of software 3 or 4 decades ago and that they almost no longer exist or are present in a few domains

We keep on making monkey decisions and beating each other without knowing [the reason for such behavior.](https://www.youtube.com/watch?v=pgJ8-IaBSeY)

![monkeys](https://cdn.hashnode.com/res/hashnode/image/upload/v1598843041118/lvcCdU94B.jpeg)

Monkey and banana experiment

## Models to the rescue

When building models of any kind we want to simulate the conditions that occur in the observed real-world so that we can follow each element of interest in our simulation and stimulate it to observe the changes in the same way that they happen in the real-world.

Meteorologists make mathematical models to predict and anticipate the behavior of climate and most scientific disciplines are based on these simulations. 

With the rise of machine learning, we build black-box models to predict behaviors in real life.

## The importance of the bijection

In the domain of software and under the paradigm of objects we will always have one and only one object representing a real-world entity.

Let's try to prove by the absurd what would happen if we did not comply with the principles of being a bijection.

### Common cases in the industry that violate bijection

Case 1) We have an object in our computable model to represent more than one real-world entity. For example, many programming languages ​​model algebraic measures using the only scalar magnitude.

Then we can represent 10 meters and 10 inches (two completely different entities in the real-world) by a single object (the number 10).

We could add them together obtaining that in our model the number 10 (representing 10 meters) the number 10 (representing 10 inches) is equal to the number 20 (representing who knows what).

![broken bijection](https://cdn.hashnode.com/res/hashnode/image/upload/v1598843113002/Vr87N_Nbn.png)

Bijection is broken

This generates problems not always captured on time. Because it is a semantic fault, the error usually occurs long after the failure as in the famous case of the Mars Climate Orbiter.

[Full Story](https://www.latimes.com/archives/la-xpm-1999-oct-01-mn-17288-story.html)

![mars probe](https://cdn.hashnode.com/res/hashnode/image/upload/v1598843154032/6CvVfEHXa.jpeg)

The probe exploded by mixing different units of measurement

Case 2) Our computable model represents the same real-world entity with two objects.
Suppose we have in our observable real-world an athlete John Smith who competes in one discipline but who is also a judge in another athletic discipline.

A single person in the real-world should be a single object in our computable model. We need to model just the minimum behavior to fulfill our partial simulation.

If we have two different objects (a competitor and a judge) that represent Jane Doe, we will sooner or later have inconsistencies by wanting to assign some responsibility to one of the two and not see it reflected in the other.

![jane doe](https://cdn.hashnode.com/res/hashnode/image/upload/v1598843176464/--Dy6h_VM.png)

Jane Doe Is represented in our model by two different entities

Case 3) A bitcoin wallet can be represented as an anemic object (with some properties regarding address, balance, etc) or by a functional one (with responsibilities such as receiving transactions, writing to a blockchain, etc) but it's clear for someone who is not in software business they are related to the same concept. So the bijection must be held.

To solve these types of problems we must stop seeing entities as *data structures with attributes*, think of them as objects and understand that they are the same object fulfilling different roles depending on the context in which they are interacting.

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

Case 4) In most modern object programming languages, a date can be constructed by creating it from its day, month, and year.

We all learned that November 31st, 2020 can be created and that most of the languages ​​will gently return a valid object (probably December 1st, 2020).

But this disguised as a benefit is nothing but error hiding, generating a coupling dependency to the design decision made by the programming language and hiding a sure error in the data load.

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

The error will raise when running a nightly batch processing these dates far from the root cause violating the [Fail Fast](https://en.wikipedia.org/wiki/Fail-fast) principle.

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Conclusion 🏁

In this article, we define the only axiomatic design rule that we will respect no matter what by justifying the problems that come with not respecting it and laying the foundations for future definitions derived from it.

* * * * *

Part of the objective of this series of articles is to generate spaces for debate and discussion on software design.

[Object Design Checklist](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Object%20Design%20Checklist/readme.md)

We look forward to comments and suggestions on this article.

# Acknowledgements

Part of the ideas in this article was developed together with Hernán Wilkinson and all the members of the Software Engineering Staff on [*Universidad de Buenos Aires.*](https://www.isw2.com.ar/)

***

Spanish version: [El Único Principio de Diseño de Software Importante]()