# Code Smell 101 - Comparison Against Booleans

![Code Smell 101 - Comparison Against Booleans](michael-held-r0GowRSt8f8-unsplash.jpg)

*When comparing to booleans, we perform magic castings and get unexpected results.*

> TL;DR: Don't compare against true. Either you are true, or false or you shouldn't compare

# Problems

- Hidden castings

- The least surprise principle violation.

- [Fail Fast](Theory\Fail Fast) principle violation

# Solutions

1. Use booleans

2. Don't mix booleans with *boolean castable objects*

# Context

Many languages cast values to boolean crossing domains.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/118ff2e5ebd9779675f664ed46bae95d)
```bash
#!/bin/bash

if [ false ]; then
    echo "True"
else
    echo "False"
fi

# this evaluates to true since 
# "false" is a non-empty string


if [ false ] = true; then
    echo "True"
else
    echo "False"
fi

# this also evaluates to true
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/405d45ed06a94a81d1f1a3b06381c0f9)
```bash
#!/bin/bash

if  false ; then
    echo "True"
else
    echo "False"
fi

# this evaluates to false   
```

# Detection

[X] Automatic 

Linters can check for explicit comparisons and warnings.

# Tags

- Castings

# Conclusion

It is a common industry practice to use many non booleans as booleans. 

We should be very strict when using booleans.

# Relations

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](Code Smells\Code Smell 69 - Big Bang (JavaScript Ridiculous Castings))

# More Info

[Fail Fast](Theory\Fail Fast)

# Credits

Photo by [Michael Held](https://unsplash.com/@michaelheld) on [Unsplash](https://unsplash.com/s/photos/disguise)
  
* * *

> If it doesn’t work, it doesn’t matter how fast it doesn’t work.

_Mich Ravera_
 
[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()