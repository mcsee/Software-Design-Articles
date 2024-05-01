# Code Smell 220 - Return Tuple
            
![Code Smell 220 - Return Tuple](Code%20Smell%20220%20-%20Return%20Tuple.jpg)

*You need to return more than one object*

> TL;DR: Don't return multiple values. 

# Problems

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Missing Abstraction

- Readability

- Extensibility

# Solutions

1. Create a return object grouping the tuple

2. Reify it into an object with cohesion and behavior (neither a [DTO](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md) nor a [Dictionary](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2027%20-%20Associative%20Arrays/readme.md))

3. Look for the object in the real world using the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)

4. Try to return void and delegate the solution to the modified object avoiding [accidental mutations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Context

A function returning multiple values in languages that allow it is a problem.

Developers can use this hack to avoid reifying concepts.

Some languages are: C#, Javascript, Go, Lua, Matlab, PHP, Python, Rust, and Swift

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/d7cb1ea13ceb86ad1c087e2a52926c89)

```swift
func getNameAndAge() -> (String, Int) {
    let name = "John"
    let age = 30
    return (name, age)
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/e6db8dfa30b45043ff6a187ba14be10a)

```swift
struct PeopleProfile {
    let name: String
    let age: Int
}

// You reify the PeopleProfile object
func getNameAndAge() -> PeopleProfile {
    let name = "John"
    let age = 30
    let profile = PeopleProfile(name: name, age: age)
    return profile
}
```

# Detection

[X] Automatic 

This is a language smell. 

We can tell our linters to warn us.

# Tags

- Coupling

# Conclusion

This is yet another language feature that hinders clean code and blinds us from seeing missing abstractions in the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).

# Relations

[Code Smell 10 - Too Many Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2010%20-%20Too%20Many%20Arguments/readme.md)

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 40 - DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

[Code Smell 27 - Associative Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2027%20-%20Associative%20Arrays/readme.md)

# More Info

[Value Tuples in C#](https://learn.microsoft.com/en-us/dotnet/api/system.valuetuple-2?view=net-7.0)

[Named Tuples in Python](https://www.geeksforgeeks.org/namedtuple-in-python/)

[Multiple Return Values in Go](https://gobyexample.com/multiple-return-values)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Edgar Soto](https://unsplash.com/@edgardo1987) on [Unsplash](https://unsplash.com/photos/1HIKnKtXEU0)
    
* * *

> By relieving the brain of all unnecessary work, a good notation sets it free to concentrate on more advanced problems, and in effect increases the mental power of the race. Before the introduction of the Arabic notation, multiplication was difficult, and division even of integers called into play the highest mathematical faculties. Our modern power of easy reckoning with decimal fractions is the almost miraculous result of the gradual discovery of a perfect notation.

_Alfred North Whitehead_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)