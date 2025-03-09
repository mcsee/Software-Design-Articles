# Code Smell 286 - Overlapping Methods

![Code Smell 286 - Overlapping Methods](Code%20Smell%20286%20-%20Overlapping%20Methods.jpg)

*When parent and child methods collide*

> TL;DR: Avoid using private methods in parent classes with names that child classes can use.

# Problems

- The least surprise principle violation

- Unexpected behavior and [defects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quality/Stop%20Calling%20them%20'Bugs'/readme.md)

- Hidden dependencies

- Limited extensibility

- Code ambiguity

- Open/Closed principle violation

- [Misleading design](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2058%20-%20Yo-yo%20Problem/readme.md)

# Solutions

1. Avoid [hierarchies](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20137%20-%20Inheritance%20Tree%20Too%20Deep/readme.md)
2. Rename private methods
3. Maintain clear naming
4. Avoid overlapping names
5. Avoid [protected methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2037%20-%20Protected%20Attributes/readme.md)
6. Subclass for [essential relations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20125%20-%20'IS-A'%20Relationship/readme.md), not to [reuse code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

# Context

When you use the same method name in parent and child classes, you create confusion.

A private method in the parent class cannot be overridden even if a public method with the same name exists in the child class. 

This is a problem most static languages have in their design

This disconnect leads to bugs and makes your code hard to maintain.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/997cf467a1cd6ba3bfc8975b59ffb254) -->

```php
<?

class ParentClass {
    private function greet() {
        // This method is private
        return "Hello from ParentClass";
    }

    public function callGreet() {
        return $this->greet();
    }
}

class ChildClass extends ParentClass {
    public function greet() {
        // Overriding a concrete method is a code smell
        // Compilers SHOULD warn you
        return "Hello from ChildClass";
    }
}

$child = new ChildClass();
echo $child->callGreet();

// When callGreet() is invoked on the $child object,
// it executes the following:
// It calls $this->greet(), 
// which refers to the greet() method of ParentClass 
// because the original method is private 
// and cannot be overridden or accessed from ChildClass.

// The unexpected output is 'Hello from ParentClass'
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/e1c8f52682b976200218c825430f9bac) -->

```php
<?

class ParentClass {
    protected function greet() {
        // notice the 'protected qualifier'
        return "Hello from ParentClass";
    }

    public function callGreet() {
        return $this->greet();
    }
}

class ChildClass extends ParentClass {
    public function greet() {
        return "Hello from ChildClass";
    }
}

$child = new ChildClass();
echo $child->callGreet();

// The output is "Hello from ChildClass"
// This is the standard (and wrong) solution
// Also fixed by most AIs
```

<!-- [Gist Url](https://gist.github.com/mcsee/002f5db2e8b139b15c2d2339da42bda0) -->

```php
<?

abstract class ParentClass {
    // Declare greet() as an abstract method
    // Following the template-method design pattern
    abstract protected function greet();

    public function callGreet() {
        return $this->greet();
    }
}

class ChildClass extends ParentClass {
    protected function greet() {
        return "Hello from ChildClass";
    }
}

class OtherChild extends ParentClass {
    protected function greet() {
        return "Hello from OtherChild";
    }
}

$child = new ChildClass();
echo $child->callGreet(); // Output: Hello from ChildClass

