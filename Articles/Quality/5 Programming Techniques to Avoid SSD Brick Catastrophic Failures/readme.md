# 5 Programming Techniques to Avoid SSD Brick Catastrophic Failures

![5 Programming Techniques to Avoid SSD Brick Catastrophic Failures](patrick-perkins-rAtADOlvcos-unsplash.jpg)

*Preventing serious faults is within reach*

> TL;DR: Use mature tools to make mature software.

# The Problem

On July, 9th 2022, [yet another hardware failure](https://twitter.com/girlhacker/status/1545646297348050946) bricked several servers.

Looking at failure's root cause we can learn a lesson.

On [this thread](https://news.ycombinator.com/item?id=32028511) we can find what happened:

> I once had a small fleet of SSDs fail because they had some uptime counters that overflowed after 4.5 years, and that somehow persistently wrecked some internal data structures. It turned them into little, unrecoverable bricks.
> It was not awesome seeing a bunch of servers go dark in just about the order we had originally powered them on. Not a fun day at all.

https://www.techradar.com/news/new-bug-destroys-hpe-ssds-after-40000-hours

# The Cause

The fault fixed by the [Dell EMC firmware](https://www.dell.com/support/home/es-ar/drivers/driversdetails?driverid=8h6hj&oscode=w12r2) concerns an Assert function which had a bad check to validate the value of a circular buffer’s index value. Instead of checking the maximum value as N, it checked for N-1. The fix corrects the assert check to use the maximum value as N.

# The Prevention

We are serious software engineers and we have mature tools.

How can we prevent defects like this one
(They are not [BUGS](Quality\Stop Calling them 'Bugs'))

[Stop Calling them 'Bugs'](Quality\Stop Calling them 'Bugs')

## 1 - TDD

With [TDD](TDD Conference 2021\TDD Conference 2021 - All Talks), we can only write code after a failing test.

In this way, we need to think of the N scenario and explicitly check the case.

Otherwise, we cannot write code.

TDD is incredibly good for [embedded systems](https://www.amazon.com/-/es/James-W-Grenning/dp/193435662X).

## 2 - Zombies

[Zombies](TDD\How I Survived the Zombie Apocalypse) is a great testing tool and also an amazing TDD companion.

The 'B' for Boundaries at *zomBies* tells us to explicitly check for border cases.

In this case N - 1, N, and N +1.

[How I Survived the Zombie Apocalypse](TDD\How I Survived the Zombie Apocalypse)

## 3 - Mutation Testing

Whenever we use arithmetic or [IF conditions](Theory\How to Get Rid of Annoying IFs Forever), we might check what would happen if we make a mistake (like the one in this article) and change a < for a <=.
 
Mutation testing is a very powerful tool to check boundary scenarios.

## 4 - Model Circular Buffers

Embedded and hardware systems are often tuned for optimal performance.

They skip some checks and are programmed with low-level languages.

Most of them avoid [MAPPING]((Theory\The One and Only Software Design Principle)) the real world and use short integers as indices.

According to our [MAPPER](Theory\What is (wrong with) software), an *integer* is not a *shortint* (or *longint*) and a *shortint* is not an *integer*.

## 5 - Fail Fast

Mission Critical software sometimes has recovery or fault-tolerant routines.

Following [Fail Fast](Theory\Fail Fast) principle, we can anticipate disaster and let another piece of code take over instead of bricking the disks.

## Conclusions.

Systems don't fail.

We fail as software engineers and make the same mistakes over and over again.

We need to be humbler and learn from our past mistakes.

# Credits

Photo by [Patrick Perkins](https://unsplash.com/@patrickperkins) on [Unsplash](https://unsplash.com/s/photos/disaste)
  



