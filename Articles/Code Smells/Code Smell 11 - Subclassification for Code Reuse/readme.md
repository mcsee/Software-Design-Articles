# Code Smell 11 - Subclassification for Code Reuse

![Code Smell 11 - Subclassification for Code Reuse](Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse.jpg)

*Code reuse is good. But subclassing generates a static coupling.*

> TL;DR: Favor composition over inheritance. Always. Period.

# Problems 😔 

- Coupling
- Maintainability
- Fragile Base Class

# Solutions 😃

1. Replace inheritance with composition
2. Extract common protocols
3. Inherit from abstract classes

# Refactorings ⚙️

[Refactoring 023 - Replace Inheritance with Delegation](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20023%20-%20Replace%20Inheritance%20with%20Delegation/readme.md)

[Refactoring 022 - Extract Common Ancestor](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20022%20-%20Extract%20Common%20Ancestor/readme.md)

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

# Context 💬

You often misuse inheritance for code reuse rather than modeling true "behaves-like" relationships. 

You see a class with useful methods and think "I'll just extend it" without considering whether a genuine substitution relationship exists.

This creates tight coupling to the parent's implementation details. 

Any change to the parent can break the child, even if the child only uses a fraction of its functionality.

True inheritance should follow the Liskov Substitution Principle - the subclass must genuinely behave like its parent. 

If you're inheriting just to access convenient methods, use composition instead. It provides the same code reuse with much looser coupling.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/4f53d085c8b566936c04483064e25ed9) -->

```java
public class Rectangle {
    
    int length;
    int width;
    
    public Rectangle(int length, int width) {
        length = length;
        width = width;
    }
   
    public int area() {
        return length * width;
    }
}

public class Square extends Rectangle {
     
     public Square(int size) {
        super(size, size); 
    }
   
    public int area() {
        return length * length;
    }
}

public class Box extends Rectangle{    
      
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/9f0082db40c2ab590b2b6ea9702bbb22) -->

```java
abstract public class Shape{
    
    abstract public int area();
}

public final class Rectangle extends Shape {
    
    int length;
    int width;
    
    public Rectangle(int length, int width) {
        length = length;
        width = width;
    }
   
    public int area() {
        return length * width;
    }
}

public final class Square extends Shape {
     
     int size;
      
     public Square(int size) {
        size = size; 
    }
   
    public int area() {
        return size * size;
    }
}

public final class Box {
    
    Square shape;
    
    public Box(int size) {
        shape = new Square(size); 
    }
    
