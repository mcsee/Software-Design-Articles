# Code Smell 36 - Switch/case/elseif/else/if statements

![Code Smell 36 - Switch/case/elseif/else/if statements](Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements.jpg)

*First programming lesson: Control structures. Senior developer lesson: avoid them.*

> TL;DR: Don use Ifs or its friends

# Problems

- Too many decisions together

- Coupling

- Duplicated code

- Violation of [Open/Closed Principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).

- A new condition should not change the main algorithm.

- Nulls

# Solutions

1. Polymorphism

2. Create hierarchies/compose objects following *Open closed principle*.

3. Use [State pattern](https://en.wikipedia.org/wiki/State_pattern) to model transitions.

4. Use [Strategy Pattern](https://en.wikipedia.org/wiki/Strategy_pattern)/[Method Object](https://wiki.c2.com/?MethodObject) to choose for branches.

# Examples

- Discrete Values

- State transition

- Algorithm choice.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/fd1c07ce153817a5572cb3cb84ae1007) -->

```javascript
class Mp3Converter {
  convertToMp3(source, mimeType) {
    if(mimeType.equals("audio/mpeg")) {
        this.convertMpegToMp3(source)
    } else if(mimeType.equals("audio/wav")) {
        this.convertWavToMp3(source)
    } else if(mimeType.equals("audio/ogg")) {
        this.convertOggToMp3(source)
    } else if(...) {
        // Lots of new clauses
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/ef02daf9882bbf6a6f12820b31e19920) -->

```javascript
class Mp3Converter {
  convertToMp3(source, mimeType) {
    const foundConverter = this.registeredConverters.
        find(converter => converter.handles(mimeType));
        // Do not use metaprogramming to find and iterate converters
        // since this is another problem.    
    if (!foundConverter) {
      throw new Error('No converter found for ' + mimeType);
    }    
    foundConverter.convertToMp3(source);
  }
}
```

#Detection

Since there are [valid cases](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md) for If/else usages, we should not pull the plug and forbid these instructions. We can put a ratio of if statements/other statements as a warning instead.  

# Relations

[Code Smell 12 - Null](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)

[Code Smell 110 - Switches With Defaults](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20110%20-%20Switches%20With%20Defaults/readme.md)

[Code Smell 133 - Hardcoded IF Conditions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20133%20-%20Hardcoded%20IF%20Conditions/readme.md)

# More Info

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Credits

Photo by [Adarsh Kummur](https://unsplash.com/@akummur) on [Unsplash](https://unsplash.com/s/photos/tree)

> If debugging is the process of removing software bugs, then programming must be the process of putting them in.

_Edsger Dijkstra_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)