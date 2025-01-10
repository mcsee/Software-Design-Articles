# Code Smell 173 - Broken Windows
            
![Code Smell 173 - Broken Windows](Code%20Smell%20173%20-%20Broken%20Windows.jpg)

*Always leave the campground cleaner than you found it.” If you find a mess on the ground, you clean it up regardless of who might have made it.*

> TL;DR: Follow Uncle Bob's boy scout rule.

# Problems

- Readability

- Maintainability

# Solutions

1. Leave the code better

2. Change it

# Context

We read code many more times than we write.

We must take ownership of code with errors and leave it better.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/5577d55a7a059073137b7d892b218e80) -->

```c
int mult(int a,int  other) 
    { int prod
      prod= 0; 
      for(int i=0;i<other  ;i++) 
        prod+= a ; 
         return prod; 
    } 

// Formatting, naming, assignment and standards inconsistent
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/952f2de180ccdbe8bb73f7dfac162fe5) -->

```c
int multiply(int firstMultiplier, int secondMultiplier) {
  int product = 0; 
  for(int currentIndex=0;
      currentIndex<secondMultiplier;
      currentIndex++) {
    product += firstMultiplier; 
  }
  return product; 
} 

// or just multiply them :)
```

# Detection

[X] Semi-Automatic 

We can use other code smell detectors and leave the code in a better shape.

# Tags

- Standards

# Conclusion

We must follow the Boy Scout rule and leave the code better.

# Relations

[Code Smell 164 - Mixed Indentations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20164%20-%20Mixed%20Indentations/readme.md)

[CoDe SmElL 159 - mIxEd_cASe](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20159%20-%20Mixed%20Case/readme.md)

[Code Smell 148 - ToDos](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20148%20-%20ToDos/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Pawel Czerwinski](https://unsplash.com/@pawel_czerwinski) on [Unsplash](https://unsplash.com/s/photos/windows-broken)  

* * *

> One broken window, left unrepaired, instills in the inhabitants of the building a sense of abandonment. People start littering. Graffiti appears. Serious structural damage begins. In a relatively short span of time, the building becomes damaged

_Andy Hunt_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)