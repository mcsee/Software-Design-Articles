# Code Smell 225 - Pass by Reference
            
![Code Smell 225 - Pass by Reference](Code%20Smell%20225%20-%20Pass%20by%20Reference.jpg)

*Pass by copy, pass by reference. which is better?*

> TL;DR: Beware of passing arguments by reference

# Problems

- Unexpected Results

- Side Effects

- Readability

- Broken Encapsulation

# Solutions

1. Pass arguments by copying even large objects. Don't make [premature optimizations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md).

2. Declare variables as [constants](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20116%20-%20Variables%20Declared%20With%20'var'/readme.md)

3. [Refactor](https://methodpoet.com/modifying-method-parameter/) the code

4. Make objects [immutable](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20176%20-%20Changes%20in%20Essence/readme.md) to avoid accidental changes

5 Use Pure Functions

# Context

A call-by-reference language like C# or PHP makes it more difficult for a programmer to track the effects of a function call, and may introduce subtle bugs.

This is a very old technique present in low-level languages to favor performance and avoid the cost of copying large structures. 

Some languages like Go use *pass-by-value* semantics. 

When you pass arguments to a function, copies are made. 

However, when you pass a pointer to an object, you can modify the original object within the function. This is another code smell.

On the contrary, functional languages forbid this mechanism completely. 

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/5f444e26b2b3a658004a8c39ef5f30a1) -->

```csharp
using System;
 
namespace Example
{
     class Betelgeuse
     {
         static void Main(string[] args)
         {
             double starSize = 100.0;
             Console.WriteLine("star size: {0}", starSize);
             // star size: 100
             double supernovaSize = SimulateFinalSize(ref starSize);
             // Notice 'ref' modifier
             Console.WriteLine("supernova size: {0}", supernovaSize); 
             // supernova size: 10000
             Console.WriteLine("original star size after: {0}", starSize);
             // original star size after: 10000
             // WRONG: It should not be affected
         }
         public static double SimulateFinalSize(ref double size)
         {
             // Notice 'ref' modifier
             // Oversimplification
             // You should use Sedov-Taylor solution
              size = size * 100;
              return size;
         }
     }
}
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/8e19291a5de8ad1b7a7ebf30ab0935f0) -->

```csharp
using System;
 
namespace Example
{
     class Betelgeuse
     {
         static void Main(string[] args)
         {
             const double starSize = 100.0; 
             // The const modifier warns the compiler
             Console.WriteLine("star size: {0}", starSize);
             // star size: 100
             double supernovaSize = SimulateFinalSize(starSize);
             // Notice 'ref' is omitted
             Console.WriteLine("supernova size: {0}", supernovaSize);
             // supernova size: 10000
             Console.WriteLine("original star size after: {0}", starSize);
             // original star size after: 100
             // It remains at the original value
         }
         public static double SimulateFinalSize(double size)
         {
             // Notice 'ref' is omitted
             // Oversimplification
             // You should use Sedov-Taylor solution
              size = size * 100;
              return size;
         }
     }
}
```

# Detection

[X] Semi-Automatic 

You can use many linters to warn with arguments passed by reference

# Tags

- Readability

# Conclusion

Passing objects by reference can lead to unexpected side effects if the function modifies the object in a way that wasn't anticipated by the caller. 

You should use copy by value instead.

# Relations

[Code Smell 116 - Variables Declared With 'var'](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20116%20-%20Variables%20Declared%20With%20'var'/readme.md)

[Code Smell 176 - Changes in Essence](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20176%20-%20Changes%20in%20Essence/readme.md)

[Code Smell 209 - Side Effects](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20209%20-%20Side%20Effects/readme.md)

# More Info

[Modifiyng Method Parameter](https://methodpoet.com/modifying-method-parameter/)

[Wikipedia](https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_reference)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Quino Al](https://unsplash.com/@quinoal) on [Unsplash](https://unsplash.com/photos/KydWCDJe9s0)
    
* * *

> Make it correct, make it clear, make it concise, make it fast. In that order.

_Wes Dyer_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)