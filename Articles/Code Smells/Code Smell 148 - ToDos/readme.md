# Code Smell 148 - ToDos

![Code Smell 148 - ToDos](eden-constantino-bTukYI4DjOs-unsplash.jpg)

*We buy debt for our future selves. It is payback time*

> TL;DR: Don't leave TODOs in your code. Fix them!

# Problems

- Technical Debt

- Readability

- Lack of Confidence

# Solutions

1. Fix your TODOs

# Context

We encounter TODOs in our code. We count them.

We seldom address it.

We started owing the technical debt.

Then we pay the debt + the interest.

A few months after, we pay more interest than the original debt.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/76fb2f5fada656e6dd5be6989351e91c)
```java
public class Door
{ 
    private Boolean isOpened;
    
    public Door(boolean isOpened)
    {       
        this.isOpened = isOpened;
    }      
    
    public void openDoor()
    {
        this.isOpened = true;
    }
    
    public void closeDoor()
    {
        // TODO: Implement close door and cover it
    }      
    
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/2d1fcb683f9c9c0391c7c369baf54bff)
```java
public class Door
{
 
    private Boolean isOpened;
    
    public Door(boolean isOpened)
    {       
        this.isOpened = isOpened;
    }      
    
    public void openDoor()
    {
        this.isOpened = true;
    }
    
    public void closeDoor()
    {
        this.isOpened = false;
    }      
    
}
```

# Detection

[X] Automatic 

We can count TODOs.

# Tags

- Technical Debt

# Conclusion

We can count TODOs.

Most linters do it.

We need the policy to reduce it.

If we are using TDD, we write the missing code right away.

In this context, TODOs are only valid when doing Depth First development to remember open paths to visit.

# More Info

- [Should you put ToDos?](https://www.osedea.com/en/blog/should-you-put-todos-in-the-source-code)

- [Broken Windows Theory](https://en.wikipedia.org/wiki/Broken_windows_theory)

# Credits

Photo by [Eden Constantino](https://unsplash.com/@edenconstantin0) on [Unsplash](https://unsplash.com/s/photos/todo)
  
* * *

> After you finish the first 90% of a project, you have to finish the other 90%.

_Michael Abrash_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()