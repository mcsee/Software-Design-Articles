# Code Smell 74 - Empty Lines

![Code Smell 74 - Empty Lines](Code%20Smell%2074%20-%20Empty%20Lines.jpg)

*Breaking the code to favor readability asks for refactor.*

> TL;DR Don't add empty lines to your methods. Extract them!

# Problems

- Readability

- Kiss

- Low Reuse

# Solutions

1. Extract Method

2. Refactor

3. Remove unneeded lines.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/3e7f0a453f04d443a98d3ffd99d9bfde)
```php
<?

function translateFile() {
    $this->buildFilename();
    $this->readFile();
    $this->assertFileContentsAreOk();
    // A lot of lines more
    
    // Empty space to pause definition
    $this->translateHiperLinks();
    $this->translateMetadata();
    $this->translatePlainText();
    
    // Yet Another empty space
    $this->generateStats();
    $this->saveFileContents();
    // A lot of more lines
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/13ce5551b29a588db5dbb9903d714b84)
```php
<?

function translateFile() {
    $this->readFileToMemoy();
    $this->translateContents();
    $this->generateStatsAndSaveFileContents();  
}
```

# Detection

This is a policy smell. Every linter can detect blank lines and warn us.

# Tags

- Readability

- Long Methods

# Conclusion

Empty lines are harmless, but show us an opportunity to break the code into small steps.

If you break your code with comments, it is also a code smell asking for a refactor.

# Relations

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

# Credits

Photo by [Sigmund](https://unsplash.com/@sigmund) on [Unsplash](https://unsplash.com/s/photos/empty)
  

* * *

> It’s OK to figure out murder mysteries, but you shouldn’t need to figure out code.  You should be able to read it.

_Steve McConnell_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)