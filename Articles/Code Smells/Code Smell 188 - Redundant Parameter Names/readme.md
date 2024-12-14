# Code Smell 188 - Redundant Parameter Names
            
![Code Smell 188 - Redundant Parameter Names](Code%20Smell%20188%20-%20Redundant%20Parameter%20Names.jpg)

*Use contextual and local names*

> TL;DR: Don't repeat your parameters' names. Names should be contextual.

# Problems

- Duplication

- Readability

# Solutions

1. Remove the repeated part from the name

# Context

When using names, we often miss that words are contextual and need to be read as a whole sentence.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/846ae86d9b75ccb1ccbabe75c4306800) -->

```crystal
class Employee
  def initialize(
      @employee_first_name : String, 
      @employee_last_name : String, 
      @employee_birthdate : Time)
  end
end
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/5f4a6933b3d176e061d795119d5bc11c) -->

```crystal
class Employee
  def initialize(
      @first_name : String, 
      @last_name : String, 
      @birthdate : Time)
  end
end
```

# Detection

[X] Semi-Automatic  

We can check our parameter names and try to find duplication.

# Tags

- Naming 

# Conclusion

Use short and contextual names for your parameters.

# Relations

[Code Smell 174 - Class Name in Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20174%20-%20Class%20Name%20in%20Attributes/readme.md)

[Code Smell 87 - Inconsistent Parameters Sorting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2087%20-%20Inconsistent%20Parameters%20Sorting/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Wolfgang Hasselmann](https://unsplash.com/@wolfgang_hasselmann) on [Unsplash](https://unsplash.com/photos/Y3RVsHBeK7c)
    
* * *

> As a rule, software systems do not work well until they have been used, and have failed repeatedly, in real applications.

_David Parnas_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)