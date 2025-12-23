# Code Smell 24 - Boolean Coercions

![Code Smell 24 - Boolean Coercions](Code%20Smell%2024%20-%20Boolean%20Coercions.jpg)

*Booleans should be just True and False*

> TL;DR: Don't do magic castings to boolean. You will regret it on a Friday night.
 
# Problems 😔 

- Hiding Errors

- Accidental complexity coupled with one particular language.

- Readability

- Difficulty hopping among languages.

- [IFs](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

# Solutions 😃

1. Be explicit.

2. Work with booleans for boolean conditions. Not integers, not [nulls](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md), not strings, not lists. Just booleans.

3. [Fail fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/1f5d0d7328e2e49f0695323e6c210c3e) -->

```python
virus = ['MERS', 'SARS']
vaccines = []
 
if vaccines:
	print ("let's get vaccinated")
else:
	print ("There are no vaccines yet. Keep researching")
    
if virus:
	print ("There are some virus around. Take extra care")
else:
	print ("You are free to get out. Not masks are necessary")

# equivalent
    
if not vaccines:
	print ("There are no vaccines yet. Keep researching")
else:
	print ("let's get vaccinated")
    
if not virus:
	print ("You are free to get out. Not masks are necessary")
else:
	print ("There are some virus around. Take extra care")
```

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/0c8dd91896ff91852dfa0e8711093a06) -->

```python
if len(vaccines) == 0:
	print ("There are no vaccines yet. Keep researching")
else:
	print ("Let's get vaccinated")    
                    
if len(virus) == 0:
	print ("You are free to get out. Not masks are necessary")
else:
	print ("There are some virus around. Take extra care")
```

# Detection 🔍

This is a language feature. Some strict languages show warnings with this magic wizardry.

# Tags 🏷️

- Types
 
# Conclusion 🏁

Some languages encourage doing some magic abbreviations and automatic castings. This is a source of errors and a *Premature Optimization* warning.

We should always be as **explicit** as possible.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 06 - Too Clever Programmer](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2006%20-%20Too%20Clever%20Programmer/readme.md)

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md)

# More Information 📕

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

* * *

> It is not the language that makes programs appear simple. It is the programmer that make the language appear simple!

_Robert Martin_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)
  
* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)