# Code Smell 137 - Inheritance Tree Too Deep

![Code Smell 137 - Inheritance Tree Too Deep](binary-palm-tree.png)

*Yet another bad code reuse symptom*

> TL;DR: Favor composition over inheritance

# Problems

- [Coupling](https://maximilianocontieri.com/coupling-the-one-and-only-software-design-problem)

- Subclassification Reuse 

- Bad cohesion

- Fragile base classes

- Method overriding

- Liskov Substitution

# Solutions

1. Break clases and compose them.

# Context

Old papers recommended using classes as a specialization for code reuse.

We learnt that composition is a more efficient and extensible way to share behavior.

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
//Equus behaviour
end

classdef EFerus < Equus
//EFerus behaviour
end

classdef EFCaballus < EFerus
//EFCaballus behaviour    
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

[Code Smell 11 - Subclassification for Code Reuse](https://maximilianocontieri.com/code-smell-11-subclassification-for-code-reuse)

[Code Smell 43 - Concrete Classes Subclassified](https://maximilianocontieri.com/code-smell-43-concrete-classes-subclassified)

[Code Smell 58 - Yo-yo Problem](https://maximilianocontieri.com/code-smell-58-yo-yo-problem)

[Code Smell 37 - Protected Attributes](https://maximilianocontieri.com/code-smell-37-protected-attributes)

[Code Smell 125 - 'IS-A' Relationship](Code Smells\Code Smell 125 - 'IS-A' Relationship)

# More Info

- [Coupling: The one and only problem](https://maximilianocontieri.com/coupling-the-one-and-only-software-design-problem)

- [Wikipedia](https://en.wikipedia.org/wiki/Cyclomatic_complexity)

* * *

> Software entities (classes, modules, functions, etc.) should be open for extension, but closed for modification.

_Bertrand Meyer_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Unsorted\How to Find the Stinky parts of your Code)