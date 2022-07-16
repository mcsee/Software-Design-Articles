# Code Smell 72 - Return Codes

![Code Smell 72 - Return Codes](alex-hay-bkyiWLMQ6d4-unsplash.jpg)

*APIs, Return codes, C Programming Language, We've all been there.*

## TL;DR: Don't return codes to yourself. Raise Exceptions.

# Problems

- [IFs](Theory\How to Get Rid of Annoying IFs Forever)

- Code Polluting

- Outdated documentation

- Coupling to accidental codes.

- Functional logic polluted.

# Solutions

1. Change Ids and return Generic Exceptions.

2. Distinguish Happy Path from Exception Path.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/d7afaa2f18126a7cdb7ecfcbb1124d81)
```javascript
function createSomething(arguments) {
    // Magic Creation
    success = false; // we failed

    // We failed to create
    if (!success) {
        return {
            object: null,
            errorCode: 403,
            errorDescription: 'We didnt have permission to create...'
        };
    }

    return {
        object: createdObject,
        errorCode: 400,
        errorDescription: ''
    };
}

var myObject = createSomething('argument');
if (myObject.errorCode != 400) {
    console.log(myObject.errorCode + ' ' + myObject.errorDescription)
}
// but myObject does not hold My Object but an implementative
// and accidental array
// from now on me need to remember this
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/5162daac1e8e7aa5b163ef724944a524)
```javascript
function createSomething(arguments) {
    // Magic Creation
    success = false; // we failed
    // We failed to create
    if (!success) {
        throw new Error('We didnt have permission to create...');
    }
    return createdObject;
}

try {
    var myObject = createSomething('argument');
    // no IFS, just happy path
} catch (exception) {
    // deal with it!
    console.log(exception.message);
}
// myObject holds my expected object
```

# Detection

We can teach our linters to find patterns of integer and strings returns coupled with ifs and return checking.

# Tags

- Exceptions

# Conclusion

Ids and codes are external identifiers. 

They are useful when you need to interact with an external system (for example an API Rest).

We should not use them on our own systems and our own internal APIs.

Create and raise generic exceptions.

Only create specific exceptions if you are ready to handle them, and they have specialized behavior. 

Don't create [anemic](Code Smells\Code Smell 01 - Anemic Models) Exceptions.

Avoid [immature and premature optimized languages](https://golangdocs.com/errors-exception-handling-in-golang) favoring return codes.

# Relations

[Code Smell 26 - Exceptions Polluting](Code Smells\Code Smell 26 - Exceptions Polluting)

# More info

[How to Get Rid of Annoying IFs Forever](Theory\How to Get Rid of Annoying IFs Forever)

%[http://nicolecarpenter.github.io/2016/03/15/clean-code-chapter-7-error-handling.html]

# Credits

Photo by [Alex Hay](https://unsplash.com/@alex_hay) on [Unsplash](https://unsplash.com/s/photos/numbers)  

* * *

> Error handling is important, but if it obscures logic, it’s wrong.

_Robert Martin_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()