$otherChild = new OtherChild();
echo $otherChild->callGreet(); // Output: Hello from OtherChild
```

# Detection

[X] Semi-Automatic 

You can detect this smell by looking for private methods in parent classes and checking if child classes define methods with the same name.

You must also test parent methods calling private methods.
 
# Tags

- Hierarchy

# Level

[X] Intermediate

# Why the Bijection Is Important 

Clear and predictable code should reflect the [real-world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) hierarchy it models.

When you use private methods with overlapping names, you create a [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) gap between the model and the implementation. 

This gap confuses developers, increases defects, and violates clean code principles.

# AI Generation

AI generators often create this smell when they generate boilerplate parent-child relationships. 

They might not check access levels or consider inheritance implications.

# AI Detection

AI tools can fix this smell with clear instructions.

You can ask the AI to check for overlapping method names and refactor hierarchies.

## Try Them!

*Remember: AI Assistants make lots of mistakes*

> Suggested Prompt: correct the override problem

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+ParentClass+%7B%0D%0A++++private+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+This+method+is+private%0D%0A++++++++return+%22Hello+from+ParentClass%22%3B%0D%0A++++%7D%0D%0A%0D%0A++++public+function+callGreet%28%29+%7B%0D%0A++++++++return+%24this-%3Egreet%28%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+ChildClass+extends+ParentClass+%7B%0D%0A++++public+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+Overriding+a+concrete+method+is+a+code+smell%0D%0A++++++++%2F%2F+Compilers+SHOULD+warn+you%0D%0A++++++++return+%22Hello+from+ChildClass%22%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%24child+%3D+new+ChildClass%28%29%3B%0D%0Aecho+%24child-%3EcallGreet%28%29%3B%0D%0A%0D%0A%2F%2F+When+callGreet%28%29+is+invoked+on+the+%24child+object%2C%0D%0A%2F%2F+it+executes+the+following%3A%0D%0A%2F%2F+It+calls+%24this-%3Egreet%28%29%2C+%0D%0A%2F%2F+which+refers+to+the+greet%28%29+method+of+ParentClass+%0D%0A%2F%2F+because+the+original+method+is+private+%0D%0A%2F%2F+and+cannot+be+overridden+or+accessed+from+ChildClass.%0D%0A%0D%0A%2F%2F+The+unexpected+output+is+%27Hello+from+ParentClass%27%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=correct+the+override+problem%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+ParentClass+%7B%0D%0A++++private+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+This+method+is+private%0D%0A++++++++return+%22Hello+from+ParentClass%22%3B%0D%0A++++%7D%0D%0A%0D%0A++++public+function+callGreet%28%29+%7B%0D%0A++++++++return+%24this-%3Egreet%28%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+ChildClass+extends+ParentClass+%7B%0D%0A++++public+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+Overriding+a+concrete+method+is+a+code+smell%0D%0A++++++++%2F%2F+Compilers+SHOULD+warn+you%0D%0A++++++++return+%22Hello+from+ChildClass%22%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%24child+%3D+new+ChildClass%28%29%3B%0D%0Aecho+%24child-%3EcallGreet%28%29%3B%0D%0A%0D%0A%2F%2F+When+callGreet%28%29+is+invoked+on+the+%24child+object%2C%0D%0A%2F%2F+it+executes+the+following%3A%0D%0A%2F%2F+It+calls+%24this-%3Egreet%28%29%2C+%0D%0A%2F%2F+which+refers+to+the+greet%28%29+method+of+ParentClass+%0D%0A%2F%2F+because+the+original+method+is+private+%0D%0A%2F%2F+and+cannot+be+overridden+or+accessed+from+ChildClass.%0D%0A%0D%0A%2F%2F+The+unexpected+output+is+%27Hello+from+ParentClass%27%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+ParentClass+%7B%0D%0A++++private+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+This+method+is+private%0D%0A++++++++return+%22Hello+from+ParentClass%22%3B%0D%0A++++%7D%0D%0A%0D%0A++++public+function+callGreet%28%29+%7B%0D%0A++++++++return+%24this-%3Egreet%28%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+ChildClass+extends+ParentClass+%7B%0D%0A++++public+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+Overriding+a+concrete+method+is+a+code+smell%0D%0A++++++++%2F%2F+Compilers+SHOULD+warn+you%0D%0A++++++++return+%22Hello+from+ChildClass%22%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%24child+%3D+new+ChildClass%28%29%3B%0D%0Aecho+%24child-%3EcallGreet%28%29%3B%0D%0A%0D%0A%2F%2F+When+callGreet%28%29+is+invoked+on+the+%24child+object%2C%0D%0A%2F%2F+it+executes+the+following%3A%0D%0A%2F%2F+It+calls+%24this-%3Egreet%28%29%2C+%0D%0A%2F%2F+which+refers+to+the+greet%28%29+method+of+ParentClass+%0D%0A%2F%2F+because+the+original+method+is+private+%0D%0A%2F%2F+and+cannot+be+overridden+or+accessed+from+ChildClass.%0D%0A%0D%0A%2F%2F+The+unexpected+output+is+%27Hello+from+ParentClass%27%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=correct+the+override+problem%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+ParentClass+%7B%0D%0A++++private+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+This+method+is+private%0D%0A++++++++return+%22Hello+from+ParentClass%22%3B%0D%0A++++%7D%0D%0A%0D%0A++++public+function+callGreet%28%29+%7B%0D%0A++++++++return+%24this-%3Egreet%28%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+ChildClass+extends+ParentClass+%7B%0D%0A++++public+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+Overriding+a+concrete+method+is+a+code+smell%0D%0A++++++++%2F%2F+Compilers+SHOULD+warn+you%0D%0A++++++++return+%22Hello+from+ChildClass%22%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%24child+%3D+new+ChildClass%28%29%3B%0D%0Aecho+%24child-%3EcallGreet%28%29%3B%0D%0A%0D%0A%2F%2F+When+callGreet%28%29+is+invoked+on+the+%24child+object%2C%0D%0A%2F%2F+it+executes+the+following%3A%0D%0A%2F%2F+It+calls+%24this-%3Egreet%28%29%2C+%0D%0A%2F%2F+which+refers+to+the+greet%28%29+method+of+ParentClass+%0D%0A%2F%2F+because+the+original+method+is+private+%0D%0A%2F%2F+and+cannot+be+overridden+or+accessed+from+ChildClass.%0D%0A%0D%0A%2F%2F+The+unexpected+output+is+%27Hello+from+ParentClass%27%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+ParentClass+%7B%0D%0A++++private+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+This+method+is+private%0D%0A++++++++return+%22Hello+from+ParentClass%22%3B%0D%0A++++%7D%0D%0A%0D%0A++++public+function+callGreet%28%29+%7B%0D%0A++++++++return+%24this-%3Egreet%28%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+ChildClass+extends+ParentClass+%7B%0D%0A++++public+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+Overriding+a+concrete+method+is+a+code+smell%0D%0A++++++++%2F%2F+Compilers+SHOULD+warn+you%0D%0A++++++++return+%22Hello+from+ChildClass%22%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%24child+%3D+new+ChildClass%28%29%3B%0D%0Aecho+%24child-%3EcallGreet%28%29%3B%0D%0A%0D%0A%2F%2F+When+callGreet%28%29+is+invoked+on+the+%24child+object%2C%0D%0A%2F%2F+it+executes+the+following%3A%0D%0A%2F%2F+It+calls+%24this-%3Egreet%28%29%2C+%0D%0A%2F%2F+which+refers+to+the+greet%28%29+method+of+ParentClass+%0D%0A%2F%2F+because+the+original+method+is+private+%0D%0A%2F%2F+and+cannot+be+overridden+or+accessed+from+ChildClass.%0D%0A%0D%0A%2F%2F+The+unexpected+output+is+%27Hello+from+ParentClass%27%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=correct+the+override+problem%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+ParentClass+%7B%0D%0A++++private+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+This+method+is+private%0D%0A++++++++return+%22Hello+from+ParentClass%22%3B%0D%0A++++%7D%0D%0A%0D%0A++++public+function+callGreet%28%29+%7B%0D%0A++++++++return+%24this-%3Egreet%28%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+ChildClass+extends+ParentClass+%7B%0D%0A++++public+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+Overriding+a+concrete+method+is+a+code+smell%0D%0A++++++++%2F%2F+Compilers+SHOULD+warn+you%0D%0A++++++++return+%22Hello+from+ChildClass%22%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%24child+%3D+new+ChildClass%28%29%3B%0D%0Aecho+%24child-%3EcallGreet%28%29%3B%0D%0A%0D%0A%2F%2F+When+callGreet%28%29+is+invoked+on+the+%24child+object%2C%0D%0A%2F%2F+it+executes+the+following%3A%0D%0A%2F%2F+It+calls+%24this-%3Egreet%28%29%2C+%0D%0A%2F%2F+which+refers+to+the+greet%28%29+method+of+ParentClass+%0D%0A%2F%2F+because+the+original+method+is+private+%0D%0A%2F%2F+and+cannot+be+overridden+or+accessed+from+ChildClass.%0D%0A%0D%0A%2F%2F+The+unexpected+output+is+%27Hello+from+ParentClass%27%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+ParentClass+%7B%0D%0A++++private+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+This+method+is+private%0D%0A++++++++return+%22Hello+from+ParentClass%22%3B%0D%0A++++%7D%0D%0A%0D%0A++++public+function+callGreet%28%29+%7B%0D%0A++++++++return+%24this-%3Egreet%28%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+ChildClass+extends+ParentClass+%7B%0D%0A++++public+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+Overriding+a+concrete+method+is+a+code+smell%0D%0A++++++++%2F%2F+Compilers+SHOULD+warn+you%0D%0A++++++++return+%22Hello+from+ChildClass%22%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%24child+%3D+new+ChildClass%28%29%3B%0D%0Aecho+%24child-%3EcallGreet%28%29%3B%0D%0A%0D%0A%2F%2F+When+callGreet%28%29+is+invoked+on+the+%24child+object%2C%0D%0A%2F%2F+it+executes+the+following%3A%0D%0A%2F%2F+It+calls+%24this-%3Egreet%28%29%2C+%0D%0A%2F%2F+which+refers+to+the+greet%28%29+method+of+ParentClass+%0D%0A%2F%2F+because+the+original+method+is+private+%0D%0A%2F%2F+and+cannot+be+overridden+or+accessed+from+ChildClass.%0D%0A%0D%0A%2F%2F+The+unexpected+output+is+%27Hello+from+ParentClass%27%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=correct+the+override+problem%3A+%60%60%60php%0D%0A%3C%3F%0D%0A%0D%0Aclass+ParentClass+%7B%0D%0A++++private+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+This+method+is+private%0D%0A++++++++return+%22Hello+from+ParentClass%22%3B%0D%0A++++%7D%0D%0A%0D%0A++++public+function+callGreet%28%29+%7B%0D%0A++++++++return+%24this-%3Egreet%28%29%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0Aclass+ChildClass+extends+ParentClass+%7B%0D%0A++++public+function+greet%28%29+%7B%0D%0A++++++++%2F%2F+Overriding+a+concrete+method+is+a+code+smell%0D%0A++++++++%2F%2F+Compilers+SHOULD+warn+you%0D%0A++++++++return+%22Hello+from+ChildClass%22%3B%0D%0A++++%7D%0D%0A%7D%0D%0A%0D%0A%24child+%3D+new+ChildClass%28%29%3B%0D%0Aecho+%24child-%3EcallGreet%28%29%3B%0D%0A%0D%0A%2F%2F+When+callGreet%28%29+is+invoked+on+the+%24child+object%2C%0D%0A%2F%2F+it+executes+the+following%3A%0D%0A%2F%2F+It+calls+%24this-%3Egreet%28%29%2C+%0D%0A%2F%2F+which+refers+to+the+greet%28%29+method+of+ParentClass+%0D%0A%2F%2F+because+the+original+method+is+private+%0D%0A%2F%2F+and+cannot+be+overridden+or+accessed+from+ChildClass.%0D%0A%0D%0A%2F%2F+The+unexpected+output+is+%27Hello+from+ParentClass%27%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Qwen](https://chat.qwen.ai) | [Qwen](https://chat.qwen.ai) | 

# Conclusion

When designing parent and child classes, you should use methods that clearly define inheritance and accessibility. 

Avoid private methods that overlap with child methods.

This keeps your code readable, extensible, and aligned with clean code principles.

Languages like *Python* allow you to override parent methods regardless of their names, while *Java* strictly enforces access levels. 

*C#* behaves similarly to *Java*. 

These differences mean you need to understand the specific rules of the language you are working with to avoid unexpected behavior.

# Relations

[Code Smell 137 - Inheritance Tree Too Deep](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20137%20-%20Inheritance%20Tree%20Too%20Deep/readme.md)

[Code Smell 58 - Yo-yo Problem](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2058%20-%20Yo-yo%20Problem/readme.md)

[Code Smell 11 - Subclassification for Code Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2011%20-%20Subclassification%20for%20Code%20Reuse/readme.md)

[Code Smell 125 - 'IS-A' Relationship](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20125%20-%20'IS-A'%20Relationship/readme.md)

[Code Smell 37 - Protected Attributes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2037%20-%20Protected%20Attributes/readme.md)
 
# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Matt Artz](https://unsplash.com/@mattart) on [Unsplash](https://unsplash.com/photos/grayscale-of-seashell-against-black-background-h1AEAnu93P4)
        
* * *

> Inheritance is good, but you should never forget that it introduces tight coupling.

_Robert C. Martin_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)