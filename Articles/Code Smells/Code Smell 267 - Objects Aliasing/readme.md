# Code Smell 267 - Objects Aliasing

![Code Smell 267 - Objects Aliasing](Code%20Smell%20267%20-%20Objects%20Aliasing.jpg)

*Favor immutability to retain control of your objects*

> TL;DR: Use immutable objects to prevent unexpected changes caused by aliasing.

# Problems

- Unexpected [mutations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)
- Difficult bug tracking
- Unpredictable code behavior
- Reduced code predictability
- Increased coupling
- Compromised thread safety

# Solutions

1. Use immutable objects
2. Implement defensive copying
3. Favor functional programming

# Refactorings

[Refactoring 008 - Convert Variables to Constant](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20008%20-%20Convert%20Variables%20to%20Constant/readme.md)

# Context

Aliasing happens when multiple references point to the same mutable object. 

This can lead to unexpected changes in them when one part of the code modifies the object, affecting all references. 

Immutable objects mitigate this risk by ensuring you cannot change their internal representation once you create an object.

[Collection Aliasing](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20266%20-%20Collection%20Aliasing/readme.md) is a notable example of this issue.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/5c5d78c37c8a02a76f5016a1d9cce5b9) -->

```java
public class Person {
  private String name; 
}

public void modifyPerson(Person person) {
  person.setName("Cosmo Kramer");
}

public static void main(String[] args) {
  Person p1 = new Person("Newman");
  Person p2 = p1; // p1 and p2 refer to the same object

  modifyPerson(p1);

  System.out.println(p1.name()); // Output: Cosmo Kramer
  System.out.println(p2.name()); // Output: Cosmo Kramer (unexpected)
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/a2f26976d78ac14d239005c1a351cd4e) -->

```java
public class ImmutablePerson {
  private final String name; 

  public ImmutablePerson(String name) {
    this.name = name; 
  } 
}

public ImmutablePerson withName(String newName) {
    return new ImmutablePerson(newName);
}

