# Code Smell 210 - Dynamic Properties
            
![Code Smell 210 - Dynamic Properties](Code%20Smell%20210%20-%20Dynamic%20Properties.jpg)

*Laziness and magic bring defects*

> TL;DR: Be explicit with your attributes

# Problems

- Readability

- Scope definition

- Unnoticed typos

# Solutions

1. Favor languages forbidding dynamic properties

# Context

Dynamic properties break type safety since it's easy to introduce typos or use the wrong property names accidentally. 

This can lead to runtime errors that can be difficult to debug, especially in larger codebases.

They also hide possible name collisions since dynamic properties may have the same name as properties defined in the class or object, leading to conflicts or unexpected behavior.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/1fceddaa27b7dcbb2cf0ba4f85861237)

```python
class Dream:
    pass

nightmare = Dream()

nightmare.presentation = "I am the Sandman"
# presentation is not defined
# it is a dynamic property

print(nightmare.presentation) 
# Output: "I am the Sandman"
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/b2f04e4bafd415006b4ace96e4456612)

```python
class Dream:
    def __init__(self):
        self.presentation = ""

nightmare = Dream()

nightmare.presentation = "I am the Sandman"

print(nightmare.presentation) 
# Output: "I am the Sandman"
```

# Detection

[X] Automatic 

Most languages have compiler options to avoid them.

# Tags

- Metaprogramming

# Conclusion

Dynamic properties are supported in many programming languages like PHP,    Python, Ruby,  JavaScript,  C#, Objective-C, Swift, Kotlin, etc.

In these languages, dynamic properties can be added to objects at runtime, and accessed using the object's property accessor syntax. 

Bear in mind that having public attributes favors [Anemic Objects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md) which is another smell.

# Relations

[Code Smell 109 - Automatic Properties](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20109%20-%20Automatic%20Properties/readme.md)

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Karsten Würth](https://unsplash.com/@karsten_wuerth) on [Unsplash](https://unsplash.com/photos/0w-uTa0Xz7w)
    
* * *

> It's easy to cry "bug" when the truth is that you've got a complex system and sometimes it takes a while to get all the components to co-exist peacefully.

_D. Vargas_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)