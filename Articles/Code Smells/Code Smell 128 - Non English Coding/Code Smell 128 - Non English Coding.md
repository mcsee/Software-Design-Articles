# Code Smell 128 - Non English Coding

*Using your local language is a great idea because domain naming is easier. Not*

![Code Smell 128 - Non English Coding](anna-vander-stel-zimQNLdnKp0-unsplash.jpg)

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

elements.size() = 1 
//This is the standard set

var moreElements = new MultiConjunto();
//We defined a multiset in Spanish
//because we are extending the domain

moreElements.agregar('hello');
moreElements.agregar('hello');
//'agregar' is the Spanish word for 'add'

moreElements.size() = 2 //Since it is a multiset

//elements and moreElements are NOT polymorphic
//I cannot exchange their implementation

```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/34f1d56858e83e39ebda706a05315454)
```javascript
const elements = new Set();

elements.add(1);
elements.add(1);

elements.size() = 1 
//This is the standard set

var moreElements = new MultiSet();
//We defined a multiset in English

moreElements.add('hello');
moreElements.add('hello');

moreElements.size() = 2 //Since it is a multiset

//elements and moreElements are polymorphic
//I can exchange their implementation anytime

```

# Detection

[X] Automatic 

Most IDEs and linters have a thesaurus. 

We can search for foreign words.

# Tags

- Readability

# Conclusion

Don't mix Non-English domain words with English primitives.

Even when [Mapping](https://maximilianocontieri.com/what-is-wrong-with-software) your real-world entities, use plain English.

# More Info

- [Coding Is for Everyone—as Long as You Speak English](https://www.wired.com/story/coding-is-for-everyoneas-long-as-you-speak-english/)

- [MAPPER](https://maximilianocontieri.com/what-is-wrong-with-software)

# Credits

Photo by [Anna Vander Stel](https://unsplash.com/@ann_van_) on [Unsplash](https://unsplash.com/s/photos/speak)  

* * *

> A programming language is a tool that has a profound influence on our thinking habits. 

_Edsger Dijkstra_

[Software Engineering Great Quotes](Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://maximilianocontieri.com/how-to-find-the-stinky-parts-of-your-code)