# Code Smell 64 - Inappropriate Intimacy

![Code Smell 64 - Inappropriate Intimacy](Code%20Smell%2064%20-%20Inappropriate%20Intimacy.jpg)

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

If two classes are too related and don't talk much to others we might need to split, merge or refactor them,
Classes should know as little about each other as possible. 

# Relations

[Code Smell 63 - Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2063%20-%20Feature%20Envy/readme.md)

# More Info

%[https://wiki.c2.com/?InappropriateIntimacy]

https://refactoring.guru/es/smells/inappropriate-intimacy

https://www.thecodebuzz.com/awesome-code-inappropriate-intimacy-code-smell-resolution/
 
# Credits

Photo by [Becca Tapert](https://unsplash.com/@beccatapert) on [Unsplash](https://unsplash.com/s/photos/intimate)
  

* * *

> No matter how slow you are writing clean code, you will always be slower if you make a mess.
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)