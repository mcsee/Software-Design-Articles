# Code Smell 82 - Tests Violating Encapsulation

*Objects work fine and fulfill business objectives. But we need to test them. Let's break them.*

> TL;DR: Don't write methods with the only purpose of being used in your tests.

# Problems

- Encapsulation Violation.

- Bad interfaces

- Coupling

# Solutions

1. Don't break encapsulation.

2. Test must be in full control. 

3. If you cannot control your object, you are coupled. Decouple them!

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/06757fcedc4c442584f144c68b16d597)
```php
<?

class Hangman {
    private $wordToGuess;

    function __construct() {
        $this->wordToGuess = getRandomWord();
        //Test is not in control of this
    }

    public function getWordToGuess(): string {
        return $this->wordToGuess;
        //Sadly we need to reveal this
    }
}

class HangmanTest extends TestCase {
    function test01WordIsGuessed() {
        $hangmanGame = new Hangman();
        $this->assertEquals('tests', $hangmanGame->wordToGuess());
        //how can we make sure the word is guessed?
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/c2d16cf8f0d533345ec74314c04863ea)
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
        //We are in full control!
        $this->assertFalse($hangmanGame->wordWasGuessed());
        $hangmanGame->play('t');
        $this->assertFalse($hangmanGame->wordWasGuessed());
        $hangmanGame->play('e');
        $this->assertFalse($hangmanGame->wordWasGuessed());
        $hangmanGame->play('s');
        $this->assertTrue($hangmanGame->wordWasGuessed());
        //We just test behavior
    }
}
```

# Detection

This is a design smell.

We can detect we need a method just for test.

# Tags

- Information Hiding

# Conclusion

White-box tests are fragile. They test implementation instead of behavior.

# Relations

[Code Smell 52 - Fragile Tests](https://maximilianocontieri.com/code-smell-52-fragile-tests)

[Code Smell 28 - Setters](https://maximilianocontieri.com/code-smell-28-setters)

# More Info

- [Should I Test Private Methods](http://shoulditestprivatemethods.com/)

# Credits

This smell was inspired by @[Rodrigo](@rodrigomd)

%[https://twitter.com/_rodrigomd/status/1408032157629485056]

* * *

> Nothing makes a system more flexible than a suite of tests.

_Robert Martin_
 
[Software Engineering Great Quotes](Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://maximilianocontieri.com/how-to-find-the-stinky-parts-of-your-code)