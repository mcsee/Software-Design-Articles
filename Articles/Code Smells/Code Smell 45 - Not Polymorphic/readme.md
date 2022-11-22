# Code Smell 45 - Not Polymorphic

![Code Smell 45 - Not Polymorphic](Code%20Smell%2045%20-%20Not%20Polymorphic.jpeg)

*Methods should be interchangeable if they do the same.*

# Problems

- Missed Polymorphism

- Coupling

- IFs / Type check Polluting.

- Names coupled to types.

# Solutions

1. Rename methods after what they do.

2. Favor polymorphism.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/17ccba69a9bcb7fbe2e8ee15e0487585)
```php
<?

class array {
    public function arraySort() {
    }
}

class list {
    public function listSort() {
    }
}

class Set {
    public function setSort() {
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/ba7cb02ed4cf4c8ae6d0bf4aae3d7cb2)
```php
<?

class Array {
   public function sort() {
   }
}

class List {
   public function sort() {
   }
}

class Set {
   public function sort() {
   }
}
```

# Detection

This is a semantic mistake. We could add a warning for *similar* method names on Polymorphic classes.

# Tags

- Polymorphic

# Conclusion

Naming is very important. We need to name after concepts and not after accidental types,

# Relations

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

# More Info

[What exactly is a name - Part II Rehab](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20II%20Rehab/readme.md)


* * *

> If you have three pet dogs, give them names. If you have 10,000 head of cattle, don't bother. Nowadays, the idea of giving a name to every file on your computer is ridiculous.

_David Gelernter_
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)