    public int area() {
        return shape.area();
    }
}
```

# Detection 🔍

- Overriding can issue warnings when subclassing concrete methods.
- Deep Hierarchies (more than 3 levels) are also a clue of bad subclassing.

# Exceptions 🛑

- If hierarchy follows the principle *behaves like* then it is safe.

# Tags 🏷️

- Hierarchies

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

The [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between real-world concepts and code should model behavioral relationships, not implementation convenience.

In the real world, When you inherit from concrete classes for code reuse, you break this mapping and create false hierarchies.

This damages your model's integrity and makes the code harder to understand and maintain.

# AI Generation 🤖

AI code generators often create this smell. 

They see an existing concrete class and suggest inheritance as the quickest path to code reuse.

You need to explicitly instruct AI tools to favor composition and interface-based design.

# AI Detection 🧲

AI tools can detect this smell with proper prompting. 

They can identify concrete class inheritance and suggest refactoring to composition or interface-based designs.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: Review this code for concrete class inheritance. Suggest refactoring to use interfaces, abstract classes, or composition instead. Show me how to extract common behavior into contracts rather than inheriting implementations

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Rectangle+%7B%0D%0A++++%0D%0A++++int+length%3B%0D%0A++++int+width%3B%0D%0A++++%0D%0A++++public+Rectangle%28int+length%2C+int+width%29+%7B%0D%0A++++++++length+%3D+length%3B%0D%0A++++++++width+%3D+width%3B%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+width%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Square+extends+Rectangle+%7B%0D%0A+++++%0D%0A+++++public+Square%28int+size%29+%7B%0D%0A++++++++super%28size%2C+size%29%3B+%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+length%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Box+extends+Rectangle%7B++++%0D%0A++++++%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Review+this+code+for+concrete+class+inheritance.+Suggest+refactoring+to+use+interfaces%2C+abstract+classes%2C+or+composition+instead.+Show+me+how+to+extract+common+behavior+into+contracts+rather+than+inheriting+implementations%3A+%60%60%60java%0D%0Apublic+class+Rectangle+%7B%0D%0A++++%0D%0A++++int+length%3B%0D%0A++++int+width%3B%0D%0A++++%0D%0A++++public+Rectangle%28int+length%2C+int+width%29+%7B%0D%0A++++++++length+%3D+length%3B%0D%0A++++++++width+%3D+width%3B%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+width%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Square+extends+Rectangle+%7B%0D%0A+++++%0D%0A+++++public+Square%28int+size%29+%7B%0D%0A++++++++super%28size%2C+size%29%3B+%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+length%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Box+extends+Rectangle%7B++++%0D%0A++++++%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Rectangle+%7B%0D%0A++++%0D%0A++++int+length%3B%0D%0A++++int+width%3B%0D%0A++++%0D%0A++++public+Rectangle%28int+length%2C+int+width%29+%7B%0D%0A++++++++length+%3D+length%3B%0D%0A++++++++width+%3D+width%3B%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+width%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Square+extends+Rectangle+%7B%0D%0A+++++%0D%0A+++++public+Square%28int+size%29+%7B%0D%0A++++++++super%28size%2C+size%29%3B+%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+length%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Box+extends+Rectangle%7B++++%0D%0A++++++%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Review+this+code+for+concrete+class+inheritance.+Suggest+refactoring+to+use+interfaces%2C+abstract+classes%2C+or+composition+instead.+Show+me+how+to+extract+common+behavior+into+contracts+rather+than+inheriting+implementations%3A+%60%60%60java%0D%0Apublic+class+Rectangle+%7B%0D%0A++++%0D%0A++++int+length%3B%0D%0A++++int+width%3B%0D%0A++++%0D%0A++++public+Rectangle%28int+length%2C+int+width%29+%7B%0D%0A++++++++length+%3D+length%3B%0D%0A++++++++width+%3D+width%3B%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+width%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Square+extends+Rectangle+%7B%0D%0A+++++%0D%0A+++++public+Square%28int+size%29+%7B%0D%0A++++++++super%28size%2C+size%29%3B+%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+length%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Box+extends+Rectangle%7B++++%0D%0A++++++%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Rectangle+%7B%0D%0A++++%0D%0A++++int+length%3B%0D%0A++++int+width%3B%0D%0A++++%0D%0A++++public+Rectangle%28int+length%2C+int+width%29+%7B%0D%0A++++++++length+%3D+length%3B%0D%0A++++++++width+%3D+width%3B%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+width%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Square+extends+Rectangle+%7B%0D%0A+++++%0D%0A+++++public+Square%28int+size%29+%7B%0D%0A++++++++super%28size%2C+size%29%3B+%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+length%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Box+extends+Rectangle%7B++++%0D%0A++++++%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Review+this+code+for+concrete+class+inheritance.+Suggest+refactoring+to+use+interfaces%2C+abstract+classes%2C+or+composition+instead.+Show+me+how+to+extract+common+behavior+into+contracts+rather+than+inheriting+implementations%3A+%60%60%60java%0D%0Apublic+class+Rectangle+%7B%0D%0A++++%0D%0A++++int+length%3B%0D%0A++++int+width%3B%0D%0A++++%0D%0A++++public+Rectangle%28int+length%2C+int+width%29+%7B%0D%0A++++++++length+%3D+length%3B%0D%0A++++++++width+%3D+width%3B%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+width%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Square+extends+Rectangle+%7B%0D%0A+++++%0D%0A+++++public+Square%28int+size%29+%7B%0D%0A++++++++super%28size%2C+size%29%3B+%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+length%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Box+extends+Rectangle%7B++++%0D%0A++++++%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Rectangle+%7B%0D%0A++++%0D%0A++++int+length%3B%0D%0A++++int+width%3B%0D%0A++++%0D%0A++++public+Rectangle%28int+length%2C+int+width%29+%7B%0D%0A++++++++length+%3D+length%3B%0D%0A++++++++width+%3D+width%3B%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+width%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Square+extends+Rectangle+%7B%0D%0A+++++%0D%0A+++++public+Square%28int+size%29+%7B%0D%0A++++++++super%28size%2C+size%29%3B+%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+length%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Box+extends+Rectangle%7B++++%0D%0A++++++%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Review+this+code+for+concrete+class+inheritance.+Suggest+refactoring+to+use+interfaces%2C+abstract+classes%2C+or+composition+instead.+Show+me+how+to+extract+common+behavior+into+contracts+rather+than+inheriting+implementations%3A+%60%60%60java%0D%0Apublic+class+Rectangle+%7B%0D%0A++++%0D%0A++++int+length%3B%0D%0A++++int+width%3B%0D%0A++++%0D%0A++++public+Rectangle%28int+length%2C+int+width%29+%7B%0D%0A++++++++length+%3D+length%3B%0D%0A++++++++width+%3D+width%3B%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+width%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Square+extends+Rectangle+%7B%0D%0A+++++%0D%0A+++++public+Square%28int+size%29+%7B%0D%0A++++++++super%28size%2C+size%29%3B+%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+length%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Box+extends+Rectangle%7B++++%0D%0A++++++%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Rectangle+%7B%0D%0A++++%0D%0A++++int+length%3B%0D%0A++++int+width%3B%0D%0A++++%0D%0A++++public+Rectangle%28int+length%2C+int+width%29+%7B%0D%0A++++++++length+%3D+length%3B%0D%0A++++++++width+%3D+width%3B%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+width%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Square+extends+Rectangle+%7B%0D%0A+++++%0D%0A+++++public+Square%28int+size%29+%7B%0D%0A++++++++super%28size%2C+size%29%3B+%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+length%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Box+extends+Rectangle%7B++++%0D%0A++++++%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=Review+this+code+for+concrete+class+inheritance.+Suggest+refactoring+to+use+interfaces%2C+abstract+classes%2C+or+composition+instead.+Show+me+how+to+extract+common+behavior+into+contracts+rather+than+inheriting+implementations%3A+%60%60%60java%0D%0Apublic+class+Rectangle+%7B%0D%0A++++%0D%0A++++int+length%3B%0D%0A++++int+width%3B%0D%0A++++%0D%0A++++public+Rectangle%28int+length%2C+int+width%29+%7B%0D%0A++++++++length+%3D+length%3B%0D%0A++++++++width+%3D+width%3B%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+width%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Square+extends+Rectangle+%7B%0D%0A+++++%0D%0A+++++public+Square%28int+size%29+%7B%0D%0A++++++++super%28size%2C+size%29%3B+%0D%0A++++%7D%0D%0A+++%0D%0A++++public+int+area%28%29+%7B%0D%0A++++++++return+length+%2A+length%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Apublic+class+Box+extends+Rectangle%7B++++%0D%0A++++++%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

In legacy systems is very common to have *Deep Hierarchies* and *method overriding*, we need to refactor them and subclass by *essential* reasons and not implementative ones.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 58 - Yo-yo Problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2058%20-%20Yo-yo%20Problem/readme.md)

[Code Smell 46 - Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2046%20-%20Repeated%20Code/readme.md)

[Code Smell 136 - Classes With just One Subclass](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20136%20-%20Classes%20With%20just%20One%20Subclass/readme.md)

[Code Smell 137 - Inheritance Tree Too Deep](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20137%20-%20Inheritance%20Tree%20Too%20Deep/readme.md)

[Code Smell 95 - Premature Classification](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2095%20-%20Premature%20Classification/readme.md)

[Code Smell 37 - Protected Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2037%20-%20Protected%20Attributes/readme.md)

[Code Smell 125 - 'IS-A' Relationship](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20125%20-%20'IS-A'%20Relationship/readme.md)
														
[Code Smell 92 - Isolated Subclasses Names](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2092%20-%20Isolated%20Subclasses%20Names/readme.md)

[Code Smell 43 - Concrete Classes Subclassified](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2043%20-%20Concrete%20Classes%20Subclassified/readme.md)

[Code Smell 161 - Abstract/Final/Undefined Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20161%20-%20Abstract%20Final%20Undefined%20Classes/readme.md)

# More Information 📕

[Liskov Substitution](https://en.wikipedia.org/wiki/Liskov_substitution_principle)

# Credits 🙏

Photo by [Brandon Green](https://unsplash.com/@brandgreen) on [Unsplash](https://unsplash.com/s/photos/tree)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)