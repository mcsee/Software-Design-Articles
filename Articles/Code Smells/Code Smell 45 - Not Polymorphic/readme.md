# Code Smell 45 - Not Polymorphic

![Code Smell 45 - Not Polymorphic](spiderman.jpeg)

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

[Code Smell 36 - Switch/case/elseif/else/if statements](Code Smells\Code Smell 36 - Switch case elseif else if statements)

# More info

[What exactly is a name — Part II Rehab](Theory\What exactly is a name — Part II Rehab)


* * *

> If you have three pet dogs, give them names. If you have 10,000 head of cattle, don't bother. Nowadays, the idea of giving a name to every file on your computer is ridiculous.

_David Gelernter_
 
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)