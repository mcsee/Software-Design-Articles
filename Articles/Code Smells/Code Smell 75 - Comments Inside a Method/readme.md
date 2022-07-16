# Code Smell 75 - Comments Inside a Method

![Code Smell 75 - Comments Inside a Method](jason-rosewell-ASKeuOZqhYU-unsplash.jpg)

*Comments are often a code smell. Inserting them inside a method calls for an urgent refactor.*

> TL;DR: Don't add comments inside your methods. Extract them and leave declarative comments just for not obvious design decisions.

# Problems

- Readability

- Kiss

- Low Reuse

- Bad Documentation

# Solutions

1. Extract Method

2. [Refactor](Refactorings\Refactoring 005 - Replace Comment with Function Name)

3. Remove not declarative comments.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/eae0f716ae595002445926a33fb4d7e8)
```javascript
function recoverFromGrief() {
    // Denial stage
    absorbTheBadNews();
    setNumbAsProtectiveState();
    startToRiseEmotions();
    feelSorrow();

    // Anger stage
    maskRealEffects();
    directAngerToOtherPeople();
    blameOthers();
    getIrrational();

    // bargaining stage
    feelVulnerable();
    regret();
    askWhyToMyself();
    dreamOfAlternativeWhatIfScenarios();
    postoponeSadness();

    // depression stage
    stayQuiet();
    getOverwhelmed();
    beConfused();

    // acceptance stage
    acceptWhatHappened();
    lookToTheFuture();
    reconstructAndWalktrough();
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/06f878717d284007d42c0140ccd0cb8e)
```javascript
function recoverFromGrief() {
    denialStage();
    angerStage();
    bargainingStage();
    depressionStage();
    acceptanceStage();
}

function denialStage() {
    absorbTheBadNews();
    setNumbAsProtectiveState();
    startToRiseEmotions();
    feelSorrow();
}

function angerStage() {
    maskRealEffects();
    directAngerToOtherPeople();
    blameOthers();
    getIrrational();
}

function bargainingStage() {
    feelVulnerable();
    regret();
    askWhyToMyself();
    dreamOfAlternativeWhatIfScenarios();
    postoponeSadness();
}

function depressionStage() {
    stayQuiet();
    getOverwhelmed();
    beConfused();
}

function acceptanceStage() {
    acceptWhatHappened();
    lookToTheFuture();
    reconstructAndWalktrough();
}
```

# Detection

This is a policy smell. Every linter can detect comments not present in the first line and warn us.

Tip: (Thanks [@GreenFieldCoder](https://twitter.com/GreenFieldCoder))

> To get rid of comments fast, change your IDE to display comments with red background and yellow text. It will literally scream refactor me when browsing the code.

> Also prevents you from writing new comments.

# Tags

- Readability

- Long Methods

- Comments

# Conclusion

Comments are a code smell. If you need to document a design decision, you should do it before the actual method code.

# Relations

[Code Smell 03 - Functions Are Too Long](Code Smells\Code Smell 03 - Functions Are Too Long)

[Code Smell 74 - Empty Lines](Code Smells\Code Smell 74 - Empty Lines)

[Code Smell 05 - Comment Abusers](Code Smells\Code Smell 05 - Comment Abusers)

# Refactorings

[Refactoring 005 - Replace Comment with Function Name](Refactorings\Refactoring 005 - Replace Comment with Function Name)

# Credits

Photo by [Jason Rosewell](https://unsplash.com/@jasonrosewell) on [Unsplash](https://unsplash.com/@jasonrosewell)
  
* * *

> Don't get suckered in by the comments, they can be terribly misleading: Debug only the code.

_Dave Storer_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()