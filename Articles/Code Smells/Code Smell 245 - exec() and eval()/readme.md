# Code Smell 245 - exec() and eval()
            
![Code Smell 245 - exec() and eval()](Code%20Smell%20245%20-%20exec()%20and%20eval().jpg)

*A great door for hackers*

> TL;DR: Don't use metaprogramming. It is not that cool

# Problems

- Security

- Limited Control 

# Solutions

1. Use direct calls 

2. Wrap the execution in a primitive and controlled command

3. Sanitize it 

# Context

Developers employ the eval() and exec() functions to evaluate arbitrary expressions from strings.

They can be a powerful tool in certain contexts but come with several risks and problems, especially when used with untrusted input or where the code's behavior is not fully controlled or understood. 

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/234f3b1d3a82bfc9bba82d8bb0af642c)
```python
def calculate(mathOperand, firstArgument, secondArgument):
    return eval(f'{firstArgument} {mathOperand} {secondArgument}')

# Sample usage to multiply two numbers
result = calculate('*', 4, 6)

# Injection to remove all files
calculate('', "__import__('os').system('rm -rf *')",''))
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/c805ea4caee48b9ce7b37c2dcec0a594)
```python
def calculate(mathOperand, firstArgument, secondArgument):
    if mathOperand == '+':
        return firstArgument + secondArgument
    elif mathOperand == '-':
        return firstArgument - secondArgument
    elif mathOperand == '*':
        return firstArgument * secondArgument
    elif mathOperand == '/':
        if secondArgument != 0:
            return firstArgument / secondArgument
        else:
            return "Error: Division by zero"
    else:
        return "Error: Invalid operation - Do not hack!"
        
# This is a quick solution but another smell
# You should avoid this kind of switches and iterate to 
# a Polymorphic Hierarchy
```

# Detection

[X] Automatic 

You can search for eval() in the code

# Tags

- Metaprogramming

# Level

[x] Intermediate

# AI Assistants

Most AI Assistants avoid using eval() in their solutions. 

They also recognize it as a code smell and offer different options

# Conclusion

Avoid this metaprogramming solution by hardcoding all the possible scenarios and avoiding over-generalizations.

# Relations

[Code Smell 207 - Dynamic Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20207%20-%20Dynamic%20Methods/readme.md)

[Code Smell 189 - Not Sanitized Input](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20189%20-%20Not%20Sanitized%20Input/readme.md)

[Code Smell 215 - Deserializing Object Vulnerability](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20215%20-%20Deserializing%20Object%20Vulnerability/readme.md)

# More Info

[Laziness I - Metaprogramming](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Laziness%20I%20-%20Metaprogramming/readme.md)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Yang](https://unsplash.com/@yangshuo) on [Unsplash](https://unsplash.com/photos/wall-with-red-gate-16Y4sHHe9xY)   
  
* * *

> When you actually sit down to write some code, you learn things that you didn’t get from thinking about them in modeling terms…there is a feedback process there that you can only really get at from executing some things and seeing what works.

_Martin Fowler_
  
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)