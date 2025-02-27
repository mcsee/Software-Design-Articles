# Code Smell 291 - Mutable Keys

![Code Smell 291 - Mutable Keys](Code%20Smell%20291%20-%20Mutable%20Keys.jpg)

*Changing Keys, Losing Values*

> TL;DR: When you use mutable objects as keys in hashed collections, changing them breaks contracts.

# Problems 😔

- Lost Values
- Hard Debugging
- The Least Surprise Principle Violation
- Unexpected Behavior

# Solutions 😃

1. Use [immutable](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md) objects as keys.
2. Override [equals/hashCode](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20167%20-%20Hashing%20Comparison/readme.md) well.
3. Use final fields (If your language allows it)
4. Rehash after mutation (This is an over-engineering solution)

# Context 💬

When you use mutable objects as keys in [hashed collections](https://en.wikipedia.org/wiki/Hash_table), changing them key after after you add a related objec can make it unretrievable. 

This happens because the hash code changes and the collection can't find the object in the correct bucket.

# Sample Code 📖

## Wrong ❌

<!-- [Gist Url](https://gist.github.com/mcsee/79f635350a20784cfa16a8400b3825f5) -->

```java
class MutableKey {
    int id;

    MutableKey(int newId) {
        this.id = newId;
    }

    @Override
    public int hashCode() {
        return this.id;
    }

    @Override
    public boolean equals(Object objectToCompare) {
        if (this == objectToCompare) return true;
        MutableKey that = (MutableKey) objectToCompare;
        return id == that.id;
    }
}

MutableKey key = new MutableKey(42);
Map<MutableKey, String> map = new HashMap<>();
map.put(key, "Yes Album");

// The key mutates
key.id = 90125;

// Now you cannont retrieve the album
System.out.println(map.get(key)); 

// Output: null
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/f96297b1873fa94e0d8f7068fefbf5cb) -->

```java
class ImmutableKey {
    private final int id;

    ImmutableKey(int newId) {
        this.id = newId;
    }

    @Override
    public int hashCode() {
        return this.id;
    }

    @Override
    public boolean equals(Object objectToCompare) {
        if (this == objectToCompare) return true;
        ImmutableKey that = (ImmutableKey) objectToCompare;
        return id == that.id;
    }
}

ImmutableKey key = new ImmutableKey(42);
Map<ImmutableKey, String> map = new HashMap<>();
map.put(key, "Yes Album");

System.out.println(map.get(key)); 
// Output: Yes Album
```

# Detection 🔍

[X] Semi-Automatic 

You can detect this smell by checking if you use mutable objects as keys in hash-based collections. 

Automated tools like linters or IDE inspections can also flag mutable keys.

# Tags 🏷️

- Mutability

# Level 🔋

[X] Intermediate

# Why the Bijection Is Important 🗺️

The [bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) between the real world and your program is important because it ensures that your objects accurately reflect the relationships they are supposed to represent. 

In the real world, keys are often immutable (e.g., IDs, names). 

When you model these keys as mutable objects, you break the one-to-one correspondence between the real world and your program in the [MAPPER](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md). 

When you break this bijection using mutable keys, you make the map's inconsistent leading to retrieval failures and unexpected behavior.
 
# AI Generation 🤖

AI generators might create this smell if they generate mutable objects as keys without considering the implications. 

This is seldom the case since AI generators suffer from [primitive obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md).

# AI Detection 🥃

AI generators can detect this smell with instructions to analyze the use of mutable objects in hash-based collections and flag potential issues.

You can instruct the AI to look for classes without **final** fields or methods that modify the object's state after creation.

## Try Them! 🛠

*Remember: AI Assistants make lots of mistakes*

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=Solve+the+mutable+key+problem%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=Solve+the+mutable+key+problem%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=Solve+the+mutable+key+problem%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Solve+the+mutable+key+problem%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) | [Gemini](https://gemini.google.com/?q=Solve+the+mutable+key+problem%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) | 
| [DeepSeek](https://chat.deepseek.com/?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) | [DeepSeek](https://chat.deepseek.com/?q=Solve+the+mutable+key+problem%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) | 
| [Meta AI](https://www.meta.ai/chat?q=Correct+and+explain+this+code%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) | [Meta AI](https://www.meta.ai/?q=Solve+the+mutable+key+problem%3A+%60%60%60java%0D%0Aclass+MutableKey+%7B%0D%0A++++int+id%3B%0D%0A%0D%0A++++MutableKey%28int+newId%29+%7B%0D%0A++++++++this.id+%3D+newId%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+int+hashCode%28%29+%7B%0D%0A++++++++return+this.id%3B%0D%0A++++%7D%0D%0A%0D%0A++++%40Override%0D%0A++++public+boolean+equals%28Object+objectToCompare%29+%7B%0D%0A++++++++if+%28this+%3D%3D+objectToCompare%29+return+true%3B%0D%0A++++++++MutableKey+that+%3D+%28MutableKey%29+objectToCompare%3B%0D%0A++++++++return+id+%3D%3D+that.id%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0AMutableKey+key+%3D+new+MutableKey%2842%29%3B%0D%0AMap%3CMutableKey%2C+String%3E+map+%3D+new+HashMap%3C%3E%28%29%3B%0D%0Amap.put%28key%2C+%22Yes+Album%22%29%3B%0D%0A%0D%0A%2F%2F+The+key+mutates%0D%0Akey.id+%3D+90125%3B%0D%0A%0D%0A%2F%2F+Now+you+cannont+retrieve+the+album%0D%0ASystem.out.println%28map.get%28key%29%29%3B+%0D%0A%0D%0A%2F%2F+Output%3A+null%0D%0A%60%60%60) | 

# Conclusion 🏁

When you use mutable objects as keys, you risk breaking the contract between the key's state and hash code. 

Use immutable objects to avoid this issue.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 167 - Hashing Comparison](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20167%20-%20Hashing%20Comparison/readme.md)

[Code Smell 122 - Primitive Obsession](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20122%20-%20Primitive%20Obsession/readme.md)

[Code Smell 116 - Variables Declared With 'var'](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20116%20-%20Variables%20Declared%20With%20'var'/readme.md)

[Code Smell 176 - Changes in Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20176%20-%20Changes%20in%20Essence/readme.md)

[Code Smell 86 - Mutable Const Arrays](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2086%20-%20Mutable%20Const%20Arrays/readme.md)

[Code Smell 127 - Mutable Constants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20127%20-%20Mutable%20Constants/readme.md)

[Code Smell 209 - Side Effects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20209%20-%20Side%20Effects/readme.md)

# More Information 📕

[Wikipedia](https://en.wikipedia.org/wiki/Hash_function)

[The Evil Power of Mutants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20Evil%20Power%20of%20Mutants/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Kathyryn Tripp](https://unsplash.com/@kathyryn_tripp) on [Unsplash](https://unsplash.com/photos/silver-and-black-metal-tool-B7AClhjj6Js)
        
* * *

> The most important property of a program is whether it accomplishes the intention of its user.

_ C.A.R. Hoare_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)