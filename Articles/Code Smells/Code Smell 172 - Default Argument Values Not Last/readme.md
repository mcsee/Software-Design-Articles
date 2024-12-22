# Code Smell 172 - Default Argument Values Not Last
            
![Code Smell 172 - Default Argument Values Not Last](Code%20Smell%20172%20-%20Default%20Argument%20Values%20Not%20Last.jpg)

*Function signature should be error prone*

> TL;DR: Don't use Optional Arguments before mandatory ones. In fact: Don't use Optional Arguments at all

# Problems

- [Fail Fast principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) violation

- Readability

# Solutions

1. Move your optional arguments last.

2. Avoid [Optional Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2019%20-%20Optional%20Arguments/readme.md).

# Context

Optional Arguments are a code smell.

Defining optional arguments before mandatory ones is an error.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/ed058f746a6eefe2d303743cd82c6fb0) -->

```php
<?

function buildCar($color = "red", $model) {
  //...
}  
// First argument with optional argument

buildCar("Volvo");  
// Runtime error: Too few arguments to function buildCar()
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/a1cf6479f6b0820fb0843441b5ea7499) -->

```php
<?

function buildCar($model, $color = "Red", ){...}

buildCar("Volvo")}} 
// Works as expected
```

<!-- [Gist Url](https://gist.github.com/mcsee/f70b209c640d706fdb0d87dacb7f2ee1) -->

```python
def functionWithLastOptional(a, b, c='foo'):
    print(a)
    print(b)
    print(c)
functionWithLastOptional(1, 2)

def functionWithMiddleOptional(a, b='foo', c):
    print(a)
    print(b)
    print(c)
functionWithMiddleOptional(1, 2)

# SyntaxError: non-default argument follows default argument
```

# Detection

[X] Automatic 

Many Linters can enforce this rule since we can derive it from function signature.

Also, many compilers directly forbid it.

# Tags

- Readability

# Level

[X] Beginner

# Conclusion

Try to be strict when defining functions to avoid coupling.

# Relations

[Code Smell 19 - Optional Arguments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2019%20-%20Optional%20Arguments/readme.md)

[Code Smell 87 - Inconsistent Parameters Sorting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2087%20-%20Inconsistent%20Parameters%20Sorting/readme.md)

# More Info

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

[Rule on Sonar Source](https://rules.sonarsource.com/php/type/Code%20Smell/RSPEC-1788)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Manuel Torres Garcia](https://unsplash.com/ja/@matoga) on [Unsplash](https://unsplash.com/s/photos/precipicio)
  
* * *

> Programs are meant to be read by humans and only incidentally for computers to execute.

_Donald Knuth_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)