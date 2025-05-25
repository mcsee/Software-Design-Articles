# Code Smell 248 - Unreliable Copy
            
![Code Smell 248 - Unreliable Copy](Code%20Smell%20248%20-%20Unreliable%20Copy.jpg)

*You copy a file and don't verify it*

> TL;DR: Don't rely on external solutions without good handlers

# Problems 😔 

- Silent Modifications

- Least Surprise Principle violation

- Fail Fast Principle Violation

# Solutions 😃

1. Ensure you meet your function's postconditions

2. Use mature languages

# Context 💬

The *copy()* function is used to copy files from one location to another. 

However, when used on some systems, it can fail silently or make unexpected conversions.

For example, Windows interprets paths ending with a backslash (\) as directories. 

If the intended destination file has the same name as a directory in the path, copy() will silently create an empty file with the intended filename within that directory. 

This can be confusing and lead to data loss.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/647393a744f23bb2594cd309ba92e56c) -->

```php
<?

  $sourceFile = 'C:\temp\source.txt';
  $destination = 'C:\temp\destination.txt';
  $copyWasSuccessful = copy($sourceFile, $destination);
  // true
  
  $destinationFileExists = file_exists($destination); 
  // true
  
  $sourceFile = 'C:\temp\source.txt';
  $destination = 'C:\temp\destination :txt';
  // The filename is simplified 
  // and might come from a programmatic construction

  $copyWasSuccessful = copy($sourceFile, $destination); 
  // true - this is a mistake

  $destinationFileExists = file_exists($destination); 
  // false since it was not created

  $destinationChangedFileExists = file_exists('C:\temp\destination ');
  // true but unexpected
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/75cb385ad949635913e898aa6a030b95) -->

```php
<?

  $sourceFile = 'C:\temp\source.txt';
  $destination = 'C:\temp\destination :txt';
  // The filename is simplified
  // and might come from a programmatic construction

  $copyWasSuccessful = copy($sourceFile, $destination);  
  if (!$copyWasSuccessful || !$file_exists($destination)) {
    // Don't trust the function result. Handle the postcondition error
  }
```

# Detection 🔍

[X] Semi-Automatic 

You can check all copy() handlers and wrap them

# Tags 🏷️

- Fail Fast

# Level 🔋

[X] Beginner

# AI Generation 🤖

Gemini is the only generator that avoided the problem dealing with ":" on file names

# AI Detection 🥃

With this prompt:

> What happens with this code on windows and what is the value of copyWasSuccessful

ChatGPT found the mistake and (wrongly) predicted the operation would fail

Gemini found the typo but also couldn't predict the behavior

Claude also noticed the mistake but refused to tell the execution result

# Conclusion 🏁

Always check important function's post-conditions even if *you think* you will have performance penalties.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 15 - Missed Preconditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2015%20-%20Missed%20Preconditions/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Luke Jernejcic](https://unsplash.com/@jernejcic) on [Unsplash](https://unsplash.com/photos/brown-and-white-smoke-on-brown-rock-formation-Oi31uKsnM1Q)
    
* * *

> Blaming programmers has been the prevailing approach for a half century of software development: It has not solved the problem yet, so it is time to look in different directions.

_Boris Beizer_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)