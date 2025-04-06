# Refactoring 022 - Extract Common Ancestor

![Refactoring 022 - Extract Common Ancestor](Refactoring%20022%20-%20Extract%20Common%20Ancestor.jpg)

*Make your class hierarchy clear and flexible*

> TL;DR: Extract a common abstract class to mimic real-world structure.

# Problems Addressed

- [Duplicate Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)
- Inappropriate Inheritance
- [Shotgun Surgery](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2066%20-%20Shotgun%20Surgery/readme.md)
- Big Class
- [Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2063%20-%20Feature%20Envy/readme.md)
- High Coupling
- [Concrete classes subclassified](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2043%20-%20Concrete%20Classes%20Subclassified/readme.md)
- Parent class [not abstract](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20161%20-%20Abstract%20Final%20Undefined%20Classes/readme.md)

# Related Code Smells

[Code Smell 66 - Shotgun Surgery](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2066%20-%20Shotgun%20Surgery/readme.md)

[Code Smell 255 - Parallel Hierarchies](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20255%20-%20Parallel%20Hierarchies/readme.md)

[Code Smell 63 - Feature Envy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2063%20-%20Feature%20Envy/readme.md)

[Code Smell 43 - Concrete Classes Subclassified](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2043%20-%20Concrete%20Classes%20Subclassified/readme.md)

[Code Smell 161 - Abstract/Final/Undefined Classes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20161%20-%20Abstract%20Final%20Undefined%20Classes/readme.md)

# Steps

1. Identify common behaviors in both classes
2. Create an abstract class with shared behavior and no implementation
3. Move common logic to the abstract class
4. Update subclasses to inherit from the abstract class

# Sample Code

## Before

