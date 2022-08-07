# Code Smell 122 - Primitive Obsession

![Code Smell 122 - Primitive Obsession](k-mitch-hodge-wZi9xiBAnWE-unsplash.jpg)

*Objects are there for the picking. Even the smallest ones.*

> TL;DR: Use small objects instead of primitive ones.

# Problems

- Code Duplication

- Small Objects Missing

- [Fail Fast](../../Theory/Fail%20Fast/readme.md) principle violation.

- [Bijection Fault](../../Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

- Subset violations: Emails are a subset of strings, Valid Ages are a subset of Real, Ports are a subset of Integers, etc.

- We spread Logic and Behavior in many places.

- Premature Optimization.

# Solutions

1. Create Small Objects

2. Build missing abstractions using [MAPPER](../../Theory/What%20is%20(wrong%20with)%20software/readme.md)

3. Use Value-Objects

# Context

We are very lazy to create small objects.

We are also lazy to separate *What* and *How*

We like very much to understand the *internals* of how things work.

We need to start thinking in a whitebox way and looking at the protocol and behavior of small components.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/12dc64f150fb047541b9aaa795d85faf)
```javascript
// Samples borrowed with permission from
// https://towardsdev.com/why-a-host-is-not-a-string-and-a-port-is-not-an-integer-595c182d817c

var port = 8080;

var in = open("example.org", port);
var uri = urifromPort("example.org", port);
var address = addressFromPort("example.org", port);
var path = pathFromPort("example.org", port);
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/32202947a8d5ef760936a1e094d3f6b3)
```javascript
// Samples borrowed with permission from
// https://towardsdev.com/why-a-host-is-not-a-string-and-a-port-is-not-an-integer-595c182d817c

const server = Port.parse(this, "www.kivakit.org:8080");
// Port is a smallobject with responsibilities and protocol

let in = port.open(this);
const uri = port.asUri(this);
const address = port.asInetSocketAddress();
const path = port.path(this, "/index.html");
```

# Detection

[X] Manual

We can automate checks on constructors for small objects missing opportunities. 

# Tags

- Primitive Obsession

# Conclusion

We need to transform our strings, numbers, and arrays into small objects.

# Relations

[Code Smell 121 - String Validations](../../Code%20Smells/Code%20Smell%20121%20-%20String%20Validations/readme.md)

[Code Smell 04 - String Abusers](../../Code%20Smells/Code%20Smell%2004%20-%20String%20Abusers/readme.md)

# More Info

- [Why a Host is not a String and a Port is not an Integer](https://towardsdev.com/why-a-host-is-not-a-string-and-a-port-is-not-an-integer-595c182d817c)

- [Primitive Obsession — A Code Smell that Hurts People the Most](https://medium.com/the-sixt-india-blog/primitive-obsession-code-smell-that-hurt-people-the-most-5cbdd70496e9)

- [Refactoring Guru](https://refactoring.guru/es/smells/primitive-obsession)

# Credits

Photo by [K. Mitch Hodge](https://unsplash.com/@kmitchhodge) on [Unsplash](https://unsplash.com/s/photos/prehistoric)
  
* * *

> Iteration allows us to progressively approach some goal. We can discard the steps that take us further away and prefer the steps that move us nearer. This is in essence how evolution works. It is also at the heart of how modern machine learning (ML) works.

_Dave Farley_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)