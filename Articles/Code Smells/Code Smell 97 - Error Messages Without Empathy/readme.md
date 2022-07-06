# Code Smell 97 - Error Messages Without Empathy

![Code Smell 97 - Error Messages Without Empathy](visuals-JpTY4gUviJM-unsplash.jpg)

*We should take special care with error descriptions for the users (and ourselves).*

> TL;DR: Use meaningful descriptions and suggest corrective actions.

# Problems

- The Least Surprise Principle

# Solutions

1. Use declarative error messages

2. Show clear exit actions

# Context

Programmers are seldom UX experts.

We also underestimate the fact we can be on both sides of the counter.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/e35210910d75821224dd75de8053b46f)
```javascript
alert("Cancel the appointment?", "Yes", "No");

// No consequences
// Options not clear
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/220e4c4d8eea96d15a0f34de2c5e96e3)
```javascript
alert("Cancel the appointment? \n" +
      "You will lose all the history", 
      "Cancel Appointment", 
      "Keep Editing");

// Consequences are clear
// Choice options have context
```

# Detection

[X] Manual

We need to read all exception messages in code reviews.

# Tags

- Exceptions

- UX

# Conclusion

We need to think in our end users when raising exception or showing messages.

# Credits

Photo by [visuals](https://unsplash.com/@visuals) on [Unsplash](https://unsplash.com/s/photos/error-message)
  
* * *

> While it is a known fact that programmers never make mistakes, it is still a good idea to humor the users by checking for errors at critical points in your program.

_Robert D. Schneider_ 
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)