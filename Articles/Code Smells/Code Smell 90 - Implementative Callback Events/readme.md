# Code Smell 90 - Implementative Callback Events

*When creating events, we should decouple the trigger from the action.*

![Code Smell 90 - Implementative Callback Events](ashim-d-silva-P_PNZnNd7-Y-unsplash.jpg)

> TL;DR: Name your functions acording to what happened.

# Problems

- [Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern) violation

- Coupling

# Solutions

1. Name the events after "what happened", not "what you should do". 

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/0a96468b7877744c0ec41d60378df4cd)
```javascript
const Item = ({name, handlePageChange)} =>
  <li onClick={handlePageChange}>
    {name}
  </li>

//handlePageChange is coupled to what you decide to do
//instead of what really happened
//
//We cannot reuse this kind of callbacks
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/185fef9ac202fed779fcf8a6c8f0bac3)
```javascript
const Item = ({name, onItemSelected)} =>
  <li onClick={onItemSelected}>
    {name}
  </li>

//onItemSelected will be called just when a item was selected. KISS
//Parent can decide what to do (or do nothing)
//We defer the decision
```

# Detection

This is a semantic smell. We can detect it on peer code reviews.

# Tags

- Coupling

- Naming

# Conclusion

Names are very important. We should delay implementation coupled names until the very last moment.

# More Info

- [What is exactly in a name](https://maximilianocontieri.com/what-exactly-is-a-name-part-i-the-quest)

- [Refactoring Guru](https://refactoring.guru/es/design-patterns/observer)

# Credits

Photo by [Ashim D’Silva](https://unsplash.com/@randomlies) on [Unsplash](https://unsplash.com/s/photos/button-pressed)
  

Thanks to Maciej for this tip

[Twitter](https://twitter.com/1445692315360653318)

* * *

> Beyond basic mathematical aptitude, the difference between good programmers and great programmers is verbal ability.

_Marissa Mayer_
 
[Software Engineering Great Quotes](Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://maximilianocontieri.com/how-to-find-the-stinky-parts-of-your-code)