# Code Smell 21 - Anonymous Functions Abusers

![Code Smell 21 - Anonymous Functions Abusers](Code%20Smell%2021%20-%20Anonymous%20Functions%20Abusers.jpg)

*Functions, lambdas, closures. So high order, nondeclarative, and hot.*

> TL;DR: Don't abuse closures and functions. Encapsulate them into objects.

# Problems

 - Maintainability

- Testability

- Code Reuse

- Implementation Hiding

- Debugging

# Solutions

1. Wrap functions/closures

2. Reify algorithms in method object / Strategy

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/ee95a7e72f3c758d6544eab054ce2697)
```javascript
sortFunction = function(arr, fn) {
  var len = arr.length;
    
  for (var i = 0; i < len ; i++) {
    for(var j = 0 ; j < len - i - 1; j++) {
      if (fn(arr[j], arr[ j+ 1])) {
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

scores = [9, 5, 2, 7, 23, 1, 3];  
sorted = sortFunction(scores, (a,b) => {return a > b});
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/f3000f6792099ea70c649698203554b8)
```javascript
class ElementComparator{
  greatherThan(firstElement, secondElement) {
    return firstElement > secondElement;
    // This is just an example. With more complex objects this comparison might not be trivial
  }
}

class BubbleSortingStrategy {
  // We have a strategy, we can't unit test it, change for a polymorphic,
  // Swap and benchmark algorithms etc.
  constructor(collection, comparer) {
    this._elements = collection;
    this._comparer = comparer;
  }
  sorted() {
    for (var outerIterator = 0; outerIterator < this.size() ; outerIterator++) {
      for(var innerIterator = 0 ; innerIterator < this.size() - outerIterator - 1; innerIterator++) {
        if (this._comparer.greatherThan(this._elements[innerIterator], this._elements[ innerIterator + 1])) {
          this.swap(innerIterator);  
        }
      } 
    } 
    return this._elements; 
  }
  size() {
    return this._elements.length;
  }
  
  swap(position) {
    var temporarySwap = this._elements[position];
    this._elements[position] = this._elements[position + 1];
    this._elements[position + 1] = temporarySwap;
  }
} 

scores = [9, 5, 2, 7, 23, 1, 3]; 
sorted = new BubbleSortingStrategy(scores,new ElementComparator()).sorted();
```

# Detection

- Closures and anonymous functions are very useful to model *code blocks*, *promises* etc. So It'd difficult to tear them apart.

# Tags

- Primitive

- Abuser

# Conclusion

Humans read code. Software works ok with anonymous functions, but maintainability is compromised when multiple closures are invoked.

# Relations

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20%2006%20-%20Too%20Clever%20Programmer/readme.md)

# Credits

Photo by [Roman Mager](https://unsplash.com/@roman_lazygeek) on [Unsplash](https://unsplash.com/s/photos/math)

* * *

> Object-oriented programming increases the value of these metrics by managing this complexity. The most effective tool available for dealing with complexity is abstraction. Many types of abstraction can be used, but encapsulation is the main form of abstraction by which complexity is managed in object-oriented programming.

_Rebecca Wirfs-Brock_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)