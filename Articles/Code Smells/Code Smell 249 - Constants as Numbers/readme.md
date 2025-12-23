# Code Smell 249 - Constants as Numbers
            
![Code Smell 249 - Constants as Numbers](Code%20Smell%20249%20-%20Constants%20as%20Numbers.jpg)

*You map concepts to optimized numbers*

> TL;DR: Use real-world constants as constants

# Problems 😔 

- Bijection Violation

- Debugging 

- Premature Optimization

- Maintainability

- Type Safety

- Limited Extensibility

# Solutions 😃

1. Use descriptive string constants

2. Use Enums

3. Create A [Polymorphic](https://en.wikipedia.org/wiki/Polymorphism_(computer_science)) Hierarchy

# Context 💬

Numeric constants representing real-world concepts lack readability and make your code harder to understand. 

It's not clear what each number represents.

If you need to add more constants in the future or change the order, you'll have to update all occurrences of these numeric constants manually.

New values can introduce errors and make maintenance more difficult.

Saving attributes as *integers* to improve the persistence performance or space is a clear signal of [Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md).

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/6dca45949652677ea4fe0f611c0a290d) -->

```csharp
public const FORMAT_JPG = 1;
public const FORMAT_GIF = 2;
public const FORMAT_PNG = 3;
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/8af320b9550e7a7f4884df45820d7478) -->

```csharp
public const string FORMAT_JPG = "JPG";
public const string FORMAT_GIF = "GIF";
public const string FORMAT_PNG = "PNG";

// OR

public enum ImageFormat
{
    JPG,
    GIF,
    PNG
}
```

# Detection 🔍

[X] Semi-Automatic 

You can tell your linters to warn you about this usage, but they can show you some false positives.

# Tags 🏷️

- Readability

# Level 🔋

[X] Beginner

# AI Generation 🤖

No models create this premature optimization problem when prompted to list constants.
	
# AI Detection 🥃

ChatGPT and Gemini detected this as a mistake.

# Conclusion 🏁

After this correction, your code will be cleaner readable, and self-explanatory for debugging.

You can read it and It's clear what each constant represents.

If you need to add more formats or change the order, you should update the enumeration definition without affecting the rest of the code. 

IDEs with auto-completion and error checking will give you better support to work with enums.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

[Code Smell 110 - Switches With Defaults](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20110%20-%20Switches%20With%20Defaults/readme.md)

[Code Smell 20 - Premature Optimization](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2020%20-%20Premature%20Optimization/readme.md)

# More Information 📕

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Markus Krisetya](https://unsplash.com/@krisetya) on [Unsplash](https://unsplash.com/photos/person-in-white-shirt-and-blue-denim-shorts-standing-on-black-and-white-floor-Vkp9wg-VAsQ)
    
* * *

> Forget this world and all its troubles and if possible its multitudinous Charlatans - everything in short but the Enchantress of Numbers.

_Ada Lovelace_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)