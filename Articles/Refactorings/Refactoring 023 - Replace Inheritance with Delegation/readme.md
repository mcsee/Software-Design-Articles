# Refactoring 023 - Replace Inheritance with Delegation

![Refactoring 023 - Replace Inheritance with Delegation](Refactoring%20023%20-%20Replace%20Inheritance%20with%20Delegation.jpg)

*Transform your rigid inheritance into flexible delegations*

> TL;DR: Replace restrictive inheritance hierarchies with flexible object delegation

# Problems Addressed 🤯

- Liskov substitution violation
- Rigid class hierarchy
- Hidden dependencies
- Tight [Coupling](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md)
- Limited Reusability
- Single Responsibility principle violation

# Related Code Smells 🧑‍💻

[Code Smell 290 - Refused Bequest](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20290%20-%20Refused%20Bequest/readme.md)

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

[Code Smell 66 - Shotgun Surgery](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2066%20-%20Shotgun%20Surgery/readme.md)

[Code Smell 34 - Too Many Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2034%20-%20Too%20Many%20Attributes/readme.md)

[Code Smell 125 - 'IS-A' Relationship](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20125%20-%20'IS-A'%20Relationship/readme.md)

# Steps 🔄

1. Create a temporary field in the subclass for the superclass.
2. Update subclass methods to delegate calls.
3. Add delegation methods for inherited behavior.
4. Remove inheritance and update object creation.

# Sample Code 💻

## Before 🚨

