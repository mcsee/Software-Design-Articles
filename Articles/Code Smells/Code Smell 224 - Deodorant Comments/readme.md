# Code Smell 224 - Deodorant Comments
            
![Code Smell 224 - Deodorant Comments](Code%20Smell%20224%20-%20Deodorant%20Comments.jpg)

*You use nice words to excuse bad code*

> TL;DR: Don't excuse bad code. Write a clean one!

# Problems 😔 

- Readability

# Solutions 😃

1. Rewrite the code and delete the comment

# Context 💬

The term comes from Martin Fowler's book "Refactoring: Improving the Design of Existing Code"

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/fd3612b1beeb9cde934bec4eca92bf16) -->

```python
# This is a function that adds two numbers
def s(a, b):
    # Now you are going to add a and b
    res = a + b
    # And return the result
    return res
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/57f6e1f31f3cd599deafc21236ae71ce) -->

```python
def sum(adder, anotherAdder):
    
    return adder + anotherAdder
```

If you ask ChatGPT to improve this version it will actually worsen it:

<!-- [Gist Url](https://gist.github.com/mcsee/57bce159d43ab49377e9de2de1e6706d) -->

```python
def calculate_sum(number1, number2):
    # Calculate the sum of two numbers
    result = number1 + number2
    return result

# In this improved version:
#
# The function name calculate_sum is more descriptive than sum, 
# making it clear that
# this function calculates the sum of two numbers.
# (Wrong) it is more imperative and mistakes the 'what' with the 'how'
#
# The parameter names number1 and number2 are more meaningful 
# than adder and anotherAdder, 
# helping to indicate the purpose of each parameter.
# (wrong) They indicate type instead of role
#
# The comment # Calculate the sum of two numbers provides a clear 
# and concise explanation of what the function does, 
# making it easier for someone 
# reading the code to understand its purpose.    
# (wrong) in fact, it is an example of deodorant and useless comment
```

# Detection 🔍

[X] Semi-Automatic 

Most comments are code smells. 

You can remove deodorant comments and improve the code.

# Exceptions 🛑

- Comments should only be used to describe important design decisions.

# Tags 🏷️

- Comments

# Level 🔋

[X] Intermediate

# Conclusion 🏁

Remove any meaningless comment you find in your code.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 151 - Commented Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20151%20-%20Commented%20Code/readme.md)

[Code Smell 183 - Obsolete Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20183%20-%20Obsolete%20Comments/readme.md)

[Code Smell 146 - Getter Comments](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20146%20-%20Getter%20Comments/readme.md)

[Code Smell 05 - Comment Abusers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2005%20-%20Comment%20Abusers/readme.md)

[Refactoring 011 - Replace Comments with Tests](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20011%20-%20Replace%20Comments%20with%20Tests/readme.md)

# More Information 📕

[Clean Code In C#](https://learning.oreilly.com/library/view/clean-code-in/9781838982973)

# Disclaimer 📘

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits 🙏

Photo by [Ana Essentiels](https://unsplash.com/@ana_essentiels) on [Unsplash](https://unsplash.com/photos/Eh6iapfqDzA)
    
* * *

> The reason we mention comments here is that comments often are used as a deodorant. It's surprising how often you look at thickly commented code and notice that the comments are there because the code is bad. 

_Martin Fowler_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)