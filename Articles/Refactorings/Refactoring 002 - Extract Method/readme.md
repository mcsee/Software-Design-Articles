# Refactoring 002 - Extract Method

![Refactoring 002 - Extract Method](Refactoring%20002%20-%20Extract%20Method.jpg)

*Find some code snippets that can be grouped and called atomically.*

> TL;DR: Group your cohesive sentences together

# Problems Addressed 😔

- Readability

- Complexity

- Code Reuse

# Related Code Smells 💨

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

[Code Smell 18 - Static Functions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2018%20-%20Static%20Functions/readme.md)

[Code Smell 22 - Helpers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2022%20-%20Helpers/readme.md)

[Code Smell 74 - Empty Lines](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2074%20-%20Empty%20Lines/readme.md)

[Code Smell 78 - Callback Hell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2078%20-%20Callback%20Hell/readme.md)

[Code Smell 102 - Arrow Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20102%20-%20Arrow%20Code/readme.md)			

[Code Smell 107 - Variables Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20107%20-%20Variables%20Reuse/readme.md)

[Code Smell 154 - Too Many Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20154%20-%20Too%20Many%20Variables/readme.md)

[Code Smell 169 - Glued Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20169%20-%20Glued%20Methods/readme.md)

# Context 💬
 
When a method grows too large, it usually tries to tell too many stories at different levels of abstraction.

You need to break a complex algorithm into smaller, cohesive units.

This allows the main method to read like a high-level summary of the "What" while hiding the gritty "How" inside well-named sub-procedures. 

Code should read like well-written haikus.      

# Steps 👣 

1. Move the code fragment to a separate new method 

2. Replace the old code with a call to the recently created method.

# Sample Code 💻

## Before 🚨 

<!-- [Gist Url](https://gist.github.com/mcsee/18f22cff14d588942fc87893bb73edeb) -->

```kotlin
object Ingenuity {
    fun moveFollowingPerseverance() {
        // take Off
        raiseTo(10 feet)
      
        // move forward to perseverance
        while (distanceToPerseverance() < 5 feet) {
             moveForward()             
         }
        
        // land
        raiseTo(0 feet)
    }
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/d1e6a299bbb104132e48ee19a45efa7e) -->

```kotlin
object Ingenuity {   
    // 1. Move the code fragment to a separate new method 
    private fun takeOff() {
        raiseTo(10 feet)
    }
    
    // 1. Move the code fragment to a separate new method 
    private fun moveForwardToPerseverance() {
       while (distanceToPerseverance() < 5 feet) {
             moveForward()             
         }
    }
    
    // 1. Move the code fragment to a separate new method 
    private fun land() {
        raiseTo(0 feet)
    }
    
    fun moveFollowingPerseverance() {
        takeOff()
        // 2. Replace the old code with a call
        // to the recently created method
        moveForwardToPerseverance()
        // 2. Replace the old code with a call 
        // to the recently created method
        land()
        // 2. Replace the old code with a call
        // to the recently created method
    }
}
```

# Type 📝

[X] Automatic
 
Many IDEs support this safe refactoring

# Safety 🛡️

This is a safe refactoring.

# Why is the Code Better? ✨

Code is more compact and easier to read.

Functions can be reused.

Algorithms and functions are more declarative hiding implementative details on extracted code.

# Limitations ⚠️

Doesn't work well if you use [meta-programming anti-pattern](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md).

# Tags 🏷️
 
- Readability

# Level 🔋

[X] Beginner

# Related Refactorings 🔄

[Refactoring 010 - Extract Method Object](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20010%20-%20Extract%20Method%20Object/readme.md)

[Refactoring 025 - Decompose Regular Expressions](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20025%20-%20Decompose%20Regular%20Expressions/readme.md)

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

[Refactoring 003 - Extract Constant](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20003%20-%20Extract%20Constant/readme.md)

[Refactoring 012 - Reify Associative Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20012%20-%20Reify%20Associative%20Arrays/readme.md)

[Refactoring 019 - Reify Email Addresses](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20019%20-%20Reify%20Email%20Addresses/readme.md)

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

[Refactoring 005 - Replace Comment with Function Name](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20005%20-%20Replace%20Comment%20with%20Function%20Name/readme.md)

- Move method to a new class

# Credits 🙏

Image by [Hreisho](https://pixabay.com/users/hreisho-2216364/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)