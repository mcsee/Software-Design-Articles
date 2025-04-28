# TDD Conference 2021 - Benefits Of Going Beyond The Make-It-Work Phase - Francisco Climent

![TDD Conference 2021 - Benefits Of Going Beyond The Make-It-Work Phase - Francisco Climent](TDD%20Conference%202021%20-%20Benefits%20Of%20Going%20Beyond%20The%20Make-It-Work%20Phase%20-%20Francisco%20Climent.jpg)

First International Test Driven Development took place on July 10th. 

In this series, I will include every talk together with my notes and further reading.

Hopefully, a lot of readers will watch and rewatch the talks, as they are worth several reviews.

Let's continue...

## Bio 

Fran is a telecommunications engineer with more than 15 years of experience developing electronics products, both hardware and software. During most of these years, he failed to follow a sustainable, iterative and defect-free development process in every project he was involved. And he was not alone. Every team member had the belief that 'embedded is hard'.

Six years ago he discovered TDD, which led him to XP, Agile, and Craftsmanship. It was a revealing moment: he felt like he had been living inside Plato's cave. Like a prisoner suffering Stockholm syndrome with his beloved hardware, being devoid of the proper principles, knowledge and tools to consider himself a true professional. Nowadays, he helps teams and organizations to improve their development processes as a part of his long road to software craftsmanship.
 
> TL;DR: Use dual Target TDD on embedded systems. Hide accidental layers. 

## Talk

[![Watch the video](https://img.youtube.com/vi/_Z6x-KOSE2o/sddefault.jpg)](https://youtu.be/_Z6x-KOSE2o) 

# My Personal notes

- In embedded systems, there are several microcontrollers answering in an autonomous manner.
- Firmware becomes obsolete because it depends on the hardware. The software can be changed.
- Fallacy 1: "Right solution at first iteration". More complex because on embedded systems orders of magnitude are higher.
- Embedded system code is tied to the current architecture. 
- The code is fully aware of how the components are connected.
- The driver's layers violate dependency inversion and open/closed principles and couple to implementation.
- We don't have business entities or modules.
- Debugging on hardware is difficult because we cannot map the defect to the error.
- Systems with the highest safety integrity levels need 100 test coverage.
- We use mutation testing to measure our tests.
- Any part of the code our tests don't exercise is out of our control.
- 100% code coverage is a precondition to have a comprehensive suite of tests.
- Mutation Testing shows us corner cases to test and improve our semantic stability.
- Some developers cheat to code to achieve an artificial 100% coverage.
- In the green TDD phase, all sins are allowed.
- We should improve our internal dependencies on the refactoring phase.
- Global performance pre-optimization trap:

> The lesson is: Even if you know exactly what is going on in your system, measure performance, don't speculate. You'll learn something, and nine times out of ten, it won't be that you were right!

_Ron Jeffries_

> The secret to fast software, in all but hard real-time contexts, is to write tunable software first and then tune it for sufficient speed.

_Martin Fowler_

> if ‘non-accidents were investigated, the public would discover that the messy interior of engineering practice which after an accident looks like an "accident waiting to happen," is nothing more or less than "normal technology"

_Diane Vaughan_

- The [Dunning-Kruger effect](https://en.wikipedia.org/wiki/Dunning%E2%80%93Kruger_effect) is another trap: we think we know more than we really know.
- Embedded TDD: Dual Target (our machine and the target one).
- We should aim to reusable drivers, adding an extra layer.
- By using Factory and Decorator design patterns, we can abstract and decouple our design.
- Debugging is a shame.
- You can't be agile if your code sucks.

# Speaker Links

- Twitter [@fraclipe](https://twitter.com/fraclipe) 
- LinkedIn [@franciscoclimentperez](https://www.linkedin.com/in/franciscoclimentperez/)   
- Website [https://francliment.com/](https://francliment.com/) 

* * *

# Index

[TDD Conference 2021 - All Talks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD%20Conference%202021/TDD%20Conference%202021%20-%20All%20Talks/readme.md)

* * *

Please follow TDD Conference on:

- [YouTube](https://www.youtube.com/channel/UCKn-DadPoyYssfAOMk1LSew)
- [Twitter](https://twitter.com/tddconf)