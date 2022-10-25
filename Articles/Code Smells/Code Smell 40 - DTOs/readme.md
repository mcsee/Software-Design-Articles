# Code Smell 40 - DTOs

![Code Smell 40 - DTOs](Code%20Smell%2040%20-%20DTOs.jpeg)

*DTOs are widely used and the 'solve' real problems, do they?*

# Problems

- Anemic Object

- Inconsistent Data

- Duplicated logic

- Class Polluting

- Information Hiding 

- Code repeated among [mutators](https://en.wikipedia.org/wiki/Mutator_method), accessors, [serializers](https://en.wikipedia.org/wiki/Serialization), [parsers](https://en.wikipedia.org/wiki/Parsing)

- Ripple Effect

- Data integrity

# Solutions

1. Transfer anemic data on arrays

2. Use real business objects

3. If we want to transfer partial objects: use proxies or null objects to break the reference graph.

# Refactorings

[Refactoring 009 - Protect Public Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20009%20-%20Protect%20Public%20Attributes/readme.md)

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/91a2d630101ba6137f64195e76c1b266)
```php
<?

final class SocialNetworkProfile {

    private $userName;
    private $friends; // friends is a reference to a large collection
    private $feed; // feed references the whole user feed

    public function __construct($userName, $friends, UserFeed $feed) {
        $this->assertUsernameIsValid($userName);
        $this->assertNoFriendDuplicates($friends);
        $this->userName = $userName;
        $this->friends = $friends;
        $this->feed = $feed;
        $this->assertNoFriendofMylsef($friends);

    }
    // Lots of protocol
}

// If we need to transfer to an External system we need
// to duplicate (and maintain) the structure

final class SocialNetworkProfileDTO {

    private $userName;

    public function __construct() {
        // Empty construct without validations
    }

    // No protocol, just serializers
}

// If we need to transfer to an External system we create an anemic DTO
$janesProfileToTransfer = new SocialNetworkProfileDTO();
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/e1ecfdec6bd0fbe72f2d9ee7664af1c4)
```php
<?

final class SocialNetworkProfile {

    private $userName;
    private $friends; // friends is a reference to a large collection
    private $feed; // feed references the whole user feed

    public function __construct($userName, FriendsCollection $friends, UserFeedBehavior $feed) {
        $this->assertUsernameIsValid($userName);
        $this->assertNoFriendDuplicates($friends);
        $this->userName = $userName;
        $this->friends = $friends;
        $this->feed = $feed;
        $this->assertNoFriendOfMyself($friends);

    }
    // lots of protocol
}

interface FriendsCollectionProtocol {
}

final class FriendsCollection implements FriendsCollectionProtocol {

}

final class FriendsCollectionProxy implements FriendsCollectionProtocol {
    // proxy protocol
    // travels as a lightweight object and can get contents when requested
}

abstract class UserFeedBehavior {
}

final class UserFeed extends UserFeedBehavior {
}

final class NullFeed extends UserFeedBehavior {
    // throws an error when requested for behavior
}

// If we need to transfer to an External system we create a valid object
$janesProfileToTransfer = new SocialNetworkProfile('jane', new FriendCollectionProxy(), new NullFeed());
```

# Detection

We can use the same anemic object detectors. 

We can check for *anemic* classes with no business object behavior (removing serializes, constructors, mutators etc).
 
 # Tags

-  Anemic

# Conclusion

DTOs are a tool and an established practice in some languages. We should use them with care and responsibility.

If we need to disassemble our objects in order to send them away from our realms, we need to be extremely cautioned. Since dismembered objects have no integrity considerations.

His author warns us about its actual abuse.
 
# Relations

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md) 

[Code Smell 13 - Empty Constructors](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2013%20-%20Empty%20Constructors/readme.md)

https://softwareengineering.stackexchange.com/questions/171457/what-is-the-point-of-using-dto-data-transfer-objects

# More info

%[https://martinfowler.com/bliki/LocalDTO.html]

https://refactoring.guru/es/smells/data-class

# Credits

 

* * *

>  The best smells are something that's easy to spot and most of time lead you to really interesting problems. Data classes (classes with all data and no behavior) are good examples of this. You look at them and ask yourself what behavior should be in this class. 

_Martin Fowler_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)