# Code Smell 95 - Premature Classification

![Code Smell 95 - Premature Classification](Code%20Smell%2095%20-%20Premature%20Classification.jpg)

*We are over generalizers. We shouldn't create abstractions until we see enough concretions.*

> TL;DR: Don't guess what the future will bring you.

# Problems

- Futurology

- Bad designs

# Solutions

1. Wait for concretions

2. Refactor late

# Context

Aristotelian Classification is a big problem in computer science. 
We tend to classify and name things **before** gathering enough knowledge and context.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/e6ca123df9f10f291a92e863bf168cc0) -->

```javascript
class Song {
    constructor(title, artist) {
        this.title = title;
        this.artist = artist;
    }

    play() {
        console.log(`Playing ${this.title} by ${this.artist}`);
    }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/d3232090ebc0c1360c85dd1079aebe14) -->

```javascript
class ClassicalSong extends Song {
    constructor(title, artist, composer) {
        super(title, artist);
        this.composer = composer;
    }

    listenCarefully() {
        console.log(`I am listening to ${this.title} by ${this.composer}`);
    }
}

const goldberg = new ClassicalSong
    ("The Goldberg Variations", "Glenn Gould", "Bach");
```

# Detection

An abstract class with just one subclass is an indicator of premature classification

# Tags

- Bad Design 

- Classification

# Conclusion

When working with classes, we name abstractions as soon as they *appear*. 

Our rule is to choose [good names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md) after the behavior.

We should not name our abstractions until we name our concrete subclasses.

# Relations

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

# More Info

- [What is in a name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md)

# Credits

Photo by [Faye Cornish](https://unsplash.com/@fcornish) on [Unsplash](https://unsplash.com/s/photos/tree)
  
* * *

> Let us change our traditional attitude to the construction of programs: Instead of imagining that our main task is to instruct a computer what to do, let us concentrate rather on explaining to human beings what we want a computer to do.

_Donald E. Knuth_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)