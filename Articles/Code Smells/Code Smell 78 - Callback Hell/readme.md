# Code Smell 78 - Callback Hell

![Code Smell 78 - Callback Hell](Code%20Smell%2078%20-%20Callback%20Hell.jpg)

*Processing an algorithm as a sequence of nested callbacks is not clever.*

> TL;DR: Don't process calls in a callback way. Write a sequence.

# Problems

- Readability

- Hard to debug.

- Complexity

# Solutions

1. Change callbacks to sequence calls.

2. Extract repeated Code

3. Refactor.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/110f803da03a27f4024ebbce97154307)

```javascript
asyncFunc1(function (error, result1) {
  if (error) {
    console.log(error);
  } else {
    asyncFunc2(function (error, result2) {
      if (error) {
        console.log(error);
      } else {
        asyncFunc3(function (error, result3) {
          if (error) {
            console.log(error);
          } else {
            // Nested callback continues...
          }
        });
      }
    });
  }
});
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/90622aea76933ddedea1fd344dbe4751)

```javascript
function asyncFunc1() {
  return new Promise((resolve, reject) => {
    // Async operation
    // ...
    // If successful
    resolve(result1);
    // If error
    reject(error);
  });
}

function asyncFunc2() {
  return new Promise((resolve, reject) => {
    // Async operation
    // ...
    // If successful
    resolve(result2);
    // If error
    reject(error);
  });
}

async function performAsyncOperations() {
  try {
    const result1 = await asyncFunc1();
    const result2 = await asyncFunc2();
    const result3 = await asyncFunc3();
    // Continue with further operations
  } catch (error) {
    console.log(error);
  }
}

performAsyncOperations();
```

# Detection

This problem shines at the naked eye. Many linters can detect this complexity and warn us.

# Tags

- Readability

- Complexity

# Conclusion

Callback Hell is a very common problem in programming languages with futures or promises.

Callbacks are added in an incremental way. There's no much mess at the beginning.

Complexity without refactoring makes them hard to read and debug.

# Relations

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)
 
* * *

> There are two ways to write code: write code so simple there are obviously no bugs in it, or write code so complex that there are no obvious bugs in it.

_Tony Hoare_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)