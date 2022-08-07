# Code Smell 78 - Callback Hell

![Code Smell 78 - Callback Hell](callbacks.jpg)

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
var fs = require('fs');

var fileWithData = '/hello.world';  
fs.readFile(fileWithData, 'utf8', function(err, txt) {  
    if (err) return console.log(err);

    txt = txt + '\n' + 'Add Data!';
    fs.writeFile(fileWithData, txt, function(err) {
        if(err) return console.log(err);
        console.log('Information added');
    });
});
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/90622aea76933ddedea1fd344dbe4751)
```javascript
var fs = require('fs');

function logTextWasAdded(err) {  
    if(err) return console.log(err);
    console.log('Information added');
};

function addData(error, actualText) {  
    if (error) return console.log(error);

    actualText = actualText + '\n' + 'Add data';
    fs.writeFile(fileWithData, actualText, logTextWasAdded);
}

var fileWithData = 'hello.world';  
fs.readFile(fileWithData, 'utf8', addData);  
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

[Code Smell 06 - Too Clever Programmer](../../Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 102 - Arrow Code](../../Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)
 
* * *

> There are two ways to write code: write code so simple there are obviously no bugs in it, or write code so complex that there are no obvious bugs in it.

_Tony Hoare_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)