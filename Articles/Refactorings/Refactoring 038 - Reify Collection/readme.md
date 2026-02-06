# Refactoring 038 - Reify Collection

![Refactoring 038 - Reify Collection](Refactoring%20038%20-%20Reify%20Collection.jpg)

*Give your collections a purpose and a connection to the real world*

> TL;DR: Wrap primitive collections into dedicated objects to ensure type safety and encapsulate business logic.

# Problems Addressed 😔

- Type safety violations
- Logic [duplication](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)
- [Primitive obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)
- Weak encapsulation
- Strong coupling avoiding collection type changes
- Hidden business rules

# Related Code Smells 💨

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 63 - Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2063%20-%20Feature%20Envy/readme.md)

[Code Smell 40 - DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

[Code Smell 143 - Data Clumps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20143%20-%20Data%20Clumps/readme.md)

[Code Smell 134 - Specialized Business Collections](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20134%20-%20Specialized%20Business%20Collections/readme.md)

# Context 💬

You find yourself passing around generic lists, arrays, or dictionaries as if they were just [anemic](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md) "bags of data." like [DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md) or [Data Clumps](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20143%20-%20Data%20Clumps/readme.md). 

These primitive structures are convenient to iterate.

But they are also anonymous and lack a voice in the business domain. 

When you use a raw array to represent a group of specific entities—like *ActiveSubscribers*, *PendingInvoices*, or *ValidationErrors*, you are essentially forcing every part of your system to re-learn how to handle that collection, leading to scattered logic and "primitive obsession."

When you reify the collection, you improve the model and create technical implementation into a first-class citizen of your domain model. 

This doesn't just provide a home for validation and filtering; it makes the invisible concepts in your business requirements visible in your code.

# Steps 👣

1. Create a new class to represent the specific collection.

2. Define a private collection property within this class using the appropriate collection type.

3. Implement a constructor that accepts only elements of the required type.

4. Add type-hinted methods to add, remove, or retrieve elements.

5. Move collection-specific logic (like sorting or filtering) from the outside into this new class.

# Sample Code 💻

## Before 🚨

<!-- [Gist Url](https://gist.github.com/mcsee/a6a0b099c28a609c2e48df811dc5294d) -->

```php
<?

/** @var User[] $users */
// this is a static declaration used by many IDEs but not the compiler
// Like many comments it is useless, and possible outdated

function notifyUsers(array $users) {
    foreach ($users as $user) {
        // You have no guarantee $user is actually a User object
        // The comment above is 
        // just a hint for the IDE/Static Analysis
        $user->sendNotification();
    }
}

$users = [new User('Anatoli Bugorski'), new Product('Laser')]; 
// This array is anemic and lacks runtime type enforcement
// There's a Product in the collection and will show a fatal error
// unless it can understand #sendNotification() method

notifyUsers($users);
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/b31a828edad3e8b019e7fc2217c1f5c4) -->

```php
<? 

class UserDirectory {
// 1. Create a new class to represent the specific collection
// This is a real world concept reified  
// 2. Define a private property
private array $elements = [];

    // 3. Implement a constructor that accepts only User types
    public function __construct(User ...$users) {
        $this->elements = $users;
    }

    // 4. Add type-hinted methods to add elements
    public function add(User $user): void {
        $this->elements[] = $user;
    }

    // 5. Move collection-specific logic inside
    public function notifyAll(): void {
        foreach ($this->elements as $user) {
            $user->sendNotification();
        }
    }
}
```

# Type 📝

[X] Manual

# Safety 🛡️

This refactoring is very safe.

You create a new structure and gradually migrate references. 

Since you add strict type hints in the new class, the compiler engine catches any incompatible data at runtime, preventing silent failures.

# Why is the Code Better? ✨

You transform a generic, "dumb" collection into a specialized object that understands its own rules. 

You stop repeating validation logic every time you handle the list. 

The code becomes self-documenting because the class name explicitly tells you what the collection contains.

# How Does it Improve the Bijection? 🗺️

In the [real world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md), a "List of Users" or a "Staff Directory" is a distinct concept with specific behaviors. 

An anonymous array is a technical implementation detail, not a real-world entity. 

By reifying the collection, you create a [one-to-one correspondence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between the business concept and your code.

# Limitations ⚠️

You might encounter slight performance overhead when dealing with millions of objects compared to raw arrays.

For most business applications, the safety gains far outweigh the millisecond costs and prevents you from being a premature optimizator.

Remember to avoid hollow [specialized business collections](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20134%20-%20Specialized%20Business%20Collections/readme.md) that don't exist in the real world.

Many languages support typed collections:

- C# achieves typed collections through reified *generics* in the CLR, preserving type information at runtime for types like *List<T>*.

- C++ achieves typed collections through *templates* like blueprints instantiated at compile time for each concrete type.
 
- Clojure achieves typed collections through optional static typing libraries such as core.typed.
 
- Dart achieves typed collections through *reified generics* with runtime type checks in sound null safety mode.
 
- Elixir achieves typed collections through *typespecs* analyzed by Dialyzer for static verification.
 
- Go achieves typed collections through *parametric generics* introduced in Go 1.18 with type parameters and constraints.

- Haskell achieves typed collections through *parametric polymorphism* and type classes resolved at compile time.

- Java achieves typed collections through generics with type erasure, enforcing type constraints at compile time on classes like *List<T>* and *Map<K,V>*.

- JavaScript achieves typed collections through TypeScript or Flow, which add static generic typing on top of the dynamic language (see below).

- Kotlin achieves typed collections through *JVM generics* with variance annotations and null-safety integrated into the type system.

- Objective-C achieves typed collections through *lightweight generics* that provide compile-time checks without full runtime enforcement.

- PHP achieves typed collections through *docblock-based generics* enforced by static analyzers like Psalm or PHPStan.
 
- Python achieves typed collections through type hints like *list[T]* and *dict[K, V]* checked by static analyzers such as mypy.

- Ruby achieves typed collections through *external type systems* like Sorbet or RBS layered on top of the dynamic runtime.

- Rust achieves typed collections through *parametric types* and trait bounds checked at compile time with monomorphization.
 
- Scala achieves typed collections through a powerful *generic type system* with variance and higher-kinded types.

- Swift achieves typed collections through *generics* with value semantics and protocol constraints.
 
- TypeScript achieves typed collections through *structural typing* and *generics* enforced at compile time and erased at runtime since JavaScript doesn't support them.

In all the above cases, reifying a real business object (if exists in the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)) gives you a good extra abstraction layer.

# Tags 🏷️

- Primitive Obsession

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 012 - Reify Associative Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20012%20-%20Reify%20Associative%20Arrays/readme.md)

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

# Refactor with AI 🤖

Ask your AI assistant to: "Identify where I am passing arrays of objects and suggest a Typed Collection class for them." 

You can also provide the base class and ask: "Find a real business object and generate a boilerplate for a type-safe collection for this entity."

# Credits 🙏

Image by [Markéta Klimešová](https://pixabay.com/users/maky_orel-436253/) on [Pixabay](https://pixabay.com/)

Inspired by the "Collection Object" pattern in clean architecture and the ongoing quest for type safety in dynamic languages.

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)