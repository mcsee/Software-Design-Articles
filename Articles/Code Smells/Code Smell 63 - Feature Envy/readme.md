# Code Smell 63 - Feature Envy

![Code Smell 63 - Feature Envy](Code%20Smell%2063%20-%20Feature%20Envy.jpg)

*If your method is jealous and doesn't trust in delegation you should start to do it.*

> TL;DR: Don't abuse your friend objects.

# Problems

- Coupling

- Low Reuse

- Low Testability

- Bad Responsibilities Assignment

- Bijection Fault

[The One and Only Software Design Principle](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md)

# Solutions

1.  Move the method to the appropriate class.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/62bc32206f71d61c1d0b63dcf87f8b80)
```java
class Candidate {

 void printJobAddress(Job job) {

   System.out.println("This is your position address");

   System.out.println(job.address().street());
   System.out.println(job.address().city());
   System.out.println(job.address().ZipCode());
 } 
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/edaade5842cdfa8ddd474c9904942e66)
```java
class Job {

 void printAddress() {

   System.out.println("This is your job position address");

   System.out.println(this.address().street());
   System.out.println(this.address().city());
   System.out.println(this.address().ZipCode());
  
  // We might even move this responsibility directly to the address !
  // Some address information is relevant to a job and not for package tracking
 } 
}

class Candidate {
  void printJobAddress(Job job) {
    job.printAddress();
  }
}
```

# Detection

Some linters can detect a sequential pattern of collaborations with another object.

# Tags

- Coupling

# Conclusion

- We should assign responsibilities according to real object [mappers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) and avoid abusing other objects' protocol.
 
# Relations

[Code Smell 01 - Anemic Models](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2001%20-%20Anemic%20Models/readme.md)

[Code Smell 89 - Math Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2089%20-%20Math%20Feature%20Envy/readme.md)

# More Info

- [Refactoring Guru](https://refactoring.guru/es/smells/feature-envy)

- [C2 Wiki](https://wiki.c2.com/?FeatureEnvySmell)

- [Wikipedia](https://en.wikipedia.org/wiki/Law_of_Demeter)

# Credits

Photo by [Hisu lee](https://unsplash.com/@lee_hisu) on [Unsplash](/s/photos/brothers?)
  

* * *

> We argue that design practices which take a data-driven approach fail to maximize encapsulation because they focus too quickly on the implementation of objects. We propose an alternative object-oriented design method which takes a responsibility-driven approach.

_Rebecca Wirfs-Brock_
 
* * *
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)