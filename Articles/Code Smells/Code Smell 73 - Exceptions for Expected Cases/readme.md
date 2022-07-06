# Code Smell 73 - Exceptions for Expected Cases

![Code Smell 73 - Exceptions for Expected Cases](greg-rosenke-rVBwkuAerGI-unsplash.jpg)

*Exceptions are handy Gotos and flags. Let's abuse them.*

>TL;DR: Do not use exceptions for flow control.

# Problems

- Readability

- Principle of least astonishment Violation.

# Solutions

1. Use Exceptions just for unexpected situations.

2. Exceptions handle [contract violations](https://en.wikipedia.org/wiki/Design_by_contract). Read the contract.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/14fe90a45804c47d898bab4fe8d17d36)
```java
try {
	for (int i = 0;; i++)
		array[i]++;
	} catch (ArrayIndexOutOfBoundsException e) {}

// Endless loop without end condition
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/49811ad62691011166020c49c1c2ed71)
```java
for (int index = 0; index < array.length; index++)
		array[index]++;

// index < array.length breaks execution
```

# Detection

This is a semantic smell. Unless we use machine learning linters it will be very difficult to find the mistakes.

# Tags

- Readability

# Conclusion

Exceptions are handy, and we should definitively use them instead of returning codes. 

The boundary between correct usage and wrong usage is blur like so many design principles.

# Relations

[Code Smell 72 - Return Codes](Code Smells\Code Smell 72 - Return Codes)

[Code Smell 26 - Exceptions Polluting](Code Smells\Code Smell 26 - Exceptions Polluting)

# More info

- [Don't use exceptions for flow control](https://wiki.c2.com/?DontUseExceptionsForFlowControl)

- [Java Zone](https://dzone.com/articles/exceptions-as-controlflow-in-java)

- [Stack Exchange](https://softwareengineering.stackexchange.com/questions/189222/are-exceptions-as-control-flow-considered-a-serious-antipattern-if-so-why)

- [Stack Overflow](https://stackoverflow.com/questions/729379/why-not-use-exceptions-as-regular-flow-of-control)

# Credits

Photo by [Greg Rosenke](https://unsplash.com/@greg_rosenke) on [Unsplash](https://unsplash.com/s/photos/bounds)
  

* * *

> When debugging, novices insert corrective code; experts remove defective code.

_Richard Pattis_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)