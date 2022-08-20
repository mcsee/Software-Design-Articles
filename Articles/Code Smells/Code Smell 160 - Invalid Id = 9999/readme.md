# Code Smell 160 - Invalid Id = 9999

![Code Smell 160 - Invalid Id = 9999](markus-spiske-yAlLIl4qtnc-unsplash.jpg)

*Maxint is a very good number for an invalid ID. We will never reach it.*

> TL;DR: Don't couple real IDs with invalid ones. In fact: Avoid IDs.

# Problems

- [Bijection](../../Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) violation

- You might reach the invalid ID sooner than your think

- Don't use [nulls](../../Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md) for invalid IDs either

- Coupling flags from caller to functions

# Solutions

1.  Model special cases with special objects.

2. Avoid 9999, -1, and 0 since they are valid domain objects and implementation coupling.

3. Introduce Null Object

# Context

In the early days of computing, data types were strict. 

Then we invented [The billion-dollar mistake](../../Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md).

Then we grew up and model special scenarios with polymorphic special values.

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/342599869ca032390b55d4cc76c49548)
```c
#include "stdio.h"
#include "stdlib.h"
#define INVALID_VALUE -999

int main(void)
{   
    id = get_value();
    if (id==INVALID_VALUE) 
        return -1;  
    return id;
}

```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/40fb4a5238c9d6fbf5ad0f0aefa7fd07)
```c
#include "stdio.h"
#include "stdlib.h"
#define INVALID_VALUE -999

int main(void)
{   
    if !(id = get_value();
        return EXIT_FAILURE;
    // Sadly, C Programming Language has not exceptions
    return id;
}

```

# Detection

[X] Semi-Automatic 

We can check for special constants and special values on the code.

# Tags

- Null

# Conclusion

We should use numbers to relate to the external identifiers. 

If no external identifier exists, then it is not a number.

# Relations

[Code Smell 120 - Sequential IDs](../../Code%20Smells/Code%20Smell%20120%20-%20Sequential%20IDs/readme.md)

[Code Smell 12 - Null](../../Code%20Smells/Code%20Smell%2012%20-%20Null/readme.md)

# More Info

[Null: The Billion Dollar Mistake](../../Theory/Null%20-%20The%20Billion%20Dollar%20Mistake/readme.md)

[Y2K22 - The Mistake That Embarrasses Us](../../Quality/Y2K22%20-%20The%20Mistake%20That%20Embarrasses%20Us/readme.md)

# Disclaimer

Code Smells are just my [opinion](../../Blogging/I%20Wrote%20More%20than%2090%20Articles%20on%202021%20Here%20is%20What%20I%20Learned/readme.md).

# Credits

Photo by [Markus Spiske](https://unsplash.com/@markusspiske) on [Unsplash](https://unsplash.com/s/photos/flag-number)  

* * *

> Bugs lurk in corners and congregate at boundaries.

_Boris Beizer_
 
[Software Engineering Great Quotes](../../Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code](../../Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)