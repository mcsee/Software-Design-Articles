# Code Smell 65 - Variables Named after Types

![Code Smell 65 - Variables Named after Types](sangga-rima-roman-selia-Y4EQtlfOLm4-unsplash.jpg)

*Names should always indicate role.*

# Problems

- Declarative

- Design for Change

- Coupling to accidental implementation

# Solutions

1.  Rename your variable according to the role.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/00c30c369fe7339e28d50f858392cf4c)
```java
public bool CheckIfStringHas3To7LowercaseCharsFollowedBy3or4Numbers(string string)
{
  Regex regex = new Regex(@"[a-z]{2,7}[1-9]{3,4}")
  var hasMatch = regex.IsMatch(string);
  return hasMatch;
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/91e3a3f2b1351fa0e09fb8c56a5c2779)
```java
public bool CheckIfStringHas3To7LowercaseCharsFollowedBy3or4Numbers(string password)
{
  Regex stringHas3To7LowercaseCharsFollowedBy3or4Numbers = new Regex(@"[a-z]{2,7}[1-9]{3,4}")
  var hasMatch = stringHas3To7LowercaseCharsFollowedBy3or4Numbers.IsMatch(password);
  return hasMatch;  
}
```

# Detection

This is a semantic rule. We can instruct our linters to warn us from using names related to existing classes, types o reserved words since they are too implementative.

# Tags

- Declarative

# Conclusion

The first name we can across is related to an accidental point of view. It takes time to build a theory on the models we are building using our [MAPPERS](Theory\The One and Only Software Design Principle). Once we get there, we must rename our variables-

# Relations

[Code Smell 38 - Abstract Names](Code Smells\Code Smell 38 - Abstract Names)

# More info

[What exactly is a name — Part II Rehab](Theory\What exactly is a name — Part II Rehab)

%[http://xunitpatterns.com/Intent%20Revealing%20Name.html]

# Credits

Photo by [Sangga Rima Roman Selia](https://unsplash.com/@sxy_selia) on [Unsplash](https://unsplash.com/s/photos/name)
  
This idea came from this tweet

[Twitter](https://twitter.com/1377522389312008193)


* * *

> Types are essentially assertions about a program.  And I think it’s valuable to have things be as absolutely simple as possible, including not even saying what the types are.

_Dan Ingalls_
 
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)
