# Code Smell 227 - Cowboy Coding
            
![Code Smell 227 - Cowboy Coding](Code%20Smell%20227%20-%20Cowboy%20Coding.jpg)

*Leave cowboys to Hollywood movies*

> TL;DR: Write code as a team programmer

# Problems

- Readability

- Unreliable code

- People Management Issues

- Lack of [coordination](https://en.wikipedia.org/wiki/Cowboy_coding)

# Solutions

1. Write professional code

2. Use declarative non-cryptic names

# Context

Cowboy coders don't follow best practices. 

They don't follow team suggestions.

Cowboy coding is generally considered an unprofessional and risky approach to software development because it can lead to code that is hard to maintain and prone to errors. 

Cowboy Programmers are good people; however, [they cannot work in a group](https://www.linkedin.com/pulse/software-development-cowboy-coding-hakan-atba%C5%9F/).

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/b600a57bd4f4b095b919cbc6a2e65323) -->

```python
# Very simple example 
# Compute the sum of two numbers without any structure or best practices.

num1 = input("Enter the first number: ")
num2 = input("Enter the second number: ")

# WARNNING!!!! Don't remove the line below !!!!!
# (Unpleasant comment)

res = num1 + num2  # (No data type checking or error handling)

print("The sum is: " + result)  # (No validation or formatting)

# (No good names, no functions, no error handling, no testing, 
# no version control, and no structure.)
```

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/5fc81635624c7e7ed7f0de537094ad6d) -->

```python
def add_numbers():
    try:
        firstAddend = float(input("Enter the first number: "))
        secondAddend = float(input("Enter the second number: "))
        total = firstAddend + secondAddend
        return total
    except ValueError:
        print("Invalid input. Please enter valid numbers.")
        return None

def main():
    total = add_numbers()
    if total is not None:
        print("The sum is: {:.2f}".format(sum))

if __name__ == "__main__":
    main()
```

# Detection

[X] Manual

You can set environmental rules to prevent these coding practices and enforce team building.

# Exceptions

- Very small personal projects

# Tags

- Declarative

# Conclusion

Software development is teamwork. 

# Relations

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 02 - Constants and Magic Numbers](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2002%20-%20Constants%20and%20Magic%20Numbers/readme.md)

[Code Smell 105 - Comedian Methods](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20105%20-%20Comedian%20Methods/readme.md)

# More Info

[Wikipedia](https://en.wikipedia.org/wiki/Cowboy_coding)

[Cowboy Coder Description](https://www.linkedin.com/pulse/software-development-cowboy-coding-hakan-atba%C5%9F/)

# Disclaimer

Code Smells are my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Taylor Brandon](https://unsplash.com/@house_42) on [Unsplash](https://unsplash.com/photos/3HmP1kOdACU)
  
* * *

> The danger from computers is not that they will eventually get as smart as men, but that we will meanwhile agree to meet them halfway.

_Bernard Avishai_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)