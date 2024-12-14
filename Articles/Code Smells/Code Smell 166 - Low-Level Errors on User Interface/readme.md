# Code Smell 166 - Low-Level Errors on User Interface
            
![Code Smell 166 - Low-Level Errors on User Interface](Code%20Smell%20166%20-%20Low-Level%20Errors%20on%20User%20Interface.jpg)

*Fatal error: Uncaught Error: Class 'logs_queries_web' not found in /var/www/html/query-line.php:78 Stack trace: #0 {main} thrown in /var/www/html/query-line.php on line 718*

> TL;DR: Catch your errors. Even the ones you don't expect.

# Problems

- Security

- Error Handling

- Error Logging

- Bad UX Experience

# Solutions

1. Use a top-level handler

2. Avoid languages favoring [return codes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2072%20-%20Return%20Codes/readme.md)

3. Expect database and low-level errors

# Context

Even in 2022, we can see "serious" websites showing casual users a stack or debugging message.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/8d71bdae68fc52a1b6d1c65e8ce944af) -->

```php
<?

Fatal error: Uncaught Error: Class 'MyClass' 
  not found in /nstest/src/Container.php:9
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/3d16a49a680234811e19a56fd3d5be17) -->

```php
<?

// A user-defined exception handler function
function myException($exception) {
    logError($exception->description())
    // You don’t show Exception to final users
    // This is a business decision
    // You can also show a generic user message     
}

// Set user-defined exception handler function
set_exception_handler("myException");
```

# Detection

[X] Automatic 

We can use mutation testing to simulate problems and see if they are handled correctly.

# Tags

- Security

# Conclusion

We need to keep maturing. 

Our solutions shouldn't be sloppy.

We need to improve our reputation as serious software engineers.

# Relations

[Code Smell 72 - Return Codes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2072%20-%20Return%20Codes/readme.md)

# More Info

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [jesse orrico](https://unsplash.com/@jessedo81) on [Unsplash](https://unsplash.com/s/photos/dirty)  

* * *

> 80 percent of my problems are simple logic errors. 80 percent of the remaining problems are pointer errors. The remaining problems are hard.

_Mark Donner_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)