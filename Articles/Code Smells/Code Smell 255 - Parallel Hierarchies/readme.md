# Code Smell 255 - Parallel Hierarchies
            
![Code Smell 255 - Parallel Hierarchies](Code%20Smell%20255%20-%20Parallel%20Hierarchies.jpg)

*Double Trouble: The Curse of Redundant Structures*

> TL;DR: Parallel hierarchies lead to duplication and tight coupling.

# Problems

- Increased complexity

- DRY / Code Duplication

- Maintenance Nightmare

- Coupling

- Ripple Effect

- Potential for inconsistencies across different hierarchies

# Solutions

1. Merge hierarchies

2. Use composition

3. Extract Common Functionality

# Refactorings

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

# Context

Parallel hierarchies occur when you must make a counterpart every time you create a domain class.

The counterpart might be persistence, UI, Controller, tests, Serialization, etc

This leads to duplicate structures and tight coupling. 

Changes in the domain model require changes in the parallel classes, making the system more brittle and harder to manage.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/1b8a4c6bc7bd1fc9947f684e4e92b30c) -->

```java
// Domain classes
abstract class Transaction {
    private String id;
    private double amount;
}

class BankTransaction extends Transaction {
    private String bankName;
}

class CreditCardTransaction extends Transaction {
    private String cardNumber;
}

// Persistence classes
abstract class TransactionDAO {
    private String id;
    private double amount;
}

class BankTransactionDAO extends TransactionDAO {
    private String bankName;
}

class CreditCardTransactionDAO extends TransactionDAO {
    private String cardNumber;
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/30d21e449099f361010a767dcc66c571) -->

```java
public class TransactionService {
    private EntityManager entityManager;

    public TransactionService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void saveTransaction(Transaction transaction) {
        entityManager.getTransaction().begin();
        entityManager.persist(transaction);
        entityManager.getTransaction().commit();
    }

    public Transaction loadTransaction(
        Long id, Class<? extends Transaction> transactionClass) {
        return entityManager.find(transactionClass, id);
    }
}
```

# Detection

[X] Semi-Automatic 

You can detect this smell by traversing the hierarchies

# Exceptions

- Some frameworks force you to extend your domain using this technique

# Tags

- Hierarchies

# Level

[X] Intermediate

# AI Generation

AI generators often create this smell by mirroring domain models in persistence layers without understanding the implications, leading to unnecessary duplication.

# AI Detection

AI Assistants can fix this smell with instructions to consolidate hierarchies and use composition, reducing duplication and improving maintainability.

ChatGPT offered a solution using **'Instanceof'** which is an even worse code smell

# Conclusion

Parallel hierarchies create unnecessary complexity and make the codebase harder to maintain. 

They bring [deep hierarchies](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20137%20-%20Inheritance%20Tree%20Too%20Deep/readme.md) which is a symptom of [subclassification for code reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

You can merge the hierarchies and use composition to simplify the design and improve the system's robustness. 

You can use Metaprogramming to manage the persistence or the unit tests.

[Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md) is also a code smell when you use it for domain problems, but persistence and testing are orthogonal domains.

# Relations

[Code Smell 137 - Inheritance Tree Too Deep](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20137%20-%20Inheritance%20Tree%20Too%20Deep/readme.md)

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

[Code Smell 58 - Yo-yo Problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2058%20-%20Yo-yo%20Problem/readme.md)

# More Info

[Laziness I - Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [ArtisanalPhoto](https://unsplash.com/@artisanalphoto) in [Unsplash](https://unsplash.com/fotos/barandillas-de-metal-gris-en-escalera-blanca-MJcb7ZhNeUA)
    
* * *

> Inheritance is surely a good answer but who knows the questions?

_Michel Gauthier_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)