# Code Smell 134 - Specialized Business Collections

![Code Smell 134 - Specialized Business Collections](Code%20Smell%20134%20-%20Specialized%20Business%20Collections.jpg)

*If it walks like a duck and it quacks like a duck, then it must be a duck*

> TL;DR: Don't create unnecessary abstractions

# Problems

- Over Design

- Unneeded classes

# Solutions

1. Use a standard class

# Context

Discovering abstractions on the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) is a hard task.

After refining we should remove unneeded abstractions.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/6e4e3684bbb29379a6bf30f4a00a2c7f)
```php
<?php

Namespace Spelling;

final class Dictionary {

    private $words;
    function __construct(array $words) {
        $this->words = $words;
    }

    function wordsCount(): int {
        return count($this->words);
    }

    function includesWord(string $subjectToSearch): bool {
        return in_array($subjectToSearch, $this->words);
    }
}

// This has protocol similar to an abstract datatype dictionary
// And the tests
  
use PHPUnit\Framework\TestCase;

final class DictionaryTest extends TestCase {
    public function test01EmptyDictionaryHasNoWords() {
        $dictionary = new Dictionary([]);
        $this->assertEquals(0, $dictionary->wordsCount());
    }

    public function test02SingleDictionaryReturns1AsCount() {        
        $dictionary = new Dictionary(['happy']);
        $this->assertEquals(1, $dictionary->wordsCount());
    }

    public function test03DictionaryDoesNotIncludeWord() {
        $dictionary = new Dictionary(['happy']);
        $this->assertFalse($dictionary->includesWord('sadly'));
    }

    public function test04DictionaryIncludesWord() {
        $dictionary = new Dictionary(['happy']);
        $this->assertTrue($dictionary->includesWord('happy'));
    }
} 

```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/2d15677ca73742cb2553aa4a098f3683)
```php
<?php

Namespace Spelling;

// final class Dictionary is no longer needed
    
// The tests use a standard class
// In PHP we use associative arrays
// Java and other languages have HashTables, Dictionaries etc. etc.
  
use PHPUnit\Framework\TestCase;

final class DictionaryTest extends TestCase {
    public function test01EmptyDictionaryHasNoWords() {
        $dictionary = [];
        $this->assertEquals(0, count($dictionary));
    }

    public function test02SingleDictionaryReturns1AsCount() {
        $dictionary = ['happy']; 
        $this->assertEquals(1, count($dictionary));
    }

    public function test03DictionaryDoesNotIncludeWord() {
        $dictionary = ['happy']; 
        $this->assertFalse(in_array('sadly', $dictionary));
    }

    public function test04DictionaryIncludesWord() {
        $dictionary = ['happy'];  
        $this->assertTrue(in_array('happy', $dictionary));
    }
} 

```

# Detection

[X] Semi-Automatic 

Based on protocols, we should remove some unnecessary classes 

# Exceptions

Sometimes we need to optimize collections for performance reasons if we have enough strong evidence.

# Tags

- Protocols

# Conclusion

We need to clean up code from time to time.

Specialized collections are a good starting point.

# Relations

[Code Smell 111 - Modifying Collections While Traversing](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20111%20-%20Modifying%20Collections%20While%20Traversing/readme.md)

# More Info

- [Duck Typing](https://en.wikipedia.org/wiki/Duck_typing)

# Credits

Photo by [Pisit Heng](https://unsplash.com/@pisitheng) on Unsplash

* * *

> Most of the effort in the software business goes into the maintenance of code that already exists.

_Wietse Venema_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)