public static void main(String[] args) {
  ImmutablePerson p1 = new ImmutablePerson("Newman");
  ImmutablePerson p2 = p1; // p1 and p2 refer to the same object

  // Modifying p1 creates a new object
  ImmutablePerson p3 = p1.withName("Cosmo Kramer");
  // but this is a bad practice 
  // since only constructors should create new objects
  // A better option is
  ImmutablePerson p3 = new ImmutablePerson("Cosmo Kramer");

  System.out.println(p1.name()); // Output: Newman
  System.out.println(p2.name()); // Output: Newman
  System.out.println(p3.name()); // Output: Cosmo Kramer
}
```

# Detection

[X] Semi-Automatic 

You can detect this smell by reviewing your code for mutable objects shared across different parts of your program.

# Tags

- Mutability

# Level

[x] Intermediate

# AI Generation

AI generators might introduce this smell if they're not specifically trained to prioritize immutability and avoid aliasing issues.

# AI Detection

AI detectors identify this smell by analyzing code for mutable shared objects and suggesting immutable alternatives. 

They need specific instructions on the context and the importance of immutability in the codebase.

## Try Them!

*Remember AI Assistants make lots of mistakes*

> Suggested Prompt: Remove object aliasing

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Person+%7B%0D%0A++private+String+name%3B+%0D%0A%7D%0D%0A%0D%0Apublic+void+modifyPerson%28Person+person%29+%7B%0D%0A++person.setName%28%22Cosmo+Kramer%22%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+static+void+main%28String%5B%5D+args%29+%7B%0D%0A++Person+p1+%3D+new+Person%28%22Newman%22%29%3B%0D%0A++Person+p2+%3D+p1%3B+%2F%2F+p1+and+p2+refer+to+the+same+object%0D%0A%0D%0A++modifyPerson%28p1%29%3B%0D%0A%0D%0A++System.out.println%28p1.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer%0D%0A++System.out.println%28p2.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer+%28unexpected%29%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Remove+object+aliasing%3A+%60%60%60java%0D%0Apublic+class+Person+%7B%0D%0A++private+String+name%3B+%0D%0A%7D%0D%0A%0D%0Apublic+void+modifyPerson%28Person+person%29+%7B%0D%0A++person.setName%28%22Cosmo+Kramer%22%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+static+void+main%28String%5B%5D+args%29+%7B%0D%0A++Person+p1+%3D+new+Person%28%22Newman%22%29%3B%0D%0A++Person+p2+%3D+p1%3B+%2F%2F+p1+and+p2+refer+to+the+same+object%0D%0A%0D%0A++modifyPerson%28p1%29%3B%0D%0A%0D%0A++System.out.println%28p1.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer%0D%0A++System.out.println%28p2.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer+%28unexpected%29%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Person+%7B%0D%0A++private+String+name%3B+%0D%0A%7D%0D%0A%0D%0Apublic+void+modifyPerson%28Person+person%29+%7B%0D%0A++person.setName%28%22Cosmo+Kramer%22%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+static+void+main%28String%5B%5D+args%29+%7B%0D%0A++Person+p1+%3D+new+Person%28%22Newman%22%29%3B%0D%0A++Person+p2+%3D+p1%3B+%2F%2F+p1+and+p2+refer+to+the+same+object%0D%0A%0D%0A++modifyPerson%28p1%29%3B%0D%0A%0D%0A++System.out.println%28p1.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer%0D%0A++System.out.println%28p2.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer+%28unexpected%29%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Remove+object+aliasing%3A+%60%60%60java%0D%0Apublic+class+Person+%7B%0D%0A++private+String+name%3B+%0D%0A%7D%0D%0A%0D%0Apublic+void+modifyPerson%28Person+person%29+%7B%0D%0A++person.setName%28%22Cosmo+Kramer%22%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+static+void+main%28String%5B%5D+args%29+%7B%0D%0A++Person+p1+%3D+new+Person%28%22Newman%22%29%3B%0D%0A++Person+p2+%3D+p1%3B+%2F%2F+p1+and+p2+refer+to+the+same+object%0D%0A%0D%0A++modifyPerson%28p1%29%3B%0D%0A%0D%0A++System.out.println%28p1.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer%0D%0A++System.out.println%28p2.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer+%28unexpected%29%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Person+%7B%0D%0A++private+String+name%3B+%0D%0A%7D%0D%0A%0D%0Apublic+void+modifyPerson%28Person+person%29+%7B%0D%0A++person.setName%28%22Cosmo+Kramer%22%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+static+void+main%28String%5B%5D+args%29+%7B%0D%0A++Person+p1+%3D+new+Person%28%22Newman%22%29%3B%0D%0A++Person+p2+%3D+p1%3B+%2F%2F+p1+and+p2+refer+to+the+same+object%0D%0A%0D%0A++modifyPerson%28p1%29%3B%0D%0A%0D%0A++System.out.println%28p1.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer%0D%0A++System.out.println%28p2.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer+%28unexpected%29%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Remove+object+aliasing%3A+%60%60%60java%0D%0Apublic+class+Person+%7B%0D%0A++private+String+name%3B+%0D%0A%7D%0D%0A%0D%0Apublic+void+modifyPerson%28Person+person%29+%7B%0D%0A++person.setName%28%22Cosmo+Kramer%22%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+static+void+main%28String%5B%5D+args%29+%7B%0D%0A++Person+p1+%3D+new+Person%28%22Newman%22%29%3B%0D%0A++Person+p2+%3D+p1%3B+%2F%2F+p1+and+p2+refer+to+the+same+object%0D%0A%0D%0A++modifyPerson%28p1%29%3B%0D%0A%0D%0A++System.out.println%28p1.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer%0D%0A++System.out.println%28p2.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer+%28unexpected%29%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Apublic+class+Person+%7B%0D%0A++private+String+name%3B+%0D%0A%7D%0D%0A%0D%0Apublic+void+modifyPerson%28Person+person%29+%7B%0D%0A++person.setName%28%22Cosmo+Kramer%22%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+static+void+main%28String%5B%5D+args%29+%7B%0D%0A++Person+p1+%3D+new+Person%28%22Newman%22%29%3B%0D%0A++Person+p2+%3D+p1%3B+%2F%2F+p1+and+p2+refer+to+the+same+object%0D%0A%0D%0A++modifyPerson%28p1%29%3B%0D%0A%0D%0A++System.out.println%28p1.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer%0D%0A++System.out.println%28p2.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer+%28unexpected%29%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Remove+object+aliasing%3A+%60%60%60java%0D%0Apublic+class+Person+%7B%0D%0A++private+String+name%3B+%0D%0A%7D%0D%0A%0D%0Apublic+void+modifyPerson%28Person+person%29+%7B%0D%0A++person.setName%28%22Cosmo+Kramer%22%29%3B%0D%0A%7D%0D%0A%0D%0Apublic+static+void+main%28String%5B%5D+args%29+%7B%0D%0A++Person+p1+%3D+new+Person%28%22Newman%22%29%3B%0D%0A++Person+p2+%3D+p1%3B+%2F%2F+p1+and+p2+refer+to+the+same+object%0D%0A%0D%0A++modifyPerson%28p1%29%3B%0D%0A%0D%0A++System.out.println%28p1.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer%0D%0A++System.out.println%28p2.name%28%29%29%3B+%2F%2F+Output%3A+Cosmo+Kramer+%28unexpected%29%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion

Using immutable objects and avoiding aliasing can significantly improve your code's predictability, reduces bugs, and improves thread safety. 

It requires a shift in thinking and the benefits of immutability far outweigh the initial learning curve.

# Relations

[Code Smell 176 - Changes in Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20176%20-%20Changes%20in%20Essence/readme.md)

[Code Smell 127 - Mutable Constants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20127%20-%20Mutable%20Constants/readme.md)

[Code Smell 266 - Collection Aliasing](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20266%20-%20Collection%20Aliasing/readme.md)

# More Info

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Natural Photos](https://unsplash.com/@naturalphotos08) on [Unsplash](https://unsplash.com/photos/a-man-standing-in-front-of-a-display-of-key-chains-eWXLPRjaoRk)  
  
* * *

> Immutability changes everything.

_Pat Helland_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)