<!-- [Gist Url](https://gist.github.com/mcsee/5de0a92aa03e0374fdafd6be1132b121) -->

```java
class Car {
    void drive() {
        System.out.println("Driving a car");
    }
}

class Truck extends Car {
    void load() {
        System.out.println("Loading cargo");
    }

    void unload() {
        System.out.println("Unloading cargo");
    }
}

// Truck reuses driving method
// Overriding it would be another code smell
// Violating Liskov Substitution rule
```

## After

<!-- [Gist Url](https://gist.github.com/mcsee/8b35009d835f7646ce56080a93d9839a) -->

```java
abstract class Vehicle {
    // 2. Create an abstract class
    // with shared behavior and no implementation
    abstract void drive();
    // 1. Identify common behaviors in both classes
    // 3. Move common logic to the abstract class
}

class Car extends Vehicle {
    // 4. Update subclasses to inherit from the abstract class
    void drive() {
        System.out.println("Driving a car");
    }
}

class Truck extends Vehicle {
    // 4. Update subclasses to inherit from the abstract class
    void drive() {
        System.out.println("Driving a truck");
        // Implementation is different than the car's
    }

    void load() {
        System.out.println("Loading cargo");
    }

    void unload() {
        System.out.println("Unloading cargo");
    }
}
```

# Type

[X] Semi-Automatic

# Safety

This refactoring is safe if you identify all common behaviors correctly and move one method at a time running the tests.

# Why is the Code Better?

It reduces duplication, simplifies maintenance, and makes it easier to extend functionality by adding new concrete realizations.

# How Does it Improve the Bijection?

By introducing an abstract class, the code better reflects the [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) hierarchy, creating a clear relationship between the generic and specific types.

# Refactor with AI

> Suggested Prompt: 1. Identify common behaviors in both classes 2. Create an abstract class with shared behavior and no implementation 3. Move common logic to the abstract class 4. Update subclasses to inherit from the abstract class

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+Car+%7B%0D%0A++++void+drive%28%29+%7B%0D%0A++++++++System.out.println%28%22Driving+a+car%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Truck+extends+Car+%7B%0D%0A++++void+load%28%29+%7B%0D%0A++++++++System.out.println%28%22Loading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++void+unload%28%29+%7B%0D%0A++++++++System.out.println%28%22Unloading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Truck+reuses+driving+method%0D%0A%2F%2F+Overriding+it+would+be+another+code+smell%0D%0A%2F%2F+Violating+Liskov+Substitution+rule%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+common+behaviors+in+both+classes+2.+Create+an+abstract+class+with+shared+behavior+and+no+implementation+3.+Move+common+logic+to+the+abstract+class+4.+Update+subclasses+to+inherit+from+the+abstract+class%3A+%60%60%60java%0D%0Aclass+Car+%7B%0D%0A++++void+drive%28%29+%7B%0D%0A++++++++System.out.println%28%22Driving+a+car%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Truck+extends+Car+%7B%0D%0A++++void+load%28%29+%7B%0D%0A++++++++System.out.println%28%22Loading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++void+unload%28%29+%7B%0D%0A++++++++System.out.println%28%22Unloading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Truck+reuses+driving+method%0D%0A%2F%2F+Overriding+it+would+be+another+code+smell%0D%0A%2F%2F+Violating+Liskov+Substitution+rule%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+Car+%7B%0D%0A++++void+drive%28%29+%7B%0D%0A++++++++System.out.println%28%22Driving+a+car%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Truck+extends+Car+%7B%0D%0A++++void+load%28%29+%7B%0D%0A++++++++System.out.println%28%22Loading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++void+unload%28%29+%7B%0D%0A++++++++System.out.println%28%22Unloading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Truck+reuses+driving+method%0D%0A%2F%2F+Overriding+it+would+be+another+code+smell%0D%0A%2F%2F+Violating+Liskov+Substitution+rule%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+common+behaviors+in+both+classes+2.+Create+an+abstract+class+with+shared+behavior+and+no+implementation+3.+Move+common+logic+to+the+abstract+class+4.+Update+subclasses+to+inherit+from+the+abstract+class%3A+%60%60%60java%0D%0Aclass+Car+%7B%0D%0A++++void+drive%28%29+%7B%0D%0A++++++++System.out.println%28%22Driving+a+car%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Truck+extends+Car+%7B%0D%0A++++void+load%28%29+%7B%0D%0A++++++++System.out.println%28%22Loading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++void+unload%28%29+%7B%0D%0A++++++++System.out.println%28%22Unloading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Truck+reuses+driving+method%0D%0A%2F%2F+Overriding+it+would+be+another+code+smell%0D%0A%2F%2F+Violating+Liskov+Substitution+rule%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+Car+%7B%0D%0A++++void+drive%28%29+%7B%0D%0A++++++++System.out.println%28%22Driving+a+car%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Truck+extends+Car+%7B%0D%0A++++void+load%28%29+%7B%0D%0A++++++++System.out.println%28%22Loading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++void+unload%28%29+%7B%0D%0A++++++++System.out.println%28%22Unloading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Truck+reuses+driving+method%0D%0A%2F%2F+Overriding+it+would+be+another+code+smell%0D%0A%2F%2F+Violating+Liskov+Substitution+rule%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+common+behaviors+in+both+classes+2.+Create+an+abstract+class+with+shared+behavior+and+no+implementation+3.+Move+common+logic+to+the+abstract+class+4.+Update+subclasses+to+inherit+from+the+abstract+class%3A+%60%60%60java%0D%0Aclass+Car+%7B%0D%0A++++void+drive%28%29+%7B%0D%0A++++++++System.out.println%28%22Driving+a+car%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Truck+extends+Car+%7B%0D%0A++++void+load%28%29+%7B%0D%0A++++++++System.out.println%28%22Loading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++void+unload%28%29+%7B%0D%0A++++++++System.out.println%28%22Unloading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Truck+reuses+driving+method%0D%0A%2F%2F+Overriding+it+would+be+another+code+smell%0D%0A%2F%2F+Violating+Liskov+Substitution+rule%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+Car+%7B%0D%0A++++void+drive%28%29+%7B%0D%0A++++++++System.out.println%28%22Driving+a+car%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Truck+extends+Car+%7B%0D%0A++++void+load%28%29+%7B%0D%0A++++++++System.out.println%28%22Loading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++void+unload%28%29+%7B%0D%0A++++++++System.out.println%28%22Unloading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Truck+reuses+driving+method%0D%0A%2F%2F+Overriding+it+would+be+another+code+smell%0D%0A%2F%2F+Violating+Liskov+Substitution+rule%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+common+behaviors+in+both+classes+2.+Create+an+abstract+class+with+shared+behavior+and+no+implementation+3.+Move+common+logic+to+the+abstract+class+4.+Update+subclasses+to+inherit+from+the+abstract+class%3A+%60%60%60java%0D%0Aclass+Car+%7B%0D%0A++++void+drive%28%29+%7B%0D%0A++++++++System.out.println%28%22Driving+a+car%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Truck+extends+Car+%7B%0D%0A++++void+load%28%29+%7B%0D%0A++++++++System.out.println%28%22Loading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%0D%0A++++void+unload%28%29+%7B%0D%0A++++++++System.out.println%28%22Unloading+cargo%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%2F%2F+Truck+reuses+driving+method%0D%0A%2F%2F+Overriding+it+would+be+another+code+smell%0D%0A%2F%2F+Violating+Liskov+Substitution+rule%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Qwen](https://chat.qwen.ai) | [Qwen](https://chat.qwen.ai) | 

# Tags

- Inheritance

# Level 🔋

[X] Intermediate

# Related Refactorings

[Refactoring 013 - Remove Repeated Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20013%20-%20Remove%20Repeated%20Code/readme.md)

# See also

[Refactoring Guru - Extract Superclass](https://refactoring.guru/es/extract-superclass)

# Credits

Image by [Pexels](https://pixabay.com/users/pexels-2286921/) on [Pixabay](https://pixabay.com//)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)