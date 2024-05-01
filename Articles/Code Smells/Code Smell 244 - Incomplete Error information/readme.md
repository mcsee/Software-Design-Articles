# Code Smell 244 - Incomplete Error information
            
![Code Smell 244 - Incomplete Error information](Code%20Smell%20244%20-%20Incomplete%20Error%20information.jpg)

*You show an error and provide no useful information*

> TL;DR: Help yourself and others with correction information

# Problems

- Debugging and maintenance challenge.

- Fail Fast Principle violation

- Debugging complex situations.

# Solutions

1. Add all the relevant information to solve the solution

# Context

When you are reporting an error, either via an information text in the UI, by processing an API request, or by creating a test assertion, you need to provide an exit (a possible solution).

This is very relevant when dealing with complex scenarios, large objects, or arrays with minimal mistakes.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/9427d3e30d0485bf431a0dd21db3a40d)

```python
VALID_COLUMNS = ['name', 'gender', 'email']

def process_API_information(data):
    invalid_columns = []
    for column in data.keys():
        if column not in VALID_COLUMNS:
            invalid_columns.append(column)
    
    assert not invalid_columns, "Invalid columns detected."  
    # No details were provided about which columns are invalid
     
 
data = {'name': 'John', 'gender': 'Pangender', 
        'age': 47, 'email': 'john@example.com'}
process_API_information(data)
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/b7eb7b4def657b3798dea3c0bdcf0809)

```python
VALID_COLUMNS = ['name', 'gender', 'email']

def process_API_information(data):
    invalid_columns = [
        column for column in data.keys() if column not in VALID_COLUMNS
    ]
    
    if invalid_columns:
        raise ValueError(
            f"Invalid columns detected: {', '.join(invalid_columns)}"
        )  # Shows WHICH columns are invalid

data = {'name': 'John', 'gender': 'Pangender', 
        'age': 47, 'email': 'john@example.com'}
process_API_information(data)
```

# Detection

[X] Semi-Automatic 

This is a semantic smell. You can warn the developers on error texts that do not include variables. 

# Tags

- Errors

# Level

[X] Beginner 

# AI Assistants

AI assistants usually miss this kind of help and provide hardcoded error messages.

# Conclusion

You need to always think about how to help your end users. 

It might be yourself.

# Relations

[Code Smell 104 - Assert True](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20104%20-%20Assert%20True/readme.md)

[Code Smell 97 - Error Messages Without Empathy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2097%20-%20Error%20Messages%20Without%20Empathy/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Brett Jordan](https://unsplash.com/@brett_jordanh) on [Unsplash](https://unsplash.com/photos/brown-wooden-blocks-on-white-surface-Xp9WOzF92Jw)  
  
* * *

> Information shared by an object might or might not be part of the structure of that object. That is, the object might compute the information, or it might delegate the request for information to another object.

_Rebecca Wirfs Brooks_ 
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)