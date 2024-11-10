# Refactoring 018 - Replace Singleton

![Refactoring 018 - Replace Singleton](Refactoring%20018%20-%20Replace%20Singleton.jpg)

*Breaking Free from the Evil Singleton*

> TL;DR: Refactor singletons to reduce coupling

# Problems Addressed

- High [coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)
- Difficult [testability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20root%20of%20all%20evil/readme.md)
- Multi-threading issues

# Related Code Smells

[Code Smell 32 - Singletons](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2032%20-%20Singletons/readme.md)

[Code Smell 22 - Helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md)

[Code Smell 25 - Pattern Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2025%20-%20Pattern%20Abusers/readme.md)

# Steps

1. Identify the singleton 
2. Locate all references to its *getInstance()* method
3. Refactor the singleton to a standard class
4. Inject it as a dependency

# Sample Code

## Before

[Gist Url]: # (https://gist.github.com/mcsee/43f6accd32cfcfef4e1daf5d159c1394)

```java
public class DatabaseConnection {
    private static DatabaseConnection instance;

    private DatabaseConnection() {}

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }

    public void connect() { 
    }
}

public class Service {
    public void performTask() {
        DatabaseConnection connection = DatabaseConnection.getInstance();
        connection.connect(); 
    }
}
```

## After

[Gist Url]: # (https://gist.github.com/mcsee/d52dafea0e452a5343045d47a4524510)

```java
public class DatabaseConnection {  
    // 1. Identify the singleton 
    public void connect() { 
    }
}

public class Service {
    // 2. Locate all references to its getInstance() method.
    private DatabaseConnection connection;

    // 3. Refactor the singleton to a standard class. 
    public Service(DatabaseConnection connection) {
        // 4. Inject it as a dependency.
        this.connection = connection;
    }

    public void performTask() {
        connection.connect(); 
    }
}

DatabaseConnection connection = new DatabaseConnection();
// You can also mock the connection in your tests

Service service = new Service(connection);
service.performTask();
```

# Type

[X] Semi-Automatic

# Safety

This refactoring is safe when you update all references to the singleton and handle its dependencies correctly. 

Testing each step ensures that no references to the singleton are missed.

# Why the code is better?

Refactoring away from a singleton makes the code more modular, testable, and less prone to issues caused by the global state. 

Injecting dependencies allows you to easily replace DatabaseConnection with a mock or different implementation in testing and other contexts.
 
# Tags

- Coupling

# Related Refactorings

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

# See also

[Singleton - The root of all evil](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Singleton%20-%20The%20root%20of%20all%20evil/readme.md)

[Coupling - The one and only software design problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

# Credits

Image by [PublicDomainPictures](https://pixabay.com/users/publicdomainpictures-14/) from [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles//readme.md)