# Code Smell 101 - Comparison Against Booleans

![Code Smell 101 - Comparison Against Booleans](Code%20Smell%20101%20-%20Comparison%20Against%20Booleans.jpg)

*When comparing to booleans, we perform magic castings and get unexpected results.*

> TL;DR: Don't compare against true. Either you are true, or false or you shouldn't compare

# Problems 😔 

- Hidden castings

- The least surprise principle violation.

- [Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md) principle violation

# Solutions 😃

1. Use booleans

2. Don't mix booleans with *boolean castable objects*

# Context 💬

Many languages cast values to boolean crossing domains.

# Sample Code 📖

## Wrong 🚫

<!-- [Gist Url](https://gist.github.com/mcsee/118ff2e5ebd9779675f664ed46bae95d) -->

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

## Right 👉

<!-- [Gist Url](https://gist.github.com/mcsee/405d45ed06a94a81d1f1a3b06381c0f9) -->

```bash
#!/bin/bash

if  false ; then
    echo "True"
else
    echo "False"
fi

# this evaluates to false
```

# Detection 🔍

[X] Automatic 

Linters can check for explicit comparisons and warnings.

# Tags 🏷️

- IFs

# Conclusion 🏁

It is a common industry practice to use many non booleans as booleans. 

We should be very strict when using booleans.

# Relations 👩‍❤️‍💋‍👨

[Code Smell 69 - Big Bang (JavaScript Ridiculous Castings)](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2069%20-%20Big%20Bang%20(JavaScript%20Ridiculous%20Castings)/readme.md)

# More Information 📕

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

# Credits 🙏

Photo by [Michael Held](https://unsplash.com/@michaelheld) on [Unsplash](https://unsplash.com/s/photos/disguise)
  
* * *

> If it doesn’t work, it doesn’t matter how fast it doesn’t work.

_Mich Ravera_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of Your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20Parts%20of%20Your%20Code/readme.md)