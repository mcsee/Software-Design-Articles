# Refactoring 007 - Extract Class

![Refactoring 007 - Extract Class](pump-jack-ged2e1c92d_1920.jpg)

*Behavior is repeated across the system. But we are missing a concept*

> TL;DR: Put together what belongs together 

# Problems Addressed

- Code Duplication

- Missing Abstraction

- Low Cohesion

# Related Code Smells

[Code Smell 124 - Divergent Change](Code Smells\Code Smell 124 - Divergent Change)

[Code Smell 143 - Data Clumps](Code Smells\Code Smell 143 - Data Clumps)

[Code Smell 147 - Too Many Methods](Code Smells\Code Smell 147 - Too Many Methods)

# Steps

1. Extract the methods (and accidentally the properties) coupled into a new concept

2. Use the new concept

# Sample Code

## Before

[Gist Url]: # (https://gist.github.com/mcsee/04dfcde00d2d40c8741f9af2fbeba469)
```java
 final class Person {
 
      private String name;
   
      // Below cohesive properties
      private String homeAreaCode;
      private String homeNumber;
      
      public String name() {
          return name;
      }
   
      // Below cohesive behaviour
      public String telephoneNumber() {
          return ("(" + homeAreaCode + ") " + homeNumber);
      }
      String areaCode() {
          return homeAreaCode;
      }
      String officeNumber() {
          return officeNumber;
      } 
 }
 
```

## After

[Gist Url]: # (https://gist.github.com/mcsee/3038811d4e9e821908b54092ad8efaee)
```java
// 1. Extract the methods (and accidentally the properties) coupled into a new concept      
   public class TelephoneNumber {
   
      private String number;
      private String areaCode;
   
      public String telephoneNumber() {
          return ("(" + areaCode + ") " + number);
      }
      public String areaCode() {
          return areaCode;
      }
      public String number() {
          return number;
      }
   }
   
final class Person {

      private String name;
  
      // 2. Use the new concept
      private TelephoneNumber officeTelephone = new TelephoneNumber();
      
      public String name() {
          return name;
      }
      public String telephoneNumber() {
          return officeTelephone.getTelephoneNumber();
      }
     
  }


```

# Type

[X] Automatic

Most IDEs implement this safe refactor.

# Why code is better?

Logic code is in just one place together with its rules

# Tags

- Classes

# See also

[Refactoring.com](https://refactoring.com/catalog/extractClass.html)

[Refactoring Guru](https://refactoring.guru/extract-class)

# Credits

Image from <a href="https://pixabay.com/es/users/drpepperscott230-1212529/">drpepperscott230</a> on <a href="https://pixabay.com/es/">Pixabay</a>

* * * 

This article is part of the Refactoring Series.

