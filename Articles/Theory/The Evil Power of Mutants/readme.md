# The Evil Power of Mutants

![The Evil Power of Mutants](The%20Evil%20Power%20of%20Mutants.jpg)

> TL;DR: Favor immutable objects

Since the very beginning of the stored-program concept, we learned that software is Programs + Data. It is clear that without data there is no software.

In object-oriented programming we build models that evolve over time, emulating the knowledge we learn by observing the reality we are representing.

[What is (wrong with) software?](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

However, we manipulate and abuse those changes uncontrollably, violating the only important design principle by generating incomplete (and therefore invalid) representations and propagating the ripple effect with our changes.

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

In the functional paradigm, this is elegantly achieved by directly forbidding mutations. We can be (a little) less drastic.

# Returning to the essential

The great [Fred Brooks](https://en.wikipedia.org/wiki/Frederick_Brooks) gave us a few thoughts. Among others, he told us about [The myth of pregnant women,](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) he taught us to be suspicious of silver bullets and educated us on the separation of accidental vs. essential complexity.

> The essence of an entity of reality is that which makes it be itself and not another.

[No Silver Bullet](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md)

The entity's accident happens due to temporary situations that despite changing object behavior do not prevent us from noticing we are watching the same entity even though it evolves as we do not [bathe twice in the same river.](https://www.goodreads.com/quotes/117526-no-man-ever-steps-in-the-same-river-twice-for)

![River Bath](River%20Bath.jpg)

Photo by [Alexander McFeron](https://unsplash.com/@alexmcferon) on [Unsplash](https://unsplash.com/s/photos/bath-on-river)

Being true to our bijection, in our computable model, we should be able to distinguish when an object changes in terms of the accidental and prohibit all essential changes (because they would violate that bijection which is our only principle).

> Objects should know how to defend themselves against invalid representations. They are the powers against mutants.

## Is data ok?

In most countries, an invoice is a written and unchangeable document. Altering it has criminal consequences similar to what happens with a transaction in a blockchain chain or a ledger.

In this problem domain, immutability is a rule, therefore our simulations must respect it.

However, those of us who have worked in economic, financial, or banking domains have built systems that violate these rules systematically.

Some excuses are related to *laziness* or *performance* (our favorites).

As a personal anecdote, in one of my first jobs for a large international bank, we modeled financial transactions with an *isDataOK* attribute that we had as a Boolean flag.

The flag was unset until we made sure that the transaction was indeed a valid and actionable transaction. 

This brought us multiple coupling problems on multiple occasions.

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

Besides, many of those fields remained with null values ​​(instead of modeling the incompleteness or indefiniteness of the data), so we had to spread the code with multiple controls by *ifs* to validate that some data against nulls.

[Null: The Billion Dollar Mistake](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

Thinking about how to build a solution to the problem we were solving at the time, I found the answer on our only axiom: Bijection one by one with reality.

Let's revisit our 90s code:

[Gist Url]: # (https://gist.github.com/mcsee/2ee0069b851c3500a6fae00c8ee14458)

```php
<?

class Movement {
    public $party;
    public $counterparty;
    public $amount;
    public $date;
    public $isDataOK = false;
}
```

A hollow class with a lot of attributes and no encapsulation but with a flag (*isDataOK*) should when it could be safely used.
Let's start by hiding the decision to know when it is an actionable movement.

[Gist Url]: # (https://gist.github.com/mcsee/cddb71ed240ece973d686766b653bd96)

```php
<?

class Movement {
function isDataOK(): bool {
        return !is_null($this->party) && 
                !is_null($this->counterparty) && 
                !is_null($this->amount) && 
                !is_null($this->isDataOK);
    }
}
```

Then let's go on encapsulating the movement's attributes:

[Gist Url]: # (https://gist.github.com/mcsee/e85dba7a09f16494f7b956667419ae6c)

```php
<?

private $party;      

function getParty() {
    return $this->party();
}

function setParty($aParty) {
    $this->party = $aParty;
}
// .....
```

This movement is mutable (despite not being so in the real-world). We must ensure that it behaves as our observed entity.

[Gist Url]: # (https://gist.github.com/mcsee/9247c16a3af3a743b2c60ca479762a05)

```php
<?

final class Movement {
    private $party;
    private $counterparty;
    private $amount;
    private $date;

    function __construct($aParty, $aCounterParty, $anAmount, $aDate) {
        $this->party = $aParty;
        $this->counterparty = $aCounterParty;
        $this->amount = $anAmount;
        $this->date = $aDate;
    }
}
```

Simple, elegant, immutable, without dataOk, always valid, without setters or getters.

Movement is valid from inception, just as it happens in the real-world.

Now let's assume that a business rule prevents us from making movements between the same party and counterparty (this happens in the real-world).

In our first version, this control would be impossible. In the immutable version we only represent real situations, it will be enough to prevent the construction of these objects.

[Gist Url]: # (https://gist.github.com/mcsee/08bc4e593f42ce14460f95de78be8db9)

```php
<?

function __construct($aParty, $aCounterParty, $anAmount, $aDate) {
   if ($aParty == $aCounterParty) {
      throw new 
         PartyAndCounterpartyCannotBeTheSameException(
            $aParty, 
            $aCounterParty);
   }
   $this->party = $aParty;
   $this->counterparty = $aCounterParty;
   $this->amount = $anAmount;
   $this->date = $aDate;
}
```

## Times are changing

We are going to continue the previous example focusing on the date on which said the transaction was made.
In the real-world, a date represents a day on an arbitrary calendar.

![Walking Dates](Walking%20Dates.jpg)

If we create a movement in bitcoins for [May 12, 2020's halving event](https://www.cnbc.com/2020/05/08/bitcoin-btc-cryptocurrency-prices-rise-as-halving-approaches.html) and we recreate it in our computable model we will have something like this.

[Gist Url]: # (https://gist.github.com/mcsee/821d9499b2518d47f192faa6c0f0294c)

```php
<? 
  $halvingTransaction = new Movement(
    $wallet, $destination, $bitcoins, Date(12,5,2020));
```

But this violates our unique design principle of maintaining a bijection with the real-world. Let's be true to our one rule.

[Gist Url]: # (https://gist.github.com/mcsee/339a71cdb67c3e398ada290327c1210a)

```php
<?

$day12 = new Day(12);
$year2020 = new Year(2020);
$may2020 = new YearMonth(5, $year2020);
$halvingDay = new Date($day12, $may2020);
$halvingTransaction = new 
  Movement($wallet, $destination, $bitcoins, $halvingDay);
```

We model reality's entities such as a day of a month, a calendar year, and a date, forgetting about arbitrary implementations with integers because bijection and declarativity are more important than performance and laziness.

Let us dwell for a minute on the mutability of a date. One hopes that a given date will never mutate because it does not do so in the real-world. No non-computer person would ever think of changing a date.

Let us analyze by the method of reduction to the absurd what would happen if we allow a date to change.

Our accredited transaction on the day of halving knows its imputation date. If it changes internally all consecutive blockchains should be recalculated and this is expressly prohibited by the financial domain. It is clear that the date should never mutate.

# Is it crystal clear for everybody that a date should not mutate?

Let's review the date class in the most widely used languages ​​in today's industry.

[Go](https://godoc.org/google.golang.org/genproto/googleapis/type/date): Date is a struct.

[Java](https://docs.oracle.com/javase/8/docs/api/java/sql/Date.html): Mutable (deprecated).

[PHP](https://www.php.net/manual/es/class.datetime.php): Mutable with setters abuse.

[Python](https://docs.python.org/2/library/datetime.html#date-objects): Mutable (All attributes are public on Python).

[Swift](https://developer.apple.com/documentation/foundation/date): Mutable.

Date problem's domain is probably one of the oldest and best known to humanity. The excuse that these *getters* are being deprecated speaks about poor initial design in most modern languages.

# Possible solutions

A possible attack is to reverse the burden of proof. Objects are completely immutable unless otherwise stated.
Should they evolve they must always do so in their accidental aspects. Never in their essence. This change should not be coupled with all the other objects that use it.

# Conclusions

> If an object is complete since its creation, it will always be able to answer messages.
> An object must correctly represent the entity since its inception.
> If we work in a concurrent environment it is essential that the objects are always valid.
> An object must be immutable if the entity it represents is immutable
> Most entities are immutable.

These rules keep the model consistently consistent with representation.
As a corollary of the demonstration by the absurd we can derive a series of rules:

Corollary 1

> Objects must be complete since their creation.

Corollary 2

> Setters and getters must not exist.

[Nude Models - Part I: Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)

[Nude Models - Part II: Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20II Getters/readme.md)

Corollary 3

> Getters should not exist (unless they exist in the real-world and then the bijection is valid). It is not the responsibility of any real entity to reply to a getXXX() message.

* * *

Part of the objective of this series of articles is to generate spaces for debate and discussion on software design.

[Object Design Checklist](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Object%20Design%20Checklist/readme.md)

We look forward to comments and suggestions on this article.

This article was published at the same time in Spanish [here](https://medium.com/@mcsee/los-poderes-mal%C3%A9ficos-de-los-mutantes-664163409f41).