# Code Smell 96 - My Objects

![Code Smell 96 - My Objects](michal-bozek-Cl2DhalcsO0-unsplash.jpg)

*You don't own objects.*

> TL;DR: don't use *my* as a name prefix.

# Problems

- Lack of context

- Bijection Fault

# Solutions

1. Remove *my* prefix. 

2. Change to a role suggesting name.

# Context

Several old tutorials use the word 'my' as a lazy name. 
This is vague and lead to context mistakes.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/5c9ab47e5af40a643dee30ace2b57a93)
```csharp
MainWindow myWindow = Application.Current.MainWindow as MainWindow;
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/8d230b138e3220e08064acedd585dd7d)
```csharp
MainWindow salesWindow = Application.Current.MainWindow as MainWindow;

/*

Since window is instanciated, we are currently working
with a specialized window playing a special role

*/
```

# Detection

[x] Automatic

We can tell our linters and static checkers to search for this prefix and warn us.

# Tags

- Naming

# Conclusion

Avoid using *my*. Objects change according to the usage context.

# More Info

- [What exactly is a name — Part II Rehab](Theory\What exactly is a name — Part II Rehab)

# Credits

Photo by [Michał Bożek](https://unsplash.com/@bozu) on [Unsplash](https://unsplash.com/s/photos/kid-toy)
  
* * *

> Thinking about my experience of modifying code, I see that I spend much more time reading the existing code than I do writing new code. If I want to make my code cheap, therefore, I should make it easy to read.

_Kent Beck_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()