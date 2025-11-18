# Code Smell 312 - Too Many Asserts

![Code Smell 312 - Too Many Asserts](Code%20Smell%20312%20-%20Too%20Many%20Asserts.jpg)

*Cluttered tests hide real problems*

> TL;DR: You put multiple assertions in one test, making failures hard to analyze.

# Problems 😔

- Readability
- [Fragile](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md) tests
- Slow Tests
- Debugging pain
- Coupled logic
- Maintenance nightmare
- [Ambiguous failures](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20104%20-%20Assert%20True/readme.md)
- [Generic](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2076%20-%20Generic%20Assertions/readme.md) assertions

# Solutions 😃

1. Follow the *One-assert-per-test* rule
2. [Extract](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md) assert methods
3. Use descriptive test names
4. Group related checks
5. [Refactor](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md) test logic in smaller pieces

# Refactorings ⚙️

[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

[Refactoring 010 - Extract Method Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

[Refactoring 011 - Replace Comments with Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md)
 
# Context 💬

When you cram multiple assertions in a single test, failures become ambiguous.

You don’t know which part of the code caused the failure.

Imagine a test with five assertions fails at the second one - you never see whether assertions 3, 4, and 5 would have passed or failed, hiding additional defects.

Tests should be precise, easy to understand, and focused. 

Each test should validate a single behavior and clearly communicate its purpose.

A single test function should test a single real world thing/concept. 

You should not write long functions testing unrelated behaviors sequentially.

This usually hides the problem of heavy and [coupled](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md) setups.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/070f75a570089c57742c2c5b88655e3e) -->

```python
def test_car_performance():
    car = Formula1Car("Red Bull")
    car.set_speed(320)
    assert car.speed == 320
    car.accelerate(10)
    assert car.speed == 330
    car.brake(50)
    assert car.speed == 280
    car.change_tire("soft")
    assert car.tire == "soft"
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/c3ebcb1eb3c135cf3760036de1d29245) -->

```python
def test_set_speed():
    car = Formula1Car("Red Bull")
    car.set_speed(320)
    assert car.speed == 320, (
        f"Expected speed to be 320 km/h, "
        f"but got {car.speed} km/h"
    )

def test_accelerate():
    car = Formula1Car("Red Bull")
    car.set_speed(320)
    car.accelerate(10)
    assert car.speed == 330, (
        f"Expected speed to be 330 km/h "
        f"after accelerating by 10, "
        f"but got {car.speed} km/h"
    )

def test_brake():
    car = Formula1Car("Red Bull")
    car.set_speed(330)
    car.brake(50)
    assert car.speed == 280, (
        f"Expected speed to be 280 km/h "
        f"after braking by 50, "
        f"but got {car.speed} km/h"
    )

def test_change_tire():
    car = Formula1Car("Red Bull")
    car.change_tire("soft")
    assert car.tire == "soft", (
        f"Expected tire type to be 'soft', "
        f"but got '{car.tire}'"
    )
```

# Detection 🔍

[X] Automatic

Check for tests with more than one assert.

Look for tests that fail for multiple reasons or cover multiple unrelated actions.

Most linters and test frameworks can flag multiple assertions. 

Set up a rule to warn when tests exceed one or two assertions.

# Exceptions 🛑

You can group multiple asserts only when they validate the same logical behavior or output of a pure function.

# Tags 🏷️

- Testing

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

You need a [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) entities and your tests.

If one test checks multiple behaviors, failures break this mapping. 

When a test fails, you should immediately know exactly which behavior is broken without reading the test code.

# AI Generation 🤖

AI generators often produce tests with multiple asserts, trying to cover everything in one shot.

This happens because AI tools optimize for code coverage rather than test clarity, treating tests as checklists rather than behavior specifications.

# AI Detection 🧲

AI can refactor tests to keep one assert per test. 

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Refactor this test file to contain one assert per test method. Keep each test focused and descriptive.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+test_car_performance%28%29%3A%0D%0A++++car+%3D+Formula1Car%28%22Red+Bull%22%29%0D%0A++++car.set_speed%28320%29%0D%0A++++assert+car.speed+%3D%3D+320%0D%0A++++car.accelerate%2810%29%0D%0A++++assert+car.speed+%3D%3D+330%0D%0A++++car.brake%2850%29%0D%0A++++assert+car.speed+%3D%3D+280%0D%0A++++car.change_tire%28%22soft%22%29%0D%0A++++assert+car.tire+%3D%3D+%22soft%22%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Refactor+this+test+file+to+contain+one+assert+per+test+method.+Keep+each+test+focused+and+descriptive.%3A+%60%60%60python%0D%0Adef+test_car_performance%28%29%3A%0D%0A++++car+%3D+Formula1Car%28%22Red+Bull%22%29%0D%0A++++car.set_speed%28320%29%0D%0A++++assert+car.speed+%3D%3D+320%0D%0A++++car.accelerate%2810%29%0D%0A++++assert+car.speed+%3D%3D+330%0D%0A++++car.brake%2850%29%0D%0A++++assert+car.speed+%3D%3D+280%0D%0A++++car.change_tire%28%22soft%22%29%0D%0A++++assert+car.tire+%3D%3D+%22soft%22%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+test_car_performance%28%29%3A%0D%0A++++car+%3D+Formula1Car%28%22Red+Bull%22%29%0D%0A++++car.set_speed%28320%29%0D%0A++++assert+car.speed+%3D%3D+320%0D%0A++++car.accelerate%2810%29%0D%0A++++assert+car.speed+%3D%3D+330%0D%0A++++car.brake%2850%29%0D%0A++++assert+car.speed+%3D%3D+280%0D%0A++++car.change_tire%28%22soft%22%29%0D%0A++++assert+car.tire+%3D%3D+%22soft%22%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Refactor+this+test+file+to+contain+one+assert+per+test+method.+Keep+each+test+focused+and+descriptive.%3A+%60%60%60python%0D%0Adef+test_car_performance%28%29%3A%0D%0A++++car+%3D+Formula1Car%28%22Red+Bull%22%29%0D%0A++++car.set_speed%28320%29%0D%0A++++assert+car.speed+%3D%3D+320%0D%0A++++car.accelerate%2810%29%0D%0A++++assert+car.speed+%3D%3D+330%0D%0A++++car.brake%2850%29%0D%0A++++assert+car.speed+%3D%3D+280%0D%0A++++car.change_tire%28%22soft%22%29%0D%0A++++assert+car.tire+%3D%3D+%22soft%22%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+test_car_performance%28%29%3A%0D%0A++++car+%3D+Formula1Car%28%22Red+Bull%22%29%0D%0A++++car.set_speed%28320%29%0D%0A++++assert+car.speed+%3D%3D+320%0D%0A++++car.accelerate%2810%29%0D%0A++++assert+car.speed+%3D%3D+330%0D%0A++++car.brake%2850%29%0D%0A++++assert+car.speed+%3D%3D+280%0D%0A++++car.change_tire%28%22soft%22%29%0D%0A++++assert+car.tire+%3D%3D+%22soft%22%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Refactor+this+test+file+to+contain+one+assert+per+test+method.+Keep+each+test+focused+and+descriptive.%3A+%60%60%60python%0D%0Adef+test_car_performance%28%29%3A%0D%0A++++car+%3D+Formula1Car%28%22Red+Bull%22%29%0D%0A++++car.set_speed%28320%29%0D%0A++++assert+car.speed+%3D%3D+320%0D%0A++++car.accelerate%2810%29%0D%0A++++assert+car.speed+%3D%3D+330%0D%0A++++car.brake%2850%29%0D%0A++++assert+car.speed+%3D%3D+280%0D%0A++++car.change_tire%28%22soft%22%29%0D%0A++++assert+car.tire+%3D%3D+%22soft%22%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+test_car_performance%28%29%3A%0D%0A++++car+%3D+Formula1Car%28%22Red+Bull%22%29%0D%0A++++car.set_speed%28320%29%0D%0A++++assert+car.speed+%3D%3D+320%0D%0A++++car.accelerate%2810%29%0D%0A++++assert+car.speed+%3D%3D+330%0D%0A++++car.brake%2850%29%0D%0A++++assert+car.speed+%3D%3D+280%0D%0A++++car.change_tire%28%22soft%22%29%0D%0A++++assert+car.tire+%3D%3D+%22soft%22%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Refactor+this+test+file+to+contain+one+assert+per+test+method.+Keep+each+test+focused+and+descriptive.%3A+%60%60%60python%0D%0Adef+test_car_performance%28%29%3A%0D%0A++++car+%3D+Formula1Car%28%22Red+Bull%22%29%0D%0A++++car.set_speed%28320%29%0D%0A++++assert+car.speed+%3D%3D+320%0D%0A++++car.accelerate%2810%29%0D%0A++++assert+car.speed+%3D%3D+330%0D%0A++++car.brake%2850%29%0D%0A++++assert+car.speed+%3D%3D+280%0D%0A++++car.change_tire%28%22soft%22%29%0D%0A++++assert+car.tire+%3D%3D+%22soft%22%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60python%0D%0Adef+test_car_performance%28%29%3A%0D%0A++++car+%3D+Formula1Car%28%22Red+Bull%22%29%0D%0A++++car.set_speed%28320%29%0D%0A++++assert+car.speed+%3D%3D+320%0D%0A++++car.accelerate%2810%29%0D%0A++++assert+car.speed+%3D%3D+330%0D%0A++++car.brake%2850%29%0D%0A++++assert+car.speed+%3D%3D+280%0D%0A++++car.change_tire%28%22soft%22%29%0D%0A++++assert+car.tire+%3D%3D+%22soft%22%0D%0A%60%60%60) | [You](https://you.com/search?q=Refactor+this+test+file+to+contain+one+assert+per+test+method.+Keep+each+test+focused+and+descriptive.%3A+%60%60%60python%0D%0Adef+test_car_performance%28%29%3A%0D%0A++++car+%3D+Formula1Car%28%22Red+Bull%22%29%0D%0A++++car.set_speed%28320%29%0D%0A++++assert+car.speed+%3D%3D+320%0D%0A++++car.accelerate%2810%29%0D%0A++++assert+car.speed+%3D%3D+330%0D%0A++++car.brake%2850%29%0D%0A++++assert+car.speed+%3D%3D+280%0D%0A++++car.change_tire%28%22soft%22%29%0D%0A++++assert+car.tire+%3D%3D+%22soft%22%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

Tests should be focused and precise.

You need to understand quickly which contract is broken.

Avoid multiple asserts per test to make failures clear, debugging faster, and your test suite maintainable.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 52 - Fragile Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md)

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 46 - Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)

[Code Smell 104 - Assert True](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20104%20-%20Assert%20True/readme.md)

[Code Smell 76 - Generic Assertions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2076%20-%20Generic%20Assertions/readme.md)

# More Information 📕

[Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Abhinand Venugopal](https://unsplash.com/@i_abhinand) on [Unsplash](https://unsplash.com/photos/a-man-driving-a-race-car-on-top-of-a-race-track-1WZfzLWBSi4)

* * *

> Testing is not about finding bugs, it's about understanding them

_Brian Marick_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)