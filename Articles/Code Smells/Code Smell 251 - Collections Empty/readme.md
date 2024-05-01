# Code Smell 251 - Collections Empty
            
![Code Smell 251 - Collections Empty](Code%20Smell%20251%20-%20Collections%20Empty.jpg)

*Do you want to count collections or know if they are empty?*

> TL;DR: Use declarative names. Always

# Problems

- Readability

- [Cache](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2049%20-%20Caches/readme.md) Invalidation

- Performance Penalties

- Type Safety

# Solutions

1. Replace *count() == 0* usages

# Context

*isEmpty()* and *count()==0* seem to be equivalent but have deep differences.

Not only the semantics are more clear, but also skipping this declarative method violating the collection encapsulation might have performance issues.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/8b7f7ec65cf3a60e31a3c31d4477615f)

```java
import java.util.EmptyStackException;
import java.util.Stack;

public class SchrodingerStack<T> {
    private Stack<T> stack;
    private boolean isEmpty;

    public SchrodingerStack() {
        stack = new Stack<>();
        isEmpty = true;
    }

    public void push(T item) {
        stack.push(item);
        isEmpty = false; 
    }

    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }

        T item = stack.pop();
        if (stack.isEmpty()) {
            isEmpty = true;             
        }
        return item;
    }

    public boolean isEmpty() {
        return isEmpty;
        // This has O(1) constant time
    }

    public int size() {
        return stack.size();
        // This has O(n) linear time
        // And the stack muy not be reachable in memory
        // While you wait, the stack isEmpty and notEmpty 
        // at the same time
    }

    public static void main(String[] args) {
        SchrodingerStack<String> stack = new SchrodingerStack<>();

        stack.push("Siamese");
        stack.push("Garfield"); 

        while (!stack.isEmpty()) {
            System.out.println("Popped element: " + stack.pop());
        }

        if (stack.count() == 0 ) {
            // Less readable
            // violating encapsulation
            // and coupled to implementation
            System.out.println("The stack is empty.");
        } else {
            System.out.println("The stack is not empty.");
        }
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/7e789f2e3e6e070e12177182192a62f7)

```java
import java.util.EmptyStackException;
import java.util.Stack;

public class SchrodingerStack<T> {
    private Stack<T> stack;
    private boolean isEmpty;

    public SchrodingerStack() {
        stack = new Stack<>();
        isEmpty = true;
    }

    public void push(T item) {
        stack.push(item);
        isEmpty = false; 
    }

    public T pop() {
        if (isEmpty()) {
            throw new EmptyStackException();
        }

        T item = stack.pop();
        if (stack.isEmpty()) {
            isEmpty = true;             
        }
        return item;
    }

    public boolean isEmpty() {
        return isEmpty;
        // This has O(1) constant time
    }

    public int size() {
        return stack.size();
        // This has O(n) linear time
        // And the stack muy not be reachable in memory
        // While you wait, the stack isEmpty and notEmpty 
        // at the same time
    }

    public static void main(String[] args) {
        SchrodingerStack<String> stack = new SchrodingerStack<>();

        stack.push("Siamese");
        stack.push("Garfield"); 

        while (!stack.isEmpty()) {
            System.out.println("Popped element: " + stack.pop());
        }

        if (stack.isEmpty()) {
            // Semantic operation not violating encapsulation
            System.out.println("The stack is empty.");
        } else {
            System.out.println("The stack is not empty.");
        }
    }
}
```

# Detection

[X] Automatic 

You can check for this expression using syntax abstraction trees

# Tags

- Readability

# Level

[X] Beginner

# AI Generation

LLMs generate abstractions using *empty()* functions

# AI Detection

Gemini detected the problem of using *count() == 0*

# Conclusion

Using *IsEmpty()* is the recommended approach for checking if a collection is empty due to its clarity and potential performance benefits.

# Relations

[Code Smell 233 - Collections Count](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20233%20-%20Collections%20Count/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Valentin Lacoste](https://unsplash.com/@valentinlacoste) on [Unsplash](https://unsplash.com/photos/long-angle-photography-of-tunnel-jNSJE8dMro0)
    
* * *

> Good programming is good writing.

_John Shore_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)