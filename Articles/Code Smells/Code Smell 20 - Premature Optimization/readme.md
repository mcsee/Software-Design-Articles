# Code Smell 20 - Premature Optimization

![Code Smell 20 - Premature Optimization](markus-spiske-cvBBO4PzWPg-unsplash.jpg)

*Planning ahead of time needs a crystal ball no developer has.*

> TL;DR: Don't guess things that might not happen.

# Problems

- Coupling

- Testability

- Readability

- [YAGNI](https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it)

# Solutions

1. Create great [models](Theory\What is (wrong with) software) and [bijections](Theory\The One and Only Software Design Principle) first.

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

[Gist Url]: # (https://gist.github.com/mcsee/9ac202ec7527f486b6a3ff1895d6ba41)
```javascript
class Person {
    ancestors() {
        cachedResults = GlobalPeopleSingletonCache.getInstance().relativesCache(this.id);
        if (cachedResults != null) {
            return (cachedResults.hashFor(this.id)).getAllParents();
        }
        return database().getAllParents(this.id);
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/8f6b87de8228b342caabefab2b05ca42)
```javascript
class Person {   
  ancestors() {
     return this.mother.meAndAncerstors().concat(this.father.meAndAncerstors());      
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

[Code Smell 06 - Too Clever Programmer](Code Smells\Code Smell 06 - Too Clever Programmer)

# More info

- [c2 wiki](https://wiki.c2.com/?PrematureOptimization)

- [Wikipedia](https://en.wikipedia.org/wiki/Program_optimization)

[Singleton - The root of all evil](Theory\Singleton - The root of all evil)

# Credits

Photo by [Markus Spiske](https://unsplash.com/@markusspiske) on [Unsplash](https://unsplash.com/s/photos/code)

* * *

> Premature optimization is the root of all evil.

_Donald Knuth_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)