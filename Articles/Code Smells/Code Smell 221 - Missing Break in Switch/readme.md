# Code Smell 221 - Missing Break in Switch
            
![Code Smell 221 - Missing Break in Switch](Code%20Smell%20221%20-%20Missing%20Break%20in%20Switch.jpg)

*You abuse cases in switches and make subtle mistakes*

> TL;DR: Cases are GOTOs, but you might be missing them

# Problems

- Hidden [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md)

- Readability

# Solutions

1. Add the missing *break*

2. Convert the switch into a polymorphic hierarchy

3. [Remove](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20110%20-%20Switches%20With%20Defaults/readme.md) the default switch

# Context

In a switch statement, when a match is found in a particular case, the code execution will start from that case and continue executing all subsequent cases until a break statement is encountered or the switch block ends. 

This behavior is called "fall-through."

Forgetting a *break* clause will continue with the following case.

This is similar to a very [serious vulnerability](https://embeddedgurus.com/barr-code/2014/03/apples-gotofail-ssl-security-bug-was-easily-preventable/) that implied an urgent release.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/d07af4a8fdbbc9be0392eefaa6934122) -->

```c
switch (number) {
      case 1:
          printf("Number is 1.\n");
          break;
      case 2:
          printf("Number is 2.\n"); 
          // Missing break
      case 3:
          // Case 2 will continue here
          printf("Number is 3.\n"); 
          break;
      default:
          printf("Number is not 1, 2, or 3.\n");
  }

// If the number is 2 this will output numbers 2 and 3
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/006410b727680f0215d8fd2d84eb9f92) -->

```c
switch (number) {
      case 1:
          printf("Number is 1.\n");
          break;
      case 2:
          printf("Number is 2.\n"); 
          break; // Added 'break' to prevent fall-through
      case 3:
          printf("Number is 3.\n"); 
          break;
      default:
          printf("Number is not 1, 2, or 3.\n");
  }

// This is correct even though switches AND defaults
// Are other code smells
```

# Detection

[X] Automatic 

Many [linters](https://rules.sonarsource.com/c/type/Code%20Smell/RSPEC-128/) and also ChatGPT detect this smell.

# Tags

- IFs

# Level

[X] Beginner

# Conclusion

Using switches and causes is problematic, your need to use higher-level sentences.

# Relations

[Code Smell 110 - Switches With Defaults](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20110%20-%20Switches%20With%20Defaults/readme.md)

[Code Smell 36 - Switch/case/elseif/else/if statements](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2036%20-%20Switch%20case%20elseif%20else%20if%20statements/readme.md)

[Code Smell 100 - GoTo](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20100%20-%20GoTo/readme.md)

# More Info

[Sonar Source](https://rules.sonarsource.com/c/type/Code%20Smell/RSPEC-128/)

[Common Weakness Enumeration](https://cwe.mitre.org/data/definitions/484)

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

[Apple's Security Defect](https://embeddedgurus.com/barr-code/2014/03/apples-gotofail-ssl-security-bug-was-easily-preventable/)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Nikola Johnny Mirkovic](https://unsplash.com/@thejohnnyme) on [Unsplash](https://unsplash.com/photos/Jp3v9MvH2oA)
    
* * *

> I am not terribly dogmatical about the goto statement. I have the uncomfortable feeling that others are making a religion out of it, as if the conceptual problems of programming could be solved by a single trick, by a simple form of coding discipline!

_Edsger Dijkstra_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)