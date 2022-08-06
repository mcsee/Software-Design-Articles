# Code Smell 42 - Warnings/Strict Mode Off

![Code Smell 42 - Warnings/Strict Mode Off](noah-dominic-silvio-pB0y7Nf7xpU-unsplash.jpg)

*Compilers and warnings lights are there for help. Don't ignore them.*

# Problems

- Missed Errors

- Ripple Effect

- Fail Fast

# Solutions

1. Enable all warnings

2. Enable preconditions and assertions in production.

3. [Fail fast](Theory\Fail Fast)

4. [Design by contract](https://en.wikipedia.org/wiki/Design_by_contract)

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/d4f19089543214fbc677a846967cb501)
```javascript
array = [];
console.log(array['1'])
// undefined but keep going on

hiddenGlobal = "I am a global"

console.log(hiddenGlobal)
//  I'm a global
``` 

## Right

[Gist Url]: # (https://gist.github.com/mcsee/4523879f8fd11134654d4683b5c68ceb)
```javascript
array = [];
console.log(array['1'])
// Index Error

noGlobal = "I am not a global"

console.log(noGlobal)
// ReferenceError

var noGlobal = "I am not a global"

console.log(noGlobal)
// I am not a global
``` 

# Detection

Most languages have warning levels. We should turn most of them *ON*.

We should run linters to statically analyze our code for potential problems.

 # Tags

- Fail Fast

# Conclusion

If we ignore warnings and code moves on sooner or later it will fail.

If the software fails *later* it will be very difficult for us to find root cause. 

Defect will likely be near first warning and far away from the crash.

If we follow the *Broken Windows Theory*, we should not tolerate any warnings, so a new issue will not pass unnoticed on a sea of *tolerated* warnings.

# Relations

[Code Smell 19 - Optional Arguments](Code Smells\Code Smell 19 - Optional Arguments)

[Code Smell 12 - Null](Code Smells\Code Smell  12 - Null) 

# More info

[Fail Fast](Theory\Fail Fast) 

- [Use strict in javascript](https://blog.rahulism.co/use-strict-in-javascript)

# Credits

Photo by [Noah Dominic Silvio](https://unsplash.com/@electronicsocks) on [Unsplash](https://unsplash.com/s/photos/traffic-light)

* * *

> One man's crappy software is another man's full time job.     

_Jessica Gaston_
 
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()




