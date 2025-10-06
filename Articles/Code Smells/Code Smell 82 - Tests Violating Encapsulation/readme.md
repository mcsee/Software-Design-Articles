# Code Smell 82 - Tests Violating Encapsulation

![Code Smell 82 - Tests Violating Encapsulation](Code%20Smell%2082%20-%20Tests%20Violating%20Encapsulation.jpg)

*Objects work fine and fulfill business objectives. But we need to test them. Let's break them.*

> TL;DR: Don't write methods with the only purpose of being used in your tests.

# Problems 😔 

- Encapsulation Violation.

- Bad interfaces

- Coupling

# Solutions 😃

1. Don't break encapsulation.

2. Test must be in full control. 

3. If you cannot control your object, you are coupled. Decouple them!

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/06757fcedc4c442584f144c68b16d597) -->

```php
<?

class Hangman {
    private $wordToGuess;

    function __construct() {
        $this->wordToGuess = getRandomWord();
        // Test is not in control of this
    }

    public function getWordToGuess(): string {
        return $this->wordToGuess;
        // Sadly you need to reveal this
    }
}

class HangmanTest extends TestCase {
    function test01WordIsGuessed() {
        $hangmanGame = new Hangman();
        $this->assertEquals('tests', $hangmanGame->wordToGuess());
        // How can you make sure the word is guessed?
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/c2d16cf8f0d533345ec74314c04863ea) -->

```php
<?

class Hangman {
    private $wordToGuess;

    function __construct(WordRandomizer $wordRandomizer) {
        $this->wordToGuess = $wordRandomizer->newRandomWord();
    }
}

class MockRandomizer implements WordRandomizer {
    function newRandomWord(): string {
        return 'tests';
    }
}

class HangmanTest extends TestCase {
    function test01WordIsGuessed() {
        $hangmanGame = new Hangman(new MockRandomizer());
        // You are in full control!
        $this->assertFalse($hangmanGame->wordWasGuessed());
        $hangmanGame->play('t');
        $this->assertFalse($hangmanGame->wordWasGuessed());
        $hangmanGame->play('e');
        $this->assertFalse($hangmanGame->wordWasGuessed());
        $hangmanGame->play('s');
        $this->assertTrue($hangmanGame->wordWasGuessed());
        // You just test behavior
    }
}
```

# Detection 🔍

This is a design smell.

We can detect we need a method just for test.

# Tags 🏷️

- Testing

# Level 🔋

[X] Beginner

# Conclusion 🏁

White-box tests are fragile. They test implementation instead of behavior.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 52 - Fragile Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2052%20-%20Fragile%20Tests/readme.md)

[Code Smell 28 - Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2028%20-%20Setters/readme.md)

# More Information 📕

[Should I Test Private Methods](http://shoulditestprivatemethods.com/)

# Credits 🙏

This smell was inspired by @[Rodrigo](https://twitter.com/_rodrigomd)

[X](https://twitter.com/_rodrigomd/status/1408032157629485056)

* * *

> Nothing makes a system more flexible than a suite of tests.

_Robert Martin_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)