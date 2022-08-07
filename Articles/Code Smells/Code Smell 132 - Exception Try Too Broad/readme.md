# Code Smell 132 - Exception Try Too Broad

![Code Smell 132 - Exception Try Too Broad](jakob-braun-Js2Tv3-uLB8-unsplash.jpg)

*Exceptions are handy. But should be as narrow as possible*
 
> TL;DR: Be as specific as possible when handling errors.

# Problems 

- Fail fast principle violation

- Missing errors 

- False negatives

# Solutions

1. Narrow the exception handler as much as possible 

# Sample Code

## Wrong 

[Gist Url]: # (https://gist.github.com/mcsee/0ff3c46988812be98da1e256b54c00d1)
```python
import calendar, datetime
try: 
    birthYear= input('Birth year:')
    birthMonth= input('Birth month:')
    birthDay= input('Birth day:')
    # we don't expect the above to fail
    print(datetime.date(int(birthYear), int(birthMonth), int(birthDay)))
except ValueError as e:
    if str(e) == 'month must be in 1..12': 
        print('Month ' + str(birthMonth) + ' is out of range. The month must be a number in 1...12')
    elif str(e) == 'year {0} is out of range'.format(birthYear): 
        print('Year ' + str(birthYear) + ' is out of range. The year must be a number in ' + str(datetime.MINYEAR) + '...' + str(datetime.MAXYEAR))
    elif str(e) == 'day is out of range for month': 
        print('Day ' + str(birthDay) + ' is out of range. The day must be a number in 1...' + str(calendar.monthrange(birthYear, birthMonth)))

```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/0d7e270416ebc934fbfbe8934175e52c)
```python
import calendar, datetime

# We might add specialized tries dealing with errors from the following 3 statements
birthYear= input('Birth year:')
birthMonth= input('Birth month:')
birthDay= input('Birth day:')
# try scope should be narrow
try: 
    print(datetime.date(int(birthYear), int(birthMonth), int(birthDay)))
except ValueError as e:
    if str(e) == 'month must be in 1..12': 
        print('Month ' + str(birthMonth) + ' is out of range. The month must be a number in 1...12')
    elif str(e) == 'year {0} is out of range'.format(birthYear): 
        print('Year ' + str(birthYear) + ' is out of range. The year must be a number in ' + str(datetime.MINYEAR) + '...' + str(datetime.MAXYEAR))
    elif str(e) == 'day is out of range for month': 
        print('Day ' + str(birthDay) + ' is out of range. The day must be a number in 1...' + str(calendar.monthrange(birthYear, birthMonth)))
```

# Detection

[X] Manual

If we have a good enough test suite, we can perform mutation testing to narrow the exception scope as much as possible.

# Tags

- Exceptions

# Conclusion

We must make exceptions as surgical as possible.

# Relations

[Code Smell 26 - Exceptions Polluting](../../Code%20Smells/Code%20Smell%2026%20-%20Exceptions%20Polluting/readme.md)

[Code Smell 73 - Exceptions for Expected Cases](../../Code%20Smells/Code%20Smell%2073%20-%20Exceptions%20for%20Expected%20Cases/readme.md)

# Credits

Photon from [Jakob Braun](https://unsplash.com/es/fotos/Js2Tv3-uLB8) on Unsplash

* * *

> The primary duty of an exception handler is to get the error out of the lap of the programmer and into the surprised face of the user.

_Verity Stob_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)