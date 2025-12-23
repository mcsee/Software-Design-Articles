# Code Smell 254 - Mystery Guest
            
![Code Smell 254 - Mystery Guest](Code%20Smell%20254%20-%20Mystery%20Guest.jpg)

*You assert that something happened, but why?*

> TL;DR: Be explicit when creating tests to ensure clarity and maintainability

# Problems 😔 

- Readability

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) to external databases, global state or [singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20Root%20of%20All%20Evil/readme.md), [static methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md) or external services

- Maintenance Difficulty

- Debugging Complexity

- Hidden Dependencies

# Solutions 😃

1. Be Explicit

2. Inline the setup

3. Use dependency Injection

4. Use [mocking](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md) with caution

# Context 💬

Your test depends on external data or configurations not immediately visible within the test itself.

This obscures the test's setup, making it difficult for someone reading it to understand what is being tested and why it might fail. 

Every test case should have three stages:

1. Setup: Initialize and configure everything needed for the test.

2. Exercise: Execute the code being tested.

3. Assert: Verify the expected outcome.

All of them must be explicit

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/ba2c15c5d72c871a4251c9d08dfcf728) -->

```java
@Test
void shouldReturnAnswerWhenAnswerExists() {
    User answer = KnowledgeRepository.findAnswerToQuestion(42);
    assertNotNull(answer);
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/48162612d1667217eb493109f9ae8405) -->

```java
@Test
void shouldReturnAnswerWhenAnswerExists() {
    KnowledgeRepository knowledgeRepository = 
        new InMemoryKnowledgeRepository();
    Answer expectedAnswer = new Answer(42, "The Ultimate");
    knowledgeRepository.save(expectedAnswer);
    
    Answer actualAnswer = answerRepository.findAnswerToQuestion(42);
    assertNotNull(actualAnswer);
    assertEquals(expectedAnswer, actualAnswer);
}
```

# Detection 🔍

[X] Manual

You can detect this smell by looking for tests that do not clearly show their setup steps or rely heavily on external configurations.

# Tags 🏷️

- Testing

# Level 🔋

[x] Intermediate

# AI Generation 🤖

AI-generated code often avoids this smell due to the tendency to create small, isolated examples.

# AI Detection 🥃

Most AI Detectors fail to identify this as a problem unless you point it out explicitly.

# Conclusion 🏁

This code smell is especially prevalent in legacy codebases or when consistent testing practices are lacking. 

You need to be explicit about the environment since tests must always be in "full environmental control"

# Relations 👩‍❤️‍💋‍👨

[Code Smell 17 - Global Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2017%20-%20Global%20Functions/readme.md)

[Code Smell 32 - Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2032%20-%20Singletons/readme.md)

[Code Smell 18 - Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md)

[Code Smell 30 - Mocking Business](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2030%20-%20Mocking%20Business/readme.md)

# More Information 📕

[Craft Better Software](https://craftbettersoftware.com/p/tdd-5-test-smells-5-solutions)

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Brands&People](https://unsplash.com/@brandsandpeople) on [Unsplash](https://unsplash.com/photos/womans-face-with-green-eyes-M2cFm9iHXSc)
    
* * *

> Science is what we understand well enough to explain to a computer, Art is all the rest

_Donald Knuth_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)