<!-- [Gist Url](https://gist.github.com/mcsee/b7f72099ca800a70513524dc15e6d35a) -->

```javascript
class Chatbot {    
    public void respond(String question) {
        // Here is the logic to answer a question
    }
}

class Robot extends Chatbot {
    // The Physical Robot inherits the logic
    // to answer questions
    // and adds physical behavior
    public void move() {
        System.out.println("Moving...");
    }
    
    public void grab() {
        System.out.println("Grabbing object...");
    }
}
```

## After

<!-- [Gist Url](https://gist.github.com/mcsee/1c053a51c73fea223e6e63c1f2614a60) -->

```java
class Brain {
    public String answer(String question) {
        // The common logic to answer questions
        // is extracted into a different object
        return "Thinking... Answering: " + question;
    }
}

final class Chatbot {    
    private final Brain brain;
    
    Chatbot(Brain brain) {
        this.brain = brain;
    }
    
    public void respond(String question) {
        System.out.println(this.brain.answer(question));
    }
}

final class Robot {
    // 4. Remove inheritance and update object creation.
    private final Brain brain;    
    // 1. Create a temporary field in the subclass for the superclass.
    // private final Chatbot chatbot;  
    
    Robot(Brain brain) {
        this.brain = brain;
        // 2. Update subclass methods to delegate calls.
        // this.chatbot = new Chatbot(brain);
        // This code is removed after step 4
    }
    
    public void move() {
        System.out.println("Moving...");
    }
    
    public void grab() {
        System.out.println("Grabbing object...");
    }
    
    public void respond(String question) {
        // 3. Add delegation methods for inherited behavior.
        // chatbot.respond(question);
        // This code is also removed after step 4 
        System.out.println(this.brain.answer(question));
        // The physical robot can also use it as text-to-speech
    }
}
```

# Type 🛠️

[X] Semi-Automatic

# Safety 🛡️

This refactoring is safe when done carefully and with proper testing.

You should ensure all delegated method signatures match exactly and maintain existing behavior.

The main risk comes from missing methods that need delegation or incorrectly implementing the delegation methods.

# Why is the Code Better? ✨

You gain the flexibility to change implementations at runtime and avoid the pitfalls of inheritance like tight coupling.

# How Does it Improve the Bijection?

This refactoring improves the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between code and reality by better modeling real-world relationships.

A robot doesn't inherit from a brain in the real world - it has a brain.

By replacing inheritance with delegation, you create a more accurate representation of the actual relationship between objects using the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md).

# Limitations ⚠️

The rewriting requires writing additional delegation methods.

If subclass logic relies too much on the superclass, delegation might increase boilerplate.

# Refactor with AI

> Suggested Prompt: 1. Create a temporary field in the subclass for the superclass. 2. Update subclass methods to delegate calls. 3. Add delegation methods for inherited behavior. 4. Remove inheritance and update object creation.

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Chatbot+%7B++++%0D%0A++++public+void+respond%28String+question%29+%7B%0D%0A++++++++%2F%2F+Here+is+the+logic+to+answer+a+question%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Robot+extends+Chatbot+%7B%0D%0A++++%2F%2F+The+Physical+Robot+inherits+the+logic%0D%0A++++%2F%2F+to+answer+questions%0D%0A++++%2F%2F+and+adds+physical+behavior%0D%0A++++public+void+move%28%29+%7B%0D%0A++++++++System.out.println%28%22Moving...%22%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+grab%28%29+%7B%0D%0A++++++++System.out.println%28%22Grabbing+object...%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Create+a+temporary+field+in+the+subclass+for+the+superclass.+2.+Update+subclass+methods+to+delegate+calls.+3.+Add+delegation+methods+for+inherited+behavior.+4.+Remove+inheritance+and+update+object+creation.%3A+%60%60%60javascript%0D%0Aclass+Chatbot+%7B++++%0D%0A++++public+void+respond%28String+question%29+%7B%0D%0A++++++++%2F%2F+Here+is+the+logic+to+answer+a+question%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Robot+extends+Chatbot+%7B%0D%0A++++%2F%2F+The+Physical+Robot+inherits+the+logic%0D%0A++++%2F%2F+to+answer+questions%0D%0A++++%2F%2F+and+adds+physical+behavior%0D%0A++++public+void+move%28%29+%7B%0D%0A++++++++System.out.println%28%22Moving...%22%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+grab%28%29+%7B%0D%0A++++++++System.out.println%28%22Grabbing+object...%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Chatbot+%7B++++%0D%0A++++public+void+respond%28String+question%29+%7B%0D%0A++++++++%2F%2F+Here+is+the+logic+to+answer+a+question%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Robot+extends+Chatbot+%7B%0D%0A++++%2F%2F+The+Physical+Robot+inherits+the+logic%0D%0A++++%2F%2F+to+answer+questions%0D%0A++++%2F%2F+and+adds+physical+behavior%0D%0A++++public+void+move%28%29+%7B%0D%0A++++++++System.out.println%28%22Moving...%22%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+grab%28%29+%7B%0D%0A++++++++System.out.println%28%22Grabbing+object...%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Create+a+temporary+field+in+the+subclass+for+the+superclass.+2.+Update+subclass+methods+to+delegate+calls.+3.+Add+delegation+methods+for+inherited+behavior.+4.+Remove+inheritance+and+update+object+creation.%3A+%60%60%60javascript%0D%0Aclass+Chatbot+%7B++++%0D%0A++++public+void+respond%28String+question%29+%7B%0D%0A++++++++%2F%2F+Here+is+the+logic+to+answer+a+question%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Robot+extends+Chatbot+%7B%0D%0A++++%2F%2F+The+Physical+Robot+inherits+the+logic%0D%0A++++%2F%2F+to+answer+questions%0D%0A++++%2F%2F+and+adds+physical+behavior%0D%0A++++public+void+move%28%29+%7B%0D%0A++++++++System.out.println%28%22Moving...%22%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+grab%28%29+%7B%0D%0A++++++++System.out.println%28%22Grabbing+object...%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Chatbot+%7B++++%0D%0A++++public+void+respond%28String+question%29+%7B%0D%0A++++++++%2F%2F+Here+is+the+logic+to+answer+a+question%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Robot+extends+Chatbot+%7B%0D%0A++++%2F%2F+The+Physical+Robot+inherits+the+logic%0D%0A++++%2F%2F+to+answer+questions%0D%0A++++%2F%2F+and+adds+physical+behavior%0D%0A++++public+void+move%28%29+%7B%0D%0A++++++++System.out.println%28%22Moving...%22%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+grab%28%29+%7B%0D%0A++++++++System.out.println%28%22Grabbing+object...%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Create+a+temporary+field+in+the+subclass+for+the+superclass.+2.+Update+subclass+methods+to+delegate+calls.+3.+Add+delegation+methods+for+inherited+behavior.+4.+Remove+inheritance+and+update+object+creation.%3A+%60%60%60javascript%0D%0Aclass+Chatbot+%7B++++%0D%0A++++public+void+respond%28String+question%29+%7B%0D%0A++++++++%2F%2F+Here+is+the+logic+to+answer+a+question%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Robot+extends+Chatbot+%7B%0D%0A++++%2F%2F+The+Physical+Robot+inherits+the+logic%0D%0A++++%2F%2F+to+answer+questions%0D%0A++++%2F%2F+and+adds+physical+behavior%0D%0A++++public+void+move%28%29+%7B%0D%0A++++++++System.out.println%28%22Moving...%22%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+grab%28%29+%7B%0D%0A++++++++System.out.println%28%22Grabbing+object...%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Aclass+Chatbot+%7B++++%0D%0A++++public+void+respond%28String+question%29+%7B%0D%0A++++++++%2F%2F+Here+is+the+logic+to+answer+a+question%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Robot+extends+Chatbot+%7B%0D%0A++++%2F%2F+The+Physical+Robot+inherits+the+logic%0D%0A++++%2F%2F+to+answer+questions%0D%0A++++%2F%2F+and+adds+physical+behavior%0D%0A++++public+void+move%28%29+%7B%0D%0A++++++++System.out.println%28%22Moving...%22%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+grab%28%29+%7B%0D%0A++++++++System.out.println%28%22Grabbing+object...%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Create+a+temporary+field+in+the+subclass+for+the+superclass.+2.+Update+subclass+methods+to+delegate+calls.+3.+Add+delegation+methods+for+inherited+behavior.+4.+Remove+inheritance+and+update+object+creation.%3A+%60%60%60javascript%0D%0Aclass+Chatbot+%7B++++%0D%0A++++public+void+respond%28String+question%29+%7B%0D%0A++++++++%2F%2F+Here+is+the+logic+to+answer+a+question%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+Robot+extends+Chatbot+%7B%0D%0A++++%2F%2F+The+Physical+Robot+inherits+the+logic%0D%0A++++%2F%2F+to+answer+questions%0D%0A++++%2F%2F+and+adds+physical+behavior%0D%0A++++public+void+move%28%29+%7B%0D%0A++++++++System.out.println%28%22Moving...%22%29%3B%0D%0A++++%7D%0D%0A++++%0D%0A++++public+void+grab%28%29+%7B%0D%0A++++++++System.out.println%28%22Grabbing+object...%22%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Tags 🏷️

- Inheritance

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 007 - Extract Class](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20007%20-%20Extract%20Class/readme.md)

# See also 📚

[Refactoring Guru](https://refactoring.guru/replace-inheritance-with-delegation)

# Credits

Image by [Gerd Altmann](https://pixabay.com/users/geralt-9301/) on [Pixabay](https://pixabay.com/)

* * *

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)