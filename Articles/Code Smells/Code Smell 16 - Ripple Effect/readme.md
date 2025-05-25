# Code Smell 16 - Ripple Effect

![Code Smell 16 - Ripple Effect](Code%20Smell%2016%20-%20Ripple%20Effect.jpg)

*Small changes yield unexpected problems.*

> TL;DR: If small changes have big impact, you need to decouple your system.

# Problems 😔 

- Coupling

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Solutions 😃

1. Decouple.
2. Cover with tests.
3. Refactor and isolate what is changing.
4. Depend on interfaces.

[How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)

# Examples

- Legacy Systems

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/3861429b0a02eb2a3906d0f939cc1809) -->

```javascript
class Time {
   constructor(hour, minute, seconds) {
     this.hour = hour;    
     this.minute = minute;  
     this.seconds = seconds;  
  }
    now() {
      // call operating system
    }  
}

// Adding a TimeZone will have a big Ripple Effect
// Changing now() to consider timezone will also bring the effect
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/7fbceedcae6aae7f15d392c9bbe0ffa1) -->

```javascript
class Time {
   constructor(hour, minute, seconds, timezone) {
     this.hour = hour;    
     this.minute = minute;  
     this.seconds = seconds;  
     this.timezone = timezone;  
  }  
  // Removed now() since is invalid without context
}

class RelativeClock {
   constructor(timezone) {
     this.timezone = timezone;
   }
   now(timezone) {
     var localSystemTime = this.localSystemTime();
     var localSystemTimezone = this.localSystemTimezone();
     // Do some math translating timezones
     // ...
     return new Time(..., timezone);     
   }  
}
```

# Detection 🔍

- It is not easy to detect problems before they happen. [Mutation Testing](https://en.wikipedia.org/wiki/Mutation_testing) and root cause analysis of [single points of failures](https://en.wikipedia.org/wiki/Single_point_of_failure) may help.

# Tags 🏷️

- Legacy

# Conclusion 🏁

There are multiple strategies to deal with Legacy and coupled systems. We should deal with this problem before it explodes under our eyes.

# Relations 👩‍❤️‍💋‍👨

- [Code Smell 08 - Long Chains Of Collaborations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2008%20-%20Long%20Chains%20Of%20Collaborations/readme.md)

# More Information 📕

- [How to Decouple a Legacy System](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Decouple%20a%20Legacy%20System/readme.md)
 
# Credits 🙏

Photo by [Jack Tindall](https://unsplash.com/@jtindall) on [Unsplash](https://unsplash.com/s/photos/big-wave)

* * *

> Architecture is the tension between coupling and cohesion.

_Neal Ford_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)