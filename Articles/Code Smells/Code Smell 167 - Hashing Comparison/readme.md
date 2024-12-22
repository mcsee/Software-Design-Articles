# Code Smell 167 - Hashing Comparison
            
![Code Smell 167 - Hashing Comparison](Code%20Smell%20167%20-%20Hashing%20Comparison.png)

*Hashing guarantees two objects are different. Not that they are the same*

> TL;DR: If you check for the hash, you should also check for equality

# Problems

- [Bijection fault](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

# Solutions

1. Check for hash (fast) and then check for Equality (slow)

# Context

On 2022 Oct 7th one of the larger blockchains had to be halted.

[This news](https://www.coindesk.com/business/2022/10/06/binance-linked-bnb-price-falls-close-to-4-on-hack-rumors/) was shocking since most blockchains are decentralized by definition.

You can read a full article here:

[How a Hacker Stole $566M USD Exploiting a Code Smell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Security/How%20a%20Hacker%20Stole%20$566M%20USD%20Exploiting%20a%20Code%20Smell/readme.md)

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/b97afa5814c25e6d9c53e35f3fc5f09e) -->

```java
public class Person {
 
public String name;
// Public attributes are another smell  
 
 @Override
 public boolean equals(Person anotherPerson) {
   return name.equals(anotherPerson.name); 
 }
 	
@Override
 public int hashCode() {
   return (int)(Math.random()*256); 
 }
 // This is just an example of non-correlation  
 
 // When using HashMaps you can make a mistake 
 // and guess the object is not present in the collection
 
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/4a40df553e8d08860b23f35fb4400c0e) -->

```java
public class Person {
 
public String name;
// Public attributes are another smell  
 
 @Override
 public boolean equals(Person anotherPerson) {
   return name.equals(anotherPerson.name); 
 }
 	
@Override
 public int hashCode() {
   return name.hashCode(); 
 }
 // This is just an example of non-correlation  
 
}
```

# Detection

[X] Semi-Automatic 

Many linters have rules for hash and equality redefinition.

With mutation testing, we can seed different objects with the same hash and check our tests.

- Identity

- Security

# Tags

- Comparison

# Conclusion

Every performance improvement has its drawbacks.

Caches and replications are notable examples.

We can (must) use them carefully.

# Relations

[Code Smell 49 - Caches](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2049%20-%20Caches/readme.md)

[Code Smell 150 - Equal Comparison](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20150%20-%20Equal%20Comparison/readme.md)

# More Info

[Equality and Hash](http://forum.world.st/Is-it-always-needed-to-redefine-hash-message-when-you-redefine-message-td4828721.html)

[Hashcode in Java](https://stackoverflow.com/questions/3563847/what-is-the-use-of-hashcode-in-java)

[Hashcode vs Equal](https://www.digitalocean.com/community/tutorials/java-equals-hashcode)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

* * *

> This will surprise some of your readers, but my primary interest is not with computer security. I am primarily interested in writing software that works as intended.

_Wietse Venema_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)