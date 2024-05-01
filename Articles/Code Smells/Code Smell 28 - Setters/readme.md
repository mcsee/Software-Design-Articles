# Code Smell 28 - Setters

![Code Smell 28 - Setters](Code%20Smell%2028%20-%20Setters.jpg)

*The first exercise junior programmers do. IDEs, tutorial and senior developers keep teaching them this anti-pattern.*

> TL;DR: Don't use setters.
 
# Problems

- Mutability

- Information Hiding

- Anemic Models

- Fail Fast

- Integrity

- Duplicated Code

[Nude Models - Part I: Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md)

# Solutions

1. Avoid Setters

2. Set essential attributes on private initialization.

# Examples

- DTOs

# Sample Code

## Wrong 

[Gist Url]: # (https://gist.github.com/mcsee/7133ca38aceb3bace14d25548610f682)

```python
class PhoneCall:
  _origin = ''
  _destination = ''
  _duration = 0
  
  def set_origin(self, originNumber):
    self._origin = originNumber
    
  def set_destination(self, destinationNumber):
    self._destination = destinationNumber
    
  def set_duration(self, durationInSeconds):
    self._duration = durationInSeconds 

janePhoneCall = PhoneCall()
janePhoneCall.set_origin('555-5555')
janePhoneCall.set_destination('444-4444')
janePhoneCall.set_duration(60)

# Anemic and mutable Class
```

Mutation brings lots of problems

[Gist Url]: # (https://gist.github.com/mcsee/2706ba1e510ef085a1f25dde11254e1a)

```python
# Since you have a setter you can create invalid combinations

janePhoneCall = PhoneCall()
janePhoneCall.set_origin('555-5555')
janePhoneCall.set_destination('555-5555')
janePhoneCall.set_duration(60) 

# You can't change the destination during the call.
# This is not enforced due to setters

# Origin and Destination cannot be the same

 def set_destination(self, destinationNumber):
    if destinationNumber == self._origin:
      raise ValueError("Destination cannot be the same as origin")
    self._destination = destinationNumber
    
 def set_origin(self, originNumber):
    if originNumber == self._destination:
      raise ValueError("Destination cannot be the same as origin")
    # repeated code   
    self._origin = originNumber
```
 
Information Hiding Violated

[Gist Url]: # (https://gist.github.com/mcsee/63efec0e8bfd02179e0510a2db922580)

```python
class PhoneCall:
  _origin = ''
  _destination = ''
  _duration = 0
    
  def set_duration(self, durationInSeconds):
    self._duration = durationInSeconds
            
  def get_duration(self):
    return self._duration
  
# duration is exposed in seconds as a ripple effect
# this violates information hiding principle
# and prevents you from changing it representation
```

## Right
 
[Gist Url]: # (https://gist.github.com/mcsee/a32cc664ed6e5cc61f5d824f587ffcb8)

```python
class PhoneCall:
  _origin = ''
  _destination = ''
  _durationInSeconds = 0
  
   def __init__(self, origin, destination, durationInSeconds):
      
      if destination == origin:
       raise ValueError("Destination cannot be the same as origin")
      # single control point.
      # You only create valid phone calls 
      # and they remain valid since they cannot mutate
      
      self._origin = origin
      self._destination = destination
      self._durationInSeconds = durationInSeconds
      
  # No setters are necessary 
             
  def durationInSeconds(self):
    return self._durationInSeconds
  
  def durationInMilliSeconds(self):
    return self._durationInSeconds * 1000
```

# Detection

First step will be to forbid public attributes (if language allows them). 

Secondly, we will search for methods *setXXXX()*, analyzing method structure (should be an assignment to attribute *xxxx*).

We should not forbid methods setting *accidental state* since this is valid. They should not be named *setters* since they ask the object to *change*, but they don't *set* anything. 

# Exceptions

Setting attributes is safe for *non-essential* attributes. 

But it has all drawbacks and considerations already mentioned.

# Tags

- Mutation

- Information Hiding

# Conclusion

Creating incomplete and anemic objects is a very bad practice violating 
mutability, fail fast principle and real-world [bijections](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md).
 
# Relations

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 68 - Getters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2068%20-%20Getters/readme.md)

[Code Smell 109 - Automatic Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20109%20-%20Automatic%20Properties/readme.md)

[Code Smell 131 - Zero Argument Constructor](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20131%20-%20Zero%20Argument%20Constructor/readme.md)

# More Info

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

Here is the full discussion on *Setters*

[Nude Models - Part I: Setters](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Nude%20Models - Part%20I Setters/readme.md) 
 
# Credits

Photo by [Victor Rodriguez](https://unsplash.com/@vimarovi) on [Unsplash](https://unsplash.com/s/photos/crowded)

* * *

> Object-oriented programming languages support encapsulation, thereby improving the ability of software to be reused, refined, tested, maintained, and extended. The full benefit of this support can only be realized if encapsulation is maximized during the design process.

_Rebecca Wirfs-Brock_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the *CodeSmell* Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)
