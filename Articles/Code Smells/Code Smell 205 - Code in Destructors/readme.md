# Code Smell 205 - Code in Destructors
            
![Code Smell 205 - Code in Destructors](Code%20Smell%20205%20-%20Code%20in%20Destructors.jpg)

*You deallocate things in your destructors*

> TL;DR: Don't use destructors. And don't write functional code there.

# Problems

- Coupling

- Unexpected results

- Memory leaks

# Solutions

1. Don't use destructors. 

2. Follow the Rule of Zero

3. Let the Garbage Collector work for you

# Context

A class destructor is a special method that is called when an object is destroyed or goes out of scope.  

In the past, we had no garbage collectors and destructors were responsible for cleaning up any resources that the object has acquired during its lifetime, such as closing open files or releasing memory allocated on the heap.

Nowadays, object destruction is automatic in most modern programming languages. 

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/73df39bf0fcbf9537ed210cf367daac6)
```cpp
class File {
public:
    File(const std::string& filename) {
        file_ = fopen(filename.c_str(), "r");
    }
    
    ~File() {
        if (file_) {
            fclose(file_);
        }
    }
    
private:
    FILE* file_;
};

```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/a0423d39f6b1310dadb049e4188f5fc5)
```cpp
class File {
public:
    File() : file_(nullptr) {}
    
    bool Open(const std::string& filename) {
        if (file_) {
            fclose(file_);
        }
        file_ = fopen(filename.c_str(), "r");
        return (file_ != nullptr);
    }
    
    bool IsOpen() const {
        return (file_ != nullptr);
    }
    
    void Close() {
        if (file_) {
            fclose(file_);
            file_ = nullptr;
        }
    }
    
    ~File() {
        // Instead of closing the file we throw an exception 
        // If it is open (which is an invalid scenario)
        if (file_) {
            throw std::logic_error("File is still open in destructor");
        }
    }
    
private:
    FILE* file_;
};

```

# Detection

[X] Automatic 

Linters can warn us when we write code in destructors

# Exceptions

In very critical low-level code we cannot afford a garbage collector. 

Exceptions are very few. 

In other cases writing code in destructors is a symptom of premature optimization.

# Tags

- Premature Optimization

# Conclusion

Writting code in destructors is a sign of sloppiness and laziness. 

We need to understand the life cycle of our objects and manage the events accurately.

# Relations

[Code Smell 142 - Queries in Constructors](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20142%20-%20Queries%20in%20Constructors/readme.md)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Crawford Jolly](https://unsplash.com/@crawford) on [Unsplash](https://unsplash.com/photos/-YIf-1h_g1E)
  
* * *

> The most likely way for the world to be destroyed, most experts agree, is by accident. That's where we come in; we're computer professionals. We cause accidents.

_Nathaniel S. Borenstein_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)