# Code Smell 56 - Preprocessors

![Code Smell 56 - Preprocessors](cdc-CMhVRKI6vSY-unsplash.jpg)

*We want our code to behave different on different environments, operating systems, so taking decisions at compile time is the best decision, isn't it?.*

# Problems

- Readability

- Premature Optimization
 
- Unnecessary complexity

- Debugging

# Solutions

1. Remove all compiler directives.

2. If you want different behavior, model it with objects

3. If you think there's a performance penalty, make a serious benchmark instead of doing premature optimization.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/b9945cd67cc06de97cffe8edb114862c)
```c
#if VERBOSE >= 2
  printf("trace message");
#endif
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/717c0b451c159315180c56fb0849419c)
```c
if (runtimeEnvironment->traceDebug()) {
  printf("trace message");
}

## even better with polymorphism and we avoid annoying ifs

runtimeEnvironment->traceDebug("trace message");

```

# Detection

This is a syntactic directive promoted by several languages, therefore it is easy to detect and replace with real behavior.

# Tags

- Compilers

- Metaprogramming

# Conclusion

Adding an extra layer of complexity makes debugging very difficult. This technique was used when memory and CPU were scarce. Nowadays, we need clean code and we must leave premature optimization buried in the past.

Bjarne Stroustrup, in his book *The Design and Evolution of C++*, regrets on the pre-processor directives he created years before.
 
# Relations

[Code Smell 20 - Premature Optimization](Code Smells\Code Smell 20 - Premature Optimization)

# More info

[Laziness I - Metaprogramming](Theory\Laziness I - Metaprogramming)
 
[C++Faq](http://www.parashift.com/c++-faq-lite/newbie.html#faq-29.8)

[C Preprocessor](https://en.wikipedia.org/wiki/C_preprocessor)

[#ifdef Considered Harmful](https://www.usenix.org/legacy/publications/library/proceedings/sa92/spencer.pdf)

# Credits

<span>Photo by [CDC](https://unsplash.com/@cdc) on [Unsplash](https://unsplash.com/s/photos/customs)</span>

* * *

>  C++ is designed to allow you to express ideas, but if you don't have ideas or don't have any clue about how to express them, C++ doesn't offer much help.

_Bjarne Stroustrup_
  
* * *
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()