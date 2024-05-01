# Code Smell 228 - Multiple Classes per File
            
![Code Smell 228 - Multiple Classes per File](Code%20Smell%20228%20-%20Multiple%20Classes%20per%20File.jpg)

*More than one class is a mess*

> TL;DR: Follow the separation of concerns principle and file organization

# Problems

- Code Organization

- Coupling

- Autoloading problems

- Debugging

- Version control and merge conflicts

# Solutions

1. Declare a single class per file

2. Use name scoping

# Context

In languages that declare classes using a file system, having one class per file is generally considered a best practice. 

This approach helps improve code organization and maintainability and reduces potential issues. 

You can organize namespaces into separate directories within your project structure. 

This way, you can maintain a logical and efficient codebase while avoiding the issues of declaring multiple classes in a single file.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/ac8b6a8e3680a3083b1a74419973b12a)

```php
<?

namespace MyNamespace;

class Class1 {
    public function sayHello() {
        echo "Hello from Class1!\n";
    }
}

class Class2 {
    public function sayHello() {
        echo "Hello from Class2!\n";
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/4b950a826ccb43b3309fa11a0cee13bd)

```php
<?

namespace MyNamespace;

class Class1 {
    public function sayHello() {
        echo "Hello from Class1!\n";
    }
}
```

[Gist Url]: # (https://gist.github.com/mcsee/e55306d421eb33c7f70ddb77869f0ba2)

```php
<?

namespace MyNamespace;

class Class2 {
    public function sayHello() {
        echo "Hello from Class2!\n";
    }
}
```

# Detection

[X] Automatic 

Many standards enforce this rule

# Tags

- Coupling

# Conclusion

Keep your code organized and follow known standards

# Relations

[Code Smell 48 - Code Without Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

# More Info

[Wikipedia Namespaces](https://en.wikipedia.org/wiki/Namespace)

[Sonar Source](https://rules.sonarsource.com/java/RSPEC-1996/)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Marjan Blan](https://unsplash.com/@marjan_blan) on [Unsplash](https://unsplash.com/photos/jZrundu19Hw)
    
* * *

> Without requirements or design, programming is the art of adding bugs to an empty text file.

_Louis Srygley_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)