# TDD Conference 2021 - Python - A Language Made For Test-Driven Development - Jan Giacomelli

![TDD Conference 2021 - Python - A Language Made For Test-Driven Development - Jan Giacomelli](TDD%20Conference%202021%20-%20Python%20-%20A%20Language%20Made%20For%20Test-Driven%20Development%20-%20Jan%20Giacomelli.jpg)

First International Test Driven Development took place on July 10th. 

In this series, I will include every talk together with my notes and further reading.

Hopefully, a lot of readers will watch and rewatch the talks, as they are worth several reviews.

Let's continue... 

## Bio 

Test-driven development is all about small steps and short feedback loops. The faster you know whether the system works or not the easier the development. Python is not the first language that pops into someone's mind when talking about TDD. Nevertheless, when you work with it you start realizing that it's perfect language. There's no overhead to have a working unit - you can write a simple function. There's no compilation - test suite starts immediately. You need zero dependencies to start with TDD - *unit test* library is built-in in standard library.

This talk is a roadmap through TDD philosophy in Python world.

## Talk

[![Watch the video](https://img.youtube.com/vi/MuRrxVF8CL0/sddefault.jpg)](https://youtu.be/MuRrxVF8CL0) 

# My Personal notes

- In this talk, Jan show us how to use Python for Machine Learning TDD.
- TDD seems untestable with machine learning because of the indeterminism.
- Python comes with xUnit and Mock libraries.
- We can also install [pytest](https://docs.pytest.org/) that has a better functional syntax and fixture management.
- Pytest also warns on slow tests and can them in paralell
- Tests are created with the Given/Then/When notation
- Test starts without type hinting, and after we discover the domain, we type them.
- First tests are always fakes
- Repository is transient until we need to make it.
- We inject the repository instead of using mocks.
- TDD is similar to scientific method with hypothesis validation.
- In Machine Learning, you need to compare results against a threshold.
- You shouldn't measure accuracy because it can lead to overfitting scenarios.

# Speaker Links

- Twitter [@jangiacomelli](https://twitter.com/jangiacomelli) 
- LinkedIn [@jan-giacomelli-4a7066128](https://www.linkedin.com/in/jan-giacomelli-4a7066128/) 
- Site [https://typeless.com](https://typeless.com) 

* * *

# Index

[TDD Conference 2021 - All Talks](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/TDD%20Conference%202021/TDD%20Conference%202021%20-%20All%20Talks/readme.md)

* * *

Please follow TDD Conference on:

- [YouTube](https://www.youtube.com/channel/UCKn-DadPoyYssfAOMk1LSew)
- [Twitter](https://twitter.com/tddconf)