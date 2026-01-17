# How I Survived the Zombie Apocalypse

![How I Survived the Zombie Apocalypse](How%20I%20Survived%20the%20Zombie%20Apocalypse.jpg)

*Selecting great test cases is very hard. Unless you summon the undead.*

> TL;DR: ZOMBIES are amazing!

# The Problem

Software Testing is a novel disciple for most developers. 

Quality Assurance Engineers have great methodologies for use cases creation.

Besides, [Test-Driven Development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD) technique pushed developers into test writing world. _(Not testing world because **TDD is not a testing technique**)_.

But we are not ready yet.

# TDD Personal Journey

I came across TDD back in 2005. I fell in love with [XUnit](https://en.wikipedia.org/wiki/XUnit) regressions, domain discovery and full coverage.

TDD is an incredible technique but deciding *what* to test is cumbersome. 

I wrote TDD tests in a chaotic way for several years.

I'll summarize some things I learned these years hoping to spare some time to new developers.

# The solutions

## Learn to differentiate Test Case against Test Data.

Most programmers love data and instantiation, and have difficulties dealing with abstract concepts.

They rush to create *test data* missing the big picture of choosing *relevant cases*.

Choosing *accurate data* representing *test cases* should be straightforward. The opposite is not true.

[Equivalence Partitioning](http://diranieh.com/Testing/TestCaseDesign.htm) is a technique for picking right *ambassadors* partitioning all possible cases into a finite number of equivalence classes. 

You can reasonably assume that a test of a representative value of each class is equivalent to a test of any other value. 

## Number the tests

If you are developing TDD way creation order shows how you approached the problems. 

First cases should be easy to understand and very low coupled.

*Baby Steps* require we slowly increment our test complexity so we can gradually cope with it. Early green light is a priceless feedback.

## Pick Zombie representative

Zombie testing is an acronym for:

**Z** – Zero

**O** – One

**M** – Many (or More complex)

**B** – Boundary Behaviors

**I** – Interface definition

**E** – Exercise Exceptional behavior

**S** – Simple Scenarios, Simple Solutions

[Agile Alliance](https://www.agilealliance.org/resources/sessions/test-driven-development-guided-by-zombies)

## Example

Let's create an email message *T.D.D. Way*.

One behavior at a time!

* * *

Let's start from an empty test class:

<!-- [Gist Url](https://gist.github.com/mcsee/3987806bf835c5ebab761e48cd41d812) -->

```smalltalk
TestCase subclass: #EmailMessageTest
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	category: 'Zombies'
```

* * *

First test will be our (Z)ero. Since we are working TDD, we have not defined  *EmailMessage* class yet.

<!-- [Gist Url](https://gist.github.com/mcsee/f726ea4db94f35f4c78229f1b228d757) -->

```smalltalk
test01ZeroRecipients

	self deny: (EmailMessage forRecipients: Array new) isValid
```

*name test01ZeroRecipients* is composed by

- a prefix *test* mandatory in many testing frameworks. (*mandatory*)

- a sequential order (to incrementally show the learning/testing procedure). (*optional*)

- Zero/One/Many to represent zombies. (*optional*)

- a functional description (*mandatory*)

We start denying (asserting false) our first email will be valid. (since there are no recipients). 

(denying is equal to *asserting for not* but clearer to read and avoid double negatives).

We run our first test. 

*EmailMessage* class is not defined

<!-- [Gist Url](https://gist.github.com/mcsee/b9e7be9c0ac92f05560f502ee902a2db) -->

```smalltalk
Object subclass: #EmailMessage
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	category: 'TDD-Zombies'
```

*forRecipients:* (the constructor)

<!-- [Gist Url](https://gist.github.com/mcsee/ed0a9229c83b0674856acbcb1ab920bf) -->

```smalltalk
forRecipients: recipients 

	^self new initializeForRecipients: recipients
```
 
The constructor creates the instance and initializes with the essence (no anti-pattern setters and no mutation from scratch).

[Nude Models - Part I: Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

The *private* initializer

<!-- [Gist Url](https://gist.github.com/mcsee/a1e56299999c6aa0197b10b85885e7bd) -->

```smalltalk
initializeForRecipients: emailRecipients 
	
	recipients := emailRecipients.
```
 
... initializer sets the private attribute. 

This is the first (good enough) implementation for *isValid*.

<!-- [Gist Url](https://gist.github.com/mcsee/69b53e20af1a46429d68d267d79eeb53) -->

```smalltalk
isValid
	 ^false
```

*isValid* is hardcoded to *false*. 

This is one of TDD values. The simplest solution should be hardcoded.

First test passes!!!

* * *

Let's go for the (O)ne.

<!-- [Gist Url](https://gist.github.com/mcsee/02ac3d40f2ae3303ba44c7ba820fa73a) -->

```smalltalk
test02OneRecipient

  self assert: 
	(EmailMessage forRecipients: (Array with: 'john@example.com'))
	  isValid.
``` 

Test doesn't work since we hardcoded it to *false* in previous step.

We change *isValid* implementation.

<!-- [Gist Url](https://gist.github.com/mcsee/2d8a68bcb47f09eac23e2f76dc118763) -->

```smalltalk
isValid
	 ^recipients notEmpty
```

This condition is more general. Now test01 and test02 work!

Let's add new protocol to test02. It should be a different test case, but we will overload test02 so we stick to one test per zombie.

<!-- [Gist Url](https://gist.github.com/mcsee/be475bace8de0e8cd43e0e8bddf6cfab) -->

```smalltalk
test02OneRecipient

  self assert: 
	(EmailMessage forRecipients: 
	  (Array with: 'john@example.com')) isValid.
  self assert: 
    (EmailMessage forRecipients:
	  (Array with: 'john@example.com')) plain =
	    'to: john@example.com'.
```

*plain* message will return plain text from email. let's implement it.

<!-- [Gist Url](https://gist.github.com/mcsee/007c86104223682666f1adf28c44ed0f) -->

```smalltalk
plain
	 ^'to: ' , recipients first.
```

We concatenate *to:* header with the first recipient. Hardcoded.

* * *

(ZO) tests are ready. Let's go for the (M)any.

<!-- [Gist Url](https://gist.github.com/mcsee/633a10a02ef16461f984232f526e169e) -->

```smalltalk
test03ManyRecipients

  | message |
  message := (EmailMessage forRecipients:
  (Array 
    with: 'john@example.com' 
    with: 'jane@example.com' 
    with: 'lucas@example.com')).

  self assert: message plain = 
	  'to: john@example.com,jane@example.com,lucas@example.com'.
  self assert: message isValid
```

At this point *is harder to fake it than to make it*. This is a hint we should refactor and make a generic solution instead of hardcoding.

Many is represented by a 3 elements collection. *isValid* is working but *plain* isn't.

<!-- [Gist Url](https://gist.github.com/mcsee/54b68cc746942d8a760c66ed8a7f0341) -->

```smalltalk
plain
 ^(recipients 
	 inject: 'to: ' 
	 into: [:plainText :address | plainText, address ,' ,' ]) 
	   allButLast
```

This idiom iterates over recipients (a private attribute, no getters), inserting a comma (,) and removing last one (*allButLast*). Since we have no *explode*.

[Nude Models - Part II: Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md)

3 tests working! (ZOM)

* * *

We should tackle (B)oundaries.

<!-- [Gist Url](https://gist.github.com/mcsee/a121cff81ab5d9a2d8339039c54e5ad2) -->

```smalltalk
test04BoundaryRecipients

  | recipients |
  recipients := OrderedCollection new.
  1 to: 
  10 do:
    [:index | recipients add: 
      ('john', index asString, '@example.com')].

  self deny: (EmailMessage forRecipients: recipients) isValid
```

We create 10 different emails john1@example.com, john2@example.com, ..., john10@example.com.

We decide 10 is an arbitrary upper limit for recipients size for this exercise.
Message with 10 recipients is not valid.

<!-- [Gist Url](https://gist.github.com/mcsee/1c1184060fc66426210e8ccf8def65d4) -->

```smalltalk
isValid
	 ^recipients notEmpty and: [recipients size < 10]
```

This condition now checks for lower limits and upper ones. it is equal to:

<!-- [Gist Url](https://gist.github.com/mcsee/eabc1dcce03647a563b080ad39826fd9) -->

```smalltalk
isValid
	 ^recipients size between: 1 and: 9
```

Since we have **full coverage** we can change implementation any time!

* * *

ZOMB in. It is the time for (I)nterfaces checking.

<!-- [Gist Url](https://gist.github.com/mcsee/384c56feb7405a3da2eb5de1679eeee9) -->

```smalltalk
test05InterfaceDefinition

	self should: [ EmailMessage forRecipients: 1 ] raise: Exception
```

If we try to create a message with an integer with are violating our interface, therefore it should raise an exception.	      

<!-- [Gist Url](https://gist.github.com/mcsee/3415d2d8e0ce1852b637f458b6995da6) -->

```smalltalk
forRecipients: recipients 

	recipients do: [:eachAddress | 
		eachAddress isString
			ifFalse: [ 
			   self error: (eachAddress , ' is not a valid recipient')] ].
		 
	^self new initializeForRecipients: recipients
```

We validate addresses upon creation. No invalid objects here!

* * *

ZOMBI here ! How about (E)xceptional behavior?

<!-- [Gist Url](https://gist.github.com/mcsee/813e219383065f5fb49644a359152b6f) -->

```smalltalk
test06ExceptionalBehavior

  self
    should:
	  [EmailMessage 
	    forRecipients:
		   (Array with: 'john@example.com' with: 'john@example.com')]
	raise: Exception
```

Duplicates are invalid according to our domain. Let's check them!

<!-- [Gist Url](https://gist.github.com/mcsee/4e89e1af82b6263d6dab30f0b752810c) -->

```smalltalk
forRecipients: recipients 

recipients do: [:eachAddress | 
    eachAddress isString
      ifFalse: [ 
		self error: (eachAddress , ' is not a valid recipient')] ].
    (recipients asSet size = recipients size)
      ifFalse: [
		self error: 'Duplicates'].
		 
    ^self new initializeForRecipients: recipients
```

We check for duplicates mapping our recipients to a Set and checking both sizes. Not the most performant way. 

We need to keep the example working and avoid premature optimization. With all tests running we can optimize code.

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

How about readability? Method is too ugly. Let's do TDD step 3: Refactor.

<!-- [Gist Url](https://gist.github.com/mcsee/e8d7a4668500c71c8d42aeef7782e971) -->

```smalltalk
forRecipients: recipients 

     self assertAllAddressesAreValid: recipients.
     self assertThereAreNoDuplicates: recipients.		 
    ^self new initializeForRecipients: recipients
```

That's better!

* * *

Last test! (S)imple Scenarios.
In this small piece there's no need. We can add one redundant way for teaching purposes:

<!-- [Gist Url](https://gist.github.com/mcsee/b0a0a25ca5a2e7609d5f73226cc94246) -->

```smalltalk
test07SimpleScenarios

  self assert: 
    (EmailMessage forRecipients:
	  (Array with: 'john@example.com')) plain = 'to: john@example.com'
```

And that's it. 
We have our model built with TDD and great confidence. Full coverage and no gold plating!.

- No empty constructors

[Code Smell 13 - Empty Constructors](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2013%20-%20Empty%20Constructors/readme.md)

- Model is immutable

- No setters

- No getters

- No accidental ifs

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

- No Nulls

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

## Conclusion 🏁

With this tips we can do very basic test writing. 

That will be enough for TDD. 

TDD doesn't replace Quality Assurance process and QA Engineers would work together with developers to learn from each other. 

Developing software is a human and collaborative activity.

Let's enjoy it together!

* * *

# Credits 🙏

Photo by [Yohann LIBOT](https://unsplash.com/@yohannlibot) on [Unsplash](https://unsplash.com/s/photos/zombies)
