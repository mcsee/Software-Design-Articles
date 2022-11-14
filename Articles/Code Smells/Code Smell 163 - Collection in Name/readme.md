# Code Smell 163 - Collection in Name
            
![Code Smell 163 - Collection in Name](Code%20Smell%20163%20-%20Collection%20in%20Name.jpg)

*Have you ever seen a CustomerCollection?*

> TL;DR: Don't use 'collection' in your name. It is too abstract for concrete concepts.

# Problems

- Readability

- Abstraction Abuse 

- [Bad Naming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Solutions

1. Rename the collection with a specific name.

# Context

Naming is very important.

We need to deal a lot with collections.

Collections are amazing since they don't need nulls to model the absence.

An empty collection is polymorphic with a full collection.

We avoid [nulls](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md) and [IFs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md).

We often use bad and vague names instead of looking for good names in the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/685b6d202e94d8c5b410dafd15d8b5de)
```javascript
for (var customer in customerCollection) {
    // iterate with current customer
}

for (var currentCustomer in customersCollection) {
    // iterate with current customer
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/a8a2b41722dde835757f360a5d1f01d2)
```javascript
for (var customer in customers) {
    // iterate with current customer
}
```

# Detection

[X] Semi-Automatic 

All linters can detect a bad naming like this.

It can also lead to false positives so we must be cautious.

# Tags

- Naming

# Conclusion

We need to care for all our clean code, variables, classes, and functions.

Accurate names are essential to understand our code.

# Relations

[Code Smell 134 - Specialized Business Collections](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20134%20-%20Specialized%20Business%20Collections/readme.md)

# More Info

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Mick Haupt](https://unsplash.com/@rocinante_11) on [Unsplash](https://unsplash.com/s/photos/collector)
  
* * *

> Alzheimer's Law of Programming: Looking at code you wrote more than two weeks ago is like looking at code you are seeing for the first time.

_Dan Hurvitz_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)