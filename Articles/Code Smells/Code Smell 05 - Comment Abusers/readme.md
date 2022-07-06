# Code Smell 05 - Comment Abusers

![Code Smell 05 - Comment Abusers](volodymyr-hryshchenko-V5vqWC9gyEU-unsplash.jpg)

*The code has lots of comments. 
Comments are coupled to implementation and hardly maintained.*

> TL;DR: Leave comments just for important design decisions. Don't explain the obvious.

# Problems

- Maintainability

- Obsolete Documentation

- Readability

- Code and comments duplication.

# Solutions

1) Refactor methods.

2) Rename methods to more declarative ones.

3) Break methods.

4) If a comment describes what a method does, [name the method with this description](Refactorings\Refactoring 005 - Replace Comment with Function Name).

5) Just comment on important design decisions.

[What exactly is a name — Part I The Quest](Theory\What exactly is a name — Part I The Quest)

# Examples

- Libraries

- Class Comments

- Method Comments

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/4fb1f04c950ece88450fec59ed6a827b)
```php
<?

final class ChatBotConnectionHelper {
    // ChatBotConnectionHelper is used to create connection strings to Bot Platform
    // Use this class with getString() function to get connection string to platform

    public $id; // ChatBot Id

    function getId() { // Gets id value
    }

    function setId($id) { // Sets id value
    }

    function getString() {
        // Get Connection String from Chatbot
        // ....
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/698102c04428aec69356cad26d4c50cd)
```php
<?

final class ChatBotConnectionSequenceGenerator {

    private $name;

    function connectionSequence() {
        // ....
    }
}
```

# Detection

Linters can detect comments and check the ratio of comments/lines of code against a predefined threshold.

# Relations

[Code Smell 75 - Comments Inside a Method](Code Smells\Code Smell 75 - Comments Inside a Method)

# Refactorings

[Refactoring 005 - Replace Comment with Function Name](Refactorings\Refactoring 005 - Replace Comment with Function Name)

# More info

[Refactoring Guru](https://refactoring.guru/es/smells/comments)

[What is in a name](Theory\What exactly is a name — Part I The Quest)

[Comments as a bad sign](https://dev.to/alexbunardzic/code-comments-are-a-sign-that-something-s-off-19e1)

[How to comment your code](https://arter.dev/how-to-comment-your-code-like-a-boss)

# Tags

- Comments

- Declarative

# Conclusion

Leave comments just for important design decisions. Don't comment on a method with a bad name, rename it.

# Credits 

Photo by [Volodymyr Hryshchenko](https://unsplash.com/@lunarts) on [Unsplash](https://unsplash.com/s/photos/chat)

* * *

> If you have to spend effort looking at a fragment of code and figuring out what it’s doing, then you should extract it into a function and name the function after the what.

_Martin Fowler_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)