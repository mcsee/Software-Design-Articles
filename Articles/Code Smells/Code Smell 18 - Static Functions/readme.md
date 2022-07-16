# Code Smell 18 - Static Functions

![Code Smell 18 - Static Functions](alex-azabache-BReigPd7XnQ-unsplash.jpg)

*Yet another global access coupled with laziness.*

> TL;DR: Don't use static functions. They are global and utilities. Talk to objects instead.

# Problems

- Coupling

- Testability

- Protocol Overloading

- Cohesion

# Solutions

- Class [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle) is to create instance. Honor it.

- Delegate method to instance.

- Create stateless objects. Don't call them **helpers**.

# Examples

- Static class methods

- Static attributes

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/293dc79524550a542fc70db572d8e092)
```javascript
class DateStringHelper {
   static format(date) {
     return date.toString('yyyy-MM-dd'); ;    
  }
}


DateStringHelper.format(new Date());
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/b8cfaddb9085b92d21a434a2bca2b14e)
```javascript
class DateToStringFormatter {
   constructor(date) {
      this.date = date;
   }
     
   englishFormat() {
     return this.date.toString('yyyy-MM-dd');    
  } 
}

new DateToStringFormatter(new Date()).englishFormat()


```

# Detection

We can enforce a policy to avoid static methods (all class methods but constructors).

# Tags

- Global

- Libraries

# Conclusion

Class are globals disguised. Polluting their protocol with "library methods" breaks cohesion and generates coupling. We should extract static with refactorings.

In most languages we cannot manipulate classes and use them polymorphically, so we can't mock them or plug them on tests. 

Therefore, we have a global reference too difficult to decouple.

# Relations

[Singleton - The root of all evil](Theory\Singleton - The root of all evil)

[Code Smell 22 - Helpers](Code Smells\Code Smell 22 - Helpers)

# More info

- [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle)

[How to Decouple a Legacy System](Theory\How to Decouple a Legacy System)

# Credits

Photo by [Alex Azabache](https://unsplash.com/@alexazabache) on [Unsplash](https://unsplash.com/s/photos/bridge)

* * *

> There is no programming problem that can't be solved with one more level of indirection.

_John McCarthy_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()