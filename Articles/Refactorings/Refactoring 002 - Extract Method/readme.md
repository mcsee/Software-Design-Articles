# Refactoring 002 - Extract Method

![Refactoring 002 - Extract Method](tug-of-war-g9f79f5ff3_1920.jpg)

*Find some code snippets that can be grouped and called atomically.*

> TL;DR: Group your cohesive sentences together

# Problems Addressed

- Readability

- Complexity

- Code Reuse

# Related Code Smells

- [Code Smell 03 - Functions Are Too Long](Code Smells\Code Smell 03 - Functions Are Too Long)

- [Code Smell 05 - Comment Abusers](Code Smells\Code Smell 05 - Comment Abusers)

- [Code Smell 18 - Static Functions](Code Smells\Code Smell 18 - Static Functions)

- [Code Smell 22 - Helpers](Code Smells\Code Smell 22 - Helpers)

- [Code Smell 74 - Empty Lines](Code Smells\Code Smell 74 - Empty Lines)

- [Code Smell 78 - Callback Hell](Code Smells\Code Smell 78 - Callback Hell)

- [Code Smell 102 - Arrow Code](Code Smells\Code Smell 102 - Arrow Code)

# Steps

1. Move the code fragment to a separate new method 

2. Replace the old code with a call to the recently created method.

# Sample Code

## Before

[Gist Url]: # (https://gist.github.com/mcsee/18f22cff14d588942fc87893bb73edeb)
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

## After

[Gist Url]: # (https://gist.github.com/mcsee/d1e6a299bbb104132e48ee19a45efa7e)
```kotlin
object Ingenuity {   
    //1. Move the code fragment to a separate new method 
    private fun takeOff() {
        raiseTo(10 feet)
    }
    
    //1. Move the code fragment to a separate new method 
    private fun moveForwardToPerseverance() {
       while (distanceToPerseverance() < 5 feet) {
             moveForward()             
         }
    }
    
    //1. Move the code fragment to a separate new method 
    private fun land() {
        raiseTo(0 feet)
    }
    
    fun moveFollowingPerseverance() {
        takeOff()
        //2. Replace the old code with a call to the recently created method.
        moveForwardToPerseverance()
        //2. Replace the old code with a call to the recently created method.
        land()
        //2. Replace the old code with a call to the recently created method.
    }
}
```

# Type

[X] Automatic
 
Many IDEs support this safe refactoring

# Why code is better?

Code is more compact and easier to read.

Functions can be reused.

Algorithms and functions are more declarative hiding implementative details on extracted code.

# Limitations

Does not work well if you use [meta-programming anti-pattern](Theory\Laziness I - Metaprogramming).

# Tags

- Complexity

- Readability

# Related Refactorings

-  Move method to a new class

# Credits

Image by [Hreisho](https://pixabay.com/users/hreisho-2216364/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.