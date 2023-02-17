# Code Smell 49 - Caches

![Code Smell 49 - Caches](Code%20Smell%2049%20-%20Caches.jpg)

*Caches are sexy. They are a one-night stand. We need to avoid them in a long-term relationship.*

> TL;DR: Any junior student can create a cache. Almost no senior developer can debug and invalidate them.

# Problems

- Coupling

- Testability

- Cache invalidation.

- Maintainability

- Premature Optimization

- Erratic Behavior

- Lack of transparency

- Non-Deterministic behavior

# Solutions

1. If you have a conclusive benchmark and are willing to pay for some coupling: Put an object in the middle.

2. Unit test all your invalidation scenarios. Experience shows we face them in an incremental way.

3. Look for a real-world cache metaphor and model it.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/c429e71f6b0239b83e7e307feb5927fe)
```php
<?

final class Book {

    private $cachedBooks;

    public function getBooksFromDatabaseByTitle(string $title) {

        if (isset($cachedBooks[$title])) {
            return $cachedBooks[$title];
        } else {
            return $this->doGetBooksFromDatabaseByTitle($title);
        }
    }

    private function doGetBooksFromDatabaseByTitle(string $title) {
        globalDatabase()->selectFrom('Books', 'WHERE TITLE = ' . $title);
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/7b6a2b5eb49cbb4dc690a2657d6837d0)
```php
<?

final class Book {
    // Just Book related Stuff
}

interface BookRetriever {
    public function bookByTitle(string $title);
}

final class DatabaseLibrarian implements BookRetriever {
    public function bookByTitle(string $title) {
        // Go to the database (not global hopefully)
    }
}

final class HotSpotLibrarian implements BookRetriever {
    // We always look for real life metaphors
    private $inbox;
    private $realRetriever;

    public function bookByTitle(string $title) {
        if ($this->inbox->includesTitle($title)) {
            // We are lucky. Someone has just returned the book copy.
            return $this->inbox->retrieveAndRemove($title);
        } else {
            return $this->realRetriever->bookByTitle($title);
        }
    }
}
```

# Detection

This is a design smell.

It will be difficult to enforce by policy.

# Tags

- Premature Optimization

# Conclusion

Caches should be functional and intelligent

In this way we can manage invalidation.

General purpose caches are suitable only for low level objects like operating systems, files and streams. 

We shouldn't cache domain objects.

*This page is hosted on a cached website.*

# Relations

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)
 
# More Info

https://dev.vamsirao.com/what-is-cache-and-common-ways-of-using-it

https://frankel.hashnode.dev/a-hitchhikers-guide-to-caching-patterns

# Credits

Photo by [Aimee Vogelsang](https://unsplash.com/@vogelina) on [Unsplash](https://unsplash.com/)

* * *

There are only two hard things in Computer Science: cache invalidation and naming things.

_Phil Karlton_
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)