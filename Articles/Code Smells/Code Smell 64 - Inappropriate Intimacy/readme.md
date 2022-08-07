# Code Smell 64 - Inappropriate Intimacy

![Code Smell 64 - Inappropriate Intimacy](becca-tapert-F0ZiHWliGGM-unsplash.jpg)

*Two classes entangled in love.*

# Problems

- Coupling

- Bad Responsibilities Assignments
 
- Bad Cohesion

- Class Interfaces too Public

- Maintainability

- Extensibility

# Solutions

1. Refactor

2. Merge

3. Replace Hierarchy With Delegation.

%[https://refactoring.com/catalog/replaceSuperclassWithDelegate.html]

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/5f9206a8a131b4dcaaa2fd64562c9eca)
```java
class Candidate {

 void printJobAddress(Job job) {

   System.out.println("This is your position address");

   System.out.println(job.address().street());
   System.out.println(job.address().city());
   System.out.println(job.address().zipCode());
   
   if (job.address().country() == job.country()) {
        System.out.println("It is a local job");
   } 
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/f94d51d327592ca511b625bac37cb441)
```java
final class Address {
 void print() {
   System.out.println(this.street);
   System.out.println(this.city);
   System.out.println(this.zipCode);   
 } 
 
 bool isInCounty(Country country) {
  return this.country == country;
}

class Job {
 void printAddress() {

   System.out.println("This is your position address");

   this.address().print());
   
   if (this.address().isInCountry(this.country()) {
        System.out.println("It is a local job");
   } 
 } 
}

class Candidate {
  void printJobAddress(Job job) {
    job.printAddress();
  }
}
```

# Detection

Some linters graph class relations and protocol dependency. Analyzing the collaboration graph we can infer rules and hints.

# Tags

- Coupling

# Conclusion

It two classes are too related and don't talk much to others we might need to split, merge or refactor them,
Classes should know as little about each other as possible. 

# Relations

[Code Smell 63 - Feature Envy](Code Smells\Code Smell 63 - Feature Envy)

# More info

%[https://wiki.c2.com/?InappropriateIntimacy]

https://refactoring.guru/es/smells/inappropriate-intimacy

https://www.thecodebuzz.com/awesome-code-inappropriate-intimacy-code-smell-resolution/
 
# Credits

Photo by [Becca Tapert](https://unsplash.com/@beccatapert) on [Unsplash](https://unsplash.com/s/photos/intimate)
  

* * *

> No matter how slow you are writing clean code, you will always be slower if you make a mess.
 
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()