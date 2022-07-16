# Code Smell 80 - Nested Try/Catch

![Code Smell 80 - Nested Try/Catch](david-clode-MP210AoAjh4-unsplash.jpg)

*Exceptions are a great way of separating happy path versus trouble path. But we tend to over-complicate our solutions.*

> TL;DR: Don't nest Exceptions. Nobody cares of what you do in the inner blocks.

# Problems

- Readability

# Solutions

1. Refactor

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/f180d0e09abe6dc0f637a142c4a5a58b)
```javascript
try {
    transaction.commit();
} catch (e) {
    logerror(e);
    if (e instanceOf DBError) {
      try {
          transaction.rollback();
      } catch (e) {
          doMoreLoggingRollbackFailed(e);
      }
    }
}

// Nested Try catchs
// Exception cases are
// more important than happy path
// We use exceptions as control flow
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/a4fc40e63f2506bf02144c9f71f164a3)
```javascript
try {
    transaction.commit();
} catch (transactionError) {
    this.withTransactionErrorDo(
        transationError, transaction);
}

// transaction error policy is not defined in this function
// so we don't have repeated code
// code is more readable
// It is up to the transaction
// and the error to decide what to do
```

# Detection

We can detect this smell using parsing trees.

# Tags

- Exceptions

# Conclusion

Don't abuse exceptions, don't create Exception classes no one will ever catch, and don't be prepared for every case (unless you have a good real scenario with a covering test).

Happy path should always be more important than exception cases.

# Relations

[Code Smell 73 - Exceptions for Expected Cases](Code Smells\Code Smell 73 - Exceptions for Expected Cases)

[Code Smell 26 - Exceptions Polluting](Code Smells\Code Smell 26 - Exceptions Polluting)

# More Info

- [Nested Try/Catchs](https://beginnersbook.com/2013/04/nested-try-catch/)

# Credits

Photo by [David Clode](https://unsplash.com/@davidclode) on [Unsplash](https://unsplash.com/s/photos/fishing-net)
  
Thanks to @[Rodrigo](@rodrigomd) for his inspiration

[Twitter](https://twitter.com/1403359513965731843)

* * *

> Writing software as if we are the only person that ever has to comprehend it is one of the biggest mistakes and false assumptions that can be made.

_Karolina Szczur_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()