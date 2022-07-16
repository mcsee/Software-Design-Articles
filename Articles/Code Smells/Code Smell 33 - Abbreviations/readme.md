# Code Smell 33 - Abbreviations

![Code Smell 33 - Abbreviations](jessica-knowlden-VcHU3hC_lAM-unsplash.jpg)

*Abbreviating is very important so that we look smart and save memory and mind space.*

# Problems

- Coupling

- Bad Naming

- Declarativeness

- Ambiguity

- Readability

- Premature Optimization

[Code Smell 20 - Premature Optimization](Code Smells\Code Smell 20 - Premature Optimization)

# Solutions

1. Use meaningful/[declarative](Theory\What exactly is a name — Part II Rehab) names.

# Examples

- Variable naming

- Function naming

- Package naming

- Class Naming

# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/946b6391e043d6abec9a3ae5976c5d8f)
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World")
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/6b5865d3a16ed5ccccd34348070d7d62)
```go
package main

import "formatter"

function main() {
    formatter.Printline("Hello, World")
}
```

# Detection

We can't automate choosing what is a *short* name and a *declarative*.

Some "modern" and shinny languages enforce this bad practice. So we should wisely choose a good language instead.
 
# Tags

- Declarative

# Conclusion

Computer science was born from the mother of science (mathematics). In math, the assignment of single letter variables *(i, j, x, y)* is a good practice.

The concept of reference arose from the variable.

Many people wondered why mathematicians can work with such short variables, and computer scientists cannot.

For mathematicians, once entered into a formula, variables lose all semantics and become indistinguishable.

We need to care more about semantics and reading.

Our brain wastes a lot of energy figuring out what is the meaning of an abbreviation.

Sometimes we even mistake them

*/usr* stands for *universal system resources* not *user*

*/dev* stands for *device* not *development*.

It is 2020, We need to write software for humans, not for compilers.

# Relations

[Code Smell 06 - Too Clever Programmer](Code Smells\Code Smell 06 - Too Clever Programmer)

# More info

[What exactly is a name — Part I The Quest](Theory\What exactly is a name — Part I The Quest)

[What exactly is a name — Part II Rehab](Theory\What exactly is a name — Part II Rehab)

# Credits

Photo by [Jessica Knowlden](https://unsplash.com/@mybibimbaplife) on [Unsplash](https://unsplash.com/s/photos/small)

* * *

> A long descriptive name is better than a short enigmatic name. A long descriptive name is better than a long descriptive comment.

_Robert Martin_

[Software Engineering Great Quotes](Quotes\Software Engineering Great Quotes)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky parts of your Code]()