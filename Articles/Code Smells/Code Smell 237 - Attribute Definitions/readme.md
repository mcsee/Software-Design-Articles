# Code Smell 237 - Attribute Definitions
            
![Code Smell 237 - Attribute Definitions](Code%20Smell%20237%20-%20Attribute%20Definitions.jpg)

*You read a class and the first thing you notice are the arbitrary properties*

> TL;DR: Never focus on implementation. Focus on behavior instead.

# Problems

- Coupling to implementation

- Lack of Separation between the ['What' and the 'How'](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20123%20-%20Mixed%20'What'%20and%20'How'/readme.md)

- Encapsulation and Information Hiding violations

- Lack of Abstraction

- Unclear separation of Interfaces/Protocol

- Coupled Testability

- Debugging using inspectors instead of sending messages to objects.

# Solutions

1. Redesign your favorite programming language

2. Ignore the (accidental) implementation and study the available protocol

# Context

For historical reasons, most class-based programming languages declare the attributes first and the public protocol after.

This is a problem if you need to understand what a class does at first sight.

Some languages implemented [Header files](https://simple.wikipedia.org/wiki/Header_file) (often denoted by the .h extension).

They contain declarations of functions, classes, variables, and other constructs without providing the full implementation.

These files serve as a way to share information about the structure and interface of a program or library across multiple source code files.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/4e5896ea95b0115f6f3dfb3571dc827a)
```java
public class ShoppingCart {
  
    // This is Accidental
    private List<Item> items;

    // This is Also Accidental
    // And irrelevant to cart usage
    public ShoppingCart() {
        this.items = new ArrayList<>();
    }
 
    public void addItem(Item item) {
        items.add(item); 
    }
 
    public void removeItem(Item item) {
        // Error handling is irrelevant for the example
        items.remove(item);
    }
 
    public double calculateTotal() {
        double total = 0.0;
        for (Item item : items) {
            total += item.getPrice();
        }
        return total;
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/e4aec099dfea90daba8ce073baf626db)
```java
public class ShoppingCart {
     
    // Focus on public behavior only    
    // This is invalid in Java :(
    public ShoppingCart() { } 
    public void addItem(Item item) { }  
    public void removeItem(Item item) { }     
    public double calculateTotal() {}
}
```

# Detection

[X] Manual

This is language smell. You cannot detect it.

# Exceptions

- This smell applies only to languages requiring explicit attribute definitions like Java, C#, PHP, etc.

Dynamically-typed languages like Python or JavaScript do not require explicit attribute definition. 

In these languages, you can create attributes on the fly without declaring them in the class definition. 

# Tags

- Hierarchies

# Level

[X] Beginner 

# AI Assistants

Most AI Assistants generate code with this smell.

Try prompting: *'Generate a class representing a House in Java'*

# Conclusion

You cannot change the language you use, still, according to The [Sapir-Whorf hypothesis](https://learning.oreilly.com/library/view/clean-code-cookbook/9781098144715/) the structure and vocabulary of a language can shape or influence how its speakers perceive and think about the real world using the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

# Relations

[Code Smell 123 - Mixed 'What' and 'How'](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20123%20-%20Mixed%20'What'%20and%20'How'/readme.md)

# More Info

[Wikipedia Header Files](https://simple.wikipedia.org/wiki/Header_file)

[Wikipedia Sapir-Whorf Hypothesis](https://en.wikipedia.org/wiki/Linguistic_relativity)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [K8](https://unsplash.com/@_k8_) on [Unsplash](https://unsplash.com/photos/silver-framed-eyeglasses-on-white-table-r87zX1RWECQ)
    
* * *

> Tests should be coupled to the behavior of code and decoupled from the structure of code

_Kent Beck_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)