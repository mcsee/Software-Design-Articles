# Code Smell 281 - Hashes

![Code Smell 281 - Hashes](Code%20Smell%20281%20-%20Hashes.jpg)

*When Equals and HashCodes Misbehave*

> TL;DR: Misaligned equals() and hashCode() break collections.

# Problems 😔 

- The least surprise principle violation
- Contract violations  
- [Mutable](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md) key issues  
- Duplicate hash codes  
- Debugging becomes hard  
- Poor hash distribution  

# Solutions 😃

1. Avoid mutable keys  
2. Use effective hashes  
3. Test behavior carefully  
4. Avoid redefining equal and hash
5. Honor the [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) 
 
# Context 💬

When you work with hashed collections like *HashMap* or *HashSet*, you should pay special attention to *equals()* and *hashCode()*. 

A [mismatch](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20167%20-%20Hashing%20Comparison/readme.md) or poor implementation can lead to unpredictable bugs. 

*equals()* method defines logical equality, while *hashCode()* determines an object’s bucket for faster access. 

When these two methods fail to align, collections lose their reliability, leading to poor performance or issues like duplicate entries caused by hash collections.

The best solution is never to override the hash and equals and rely on object identity.

This is what happens in the real world using the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md)).

Whenever you get an external object you need to map it to your bijection correspondence and not create a brand new one.

Once within your controlled system, rely on identity and forget equality issues.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/8a78eb904fa716bd84f2d01143ae959c) -->

```java
class BrokenObject {
    private int value;

    public BrokenObject(int value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object obj) {
        return true; // Always equal
    }

    @Override
    public int hashCode() {
        return super.hashCode(); // Uses default implementation
    }
}
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/feb1a8d1a834c968b101b7b2be4ed735) -->

```java
class FixedObject {
    private final int value;

    public FixedObject(int value) {
        this.value = value;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        FixedObject that = (FixedObject) obj;
        return value == that.value;
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }
}

// This is the best solution

class CleanObject {
    private final int value;

    public FixedObject(int value) {
        this.value = value;
    }

    // - @Override
    // - public boolean equals(Object obj) {}

    // - @Override
    // - public int hashCode() { 
    }
}
```

# Detection 🔍

[X] Semi-Automatic 

Automated linters and IDEs flag issues when you don't properly override *equals()* or *hashCode()*.

# Tags 🏷️

- Premature Optimization

# Level 🔋

[x] Intermediate

# AI Generation 🤖

AI-generated code often missteps when generating *equals()* and *hashCode()*, especially for mutable objects. 

# AI Detection 🥃

AI tools can help fix this smell with minimal guidance.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: correct the hash and equals methods

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+BrokenObject+%7B%0D%0A++++private+int+value%3B%0D%0A%0D%0A++++public+BrokenObject%28int+value%29+%7B%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+obj%29+%7B%0D%0A++++++++return+true%3B+%2F%2F+Always+equal%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+super.hashCode%28%29%3B+%2F%2F+Uses+default+implementation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=correct+the+hash+and+equals+methods%3A+%60%60%60java%0D%0Aclass+BrokenObject+%7B%0D%0A++++private+int+value%3B%0D%0A%0D%0A++++public+BrokenObject%28int+value%29+%7B%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+obj%29+%7B%0D%0A++++++++return+true%3B+%2F%2F+Always+equal%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+super.hashCode%28%29%3B+%2F%2F+Uses+default+implementation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+BrokenObject+%7B%0D%0A++++private+int+value%3B%0D%0A%0D%0A++++public+BrokenObject%28int+value%29+%7B%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+obj%29+%7B%0D%0A++++++++return+true%3B+%2F%2F+Always+equal%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+super.hashCode%28%29%3B+%2F%2F+Uses+default+implementation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=correct+the+hash+and+equals+methods%3A+%60%60%60java%0D%0Aclass+BrokenObject+%7B%0D%0A++++private+int+value%3B%0D%0A%0D%0A++++public+BrokenObject%28int+value%29+%7B%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+obj%29+%7B%0D%0A++++++++return+true%3B+%2F%2F+Always+equal%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+super.hashCode%28%29%3B+%2F%2F+Uses+default+implementation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+BrokenObject+%7B%0D%0A++++private+int+value%3B%0D%0A%0D%0A++++public+BrokenObject%28int+value%29+%7B%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+obj%29+%7B%0D%0A++++++++return+true%3B+%2F%2F+Always+equal%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+super.hashCode%28%29%3B+%2F%2F+Uses+default+implementation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=correct+the+hash+and+equals+methods%3A+%60%60%60java%0D%0Aclass+BrokenObject+%7B%0D%0A++++private+int+value%3B%0D%0A%0D%0A++++public+BrokenObject%28int+value%29+%7B%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+obj%29+%7B%0D%0A++++++++return+true%3B+%2F%2F+Always+equal%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+super.hashCode%28%29%3B+%2F%2F+Uses+default+implementation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+BrokenObject+%7B%0D%0A++++private+int+value%3B%0D%0A%0D%0A++++public+BrokenObject%28int+value%29+%7B%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+obj%29+%7B%0D%0A++++++++return+true%3B+%2F%2F+Always+equal%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+super.hashCode%28%29%3B+%2F%2F+Uses+default+implementation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=correct+the+hash+and+equals+methods%3A+%60%60%60java%0D%0Aclass+BrokenObject+%7B%0D%0A++++private+int+value%3B%0D%0A%0D%0A++++public+BrokenObject%28int+value%29+%7B%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+obj%29+%7B%0D%0A++++++++return+true%3B+%2F%2F+Always+equal%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+super.hashCode%28%29%3B+%2F%2F+Uses+default+implementation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+BrokenObject+%7B%0D%0A++++private+int+value%3B%0D%0A%0D%0A++++public+BrokenObject%28int+value%29+%7B%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+obj%29+%7B%0D%0A++++++++return+true%3B+%2F%2F+Always+equal%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+super.hashCode%28%29%3B+%2F%2F+Uses+default+implementation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=correct+the+hash+and+equals+methods%3A+%60%60%60java%0D%0Aclass+BrokenObject+%7B%0D%0A++++private+int+value%3B%0D%0A%0D%0A++++public+BrokenObject%28int+value%29+%7B%0D%0A++++++++this.value+%3D+value%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+obj%29+%7B%0D%0A++++++++return+true%3B+%2F%2F+Always+equal%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+super.hashCode%28%29%3B+%2F%2F+Uses+default+implementation%0D%0A++++%7D%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# Conclusion 🏁

When you misuse *equals()* or *hashCode()*, collections misbehave. 

Stick to their contracts, use effective hashes, and avoid [mutable keys](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md). 
 
# Relations 👩‍❤️‍💋‍👨

[Code Smell 150 - Equal Comparison](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20150%20-%20Equal%20Comparison/readme.md)

[Code Smell 167 - Hashing Comparison](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20167%20-%20Hashing%20Comparison/readme.md)

[Code Smell 49 - Caches](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2049%20-%20Caches/readme.md)

# More Information 📕

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [frank mckenna](https://unsplash.com/@frankiefoto) on [Unsplash](https://unsplash.com/photos/two-toddlers-standing-in-front-of-white-window-curtain-8-rErfjcr1k)
        
* * *

> Bad programmers worry about the code. Good programmers worry about data structures and their relationships.

_Linus Torvalds_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)