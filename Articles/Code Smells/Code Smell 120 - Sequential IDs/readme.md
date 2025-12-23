# Code Smell 120 - Sequential IDs

![Code Smell 120 - Sequential IDs](Code%20Smell%20120%20-%20Sequential%20IDs.jpg)

*Most IDS are code smells. Sequential IDs are also a vulnerability*

> TL;DR: Don't expose obvious consecutive IDs.

# Problems 😔 

- [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) Fault

- Security Problems

- [Collisions](https://en.wikipedia.org/wiki/Birthday_problem)

# Solutions 😃

1. Use non-obvious keys.

2. Use dark keys or [UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier).

# Refactorings ⚙️

[Refactoring 028 - Replace Consecutive IDs with Dark Keys](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20028%20-%20Replace%20Consecutive%20IDs%20with%20Dark%20Keys/readme.md)

# Context 💬

IDs are a problem when dealing with domain objects.

IDs do not exist in the real-world so, they break our bijection.

We should only use IDs when exposing internal resources to the *outer world* beyond system boundaries.

These are always [accidental problems](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/No%20Silver%20Bullet/readme.md) and should not interfere with our models.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/095409b419d460484cc418d549861c98) -->

```java
class Book {
    private Long bookId; // book knows its ID
    private List<Long> authorIds; // book knows author IDs
}

Book harryPotter = new Book(1, List.of(2));
Book designPatterns = new Book(2, List.of(4, 6, 7, 8));
Book donQuixote = new Book(3, List.of(5));

// You can scrape from now on
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/83b1660ec07e5bafd0a5b1c567f76aee) -->

```java
class Author { }

class Book {    
    private List<Author> authors; // book knows authors
    // No strange behavior. just what a book can do
    // Real books don't know about IDs
    // ISBN is accidental to a book. Readers don't care
}

class BookResource {    
    private Book resource; // The resource knows the underlying book
    private id; // The id is the link 
    // you provide to the external world
}

Book harryPotter = new Book(new Author('J. K. Rowling'));

Book designPatterns = new Book(
    new Author('Erich Gamma'), 
    new Author('Richard Helm'), 
    new Author('Ralph Johnson'), 
    new Author('John Vlissides')); 
    
Book donQuixote = new Book(new Author('Miguel Cervantes'));

BookResource harryPotterResource = new BookResource(
    harryPotter, UUID.randomUUID());

// Books don’t know their id. Just the resource does
```

# Detection 🔍

[X] Automatic 

We can use [Pentesting techniques](https://en.wikipedia.org/wiki/Penetration_test) against our system to detect this smell.

# Tags 🏷️

- Security 

# Level 🔋

[X] Intermediate

# Conclusion 🏁

In case we need to expose internal objects to the external world, we should use non-obvious IDs.

In this way, we can detect (and block) brute force attacks monitoring the traffic and [404 errors](https://en.wikipedia.org/wiki/HTTP_404).

# Relations 👩‍❤️‍💋‍👨

[Code Smell 66 - Shotgun Surgery](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2066%20-%20Shotgun%20Surgery/readme.md)

# More Information 📕

- [IDOR Vulnerability](https://portswigger.net/web-security/access-control/idor)

- [Birthday Problem](https://en.wikipedia.org/wiki/Birthday_problem)

- [KSUID](https://segment.com/blog/a-brief-history-of-the-uuid/)

# Credits 🙏

Photo by [Max Bender](https://unsplash.com/@maxwbender) on [Unsplash](https://unsplash.com/s/photos/hacker)

Thanks @davidkroell for the KSUID tip.
  
* * *

> The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards.

_Gene Spafford_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)
