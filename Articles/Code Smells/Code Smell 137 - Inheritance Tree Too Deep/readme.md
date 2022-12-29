# Code Smell 137 - Inheritance Tree Too Deep

![Code Smell 137 - Inheritance Tree Too Deep](Code%20Smell%20137%20-%20Inheritance%20Tree%20Too%20Deep.png)

*Yet another bad code reuse symptom*

> TL;DR: Favor composition over inheritance.

# Problems

- [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

- Subclassification Reuse 

- Bad cohesion

- Fragile base classes

- Method overriding

- Liskov Substitution

# Solutions

1. Break classes and compose them.

# Context

Old papers recommended using classes as a specialization for code reuse.

We learned that composition is a more efficient and extensible way to share behavior.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/ca80ab1c2443f8494817c027678ab7f3)
```python
classdef Animalia
   
end

classdef Chordata < Animalia 

end

classdef Mammalia < Chordata 

end

classdef Perissodactyla < Mammalia 

end

classdef Equidae < Perissodactyla  

end

classdef Equus < Equidae 
// Equus behavior
end

classdef EFerus < Equus
// EFerus behavior
end

classdef EFCaballus < EFerus
// EFCaballus behavior    
end


```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/23622a20da88b3192eb97577557a1f08)
```python
classdef Horse       
    methods        
      // Horse behavior       
    end    
end
```

# Detection

[X] Automatic 
 
Many linters report *Depth of inheritance tree (DIT)*. 

# Tags

- Hierarchies

# Conclusion

Look after your hierarchies and break them often.

# Relations

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

[Code Smell 43 - Concrete Classes Subclassified](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2043%20-%20Concrete%20Classes%20Subclassified/readme.md)

[Code Smell 58 - Yo-yo Problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2058%20-%20Yo-yo%20Problem/readme.md)

[Code Smell 37 - Protected Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2037%20-%20Protected%20Attributes/readme.md)

[Code Smell 125 - 'IS-A' Relationship](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20125%20-%20'IS-A'%20Relationship/readme.md)

[Code Smell 58 - Yo-yo Problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2058%20-%20Yo-yo%20Problem/readme.md)

# More Info

[Coupling: The one and only problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)

[Wikipedia](https://en.wikipedia.org/wiki/Cyclomatic_complexity)

* * *

> Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.

_Bertrand Meyer_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)