# Code Smell 120 - Sequential IDs

![Code Smell 120 - Sequential IDs](max-bender-XIVDN9cxOVc-unsplash.jpg)

*Most IDS are code smells. Sequential IDs are also a vulnerability*

> TL;DR: Don't expose obvious consecutive IDs.

# Problems

- [Bijection](Theory\The One and Only Software Design Principle) Fault

- Security Problems

- [Collisions](https://en.wikipedia.org/wiki/Birthday_problem)

# Solutions

1. Use non-obvious keys.

2. Use dark keys or [UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier).

# Context

IDs are a problem when dealing with domain objects.

IDs do not exist in the real-world so, they break our bijection.

We should only use IDs when exposing internal resources to the *outer world* beyond system boundaries.

These are always [accidental problems](Theory\No Silver Bullet) and should not interfere with our models.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/095409b419d460484cc418d549861c98)
```java
class Book {
    private Long bookId; // book knows its ID
    private List<Long> authorIds; // book knows author IDs
}

Book harryPotter = new Book(1, {2});
Book cleanCode = new Book(2, {4});
Book donQuixote = new Book(3, {5});

// We can scrape from now on.
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/83b1660ec07e5bafd0a5b1c567f76aee)
```java
class Author {    
    // .. Author protocol
}

class Book {    
    private List<Author> authors; // book knows authors
    // No strange behavior. just what a book can do
    // Real books don't know about IDs
    // ISBN is accidental to a book. Readers don't care
}

class BookResource {    
    private Book resource; // The resource knows the underlying book
    private id; // The id is the link we provide to external world
}

Book harryPotter = new Book(new Author('J. K. Rowling'));
Book cleanCode = new Book(new Author('Robert Martin'))
Book donQuixote = new Book(new Author('Miguel Cervantes'));
                             
BookResource harryPotterResource = new BookResource(harryPotter, UUID.randomUUID());                             

// Books don't know they id. Just the resource does
```

# Detection

[X] Automatic 

We can use [Pentesting techniques](https://en.wikipedia.org/wiki/Penetration_test) against our system to detect this smell.

# Tags

- Security 

# Conclusion

In case we need to expose internal objects to the external world, we should use non-obvious IDs.

In this way, we can detect (and block) brute force attacks monitoring the traffic and [404 errors](https://en.wikipedia.org/wiki/HTTP_404).

# More Info

- [IDOR Vulnerability](https://portswigger.net/web-security/access-control/idor)

- [Birthday Problem](https://en.wikipedia.org/wiki/Birthday_problem)

- [KSUID](https://segment.com/blog/a-brief-history-of-the-uuid/)

# Credits

Photo by [Max Bender](https://unsplash.com/@maxwbender) on [Unsplash](https://unsplash.com/s/photos/hacker)

Thanks @davidkroell for the KSUID tip.
  
* * *

> The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards.

_Gene Spafford_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()