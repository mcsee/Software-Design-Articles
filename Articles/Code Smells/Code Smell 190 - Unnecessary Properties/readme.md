# Code Smell 190 - Unnecessary Properties
            
![Code Smell 190 - Unnecessary Properties](Code%20Smell%20190%20-%20Unnecessary%20Properties.jpg)

*Stop thinking of data as attributes. They are only needed to back your behavior*

> TL;DR: Don't focus on accidental properties. You won't need many of them.

# Problems

- Anemic Models

- Properties bloating

- YAGNI violation

# Solutions

- Create attributes only to support your methods (behavior).

# Context

Whenever they want to model a person or an employee, junior programmers or students add an attribute *'id'* or *'name'* without thinking if they are really going to need them.

We need to add attributes 'on-demand' when there's enough evidence. Objects are not 'data holders'.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/f3a9f762f2781017247f5acf6cf281a1)
```ruby
class PersonInQueue
  attr_accessor :name, :job

  def initialize(name, job)
    @name = name
    @job = job
  end
end
``` 

## Right

[Gist Url]: # (https://gist.github.com/mcsee/53d1777f204e64f5746a9a148ada934a)
```ruby
class PersonInQueue

  def moveForwardOnePosition
    # implement protocol
  end
end
``` 

# Detection

[X] Semi-Automatic

We can detect unused attributes. 

But in many cases, we need an excellent designer to validate the actual need.

# Tags

- Anemic

# Conclusion

Start designing your objects from the protocol. 

Add attributes only when needed.

# Relations

[Code Smell 144 - Fungible Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20144%20-%20Fungible%20Objects/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 40 - DTOs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2040%20-%20DTOs/readme.md)

[Code Smell 109 - Automatic Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20109%20-%20Automatic%20Properties/readme.md)

# Credits

Photo by [Melanie Pongratz](https://unsplash.com/@melanie_sophie) on [Unsplash](https://unsplash.com/photos/SsBI9pweAeA)
 
---

> Object thinking focuses our attention on the problem space rather than the solution space.

_David West_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md) 

---

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)