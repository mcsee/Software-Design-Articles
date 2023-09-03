# Code Smell 128 - Non-English Coding

![Code Smell 128 - Non-English Coding](Code%20Smell%20128%20-%20Non%20English%20Coding.jpg)

*Using your local language is a great idea because domain naming is easier. Not*

> TL;DR: Stick to English. Always.

# Problems

- Polymorphism

- Cultural gaps

- Mixed Code

- Syntactic Errors

# Solutions

1. Write in English

2. Rename Domain Concepts to English

# Context

All programming languages are written in English.

Unless for a few failed experiments during the 90's all modern languages use English for their primitives and their frameworks.

if you wanted to read or write in medieval Europe, you had to acquire a new language at the same time. Writing meant Latin.

This is true for programming languages nowadays.

I am not a Native English speaker.

My code (tries to be) in English.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/498a2b777034a67a6725885a20d30c15)
```javascript
const elements = new Set();

elements.add(1);
elements.add(1);

echo elements.size() yields 1 
// This is the standard set

var moreElements = new MultiConjunto();
// You defined a multiset in Spanish
// because you are extending the domain

moreElements.agregar('hello');
moreElements.agregar('hello');
// 'agregar' is the Spanish word for 'add'

echo moreElements.size() yields 2 // Since it is a multiset

// Elements and moreElements are NOT polymorphic
// You cannot exchange their implementation

class Person {
    constructor() {
        this.visitedCities = new Set();
   }

    visitCity(city) {
        this.visitedCities.add(city);
        // Breaks if you change the set (expecting ‘add()’)
        // with a MultiConjunto (expecting ‘agregar()’)
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/34f1d56858e83e39ebda706a05315454)
```javascript
const elements = new Set();

elements.add(1);
elements.add(1);

echo elements.size() yields 1 
// This is the standard set

var moreElements = new MultiSet();
// You defined a multiset in English

moreElements.add('hello');
moreElements.add('hello');

echo moreElements.size() yields 2 // Since it is a multiset

// elements and moreElements are polymorphic
// You can exchange their implementation anytime

```

# Detection

[X] Automatic 

Most IDEs and linters have a thesaurus. 

We can search for foreign words.

# Tags

- Readability

# Conclusion

Don't mix Non-English domain words with English primitives.

Even when [Mapping](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) your real-world entities, use plain English.

# More Info

- [Coding Is for Everyone—as Long as You Speak English](https://www.wired.com/story/coding-is-for-everyoneas-long-as-you-speak-english/)

- [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

# Credits

Photo by [Anna Vander Stel](https://unsplash.com/@ann_van_) on [Unsplash](https://unsplash.com/s/photos/speak)  

* * *

> A programming language is a tool that has a profound influence on our thinking habits. 

_Edsger Dijkstra_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)