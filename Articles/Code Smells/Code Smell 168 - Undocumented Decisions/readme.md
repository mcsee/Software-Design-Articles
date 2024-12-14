# Code Smell 168 - Undocumented Decisions
            
![Code Smell 168 - Undocumented Decisions](Code%20Smell%20168%20-%20Undocumented%20Decisions.jpg)

*We need to make some changes. We need to be clear on why*

> TL;DR: Be declarative on your design or implementation decisions.

# Problems

- Code Comments

- Lack of testability

# Solutions

1. Be Explicit about the reasons.

2. Convert the comment to a method.

# Context

Sometimes we find arbitrary rules not so easily testable. 

If we cannot write a failing test, we need to have a function with an excellent and declarative name instead of a comment.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/554144e5e61703b8a556328671b0a3dd) -->

```c
// You need to run this process with more memory
set_memory("512k");
           
run_process();
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/ab76cec5efd320d5cf9a2e626343d3e8) -->

```c
increase_memory_to_avoid_false_positives();
run_process();
```

# Detection

[X] Semi-Automatic 

This is a semantic smell.

We can detect comments and warn us.

# Tags

- Comments

# Conclusion

Code is prose. And design decisions should be narrative.

# Relations

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

[Code Smell 75 - Comments Inside a Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2075%20-%20Comments%20Inside%20a%20Method/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Goh Rhy Yan](https://unsplash.com/@gohrhyyan) on [Unsplash](https://unsplash.com/s/photos/warning)
  
* * *

> Programs, like people, get old. We can’t prevent aging, but we can understand its causes, limit its effects and reverse some of the damage.

_Mario Fusco_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)