# Code Smell 165 - Empty Exception Blocks
            
![Code Smell 165 - Empty Exception Blocks](Code%20Smell%20165%20-%20Empty%20Exception%20Blocks.jpg)

*On Error resume next was the first thing I learned in my first job*

> TL;DR: Don't avoid exceptions. Handle Them.

# Problems

- [Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) Principle Violation

# Solutions

1. Catch the exception and deal with it explicitly

# Context

On early programming days, we privileged the systems running before error handling.

We have evolved.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/9569c95218a7d8a33d68587fa70e5782)
```python
import logging

def send_email(): 
  print("Sending email") 
  raise ConnectionError("Oops")
  
try:
  send_email() 
except: 
  # AVOID THIS
pass
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/02d281247e7baac4d5dca91bc77a146a)
```python
import logging

logger logging.getLogger(__name___)
try:
  send_email()
except ConnectionError as exception:
  logger.error("Cannot send email {exception}")
```

# Detection

[X] Automatic 
  
Many linters warn us on empty exception blocks

# Exceptions

If we need to skip and ignore the exception, we should document it explicitly.

# Tags

- Exceptions

# Conclusion

Prepare to deal with the errors. 

Even if you decide to do nothing, you should be explicit with this decision.

# Relations

[Code Smell 132 - Exception Try Too Broad](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20132%20-%20Exception%20Try%20Too%20Broad/readme.md)

# More Info

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

[On Error Resume Next Package](https://www.npmjs.com/package/on-error-resume-next)

# Disclaimer

Code Smells are just my [opinion](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [James Best](https://unsplash.com/@jim_at_jibba) on [Unsplash](https://unsplash.com/)
  
Thank you @[Jan Giacomelli](@jangia)

[Twitter](https://twitter.com/1571126817322602496)

* * *

> Optimization hinders evolution. Everything should be built top-down, except the first time. Simplicity does not precede complexity, but follows it.

_Alan Perlis_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)