# Code Smell 123 - Mixed 'What' and 'How'

![Code Smell 123 - Mixed 'What' and 'How'](Code%20Smell%20123%20-%20Mixed%20'What'%20and%20'How'.jpg)

*We love looking at the internal gears of the clock, but we need to start focusing on the hands.*

> TL;DR: Don't mess with implementation details. Be declarative. Not imperative.

# Problems

- Accidental Coupling

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Lack of design for change

- [Comments](https://twitter.com/TonyFlury/status/1103649549355233280) distinguish the 'how' and the 'what'.

# Solutions

1. Separate 'What' and 'How' concerns. 

# Context

Separating concerns is very difficult in the software industry.

Functional software survives ages.

Implementative software brings coupling and is harder to change.

Choosing wise declarative names is a daily challenge.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/d6d3df14e1268f9308fdd2121ccd598d)
```javascript
class Workflow {
    moveToNextTransition() {
        // We couple the business rule with the accidental implementation
        if (this.stepWork.hasPendingTasks) {
            throw new Exception('Preconditions are not met yet..');
        } else {
            this.moveToNextStep();
        }
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/4fb3c004b00d81cfb1749bd22394772c)
```javascript
class Workflow {
    moveToNextTransition() {
        if (!this.canWeMoveOn()) {
            throw new Exception('Preconditions are not met yet..');
        } else {
            this.moveToNextStep();
        }
    }

    canWeMoveOn() {
        // We hide accidental implementation 'the how'
        // under the 'what'
        return !this.stepWork.hasPendingTasks();
    }
}
```

# Detection

[X] Manual

This is a semantic and naming smell.

# Tags

- Readability

# Conclusion

We need to choose good names and add indirection layers when necessary.

Of course, *[premature optimizators](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md)* will fight us, telling us we are wasting computational resources and they need to know the insights we are hiding from them.

# Relations

[Code Smell 92 - Isolated Subclasses Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2092%20-%20Isolated%20Subclasses%20Names/readme.md)

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

# More Info

- [On premature optimizators](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md)

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- [What is in a name?](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20—%20Part%20II%20Rehab/readme.md)

# Credits

Photo by [Josh Redd](https://unsplash.com/@joshredd) on [Unsplash](https://unsplash.com/s/photos/clock)
  
The idea of this smell is here:

[Code Smell 118 - Return False's comment](https://dev.to/otumianempire/comment/1mge9)

and here:

[Twitter](https://twitter.com/1103649549355233280)

* * *

> We are constantly interfacing with other people's code that might not live up to our high standards and dealing with inputs that may or may not be valid. So we are taught to code defensively. We use assertions to detect bad data and check for consistency.

_Andrew Hunt_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)