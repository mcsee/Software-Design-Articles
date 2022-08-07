# How I Survived the Zombie Apocalypse

![How I Survived the Zombie Apocalypse](yohann-libot-f7NnOkM1yeU-unsplash.jpg)

*Selecting great test cases is very hard. Unless you summon the undead.*

# The Problem

Software Testing is a novel disciple for most developers. 

Quality Assurance Engineers have great methodologies for use cases creation.

Besides, [Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD) technique pushed developers into test writing world. _(Not testing world because **TDD is not a testing technique**)_.

But we are not ready yet.

# TDD Personal Journey

I came across TDD back in 2005. I fell in love with [XUnit](https://en.wikipedia.org/wiki/XUnit) regressions, domain discovery and full coverage.

TDD is an incredible technique but deciding *what* to test is cumbersome. 

I wrote TDD tests in a chaotic way for several years.

I'll summarize some things I learnt these years hoping to spare some time to new developers.

# The solutions

## Learn to differentiate Test Case against Test Data.

Most programmers love data and instantiation, and have difficulties dealing with abstract concepts.

They rush to create *test data* missing the big picture of choosing *relevant cases*.

Choosing *accurate data* representing *test cases* should be straightforward. The opposite is not true.

[Equivalence Partitioning](http://diranieh.com/Testing/TestCaseDesign.htm) is a technique for picking right *ambassadors*
partitioning all possible cases into a finite number of equivalence classes. 

You can reasonable assume that a test of a representative value of each class is equivalent to a test of any other value. 

## Number the tests

If you are developing TDD way creation order shows how you approached the problems. 

First cases should be easy to understand and very low coupled.

*Baby Steps* require we slowly increment our test complexity so we can gradually cope with it. Early green light is a priceless feedback.

## Pick Zombie representant

Zombie testing is an acronym for:

**Z** – Zero

**O** – One

**M** – Many (or More complex)

**B** – Boundary Behaviors

**I** – Interface definition

**E** – Exercise Exceptional behavior

**S** – Simple Scenarios, Simple Solutions

https://www.agilealliance.org/resources/sessions/test-driven-development-guided-by-zombies

## Example

Let's create an email message *T.D.D. Way*.

One behavior at a time!

* * *

Let's start from an empty test class:

```
TestCase subclass: #EmailMessageTest
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	category: 'Zombies'
``` 

* * *

First test will be our (Z)ero. Since we are working TDD, we have not defined  *EmailMessage* class yet.

```
test01ZeroRecipients

	self deny: (EmailMessage forRecipients: Array new) isValid

``` 

name test01ZeroRecipients is composed by

-  a prefix *test* mandatory in many testing frameworks. (*mandatory*)

- a sequential order (to incrementally show the learning/testing procedure). (*optional*)

- Zero/One/Many to represent zombies. (*optional*)

- a functional description (*mandatory*)

We start denying (asserting false) our first email will be valid. (since there are no recipients). 

(denying is equal to *asserting for not* but clearer to read and avoid double negatives).

We run our first test. 

*EmailMessage* class is not defined

```
Object subclass: #EmailMessage
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	category: 'TDD-Zombies'
``` 

*forRecipients:* (the constructor)

```
forRecipients: recipients 

	^self new initializeForRecipients: recipients 
``` 
The constructor creates the instance and initializes with the essence (no anti-pattern setters and no mutation from scratch).

[Nude Models - Part I: Setters](../../Theory/Nude%20Models - Part%20I Setters/readme.md)

[The Evil Power of Mutants](../../Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

The *private* initializer

```
initializeForRecipients: emailRecipients 
	
	recipients := emailRecipients.
``` 
initializer sets the private attribute. 

This is the first (good enough) implementation for *isValid*.

```
isValid
	 ^false 
``` 

*isValid* is hardcoded to *false*. 

This is one of TDD values. The simplest solution should be hardcoded.

First test passes!!!

* * *

Let's go for the (O)ne.


```
test02OneRecipient

	self assert: (EmailMessage forRecipients: (Array with: 'john@example.com')) isValid.

``` 
Test does not work since we hardcoded it to *false* in previous step.

We change *isValid* implementation.

```
isValid
	 ^recipients notEmpty 
``` 

This condition is more general. Now test01 and test02 work!

Let's add new protocol to test02. It should be a different test case but we will overload test02 so we stick to one test per zombie.

```
test02OneRecipient

	self assert: (EmailMessage forRecipients: (Array with: 'john@example.com')) isValid.
	self assert: (EmailMessage forRecipients: (Array with: 'john@example.com')) plain = 'to: john@example.com'.

``` 

*plain* message will return plain text from email. let's implement it.

```
plain
	 ^'to: ' , recipients first.
``` 
We concatenate *to:* header with the first recipient. Hardcoded.

* * *

(ZO) tests are ready. Let's go for the (M)any.

```
test03ManyRecipients

	| message |
	message := (EmailMessage forRecipients:
 (Array with: 'john@example.com' with: 'jane@example.com' with: 'lucas@example.com')).

	self assert: message plain = 'to: john@example.com,jane@example.com,lucas@example.com'.
	self assert: message isValid

``` 

At this point *is harder to fake it than to make it*. This is a hint we should refactor and make a generic solution instead of hardcoding.

Many is represented by a 3 elements collection. *isValid* is working but *plain* isn't.

```
plain
	 ^(recipients inject: 'to: ' into: [:plainText :address | plainText, address ,' ,' ]) allButLast		 
``` 

This idiom iterates over recipients (a private attribute, no getters), inserting a comma (,) and removing last one (*allButLast*). Since we have no *explode*.

[Nude Models - Part II: Getters](../../Theory/Nude%20Models - Part%20II Getters/readme.md)

3 tests working! (ZOM)

* * *

We should tackle (B)oundaries.

```
test04BoundaryRecipients

	| recipients |
	recipients := OrderedCollection new.
	1 to: 10 do: [:index | recipients add: ('john', index asString, '@example.com')].

	self deny: (EmailMessage forRecipients: recipients) isValid
``` 

We create 10 different emails john1@example.com, john2@example.com, ..., john10@example.com.

We decide 10 is an arbitrary upper limit for recipients size for this exercise.
Message with 10 recipients is not valid.

```
isValid
	 ^recipients notEmpty and: [recipients size < 10] 
``` 

This condition now checks for lower limits and upper ones. it is equal to:

```
isValid
	 ^recipients size between: 1 and: 9	 
``` 

Since we have **full coverage** we can change implementation any time!

* * *

ZOMB in. It is the time for (I)nterfaces checking.

```
test05InterfaceDefinition

	self should: [ EmailMessage forRecipients: 1 ] raise: Exception
``` 

If we try to create a message with an integer with are violating our interface, therefore it should raise an exception.


```
forRecipients: recipients 

	recipients do: [:eachAddress | 
		eachAddress isString
			ifFalse: [ self error: (eachAddress , ' is not a valid recipient')]].
		 
	^self new initializeForRecipients: recipients 
``` 

We validate addresses upon creation. No invalid objects here!

* * *

ZOMBI here ! How about (E)xceptional behaviour?

```
test06ExceptionalBehavior

	self should: [EmailMessage forRecipients: (Array with: 'john@example.com' with: 'john@example.com')] raise: Exception
``` 

Duplicates are invalid according to our domain. Let's check them!


```
forRecipients: recipients 

recipients do: [:eachAddress | 
    eachAddress isString
        ifFalse: [ self error: (eachAddress , ' is not a valid recipient')]].
    (recipients asSet size = recipients size)
        ifFalse: [self error: 'Duplicates'].
		 
    ^self new initializeForRecipients: recipients 
``` 

We check for duplicates mapping our recipients to a Set and checking both sizes. Not the most performant way. 

We need to keep the example working and avoid premature optimization. With all tests running we can optimize code.

[Code Smell 20 - Premature Optimization](../../Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

How about readability? Method is too ugly. Let's do TDD step 3: Refactor.

```
forRecipients: recipients 

     self assertAllAddressesAreValid: recipients.
     self assertThereAreNoDuplicates: recipients.		 
    ^self new initializeForRecipients: recipients 
``` 
That's better!

* * *

Last test! (S)imple Scenarios.
In this small piece there's no need. We can add one redundant way for teaching purposes:

```
test07SimpleScenarios

	self assert: (EmailMessage forRecipients: (Array with: 'john@example.com')) plain = 	'to: john@example.com'
``` 

And that's it. 
We have our model built with TDD and great confidence. Full coverage and no gold plating!.

- No empty constructors

[Code Smell 13 - Empty Constructors](../../Code%20Smells/Code%20Smell%2013%20-%20Empty%20Constructors/readme.md)

- Model is ummatable

- No setters

- No getters

- No accidental ifs

[How to Get Rid of Annoying IFs Forever](../../Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

- No Nulls

[Code Smell 12 - Null](../../Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

## Conclusions

With this tips we can do very basic test writing. 

That will be enough for TDD. 

TDD does no replace Quality Assurance process and QA Engineers would work together with developers to learn from each other. 

Developing software is a human and collaborative activity.

Let's enjoy it together!

* * *

# Credits

Photo by [Yohann LIBOT](https://unsplash.com/@yohannlibot) on [Unsplash](https://unsplash.com/s/photos/zombies)
