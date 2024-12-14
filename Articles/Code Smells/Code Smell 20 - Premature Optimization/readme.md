# Code Smell 20 - Premature Optimization

![Code Smell 20 - Premature Optimization](Code%20Smell%2020%20-%20Premature%20Optimization.jpg)

*Planning ahead of time needs a crystal ball no developer has.*

> TL;DR: Don't guess things that might not happen.

# Problems

- Coupling

- Testability

- Readability

- [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)

# Solutions

1. Create great [models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) and [bijections](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) first.

2. Create a conclusive benchmark once the model is working.

3. *Programmers waste enormous amounts of time worrying about, the speed of noncritical parts of their programs, and these attempts at efficiency actually have a strong negative impact when debugging and maintenance are considered.* Donald Knuth

4. [Design for Performance](https://wiki.c2.com/?DesignForPerformance).

5. Use Test Driven Development technique. It always favors the simplest solution.

# Examples

- Weird data structures

- Caches

- Singletons

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/9ac202ec7527f486b6a3ff1895d6ba41) -->

```javascript
class Person {
  ancestors() {
    cachedResults = 
        GlobalPeopleSingletonCache.getInstance().relativesCache(this.id);
    if (cachedResults != null) {
        return (cachedResults.hashFor(this.id)).getAllParents();
    }
    return database().getAllParents(this.id);
  }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/8f6b87de8228b342caabefab2b05ca42) -->

```javascript
class Person {   
  ancestors() {
     return this.mother.meAndAncerstors().concat(
       this.father.meAndAncerstors());      
  }
  meAndAncerstors() {
     return this.ancestors().push(this);
  }
}
```

# Detection

This is a design smell so it can not be detected by mechanical tools (yet).

# Tags

- Premature Optimization

- Antipattern

# Conclusion

Defer performance decisions until functional models are mature enough.

Donald Knuth created/compiled the best/fastest algorithms and data structures. With great wisdom he warned us of abuse. Why do we think we are smarter than him? 

# Relations

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

# More Info

- [c2 wiki](https://wiki.c2.com/?PrematureOptimization)

- [Wikipedia](https://en.wikipedia.org/wiki/Program_optimization)

[Singleton - The root of all evil](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20root%20of%20all%20evil/readme.md)

# Credits

Photo by [Markus Spiske](https://unsplash.com/@markusspiske) on [Unsplash](https://unsplash.com/s/photos/code)

* * *

> Premature optimization is the root of all evil.

_Donald Knuth_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)