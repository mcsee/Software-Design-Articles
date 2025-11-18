# Code Smell 211 - Tab over Spaces
            
![Code Smell 211 - Tab over Spaces](Code%20Smell%20211%20-%20Tab%20over%20Spaces.jpg)

*Tabs or spaces, are equivalent?*

> TL;DR: Don't use Tabs. It is not a "personal style decision"

# Problems 😔 

- Readability

- Compilation errors in some languages

- [Mixed Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20164%20-%20Mixed%20Indentations/readme.md)

# Solutions 😃

1. Use spaces. Always.

2. Use automatic tools to prevent tabs in the code.

# Context 💬

Developers might see using tabs or spaces for indentation as a matter of personal preference or team convention.

It is generally recommended to [be consistent](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20164%20-%20Mixed%20Indentations/readme.md) with the chosen method of indentation within a project.

There are a few advantages of using spaces over tabs.

Spaces will always look the same, no matter the text editor, font spacing, or IDE used. 

Tabs can vary in width, which can lead to inconsistent indentation when code is viewed on different platforms or in different editors.

Spaces are more consistent in terms of alignment and readability, particularly when it comes to code that involves a mix of spaces and tabs. 

Spaces are more predictable and easier to read, which can help to reduce errors in code.

Some screen readers and other assistive technologies may have difficulty reading code that uses tabs for indentation, particularly when tabs are used inconsistently or when tab width is not uniform.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/f0e5a66c59069833be76905f11a6da7b) -->

```python
def calculate_average(numbers):
    total = 0
    count = 0
        for number in numbers:
    total += number
            count += 1
        average = total / count
    return average

numbers = [1, 2, 3, 4, 5]
print("The average is:", calculate_average(numbers))
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/3382696a06e5b8a1e5f032289fba3be3) -->

```python
def calculate_average(numbers):
    total = 0
    count = 0
    for number in numbers:
        total += number
        count += 1
    average = total / count
    return average

numbers = [1, 2, 3, 4, 5]
print("The average is:", calculate_average(numbers))
```

# Detection 🔍

[X] Automatic 

We can enforce a policy to avoid tabs.

# Tags 🏷️

- Standards 

# Conclusion 🏁

Bad indentation can make the code difficult to read and understand and can cause errors if the indentation is not consistent throughout the code.

Using spaces for indentation is generally recommended for consistency, readability, and accessibility.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 164 - Mixed Indentations](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20164%20-%20Mixed%20Indentations/readme.md)

[Code Smell 48 - Code Without Standards](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2048%20-%20Code%20Without%20Standards/readme.md)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Faisal Waheed](https://unsplash.com/@fwaheed17) on [Unsplash](https://unsplash.com/images/nature/space)
    
* * *

> It is hard to write even the smallest piece of code correctly.

_Joshua Bloch_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)