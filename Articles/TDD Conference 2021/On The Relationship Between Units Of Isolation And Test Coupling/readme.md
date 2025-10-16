# TDD Conference 2021 - On The Relationship Between Units Of Isolation And Test Coupling - Mario Cervera

![TDD Conference 2021 - On The Relationship Between Units Of Isolation And Test Coupling - Mario Cervera](TDD%20Conference%202021%20-%20On%20The%20Relationship%20Between%20Units%20Of%20Isolation%20And%20Test%20Coupling%20-%20Mario%20Cervera.jpg)

*On The Relationship Between Units Of Isolation And Test Coupling - Mario Cervera*

> TL;DR: Coupling leads to fragile tests.

First International Test Driven Development took place on July 10th. 

In this series, I will include every talk together with my notes and further reading.

Hopefully, a lot of readers will watch and rewatch the talks, as they are worth several reviews.

Let's continue...

## Bio 

Mario has been a software professional for more than a decade. He also conducted research in the field of Software Engineering, which allowed him to graduate as a PhD in Computer Science. As a strong advocate of software craftsmanship principles and values, he helps teams improve their technical practices so they can deliver higher-quality software at a sustainable pace.
  
## Talk

[![Watch the video](https://img.youtube.com/vi/APFbb5MwLEU/sddefault.jpg)](https://youtu.be/APFbb5MwLEU) 

# My Personal notes

- Fragility is the opposite to Robust when we talk about tests.
- Fragile tests are tests that break when they should not break.
- Tests are the specification of behavior.
- if we are not changing the observable behavior of tests, and they break, the tests are preventing our refactorings.
- We want to avoid, at all costs, fragile tests that fail when they shouldn't.
- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) is the main cause of fragile tests.
- Overspecified software makes more assumptions than necessary.
- In a mocking approach, we need to change a lot of tests when we refactor.
- if we make our attributes public to test them is a smell, we are testing accidental structure.
- On Behavior-centric view, the true unit of isolation is not unit tests, but behavior.
- Refactoring is the key step in TDD.
- Tests are code even more important than production code.

> The outcome of this understanding is that a test-case per class approach fails to capture the ethos for TDD. Adding a new class is not the trigger for writing tests. The trigger is implementing a requirement.

_Ian Cooper_

* * *

Mario has also written an article on his talk.
Please rush to read it [here](https://mariocervera.com/talk-1st-international-conference-tdd#ckrnf3pkq0bg5fws15gwgg8a8).

# Speaker Links

- Twitter [@macerub](https://twitter.com/macerub) 
- LinkedIn [@mariocervera](https://www.linkedin.com/in/mariocervera) 

* * *

# Index

[TDD Conference 2021 - All Talks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD%20Conference%202021/TDD%20Conference%202021%20-%20All%20Talks/readme.md)

* * *

Please follow TDD Conference on:

- [YouTube](https://www.youtube.com/channel/UCKn-DadPoyYssfAOMk1LSew)
- [Twitter](https://twitter.com/tddconf)

