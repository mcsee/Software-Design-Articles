# Code Smell 24 - Boolean Coercions

![Code Smell 24 - Boolean Coercions](puzzle.jpg)

*Booleans should be just True and false*

> TL;DR: Don't do magic castings to boolean. You will regret on a friday nigth.
 
# Problems

- Hiding Errors

- Accidental complexity coupled to one particular language.

- Readability

- Difficulty to hop among languages.

- [IFs](Theory\How to Get Rid of Annoying IFs Forever)

# Solutions

1. Be explicit.

2. Work with booleans for boolean conditions. Not integers, not [nulls](Theory\Null - The Billion Dollar Mistake), not strings, not lists. Just booleans.

3. [Fail fast](Theory\Fail Fast)

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/1f5d0d7328e2e49f0695323e6c210c3e)
```python
virus = ['MERS', 'SARS']
vaccines = []
 
if vaccines:
	print ("let's get vaccinated")
else:
	print ("We have no vaccines yet. Keep researching")
    
if virus:
	print ("There are some virus around. Take extra care")
else:
	print ("We are free to get out. Not masks are necessary")

# equivalent
    
if not vaccines:
	print ("We have no vaccines yet. Keep researching")
else:
	print ("let's get vaccinated")
    
if not virus:
	print ("We are free to get out. Not masks are necessary")
else:
	print ("There are some virus around. Take extra care")
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/0c8dd91896ff91852dfa0e8711093a06)
```python
if len(vaccines) == 0:
	print ("We have no vaccines yet. Keep researching")
else:
	print ("Let's get vaccinated")
    
                    
if len(virus) == 0:
	print ("We are free to get out. Not masks are necessary")
else:
	print ("There are some virus around. Take extra care")
```

# Detection

This is a language feature. Some strict languages show warnings with this magic wizardry.

# Tags

- Coercions

- Primitive

# Conclusion

Some languages encourage doing some magic abbreviations and automatic castings. This is a source of errors and a *Premature Optimization* warning.

We should always be as **explicit** as possible.

# Relations

[Code Smell 06 - Too Clever Programmer](Code Smells\Code Smell 06 - Too Clever Programmer)

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](Code Smells\Code Smell 69 - Big Bang (JavaScript Ridiculous Castings))

# More Info

[Fail Fast](Theory\Fail Fast)

* * *

> It is not the language that makes programs appear simple. It is the programmer that make the language appear simple!

_Robert Martin_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)
  
* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](Code Smell\How to Find the Stinky parts of your Code)