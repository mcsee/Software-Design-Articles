# Code Smell 46 - Repeated Code

![Code Smell 46 - Repeated Code](Code%20Smell%2046%20-%20Repeated%20Code.jpg)

> TL;DR: Don't Repeat Yourself

*DRY is our mantra. Teachers tell us to remove duplication. We need to go beyond.*

# Problems 😔 

- Code Duplication

- Maintainability

- [Don't Repeat Yourself](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)

# Solutions 😃

1. Find repeated patterns (not repeated code).

2. Create an abstraction.

3. Parametrize abstraction calls.

4. Use composition and never inheritance.

5. Unit test new abstraction.

# Examples

- [Automatic Code Generators](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20II%20-%20Code%20Wizards/readme.md)

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/b6df5d98efbecc9be783006d364e63f8) -->

```php
<?

class WordProcessor {

  function replaceText(string $patternToFind, string $textToReplace) {
    $this->text = '<<<' . 
        str_replace($patternToFind, $textToReplace, $this->text) 
        . '>>>';
    }
}

final class Obfuscator {

  function obfuscate(string $patternToFind, string $textToReplace) {
    $this->text = 
      strlower(str_ireplace(
         $patternToFind, $textToReplace, $this->text));
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/4eb63e5acfcdda39b24e3f6a73eb0bdb) -->

```php
<?

final class TextReplacer {
  function replace(
    string $patternToFind, 
    string $textToReplace, 
    string $subject, 
    string $replaceFunctionName, 
      $postProcessClosure) {
      return $postProcessClosure(
          $replaceFunctionName($patternToFind,
                               $textToReplace,
                               $subject));
    }
}

// Lots of tests on text replacer so you can gain confidence.

final class WordProcessor {
  function replaceText(string $patternToFind, string $textToReplace) {
      $this->text = (new TextReplacer())->replace(
          $patternToFind, 
          $textToReplace, 
          $this->text, 
          'str_replace', fn($text) => '<<<' . $text . '>>>');
    }
}

final class Obfuscator {
  function obfuscate(string $patternToFind, string $textToReplace) {
    $this->text = (new TextReplacer())->replace(
          $patternToFind, 
          $textToReplace, 
          $this->text, 
          'str_ireplace', fn($text) => strlower($text));
    }
}
```

# Detection 🔍

Linters can find repeated code. 

There are not very good finding similar patterns. 

Maybe soon machine learning will help us find such abstractions automatically. 

For now, it is up to us, humans.

# Tags 🏷️

- Duplication

# Conclusion 🏁

Repeated code is always a smell. 

Copying and pasting code is always a shame.

With our refactoring tools, we need to accept the duplication remove challenge trusting our tests as a safety net.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

# More Information 📕

[Laziness II - Code Wizards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20II%20-%20Code%20Wizards/readme.md)

[Copy and Paste Programming](https://en.wikipedia.org/wiki/Copy_and_paste_programming)

[Dry](https://deepdive.hashnode.dev/dry-dont-repeat-yourself)

# Credits 🙏

Photo by [Sid Balachandran](https://unsplash.com/@itookthose) on [Unsplash](https://unsplash.com/s/photos/parrot)

* * *

> Copy and paste is a design error. 

_David Parnas_
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)