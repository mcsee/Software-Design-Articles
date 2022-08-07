# Code Smell 103 - Double Encapsulation

![Code Smell 103 - Double Encapsulation](ray-hennessy-OjE4RtaibFc-unsplash.jpg)

*Calling our own accessor methods might seem a good encapsulation idea. But it is not.*

> TL;DR: Don't use setters and getters, even for private use

# Problems

- Setters

- Getters

- Exposing private attributes

# Solutions

1. [Remove setters](Refactorings\Refactoring 001 - Remove Setters)

2. Remove getters

3. Protect your attributes

# Context

Using double encapsulation was a standard procedure in the 90s.

We wanted to hide implementation details even for private use.

This was hiding another smell when too many functions relies on data structure and accidental implementation.

For example, we can change an object internal representation and rely on its external protocol.

Cost/benefit is not worth it.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/6f91efd52401b93f91322f20ab6d3aab)
```solidity
contract MessageContract {
    string message = "Let's trade";
    
    function getMessage() public constant returns(string) {
        return message;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
    
    function sendMessage() public constant {
        this.send(this.getMessage());
        // We can access property but make a self call instead
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/91d0aa627815f79d471fa79150c5dc9b)
```solidity
contract MessageContract {
    string message = "Let's trade";
        
    function sendMessage() public constant {
        this.send(message);
    }
}
```

# Detection

[X] Semi-Automatic

We can infer getters and setters and check if they are invoked from the same object.

# Tags

- Encapsulation

# Conclusion

Double encapsulation was a trendy idea to protect accidental implementation, but it exposed more than protected.

# Relations

[Code Smell 37 - Protected Attributes](Code Smells\Code Smell 37 - Protected Attributes) 

[Code Smell 28 - Setters](Code Smells\Code Smell 28 - Setters)

[Code Smell 68 - Getters](Code Smells\Code Smell 68 - Getters)

# More Info

- [Stack Exchange](https://softwareengineering.stackexchange.com/questions/181567/should-the-methods-of-a-class-call-its-own-getters-and-setters)

- [Reddit](https://www.reddit.com/r/java/comments/2f3flb/is_it_considered_better_practice_for_a_class_to/)

- [InfoWorld](https://www.infoworld.com/article/2073723/why-getter-and-setter-methods-are-evil.html)

# Credits

Photo by [Ray Hennessy](https://unsplash.com/@rayhennessy) on [Unsplash](https://unsplash.com/s/photos/double)
  
* * *

> Encapsulate the concept that varies.

_Erich Gamma_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()