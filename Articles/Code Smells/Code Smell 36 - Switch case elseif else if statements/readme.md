# Code Smell 36 - Switch/case/elseif/else/if statements

![Code Smell 36 - Switch/case/elseif/else/if statements](adarsh-kummur-zThTy8rPPsY-unsplash.jpg)

*First programming lesson: Control structures. Senior developer lesson: avoid them.*

Problems:
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

[Gist Url]: # (https://gist.github.com/mcsee/fd1c07ce153817a5572cb3cb84ae1007)
```javascript
Class Mp3Converter {

  public convertToMp3(source, String mimeType) {
    if(mimeType.equals("audio/mpeg")) {
        this.convertMpegToMp3(source)
    } else if(mimeType.equals("audio/wav")) {
        this.convertWavToMp3(source)
    } else if(mimeType.equals("audio/ogg")) {
        this.convertOggToMp3(source)
    } else if(...) {
        // Lots of new elses
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/ef02daf9882bbf6a6f12820b31e19920)
```javascript
Class Mp3Converter {

  public convertToMp3(source, mimeType) {
    foundConverter = this.registeredConverters.find(converter => converter.handles(mimeType));
    // Do not use metaprogramming to find and iterate converters since this is another smell.
    
    if (foundConverter == undefined) {
      throw new ('No converter found for' + mimetype)
    }
    foundConverter.convertToMp3(source);
}
```

#Detection

Since there are [valid cases](Theory\How to Get Rid of Annoying IFs Forever) for If/else usages, we should not pull the plug and forbid these instructions. We can put a ratio of if statements/other statements as a warning instead.  

# Relations

-[Code Smell 12 - Null](Code Smells\Code Smell 12 - Null)

-[Code Smell 102 - Arrow Code](Code Smells\Code Smell 102 - Arrow Code)

# More info

[How to Get Rid of Annoying IFs Forever](Theory\How to Get Rid of Annoying IFs Forever)

# Credits

Photo by [Adarsh Kummur](https://unsplash.com/@akummur) on [Unsplash](https://unsplash.com/s/photos/tree)

> If debugging is the process of removing software bugs, then programming must be the process of putting them in.

_Edsger Dijkstra_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)