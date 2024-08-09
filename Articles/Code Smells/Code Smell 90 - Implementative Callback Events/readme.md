# Code Smell 90 - Implementative Callback Events

![Code Smell 90 - Implementative Callback Events](Code%20Smell%2090%20-%20Implementative%20Callback%20Events.jpg)

*When creating events, we should decouple the trigger from the action.*

> TL;DR: Name your functions according to what happened.

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

// handlePageChange is coupled with what you decide to do
// instead of what really happened
//
// You cannot reuse this kind of callback
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/185fef9ac202fed779fcf8a6c8f0bac3)

```javascript
const Item = ({name, onItemSelected)} =>
  <li onClick={onItemSelected}>
    {name}
  </li>

// onItemSelected will be called just when an item was selected. KISS
// Parent can decide what to do (or do nothing)
// You defer the decision
```

# Detection

This is a semantic smell. We can detect it on peer code reviews.

# Tags

- Coupling

- Naming

# Conclusion

Names are very important. We should delay implementation coupled names until the very last moment.

# Relations

[Code Smell 139 - Business Code in the User Interface](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20139%20-%20Business%20Code%20in%20the%20User%20Interface/readme.md)

# More Info

- [What is exactly in a name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md)

- [Refactoring Guru](https://refactoring.guru/es/design-patterns/observer)

# Credits

Photo by [Ashim D’Silva](https://unsplash.com/@randomlies) on [Unsplash](https://unsplash.com/s/photos/button-pressed)

Thanks to Maciej for this tip

[Twitter](https://x.com/1445692315360653318)

* * *

> Beyond basic mathematical aptitude, the difference between good programmers and great programmers is verbal ability.

_Marissa Mayer_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)